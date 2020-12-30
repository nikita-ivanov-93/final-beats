// const leftbtn = document.querySelector('#left');
// const rightbtn = document.querySelector('#right');
// const list = document.querySelector('#list');
// const computedStyle = getComputedStyle(list);
// const items = document.querySelectorAll('.slider__item');

// const minRight = 0;
// var itemWidth = getComputedStyle(items[0]).width;
// const step = parseInt(itemWidth);
// const maxRight = step;
// let currentRight = 0;


// var leftClick;
// var rightClick;
// rightbtn.addEventListener('click', event => {
//   event.preventDefault();
//   if (rightClick == true) {
    
//   } else {
//     let currentRight = parseInt(computedStyle.right); 
//     if (currentRight < maxRight) {
//       list.style.right = `${currentRight + step}px`;
//       rightClick = true;
//       setTimeout(() => {rightClick = false}, 500);
//     }
//   };
// });

// leftbtn.addEventListener('click', event => {
//   event.preventDefault();
//   if (leftClick == true) {
//   } else {
//     let currentRight = parseInt(computedStyle.right); 
//     if (currentRight > minRight) {
//       list.style.right = `${currentRight - step}px`;
//       leftClick = true;
//       setTimeout(() => {leftClick = false}, 500);
//     }
//   };

// });

// $.resize(event => {
//   let currentRight = parseInt(computedStyle.right);
//   currentRight = itemWidth;
// })

(function() {
  const slider = $('.slider__list').bxSlider({
    pager: false,
    controls: false
  });
  
  $('#left').on('click', e => {
    e.preventDefault();
  
    slider.goToPrevSlide()
  })
  $('#right').on('click', e => {
    e.preventDefault();
    
    slider.goToNextSlide();
  })

})()