const token = localStorage.getItem("token")
document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    caption=document.getElementById('caption').value
    description=document.getElementById('description').value

    console.log(pic,caption,description)
    const res=await fetch('http://localhost:3000/api/addpost',{
        method:"POST",
        headers:{"Content-Type":'application/json', "authorization": `Bearer ${token}`},
        body:JSON.stringify({pic,caption,description})
    })
    console.log(res);
    
    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        window.location.href="../pages/profile.html"
    }
    else{
        alert(data.error)
    }
 })
let pic = [];

async function picture() {
    const files = document.getElementById("post-picture").files;
    pic = [];

    const previewContainer = document.getElementById("image-preview");
    previewContainer.innerHTML = "";

    for (const file of files) {
        const base64 = await convertBase64(file);
        pic.push(base64);


        const img = document.createElement("img");
        img.src = base64;
        img.style.height = "100px";
        img.style.width = "100px";
        img.style.margin = "5px";
        previewContainer.appendChild(img);
    }
}

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}