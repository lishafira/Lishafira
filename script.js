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
    contactForm.addEventListener('submit', function() {
        alert('Thank you for your message! I will check it ASAP :D');
    });
}