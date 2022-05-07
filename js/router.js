import configs from "../configs";
import { getBooks, displayBooks } from "./books";
import { signIn, signUp, signUpHandler } from "./auth";
const { BASE_URL } = configs;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
  }
  if (location.pathname === "/auth.html") {
    signUpHandler();
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    getBooks().then((data) => {
      displayBooks(data);
    });
  }
});
