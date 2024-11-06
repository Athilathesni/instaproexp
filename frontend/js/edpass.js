document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
pass=document.getElementById('pass').value
cpass=document.getElementById('cpass').value
console.log(pass,cpass);

const res=await fetch('http://localhost:3000/api/chpass',{
    method:"post",
    headers:{"Content-Type":'application/json'},
    body:JSON.stringify({pass,cpass})

    })

})