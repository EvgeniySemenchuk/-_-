document.addEventListener("DOMContentLoaded", function () {
  const choice = document.getElementById("choice");
  const contentContainer = document.getElementById("content-container");
  const sortTypeSelect = document.getElementById("sort-type");

  // Объект, содержащий данные для каждой зоны
  const zonesData = {
    gamezone: {
      name: "GAME ZONE",
      description: `Game Zone - большой модуль в киберарене с мощным железом. Модуль рассчитан на 30 игровых мест с топовым игровыми компьютерами, креслами и аксессуарами для профессиональных геймеров. Хорошо подойдёт как для индивидуальных, так и командных игр. В нем, как и в других модулях, разрешается не только кушать еду, заказанную в клубе, но и приносить свою.  В помещении никогда не бывает жарко или холодно, работают несколько кондиционеров, хорошая вентиляция. Администраторы всегда рядом, и если возникают трудности или неисправности в оборудовании, они всегда готовы помочь и подсказать.`,
      image: "/resource/servicess/gamezone.jpg",
      tooltip: "GAME ZONE <br>Что-то одновременно простое и крутое!",
      devices: [
        {
          name: "Монитор",
          type: "BenQ 24.5 240hz",
          image: "/resource/servicess/monitor.png",
        },
        {
          name: "Видеокарта",
          type: "GeForce RTX 3080",
          image: "/resource/servicess/videocart.png",
        },
        {
          name: "Наушники",
          type: "HyperX Cloud Alpha",
          image: "/resource/servicess/headphones.png",
        },
        {
          name: "Мышь",
          type: "HyperX Pulsefire Surge",
          image: "/resource/servicess/mouse.png",
        },
        {
          name: "Процессор",
          type: "Intel i7-11700K",
          image: "/resource/servicess/cpu.png",
        },
        {
          name: "Оп.память",
          type: "16Gb DDR4",
          image: "/resource/servicess/ram.png",
        },
        {
          name: "Клавиатура",
          type: "HyperX Alloy Origins Core",
          image: "/resource/servicess/keyboard.png",
        },
        {
          name: "Кресло",
          type: "DXRacer OH/IS11/NR",
          image: "/resource/servicess/chair.png",
        },
      ],
      prices: [
        { time: "08:00-17:00 (час игры)", price: "3 руб" },
        { time: "17:00-22:00 (час игры)", price: "4 руб" },
        { time: "Пакет “Утро” <br>09:00-14:00", price: "14 руб" },
        { time: "Ночной пакет <br>22:00-08:00", price: "20 руб" },
        { time: "Пакет 5 часов <br>в период 08:00-22:00", price: "16 руб" },
        { time: "Пакет “День” <br>08:00-18:00", price: "22 руб" },
      ],
    },
    vipzone: {
      name: "VIP ZONE",
      description: `VIP Zone - модуль с условиями высочайшего уровня. Приветствуем вас в VIP-комнате нашего компьютерного клуба - пространстве, где роскошь и технологии встречаются, а приватность сочетается с высоким уровнем гейминга. Элитное оборудование, комфортные условия и персональное обслуживание - все это вас ждет в нашей VIP-комнате. Получите доступ к эксклюзивным игровым привилегиям и наслаждайтесь миром игр во всей его красе. Присоединяйтесь к нам и почувствуйте разницу.`,
      image: "/resource/servicess/vipzone.jpg",
      tooltip: "VIP ZONE<br>Ах, пахнет крутыми девайсами!",
      devices: [
        {
          name: "Монитор",
          type: "BenQ 24.5 240hz",
          image: "/resource/servicess/monitor.png",
        },
        {
          name: "Видеокарта",
          type: "GeForce RTX 3080Ti",
          image: "/resource/servicess/videocart.png",
        },
        {
          name: "Наушники",
          type: "HyperX Cloud Alpha",
          image: "/resource/servicess/headphones.png",
        },
        {
          name: "Мышь",
          type: "HyperX Pulsefire Surge",
          image: "/resource/servicess/mouse.png",
        },
        {
          name: "Процессор",
          type: "Intel i7-11700K",
          image: "/resource/servicess/cpu.png",
        },
        {
          name: "Оп.память",
          type: "32Gb DDR4",
          image: "/resource/servicess/ram.png",
        },
        {
          name: "Клавиатура",
          type: "HyperX Alloy Origins Core",
          image: "/resource/servicess/keyboard.png",
        },
        {
          name: "Кресло",
          type: "DXRacer OH/IS11/NR",
          image: "/resource/servicess/chair.png",
        },
      ],
      prices: [
        { time: "08:00-17:00 (час игры)", price: "4 руб" },
        { time: "17:00-22:00 (час игры)", price: "5 руб" },
        { time: "Пакет “Утро” <br>09:00-14:00", price: "17 руб" },
        { time: "Ночной пакет <br>22:00-08:00", price: "25 руб" },
        { time: "Пакет 5 часов <br>в период 08:00-22:00", price: "18 руб" },
        { time: "Пакет “День” <br>08:00-18:00", price: "27 руб" },
      ],
    },
    pszone: {
      name: "PS5 Zone",
      description: `PS5 модуль — это мощное и многофункциональное игровое решение, предоставляющее пользователям доступ к широкому спектру игр, развлечений и эксклюзивных функций. Этот модуль не только обеспечивает высококачественную графику и плавный игровой процесс, но и предлагает уникальные возможности для социального взаимодействия и совместной игры.`,
      image: "/resource/servicess/pszone.jpg",
      tooltip: "PS5 Zone<br>Время для FС25?",
      prices: [
        { time: "08:00-17:00 (час игры)", price: "8 руб" },
        { time: "17:00-22:00 (час игры)", price: "10 руб" },
        { time: "Пакет “Утро” <br>09:00-14:00", price: "25 руб" },
        { time: "Ночной пакет <br>22:00-08:00", price: "50 руб" },
        { time: "Пакет 5 часов <br>в период 08:00-22:00", price: "30 руб" },
        { time: "Пакет “День” <br>08:00-18:00", price: "60 руб" },
      ],
    },
  };

  // Функция для обновления данных на основе выбранной зоны
  function updateZoneContent(selectedValue) {
    const zone = zonesData[selectedValue];

    if (!zone) return;

    // Обновляем имя зоны
    contentContainer.querySelector(".zone-name").innerText = zone.name;

    // Обновляем описание
    contentContainer.querySelector("#text-info").innerText = zone.description;

    // Обновляем изображение и тултип
    const tooltip = contentContainer.querySelector(".tooltip img");
    tooltip.src = zone.image;
    contentContainer.querySelector(".tooltiptext").innerHTML = zone.tooltip;

    const devices = document.getElementById("zone-devices");

    if (selectedValue !== "pszone") {
      // Обновляем оборудование
      const devicesContainer = contentContainer.querySelector(".devices");
      devicesContainer.innerHTML = zone.devices
        .map(
          (device) => `
            <div class="device">
                <div class="image-block">
                    <img src="${device.image}" alt="${device.name}">
                </div>
                <div class="device-text">
                    <p class="device-name">${device.name}</p>
                    <p class="device-type">${device.type}</p>
                </div>
            </div>
        `
        )
        .join("");
    } else {
      devices.style.display = "none";
    }

    // Обновляем цены
    const priceBoxesContainer = contentContainer.querySelector(".price-boxes");
    priceBoxesContainer.innerHTML = zone.prices
      .map(
        (price) => `
            <div class="box">
                <div class="box1">
                    <p class="time">${price.time}</p>
                </div>
                 <div class="box2">
                    <p class="price">${price.price}</p>
                </div>
            </div>
        `
      )
      .join("");
    sortTypeSelect.value = "default";
  }

  // Обработчик события изменения выбора
  choice.addEventListener("change", function () {
    const selectedValue = choice.value;
    updateZoneContent(selectedValue);
  });

  // Загрузим данные по умолчанию
  updateZoneContent(choice.value);
});
