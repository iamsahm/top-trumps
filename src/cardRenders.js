export function showCard(card, divName) {
    const hand = document.getElementById(divName);
    hand.innerHTML = "";
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const title = document.createElement("h3");
    title.textContent = card.name;
    title.classList.add("card-title");
    cardDiv.appendChild(title);
    const attributes = document.createElement("div");
    attributes.classList.add("attributes");
    for (let i = 1; i < Object.keys(card).length - 1; i++) {
        const attribute = Object.keys(card)[i];
        const attributeDiv = document.createElement("div");
        const attributeNameDiv = document.createElement("div");
        attributeNameDiv.textContent = attribute;
        attributeNameDiv.classList.add("attribute-name");
        attributeDiv.appendChild(attributeNameDiv);
        const attributeValueDiv = document.createElement("div");
        attributeValueDiv.textContent = card[attribute];
        attributeValueDiv.classList.add("attribute-value");
        attributeDiv.appendChild(attributeValueDiv);
        attributeDiv.classList.add("attribute");
        attributes.appendChild(attributeDiv);
    }
    cardDiv.appendChild(attributes);
    const fact = document.createElement("p");
    fact.textContent = card.fact;
    fact.classList.add("fact");
    fact.setAttribute("id", `${divName}-fact`);
    cardDiv.appendChild(fact);
    hand.appendChild(cardDiv);
}

export function adjustFontSize(containerID) {
    const container = document.getElementById(containerID);
    const maxHeight = container.offsetHeight;
    while (container.scrollHeight > maxHeight) {
        let style = window
            .getComputedStyle(container, null)
            .getPropertyValue("font-size");
        let fontSize = parseFloat(style);
        container.style.fontSize = fontSize - 2 + "px";
    }
}
