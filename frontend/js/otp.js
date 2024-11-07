let email=localStorage.getItem('email')
console.log(email);

document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault();
    otp1=document.getElementById('otp1').value
    otp2=document.getElementById('otp2').value
    otp3=document.getElementById('otp3').value
    otp4=document.getElementById('otp4').value
    // console.log(otp1,otp2,otp3,otp4);
    otp=otp1+otp2+otp3+otp4
    console.log(otp);
    
    const res=await fetch('http://localhost:3000/api/checkotp',{
        method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({otp,email})
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
 function moveToNext(current, nextFieldID) {
    if (current.value.length === current.maxLength) {
        if (nextFieldID) {
            document.getElementById(nextFieldID).focus();
        }
    }
}
function submitOTP() {
    let otp = '';
    for (let i = 1; i <= 4; i++) {
        otp += document.getElementById(`otp${i}`).value;
    }
    
    if (otp.length === 4) {
    } else {
        alert('Please enter a 4-digit OTP.');
    }
}