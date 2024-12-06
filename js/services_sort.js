const pricesContainer = document.getElementById("prices-container");
const sortTypeSelect = document.getElementById("sort-type");
const choiceSelect = document.getElementById("choice");
const showPcZoneCheckbox = document.getElementById("show-pc-zone");

// Создаем элемент опции для PS5 Zone
const psZoneOption = document.createElement("option");
psZoneOption.value = "pszone";
psZoneOption.textContent = "PS5 Zone";

// Цены для разных модулей с длительностью
const gameZonePrices = [
  { time: "08:00-17:00 (час игры)", price: 3, duration: 1 },
  { time: "17:00-22:00 (час игры)", price: 4, duration: 1 },
  { time: "09:00-14:00", price: 14, package: "Пакет “Утро”", duration: 5 },
  { time: "22:00-08:00", price: 20, package: "Ночной пакет", duration: 10 },
  {
    time: "в период 08:00-22:00",
    price: 16,
    package: "Пакет 5 часов",
    duration: 5,
  },
  { time: "08:00-18:00", price: 22, package: "Пакет “День”", duration: 10 },
];

const vipZonePrices = [
  { time: "08:00-17:00 (час игры)", price: 4, duration: 1 },
  { time: "17:00-22:00 (час игры)", price: 5, duration: 1 },
  { time: "09:00-14:00", price: 17, package: "Пакет “Утро”", duration: 5 },
  { time: "22:00-08:00", price: 25, package: "Ночной пакет", duration: 10 },
  {
    time: "в период 08:00-22:00",
    price: 18,
    package: "Пакет 5 часов",
    duration: 5,
  },
  { time: "08:00-18:00", price: 27, package: "Пакет “День”", duration: 10 },
];

const psZonePrices = [
  { time: "08:00-17:00 (час игры)", price: 8, duration: 1 },
  { time: "17:00-22:00 (час игры)", price: 10, duration: 1 },
  { time: "09:00-14:00", price: 25, package: "Пакет “Утро”", duration: 5 },
  { time: "22:00-08:00", price: 50, package: "Ночной пакет", duration: 10 },
  {
    time: "в период 08:00-22:00",
    price: 30,
    package: "Пакет 5 часов",
    duration: 5,
  },
  { time: "08:00-18:00", price: 60, package: "Пакет “День”", duration: 10 },
];

// Функция для отображения цен
function renderPrices(prices) {
  pricesContainer.innerHTML = "";
  prices.forEach((price) => {
    const box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `
            <div class="box1">
                <p class="time">${price.package ? price.package + "<br>" : ""}${
      price.time
    }</p>
            </div>
            <div class="box2">
                <p class="price">${price.price} руб</p>
            </div>
        `;
    pricesContainer.appendChild(box);
  });
}

// Функция для сортировки цен
function sortPrices(prices) {
  const sortType = sortTypeSelect.value;
  let sortedPrices;

  switch (sortType) {
    case "priceAsc":
      sortedPrices = [...prices].sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      sortedPrices = [...prices].sort((a, b) => b.price - a.price);
      break;
    case "timeAsc":
      sortedPrices = [...prices].sort((a, b) => a.duration - b.duration);
      break;
    case "timeDesc":
      sortedPrices = [...prices].sort((a, b) => b.duration - a.duration);
      break;
    default:
      sortedPrices = prices; // обычное расположение
  }

  renderPrices(sortedPrices);
}

// Обновление цен в зависимости от выбранного модуля
function updatePrices() {
  const selectedModule = choiceSelect.value;
  let prices;

  // Обработка выбранного модуля для получения соответствующих цен
  switch (selectedModule) {
    case "gamezone":
      prices = gameZonePrices;
      break;
    case "vipzone":
      prices = vipZonePrices;
      break;
    case "pszone":
      prices = psZonePrices;
      break;
    default:
      prices = [];
  }

  renderPrices(prices);
  sortPrices(prices); // Сортируем после рендеринга
}

// Обработчики событий
sortTypeSelect.addEventListener("change", () => {
  const selectedModule = choiceSelect.value;
  let prices;

  // Определение цен в зависимости от выбранного модуля
  switch (selectedModule) {
    case "gamezone":
      prices = gameZonePrices;
      break;
    case "vipzone":
      prices = vipZonePrices;
      break;
    case "pszone":
      prices = psZonePrices;
      break;
    default:
      prices = [];
  }

  sortPrices(prices);
});

choiceSelect.addEventListener("change", updatePrices);

// Первоначальный рендер
updatePrices();

//CHECKBOX HANDLE

function handlePcZoneCheckboxChange() {
  if (showPcZoneCheckbox.checked) {
    // Если чекбокс включен, убираем PS5 Zone из выпадающего списка
    const psOption = Array.from(choiceSelect.options).find(
      (option) => option.value === "pszone"
    );
    if (psOption) {
      choiceSelect.removeChild(psOption);
    }

    // Если был выбран PS5 Zone, переключаем на Game Zone
    if (choiceSelect.value === "pszone") {
      choiceSelect.value = "gamezone";
      updatePrices();
    }
  } else {
    // Если чекбокс выключен и PS5 Zone еще не добавлена, добавляем обратно
    const psOptionExists = Array.from(choiceSelect.options).some(
      (option) => option.value === "pszone"
    );
    if (!psOptionExists) {
      choiceSelect.appendChild(psZoneOption);
    }
  }
}

showPcZoneCheckbox.addEventListener("change", handlePcZoneCheckboxChange);
