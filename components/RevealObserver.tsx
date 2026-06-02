'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => {
        el.classList.add('in');
      });
    };

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

    if ('IntersectionObserver' in window) {
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
    }

    requestAnimationFrame(revealInView);
    const onScroll = () => revealInView();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const fail = setTimeout(revealAll, 700);

    return () => {
      if (obs) obs.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(fail);
    };
  }, []);

  return null;
}
