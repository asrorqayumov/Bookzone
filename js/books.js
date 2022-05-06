// import axios from "../node_modules/axios/dist/axios.js";
// get axios js as default from node_modules folder;

import configs from "../configs.js";
const { DEFAULT_IMG, BASE_URL } = configs;
export async function getBooks() {
  console.log("salom");
  try {
    const url = `${BASE_URL}books`;
    console.log(url);
    // const data = await axios(url);
    const response = await fetch(url);
    const data = await response.json();
    return data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}
export function displayBooks(data) {
  const homeBooksDom = document.querySelector(".home__books");
  let contentDom = "";
  data?.docs.forEach((book) => {
    const { title, author, comments, image, rate } = book;
    const { firstName, lastName } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    contentDom += `
        <div class="card">
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
