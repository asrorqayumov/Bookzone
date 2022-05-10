import { createBook } from "./books";
import toast from "./toastify";
// export class ProfileUI2 extends ProfileUI {
//   showProfile() {
//     console.log("showProfile");
//   }
// }
export class ProfileUI {
  //   constructor(toast) {
  //     //   super(a, b);
  //     this.toast = toast;
  //   }
  profileEvents() {
    const addBookForm = document.querySelector(".form-addbook");
    addBookForm.addEventListener("submit", this.addBook);
  }

  addBook(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
      title: form.title.value,
      description: form.description.value,
    };
    console.log(data, "data");
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
          console.log(err, "err");
        toast({
          title: "Error",
          text: err.response.data.error,
          type: "error",
          icon: "error",
        });
      });
  }
}

// export function profileEvent() {
//   const addBookForm = document.getElementById(".form-addbook");
//   addBookForm.addEventListener("submit", addBook);
// }

// export function addBook(e) {
//   e.preventDefault();
//   const form = e.target;
//   const data = {
//     title: form.title.value,
//     description: form.description.value,
//   };
//   console.log(data, "data");
//   createBook(data)
//     .then((response) => {
//       toast({
//         title: "Success",
//         text: "Book added successfully",
//         type: "success",
//         icon: "success",
//       });
//     })
//     .catch((err) => {
//       toast({
//         title: "Error",
//         text: err.response.data.msg,
//         type: "error",
//         icon: "error",
//       });
//     });
// }

function previewFileUploadImg() {
  let preview = document.querySelector(".profile-img");
  let file = document.querySelector("#upload-profile-photo").files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}
