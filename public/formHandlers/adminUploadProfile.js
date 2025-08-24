const form = document.getElementById("form");
const message = document.getElementById("message");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.innerHTML = "";

  // ===============form fields ======================
  // let user_id = form.user_id.value;
  let image = form.image;

  message.hidden = true;

  // if (!user_id) {
  //   message.hidden = false;
  //   message.innerHTML = "user not found";
  //   setTimeout(() => {
  //     message.hidden = true;
  //   }, 3000);
  //   throw Error("choose an image");
  // }

  if (!image) {
    message.hidden = false;
    message.innerHTML = "choose an image";
    setTimeout(() => {
      message.hidden = true;
    }, 3000);
    throw Error("choose an image");
  }

  // const img = image.files[0]
  const formData = new FormData(form);
  console.log(formData);
  fetch("/admin/change-profile-image", {
    method: "POST",

    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false;

        message.innerHTML = data.success;
        message.style.backgroundColor = "white";
        message.style.color = "green";
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 3000);
      }
      if (data.alreadyExists) {
        message.hidden = false;

        message.innerHTML = data.alreadyExists;
        message.style.backgroundColor = "red";
        message.style.color = "white";
      }
      if (data.error) {
        message.hidden = false;

        message.innerHTML = data.error;
        message.style.color = "red";
      }
      setTimeout(() => {
        message.hidden = false;

        message.innerHTML = "";
        message.style.backgroundColor = "white";
      }, 3000);
    });
});
