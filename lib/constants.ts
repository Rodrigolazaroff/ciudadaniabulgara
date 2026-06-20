export const WA_LINK = 'https://wa.me/5493777659236?text=Hola%20Rodrigo,%20quiero%20informacion%20para%20gestionar%20la%20ciudadania%20bulgara.';

// ── Manual ───────────────────────────────────────────────────────────────
// Links del producto digital. El PDF COMPLETO no se referencia acá: se entrega
// a mano tras confirmar el pago. Solo viven el PDF gratis (2 capítulos) y el
// link de pago de Mercado Pago.
export const MANUAL_FREE_URL =
  'https://drive.google.com/file/d/1vc8uYTpRG_ytfD4gbpMeaB2LV_ozuN6u/view'; // Drive, abre el visor del PDF
export const MANUAL_MP_URL = 'https://mpago.la/1NVaN56'; // Mercado Pago, link de pago ($24.999)
export const MANUAL_PRICE = '$24.999';
export const MANUAL_PRICE_OLD = '$49.999';
export const MANUAL_DISCOUNT = '50% OFF';
// Futuro (Paraguay/exterior): export const MANUAL_PAYPAL_URL = '...';

// ── Países habilitados ─────────────────────────────────────────────────────
// `dial` es lo que se muestra; `wa` es el prefijo (solo dígitos) con el que se
// arma el link de wa.me. AR: el 9 de celular se inserta solo (la gente no lo
// escribe). CL/UY/PY: la persona ya escribe su 9 inicial, así que el prefijo no
// lo lleva. Lo usan el formulario de contacto y la ventana de compra del manual.
export const COUNTRIES = [
  { code: 'AR', flag: '🇦🇷', name: 'Argentina', dial: '+54', wa: '549' },
  { code: 'CL', flag: '🇨🇱', name: 'Chile', dial: '+56', wa: '56' },
  { code: 'UY', flag: '🇺🇾', name: 'Uruguay', dial: '+598', wa: '598' },
  { code: 'PY', flag: '🇵🇾', name: 'Paraguay', dial: '+595', wa: '595' },
] as const;
