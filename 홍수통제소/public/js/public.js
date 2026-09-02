document.addEventListener("DOMContentLoaded", function () {
  // 배너 슬라이드
  let slide = document.querySelector(".annc__banner-content .slide");
  let prevBtn = document.querySelector(".top-slide__btn .prev");
  let nextBtn = document.querySelector(".top-slide__btn .next");
  let stopBtn = document.querySelector(".top-slide__btn .ico-stop");

  let slideItems = document.querySelectorAll(".slide__list");
  let currentIndex = 1;
  let isStoped = false;
  let autoSlide;

  let firstClone = slideItems[0].cloneNode(true);
  let lastClone = slideItems[slideItems.length - 1].cloneNode(true);

  slide.appendChild(firstClone);
  slide.insertBefore(lastClone, slideItems[0]);

  slideItems = document.querySelectorAll(".slide__list");

  // 슬라이드 크기
  function getSlideWidth() {
    return document.querySelector(".slide__list").offsetWidth;
  }

  function setSlidePosition(index) {
    let slideWidth = getSlideWidth();
    slide.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  function moveToSlide(index) {
    let slideWidth = getSlideWidth();
    slide.style.transition = "transform 0.4s ease-in-out";
    slide.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
  }

  function nextSlide() {
    if (currentIndex >= slideItems.length - 1) return;
    moveToSlide(currentIndex + 1);
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    moveToSlide(currentIndex - 1);
  }

  slide.addEventListener("transitionend", () => {
    if (slideItems[currentIndex].isEqualNode(firstClone)) {
      slide.style.transition = "none";
      currentIndex = 1;
      setSlidePosition(currentIndex);
    }
    if (slideItems[currentIndex].isEqualNode(lastClone)) {
      slide.style.transition = "none";
      currentIndex = slideItems.length - 2;
      setSlidePosition(currentIndex);
    }
  });

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  stopBtn.addEventListener("click", () => {
    isStoped = !isStoped;
    stopBtn.classList.toggle("play", isStoped);
    if (isStoped) {
      clearInterval(autoSlide);
    } else {
      startAutoSlide();
    }
  });

  function startAutoSlide() {
    autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  window.addEventListener("resize", () => {
    setSlidePosition(currentIndex);
  });

  slide.style.display = "flex";
  setSlidePosition(currentIndex);
  startAutoSlide();

  // 알림
  let alarmBtn = document.querySelector(".alarm .alarm__btn");
  let alarmContent = document.querySelector(".alarm .alarm__content");

  if (alarmBtn && alarmContent) {
    alarmBtn.addEventListener("click", function () {
      alarmContent.classList.toggle("hide");
    });

    document.addEventListener("click", function (e) {
      if (!alarmContent.contains(e.target) && !alarmBtn.contains(e.target)) {
        alarmContent.classList.add("hide");
      }
    });
  }
});
