window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

  let wrapper = document.querySelector(".lighting-wrap")
  let commonTxt = gsap.utils.toArray(".lighting-wrap .common-txt")
  let body = document.querySelector("body")
  // body.classList.add("fix")

  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }

  const visual = () => {
    const overwraps = document.querySelectorAll(".overwrap img")
    const titles = document.querySelectorAll(".main-visual .tit p")
    let tl = gsap.timeline({
      ease: "power4.in",
      onComplete: () => {
        body.classList.remove("fix")
        document.querySelector(".overwrap").style.display = "none"
      },
    })
    tl.to(overwraps[0], {
      delay: 0.5,
      autoAlpha: 0,
      duration: 1,
    })
      .to(overwraps[1], {
        delay: 1,
        scale: 100,
        duration: 1.2,
        transformOrigin: "center",
      })
      .to(
        overwraps[1],
        {
          autoAlpha: 0,
          duration: 0.8,
        },
        "-=1"
      )
      .from(titles[0], {
        autoAlpha: 0,
        xPercent: -30,
        duration: 0.8,
      })
      .from(
        titles[1],
        {
          autoAlpha: 0,
          xPercent: 30,
          duration: 0.8,
        },
        "-=0.5"
      )
      .to(".overwrap", {
        duration: 1,
      })
  }

  const controller = new ScrollMagic.Controller()

  function visualScroll() {
    let tl = gsap
      .timeline()
      .to(".main-visual .tit", {
        autoAlpha: 0,
        duration: 0.3,
        duration: 0.1,
      })
      .fromTo(
        ".main-visual .txt",
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        {
          autoAlpha: 1,
          yPercent: -100,
        }
      )

    new ScrollMagic.Scene({
      triggerElement: "..main-visual",
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(".main-visual")
      .setTween(tl)
      .addIndicators()
      .addTo(controller)
  }

  //   visual()
  visualScroll()
})
