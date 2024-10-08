// scripts/project.js
function checkForProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId) {
        getProject(projectId);
    } else {
        showMissingProjectMsg("An project can't be retrieved without an ID.");
    }
}

function getProject(id) {
    const projectReq = new Request(`http://localhost:1337/projects/${id}`);

    fetch(projectReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(resp.statusText);
            }
        })
        .then(displayProject)
        .catch(showMissingProjectMsg);
}

function displayProject(project) {
    document.getElementById("project-img").src = `http://localhost:1337${project.cover_image.url}`;

    document.getElementById("project-title").innerHTML = project.title;

    document.getElementById("project-description").innerHTML = project.description;

    document.getElementById("published_date").innerHTML = (new Date(project.published_at)).toDateString();

    let projectTags = document.getElementById("project-tags");
    let tag;

    project.tags.forEach(tg => {
        if (tg.name) {
            tag = document.createElement("span")
            tag.classList.add("project-tag");
            tag.innerHTML = tg.name;

            projectTags.appendChild(tag);
        }
    });

    const showdown = window.showdown;
    const converter = new showdown.Converter();
    document.getElementById("project-content").innerHTML = converter.makeHtml(project.content);

    document.getElementById("project-cont").style = "display: flex; display: -webkit-box; display: -ms-flexbox;";
}

function showMissingProjectMsg(msg) {
    document.getElementById("not-found").style = "display: flex; display: -webkit-box; display: -ms-flexbox;";
    document.getElementById("err-msg").innerHTML = msg;
}

checkForProject();