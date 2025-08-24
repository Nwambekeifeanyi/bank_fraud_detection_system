const form = document.getElementById("form");
// const message = document.getElementById("message");




form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let full_name = form.full_name.value;
  let email = form.email.value.toLowerCase();
  let contact = form.contact.value;
  let gender = form.gender.value;
  // let contact = form.contact.value;
//   let password = form.password.value;



  // =================== Regex definition ======================
  const nameRegex = /^[a-zA-Z0-9]+(?:[-_'(),\s][a-zA-Z0-9]+)*$/;
  const usernameRegex = /^[a-zA-Z0-9'-]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;
 
  let contactRegex = /^(070|080|081|090|091)\d{8}$/;

  let x = '1121b';
  let y = x.slice(0, 3);
// console.log(y); // Output: "112"

// throw Error();

  if (!nameRegex.test(full_name)) {
    message.hidden = false;
    message.innerHTML = "enter the user's fullname";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter the user's fullname");
  }

 
  
  if (!emailRegex.test(email)) {
    message.hidden = false
    message.innerHTML = "enter a valid email address";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid email address");
  }


  if (!contactRegex.test(contact)) {
    message.hidden = false
    message.innerHTML = "enter a valid contact";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid contact");
  }
  if (!contactRegex.test(contact)) {
    message.hidden = false
    message.innerHTML = "select the gender";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("select the gender");
  }



  if (!gender) {
   message.hidden = false
    message.innerHTML = "select the gender";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("select the gender");
  }
  
  
  // const formData = new FormData(form)
  const formData = {
      full_name,
  email,
  contact,
  gender,
  };
  console.log(formData);
  fetch("/admin/add_account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");

       


console.log(data);

        if (data.user) {
          setTimeout(() => {
            window.location.href = `/admin/account/${data.user._id}`;
          }, 3000);
          
        }
      }
    
      if (data.error) {
        message.hidden = false
        message.innerHTML = data.error;
       

        message.classList.add("error-message");

        setTimeout(() => {
          message.classList.remove("error-message");
          message.hidden = true;
        }, 3000);

      }



      setTimeout(() => {
        message.hidden = true;
        message.innerHTML = "";
        // message.style.backgroundColor ='white'
      }, 3000);
    });
});
