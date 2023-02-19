const swiper = document.querySelector(".swiper");
const swiperWrapper = document.getElementById("wrapper");
const swiperSlides = document.querySelectorAll(".swiper-wrapper .swiper-slide");
const swiperPagination = document.querySelector(".swiper-pagination");
let slideWidth = document.querySelector(".swiper-slide").getBoundingClientRect().width
// swiper controller here 
const swiperInfo = {
    slidesPerView: 3,
    slideGap: 60,
}

// resize slides 
let windowSmall = window.matchMedia("(max-width: 768px)")
let windowMedium = window.matchMedia("(max-width: 1068px)")

function resizeSlides() {
    if (windowSmall.matches) { // If media query matches
      swiper.style.width = `${(slideWidth + swiperInfo.slideGap) * 1 + "px"}`
      swiperInfo.slidesPerView = 1
    } else if (windowMedium.matches){
        swiper.style.width = `${(slideWidth + swiperInfo.slideGap) * 2 + "px"}`       
        swiperInfo.slidesPerView = 2
    }else {
        swiper.style.width = `${(slideWidth + swiperInfo.slideGap) * 3 + "px"}`       
        swiperInfo.slidesPerView = 3
    }
    
}
resizeSlides() // Call listener function at run time
windowSmall.addListener(resizeSlides) // Attach listener function on state changes
windowMedium.addListener(resizeSlides) // Attach listener function on state changes
// end resize slides 
// adding bullets in pagination div 
function addPagination() {
    let slides = Array.from(swiperSlides).length 
    if (swiperInfo.slidesPerView === 3) {
          slides -= 2
        }else if (swiperInfo.slidesPerView === 2) {
        slides -= 1
    }     
    for (let i = 0; i < slides; i++) {
        let bullet = document.createElement("div")
        bullet.classList.add("swiper-bullet");
        swiperPagination.appendChild(bullet)
    }  
}
addPagination()

let swiperBullet = document.querySelectorAll(".swiper-bullet")
let firstBullet = Array.from(swiperPagination.children)[0]
firstBullet.classList.add("swiper-slide-active")
  
// create margin gap for slides 
swiperSlides.forEach(slide => {
    slide.style.marginRight = `${swiperInfo.slideGap / 2 + "px"}`
    slide.style.marginLeft = `${swiperInfo.slideGap / 2 + "px"}`
})
// control swiper width 

let slideTransform = slideWidth + swiperInfo.slideGap;
let bulletsArray = Array.from(swiperPagination.children)
let counter = 0

// stop active 
function stopActiveArrow() {
    if (counter === 0) {
        prev.style.opacity = "50%"
        next.style.opacity = "100%"
    }else if (counter === (bulletsArray.length - 1)) {
        next.style.opacity = "50%"
        prev.style.opacity = "100%"
    }else {
        prev.style.opacity = "100%"
        next.style.opacity = "100%"
    }
}

// bullets click handle 
swiperBullet.forEach(bullet => {
    bullet.addEventListener("click", () => {
        swiperBullet.forEach(item => {
            item.classList.remove("swiper-slide-active");
        })
        bullet.classList.add("swiper-slide-active");
        
        for (let i = 0; i < bulletsArray.length; i++) {
            if (bullet === bulletsArray[i]) {
                let trans = `${"translate3d(" + (-slideTransform * i) + "px" + ", 0px, 0px)"}`;
                swiperWrapper.style.transform = trans
                counter = i
            }
        }
        stopActiveArrow()
    })
})
// create next slide and previous slide 
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
prev.style.opacity = "50%"

function nextSlide() {
    let transMax = `${"translate3d(" + (-slideTransform * (bulletsArray.length - 1)) + "px" + ", 0px, 0px)"}`;
    if (swiperWrapper.style.transform !== transMax && counter < bulletsArray.length) {
        counter += 1
        let transNext = `${"translate3d(" + (-slideTransform * counter) + "px" + ", 0px, 0px)"}`;
            swiperWrapper.style.transform = transNext
            swiperBullet.forEach(bullet => {
                bullet.classList.remove("swiper-slide-active")
            })
            bulletsArray[counter].classList.add("swiper-slide-active") 
            stopActiveArrow()
    }
}

function prevSlide() {
    let transMin = `${"translate3d(" + (-slideTransform * 0) + "px" + ", 0px, 0px)"}`;
    if (swiperWrapper.style.transform !== transMin && counter !== 0) {
        counter = counter - 1
        let transPrev = `${"translate3d(" + (-slideTransform * counter) + "px" + ", 0px, 0px)"}`;
        swiperWrapper.style.transform = transPrev
        swiperBullet.forEach(bullet => {
            bullet.classList.remove("swiper-slide-active")
        })
        bulletsArray[counter].classList.add("swiper-slide-active") 
        stopActiveArrow()
    }
}

next.addEventListener("click", () => { 
    nextSlide() 
})

prev.addEventListener("click", () => {
    prevSlide()
})

// try to create touch swiper 

let xDown = null;

swiperWrapper.addEventListener("touchstart", function(evt) {
    xDown = evt.touches[0].clientX;
});

swiperSlides.forEach(slide => {
    slide.addEventListener("touchend", function(evt) {
        if (xDown === null) {
            return;
        }
        
        let xUp = evt.changedTouches[0].clientX;
        let xDiff = xDown - xUp;
        
        if (xDiff > 0) {
            // Swipe left
           nextSlide()
        } else {
            // Swipe right
            prevSlide()
        }
        
        xDown = null;
    });
})

// create interval slides 
let intervalCounter = 0
let intervalNextOrPrev = true

setInterval(() => {
    if (intervalNextOrPrev === true) {
        nextSlide()
        intervalCounter += 1
        if (intervalCounter === bulletsArray.length - 1) {
            intervalNextOrPrev = false
        }
    }else if (intervalNextOrPrev === false) {
        prevSlide()
        intervalCounter -= 1
    if (intervalCounter === 0) {
        intervalNextOrPrev = true
    }
}
}, 3000)