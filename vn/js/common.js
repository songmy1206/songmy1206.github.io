document.addEventListener("DOMContentLoaded", function () {
  // tab
  document.querySelectorAll(".tab").forEach((group) => {
    let tabs = group.querySelectorAll(".tab-nav__item");
    let contents = group.querySelectorAll(".tab-contents__item");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        tab.classList.add("active");
        contents[index].classList.add("active");
      });
    });
  });

  // calendar
  let pad = (n) => String(n).padStart(2, "0");
  let fmt = (d) => `${d.y}.${pad(d.m)}.${pad(d.d)}`;

  let allPickers = [];
  let calendars = document.querySelectorAll(".calendar");

  calendars.forEach(function (calendar) {
    let rangeBar = calendar.querySelector(".range-bar");
    let datePicker = calendar.querySelector(".date-picker");

    if (!rangeBar || !datePicker) return;
    let startDisp = rangeBar.querySelector(".start-display");
    let endDisp = rangeBar.querySelector(".end-display");
    let yearCol = datePicker.querySelector(".year-col");
    let monthCol = datePicker.querySelector(".month-col");
    let dayCol = datePicker.querySelector(".day-col");

    let today = new Date();
    let selected = {
      start: { y: today.getFullYear(), m: today.getMonth() + 1, d: today.getDate() },
      end: { y: today.getFullYear(), m: today.getMonth() + 1, d: today.getDate() },
    };
    let editing = "";

    let refreshDisplay = () => {
      startDisp.textContent = fmt(selected.start);
      endDisp.textContent = fmt(selected.end);
    };

    function fill(col, from, to, current, key) {
      col.innerHTML = "";
      let selectedDiv = null;

      for (let v = from; v <= to; v++) {
        let div = document.createElement("div");
        div.textContent = v;
        if (v === current[key]) {
          div.classList.add("selected");
          selectedDiv = div;
        }
        div.onclick = (e) => {
          e.stopPropagation();
          [...col.children].forEach((c) => c.classList.remove("selected"));
          div.classList.add("selected");
          current[key] = v;

          if (key === "y" || key === "m") refreshMonthAndDayLimits(current);

          checkDateRange();

          refreshDisplay();

          if (key === "d") {
            const parentTab = col.closest(".tab-contents__item");
            const tabClass = parentTab.classList.contains("tab1") ? "tab1" : "tab2";

            datePicker.style.display = "none";
            let dateChangeEvent = new CustomEvent("dateRangeChanged", { detail: { tab: tabClass } });
            document.dispatchEvent(dateChangeEvent);
          }
        };
        col.appendChild(div);
      }

      if (selectedDiv) {
        requestAnimationFrame(() => {
          selectedDiv.scrollIntoView({ block: "center" });
        });
      }
    }

    function checkDateRange() {
      let startDate = new Date(selected.start.y, selected.start.m - 1, selected.start.d);
      let endDate = new Date(selected.end.y, selected.end.m - 1, selected.end.d);

      if (startDate > endDate) {
        if (editing === "start") {
          selected.end = { ...selected.start };
        } else if (editing === "end") {
          selected.start = { ...selected.end };
        }
      }
    }

    function refreshMonthAndDayLimits(cur) {
      let now = new Date();
      let nowY = now.getFullYear();
      let nowM = now.getMonth() + 1;
      let nowD = now.getDate();

      let maxM = cur.y === nowY ? nowM : 12;
      if (cur.m > maxM) cur.m = maxM;
      fill(monthCol, 1, maxM, cur, "m");

      let isThisMonth = cur.y === nowY && cur.m === nowM;
      let maxD = isThisMonth ? nowD : new Date(cur.y, cur.m, 0).getDate();
      if (cur.d > maxD) cur.d = maxD;
      fill(dayCol, 1, maxD, cur, "d");
    }

    function openPicker(target) {
      editing = target;
      let cur = selected[target];

      let now = new Date();
      let nowY = now.getFullYear();
      let nowM = now.getMonth() + 1;
      let nowD = now.getDate();

      fill(yearCol, 1900, nowY, cur, "y");

      let maxM = cur.y === nowY ? nowM : 12;
      fill(monthCol, 1, maxM, cur, "m");

      let isThisMonth = cur.y === nowY && cur.m === nowM;
      let maxD = isThisMonth ? nowD : new Date(cur.y, cur.m, 0).getDate();
      fill(dayCol, 1, maxD, cur, "d");

      let rect = rangeBar.getBoundingClientRect();
      datePicker.style.position = "absolute";
      datePicker.style.left = `${rect.left - 2}px`;
      datePicker.style.top = `${rect.bottom + window.scrollY + 10}px`;
      datePicker.style.display = "flex";
    }

    let dateFields = rangeBar.querySelectorAll(".date-field");
    dateFields[0].onclick = () => openPicker("start");
    dateFields[1].onclick = () => openPicker("end");

    allPickers.push({ datePicker, rangeBar });

    refreshDisplay();
  });

  // 팝업 밖 클릭 시 모두 닫기
  document.addEventListener("click", function (e) {
    allPickers.forEach(({ datePicker, rangeBar }) => {
      if (!datePicker.contains(e.target) && !rangeBar.contains(e.target)) {
        datePicker.style.display = "none";
      }
    });
  });

  // popup close
  let closeBtns = document.querySelectorAll("i.icon25");
  closeBtns.forEach(function (closeBtn) {
    let progressBox = closeBtn.closest(".progress-box");
    if (progressBox) return;

    let popup = closeBtn.closest(".popup");
    let popupBtn = popup.querySelector("button.popup-btn");
    let popupContents = popup.querySelector(".popup-contents");
    if (!popupBtn) {
      let container = popup.closest(".container");
      if (container) {
        popupBtn = container.querySelector("button.popup-btn");
      }
    }

    closeBtn.addEventListener("click", function () {
      popupContents.classList.remove("active");
      if (popupBtn) {
        popupBtn.classList.remove("active");
      } else if (popup) {
        popup.classList.remove("active");
      }
    });
  });

  // sort
  let sortWraps = document.querySelectorAll(".sort");
  sortWraps.forEach(function (sortWrap) {
    let sortLists = sortWrap.querySelectorAll("li:not(.divider)");
    sortLists.forEach(function (sortList) {
      sortList.addEventListener("click", function () {
        sortLists.forEach(function (item) {
          item.classList.remove("active");
        });
        sortList.classList.add("active");
      });
    });
  });

  // list active
  let scrollContentsLists = document.querySelectorAll(".scroll-contents__list");
  scrollContentsLists.forEach(function (scrollContentsList) {
    let scrollContentsItems = scrollContentsList.querySelectorAll(".scroll-contents__item:not(.progress-box)");
    scrollContentsItems.forEach(function (scrollContentsItem) {
      scrollContentsItem.addEventListener("click", function () {
        scrollContentsItems.forEach(function (item) {
          item.classList.remove("active");
        });
        scrollContentsItem.classList.add("active");
      });
    });
  });

  // popup drag
  document.querySelectorAll(".popup.drag").forEach((popup) => {
    let header = popup.querySelector(".popup-contents__title");
    let selector = popup.dataset.container;
    let container = selector ? document.querySelector(selector) : document.body;

    if (!header || !container) return;

    let isDragging = false;
    let offsetX = 0,
      offsetY = 0;

    header.addEventListener("mousedown", (e) => {
      isDragging = true;

      // transform제거, 위치 재계산
      let computedTransform = getComputedStyle(popup).transform;
      if (computedTransform && computedTransform !== "none") {
        let popupRect = popup.getBoundingClientRect();
        let containerRect = container.getBoundingClientRect();

        let left = popupRect.left - containerRect.left;
        let top = popupRect.top - containerRect.top;

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.style.transform = "none";
      }

      let rect = popup.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.body.style.userSelect = "none";

      function onMouseMove(e) {
        if (!isDragging) return;

        let containerRect = container.getBoundingClientRect();
        let left = e.clientX - containerRect.left - offsetX;
        let top = e.clientY - containerRect.top - offsetY;

        left = Math.max(0, Math.min(left, container.clientWidth - popup.offsetWidth));
        top = Math.max(0, Math.min(top, container.clientHeight - popup.offsetHeight));

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
      }

      function onMouseUp() {
        isDragging = false;
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  });

  // map select button active
  let mapSelectBtns = document.querySelectorAll("button.map-select");
  mapSelectBtns.forEach(function (mapSelectBtn) {
    mapSelectBtn.addEventListener("click", function () {
      mapSelectBtn.classList.toggle("active");
    });
  });
  
  // 팝업 z-index
  let popups = Array.from(document.querySelectorAll(".popup"));
  let currentZIndex = 1;
  function bringToFront(popup) {
    currentZIndex++;
    popup.style.zIndex = currentZIndex;
  }
  // 클릭
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", () => {
      popup.classList.add("active");
      bringToFront(popup);
    });
  });
  // active 붙을때
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class" && mutation.target.classList.contains("active")) {
        bringToFront(mutation.target);
      }
    });
  });
  popups.forEach((popup) => observer.observe(popup, { attributes: true, attributeFilter: ["class"] }));
});
