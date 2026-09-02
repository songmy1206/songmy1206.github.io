document.addEventListener("DOMContentLoaded", function () {
  let wrapAlertPop = document.querySelector(".wrap-alert-pop");
  let closeBtn = document.querySelector(".btn .pop-close");
  let conditionNo = document.querySelector(".condition.no");

  conditionNo.addEventListener("click", function () {
    wrapAlertPop.classList.remove("hide");
    document.documentElement.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", function () {
    wrapAlertPop.classList.add("hide");
    document.documentElement.style.overflow = "auto";
  });
});
