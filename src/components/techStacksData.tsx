import type { ComponentType } from 'react';
import { Astro } from './icons/Astro';
import { NextJs } from './icons/Nextjs';
import { ReactJs } from './icons/React';
import { Tailwindcss } from './icons/Tailwind';
import { TypeScript } from './icons/Typescript';
import { Vuejs } from './icons/Vue';
import { ReactJs as PrismaIcon } from './icons/Prisma';

type IconProps = { className?: string };

type TechStack = {
  name: string;
  icon: ComponentType<IconProps>;
};

const techStacks: TechStack[] = [
  { name: 'Astro', icon: Astro },
  { name: 'Vue.js', icon: Vuejs },
  { name: 'Prisma', icon: PrismaIcon },
  { name: 'Tailwind CSS', icon: Tailwindcss },
  { name: 'TypeScript', icon: TypeScript },
  { name: 'Next.js', icon: NextJs },
  { name: 'React', icon: ReactJs },
];

export default techStacks;
