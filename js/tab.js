
const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')
const tabMenu = document.getElementsByClassName("tab__menu")[0]

let tabsPane = tabMenu.getElementsByTagName("li");

for (let i = 0; i < tabsPane.length; i++) {
  tabsPane[i].addEventListener("click", function(){
    tabMenu.getElementsByClassName("active")[0].classList.remove("active");
    tabsPane[i].classList.add("active")
  })  
}

targets.forEach(target =>{

  target.addEventListener("click", ()=>{
    content.forEach(c =>{
      c.classList.remove('active')
    })
    const t = document.querySelector(target.dataset.target)
    t.classList.add('active')
  })
})