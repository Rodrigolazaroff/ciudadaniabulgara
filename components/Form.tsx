'use client';

import { useState } from 'react';
import { Check } from '@/lib/icons';

// Países habilitados. `dial` es lo que se muestra; `wa` es el prefijo
// (solo dígitos) con el que se arma el link de wa.me.
const COUNTRIES = [
  // AR: el 9 de celular se inserta solo (la gente no lo escribe).
  // CL/UY/PY: la persona ya escribe su 9 inicial, así que el prefijo no lo lleva.
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', dial: '+54', wa: '549' },
  { code: 'CL', flag: '🇨🇱', name: 'Chile', dial: '+56', wa: '56' },
  { code: 'UY', flag: '🇺🇾', name: 'Uruguay', dial: '+598', wa: '598' },
  { code: 'PY', flag: '🇵🇾', name: 'Paraguay', dial: '+595', wa: '595' },
] as const;

const ENDPOINT = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;

type Status = 'idle' | 'sending' | 'ok' | 'error';

export function Form() {
  const [status, setStatus] = useState<Status>('idle');
  const [pais, setPais] = useState<string>(COUNTRIES[0].code);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
    website: '', // honeypot — debe quedar vacío
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    const country = COUNTRIES.find(c => c.code === pais) ?? COUNTRIES[0];
    const localDigits = formData.telefono.replace(/\D/g, '');

    const payload = new URLSearchParams({
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      // Teléfono legible para la columna F.
      telefono: localDigits ? `${country.dial} ${formData.telefono}`.trim() : '',
      // Número para el link de WhatsApp (solo dígitos, con prefijo wa.me).
      wa: localDigits ? `${country.wa}${localDigits}` : '',
      mensaje: formData.mensaje,
      website: formData.website,
    });

    setStatus('sending');

    try {
      if (!ENDPOINT) throw new Error('Falta NEXT_PUBLIC_SHEET_ENDPOINT');
      // form-urlencoded => request "simple", sin preflight CORS con Apps Script.
      const res = await fetch(ENDPOINT, { method: 'POST', body: payload });
      const data = await res.json().catch(() => null);
      // Solo es éxito si el script confirma que guardó la fila.
      if (!data || data.ok !== true) {
        throw new Error('El script no confirmó el guardado: ' + JSON.stringify(data));
      }
      setStatus('ok');
      setFormData({ nombre: '', apellido: '', email: '', telefono: '', mensaje: '', website: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('Error al enviar consulta:', err);
      setStatus('error');
    }
  };

  return (
    <section className="section cream" id="contacto">
      <div className="wrap">
        <div className="form-grid">
          <div className="form-side">
            <span className="kicker reveal">
              Tu caso <span className="cy">· Случай</span>
            </span>
            <h2 className="h2 reveal d1">Contanos tu situación.</h2>
            <p className="reveal d2">Completá el formulario y nuestro equipo se contacta con vos para evaluar tu caso y acompañarte en cada etapa del trámite.</p>
            <p className="reveal d3" style={{ marginTop: 12, fontStyle: 'italic', color: 'var(--ink-soft)' }}>¿Arrancamos?</p>
          </div>

          <div className="form-card reveal d1">
            {status !== 'ok' ? (
              <form onSubmit={handleSubmit}>
                <div className="field two">
                  <div>
                    <label htmlFor="nombre">Nombre <span className="req">*</span></label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellido">Apellido <span className="req">*</span></label>
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      required
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="email">Email <span className="req">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="field">
                  <label htmlFor="telefono">Teléfono / WhatsApp</label>
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
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="11 2345 6789"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="mensaje">Contanos tu situación</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="¿Qué sabes de tus antepasados búlgaros?"
                  ></textarea>
                </div>

                {/* Honeypot: oculto a usuarios, lo completan solo los bots. */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                {status === 'error' && (
                  <p className="form-error" role="alert">
                    No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-gold btn-lg"
                  style={{ width: '100%' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando…' : 'Pedir mi diagnóstico gratis'}
                </button>
              </form>
            ) : (
              <div className="form-ok">
                <div className="check">
                  <Check size={32} />
                </div>
                <h3>¡Consulta recibida!</h3>
                <p>Nos pondremos en contacto en las próximas 24 horas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
