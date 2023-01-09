window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

  let wrapper = document.querySelector(".lighting-wrap")
  let commonTxt = gsap.utils.toArray(".lighting-wrap .common-txt")
  let body = document.querySelector("body")
  body.classList.add("fix")

  //이걸로 pin jump 해결 왜 되는지 이유 모름 https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()
  ScrollTrigger.normalizeScroll({
    type: "touch,wheel,pointer",
    momentum: self => Math.min(3, self.velocityY / 1000),
  })

  //IOS 버그
  ScrollTrigger.config({ ignoreMobileResize: true })

  const colorChange = () => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
      },
    })

    return {
      black: () => {
        tl.to(wrapper, {
          backgroundColor: "#000",
          color: "#fff",
        })
          .to(
            commonTxt,
            {
              borderColor: "#fff",
            },
            "<"
          )
          .to(
            ".float-btns .modal-btn",
            {
              borderColor: "#fff",
              backgroundColor: "#fff",
            },
            "<"
          )
          .to(
            ".float-btns .modal-btn path",
            {
              fill: "#000",
            },
            "<"
          )

          .to(
            ".float-btns .top-btn",
            {
              borderColor: "#fff",
            },
            "<"
          )

          .to(
            ".float-btns .top-btn path",
            {
              stroke: "#fff",
            },
            "<"
          )
          .to(
            ".arws li path",
            {
              stroke: "#fff",
            },
            "<"
          )
      },

      white: () => {
        tl.to(wrapper, {
          backgroundColor: "#fff",
          color: "#000",
        })
          .to(
            commonTxt,
            {
              borderColor: "#000",
            },
            "<"
          )
          .to(
            ".float-btns .modal-btn",
            {
              borderColor: "#000",
              backgroundColor: "#000",
            },
            "<"
          )
          .to(
            ".float-btns .modal-btn path",
            {
              fill: "#fff",
            },
            "<"
          )
          .to(
            ".float-btns .top-btn",
            {
              borderColor: "#000",
            },
            "<"
          )
          .to(
            ".float-btns .top-btn path",
            {
              stroke: "#000",
            },
            "<"
          )
          .to(
            ".arws li path",
            {
              stroke: "#000",
            },
            "<"
          )
      },
    }
  }

  const fadeUp = {
    y: 100,
    autoAlpha: 0,
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
        duration: 0.3,
      })
  }

  const visualScroll = () => {
    const container = document.querySelector(".main-visual")
    const title = gsap.utils.toArray(".main-visual .tit")
    const txt = gsap.utils.toArray(".main-visual .txt")
    const items = gsap.utils.toArray(".main-visual .item")

    ScrollTrigger.create({
      trigger: container,
      pin: container,
      start: "top top",
      end: "+=150%",
      // preventOverlaps: true,
      // fastScrollEnd: true,
      // anticipatePin: 1,
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container.querySelector(".visual"),
          start: "10% top",
          end: "+=100%",
          scrub: true,
        },
      })
      .to(title, {
        autoAlpha: 0,
        duration: 0.1,
      })
      .to(txt, {
        autoAlpha: 1,
        yPercent: -100,
        duration: 0.5,
      })
  }

  function imgTxtSection() {
    document.querySelectorAll(".scroll-img-txt li").forEach((el, idx) => {
      let img = el.querySelector("img") || false
      let txt = el.querySelector(".common-txt") || false
      let h = el.clientHeight

      let anim = gsap.to(!!img ? img : txt, {
        y: -h,
        ease: "none",
        paused: true,
      })

      let progressTo = gsap.quickTo(anim, "progress", { ease: "power3", duration: parseFloat(el.dataset.scrub) || 0.1 })
      gsap.to(el.querySelector(".inside"), {
        y: h,
        ease: "none",
        scrollTrigger: {
          scrub: 2,
          trigger: ".scroll-img-txt",
          start: "top center",
          end: "bottom top",
          onUpdate: self => progressTo(self.progress),
        },
      })
    })
  }

  function wideSection() {
    let container = document.querySelector(".scroll-wide")
    ScrollTrigger.create({
      trigger: container,
      pin: container,
      start: "top top",
      end: "+=100%",
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          endTrigger: ".scroll-img-txt",
          end: "+=100%",
          scrub: false,
          ease: "none",
          toggleActions: "play resume resume resume",
        },
      })
      .to(container.querySelector(".img"), {
        width: "100%",
        duration: 1,
      })
      .from(
        ".scroll-wide .common-txt",
        {
          autoAlpha: 0,
          duration: 1,
        },
        "<0.5"
      )
      .to(".scroll-wide .img", {
        delay: 3,
      })
  }

  function horizonSection() {
    const section = document.querySelector(".scroll-horizon")
    const img = document.querySelector(".scroll-horizon .img").offsetWidth
    const txt = document.querySelector(".scroll-horizon .common-txt").offsetWidth
    const margin = Number($(".scroll-horizon").css("marginLeft").split("px")[0])
    let maxWidth = 0
    const getMaxWidth = () => {
      maxWidth = 0
      maxWidth = Math.abs(window.innerWidth - img - txt) + margin * 2
    }

    getMaxWidth()
    // ScrollTrigger.addEventListener("refreshInit", getMaxWidth)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "center center",
          // end: "+=100%",
          end: () => {
            console.log(maxWidth)
            console.log(Math.abs(maxWidth))

            return `+=${100}%`
          },
          scrub: 2,
        },
      })
      .to(".scroll-horizon", {
        duration: 3,
        // x: -section.offsetWidth,
        x: `-${Math.abs(maxWidth)}`,
      })
      .to(".scroll-horizon", {
        duration: 2,
      })
  }

  function centerSection() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".grid-center",
          start: "top center",
          end: "bottom center",
          toggleActions: "play resume resume reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
          // ease: "none",
        },
      })
      .from(".grid-center div", {
        autoAlpha: 0,
        stagger: {
          each: 0.1,
        },
      })
  }

  function changeBackColor() {
    //배경색 변경
    gsap.utils.toArray(".black-to-white").forEach((section, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          scrub: 0.1,

          //start 위치에 따라 달라지니 콘솔로 체크
          onEnter: colorChange().white,
          onLeaveBack: colorChange().black,

          // onEnter: () => {
          //   console.log('onEnter');
          // },
          // onEnterBack: () => {
          //   console.log('onEnterBack');
          // },
          // onLeave: () => {
          //   console.log('onLeave');
          // },
          // onLeaveBack: () => {
          //   console.log('onLeaveBack');
          // }
        },
      })
    })

    gsap.utils.toArray(".white-to-black").forEach((section, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          scrub: 0.1,
          //start 위치에 따라 달라지니 콘솔로 체크
          onLeave: colorChange().black,
          onLeaveBack: colorChange().white,
        },
      })
    })
  }

  function videoSection() {
    let video = document.querySelector(".vid-content .vid video") || false
    if (!!video) {
      video.pause()
      video.currentTime = 0
      video.load()
      ScrollTrigger.create({
        trigger: ".vid-content",
        start: "-=30% top",
        onToggle: self => {
          if (self.isActive) {
            video.play()
          } else {
            video.pause()
            video.currentTime = 0
          }
        },
      })
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".vid-content .common-txt",
          start: "bottom bottom",
          end: "+=100%",
          toggleActions: "play pause resume reverse",
        },
      })
      .from(".vid-content .common-txt", fadeUp)
  }

  function gridImgSection() {
    gsap.utils.toArray(".grid-img article").forEach(article => {
      gsap.from(article, {
        y: 10,
        autoAlpha: 0,
        scrollTrigger: {
          trigger: article,
          start: "top 70%",
          // end: "max",
          toggleActions: "play pause resume reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
        },
      })
    })
  }

  new Swiper(".img-slider", {
    navigation: {
      nextEl: ".img-slider .next",
      prevEl: ".img-slider .prev",
    },
    loop: true,
    spaceBetween: 0,
    slidesPerView: "auto",
    centeredSlides: true,
    roundLengths: true,
    loopAdditionalSlides: 30,
    autoplay: {
      delay: 3000,
    },
  })

  function formSection() {
    gsap.utils.toArray(".form-wrap img, .form-wrap .email-form").forEach(el => {
      gsap.from(el, {
        ...fadeUp,
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          // end: "max",
          toggleActions: "play reset play reset", //onEnter, onLeave, onEnterBack, onLeaveBack
        },
      })
    })
  }

  function floatButtonSection() {
    const tl = gsap.timeline({
      repeat: -1,
    })

    const fadeInOption = {
      autoAlpha: 1,
      duration: 1.5,
      ease: "ease-in",
    }
    const fadeOutOption = {
      autoAlpha: 0,
      duration: 1,
      ease: "ease-out",
    }

    gsap.utils.toArray(".modal-btn svg").forEach(image => {
      tl.to(image, fadeInOption).to(image, fadeOutOption, "+=1")
    })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-visual",
          start: "center top",
          // end: "max",
          toggleActions: "play play resume reverse",
        },
      })
      .to(".float-btns", {
        autoAlpha: 1,
        duration: 0.3,
        ease: "ease-in-out",
      })
      .to(
        ".main-visual .visual .ico",
        {
          autoAlpha: 0,
          y: -100,
          duration: 0.3,
          ease: "ease-in-out",
        },
        "<"
      )

    // let fh = document.querySelector("footer").clientHeight
    // let btnPos = window.innerHeight - document.querySelector(".float-btns").getBoundingClientRect().top - 180
    gsap.to(".float-btns", {
      // y: -(fh + btnPos),
      // duration: 0.5,
      // ease: "ease",
      scrollTrigger: {
        trigger: ".footer",
        start: "top bottom",
        end: "top top",
        // toggleActions: "play play reverse reverse",
        toggleClass: "active",
        toggleClass: { targets: ".float-btns", className: "active" },
      },
    })
  }

  function navSection() {
    let toggleNav = $(".lighting-header .lang ul")
    $(".lighting-header .lang").click(function () {
      toggleNav.fadeToggle().css("display", "flex")
    })

    document.addEventListener("click", function (event) {
      var isClickInsideElement = document.querySelector(".lighting-header .lang").contains(event.target)
      if (!isClickInsideElement) {
        $(toggleNav).fadeOut()
      }
    })
  }

  visual()
  visualScroll()
  imgTxtSection()
  wideSection()
  horizonSection()
  centerSection()
  changeBackColor()
  videoSection()
  gridImgSection()
  formSection()
  floatButtonSection()
  navSection()
})
