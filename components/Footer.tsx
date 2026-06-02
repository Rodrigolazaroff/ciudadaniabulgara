'use client';

import Image from 'next/image';
import { Whatsapp, Instagram } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a href="#inicio" className="footer-logo" aria-label="Ciudadanía Búlgara OK, inicio">
            <Image
              src="/images/logo-light.png"
              alt="Ciudadanía Búlgara OK"
              width={624}
              height={500}
              className="footer-logo-img"
            />
          </a>
          <p>
            Gestionamos tu ciudadanía búlgara por descendencia de punta a punta: actas, apostillado, traducción
            oficial y turno consular. Acompañamiento personal de Rodrigo para Argentina y países limítrofes.
          </p>
        </div>

        <div>
          <h5>Navegación</h5>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#descendencia">El trámite</a></li>
            <li><a href="#proceso">El proceso</a></li>
            <li><a href="#rodrigo">Quién soy</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h5>Hablemos</h5>
          <ul>
            <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp · +54 9 3777 65-9236</a></li>
            <li><a href="https://instagram.com/ciudadaniabulgaraok" target="_blank" rel="noopener noreferrer">@ciudadaniabulgaraok</a></li>
          </ul>
          <div className="footer-social">
            <a href="https://instagram.com/ciudadaniabulgaraok" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Whatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <p className="disclaimer">
          Ciudadanía Búlgara OK es un servicio privado de gestión y asesoramiento. No representa al gobierno de
          Bulgaria ni a sus organismos consulares oficiales.
        </p>
      </div>

      <div className="wrap footer-bottom">
        <p>&copy; {year} Ciudadanía Búlgara OK. Todos los derechos reservados.</p>
        <p>Argentina · atención por WhatsApp</p>
      </div>
    </footer>
  );
}
