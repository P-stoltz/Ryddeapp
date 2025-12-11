async function getfamilymembers() {
        const familySelect = document.getElementById("familySelect");
        const response = await fetch('/getfamilymember');

        const familymembers = await response.json();
        familySelect.innerHTML = '';
        const option = document.createElement('option');
        option.classList.add('memberList');
        option.textContent = "None";
        option.value = '0';
        familySelect.appendChild(option);
        for (let member of familymembers) {
            const option = document.createElement('option');
            option.classList.add('memberList');
            option.textContent = member.name;
            option.value = member.id;
            option.dataset.image = member.profile_picture;
            familySelect.appendChild(option);
        }
};

document.getElementById("familySelect").addEventListener("click", async function() {
    memberId = document.getElementById('familySelect').value;
    const pfpLi = document.getElementById('pfp-li');
    const nameSpan = document.getElementById('currentUser');
    switch(memberId){
        case "0":
            const oldImg0 = document.querySelector('.personImage');
            if(oldImg0) oldImg0.remove();
            break;
        case "1":
            const oldImg1 = document.querySelector('.personImage');
            if(oldImg1) oldImg1.remove();
            pfp = document.createElement('img');
            pfp.classList.add('personImage');
            pfp.src = 'images/son.jpg';
            pfpLi.appendChild(pfp)
            nameSpan.textContent = (await getUsername()).data.name;
            break;

        case "2":
            const oldImg2 = document.querySelector('.personImage');
            if(oldImg2) oldImg2.remove();
            pfp = document.createElement('img');
            pfp.classList.add('personImage');
            pfp.src = 'images/daughter.jpg';
            pfpLi.appendChild(pfp)
            nameSpan.textContent = (await getUsername()).data.name;
            break;
        
        case "3":
            const oldImg3 = document.querySelector('.personImage');
            if(oldImg3) oldImg3.remove();
            pfp = document.createElement('img');
            pfp.classList.add('personImage');
            pfp.src = 'images/dad.jpg';
            pfpLi.appendChild(pfp)
            nameSpan.textContent = (await getUsername()).data.name;
            break;
        
        case "4":
            const oldImg4 = document.querySelector('.personImage');
            if(oldImg4) oldImg4.remove();
            pfp = document.createElement('img');
            pfp.classList.add('personImage');
            pfp.src = 'images/mom.jpg';
            pfpLi.appendChild(pfp);
            nameSpan.textContent = (await getUsername()).data.name;
            break;
    }
});

async function getTasks() {
    const response = await fetch('/getTasks');
    const tasks = await response.json();

    const select = document.getElementById("taskSelect");
    select.innerHTML = "";

    const defaultOpt = document.createElement('option');
    defaultOpt.textContent = "Choose task";
    defaultOpt.value = "0";
    select.appendChild(defaultOpt);

    for (let t of tasks) {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.title;
        opt.dataset.points = t.points;
        select.appendChild(opt);
    }
}

document.getElementById("taskSelect").addEventListener("change", () => {
    const select = document.getElementById("taskSelect");
    const points = select.options[select.selectedIndex].dataset.points || "";
    document.getElementById("taskPoints").textContent = points ? `${points} points` : "";
});

document.getElementById("finishTaskBtn").addEventListener("click", async () => {
    const familyId = parseInt(document.getElementById('familySelect').value);
    const taskId = parseInt(document.getElementById('taskSelect').value);

    if (familyId === 0 || taskId === 0) {
        alert("Choose both family member and task!");
        return;
    }

    const res = await fetch('/addFinishedTask', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ familyId, taskId })
    });

    if (res.ok) {
        alert("Task saved!");
    } else {
        alert("Error saving task");
    }
});



getTasks();
getfamilymembers();