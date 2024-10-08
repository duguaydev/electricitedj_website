function fetchRelatedProjects() {
    const relatedProjectsList = document.getElementById('related-projects-list');

    fetch('http://localhost:1337/projects')
        .then(response => response.json())
        .then(projects => {
            projects.forEach(project => {
                const projectCard = `
                    <li class="card">
                        <a href="project-detail.html?id=${project.id}">
                            <div class="image">
                                <div class="inner" style="background-image:url('http://localhost:1337${project.cover_image.url}')"></div>
                            </div>
                            <div class="text">
                                <div class="top">
                                    <h2 class="text-lg text-bold text-black text-uppercase">${project.title}</h2>
                                    <div class="category-list">
                                        ${project.tags.map(tag => `<button>${tag.name}</button>`).join('')}
                                    </div>
                                </div>
                                <div class="bottom">
                                    <button class="btn btn-stroke btn-black">
                                        <span>Voir le Projet</span>
                                    </button>
                                </div>
                            </div>
                        </a>
                    </li>
                `;

                relatedProjectsList.innerHTML += projectCard;
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
}

// Call the function to fetch and display related projects
fetchRelatedProjects();
