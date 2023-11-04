const container = document.querySelector('.container'),
closeBtn1 = container.querySelector('.close');
let imgBox = document.getElementById('imgBox');
let qrImage = document.getElementById('qrImage');
let qrText = document.getElementById('qrText');
let showBtn = document.querySelector(".button2")

function generateQR() {
    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + qrText.value;
        imgBox.classList.add('show-img')
        showBtn.classList.add('show-btn')
       
    }
    else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 500)
    }
}
closeBtn1.addEventListener('click',()=>{
    imgBox.classList.remove('show-img')
    showBtn.classList.remove('show-btn')
});

// Download Function*************************
let download = document.querySelector(".download")
let image = container.querySelector('img')

download.addEventListener('click',()=>{
    let imgPath = image.getAttribute('src')
    let fileName = getFileName(imgPath);
    saveAs(imgPath, fileName);

});
function getFileName(str){
    return str.substring(str.lastIndexOf('=')+1);
}



// Script for read QR**********************************************
const wrapper = document.querySelector('.container2'),
form = wrapper.querySelector('form'),
fileInp  = form.querySelector('input');
infoText = form.querySelector("p")
copyBtn = wrapper.querySelector(".copy")
closeBtn = wrapper.querySelector(".close")

function fetchRequest(formData, file){
    infoText.innerText = "Scaning QR Code..."
    //sending post request  to qr server api with passing 
    // form data as body and getting response form it
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method: "POST" , body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result? "Upload Your QR Code to scan": "Couldn't Scan QR Code"
        if(!result)return;
        wrapper.querySelector('textarea').innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add('active');
    }).catch(()=>{
        infoText.innerText = "Couldn't Scan QR Code";
    })
}

fileInp.addEventListener('change', e => {
    let file = e.target.files[0]; //geting user selected files
    if(!file)return;
    let formData = new FormData();//creating a new form data object 
    formData.append('file',file); // adding selected file to formDta
    fetchRequest(formData, file);
} );

copyBtn.addEventListener('click',()=>{
    let text = wrapper.querySelector('textarea').textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener('click',()=>fileInp.click());
closeBtn.addEventListener('click',()=> wrapper.classList.remove('active'));




//Drag and drop function******************************
// const dropArea = document.querySelector('.container2');

// let file;

// //If user Drag File over Drag Area
// dropArea.addEventListener('dragover',()=>{
//     console.log("File is over DragArea")
//     dropArea.classList.add("active2");
// })
// //If user leave Drag File from Drag Area
// dropArea.addEventListener('dragleave',()=>{
//     console.log("File is outside from DragArea")
//     dropArea.classList.remove("active2");
// })
// //If  user drop File on Drag Area
// dropArea.addEventListener('drop',(event)=>{
//     event.preventDefault(); //preventing from default behaviour
//     console.log("File is dropped on  DragArea")
   
// })






