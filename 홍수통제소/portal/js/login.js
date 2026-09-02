document.addEventListener("DOMContentLoaded", function () {
  let joinBtn = document.querySelector("button.user-join");
  let checkBtn = document.querySelector("button.user-check");
  let joinWrap = document.querySelector(".wrap-join");
  let checkWrap = document.querySelector(".wrap-check");
  let joinSteps = joinWrap.querySelectorAll(".join-popup");
  let checkSteps = checkWrap.querySelectorAll(".check-popup");

  // 스크롤 잠금/해제
  function toggleScroll() {
    if (joinWrap.classList.contains("active") || checkWrap.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // step 팝업 이동
  function goToNextStep(currentStep, wrapSelector, stepSelectorPrefix) {
    let stepNum = Array.from(currentStep.classList).find(cls => cls.startsWith("step"));
    let nextStep = document.querySelector(`${wrapSelector} .${stepSelectorPrefix}${parseInt(stepNum.replace("step", "")) + 1}`);
    if (nextStep) {
      currentStep.classList.add("hide");
      nextStep.classList.remove("hide");
    }
  }

  // 팝업 닫기 처리
  function bindCloseButtons(wrap, steps, resetFn, selectors) {
    steps.forEach((step) => {
      selectors.forEach((selector) => {
        let btn = step.querySelector(selector);
        if (btn) {
          btn.addEventListener("click", () => {
            wrap.classList.remove("active");
            resetFn();
            toggleScroll();
          });
        }
      });
    });
  }

  // 단계 초기화
  function resetSteps(wrap, stepSelector) {
    let steps = wrap.querySelectorAll(stepSelector);
    steps.forEach(step => step.classList.add("hide"));
    let firstStep = wrap.querySelector(`${stepSelector}.step1`);
    if (firstStep) {
      firstStep.classList.remove("hide");
      let nextBtn = firstStep.querySelector(".button-wrap .next");
      if (nextBtn) nextBtn.disabled = true;
    }
    wrap.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach(input => input.checked = false);
  }

  // 다음 버튼 클릭 처리
  function bindNextButtons(steps, wrapSelector, stepSelectorPrefix) {
    steps.forEach((step) => {
      let nextBtn = step.querySelector(".button-wrap .next");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => goToNextStep(step, wrapSelector, stepSelectorPrefix));
      }
    });
  }

  // 전체 동의 체크 처리
  function bindAgreementControls(step) {
    let radioGroups = step.querySelectorAll(".rd-wrap");
    let allCheck = step.querySelector('input[type="checkbox"].all-check');
    let checkboxes = step.querySelectorAll('input[type="checkbox"]:not(.all-check)');
    let nextBtn = step.querySelector(".button-wrap .next");

    function checkAllAgreed() {
      let allAgreed = Array.from(radioGroups).every(group => {
        let agreeRadio = group.querySelector('input[type="radio"]:first-child');
        return agreeRadio && agreeRadio.checked;
      });
      if (nextBtn) nextBtn.disabled = !allAgreed;
      if (allCheck) allCheck.checked = allAgreed;
    }

    if (allCheck) {
      allCheck.addEventListener("change", () => {
        let isChecked = allCheck.checked;
        checkboxes.forEach(cb => cb.checked = isChecked);
        radioGroups.forEach(group => {
          let agree = group.querySelector('input[type="radio"]:first-child');
          let disagree = group.querySelector('input[type="radio"]:nth-child(2)');
          if (agree) agree.checked = isChecked;
          if (disagree && !isChecked) disagree.checked = false;
        });
        checkAllAgreed();
      });
    }

    checkboxes.forEach(cb => cb.addEventListener("change", checkAllAgreed));
    radioGroups.forEach(group => {
      group.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener("change", () => {
          let anyDisagree = Array.from(radioGroups).some(g => {
            let disagree = g.querySelector('input[type="radio"]:nth-child(2)');
            return disagree && disagree.checked;
          });
          if (allCheck) allCheck.checked = !anyDisagree;
          checkAllAgreed();
        });
      });
    });

    checkAllAgreed();
  }

  // 더보기 팝업
  function bindDetailPopups() {
    let detailBtns = document.querySelectorAll(".wrap-usersvc .usersvc-popup li .detail");
    let detailPopups = document.querySelectorAll(".wrap-usersvc .detail-popup");

    detailBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        let classes = btn.classList;
        detailPopups.forEach(popup => {
          let match = Array.from(classes).some(cls => popup.classList.contains(cls));
          popup.classList.toggle("hide", !match);
        });
      });
    });

    detailPopups.forEach(popup => {
      let closeBtn = popup.querySelector(".button-wrap button");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => popup.classList.add("hide"));
      }
    });
  }

  // 더보기(약관 내용) 처리
  function bindDetailText() {
    let detailMap = [
      { btn: ".step1 p.detail1", popup: ".wrap-join .detail-popup.detail1" },
      { btn: ".step4 p.detail2", popup: ".wrap-join .detail-popup.detail2" },
    ];
    detailMap.forEach(({ btn, popup }) => {
      let btnEl = document.querySelector(btn);
      let popupEl = document.querySelector(popup);
      if (btnEl && popupEl) {
        btnEl.addEventListener("click", () => popupEl.classList.remove("hide"));
      }
    });

    let detailCloseBtns = document.querySelectorAll(".wrap-join .detail-popup button");
    detailCloseBtns.forEach(btn => {
      btn.addEventListener("click", () => btn.closest(".detail-popup")?.classList.add("hide"));
    });
  }

  // 이벤트 바인딩 시작
  joinBtn?.addEventListener("click", () => {
    joinWrap.classList.add("active");
    toggleScroll();
  });

  checkBtn?.addEventListener("click", () => {
    checkWrap.classList.add("active");
    toggleScroll();
  });

  joinSteps.forEach(bindAgreementControls);
  bindNextButtons(joinSteps, ".wrap-join", "step");
  bindNextButtons(checkSteps, ".wrap-check", "step");

  bindCloseButtons(joinWrap, joinSteps, () => resetSteps(joinWrap, ".join-popup"), [".button-wrap .cancel", "i.ico-close_svc"]);
  bindCloseButtons(checkWrap, checkSteps, () => resetSteps(checkWrap, ".check-popup"), [".button-wrap .cancel", ".button-wrap .chk-close", "i.ico-close_svc"]);

  bindDetailPopups();
  bindDetailText();
});
