const colors: Record<string, string> = {
  c: '#A8B9CC',
  'c++': '#00599C',
  java: '#F89820',
  python: '#3776AB',
  html: '#E34F26',
  html5: '#E34F26',
  css: '#1572B6',
  css3: '#1572B6',
  javascript: '#F7DF1E',
  react: '#61DAFB',
  'spring boot': '#6DB33F',
  mongodb: '#47A248',
  fastapi: '#009688',
  sql: '#38BDF8',
  dbms: '#38BDF8',
  dsa: '#A78BFA',
  'system design': '#A78BFA',
  'python/fastapi': '#009688',
};

export function getTechnologyColor(name: string) {
  return colors[name.trim().toLowerCase()] ?? '#94A3B8';
}
