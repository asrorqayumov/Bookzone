import { getBooks, displayBooks } from "./books";
import { getBookById,displayBookById,displayBookCard } from "./book";
import { displayAuthorBook, getAuthor, displayAboutAuthor, displayAuthorName} from "./author";
import { signInHandler, signUpHandler } from "./auth";
import { previewFileAddBook, profileEvent, ProfileUI } from "./profile";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
  }
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
    getAuthor().then((data)=>{
      displayAboutAuthor(data);
      displayAuthorName(data);
    })
  }

  if (location.pathname === "/profile.html") {
    const profileUI = new ProfileUI();
    profileUI.profileEvents()
    // profileEvent();
    // previewFileAddBook();
  }
});
