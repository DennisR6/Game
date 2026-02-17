// ---------------------------------------------------------
//  IMPORTS
// ---------------------------------------------------------

import { mapData } from "./state.js";


// ---------------------------------------------------------
//  INITIALISIERUNG
// ---------------------------------------------------------

export function initItemsEditor() {

    // Falls items fehlt → anlegen
    if (!mapData.items) mapData.items = [];

    setupTabs();
    setupAccordion();
    setupAddItemButton();
    renderItemSidebar();
    setupPlayerFrequencyMode();
    setupSpawnButtons();



    console.log("Items-Editor initialisiert");
}



// ---------------------------------------------------------
//  TABS (Frequency + Spawn)
// ---------------------------------------------------------

function setupTabs() {
    document.querySelectorAll(".tab-bar button").forEach(btn => {
        btn.addEventListener("click", () => {
            const group = btn.parentElement;
            const tab = btn.dataset.tab;

            // Buttons umschalten
            group.querySelectorAll("button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Tab-Content umschalten
            const container = group.parentElement;
            container.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

            document.getElementById(tab).classList.add("active");
        });
    });
}



// ---------------------------------------------------------
//  ACCORDION (Spawnbereiche)
// ---------------------------------------------------------

function setupAccordion() {
    document.addEventListener("click", e => {
        if (e.target.classList.contains("area-header")) {
            const content = e.target.nextElementSibling;
            content.classList.toggle("active");
        }
    });
}



// ---------------------------------------------------------
//  SIDEBAR – ITEMS RENDERN
// ---------------------------------------------------------

function renderItemSidebar() {
    const list = document.getElementById("sidebar-item-list");
    list.innerHTML = "";

    // Alphabetisch sortieren
    const sorted = [...mapData.items].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
    );

    sorted.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name || "(Unbenannt)";
        li.dataset.id = item.id;

        li.addEventListener("click", () => {
            selectSidebarItem(li);
            loadItemIntoEditor(item);
        });

        list.appendChild(li);
    });
}



// ---------------------------------------------------------
//  SIDEBAR – AKTIVES ITEM MARKIEREN
// ---------------------------------------------------------

function selectSidebarItem(li) {
    document.querySelectorAll("#sidebar-item-list li").forEach(el =>
        el.classList.remove("active")
    );
    li.classList.add("active");
}



// ---------------------------------------------------------
//  ITEM IN EDITOR LADEN
// ---------------------------------------------------------

function loadItemIntoEditor(item) {

    // Identity
    document.getElementById("item-id").value = item.id;
    document.getElementById("item-name").value = item.name;

    // Behavior
    document.getElementById("item-effect-type").value = item.effectType;
    document.getElementById("item-trigger").value = item.trigger;

    // Frequency
    document.getElementById("freq-rounds-interval").value = item.frequency.intervalRounds;
    document.getElementById("freq-player-kills").value = item.frequency.killsInterval;
    document.getElementById("freq-player-last").value = item.frequency.lastPlayersThreshold;
    document.getElementById("freq-dyn-health").value = item.frequency.healthThreshold;
    document.getElementById("freq-dyn-boost").value = item.frequency.boostFactor;

    // Probability
    document.getElementById("item-probability").value = item.probability;

    // Spielerbasiert: Modus setzen
    if (item.frequency.killsInterval > 0) {
        document.querySelector("input[name='player-mode'][value='kills']").checked = true;
        document.getElementById("field-player-kills").style.display = "block";
        document.getElementById("field-player-last").style.display = "none";
    } else {
        document.querySelector("input[name='player-mode'][value='last']").checked = true;
        document.getElementById("field-player-kills").style.display = "none";
        document.getElementById("field-player-last").style.display = "block";
    }


    // Spawnpunkte
    renderSpawnPoints(item.spawn.points);

    // Spawnbereiche
    renderSpawnAreas(item.spawn.areas);
}



// ---------------------------------------------------------
//  NEUES ITEM ANLEGEN
// ---------------------------------------------------------

function setupAddItemButton() {
    document.getElementById("btn-add-item").addEventListener("click", () => {

        const newItem = {
            id: "item_" + Math.random().toString(36).substr(2, 6),
            name: "",
            effectType: "impulse",
            trigger: "onUse",

            frequency: {
                mode: "rundenbasiert",
                intervalRounds: 3,
                killsInterval: 3,
                lastPlayersThreshold: 4,
                healthThreshold: 20,
                boostFactor: 5
            },

            probability: 25,

            spawn: {
                type: "points",
                points: [],
                areas: []
            }
        };

        mapData.items.push(newItem);
renderItemSidebar();

// Sidebar-Element aktivieren
const li = document.querySelector(`#sidebar-item-list li[data-id="${newItem.id}"]`);
if (li) {
    selectSidebarItem(li);
    loadItemIntoEditor(newItem);
}

    });
}

function getCurrentItem() {
    const activeLi = document.querySelector("#sidebar-item-list li.active");
    if (!activeLi) return null;
    const id = activeLi.dataset.id;
    return mapData.items.find(i => i.id === id);
}


// ---------------------------------------------------------
//  SPAWN – PUNKTE RENDERN
// ---------------------------------------------------------

function renderSpawnPoints(points) {
    const list = document.getElementById("spawnpoint-list");
    list.innerHTML = "";

    points.forEach((p, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="editor-grid">
                <div class="field">
                    <label>X</label>
                    <input type="number" class="sp-x" value="${p.x}">
                </div>
                <div class="field">
                    <label>Y</label>
                    <input type="number" class="sp-y" value="${p.y}">
                </div>
                <button class="small-btn btn-delete-point">Löschen</button>
            </div>
        `;

        // Events
        const inputX = li.querySelector(".sp-x");
        const inputY = li.querySelector(".sp-y");
        const btnDel = li.querySelector(".btn-delete-point");

        inputX.addEventListener("input", () => {
            p.x = Number(inputX.value);
        });

        inputY.addEventListener("input", () => {
            p.y = Number(inputY.value);
        });

        btnDel.addEventListener("click", () => {
            points.splice(index, 1);
            renderSpawnPoints(points);
        });

        list.appendChild(li);
    });
}




// ---------------------------------------------------------
//  SPAWN – BEREICHE RENDERN
// ---------------------------------------------------------

function renderSpawnAreas(areas) {
    const container = document.getElementById("area-list");
    container.innerHTML = "";

    areas.forEach((area, index) => {
        const block = document.createElement("div");
        block.classList.add("area-block");

        block.innerHTML = `
            <div class="area-header">Bereich ${index + 1}</div>
            <div class="area-content active">
                <div class="editor-grid">
                    <div class="field">
                        <label>Shape</label>
                        <select class="area-shape">
                            <option value="circle" ${area.shape === "circle" ? "selected" : ""}>Circle</option>
                            <option value="rect" ${area.shape === "rect" ? "selected" : ""}>Rect</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>X</label>
                        <input type="number" class="area-x" value="${area.x}">
                    </div>
                    <div class="field">
                        <label>Y</label>
                        <input type="number" class="area-y" value="${area.y}">
                    </div>
                    <div class="field field-radius" style="${area.shape === "circle" ? "" : "display:none;"}">
                        <label>Radius</label>
                        <input type="number" class="area-radius" value="${area.radius || 100}">
                    </div>
                    <div class="field field-width" style="${area.shape === "rect" ? "" : "display:none;"}">
                        <label>Width</label>
                        <input type="number" class="area-width" value="${area.width || 200}">
                    </div>
                    <div class="field field-height" style="${area.shape === "rect" ? "" : "display:none;"}">
                        <label>Height</label>
                        <input type="number" class="area-height" value="${area.height || 200}">
                    </div>
                </div>
                <button class="small-btn btn-delete-area">Bereich löschen</button>
            </div>
        `;

        const shapeSel = block.querySelector(".area-shape");
        const inputX = block.querySelector(".area-x");
        const inputY = block.querySelector(".area-y");
        const inputR = block.querySelector(".area-radius");
        const inputW = block.querySelector(".area-width");
        const inputH = block.querySelector(".area-height");
        const fieldR = block.querySelector(".field-radius");
        const fieldW = block.querySelector(".field-width");
        const fieldH = block.querySelector(".field-height");
        const btnDel = block.querySelector(".btn-delete-area");

        shapeSel.addEventListener("change", () => {
            area.shape = shapeSel.value;
            if (area.shape === "circle") {
                fieldR.style.display = "";
                fieldW.style.display = "none";
                fieldH.style.display = "none";
            } else {
                fieldR.style.display = "none";
                fieldW.style.display = "";
                fieldH.style.display = "";
            }
        });

        inputX.addEventListener("input", () => {
            area.x = Number(inputX.value);
        });

        inputY.addEventListener("input", () => {
            area.y = Number(inputY.value);
        });

        inputR.addEventListener("input", () => {
            area.radius = Number(inputR.value);
        });

        inputW.addEventListener("input", () => {
            area.width = Number(inputW.value);
        });

        inputH.addEventListener("input", () => {
            area.height = Number(inputH.value);
        });

        btnDel.addEventListener("click", () => {
            areas.splice(index, 1);
            renderSpawnAreas(areas);
        });

        container.appendChild(block);
    });
}


function setupPlayerFrequencyMode() {
    const killsField = document.getElementById("field-player-kills");
    const lastField = document.getElementById("field-player-last");

    document.querySelectorAll("input[name='player-mode']").forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "kills") {
                killsField.style.display = "block";
                lastField.style.display = "none";
            } else {
                killsField.style.display = "none";
                lastField.style.display = "block";
            }
        });
    });
}

function setupSpawnButtons() {
    const btnAddPoint = document.getElementById("btn-add-spawnpoint");
    const btnAddArea = document.getElementById("btn-add-area");

    btnAddPoint.addEventListener("click", () => {
        const current = getCurrentItem();
        if (!current) return;

        current.spawn.points.push({ x: 0, y: 0 });
        renderSpawnPoints(current.spawn.points);
    });

    btnAddArea.addEventListener("click", () => {
        const current = getCurrentItem();
        if (!current) return;

        if (current.spawn.areas.length >= 4) return;

        current.spawn.areas.push({
            shape: "circle",
            x: 0,
            y: 0,
            radius: 100,
            width: 200,
            height: 200
        });

        renderSpawnAreas(current.spawn.areas);
    });
}

