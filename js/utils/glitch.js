// js/utils/glitch.js
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//";

document.querySelectorAll('.glitch-title, .section-header').forEach(element => {
    element.addEventListener('mouseover', event => {
        let iterations = 0;
        const originalText = event.target.dataset.value || event.target.innerText;
        event.target.dataset.value = originalText;
        
        const interval = setInterval(() => {
            event.target.innerText = originalText.split("")
                .map((letter, index) => {
                    if(index < iterations) return originalText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");
            
            if(iterations >= originalText.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });
});
