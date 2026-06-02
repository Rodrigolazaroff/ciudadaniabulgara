'use client';

import { Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function Process() {
  const steps = [
    ['Consulta y diagnóstico', 'Analizamos tu árbol genealógico y confirmamos si la vía por descendencia es viable.', 'Día 1'],
    ['Búsqueda de actas', 'Localizamos partidas de nacimiento, matrimonio y defunción en registros de Argentina y Bulgaria.', 'Semanas 1–8'],
    ['Apostillado y traducción oficial', 'Legalizamos y traducimos cada documento según la norma búlgara, sin inconsistencias.', 'Semanas 6–12'],
    ['Presentación consular', 'Armamos el legajo y lo presentamos. Seguimiento personal hasta la resolución.', 'Cierre'],
  ] as const;

  return (
    <section className="section ink" id="proceso">
      <div className="wrap proc-grid">
        <div className="proc-aside">
          <span className="kicker reveal">
            El proceso <span className="cy">· Процес</span>
          </span>
          <h2 className="h2 reveal d1">De la consulta al pasaporte, en cuatro pasos.</h2>
          <p className="lead reveal d2" style={{ marginTop: 20 }}>
            Entre 6 y 12 meses según la disponibilidad de los documentos. Sabés en qué etapa estás en todo momento.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold reveal d3"
            style={{ marginTop: 28 }}
          >
            <Whatsapp size={18} /> Empezar el diagnóstico
          </a>
        </div>

        <ol className="steps">
          {steps.map(([title, desc, when], k) => (
            <li className={`step reveal d${k + 1}`} key={k}>
              <span className="dot">{k + 1}</span>
              <div className="step-body">
                <span className="step-when">{when}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
