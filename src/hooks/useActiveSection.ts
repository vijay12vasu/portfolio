import { useEffect, useState } from 'react';
import { sectionNavigation } from '../data/navigation';

function getActiveSectionId() {
  const markerY = window.innerHeight * 0.4;
  const activeSection = sectionNavigation.find(({ id }) => {
    const element = document.getElementById(id);
    if (!element) return false;

    const { top, bottom } = element.getBoundingClientRect();
    return top <= markerY && bottom >= markerY;
  });

  if (activeSection) return activeSection.id;

  const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  return atPageEnd ? sectionNavigation[sectionNavigation.length - 1].id : null;
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const updateActiveSection = () => {
      const currentSection = getActiveSectionId();
      if (currentSection) setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return activeSection;
}
