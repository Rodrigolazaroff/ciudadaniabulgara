'use client';

import { useState } from 'react';
import { Check } from '@/lib/icons';

export function Form() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    apellido: '',
    mensaje: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la integración con backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
            {!submitted ? (
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
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+54..."
                  />
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

                <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%' }}>
                  Pedir mi diagnóstico gratis
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
