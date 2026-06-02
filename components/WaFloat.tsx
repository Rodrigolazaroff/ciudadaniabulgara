'use client';

import { useState } from 'react';
import { Whatsapp } from '@/lib/icons';
import { WA_LINK } from '@/lib/constants';

export function WaFloat() {
  const [showTip, setShowTip] = useState(false);

  return (
    <>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
      >
        <Whatsapp size={28} />
      </a>
      <div className={`wa-tip ${showTip ? 'show' : ''}`}>Consultá por WhatsApp</div>
    </>
  );
}
