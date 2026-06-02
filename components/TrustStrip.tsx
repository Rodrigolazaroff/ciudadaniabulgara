'use client';

import { Doc, Clock, Language, Check } from '@/lib/icons';

export function TrustStrip() {
  const items = [
    [Doc, '150+ legajos', 'presentados ante el consulado'],
    [Check, '95% de viabilidad', 'confirmada en el diagnóstico'],
    [Language, 'Actas y traducción', 'gestionadas en AR y Bulgaria'],
    [Clock, 'Respuesta el mismo día', 'por WhatsApp, con Rodrigo'],
  ] as const;

  return (
    <section className="trust-strip" aria-label="Por qué confiar en nosotros">
      <div className="wrap">
        {items.map(([Icon, strong, rest], k) => (
          <div className="trust-item" key={k}>
            <Icon size={22} />
            <span>
              <b>{strong}</b> {rest}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
