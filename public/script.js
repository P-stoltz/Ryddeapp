const menuBtn = document.getElementById("menuButton");
const menu = document.getElementById("sidemenu");

// OPEN / CLOSE menu by clicking button
menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuBtn.classList.toggle("active");
});

function getCurrentId(){
    return parseInt(currentId = document.getElementById('familySelect').value, 10);
};

async function getUsername(){
    const username = await fetch('/getFamilyMemberById', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: getCurrentId()})
    });
    return await username.json();
}

// CLOSE when clicking outside
document.addEventListener("click", (e) => {
    const clickedInsideMenu = menu.contains(e.target);
    const clickedButton = menuBtn.contains(e.target);

    if (!clickedInsideMenu && !clickedButton) {
        menu.classList.remove("active");
        menuBtn.classList.remove("active");
    }
});



/*
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("familySelect")
    const current = document.getElementById("currentMember")


})*/

