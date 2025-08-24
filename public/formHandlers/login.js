const form = document.getElementById('form');
const message = document.getElementById('message');
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


form.addEventListener('submit', (e)=>{
      e.preventDefault();
      
      const email = form.email.value;
      const password = form.password.value;

      // const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let passwordRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,}$/;




      if(!emailRegex.test(email)){
        message.hidden = false
           message.innerHTML= 'enter a correct username.';
           message.classList.add("error-message");

           setTimeout(() => {
             message.classList.remove("error-message");
             message.hidden = true;
           }, 3000);
           throw Error('Terminated')
      }

      if(!passwordRegex.test(password)){
        message.hidden = false
            message.innerHTML = 'enter a correct password.';
            message.classList.add("error-message");

    setTimeout(() => {
      message.classList.remove("error-message");
      message.hidden = true;
    }, 3000);
            throw Error('Terminated')

      }


      
        // alert(nu)

        // throw Error()
      // const formData = new FormData(form)
      const formData = {email, password};
      console.log(formData);
      fetch('/auth/user-login',{
            method: 'POST',
            headers:{
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          
          if (data.success) {
            message.hidden = false
            message.innerHTML = data.success;
            message.classList.add("success-message");
            setInterval(() => {
              window.location.href = '/account/dashboard'
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
        })
        .catch((err) => {
        });
    });



    


