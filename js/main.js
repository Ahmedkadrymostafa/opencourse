// handle cards sections 
let more = document.getElementById("more")
let secondSection = document.querySelector(".second-section");

more.addEventListener("click", () => {
  more.style.display = "none";
  secondSection.classList.add("show");
})
// handle cards sections

// wisdom codes 
const wisdom = document.getElementById("wisdom")
const wisdomArray = [
    "Lorem ipsum damet consectetur adipisicing elit. Voluptates.",
    "Lorem ipsum dolor sit ansectetur adipisicing elit. Voluptates.",
    "Lm ipsum dolctetur ag elit. Voluptates.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. .",
    "Losum dolor sit actetur adipisicing elit. Voluptates.",
    "Lorem ipsum doet consectetur adipisicing elit. Voluptates.",
]
setInterval(() => {    
    // let wisdomBoxWidth = wisdomBox.getBoundingClientRect().width

    let randomNumber = Math.floor(Math.random() * wisdomArray.length)
    setTimeout(() => {
        // wisdomBox.style.width = `${wisdomBoxWidth + "px"}`
        wisdom.innerText = wisdomArray[randomNumber]
        wisdom.style.opacity = "1"
    }, 1000)
    // wisdomBox.style.width = `${(wisdomBoxWidth / 1.5) + "px"}`
    wisdom.style.opacity = "0"
}, 5000)
// // end wisdom area create 