'use client';

import { Check, Doc, Calendar } from '@/lib/icons';

export function Services() {
  const pillars = [
    [Check, 'Diagnóstico sin vueltas', 'Revisamos tu árbol genealógico y te decimos si calificás antes de que gastes un peso. Si no es viable, te lo decimos.'],
    [Doc, 'Legajo completo, a tu nombre', 'Buscamos, apostillamos y traducimos cada acta en Argentina y en Bulgaria. Vos no perseguís registros.'],
    [Calendar, 'Turno consular gestionado', 'Coordinamos la presentación en el consulado y te acompañamos hasta tener el pasaporte en la mano.'],
  ] as const;

  return (
    <section className="section">
      <div className="wrap">
        <div className="s-head" style={{ maxWidth: 620 }}>
          <span className="kicker reveal">Cómo trabajamos</span>
          <h2 className="h2 reveal d1">Lo que resolvemos por vos</h2>
        </div>
        <div className="pillars">
          {pillars.map(([Icon, title, desc], k) => (
            <div className={`pillar reveal d${k + 1}`} key={k}>
              <span className="pillar-ic">
                <Icon size={24} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
