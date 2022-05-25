import axios from "./axios";
import moment from "moment";
import configs from "../configs";
const { DEFAULT_IMG } = configs;

export async function getAuthorByid(id) {
  try {
    const response = await axios(`/authors/${id}`);
    return response?.data.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayAuthor(data) {
  const homeBooksDom = document.querySelector(".author-wrapper");
  let contentDom = "";
    const { firstName, lastName, _id, date_of_birth, date_of_death } = data;
    contentDom += `
    <div class="row author__body " data-id=${_id} style="border-top: 1px solid #8f8d8d;">

    <div class="col col-md-4 col-xl-6 aside about-author">

      <div class="row author__img-wrapper col col-md-6 col-lg-4">
        <div class="author__img ">
          <img src="${DEFAULT_IMG}" alt="">
        </div>
      </div>

      <div class="row about__author">
        <div class="col author__birth-wrapper">

          <p class="birth__title">Tavallud sanasi</p>
          <h1 class="birth__date">${moment(date_of_birth).format("LL")}</h1>
          <p class="birth__location">Toshkent, Uzbekistan</p>

        </div>

        <div class="col arrow__wrapper" style="align-items: center; display: flex; align-content: center;">
          <span class="arrow__minus">-</span>
        </div>

        <div class="col author__death-wrapper">

          <p class="death__title">O'lgan sanasi</p>
          <h1 class="death__date">${date_of_death?date_of_death:''}</h1>
          <p class="death__location">Toshkent, Uzbekistan</p>

        </div>
      </div>

    </div>

    <div class="col col-md-8 col-xl-6">
      <div class="row author__title-wrapper author-name">
        <div>
          <h1 class="author__title">${firstName} ${lastName}</h1>
          <p class="author__text">O'tkir Hoshimov 1941 yil Toshkent viloyatining Zangiota (hozirgi Chilonzor) tumanidagi
            Do'mbiravot mavzeida tug'ildi. O'. Hoshimov mehnat faoliyatini erta boshladi. Toshkent Davlat universiteti
            (hozirgi O'zbekiston Milliy universiteti)ning jurnalistika kulliyotida o'qish bilan baravar gazeta
            tahriryatida ishladi. 1959 yildan 1963 yilgacha “Temiryo'lchi”, “Qizil O'zbekiston”, “Transportniy rabochiy”
            gazetalarida xat tashuvchi, mussaxhih, tarjimon bo'lib ishladi. So'ng “Toshkent haqiqati” gazetasida adabiy
            xodim (1963-1966), “Toshkent oqshomi” gazetasida bo'lim mudiri (1966-1982), G'. G'ulom nomidagi Adabiyot va
            san'at nashriyotida bosh muharrir o'rinbosari (1982-1985) bo'ldi. 1985-1995 yillarda “Sharq yulduzi” jurnaliga
            bosh muharrirlik qildi. 1995 yildan 2005 yilgacha O'zbekiston Respublikasi Oliy Majlisining Matbuot va axborot
            qo'mitasi raisi lavozimida ishladi. 2005 yildan “Teatr“ jurnalida bosh muharrir bo'lib ishladi.</p>
        </div>
      </div>
      
      <div class="row author__works-wrapper">
        <i class="fa-solid fa-bookmark row"> IJODI</i>
        <p class="works__text row">Yozuvchining ilk asari 1962-yilda „Po'lat chavandoz“ nomida ocherklar to'plami
          tarzida nashrdan chiqdi. Ammo yozuvchiga muvaffaqiyat keltirgan asar 1970-yilda nashr qilingan „Bahor
          qaytmaydi“ qissasi bo'ldi.</p>
      </div>

      <div class="row author__books-title">

        <h1 class="books__title">Asarlari</h1>
        <p class="books__text">Barchasini ko'rish</p>
      </div>
      <div class="row author__books-wrapper author-card">
      </div>
    </div>

  </div>
    

      `;
  homeBooksDom.innerHTML = contentDom;
}

export async function getBooksFromAuthors(id) {
  try {
    const response = await axios(`/books/author/${id}`);
    return response?.data?.payload?.docs;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function displayBooksFromAuthor(data) {
  const homeBooksDom = document.querySelector(".author__books-wrapper");
  let contentDom = "";
  data?.forEach((book = {}) => {
    const { title, author, comments, _id, imageLink, rate } = book;
    const { firstName, lastName } = author;
    const imgUrl = imageLink?.url ? imageLink.url : DEFAULT_IMG;
    contentDom += `
    <div class="card" data-id= ${_id}>
    <a href="book.html">
      <img src="${imgUrl}" alt="${title}" />
    </a>
    <div class="card-body pt-2">
      <a href="books.html" class="card-title">${title}</a>
      <div class="card-text pt-1">${firstName} ${lastName}</div>
    </div>
    <div class="card-footer pt-1">
      <i class="fa-solid fa-star"></i>
      ${rate} - ${comments?.length ? comments.length : "0"} ta fikrlar
    </div>
  </div>`;
  });
  homeBooksDom.innerHTML = contentDom;
}


// author__books-wrapper
