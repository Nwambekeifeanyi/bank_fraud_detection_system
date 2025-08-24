const form = document.getElementById("form");
// const message = document.getElementById("message");




form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let old_pin = form.old_pin.value;
  let new_pin = form.new_pin.value;
  let comfirm_pin = form.comfirm_pin.value;



  // =================== Regex definition ======================
  const pinRegex = /^[0-9]+$/;

  let x = '1121b';
  let y = x.slice(0, 3);
// console.log(y); // Output: "112"

// throw Error();

 if (!pinRegex.test(new_pin)) {
    message.hidden = false;
    message.innerHTML = "enter a valid new PIN";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid new PIN");
  }

  if (!pinRegex.test(comfirm_pin)) {
    message.hidden = false;
    message.innerHTML = "enter a valid comfirm PIN";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter a valid comfirm PIN");
  }

  if (new_pin !== comfirm_pin) {
    message.hidden = false;
    message.innerHTML = "PINS do not match";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("PINs do not match");
  }
 

 
  






  
  
  // const formData = new FormData(form)
  const formData = {
      old_pin,
      new_pin,
      comfirm_pin,
  };
  console.log(formData);
  fetch("/account/set_pin", {
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
            window.location.href = `/account/profile`;
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
