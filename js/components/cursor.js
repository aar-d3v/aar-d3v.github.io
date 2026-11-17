// js/components/cursor.js
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Physics loop for the trailing effect
function animateCursor() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;
    
    cursorX = cursorX + (distX * 0.2);
    cursorY = cursorY + (distY * 0.2);
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand on hoverable elements
const links = document.querySelectorAll('a, .btn, .project-node');
links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('active'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});
