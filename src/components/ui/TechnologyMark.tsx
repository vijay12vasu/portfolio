import type { IconType } from 'react-icons';
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiFastapi,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiPython,
  SiReact,
  SiSpringboot,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { FiCpu, FiDatabase, FiGitBranch, FiServer } from 'react-icons/fi';
import { getTechnologyColor } from '../../data/technologyColors';

const technologyIcons: Record<string, IconType> = {
  c: SiC,
  'c++': SiCplusplus,
  java: DiJava,
  python: SiPython,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  'spring boot': SiSpringboot,
  mongodb: SiMongodb,
  fastapi: SiFastapi,
  sql: FiDatabase,
  dbms: FiDatabase,
  dsa: FiGitBranch,
  'system design': FiCpu,
  'python/fastapi': SiFastapi,
};

export function TechnologyMark({
  name,
  className = 'h-7 w-7',
}: {
  name: string;
  className?: string;
}) {
  const Icon = technologyIcons[name.trim().toLowerCase()] ?? FiServer;

  return <Icon aria-hidden="true" className={className} style={{ color: getTechnologyColor(name) }} />;
}
