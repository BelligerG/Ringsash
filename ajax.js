var xhr = new XMLHttpRequest();

var total_time = 500; //ms
var time_interval = 10; //ms
var opacity_interval = (1/total_time) * time_interval;

var navlist;

var ajax_transfer = function(e, val){
    /** Asynchronously transfers the content of the clicked menu item to the current page 
    This then fades out the previous page's content, fades in the new page, changes the active
    menu item and adds the previous page to the history. */
    e.preventDefault();
    let url = val.href;

    let mnavdark = document.getElementById("mnavdark");
    let img = document.getElementById("hamburger");
    
    xhr.open('GET', url, true);
    xhr.send(null);

    xhr.onload = function(){
        if (xhr.status==200){
            let divStart  = xhr.responseText.indexOf("<div id=\"content\">");
            let divEnd  = xhr.responseText.indexOf("<!-- End of content -->");
            let newContent = xhr.responseText.substr(divStart+18, (divEnd-(divStart+18))-7);

            let content = document.getElementById("content");

            let func = function(){}
            if (url.includes('index')){
                func = initMap;
            }

            fade(1, content, function(){
                content.innerHTML = newContent;
                fade(0, content, func);
                });
            
            
            navlist.forEach(function(element){
                element.classList.remove("active");
            });
            if (mnavdark !== null && mnavdark.getAttribute("class") === "mobile"){
                clickedMenu();
                img.src = "images/hamburger.png";
            }
            val.classList.add("active");
            history.pushState(null, null, url);
        }
    }
}


function fade(opacity, content_box, callback) {
    /** Fade the content box out or in then use the callback function when the timer's finished. */
    opacity_interval *= -1;
    let timer = setInterval(function() {
        if (opacity < 0 || opacity > 1){
            clearInterval(timer);
            callback();
        }
        content_box.style.opacity = opacity;
        opacity += opacity_interval;
    }, time_interval);
}


function nodelistEvent(nodelist){
    /** Adds an event listener to each menu item, then calls an ajax transfer for new content on the page. */
    for (let nodenum = 0; nodenum < nodelist.length; nodenum++){
        nodelist[nodenum].addEventListener("click", function(e){
            ajax_transfer(e, this);
        })
    }
}

window.onload = function(){
    navlist = document.querySelectorAll("nav a");
    nodelistEvent(navlist);
}

window.onpopstate = function() {
    window.location.href = document.location.href;
}