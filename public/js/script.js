function onClick_take_note(elem){
    document.getElementById("take-note").style.display = "none";
    document.getElementById("form").style.display = "block"
    document.getElementById("title").select();
}

function onClick_submit(elem){
    document.getElementById("take-note").style.display = "block";
    document.getElementById("form").style.display = "none";
}

function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (25+element.scrollHeight)+"px";
}

function hide_div(elem){
    elem.remove();
}