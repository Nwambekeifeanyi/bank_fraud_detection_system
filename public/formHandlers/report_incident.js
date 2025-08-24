const form = document.getElementById("form");
// const message = document.getElementById("message");



form.addEventListener("submit", (e) => {
  e.preventDefault();
  message.hidden = true;

  // ===============form fields ======================
      let type = form.type.value
      let image = form.image.value
      let video = form.video.value
      let description = form.description.value



  
  if (!type) {
    message.hidden = false;
    message.innerHTML = "select the report type";
    message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
    throw Error("select the report type");
  }



  
if (!description) {
      message.hidden = false;
      message.innerHTML = "enter the incident description";
      message.classList.add("error-message");
  
      setTimeout(() => {
        message.classList.remove("error-message");
        message.hidden = true;
      }, 3000);
      throw Error("enter the incident description");
    }
  
  
  
  const formData = new FormData(form);
  fetch("/account/report_incident", {
      method: "POST",
  
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");

       
        setTimeout(() => {
          window.location.href = "incidents";
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
