import configs from "../configs.js";
import * as books from "./books.js";
const { BASE_URL } = configs;

document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname === "/index.html" || location.pathname === "/") {
    books.getBooks().then((data) => {
      books.displayBooks(data);
    });
  }
});
