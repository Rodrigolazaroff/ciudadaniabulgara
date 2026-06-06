'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          el.classList.add('in');
        }
      });
    };

    let obs: IntersectionObserver | null = null;
    const hasIO = typeof IntersectionObserver !== 'undefined';

    if (hasIO) {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              obs?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
      );

      document.querySelectorAll('.reveal:not(.in)').forEach(el => obs!.observe(el));

      return () => {
        if (obs) obs.disconnect();
      };
    }

    // Fallback solo si el navegador no soporta IntersectionObserver:
    // revelar por scroll, asi nada queda oculto.
    requestAnimationFrame(revealInView);
    const onScroll = () => revealInView();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
