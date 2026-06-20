/**
 * Ciudadanía Búlgara — endpoint para los formularios del sitio.
 *
 * Recibe un POST y agrega una fila en la hoja que corresponde según `tipo`:
 *   (sin tipo) / consulta → "consultas"
 *       A ID | B Fecha | C Nombre | D Apellido | E Email | F Teléfono | G Link_WhatsApp | H Mensaje
 *   descarga              → "descargas"
 *       A ID | B Fecha | C Email
 *   compra                → "compras"
 *       A ID | B Fecha | C Nombre | D Apellido | E Email | F Teléfono | G Link_WhatsApp | H Estado
 *
 * Una fila en "compras" significa que alguien INICIÓ la compra, no que pagó:
 * la confirmación del pago llega por Mercado Pago. Enviá el manual recién
 * cuando MP confirme, y marcá la columna Estado como "enviado".
 *
 * Ver README.md (misma carpeta) para los pasos de despliegue.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Evita filas pisadas si llegan dos envíos a la vez.
  lock.waitLock(30000);

  try {
    var p = (e && e.parameter) ? e.parameter : {};

    // Honeypot anti-spam: campo oculto que un humano nunca completa.
    if (p.website) {
      return _json({ ok: true, skipped: true });
    }

    var tipo = _clean(p.tipo);
    if (tipo === 'descarga') return _saveDescarga(p);
    if (tipo === 'compra') return _saveCompra(p);
    return _saveConsulta(p);
  } catch (err) {
    return _json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permite probar el deploy abriendo la URL en el navegador.
function doGet() {
  return _json({ ok: true, status: 'endpoint activo' });
}

/** Consulta del formulario de contacto → hoja "consultas". */
function _saveConsulta(p) {
  var sheet = _sheet('consultas');
  var id = _nextId(sheet);
  var nombre = _clean(p.nombre);
  var link = _waLink(_onlyDigits(p.wa), nombre, 'consulta');
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1, 1, 8).setValues([[
    id, _now(), nombre, _clean(p.apellido), _clean(p.email),
    _clean(p.telefono), '', _clean(p.mensaje)
  ]]);
  if (link) sheet.getRange(row, 7).setFormula(_hyperlink(link, 'Escribir por WhatsApp'));
  return _json({ ok: true, id: id });
}

/** Descarga del lead magnet (2 capítulos) → hoja "descargas". */
function _saveDescarga(p) {
  var sheet = _sheet('descargas');
  var id = _nextId(sheet);
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1, 1, 3).setValues([[ id, _now(), _clean(p.email) ]]);
  return _json({ ok: true, id: id });
}

/** Inicio de compra del manual → hoja "compras". Estado arranca en "pendiente". */
function _saveCompra(p) {
  var sheet = _sheet('compras');
  var id = _nextId(sheet);
  var nombre = _clean(p.nombre);
  // Link listo para avisar al comprador (con el saludo de compra) una vez enviado el manual.
  var link = _waLink(_onlyDigits(p.wa), nombre, 'compra');
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 1, 1, 8).setValues([[
    id, _now(), nombre, _clean(p.apellido), _clean(p.email),
    _clean(p.telefono), '', 'pendiente'
  ]]);
  if (link) sheet.getRange(row, 7).setFormula(_hyperlink(link, 'Avisar por WhatsApp'));
  return _json({ ok: true, id: id });
}

/** Devuelve la pestaña por nombre; si no existe, cae en la primera hoja. */
function _sheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  return sheet ? sheet : ss.getSheets()[0];
}

/** ID progresivo: máximo real de la columna A + 1 (robusto ante filas borradas). */
function _nextId(sheet) {
  var last = sheet.getLastRow();
  if (last < 2) return 1; // solo el encabezado
  var values = sheet.getRange(2, 1, last - 1, 1).getValues();
  var max = 0;
  for (var i = 0; i < values.length; i++) {
    var n = Number(values[i][0]);
    if (!isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

/** Link de WhatsApp con el mensaje personalizado según el contexto. */
function _waLink(digits, nombre, contexto) {
  if (!digits) return '';
  var saludo = nombre ? ('¡Hola ' + nombre + '! ') : '¡Hola! ';
  var texto;
  if (contexto === 'compra') {
    texto = saludo +
      'Soy Rodrigo de Ciudadanía Búlgara. Ya te envié el manual completo por mail, ' +
      'revisá tu casilla (mirá también el spam). ¡Gracias por tu compra!';
  } else {
    texto = saludo +
      'Gracias por contactarte con Ciudadanía Búlgara. ' +
      'Recibimos tu consulta y en breve te acompañamos con tu trámite. ' +
      '¿Cómo podemos ayudarte?';
  }
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(texto);
}

/** Fórmula HYPERLINK clickeable en la celda. */
function _hyperlink(url, label) {
  return '=HYPERLINK("' + url + '";"' + label + '")';
}

function _now() {
  return Utilities.formatDate(
    new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'
  );
}

function _clean(v) {
  return (v == null) ? '' : String(v).trim();
}

function _onlyDigits(v) {
  return (v == null) ? '' : String(v).replace(/\D/g, '');
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
