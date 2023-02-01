// video player handle 
let videoList = document.querySelectorAll('.video-list-container .list');
let iframe = document.getElementById("iframe");
const listArray = document.querySelector(".video-list-container")
const array = Array.from(listArray.children)
const videoNumber = document.querySelectorAll(".video-number")
const nextBtn = document.getElementById("next-control")
const prevBtn = document.getElementById("prev-control")
let videoSort = 0

function setActive() {
    videoList.forEach(remove =>{remove.classList.remove('active')});
    array[videoSort].classList.add('active');
    iframe.src = array[videoSort].getAttribute("link")
}

videoList.forEach(vid =>{
   vid.onclick = () =>{
      for (let i = 0; i < array.length; i++) {
        if (vid === array[i]) {
            videoSort = i
            setActive()
        }
      }
   };
});  
// video player handle  

nextBtn.addEventListener("click", () => {
    if (videoSort >= 0 && videoSort < array.length - 1) {
        videoSort += 1
        setActive()
    }
})
prevBtn.addEventListener("click", () => {
    if (videoSort > 0 && videoSort < array.length) {
        videoSort -= 1
        setActive()
    }
})
// add video number on p element 
for (let i = 0; i < videoNumber.length; i ++) {
    videoNumber[i].innerHTML = `${i + 1}`
}

// iframe media width

function setIframeHeight() {
    let iframeWidth = iframe.getBoundingClientRect().width
    iframe.style.height = `${(iframeWidth * 0.56) + "px"}`
}
setIframeHeight()
window.addEventListener("resize", () => {
    setIframeHeight()
})