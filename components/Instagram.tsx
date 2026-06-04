'use client';

import { Instagram as IgIcon } from '@/lib/icons';

export function Instagram() {
  return (
    <section className="section cream">
      <div className="wrap">
        <div className="ig-band reveal">
          <div className="ig-band-copy">
            <span className="ig-handle-label">
              <IgIcon size={20} /> En Instagram
            </span>
            <a href="https://instagram.com/ciudadaniabulgaraok" target="_blank" rel="noopener noreferrer" className="ig-handle">@ciudadaniabulgaraok</a>
            <p>
              Casos reales, la ley búlgara explicada en simple y novedades del consulado. Lo que publicamos te
              ayuda a entender tu propio trámite antes de empezarlo.
            </p>
          </div>
          <a
            href="https://instagram.com/ciudadaniabulgaraok"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            <IgIcon size={18} /> Seguir la cuenta
          </a>
        </div>
      </div>
    </section>
  );
}
