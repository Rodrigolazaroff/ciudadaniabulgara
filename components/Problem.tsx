'use client';

import { Globe, GradCap, Plane } from '@/lib/icons';

export function Problem() {
  const risks = [
    [Globe, 'Vivir y trabajar en 27 países sin permiso', 'Con ciudadanía búlgara sos ciudadano europeo. Podés instalarte, trabajar o emprender en cualquier país de la Unión Europea.'],
    [GradCap, 'Estudiar en universidades europeas con arancel local', 'Accedés a las mejores universidades de Europa pagando lo mismo que un ciudadano del país, sin visa de estudiante.'],
    [Plane, 'Viajar sin visa a más de 180 destinos', 'El pasaporte búlgaro te abre fronteras en toda Europa, América y Asia sin trámites consulares previos.'],
  ] as const;

  return (
    <section className="section" id="descendencia">
      <div className="wrap problem-grid">
        <div className="problem-copy">
          <h2 className="h2 reveal">
            Tus abuelos eran búlgaros. Vos podés ser europeo.
          </h2>
          <p className="lead reveal d1" style={{ marginTop: 24 }}>
            Miles de argentinos con sangre búlgara ya tienen su pasaporte europeo. La diferencia es haberlo encarado bien desde el principio con un equipo de profesionales.
          </p>
          <a
            href="#contacto"
            className="btn btn-dark reveal d3"
            style={{ marginTop: 30 }}
          >
            Evaluar mi caso
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
