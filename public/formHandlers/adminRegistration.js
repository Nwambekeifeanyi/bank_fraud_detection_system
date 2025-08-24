const form = document.getElementById("form");
const message = document.getElementById("message");


//showing and hiding password
// alert('hi')
let open = document.getElementById('open')
let close = document.getElementById('close')
let password = document.getElementById('password')

open.addEventListener('click', ()=>{
  password.type = 'text'
  open.hidden = true
  close.hidden = false
})
close.addEventListener('click', ()=>{
  password.type = 'password'
  close.hidden = true
  open.hidden = false
})

// date
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();





form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let first_name = form.first_name.value;
  let last_name = form.last_name.value;
  let email = form.email.value.toLowerCase();
  let contact = form.contact.value;
  let password = form.password.value;



  // =================== Regex definition ======================
  const nameRegex = /^[a-zA-Z0-9]+(?:[-_'(),\s][a-zA-Z0-9]+)*$/;
  const usernameRegex = /^[a-zA-Z0-9'-]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;
 
  let contactRegex = /^(070|080|081|090|091)\d{8}$/;

  // ================== get reg date ========================
  const regDate = `${day}-${month}-${year}`;
  console.log(regDate);

  
  if (!nameRegex.test(first_name)) {
    message.hidden = false;
    message.innerHTML = "enter a valid firstname";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid firstname");
  }

  if (!nameRegex.test(last_name)) {
    message.hidden = false;
    message.innerHTML = "enter a valid lastname";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid lastname");
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
  // if (!gender) {
  //   message.hidden = false
  //   message.innerHTML = "select your gender";
  //   setTimeout(() => {
  //     // message.hidden = true
  //     message.hidden = true;
  //   }, 3000);
  //   throw Error("select your gender");
  // }
  
  if (!passwordRegex.test(password)) {
    message.hidden = false
    message.innerHTML = "invalid password, it must be greater than 4 digits";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("invalid password, it must be greater than 4 digits");
  }

  
  // const formData = new FormData(form)
  const formData = {
   first_name,
   last_name,
  email,
  contact,
  // gender,
  password,
  };
  console.log(formData);
  fetch("/auth/admin-registration", {
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

       
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 3000);
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
