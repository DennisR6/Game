// Menü-Klicks → Editor-Sektionen ein/ausblenden
document.querySelectorAll(".sidebar li").forEach(li => {
    li.addEventListener("click", () => {
        // Sidebar aktiv setzen
        document.querySelectorAll(".sidebar li").forEach(x => x.classList.remove("active"));
        li.classList.add("active");

        // Editor-Sektion anzeigen
        const target = li.getAttribute("data-target");
        document.querySelectorAll(".editor-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById(target).classList.add("active");
    });
});

const mapData = { 
    name: "", 
    background: null, 
    mapBoundarys: [], 
    holes: [], 
    players: [], 
    friction: 1.0, 
    drift: 0.0, }; 
    
// Name // 
document.getElementById("map-name").addEventListener("input", e => { 
    mapData.name = e.target.value; });

// Hintergrundbild //
document.getElementById("map-image").addEventListener("change", e => { 
    mapData.background = e.target.files[0]; }); 

// Wand hinzufügen // 
document.getElementById("btn-add-wall").addEventListener("click", () => { 
    console.log("Neue Wand"); }); 

// Loch hinzufügen //
document.getElementById("btn-add-hole").addEventListener("click", () => { 
    console.log("Neues Loch"); }); 

// Spieler hinzufügen //  
document.getElementById("btn-add-player").addEventListener("click", () => { 
    console.log("Neuer Spieler"); });

// Reibung
const frictionSlider = document.getElementById("map-friction");
const frictionValue = document.getElementById("friction-value");

frictionSlider.addEventListener("input", () => {
    const val = Math.max(0, Number(frictionSlider.value));
    frictionValue.textContent = val.toFixed(2);
    mapData.friction = val;
});

// Drift
const driftSlider = document.getElementById("map-drift");
const driftValue = document.getElementById("drift-value");

driftSlider.addEventListener("input", () => {
    const val = Math.max(0, Number(driftSlider.value));
    driftValue.textContent = val.toFixed(2);
    mapData.drift = val;
});
