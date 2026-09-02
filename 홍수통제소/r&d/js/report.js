document.addEventListener("DOMContentLoaded", function () {
  // 검색창 placeholder
  function setPlaceholder() {
    let searchInput = document.querySelector(".search-box input");
    if (window.innerWidth <= 500) {
      searchInput.placeholder = "검색어를 입력하세요";
    } else if (window.innerWidth <= 620) {
      searchInput.placeholder = "검색";
    } else {
      searchInput.placeholder = "검색어를 입력하세요";
    }
  }

  window.addEventListener("load", setPlaceholder);
  window.addEventListener("resize", setPlaceholder);
});
