'use strict';

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);


const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}


// for Email users send
(function(){
    emailjs.init("kbvhfzKBrzaar5NsR"); // Your Public Key
})();

// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    let contactForm = document.getElementById("contactForm");
    let buttonSend = document.getElementById('btnSend'); // Get the send button

    if (!contactForm) {
        console.error("Error: #contactForm not found in the DOM.");
        return;
    }

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let Username = document.getElementById('name');
        let Useremail = document.getElementById('email');
        let UserMessage = document.getElementById('message');

        if (!Username || !Useremail || !UserMessage || !buttonSend) {
            console.error("Error: One or more elements are missing.");
            return;
        }

        // Hide the send button immediately when clicked
        buttonSend.style.display = "none";

        let serviceID = "service_6bamp6j";  // Your Service ID
        let templateID = "template_xwlo02t"; // Your Template ID

        let templateParams = {
            from_name: Username.value,
            from_email: Useremail.value,
            message: UserMessage.value
        };

        emailjs.send(serviceID, templateID, templateParams)
            .then(function(response) {
                Swal.fire({
                    title: "Success!",
                    width: "200px",
                    text: "Message sent successfully!",
                    icon: "success",
                    confirmButtonText: "OK"
                });

                // Clear input fields after successful submission
                Username.value = "";
                Useremail.value = "";
                UserMessage.value = "";

                console.log("Success:", response);
            })
            .catch(function(error) {
                Swal.fire({
                    icon: "error",
                    width: "200px",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });

                console.error("Error:", error);
            });
    });
});

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);