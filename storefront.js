const url = "https://mock-data-api.firebaseio.com/webb21/products.json"

// tracks the total amount
let sumOfPurchase = 0


const totalSpent = document.getElementById("totalSpent")
const parent = document.getElementById("parent")
const input = document.getElementById("input")

totalSpent.innerText = `total: ${sumOfPurchase}`

function fetchApi() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderOutList(data)
        })
}
function renderOutList(data) {
    const filter = document.getElementById("filterOut")
    data.forEach(item => {
        renderOutItems(item)
    })
    filter.addEventListener("click", function () {
        if (!input.value || input.value == 0) {
            document.getElementById("parent").innerHTML = ""
            data.forEach(item => {
                renderOutItems(item)
            })
        } else if (input.value > 0) {
            document.getElementById("parent").innerHTML = ""
            const filterOut = data.filter(item => {
                return input.value <= item.rating
            })
            filterOut.forEach(item => {
                renderOutItems(item)
            })


        }
    })

}
function renderOutItems(item) {
    const wrapper = document.createElement("div")
    wrapper.append(printdescriptionItem(item))
    wrapper.append(printOutImages(item))
    wrapper.append(printOutPrice(item))
    wrapper.append(printOutRating(item))
    wrapper.append(printOutStock(item))
    wrapper.append(printOutBuyButton(item))
    wrapper.append(printOutLine())
    parent.append(wrapper)


}
function printOutImages(item) {
    const img = document.createElement("img")
    img.addEventListener("click", function () {
        printOutTotalSpent(item)
        printOutShoppingCart(item)
        const shopping = document.getElementById("shopping")
        shopping.innerText = "Varukorg"
    })
    img.alt = item.images[0].alt
    img.src = item.images[0].src.small
    return img

}
function printOutBuyButton(item) {
    const button = document.createElement("button")
    button.innerText = "K??p"
    button.addEventListener("click", function () {
        printOutTotalSpent(item)
        printOutShoppingCart(item)
        const shopping = document.getElementById("shopping")
        shopping.innerText = "Varukorg"
    })
    return button

}
function printOutShoppingCart(item) {
    const shoppingCart = document.getElementById("shoppingCart")
    const purchase = document.createElement("p")
    purchase.innerText = `${item.name} ${item.price} sek`
    shoppingCart.append(purchase)
}
function printOutTotalSpent(item) {
    sumOfPurchase += item.price
    document.getElementById("totalSpent")
    totalSpent.innerText = `total: ${sumOfPurchase}`
}
function printdescriptionItem(item) {
    const description = document.createElement("h2")
    description.innerText = item.description
    return description

}
function printOutPrice(item) {
    const price = document.createElement("p")
    price.innerText = `${item.name}: ${item.price} sek`
    return price
}
function printOutRating(item) {
    const rating = document.createElement("p")
    rating.innerText = `Rating of ${item.name}: ${item.rating}/5 Unicorns`
    return rating

}
function printOutStock(item) {
    const stock = document.createElement("p")
    stock.innerText = `Stock: ${item.stock}`
    return stock
}
function printOutLine() {
    const line = document.createElement("hr")
    return line
}
fetchApi()
