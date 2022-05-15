import { getBooks, displayBooks } from "./books";
import { getBookById, displayBookById, displayBookCard } from "./book";
import {
  displayAuthorBook,
  getAuthor,
  displayAboutAuthor,
  displayAuthorName,
} from "./author";
import { signInHandler, signUpHandler } from "./auth";
import {
  updateProfileHandler,
  ProfileUI,
  getAccaountData,
  displayAccaountData,
  getShelfBooks,
  displayShelfBooks,
  checkRole,
  checkUser,
  getMyBooks,
  displayMyBooks,
  displayCountries,
  updateBookHandler,
} from "./profile";
import {countries} from "country-list-json";

document.addEventListener("DOMContentLoaded", () => {
  checkUser(localStorage);
  if (location.pathname === "/auth.html") {
    signUpHandler();
    signInHandler();
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    getBooks().then((data) => {
      displayBooks(data);
    });
  }
  if (location.pathname === "/book.html" || location.pathname === "book") {
    getBookById().then((data) => {
      displayBookById(data);
    });
    getBooks().then((data) => {
      displayBookCard(data);
    });
  }

  if (location.pathname === "/author.html" || location.pathname === "author") {
    getBooks().then((data) => {
      displayAuthorBook(data);
    });
    getAuthor().then((data) => {
      displayAboutAuthor(data);
      displayAuthorName(data);
    });
  }

  if (location.pathname === "/profile.html") {
    Promise.all([getAccaountData(), getShelfBooks(), getMyBooks()]).then(
      (data) => {
        displayAccaountData(data[0]);
        displayShelfBooks(data[1]);
        displayMyBooks(data[2]);
        displayCountries();
        checkRole(localStorage);
        updateBookHandler();
        const loading = document.querySelector(".loader-container");
        document.body.removeChild(loading);

        // Modal
        let modal = document.getElementById("myModal");
        let btn = document.querySelectorAll(".update-btn");
        let span = document.getElementsByClassName("close")[0];
        btn.forEach((btn) => {
          btn.onclick = () => {
            modal.style.display = "flex";
          };
        });
        span.onclick = function () {
          modal.style.display = "none";
        };
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
      }
    );
    const profileUI = new ProfileUI();
    profileUI.profileEvents();
    updateProfileHandler();
  }
});
