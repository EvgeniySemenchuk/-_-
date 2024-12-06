// Counter

document.getElementById("minus-amount").addEventListener("click", function () {
    var amountInput = document.getElementById("amount");
    var currentValue = parseInt(amountInput.value);
    var minValue = parseInt(amountInput.min);
    if (!isNaN(currentValue) && (isNaN(minValue) || currentValue > minValue)) {
      amountInput.value = currentValue - 1;
    }
  });
  
  document.getElementById("plus-amount").addEventListener("click", function () {
    var amountInput = document.getElementById("amount");
    var currentValue = parseInt(amountInput.value);
    var maxValue = parseInt(amountInput.max);
    if (!isNaN(currentValue) && (isNaN(maxValue) || currentValue < maxValue)) {
      amountInput.value = currentValue + 1;
    }
  });

  window.addEventListener("load", function () {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      // Заполняем поля формы именем и номером телефона
      document.getElementById("name").value = user.name; // Имя пользователя
      
      const phone = user.phone;
      document.getElementById("phone").value = phone.replace(/^\+/, ''); // Номер телефона
    }
  });

// Функция для отображения модального окна
function showModal(type, message) {
  // Создаем контейнер модалки
  const modal = document.createElement("div");
  modal.className = "modal-booking";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  // Выбираем стиль и сообщение в зависимости от типа (успех или ошибка)
  const modalContentStyle = `
    background-color: ${type === "success" ? "white" : "pink"};
    padding: 20px;
    border-radius: 8px;
    position: relative;
  `;

  modal.innerHTML = `
      <div class="modal-content-booking" style="${modalContentStyle}">
          <span class="close-booking" style="position: absolute; top: 10px; right: 10px; cursor: pointer;">&times;</span>
          <p>${message}</p>
      </div>
  `;

  document.body.appendChild(modal);

  // Флаги для отслеживания состояния модалки
  let modalIsOpen = true;

  // Закрытие модального окна при нажатии на "X"
  modal.querySelector(".close-booking").addEventListener("click", function () {
    if (modalIsOpen) {
      modal.remove();
      modalIsOpen = false; // Устанавливаем флаг, чтобы предотвратить повторное закрытие
    }
  });

  // Закрытие модального окна при клике вне его области
  const closeOnClickOutside = (event) => {
    if (event.target === modal && modalIsOpen) {
      modal.remove();
      modalIsOpen = false; // Устанавливаем флаг, чтобы предотвратить повторное закрытие
      window.removeEventListener("click", closeOnClickOutside);
    }
  };
  
  window.addEventListener("click", closeOnClickOutside);

  // Закрытие модального окна при нажатии на "Esc"
  const closeOnEscape = (event) => {
    if (event.key === "Escape" && modalIsOpen) {
      modal.remove();
      modalIsOpen = false; // Устанавливаем флаг, чтобы предотвратить повторное закрытие
      document.removeEventListener("keydown", closeOnEscape);
    }
  };
  
  document.addEventListener("keydown", closeOnEscape);

  // Удерживаем модальное окно на экране на 2 секунды, после чего удаляем его
  setTimeout(() => {
    if (modalIsOpen) {
      modal.remove();
      modalIsOpen = false; // Устанавливаем флаг, чтобы предотвратить повторное закрытие
      window.removeEventListener("click", closeOnClickOutside);
      document.removeEventListener("keydown", closeOnEscape);
    }
  }, 5000); // Задержка в 2 секунды (2000 миллисекунд)
}

// Обработка формы
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Останавливаем стандартное поведение отправки формы

  // Проверяем валидность формы
  if (!this.checkValidity()) {
    this.reportValidity(); // Показываем сообщение об ошибке, если что-то не так
    return;
  }

  const user = JSON.parse(localStorage.getItem("user")); // Получаем данные пользователя из localStorage
  const formData = {
    user_id: user ? user.id : null, // Записываем id пользователя
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    module: document.getElementById("module").value,
    date: document.getElementById("date").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
    amount: document.getElementById("amount").value,
    wait: document.getElementById("wait").checked ? "Да" : "Нет",
    accept: document.getElementById("accept").checked ? "Да" : "Нет",
  };

  // Отправка данных на сервер для создания заявки
  fetch("http://localhost:3000/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        // Показать модальное окно успеха
        showModal("success", "Ваша заявка успешно отправлена! Мы свяжемся с вами для подтверждения бронирования.");
        clearForm();
      } else if (data.error) {
        // Показать модальное окно ошибки
        showModal("error", `Ошибка при отправке заявки: <br> ${data.error}`);
      }
    })
    .catch((error) => {
      // Показать модальное окно ошибки
      showModal("error", `Ошибка при отправке заявки: ${error}`);
    });
});

// Функция для очистки формы
function clearForm() {
  document.getElementById("form").reset();
}
  
  // Функция для очистки всех полей формы
  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("module").value = "";
    document.getElementById("date").value = "";
    document.getElementById("start").value = "";
    document.getElementById("end").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("wait").checked = false;
    document.getElementById("accept").checked = false;
  }
