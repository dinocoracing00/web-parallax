# Imágenes de Amara Zafira

Todas las imágenes están en `public/images`. La web las carga con `next/image`, que genera
automáticamente versiones AVIF/WebP en varios tamaños, así que **solo tienes que sustituir el archivo
manteniendo el mismo nombre y ruta**.

Ahora mismo hay dos opciones de imágenes provisionales:

1. **Siluetas neutras** (incluidas en el repositorio). Se regeneran con `npm run provisionales`.
2. **Fotos reales libres de uso** de Unsplash o Pexels. Se descargan con
   `UNSPLASH_ACCESS_KEY=tu_clave npm run imagenes` (o `PEXELS_API_KEY=…`). El script recorta cada
   foto al tamaño exacto y guarda los créditos en `public/images/CREDITOS.md`.

## Recomendaciones para tus fotos

- Formato **JPG** (calidad 80–85 %) o **WebP**. Peso orientativo: menos de 400 KB por foto.
- Respeta la **proporción** indicada; si no, la foto se recortará por el centro.
- Fondo neutro (blanco, crudo o gris claro) para las fotos de producto, como en Zara o COS.
- Usa siempre la misma luz y el mismo encuadre en todas las fichas para que la rejilla se vea uniforme.

## Portada, categorías y banners

| Archivo | Dónde se usa | Tamaño recomendado |
|---|---|---|
| `public/images/hero/hero.jpg` | Portada de inicio (escritorio) | 2400 × 1350 px |
| `public/images/hero/hero-movil.jpg` | Portada de inicio (móvil) | 1200 × 2000 px |
| `public/images/categorias/vestidos.jpg` | Bloque de categoría Vestidos | 1200 × 1600 px |
| `public/images/categorias/tops.jpg` | Bloque de categoría Tops | 1200 × 1600 px |
| `public/images/categorias/pantalones.jpg` | Bloque de categoría Pantalones | 1200 × 1600 px |
| `public/images/categorias/faldas.jpg` | Bloque de categoría Faldas | 1200 × 1600 px |
| `public/images/categorias/abrigos.jpg` | Bloque de categoría Abrigos | 1200 × 1600 px |
| `public/images/categorias/accesorios.jpg` | Bloque de categoría Accesorios | 1200 × 1600 px |
| `public/images/editorial/editorial-1.jpg` | Banner editorial de inicio (columna izquierda) | 1200 × 1600 px |
| `public/images/editorial/editorial-2.jpg` | Banner editorial de inicio (columna derecha, solo escritorio) | 1600 × 1200 px |
| `public/images/editorial/newsletter.jpg` | Imagen del bloque de newsletter | 1200 × 1500 px |
| `public/images/paginas/sobre-nosotros.jpg` | Cabecera de Sobre nosotros | 2000 × 1200 px |
| `public/images/paginas/estudio.jpg` | Segunda imagen de Sobre nosotros | 1200 × 1500 px |
| `public/images/og/og-default.jpg` | Imagen al compartir en redes (Open Graph) | 1200 × 630 px |

## Fotos de producto

Cada producto tiene 6 fotos de **1200 × 1600 px (proporción 3:4)**, en este orden:

| Archivo | Contenido | Dónde se ve |
|---|---|---|
| `1.jpg` | Modelo de frente | Ficha, rejillas, cesta y resultados de búsqueda |
| `2.jpg` | Modelo de espalda | Ficha y al pasar el ratón en la rejilla |
| `3.jpg` | Detalle del tejido | Galería de la ficha |
| `4.jpg` | Cuerpo entero | Galería de la ficha |
| `5.jpg` | Producto solo | Galería de la ficha |
| `6.jpg` | Look completo | Galería de la ficha |

Si un producto tiene menos fotos, borra las que sobren y quítalas del array `images` de ese
producto en `data/products.ts`.

### Vestidos

- **Vestido midi satinado Lía** → `public/images/productos/vestido-midi-satinado-lia/` (1.jpg … 6.jpg)
- **Vestido camisero de lino Noa** → `public/images/productos/vestido-camisero-lino-noa/` (1.jpg … 6.jpg)
- **Vestido de punto canalé Vera** → `public/images/productos/vestido-punto-canale-vera/` (1.jpg … 6.jpg)
- **Vestido largo estampado Alma** → `public/images/productos/vestido-largo-estampado-alma/` (1.jpg … 6.jpg)

### Tops

- **Blusa fluida con lazo Irene** → `public/images/productos/blusa-fluida-cuello-lazo-irene/` (1.jpg … 6.jpg)
- **Camiseta básica de algodón orgánico** → `public/images/productos/camiseta-algodon-organico-basica/` (1.jpg … 6.jpg)
- **Top satinado de tirantes Luna** → `public/images/productos/top-satinado-tirantes-luna/` (1.jpg … 6.jpg)
- **Jersey de punto fino Clara** → `public/images/productos/jersey-punto-fino-cuello-alto-clara/` (1.jpg … 6.jpg)

### Pantalones

- **Pantalón sastre con pinzas Marta** → `public/images/productos/pantalon-sastre-pinzas-marta/` (1.jpg … 6.jpg)
- **Vaquero recto de tiro alto Sara** → `public/images/productos/vaquero-recto-tiro-alto-sara/` (1.jpg … 6.jpg)
- **Pantalón ancho de lino Greta** → `public/images/productos/pantalon-ancho-lino-greta/` (1.jpg … 6.jpg)
- **Pantalón culotte fluido Elena** → `public/images/productos/pantalon-culotte-fluido-elena/` (1.jpg … 6.jpg)

### Faldas

- **Falda midi plisada Aurora** → `public/images/productos/falda-midi-plisada-aurora/` (1.jpg … 6.jpg)
- **Falda satinada al bies Nerea** → `public/images/productos/falda-satinada-al-bies-nerea/` (1.jpg … 6.jpg)
- **Falda vaquera larga Abril** → `public/images/productos/falda-vaquera-larga-abril/` (1.jpg … 6.jpg)
- **Minifalda de tweed Olivia** → `public/images/productos/minifalda-tweed-olivia/` (1.jpg … 6.jpg)

### Abrigos

- **Abrigo largo de lana Carmen** → `public/images/productos/abrigo-largo-lana-carmen/` (1.jpg … 6.jpg)
- **Trench clásico Inés** → `public/images/productos/trench-clasico-ines/` (1.jpg … 6.jpg)
- **Blazer oversize Lucía** → `public/images/productos/blazer-oversize-lucia/` (1.jpg … 6.jpg)
- **Cárdigan de punto Maya** → `public/images/productos/chaqueta-punto-cardigan-maya/` (1.jpg … 6.jpg)

### Accesorios

- **Bolso de hombro de piel Ada** → `public/images/productos/bolso-hombro-piel-ada/` (1.jpg … 6.jpg)
- **Pañuelo de seda estampado Rosa** → `public/images/productos/panuelo-seda-estampado-rosa/` (1.jpg … 6.jpg)
- **Cinturón de piel con hebilla dorada** → `public/images/productos/cinturon-piel-hebilla-dorada/` (1.jpg … 6.jpg)
- **Pendientes de aro Sol** → `public/images/productos/pendientes-aro-dorado-sol/` (1.jpg … 6.jpg)

## Otras imágenes

| Archivo | Dónde se usa |
|---|---|
| `app/icon.svg` | Icono de la pestaña del navegador (favicon) |
