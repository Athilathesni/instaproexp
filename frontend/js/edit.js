const url = window.location.href;
const urlParams = new URLSearchParams(url.split("?")[1]);
const id = urlParams.get("id");
const token = localStorage.getItem("token");

let existingImages = [];

async function showPost() {
    const res = await fetch(`http://localhost:3000/api/showPost/${id}`);
    const data = await res.json();

    document.getElementById('caption').value = data.post.caption;
    document.getElementById('description').value = data.post.description;

    existingImages = data.post.pic;

    const imgPreview = document.getElementById("img-preview");
    imgPreview.src = existingImages[0] || "";

    const imagesContainer = document.getElementById("images-container");
    imagesContainer.innerHTML = "";

    existingImages.forEach((imageSrc, index) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = `Image ${index + 1}`;
        img.className = "post-image";
        img.addEventListener("mouseover", () => showPreview(imageSrc));
        imagesContainer.appendChild(img);
    });
}
showPost();

function showPreview(imageSrc) {
    document.getElementById("img-preview").src = imageSrc;
}

document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const caption = document.getElementById('caption').value;
    const description = document.getElementById('description').value;
    // const newImages = document.getElementById('new-images').files;

    let pic = [...existingImages];

    // if (newImages.length > 0) {
    //     pic = await uploadNewImages(newImages);
    // }

    const res = await fetch(`http://localhost:3000/api/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({pic,caption,description})
    });

    const data = await res.json();
    if (res.status === 201) {
        alert(data.msg);
        window.location.href = `../pages/profile.html`;
    } else {
        alert(data.error);
    }
});

// async function uploadNewImages(files) {
//     const formData = new FormData();
//     for (const file of files) {
//         formData.append('images', file);
//     }

//     const res = await fetch('http://localhost:3000/api/uploadImages', {
//         method: 'POST',
//         body: formData
//     });

//     const data = await res.json();
//     return data.imageUrls;  // Assuming the API returns an array of uploaded image URLs
// }