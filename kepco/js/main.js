document.addEventListener("DOMContentLoaded", function () {
  function calculateWidth() {
    // 길이 계산
    let div1 = document.querySelectorAll(".nav-content:not(.main-nav_4 .nav-content)");
    let div2 = document.querySelectorAll(".nav-sub-wrap");
    let div3_1 = document.querySelectorAll(".nav2-sub2-wrap");
    let div3_2 = document.querySelectorAll(".nav3-sub2-wrap");
    let div4 = document.querySelectorAll(".sub-common.n2s2-content4-sub1");
    let div5 = document.querySelectorAll(".main-nav_1 .nav-content-wrap");
    let div6 = document.querySelectorAll(".nc-sub2");

    let widths = [];

    div1.forEach(function (div) {
      if (!div.parentElement.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div2.forEach(function (div) {
      if (!div.parentElement.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div3_1.forEach(function (div) {
      if (!div.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div3_2.forEach(function (div) {
      if (!div.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div4.forEach(function (div) {
      if (!div.parentElement.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div5.forEach(function (div) {
      if (!div.parentElement.classList.contains("hide")) {
        widths.push(div.clientWidth);
      }
    });

    div6.forEach(function (div) {
      if (!div.classList.contains("hide")) {
        widths.push(div.clientWidth + 415);
      }
    });

    if (widths.length > 0) {
      let maxWidth = Math.max(...widths);
      let newWidth = (100 * window.innerWidth) / 100 - 450 - maxWidth;

      widgetTabPopup.style.width = newWidth + "px";
    }
  }

  document.addEventListener("click", calculateWidth);
  window.addEventListener("resize", calculateWidth);

  // 위젯 탭
  let shBtn = document.querySelector(".widget.tab .sh-btn");
  let shBtnNext = document.querySelector(".widget.tab .sh-btn i.next");
  let shBtnPrev = document.querySelector(".widget.tab .sh-btn i.prev");
  let widgetTabPopup = document.querySelector(".tab-content-popup.popUp");
  shBtn.addEventListener("click", function () {
    let widgetTab = document.querySelector(".widget.tab");
    widgetTab.classList.toggle("toggle-hide");
    shBtnNext.classList.toggle("hide");
    shBtnPrev.classList.toggle("hide");

    if (widgetTab.classList.contains("toggle-hide")) {
      widgetTabPopup.classList.add("hide");
    } else {
      widgetTabPopup.classList.remove("hide");
    }
  });

  // 위젯 팝업
  let widget1Btn = document.querySelector(".header-btn .header-btn_1");
  widget1Btn.addEventListener("click", function () {
    let widget1 = document.querySelector(".popUp.widget1");
    widget1.classList.remove("hide");
  });
  let widget2Btn = document.querySelector(".header-btn .header-btn_2");
  widget2Btn.addEventListener("click", function () {
    let widget2 = document.querySelector(".popUp.widget2");
    widget2.classList.remove("hide");
  });
  let widget3Btn = document.querySelector(".header-btn .header-btn_3");
  widget3Btn.addEventListener("click", function () {
    let widget3 = document.querySelector(".popUp.widget3");
    widget3.classList.remove("hide");
  });
  let widget4Btn = document.querySelector(".header-btn .header-btn_4");
  widget4Btn.addEventListener("click", function () {
    let widget4 = document.querySelector(".popUp.widget4");
    widget4.classList.remove("hide");
  });

  let mainNavs = document.querySelectorAll(".main-wrap nav ul li");

  mainNavs.forEach(function (mainNav) {
    mainNav.addEventListener("click", function () {
      // 네비게이션 컨텐츠 토글
      // 네비게이션 배경색 변경
      let mainNavClass = this.classList[0];
      let content = document.querySelector("." + mainNavClass + ".nav-contents");

      mainNavs.forEach(function (nav) {
        if (nav !== mainNav) {
          let navClass = nav.classList[0];
          let otherContent = document.querySelector("." + navClass + ".nav-contents");
          if (otherContent) {
            otherContent.classList.add("hide");
            nav.classList.remove("active");
          }
        }
      });
      if (content) {
        content.classList.toggle("hide");
        mainNav.classList.toggle("active");
      }

      // main-nav_5
      // 슬라이더
      let slider = document.querySelector(".slider");
      let sliderEls = slider.querySelector(".nc-sub1-contents");
      let slides = sliderEls.querySelectorAll(".nc-sc");
      let prevBtn = slider.querySelector(".prev");
      let nextBtn = slider.querySelector(".next");
      let slideWidth = sliderEls.offsetWidth;
      let currentIndex = 0;
      let totalSlideWidth = 0;

      slides.forEach((slide) => {
        totalSlideWidth += slide.offsetWidth + 15;
      });
      let maxSlideWidth = totalSlideWidth - slideWidth;

      function updateSlider(index) {
        let moveSlide = -index * 250;
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.transform = `translateX(${moveSlide}px)`;
        }
        currentIndex = index;
      }
      prevBtn.addEventListener("click", () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider(currentIndex);
      });

      nextBtn.addEventListener("click", () => {
        currentIndex = Math.min(currentIndex + 1, maxSlideWidth / 250);
        updateSlider(currentIndex);
      });

      function updateSliderOnResize() {
        slideWidth = sliderEls.offsetWidth;
        maxSlideWidth = totalSlideWidth - slideWidth;

        if (slideWidth >= totalSlideWidth) {
          prevBtn.classList.add("hide");
          nextBtn.classList.add("hide");
        } else {
          prevBtn.classList.remove("hide");
          nextBtn.classList.remove("hide");
        }

        updateSlider(currentIndex);
      }

      updateSliderOnResize();
      window.addEventListener("resize", updateSliderOnResize);
    });
  });

  // ... 아이콘
  let ncSubIcons = document.querySelectorAll(".nav-content-name i.more");
  ncSubIcons.forEach(function (ncSubIcon) {
    ncSubIcon.addEventListener("click", function () {
      // 숨겨진 컨텐츠 보이게
      let navContent = ncSubIcon.closest("li.nav-content");
      let ncHide = navContent.nextElementSibling;
      let ncSubName = ncSubIcon.parentElement.previousElementSibling;

      if (ncHide.classList.contains("nav-content-hide")) {
        ncHide.classList.toggle("hide");

        // 클릭시 boder-bottom 숨겨진 컨텐츠로 변경
        ncHide.classList.toggle("b-bottom", !ncHide.classList.contains("hide"));
        navContent.classList.toggle("b-bottom");

        // 컨텐츠 이름 색상 변경
        if (ncSubName) {
          ncSubName.classList.toggle("active");
        }
      }

      // 더보기 아이콘 변경
      if (ncSubName) {
        ncSubIcon.classList.toggle("active");
      }
    });
  });

  let pinIcons = document.querySelectorAll("i.pin");
  pinIcons.forEach(function (pinIcon) {
    pinIcon.addEventListener("click", function () {
      pinIcon.classList.toggle("active");
    });
  });

  let ncSub20Icons = document.querySelectorAll(".nav-content-name i.more20");
  ncSub20Icons.forEach(function (ncSub20Icon) {
    ncSub20Icon.addEventListener("click", function () {
      let navContent = ncSub20Icon.closest("li.nav-content");
      let acHide = navContent.nextElementSibling;

      if (acHide.classList.contains("hide")) {
        document.querySelectorAll(".accor-contents").forEach(function (item) {
          item.classList.add("hide");
        });
        document.querySelectorAll(".nav-content-name i.more20").forEach(function (item) {
          item.classList.remove("active");
        });
        acHide.classList.remove("hide");
        ncSub20Icon.classList.add("active");
      } else {
        acHide.classList.add("hide");
        ncSub20Icon.classList.remove("active");
      }
    });
  });

  // 서브버튼 컨텐츠
  let btn = document.querySelector(".nav-contents .main-btn");
  let nc1ContentWrap = document.querySelector(".nc1-contents");
  let ncSubContentsWrap = document.querySelector(".nc-sub-contents-wrap");

  let subBtns = document.querySelectorAll("li.nav-content-hide .sub-btn button");
  let subContWrap = document.querySelector(".nc-sub-contents-wrap");
  let subBtnContents = document.querySelectorAll(".nc-sub-contents-wrap > div");

  subBtns.forEach(function (subBtn) {
    subBtn.addEventListener("click", function () {
      let index = Array.from(subBtn.parentElement.children).indexOf(subBtn);
      btn.classList.remove("active");
      nc1ContentWrap.classList.add("hide");

      subContWrap.classList.remove("hide");
      subBtns.forEach(function (otherBtn) {
        if (otherBtn !== subBtn) {
          otherBtn.classList.remove("active");
        }
      });
      subBtn.classList.add("active");
      subBtnContents.forEach(function (subBtnContent) {
        subBtnContent.classList.add("hide");
      });
      subBtnContents[index].classList.remove("hide");
    });
  });

  btn.addEventListener("click", function () {
    btn.classList.add("active");

    nc1ContentWrap.classList.remove("hide");
    ncSubContentsWrap.classList.add("hide");

    subBtns.forEach(function (otherBtn) {
      otherBtn.classList.remove("active");
    });
  });

  let cancleBtns = document.querySelectorAll(".apply-btn .cancel");
  cancleBtns.forEach(function (cancleBtn) {
    cancleBtn.addEventListener("click", function () {
      btn.classList.remove("active");
      subBtns.forEach(function (subBtn) {
        subBtn.classList.remove("active");
      });

      let cancelPageClose = this.closest(".close-wrap");
      let cancelPagePrev = this.closest(".prev-wrap");
      if (cancelPageClose) {
        cancelPageClose.classList.add("hide");
      }
      if (cancelPagePrev) {
        cancelPagePrev.classList.add("hide");
      }
    });
  });

  //닫기
  let closeIcons = document.querySelectorAll(" i.close:not(.popUp i.close)");
  closeIcons.forEach(function (closeIcon) {
    closeIcon.addEventListener("click", function () {
      let closeWrap = this.closest(".close-wrap");
      closeWrap.classList.add("hide");
      subContWrap.classList.add("hide");
      subBtns.forEach(function (subBtn) {
        subBtn.classList.remove("active");
      });
    });
  });

  // 팝업 닫기
  let closePopups = document.querySelectorAll(".popUp i.close, .popUp .popup-btn-fe button.cancel");
  closePopups.forEach(function (closePopup) {
    closePopup.addEventListener("click", function () {
      let closeWrap = this.closest(".popUp");
      closeWrap.classList.add("hide");
    });
  });

  // 이미지 보기
  let imgViewers = document.querySelectorAll(".nc1-content dl dt .img-viewer");

  imgViewers.forEach((imgViewer) => {
    imgViewer.addEventListener("click", function () {
      let imgViewerPopup = document.querySelector(".img-popup");
      imgViewerPopup.classList.remove("hide");
    });
  });

  // 수정 팝업
  let editPopupBtns = document.querySelectorAll(".nc1-content .list-contents i.edit");
  editPopupBtns.forEach(function (editPopupBtn) {
    editPopupBtn.addEventListener("click", function () {
      let editPopup = document.querySelector(".nc1-contents .popUp.detail-popup");
      editPopup.classList.remove("hide");
    });
  });

  // 페이징 색상 변경
  let contentsPages = document.querySelectorAll(".contents-page");

  contentsPages.forEach(function (contentsPage) {
    let contentsPageNums = contentsPage.querySelectorAll("ul li");

    contentsPageNums.forEach(function (contentsPageNum) {
      contentsPageNum.addEventListener("click", function () {
        contentsPageNums.forEach(function (otherPageNum) {
          if (otherPageNum !== contentsPageNum) {
            otherPageNum.classList.remove("active");
          }
        });
        contentsPageNum.classList.add("active");
      });
    });
  });

  // 셀렉트 박스
  let selectBoxes = document.querySelectorAll(".selectbox button");

  selectBoxes.forEach(function (selectBox) {
    selectBox.addEventListener("click", function () {
      let selectBoxOption = selectBox.closest(".selectbox").querySelector(".selectbox-option");
      selectBoxOption.classList.toggle("hide");
    });
  });

  let optionBtns = document.querySelectorAll(" .selectbox .selectbox-option .option-btn");

  optionBtns.forEach(function (optionBtn) {
    optionBtn.addEventListener("click", function () {
      let selectedOptionText = optionBtn.textContent;
      let selectBoxButton = optionBtn.closest(".selectbox").querySelector("button");

      selectBoxButton.textContent = selectedOptionText;
      selectBoxButton.classList.remove("activate", "disabled");

      if (optionBtn.classList.contains("activate")) {
        selectBoxButton.classList.add("activate");
      } else if (optionBtn.classList.contains("disabled")) {
        selectBoxButton.classList.add("disabled");
      }

      let selectBoxOption = optionBtn.closest(".selectbox").querySelector(".selectbox-option");
      selectBoxOption.classList.add("hide");
    });
  });

  // 활성화, 비활성화
  let selectBoxBtns = document.querySelectorAll(".nc1-content dl dt .selectbox button");

  selectBoxBtns.forEach(function (selectBoxBtn) {
    selectBoxBtn.addEventListener("click", function () {
      let optionActivate = selectBoxBtn.closest("section.selectbox").querySelector(".selectbox-option .option-btn.activate");
      let optionDisabled = selectBoxBtn.closest("section.selectbox").querySelector(".selectbox-option .option-btn.disabled");

      if (selectBoxBtn.classList.contains("activate")) {
        optionActivate.classList.add("hide");
        optionDisabled.classList.remove("hide");
      } else if (selectBoxBtn.classList.contains("disabled")) {
        optionDisabled.classList.add("hide");
        optionActivate.classList.remove("hide");
      }
    });
  });

  // 임무설정
  // 아코디언
  let accorMains = document.querySelectorAll(".accor li .accor-name div");
  accorMains.forEach(function (accorMain) {
    accorMain.addEventListener("click", function () {
      let accorSubWrap = accorMain.parentElement.nextElementSibling;
      accorSubWrap.classList.toggle("hide");
      accorMain.parentElement.classList.toggle("active");
    });
  });
  let accorSubs = document.querySelectorAll(".accor li .accor-sub li .accor-sub-name div");

  function handleAccorSubClick() {
    let currentAccorSub = this.parentElement;
    currentAccorSub.classList.add("active");

    accorSubs.forEach(function (otherBtn) {
      if (otherBtn.parentElement !== currentAccorSub) {
        otherBtn.parentElement.classList.remove("active");
      }
    });

    // 상세팝업
    let accorPopup = currentAccorSub.closest(".accor-wrap").nextElementSibling;
    if (accorPopup) {
      accorPopup.classList.remove("hide");
    }
  }

  accorSubs.forEach(function (accorSub) {
    accorSub.addEventListener("click", handleAccorSubClick);
  });

  // 팝업 close
  let activePopupCloses = document.querySelectorAll(".nc-sub2-popup i.close");
  activePopupCloses.forEach(function (activePopupClose) {
    activePopupClose.addEventListener("click", function () {
      accorSubs.forEach(function (accorSub) {
        accorSub.parentElement.classList.remove("active");
      });
    });
  });

  // 로봇설정
  // 아코디언
  let popup4AccorTiltles = document.querySelectorAll(".nc-sub4-popup-detail .popup4-accor .popup4-accor-title");
  popup4AccorTiltles.forEach(function (popup4AccorTiltle) {
    popup4AccorTiltle.addEventListener("click", function () {
      let popup4Accor = this.closest(".popup4-accor");
      popup4Accor.classList.toggle("accor-bg");
      let popup4AccorHide = popup4Accor.querySelector(".popup4-accor-hide");
      popup4AccorHide.classList.toggle("hide");
    });
  });

  // sortable
  let sortableItems = document.querySelectorAll("li:not(.nc-sub5-popup-top) .popup5-name");

  sortableItems.forEach(function (item) {
    new Sortable(item, {
      group: "shared",
      animation: 150,
    });
  });

  let sortableTop = document.querySelector("li.nc-sub5-popup-top .popup5-name");
  new Sortable(sortableTop, {
    group: "shared",
    animation: 150,
    swap: true,
  });

  // 통합임무
  // 그룹관리
  let nav2Btn1 = document.querySelector("button.nav2-btn1");
  nav2Btn1.addEventListener("click", function () {
    let nav2Btn1Page = document.querySelector(".nav2-sub1-wrap");
    nav2Btn1Page.classList.remove("hide");
  });

  //신규 임무 생성
  let nav2Btn2 = document.querySelector("button.nav2-btn2");
  nav2Btn2.addEventListener("click", function () {
    let nav2Btn2Page = document.querySelector(".nav2-sub2-wrap");
    nav2Btn2Page.classList.remove("hide");
  });

  // 이전버튼
  let prevBtns = document.querySelectorAll("i.back");
  prevBtns.forEach(function (prevBtn) {
    prevBtn.addEventListener("click", function () {
      let prevPage = this.closest(".prev-wrap");
      prevPage.classList.add("hide");
    });
  });

  // 라디오체크 아이콘
  let radioGroups = {};

  let radioBtns = document.querySelectorAll('.radio input[type="radio"]');
  radioBtns.forEach(function (radioBtn) {
    radioBtn.addEventListener("change", function () {
      let groupName = radioBtn.getAttribute("name");

      if (!radioGroups[groupName]) {
        radioGroups[groupName] = {
          selected: null,
        };
      }

      let prevSelected = radioGroups[groupName].selected;
      if (prevSelected) {
        let prevRadioIcon = prevSelected.nextElementSibling.querySelector("i");
        prevRadioIcon.classList.remove("check");
        prevRadioIcon.classList.add("hide");
      }

      let radioIcon = radioBtn.nextElementSibling.querySelector("i");
      radioIcon.classList.remove("hide");
      radioIcon.classList.add("check");

      radioGroups[groupName].selected = radioBtn;
    });
  });

  // 체크박스 체크 아이콘
  let checkboxBtns = document.querySelectorAll('.checkbox input[type="checkbox"]');
  checkboxBtns.forEach(function (checkboxBtn) {
    checkboxBtn.addEventListener("change", function () {
      let checkboxIcon = this.nextElementSibling.querySelector("i");
      checkboxIcon.classList.toggle("check");
      checkboxIcon.classList.toggle("hide");
    });
  });

  // 신규 임무 생성 라디오 버튼
  let radioOne1Btn1 = document.querySelector(".radio.radio1 .radio-btn1");
  radioOne1Btn1.addEventListener("click", function () {
    let radioOne1Btn1Page = document.querySelector(".rb1-page-wrap");
    radioOne1Btn1Page.classList.remove("hide");
  });

  let radioOne1Btn2 = document.querySelector(".radio.radio1 .radio-btn2");
  radioOne1Btn2.addEventListener("click", function () {
    let radioOne1Btn2Page = document.querySelector(".rb2-page-wrap");
    radioOne1Btn2Page.classList.remove("hide");
  });

  // 팝업창
  let select1Btn = document.querySelector(".btn .select1-btn");
  select1Btn.addEventListener("click", function () {
    let select1Page = document.querySelector(".popUp.n2s2-content-select1");
    select1Page.classList.remove("hide");
  });
  let select2Btn = document.querySelector(".btn .select2-btn");
  select2Btn.addEventListener("click", function () {
    let select2Page = document.querySelector(".popUp.n2s2-content-select2");
    select2Page.classList.remove("hide");
  });
  let tableBtns = document.querySelectorAll(".table-btn");
  tableBtns.forEach(function (tableBtn) {
    tableBtn.addEventListener("click", function () {
      let tablePage = document.querySelector(".popUp.n2s2-content-table");
      tablePage.classList.remove("hide");
    });
  });
  let nav2TabBtn = document.querySelectorAll(".tab-btn");
  nav2TabBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let tabPage = document.querySelector(".popUp.n2s2-content-tab");
      tabPage.classList.remove("hide");
    });

    let nav3TabBtn = document.querySelector(".nav3-tab-btn");
    nav3TabBtn.addEventListener("click", function () {
      let tabPage = document.querySelector(".popUp.n3s2-content-tab");
      tabPage.classList.remove("hide");
    });
  });

  // 팝업 탭 - nav2
  let nav2TabBtns = document.querySelectorAll(".nav2-tab1 .tab-name button");
  let nav2Tabs = document.querySelectorAll(".nav2-tab1 .tab-contents > div");

  nav2TabBtns.forEach(function (button, index) {
    button.addEventListener("click", function () {
      nav2TabBtns.forEach(function (btn) {
        btn.classList.remove("active");
      });
      nav2Tabs.forEach(function (tab) {
        tab.classList.remove("active");
        tab.classList.add("hide");
      });

      button.classList.add("active");
      nav2Tabs[index].classList.add("active");
      nav2Tabs[index].classList.remove("hide");
    });
  });

  // 팝업 탭 - nav3
  let nav3TabBtns = document.querySelectorAll(".nav3-tab1 .tab-name button");
  let nav3Tabs = document.querySelectorAll(".nav3-tab1 .tab-contents > div");

  nav3TabBtns.forEach(function (button, index) {
    button.addEventListener("click", function () {
      nav3TabBtns.forEach(function (btn) {
        btn.classList.remove("active");
      });
      nav3Tabs.forEach(function (tab) {
        tab.classList.remove("active");
        tab.classList.add("hide");
      });

      button.classList.add("active");
      nav3Tabs[index].classList.add("active");
      nav3Tabs[index].classList.remove("hide");
    });
  });

  // 지오팬스
  // 신규 그룹 생성
  let nav3Btn1 = document.querySelector("button.nav3-btn1");
  nav3Btn1.addEventListener("click", function () {
    let nav3Btn1Page = document.querySelector(".nav3-sub1-wrap");
    nav3Btn1Page.classList.remove("hide");
  });

  //신규 지오팬스 생성
  let nav3Btn2 = document.querySelector("button.nav3-btn2");
  nav3Btn2.addEventListener("click", function () {
    let nav3Btn2Page = document.querySelector(".nav3-sub2-wrap");
    nav3Btn2Page.classList.remove("hide");
  });

  // 팝업 드래그
  let popUps = document.querySelectorAll(".popUp");
  let isDragging = false;
  let offsetX, offsetY, currentPopUp;

  popUps.forEach(function (popUp) {
    let title = popUp.querySelector(".title");

    title.addEventListener("mousedown", function (e) {
      isDragging = true;
      currentPopUp = popUp;
      offsetX = e.clientX - popUp.offsetLeft;
      offsetY = e.clientY - popUp.offsetTop;

      e.stopPropagation();
    });
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging && currentPopUp) {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      currentPopUp.style.left = newX + "px";
      currentPopUp.style.top = newY + "px";

      e.preventDefault();
    }
  });

  // 임무스케줄
  // nav4 팝업
  let nav4popupBtn = document.querySelector(".main-nav_4 .nav-content .apply-btn button");
  let nav4popup1 = document.querySelector(".main-nav_4 .popUp.nav4-popup1");

  nav4popupBtn.addEventListener("click", function () {
    nav4popup1.classList.remove("hide");
  });

  let nav4popupSubBtn = nav4popup1.querySelector(".form-container.icon-container .btn button");
  let nav4popup2 = document.querySelector(".main-nav_4 .popUp.nav4-popup2");
  nav4popupSubBtn.addEventListener("click", function () {
    nav4popup2.classList.remove("hide");
  });

  // 위젯 탭 슬라이더
  let tabSlider = document.querySelector(".widget.tab .tab-slider");
  let tabSliderEls = tabSlider.querySelector(".tabs");
  let tabItems = tabSliderEls.querySelectorAll("li");
  let prevBtnT = tabSlider.querySelector(".prev");
  let nextBtnT = tabSlider.querySelector(".next");
  let tabWidth = tabSliderEls.offsetWidth;
  let currentIndexT = 0;
  let totalTabWidth = 0;

  tabItems.forEach((tab) => {
    totalTabWidth += tab.offsetWidth + 15;
  });
  let maxScrollWidth = totalTabWidth - tabWidth;

  function showTab(index) {
    let distanceToMove = -index * 100;
    for (let i = 0; i < tabItems.length; i++) {
      tabItems[i].style.transform = `translateX(${distanceToMove}px)`;
    }
    currentIndexT = index;
  }

  prevBtnT.addEventListener("click", () => {
    currentIndexT = Math.max(currentIndexT - 1, 0);
    showTab(currentIndexT);
  });

  nextBtnT.addEventListener("click", () => {
    currentIndexT = Math.min(currentIndexT + 1, maxScrollWidth / 100);
    showTab(currentIndexT);
  });

  if (tabWidth < totalTabWidth) {
    prevBtnT.classList.remove("hide");
    nextBtnT.classList.remove("hide");
  }

  // 탭 , 서브 탭
  let widgetTabs = document.querySelectorAll(".widget.tab .tabs li");
  widgetTabs.forEach(function (tab, index) {
    let tabContents = document.querySelectorAll(".widget.tab .tab-contents-wrap .tab-content");
    let subTabs = tabContents[index].querySelectorAll(".sub-tabs li");

    tab.addEventListener("click", function () {
      document.querySelector(".widget.tab .tabs .active").classList.remove("active");
      tab.classList.add("active");
      tabContents.forEach((content) => content.classList.add("hide"));
      tabContents[index].classList.remove("hide");
    });

    subTabs.forEach(function (subTab, subIndex) {
      subTab.addEventListener("click", function () {
        tabContents[index].querySelector(".sub-tabs .active").classList.remove("active");
        subTab.classList.add("active");
        let subTabContents = tabContents[index].querySelectorAll(".st-contents-wrap .sub-tab-contents");
        subTabContents.forEach((content) => content.classList.add("hide"));
        subTabContents[subIndex].classList.remove("hide");
      });
    });
  });
});
