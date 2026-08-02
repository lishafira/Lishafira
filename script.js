let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

let scrollTimeout;
const OFFSET_PX = 120; 

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}
function updateActiveLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + OFFSET_PX; 

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
            currentSectionId = section.getAttribute('id');
            break; 
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add('active');
        }
    });
}

window.onscroll = () => {
    let header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveLink, 100); 

    if (navbar && menuIcon) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (navbar && menuIcon) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }

        navLinks.forEach(navLink => navLink.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

updateActiveLink();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Sending...',
            text: 'Please wait a moment',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for your message! I will get back to you soon :D',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: '#38bdf8'
                });
                contactForm.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.message || 'Something went wrong!',
                    background: '#0f172a',
                    color: '#fff',
                    confirmButtonColor: 'rgb(119, 172, 195)'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
                background: '#0f172a',
                color: '#fff',
                confirmButtonColor: '#96cee7'
            });
        }
    });
}