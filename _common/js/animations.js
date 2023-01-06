$(document).ready(function () {
  document.querySelector("body").classList.add("fix")
  ScrollTrigger.refresh()
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // "resize"가 목록에 없음을 알림
  })
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }
  // check all images on the page
  // $("img").each(function () {
  //   var img = new Image()
  //   img.onload = function () {
  //     console.log($(this).attr("src") + " - done!")
  //   }
  //   img.src = $(this).attr("src")
  // })

  gsap.registerPlugin(ScrollTrigger)

  let fadeUp = {
    y: 100,
    autoAlpha: 0,
  }
  const colorChange = {
    black: () => {
      gsap.to(".lighting-wrap", {
        backgroundColor: "#000",
        color: "#fff",

        overwrite: "auto",
      })
      gsap.to(".lighting-wrap .common-txt", {
        borderColor: "#fff",

        overwrite: "auto",
      })
      gsap.to(".float-btns .modal-btn", {
        borderColor: "#fff",
        backgroundColor: "#fff",
      })
      gsap.to(".float-btns .modal-btn path", {
        fill: "#000",
      })
      gsap.to(".float-btns .top-btn", {
        borderColor: "#fff",
      })
      gsap.to(".float-btns .top-btn path", {
        stroke: "#fff",
      })
    },
    white: () => {
      gsap.to(".lighting-wrap", {
        backgroundColor: "#fff",
        color: "#000",

        overwrite: "auto",
      })
      gsap.to(".lighting-wrap .common-txt", {
        borderColor: "#000",

        overwrite: "auto",
      })
      gsap.to(".float-btns .modal-btn", {
        borderColor: "#000",
        backgroundColor: "#000",
      })
      gsap.to(".float-btns .modal-btn path", {
        fill: "#fff",
      })
      gsap.to(".float-btns .top-btn", {
        borderColor: "#000",
      })
      gsap.to(".float-btns .top-btn path", {
        stroke: "#000",
      })
    },
  }

  function mainVisual() {
    const overwraps = document.querySelectorAll(".overwrap img")
    const titles = document.querySelectorAll(".main-visual .tit p")
    const tl = new TimelineLite()
    tl.to(overwraps[0], {
      delay: 0.5,
      ease: "power4.out",
      autoAlpha: 0,
      ease: "power1.inOut",
      duration: 1,
    })
      .to(overwraps[1], {
        delay: 1,
        duration: 1,
        ease: "power1.inOut",
        scale: 100,
        transformOrigin: "center",
      })
      .to(
        overwraps[1],
        {
          autoAlpha: 0,
          ease: "power1.inOut",
        },
        "-=1"
      )
      .from(
        titles[0],
        {
          autoAlpha: 0,
          xPercent: -30,
          duration: 0.8,
          ease: "power4.in",
        },
        "-=0.5"
      )
      .from(
        titles[1],
        {
          autoAlpha: 0,
          xPercent: 30,
          duration: 0.8,
          ease: "power4.in",
          onComplete: function () {
            // $(".overwrap").hide()
            // $("body").removeClass("fix")
            document.querySelector("body").classList.remove("fix")
          },
        },
        "-=0.5"
      )

    // gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".main-visual",
    //     pin: true,
    //     start: "top top",
    //     end: "+=130%",
    //     scrub: 1,
    //   },
    // })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-visual",
          pin: true,
          start: "top top",
          end: "+=130%",
          scrub: 1,
        },
      })
      .to(".main-visual .tit", {
        autoAlpha: 0,
        duration: 0.3,
      })

    gsap
      .timeline({
        scrollTrigger: {
          toggleActions: "play play reverse reverse",
          trigger: ".main-visual .visual",
          start: "center center",
          end: "+=50%",
        },
      })
      .to(".main-visual .tit", {
        autoAlpha: 0,
        duration: 0.3,
      })

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".main-visual .visual",
          start: "top top",
          end: "+=100%",
          scrub: 1,
        },
      })
      .from(".main-visual .txt", {
        autoAlpha: 0,
        yPercent: 100,
      })
  }

  // function imgTxtSection() {
  //   gsap.utils.toArray(".scroll-img-txt li").forEach(el => {
  //     let data = el.getAttribute("data-offset") || 0
  //     let img = el.querySelector("img") || false

  //     !!img &&
  //       gsap.from(img, {
  //         y: `${data}%`,
  //         scrollTrigger: {
  //           trigger: ".scroll-img-txt",
  //           start: "top center",
  //           endTrigger: ".scroll-wide",
  //           end: "bottom bottom",
  //           scrub: 3,
  //         },
  //       })

  //     !!img &&
  //       gsap.from(img, {
  //         scale: 1.1,
  //         scrollTrigger: {
  //           trigger: el,
  //           start: "bottom 80%",
  //           // end: "max",
  //           duration: 0.3,
  //           toggleActions: "play pause resume reverse",
  //         },
  //       })
  //   })
  // }

  // function wideSection() {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         scrub: true,
  //         pin: true,
  //         trigger: ".scroll-wide",
  //         start: "top top",
  //         end: "+=110%",
  //         scrub: 1,
  //       },
  //     })
  //     .to(".scroll-wide .img", 3, {
  //       width: "100%",
  //     })
  //     .from(
  //       ".scroll-wide .common-txt",
  //       3,
  //       {
  //         autoAlpha: 0,
  //       },
  //       "<1"
  //     )
  // }

  // function horizonSection() {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".scroll-horizon",
  //         pin: true,
  //         start: "center center",
  //         end: "+=130%",
  //         scrub: 1,
  //       },
  //     })
  //     .to(".scroll-horizon", {
  //       x: -document.querySelectorAll(".common-txt.min")[0].offsetWidth,
  //     })
  // }

  // function centerSection() {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".grid-center",
  //         start: "top center",
  //         end: "bottom center",
  //         toggleActions: "play pause resume reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
  //       },
  //     })
  //     .from(".grid-center div", {
  //       y: 100,
  //       autoAlpha: 0,
  //       stagger: 0.3,
  //     })
  // }

  // function changeBackColor() {
  //   //배경색 변경
  //   gsap.utils.toArray(".black-to-white").forEach((section, i) => {
  //     gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top center",
  //         scrub: 0.1,

  //         //start 위치에 따라 달라지니 콘솔로 체크
  //         onEnter: colorChange.white,
  //         onLeaveBack: colorChange.black,

  //         // onEnter: () => {
  //         //   console.log('onEnter');
  //         // },
  //         // onEnterBack: () => {
  //         //   console.log('onEnterBack');
  //         // },
  //         // onLeave: () => {
  //         //   console.log('onLeave');
  //         // },
  //         // onLeaveBack: () => {
  //         //   console.log('onLeaveBack');
  //         // }
  //       },
  //     })
  //   })

  //   gsap.utils.toArray(".white-to-black").forEach((section, i) => {
  //     gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         scrub: 0.1,
  //         //start 위치에 따라 달라지니 콘솔로 체크
  //         onLeave: colorChange.black,
  //         onLeaveBack: colorChange.white,
  //       },
  //     })
  //   })
  // }

  // function videoSection() {
  //   let video = document.querySelector(".vid-content .vid video") || false
  //   if (!!video) {
  //     video.pause()
  //     video.currentTime = 0
  //     video.load()
  //     ScrollTrigger.create({
  //       trigger: ".vid-content",
  //       start: "-=30% top",
  //       onToggle: self => {
  //         if (self.isActive) {
  //           video.play()
  //         } else {
  //           video.pause()
  //           video.currentTime = 0
  //         }
  //       },
  //     })
  //   }

  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".vid-content .common-txt",
  //         start: "bottom bottom",
  //         end: "+=100%",
  //         toggleActions: "play pause resume reverse",
  //       },
  //     })
  //     .from(".vid-content .common-txt", fadeUp)
  // }

  // function gridImgSection() {
  //   gsap.utils.toArray(".grid-img article").forEach(article => {
  //     gsap.from(article, {
  //       y: 100,
  //       autoAlpha: 0,
  //       scrollTrigger: {
  //         trigger: article,
  //         start: "top 70%",
  //         // end: "max",
  //         toggleActions: "play pause resume reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
  //       },
  //     })
  //   })
  // }

  // new Swiper(".img-slider", {
  //   navigation: {
  //     nextEl: ".img-slider .next",
  //     prevEl: ".img-slider .prev",
  //   },
  //   loop: true,
  //   spaceBetween: 180,
  //   slidesPerView: 3,
  //   centeredSlides: true,
  //   roundLengths: true,
  //   loopAdditionalSlides: 30,
  //   autoplay: {
  //     delay: 3000,
  //   },
  // })

  // function formSection() {
  //   gsap.utils.toArray(".form-wrap img, .form-wrap .email-form").forEach(el => {
  //     gsap.from(el, {
  //       ...fadeUp,
  //       scrollTrigger: {
  //         trigger: el,
  //         start: "top 70%",
  //         // end: "max",
  //         toggleActions: "play resume resume reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
  //       },
  //     })
  //   })
  // }

  // function floatButtonSection() {
  //   const tl = gsap.timeline({
  //     repeat: -1,
  //   })

  //   const fadeInOption = {
  //     autoAlpha: 1,
  //     duration: 1.5,
  //     ease: "ease-in",
  //   }
  //   const fadeOutOption = {
  //     autoAlpha: 0,
  //     duration: 1,
  //     ease: "ease-out",
  //   }

  //   gsap.utils.toArray(".modal-btn svg").forEach(image => {
  //     tl.to(image, fadeInOption).to(image, fadeOutOption, "+=1")
  //   })

  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".main-visual",
  //         start: "center top",
  //         // end: "max",
  //         toggleActions: "play pause resume reverse",
  //       },
  //     })
  //     .to(".float-btns", {
  //       autoAlpha: 1,
  //       duration: 0.3,
  //       ease: "ease-in-out",
  //     })
  //     .to(
  //       ".main-visual .visual .ico",
  //       {
  //         autoAlpha: 0,
  //         y: -100,
  //         duration: 0.3,
  //         ease: "ease-in-out",
  //       },
  //       "<"
  //     )

  //   let fh = document.querySelector("footer").clientHeight
  //   let btnPos = window.innerHeight - document.querySelector(".float-btns").getBoundingClientRect().top - 180
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".footer",
  //         start: "top bottom",
  //         end: "top top",
  //         toggleActions: "play play reverse reverse",
  //       },
  //     })
  //     .to(".float-btns", {
  //       y: -(fh + btnPos),
  //       duration: 0.5,
  //       ease: "ease",
  //     })
  // }

  // function navSection() {
  //   let toggleNav = $(".lighting-header .lang ul")
  //   $(".lighting-header .lang p").click(function () {
  //     toggleNav.fadeToggle().css("display", "flex")
  //   })

  //   document.addEventListener("click", function (event) {
  //     var isClickInsideElement = document.querySelector(".lighting-header .lang").contains(event.target)
  //     if (!isClickInsideElement) {
  //       $(toggleNav).fadeOut()
  //     }
  //   })
  // }

  mainVisual()
  // imgTxtSection()
  // wideSection()
  // horizonSection()
  // centerSection()
  // changeBackColor()
  // videoSection()
  // gridImgSection()
  // formSection()
  // floatButtonSection()
  // navSection()

  gsap.ticker.fps(-1)
})
