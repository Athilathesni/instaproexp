let id

async function getUserDetails() {
    const token = localStorage.getItem("token")
    const res=await fetch(`http://localhost:3000/api/getUserDetails/`,{
        headers: { authorization: `Bearer ${token}` },
      })
    const user=await res.json();
    id=user.usr._id
   
    document.getElementById('main-class-1').innerHTML=`
      <h1>Profile</h1><br>
      <div class="img"><img src="${user.usr.profile}" alt="" height="100" width="100"></div><br>
            <div class="main-1-div">Username: ${user.usr.name}</div><br>
            <div class="main-1-div">Email: ${user.usr.email}</div><br>
            <div class="main-1-div">Phone: ${user.usr.phone}</div><br><br>
            <div class="btn">
            <button class="log-btn" onclick="logoutacc()">Logout</button>
            <button class="del-btn" onclick="deletedata()">Delete</button>
            </div>
    `
    let str=[]
    user.post.map((data)=>{
      str+=`
        <a href="../pages/post.html?id=${data._id}">
        <div><img src="${data.pic[0]}" alt="" height="100" width="100"></div></a>
      `
    })
    document.getElementById('post-page').innerHTML=str
    let check=user.post
    if(check.length==0){
      document.getElementById('post-page').innerHTML=`<h3>No Post Uploaded</h3>`
      }

}
getUserDetails()

function postpage(id){
  console.log(id);
  
  window.location.href=`../pages/post.html?id=${id}`
}

function addpost(){
  window.location.href=`../pages/add.html`
}

function logoutacc() {
  localStorage.removeItem("token")
  alert("Logout Successfully")
  window.location.href="../index.html"
}


function deletedata() {
    fetch(`http://localhost:3000/api/deleteUser/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"}
    })
    .then((res)=>{
        console.log(res);
        if(res.status == 201) {
            alert("success");
            localStorage.removeItem("token")
            window.location.href="../index.html"
        }
        else{
            alert("error");
        }
    });
}