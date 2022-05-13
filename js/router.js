import { getBooks, displayBooks } from "./books";
import { getBookById,displayBookById,displayBookCard } from "./book";
import { displayAuthorBook, getAuthor, displayAboutAuthor, displayAuthorName} from "./author";
import { signInHandler, signUpHandler } from "./auth";
import { updateProfileHandler, ProfileUI,getAccaountData,displayAccaountData, getShelfBooks,displayShelfBooks, checkRole, checkUser} from "./profile";

document.addEventListener("DOMContentLoaded", () => {
    checkUser(localStorage);
  if (location.pathname === "/auth.html") {
    signUpHandler();
    signInHandler();
  }
  if (location.pathname === "/index.html" || location.pathname === "/") {
    getBooks().then((data) => {
      displayBooks(data);
      const loading = document.querySelector(".loader-container");
        document.body.removeChild(loading);
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
    getAuthor().then((data)=>{
      displayAboutAuthor(data);
      displayAuthorName(data);
    })
  }

  if (location.pathname === "/profile.html") {
    getAccaountData().then((data) => {
      displayAccaountData(data);
      const loading = document.querySelector(".loader-container");
      document.body.removeChild(loading);
    })
    getShelfBooks().then((data) => {
      displayShelfBooks(data);
    })
    const profileUI = new ProfileUI();
    profileUI.profileEvents()
    updateProfileHandler()
    checkRole(localStorage)
  }
});
