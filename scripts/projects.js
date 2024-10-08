// scripts/projects.js

function fetchProjectsContent() {
    const projectReq = new Request('http://localhost:1337/projects');

    fetch(projectReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Error fetching projects.');
            }
        })
        .then(displayProjects)
        .catch(error => console.error('Error:', error));
}

function displayProjects(projects) {
    const projectsList = document.querySelector('.card-list');

    projectsList.innerHTML = ''; // Clear the list before appending new projects

    projects.forEach(project => {
        const imageUrl = project.cover_image ? `http://localhost:1337${project.cover_image.url}` : 'default.jpg'; 

        const projectCard = `
            <li class="card mix">
                <a href="project-detail.html?id=${project.id}">
                    <div class="image">
                        <div class="inner" style="background-image:url('${imageUrl}')"></div>
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
        projectsList.innerHTML += projectCard;
    });
}

// Function to check for a project ID and fetch a specific project
function checkForProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId) {
        getProject(projectId);
    } else {
        showMissingProjectMsg("A project can't be retrieved without an ID.");
    }
}

function getProject(id) {
    const projectReq = new Request(`http://localhost:1337/projects/${id}`);

    fetch(projectReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Project not found');
            }
        })
        .then(displayProject)
        .catch(error => showMissingProjectMsg(error.message));
}

function displayProject(project) {
    document.getElementById("projects_hero_image").style.backgroundImage = `url(http://localhost:1337${project.projects_hero_image.url})`;
    document.getElementById("projects_hero_title").innerHTML = project.projects_hero_title;

    document.getElementById("project-title").innerHTML = project.title;
    document.getElementById("project-description").innerHTML = project.description;
    document.getElementById("project-img").src = `http://localhost:1337${project.cover_image.url}`;

    const projectTags = document.getElementById("project-tags");
    projectTags.innerHTML = '';

    project.tags.forEach(tag => {
        let tagEl = document.createElement("span");
        tagEl.classList.add("project-tag");
        tagEl.innerHTML = tag.name;
        projectTags.appendChild(tagEl);
    });

    document.getElementById("projects_contact_cta_title").innerHTML = project.projects_contact_cta_title;
    document.getElementById("projects_contact_cta_background").style.backgroundImage = `url(http://localhost:1337${project.projects_contact_cta_background.url})`;
}

function showMissingProjectMsg(msg) {
    document.getElementById("not-found").style.display = "block";
    document.getElementById("err-msg").innerHTML = msg;
}

fetchProjectsContent();
checkForProject();
