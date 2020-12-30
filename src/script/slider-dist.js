(function() {
  const slider=$(".slider__list").bxSlider({pager:!1,controls:!1});$("#left").click(e=>{e.preventDefault(),slider.goToPrevSlide()}),$("#right").click(e=>{e.preventDefault(),slider.goToNextSlide()});

})()