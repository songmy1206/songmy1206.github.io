document.addEventListener("DOMContentLoaded", function () {
  // 탭
  let tabBtn = document.querySelectorAll(".tab-menu p");
  tabBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      tabBtn.forEach(function (btn) {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      let index = Array.from(tabBtn).indexOf(btn);
      let tabs = document.querySelectorAll(".contents .tab");

      tabs.forEach(function (tab) {
        tab.classList.remove("active");
        tab.classList.add("hide");
      });
      tabs[index].classList.add("active");
      tabs[index].classList.remove("hide");
    });
  });
});
