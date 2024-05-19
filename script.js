const MENU = document.getElementById("menu")
const CART_BTN = document.getElementById("cart-btn")
const CART_MODAL = document.getElementById("cart-modal")
const CART_ITEMS_CONTAINER = document.getElementById("cart-items")
const CART_TOTAL = document.getElementById("cart-total")
const CHECKOUT_BTN = document.getElementById("checkout-btn")
const CLOSE_MODAL_BTN = document.getElementById("close-modal-btn")
const CART_COUNTER = document.getElementById("cart-count")
const ADDRESS_INPUT = document.getElementById("address")
const ADDRESS_WARN = document.getElementById("address-warn")

let cart = []

CART_BTN.addEventListener("click", () => {
    updateCartModal()
    CART_MODAL.style.display = "flex"
})

CART_MODAL.addEventListener("click", (event) => {
    if (event.target == CART_MODAL) {
        CART_MODAL.style.display = "none"
    }
})

CLOSE_MODAL_BTN.addEventListener("click", () => {
    CART_MODAL.style.display = "none"
})

MENU.addEventListener("click", (event) => {
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const NAME = parentButton.getAttribute("data-name")
        const PRICE = parseFloat(parentButton.getAttribute("data-price"))
        
        addToCart(NAME, PRICE)
    }
})

function addToCart(name, price) {
    
    const EXISTING_ITEM = cart.find(item => item.name == name)

    if (EXISTING_ITEM) {
        EXISTING_ITEM.quantity += 1
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        })    
    }

    updateCartModal()
}

function updateCartModal() {
    CART_ITEMS_CONTAINER.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const CART_ITEM_ELEMENT = document.createElement("div")
        CART_ITEM_ELEMENT.classList.add("flex", "justify-between", "mb-4", "flex-col")

        CART_ITEM_ELEMENT.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

            <button class="remove-from-cart-btn" data-name="${item.name}">Remover<button>
                
            </div>
        `

        total += (item.price * item.quantity)



        CART_ITEMS_CONTAINER.appendChild(CART_ITEM_ELEMENT)
    })

    CART_TOTAL.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    CART_COUNTER.innerText = cart.length
}

CART_ITEMS_CONTAINER.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const NAME = event.target.getAttribute("data-name")
        
        removeItemFromCart(NAME)
    }
})

function removeItemFromCart(name) {
    const INDEX = cart.findIndex(item => item.name == name)

    if (INDEX != -1) {
        const ITEM = cart[INDEX]

        if (ITEM.quantity > 1) {
            ITEM.quantity -= 1
            updateCartModal()
            return
        }

    cart.splice(INDEX, 1)
    updateCartModal()    
    }
}

ADDRESS_INPUT.addEventListener("input", (event) => {
    let inputValue = event.target.value

    if (inputValue != ""){
        ADDRESS_WARN.classList.add("hidden")
    }

})

CHECKOUT_BTN.addEventListener("click", () => {

    const IS_OPEN = checkAvailability()
    if (!IS_OPEN){
        alert("ERRO! O RESTAURANTE ESTÁ FECHADO!")
        return
    }

    if (cart.length == 0)  return

    if (ADDRESS_INPUT.value == "") {
        ADDRESS_WARN.classList.remove("hidden")
        return
    } 

    const CART_ITEMS = cart.map((item) => {
        return(
            `${item.name} Quantidade: (${item.quantity})  Preço: R$ ${item.price} |`
        )
    }).join("")


    const MESSAGE = encodeURIComponent(CART_ITEMS)
    const PHONE = "+55 21968484554"

    window.open(`https://wa.me/${PHONE}?text=${MESSAGE} Endereço: ${ADDRESS_INPUT.value}`, "_blank")

    cart.length = 0
    updateCartModal()
})

function checkAvailability() {
    const DATA = new Date()
    const HORA = DATA.getHours()
    return HORA >= 18 && HORA < 23.59
}

const SPAN_ITEM = document.getElementById("date-span")
const IS_OPEN = checkAvailability()

if (IS_OPEN) {
    SPAN_ITEM.classList.remove("bg-red-500")
    SPAN_ITEM.classList.add("bg-green-600")
} else {
    SPAN_ITEM.classList.remove("bg-green-600")
    SPAN_ITEM.classList.add("bg-red-500")
}