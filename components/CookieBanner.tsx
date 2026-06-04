'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem('cookie_consent', 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-text">
        Esta web utiliza cookies propias y de terceros para su correcto funcionamiento y para fines analíticos.
        Al hacer clic en Aceptar, aceptás el uso de estas tecnologías y el procesamiento de tus datos para estos propósitos.{' '}
        <a href="/politica-de-cookies" className="cookie-link">Más información</a>.
      </p>
      <div className="cookie-actions">
        <button className="btn btn-ghost-sm" onClick={reject}>Rechazar</button>
        <button className="btn btn-dark-sm" onClick={accept}>Aceptar</button>
      </div>
    </div>
  );
}
