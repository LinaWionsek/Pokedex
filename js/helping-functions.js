function disableScroll() {
    document.body.classList.add("remove-scrolling");
}


function enableScroll() {
    document.body.classList.remove("remove-scrolling");
}


function fixNumber(nr) {
    let fix = nr.toFixed(2);
    return fix;
}