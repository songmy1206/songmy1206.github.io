document.addEventListener("DOMContentLoaded", function () {
  // 상단 기능버튼
  let topFnBtn = document.querySelectorAll(".fn-wrap .top-fn-btn");
  topFnBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      topFnBtn.forEach(function (btn) {
        btn.classList.remove("select");
      });
      btn.classList.add("select");
    });
  });

  // 달력, 시계
  let calendar = document.querySelector(".calendar");
  let clock = document.querySelector(".clock");

  function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hour = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");

    let datetimeCalendar = `${year}.${month}.${day}.`;
    let datetimeClock = `${hour}:${minutes}`;

    calendar.textContent = datetimeCalendar;
    clock.textContent = datetimeClock;
  }

  getTime();
  setInterval(getTime, 1000);

  // 리스트 정렬
  let listSortEls = document.querySelectorAll(".list-sort > *");
  listSortEls.forEach((listSortEl) => {
    listSortEl.addEventListener("click", function () {
      listSortEls.forEach((listSortEl) => {
        listSortEl.classList.remove("select");
      });

      listSortEl.classList.toggle("select");
    });
  });

  // 네비게이션 탭
  let gnbBar = document.querySelectorAll(".gnb-bar .gnb-menu");
  let gnbContents = document.querySelectorAll(".gnb-tab-wrap .gnb-tab");

  gnbBar.forEach(function (bar) {
    bar.addEventListener("click", function (event) {
      let targetClass = Array.from(event.currentTarget.classList).find(
        (cls) => cls.startsWith("gnb-") && cls !== "gnb-menu"
      );
      let isselect = event.currentTarget.classList.contains("select");

      gnbBar.forEach((tab) => tab.classList.remove("select"));
      gnbContents.forEach((content) => content.classList.remove("select"));

      if (!isselect) {
        event.currentTarget.classList.add("select");
        gnbContents.forEach(function (content) {
          if (content.classList.contains(targetClass)) {
            content.classList.add("select");
          }
        });
      }

      gnbContents.forEach(function (content) {
        if (content.classList.contains("non-select")) {
          content.classList.remove("non-select");
          if (content.classList.contains(targetClass)) {
            content.classList.add("select");
          } else {
            document.querySelector(".gnb-tab." + targetClass).classList.add("select");
          }
        }
      });
    });
  });

  //  건물배치 툴바
  let toolBox = document.querySelector(".tool-box");
  let buildingAssetBtn = document.querySelector(".btn.building-asset");
  buildingAssetBtn.addEventListener("click", function () {
    buildingAssetBtn.classList.toggle("select");
    toolBox.classList.toggle("show-asset");
  });

  let toolMenuBtn = document.querySelectorAll(".tool-btn-wrap .btn.tool");
  toolMenuBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.classList.toggle("select");
      toolMenuBtn.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.classList.remove("select");
        }
      });
    });
  });

  // 지도조절버튼
  let mcBtn = document.querySelectorAll(".map-control .mc-wrap .mc-btn:not(.compass)");
  mcBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("select")) {
        btn.classList.remove("select");
      } else {
        mcBtn.forEach(function (btn) {
          btn.classList.remove("select");
        });
        btn.classList.add("select");
      }
      if (!mcLayerBtn.classList.contains("select")) {
        layerPicker.classList.add("hide");
      }
    });
  });

  let mcLayerBtn = document.querySelector(".mc-btn.layer");
  let layerPicker = document.querySelector(".mc-btn.layer + .layer-picker");
  mcLayerBtn.addEventListener("click", function () {
    if (this.classList.contains("select")) {
      layerPicker.classList.remove("hide");
    } else {
      layerPicker.classList.add("hide");
    }
  });

  // 토글 온오프
  let toggles = document.querySelectorAll('input[type="checkbox"]');
  toggles.forEach(function (toggle) {
    let label = toggle.nextElementSibling;
    label.addEventListener("click", function (event) {
      if (toggle.classList.contains("disabled")) {
        event.preventDefault();
      }
    });
  });

  // 전체 검색 필터
  let filterBtn = document.querySelector(".filter-btn");
  let filterPopup = document.querySelector(".filter-btn + .filter-popup");
  filterBtn.addEventListener("click", function () {
    filterBtn.classList.toggle("select");
    filterPopup.classList.toggle("hide");
  });

  let filterPopupCloseBtn = filterPopup.querySelector(".filter-popup .ico-close");
  filterPopupCloseBtn.addEventListener("click", function () {
    filterPopup.classList.add("hide");
    filterBtn.classList.remove("select");
  });

  // 데이터 범례 수정 버튼
  let legendEditBtns = document.querySelectorAll(".legend-list .button .edit");
  legendEditBtns.forEach(function (legendEditBtn) {
    let legendList = legendEditBtn.closest(".legend-list");
    let legendCloseBtn = legendList.querySelector(".button .close");

    legendEditBtn.addEventListener("click", function () {
      legendList.classList.add("edit");
      legendEditBtn.textContent = "초기화";
      legendCloseBtn.textContent = "적용";

      legendCloseBtn.dataset.role = "apply";
      legendCloseBtn.classList.remove("close");
    });
  });

  // 데이터 범례 닫기 / 적용
  let legendCloseBtns = document.querySelectorAll(".legend-list .button .close");

  legendCloseBtns.forEach(function (legendCloseBtn) {
    let hiddenList = legendCloseBtn.closest(".hidden-list");
    let legendList = legendCloseBtn.closest(".legend-list");
    let listHeader = legendList.querySelector(".list-header");
    let legendEditBtn = legendList.querySelector(".button .edit");

    legendCloseBtn.addEventListener("click", function () {
      if (legendCloseBtn.dataset.role === "apply") {
        legendList.classList.remove("edit");
        legendEditBtn.textContent = "수정";
        legendCloseBtn.textContent = "닫기";

        legendCloseBtn.dataset.role = "close";
        legendCloseBtn.classList.add("close");
      } else {
        listHeader.classList.remove("select");
        hiddenList.style.height = "0";
      }
    });
  });

  // 데이터 범례/배치목록 토글
  let listHeaders = document.querySelectorAll(".placement-list .list-header, .legend-list .list-header");

  listHeaders.forEach(function (header) {
    let hiddenList = header.nextElementSibling;
    header.addEventListener("click", function () {
      let isOpen = header.classList.contains("select");
      if (isOpen) {
        header.classList.remove("select");
        hiddenList.style.height = "0";
      } else {
        header.classList.add("select");
        hiddenList.style.height = "auto";
      }
    });
    let stopTargets = header.querySelectorAll("input:not([type='checkbox']), button");
    stopTargets.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });
  });

  // 배치목록 리스트 토글
  let listTitle = document.querySelectorAll(".placement-list .list-contents .list-content > .title");
  listTitle.forEach(function (title) {
    let rotated = false;
    let buildingList = title.nextElementSibling;
    let hiddenListHeight = buildingList.scrollHeight;
    buildingList.style.height = hiddenListHeight + "px";

    let detailList = buildingList.querySelectorAll("li:not(.hidden-list)");
    if (!title.classList.contains("empty")) {
      title.addEventListener("click", function () {
        if (rotated) {
          title.classList.add("select");
          buildingList.style.height = buildingList.scrollHeight + "px";

          let totalHeight = buildingList.scrollHeight;

          detailList.forEach(function (detailList) {
            if (detailList.classList.contains("select")) {
              let rotatedHiddenList = detailList.nextElementSibling;

              totalHeight += rotatedHiddenList.scrollHeight;
              buildingList.style.height = `${totalHeight}px`;
            }
          });
        } else {
          title.classList.remove("select");
          buildingList.style.height = "0";
        }
        rotated = !rotated;
      });
    } else {
      buildingList.style.height = "auto";
    }
  });

  // 배치목록 세부 토글
  let hiddenListHeader = document.querySelectorAll(
    ".placement-list .list-contents .list-content ul li:not(.hidden-list)"
  );
  hiddenListHeader.forEach(function (header) {
    let rotated = false;
    let buildingHiddenList = header.nextElementSibling;
    let buildingWrap = header.closest("ul");

    header.addEventListener("click", function () {
      let hiddenListHeight = 0;
      let listContents = buildingHiddenList.querySelectorAll("div");
      listContents.forEach(function (content) {
        hiddenListHeight += content.offsetHeight;
      });
      if (rotated) {
        header.classList.remove("select");
        buildingHiddenList.style.height = "0";
        buildingWrap.style.height = buildingWrap.offsetHeight - (hiddenListHeight + 8) + "px";
      } else {
        header.classList.add("select");
        buildingHiddenList.style.height = hiddenListHeight + 8 + "px";
        buildingWrap.style.height = buildingWrap.offsetHeight + hiddenListHeight + 8 + "px";
      }
      rotated = !rotated;
    });

    let inputs = header.querySelectorAll("input");
    inputs.forEach(function (input) {
      input.addEventListener("click", function (event) {
        event.stopPropagation();
      });
    });
  });

  // 배치목록 삭제
  let trashBtn = document.querySelectorAll(".placement-list:not(.popup) .ico-trash");
  trashBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let listItem = btn.closest("li");
      let listHiddenItem = listItem.nextElementSibling;
      let parentList = listItem.closest("ul");

      let listItemHeight = listItem.offsetHeight;
      let listHiddenItemHeight = listHiddenItem ? listHiddenItem.offsetHeight : 0;

      if (listItem) {
        listItem.remove();
        if (listHiddenItem) listHiddenItem.remove();
        requestAnimationFrame(() => {
          let newHeight = parentList.offsetHeight - (listItemHeight + listHiddenItemHeight);
          parentList.style.height = newHeight + "px";
        });
      }
    });
  });

  // 수정버튼 <-> 초기화 버튼
  let listEditBtn = document.querySelectorAll(".placement-list .list-contents button.edit");
  let editSaveBtn = document.querySelectorAll(".placement-list:not(.placement-popup) .list-contents button.save");
  listEditBtn.forEach(function (btn) {
    let listContents = btn.closest(".list-contents");
    let editDel = listContents.querySelector(".placement-list .btn-wrap.edit-del");
    let resetSave = listContents.querySelector(".placement-list .btn-wrap.reset-save");
    let listTitleInput = btn.closest(".placement-list").querySelector(".list-header .title input");

    btn.addEventListener("click", function () {
      let editInput = btn.closest(".placement-list").querySelectorAll(".edit-input");

      editInput.forEach(function (input) {
        input.readOnly = false;
        input.focus();
      });
      resetSave.classList.remove("hide");
      editDel.classList.add("hide");

      if (listTitleInput) {
        listTitleInput.classList.add("edit");
      }
    });
  });

  editSaveBtn.forEach(function (btn) {
    let listContents = btn.closest(".list-contents");
    let editDel = listContents.querySelector(".placement-list .btn-wrap.edit-del");
    let resetSave = listContents.querySelector(".placement-list .btn-wrap.reset-save");
    let listTitleInput = btn.closest(".placement-list").querySelector(".list-header .title input");
    btn.addEventListener("click", function () {
      let editInput = btn.closest(".placement-list").querySelectorAll(".edit-input");
      editInput.forEach(function (input) {
        input.readOnly = true;
      });
      resetSave.classList.add("hide");
      editDel.classList.remove("hide");
      if (listTitleInput) {
        listTitleInput.classList.remove("edit");
      }
    });
  });

  // 즐겨찾기
  let iconBookmark = document.querySelectorAll("i.ico-bookmark, .ico-bookmark_a");
  iconBookmark.forEach(function (icon) {
    icon.addEventListener("click", function () {
      icon.classList.toggle("select");
    });
  });

  // 상세보기 상단 박스
  let targetSettingBtn = document.querySelectorAll(".sub-tab-top .button .target-setting");

  targetSettingBtn.forEach(function (targetSettingBtn) {
    let subTabTop = targetSettingBtn.closest(".sub-tab-top");
    let subTabBox = subTabTop.querySelector(".sub-tab-box");
    let targetCancelBtn = subTabBox.querySelector(".button .target-cancel");
    let targetPopup = subTabTop.querySelector(".target-popup");
    let targetPopupCancel = targetPopup.querySelector(".btn-wrap .cancel");
    let targetPopupConfirm = targetPopup.querySelector(".btn-wrap .confirm");
    let titleIconFlag = subTabBox.querySelector(".title i.ico-flag");

    targetSettingBtn.addEventListener("click", function () {
      targetPopup.classList.remove("hide");
    });
    targetPopupCancel.addEventListener("click", function () {
      targetPopup.classList.add("hide");
    });
    targetPopupConfirm.addEventListener("click", function () {
      targetPopup.classList.add("hide");
      subTabBox.classList.remove("hide");
      targetSettingBtn.classList.add("hide");
      targetCancelBtn.classList.remove("hide");
      titleIconFlag.classList.remove("hide");
    });
    targetCancelBtn.addEventListener("click", function () {
      targetSettingBtn.classList.remove("hide");
      targetCancelBtn.classList.add("hide");
      titleIconFlag.classList.add("hide");
    });
  });

  // 셀렉트 박스 커스텀
  function updateMaxWidth(selectBox, options) {
    let maxWidth = 0;

    options.forEach((option) => {
      let tempElement = document.createElement("span");
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      tempElement.style.whiteSpace = "nowrap";
      tempElement.textContent = option.textContent;
      document.body.appendChild(tempElement);

      let optionWidth = tempElement.offsetWidth + 25;
      if (optionWidth > maxWidth) {
        maxWidth = optionWidth;
      }

      document.body.removeChild(tempElement);
    });

    return maxWidth;
  }

  function updateLabelWidth(label, labelText) {
    let tempElement = document.createElement("span");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.textContent = labelText.textContent;
    document.body.appendChild(tempElement);

    let selectedWidth = tempElement.offsetWidth + 45;
    label.style.width = selectedWidth + "px";

    document.body.removeChild(tempElement);
  }

  function setupSelectBox(selectBox) {
    let label = selectBox.querySelector(".label");
    let labelText = label.querySelector("p");
    let options = selectBox.querySelectorAll(".optionItem");
    let maxWidth = updateMaxWidth(selectBox, options);

    label.addEventListener("click", () => {
      selectBox.classList.toggle("active");

      if (selectBox.classList.contains("active")) {
        label.style.width = maxWidth + "px";
      } else {
        updateLabelWidth(label, labelText);
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        labelText.textContent = e.target.textContent;
        updateLabelWidth(label, labelText);
        selectBox.classList.remove("active");
        options.forEach((opt) => opt.classList.remove("select"));
        option.classList.add("select");
      });
    });

    document.addEventListener("click", (e) => {
      if (!selectBox.contains(e.target)) {
        selectBox.classList.remove("active");
        updateLabelWidth(label, labelText);
      }
    });

    // 초기 너비 설정
    updateLabelWidth(label, labelText);
  }

  // 기본 셀렉트 박스 초기화
  let selectBoxes = document.querySelectorAll(".select-box:not(.w150)");
  selectBoxes.forEach(setupSelectBox);

  // 150px 고정 너비 셀렉트 박스 초기화
  let selectBoxes150 = document.querySelectorAll(".select-box.w150");
  selectBoxes150.forEach((selectBox) => {
    let label = selectBox.querySelector(".label");
    let labelText = label.querySelector("p");
    let options = selectBox.querySelectorAll(".optionItem");

    label.addEventListener("click", () => {
      selectBox.classList.toggle("active");
    });

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        labelText.textContent = e.target.textContent;
        selectBox.classList.remove("active");
        options.forEach((opt) => opt.classList.remove("select"));
        option.classList.add("select");
      });
    });

    document.addEventListener("click", (e) => {
      if (!selectBox.contains(e.target)) {
        selectBox.classList.remove("active");
      }
    });
  });

  // 탭
  let tabBars = document.querySelectorAll(".tab-bar");
  tabBars.forEach(function (tabBar) {
    let tabBarEls = tabBar.querySelectorAll("p");
    let tabContents = tabBar.nextElementSibling;
    let tabs = tabContents.querySelectorAll(".tabs .tab");

    tabBarEls.forEach(function (bar) {
      bar.addEventListener("click", function (event) {
        let targetClass = event.target.className.split(" ")[0];
        if (event.target.classList.contains("select")) {
          return;
        }
        tabBarEls.forEach((tab) => tab.classList.remove("select"));
        tabs.forEach((content) => content.classList.remove("select"));

        event.target.classList.add("select");
        tabContents.querySelector(".tabs .tab." + targetClass)?.classList.add("select");
      });
    });

    // 탭 초기 상태 설정
    if (tabBarEls.length > 0 && tabs.length > 0) {
      tabBarEls[0].classList.add("select");
      tabs[0].classList.add("select");
    }
  });

  // 상단기능 버튼 정보 패널
  let fnPopup = document.querySelectorAll(".fn-popup");
  fnPopup.forEach(function (fnPopup) {
    let fnLayerList = fnPopup.querySelectorAll(".fn-popup .tab-contents .layer-list li");
    fnLayerList.forEach(function (list) {
      list.addEventListener("click", function () {
        if (!list.classList.contains("select")) {
          fnLayerList.forEach((i) => i.classList.remove("select"));
        }
        list.classList.toggle("select");
      });
    });
  });

  // 윈도우
  // window.addEventListener("resize", () => centerTo(currentIndex, false));

  // 고도조절바
  class ElevationAdjustment {
    constructor(playAdjustment) {
      this.playAdjustment = playAdjustment;

      this.adjustmentBarBtn = playAdjustment.querySelector(".elevation-adjustment-bar .ico-wrap i");
      this.playbarToggle = playAdjustment.querySelector(".play-bar > .ico-angle-bracket");

      this.elevationWrap = playAdjustment.querySelector(".elevation-wrap");
      this.elevation = playAdjustment.querySelector(".elevation");

      this.items = this.elevation ? [...this.elevation.children] : [];
      this.liCount = this.items.length;

      this.currentIndex = Math.floor(this.liCount / 2);
      this.maxScroll = 0;
      this.rotated = false;

      this.playbarVisible = false;
      this.elevationVisible = false;

      this.init();
    }

    init() {
      if (this.playbarToggle) this.attachPlayBarToggleEvent();
      if (this.adjustmentBarBtn) this.attachToggleEvent();

      if (this.items.length > 0 && this.elevationWrap) {
        this.centerTo(this.currentIndex, false);
        this.attachClickEvents();
        this.attachDragEvents();

        const ro = new ResizeObserver(() => {
          this.centerTo(this.currentIndex, false);
        });
        ro.observe(this.elevationWrap);
      }
    }

    attachPlayBarToggleEvent() {
      if (!this.playbarToggle) return;

      this.playbarToggle.addEventListener("click", (e) => {
        e.stopPropagation();

        const bothExist = !!this.playbarToggle && !!this.adjustmentBarBtn;

        if (bothExist) {
          this.playbarVisible = !this.playbarVisible;
          this.elevationVisible = this.playbarVisible;
        } else {
          this.playbarVisible = !this.playbarVisible;
        }

        this.applyToggle();
      });
    }

    attachToggleEvent() {
      if (!this.adjustmentBarBtn) return;

      this.adjustmentBarBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const bothExist = !!this.playbarToggle && !!this.adjustmentBarBtn;

        if (bothExist) {
          this.elevationVisible = !this.elevationVisible;
          this.playbarVisible = this.elevationVisible;
        } else {
          this.elevationVisible = !this.elevationVisible;
        }

        this.applyToggle();
      });
    }

    applyToggle() {
      const hasAdjustBtn = !!this.adjustmentBarBtn;
      const hasPlayToggle = !!this.playbarToggle;
      const elevationBar = this.playAdjustment.querySelector(".elevation-adjustment-bar");

      if (hasAdjustBtn && hasPlayToggle) {
        this.playAdjustment.classList.toggle("show-playbar", this.playbarVisible);

        if (elevationBar) {
          elevationBar.classList.toggle("show-elevation", this.elevationVisible);
        }

        const rotation = this.playbarVisible || this.elevationVisible ? "rotate(270deg)" : "rotate(90deg)";
        this.playbarToggle.style.transform = rotation;
        this.adjustmentBarBtn.style.transform = rotation;
      } else if (hasAdjustBtn && !hasPlayToggle) {
        if (elevationBar) {
          elevationBar.classList.toggle("show-elevation", this.elevationVisible);
        }

        const rotation = this.elevationVisible ? "rotate(270deg)" : "rotate(90deg)";
        this.adjustmentBarBtn.style.transform = rotation;
      } else if (!hasAdjustBtn && hasPlayToggle) {
        this.playAdjustment.classList.toggle("show-playbar", this.playbarVisible);

        const rotation = this.playbarVisible ? "rotate(270deg)" : "rotate(90deg)";
        this.playbarToggle.style.transform = rotation;
      }
    }

    updateMaxScroll() {
      if (this.elevation && this.elevationWrap) {
        this.maxScroll = Math.max(0, this.elevation.scrollHeight - this.elevationWrap.clientHeight);
      } else {
        this.maxScroll = 0;
      }
    }

    centerTo(idx, smooth = true) {
      if (!this.elevationWrap || !this.items.length) return;

      this.updateMaxScroll();
      idx = Math.max(0, Math.min(this.liCount - 1, idx));
      this.currentIndex = idx;

      const targetItem = this.items[idx];
      const itemHeight = targetItem.offsetHeight;
      const viewportHeight = this.elevationWrap.clientHeight;

      let targetScroll = targetItem.offsetTop + itemHeight / 2 - viewportHeight / 2;
      targetScroll = Math.max(0, Math.min(targetScroll, this.maxScroll));

      this.elevationWrap.scrollTo({
        top: targetScroll,
        behavior: smooth ? "smooth" : "auto",
      });

      this.updateCenterClass(idx);
    }

    updateCenterClass(idx) {
      this.items.forEach((el) => el.classList.remove("center"));
      this.items[idx]?.classList.add("center");
    }

    attachClickEvents() {
      this.items.forEach((li, idx) => {
        li.addEventListener("click", () => this.centerTo(idx));
      });
    }

    attachDragEvents() {
      if (!this.elevationWrap) return;

      let isDragging = false;
      let startY = 0;
      let startScrollTop = 0;

      this.elevationWrap.addEventListener("pointerdown", (e) => {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = this.elevationWrap.scrollTop;
        this.elevationWrap.style.scrollBehavior = "auto";
        document.body.style.userSelect = "none";
      });

      window.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        const delta = startY - e.clientY;
        let newScroll = startScrollTop + delta;
        newScroll = Math.max(0, Math.min(newScroll, this.maxScroll));
        this.elevationWrap.scrollTop = newScroll;
      });

      window.addEventListener("pointerup", () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.userSelect = "";
        this.elevationWrap.style.scrollBehavior = "smooth";

        const viewportCenter = this.elevationWrap.scrollTop + this.elevationWrap.clientHeight / 2;
        let closestIdx = 0;
        let minDist = Infinity;

        this.items.forEach((el, i) => {
          const elCenter = el.offsetTop + el.offsetHeight / 2;
          const dist = Math.abs(elCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            closestIdx = i;
          }
        });

        this.centerTo(closestIdx);
      });
    }
  }

  // 재생바
  class PlayBarController {
    constructor(container) {
      this.container = typeof container === "string" ? document.querySelector(container) : container;
      if (!this.container) return;

      this.unitOptions = this.container.querySelectorAll(".unit-container .unit-option");
      this.progressBar = this.container.querySelector(".time-progress");
      this.bar = this.progressBar.querySelector(".bar");
      this.handle = this.progressBar.querySelector(".handle");
      this.playButton = this.container.querySelector(".play-bar .ico-toggle");

      this.currentStep = 0;
      this.isPlaying = false;
      this.interval = null;

      this.init();
    }

    init() {
      this.setupUnitOptions();
      this.initializeProgress();
      this.attachEventListeners();
    }

    setupUnitOptions() {
      this.unitOptions.forEach((option) => {
        option.addEventListener("click", () => {
          this.unitOptions.forEach((opt) => opt.classList.remove("active"));
          option.classList.add("active");
        });
      });
    }

    initializeProgress() {
      const rect = this.progressBar.getBoundingClientRect();
      const step = rect.width / 11;
      const initialLeft = 0;
      const nearestStep = Math.round(initialLeft / step) * step;

      this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
      this.bar.style.width = nearestStep + "px";
      this.bar.style.backgroundColor = "#48cde6";
      this.currentStep = 0;
    }

    attachEventListeners() {
      let isDragging = false;

      this.handle.addEventListener("mousedown", () => {
        isDragging = true;
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const rect = this.progressBar.getBoundingClientRect();
        const step = rect.width / 11;
        let offsetX = e.clientX - rect.left;

        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        const nearestStep = Math.round(offsetX / step) * step;

        this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
        this.bar.style.width = nearestStep + "px";
        this.bar.style.backgroundColor = "#48cde6";
        this.currentStep = Math.round(nearestStep / step);
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });

      this.progressBar.addEventListener("click", (e) => {
        const rect = this.progressBar.getBoundingClientRect();
        const step = rect.width / 11;
        let offsetX = e.clientX - rect.left;

        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        const nearestStep = Math.round(offsetX / step) * step;

        this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
        this.bar.style.width = nearestStep + "px";
        this.bar.style.backgroundColor = "#48cde6";
        this.currentStep = Math.round(nearestStep / step);
      });

      this.playButton?.addEventListener("click", () => {
        if (this.isPlaying) {
          this.stopProgress();
        } else {
          this.startProgress();
        }
      });
    }

    startProgress() {
      if (this.isPlaying) return;
      this.isPlaying = true;

      const rect = this.progressBar.getBoundingClientRect();
      const step = rect.width / 11;

      this.interval = setInterval(() => {
        this.currentStep++;

        if (this.currentStep > 11) {
          this.currentStep = 0;
          this.initializeProgress();
          this.stopProgress();
          return;
        }

        const nearestStep = this.currentStep * step;
        this.handle.style.left = nearestStep - this.handle.offsetWidth / 2 + "px";
        this.bar.style.width = nearestStep + "px";
        this.bar.style.backgroundColor = "#48cde6";
      }, 1000);

      this.playButton?.classList.add("pause");
      this.playButton?.classList.remove("play");
    }

    stopProgress() {
      clearInterval(this.interval);
      this.isPlaying = false;
      this.playButton?.classList.remove("pause");
      this.playButton?.classList.add("play");
    }
  }

  document.querySelectorAll(".fn-play-adj").forEach((el) => {
    new ElevationAdjustment(el);
    new PlayBarController(el);
  });

  // 재생바 슬라이드
  class WeatherSlider {
    constructor(playBar) {
      this.playBar = playBar;
      this.barPrevBtn = playBar.querySelector(".slide .ico-grey-arrow.prev");
      this.barNextBtn = playBar.querySelector(".slide .ico-grey-arrow.next");
      this.weatherWrap = playBar.querySelector(".weather-wrap");
      this.weatherItems = this.weatherWrap.querySelectorAll("li.weather");
      this.wrapWidth = this.weatherWrap.offsetWidth;
      this.itemWidth = this.weatherItems[0].offsetWidth;
      this.totalWidth = this.itemWidth * this.weatherItems.length;
      this.maxTranslateX = 0;
      this.currentIdx = 0;
      this.translateX = 0;

      this.updateMaxTranslateX();
      this.updateButtons();
      this.attachEvents();
    }

    updateMaxTranslateX() {
      if (this.totalWidth <= this.wrapWidth) {
        this.maxTranslateX = 0;
      } else {
        this.maxTranslateX = -(this.totalWidth - this.wrapWidth);
      }
    }

    updateButtons() {
      this.barPrevBtn.classList.toggle("disabled", this.currentIdx === 0);
      this.barNextBtn.classList.toggle("disabled", this.translateX <= this.maxTranslateX);
    }

    updateSlide() {
      this.updateMaxTranslateX();
      this.translateX = -this.currentIdx * this.wrapWidth;
      this.translateX = Math.max(this.translateX, this.maxTranslateX);
      this.weatherWrap.style.transform = `translateX(${this.translateX}px)`;
      this.updateButtons();
    }

    attachEvents() {
      this.barPrevBtn.addEventListener("click", () => {
        if (this.currentIdx > 0) {
          this.currentIdx--;
          this.updateSlide();
        }
      });

      this.barNextBtn.addEventListener("click", () => {
        if (this.currentIdx < this.weatherItems.length - 1) {
          this.currentIdx++;
          this.updateSlide();
        }
      });
    }
  }

  document.querySelectorAll(".play-bar").forEach((playBar) => {
    new WeatherSlider(playBar);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function () {
  // datepicker
  $(".datepicker-input").datepicker({
    dateFormat: "yy.mm.dd",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input, _) {
      let bottomWrap = $(input).closest(".bottom-wrap");
      bottomWrap.addClass("datepicker-open");
    },
    onClose: function (_, inst) {
      let bottomWrap = $(inst.input).closest(".bottom-wrap");
      bottomWrap.removeClass("datepicker-open");
    },
  });

  $(".bar-datepicker-input").datepicker({
    dateFormat: "yy.mm.dd",
    showMonthAfterYear: true,
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    showOtherMonths: true,
    selectOtherMonths: true,
    beforeShow: function (input, _) {
      setTimeout(() => {
        $(".ui-datepicker").addClass("bar-datepicker");
      }, 0);
    },
    onClose: function () {
      $(".ui-datepicker").removeClass("bar-datepicker");
    },
  });

  // overflow scroll 내부 select-box
  $(".select-box-in-overflow")
    .selectmenu({
      position: {
        my: "left top+4",
        collision: "flip",
      },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");

  // 컨텐츠 내부 select-box
  $(".select-box-in-content")
    .selectmenu({
      position: {
        my: "left top+4",
        collision: "flip",
      },
      create: function (event, ui) {
        $(this).selectmenu("menuWidget").parent().addClass("bar-select-box");
      },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");
});
