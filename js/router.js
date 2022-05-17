import { getBooks, displayBooks } from "./books";
import { getBookById,displayBookById,displayBookCard,addFavourite,addFavouriteHandler, addComment } from "./book";
import{getSettingData, updateProfile,displaySettingData,updateProfileHandler} from "./setting";
import { displayAuthorBook, getAuthor, displayAboutAuthor, displayAuthorName} from "./author";
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
} from "./profile";
import {countries} from "country-list-json";

document.addEventListener("DOMContentLoaded", () => {
  checkUser(localStorage);
  if (location.pathname === "/auth.html") {
    signUpHandler();
    signInHandler();
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    getAccaountData().then((data) => {    
     getAvatar(data);
    });
    getBooks().then((data) => {
      displayBooks(data);
    });
  }
  if (location.pathname === "/book.html" || location.pathname === "book") {
    getAccaountData().then((data) => {    
      getAvatar(data);
     });
    getBookById().then((data) => {
      displayBookById(data);
    });
    getBooks().then((data) => {
      displayBookCard(data);
      addFavouriteHandler();
      addComment();
    });
  } 

  if (location.pathname === "/author.html" || location.pathname === "author") {
    getAccaountData().then((data) => {    
      getAvatar(data);
     });
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
        getAvatar(data[0]);
        displayShelfBooks(data[1]);
        displayMyBooks(data[2]);
        displayCountries();
        checkRole(localStorage);
        updateBookHandler();
        deleteBookFromShelfHandler();
        deleteBookHandler();
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
