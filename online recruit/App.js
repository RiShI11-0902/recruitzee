// let change = document.querySelectorAll(".login");

function show() {
  document.getElementById("loginpage").classList.toggle("inactive");
}

let mob_close = document.getElementById("mob-close");
mob_close.addEventListener("click", () => {
  document.getElementById("loginpage").classList.toggle("inactive");
});

let ham = document.getElementById("ham");
ham.addEventListener("click", () => {
  document.getElementById("close").classList.toggle("inactive");
  document.getElementById("ham").classList.toggle("inactive");
  document.getElementById("mobile-nav").classList.remove("inactive");
  console.log("hammm");
});
let close = document.getElementById("close");
close.addEventListener("click", () => {
  document.getElementById("close").classList.toggle("inactive");
  document.getElementById("ham").classList.toggle("inactive");
  document.getElementById("mobile-nav").classList.add("inactive");
});

if (document.getElementById("ham").classList.contains("inactive")) {
  document.getElementById("mobile-nav").classList.add("active");
}

let form = document.getElementById("myForm");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

function register() {
  let input_user = document.getElementById("inUser").value;
  let input_pass = document.getElementById("inPass").value;

  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  let exists = formData.length &&
    JSON.parse(localStorage.getItem("formData")).some((i) => {
   return i.input_user.toLowerCase() === input_user.toLowerCase() 
    });

    // i.input_user.toLowerCase() == input_user.toLowerCase() &&  i.input_pass.toLowerCase() == input_pass.toLowerCase();

    console.log(exists);

  if (!exists) {
    formData.push({ input_user, input_pass });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.querySelector("form").reset();
  } else {
    alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
  }
}

function login() {
  let input_user = document.getElementById("inUser").value;
  let input_pass = document.getElementById("inPass").value;
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  let exists =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).map((i) => {
      i.input_user.toLowerCase() !== input_user.toLowerCase() &&
        i.input_pass.toLowerCase() !== input_pass.toLowerCase();
    });

  if (!exists) {
    alert("Register first");
  } else {
    window.location.href = "http://127.0.0.1:5500/searchCandidate.html";
  }
}

function logout() {
  window.location.href = "http://127.0.0.1:5500/index.html";
}


const URL = "candidateData.json";

document.getElementById("search").addEventListener("input",()=>{
    displayUser()
})

function displayUser() {
    fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
  let flitered =  data.people
      .filter((i) => {
        let search = document.getElementById("search").value;
        // let filtered = ;
        //    console.log(filtered);
        // console.log(i);
        if (search == " ") {
          return data.peoplep;
        } else if (i.job_role.toLowerCase().includes(search.toLowerCase()) || i.location.toLowerCase().includes(search.toLowerCase()) ) {
          return data.people;
        }
      })
      .map((i, index) => {
        const {name, location, job_role} = i
        return ` <div class="item">
                    <p>${index + 1}</p>
                    <p>${name}</p>
                    <p>${location}</p>
                    <p>${job_role}</p>
                </div>`
      }).join("")
      document.getElementById("list").innerHTML = flitered
  });
}


