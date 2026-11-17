// js/dataLoader.js
async function loadProjects() {
    try {
        const response = await fetch('data/database.json');
        const data = await response.json();
        const grid = document.querySelector('.project-grid');
        
        if (!grid) return;
        
        grid.innerHTML = ''; // Clear placeholders
        
        data.environments.forEach(project => {
            const tagsHtml = project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('');
            
            const article = document.createElement('article');
            article.className = 'project-node';
            article.innerHTML = `
                <div class="node-header">${project.title}</div>
                <div class="node-media">[ AWAITING ${project.engine} RENDER INJECTION ]</div>
                <div class="node-specs">
                    <span>ROLE: ${project.role}</span>
                    <span>ENGINE: ${project.engine}</span>
                </div>
                <p>${project.description}</p>
                <div class="skill-matrix">
                    ${tagsHtml}
                </div>
            `;
            grid.appendChild(article);
        });
        
        // Re-attach GSAP animations to the newly generated DOM nodes
        gsap.from(".project-node", {
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out"
        });
        
    } catch (error) {
        console.error("SYS.ERR // FAILED TO FETCH DATABANK:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadProjects);
