import { addOrRemoveHidden } from "./helper.js"

const navBtnClick = function() {
    const allPromotionsBtn = document.querySelector(".all-promotions");
    const newCustomersBtn = document.querySelector(".new-customers");

    allPromotionsBtn.addEventListener("click", () => {
        newCustomersBtn.classList.remove("active");
        allPromotionsBtn.classList.add("active")

        // removing ".hidden" from ".not-exclusive-promo"
        addOrRemoveHidden("not-exclusive-promo", "remove")

    })
    newCustomersBtn.addEventListener("click", () => {
        allPromotionsBtn.classList.remove("active");
        newCustomersBtn.classList.add("active")

        // adding ".hidden" from ".not-exclusive-promo"
        addOrRemoveHidden("not-exclusive-promo", "add")
    })
}

const cardInfo = async function() {
    try {
        const res = await fetch("http://www.mocky.io/v2/5bc3b9cc30000012007586b7");
        const data = await res.json()
        return data
    } catch(error) {
        return false
    }
}

const generatingCards = async function() {
    const mainElement = document.querySelector("main");

    try {
        const cardsData = await cardInfo()
        if (!cardsData) {
            const errorMarkup = 
                `
                <article class="error-message">
                    <h1>Could not fetch cards data. Please try again later.</h1>
                </article>
                `
            mainElement.insertAdjacentHTML("beforeend", errorMarkup)

            throw new Error("Could not fetch cards data.")
        }

        const sortedCardsData = cardsData.slice().sort((a, b) => a.sequence - b.sequence)
        sortedCardsData.forEach((data) => {
            const {description, heroImageUrl, id, joinNowButtonText, name, onlyNewCustomers, termsAndConditionsButtonText} = data 

            const cardMarkup = 
                `
                <article class='card ${onlyNewCustomers ? "" : "not-exclusive-promo"}' id="${id}">
                    <img src="${heroImageUrl}" alt="Random image.">
                    <h1>${name}</h1>
                    <p>${description}</p>
            
                    <ul class="card-buttons">
                        <li>
                            <button class="card-btn">${termsAndConditionsButtonText}</button>
                        </li>
                        <li>
                            <button class="card-btn">${joinNowButtonText}</button>
                        </li>
                    </ul>
                </article>    
                `

            mainElement.insertAdjacentHTML("beforeend", cardMarkup)
        })

    } catch(error) {
        console.log(error.message)
    }
}

const init = async function() {
    generatingCards();
    navBtnClick();
}

init()


