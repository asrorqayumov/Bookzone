// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.
const targets = document.querySelectorAll("[data-target]");
const content = document.querySelectorAll("[data-content]");
const tabMenu = document.getElementsByClassName("tab__menu")[0];

let tabsPane = tabMenu?.getElementsByTagName("li");

for (let i = 0; i < tabsPane?.length; i++) {
  tabsPane[i].addEventListener("click", function () {
    tabMenu.getElementsByClassName("active")[0].classList.remove("active");
    tabsPane[i].classList.add("active");
  });
}

targets.forEach((target) => {
  target.addEventListener("click", () => {
    content.forEach((c) => {
      c.classList.remove("active");
    });
    const t = document.querySelector(target.dataset.target);
    t.classList.add("active");
  });
});

 

