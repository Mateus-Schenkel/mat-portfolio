gsap.registerPlugin(ScrollTrigger, SplitText);

let mm = gsap.matchMedia();

mm.add({
  isMobile: "(max-width: 600px)",
  isDesktop: "(min-width: 601px)"
}, (context) => {
  let { isMobile } = context.conditions;

  // 2. CARROSSEL Certificados
  let wrapper = document.querySelector(".certified-wrapper");

  if (wrapper) {
    gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth + (isMobile ? 20 : 40)),
      ease: "none",
      scrollTrigger: {
        trigger: ".certificados",
        start: "top top",
        end: () => `+=${wrapper.scrollWidth}`,
        pin: ".scroll-horizontal-container",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  }

  // 3. ANIMAÇÃO DOS ITENS DA TIMELINE (Experiências)
  const items = document.querySelectorAll(".timeline-item");
  
  items.forEach((item) => {
    const card = item.querySelector(".timeline-card");
    const dot = item.querySelector(".timeline-dot");

    gsap.fromTo(
      card,
      { 
        opacity: 0, 
        x: isMobile ? -30 : (item.classList.contains("right") ? 50 : -50) 
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: isMobile ? "top 70%" : "top 50%", // Começa mais cedo no mobile
          end: isMobile ? "top 50%" : "top 30%",
          scrub: 1,
        },
      }
    );

    // Efeito de brilho no dot quando ativo
    gsap.to(dot, {
      backgroundColor: "var(--primary-color)",
      scrollTrigger: {
        trigger: item,
        start: "top center",
        toggleActions: "play reverse play reverse",
      },
    });
  });

}); // Fim do MatchMedia

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,

  initialSlide: 3,

  slidesPerView: "auto",
  loop: true,
  slideToClickedSlide: true,

  coverflowEffect: {
    rotate: 10,
    stretch: 100,
    depth: 400,
    modifier: 1,
    slideShadows: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Animação da linha crescendo
gsap.to(".timeline-progress", {
  height: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".timeline-container",
    start: "top center",
    end: "bottom center",
    scrub: true, 
  },
});

// Impede o navegador de restaurar a posição anterior da página
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Sempre inicia a página no topo
window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
});