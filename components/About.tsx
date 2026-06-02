'use client';

import Image from 'next/image';
import { Check, Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function About() {
  // Cuando tengas la foto, dejala en /public/images/rodrigo.jpg y poné:
  // const photo = '/images/rodrigo.jpg';
  const photo: string | null = null;

  const creds = [
    ['150+', 'legajos presentados'],
    ['8 años', 'especializado en Bulgaria'],
    ['95%', 'de viabilidad confirmada'],
  ] as const;

  return (
    <section className="section" id="rodrigo">
      <div className="wrap about-grid">
        <div className="about-media reveal">
          <div className="portrait">
            {photo ? (
              <Image src={photo} alt="Rodrigo Rojas, especialista en ciudadanía búlgara" fill className="object-cover" />
            ) : (
              <div className="portrait-ph">
                <span className="cy-mark portrait-cy">България</span>
                <span className="portrait-mono">RR</span>
                <span className="portrait-cap">Rodrigo Rojas</span>
              </div>
            )}
          </div>
          <div className="seal">
            Atención
            <small>personal</small>
          </div>
        </div>

        <div className="about-copy">
          <h2 className="h2 reveal">Detrás de cada legajo hay una persona, no un call center.</h2>
          <p className="reveal d1 about-role">Rodrigo Rojas · Especialista en ciudadanía búlgara por descendencia</p>
          <p className="reveal d2">
            Hace ocho años que me dedico exclusivamente a la vía búlgara. Tramité más de 150 expedientes y aprendí que el detalle que parece menor, una fecha que no coincide, una traducción imprecisa, es lo que decide el resultado.
          </p>
          <p className="reveal d3">
            Por eso llevo cada caso de principio a fin: vos hablás siempre con la misma persona, no pasás de mano en mano. Si tu caso no es viable, te lo digo en la primera charla.
          </p>

          <div className="creds reveal d3">
            {creds.map(([n, label], k) => (
              <div className="cred" key={k}>
                <span className="cred-n">{n}</span>
                <span className="cred-l">{label}</span>
              </div>
            ))}
          </div>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-gold reveal d4" style={{ marginTop: 30 }}>
            <Whatsapp size={18} /> Hablar con Rodrigo
          </a>
        </div>
      </div>
    </section>
  );
}
