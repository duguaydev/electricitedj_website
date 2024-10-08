function fetchAboutContent() {
    const aboutReq = new Request('http://localhost:1337/abouts'); // Ensure this is correct

    fetch(aboutReq)
        .then(response => response.json())
        .then(abouts => {
            let aboutContent = abouts[0];  // Fetching the first About entry

            // Update Hero Section
            document.getElementById("about_hero_title").innerHTML = aboutContent.about_hero_title;

            // Update Hero Image
            if (aboutContent.about_hero_image && aboutContent.about_hero_image.url) {
                document.getElementById("about_hero_image").style.backgroundImage = `url(http://localhost:1337${aboutContent.about_hero_image.url})`;
            }

            // Update Video Section
            if (aboutContent.about_video && aboutContent.about_video.url) {
                let videoElement = document.getElementById("about_video");
                videoElement.src = `http://localhost:1337${aboutContent.about_video.url}`;
            }

            // Update Main Text Section
            document.getElementById("about_established").innerHTML = aboutContent.about_established;
            document.getElementById("about_future_title").innerHTML = aboutContent.about_future_title;
            document.getElementById("about_description").innerHTML = aboutContent.about_description;
            document.getElementById("about_contact_button").innerHTML = aboutContent.about_contact_button;

            // Update Lightbulb Image
            if (aboutContent.about_lightbulb_image && aboutContent.about_lightbulb_image.url) {
                document.getElementById("about_lightbulb_image").style.backgroundImage = `url(http://localhost:1337${aboutContent.about_lightbulb_image.url})`;
            }

            // Update Gallery Image in Section 3
            if (aboutContent.about_gallery_image && aboutContent.about_gallery_image.url) {
                document.getElementById("about_gallery_image").style.backgroundImage = `url(http://localhost:1337${aboutContent.about_gallery_image.url})`;
            }

            // Update Company Name, Trust Title, Customer Priority, and Service List
            document.getElementById("about_company_name").innerHTML = aboutContent.about_company_name;
            document.getElementById("about_trust_title").innerHTML = aboutContent.about_trust_title;
            document.getElementById("about_customer_priority").innerHTML = aboutContent.about_customer_priority;

            // Update Service List
            document.getElementById("about_service_list").innerHTML = aboutContent.about_service_list;
        })
        .catch(error => {
            console.error('Error fetching about content:', error);
        });
}

// Call the function to fetch About content
fetchAboutContent();
