const express = require('express');
const app = express();
const Database = require('better-sqlite3');
const db = new Database('ryddeapp.db');

// Serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Hent startside
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/getfamilymember', (req, res) => {
    const rows = db.prepare('SELECT * FROM familymember ORDER BY id ASC').all();
    res.json(rows, {success: true});
});

app.get('/getTasks', (req, res) => {
    const rows = db.prepare('SELECT * FROM tasks ORDER BY id ASC').all();
    res.json(rows); 
});

// GET /leaderboard
app.get('/leaderboard', (req, res) => {
    try {
        const rows = db.prepare(`
            SELECT fm.id, fm.name, fm.profile_picture,
                   COALESCE(SUM(t.points), 0) AS total_points
            FROM familymember fm
            LEFT JOIN tasks_done td ON fm.id = td.familymember_id
            LEFT JOIN tasks t ON td.tasks_id = t.id
            GROUP BY fm.id
            ORDER BY total_points DESC
        `).all();

        // Return JSON for frontend
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// get all finished tasks for leaderboard
app.get('/getAllFinishedTasks', (req, res) => {
    const rows = db.prepare(`
        SELECT 
            tasks_done.id,
            familymember.name AS family_name,
            tasks.title AS task_title,
            tasks.points AS points,
            tasks_done.datetime
        FROM tasks_done
        JOIN familymember ON tasks_done.familymember_id = familymember.id
        JOIN tasks ON tasks_done.tasks_id = tasks.id
        ORDER BY tasks_done.datetime DESC
    `).all();

    res.json(rows);
});

app.post('/getFamilyMemberById', (req, res) => {
    const userId = req.body.id;
    const row = db.prepare('SELECT name FROM familymember WHERE id = ?').get(userId);
    res.json({success: true, data: row});
});

// Add finished tasks
app.post('/addFinishedTask', (req, res) => {
    const { familyId, taskId } = req.body;

    if (!familyId || !taskId) {
        return res.status(400).json({ error: "Missing familyId or taskId" });
    }

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    db.prepare(`
        INSERT INTO tasks_done (familymember_id, tasks_id, datetime)
        VALUES (?, ?, ?)
    `).run(familyId, taskId, now);

    return res.json({ success: true });
});


app.listen(1506, () => {
    console.log('Server kjører på http://localhost:1506');
});
