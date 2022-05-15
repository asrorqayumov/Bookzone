import { createBook } from "./books";
import toast from "./toastify";
import axios from "./axios";
import configs from "../configs";
import moment from "moment";
import { countries } from "country-list-json";
const { DEFAULT_IMG } = configs;

export function displayCountries() {
  let countryList = document.querySelectorAll(".countries-list");
  let html = "";
  countries.forEach((country) => {
    html += `<option value="${country.name.toLocaleLowerCase()}">${
      country.name
    }</option>`;
  });
  countryList.forEach((country) => {
    country.innerHTML = html;
  });
}

export function checkRole(localStorage) {
  let user = JSON.parse(localStorage.getItem("user"));
  let role = user.role;
  if (role === "reader") {
    let addbook = document.getElementById("addbook");
    let addbooktab = document.querySelector(".addbooktab");
    let mybook = document.getElementById("mybooks");
    let mybooktab = document.querySelector(".mybookstab");
    addbook.style.display = "none";
    addbooktab.style.display = "none";
    mybook.style.display = "none";
    mybooktab.style.display = "none";
  }
}

export function checkUser(localStorage) {
  let user = JSON.parse(localStorage.getItem("user"));
  let profileLogo = document.querySelector(".nav-auth");
  let linkAuth = document.querySelector(".link-auth");
  if ((user = null)) {
    profileLogo.style.display = "none";
    linkAuth.style.display = "block";
  }
}

export async function getAccaountData() {
  try {
    const res = await axios("/users");
    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getShelfBooks() {
  try {
    const res = await axios("/users/shelf");
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMyBooks() {
  try {
    const res = await axios("/books/my-books");
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBooksById(id) {
  try {
    const res = await axios(`/books/${id}`);
    return res?.data?.payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

export function updateProfile(data) {
  return axios.patch("/users", data);
}

export function updateBook(id, data) {
  return axios.patch(`/books/${id}`, data);
}

export function displayAccaountData(data) {
  let { user } = data;
  let { firstName, lastName, date_of_birth, phone, image, role, email } = user;
  const imgUrl = image?.url ? image.url : DEFAULT_IMG;
  const profilWrapper = document.querySelector(".profile-about-content");
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let html = "";
  html += `
      <div class="profil-info-left pe-3">
                <img
                  src="${imgUrl}"
                  alt=""
                />
                <p class="mt-1">Sizning rolingiz</p>
                <p class="fair-text mt-1">${capitalizeFirstLetter(role)}</p>
              </div>
              <div class="profile-info-right pt-5">
                <h2 class="fair-text">${firstName} ${lastName}</h2>
                <p>Tavallud: <span class="text-muted">${moment(
                  date_of_birth
                ).format("ll")}</span></p>
                <p>Manzili: <span class="text-muted">Uzbekistan</span></p>
                <p>
                  Phone:
                  <span class="text-muted">${phone} </span>
                </p>
              </div> `;

  profilWrapper.innerHTML = html;

  const formChangeData = document.querySelector(".form-change-data");
  let html2 = "";
  html2 += `
  <div class="col-md-4">
  <img
    class="profile-img"
    src="${imgUrl}"
    alt=""
  />
  <label for="upload-profile-photo">
    <i class="fa-solid fa-camera"></i>
  </label>
  <input
    type="file"
    name="photo"
    id="upload-profile-photo"
    onchange="previewFileUploadImg()"
    accept="image/png, image/jpeg, image/jpg"
  />
</div>
<div class="col-md-8 px-3">
  <div class="px-5">
    <h2 class="pb-5">My profile</h2>
    <label for="firstname">First Name</label>
    <br />
    <input
      class="mt-4"
      type="text"
      name="firstname"
      placeholder="${firstName}"
    />
    <br />
    <label class="mt-4" for="lastname">Last Name</label> <br />
    <input
      class="mt-40"
      type="text"
      name="lastname"
      placeholder="${lastName}"
    />
    <br />
    <label class="mt-4" for="password">Password</label> <br />
    <input
      class="mt-40"
      type="password"
      name="password"
      placeholder="password"
    />
    <br />
    <div class="input-group mt-5">
      <div class="w-100">
        <label for="phone">Phone</label> <br />
        <input
          class="mt-4"
          type="number"
          name="phone"
          placeholder="${phone}"
        />
      </div>
      <div class="w-100 ps-3">
        <label for="email">Email</label><br />
        <input
          class="mt-4"
          type="email"
          name="email"
          placeholder="${email}"
        />
        <br />
      </div>
    </div>
    <div class="mt-3 change-data-btn">
      <button class="mt-5 btn-sm">Save Changes</button>
    </div>
  </div>
</div>
  `;
  formChangeData.innerHTML = html2;
}

export function displayShelfBooks(data) {
  const homeBooksDom = document.querySelector(".profile-book-row");
  let contentDom = "";
  data?.shelf?.forEach((book) => {
    const { title, author, comments, imageLink, rate } = book;
    const { firstName, lastName } = author;
    const imgUrl = imageLink?.url ? imageLink.url : DEFAULT_IMG;
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
          ${rate} - ${comments?.length ? comments.length : "0"} ta fikrlar
        </div>
      </div>`;
  });
  homeBooksDom.innerHTML = contentDom;
}

export function displayMyBooks(data) {
  const homeBooksDom = document.querySelector(".profile-mybooks-row");
  let contentDom = "";
  data?.docs?.forEach((book) => {
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
        <button class="update-btn">Update Book</button>
      </div>`;
  });
  let modalContent = `
  <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <form class="form-updatebook row" action="">
      <div class="container-upload-img col-md-6">
        <img class="upload-bookimg" src="" alt="Book's image" />
        <label class="btn-lg" for="up-book-img">Upload cover</label>
        <input
          type="file"
          name="photo"
          id="up-book-img"
          onchange="previewFileUpBook()"
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
      <div class="container-form-updatebook col-md-6">
        <div>
          <h1 class="form-title pb-2">Update book</h1>
          <input
            class="mt-1"
            type="text"
            name="title"
            placeholder="Title"
          />
          <input
            class="mt-3"
            type="number"
            name="pages"
            placeholder="Pages"
          />
          <input
            class="mt-3"
            type="text"
            name="year"
            placeholder="Year"
            onfocus="(this.type='date')"
            onblur="(this.type='text')"
          />
          <input
            class="mt-3"
            type="number"
            name="price"
            placeholder="Price"
          />
          <select class="mt-3" name="category">
            <option class="text-muted category-option" value="">
              Category
            </option>
            <option value="classic ">Classic</option>
            <option value="biography  ">Biography</option>
            <option value="science ">Science</option>
          </select>
          <select class="mt-3 countries-list" name="country">
            <option class="country-item" value="">Country</option>
          </select>
          <input
            class="mt-3"
            type="text"
            name="language"
            placeholder="Language"
          />
          <textarea
            class="mt-3"
            name="description"
            id="description"
            placeholder="Description"
          ></textarea>
          <button class="mt-5 btn-sm updatebook-submit">Submit</button>
        </div>
      </div>
    </form>
  </div>
</div>
  `;
  homeBooksDom.innerHTML = modalContent + contentDom;
}

export function updateProfileHandler() {
  const formUpdateProfile = document.querySelector(".form-change-data");
  formUpdateProfile.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const data = {
        email: form.email.value,
        password: form.password.value,
        firstName: form.firstname.value,
        lastName: form.lastname.value,
        phone: form.phone.value,
      };
      for (const key in data) {
        if (!data[key]) {
          delete data[key];
        }
      }
      const formData = new FormData();
      formData.append(
        "oldImg",
        JSON.parse(localStorage.getItem("user"))?.image?.url
      );
      const updateProfileData = { ...data };
      if (form.photo.files[0]) {
        for (const file of form.photo.files) {
          formData.append("files", file);
        }
        const imageResponse = await fileUpload(formData);
        const { _id: image } = imageResponse?.data.payload[0];
        updateProfileData.image = image;
      }
      const response = await updateProfile(updateProfileData);
      form.reset();
      localStorage.user = JSON.stringify(response.data.payload);
      toast({
        title: "Success",
        text: "Your information has updated successfully",
        type: "success",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      toast({
        title: "Error",
        text: error?.message,
        type: "error",
        icon: "error",
      });
    }
  });
}

export function updateBookHandler() {
  const formUpdateBook = document.querySelector(".form-updatebook");
  let updateBtn = document.querySelectorAll(".update-btn");
  updateBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const bookId = e.target.parentElement.dataset.id;
      getBooksById(bookId).then((book) => { console.log(book)});
      formUpdateBook.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
          const form = e.target;
          const data = {
            title: form.title.value,
            pages: form.pages.value,
            year: form.year.value,
            price: form.price.value,
            category: form.category.value,
            country: form.country.value,
            language: form.language.value,
            description: form.description.value,
          };
          for (const key in data) {
            if (!data[key]) {
              delete data[key];
            }
          }
          const formData = new FormData();
          formData.append(
            "oldImg",
              getBooksById(bookId).then((book) => book.imageLink)
          );
          const updateBookData = { ...data };
          if (form.photo.files[0]) {
            for (const file of form.photo.files) {
              formData.append("files", file);
            }
            const imageResponse = await fileUpload(formData);
            const { _id: image } = imageResponse?.data.payload[0];
            updateBookData.image = image;
          }
          const response = await updateBook(bookId,updateBookData);
          form.reset();
          toast({
            title: "Success",
            text: "Your information has updated successfully",
            type: "success",
            icon: "success",
          });
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            text: error?.response?.data,
            type: "error",
            icon: "error",
          });
        }
      });
    });
  });
}

export function fileUpload(file) {
  return axios.post(`/files`, file, {
    headers: file.headers,
  });
}

export class ProfileUI {
  profileEvents() {
    const addBookForm = document.querySelector(".form-addbook");
    addBookForm.addEventListener("submit", this.addBook);
  }

  addBook(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      title: form?.title?.value,
      description: form?.description?.value,
      country: form?.country?.value,
      language: form?.language?.value,
      link: form?.link?.value,
      pages: form?.pages?.value,
      year: form?.year?.value,
      rate: form?.rate?.value,
      price: form?.price?.value,
      category: form?.category?.value,
      isPublished: form?.isPublished?.value,
      isFeatured: form?.isFeatured?.value,
    };
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }
    for (const key in data) {
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }

    const formData = new FormData();
    if (form.photo.files[0]) {
      for (const file of form.photo.files) {
        console.log(file);
        formData.append("file", file);
      }
    }

    fileUpload(formData).then((response) => {
      const { _id: image } = response?.data.payload[0];
      data.image = image;
    });

    createBook(data)
      .then((response) => {
        toast({
          title: "Success",
          text: "Book added successfully",
          type: "success",
          icon: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          text: err.response.data.error,
          type: "error",
          icon: "error",
        });
      });
  }
}
