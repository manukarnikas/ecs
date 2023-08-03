require("dotenv").config();

module.exports = {
    DB: "canvas_db",
    PORT: 27017,
    HOST: process.env.DB_HOST || "localhost"
}