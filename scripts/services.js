function fetchServicesContent() {
    const servicesReq = new Request('http://localhost:1337/services');  // Ensure case matches Strapi endpoint

    fetch(servicesReq)
    .then(response => response.json())
    .then(services => {
        console.log(services);  // Log all the services data to debug
        
        // Update Hero Section
        document.getElementById("services_hero_title").innerHTML = services[0].services_hero_title;

        if (services[0].services_hero_image && services[0].services_hero_image.url) {
            document.getElementById("services_hero_image").style.backgroundImage = `url(http://localhost:1337${services[0].services_hero_image.url})`;
        }

            // Clear existing services
            const serviceList = document.querySelector('.service-list');
            serviceList.innerHTML = '';

            // Loop over each service and dynamically create a card for it
            services.forEach(service => {
                const serviceCard = `
                    <div class="service fade-up">
                        <div class="image" style="background-image: url('http://localhost:1337${service.services_image.url}');"></div>
                        <div class="text">
                          <div class="inner">
                            <h2 class="text-2xl text-bold text-uppercase text-black">${service.title}</h2>
                            <p>${service.short_description}</p>
                            <a class="btn btn-stroke btn-black" href="service-detail.html?id=${service.id}">
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
        })
        .catch(error => console.error('Error fetching services:', error));
}

fetchServicesContent();
