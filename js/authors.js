import axios from "./axios";
import moment from "moment";
import configs from "../configs";
const { DEFAULT_IMG } = configs;


export async function getAuthors() {
  try {
    const response = await axios("/authors");
    return response.data.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayAuthors(data) {
  const homeBooksDom = document.querySelector(".authors-wrapper");
  let contentDom = "";
  data.forEach((author) => {
    const { firstName, lastName, _id , date_of_birth} = author;
    contentDom += `
    <div class="card" data-id=${_id}>
    <a href="author.html">
       <img src="${DEFAULT_IMG}" alt="Avatar" /> 
    </a>
    <div class="card-body pt-2">
      <a href="author.html" class="card-title">${firstName} ${lastName}</a>
      <div class="card-text pt-1">${moment(date_of_birth).format('LL')}</div>
    </div>
    <div class="card-footer pt-1">
      <i class="fa-solid fa-headphones"></i>
      41
    </div>
  </div>
      `;
  });
  homeBooksDom.innerHTML = contentDom;
}

export function authorEvent() {
  const authorList = document.querySelectorAll(".card");
  authorList.forEach((author) => {
    author.addEventListener("click", (e) => {
      e.preventDefault();
      const authorid = e.target.closest("[data-id]").dataset.id;
      history.pushState({ authorid }, null, `/author.html`);
      location.reload();
    });
  });
}