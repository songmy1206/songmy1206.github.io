document.addEventListener("DOMContentLoaded", function () {
  let checkWrap = document.querySelector(".wrap-check");
  let checkSteps = checkWrap.querySelectorAll(".check-popup");

  checkSteps.forEach(function (checkStep) {
    let nextBtn = checkStep.querySelector(".button-wrap .next");
    let cancelBtn = checkStep.querySelector(".button-wrap .cancel");
    let closeBtn = checkStep.querySelector("i.ico-close");
    let chkCloseBtn = checkStep.querySelector(".button-wrap .chk-close");

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        let currentStep = checkStep;
        let nextStep = checkWrap.querySelector(`.check-popup.step${parseInt(currentStep.classList[1].replace("step", "")) + 1}`);

        if (nextStep) {
          currentStep.classList.add("hide");
          nextStep.classList.remove("hide");
        }
      });
    }

    function closeCheckWrap() {
      checkWrap.classList.remove("active");
      resetSteps();
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeCheckWrap);
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", closeCheckWrap);
    }
    if (chkCloseBtn) {
      chkCloseBtn.addEventListener("click", closeCheckWrap);
    }
  });

  function resetSteps() {
    checkSteps.forEach(function (step) {
      step.classList.add("hide");
    });
    let firstStep = checkWrap.querySelector(".check-popup.step1");
    if (firstStep) {
      firstStep.classList.remove("hide");
    }
  }
  
  // 더보기 팝업
  let detailBtn = document.querySelectorAll(".wrap-usersvc .usersvc-popup li .detail");
  let detailPopup = document.querySelectorAll(".wrap-usersvc .detail-popup");

  detailBtn.forEach(function (detailBtn) {
    detailBtn.addEventListener("click", function () {
      let btnClassList = detailBtn.classList;

      detailPopup.forEach(function (detailPopup) {
        btnClassList.forEach(function (btnClass) {
          if (detailPopup.classList.contains(btnClass)) {
            detailPopup.classList.remove("hide");
          } else {
            detailPopup.classList.add("hide");
          }
        });
      });
    });
  });

  detailPopup.forEach(function(detailPopup){
    let detailPclose = detailPopup.querySelector(".button-wrap button")
    detailPclose.addEventListener("click", function(){
      detailPopup.classList.add("hide");
    })
  })
});
