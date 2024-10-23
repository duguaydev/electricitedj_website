function fetchAccueilContent() {
    const accueilReq = new Request('http://localhost:1337/accueils');

    fetch(accueilReq)
        .then(response => response.json())
        .then(accueils => {
            let accueilContent = accueils[0];  // Fetching the first Accueil entry

            // Update Hero Section
            document.getElementById("hero_title").innerHTML = accueilContent.hero_title;
            document.getElementById("hero_button_text").innerHTML = accueilContent.hero_button_text;
            
            // Update Video Button Link
            let videoButton = document.getElementById("hero_video_button");
            if (accueilContent.hero_video_url) {
                videoButton.setAttribute("href", accueilContent.hero_video_url); // Set the video link dynamically
            }

            document.getElementById("main_description").innerHTML = accueilContent.main_description;

            // Update Subheading
            document.getElementById("subheading_text").innerHTML = accueilContent.subheading_text;

            // Update Background Image
            if (accueilContent.main_background_image && accueilContent.main_background_image.url) {
                document.getElementById("main_background_image").style.backgroundImage = `url(http://localhost:1337${accueilContent.main_background_image.url})`;
            }

            if (window.location.pathname === '/contact') {
                window.location.href = '/contact.html';
            }

            if (window.location.pathname === '/services') {
                window.location.href = '/services.html';
            }

            if (window.location.pathname === '/Projects') {
                window.location.href = '/projects.html';
            }
            
            // Update CTA Button Text and Link
            document.getElementById("cta_button_text").innerHTML = accueilContent.cta_button_text;
            document.getElementById("cta_button_link").href = accueilContent.cta_button_link;

            // Update Hero Slides
            if (accueilContent.hero_slide_1 && accueilContent.hero_slide_1.url) {
                document.getElementById("hero_slide_1").style.backgroundImage = `url(http://localhost:1337${accueilContent.hero_slide_1.url})`;
            }
            if (accueilContent.hero_slide_2 && accueilContent.hero_slide_2.url) {
                document.getElementById("hero_slide_2").style.backgroundImage = `url(http://localhost:1337${accueilContent.hero_slide_2.url})`;
            }
            if (accueilContent.hero_slide_3 && accueilContent.hero_slide_3.url) {
                document.getElementById("hero_slide_3").style.backgroundImage = `url(http://localhost:1337${accueilContent.hero_slide_3.url})`;
            }
            if (accueilContent.hero_slide_4 && accueilContent.hero_slide_4.url) {
                document.getElementById("hero_slide_4").style.backgroundImage = `url(http://localhost:1337${accueilContent.hero_slide_4.url})`;
            }

            // Add Service Data
            for (let i = 1; i <= 4; i++) {
                let serviceTitleElement = document.getElementById(`service_${i}_title`);
                let serviceImageElement = document.getElementById(`service_${i}_image`);

                if (serviceTitleElement && accueilContent[`service_${i}_title`]) {
                    serviceTitleElement.innerHTML = accueilContent[`service_${i}_title`];
                }

                if (serviceImageElement && accueilContent[`service_${i}_image`]) {
                    serviceImageElement.style.backgroundImage = `url(http://localhost:1337${accueilContent[`service_${i}_image`].url})`;
                }
            }

              // Update Contact CTA Background
            if (accueilContent.contact_cta_background && accueilContent.contact_cta_background.url) {
                document.getElementById("contact_cta_background").style.backgroundImage = `url(http://localhost:1337${accueilContent.contact_cta_background.url})`;
            }

            // Update Discussion Title
            document.getElementById("discussion_title").innerHTML = accueilContent.discussion_title;

            // Update Bottom CTA Button Text and Link
            document.getElementById("bottom_cta_button_text").innerHTML = accueilContent.bottom_cta_button_text;
            document.getElementById("bottom_cta_button_link").href = accueilContent.bottom_cta_button_link;
        });
}

// Call the function to fetch Accueil content
fetchAccueilContent();
