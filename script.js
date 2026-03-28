
let basket = [];

function addToBasket(item) {
    basket.push(item);
    updateBasket();
}

function updateBasket() {
    const list = document.getElementById("basketList");
    list.innerHTML = "";
    basket.forEach(i => {
        const li = document.createElement("li");
        li.textContent = i;
        list.appendChild(li);
    });
}

function sendRequest() {
    alert("Request sent!");
}
