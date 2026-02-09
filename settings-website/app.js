let data = {
    screenResolution: { x: 100, y: 100, factor: 100 },

    // 6 feste Wände
    mapBoundarys: [
        { type: "rectangle", x: 160, y: 100, w: 180, h: 20, color: "blue" },
        { type: "rectangle", x: 460, y: 100, w: 180, h: 20, color: "blue" },
        { type: "rectangle", x: 100, y: 160, w: 20, h: 280, color: "blue" },
        { type: "rectangle", x: 700, y: 160, w: 20, h: 280, color: "blue" },
        { type: "rectangle", x: 160, y: 500, w: 180, h: 20, color: "blue" },
        { type: "rectangle", x: 460, y: 500, w: 180, h: 20, color: "blue" },
    ],

    // 6 feste Löcher
    holes: [
        { type: "circle", x: 100, y: 100, r: 30, color: "red" },
        { type: "circle", x: 400, y: 100, r: 30, color: "red" },
        { type: "circle", x: 700, y: 100, r: 30, color: "red" },
        { type: "circle", x: 100, y: 500, r: 30, color: "red" },
        { type: "circle", x: 400, y: 500, r: 30, color: "red" },
        { type: "circle", x: 700, y: 500, r: 30, color: "red" },
    ],

    players: [
        { x: 300, y: 300, color: "green", playericon: "", team: 0 },
        { x: 600, y: 300, color: "red", playericon: "", team: 1 },
    ],

    friction: 0.05,
    items: [],
    background: { type: "color", color: "blue" }
};

window.onload = () => {
    loadInitialValues();
    renderWalls();
    renderHoles();
    renderPlayerList();
};

function loadInitialValues() {
    document.getElementById("resX").value = data.screenResolution.x;
    document.getElementById("resY").value = data.screenResolution.y;
    document.getElementById("resFactor").value = data.screenResolution.factor;

    document.getElementById("friction").value = data.friction;

    document.getElementById("bgType").value = data.background.type;
    document.getElementById("bgValue").value = data.background.color || data.background.url;
}

// ----------------------
// WÄNDE (6 FIXED)
// ----------------------

function renderWalls() {
    const container = document.getElementById("wallList");
    container.innerHTML = "";

    data.mapBoundarys.forEach((w, i) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <strong>Wand ${i + 1}</strong><br>
            X: <input type="number" value="${w.x}" onchange="updateWall(${i}, 'x', this.value)">
            Y: <input type="number" value="${w.y}" onchange="updateWall(${i}, 'y', this.value)">
            W: <input type="number" value="${w.w}" onchange="updateWall(${i}, 'w', this.value)">
            H: <input type="number" value="${w.h}" onchange="updateWall(${i}, 'h', this.value)">
            Color: <input type="text" value="${w.color}" onchange="updateWall(${i}, 'color', this.value)">
        `;

        container.appendChild(div);
    });
}

function updateWall(i, key, value) {
    data.mapBoundarys[i][key] = isNaN(value) ? value : Number(value);
}

// ----------------------
// LÖCHER (6 FIXED)
// ----------------------

function renderHoles() {
    const container = document.getElementById("holeList");
    container.innerHTML = "";

    data.holes.forEach((h, i) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <strong>Loch ${i + 1}</strong><br>
            X: <input type="number" value="${h.x}" onchange="updateHole(${i}, 'x', this.value)">
            Y: <input type="number" value="${h.y}" onchange="updateHole(${i}, 'y', this.value)">
            R: <input type="number" value="${h.r}" onchange="updateHole(${i}, 'r', this.value)">
            Color: <input type="text" value="${h.color}" onchange="updateHole(${i}, 'color', this.value)">
        `;

        container.appendChild(div);
    });
}

function updateHole(i, key, value) {
    data.holes[i][key] = isNaN(value) ? value : Number(value);
}

// ----------------------
// PLAYERS
// ----------------------

function addPlayer() {
    data.players.push({ x: 0, y: 0, color: "green", playericon: "", team: 0 });
    renderPlayerList();
}

function renderPlayerList() {
    const container = document.getElementById("playerList");
    container.innerHTML = "";

    data.players.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            X: <input type="number" value="${p.x}" onchange="updatePlayer(${i}, 'x', this.value)">
            Y: <input type="number" value="${p.y}" onchange="updatePlayer(${i}, 'y', this.value)">
            Color: <input type="text" value="${p.color}" onchange="updatePlayer(${i}, 'color', this.value)">
            Team: <input type="number" value="${p.team}" onchange="updatePlayer(${i}, 'team', this.value)">
            <button onclick="deletePlayer(${i})">Löschen</button>
        `;

        container.appendChild(div);
    });
}

function updatePlayer(i, key, value) {
    data.players[i][key] = isNaN(value) ? value : Number(value);
}

function deletePlayer(i) {
    data.players.splice(i, 1);
    renderPlayerList();
}

// ----------------------
// BACKGROUND LOGIK
// ----------------------

function onBackgroundTypeChange() {
    const type = document.getElementById("bgType").value;
    const input = document.getElementById("bgValue");

    input.value = "";
    document.getElementById("bgError").innerText = "";
}

function validateBackgroundInput() {
    const type = document.getElementById("bgType").value;
    const value = document.getElementById("bgValue").value;
    const error = document.getElementById("bgError");

    if (type === "color") {
        error.innerText = "";
        return true;
    }

    const valid =
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("./") ||
        value.startsWith("/") ||
        value.startsWith("data:image/");

    if (!valid && value.length > 0) {
        error.innerText = "Ungültiger Bildlink!";
        return false;
    }

    error.innerText = "";
    return true;
}

// ----------------------
// EXPORT
// ----------------------

function exportJSON() {
    if (!validateBackgroundInput()) {
        alert("Bitte korrigiere den Bildlink!");
        return;
    }

    data.screenResolution.x = Number(document.getElementById("resX").value);
    data.screenResolution.y = Number(document.getElementById("resY").value);
    data.screenResolution.factor = Number(document.getElementById("resFactor").value);

    data.friction = Number(document.getElementById("friction").value);

    const bgType = document.getElementById("bgType").value;
    const bgValue = document.getElementById("bgValue").value;

    data.background = bgType === "color"
        ? { type: "color", color: bgValue }
        : { type: "image", url: bgValue };

    document.getElementById("output").value = JSON.stringify(data, null, 4);
}

function copyJSON() {
    const text = document.getElementById("output").value;
    navigator.clipboard.writeText(text);
    alert("JSON kopiert!");
}
