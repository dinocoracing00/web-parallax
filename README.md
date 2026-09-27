# web-parallax

Web estática con efecto parallax construida con **GSAP** y **ScrollTrigger**.

## Efectos

- **Hero** con capas que se desplazan a distintas velocidades y entrada animada del título.
- **Imágenes que se expanden**: cada sección se fija (`pin`) y la imagen pasa de una
  ventana pequeña con bordes redondeados a pantalla completa animando `clip-path`,
  mientras la foto interior hace un zoom-out (`scale 1.4 → 1`). `scrub: 1` suaviza el movimiento.
- **Galería parallax**: columnas que se mueven a velocidades diferentes con zoom interno.
- **Texto revelado palabra a palabra** ligado al scroll.
- Barra de progreso de lectura y soporte para `prefers-reduced-motion`.

## Uso

No necesita build. Abre `index.html` en el navegador o sírvelo en local:

```bash
npx serve .
# o
python3 -m http.server
```

GSAP y ScrollTrigger se cargan desde jsDelivr; las imágenes vienen de Unsplash.

## Estructura

- `index.html` — marcado de las secciones
- `style.css` — estilos y estado inicial de las imágenes
- `main.js` — animaciones con GSAP + ScrollTrigger
