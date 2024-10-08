function checkForService() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');

    if (serviceId) {
        getService(serviceId);
    } else {
        showMissingServiceMsg("A service can't be retrieved without an ID.");
    }
}

function getService(id) {
    const serviceReq = new Request(`http://localhost:1337/services/${id}`);

    fetch(serviceReq)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Service not found');
            }
        })
        .then(displayService)
        .catch(error => showMissingServiceMsg(error.message));
}

function displayService(service) {
    // Update the Hero Section
    document.getElementById("service_hero_title").innerHTML = service.services_hero_title;
    document.getElementById("service_hero_image").style.backgroundImage = `url(http://localhost:1337${service.services_hero_image.url})`;

    // Update Article Content
    document.getElementById("service_description").innerHTML = service.services_card_description;

    // Update Gallery
    const gallery = document.getElementById("service-gallery");
    service.gallery_images.forEach(image => {
        const slide = document.createElement("div");
        slide.classList.add("project-gallery-slide");
        slide.style.backgroundImage = `url(http://localhost:1337${image.url})`;
        gallery.appendChild(slide);
    });

    // Additional service information (if any)
    if (service.additional_image && service.additional_image.url) {
        document.getElementById("service-additional-image").innerHTML = `<img src="http://localhost:1337${service.additional_image.url}">`;
    }

    // Contact CTA Background
    if (service.services_contact_cta_background && service.services_contact_cta_background.url) {
        document.getElementById("services_contact_cta_background").style.backgroundImage = `url(http://localhost:1337${service.services_contact_cta_background.url})`;
    }

    document.getElementById("services_contact_cta_title").innerHTML = service.services_contact_cta_title || "Prêt à discuter de votre prochain projet?";
}

function showMissingServiceMsg(msg) {
    document.getElementById("not-found").style.display = "block";
    document.getElementById("err-msg").innerHTML = msg;
}

// Call the function to check for a service ID and load the content
checkForService();
