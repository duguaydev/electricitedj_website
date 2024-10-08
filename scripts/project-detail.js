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
    // Check and update project title
    const projectTitleElement = document.getElementById("project-title");
    if (projectTitleElement) {
        projectTitleElement.innerHTML = project.title;
    }

    // Check and update project description
    const projectDescriptionElement = document.getElementById("project-description");
    if (projectDescriptionElement) {
        projectDescriptionElement.innerHTML = project.description;
    }

    // Check and update main project image
    const projectImageElement = document.getElementById("project-img");
    if (projectImageElement && project.cover_image && project.cover_image.url) {
        projectImageElement.style.backgroundImage = `url(http://localhost:1337${project.cover_image.url})`;
    }

    // Check and update project location, deadline, and services
    const locationElement = document.getElementById("project-location");
    const deadlineElement = document.getElementById("project-deadline");
    const servicesElement = document.getElementById("project-services");

    if (locationElement) {
        locationElement.innerHTML = project.location || "Location not provided";
    }
    if (deadlineElement) {
        deadlineElement.innerHTML = project.deadline || "Deadline not provided";
    }
    if (servicesElement) {
        servicesElement.innerHTML = project.services || "Services not provided";
    }

    // Handle project gallery images (slider format)
    const gallerySlides = document.querySelectorAll(".project-gallery-slide");
    if (gallerySlides.length && project.gallery_images && project.gallery_images.length > 0) {
        project.gallery_images.forEach((image, index) => {
            if (gallerySlides[index]) {
                gallerySlides[index].style.backgroundImage = `url(http://localhost:1337${image.url})`;
            }
        });
    }

    // Additional project images (if any)
    const additionalImageElement = document.getElementById("project-additional-image");
    if (additionalImageElement && project.additional_image && project.additional_image.url) {
        additionalImageElement.innerHTML = `<img src="http://localhost:1337${project.additional_image.url}">`;
    }

    // Contact CTA Background
    const contactCtaBackgroundElement = document.getElementById("projects_contact_cta_background");
    if (contactCtaBackgroundElement && project.projects_contact_cta_background && project.projects_contact_cta_background.url) {
        contactCtaBackgroundElement.style.backgroundImage = `url(http://localhost:1337${project.projects_contact_cta_background.url})`;
    }

    const contactCtaTitleElement = document.getElementById("projects_contact_cta_title");
    if (contactCtaTitleElement) {
        contactCtaTitleElement.innerHTML = project.projects_contact_cta_title || "Prêt à discuter de votre prochain projet?";
    }
}

function showMissingProjectMsg(msg) {
    const notFoundElement = document.getElementById("not-found");
    const errMsgElement = document.getElementById("err-msg");

    if (notFoundElement) {
        notFoundElement.style.display = "block";
    }
    if (errMsgElement) {
        errMsgElement.innerHTML = msg;
    }
}

// Call the function to check for a project ID and load the content
checkForProject();
