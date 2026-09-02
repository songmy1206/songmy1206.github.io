document.addEventListener("DOMContentLoaded", function () {
  let gnbTabWrap = document.querySelector(".gnb-tab-wrap");
  let gnbTab = gnbTabWrap.querySelectorAll(".gnb-tab-wrap .gnb-tab");
  let gnbTabSub = gnbTabWrap.querySelectorAll(".gnb-tab-wrap .gnb-tab-sub");
  let targetPopup = gnbTabWrap.querySelectorAll(".target-popup");
  let dragPopup = gnbTabWrap.querySelectorAll(".drag.popup");

  // 네비게이션 탭
  let gnbMenu = document.querySelectorAll(".gnb-bar .gnb-menu");
  gnbMenu.forEach(function (menu) {
    menu.addEventListener("click", function (event) {
      let targetClass = Array.from(event.currentTarget.classList).find((cls) => cls !== "gnb-menu");
      let isselect = event.currentTarget.classList.contains("select");
      let gnbTabSelect = document.querySelector(".gnb-tab." + targetClass);
      let gnbPopup = gnbTabWrap.querySelectorAll(".popup.bg");
      let filterBtn = gnbTabSelect.querySelectorAll(".filter-btn");

      gnbPopup.forEach(function (popup) {
        popup.classList.add("hide");
        popup.classList.remove("fold");
      });
      gnbTabSub.forEach(function (subTab) {
        subTab.classList.remove("select");
        subTab.classList.remove("fold");
      });

      gnbMenu.forEach((menu) => menu.classList.remove("select"));
      gnbTab.forEach(function (tab) {
        tab.classList.remove("select");
        tab.classList.remove("fold");
      });

      if (filterBtn) {
        filterBtn.forEach((btn) => btn.classList.remove("select"));
      }
      // gnb-menu로 여닫기
      if (!isselect) {
        event.currentTarget.classList.add("select");
        gnbTab.forEach(function (tab) {
          if (tab.classList.contains(targetClass)) {
            tab.classList.add("select");
          }
        });
      }
    });
  });

  // 네비게이션 탭 접기
  let gnbCloseBtn = document.querySelectorAll(".gnb-tab .gnb-close-btn");
  gnbCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let gnbTab = btn.closest(".gnb-tab");
      let gnbTabClass = Array.from(gnbTab.classList).find((cls) => cls !== "gnb-tab");
      let gnbTabWrap = gnbTab.closest(".gnb-tab-wrap");
      let gnbTabSub = gnbTabWrap.querySelectorAll(".gnb-tab-sub");
      let popupBg = gnbTabWrap.querySelectorAll(".popup.bg");

      if (gnbTab.classList.contains("home")) {
        gnbTabSub.forEach(function (gnbTabSub) {
          gnbTabSub.classList.toggle("fold");
        });
      }

      gnbTab.classList.toggle("fold");
      gnbTabSub.forEach(function (gnbTabSub) {
        if (gnbTabSub.classList.contains(gnbTabClass)) {
          gnbTabSub.classList.toggle("fold");
        }
      });
      popupBg.forEach(function (popupBg) {
        if (popupBg.classList.contains("fold")) {
          popupBg.classList.remove("fold");
        } else {
          setTimeout(() => {
            popupBg.classList.add("fold");
          }, 500);
        }
      });
    });
  });

  //////////////////////////////////////////////////////////////////////

  // gnb 하단 날짜, 시간
  let todayElements = document.querySelectorAll(".today");
  let clockElements = document.querySelectorAll(".clock");

  function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hour = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");

    let datetimeToday = `${year}.${month}.${day}.`;
    let datetimeClock = `${hour}:${minutes}`;

    todayElements.forEach((el) => (el.textContent = datetimeToday));
    clockElements.forEach((el) => (el.textContent = datetimeClock));
  }

  getTime();
  setInterval(getTime, 1000);

  // 리스트 정렬
  let listSortEls = document.querySelectorAll(".list-sort > *");
  listSortEls.forEach((listSortEl) => {
    listSortEl.addEventListener("click", function () {
      listSortEls.forEach((listSortEl) => {
        listSortEl.classList.remove("select");
      });

      listSortEl.classList.toggle("select");
    });
  });

  // 탭
  let tabBars = document.querySelectorAll(".tab-bar");
  tabBars.forEach(function (tabBar) {
    let tabBarEls = tabBar.querySelectorAll("p");
    let tabContents = tabBar.nextElementSibling;
    let tabs = tabContents.querySelectorAll(".tabs .tab");

    tabBarEls.forEach(function (bar) {
      bar.addEventListener("click", function (event) {
        let targetClass = event.target.className.split(" ")[0];
        if (event.target.classList.contains("select")) {
          return;
        }
        tabBarEls.forEach((tab) => tab.classList.remove("select"));
        tabs.forEach((content) => content.classList.remove("select"));

        event.target.classList.add("select");
        tabContents.querySelector(".tabs .tab." + targetClass)?.classList.add("select");
      });
    });

    // 탭 초기 상태 설정
    if (tabBarEls.length > 0 && tabs.length > 0) {
      tabBarEls[0].classList.add("select");
      tabs[0].classList.add("select");
    }
  });

  // 즐겨찾기
  let iconBookmark = document.querySelectorAll("i.ico-bookmark, .ico-bookmark_a");
  iconBookmark.forEach(function (icon) {
    icon.addEventListener("click", function () {
      icon.classList.toggle("select");
    });
  });

  // 상단 기능버튼
  let topFnBtn = document.querySelectorAll(".fn-wrap .top-fn-btn");
  let fnPopup = document.querySelectorAll(".fn-popup-wrap .fn-popup");
  let fnPlayAdj = document.querySelectorAll(".bottom .fn-play-adj");

  let playAdjustments = document.querySelectorAll(".fn-play-adj");

  topFnBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let isSelected = btn.classList.contains("select");

      topFnBtn.forEach(function (btn) {
        btn.classList.remove("select");
      });

      fnPopup.forEach(function (popup) {
        popup.classList.add("hide");
      });

      fnPlayAdj.forEach(function (playAdj) {
        playAdj.classList.add("hide");
      });

      if (!isSelected) {
        btn.classList.add("select");

        let fnBtnClass = btn.classList;
        fnBtnClass.forEach(function (fnBtnClass) {
          fnPopup.forEach(function (popup) {
            if (popup.classList.contains(fnBtnClass)) {
              popup.classList.remove("hide");
            }
          });
          fnPlayAdj.forEach(function (playAdj) {
            if (playAdj.classList.contains(fnBtnClass)) {
              playAdj.classList.remove("hide");
            }
          });
        });

        playAdjustments.forEach(function (playAdjustment) {
          playAdjustment.classList.remove("show");
        });
      }

      // 고도조절바
      class ElevationAdjustment {
        constructor(playAdjustment) {
          this.playAdjustment = playAdjustment;

          this.adjustmentBarBtn = playAdjustment.querySelector(".elevation-adjustment-bar .ico-wrap i");
          this.playbarToggle = playAdjustment.querySelector(".play-bar > .ico-angle-bracket");

          this.elevationWrap = playAdjustment.querySelector(".elevation-wrap");
          this.elevation = playAdjustment.querySelector(".elevation");

          this.items = this.elevation ? [...this.elevation.children] : [];
          this.liCount = this.items.length;

          this.currentIndex = Math.floor(this.liCount / 2);
          this.maxScroll = 0;
          this.rotated = false;

          this.playbarVisible = false;
          this.elevationVisible = false;

          this.init();
        }

        init() {
          if (this.playbarToggle) this.attachPlayBarToggleEvent();
          if (this.adjustmentBarBtn) this.attachToggleEvent();

          if (this.items.length > 0 && this.elevationWrap) {
            this.centerTo(this.currentIndex, false);
            this.attachClickEvents();
            this.attachDragEvents();

            const ro = new ResizeObserver(() => {
              this.centerTo(this.currentIndex, false);
            });
            ro.observe(this.elevationWrap);
          }
        }

        attachPlayBarToggleEvent() {
          if (!this.playbarToggle) return;

          this.playbarToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            const bothExist = !!this.playbarToggle && !!this.adjustmentBarBtn;

            if (bothExist) {
              this.playbarVisible = !this.playbarVisible;
              this.elevationVisible = this.playbarVisible;
            } else {
              this.playbarVisible = !this.playbarVisible;
            }

            this.applyToggle();
          });
        }

        attachToggleEvent() {
          if (!this.adjustmentBarBtn) return;

          this.adjustmentBarBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            const bothExist = !!this.playbarToggle && !!this.adjustmentBarBtn;

            if (bothExist) {
              this.elevationVisible = !this.elevationVisible;
              this.playbarVisible = this.elevationVisible;
            } else {
              this.elevationVisible = !this.elevationVisible;
            }

            this.applyToggle();
          });
        }

        applyToggle() {
          const hasAdjustBtn = !!this.adjustmentBarBtn;
          const hasPlayToggle = !!this.playbarToggle;
          const elevationBar = this.playAdjustment.querySelector(".elevation-adjustment-bar");

          if (hasAdjustBtn && hasPlayToggle) {
            this.playAdjustment.classList.toggle("show-playbar", this.playbarVisible);

            if (elevationBar) {
              elevationBar.classList.toggle("show-elevation", this.elevationVisible);
            }

            const rotation = this.playbarVisible || this.elevationVisible ? "rotate(270deg)" : "rotate(90deg)";
            this.playbarToggle.style.transform = rotation;
            this.adjustmentBarBtn.style.transform = rotation;
          } else if (hasAdjustBtn && !hasPlayToggle) {
            if (elevationBar) {
              elevationBar.classList.toggle("show-elevation", this.elevationVisible);
            }

            const rotation = this.elevationVisible ? "rotate(270deg)" : "rotate(90deg)";
            this.adjustmentBarBtn.style.transform = rotation;
          } else if (!hasAdjustBtn && hasPlayToggle) {
            this.playAdjustment.classList.toggle("show-playbar", this.playbarVisible);

            const rotation = this.playbarVisible ? "rotate(270deg)" : "rotate(90deg)";
            this.playbarToggle.style.transform = rotation;
          }
        }

        updateMaxScroll() {
          if (this.elevation && this.elevationWrap) {
            this.maxScroll = Math.max(0, this.elevation.scrollHeight - this.elevationWrap.clientHeight);
          } else {
            this.maxScroll = 0;
          }
        }

        centerTo(idx, smooth = true) {
          if (!this.elevationWrap || !this.items.length) return;

          this.updateMaxScroll();
          idx = Math.max(0, Math.min(this.liCount - 1, idx));
          this.currentIndex = idx;

          const targetItem = this.items[idx];
          const itemHeight = targetItem.offsetHeight;
          const viewportHeight = this.elevationWrap.clientHeight;

          let targetScroll = targetItem.offsetTop + itemHeight / 2 - viewportHeight / 2;
          targetScroll = Math.max(0, Math.min(targetScroll, this.maxScroll));

          this.elevationWrap.scrollTo({
            top: targetScroll,
            behavior: smooth ? "smooth" : "auto",
          });

          this.updateCenterClass(idx);
        }

        updateCenterClass(idx) {
          this.items.forEach((el) => el.classList.remove("center"));
          this.items[idx]?.classList.add("center");
        }

        attachClickEvents() {
          this.items.forEach((li, idx) => {
            li.addEventListener("click", () => this.centerTo(idx));
          });
        }

        attachDragEvents() {
          if (!this.elevationWrap) return;

          let isDragging = false;
          let startY = 0;
          let startScrollTop = 0;

          this.elevationWrap.addEventListener("pointerdown", (e) => {
            isDragging = true;
            startY = e.clientY;
            startScrollTop = this.elevationWrap.scrollTop;
            this.elevationWrap.style.scrollBehavior = "auto";
            document.body.style.userSelect = "none";
          });

          window.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            const delta = startY - e.clientY;
            let newScroll = startScrollTop + delta;
            newScroll = Math.max(0, Math.min(newScroll, this.maxScroll));
            this.elevationWrap.scrollTop = newScroll;
          });

          window.addEventListener("pointerup", () => {
            if (!isDragging) return;
            isDragging = false;
            document.body.style.userSelect = "";
            this.elevationWrap.style.scrollBehavior = "smooth";

            const viewportCenter = this.elevationWrap.scrollTop + this.elevationWrap.clientHeight / 2;
            let closestIdx = 0;
            let minDist = Infinity;

            this.items.forEach((el, i) => {
              const elCenter = el.offsetTop + el.offsetHeight / 2;
              const dist = Math.abs(elCenter - viewportCenter);
              if (dist < minDist) {
                minDist = dist;
                closestIdx = i;
              }
            });

            this.centerTo(closestIdx);
          });
        }
      }

      // 재생바
      class PlayBarController {
        constructor(container) {
          this.container = typeof container === "string" ? document.querySelector(container) : container;
          if (!this.container) return;

          this.unitOptions = this.container.querySelectorAll(".unit-container .unit-option");
          this.progressBar = this.container.querySelector(".time-progress");
          this.bar = this.progressBar.querySelector(".bar");
          this.handle = this.progressBar.querySelector(".handle");
          this.playButton = this.container.querySelector(".play-bar .ico-toggle");

          this.currentStep = 0;
          this.isPlaying = false;
          this.interval = null;

          this.init();
        }

        init() {
          this.setupUnitOptions();
          this.initializeProgress();
          this.attachEventListeners();
        }

        setupUnitOptions() {
          this.unitOptions.forEach((option) => {
            option.addEventListener("click", () => {
              this.unitOptions.forEach((opt) => opt.classList.remove("active"));
              option.classList.add("active");
            });
          });
        }

        initializeProgress() {
          const rect = this.progressBar.getBoundingClientRect();
          const step = rect.width / 11;
          const initialLeft = 0;
          const nearestStep = Math.round(initialLeft / step) * step;

          this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
          this.bar.style.width = nearestStep + "px";
          this.bar.style.backgroundColor = "#48cde6";
          this.currentStep = 0;
        }

        attachEventListeners() {
          let isDragging = false;

          this.handle.addEventListener("mousedown", () => {
            isDragging = true;
          });

          document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const rect = this.progressBar.getBoundingClientRect();
            const step = rect.width / 11;
            let offsetX = e.clientX - rect.left;

            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            const nearestStep = Math.round(offsetX / step) * step;

            this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
            this.bar.style.width = nearestStep + "px";
            this.bar.style.backgroundColor = "#48cde6";
            this.currentStep = Math.round(nearestStep / step);
          });

          document.addEventListener("mouseup", () => {
            isDragging = false;
          });

          this.progressBar.addEventListener("click", (e) => {
            const rect = this.progressBar.getBoundingClientRect();
            const step = rect.width / 11;
            let offsetX = e.clientX - rect.left;

            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            const nearestStep = Math.round(offsetX / step) * step;

            this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
            this.bar.style.width = nearestStep + "px";
            this.bar.style.backgroundColor = "#48cde6";
            this.currentStep = Math.round(nearestStep / step);
          });

          this.playButton?.addEventListener("click", () => {
            if (this.isPlaying) {
              this.stopProgress();
            } else {
              this.startProgress();
            }
          });
        }

        startProgress() {
          if (this.isPlaying) return;
          this.isPlaying = true;

          const rect = this.progressBar.getBoundingClientRect();
          const step = rect.width / 11;

          this.interval = setInterval(() => {
            this.currentStep++;

            if (this.currentStep > 11) {
              this.currentStep = 0;
              this.initializeProgress();
              this.stopProgress();
              return;
            }

            const nearestStep = this.currentStep * step;
            this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
            this.bar.style.width = nearestStep + "px";
            this.bar.style.backgroundColor = "#48cde6";
          }, 1000);

          this.playButton?.classList.add("pause");
          this.playButton?.classList.remove("play");
        }

        stopProgress() {
          clearInterval(this.interval);
          this.isPlaying = false;
          this.playButton?.classList.remove("pause");
          this.playButton?.classList.add("play");
        }
      }

      document.querySelectorAll(".fn-play-adj").forEach((el) => {
        new ElevationAdjustment(el);
        new PlayBarController(el);
      });

      // 재생바 슬라이드
      class WeatherSlider {
        constructor(playBar) {
          this.playBar = playBar;
          this.barPrevBtn = playBar.querySelector(".slide .ico-grey-arrow.prev");
          this.barNextBtn = playBar.querySelector(".slide .ico-grey-arrow.next");
          this.weatherWrap = playBar.querySelector(".weather-wrap");
          this.weatherItems = this.weatherWrap.querySelectorAll("li.weather");
          this.wrapWidth = this.weatherWrap.offsetWidth;
          this.itemWidth = this.weatherItems[0].offsetWidth;
          this.totalWidth = this.itemWidth * this.weatherItems.length;
          this.maxTranslateX = 0;
          this.currentIdx = 0;
          this.translateX = 0;

          this.updateMaxTranslateX();
          this.updateButtons();
          this.attachEvents();
        }

        updateMaxTranslateX() {
          if (this.totalWidth <= this.wrapWidth) {
            this.maxTranslateX = 0;
          } else {
            this.maxTranslateX = -(this.totalWidth - this.wrapWidth);
          }
        }

        updateButtons() {
          this.barPrevBtn.classList.toggle("disabled", this.currentIdx === 0);
          this.barNextBtn.classList.toggle("disabled", this.translateX <= this.maxTranslateX);
        }

        updateSlide() {
          this.updateMaxTranslateX();
          this.translateX = -this.currentIdx * this.wrapWidth;
          this.translateX = Math.max(this.translateX, this.maxTranslateX);
          this.weatherWrap.style.transform = `translateX(${this.translateX}px)`;
          this.updateButtons();
        }

        attachEvents() {
          this.barPrevBtn.addEventListener("click", () => {
            if (this.currentIdx > 0) {
              this.currentIdx--;
              this.updateSlide();
            }
          });

          this.barNextBtn.addEventListener("click", () => {
            if (this.currentIdx < this.weatherItems.length - 1) {
              this.currentIdx++;
              this.updateSlide();
            }
          });
        }
      }

      document.querySelectorAll(".play-bar").forEach((playBar) => {
        new WeatherSlider(playBar);
      });
    });
  });

  // 상단기능 버튼 정보 패널
  fnPopup.forEach(function (fnPopup) {
    let fnLayerList = fnPopup.querySelectorAll(".fn-popup .tab-contents .layer-list li");
    fnLayerList.forEach(function (list) {
      list.addEventListener("click", function () {
        if (!list.classList.contains("select")) {
          fnLayerList.forEach((i) => i.classList.remove("select"));
        }
        list.classList.toggle("select");
      });
    });
  });

  // 상단 기능 팝업 닫기
  let fnPoupClose = document.querySelectorAll(".fn-popup .ico-close");
  fnPoupClose.forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      let popup = closeBtn.closest(".fn-popup");
      let classList = popup.classList;

      topFnBtn.forEach(function (btn) {
        if (classList.contains(btn.classList[1])) {
          btn.classList.remove("select");
        }
      });
      fnPlayAdj.forEach(function (playAdj) {
        if (classList.contains(playAdj.classList[0])) {
          playAdj.classList.add("hide");
        }
      });
    });
  });

  // 가로스크롤
  function horizontalScroll(el) {
    let bars = document.querySelectorAll(el);

    bars.forEach((bar) => {
      let isDown = false;
      let startX;
      let scrollLeft;

      // 휠 스크롤
      bar.addEventListener("wheel", (event) => {
        let isSelectOpen = document.querySelector(".ui-selectmenu-button-open");
        if (event.deltaY !== 0 && !isSelectOpen) {
          bar.scrollLeft += event.deltaY;
          event.preventDefault();
        }
      });

      // 드래그 스크롤
      bar.addEventListener("mousedown", (event) => {
        let isSelectOpen = document.querySelector(".ui-selectmenu-button-open");
        if (isSelectOpen) return;
        isDown = true;
        startX = event.pageX - bar.offsetLeft;
        scrollLeft = bar.scrollLeft;
        event.preventDefault();
      });

      bar.addEventListener("mousemove", (event) => {
        if (!isDown) return;
        event.preventDefault();
        let x = event.pageX - bar.offsetLeft;
        let walk = (x - startX) * 2;
        bar.scrollLeft = scrollLeft - walk;
      });

      bar.addEventListener("mouseup", () => {
        isDown = false;
      });

      bar.addEventListener("mouseleave", () => {
        isDown = false;
      });
    });
  }

  horizontalScroll(".gnb-tab .tab-bar");
  horizontalScroll(".gnb-tab .tab-contents .filter");

  // 지도조절버튼
  let mcBtn = document.querySelectorAll(".map-control .mc-wrap .mc-btn:not(.compass)");
  mcBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("select")) {
        btn.classList.remove("select");
      } else {
        mcBtn.forEach(function (btn) {
          btn.classList.remove("select");
        });
        btn.classList.add("select");
      }
      if (!mcLayerBtn.classList.contains("select")) {
        layerPicker.classList.add("hide");
      }
    });
  });

  let mcLayerBtn = document.querySelector(".mc-btn.layer");
  let layerPicker = document.querySelector(".mc-btn.layer + .layer-picker");
  mcLayerBtn.addEventListener("click", function () {
    if (this.classList.contains("select")) {
      layerPicker.classList.remove("hide");
    } else {
      layerPicker.classList.add("hide");
    }
  });

  // 셀렉트 박스
  function createSelectBox(selectBox, isFixedWidth = false) {
    let label = selectBox.querySelector(".label");
    let options = selectBox.querySelectorAll(".optionItem");
    let labelText = label.querySelector("p");
    let maxWidth = 0;

    function calculateMaxWidth() {
      maxWidth = 0;
      options.forEach((option) => {
        let tempElement = document.createElement("span");
        tempElement.style.position = "absolute";
        tempElement.style.visibility = "hidden";
        tempElement.style.whiteSpace = "nowrap";
        tempElement.textContent = option.textContent;
        document.body.appendChild(tempElement);

        let optionWidth = tempElement.offsetWidth + 25;
        if (optionWidth > maxWidth) {
          maxWidth = optionWidth;
        }
        document.body.removeChild(tempElement);
      });
    }

    label.addEventListener("click", () => {
      selectBox.classList.toggle("active");
      if (!isFixedWidth && selectBox.classList.contains("active")) {
        label.style.width = maxWidth + "px";
      } else {
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        labelText.textContent = e.target.textContent;
        selectBox.classList.remove("active");
        options.forEach((opt) => opt.classList.remove("select"));
        option.classList.add("select");
      });
    });

    document.addEventListener("click", (e) => {
      if (!selectBox.contains(e.target)) {
        selectBox.classList.remove("active");
      }
    });

    if (!isFixedWidth) {
      calculateMaxWidth();
    }
  }

  document.querySelectorAll(".select-box").forEach((selectBox) => {
    createSelectBox(selectBox, true);
  });

  // 전체 검색 필터
  let filterBtn = document.querySelectorAll(".filter-btn");
  filterBtn.forEach((filterBtn) => {
    filterBtn.addEventListener("click", function () {
      let gnbTab = filterBtn.closest(".gnb-tab");
      let filterPopup = gnbTab.querySelector(":scope > .popup");
      filterBtn.classList.toggle("select");
      filterPopup.classList.toggle("hide");
    });

    let popupCloseBtn = document.querySelectorAll(".filter-popup .ico-close");
    popupCloseBtn.forEach(function (btn) {
      btn.addEventListener("click", function () {
        let popup = btn.closest(".popup.bg");
        popup.classList.add("hide");
        filterBtn.classList.remove("select");
      });
    });
  });

  // 팝업 닫기
  let poupClose = document.querySelectorAll(".popup .ico-close");
  poupClose.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let popup = btn.closest(".popup:not(i)");
      popup.classList.add("hide");
    });
  });

  // 팝업 열기
  let popupBtn = document.querySelectorAll(".popup-btn");
  popupBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let popupWrap = document.querySelector(".popup-wrap");
      let btnClass = [...btn.classList].find((cls) => cls !== "popup-btn");
      let dragPopup = popupWrap.querySelector(`.popup.drag.${btnClass}`);
      dragPopup.classList.toggle("hide");
    });
  });

  // 이전 (←)
  let subTabPrevBtn = document.querySelectorAll(".tab-close .ico-arrow-left");
  subTabPrevBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let gnbTabSub = btn.closest(".gnb-tab-sub");
      gnbTabSub.classList.remove("select");
      setTimeout(() => {
        let targetPopup = gnbTabWrap.querySelectorAll(".target-popup");
        targetPopup.forEach(function (popup) {
          popup.classList.add("hide");
        });
      }, 500);

      popupBtn.forEach(function (btn) {
        let popupWrap = document.querySelector(".popup-wrap");
        let btnClass = [...btn.classList].find((cls) => cls !== "popup-btn");
        let dragPopup = popupWrap.querySelector(`.popup.drag.${btnClass}`);
        dragPopup.classList.add("hide");
      });
    });
  });

  // gnb 탭 닫기 (X)
  let tabCloseBtn = document.querySelectorAll(".tab-close .ico-close");
  tabCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      gnbTab.forEach(function (gnbTab) {
        gnbTab.classList.remove("select");
      });

      gnbTabSub.forEach(function (gnbTabSub) {
        gnbTabSub.classList.remove("select");
      });

      gnbMenu.forEach(function (gnbMenu) {
        gnbMenu.classList.remove("select");
      });

      targetPopup.forEach(function (targetPopup) {
        targetPopup.classList.add("hide");
      });

      dragPopup.forEach(function (dragPopup) {
        dragPopup.classList.add("hide");
      });
    });
  });

  // 상세보기
  function clickDetailView(detailViewBtn) {
    let targetClass = [...detailViewBtn.classList].find((cls) => cls !== "detail-view");
    let detailViewPage = gnbTabWrap.querySelector(`.gnb-tab-sub.detail-view-page.${targetClass}`);
    let detailViewTop = detailViewPage.querySelector(".sub-tab-top");
    let detailViewBox = detailViewTop.querySelector(".sub-tab-top .sub-tab-box");
    let boxTargetSetting = detailViewBox.querySelector(".target-setting");
    let boxTargetCancelboxPopupCancel = detailViewBox.querySelector(".target-cancel");
    let boxTargetPopup = detailViewTop.querySelector(".target-popup");
    let boxPopupConfirm = boxTargetPopup.querySelector(".confirm");
    let boxPopupCancel = boxTargetPopup.querySelector(".cancel");
    let titleIconFlag = detailViewBox.querySelector(".title i.ico-flag");

    detailViewBtn.addEventListener("click", function () {
      detailViewPage.classList.add("select");
    });
    boxTargetSetting.addEventListener("click", function () {
      boxTargetPopup.classList.remove("hide");
    });
    boxPopupCancel.addEventListener("click", function () {
      boxTargetPopup.classList.add("hide");
    });
    boxPopupConfirm.addEventListener("click", function () {
      boxTargetPopup.classList.add("hide");
      boxTargetSetting.classList.add("hide");
      boxTargetCancelboxPopupCancel.classList.remove("hide");
      titleIconFlag.classList.remove("hide");
    });
    boxTargetCancelboxPopupCancel.addEventListener("click", function () {
      boxTargetCancelboxPopupCancel.classList.add("hide");
      titleIconFlag.classList.add("hide");
      boxTargetSetting.classList.remove("hide");
    });
  }

  let detailViewBtn = document.querySelectorAll(".search-list-wrap .button .detail-view");
  detailViewBtn.forEach(function (btn) {
    clickDetailView(btn);
  });

  // 타겟설정
  function clickTargetSetting(targetSettingBtn) {
    let targetClass = [...targetSettingBtn.classList].find((cls) => cls !== "target-setting");
    let targetPopupBg = gnbTabWrap.querySelector(":scope > .popup.bg");
    if (!targetPopupBg) return;
    let targetPopup = targetPopupBg.querySelector(`.target-popup:not(.check).${targetClass}`);
    let targetPopupCheck = targetPopupBg.querySelector(`.target-popup.check.${targetClass}`);
    let targetPopupCancel = targetPopup.querySelector(".cancel");
    let targetPopupConfirm = targetPopup.querySelector(".confirm");
    let targetPopupCheckCancel = targetPopupCheck.querySelector(".cancel");
    let targetPopupCheckConfirm = targetPopupCheck.querySelector(".confirm");

    let targetSettingPage = gnbTabWrap.querySelector(`.gnb-tab-sub.target-setting-page.${targetClass}`);
    let targetSettingTop = targetSettingPage.querySelector(".sub-tab-top");
    let targetSettingBox = targetSettingTop.querySelector(".sub-tab-top .sub-tab-box");
    let boxTargetSetting = targetSettingBox.querySelector(".target-setting");
    let boxTargetCancel = targetSettingBox.querySelector(".target-cancel");
    let boxTargetPopup = targetSettingTop.querySelector(".target-popup");
    let boxPopupConfirm = boxTargetPopup.querySelector(".confirm");
    let boxPopupCancel = boxTargetPopup.querySelector(".cancel");
    let titleIconFlag = targetSettingBox.querySelector(".title i.ico-flag");

    targetSettingBtn.addEventListener("click", function () {
      targetPopupBg.classList.remove("hide");
      targetPopup.classList.remove("hide");
    });
    targetPopupCancel.addEventListener("click", function () {
      targetPopupBg.classList.add("hide");
      targetPopup.classList.add("hide");
    });
    targetPopupConfirm.addEventListener("click", function () {
      targetPopupCheck.classList.remove("hide");
      targetPopup.classList.add("hide");
    });
    targetPopupCheckCancel.addEventListener("click", function () {
      targetPopupBg.classList.add("hide");
      targetPopupCheck.classList.add("hide");
    });
    targetPopupCheckConfirm.addEventListener("click", function () {
      targetPopupBg.classList.add("hide");
      targetPopupCheck.classList.add("hide");
      targetSettingPage.classList.add("select");
    });

    boxTargetSetting.addEventListener("click", function () {
      boxTargetPopup.classList.remove("hide");
    });
    boxPopupCancel.addEventListener("click", function () {
      boxTargetPopup.classList.add("hide");
    });
    boxPopupConfirm.addEventListener("click", function () {
      boxTargetPopup.classList.add("hide");
      boxTargetSetting.classList.add("hide");
      boxTargetCancel.classList.remove("hide");
      titleIconFlag.classList.remove("hide");
    });
    boxTargetCancel.addEventListener("click", function () {
      boxTargetCancel.classList.add("hide");
      boxTargetSetting.classList.remove("hide");
      titleIconFlag.classList.add("hide");
    });
  }

  let targetSettingBtn = document.querySelectorAll(".search-list-wrap .button .target-setting");
  targetSettingBtn.forEach(function (btn) {
    clickTargetSetting(btn);
  });

  // 데이터 범례 수정 버튼
  let legendEditBtns = document.querySelectorAll(".legend-list .button .edit");
  legendEditBtns.forEach(function (legendEditBtn) {
    let legendList = legendEditBtn.closest(".legend-list");
    let legendCloseBtn = legendList.querySelector(".button .close");

    legendEditBtn.addEventListener("click", function () {
      legendList.classList.add("edit");
      legendEditBtn.textContent = "초기화";
      legendCloseBtn.textContent = "적용";

      legendCloseBtn.dataset.role = "apply";
      legendCloseBtn.classList.remove("close");
    });
  });

  // 데이터 범례 닫기 / 적용
  let legendCloseBtns = document.querySelectorAll(".legend-list .button .close");

  legendCloseBtns.forEach(function (legendCloseBtn) {
    let hiddenList = legendCloseBtn.closest(".hidden-list");
    let legendList = legendCloseBtn.closest(".legend-list");
    let listHeader = legendList.querySelector(".list-header");
    let legendEditBtn = legendList.querySelector(".button .edit");

    legendCloseBtn.addEventListener("click", function () {
      if (legendCloseBtn.dataset.role === "apply") {
        legendList.classList.remove("edit");
        legendEditBtn.textContent = "수정";
        legendCloseBtn.textContent = "닫기";

        legendCloseBtn.dataset.role = "close";
        legendCloseBtn.classList.add("close");
      } else {
        listHeader.classList.remove("select");
        hiddenList.style.height = "0";
      }
    });
  });

  // 데이터 범례 팝업
  let editAddBtns = document.querySelectorAll(
    ".legend-list .hidden-list .btn-wrap .add, .legend-list .hidden-list i.ico-eraser"
  );
  let editAddPopup = document.querySelector(".legend-popup");
  let editAddPopupClose = editAddPopup.querySelector(".title i.ico-close");
  let popup = editAddPopup.closest(".popup.bg");
  editAddBtns.forEach(function (editAddBtn) {
    editAddBtn.addEventListener("click", function () {
      editAddPopup.classList.remove("hide");
      popup.classList.remove("hide");
    });
  });
  editAddPopupClose.addEventListener("click", function () {
    editAddPopup.classList.add("hide");
  });
  let colorInput = document.querySelector('.color-code input[type="color"]');
  let hexInput = document.querySelector('.color-code input[type="text"]');
  // color picker → HEX
  colorInput.addEventListener("input", function () {
    hexInput.value = colorInput.value.toUpperCase();
  });
  // HEX → color picker
  hexInput.addEventListener("input", function () {
    let hex = hexInput.value.trim();
    if (/^#([0-9A-Fa-f]{6})$/.test(hex)) {
      colorInput.value = hex;
    }
  });

  // 데이터 범례/배치목록 토글
  let listHeaders = document.querySelectorAll(".placement-list .list-header, .legend-list .list-header");

  listHeaders.forEach(function (header) {
    let hiddenList = header.nextElementSibling;
    header.addEventListener("click", function () {
      let isOpen = header.classList.contains("select");
      if (isOpen) {
        header.classList.remove("select");
        hiddenList.style.height = "0";
      } else {
        header.classList.add("select");
        hiddenList.style.height = "auto";
      }
    });
    let stopTargets = header.querySelectorAll("input:not([type='checkbox']), button");
    stopTargets.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  });

  // 배치목록 삭제
  let trashBtns = document.querySelectorAll(".placement-list:not(.popup) .ico-trash");
  trashBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let listItem = btn.closest("li");
      let listHiddenItem = listItem.nextElementSibling;
      let parentList = listItem.closest("ul");

      let listItemHeight = listItem.offsetHeight;
      let listHiddenItemHeight = listHiddenItem ? listHiddenItem.offsetHeight : 0;

      if (listItem) {
        listItem.remove();
        if (listHiddenItem) listHiddenItem.remove();
        requestAnimationFrame(() => {
          let newHeight = parentList.offsetHeight - (listItemHeight + listHiddenItemHeight);
          parentList.style.height = newHeight + "px";
        });
      }
    });
  });

  // 배치목록 리스트 토글
  let listTitle = document.querySelectorAll(".placement-list .list-contents .list-content > .title:not(.empty)");
  listTitle.forEach(function (title) {
    let rotated = false;
    let buildingList = title.nextElementSibling;
    let hiddenListHeight = buildingList.scrollHeight;
    buildingList.style.height = hiddenListHeight + "px";

    let detailList = buildingList.querySelectorAll("li:not(.hidden-list)");
    if (!title.classList.contains("empty")) {
      title.addEventListener("click", function () {
        if (rotated) {
          title.classList.add("select");
          buildingList.style.height = buildingList.scrollHeight + "px";

          let totalHeight = buildingList.scrollHeight;

          detailList.forEach(function (detailList) {
            if (detailList.classList.contains("select")) {
              let rotatedHiddenList = detailList.nextElementSibling;

              totalHeight += rotatedHiddenList.scrollHeight;
              buildingList.style.height = `${totalHeight}px`;
            }
          });
        } else {
          title.classList.remove("select");
          buildingList.style.height = "0";
        }
        rotated = !rotated;
      });
    } else {
      buildingList.style.height = "auto";
    }
  });

  // 배치목록 세부 토글
  let hiddenListHeader = document.querySelectorAll(
    ".placement-list .list-contents .list-content ul li:not(.hidden-list)"
  );
  hiddenListHeader.forEach(function (header) {
    let rotated = false;
    let buildingHiddenList = header.nextElementSibling;
    let buildingWrap = header.closest("ul");

    header.addEventListener("click", function () {
      let hiddenListHeight = 0;
      let listContents = buildingHiddenList.querySelectorAll("div");
      listContents.forEach(function (content) {
        hiddenListHeight += content.offsetHeight;
      });
      if (rotated) {
        header.classList.remove("select");
        buildingHiddenList.style.height = "0";
        buildingWrap.style.height = buildingWrap.offsetHeight - (hiddenListHeight + 8) + "px";
      } else {
        header.classList.add("select");
        buildingHiddenList.style.height = hiddenListHeight + 8 + "px";
        buildingWrap.style.height = buildingWrap.offsetHeight + hiddenListHeight + 8 + "px";
      }
      rotated = !rotated;
    });

    let inputs = header.querySelectorAll("input");
    inputs.forEach(function (input) {
      input.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });

  // input 길이 조절
  function adjustWidth(input) {
    let span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "nowrap";
    span.style.font = window.getComputedStyle(input).font;
    span.innerText = input.value || input.placeholder;

    document.body.appendChild(span);
    let width = span.offsetWidth;
    document.body.removeChild(span);

    input.style.width = `${width}px`;
  }

  let editInput = document.querySelectorAll(".edit-input");
  editInput.forEach((input) => {
    adjustWidth(input);
    input.addEventListener("input", () => adjustWidth(input));
  });

  // 수정버튼 <-> 초기화 버튼
  let listEditBtn = document.querySelectorAll(".placement-list .list-contents button.edit");
  let editSaveBtn = document.querySelectorAll(".placement-list:not(.placement-popup) .list-contents button.save");
  listEditBtn.forEach(function (btn) {
    let listContents = btn.closest(".list-contents");
    let editDel = listContents.querySelector(".placement-list .btn-wrap.edit-del");
    let resetSave = listContents.querySelector(".placement-list .btn-wrap.reset-save");
    let listTitleInput = btn.closest(".placement-list").querySelector(".list-header .title input");

    btn.addEventListener("click", function () {
      let editInput = btn.closest(".placement-list").querySelectorAll(".edit-input");
      editInput.forEach(function (input) {
        input.readOnly = false;
        input.focus();
      });
      resetSave.classList.remove("hide");
      editDel.classList.add("hide");

      if (listTitleInput) {
        listTitleInput.classList.add("edit");
      }
    });
  });

  editSaveBtn.forEach(function (btn) {
    let listContents = btn.closest(".list-contents");
    let editDel = listContents.querySelector(".placement-list .btn-wrap.edit-del");
    let resetSave = listContents.querySelector(".placement-list .btn-wrap.reset-save");
    let listTitleInput = btn.closest(".placement-list").querySelector(".list-header .title input");
    btn.addEventListener("click", function () {
      let editInput = btn.closest(".placement-list").querySelectorAll(".edit-input");
      editInput.forEach(function (input) {
        input.readOnly = true;
      });
      resetSave.classList.add("hide");
      editDel.classList.remove("hide");
      if (listTitleInput) {
        listTitleInput.classList.remove("edit");
      }
    });
  });

  // 새로운 가상건물 배치
  let placementBtn = document.querySelector(".placement-btn");
  let toolBox = document.querySelector(".gnb-tab.placement .tool-box");

  placementBtn.addEventListener("click", function () {
    let gnbTab = placementBtn.closest(".gnb-tab");
    let placementPopup = gnbTab.querySelector(":scope > .popup");
    placementBtn.classList.toggle("select");
    placementPopup.classList.toggle("hide");
    toolBox.classList.add("show-menu");
  });

  let popupCloseBtn = document.querySelectorAll(".placement-popup .ico-close");
  popupCloseBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let popup = btn.closest(".popup.bg");

      popup.classList.add("hide");
      placementBtn.classList.remove("select");

      toolBox.classList.remove("show-menu");
      toolBox.classList.remove("show-asset");

      toolMenuBtn.forEach(function (btn) {
        btn.classList.remove("select");
      });

      buildingAssetBtn.classList.remove("select");
    });
  });

  let buildingAssetBtn = document.querySelector(".btn.building-asset");
  buildingAssetBtn.addEventListener("click", function () {
    buildingAssetBtn.classList.toggle("select");
    toolBox.classList.toggle("show-asset");
  });

  let toolMenuBtn = document.querySelectorAll(".tool-btn-wrap .btn.tool");
  toolMenuBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("select");
      toolMenuBtn.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.classList.remove("select");
        }
      });
    });
  });

  // 더보기
  let accountSettingBtn = document.querySelector(".gnb-tab.detail button.setting");
  accountSettingBtn.addEventListener("click", function () {
    let accountPopup = document.querySelector(".popup-wrap .account");
    accountPopup.classList.remove("hide");
  });

  let legendSettingBtn = document.querySelector(".gnb-tab.detail .etc .data-legend-setting");
  legendSettingBtn.addEventListener("click", function () {
    let legendSettingPopup = document.querySelector(".gnb-tab-sub.legend-setting-page");
    legendSettingPopup.classList.add("select");
  });

  // 수정버튼 <-> 취소 버튼
  let accountEditBtn = document.querySelectorAll(".popup.drag.account button.edit");
  let accountCancelBtn = document.querySelectorAll(".popup.drag.account button.cancel");

  accountEditBtn.forEach(function (btn) {
    let popup = btn.closest(".popup.drag");
    let editClose = popup.querySelector(".popup.drag.account .btn-wrap.edit-close");
    let cancelSave = popup.querySelector(".popup.drag.account .btn-wrap.cancel-save");

    btn.addEventListener("click", function () {
      let editInput = btn.closest(".account").querySelectorAll("input");

      editInput.forEach(function (input) {
        input.readOnly = false;
        input.focus();
      });

      cancelSave.classList.remove("hide");
      editClose.classList.add("hide");
    });
  });

  accountCancelBtn.forEach(function (btn) {
    let popup = btn.closest(".popup.drag");
    let editClose = popup.querySelector(".popup.drag.account .btn-wrap.edit-close");
    let cancelSave = popup.querySelector(".popup.drag.account .btn-wrap.cancel-save");

    btn.addEventListener("click", function () {
      let editInput = btn.closest(".account").querySelectorAll("input");
      editInput.forEach(function (input) {
        input.readOnly = true;
      });

      cancelSave.classList.add("hide");
      editClose.classList.remove("hide");
    });
  });

  // 아코디언
  function accordion(selectAccor) {
    document.querySelectorAll(selectAccor).forEach((accor) => {
      accor._isOpen = false;
      let content = accor.nextElementSibling;

      accor.addEventListener("click", function () {
        accor._isOpen = !accor._isOpen;

        if (accor._isOpen) {
          accor.classList.add("select");
          content.style.height = content.scrollHeight + "px";
        } else {
          accor.classList.remove("select");
          content.style.height = "0";
        }
      });
    });
  }
  accordion(".detail-view-bottom .fpl .title");
  accordion(".detail-view-bottom .detail .title");

  // 노탐정보 버튼
  let notamBtns = document.querySelectorAll(".notam-info > div .info-btn");
  notamBtns.forEach(function (notamBtn) {
    let notamInfo = notamBtn.nextElementSibling;
    notamBtn.addEventListener("click", function () {
      notamInfo.classList.toggle("hide");
    });
  });
});

/////////////////////////////////////////////////////////////////

// jquery
$(function () {
  // datepicker
  $(".datepicker-input").datepicker({
    dateFormat: "yy.mm.dd",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input, _) {
      let bottomWrap = $(input).closest(".bottom-wrap");
      $(bottomWrap).on("scroll touchmove mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
    },
    onClose: function (_, inst) {
      $(".bottom-wrap").off("scroll touchmove mousewheel");
    },
  });

  $(".bar-datepicker-input").datepicker({
    dateFormat: "yy.mm.dd",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input, _) {
      setTimeout(() => {
        let inputPosition = $(input).offset();
        let datepickerHeight = $(".ui-datepicker").outerHeight();
        $(".ui-datepicker")
          .addClass("bar-datepicker")
          .css({
            position: "absolute",
            top: inputPosition.top - datepickerHeight,
            left: inputPosition.left,
            marginTop: "0px",
          });
      }, 0);
    },
    onClose: function () {
      $(".ui-datepicker").removeClass("bar-datepicker").css({
        position: "",
        top: "",
        left: "",
      });
    },
  });

  $(".select-box-in-overflow")
    .selectmenu({
      position: {
        my: "left top+4",
        collision: "flip",
      },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");

  // 컨텐츠 내부 select-box
  $(".select-box-in-content")
    .selectmenu({
      position: {
        my: "left top+4",
        collision: "flip",
      },
      create: function (event, ui) {
        $(this).selectmenu("menuWidget").parent().addClass("bar-select-box");
      },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");
});
