// drop down 
const handleDropdownClicked = (event) => {
    event.stopPropagation();
    const dropdown = document.getElementById("dropdown");
    toggleDropdown(!dropdown.classList.contains("open"));
  };
  
  const dropdown = document.getElementById("dropdown");
  const icon = document.getElementById("dropdown-icon");
  const dropDownButton = document.getElementById("dropdown-button");

  const toggleDropdown = (shouldOpen) => {
    if (shouldOpen) {
      dropdown.classList.add("open");
      icon.classList.add("open");
      dropDownButton.classList.add("open")
    } else {
      dropdown.classList.remove("open");
      icon.classList.remove("open");
      dropDownButton.classList.remove("open")
    }   
  };
  
  // document.body.addEventListener("click", () => toggleDropdown());
// end drop down 

// search result 
let searchResult = document.querySelector(".search-result")
let searchBar = document.getElementById("search-input")
let search = document.getElementById("search")
search.addEventListener("click", (e) => {
  e.stopPropagation()
})

searchBar.addEventListener("keypress", () => {
  if (searchBar.value !== null) {
    searchResult.classList.add("searching")
    search.style.borderRadius = "12px 12px 0px 0px"
  }
})
searchBar.addEventListener("keyup", () => {
  if (searchBar.value === "") {
    searchResult.classList.remove("searching")
    search.style.borderRadius = "12px"
  }
})
// searchBar.addEventListener("blur", () => {
//     // searchResult.classList.remove("searching")
//     search.style.borderRadius = "12px"
//     searchBar.value = "";
  
// })

// header responsive toggler 
const magnify = document.querySelector(".burger-icon .fa-magnifying-glass")
const searchMagnify = document.getElementById("search-bar")
const searchDropdown = document.getElementById("search-dropdown")
const searchBarMagnify = document.querySelector(".search label .fa-magnifying-glass")
const caretDown = document.querySelector(".caret-down .fa-square-caret-down")

magnify.addEventListener("click", (e) => {
  e.stopPropagation()
  searchMagnify.classList.toggle("active")
  searchDropdown.classList.remove("active")
  searchBarMagnify.style.display = "none";
  caretDown.classList.remove("active")
  searchBar.focus();
})

caretDown.addEventListener("click", (e) => {
  e.stopPropagation()
  searchDropdown.classList.toggle("active")
  searchMagnify.classList.remove("active")
  caretDown.classList.toggle("active")

      dropdown.classList.add("open");
      icon.style.display = "none";
      dropDownButton.classList.add("open")
  
})

// search result 
// handle cards sections 
let more = document.getElementById("more")
let secondSection = document.querySelector(".second-section");

more.addEventListener("click", () => {
  more.style.display = "none";
  secondSection.classList.add("show");
})
// handle cards sections
// video player handle 
let videoList = document.querySelectorAll('.video-list-container .list');
let iframe = document.getElementById("iframe");
videoList.forEach(vid =>{
   vid.onclick = () =>{
      videoList.forEach(remove =>{remove.classList.remove('active')});
      vid.classList.add('active');
      iframe.src = vid.getAttribute("link");
   };
});  
// video player handle   
// wisdom area create 
const wisdomBox = document.querySelector(".wisdom-box")
// wisdomBox.style.width = "500px"
// let media = window.matchMedia("(max-width: 567px)");
// function mediaChange() {
//   if (media.matches) {
//     wisdomBox.style.width = "350px"
//   }
// }
// window.addEventListener("resize", mediaChange(), false);


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
// end wisdom area create 
// body toggler 
document.body.addEventListener("click", () => {
  // toggleDropdown()

  if (searchMagnify.className.includes("active") && !searchResult.className.includes("searching")) {
    searchMagnify.classList.remove("active")
  }
  if (searchDropdown.className.includes("active") && !dropdown.classList.contains("open")) {
    searchDropdown.classList.remove("active")
  }
})

// body toggler 