const h1 = document.querySelector(".logo-jens")

window.addEventListener("scroll", function () {
    const pixels = window.pageYOffset

    const wght = 100 + pixels * 0.4
    const wdth = 100 + pixels * 0.1

    h1.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`
})






/*const headerTags = document.querySelectorAll(".lag")
const random = "abcdefghijklmnopqrstuvwxyz–./\[]*+£$ ".split("")


const runRandom = (tag) => {
    const originalContent = tag.dataset.original

    let newContent = ""
    let num = 0

    let addInterval = setInterval(() => {
        newContent = originalContent.slice(0, num)
        num = num + 1

        if (tag.innerHTML == originalContent) {
            clearInterval(randomInterval)
            clearInterval(addInterval)
            tag.innerHTML = originalContent
        }
    }, 100)

    let randomInterval = setInterval(() => {
        tag.innerHTML = newContent

        for (let i = newContent.length; i < originalContent.length; i++) {
            tag.innerHTML += random[Math.floor(Math.random() * random.length)]
        }
    }, 50)
}

let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
            runRandom(entry.target)
        }
    })
}, {
    threshold: [0.0, 0.5, 1.0]
})

headerTags.forEach(h1 => {
    h1.dataset.original = h1.innerHTML
    observer.observe(h1)
})*/


// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 100;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}