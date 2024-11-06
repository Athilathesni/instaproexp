document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    getotp=document.getElementById('getotp').value

    console.log(getotp)
    const res=await fetch('http://localhost:3000/api/checkOTP',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({getotp})
    })
    console.log(res);
    const data=await res.json()
    if(res.status==200){
        alert(data.msg)
        window.location.href="../pages/edpass.html"
    }
    else{
        alert(data.msg)
    }
 })