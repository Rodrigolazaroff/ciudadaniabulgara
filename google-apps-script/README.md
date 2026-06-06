# Integración del formulario con Google Sheets

El formulario de contacto del sitio envía cada consulta a una hoja de cálculo
de Google mediante un **Google Apps Script** desplegado como *App web*.

## 1. Preparar la hoja

Dejá las columnas en este orden exacto (fila 1 = encabezados):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID_Consulta | Fecha | Nombre | Apellido | Email | Teléfono | Link_WhatsApp | Mensaje |

> Borrá la columna "Email" duplicada para que quede así.
> La pestaña debe llamarse **`consultas_web`** (o cambiá `SHEET_NAME` en `Code.gs`).

## 2. Crear el script

1. En la hoja: **Extensiones → Apps Script**.
2. Borrá el contenido de `Code.gs` y pegá el de [`Code.gs`](./Code.gs).
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

Si editás `Code.gs`, **Implementar → Gestionar implementaciones → editar
(lápiz) → Versión: Nueva → Implementar**. La URL se mantiene.
