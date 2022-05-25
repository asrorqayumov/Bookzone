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
  modalToggler,
} from "./profile";

window.addEventListener("popstate", (e) => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  checkUser(localStorage);
  if (location.pathname === "/auth.html") {
    signUpHandler();
    signInHandler();
  }
  if (location.pathname === "/authors.html") {
    getAccaountData().then((data) => {
      getAvatar(data);
    });
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
    getAccaountData().then((data) => {
      getAvatar(data);
    });
    getBooks().then((data) => {
      displayBooks(data);
      bookEvent();
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
    });
  }
  if (location.pathname === "/book.html" || location.pathname === "book") {
    getAccaountData().then((data) => {
      getAvatar(data);
    });
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
    getAccaountData().then((data) => {
      getAvatar(data);
    });
    getAuthorByid(history.state.authorid).then((data) => {
      displayAuthor(data);
    });
    getBooksFromAuthors(history.state.authorid).then((data) => {
      displayBooksFromAuthor(data);
    });
  }

  if (location.pathname === "/profile.html") {
    getAccaountData().then((data) => {
      getAvatar(data);
    });
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
        modalToggler()
      }
    );
    const profileUI = new ProfileUI();
    profileUI.profileEvents();
  }

  if (location.pathname === "/setting.html") {
    getAccaountData().then((data) => {
      getAvatar(data);
    });
    getSettingData().then((data) => {
      displaySettingData(data);
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
      updateProfileHandler();
    });
  }
});
