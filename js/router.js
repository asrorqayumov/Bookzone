import { getBooks, displayBooks } from "./books";
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
  if (location.pathname === "/profile.html") {
    const profileUI = new ProfileUI();
    profileUI.profileEvents()
    // profileEvent();
    // previewFileAddBook();
  }
});
