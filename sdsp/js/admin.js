/* admin gnb, dashboard js / 나머지 x */
document.addEventListener("DOMContentLoaded", function () {
  // admin 탭
  let navBtns = document.querySelectorAll(".nav-btn");
  let navConts = document.querySelectorAll(".nav-cont");

  function hideAll() {
    navBtns.forEach(function (navBtn) {
      navBtn.classList.remove("on");
    });
    navConts.forEach(function (navCont) {
      navCont.style.display = "none";
    });
  }

  function showContent(button) {
    let dataTarget = button.getAttribute("data-target");
    document.querySelector(`.nav-cont.${dataTarget}`).style.display = "block";
    button.classList.add("on");
  }

  navBtns.forEach(function (navBtn) {
    if (navBtn.classList.contains("on")) {
      showContent(navBtn);
    }
    navBtn.addEventListener("click", function () {
      hideAll();
      showContent(navBtn);
    });
  });

  //sub-nav
  let lnvTitles = document.querySelectorAll(".sub-nav .lnv-title");

  // 서브 메뉴 높이 계산
  function calculateHeight(subList) {
    if (!subList) return 0;
    let liElements = subList.querySelectorAll("li");
    let gap = 4;
    return Array.from(liElements).reduce((acc, li) => acc + li.offsetHeight, 0) + gap * (liElements.length - 1);
  }

  // 메뉴 닫기
  function closeAllMenus() {
    lnvTitles.forEach((title) => {
      title.classList.remove("on");
      let subList = title.nextElementSibling;
      if (subList && subList.tagName === "UL") {
        subList.style.height = "0px";
      }
    });
  }

  let snbConts = document.querySelectorAll(".snb-cont");
  let snbBtns = document.querySelectorAll(".sub-nav .snb-btn");

  snbBtns.forEach(function (snbBtn) {
    if (snbBtn.classList.contains("on")) {
      let dataNav = snbBtn.dataset.nav;
      document.querySelector("." + dataNav + "_panel").style.display = "block";
      snbConts.forEach(function (snbCont) {
        if (!snbCont.classList.contains(dataNav + "_panel")) {
          snbCont.style.display = "none";
        }
      });
    }
  });

  snbBtns.forEach(function (snbBtn) {
    snbBtn.addEventListener("click", function () {
      let dataNav = this.getAttribute("data-nav");

      snbBtns.forEach((snbBtn) => snbBtn.classList.remove("on"));
      this.classList.add("on");

      snbConts.forEach(function (snbCont) {
        if (snbCont.classList.contains(dataNav + "_panel")) {
          snbCont.style.display = "block";
        } else {
          snbCont.style.display = "none";
        }
      });
    });
  });

  lnvTitles.forEach((title) => {
    let subList = title.nextElementSibling;

    if (title.classList.contains("on")) {
      subList.style.height = calculateHeight(subList) + "px";
    } else if (subList && subList.tagName === "UL") {
      subList.style.height = "0px";
    }

    title.addEventListener("click", function () {
      let subList = title.nextElementSibling;
      let isOpen = subList && subList.style.height !== "0px";

      closeAllMenus();
      title.classList.add("on");

      if (!isOpen) {
        if (subList && subList.tagName === "UL") {
          subList.style.height = calculateHeight(subList) + "px";
        }
      }
    });
  });

  // 대시보드 내부 컨텐츠 슬라이드
  let dashConts = document.querySelectorAll(".dash-contents");

  dashConts.forEach(function (dashCont) {
    let wrapCont = dashCont.querySelector(".dash-contents--item");
    let slideLBtn = dashCont.querySelector(".h-slide.left");
    let slideRBtn = dashCont.querySelector(".h-slide.right");

    function updateSlideBtn() {
      if (wrapCont.scrollWidth > wrapCont.clientWidth) {
        slideLBtn.classList.add("d-block");
        slideRBtn.classList.add("d-block");
      } else {
        slideLBtn.classList.remove("d-block");
        slideRBtn.classList.remove("d-block");
      }

      if (wrapCont.scrollLeft === 0) {
        slideLBtn.classList.add("disabled");
      } else {
        slideLBtn.classList.remove("disabled");
      }

      if (wrapCont.scrollLeft + wrapCont.clientWidth >= wrapCont.scrollWidth) {
        slideRBtn.classList.add("disabled");
      } else {
        slideRBtn.classList.remove("disabled");
      }
    }

    navBtns.forEach(function (navBtn) {
      navBtn.addEventListener("click", function () {
        updateSlideBtn();
      });
    });

    slideLBtn.addEventListener("click", () => {
      wrapCont.scrollBy({ left: -400, behavior: "smooth" });
    });

    slideRBtn.addEventListener("click", () => {
      wrapCont.scrollBy({ left: 400, behavior: "smooth" });
    });

    wrapCont.addEventListener("scroll", updateSlideBtn);
    window.addEventListener("resize", updateSlideBtn);
  });

  let userList = document.querySelector("tr.userList")
  let userListPopup = document.querySelector(".wrap_admin .popup-wrap .popup.account")
  userList.addEventListener("click", function(){
    userListPopup.classList.remove("hide")
  })

  // 팝업 닫기
  let poupClose = document.querySelectorAll(".popup .ico-close");
  poupClose.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let popup = btn.closest(".popup:not(i)");
      popup.classList.add("hide");
    });
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
});

// jquery
$(function () {
  // datepicker
  $(".monthpicker-input").datepicker({
    dateFormat: "yy.mm.",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input, _) {
      setTimeout(() => {
        var inputPosition = $(input).offset();
        var datepickerHeight = $(".ui-datepicker").outerHeight();

        // 위로열리게
        $(".ui-datepicker")
          .addClass("bar-datepicker")
          .css({
            position: "absolute",
            top: inputPosition.top - datepickerHeight,
            left: inputPosition.left + 8 + "px",
            marginTop: "0px",
          });
      }, 0);
    },
    onChangeMonthYear: function () {
      setTimeout(() => {
        var inputPosition = $(".monthpicker-input").offset();
        var datepickerHeight = $(".ui-datepicker").outerHeight();

        // 위치조정
        $(".ui-datepicker").css({
          top: inputPosition.top - datepickerHeight,
        });
      }, 0);
    },
    onClose: function () {
      $(".ui-datepicker").removeClass("bar-datepicker").css({
        display: "none",
      });
    },
  });
});
