async function loadFinishedTasks() {
    const response = await fetch('/getAllFinishedTasks');
    const tasks = await response.json();

    const container = document.getElementById("taskTableContainer");

    let html = `
        <table class="taskTable">
            <tr>
                <th>Family Member</th>
                <th>Task</th>
                <th>Points</th>
                <th>Date</th>
            </tr>
    `;

    for (let t of tasks) {
        html += `
            <tr>
                <td>${t.family_name}</td>
                <td>${t.task_title}</td>
                <td>${t.points}</td>
                <td>${t.datetime}</td>
            </tr>
        `;
    }

    html += `</table>`;

    container.innerHTML = html;
}

async function loadLeaderboard() {
    const res = await fetch('/leaderboard');
    const json = await res.json();   // grab the full JSON object
    const data = json.data;          // grab the array inside

    const container = document.getElementById("leaderboard");

    let html = `
        <h3 class="centerText">Leaderboard</h3>
        <table class="leaderboardTable">
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Points</th>
            </tr>
    `;

    data.forEach((person, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${person.name}</td>
                <td>${person.total_points ?? 0}</td>
            </tr>
        `;
    });

    html += `</table>`;

    container.innerHTML = html;
}


loadLeaderboard();


document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("taskTableContainer")) {
        loadFinishedTasks();
    }
});
