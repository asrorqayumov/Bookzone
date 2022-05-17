import axios from "./axios";
import moment from "moment";

// export function signUp(data) {
//   return axios.post("/api/books", booksRoutes);
// }

import configs from "../configs";
const { DEFAULT_IMG } = configs;


export async function getAuthor() {
  try {
    const response = await axios("/authors");
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayAboutAuthor(data) {
  const aboutAuthor = document.querySelector(".about-author");
  let contentAuthor = "";
  data?.payload.forEach((author) => {
    const { firstName, lastName, date_of_birth, date_of_death,image, _id } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    const checkDeath = date_of_death ? date_of_death : "living"

    contentAuthor = `
    
    <div class="row author__img-wrapper col col-md-6 col-lg-4">
    <div class="author__img ">
      <img src="${imgUrl}" alt="">
    </div>
    </div>

    <div class="row about__author" data-id=${_id}>
      <div class="col author__birth-wrapper">

        <p class="birth__title">Tavallud sanasi</p>
        <h1 class="birth__date"> ${moment(date_of_birth).format("L") } </h1>
        <p class="birth__location">Toshkent, Uzbekistan</p>

      </div>

      <div class="col arrow__wrapper" style="align-items: center; display: flex; align-content: center;">
        <span class="arrow__minus">-</span>
      </div>

      <div class="col author__death-wrapper">

        <p class="death__title">O'lgan sanasi</p>
        <h1 class="death__date">${checkDeath }</h1>
        <p class="death__location">Toshkent, Uzbekistan</p>

      </div>
    </div>
    `
  })
  
  aboutAuthor.innerHTML = contentAuthor;
}

export function displayAuthorName(data) {
  const aboutAuthor = document.querySelector(".author-name");
  let contentAuthor = "";
  data?.payload.forEach((author) => {
    const { firstName, lastName, __v,  description, date_of_birth, date_of_death,image, _id } = author;
    contentAuthor =`
    <div>
      <h1 class="author__title">${firstName}  ${lastName}</h1>
      <p class="author__text"></p>
    </div>
  
    `
  })

  aboutAuthor.innerHTML = contentAuthor;
}


export function displayAuthorBook(data) {
  const homeBooksDom = document.querySelector(".author-card");
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
