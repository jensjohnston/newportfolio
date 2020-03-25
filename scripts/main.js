const h1 = document.querySelector(".logo-jens")

window.addEventListener("scroll", function () {
    const pixels = window.pageYOffset

    const wght = 100 + pixels * 0.4
    const wdth = 100 + pixels * 0.1

    h1.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`
})







inView('.section')
    .on('enter', section => {
        // classList.add is the same as jQuery’s .addClass() method
        // but the vanilla javascript version
        section.classList.add('in-viewport')
    })
    .on('exit', section => {
        section.classList.remove('in-viewport')
    })

// here we set the class to add only once we have scrolled 0.2 of 
// our section into the viewport
inView.threshold(0.3)









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





const wavePath = document.querySelector('#wave path')
const waveOffset = anime.setDashoffset(wavePath)

wavePath.setAttribute('stroke-dashoffset', waveOffset)
anime({
    targets: wavePath,
    strokeDashoffset: [0, waveOffset],
    duration: 10000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
})


anime({
    targets: '#el',
    translateY: -500,
    direction: 'alternate',
    duration: 100000,
    loop: true,
    easing: 'linear',
    rotate: '1turn',
    complete: 'randomValues'
});


