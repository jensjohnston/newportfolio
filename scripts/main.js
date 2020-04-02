const runScripts = () => {
    /*
    const h1 = document.querySelector(".logo-jens")

    window.addEventListener("scroll", function () {
        const pixels = window.pageYOffset

        const wght = 100 + pixels * 0.4
        const wdth = 100 + pixels * 0.1



        if (h1) {
            h1.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`
        }
    })
*/





    inView('section')
        .on('enter', section => {
            // classList.add is the same as jQuery’s .addClass() method
            // but the vanilla javascript version
            section.classList.add('in-viewport')

        })



        .on('exit', section => {
            section.classList.remove('in-viewport')
        })



    /*
    inView('.lines')
        .on('enter', section => {
            // classList.add is the same as jQuery’s .addClass() method
            // but the vanilla javascript version
            const targets = section.querySelectorAll(".line1, .line2, .line3")
            section.classList.add('in-viewport')
    
            anime({
                targets: targets,
                width: '0%', // -> from '100px' to '100%',
                easing: 'easeInOutQuad',
                direction: 'normal',
                duration: 3000,
            });
    
    
        })
    
    
    
        .on('exit', section => {
            section.classList.remove('in-viewport')
        })*/

    // here we set the class to add only once we have scrolled 0.3 of 
    // our section into the viewport
    inView.threshold(0.3)

    //Pen-line animation
    inView('.waves')
        .on('enter', section => {
            const wavePath = document.querySelector('#wave path')
            const waveOffset = anime.setDashoffset(wavePath)

            wavePath.setAttribute('stroke-dashoffset', waveOffset)
            anime({
                targets: wavePath,
                strokeDashoffset: [0, waveOffset],
                duration: 5000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine',
            });

        })



        .on('exit', section => {
            section.classList.remove('in-viewport')
        })





    //Font "hello Stranger"
    const fontvarationhero = document.querySelector(".fontvarationhero")

    window.addEventListener("scroll", function () {
        const pixels = window.pageYOffset


        const wght = 100 + pixels * 1.6
        const wdth = 100 + pixels * 0.7

        if (fontvarationhero) {
            fontvarationhero.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`
        }

    })





    //Pen-rotation
    anime({
        targets: '#pen',
        translateY: -300,
        direction: 'alternate',
        duration: 50000,
        loop: true,
        easing: 'linear',
        rotate: '1turn',
        complete: 'randomValues'
    });



    //--------MENU--------------
    $('.menu-open').on('click', function () {
        $('.menu').addClass('open')
        $('body').addClass('no-scroll')
        /* $('.top').addClass('hide')*/

        return false
    })

    $('.menu-close').on('click', function () {
        $('.menu').removeClass('open')
        $('body').removeClass('no-scroll')
        /* $('.top').removeClass('hide') */

        return false
    })

    //smooth scroll

    // grab all the anchor tags on the page
    const anchors = document.querySelectorAll('a')
    // loop over them
    anchors.forEach(anchor => {
        // listen for clicks on each one
        anchor.addEventListener('click', event => {
            // grab the href attribute
            const href = anchor.getAttribute('href')
            // if the href starts with a #
            if (href.charAt(0) === '#') {
                // stop the default action
                event.preventDefault()
                // find the element the href points to and scroll it into view
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })


    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }

    //scroll to top

    $("a[href='#top']").on("click", function () {
        document.body.scrollIntoView({ block: "start", behavior: "smooth" })
        return false
    })


}

runScripts()


const bodyTag = document.querySelector("body")

const wiper = document.createElement("div")
wiper.classList.add("wiper")


const wiperHolder = document.createElement("div")
const wiperText = document.createElement("h2")
wiperText.innerHTML = "data-title"

wiperHolder.appendChild(wiperText)

wiper.appendChild(wiperHolder)

bodyTag.appendChild(wiper)

barba.use(barbaPrefetch)

barba.init({
    debug: true,
    transitions: [
        {

            leave({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        defaults: {
                            duration: 1
                        },
                        onComplete() {
                            runScripts()
                            current.container.remove()
                            resolve()
                        }
                    })

                    const navigation = current.container.querySelectorAll(".top, .menu")
                    const sectionbarba = current.container.querySelectorAll("section")

                    timeline
                        .set(wiper, { x: "-100%" })
                        .set(wiperText, { y: "100%" })
                        .to(navigation, { opacity: 0 }, 0)
                        .to(sectionbarba, { x: 0, opacity: 0 }, { x: 500, opacity: 0 }, 0)
                        .to(wiper, { x: 0 })
                })
            },

            beforeEnter({ current, next, trigger }) {
                wiperText.innerHTML = next.container.getAttribute("data-title")

                window.scrollTo({
                    top: 0

                })


                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            resolve()
                        }
                    })

                    timeline
                        .to(wiperText, { y: 0 }, 0)
                        .to(wiperText, { y: "100%" }, 1)

                })
            },

            enter({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            runScripts()
                            resolve()
                        }
                    })

                    const navigation = next.container.querySelectorAll(".top, .menu")
                    const sectionbarba = next.container.querySelectorAll("section")

                    timeline

                        .set(navigation, { opacity: 0 })
                        .set(sectionbarba, { opacity: 0.25, x: -500 })
                        .to(navigation, { opacity: 1 }, 0)
                        .to(sectionbarba, { opacity: 1, x: 0 }, 0)
                        .to(wiper, { x: "100%" }, 0)


                })
            }

        }
    ],
    views: []
})
