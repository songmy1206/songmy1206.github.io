document.addEventListener("DOMContentLoaded", function () {
  let joinWrap = document.querySelector(".wrap-join");
  let joinSteps = joinWrap.querySelectorAll(".join-popup");

  joinSteps.forEach(function (joinStep) {
    let radioGroups = joinStep.querySelectorAll(".rd-wrap");
    let allCheck = joinStep.querySelector('input[type="checkbox"].all-check');
    let checkboxes = joinStep.querySelectorAll('input[type="checkbox"]:not(.all-check)');
    let nextBtn = joinStep.querySelector(".button-wrap .next");
    let cancelBtn = joinStep.querySelector(".button-wrap .cancel");
    let closeBtn = joinStep.querySelector("i.ico-close");

    // 다음 버튼 활성화
    function checkAllAgreed() {
      let allAgreed = true;

      // 라디오 버튼 확인
      if (radioGroups.length) {
        allAgreed = Array.from(radioGroups).every((group) => {
          let agreeRadio = group.querySelector('input[type="radio"]:first-child');
          return agreeRadio && agreeRadio.checked;
        });
      }

      // 체크박스 확인
      // if (checkboxes.length) {
      //   allAgreed = allAgreed && Array.from(checkboxes).every((checkbox) => checkbox.checked);
      // }

      // if (nextBtn) {
      //   nextBtn.disabled = !allAgreed;
      // }

      // if (allCheck) {
      //   allCheck.checked = allAgreed;
      // }
    }

    // 전체 동의 체크박스
    if (allCheck) {
      allCheck.addEventListener("change", function () {
        let isChecked = allCheck.checked;

        checkboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });

        radioGroups.forEach((group) => {
          let agreeRadio = group.querySelector('input[type="radio"]:first-child');
          let disagreeRadio = group.querySelector('input[type="radio"]:nth-child(2)');

          if (agreeRadio) agreeRadio.checked = isChecked;
          if (disagreeRadio && !isChecked) disagreeRadio.checked = false;
        });

        checkAllAgreed();
      });
    }

    // 개별 체크박스
    if (checkboxes.length) {
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
          checkAllAgreed();
        });
      });
    }

    radioGroups.forEach((group) => {
      let radios = group.querySelectorAll('input[type="radio"]');
      radios.forEach((radio) => {
        radio.addEventListener("change", function () {
          let anyDisagree = Array.from(radioGroups).some((g) => {
            let disagreeRadio = g.querySelector('input[type="radio"]:nth-child(2)');
            return disagreeRadio && disagreeRadio.checked;
          });

          if (allCheck) {
            allCheck.checked = !anyDisagree;
          }

          checkAllAgreed();
        });
      });
    });

    checkAllAgreed();

    // 다음 버튼
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        let currentStep = joinStep;
        let nextStep = joinWrap.querySelector(`.join-popup.step${parseInt(currentStep.classList[1].replace("step", "")) + 1}`);

        if (nextStep) {
          currentStep.classList.add("hide");
          nextStep.classList.remove("hide");
        }
      });
    }

    // 팝업 닫기
    function closeJoinWrap() {
      joinWrap.classList.remove("active");
      resetSteps();
    }

    cancelBtn.addEventListener("click", closeJoinWrap);
    closeBtn.addEventListener("click", closeJoinWrap);
  });

  // 스크롤 잠금/해제
  function toggleScroll() {
    if (joinWrap.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // 단계 초기화
  function resetSteps() {
    joinSteps.forEach(function (step) {
      step.classList.add("hide");
    });
    let firstStep = joinWrap.querySelector(".join-popup.step1");
    if (firstStep) {
      firstStep.classList.remove("hide");

      let nextBtn = firstStep.querySelector(".button-wrap .next");
      if (nextBtn) {
        nextBtn.disabled = true;
      }
    }
    joinWrap.querySelectorAll("input").forEach(function (input) {
      if (input.type === "radio" || input.type === "checkbox") {
        input.checked = false;
      }
    });
  }

  toggleScroll();
});
