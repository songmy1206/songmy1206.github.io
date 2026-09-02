document.addEventListener("DOMContentLoaded", function () {
  // 버튼 조절 슬라이드
  let slider = document.querySelector(".slider");
  let slides = document.querySelectorAll(".slider .slide:not(.clone)");
  let slideDots = document.querySelectorAll(".slide-position li");
  let slideWidth = slides[0].offsetWidth;
  let slideCount = slides.length;
  let currentIndex = 0;
  let slideMargin = 10;

  let isTransitioning = false;
  let isPaused = false;
  let slideInterval;

  let prevBtn = document.querySelector(".ico-prev");
  let nextBtn = document.querySelector(".ico-next");
  let playBtn = document.querySelector(".control-btn .play");
  let stopBtn = document.querySelector(".control-btn .stop");

  makeClone();
  updateSlideDots();
  adjustSlideWidth();
  moveSlide(currentIndex);
  startSlideInterval();

  function startSlideInterval() {
    slideInterval = setInterval(() => {
      if (!isTransitioning) {
        moveSlide(currentIndex + 1);
        updateSlideDots();
      }
    }, 3000);
  }

  function stopSlideInterval() {
    clearInterval(slideInterval);
  }

  function makeClone() {
    for (let i = 0; i < slideCount; i++) {
      let cloneSlide = slides[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      slider.appendChild(cloneSlide);
    }

    for (let i = slideCount - 1; i >= 0; i--) {
      let cloneSlide = slides[i].cloneNode(true);
      cloneSlide.classList.add("clone");
      slider.prepend(cloneSlide);
    }
    setInitialPos();
    setTimeout(function () {
      slider.style.transition = "transform 0.5s ease-in-out";
    }, 100);
  }

  function setInitialPos() {
    let initialTranslateValue = -(slideWidth + slideMargin) * slideCount + 10;
    slider.style.transform = "translateX(" + initialTranslateValue + "px)";
  }

  function moveSlide(num) {
    currentIndex = num;

    let translateValue = -((slideWidth + slideMargin) * (currentIndex + slideCount));
    slider.style.transform = "translateX(" + translateValue + "px)";

    if (currentIndex === slideCount || currentIndex == -slideCount) {
      setTimeout(function () {
        slider.style.transition = "none";
        slider.style.transform = "translateX(" + -(slideWidth + slideMargin) * slideCount + "px)";
        currentIndex = 0;
      }, 500);
      setTimeout(function () {
        slider.style.transition = "transform 0.5s ease-in-out";
      }, 600);
    }

    addMain();
  }

  function addMain() {
    if (window.innerWidth > 1255) {
      let mainIndex = (currentIndex + slideCount) % slideCount;
      let nextIndexCandidate = (mainIndex + 1) % slideCount;

      if (nextIndexCandidate === 0) {
        nextIndexCandidate = slides.length;
      }

      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("main");
      }
      slides[nextIndexCandidate - 1].classList.add("main");

      let clonedSlides = slider.querySelectorAll(".clone");

      for (let i = 0; i < clonedSlides.length; i++) {
        let originalIndex = i % slideCount;
        clonedSlides[i].classList.remove("main");
        if (originalIndex === nextIndexCandidate - 1) {
          clonedSlides[i].classList.add("main");
        }
      }
    } else if (window.innerWidth <= 1255) {
      let allSlides = document.querySelectorAll(".slider .slide");
      allSlides.forEach(function (slide) {
        slide.classList.add("main");
      });
    }
  }

  function updateSlideDots() {
    let realIndex = ((currentIndex % slideCount) + slideCount) % slideCount;
    slideDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === realIndex);
    });
  }

  function adjustSlideWidth() {
    slideWidth = slides[0].offsetWidth;
    let newTranslateValue = -((slideWidth + slideMargin) * (currentIndex + slideCount));
    slider.style.transform = "translateX(" + newTranslateValue + "px)";
  }

  playBtn.addEventListener("click", () => {
    if (!isTransitioning && !playBtn.classList.contains("active")) {
      startSlideInterval();
      playBtn.classList.add("active");
      stopBtn.classList.remove("active");
    }
  });

  stopBtn.addEventListener("click", () => {
    if (!isTransitioning && !stopBtn.classList.contains("active")) {
      stopSlideInterval();
      isPaused = true;
      stopBtn.classList.add("active");
      playBtn.classList.remove("active");
    }
  });

  nextBtn.addEventListener("click", function () {
    moveSlide(currentIndex + 1);
    updateSlideDots();
  });

  prevBtn.addEventListener("click", function () {
    moveSlide(currentIndex - 1);
    updateSlideDots();
  });

  window.addEventListener("resize", () => {
    adjustSlideWidth();
    addMain();
    updateSlideDots();

    if (window.innerWidth <= 890 && isPaused) {
      startSlideInterval();
      isPaused = false;
    } else if (!isTransitioning && stopBtn.classList.contains("active")) {
      stopSlideInterval();
      isPaused = true;
    }
  });

  // 터치 슬라이드
  let startX;
  let endX;

  slider.addEventListener("touchstart", touchStart);
  slider.addEventListener("touchend", touchEnd);

  function touchStart(e) {
    startX = e.touches[0].pageX;
  }

  function touchEnd(e) {
    if (startX !== undefined) {
      endX = e.changedTouches[0].pageX;
      if (startX !== endX) {
        if (startX > endX) {
          moveSlide(currentIndex + 1);
        } else {
          moveSlide(currentIndex - 1);
        }
        updateSlideDots();
      }
      startX = undefined;
    }
  }
});
