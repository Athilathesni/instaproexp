let pic
document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();

    profile=pic
    name=document.getElementById('username').value
    email=document.getElementById('email').value
    phone=document.getElementById('phone').value
    pass=document.getElementById('pass').value
    cpass=document.getElementById('cpass').value
    
    console.log(name,email,phone,pass,cpass)

    const res=await fetch('http://localhost:3000/api/adduser',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify({profile,name,email,phone,pass,cpass})
    })
    console.log(res);
    
    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        window.location.href="./sign.html"
    }
    else{
        alert(data.error)
    }
 })

 async function picture() {
    const file=document.getElementById("profile").files[0]
      pic=await convertBase64(file)
    console.log(pic);
    document.getElementById('showprofile').src=pic
}

function convertBase64(file) {
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader();

        fileReader.readAsDataURL(file)
        fileReader.onload=()=>{
            resolve(fileReader.result)

        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}