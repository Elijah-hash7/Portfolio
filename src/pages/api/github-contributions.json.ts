import type { APIRoute } from "astro";

type ContributionCell = { count: number; date: string; level: number };

function formatDisplayDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

async function fetchGraphQLCalendar(username: string, token: string) {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);

  const query = `
    query($user: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $user) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
        repositories(
          first: 1
          ownerAffiliations: OWNER
          privacy: PUBLIC
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            pushedAt
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        user: username,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL API error");
  }

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) {
    throw new Error("Contribution calendar unavailable");
  }

  const weeks = cal.weeks as { contributionDays: { date: string; contributionCount: number; weekday: number }[] }[];
  const cells: ContributionCell[] = [];
  let lastContributionDate: string | null = null;

  for (const week of weeks) {
    const byWeekday: Record<number, { count: number; date: string }> = {};
    for (const day of week.contributionDays) {
      const weekdayIndex = Math.max(0, Math.min(6, day.weekday - 1));
      byWeekday[weekdayIndex] = { count: day.contributionCount, date: day.date };
      if (day.contributionCount > 0 && (!lastContributionDate || day.date > lastContributionDate)) {
        lastContributionDate = day.date;
      }
    }

    for (let weekday = 0; weekday < 7; weekday++) {
      const day = byWeekday[weekday];
      const count = day?.count ?? 0;
      cells.push({
        count,
        date: day?.date ? formatDisplayDate(day.date) : "",
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4,
      });
    }
  }

  return {
    totalContributions: cal.totalContributions as number,
    cells,
    lastContributionDate,
    lastPushDate: json.data?.user?.repositories?.nodes?.[0]?.pushedAt ?? null,
    source: "graphql",
  };
}

async function fetchPublicCalendar(username: string) {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(from.getFullYear() - 1);

  const params = new URLSearchParams({
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  });

  const [calendarRes, reposRes] = await Promise.all([
    fetch(`https://github.com/users/${username}/contributions?${params.toString()}`, {
      headers: { "User-Agent": "portfolio-site" },
    }),
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1&type=owner`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
    }),
  ]);

  if (!calendarRes.ok) {
    throw new Error(`GitHub contributions page returned ${calendarRes.status}`);
  }

  const markup = await calendarRes.text();
  const summaryText = markup.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
  const totalMatch = summaryText.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
  const tooltipCounts = new Map<string, number>();
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of markup.matchAll(tooltipRegex)) {
    const [, id, rawText] = match;
    const text = rawText.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    const countMatch = text.match(/^(\d+) contribution(?:s)? on /i);
    tooltipCounts.set(id, countMatch ? Number(countMatch[1]) : 0);
  }

  const cellRegex = /<(?:td|rect)\b[^>]*(?:id|data-date)=/g;
  const tags = markup.match(cellRegex) ? markup.match(/<(?:td|rect)\b[^>]*>/g) ?? [] : [];

  const parsedCells = tags
    .map((tag) => {
      const id = tag.match(/\bid="([^"]+)"/)?.[1] ?? "";
      const isoDate = tag.match(/\bdata-date="([^"]+)"/)?.[1] ?? "";
      const levelValue = Number(tag.match(/\bdata-level="([^"]+)"/)?.[1] ?? 0);
      const countAttr = tag.match(/\bdata-count="([^"]+)"/)?.[1];

      if (!isoDate) {
        return null;
      }

      const count = countAttr ? Number(countAttr) : (tooltipCounts.get(id) ?? (levelValue === 0 ? 0 : 1));
      return {
        isoDate,
        count,
        level: Math.max(0, Math.min(4, levelValue)),
      };
    })
    .filter((cell): cell is { isoDate: string; count: number; level: number } => Boolean(cell))
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  if (parsedCells.length === 0) {
    throw new Error("Could not parse public contributions markup");
  }

  const cells: ContributionCell[] = parsedCells.map((cell) => ({
    count: cell.count,
    date: formatDisplayDate(cell.isoDate),
    level: cell.level,
  }));

  const totalFromSummary = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : null;
  const totalContributions = totalFromSummary ?? parsedCells.reduce((sum, cell) => sum + cell.count, 0);
  const lastContributionDate = [...parsedCells].reverse().find((cell) => cell.count > 0)?.isoDate ?? null;

  let lastPushDate: string | null = null;
  if (reposRes.ok) {
    const repos = await reposRes.json();
    lastPushDate = Array.isArray(repos) ? repos[0]?.pushed_at ?? null : null;
  }

  return {
    totalContributions,
    cells,
    lastContributionDate,
    lastPushDate,
    source: "public",
  };
}

export const GET = (async () => {
  const username = import.meta.env.GITHUB_USERNAME;
  const token = import.meta.env.GITHUB_TOKEN;

  if (!username) {
    return new Response(
      JSON.stringify({
        error: "Missing GITHUB_USERNAME in .env",
        fallback: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const data = token
      ? await fetchGraphQLCalendar(username, token).catch(() => fetchPublicCalendar(username))
      : await fetchPublicCalendar(username);

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Fetch failed",
        fallback: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}) satisfies APIRoute;
