import axios from "./axios";
import moment from "moment";
import toast from "./toastify";
import configs from "../configs";
const { DEFAULT_IMG } = configs;


export function bookId(id) {
  return axios(`/books/${id}`);
}

export function getComment(data) {
  return axios.post("/books/comment", data);
}

// get book by id

export function getOwnBook() {
  bookId().then((data) => {
    displayBookById(data);
    const card = document.querySelector(".card");
    console.log(data, "databuuu");
    card.forEach((card) => {
      card.addEventListener("click", (e) => {
        const cardDoc = e.target
        let bookId = cardDoc.dataset.id;
        history.pushState({ bookId }, null, `/book.html`);
        location.reload();
      });
    });
  })
    .catch((err) => {
      console.log(err);
    });

}



export function addComment() {
  const formComment = document.querySelector(".form-comment");
  formComment.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    let id = form.dataset.id;
    const data = {
      text: form.comment.value,
      book: id
    };

    console.log(data, "data");
    getComment(data)
      .then((response) => {
        toast({
          title: "Success",
          text: "Comment added successfully",
          type: "success",
          icon: "success",
        });
      })

      .catch((err) => {
        console.log(err, "err");
        toast({
          title: "Error",
          text: err?.response.data.error.message,
          type: "error",
          icon: "error",
        });
      });
  });
}

// add book shelf

export async function addFavourite(data) {
  return axios.post("/users/shelf", data);
}

export function addFavouriteHandler() {
  const favBtn = document.querySelector(".favbtn");
  favBtn.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    console.log(id, "id");
    e.preventDefault();
    const data = {
      bookId: id
    }

    addFavourite(data)
      .then((response) => {
        console.log(response, "response");
        const { data } = response;
        const favoriteBtn = e.target.closest(".favbtn").dataset.favlist;
        const favorite = favoriteBtn == "true" ? true : false;
      })
  });
}


export async function getBookById(_id) {
  try {
    const response = await axios(`/books/${_id}`);
    console.log(response);
    return response?.data.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayBookById(data) {
  const homeBooksDom = document.querySelector(".books-about");
  let formWrapper = document.querySelector(".form-comment-wrapper");
  let contentDom = "";
  let formHtml = "";
  console.log(data, "data");
    const { title, description, author, comments, image, rate, price, year, pages, _id, category } = data?.book;
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
          <h1 class="about__book-title">${title} </h1>
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
            <span>${moment(year).format("L")}</span>
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
          <button class="favbtn"  data-id="${_id}" data-favlist="false">Javonga qo'shish </button>
          </div>
        </div>
    
    
      </div>
    
    </div>
    
    </div>
    `;
    formHtml = `
    <form class="row form-comment" data-id="${_id}" action="">
    <div class="container-form-comment col-md-6 ">
      <div>
        <textarea rows="5" cols="50" class="mt-3" name="comment" id="comment" placeholder="Comment"></textarea>
        <button class="ms-5 btn-comment">Create</button>
      </div>
    </div>
  </form>
    `
  homeBooksDom.innerHTML = contentDom;
  formWrapper.innerHTML = formHtml;
}

export function displayBookCard(data) {
  const homeBooksDom = document.querySelector(".book-card-detail");
  let contentDom = "";
  data?.docs.forEach((book) => {
    const { title, author, comments, image, rate, _id ,category} = book;
    const {classic, biography, science} = category;
    const { firstName, lastName } = author;
    const imgUrl = image?.url ? image.url : DEFAULT_IMG;
    for (let i = 0; i < category.length; i++) {
      const check = category[classic] 
      if (check == true) {
        contentDom += `
        <div class="card" data-id="${_id}">
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
    }
    homeBooksDom.innerHTML = contentDom;
  }
  
});
}
