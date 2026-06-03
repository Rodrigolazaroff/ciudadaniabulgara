'use client';

import { Clock, Language, Check } from '@/lib/icons';

export function TrustStrip() {
  const items = [
    [Clock, '+4 años', 'de experiencia en el trámite'],
    [Check, 'Proceso integral', 'conocemos cada etapa en detalle'],
    [Language, '100% desde Argentina', 'sin necesidad de viajar a Bulgaria'],
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
