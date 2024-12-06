// Вставьте этот код в ваш обработчик события отправки формы логина
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное действие формы

  const phone = document.getElementById("phone1").value;
  const password = document.getElementById("password").value;

  // Создаем объект с данными для отправки на сервер
  const loginData = {
    phone: phone,
    password: password,
  };

  // Отправляем данные на сервер через fetch
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Сохраняем только необходимые данные пользователя в localStorage (без пароля)
        const { id, name, phone, email } = data.user; // Деструктуризация для извлечения нужных данных

        // Сохраняем данные пользователя без пароля
        localStorage.setItem(
          "user",
          JSON.stringify({
            id,    // Добавлено id пользователя
            name,
            phone,
            email,
          })
        );

        updateUIAfterLogin({ id, name, phone, email }); // Обновляем UI с id

        // Успешный вход: скрываем модал и показываем сообщение
        document.querySelector(".modal").style.display = "none";
        document.getElementById("success-message").style.display = "block";

        setTimeout(() => {
          document.getElementById("success-message").style.display = "none";
        }, 500);
      } else if (data.error) {
        // Ошибка логина
        alert(data.error);
      }
    })
    .catch((error) => console.error("Ошибка:", error));
});

// Функция для обновления UI после авторизации
function updateUIAfterLogin(user) {
  document.getElementById("signIn").style.display = "none"; // Скрываем кнопку "Войти"
  document.getElementById("accountButton").style.display = "block"; // Показываем кнопку "Личный кабинет"

  // Сохраняем данные пользователя для дальнейшего использования
  document.getElementById("user-info").innerHTML = `
    <div class="user-card">
      <h3 class="user-name">${user.name}</h3>
      <p class="user-detail"><strong>Телефон:</strong> ${user.phone}</p>
      <p class="user-detail"><strong>Email:</strong> ${user.email}</p>
    </div>
  `;
}

// Проверяем наличие данных в localStorage при загрузке страницы
window.addEventListener("load", function () {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    updateUIAfterLogin(user);
  }
});

/* Модальное окно входа */
const signInButton = document.getElementById("signIn");
const modal = document.getElementById("modal");
const closeModalButton = document.querySelector(".modal .close");
const loginForm = document.getElementById("login-form");
const successMessage = document.getElementById("success-message");
const accountButton = document.getElementById("accountButton");
const headerTime = document.querySelector(".header-time");

signInButton.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModalButton.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Обработка кнопки "Личный кабинет"
document.getElementById("accountButton").addEventListener("click", function () {
  document.getElementById("profile-modal").style.display = "block"; // Открываем модал для личного кабинета
});

// Закрытие модала для личного кабинета
document.querySelector(".profile-close").addEventListener("click", function () {
  document.getElementById("profile-modal").style.display = "none"; // Закрываем модал
});

// Закрытие модала при клике вне его
window.addEventListener("click", function (event) {
  const modal = document.getElementById("profile-modal");
  if (event.target === modal) {
    modal.style.display = "none"; // Закрываем модал
  }
});

document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("user");

  document.getElementById("accountButton").style.display = "none";

  document.getElementById("signIn").style.display = "block";

  document.getElementById("profile-modal").style.display = "none";

  document.getElementById("user-info").innerText = "";
});

// Обработка кнопки "Личный кабинет"
document.getElementById("accountButton").addEventListener("click", function () {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    fetchBookings(user.id); // Запрашиваем заявки пользователя
  }
  document.getElementById("profile-modal").style.display = "block"; // Открываем модал для личного кабинета
});

// Функция для получения заявок пользователя
function fetchBookings(userId) {
  fetch(`http://localhost:3000/bookings/${userId}`)
    .then((response) => response.json())
    .then((bookings) => {
      displayBookings(bookings); // Отображаем заявки
    })
    .catch((error) => console.error("Ошибка при получении заявок:", error));
}

// Функция для отображения заявок пользователя в личном кабинете
function displayBookings(bookings) {
  const userBookingsContainer = document.getElementById("user-bookings");
  const logoutBtn = document.getElementById("logoutButton");
  userBookingsContainer.innerHTML = ""; // Очищаем контейнер перед добавлением

  if (bookings.length === 0) {
    userBookingsContainer.innerHTML = '<p style="color: white; margin:0">У вас нет заявок.</p>'; // Сообщение, если нет заявок
    logoutBtn.style.marginTop = '350px';
    return;
  }

  if (bookings.length === 2) {
    logoutBtn.style.marginTop = '30px';
  }

  bookings.forEach((booking) => {
    const bookingElement = document.createElement("div");
    bookingElement.className = "booking-card";
    
    let [year, month, day] = booking.date.split("-");
    let newDateStr = `${day}.${month}.${year}`;

    let zoneNameToDisplay;
    switch (booking.module) {
       case 'gamezone': {
        zoneNameToDisplay = 'Game Zone'
        break
       }
       case 'vipzone': {
        zoneNameToDisplay = 'Vip Zone'
        break
       }
       case 'pszone': {
        zoneNameToDisplay = 'PS5 Zone'
        break
       }
    }

    bookingElement.innerHTML = `
      <p><strong>Модуль:</strong> ${zoneNameToDisplay}</p>
      <p><strong>Дата:</strong> ${newDateStr}</p>
      <p><strong>Время:</strong> с ${booking.start} до ${booking.end}</p>
      <p><strong>Мест для бронирования:</strong> ${booking.amount}</p>
    `;
    userBookingsContainer.appendChild(bookingElement);
  });
}



