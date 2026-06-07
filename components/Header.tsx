'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['El trámite', '#descendencia'],
    ['El proceso', '#proceso'],
    ['Quién soy', '#rodrigo'],
    ['Contacto', '#contacto'],
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap header-inner">
          <a href="#inicio" className="logo" aria-label="Ciudadanía Búlgara, inicio">
            <Image
              src="/images/logo-mark.png"
              alt=""
              width={544}
              height={431}
              className="brand-mark"
              priority
            />
            <span>Ciudadanía Búlgara</span>
          </a>
          <nav className="nav">
            {links.map(([text, href]) => (
              <a key={href} href={href}>{text}</a>
            ))}
          </nav>
          <div className="header-cta">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <Whatsapp size={18} /> Iniciar Consulta
            </a>
            <button
              className="burger"
              aria-label="Menú"
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        {links.map(([text, href]) => (
          <a key={href} href={href}>{text}</a>
        ))}
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
          <Whatsapp size={20} /> Consultar por WhatsApp
        </a>
      </div>
    </>
  );
}
