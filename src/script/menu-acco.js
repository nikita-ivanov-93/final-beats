(function() {
  const mesureWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest('.colors');
    const titleItemWidth = container.find('.colors__title').width();
    const titlesWidth = 3 * titleItemWidth;
    
    const textContainer = item.find('.colors__container');
    const paddingLeft = parseInt(textContainer.css('padding-left'));
    const paddingRight = parseInt(textContainer.css('padding-right'));
    
    const isTablet = window.matchMedia("(max-width: 768px)").matches;
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
  
    if (isMobile) {
      reqItemWidth = screenWidth - titleItemWidth;
    } else if (isTablet) {
      reqItemWidth = screenWidth - titlesWidth;
    } else {
      reqItemWidth = 500;
    }
  
    
    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingLeft - paddingRight
    }
  
  }
  
  const closeColorItem = container => {
    const items = container.find('.colors__item');
    const content = container.find('.colors__content');
    items.removeClass('color--active');
    content.width(0);
  }
  
  const openColorItem = item => {
    const hiddenContent = item.find('.colors__content');
    const reqWidth = mesureWidth(item);
    const textBlock = item.find('.colors__container');
  
    item.addClass('color--active');
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
  }
  
  
  $('.colors__title').on('click', e => {
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    const item = $this.closest('.colors__item');
    const openedItem = item.hasClass('color--active');
    const container = $this.closest('.colors');
    const closedItems = item.siblings('.colors__item');
  
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
  
    if (isMobile) {
      if (openedItem) {
        closeColorItem(container);
        closedItems.css('display','flex');
      } else {
        closeColorItem(container);
        openColorItem(item);
        closedItems.css('display','none');
      }
    } else {
      if (openedItem) {
        closeColorItem(container);
      } else {
        closeColorItem(container);
        openColorItem(item);
      }
    }
    
    // if (openedItem) {
    //   closeColorItem(container);
    // } else {
    //   closeColorItem(container);
    //   openColorItem(item);
    // }
  });
  $('.colors__close').on('click', e => {
    e.preventDefault();
  
    closeColorItem($('.colors'));
  })

})()