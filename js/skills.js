// Skills visualization and animation
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsPage = document.getElementById('skillsPage');
    let skillsAnimated = false;

    // Set up intersection observer to detect when skills page is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                // Animate skills when page is visible
                animateSkills();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    // Observe the skills page
    observer.observe(skillsPage);

    // Function to animate skills progress bars
    function animateSkills() {
        skillItems.forEach((skill, index) => {
            const level = skill.getAttribute('data-level');
            // Add style to show the skill level
            skill.style.setProperty('--level', '0');

            // Stagger the animations for a better visual effect
            setTimeout(() => {
                skill.style.setProperty('--level', level);

                // Add the percentage text
                const percentText = document.createElement('span');
                percentText.className = 'skill-percentage';
                percentText.textContent = `${level}%`;
                percentText.style.position = 'absolute';
                percentText.style.right = '0';
                percentText.style.top = '5px';
                percentText.style.color = 'var(--accent-color)';
                percentText.style.fontWeight = 'bold';
                skill.appendChild(percentText);

                // Animate the percentage text
                percentText.style.opacity = '0';
                setTimeout(() => {
                    percentText.style.transition = 'opacity 0.5s ease';
                    percentText.style.opacity = '1';
                }, 100);

            }, index * 150);
        });
    }

    // Add skill tooltip functionality
    skillItems.forEach(skill => {
        const skillName = skill.textContent;
        const level = skill.getAttribute('data-level');

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <h4>${skillName}</h4>
            <p>Proficiency: ${getSkillLevelText(level)}</p>
            <p>${getSkillDescription(skillName)}</p>
        `;

        // Style the tooltip
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'white';
        tooltip.style.color = 'var(--text-color)';
        tooltip.style.padding = '10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        tooltip.style.zIndex = '100';
        tooltip.style.width = '200px';
        tooltip.style.display = 'none';
        tooltip.style.fontSize = '14px';

        // Add the tooltip to the skill item
        skill.style.position = 'relative';
        skill.appendChild(tooltip);

        // Show/hide tooltip on hover
        skill.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
            tooltip.style.top = '-120px';
            tooltip.style.left = '20px';

            // Add animation
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            tooltip.style.transition = 'all 0.3s ease';

            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
        });

        skill.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });

    // Helper function to get skill level text
    function getSkillLevelText(level) {
        if (level >= 90) return 'Expert';
        if (level >= 80) return 'Advanced';
        if (level >= 70) return 'Proficient';
        if (level >= 60) return 'Intermediate';
        return 'Beginner';
    }

    // Helper function to get skill descriptions
    function getSkillDescription(skillName) {
        const descriptions = {
            'Unity': 'Experience with creating complex game systems and optimizing for performance.',
            'Unreal Engine': 'Proficient with Blueprint system and C++ integration for game development.',
            'C#': 'Expert knowledge of language features and application to game development.',
            'C++': 'Strong understanding of memory management and performance optimization.',
            'Python': 'Used for tools development and data processing in game development pipeline.',
            'Mechanics Development': 'Skilled at designing and implementing engaging gameplay mechanics.',
            'Level Design': 'Experience creating well-balanced and intuitive game levels.',
            'Blender': 'Creating and optimizing 3D models for game environments and characters.',
            'Photoshop': 'Designing UI elements and textures for games.',
            'Git': 'Managing code repositories and facilitating team collaboration.'
        };

        return descriptions[skillName] || 'Skilled application in game development contexts.';
    }

    // Add additional skill details toggle
    const skillCategories = document.querySelectorAll('.skill-category h3');

    skillCategories.forEach(category => {
        // Make categories clickable
        category.style.cursor = 'pointer';
        category.style.userSelect = 'none';

        // Add click indicator
        const indicator = document.createElement('span');
        indicator.textContent = ' +';
        indicator.style.color = 'var(--accent-color)';
        category.appendChild(indicator);

        // Track state
        let expanded = false;

        // Create expanded content container
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-skills-content';
        expandedContent.style.maxHeight = '0';
        expandedContent.style.overflow = 'hidden';
        expandedContent.style.transition = 'max-height 0.3s ease';
        expandedContent.style.paddingLeft = '15px';

        // Add content based on category
        switch (category.textContent.replace(' +', '')) {
            case 'Game Engines':
                expandedContent.innerHTML = `
                    <p>Experience with multiple game engines allows for selecting the right tool for each project.</p>
                    <ul>
                        <li><strong>Unity:</strong> 7+ years experience, specialized in 2D and 3D game development</li>
                        <li><strong>Unreal:</strong> 5+ years experience, focus on high-fidelity graphics and performance</li>
                    </ul>
                `;
                break;
            case 'Programming':
                expandedContent.innerHTML = `
                    <p>Strong programming foundation across multiple languages enables efficient problem-solving.</p>
                    <ul>
                        <li><strong>C#:</strong> Primary language for Unity development</li>
                        <li><strong>C++:</strong> Used for Unreal Engine and performance-critical systems</li>
                        <li><strong>Python:</strong> Automation tools and pipeline development</li>
                    </ul>
                `;
                break;
            case 'Game Design':
                expandedContent.innerHTML = `
                    <p>Game design skills focus on creating engaging player experiences through thoughtful mechanics.</p>
                    <ul>
                        <li><strong>Mechanics:</strong> Designing systems that provide meaningful player choices</li>
                        <li><strong>Level Design:</strong> Creating spaces that guide and challenge players</li>
                    </ul>
                `;
                break;
            case 'Tools':
                expandedContent.innerHTML = `
                    <p>Proficiency with industry standard tools enables efficient asset creation and collaboration.</p>
                    <ul>
                        <li><strong>Blender:</strong> 3D modeling and animation for game assets</li>
                        <li><strong>Photoshop:</strong> Texture creation and UI design</li>
                        <li><strong>Git:</strong> Version control and team collaboration</li>
                    </ul>
                `;
                break;
        }

        // Insert expanded content after category
        category.parentNode.insertBefore(expandedContent, category.nextSibling);

        // Toggle expanded content on click
        category.addEventListener('click', () => {
            expanded = !expanded;

            if (expanded) {
                expandedContent.style.maxHeight = '200px';
                indicator.textContent = ' -';
            } else {
                expandedContent.style.maxHeight = '0';
                indicator.textContent = ' +';
            }
        });
    });
});