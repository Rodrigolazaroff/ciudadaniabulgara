'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Check, Download, Close } from '@/lib/icons';
import {
  MANUAL_FREE_URL,
  MANUAL_MP_URL,
  MANUAL_PRICE,
  MANUAL_PRICE_OLD,
  MANUAL_DISCOUNT,
  COUNTRIES,
} from '@/lib/constants';

const ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;

const INCLUDES = [
  'El mapa completo del trámite: la secuencia entera, para no avanzar salteado (el error que te hace pagar dos veces).',
  'El artículo 15 y el documento del ascendiente búlgaro: el punto crítico del que depende todo el caso.',
  'Los costos reales del trámite, con un caso práctico: tasas de embajada, traducción y gastos administrativos.',
  'Legalización, Apostilla de La Haya y validez de cada documento: qué legalizar, qué apostillar y cuáles vencen.',
  'El turno consular y la entrevista: cómo se pide y qué preguntas pueden hacerte.',
  'Checklist de control y los errores más frecuentes, para llegar con la carpeta bien armada.',
];

const EMPTY = { nombre: '', apellido: '', email: '', telefono: '', website: '' };
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type Modal = null | 'free' | 'buy';

export function Manual() {
  const [modal, setModal] = useState<Modal>(null);
  const [pais, setPais] = useState<string>(COUNTRIES[0].code);
  const [data, setData] = useState(EMPTY);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  // Mientras el modal está abierto: bloquea el scroll de fondo y cierra con Escape.
  useEffect(() => {
    if (!modal) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal]);

  const open = (m: Exclude<Modal, null>) => {
    setData(EMPTY);
    setPais(COUNTRIES[0].code);
    setError('');
    setDone(false);
    setModal(m);
  };
  const close = () => setModal(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación. El correo es obligatorio en ambas ventanas; nombre y apellido
    // solo en la compra.
    if (!isEmail(data.email)) {
      setError(
        modal === 'free'
          ? 'Ingresá un correo válido.'
          : 'Revisá los datos: necesitamos tu nombre, apellido y un correo válido.'
      );
      return;
    }
    if (modal === 'buy' && (!data.nombre.trim() || !data.apellido.trim())) {
      setError('Revisá los datos: necesitamos tu nombre, apellido y un correo válido.');
      return;
    }

    // Abrimos el destino YA, dentro del gesto del click, para que el navegador no
    // bloquee la pestaña nueva. El guardado en el Sheet es best-effort: si falla
    // (o no hay endpoint configurado), el usuario igual completa su acción.
    const target = modal === 'free' ? MANUAL_FREE_URL : MANUAL_MP_URL;
    window.open(target, '_blank', 'noopener,noreferrer');

    if (ENDPOINT && !data.website) {
      const country = COUNTRIES.find(c => c.code === pais) ?? COUNTRIES[0];
      const localDigits = data.telefono.replace(/\D/g, '');
      const payload =
        modal === 'free'
          ? new URLSearchParams({ tipo: 'descarga', email: data.email, website: data.website })
          : new URLSearchParams({
              tipo: 'compra',
              nombre: data.nombre,
              apellido: data.apellido,
              email: data.email,
              telefono: localDigits ? `${country.dial} ${data.telefono}`.trim() : '',
              wa: localDigits ? `${country.wa}${localDigits}` : '',
              website: data.website,
            });
      fetch(ENDPOINT, { method: 'POST', body: payload }).catch(() => {});
    }

    setError('');
    setDone(true);
  };

  return (
    <section className="section cream" id="manual">
      <div className="wrap manual-grid">
        <div className="manual-cover-wrap reveal">
          <div className="manual-cover">
            <Image
              src="/images/manual.jpg"
              alt="Manual de Ciudadanía Búlgara por Descendencia"
              fill
              sizes="(max-width: 900px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="manual-copy">
          <span className="kicker reveal">
            El manual <span className="cy">· Наръчник</span>
          </span>
          <h2 className="h2 reveal d1">
            Todo el trámite, claro y completo, antes de dar el primer paso.
          </h2>
          <p className="lead reveal d2">
            Reunimos en este manual lo que normalmente se aprende a los golpes: el mapa completo del
            trámite paso a paso, los costos reales, qué documento sirve y cuál te hace perder años, y
            cómo llegar preparado al consulado. Para que sepas en qué te estás metiendo antes de
            empezar, y no a ciegas.
          </p>

          <ul className="manual-includes reveal d2">
            {INCLUDES.map((t, i) => (
              <li key={i}>
                <span className="manual-check">
                  <Check size={16} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="manual-price reveal d3">
            <span className="manual-price-old">{MANUAL_PRICE_OLD}</span>
            <span className="manual-price-now">{MANUAL_PRICE}</span>
            <span className="manual-price-off">{MANUAL_DISCOUNT}</span>
          </div>

          <p className="manual-pitch reveal d3">
            Descargá gratis los primeros 2 capítulos. El manual completo —los 11 capítulos— tiene un
            precio de {MANUAL_PRICE} y te lo enviamos apenas se confirma el pago.
          </p>

          <div className="manual-cta reveal d3">
            <button type="button" className="btn btn-ghost" onClick={() => open('free')}>
              <Download size={18} /> Descargar 2 capítulos gratis
            </button>
            <button type="button" className="btn btn-gold" onClick={() => open('buy')}>
              Comprar el manual completo
            </button>
          </div>

          <p className="manual-cross reveal d3">
            ¿Preferís no hacerlo solo? <a href="#contacto">Te acompañamos en todo el trámite.</a>
          </p>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={close}>
          <div
            className="modal-card"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button className="modal-close" onClick={close} aria-label="Cerrar">
              <Close size={20} />
            </button>

            {done ? (
              <div className="form-ok">
                <div className="check">
                  <Check size={32} />
                </div>
                {modal === 'free' ? (
                  <>
                    <h3>¡Listo!</h3>
                    <p>
                      Los 2 capítulos se están descargando en otra pestaña. Si no los ves, habilitá
                      los pop-ups.
                    </p>
                  </>
                ) : (
                  <>
                    <h3>Te esperamos en Mercado Pago</h3>
                    <p>
                      Mercado Pago se abrió en otra pestaña para que completes el pago. Apenas se
                      confirme, te enviamos el manual completo a la brevedad (puede demorar hasta
                      24 hs).
                    </p>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="modal-title">
                  {modal === 'free' ? 'Llevate 2 capítulos gratis' : 'Comprar el manual completo'}
                </h3>
                <p className="modal-text">
                  {modal === 'free'
                    ? 'Ingresá tu correo y descargá los 2 capítulos.'
                    : 'Completá tus datos para pagar con Mercado Pago. Apenas se confirma el pago, te enviamos el manual a tu correo.'}
                </p>

                {modal === 'buy' && (
                  <div className="field two">
                    <div>
                      <label htmlFor="m-nombre">
                        Nombre <span className="req">*</span>
                      </label>
                      <input
                        id="m-nombre"
                        name="nombre"
                        value={data.nombre}
                        onChange={change}
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="m-apellido">
                        Apellido <span className="req">*</span>
                      </label>
                      <input
                        id="m-apellido"
                        name="apellido"
                        value={data.apellido}
                        onChange={change}
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="m-email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="m-email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={change}
                    placeholder="tu@email.com"
                  />
                </div>

                {modal === 'buy' && (
                  <div className="field">
                    <label htmlFor="m-tel">Teléfono / WhatsApp</label>
                    <div className="phone-row">
                      <select
                        className="phone-cc"
                        aria-label="País"
                        value={pais}
                        onChange={e => setPais(e.target.value)}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.code} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        id="m-tel"
                        name="telefono"
                        type="tel"
                        value={data.telefono}
                        onChange={change}
                        placeholder="11 2345 6789"
                      />
                    </div>
                  </div>
                )}

                {/* Honeypot: oculto a usuarios, lo completan solo los bots. */}
                <input
                  type="text"
                  name="website"
                  value={data.website}
                  onChange={change}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%' }}>
                  {modal === 'free' ? 'Descargar' : 'Ir a pagar con Mercado Pago'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
