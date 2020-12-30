(function() {
  const sections = $('.section');
  const display = $('.main-content');
  let inScroll = false;
  
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  const isMobile = mobileDetect.mobile();
  
  sections.first().addClass('section-active');
  const performTransition = sectionEq => {
    
    if (inScroll === false) {
      inScroll = true;
      const position = sectionEq * -100;
      
      const currentSection = sections.eq(sectionEq);
      const menuTheme = currentSection.attr('data-sidemenu-theme');
      const sideMenu = $('.fixed-menu');
      if (menuTheme === 'white') {
          sideMenu.addClass('fixed-menu--white');
      } else {
          sideMenu.removeClass('fixed-menu--white');
          
      }
  
      display.css({
        transform: `translateY(${position}%)`
      })
      
      sections.eq(sectionEq).addClass('section-active').siblings().removeClass('section-active');
      
      
  
      setTimeout(() => {
        inScroll = false;
        sideMenu.find('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');
      }, 1000);
      
    }
    
  }
  
  const scrollViewport = direction => {
    const activeSection = sections.filter('.section-active');
    const nextSection =  activeSection.next();
    const prevSection =  activeSection.prev();
    // console.log(prevSection.index());
    // console.log(activeSection.index());
    // console.log(nextSection.index());
    if (direction === 'next' && nextSection.length) {
      performTransition(nextSection.index());
    }
    if (direction === 'prev' && prevSection.length) {
      performTransition(prevSection.index());
  
    }
  }
  
  $(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    if (deltaY > 0) {
      scrollViewport('next');
    }
    
    if (deltaY < 0) {
      scrollViewport('prev');
    }
  });
  
  $(window).on('keydown', e => {
    console.log(e.keyCode);
    const tagName = e.target.tagName.toLowerCase();
    if (tagName != 'input' && tagName != 'textarea' ) {
      switch (e.keyCode) {
        case 38: //prev
          scrollViewport('prev');
          break;
        case 40: //next
          scrollViewport('next');
          break;
      }
  
    }
  });
  
  $('.wrapper').on('touchmove', e => e.preventDefault());
  
  $('[data-scroll-to]').click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
  
    const reqSection = $(`[data-section-id=${target}]`);
    performTransition(reqSection.index());
  });
  
  // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  
  if (isMobile) {
    $('body').swipe ({
      //Generic swipe handler for all directions
      swipe: function (
        event, direction,
      ) {
        let scrollDirection = '';
        if (direction === 'up') {
          scrollDirection = 'next';
        };
        if (direction === 'down') {
          scrollDirection = 'prev';
        };
        scrollViewport(scrollDirection);
      },
    });
  
  }

})()



