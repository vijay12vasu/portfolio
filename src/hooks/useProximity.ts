import { useEffect } from 'react';
import type { RefObject } from 'react';
import { useMotionValue, useSpring, useAnimationFrame } from 'framer-motion';

// Global motion values for pointer to avoid multiple event listeners
export const globalPointerX = { current: 0 };
export const globalPointerY = { current: 0 };
let isPointerListening = false;

export function initGlobalPointer() {
  if (typeof window === 'undefined' || isPointerListening) return;
  
  const handleMouseMove = (e: MouseEvent) => {
    globalPointerX.current = e.clientX;
    globalPointerY.current = e.clientY;
  };
  
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  isPointerListening = true;
}

export function useProximity(ref: RefObject<HTMLElement | null>, radius: number = 180) {
  useEffect(() => {
    initGlobalPointer();
  }, []);

  const proximity = useMotionValue(0);
  
  useAnimationFrame(() => {
    if (!ref.current || !isPointerListening) return;
    
    const rect = ref.current.getBoundingClientRect();
    const px = globalPointerX.current;
    const py = globalPointerY.current;
    
    // Calculate distance from pointer to the closest edge of the bounding box
    const dx = Math.max(rect.left - px, 0, px - rect.right);
    const dy = Math.max(rect.top - py, 0, py - rect.bottom);
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize to 0-1 (1 = inside/touching, 0 = outside radius)
    let rawProx = 1 - (dist / radius);
    if (rawProx < 0) rawProx = 0;
    if (rawProx > 1) rawProx = 1;
    
    // Slight ease-out curve (sine) to boost the early detection phase.
    // This removes the "dead zone" at the edge of the radius without washing out the center.
    const curvedProx = Math.sin(rawProx * (Math.PI / 2));
    
    proximity.set(curvedProx);
  });

  // Smoothed spring value - tuned for an immediate but liquid feel
  // Higher stiffness for fast response, optimal damping to avoid bounciness
  return useSpring(proximity, { damping: 40, stiffness: 250, mass: 0.4 });
}
