document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();

    email=document.getElementById('email').value
    pass=document.getElementById('pass').value

    
    console.log(email,pass)

    const res=await fetch('http://localhost:3000/api/login',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({email,pass})
    })
    console.log(res);
    
    const data=await res.json()
    console.log(data)
    
    if(res.status==200){
        localStorage.setItem('token', data.token)
        window.location.href="../index.html"
    }
    else{
        alert(data.msg)
    }
 })