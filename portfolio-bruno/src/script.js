gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

let mm = gsap.matchMedia();

mm.add({
  isMobile: "(max-width: 600px)",
  isDesktop: "(min-width: 601px)"
}, (context) => {
  let { isMobile } = context.conditions;

  if (!isMobile) {
    ScrollTrigger.create({
      trigger: ".about-me",
      start: "top -50px",
      end: "bottom 600px",
      pin: ".img-about",
      pinSpacing: false,
      markers: false,
    });
  }

  // 2. CARROSSEL Certificados
  let wrapper = document.querySelector(".certified-wrapper");
  if (wrapper) {
    gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth + (isMobile ? window.innerWidth * 0.1 : window.innerWidth * 0.08)), 
      ease: "none",
      scrollTrigger: {
        trigger: ".certificados",
        start: isMobile ? "top -4%" : "top -25%", 
        end: () => `+=${wrapper.scrollWidth * (isMobile ? 0.8 : 0.6)}`, 
        pin: true,
        scrub: 2,
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

// PRELOADER
const tl = gsap.timeline({
  onComplete() {
    gsap.to("#preloader", {
      opacity: 0,
      onComplete(){
        gsap.to("#preloader",{
          display: "none",
        })
      }
    });
  },
});

tl.to("#preloader path", {
  duration: 1,
  strokeDashoffset: 0,
});
tl.to("#preloader path", {
  fill: "#2ccf7f",
  duration: 0.5,
  strokeDashoffset: 0,
});