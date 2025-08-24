let form = document.getElementById("form");
let message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
//   alert('hello');

  let oldPassword = form.oldPassword.value;
  let newPassword = form.newPassword.value;
  let confirmPassword = form.confirmPassword.value;
  // let admin_id = form.admin_id.value;

  // ======================= regex definition ==========================
  let passwordRegex =  /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/

  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])(?=^\S{6,}$).{6,}$/;

  message.innerHTML = "";
  message.hidden = true


  if (!passwordRegex.test(oldPassword)) {
    message.hidden = false

    message.innerHTML = 'enter a correct old password.';
            setTimeout(() => {
              message.hidden = true
            }, 3000);
            throw Error('Terminated')
  }
  if (!passwordRegex.test(newPassword)) {
    message.hidden = false

    message.innerHTML = 'the password should not contain whitespace and should be more five digits';
            setTimeout(() => {
              message.hidden = true
            }, 3000);
            throw Error('Terminated')
  }
  if (!passwordRegex.test(confirmPassword)) {
    message.hidden = false

    message.innerHTML = 'enter a correct confirm password.';
    setTimeout(() => {
      message.hidden = true
    }, 3000);
    throw Error('Terminated')
  }
  if (newPassword != confirmPassword) {
    message.hidden = false


    message.innerHTML = "password does not match";
            setTimeout(() => {
              message.hidden = true
            }, 3000);
            throw Error('Terminated')

  }
//   Password@2
//   Nwuzor$4699

  const formData = {
        oldPassword,
   newPassword,
   confirmPassword,
  };

  fetch("/admin/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false
            message.innerHTML = data.success
            message.style.backgroundColor="white"
            message.style.color='green'
            setTimeout(() => {
              window.location.reload()
            }, 3000);
      }

      if (data.error) {
        message.hidden = false
            message.innerHTML = data.error
            message.style.backgroundColor="white"
            message.style.color='red'
      }
      setTimeout(() => {
        message.hidden = true
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
    });
});
