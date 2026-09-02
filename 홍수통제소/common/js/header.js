document.addEventListener("DOMContentLoaded", function () {
  let userService = document.querySelector(".wrap-user .user-service");
  let userDetail = document.querySelector(".wrap-user .user-detail");
  let icoMenu = document.querySelector(".ico-menu");
  let icoClose = document.querySelector(".ico-close");
  let mHeader = document.querySelector(".m-wrap");
  let header = document.querySelector("header");
  let headerMenuDetail = document.querySelectorAll("header .m-wrap .header-menu li p");
  let selectTri = userService?.querySelector(".ico-select-tri");

  userService?.addEventListener("click", function () {
    if (window.innerWidth > 1000) {
      userDetail?.classList.toggle("active");
      if (selectTri) selectTri.classList.toggle("active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth < 1001) {
      userDetail?.classList.remove("active");
      if (selectTri) selectTri.classList.remove("active");
    }
  });

  // 헤더 색 변경
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header?.classList.add("scroll");
    } else {
      header?.classList.remove("scroll");
    }
  });

  icoMenu?.addEventListener("click", function () {
    mHeader?.classList.add("active");
    document.documentElement.style.overflow = "hidden";
    icoMenu.classList.add("hide");
  });

  icoClose?.addEventListener("click", function () {
    mHeader?.classList.remove("active");
    document.documentElement.style.overflow = "auto";
    icoMenu.classList.remove("hide");
  });

  window.addEventListener("resize", function () {
    if (!mHeader?.classList.contains("active")) {
      if (window.innerWidth > 1000) {
        icoMenu?.classList.add("hide");
      } else {
        icoMenu?.classList.remove("hide");
      }
      if (window.innerWidth < 1000 && header?.classList.contains("active")) {
        header.classList.remove("active");
        headerMenuDetail.forEach(function (menu) {
          menu.classList.remove("active");
        });
      }
    }
  });

  if (window.innerWidth > 1000) {
    if (icoMenu) {
      icoMenu.classList.add("hide");
    }
    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        header?.classList.add("scroll");
      } else {
        header?.classList.remove("scroll");
      }
    });
  } else {
    icoMenu?.classList.remove("hide");
  }

  headerMenuDetail.forEach(function (menu) {
    menu.addEventListener("click", function () {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        header?.classList.remove("active");
      } else {
        headerMenuDetail.forEach(function (menu) {
          menu.classList.remove("active");
        });
        menu.classList.add("active");
        header?.classList.add("active");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!header?.contains(event.target)) {
      header?.classList.remove("active");
      headerMenuDetail.forEach(function (menu) {
        menu.classList.remove("active");
      });
    }
    if (!userService?.contains(event.target) && !userDetail?.contains(event.target)) {
      userDetail?.classList.remove("active");
      if (selectTri) selectTri.classList.remove("active");
    }
  });
});
