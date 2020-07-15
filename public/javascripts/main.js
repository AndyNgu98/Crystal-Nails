
// const base = {
//     name: document.querySelector('#name-field'),
//     phone: document.querySelector('#phone-field'),
//     email: document.querySelector('#email-field'),
//     message: document.querySelector('#message-field'),
//     button: document.querySelector('#submit-button'),
//     succes: document.querySelector('#success-message')


// }

//MainNav change colour after scrolling
$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
          $('#mainNav').css("background" , "black");
        }
  
        else{
            $('#mainNav').css("background" , "transparent");  	
        }
    })
  })

// base.button.addEventListener('click', () => { //ON SUBMIT DATA WILL BE TURNED INTO THIS
//     const data = {
//         name: base.name.value,
//         phone: base.phone.value,
//         email: base.email.value,
//         message: base.message.value
//     }

//     const values = Object.values(data)
//     const correct = values.every(notEmpty) //TURN OBJECT OF DATA INTO A LIST OF DATA

//     function notEmpty(field){
//         return field.length > 0
//     }

//     if (correct){ //CHECK IF EACH BOX IS FILLED IN 
//         axios.post('/contact', {data})
//             .then( response => {
//                 if (response.status = 200) {
//                     const values = Object.values(base)
//                     values.forEach(input => input.value = "" )
//                     document.querySelector('#success-message').innerHTML = 'Thank you we have recieved your booking with Crystal Nails please give up to 12hrs for confirmation.';
//                 } else {
//                     console.log("error")
//                 }
//             })
//             .catch( err => console.log(err))
            
//     } else {
//         alert("please esnure all the required field are filled in");
//     }    

// });



