window.addEventListener("scroll", () => {
  const header = document.getElementById("glowingHeader");
  if (window.scrollY > 50) {
    header.classList.add("glowing");
  } else {
    header.classList.remove("glowing");
  }
});

document.querySelectorAll(".slider-container").forEach((container) => {
  const slider = container.querySelector(".slider");
  const indicator = container.querySelector(".indicator");
  const slideWidth =
    slider.querySelector(".product-card").clientWidth +
    parseFloat(getComputedStyle(slider).gap);

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
    updateIndicator();
  });

  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
    updateIndicator();
  });

  slider.addEventListener("touchend", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
  });

  function updateIndicator() {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
    const indicatorWidth = (indicator.clientWidth / slider.clientWidth) * 100;
    const leftPosition = (percentageScrolled * (100 - indicatorWidth)) / 100;

    indicator.style.left = `${leftPosition}%`;
  }

  function slideToNearestSlide() {
    const currentScroll = slider.scrollLeft;
    const exactScrollPosition = currentScroll / slideWidth;
    const currentSlideIndex = Math.round(exactScrollPosition);
    const newScrollLeft = currentSlideIndex * slideWidth;

    slider.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  }
});
