document.addEventListener("DOMContentLoaded", function () {
  // footer 링크
  let familySiteBtn = document.querySelector(".link-select-box .link__title");
  let siteMenu = document.querySelector(".link-select-box .sb-list");
  let rotateIcon = document.querySelector(".link-select-box .link__title i");

  if (siteMenu && familySiteBtn && rotateIcon) {
    siteMenu.classList.remove("active");

    familySiteBtn.addEventListener("click", function () {
      let isActive = siteMenu.classList.contains("active");
      siteMenu.classList.toggle("active", !isActive);
      rotateIcon.style.transform = isActive ? "rotate(0deg)" : "rotate(180deg)";
    });

    // 외부 클릭 시 닫기
    document.addEventListener("click", function (e) {
      if (!siteMenu.contains(e.target) && !familySiteBtn.contains(e.target)) {
        siteMenu.classList.remove("active");
        rotateIcon.style.transform = "rotate(0deg)";
      }
    });
  }

  // 팝업
  let wrapUsersvc = document.querySelector(".wrap-usersvc");

  function setupPopup(triggerSelector, contentSelector) {
    let triggerBtn = document.querySelector(triggerSelector);
    let contentEl = wrapUsersvc.querySelector(contentSelector);
    let closeBtn = contentEl?.querySelector("button");

    if (!triggerBtn || !contentEl || !closeBtn) return;

    triggerBtn.addEventListener("click", function () {
      wrapUsersvc.querySelectorAll(".platform-clause, .info-policy").forEach((popup) => {
        popup.classList.add("hide");
      });

      contentEl.classList.remove("hide");
      wrapUsersvc.classList.add("active");
      toggleScroll();
    });

    closeBtn.addEventListener("click", function () {
      wrapUsersvc.classList.remove("active");
      toggleScroll();
    });
  }

  function toggleScroll() {
    let isActive = wrapUsersvc.classList.contains("active");

    document.body.style.overflow = isActive ? "hidden" : "";
    document.documentElement.style.overflow = isActive ? "hidden" : "";
  }

  setupPopup("footer .link-list__item.platform-clause", ".platform-clause");
  setupPopup("footer .link-list__item.info-policy", ".info-policy");

  // let wrapUsersvc = document.querySelector(".wrap-usersvc");
  // let platformBtn = document.querySelector("footer .link-list__item.platform-clause");
  // let platformClause = wrapUsersvc.querySelector(".platform-clause");
  // let platformClauseBtn = platformClause.querySelector("button");
  // platformBtn.addEventListener("click", function () {
  //   wrapUsersvc.classList.add("active");
  //   platformClause.classList.remove("hide");
  //   toggleScroll();
  // });
  // platformClauseBtn.addEventListener("click", function () {
  //   wrapUsersvc.classList.remove("active");
  //   toggleScroll();
  // });

  // let policyBtn = document.querySelector("footer .link-list__item.info-policy");
  // let infoPolicy = wrapUsersvc.querySelector(".info-policy");
  // let infoPolicyBtn = infoPolicy.querySelector("button");
  // policyBtn.addEventListener("click", function () {
  //   wrapUsersvc.classList.add("active");
  //   infoPolicy.classList.remove("hide");
  //   toggleScroll();
  // });
  // infoPolicyBtn.addEventListener("click", function () {
  //   wrapUsersvc.classList.remove("active");
  //   toggleScroll();
  // });

  // function toggleScroll() {
  //   if (wrapUsersvc.classList.contains("active")) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }
});
