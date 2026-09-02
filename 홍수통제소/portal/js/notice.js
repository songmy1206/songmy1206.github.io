document.addEventListener("DOMContentLoaded", function () {
  // 공지 목록
  let noticeList = document.querySelectorAll(".list > li:not(.hidden-content)");
  noticeList.forEach(function (item) {
    let rotated = false;
    let hideContent = item.nextElementSibling;
    item.addEventListener("click", function () {
      let attachmentHeight = hideContent.querySelector(".attachment").offsetHeight;
      let contentHeight = hideContent.querySelector(".content").offsetHeight;
      let hiddenContentHeight = attachmentHeight + contentHeight;

      if (rotated) {
        item.classList.remove("open");
        hideContent.style.height = "0";
      } else {
        item.classList.add("open");
        hideContent.style.height = hiddenContentHeight + "px";
      }

      rotated = !rotated;

      // 리스트 내용 길이
      function listHeight() {
        attachmentHeight = hideContent.querySelector(".attachment").offsetHeight;
        contentHeight = hideContent.querySelector(".content").offsetHeight;
        hiddenContentHeight = attachmentHeight + contentHeight;
        if (rotated) {
          hideContent.style.height = hiddenContentHeight + "px";
        }
      }
      window.addEventListener("resize", listHeight);
    });
  });
});
