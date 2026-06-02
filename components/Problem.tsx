'use client';

import { Doc, Clock, Language, Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function Problem() {
  const risks = [
    [Doc, 'Un solo error rechaza todo el legajo', 'Una traducción mal hecha o un dato que no coincide entre actas puede frenar meses de trámite.'],
    [Clock, 'Los plazos no perdonan', 'Un documento presentado fuera de término te obliga a empezar de cero. El timing decide el resultado.'],
    [Language, 'La normativa está en búlgaro', 'Interpretar la ley de ciudadanía sin ayuda es lento, agotador y fácil de equivocar.'],
  ] as const;

  return (
    <section className="section" id="descendencia">
      <div className="wrap problem-grid">
        <div className="problem-copy">
          <h2 className="h2 reveal">
            Bulgaria tiene una de las vías por descendencia más sólidas de Europa. También una de las más burocráticas.
          </h2>
          <p className="lead reveal d1" style={{ marginTop: 24 }}>
            La sangre búlgara te da el derecho. El sistema lo vuelve un laberinto de actas, apostillas y plazos consulares.
          </p>
          <p className="reveal d2" style={{ color: 'var(--ink-soft)', marginTop: 16 }}>
            No tenés que descifrar leyes extranjeras ni perder meses persiguiendo registros.{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>De eso nos ocupamos nosotros.</strong>
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark reveal d3"
            style={{ marginTop: 30 }}
          >
            <Whatsapp size={18} /> Consultar mi caso
          </a>
        </div>

        <ul className="risk-panel reveal d1">
          {risks.map(([Icon, title, desc], k) => (
            <li className="risk" key={k}>
              <span className="risk-ic">
                <Icon size={22} />
              </span>
              <div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
