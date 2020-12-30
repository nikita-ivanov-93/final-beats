(function() {
  let myMap;
  const init =() => {
    myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.746939, 37.600209],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 14,
      controls: [
  
      ]
  });
  
    const soords = [
      [55.7614, 37.624461],
      [55.750412, 37.609359],
      [55.748806, 37.582362],
      [55.760725, 37.581334]
    ]
    const myCollecion = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './images/icons/marker.svg',
      iconImageSize: [58, 73],
      iconImageOffset: [-58, -37]
    });
    soords.forEach(coord => {
      myCollecion.add(new ymaps.Placemark(coord));
    });
  
    myMap.geoObjects.add(myCollecion);
  
    myMap.behaviors.disable('scrollZoom');
  }
  
  
  
  
  ymaps.ready(init);

})()
