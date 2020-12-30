(function() {
  // hero-section modal menu
  
  const button = document.querySelector('#hamburger');
  let menu = document.querySelector('#overlay');
  let body = document.querySelector('body');
  let menuLink = document.querySelector('.menu__list');
  
  
  let toggleMenu = function (e) {
    button.classList.toggle('hamburger--active');
    menu.classList.toggle('menu-overlay');
    body.classList.toggle('body-active-menu');
  };
  
  
  button.addEventListener('click', toggleMenu);
  
  // slideshow
  
  function findBlockByAlias(alias) {
    return $('.reviews__item').filter((ndx, item) => {
      return $(item).attr('data-linked') === alias;
      
    });
  };
  
  
  $('.interactive-avatar__link').on('click', function (e) {
    e.preventDefault();
  
    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest('.reviews__switcher-item');
  
    itemToShow.addClass('reviews__item--active').siblings().removeClass('reviews__item--active');
    curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
  
  });
  
  // team-section dropdown menu
  
  const openItem = item=> {
    const container = item.closest('.team__member');
    const contentBlock = container.find('.team__member-content');
    const textBlock = contentBlock.find('.team__member-content-block');
    const heightNeeded = textBlock.height();
    container.addClass('active');
  
    contentBlock.height(heightNeeded);
  };
  
  const closeItems = container => {
    const items = container.find('.team__member-content');
    const itemContainer = container.find('.team__member');
  
    itemContainer.removeClass('active');
    items.height(0);
  };
  
  $('.team__member-title').on('click', e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team');
    const elemContainer = $this.closest('.team__member');
  
    if (elemContainer.hasClass('active')) {
      closeItems(container);
    } else {
      closeItems(container);
      openItem($this);
  
    }
  
  })

})();
