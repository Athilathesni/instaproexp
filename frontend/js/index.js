async function getUser() {
    const token = localStorage.getItem("token")
    if (token) {
      const res = await fetch("http://localhost:3000/api/getUser", {
        headers: { authorization: `Bearer ${token}` },
      });
      const user= await res.json();
      
      document.getElementById("nav-sign").style.display = "none"
      document.getElementById("nav-sec-2").innerHTML = `
          <div class="nav-dropdown" id="uname">${user.usr.name}</div>
              <div id="profilep" class="profilep">
                  <img src="${user.usr.profile}" alt="" id="profile-pic" class="profile-pic" width="40" height="40">
              </div>
              <div class="dropdown" id="dropdown">
                  <button onclick="myFunction()" class="dropbtn">▼</button>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="../pages/profile.html">Profile</a>
                    <a onclick="logoutacc()">Logout</a>
                  </div>
              </div>
      `;
      let str=[]
      user.data.map((data)=>{
        str += `
          <a href="../pages/spost?id=${data._id}">
                  <div class="card">
                      <div><img
                              src="${data.pic[0]}"alt height="250" width="200"></div>
                      <div>${data.caption} </div>
                  </div>
              </a>
        `
      })
      document.getElementById('container').innerHTML=str
    }
  }
  getUser();
  
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show")
  }
  
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content")
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show")
        }
      }
    }
  };
  
  function logoutacc() {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    window.location.reload()
  }