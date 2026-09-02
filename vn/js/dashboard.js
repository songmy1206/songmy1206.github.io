document.addEventListener("DOMContentLoaded", function () {
  // 공통 함수
  function toggleActive(btn, target) {
    btn?.classList.toggle("active");
    target?.classList.toggle("active");
  }

  function activateItemList(items, popup) {
    items.forEach((item) => {
      item.addEventListener("click", () => {
        popup?.classList.add("active");
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }

  function closeItemList(items, popup) {
    items.forEach((item) => item.classList.remove("active"));
    popup?.classList.remove("active");
  }

  // 지도부분 팝업
  let mapBtn = document.querySelector(".map-popup__layer .map__btn");
  let mapPopup = mapBtn?.nextElementSibling;
  mapBtn?.addEventListener("click", () => toggleActive(mapBtn, mapPopup));

  let popupSections = [
    {
      listSelector: ".right-middle .scroll-contents__list",
      popupSelector: ".map-popup__sensor .popup-contents",
      closeSelector: ".map-popup__sensor i.icon25",
    },
    {
      listSelector: ".right-bottom .scroll-contents__list",
      popupSelector: ".map-popup__cctv .popup-contents",
      closeSelector: ".map-popup__cctv i.icon25",
    },
  ];

  popupSections.forEach(({ listSelector, popupSelector, closeSelector }) => {
    // 여러 개의 리스트를 모두 가져오기
    let lists = document.querySelectorAll(listSelector);
    let popup = document.querySelector(popupSelector);
    let closeBtn = document.querySelector(closeSelector);

    lists.forEach((list) => {
      let items = list.querySelectorAll(".scroll-contents__item");

      if (items.length && popup && closeBtn) {
        activateItemList(items, popup);
        closeBtn.addEventListener("click", () => closeItemList(items, popup));
      }
    });
  });

  // 슬라이더 팝업
  let centerSlider = document.querySelector(".main__center .center-slider");
  let filterBtn = centerSlider?.querySelector(".popup-btn.filter");
  let filterPopup = document.querySelector(".slider-popup__filter .popup-contents");
  filterBtn?.addEventListener("click", () => toggleActive(filterBtn, filterPopup));

  // 헤더 팝업
  let zaloBtn = document.querySelector(".header__right .btn__zalo");
  let zaloPopup = document.querySelector(".right-popup__zalo .popup-contents");
  zaloBtn?.addEventListener("click", () => zaloPopup?.classList.add("active"));

  let userBtn = document.querySelector(".header__right .btn__user");
  let userPopup = document.querySelector(".right-popup__user .popup-contents");
  let userPopupBg = userPopup?.closest(".right-popup__user");
  userBtn?.addEventListener("click", () => {
    userPopup?.classList.add("active");
    userPopupBg?.classList.add("active");
  });

  // 슬라이더 indicator
  let indicators = document.querySelectorAll(".slider-indicator li");
  indicators.forEach((ind, i) => {
    ind.addEventListener("click", () => {
      indicators.forEach((item) => item.classList.remove("active"));
      ind.classList.add("active");
    });
  });

  // 슬라이더 요소 열기
  let sliderContents = document.querySelector(".slider-contents");
  let sliderItems = sliderContents?.querySelectorAll(".slider-contents__item");
  sliderItems?.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        sliderItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });

  // 슬라이더 (무한 슬라이드, 자동재생)
  let sliderMask = document.querySelector(".slider-mask");
  let sliderList = document.querySelector(".slider-contents__list");
  let prevBtn = document.querySelector(".icon89");
  let nextBtn = document.querySelector(".icon90");
  let playBtn = document.querySelector(".player i");

  let controlTargets = [sliderMask, prevBtn, nextBtn];
  let gap = 15;

  let currentIndex = 0;
  let isManuallyPaused = false;
  let autoSlideInterval = null;
  let resizeTimer = null;

  let originalItems = [];
  let originalCount = 0;
  let isSlidable = false;
  let allItems = [];

  function initializeSlider() {
    sliderList.querySelectorAll(".clone").forEach((clone) => clone.remove());

    originalItems = Array.from(sliderList.querySelectorAll(".slider-contents__item:not(.clone)"));
    originalCount = originalItems.length;

    isSlidable = true;
    for (let i = originalCount - 1; i >= 0; i--) {
      let clone = originalItems[i].cloneNode(true);
      clone.classList.add("clone");
      sliderList.insertBefore(clone, sliderList.firstChild);
    }
    originalItems.forEach((item) => {
      let clone = item.cloneNode(true);
      clone.classList.add("clone");
      sliderList.appendChild(clone);
    });

    allItems = Array.from(sliderList.querySelectorAll(".slider-contents__item"));

    if (isSlidable) {
      updateSlider(currentIndex, false);
    } else {
      setActive(currentIndex);
      sliderList.style.transition = "none";
      sliderList.style.transform = `translateX(0)`;
    }

    [prevBtn, nextBtn, playBtn].forEach((btn) => {
      if (!btn) return;
      btn.style.pointerEvents = isSlidable ? "" : "none";
      btn.style.filter = isSlidable ? "" : "invert(0.3)";
    });

    if (!isSlidable) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    } else if (!isManuallyPaused && !autoSlideInterval) {
      autoSlideInterval = startAutoSlide();
    }
  }

  function setActive(index) {
    allItems.forEach((item, i) => {
      let originalIndex = i % originalCount;
      item.classList.toggle("active", originalIndex === index);
    });
    indicators.forEach((ind, i) => {
      ind.classList.toggle("active", i === index);
    });
  }

  function getActiveWidth() {
    let width = window.innerWidth;
    let sliderMaskWidth = sliderMask?.getBoundingClientRect().width || 0;

    if (width >= 2550) return sliderMaskWidth - 875;
    else if (width >= 1440) return 500;
    else if (width >= 1280) return 400;
    else return 300;
  }

  function updateSlider(index = currentIndex, withTransition = true) {
    currentIndex = index;
    if (!isSlidable) {
      setActive(index);
      return;
    }

    let correctedIndex = index;
    if (index === originalCount) correctedIndex = 0;
    if (index === -1) correctedIndex = originalCount - 1;

    setActive(correctedIndex);
    sliderList.style.transition = withTransition ? "transform 0.5s ease" : "none";

    let moveIndex = index + originalCount;
    let totalOffset = 0;
    let activeWidth = getActiveWidth();

    for (let i = 0; i < moveIndex && i < allItems.length; i++) {
      let item = allItems[i];
      totalOffset += item.classList.contains("active") ? activeWidth + gap : 160 + gap;
    }

    sliderList.style.transform = `translateX(${-totalOffset}px)`;
  }

  sliderList.addEventListener("transitionend", () => {
    if (currentIndex < 0) currentIndex = originalCount - 1;
    if (currentIndex >= originalCount) currentIndex = 0;
    updateSlider(currentIndex, false);
  });

  prevBtn?.addEventListener("click", () => isSlidable && updateSlider(--currentIndex));
  nextBtn?.addEventListener("click", () => isSlidable && updateSlider(++currentIndex));

  sliderList.addEventListener("click", (e) => {
    let item = e.target.closest(".slider-contents__item");
    if (!item) return;

    if (item.classList.contains("clone")) {
      currentIndex = Array.from(allItems).indexOf(item) < originalCount ? -1 : originalCount;
    } else {
      currentIndex = originalItems.indexOf(item);
    }
    updateSlider(currentIndex);
  });

  indicators.forEach((ind, idx) => {
    ind.addEventListener("click", () => {
      currentIndex = idx;
      updateSlider(idx);
    });
  });

  function startAutoSlide() {
    return setInterval(() => updateSlider(++currentIndex), 2500);
  }

  controlTargets.forEach((target) => {
    target?.addEventListener("mouseenter", () => {
      if (!isSlidable || isManuallyPaused) return;
      clearInterval(autoSlideInterval);
      playBtn?.classList.add("active");
    });
    target?.addEventListener("mouseleave", () => {
      if (!isSlidable || isManuallyPaused) return;
      autoSlideInterval = startAutoSlide();
      playBtn?.classList.remove("active");
    });
  });

  playBtn?.addEventListener("click", () => {
    if (!isSlidable) return;
    if (playBtn.classList.contains("active")) {
      playBtn.classList.remove("active");
      isManuallyPaused = false;
      autoSlideInterval = startAutoSlide();
    } else {
      playBtn.classList.add("active");
      clearInterval(autoSlideInterval);
      isManuallyPaused = true;
    }
  });

  window.addEventListener("resize", () => {
    playBtn?.classList.add("active");
    initializeSlider();
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isManuallyPaused && isSlidable) {
        autoSlideInterval = startAutoSlide();

        playBtn?.classList.remove("active");
      }
    }, 300);
  });

  initializeSlider();

  // 슬라이더 컨텐츠 input 수정
  let sliderIconLabels = document.querySelectorAll(".slider-contents .item-main .icon-label");
  let cloneIconLabels = document.querySelectorAll(".slider-contents__item.clone .item-main .icon-label");

  sliderIconLabels.forEach(function (sliderIconLabel, index) {
    let sliderContentsIcon = sliderIconLabel.querySelector("i");
    let sliderContentsInput = sliderIconLabel.querySelector("input");
    let cloneInput = cloneIconLabels[index]?.querySelector("input");

    sliderContentsIcon.addEventListener("mousedown", (e) => {
      let isActive = sliderContentsIcon.classList.contains("active");

      if (isActive) {
        sliderContentsInput.disabled = true;
        sliderContentsIcon.classList.remove("active");
        syncValue();
      } else {
        sliderContentsInput.disabled = false;
        sliderContentsInput.focus();
        let valLength = sliderContentsInput.value.length;
        sliderContentsInput.setSelectionRange(valLength, valLength);
        sliderContentsIcon.classList.add("active");
      }

      e.preventDefault();
    });

    sliderContentsInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sliderContentsInput.disabled = true;
        sliderContentsIcon.classList.remove("active");
        sliderContentsInput.blur();
        syncValue();
      }
    });

    sliderContentsInput.addEventListener("blur", () => {
      if (!sliderContentsInput.disabled) {
        sliderContentsInput.disabled = true;
        sliderContentsIcon.classList.remove("active");
        syncValue();
      }
    });

    function syncValue() {
      let val = sliderContentsInput.value;
      if (cloneInput) {
        cloneInput.value = val;
        cloneInput.setAttribute("value", val);
      }
      sliderContentsInput.setAttribute("value", val);
    }
  });

  // 가로 스크롤
  document.querySelectorAll(".horizontal-scroll").forEach((slider) => {
    let isScrolling = false;
    let scrollAmount = 0;
    slider.addEventListener("wheel", (e) => {
      e.preventDefault();
      scrollAmount += e.deltaY;
      if (!isScrolling) {
        isScrolling = true;
        let smoothScroll = () => {
          if (Math.abs(scrollAmount) < 1) {
            isScrolling = false;
            scrollAmount = 0;
            return;
          }
          slider.scrollLeft += scrollAmount * 0.1;
          scrollAmount *= 0.8;
          requestAnimationFrame(smoothScroll);
        };
        requestAnimationFrame(smoothScroll);
      }
    });
  });

  // 텍스트 변경
  let titleText = document.querySelector(".right-bottom .scroll-title .title__text");
  function updateTitleText() {
    if (!titleText) return;
    titleText.textContent = window.innerWidth <= 1440 ? "CCTV" : "Khu vực thiết bị liên quan (CCTV)";
  }
  updateTitleText();
  window.addEventListener("resize", updateTitleText);
});
