const form = document.getElementById("form");
// const message = document.getElementById("message");




form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
  let account_number = form.account_number.value;
  let amount = form.amount.value;
  let pin = form.pin.value;

  // =================== Regex definition ======================
  const pinRegex = /^[0-9]+$/;

  let x = '1121b';
  let y = x.slice(0, 3);
// console.log(y); // Output: "112"

// throw Error();

 if (account_number.length < 10) {
    message.hidden = false;
    message.innerHTML = "invalid account number";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("invalid account number");
  }

  if (!amount) {
    message.hidden = false;
    message.innerHTML = "enter amount";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter amount");
  }

  if (!pin) {
    message.hidden = false;
    message.innerHTML = "enter your transaction PIN";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("enter your transaction PIN");
  }

  if (pin.length != 4) {
    message.hidden = false;
    message.innerHTML = "invalid transaction PIN";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("invalid transaction PIN");
  }
 

 
  






  
  
  // const formData = new FormData(form)
  const formData = {
      account_number,
      amount,
      pin,
  };

  console.log(formData);
  fetch("/account/transfer", {
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

        if (data.success) {

            if (data.transaction) {
                  
                  setTimeout(() => {
                    window.location.href = `/account/transaction/${data.transaction._id}`;
                  }, 3000);
            }
          
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
