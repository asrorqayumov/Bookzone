import axios from "./axios";

import configs from "../configs";
const { DEFAULT_IMG } = configs;


export async function getBookById(_id) {
  try {
    const response = await axios(`/books`);
    return response?.data.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayBookById(data) {
  const homeBooksDom = document.querySelector(".books-about");
  let contentDom = "";
  data?.docs.forEach((book) => {
    const { title,description, author, comments, image, rate, price, year, pages, _id, category } = book;
    const { firstName, lastName } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    contentDom = `
    <div data-id="${_id}" >
    <div class="row book__main" >

    <div class="col-md-4 col-xl-6 aside">
    
      <div class="row book__img-wrapper book-img">
        <div class="book__img ">
          <img src="${imgUrl}" alt="">
        </div>
      </div>
    
    </div>
    
    <div class="col-md-8 col-xl-6 about-book">
    
      <div class="about__book">
        <div class="row">
          <h1 class="about__book-title">${title}</h1>
        </div>
    
        <div class="row about__author-wrapper">
          <p class="about__book-text">${firstName} ${lastName}</p>
          <i class="fa-solid fa-star about__book-icon">${rate}</i>
        </div>
        <div class="about__texts-wrapper">
    
          <div class="row">
            <p>Sahifalar soni:</p>
            <span>${pages}</span>
          </div>
    
          <div class="row">
            <p>Chop etilgan:</p>
            <span>${year}</span>
          </div>
    
          <div class="row">
            <p>Janri:</p>
            <span>${category}</span>
          </div>
    
          <div class="row">
            <p>Nashriyot</p>
            <span>Nihol nashr</span>
          </div>
    
          <div class="row alone__text">
            <p>To'liq ma'lumot</p>
            <i class="fa-solid fa-arrow-down"></i>
          </div>
        </div>
        <div class="row book__description-wrapper">
          <p>${description}
          </p>
        </div>
    
        <div class="row about__format-text">
          <h3>Mavjud formatlar</h3>
        </div>
    
        <div class="row about__format-wrapper">
    
          <div class="col-2 format__icon-wrapper">
            <i class="fa-regular fa-bookmark"></i>
            <span>Qog'oz kitob</span>
            <p>${price} so'm</p>
          </div>
          <div class="col-2 format__icon-wrapper">
            <i class="fa-solid fa-headphones-simple"></i>
            <span>Audiokitob</span>
            <p>6:23 soat</p>
          </div>
    
          <div class="col-2 format__icon-wrapper">
            <i class="fa-solid fa-star"></i>
            <span>Elektron</span>
            <p>pdf, epub</p>
    
          </div>
    
          <div class="col-5 format__btn-wrapper">
            <button>Javonga qo'shish </button>
          </div>
        </div>
    
    
      </div>
    
    </div>
    
    </div>

    <div class="tab__wrapper ">

        <ul class="tab__menu book__comment-wrapper">
          <li data-target="#bir">Muallif haqida</li>
          <li class="active" data-target="#ikki">Kitobdan iqtiboslar</li>
          <li data-target="#uch">Kitobxonlar taqrizi</li>
        </ul>

        <div class="tab__content">

          <div data-content id="bir">

          </div>

          <div data-content id="ikki" class="active">
            <div class="row">

              <div class="col-5 comment__card-wrapperfirst">
                <p class="comment__text">${comments}</p>
              </div>
              <div class="col-5 comment__card-wrappersecond">
                <p class="comment__text">${comments}</p>
              </div>


            </div>

          </div>

          <div data-content id="uch">

          </div>

        </div>
      </div>

      <div class="row comment__about-wrapper">
        <div class="col-8">
          <h1 class="comment__suggest">Sizga yoqishi mumkin</h1>
        </div>

        <div class="col-4">
          <p class="comment__link">
            Barchasini ko'rish
          </p>
        </div>
      </div>
      </div>


    `;
  });
  homeBooksDom.innerHTML = contentDom;
}

export function displayBookCard(data) {
  const homeBooksDom = document.querySelector(".book-card-detail");
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
