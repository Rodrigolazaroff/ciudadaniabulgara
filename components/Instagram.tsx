'use client';

import { Instagram as IgIcon } from '@/lib/icons';

export function Instagram() {
  const topics = ['Casos reales', 'Leyes búlgaras explicadas', 'Tips de trámite', 'Novedades del consulado'];

  return (
    <section className="section cream">
      <div className="wrap">
        <div className="ig-band reveal">
          <div className="ig-band-copy">
            <span className="ig-handle-label">
              <IgIcon size={20} /> En Instagram
            </span>
            <h2 className="ig-handle">@ciudadaniabulgaraok</h2>
            <p>
              Casos reales, la ley búlgara explicada en simple y novedades del consulado. Lo que publicamos te
              ayuda a entender tu propio trámite antes de empezarlo.
            </p>
            <div className="ig-tags">
              {topics.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
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
