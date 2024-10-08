function fetchServicesContent() {
    const servicesReq = new Request('http://localhost:1337/services');

    fetch(servicesReq)
        .then(response => response.json())
        .then(services => {
            let servicesContent = services[0];  // Fetching the first Services entry

            // Update Hero Section
            document.getElementById("services_hero_title").innerHTML = servicesContent.services_hero_title;

            // Update Hero Image
            if (servicesContent.services_hero_image && servicesContent.services_hero_image.url) {
                document.getElementById("services_hero_image").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_hero_image.url})`;
            }

            // Service 1
            document.getElementById("services_title_1").innerHTML = servicesContent.services_card_1_title;
            document.getElementById("services_description_1").innerHTML = servicesContent.services_card_1_description;
            document.getElementById("services_image_1").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_image_1.url})`;
            document.getElementById("services_button_1").href = "index.html?p=81.html";

            // Service 2
            document.getElementById("services_title_2").innerHTML = servicesContent.services_card_2_title;
            document.getElementById("services_description_2").innerHTML = servicesContent.services_card_2_description;
            document.getElementById("services_image_2").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_image_2.url})`;
            document.getElementById("services_button_2").href = "index.html?p=82.html";

            // Service 3
            document.getElementById("services_title_3").innerHTML = servicesContent.services_card_3_title;
            document.getElementById("services_description_3").innerHTML = servicesContent.services_card_3_description;
            document.getElementById("services_image_3").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_image_3.url})`;
            document.getElementById("services_button_3").href = "index.html?p=83.html";

            // Service 4
            document.getElementById("services_title_4").innerHTML = servicesContent.services_card_4_title;
            document.getElementById("services_description_4").innerHTML = servicesContent.services_card_4_description;
            document.getElementById("services_image_4").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_image_4.url})`;
            document.getElementById("services_button_4").href = "index.html?p=84.html";

            // Update Contact CTA
            if (servicesContent.services_contact_cta_background && servicesContent.services_contact_cta_background.url) {
                document.getElementById("services_contact_cta_background").style.backgroundImage = `url(http://localhost:1337${servicesContent.services_contact_cta_background.url})`;
            }

            document.getElementById("services_contact_cta_title").innerHTML = servicesContent.services_contact_cta_title;
            document.getElementById("services_contact_cta_button").innerHTML = servicesContent.services_contact_cta_button;
        });
}

// Call the function to fetch Services content
fetchServicesContent();
