function fetchContactContent() {
    const contactReq = new Request('http://localhost:1337/contacts');

    fetch(contactReq)
        .then(response => response.json())
        .then(contact => {
            let contactContent = contact[0];  // Fetching the first Contact entry

            // Update Hero Section
            document.getElementById("contact_hero_title").innerHTML = contactContent.contact_hero_title;

            // Update Hero Image
            if (contactContent.contact_hero_image && contactContent.contact_hero_image.url) {
                document.getElementById("contact_hero_image").style.backgroundImage = `url(http://localhost:1337${contactContent.contact_hero_image.url})`;
            }

            // Update Location Image
            if (contactContent.contact_location_image && contactContent.contact_location_image.url) {
                document.getElementById("contact_location_image").src = `http://localhost:1337${contactContent.contact_location_image.url}`;
            }

            // Update Email Information
            document.getElementById("contact_email_intro").innerHTML = contactContent.contact_email_intro;
            document.getElementById("contact_email_link").href = `mailto:${contactContent.contact_email_link}`;

            // Update Electrical Enquiry Info
            document.getElementById("contact_electrical_enquiry").innerHTML = contactContent.contact_electrical_enquiry;
            document.getElementById("contact_electrical_email").href = `mailto:${contactContent.contact_email_link}`;

            // Update Address Section
            document.getElementById("contact_find_us_title").innerHTML = contactContent.contact_find_us_title;
            document.getElementById("contact_address").innerHTML = contactContent.contact_address;
            document.getElementById("contact_address_link").href = contactContent.contact_address_link;

            // Update Call Section
            document.getElementById("contact_call_title").innerHTML = contactContent.contact_call_title;
            document.getElementById("contact_phone").innerHTML = contactContent.contact_phone;
            document.getElementById("contact_phone_link").href = contactContent.contact_phone_link;

            // Update Connect Section
            document.getElementById("contact_connect_title").innerHTML = contactContent.contact_connect_title;

            // Update Social Links
            const socialLinks = contactContent.contact_social_links;
            let socialContainer = document.getElementById("contact_social_links");
            socialContainer.innerHTML = '';  // Clear any existing links
            socialLinks.forEach(social => {
                let socialItem = document.createElement("li");
                let socialLink = document.createElement("a");
                socialLink.href = social.url;
                socialLink.target = "_blank";
                socialLink.innerHTML = `<i class="fab fa-${social.platform}"></i>`;
                socialItem.appendChild(socialLink);
                socialContainer.appendChild(socialItem);
            });

            // Update Google Maps Button
            document.getElementById("contact_google_maps_button").innerHTML = contactContent.contact_google_maps_button;
            document.getElementById("contact_google_maps_button").href = contactContent.contact_address_link;
        });
}

// Call the function to fetch Contact content
fetchContactContent();
