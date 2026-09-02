document.addEventListener("DOMContentLoaded", function () {
  let mapLeft = document.querySelector(".map__left");
  let mapRight = document.querySelector(".map__right");

  let tabConfig = {
    tab1: {
      mlPopupItems: mapLeft.querySelectorAll(".tab1 .scroll-contents__item"),
      mlRegistBtn: mapLeft.querySelector(".tab1 .tab-nav1__btn"),
      mlPopup: mapLeft.querySelector(".left-contents__popup.popup-regist.tab1"),
      mrPopup: mapRight.querySelector(".right-contents__detail.tab1"),
      mrTimelineAddBtns: mapRight.querySelectorAll(".right-contents__detail.tab1 .list-timeline .btn-wrap .add"),
      mrTimelineAddPopup: mapRight.querySelector(".right-contents__popup.popup-regist.tab1"),
      mrTimelineUploadBtns: mapRight.querySelectorAll(".right-contents__detail.tab1 .upload-info .icon-wrap, .right-contents__detail.tab1 .btn-wrap button.view"),
      mrTimelineUploadPopup: mapRight.querySelector(".right-contents__timeline-upload.tab1"),
      mrCloseBtn: mapRight.querySelector(".right-contents__detail.tab1 .popup-contents__title i.icon25"),
      mrTimelineCloseBtn: mapRight.querySelector(".right-contents__timeline-upload.tab1 .popup-contents__title i.icon25"),
    },
    tab2: {
      mlPopupItems: mapLeft.querySelectorAll(".tab2 .scroll-contents__item"),
      mlRegistBtn: mapLeft.querySelector(".tab2 .tab-nav2__btn"),
      mlPopup: mapLeft.querySelector(".left-contents__popup.popup-regist.tab2"),
      mrPopup: mapRight.querySelector(".right-contents__detail.tab2"),
      mrTimelineAddBtns: mapRight.querySelectorAll(".right-contents__detail.tab2 .list-timeline .btn-wrap .add"),
      mrTimelineAddPopup: mapRight.querySelector(".right-contents__popup.popup-regist.tab2"),
      mrTimelineUploadBtns: mapRight.querySelectorAll(".right-contents__detail.tab2 .upload-info .icon-wrap, .right-contents__detail.tab2 .btn-wrap button.view"),
      mrTimelineUploadPopup: mapRight.querySelector(".right-contents__timeline-upload.tab2"),
      mrCloseBtn: mapRight.querySelector(".right-contents__detail.tab2 .popup-contents__title i.icon25"),
      mrTimelineCloseBtn: mapRight.querySelector(".right-contents__timeline-upload.tab2 .popup-contents__title i.icon25"),
    },
  };

  Object.values(tabConfig).forEach((tab) => {
    tab.mlPopupItems.forEach((item) => {
      item.addEventListener("click", () => {
        tab.mrPopup.classList.add("active");
      });
    });

    tab.mrCloseBtn.addEventListener("click", () => {
      const listItems = document.querySelectorAll(`.${tab.mrPopup.classList.contains("tab1") ? "tab1" : "tab2"} .scroll-contents__item`);
      listItems.forEach((item) => {
        item.classList.remove("active");
      });
      tab.mrPopup.classList.remove("active");
    });

    tab.mlRegistBtn.addEventListener("click", () => {
      tab.mlPopup.classList.add("active");
    });

    tab.mrTimelineAddBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tab.mrTimelineAddPopup.classList.add("active");
      });
    });

    tab.mrTimelineUploadBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tab.mrTimelineUploadBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tab.mrTimelineUploadPopup.classList.add("active");
      });
    });

    tab.mrTimelineCloseBtn.addEventListener("click", () => {
      tab.mrTimelineUploadBtns.forEach((b) => b.classList.remove("active"));
      tab.mrTimelineUploadPopup.classList.remove("active");
    });
  });

  // input 수정
  document.querySelectorAll(".right-contents__detail.popup").forEach((popup) => {
    let title = popup.querySelector(".popup-contents__title .icon-label p");
    let editBtn = popup.querySelector(".integration-btn button.edit");
    let editBtnText = editBtn.querySelector("em");
    let infoArticle = popup.querySelector(".popup-contents .popup-contents__item article.list-info");
    let icons = popup.querySelectorAll(".popup-contents__item .border-wrap i.icon45");

    editBtn.addEventListener("click", () => {
      let isActive = editBtn.classList.toggle("active");
      title.textContent = isActive ? "Sửa TT cháy rừng" : "tình hình cháy rừng";
      editBtnText.textContent = isActive ? "sự lưu trữ" : "Chỉnh sửa";
      infoArticle.classList.toggle("disabled");
      icons.forEach((icon) => icon.classList.toggle("active"));
    });

    let timelineEditBtn = popup.querySelector(".popup-contents__item article div.btn-wrap button.edit");
    if (timelineEditBtn) {
      let timelineArticle = timelineEditBtn.closest("article.list-timeline");
      let timelineEditDiv = timelineEditBtn.nextElementSibling;
      let timelineEditDivBtns = timelineEditDiv.querySelectorAll("button");

      timelineEditBtn.addEventListener("click", () => {
        timelineEditBtn.classList.add("active");
        timelineArticle.classList.remove("disabled");
      });
      timelineEditDivBtns.forEach(function (timelineEditDivBtn) {
        timelineEditDivBtn.addEventListener("click", () => {
          timelineEditBtn.classList.remove("active");
          timelineArticle.classList.add("disabled");
        });
      });
    }
  });

  // 파일업로드
  document.querySelectorAll(".upload__area").forEach((uploadArea) => {
    let fileInput = uploadArea.querySelector('input[type="file"]');
    let uploadList = uploadArea.querySelector(".upload-list");
    let uploadedFiles = [];

    uploadList.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
      addFiles(fileInput.files);
      fileInput.value = "";
    });

    uploadList.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadList.classList.add("dragover");
    });

    uploadList.addEventListener("dragleave", () => {
      uploadList.classList.remove("dragover");
    });

    uploadList.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadList.classList.remove("dragover");
      addFiles(e.dataTransfer.files);
    });

    function addFiles(files) {
      Array.from(files).forEach((file) => {
        if (!uploadedFiles.some((f) => f.name === file.name && f.size === file.size)) {
          uploadedFiles.push(file);
        }
      });
      renderFiles();
    }

    function renderFiles() {
      let icon = uploadList.querySelector("i");
      let textDiv = uploadList.querySelector("div.text");
      let fileNames = uploadList.querySelector(".file-names");

      uploadArea.uploadedFiles = uploadedFiles;

      if (uploadedFiles.length === 0) {
        icon && (icon.style.display = "");
        textDiv && (textDiv.style.display = "");
        fileNames && fileNames.remove();
        return;
      }

      icon && (icon.style.display = "none");
      textDiv && (textDiv.style.display = "none");

      if (!fileNames) {
        fileNames = document.createElement("div");
        fileNames.className = "file-names";
        uploadList.appendChild(fileNames);
      }

      fileNames.innerHTML = "";
      uploadedFiles.forEach((file, index) => {
        let item = document.createElement("div");

        let fileName = document.createElement("span");
        fileName.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

        let delBtn = document.createElement("p");
        delBtn.textContent = "X";
        delBtn.className = "file-delete";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          uploadedFiles.splice(index, 1);
          renderFiles();
        });

        item.appendChild(fileName);
        item.appendChild(delBtn);
        fileNames.appendChild(item);
      });
    }
  });

  // progress bar
  document.querySelectorAll(".progress-bar").forEach((barContainer) => {
    let input = barContainer.querySelector("input[type='number']");
    let bar = barContainer.querySelector(".bar");
    let value = Math.max(0, Math.min(100, Number(input.value)));
    bar.style.width = value + "%";
  });

  // datetime local tooltip
  function formatDateToKorean(dateStr) {
    let date = new Date(dateStr);
    if (isNaN(date)) return "";

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");

    let isAM = hours < 12;
    let period = isAM ? "오전" : "오후";
    hours = hours % 12 || 12;
    let displayHour = String(hours).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${period} ${displayHour}:${minutes}:${seconds}`;
  }

  document.querySelectorAll("input[type='datetime-local']").forEach((input) => {
    let updateTooltip = () => {
      let formatted = formatDateToKorean(input.value);
      input.title = formatted;
    };

    input.addEventListener("change", updateTooltip);

    if (input.value) updateTooltip();
  });
});
