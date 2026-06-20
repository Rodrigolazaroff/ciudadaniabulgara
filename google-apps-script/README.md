# Integración de los formularios con Google Sheets

El sitio envía los datos de **tres formularios** a una misma hoja de cálculo de
Google mediante un **Google Apps Script** desplegado como *App web*. El script
rutea cada envío a una pestaña distinta según el campo `tipo`:

| Formulario | `tipo` | Pestaña |
|---|---|---|
| Contacto | _(vacío)_ | `consultas` |
| Descargar 2 capítulos (manual) | `descarga` | `descargas` |
| Comprar el manual | `compra` | `compras` |

## 1. Preparar las hojas

En el mismo archivo, creá tres pestañas con estos encabezados en la **fila 1**:

**`consultas`**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Fecha | Nombre | Apellido | Email | Teléfono | Link_WhatsApp | Mensaje |

**`descargas`**

| A | B | C |
|---|---|---|
| ID | Fecha | Email |

**`compras`**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Fecha | Nombre | Apellido | Email | Teléfono | Link_WhatsApp | Estado |

> Los nombres de las pestañas deben coincidir exactamente con los de la tabla
> (`consultas`, `descargas`, `compras`). El nombre del archivo es libre.
> En `compras`, `Estado` arranca en **"pendiente"**; cambialo a **"enviado"**
> cuando mandes el manual. La columna `Link_WhatsApp` se llena sola con un
> mensaje listo para avisarle al comprador.

## 2. Crear / actualizar el script

1. En la hoja: **Extensiones → Apps Script**.
2. Reemplazá el contenido de `Code.gs` por el de [`Code.gs`](./Code.gs).
3. Guardá (Ctrl+S).

## 3. Desplegar como App web

1. Botón **Implementar → Nueva implementación**.
2. Tipo (ícono engranaje): **App web**.
3. Configuración:
   - **Ejecutar como:** *Yo* (tu cuenta).
   - **Quién tiene acceso:** *Cualquier usuario*.
4. **Implementar** → autorizá los permisos (te pedirá permiso para editar la hoja).
5. Copiá la **URL de la app web** (termina en `/exec`).

> Probala pegándola en el navegador: debe responder
> `{"ok":true,"status":"endpoint activo"}`.

## 4. Conectar el sitio

En la raíz del proyecto, en `.env.local`:

```
NEXT_PUBLIC_SHEET_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
```

Reiniciá el dev server. Listo.

## Re-despliegues

Si editás `Code.gs` (por ejemplo, al sumar las pestañas del manual),
**Implementar → Gestionar implementaciones → editar (lápiz) → Versión: Nueva →
Implementar**. La URL se mantiene.

## Importante (operación de las compras)

Una fila en `compras` significa que alguien **inició** la compra, **no** que
pagó. La confirmación del pago llega por **Mercado Pago** (mail + app). Enviá el
manual completo recién cuando MP confirme, cruzando por nombre/email con la fila
de `compras`, y marcá `Estado = enviado`.
