import { getBooks, displayBooks, bookEvent } from "./books";
import {
  getBookById,
  displayBookById,
  displayBookCard,
  addFavourite,
  addFavouriteHandler,
  bookId,
  addComment,
  getOwnBook,
} from "./book";
import {
  getSettingData,
  updateProfile,
  displaySettingData,
  updateProfileHandler,
} from "./setting";
import { getAuthors, displayAuthors, authorEvent } from "./authors";
import {
  getAuthorByid,
  displayAuthor,
  getBooksFromAuthors,
  displayBooksFromAuthor,
} from "./author";
import { signInHandler, signUpHandler } from "./auth";
import {
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
  getAvatar,
  deleteBookHandler,
  deleteBookFromShelfHandler,
  modal,
} from "./profile";

window.addEventListener("popstate", (e) => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  checkUser(localStorage);
  getAccaountData().then((data) => {
    getAvatar(data);
  });
  if (location.pathname === "/auth.html") {
    signUpHandler();
    signInHandler();
  }
  if (location.pathname === "/authors.html") {
    getAuthors().then((data) => {
      displayAuthors(data);
      authorEvent();
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
    });
  }
  if (
    location.pathname === "/index.html" ||
    location.pathname === "/" ||
    location.pathname === "/books.html"
  ) {
    getBooks().then((data) => {
      displayBooks(data);
      bookEvent();
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
    });
  }
  if (location.pathname === "/book.html" || location.pathname === "book") {
    getBookById(history.state.id).then((data) => {
      displayBookById(data);
    });
    // bookId().then((data)=>{
    getOwnBook();
    // })
    getBooks().then((data) => {
      displayBookCard(data);
      addFavouriteHandler();
      addComment();
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
    });
  }

  if (location.pathname === "/author.html" || location.pathname === "author") {
    getAuthorByid(history.state.authorid).then((data) => {
      displayAuthor(data);
    });
    getBooksFromAuthors(history.state.authorid).then((data) => {
      displayBooksFromAuthor(data);
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
        deleteBookFromShelfHandler();
        deleteBookHandler();
        const loading = document.querySelector(".loader-container");
        document.body.removeChild(loading);

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
  }

  if (location.pathname === "/setting.html") {
    getSettingData().then((data) => {
      displaySettingData(data);
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
      updateProfileHandler();
    });
  }
});
