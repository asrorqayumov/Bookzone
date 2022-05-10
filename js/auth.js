import axios from "./axios";
import toast from "./toastify";
export function signUp(data) {
  return axios.post("/sign-up", data);
}
export function signIn(data) {
  return axios.post("/login", data);
}
export function signUpHandler() {
  document.forms[1].addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      role: form.role.value,
      firstName: form.firstname.value,
      lastName: form.lastname.value,
      date_of_birth: new Date(),
    };
    // const formData = new FormData(form);
    // console.log(Array.from(formData), "formData");
    signUp(data)
      .then((response) => {
        if (response.data.success) {
          form.reset();
          localStorage.token = response.data.token;
          localStorage.user = JSON.stringify(response.data.user);
          location.assign("/index.html");
        } else {
          message.error(response.data.message);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.msg?.includes("E11000")) {
          let option = {
            title: "Error",
            text: "Email already exists",
            type: "error",
            icon: "error",
          };
          if (err?.response?.data?.msg?.includes("phone")) {
            option.text = "Phone number already exists";
          }
          toast(option).then(() => {
            document.getElementById("flip-card").classList.toggle("do-flip");
          });
        }
      });
  });
}
export function signInHandler() {
  document.forms[0].addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };
    console.log(data, "data");
    // const formData = new FormData(form);
    // console.log(Array.from(formData), "formData");
    signIn(data)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          localStorage.token = data.token;
          localStorage.user = JSON.stringify(data.user);
          location.assign("/index.html");
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          text: err.response.data.msg,
          type: "error",
          icon: "error",
        });
      });
  });
}
export function signOut() {}
