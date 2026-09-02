document.addEventListener("DOMContentLoaded", function () {
  // 페이징
  let pageNumber = document.querySelectorAll(".paging ul li:not(.prev):not(.next)");
  pageNumber.forEach(function (num) {
    let pageNums = Array.from(num.parentNode.children).filter((li) => !li.classList.contains("prev") && !li.classList.contains("next"));

    num.addEventListener("click", function () {
      pageNums.forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
