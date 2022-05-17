import axios from "./axios";

import configs from "../configs";
const { DEFAULT_IMG } = configs;
export async function getBooks() {
  try {
    const response = await axios("/books");
    return response?.data.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}
export function displayBooks(data) {
  const homeBooksDom = document.querySelector(".home__books");
  let contentDom = "";
  data?.docs.forEach((book) => {
    const { title, author, comments, image, rate, _id } = book;
    const { firstName, lastName } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    contentDom += `
        <div class="card" data-id=${_id}>
        <a href="book.html">
          <img src="${imgUrl}" alt="${title}" />
        </a>
        <div class="card-body pt-2">
          <a href="books.html" class="card-title">${title}</a>
          <div class="card-text pt-1">${firstName} ${lastName}</div>
        </div>
        <div class="card-footer pt-1">
          <i class="fa-solid fa-star"></i>
          ${rate} - ${comments.length} ta fikrlar
        </div>
      </div>`;
  });
  homeBooksDom.innerHTML = contentDom;
}

export function bookEvent() {
  const bookNodeList = document.querySelectorAll(".home__books .card");
  bookNodeList.forEach((bookDom) => {
    bookDom.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.closest("[data-id]").dataset.id;
      console.log(bookNodeList, id);
      history.pushState({ id }, null, `/book.html`);
      location.reload();
    });
  });
}

export function createBook(data) {
  return axios.post("/books", data);
}
