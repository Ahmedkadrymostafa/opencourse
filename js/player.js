let videoList ;
let iframe = document.getElementById("video");
const listContainer = document.querySelector(".video-list-container")
const nextBtn = document.getElementById("next-control")
const prevBtn = document.getElementById("prev-control")
const loadBtn = document.getElementById("more");
const stopBtn = document.getElementById("stop-control")
const playPauseBtn = document.getElementById("play-pause-control");
let vidTitle = document.querySelector(".main-vid-title")
let durationElement = document.getElementById("duration")
let likesElement = document.getElementById("likes")
let viewsElement = document.getElementById("views")
let channelTitleElement = document.querySelector(".channel-title p")
let videoPlayerContainer = document.getElementById("video-player-container")
let videoSort = 0

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(this.responseText))
            }else {
                reject(console.log(Error("No Data Found")))
            }
        }
        request.open('GET', url);
        request.send();
    })
}

function createList(e) {
    let items = e.items
        items.forEach(item => {
            let title = item.snippet.title
            let id = item.snippet.position
            let videoId = item.snippet.resourceId.videoId

            let videoElement = document.createElement("div")
            videoElement.classList.add("list")
            videoElement.setAttribute("link", `${videoId}`)
            let videoDetails = document.createElement("div")
            videoDetails.classList.add("video-details")
            let listTitle = document.createElement("h3")
            listTitle.classList.add("list-title")
            listTitle.textContent = title

            videoDetails.appendChild(listTitle)
            videoElement.appendChild(videoDetails)

            let videoInfo = document.createElement("div")
            videoInfo.classList.add("video-info")
            let videoSort = document.createElement("div")
            videoSort.classList.add("video-sort")
            let hashIcon = document.createElement("i")
            hashIcon.className = "fa-solid fa-hashtag"
            let par = document.createElement("p")
            par.className = "video-number"
            par.textContent = id + 1

            videoSort.appendChild(hashIcon)
            videoSort.appendChild(par)
            videoInfo.appendChild(videoSort)
            videoElement.appendChild(videoInfo)
            
            listContainer.insertAdjacentElement("beforeend", videoElement)
            
        });
}

let playListId = videoPlayerContainer.getAttribute("playListId")
fetchData(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=500&playlistId=${playListId}&key=AIzaSyBUqYOjstBPPkuiaMjHerv9hPFYYudWo3Y`).then(
    (result) => {
        createList(result)
        setActive()       
        let pageToken = result.nextPageToken
        function getNextPage() {
            let requestNextPage = new XMLHttpRequest();
                    requestNextPage.open('GET', `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&part=id&maxResults=500&playlistId=${playListId}&pageToken=${pageToken}&key=AIzaSyBUqYOjstBPPkuiaMjHerv9hPFYYudWo3Y`)
                    requestNextPage.send();

                    requestNextPage.onload = () => {
                        if (requestNextPage.readyState === 4 && requestNextPage.status === 200) {
                            let nextPageData = JSON.parse(requestNextPage.responseText)

                            createList(nextPageData)
                            pageToken = nextPageData.nextPageToken
                            
                            if (pageToken !== undefined) { 
                                getNextPage();
                            }
                            if (pageToken === undefined) {
                                setActive();
                            }
                        }
                    }
                    
        }      

        if (pageToken !== undefined) {
            loadBtn.addEventListener('click', () => {              
                getNextPage()
                loadBtn.style.display = 'none';
            })
        }
    }
).then(() => {
    controller()
    // this function gets called when API is ready to use
    let player;
    function onYouTubePlayerAPIReady() {
        // create the global player from the specific iframe (#video)
        player = new YT.Player('video', {
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
    onYouTubePlayerAPIReady()
    
    function onPlayerReady(event) {
        playPauseBtn.addEventListener("click", () => {
            let state = player.getPlayerState();
            if (state === 1) {
                player.pauseVideo();                
            }else {
                player.playVideo();                
            }
        })
        
        stopBtn.addEventListener("click", () => {
            player.stopVideo();
        });
    
        iframe.addEventListener("load", () => {
            vidTitle.innerHTML = player.videoTitle;
            const fetchPlayerData = () => {
                return new Promise((res, rej) => {
                    let requestData = new XMLHttpRequest();
                    let requestUrl = `https://www.googleapis.com/youtube/v3/videos?id=${player.getVideoData().video_id}&key=AIzaSyBUqYOjstBPPkuiaMjHerv9hPFYYudWo3Y&part=snippet,statistics`
                    requestData.onload = () => {
                        if (requestData.status === 200 && requestData.readyState === 4) {
                            res(JSON.parse(requestData.responseText));
                        }else {
                            rej(console.log(Error("not found")));
                        }
                    }
                    requestData.open('GET', requestUrl);
                    requestData.send();
                })
            }
            
            fetchPlayerData().then((response) => {
                let channelTitle = response.items[0].snippet.channelTitle;
                let viewsNum = response.items[0].statistics.viewCount;
                let likesNum = response.items[0].statistics.likeCount
                channelTitleElement.innerHTML = channelTitle
                likesElement.innerHTML = likesNum
                viewsElement.innerHTML = viewsNum
                
            })
            const durationInSeconds = parseInt(player.getDuration());
            // Calculate the duration in hours, minutes, and seconds
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds - (hours * 3600)) / 60);
            const seconds = durationInSeconds - (hours * 3600) - (minutes * 60);
            let duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            durationElement.innerHTML = duration;
        })
    }
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})

function setActive() {

    videoList = document.querySelectorAll(".video-list-container .list")
    videoList.forEach(remove =>{remove.classList.remove('active')});
    videoList[videoSort].classList.add('active');
    let videoSrc = `https://www.youtube.com/embed/${videoList[videoSort].getAttribute("link")}?enablejsapi=1&rel=0&amp;controls=1&amp&amp;showinfo=0&amp;modestbranding=1`    
    iframe.src = videoSrc

    videoList.forEach(vid =>{
        vid.onclick = () =>{
           for (let i = 0; i < videoList.length; i++) {
             if (vid === videoList[i]) {
                 videoSort = i
                 setActive()                 
             }
           }
        };
     });  

     if (videoList.length < 50) {
        loadBtn.style.display = 'none';
     }
}
    
function controller() {
    nextBtn.addEventListener("click", () => {
        if (videoSort >= 0 && videoSort < videoList.length - 1) {
            videoSort ++
            setActive()
        }
    })
    prevBtn.addEventListener("click", () => {
        if (videoSort > 0 && videoSort < videoList.length) {
            videoSort --
            setActive()
        }
    })
}


function setIframeHeight() {
    let iframeWidth = iframe.getBoundingClientRect().width
    iframe.style.height = `${(iframeWidth * 0.56) + "px"}`
}
setIframeHeight()
window.addEventListener("resize", () => {
    setIframeHeight()
})
