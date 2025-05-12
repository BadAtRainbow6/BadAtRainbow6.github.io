// Projects modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Project data - this would typically come from a database or API
    const projectData = {
        quantum: {
            title: 'Project Quantum',
            description: `
                <h2>Project Quantum</h2>
                <div class="project-image">
                    <img src="/api/placeholder/600/400" alt="Project Quantum Screenshot">
                </div>
                <div class="project-details">
                    <h3>About the Project</h3>
                    <p>Project Quantum is a sci-fi puzzle platformer that revolves around time manipulation mechanics. Players navigate through intricate levels, manipulating the flow of time to solve puzzles and overcome obstacles.</p>
                    
                    <h3>Technical Details</h3>
                    <ul>
                        <li>Developed in Unity with C#</li>
                        <li>Custom time manipulation system allowing for rewinding, pausing, and accelerating time</li>
                        <li>Procedurally generated puzzle elements</li>
                        <li>Advanced particle systems for visual effects</li>
                        <li>Integrated with achievements system</li>
                    </ul>
                    
                    <h3>Development Challenges</h3>
                    <p>The biggest challenge was creating a robust time manipulation system that could affect all objects in the game world consistently. This required developing a custom physics system that could track and reverse the state of all interactive objects.</p>
                    
                    <h3>Key Learnings</h3>
                    <p>This project pushed the boundaries of my understanding of game state management and demonstrated the importance of careful architecture planning when developing complex gameplay mechanics.</p>
                </div>
            `,
            technologies: ['Unity', 'C#', 'HLSL Shaders', 'Blender']
        },
        medieval: {
            title: 'Medieval Tactics',
            description: `
                <h2>Medieval Tactics</h2>
                <div class="project-image">
                    <img src="/api/placeholder/600/400" alt="Medieval Tactics Screenshot">
                </div>
                <div class="project-details">
                    <h3>About the Project</h3>
                    <p>Medieval Tactics is a strategic RPG set in a richly detailed medieval world. The game combines tactical combat with deep narrative branches, allowing players to experience a story that adapts to their choices and combat style.</p>
                    
                    <h3>Technical Details</h3>
                    <ul>
                        <li>Built with Unreal Engine using C++ and Blueprints</li>
                        <li>Custom dialogue system with branching narratives</li>
                        <li>Grid-based tactical combat system</li>
                        <li>AI-driven enemy tactics that adapt to player strategies</li>
                        <li>Dynamic weather system affecting gameplay mechanics</li>
                    </ul>
                    
                    <h3>Development Challenges</h3>
                    <p>Creating an AI system that could provide challenging tactical combat while adapting to different player strategies was particularly difficult. The solution involved a combination of behavior trees and utility-based decision making.</p>
                    
                    <h3>Key Learnings</h3>
                    <p>This project taught me the importance of balancing gameplay complexity with accessibility, and how narrative design can enhance mechanical gameplay elements when tightly integrated.</p>
                </div>
            `,
            technologies: ['Unreal Engine', 'C++', 'Blueprint', 'Maya']
        }
    };

    // Open modal with project details
    function openProjectModal(projectId) {
        if (projectData[projectId]) {
            const project = projectData[projectId];

            // Create modal content
            modalContent.innerHTML = `
                <div class="modal-project">
                    ${project.description}
                    <div class="tech-stack">
                        <h3>Technologies</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;

            // Add tech tags styling
            const style = document.createElement('style');
            style.textContent = `
                .modal-project h2 {
                    color: var(--accent-color);
                    margin-bottom: 20px;
                    text-align: center;
                }
                .project-image {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .project-image img {
                    max-width: 100%;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .project-details h3 {
                    color: var(--accent-color);
                    margin: 20px 0 10px;
                }
                .project-details ul {
                    margin-left: 20px;
                }
                .tech-stack {
                    margin-top: 30px;
                }
                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 10px;
                }
                .tech-tag {
                    background-color: var(--accent-color);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 14px;
                }
            `;
            document.head.appendChild(style);

            // Show modal with animation
            modal.style.display = 'block';
            setTimeout(() => {
                modal.style.opacity = 1;
            }, 10);
        }
    }

    // Close modal
    function closeProjectModal() {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    // Event listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    closeModal.addEventListener('click', closeProjectModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeProjectModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
});