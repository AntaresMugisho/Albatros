

// +--------------------------------+
// | Auto update footer years       |
// +--------------------------------+

let start_year = 2022
let years_label = document.querySelector(".years")
let year = (new Date).getFullYear()

// If user time is incorrect, then use UTC time
if (year < start_year){
    year = (new Date).getUTCFullYear()
}

if (year == start_year){
    years_label.innerText = start_year
}
else{
    years_label.innerText = `${start_year} - ${year}`
}

// +--------------------------------+
// | Show/Hide navmenu on mobile    |
// +--------------------------------+

// Humburger menu toggle on mobile
const humburger = document.querySelector(".humburger")


humburger.addEventListener("click", toggle_menu)

function toggle_menu(){
    const navmenu = document.querySelector(".nav-menu")
    navmenu.classList.toggle("nav-menu--show")
    humburger.classList.toggle("bi-list")
    humburger.classList.toggle("bi-x")
}

// Hide navmenu when clicking on a link of navmenu
const nav_links = document.getElementsByClassName("nav-link")
for (const nav_link of nav_links){
    nav_link.addEventListener("click", toggle_menu)
}


// +--------------------------------+
// | Update active navlink onscroll |
// +--------------------------------+

let options = {
    // root: null,
    rootMargin: "-100px 0px",
    treshhold: .5
}

const observer = new IntersectionObserver(handleIntersect, options);

// Animations
const observables = document.querySelectorAll(".obs")
observables.forEach(observable => {
    if (observable.classList.contains("obs")){
        observable.classList.add("obs--hide")
    }
    observer.observe(observable)
})

// Observe sections to show active navlink
const sections = document.querySelectorAll("[id]")
sections.forEach(section => {
    observer.observe(section)
})

function handleIntersect(entries, observer){

    entries.forEach(entry => {

         // Manage observables small elements for animation
         if (entry.target.classList.contains("obs")){
            if (entry.isIntersecting){
                entry.target.classList.remove("obs--hide")
            }
            else{
                entry.target.classList.add("obs--hide")
            }
        }

        // Manage sections intersecting
        if (entry.target.attributes["id"] !== undefined){
            if (entry.isIntersecting){
                for (const nav_link of nav_links){
                    nav_link.classList.remove("active")
                    if (entry.target.attributes["id"].value === nav_link.hash.replace("#", "")){
                        nav_link.classList.add("active")
                    }
                }
            }
        }
    })
}