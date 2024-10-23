document.getElementById('enquiryEnvoyer').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents default form submission behavior
    
    // Collect the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send the data to Strapi API endpoint
    fetch('http://localhost:1337/inquieries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Message envoyé avec succès !');
            // Optionally clear the form after submission
        } else {
            alert('Erreur lors de l\'envoi du message.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Problème de connexion. Veuillez réessayer.');
    });
});
