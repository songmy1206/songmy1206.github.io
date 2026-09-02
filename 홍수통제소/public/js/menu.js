document.addEventListener("DOMContentLoaded", function () {
  // 메뉴 active
  let menuILists = document.querySelectorAll(".menu .menu__list");

  menuILists.forEach(function (list) {
    list.addEventListener("click", function () {
      menuILists.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
