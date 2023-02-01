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