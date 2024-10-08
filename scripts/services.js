// services.js
function fetchServicesContent() {
    const servicesReq = new Request('http://localhost:1337/Services');

    fetch(servicesReq)
        .then(response => response.json())
        .then(services => {
            // Update Hero Section
            document.getElementById("services_hero_title").innerHTML = services[0].services_hero_title;

            if (services[0].services_hero_image && services[0].services_hero_image.url) {
                document.getElementById("services_hero_image").style.backgroundImage = `url(http://localhost:1337${services[0].services_hero_image.url})`;
            }

            // Clear existing services
            const serviceList = document.querySelector('.service-list');
            serviceList.innerHTML = '';

            // Loop over each service and dynamically create a card for it
            services.forEach((service, index) => {
                const serviceCard = `
                    <div class="service fade-up" id="services_card_${index + 1}">
                        <div class="image" id="services_image_${index + 1}" style="background-image: url('http://localhost:1337${service.services_image.url}');"></div>
                        <div class="text">
                            <div class="inner" id="services_text_${index + 1}">
                                <h2 class="text-2xl text-bold text-uppercase text-black" id="services_title_${index + 1}">${service.services_card_title}</h2>
                                <p id="services_description_${index + 1}">${service.services_card_description}</p>
                                <a class="btn btn-stroke btn-black" id="services_button_${index + 1}" href="service-detail.html?id=${service.id}">
                                    <span>En savoir plus</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `;
                serviceList.innerHTML += serviceCard;
            });

            // Update Contact CTA
            if (services[0].services_contact_cta_background && services[0].services_contact_cta_background.url) {
                document.getElementById("services_contact_cta_background").style.backgroundImage = `url(http://localhost:1337${services[0].services_contact_cta_background.url})`;
            }

            document.getElementById("services_contact_cta_title").innerHTML = services[0].services_contact_cta_title;
            document.getElementById("services_contact_cta_button").innerHTML = services[0].services_contact_cta_button;
        })
        .catch(error => console.error('Error fetching services:', error));
}

// Call the function to fetch Services content
fetchServicesContent();
