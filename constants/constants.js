const http2 = require("node:http2");

const {
  HTTP_STATUS_OK, //200
  HTTP_STATUS_CREATED, //201
  HTTP_STATUS_BAD_REQUEST, //400
  HTTP_STATUS_NOT_FOUND, //404
  HTTP_STATUS_INTERNAL_SERVER_ERROR, //500
} = http2.constants;

console.log(http2.constants); // Все статусы

const handleError = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(HTTP_STATUS_BAD_REQUEST)
      .send({ message: "Переданы некорректные данные" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(HTTP_STATUS_NOT_FOUND)
      .send({ message: "Пользователь с данным id не был найден" });
  }
  return res
    .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: "Ошибка сервера" });
};

module.exports = {
  handleError,
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
};
