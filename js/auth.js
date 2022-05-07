import axios from "./axios";
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
      role: form.role.value,
      firstName: form.firstname.value,
      lastName: form.lastname.value,
    };
    // const formData = new FormData(form);
    // console.log(Array.from(formData), "formData");
    signUp(data).then((response) => {
      if (response.data.success) {
        message.success("Kayıt başarılı");
        form.reset();
      } else {
        message.error(response.data.message);
      }
    });
  });
}
export function signOut() {}
