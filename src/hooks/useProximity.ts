import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

// One shared pointer listener updates proximity only when the pointer, page, or viewport changes.
export const globalPointerX = { current: 0 };
export const globalPointerY = { current: 0 };

const proximitySubscribers = new Set<() => void>();
let isPointerListening = false;

function updateSubscribers() {
  proximitySubscribers.forEach(update => update());
}

export function initGlobalPointer() {
  if (typeof window === 'undefined' || isPointerListening) return;

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    globalPointerX.current = event.clientX;
    globalPointerY.current = event.clientY;
    updateSubscribers();
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('scroll', updateSubscribers, { passive: true });
  window.addEventListener('resize', updateSubscribers, { passive: true });
  isPointerListening = true;
}

export function useProximity(ref: RefObject<HTMLElement | null>, radius = 180) {
  const proximity = useMotionValue(0);

  useEffect(() => {
    initGlobalPointer();

    const update = () => {
      const element = ref.current;
      if (!element) return;

      const bounds = element.getBoundingClientRect();
      const dx = Math.max(bounds.left - globalPointerX.current, 0, globalPointerX.current - bounds.right);
      const dy = Math.max(bounds.top - globalPointerY.current, 0, globalPointerY.current - bounds.bottom);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const progress = Math.max(0, Math.min(1, 1 - distance / radius));
      proximity.set(Math.sin(progress * (Math.PI / 2)));
    };

    proximitySubscribers.add(update);
    update();
    return () => {
      proximitySubscribers.delete(update);
      proximity.set(0);
    };
  }, [proximity, radius, ref]);

  return useSpring(proximity, { damping: 40, stiffness: 250, mass: 0.4 });
}
