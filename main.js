gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Divide un párrafo en palabras para revelarlas una a una.
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  return el.querySelectorAll(".word");
}

if (!prefersReducedMotion) {
  // ---------- Barra de progreso ----------
  gsap.to(".progress__bar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });

  // ---------- Hero: entrada del título ----------
  gsap.from(".hero__title .line > span", {
    yPercent: 110,
    duration: 1.4,
    ease: "power4.out",
    stagger: 0.15,
    delay: 0.2,
  });

  gsap.from(".hero__bg img", {
    scale: 1.25,
    duration: 2.2,
    ease: "power3.out",
  });

  // ---------- Hero: capas parallax a distintas velocidades ----------
  gsap.utils.toArray(".hero [data-speed]").forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed);
    gsap.to(layer, {
      yPercent: 100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  gsap.to(".hero__content", {
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "60% top", scrub: true },
  });

  // ---------- Imágenes que se expanden ----------
  gsap.utils.toArray(".expand").forEach((section) => {
    const media = section.querySelector(".expand__media");
    const img = media.querySelector("img");
    const caption = section.querySelector(".expand__caption");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // Mismo número de valores en inicio y fin para que GSAP interpole bien.
    const startClip = isMobile
      ? "inset(25% 12% 25% 12% round 20px)"
      : "inset(22% 30% 22% 30% round 20px)";

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1, // 1s de "suavizado" para que la expansión se sienta fluida
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      media,
      { clipPath: startClip },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }
    )
      .to(img, { scale: 1, duration: 1 }, 0)
      .to(media, { "--shade": 1, duration: 0.4 }, 0.6)
      .from(
        caption.children,
        { y: 60, opacity: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" },
        0.65
      )
      // pequeño margen al final para disfrutar la imagen a pantalla completa
      .to({}, { duration: 0.3 });
  });

  // ---------- Galería: columnas a distinta velocidad + zoom interno ----------
  gsap.utils.toArray(".gallery__item").forEach((item) => {
    const speed = parseFloat(item.dataset.speed) || 0;
    const img = item.querySelector("img");

    gsap.fromTo(
      item,
      { y: () => -window.innerHeight * speed },
      {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    gsap.fromTo(
      img,
      { scale: 1.35 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });

  // ---------- Texto que se revela palabra a palabra ----------
  gsap.utils.toArray(".reveal-words").forEach((el) => {
    gsap.to(splitWords(el), {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
    });
  });
}

// Recalcula posiciones cuando cargan las imágenes (cambian alturas).
window.addEventListener("load", () => ScrollTrigger.refresh());
