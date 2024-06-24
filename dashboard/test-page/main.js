const menu = document.querySelector(".hamburgerMenu");
const items = document.querySelector(".otherItems");
let active = false;

window.addEventListener('resize', () => {
    if(window.innerWidth >= 600) {
        items.style.height = "100%";
    } else {
        active = false;
        checkMenu();
    }
});

function checkMenu() {
    if(active == false) {
        items.style.height = `${items.childNodes.length * 25}px`;
        console.log(items.children.length * 50)
        active = true;
        document.querySelector(".line:nth-child(1)").style.transform = "translateY(400%) rotate(45deg)";
        document.querySelector(".line:last-child").style.transform = "translateY(-300%) rotate(-45deg)";
        document.querySelector(".line:nth-child(2)").style.transform = "scale(0, 1)";
    } else {
        items.style.height = "0";
        active = false;
        document.querySelector(".line:nth-child(1)").style.transform = "";
        document.querySelector(".line:last-child").style.transform = "";
        document.querySelector(".line:nth-child(2)").style.transform = "scale(1, 1)";
    }
}

menu.addEventListener("click", () => {
    checkMenu()
});

window.addEventListener("click", (e) => {
    if (active && !items.contains(e.target) && e.target !== document.querySelector(".line") && e.target !== menu) {
        checkMenu()
    }
});