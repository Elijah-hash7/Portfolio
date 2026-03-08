import type { APIRoute } from "astro";

/**
 * GitHub contribution calendar via GraphQL API.
 * Requires GITHUB_USERNAME and GITHUB_TOKEN in .env
 */
export const GET = (async () => {
  const username = import.meta.env.GITHUB_USERNAME;
  const token = import.meta.env.GITHUB_TOKEN;

  if (!username || !token) {
    return new Response(
      JSON.stringify({
        error: "Missing GITHUB_USERNAME or GITHUB_TOKEN in .env",
        fallback: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

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
      }
    }
  `;

  try {
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
      return new Response(
        JSON.stringify({
          error: json.errors[0]?.message ?? "GitHub API error",
          fallback: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) {
      return new Response(
        JSON.stringify({ error: "User not found", fallback: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const weeks = cal.weeks as { contributionDays: { date: string; contributionCount: number; weekday: number }[] }[];
    const cells: { count: number; date: string; level: number }[] = [];
    let lastContributionDate: string | null = null;

    for (let w = 0; w < weeks.length; w++) {
      const week = weeks[w];
      const byWeekday: Record<number, { count: number; date: string }> = {};
      for (const d of week.contributionDays) {
        byWeekday[d.weekday] = { count: d.contributionCount, date: d.date };
        if (d.contributionCount > 0 && (!lastContributionDate || d.date > lastContributionDate)) {
          lastContributionDate = d.date;
        }
      }
      for (let day = 0; day < 7; day++) {
        const d = byWeekday[day];
        const count = d?.count ?? 0;
        const dateStr = d?.date ?? "";
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
        cells.push({
          count,
          date: dateStr
            ? new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric" })
            : "",
          level,
        });
      }
    }

    return new Response(
      JSON.stringify({
        totalContributions: cal.totalContributions,
        cells,
        lastContributionDate,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
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
