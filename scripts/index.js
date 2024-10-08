// scripts/index.js
function fetchProjects() {
    const projectsReq = new Request('http://localhost:1337/projects');

    fetch(projectsReq)
        .then(response => response.json())
        .then(projects => {
            let projectList = document.getElementById("project-list");

            projects.forEach(project => {
                projectList.appendChild(createArticleCard(project));
            });
        });
}

function createArticleCard(project) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.onclick = () => {
        window.location.replace(`/pages/project.html?id=${project.id}`)
    };

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-img");
    cardImage.src = `http://localhost:1337${project.cover_image.formats.thumbnail.url}`;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let projectTitle = document.createElement("p");
    projectTitle.classList.add("card-title");
    projectTitle.innerHTML = project.title;

    let projectDescription = document.createElement("div");
    projectDescription.classList.add("card-description");
    projectDescription.innerHTML = project.description;

    let projectTags = document.createElement("div");
    projectTags.classList.add("project-tag-cont");

    let tag;

    project.tags.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            tag.classList.add("project-tag");
            tag.innerHTML = tg.name;

            projectTags.appendChild(tag);
        }
    });

    cardBody.append(projectTitle, projectDescription, projectTags);

    card.append(cardImage, cardBody);

    return card;
}

fetchProjects();