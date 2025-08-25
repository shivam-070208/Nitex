gsap.registerPlugin(ScrollTrigger);

let Text = document.getElementsByClassName("headtext");
const page1 = document.querySelector(".page1");
const setSmoothscroll = () => {
  // init loco
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"), // your scroll container
    smooth: true,
    multiplier: 1.2, // adjust speed
  });

  // tell ScrollTrigger to use proxy
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // update ScrollTrigger on loco update
  locoScroll.on("scroll", ScrollTrigger.update);

  // refresh both when window resizes
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
};
const setHelpSectionAnim = () => {
  const helptimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "main",
      start: "top 10%",
      toggleActions: "play none none reverse",
      markers:true
    },
  });
  helptimeline.to(
    ".help-card",
    {
      transform: "scaleY(1)",
      stagger: 0.2,
      duration: 0.9,
    },
    0
  );
  helptimeline.to(
    ".help-top",
    {
      transform: "scaleX(100%)",
      stagger: 0.2,
    },
    0.2
  );
};
const setStorySectionAnim = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1",
      scroller: "main",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: 1.4,
    },
  });

  timeline.to(
    ".page1_img",
    {
      top: 0,
      left: 0,

      transform: "skewX(0deg)",
      width: "100vw",
      height: "100%",
      ease: "none",
    },
    0
  );
  timeline.to(
    ".container-img",
    {
      width: 0,
    },
    0.2
  );
  timeline.to(
    ".image_div",
    {
      color: "white",
    },
    0.7
  );
};

setSmoothscroll();
setHelpSectionAnim();
setStorySectionAnim();
Array.from(Text).forEach((element) => {
  const el = element.children[0];

  gsap.to(
    el,

    {
      scale: 0,
      duration: 1.4,
      scrollTrigger: {
        trigger: element,
        scroller: "main",
        toggleActions: "play none none reset",
      },
    }
  );
});
