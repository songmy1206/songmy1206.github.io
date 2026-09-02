document.addEventListener("DOMContentLoaded", function () {
  tabMove();
  TabContainer(".header-tab .tab-title li", ".contents.tab");

  // map-container toggle
  let legendToggleBtn = document.querySelectorAll(".legend-toggle");
  for (let i = 0; i < legendToggleBtn.length; i++) {
    legendToggleBtn[i].addEventListener("click", function (event) {
      let legendContent = event.target.parentElement.parentElement;
      legendContent.classList.toggle("show");
    });
    let icons = legendToggleBtn[i].querySelectorAll("i");
    icons.forEach(function (icon) {
      icon.addEventListener("click", function () {
        icon.classList.toggle("active");
      });
    });
  }

  // 팝업
  let dsbPopUpBtn = document.querySelectorAll(".dsb-popup-btn");
  for (let i = 0; i < dsbPopUpBtn.length; i++) {
    // 팝업 토글
    dsbPopUpBtn[i].addEventListener("click", function (event) {
      let dsbPopup = event.target.closest(".contents.tab").querySelector(".dsb-popup");
      if (dsbPopup.classList.contains("hide")) {
        dsbPopup.classList.remove("hide");
        event.target.classList.add("active");
      } else {
        dsbPopup.classList.add("hide");
        event.target.classList.remove("active");
      }
    });

    let dsbPopup = dsbPopUpBtn[i].closest(".contents.tab").querySelector(".dsb-popup");
    let closeBtn = document.querySelectorAll(".dsb-close");
    // 팝업 닫기
    for (let i = 0; i < closeBtn.length; i++) {
      closeBtn[i].addEventListener("click", function () {
        if (!dsbPopup.classList.contains("hide")) {
          dsbPopup.classList.add("hide");
          dsbPopUpBtn[i].classList.remove("active");
        }
      });
    }
  }

  function TabContainer(tabTit, tabDetl) {
    let tabTitles = document.querySelectorAll(tabTit);
    let tabDetails = document.querySelectorAll(tabDetl);

    tabTitles[0].classList.add("active");
    tabDetails[0].classList.add("active");

    tabTitles.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        tabDetails.forEach(function (detail) {
          detail.classList.remove("active");
        });
        tabTitles.forEach(function (title) {
          title.classList.remove("active");
        });
        tab.classList.add("active");
        tabDetails[index].classList.add("active");
        tabMove();
      });
    });
  }

  // 크기에 따른 flex
  function checkPanelWidth() {
    let tabActive = document.querySelector(".tab.active");
    let divider = tabActive.querySelector(".divider");
    let panel1 = tabActive.querySelector(".panels-wrap:first-child");
    let dividerWidth = divider.offsetWidth;

    let panelWrapWidth = panel1.offsetWidth;
    let graphContainer = tabActive.querySelector(".panel.graph-container");
    let graphContainerWidth = graphContainer.offsetWidth;
    let listContainer = panel1.querySelector(".panel.list-container");
    let scrollBottomBtn = tabActive.querySelector(".scroll-btn");

    if (panel1.offsetWidth < 560) {
      panel1.classList.add("least");
    } else {
      panel1.classList.remove("least");
    }

    if (panelWrapWidth - dividerWidth < 720) {
      panel1.classList.add("column");
      graphContainer.classList.add("column");
      listContainer.classList.add("column");
      scrollBottomBtn.classList.add("column");

      panel1.classList.remove("row");
      graphContainer.classList.remove("row");
      listContainer.classList.remove("row");
      scrollBottomBtn.classList.remove("row");

      // scroll-btn
      let isScrolledToBottom = false;

      panel1.addEventListener("scroll", changeIcon);

      function scrollToBottom() {
        let elementMiddle = panel1.offsetTop + panel1.offsetHeight / 2;
        let scrollMiddle = panel1.scrollTop + panel1.clientHeight / 2;
        if (panel1.scrollTop === panel1.scrollHeight - panel1.clientHeight) {
          panel1.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (scrollMiddle < elementMiddle) {
          panel1.scrollTo({
            top: panel1.scrollHeight,
            behavior: "smooth",
          });
        } else if (scrollMiddle > elementMiddle) {
          panel1.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        isScrolledToBottom = !isScrolledToBottom;
      }

      scrollBottomBtn.addEventListener("click", scrollToBottom);

      function changeIcon() {
        let scrollMiddle = panel1.scrollTop + panel1.clientHeight / 2;
        let elementMiddle = panel1.offsetTop + panel1.offsetHeight / 2;

        if (scrollMiddle < elementMiddle) {
          scrollBottomBtn.querySelector("i:last-child").style.opacity = "0";
          scrollBottomBtn.querySelector("i:first-child").style.opacity = "1";
        } else if (scrollMiddle > elementMiddle) {
          scrollBottomBtn.querySelector("i:first-child").style.opacity = "0";
          scrollBottomBtn.querySelector("i:last-child").style.opacity = "1";
        }
      }

      // 페이지 로드 시 아이콘 클래스 변경
      changeIcon();

      // scroll-btn 위치 고정
      positionScrollBottom();

      function positionScrollBottom() {
        let panelsWrapRect = panel1.getBoundingClientRect();
        scrollBottomBtn.style.left = panelsWrapRect.right - 70 + "px";

        scrollBottomBtn.classList.add("btn-fixed");
      }
    } else {
      listContainer.style.width = `calc(100% - ${graphContainerWidth}px - 10px)`;

      panel1.classList.add("row");
      graphContainer.classList.add("row");
      scrollBottomBtn.classList.add("row");

      panel1.classList.remove("column");
      graphContainer.classList.remove("column");
      listContainer.classList.remove("column");
      scrollBottomBtn.classList.remove("column");
    }
  }

  function tabMove() {
    let tabActive = document.querySelector(".tab.active");
    // resize
    let divider = tabActive.querySelector(".resize-panels .divider");
    let panel1 = tabActive.querySelector(".panels-wrap:first-child");
    let panel2 = tabActive.querySelector(".panels-wrap:last-child");
    let isResizing = false;

    let dividerWidth = divider.offsetWidth;

    divider.addEventListener("mousedown", function (event) {
      isResizing = true;
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
      document.addEventListener("mousemove", checkPanelWidth);
    });

    function resize(event) {
      if (isResizing) {
        let containerRect = tabActive.querySelector(".resize-panels").getBoundingClientRect();
        let mouseX = event.clientX;
        let containerLeft = containerRect.left;
        let containerWidth = containerRect.width;
        let newPartition1Width = mouseX - containerLeft - dividerWidth / 2;

        panel1.style.width = `${newPartition1Width}px`;
        panel2.style.width = `${containerWidth - newPartition1Width - dividerWidth}px`;
      }
    }

    function stopResize() {
      isResizing = false;
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    }

    checkPanelWidth();
    window.addEventListener("resize", checkPanelWidth);

    function width100() {
      let panelWrap = tabActive.querySelector(".panels-wrap:first-child");
      let panelWrapWidth = panelWrap.offsetWidth;
      let mapContainer = tabActive.querySelector(".panels-wrap:last-child");
      mapContainer.style.width = `calc(100% - ${panelWrapWidth}px)`;
    }
    window.addEventListener("resize", width100);

    // graph-container tab
    let graphTabBtns = tabActive.querySelectorAll(".graph-container .panel-content .btn li");
    let graphContents = tabActive.querySelectorAll(".graph-container .graph > div");
    graphTabBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        graphTabBtns.forEach((allBtn) => {
          allBtn.classList.remove("active");
        });
        btn.classList.add("active");

        graphContents.forEach((content) => {
          content.classList.add("hide");
        });
        graphContents[index].classList.remove("hide");
      });
    });
  }
  
  document.querySelectorAll(".contents .slider, .main-wrap.dsb .contents").forEach((container) => {
    let dividers = container.querySelectorAll(".divider");
    dividers.forEach((divider) => {
      let isDragging = false;
      let isVertical = divider.classList.contains("vertical");

      divider.addEventListener("mousedown", (e) => {
        isDragging = true;
        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        let prevSection = divider.previousElementSibling;
        let nextSection = divider.nextElementSibling;
        let containerRect = divider.parentElement.getBoundingClientRect();
        let dividerRect = divider.getBoundingClientRect();

        if (isVertical) {
          // 수직
          let newPrevSectionHeight = e.clientY - containerRect.top;
          let newNextSectionHeight = containerRect.bottom - e.clientY - dividerRect.height;

          // 최소 넓이 255px // slide-container , slide 최소넓이 css로 조절
          if (newPrevSectionHeight >= 255 && newNextSectionHeight >= 255) {
            prevSection.style.height = `${newPrevSectionHeight}px`;
            nextSection.style.height = `${newNextSectionHeight}px`;
          }
        } else {
          // 수평
          let newPrevSectionWidth = e.clientX - containerRect.left;
          let newNextSectionWidth = containerRect.right - e.clientX - dividerRect.width;

          // 최소 높이 255px
          if (newPrevSectionWidth >= 300 && newNextSectionWidth >= 300) {
            prevSection.style.width = `${newPrevSectionWidth}px`;
            nextSection.style.width = `${newNextSectionWidth}px`;
          }
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    });
  });
});
