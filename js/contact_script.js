ymaps.ready(function () {
  // Координаты адреса в Минске (улица Шаранговича, 25)
  var minskLocation = [53.883543, 27.448068];

  // Создание карты
  var map = new ymaps.Map("map", {
    center: minskLocation, // Центр карты
    zoom: 16, // Масштаб карты
  });

  // Создание метки на карте
  var placemark = new ymaps.Placemark(minskLocation, {
    hintContent: "Улица Шаранговича, 25", // Текст при наведении на метку
    balloonContent: "Улица Шаранговича, 25", // Текст при клике на метку
  });

  // Добавление метки на карту
  map.geoObjects.add(placemark);
});
