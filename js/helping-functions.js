function fixNumber(nr) {
    let fix = nr.toFixed(2);
    return fix;
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (const element of includeElements) {
        const file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}