email=localStorage.getItem('email')
document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const pass = document.getElementById("nepass").value;
    const cpass = document.getElementById("copass").value;
    // const errorMessage = document.getElementById("error-message");

    if (pass !== cpass) {
        errorMessage.textContent = "Passwords not match. Please try again.";
    } else if (pass.length < 4) {
        errorMessage.textContent = "Password must be at least 4 characters long.";
    } 

    const res = await fetch(`http://localhost:3000/api/updatePass`, {
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