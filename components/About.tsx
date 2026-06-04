'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function About() {
  const photo = '/images/rodrigo_lazaroff.png';
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setInView(r.top < vh * 0.82 && r.bottom > vh * 0.12);
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);


  return (
    <section ref={sectionRef} className={`section about-anim ${inView ? 'in-view' : ''}`} id="rodrigo">
      <div className="wrap">
        <h2 className="h2 arv a-down" style={{ marginBottom: 40, textAlign: 'center' }}>Gestione mi propio trámite. Cuatro años y mucha plata tirada hasta poder presentarlo.</h2>
      </div>
      <div className="wrap about-grid">
        <div className="about-media arv a-left">
          <div className="portrait">
            {photo ? (
              <Image src={photo} alt="Rodrigo Lazaroff, ciudadanía búlgara por descendencia" fill className="object-cover" />
            ) : (
              <div className="portrait-ph">
                <span className="cy-mark portrait-cy">България</span>
                <span className="portrait-mono">RL</span>
                <span className="portrait-cap">Rodrigo Lazaroff</span>
              </div>
            )}
          </div>
          <div className="seal">
            Atención
            <small>personal</small>
          </div>
        </div>

        <div className="about-copy">
          <p className="arv a-right d1 about-role">Rodrigo Lazaroff · Ciudadanía búlgara por descendencia</p>
          <p className="arv a-right d2" style={{ textAlign: 'justify' }}>
            Empecé a mediados de 2021. Como a tantos, la falta de perspectivas en el país me empujó a buscar una puerta en Europa. Mi abuelo había nacido en Bulgaria y terminó en Goya, Corrientes, como consecuencia de la Segunda Guerra Mundial. El derecho lo tenía en la sangre. El problema era el trámite.
          </p>
          <p className="arv a-right d2" style={{ textAlign: 'justify' }}>
            Encontré un documento de mi abuelo, pero era una foto en blanco y negro, no el original. No lo sabía. Apostillé, traduje, gasté. Recién con todo hecho me comunicaron que sin el original no servía nada.
          </p>
          <p className="arv a-right d3" style={{ textAlign: 'justify' }}>
            Fui por otro documento y tampoco servía. Pagué abogados para corregir la situación, llegué hasta la justicia, y el juez dijo que no. Estuve frustrado mucho tiempo.
          </p>
          <p className="arv a-right d3" style={{ textAlign: 'justify' }}>
            Hasta que apareció un tercer documento original de mi abuelo. Ese sí. Volví a empezar de cero: legalizaciones, apostillas, traducción, turno en la embajada, entrevista con la cónsul y los papeles camino a Bulgaria.
          </p>
          <p className="arv a-right d3" style={{ textAlign: 'justify' }}>
            Cada error lo aprendí pagándolo. Por eso armé un equipo que acompaña tu trámite desde el primer documento, para que no pierdas los años ni el dinero que perdí yo.
          </p>

          <a href="#contacto" className="btn btn-gold arv a-right d4" style={{ marginTop: 30 }}>
            Evaluar mi caso
          </a>
        </div>
      </div>
    </section>
  );
}
