/**
 * Ciudadanía Búlgara — endpoint para el formulario de contacto.
 *
 * Recibe un POST del formulario del sitio y agrega una fila en la hoja
 * "consultas_web". Genera el ID progresivo y el link de WhatsApp.
 *
 * Columnas de la hoja (en este orden):
 *   A ID_Consulta | B Fecha | C Nombre | D Apellido | E Email
 *   F Teléfono | G Link_WhatsApp | H Mensaje
 *
 * Ver README.md (misma carpeta) para los pasos de despliegue.
 */

// Nombre exacto de la pestaña dentro del archivo. Cambialo si tu pestaña
// no se llama "consultas_web".
var SHEET_NAME = 'consultas_web';

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

    var nombre = _clean(p.nombre);
    var apellido = _clean(p.apellido);
    var email = _clean(p.email);
    var telefono = _clean(p.telefono);   // visible, ej "+54 11 2345 6789"
    var waDigits = _onlyDigits(p.wa);    // para el link, ej "5491123456789"
    var mensaje = _clean(p.mensaje);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (!sheet) sheet = ss.getSheets()[0];

    var id = _nextId(sheet);
    var fecha = _now();
    var link = _waLink(waDigits, nombre);

    // A..H en una sola escritura. La columna G (Link_WhatsApp) se escribe
    // como fórmula HYPERLINK para que sea clickeable en la celda.
    var row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, 8).setValues([[
      id, fecha, nombre, apellido, email, telefono, '', mensaje
    ]]);
    if (link) {
      sheet.getRange(row, 7).setFormula(
        '=HYPERLINK("' + link + '";"Escribir por WhatsApp")'
      );
    }

    return _json({ ok: true, id: id });
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

/** Link de WhatsApp con el mensaje personalizado (nombre embebido). */
function _waLink(digits, nombre) {
  if (!digits) return '';
  var saludo = nombre ? ('¡Hola ' + nombre + '! ') : '¡Hola! ';
  var texto = saludo +
    'Gracias por contactarte con Ciudadanía Búlgara. ' +
    'Recibimos tu consulta y en breve te acompañamos con tu trámite. ' +
    '¿Cómo podemos ayudarte?';
  return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(texto);
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
