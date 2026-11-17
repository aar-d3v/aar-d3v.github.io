// 1. GSAP DOM Animations (Strict Entry Curves)
document.addEventListener("DOMContentLoaded", () => {
    const tl = gsap.timeline();

    tl.from("nav", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".glitch-title", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out"
    }, "-=0.5")
    .from(".role-marquee", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4")
    .from(".data-node", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.2");
});

// 2. Custom Canvas Geometry (Mimicking UE5 Wireframes)
const canvas = document.getElementById('webgl-surface');
const ctx = canvas.getContext('2d');

let width, height;
let nodes = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Node {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if(this.x < 0 || this.x > width) this.vx *= -1;
        if(this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 51, 102, 0.5)';
        ctx.fill();
    }
}

for(let i = 0; i < 80; i++) nodes.push(new Node());

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    nodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Draw connecting wireframes based on proximity
    for(let i = 0; i < nodes.length; i++) {
        for(let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if(dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist/1500})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();
