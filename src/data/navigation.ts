export const sectionNavigation = [
  { id: 'hero', number: '00', label: 'SYSTEM' },
  { id: 'about', number: '01', label: 'IDENTITY' },
  { id: 'howithink', number: '02', label: 'MIND' },
  { id: 'stack', number: '03', label: 'TOOLS' },
  { id: 'projects', number: '04', label: 'WORK' },
  { id: 'journey', number: '05', label: 'JOURNEY' },
  { id: 'beyond', number: '06', label: 'BEYOND' },
  { id: 'contact', number: '07', label: 'CONTACT' },
] as const;

const primaryNavigationIds = ['about', 'stack', 'projects', 'journey'] as const;

export const primaryNavigation = sectionNavigation.filter(({ id }) =>
  primaryNavigationIds.includes(id as (typeof primaryNavigationIds)[number]),
);
