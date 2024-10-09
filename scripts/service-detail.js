function checkForService() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');  // Get the service ID from the URL

    if (serviceId) {
        getService(serviceId);  // Fetch and display the service
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
        .then(service => {
            displayService(service);  // Call displayService to render the data
        })
        .catch(error => showMissingServiceMsg(error.message));
}

function displayService(service) {
    // Set the hero title
    const serviceHeroTitle = document.getElementById("service_hero_title");
    if (serviceHeroTitle) {
        serviceHeroTitle.innerHTML = service.services_hero_title || 'Nos Services';
    }

    // Set the hero image
    const serviceHeroImage = document.getElementById("services_hero_image");
    if (serviceHeroImage) {
        if (service.services_hero_image && service.services_hero_image.url) {
            serviceHeroImage.style.backgroundImage = `url(http://localhost:1337${service.services_hero_image.url})`;
            serviceHeroImage.alt = service.services_hero_image.alternativeText || 'Hero Image';
        } else {
            serviceHeroImage.style.backgroundImage = '';  // Clear the image if not available
        }
    }

    // Set the first service image (cover image)
    const serviceImage = document.getElementById("service-image");
    if (serviceImage) {
        if (service.cover_image && service.cover_image.url) {
            serviceImage.src = `http://localhost:1337${service.cover_image.url}`;
            serviceImage.alt = service.cover_image.alternativeText || 'Service Cover Image';
        } else {
            serviceImage.src = '';  // Clear the image if it doesn't exist
            serviceImage.alt = 'No Image Available';
        }
    }

    // Set text above and below the cover image
    const coverTextAbove = document.getElementById("cover-text-above");
    if (coverTextAbove) {
        coverTextAbove.innerHTML = service.cover_text_above || 'Default text above cover image';
    }

    const coverTextBelow = document.getElementById("cover-text-below");
    if (coverTextBelow) {
        coverTextBelow.innerHTML = service.cover_text_below || 'Default text below cover image';
    }

    // Set the service title and description
    const serviceTitle = document.getElementById("service_title");
    const serviceDescription = document.getElementById("service_description");
    if (serviceTitle) {
        serviceTitle.innerHTML = service.service_title || 'Title not available';
    }
    if (serviceDescription) {
        serviceDescription.innerHTML = service.service_description || 'Description not available';
    }

    // Set the contact CTA title (optional)
    const contactCtaTitle = document.getElementById("contact_cta_title");
    if (contactCtaTitle) {
        contactCtaTitle.innerHTML = service.services_contact_cta_title || 'Prêt à discuter de votre prochain projet?';
    }

    // Set the gallery images
    const galleryImageContainer = document.getElementById("gallery-container");
    if (galleryImageContainer) {
        galleryImageContainer.innerHTML = '';  // Clear previous gallery images if any
        for (let i = 1; i <= 4; i++) {
            const slideKey = `gallery_slide_${i}`;
            if (service[slideKey] && service[slideKey].url) {
                const imgElement = document.createElement("img");
                imgElement.src = `http://localhost:1337${service[slideKey].url}`;
                imgElement.alt = service[slideKey].alternativeText || `Gallery Slide ${i}`;
                imgElement.style.borderRadius = "12px";
                imgElement.style.border = "1px transparent";
                imgElement.classList.add("gallery-slide");
                galleryImageContainer.appendChild(imgElement);
            }
        }
    }
}

function showMissingServiceMsg(msg) {
    alert(msg);  // Display an alert with the error message
}

checkForService();  // Run the service check when the page loads
