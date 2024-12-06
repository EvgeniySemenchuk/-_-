const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Используем CORS и body-parser для работы с POST-запросами
app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Создаем таблицу пользователей, если её нет
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`,
  (err) => {
    if (err) {
      console.error("Ошибка при создании таблицы:", err.message);
    } else {
      console.log("Таблица 'users' успешно создана или уже существует.");

      // Автоматически добавляем нескольких пользователей, если таблица пуста
      db.get(`SELECT COUNT(*) AS count FROM users`, (err, row) => {
        if (err) {
          console.error(
            "Ошибка при проверке количества пользователей:",
            err.message
          );
        } else if (row.count === 0) {
          const users = [
            {
              id: 1,
              phone: "+375333733703",
              password: "password1",
              name: "Евгений",
              email: "evg@example.com",
            },
            {
              id: 2,
              phone: "+375336711670",
              password: "password2",
              name: "Николай",
              email: "nikolay@example.com",
            },
            {
              id: 3,
              phone: "+375298816701",
              password: "password3",
              name: "Василий",
              email: "vasiliy@example.com",
            },
            {
              id: 4,
              phone: "+375298883701",
              password: "password4",
              name: "Юлия",
              email: "yulia@example.com",
            },
            {
              id: 5,
              phone: "+375292116331",
              password: "password5",
              name: "Никита",
              email: "nikitos@example.com",
            },
            {

              id: 6,
              phone: "+375292456331",
              password: "password6",
              name: "Василиса",
              email: "vasya@example.com",
            },
          ];

          const insertQuery = `INSERT INTO users (phone, password, name, email) VALUES (?, ?, ?, ?)`;
          users.forEach((user) => {
            db.run(
              insertQuery,
              [user.phone, user.password, user.name, user.email],
              function (err) {
                if (err) {
                  console.error(err.message);
                } else {
                  console.log(`Пользователь добавлен: ${user.phone}`);
                }
              }
            );
          });
        }
      });
    }
  }
);

// function updateUserName(userId, newName) {
//   const updateQuery = `UPDATE users SET name = ? WHERE id = ?`;

//   db.run(updateQuery, [newName, userId], function (err) {
//     if (err) {
//       console.error("Ошибка при обновлении имени пользователя:", err.message);
//     } else {
//       console.log(`Имя пользователя с ID ${userId} успешно обновлено на ${newName}`);
//     }
//   });
// }

// // Пример вызова функции
// updateUserName(5, "Николай"); // Заменит имя пользователя с ID 2 на "Алексей"

db.run(
  `CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    module TEXT NOT NULL,
    date TEXT NOT NULL,
    start TEXT NOT NULL,
    end TEXT NOT NULL,
    amount INTEGER NOT NULL,
    wait TEXT NOT NULL,
    accept TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`,
  (err) => {
    if (err) {
      console.error("Ошибка при создании таблицы заявок:", err.message);
    } else {
      console.log("Таблица 'bookings' успешно создана или уже существует.");
    }
  }
);

// db.run(`DELETE FROM bookings WHERE id = ?`, [bookingIdToDelete], (err) => {
//   if (err) {
//     console.error("Ошибка при удалении записи из таблицы bookings:", err.message);
//   } else {
//     console.log(`Запись с id = ${bookingIdToDelete} успешно удалена из таблицы 'bookings'.`);
//   }
// });

// db.run(`DELETE FROM bookings`, (err) => {
//   if (err) {
//     console.error("Ошибка при очистке таблицы bookings:", err.message);
//   } else {
//     console.log("Таблица 'bookings' успешно очищена.");
//     // После удаления всех строк можно сделать VACUUM для освобождения места и сброса автоинкремента
//     db.run(`VACUUM`, (vacuumErr) => {
//       if (vacuumErr) {
//         console.error("Ошибка при выполнении VACUUM:", vacuumErr.message);
//       } else {
//         console.log("VACUUM выполнен, место освобождено.");
//       }
//     });
//   }
// });

app.post("/bookings", (req, res) => {
  const { user_id, name, phone, module, date, start, end, amount, wait, accept } = req.body;

  // Проверка, что все необходимые поля заполнены
  if (!user_id || !name || !phone || !module || !date || !start || !end || !amount || !wait || !accept) {
    return res.status(400).json({ error: "Все поля обязательны для заполнения" });
  }

  // Проверка количества активных заявок у пользователя
  const activeBookingsQuery = `SELECT COUNT(*) AS activeCount FROM bookings WHERE user_id = ?`;

  db.get(activeBookingsQuery, [user_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка сервера при проверке активных заявок" });
    }
    
    if (row.activeCount >= 2) {
      return res.status(400).json({ error: "Вы не можете иметь более двух активных заявок" });
    }

    // Если заявок меньше двух, добавляем новую
    const insertQuery = `INSERT INTO bookings (user_id, name, phone, module, date, start, end, amount, wait, accept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(insertQuery, [user_id, name, phone, module, date, start, end, amount, wait, accept], function (err) {
      if (err) {
        return res.status(500).json({ error: "Ошибка сервера при создании заявки" });
      } else {
        res.status(201).json({ message: "Заявка успешно создана", bookingId: this.lastID });
      }
    });
  });
});

app.get("/bookings/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `SELECT * FROM bookings WHERE user_id = ?`;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка сервера при получении заявок" });
    }
    res.json(rows);
  });
});

// Маршрут для логина
app.post("/login", (req, res) => {
  const { phone, password } = req.body;
  // Проверка, что phone и password не пустые
  if (!phone || !password) {
    return res
      .status(400)
      .json({ error: "Необходимо ввести телефон и пароль" });
  }

  const query = `SELECT * FROM users WHERE phone = ? AND password = ?`;

  db.get(query, [phone, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка сервера" });
    } else if (row) {
      res.status(200).json({ message: "Успешный вход", user: row });
    } else {
      res.status(401).json({ error: "Неверный логин или пароль" });
    }
  });
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
