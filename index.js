const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send('SERVER ON');
})

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST"); // Sửa đổi ở đây
  next();
});


const ccxt = require("ccxt");
const bybit = new ccxt.bybit({
  apiKey: "pTbfndzhhSLUSmsoM1",
  secret: "ua459YvilMmBNPW4ZqZWypwJtnYUZtoHtVV1",
});
bybit.set_sandbox_mode(true);

app.post("/balance", function (req, res) {
  bybit
    .createOrder("BTCUSDT", "market", "Buy", 1)
    .then((data) => {
      console.log(data);
      res.json(data); // Trả về dữ liệu cho client
    })
    .catch(() => {
      res.status(500).json({ result: false }); // Trả về mã lỗi 500 nếu có lỗi
    });

});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
