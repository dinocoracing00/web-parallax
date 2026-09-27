# Amara Zafira

Tienda online de moda femenina urbana y elegante, hecha con **Next.js 16 (App Router)**, **TypeScript** y
**Tailwind CSS 4**. Lista para desplegar en Vercel.

## Ver la web en tu ordenador

Necesitas [Node.js](https://nodejs.org) 22.18 o superior (versión LTS recomendada).

```bash
cd amara-zafira
npm install
npm run dev
```

Abre <http://localhost:3000>. Los cambios que hagas en el código se ven al instante.

Para probar la versión de producción, igual que en Vercel:

```bash
npm run build
npm start
```

## Qué incluye

| Página | Ruta |
|---|---|
| Inicio (hero, categorías, novedades, editorial, newsletter) | `/` |
| Colecciones con filtros, ordenación y vista 2/4 columnas | `/coleccion/[categoria]`, `/coleccion/novedades`, `/coleccion/rebajas`, `/coleccion/todo` |
| Ficha de producto (galería, color, talla, guía de tallas, completa el look) | `/producto/[slug]` |
| Cesta lateral y página de cesta | `/cesta` |
| Checkout de demostración y confirmación | `/checkout`, `/checkout/confirmacion` |
| Buscador con resultados en directo | Icono de lupa y `/buscar?q=` |
| Favoritos | `/favoritos` |
| Sobre nosotros, Contacto, FAQ, Guía de tallas | `/sobre-nosotros`, `/contacto`, `/faq`, `/guia-de-tallas` |
| Legales para España | `/legal/aviso-legal`, `/legal/privacidad`, `/legal/cookies`, `/legal/condiciones-de-venta`, `/legal/envios-y-devoluciones` |

- La cesta y los favoritos se guardan en el navegador (localStorage).
- El código `BIENVENIDA10` (el que da la newsletter) aplica un 10 % de descuento en la cesta.
- Cada página tiene su title, meta description y Open Graph. Hay `sitemap.xml` y `robots.txt` automáticos.
- Banner de cookies con aceptar, rechazar y configurar. Se puede reabrir desde el pie de página.

## Estructura

```
app/            Páginas (una carpeta por ruta)
components/     Piezas reutilizables: cabecera, tarjeta de producto, cesta, filtros…
data/
  products.ts   Catálogo (24 productos)
  categories.ts Categorías
  site-images.ts Inventario de imágenes de portada, banners y páginas
lib/
  site.ts       Datos de la empresa, gastos de envío y código de bienvenida
  store.tsx     Estado global de la cesta y los favoritos
  checkout.ts   Punto de conexión con la pasarela de pago
public/images/  Todas las imágenes (ver IMAGENES.md)
scripts/        Generación y descarga de imágenes
```

## Cambiar los datos de tu empresa

Edita `lib/site.ts`: razón social, NIF, dirección, email, teléfono, redes sociales, dominio, gastos de envío
y días de devolución. Las páginas legales, el pie y el checkout leen estos datos automáticamente.

> Revisa los textos legales con tu asesoría antes de lanzar la tienda: están redactados para una S.L. española
> que vende a consumidores, pero cada negocio tiene sus particularidades.

## Cambiar productos

Todo el catálogo está en `data/products.ts`. Cada producto es un bloque así:

```ts
{
  slug: "vestido-midi-satinado-lia",        // aparece en la URL: /producto/vestido-midi-satinado-lia
  name: "Vestido midi satinado Lía",
  category: "vestidos",                      // vestidos | tops | pantalones | faldas | abrigos | accesorios
  description: "Vestido midi de caída fluida…",
  price: 49.95,
  compareAtPrice: 59.95,                     // opcional: si existe, sale rebajado con el precio tachado
  isNew: true,                               // opcional: etiqueta «Nuevo» y aparece en Novedades
  colors: [C.champan, C.negro],              // colores definidos al principio del archivo
  sizes: ROPA,                               // XS–XL, o UNICA para accesorios
  composition: "100 % poliéster reciclado.",
  care: LAVADO_DELICADO,
  images: imgs("vestido-midi-satinado-lia"), // /images/productos/<slug>/1.jpg … 6.jpg
  completeTheLook: ["blazer-oversize-lucia", "pendientes-aro-dorado-sol"],
}
```

- **Añadir un producto:** copia un bloque, cambia los datos y crea la carpeta
  `public/images/productos/<slug>/` con sus fotos. Si todavía no tienes fotos, `npm run provisionales` crea
  imágenes provisionales para los productos nuevos.
- **Quitar un producto:** borra su bloque y su carpeta de imágenes. Si otro producto lo tenía en
  `completeTheLook`, quítalo también de ahí.
- **Nuevo color:** añádelo al objeto `C` del principio del archivo con su nombre y su color en hexadecimal.

## Cambiar imágenes

Consulta **[IMAGENES.md](./IMAGENES.md)**: lista cada imagen con su ruta, dónde se usa y el tamaño
recomendado. Para cambiar una foto, sustituye el archivo manteniendo el mismo nombre.

Para descargar fotos reales libres de uso de Unsplash o Pexels en lugar de las siluetas provisionales:

```bash
# Clave gratuita en https://unsplash.com/developers
UNSPLASH_ACCESS_KEY=tu_clave npm run imagenes

# o con Pexels (https://www.pexels.com/api/)
PEXELS_API_KEY=tu_clave npm run imagenes
```

En Windows PowerShell: `$env:UNSPLASH_ACCESS_KEY="tu_clave"; npm run imagenes`.

## Publicar en Vercel

1. Sube el repositorio a GitHub (ya lo está si estás leyendo esto allí).
2. Entra en <https://vercel.com/new> con tu cuenta de GitHub e importa el repositorio.
3. En **Root Directory**, elige la carpeta `amara-zafira`. Vercel detecta Next.js solo; no cambies nada más.
4. En **Environment Variables**, añade `NEXT_PUBLIC_SITE_URL` con tu dominio (por ejemplo
   `https://amarazafira.es`). Sirve para el sitemap y las vistas previas en redes.
5. Pulsa **Deploy**. En un par de minutos tendrás la web en una dirección `*.vercel.app`.
6. Para usar tu dominio: en el proyecto de Vercel, **Settings → Domains → Add**, y sigue las instrucciones
   para apuntar los DNS.

Cada vez que subas cambios a la rama principal, Vercel publicará la nueva versión automáticamente.

## Conectar pagos o un catálogo externo más adelante

- **Stripe:** sigue los pasos comentados en `lib/checkout.ts`. Solo cambia esa función; el diseño del checkout
  se mantiene.
- **Shopify u otro catálogo:** sustituye el array de `data/products.ts` por los datos de su API, manteniendo el
  tipo `Product` de `data/types.ts`. Las páginas no necesitan cambios.
- **Newsletter y contacto:** los formularios tienen un comentario donde conectar tu herramienta (Klaviyo,
  Mailchimp, Brevo, Resend…).

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en <http://localhost:3000> |
| `npm run build` / `npm start` | Compila y sirve la versión de producción |
| `npm run lint` | Revisa el código |
| `npm run provisionales` | Crea imágenes provisionales para lo que falte (`-- --todas` las regenera) |
| `npm run imagenes` | Descarga fotos reales de Unsplash/Pexels |
| `npm run imagenes:doc` | Regenera IMAGENES.md |
