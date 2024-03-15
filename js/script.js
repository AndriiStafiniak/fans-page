{
  const isTouchScreen = () => {
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      document.body.classList.add("mobile");
    } else {
      document.body.classList.add("pc");
    }
  };

  const menuIcon = document.querySelector(".js-menu__icon");
  const menuBody = document.querySelector(".js-menu");

  const hiddenMenu = (menuIcon, menuBody) => {
    if (!menuIcon.classList.contains("active")) {
      return;
    }
    menuIcon.classList.remove("active");
    menuBody.classList.remove("active");
    document.body.classList.remove("lock");
  };

  const showMenuMobile = () => {
    if (!menuIcon) {
      return;
    }
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("active");
      menuBody.classList.toggle("active");
      document.body.classList.toggle("lock");
    });
  };

  const scrollToSection = (goToSectionValue) => {
    window.scrollTo({
      top: goToSectionValue,
      behavior: "smooth",
    });
  };

  const calculateHeight = (goToSection) => {
    const headerOffSet = document.querySelector("header").offsetHeight;
    const goToSectionValue =
      goToSection.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffSet;
    scrollToSection(goToSectionValue);
  };
  const toggleClassSubMenu = () => {
    const menuArrow = document.querySelector(".js-menu__arrow");
    if (!menuArrow) {
      return;
    }
    menuArrow.addEventListener("click", () => {
      menuArrow.parentElement.classList.toggle("active");
    });
  };
  const navigation = () => {
    const menuLinks = document.querySelectorAll(".js-menu__link[data-goto]");
    if (!menuLinks || menuLinks.length === 0) {
      return;
    }
    menuLinks.forEach((link) => {
      link.addEventListener("click", onMenuLinkKlick);
    });
  };

  const onMenuLinkKlick = (event) => {
    event.preventDefault();

    const menuLink = event.target;
    const gotoSectionSelector = menuLink.dataset.goto;
    if (!gotoSectionSelector) {
      return;
    }
    const goToSection = document.querySelector(menuLink.dataset.goto);
    if (!goToSection) {
      return;
    }

    calculateHeight(goToSection);
    hiddenMenu(menuIcon, menuBody);
  };

  const init = () => {
    isTouchScreen();
    navigation();
    toggleClassSubMenu();
    showMenuMobile();
  };
  init();
}
