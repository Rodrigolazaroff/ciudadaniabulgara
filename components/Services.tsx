'use client';

import { Check, Doc, Calendar } from '@/lib/icons';

export function Services() {
  const pillars = [
    [Check, '¿Calificás?', 'Revisamos tu árbol genealógico y confirmamos si el caso es viable.'],
    [Doc, 'La documentación', 'Actas, apostillas y traducciones. De la burocracia nos encargamos nosotros.'],
    [Calendar, 'El consulado', 'Coordinamos el turno y te acompañamos en la entrevista.'],
  ] as const;

  return (
    <section className="section">
      <div className="wrap">
        <div className="s-head" style={{ maxWidth: 620 }}>
          <span className="kicker reveal">Cómo trabajamos</span>
          <h2 className="h2 reveal d1">Vos traés tu historia. Nosotros hacemos el resto.</h2>
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
