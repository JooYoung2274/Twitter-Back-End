const express = require("express");
const router = require("./router/index.js");
const mysql = require("mysql");
const cors = require("cors");
const port = 3000;
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // 빈칸으로 두면 모든 요청 허용
const { sequelize } = require("./models");

app.use(express.json());
app.use("/api", router);
app.use(express.static("uploads"));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`
    🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧
    🚧🚧 DB연결 성공! 이게되네🚧🚧
    🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧
    `);
  })
  .catch((error) => {
    console.error(`
    🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓
    🪓🪓 DB연결 실패! ... 🪓🪓
    🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓🪓
    `);
  });

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
