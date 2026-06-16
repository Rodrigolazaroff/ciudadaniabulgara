'use client';


export function Process() {
  const steps = [
    ['Consulta y diagnóstico', 'Analizamos tu árbol genealógico y confirmamos si la vía por descendencia es viable.', ''],
    ['Reunión de documentación', 'Una vez confirmada la viabilidad, te guiamos para reunir cada requisito.', ''],
    ['Apostillado y traducción oficial', 'Gestionamos la apostilla y coordinamos la traducción oficial de cada documento según la norma búlgara, sin inconsistencias.', ''],
    ['Presentación consular', 'Armamos el legajo y te preparamos para la presentación. Seguimiento personal hasta la resolución.', ''],
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
            Nuestro equipo te acompaña en cada etapa del trámite con un método claro y ordenado, asegurando que el proceso esté alineado a la normativa vigente en todo momento.
          </p>
          <a
            href="#contacto"
            className="btn btn-gold reveal d3"
            style={{ marginTop: 28 }}
          >
            Evaluar mi caso
          </a>
        </div>

        <ol className="steps">
          {steps.map(([title, desc, when], k) => (
            <li className={`step reveal d${k + 1}`} key={k}>
              <span className="dot">{k + 1}</span>
              <div className="step-body">
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
