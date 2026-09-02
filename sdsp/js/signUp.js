document.addEventListener("DOMContentLoaded", function () {
  let loginBtn = document.querySelector(".nav .login");
  let loginPopup = document.querySelector(".sign-up .popup-wrap .popup.login");

  // 로그인 팝업
  loginBtn.addEventListener("click", function () {
    loginPopup.classList.remove("hide");
  });

  let languageIcon = document.querySelector(".p-header i");
  let languageDropdown = document.querySelector(".p-header .dropdown");
  let languageLists = languageDropdown.querySelectorAll("li");

  // 언어 드롭박스
  languageIcon.addEventListener("click", function () {
    languageDropdown.classList.toggle("hide");
  });

  // 다른 곳 클릭 시 드롭박스 닫기
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".p-header")) {
      languageDropdown.classList.add("hide");
    }
  });

  languageLists.forEach(function (language) {
    language.addEventListener("click", function () {
      languageLists.forEach(function (language) {
        language.classList.remove("select");
      });
      language.classList.add("select");
      languageDropdown.classList.add("hide");
    });
  });

  // 계정신청 step1 첫 번째 셀렉트 박스
  let firstSelectBox = document.querySelector(".form-wrap.input1 .select-box");
  let firstSelectOption = firstSelectBox.querySelector(".select-option");
  let firstOptionItems = firstSelectBox.querySelectorAll(".options li");
  let firstSelectedText = firstSelectBox.querySelector(".select-option p").textContent;

  // 두 번째 input
  let secondInputWrap = document.querySelector(".form-wrap.input2");

  // 셀렉트 박스
  firstOptionItems.forEach((item) => {
    item.addEventListener("click", () => {
      let selectedText = item.textContent;
      firstSelectBox.querySelector(".select-option p").textContent = selectedText;
      firstSelectBox.classList.remove("open");

      firstOptionItems.forEach((li) => li.classList.remove("selected"));

      item.classList.add("selected");
      firstSelectedText = selectedText;

      secondInputWrap.classList.remove("hide");
      secondInputWrap.classList.add("show");
    });
  });

  firstSelectOption.addEventListener("click", () => {
    firstSelectBox.classList.toggle("open");
  });

  // 다른 곳 클릭 시 셀렉트박스 닫기
  document.addEventListener("click", (event) => {
    if (!firstSelectBox.contains(event.target)) {
      firstSelectBox.classList.remove("open");
    }
  });

  // 계정신청 팝업
  let registerBtn = document.querySelector(".acct-btn-wrap .register");
  let registerPopup = document.querySelector(".sign-up .popup-wrap .popup.register");

  registerBtn.addEventListener("click", function () {
    registerPopup.classList.remove("hide");
  });

  // 아이디 찾기 팝업
  let findIdBtn = document.querySelector(".acct-btn-wrap .find-id");
  let findIdPopup = document.querySelector(".sign-up .popup-wrap .popup.findId");

  findIdBtn.addEventListener("click", function () {
    findIdPopup.classList.remove("hide");
  });

  // 비밀번호 찾기 팝업
  let findPwBtn = document.querySelector(".acct-btn-wrap .find-pw");
  let findPwPopup = document.querySelector(".sign-up .popup-wrap .popup.findPw");

  findPwBtn.addEventListener("click", function () {
    findPwPopup.classList.remove("hide");
  });

  // alert - reset
  let resetBtn = document.querySelector(".btn-wrap .reset");
  let resetPopup = document.querySelector(".alert-popup .alert.reset");
  resetBtn.addEventListener("click", function () {
    resetPopup.classList.add("active");
  });

  let alertPopup = registerPopup.querySelector(".alert-popup");
  let emailAlertPopup = document.querySelector(".form-wrap.email button");
  let yIdPopup = alertPopup.querySelector(".alert.yId");
  let nIdPopup = alertPopup.querySelector(".alert.nId");

  // 아이디 중복 팝업
  emailAlertPopup.addEventListener("click", function () {
    if (emailAlertPopup.classList.contains("yId")) {
      yIdPopup.classList.add("active");
    } else if (emailAlertPopup.classList.contains("nId")) {
      nIdPopup.classList.add("active");
    }
  });

  // alert 팝업닫기
  let alertPopupCloseBtn = document.querySelectorAll(".alert .btn-wrap button");
  alertPopupCloseBtn.forEach(function (btn) {
    let closestAlertPopup = btn.closest("ul.alert");
    btn.addEventListener("click", function () {
      closestAlertPopup.classList.remove("active");
    });
  });

  //  탭 버튼
  let tabBtn = document.querySelectorAll(".tab-btn li");
  let tabContents = document.querySelectorAll(".tab-wrap .tab");

  tabBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtn.forEach(function (btn) {
        btn.classList.remove("active");
      });
      tabContents.forEach(function (content) {
        content.classList.remove("active");
      });
      btn.classList.add("active");

      let targetTab = btn.dataset.tab;
      document.querySelector(`.tab-wrap [data-content="${targetTab}"]`).classList.add("active");
    });
  });

  // 개별 팝업
  let popupWrap = document.querySelector(".sign-up .popup-wrap");

  popupWrap.querySelectorAll(".popup").forEach((popupContainer) => {
    let tabs = popupContainer.querySelectorAll(".step-wrap .step li");
    let steps = popupContainer.querySelectorAll(".step-contents > div");
    let nextBtn = popupContainer.querySelectorAll(".btn-wrap .next");
    let cancelBtn = popupContainer.querySelectorAll(".btn-wrap .cancel");
    let closeBtn = popupContainer.querySelectorAll("i.ico-close");
    let vnBtn = document.querySelectorAll("button.vn");

    let doneBtn = popupContainer.querySelectorAll(".btn-wrap .done");

    let currentStep = 0;
    let eInPopup = alertPopup.querySelector(".alert.eIn");

    // 단계 넘김
    function showStep(index) {
      if (tabs.length > 0 && index < tabs.length) {
        tabs[index].classList.add("active");
        tabs.forEach((tab, i) => {
          steps[i].classList.toggle("active", i === index);
        });
        currentStep = index;
      }
    }

    // 로그인창 버튼
    let returnBtn = document.querySelectorAll(".sign-up .return");
    returnBtn.forEach(function (btn) {
      let popup = btn.closest(".popup");
      btn.addEventListener("click", function () {
        popup.classList.add("hide");
        showStep(0); // step1으로 이동
      });
    });

    let input1 = document.querySelector(".form-wrap.input1");
    let options = input1.querySelectorAll(".select-box .options li");
    let selectedOption = input1.querySelector(".select-option p");

    nextBtn.forEach(function (nextBtn) {
      nextBtn.addEventListener("click", () => {
        // register - 셀렉트박스 체크
        if (popupContainer.classList.contains("register") && firstSelectedText === "선택") {
          eInPopup.classList.add("active");
          input1.classList.add("caution");
          return;
        }
        showStep(currentStep + 1);
        checkSteps();
      });
    });

    // 셀렉트 박스 값 변경시 caution 제거
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        let selectedValue = e.target.textContent;
        selectedOption.textContent = selectedValue;

        if (selectedValue !== "선택") {
          input1.classList.remove("caution");
          eInPopup.classList.remove("active");
        }
      });
    });

    // 확인버튼
    doneBtn.forEach(function (doneBtn) {
      doneBtn.addEventListener("click", function () {
        let popup = doneBtn.closest(".popup");
        popup.classList.add("hide");
        tabs.forEach((tab, index) => {
          if (index !== 0) {
            tab.classList.remove("active");
          }
        });
        showStep(0);
      });
    });

    // 취소버튼
    cancelBtn.forEach(function (cancelBtn) {
      let popup = cancelBtn.closest(".popup");
      cancelBtn.addEventListener("click", () => {
        popup.classList.add("hide");
        tabs.forEach((tab, index) => {
          if (index !== 0) {
            tab.classList.remove("active");
          }
        });
        showStep(0);
      });
    });

    // 토스트 메세지
    vnBtn.forEach(function (vnBtn) {
      let popup = vnBtn.closest(".popup");
      let toastMessage = popup.querySelector(".toast-message");
      vnBtn.addEventListener("click", function () {
        toastMessage.classList.remove("hide");
      });
    });

    closeBtn.forEach(function (cancelBtn) {
      let popup = cancelBtn.closest(".toast-message");
      cancelBtn.addEventListener("click", () => {
        popup.classList.add("hide");
      });
    });

    // 필수 입력 input + 버튼 활성화
    steps.forEach((stepContent) => {
      let essentialInputs = Array.from(stepContent.querySelectorAll(".form-wrap p.essential + input"));
      let nextBtn = stepContent.querySelector(".btn-wrap .next");

      if (nextBtn) {
        function checkInputs() {
          let allFilled = essentialInputs.every((input) => input.value.trim() !== "");
          if (allFilled) {
            nextBtn.classList.remove("disabled");
            nextBtn.disabled = false;
          } else {
            nextBtn.classList.add("disabled");
            nextBtn.disabled = true;
          }
        }

        essentialInputs.forEach((input) => {
          input.addEventListener("input", checkInputs);
        });

        checkInputs();
      }
    });

    // <필수 입력 항목입니다.> last-step에서 안보이게
    function checkSteps() {
      let targetEm = popupContainer.querySelector(".step-wrap em");
      if (!targetEm) {
        return;
      }
      let allActive = [...tabs].every((item) => item.classList.contains("active"));
      if (allActive) {
        targetEm.style.display = "none";
      } else {
        targetEm.style.display = "block";
      }
    }
    checkSteps();
  });
});

// jQuery datepicker
$(function () {
  $(".datepicker-input").datepicker({
    dateFormat: "yy.mm.dd",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input) {
      $(input).closest(".bottom-wrap").addClass("datepicker-open");
    },
    onClose: function (_, inst) {
      $(inst.input).closest(".bottom-wrap").removeClass("datepicker-open");
    },
  });
});
