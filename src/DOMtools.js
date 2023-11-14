// make a function that creates a div, takes an optional argument for the class name, id name, id of the parent div to append to, and text content
export function createDiv(
    className = "",
    idName = "",
    parentID = "",
    textContent = "",
    clearContents = false
) {
    if (clearContents) {
        document.getElementById(parentID).innerHTML = "";
    }
    const div = document.createElement("div");
    div.classList.add(className);
    div.id = idName;
    div.textContent = textContent;
    if (parentID) {
        document.getElementById(parentID).appendChild(div);
    }
    return div;
}
