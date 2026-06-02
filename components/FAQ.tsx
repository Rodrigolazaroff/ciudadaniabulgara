'use client';

import { useState } from 'react';
import { Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    ['¿Cuánto cuesta la gestión?', 'Depende de la complejidad de tu árbol genealógico y de cuántas actas haya que conseguir. La consulta inicial y el diagnóstico de viabilidad no tienen costo.'],
    ['¿Cuánto tiempo tarda?', 'Entre 6 y 12 meses desde el diagnóstico hasta la ciudadanía, según la disponibilidad de los documentos en los registros.'],
    ['¿Necesito viajar a Bulgaria?', 'No es obligatorio. Gestionamos todo por correspondencia y presentación consular desde Argentina.'],
    ['¿Y si no encuentran a mis antepasados?', 'Si la vía no es viable, te lo decimos en la consulta inicial, sin cobrarte nada. No te hacemos arrancar un trámite que no va a prosperar.'],
    ['¿Sirve para mis hijos también?', 'Sí. Una vez reconocida tu ciudadanía, podés transmitirla a tus descendientes. Lo contemplamos desde el armado del legajo.'],
  ];

  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <h2 className="h2 reveal">Lo que querés saber antes de empezar.</h2>
          <p className="reveal d1">¿Tenés una duda puntual sobre tu caso? Escribime y te respondo el mismo día.</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-ghost reveal d2">
            <Whatsapp size={18} /> Preguntar por WhatsApp
          </a>
        </div>

        <div className="faq-list">
          {faqs.map((faq, k) => (
            <div key={k} className={`faq-item ${open === k ? 'open' : ''}`}>
              <button
                className="faq-q"
                onClick={() => setOpen(open === k ? null : k)}
                aria-expanded={open === k}
              >
                {faq[0]}
                <span className="pm" aria-hidden="true">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === k ? 500 : 0 }}>
                <div className="faq-a-inner">{faq[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
