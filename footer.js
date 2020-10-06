let xhrFooter = new XMLHttpRequest();

function get_footer() {
    let footer = document.querySelector("footer");
    xhrFooter.open('GET', "footer_text.html", true);
    xhrFooter.send(null);

    xhrFooter.onload = function(){
        if (xhrFooter.status==200){
            footer.innerHTML = xhrFooter.responseText;
        }
    }
}

get_footer();