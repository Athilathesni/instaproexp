email=localStorage.getItem('email')
document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const pass = document.getElementById("Pass").value;
    const cpass = document.getElementById("cPass").value;
    const errorMessage = document.getElementById("error-message");

    if (pass !== cpass) {
        errorMessage.textContent = "Passwords not match. Please try again.";
    } else if (pass.length < 4) {
        errorMessage.textContent = "Password must be at least 4 characters long.";
    } 
    // else {
    //     errorMessage.textContent = ""; // Clear the error message if passwords match
    //     alert("Password has been successfully updated!");
    //     return true; // You can proceed with form submission or further processing here
    // }

    const res = await fetch(`http://localhost:3000/api/updatePassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({pass,cpass,email})
    });

    const data = await res.json();
    console.log(data);
    
    if (res.status == 201) {
        alert(data.msg)
        localStorage.removeItem('email')
        window.location.href = `../pages/sign.html`
    } else {
        alert(data.error)
    }
})