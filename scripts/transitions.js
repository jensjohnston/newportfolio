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
            name: "next",
            custom({ current, next, trigger }) {
                return trigger.classList && trigger.classList.contains("next")
            },
            leave({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        defaults: {
                            duration: 1
                        },
                        onComplete() {
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
                        .to(sectionbarba, { opacity: 0 }, 1)
                        .to(wiper, { x: 0 })
                })
            },

            beforeEnter({ current, next, trigger }) {
                wiperText.innerHTML = next.container.getAttribute("data-title")

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
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
