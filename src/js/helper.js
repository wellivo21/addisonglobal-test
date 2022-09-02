/**
 * 
 * @param {string} elementClass This will be a string with the element class (without the dot).
 * @param {string} addOrRemove Another string for adding or removing the said class ("add" or "remove" respectively).
 */
export const addOrRemoveHidden = function(elementClass, addOrRemove) {
    const elements = document.querySelectorAll(`.${elementClass}`);

    if (addOrRemove === "add") {
        console.log(elements)
        elements.forEach((element) => element.classList.add("hidden"))
    }
    else if (addOrRemove === "remove") {
        console.log(elements)
        elements.forEach((element) => element.classList.remove("hidden"))
    }
}

