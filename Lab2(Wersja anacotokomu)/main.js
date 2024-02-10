document.addEventListener("DOMContentLoaded", () => {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const [btnLeft, btnRight] = Array.from(document.querySelectorAll(".slider__btn"));
    const dotContainer = document.querySelector(".dots");
  
    let curSlide = 0;
  
    const goToSlide = slide => {
      slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
    };
  
    /**
     * Advances to the next slide.
     */
    const nextSlide = () => {
      curSlide = curSlide === slides.length - 1 ? 0 : curSlide + 1;
      goToSlide(curSlide);
    };
  
    const prevSlide = () => {
      curSlide = curSlide === 0 ? slides.length - 1 : curSlide - 1;
      goToSlide(curSlide);
    };
  
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
  
    goToSlide(0);
  });