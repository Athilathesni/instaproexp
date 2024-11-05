function submitEmail() {
    const email = document.getElementById('email').value;

    if (!email) {
        alert('Please enter an email address.');
        return;
    }

    // Send the email to the backend using fetch
    fetch('/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password reset link sent! Please check your email.');
        } else {
            alert('Error sending email. Please try again.');
        }
    })
    .catch(error => {
    console.log(error);
        alert('There was an error processing your request.');
    });
}