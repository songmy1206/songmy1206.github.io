document.addEventListener("DOMContentLoaded", function () {
  let usersvcWrap = document.querySelectorAll(".wrap-usersvc");
  usersvcWrap.forEach(function (usersvc) {
    let infoWrap = document.querySelector(".wrap-usersvc.info");
    let logoutWrap = document.querySelector(".wrap-usersvc.wrap-logntc");
    let userDetailBtns = document.querySelectorAll(".wrap-user .user-detail p");
    let infoBtn = document.querySelector(".wrap-user .user-detail .info");
    let logoutBtn = document.querySelector(".wrap-user .user-detail .logout");

    function toggleScroll() {
      document.addEventListener("click", function () {
        if (infoWrap.classList.contains("active") || logoutWrap.classList.contains("active")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });
    }

    userDetailBtns.forEach(function (userDetailBtn) {
      userDetailBtn.addEventListener("click", function () {
        toggleScroll();
      });
    });

    infoBtn.addEventListener("click", function () {
      infoWrap.classList.add("active");
    });

    logoutBtn.addEventListener("click", function () {
      logoutWrap.classList.add("active");
    });

    // 체크박스 전체선택
    let chkWraps = document.querySelectorAll(".chk-wrap");
    chkWraps.forEach(function (chkWrap) {
      let allCheck = chkWrap.querySelector("input[type='checkbox'].all-check");
      let checkboxes = chkWrap.querySelectorAll('input[type="checkbox"]:not(.all-check)');
      if (!allCheck) return;
      allCheck.addEventListener("change", () => {
        checkboxes.forEach((chk) => {
          chk.checked = allCheck.checked;
        });
      });

      checkboxes.forEach((chk) => {
        chk.addEventListener("change", () => {
          allCheck.checked = [...checkboxes].every((chk) => chk.checked);
        });
      });
    });

    // 비밀번호 변경
    let resetPwBtn = infoWrap.querySelector(".usersvc-popup button.resetPw");
    let resetPw = infoWrap.querySelector(".usersvc-popup.reset-pw");
    resetPwBtn.addEventListener("click", function () {
      resetPw.classList.remove("hide");
    });

    // 회원탈퇴
    let cancelAcctBtn = infoWrap.querySelector(".usersvc-popup button.cancelAcct");
    let cancelAcct = infoWrap.querySelector(".usersvc-popup.cancel-account");
    cancelAcctBtn.addEventListener("click", function () {
      cancelAcct.classList.remove("hide");
    });

    // 소속 및 이용신청시스템 변경
    let resetSysBtn = infoWrap.querySelector(".usersvc-popup button.resetSys");
    let resetSys = infoWrap.querySelector(".usersvc-popup.reset-system");
    resetSysBtn.addEventListener("click", function () {
      resetSys.classList.remove("hide");
    });

    // 닫기
    let usersvcCloseBtns = usersvc.querySelectorAll(".usersvc-popup i.ico-close_svc");
    usersvcCloseBtns.forEach(function (usersvcCloseBtn) {
      let usersvcPopup = usersvcCloseBtn.closest(".usersvc-popup");
      usersvcCloseBtn.addEventListener("click", function () {
        if (usersvcPopup.classList.contains("mgmt") || usersvcPopup.classList.contains("logout-ntc")) {
          let wrapUsersvc = usersvcCloseBtn.closest(".wrap-usersvc");
          if (wrapUsersvc) {
            wrapUsersvc.classList.remove("active");
          }
        } else {
          usersvcPopup.classList.add("hide");
        }
      });
    });

    let usersvcPopups = usersvc.querySelectorAll(".usersvc-popup");
    usersvcPopups.forEach(function (usersvcPopup) {
      let popupBtns = usersvcPopup.querySelectorAll(".button-wrap button");
      popupBtns.forEach(function (popupBtn) {
        popupBtn.addEventListener("click", function () {
          if (usersvcPopup.classList.contains("logout-ntc")) {
            let wrapUsersvc = popupBtn.closest(".wrap-usersvc");
            if (wrapUsersvc) {
              wrapUsersvc.classList.remove("active");
            }
          } else if (!usersvcPopup.classList.contains("mgmt")) {
            usersvcPopup.classList.add("hide");
          }
        });
      });
    });
  });
});
