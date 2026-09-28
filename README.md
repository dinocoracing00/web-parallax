# Codipsia Milano — tema Shopify

Tema Online Store 2.0 hecho a medida para **Codipsia Milano** (joyería y accesorios).
Estilo lujo minimalista, en español, con efectos parallax.

## Estructura

```
layout/      theme.liquid, password.liquid
config/      ajustes globales del tema (colores, tipografías, parallax, redes)
sections/    secciones editables desde el editor de Shopify
snippets/    piezas reutilizables (tarjeta de producto, precio, iconos…)
templates/   plantillas JSON (portada, producto, colección, cesta…)
assets/      base.css y theme.js
locales/     textos en español
```

## Secciones de la portada

| Sección | Qué hace |
| --- | --- |
| Portada parallax | Imagen a pantalla completa con parallax y texto animado |
| Texto / cita | Frase de marca centrada |
| Colección destacada | Rejilla de productos de una colección |
| Banner parallax | Imagen grande con movimiento al hacer scroll |
| Lista de colecciones | Anillos, collares, pendientes… |
| Imagen con texto | Historia de la marca, con imagen flotante opcional |
| Ventajas | Hecho a mano, estuche regalo, devoluciones |
| Newsletter | Alta de suscriptores (se guardan como clientes en Shopify) |

## Cómo instalarlo en Shopify

**Opción A, conectar GitHub (recomendada):**
Shopify Admin → Tienda online → Temas → Añadir tema → Conectar desde GitHub →
elegir este repositorio y la rama. Cada cambio que se suba se sincroniza solo.

**Opción B, subir ZIP:** comprimir el contenido del repositorio (las carpetas
`layout`, `sections`… en la raíz del ZIP) y subirlo en Temas → Añadir tema → Subir archivo ZIP.

**Opción C, Shopify CLI:**

```bash
shopify theme dev --store tu-tienda.myshopify.com   # vista previa en local
shopify theme push                                  # subir a la tienda
```

## Después de instalar

1. Crea los menús `main-menu` (cabecera) y `footer` (pie) en Tienda online → Navegación.
2. En el editor del tema, sube las imágenes de la portada y elige la colección destacada.
3. Ajusta colores, tipografías e intensidad del parallax en Configuración del tema.
