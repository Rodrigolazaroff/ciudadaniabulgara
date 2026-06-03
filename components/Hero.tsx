'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Whatsapp, Arrow, ArrowL, Check, Clock } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function Hero() {
  // 4 slots del carousel
  const imgs: (string | null)[] = [
    '/images/Generated Image June 01, 2026 - 10_02PM.jpg',
    '/images/Generated Image June 01, 2026 - 9_33PM.jpg',
    '/images/Generated Image June 01, 2026 - 9_35PM.jpg',
    '/images/Generated Image June 01, 2026 - 9_36PM.jpg',
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % imgs.length), 5000);
    return () => clearInterval(t);
  }, []);

  const points = [
    'Diagnóstico de viabilidad sin compromiso',
    'Gestionamos las actas',
    'Apostillado, traducción y turno consular',
  ];

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg">
        {imgs.map((src, k) => (
          <div key={k} className={`hero-bg-slide ${k === i ? 'active' : ''}`}>
            {src ? (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Image
                  src={src}
                  alt={`Foto ${k + 1}`}
                  fill
                  className="object-cover"
                  priority={k === 0}
                />
              </div>
            ) : (
              <div className="ph">
                <span className="ph-lab">Foto {k + 1} · fondo del hero</span>
              </div>
            )}
          </div>
        ))}
        <div className="hero-bg-scrim"></div>
      </div>

      <div className="hero-arrows">
        <button
          className="hero-arrow"
          onClick={() => setI(p => (p - 1 + imgs.length) % imgs.length)}
          aria-label="Imagen anterior"
        >
          <ArrowL size={22} />
        </button>
        <button
          className="hero-arrow"
          onClick={() => setI(p => (p + 1) % imgs.length)}
          aria-label="Imagen siguiente"
        >
          <Arrow size={22} />
        </button>
      </div>

      <div className="hero-dots">
        {imgs.map((_, k) => (
          <button
            key={k}
            className={k === i ? 'on' : ''}
            onClick={() => setI(k)}
            aria-label={`Imagen ${k + 1}`}
          ></button>
        ))}
      </div>

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="kicker reveal">
            Ciudadanía por descendencia <span className="cy">· Гражданство</span>
          </span>
          <h1 className="reveal d1">
            Recuperá la herencia de tu familia búlgara y obtené tu <span className="hl">pasaporte europeo</span>.
          </h1>
          <p className="lead reveal d2">
            Recuperá tu ciudadanía búlgara sin moverte de Argentina. Nos encargamos de todo: desde las actas hasta el turno consular, con acompañamiento en cada paso.
          </p>
          <ul className="hero-points reveal d3">
            {points.map((p, k) => (
              <li key={k}>
                <span className="tick">
                  <Check size={14} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="hero-cta-row reveal d3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
              <Whatsapp size={22} /> Consultar por WhatsApp
            </a>
            <a href="#contacto" className="btn btn-ghost btn-lg hero-ghost">Evaluar mi caso</a>
          </div>
        </div>
      </div>
    </section>
  );
}
