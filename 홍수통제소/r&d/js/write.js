document.addEventListener("DOMContentLoaded", function () {
  let addInstitutionBtn = document.querySelectorAll("button.add-institution");
  let wrapAlertPop = document.querySelector(".wrap-alert-pop");
  let completeBtn = document.querySelector(".btn .pop-complete");

  addInstitutionBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      wrapAlertPop.classList.remove("hide");
      document.documentElement.style.overflow = "hidden";
    });
  });
  completeBtn.addEventListener("click", function () {
    wrapAlertPop.classList.add("hide");
    document.documentElement.style.overflow = "auto";
  });
});
