let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

let scrollTimeout;
const OFFSET_PX = 120; 

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

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

// Scroll animation and sticky header
window.onscroll = () => {
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveLink, 100); 

    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
};

// Handle navigation link clicks
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Close the mobile menu
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');

        navLinks.forEach(navLink => navLink.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

updateActiveLink();
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your messages =w= but unfortunately this feature is not fully develop. Stay tuned:D');
    this.reset();

});
