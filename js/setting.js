import toast from "./toastify";
import axios from "./axios";
import configs from "../configs";
const { DEFAULT_IMG } = configs;

export async function getSettingData() {
  try {
    const res = await axios("/users");
    return res?.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export function updateProfile(data) {
  return axios.patch("/users", data);
}

export function displaySettingData(data) {
  let { user } = data;
  let { firstName, lastName, phone, image, email } = user;
  const imgUrl = image?.url ? image.url : DEFAULT_IMG;
  const formChangeData = document.querySelector(".form-change-data");
  let html2 = "";
  html2 += `
    <div class="col-md-4">
    <img
    class="profile-setting-img"
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

export function fileUpload(file) {
    return axios.post(`/files`, file, {
      headers: file.headers,
    });
  }