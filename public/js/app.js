let toggleWrap = document.getElementById("toggleWrap");
let toggleMenu = document.getElementById("toggleMenu");
let sidebar = document.getElementById("sidebar");
let main = document.getElementById("main");

toggleMenu.addEventListener("click", function () {
  if (!sidebar.classList.contains("hidden")) {
    sidebar.classList.add("hidden");

    toggleWrap.classList.remove("left-[240px]");
    toggleWrap.classList.add("left-[20px]");
  } else {
    sidebar.classList.remove("hidden");

    toggleWrap.classList.remove("left-[20px]");
    toggleWrap.classList.add("left-[240px]");
  }
});
