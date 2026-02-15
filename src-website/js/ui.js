import { mapData, resetMapData } from "./state.js";
import { 
    renderWalls, 
    renderHoles, 
    renderPlayers, 
    restoreMapFields 
} from "./editor-map.js";


// ---------------------------------------------------------
// SIDEBAR NAVIGATION
// ---------------------------------------------------------
export function initSidebar() {
    document.querySelectorAll(".sidebar li").forEach(li => {
        li.addEventListener("click", () => {
            document.querySelectorAll(".sidebar li").forEach(x => x.classList.remove("active"));
            li.classList.add("active");

            const target = li.getAttribute("data-target");
            document.querySelectorAll(".editor-section").forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");
        });
    });
}


// ---------------------------------------------------------
// NEW MAP
// ---------------------------------------------------------
export function initNewMapButton() {
    document.getElementById("btn-new-map").addEventListener("click", () => {

        resetMapData();

        // UI Felder zurücksetzen
        restoreMapFields();

        // Bild-Input leeren
        mapData.background = null;
        document.getElementById("map-image").value = "";
        document.getElementById("preview-canvas").style.backgroundImage = "";

        // Preview leeren
        document.getElementById("preview-canvas").innerHTML = "";

        // Listen leeren
        document.getElementById("wall-list").innerHTML = "";
        document.getElementById("hole-list").innerHTML = "";
        document.getElementById("player-list").innerHTML = "";

        console.log("Neue Map erstellt:", mapData);
    });
}



// ---------------------------------------------------------
// JSON DOWNLOAD
// ---------------------------------------------------------
export function initDownload() {
    document.getElementById("btn-download").addEventListener("click", () => {
        const json = JSON.stringify(mapData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${mapData.name || "map"}.json`;
        a.click();
    });
}


// ---------------------------------------------------------
// JSON IMPORT + UI WIEDERHERSTELLUNG
// ---------------------------------------------------------
export function initImport() {
    const fileInput = document.getElementById("file-import");

    document.getElementById("btn-import").addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const text = await file.text();
        const json = JSON.parse(text);

        Object.assign(mapData, json);

        restoreMapFields();

        // Bild-Input leeren
        document.getElementById("map-image").value = "";

        // Preview wiederherstellen
        if (mapData.background?.url) {
            document.getElementById("preview-canvas").style.backgroundImage =
                `url(${mapData.background.url})`;
            document.getElementById("preview-canvas").style.backgroundSize = "contain";
            document.getElementById("preview-canvas").style.backgroundRepeat = "no-repeat";
            document.getElementById("preview-canvas").style.backgroundPosition = "center";
        } else {
            document.getElementById("preview-canvas").style.backgroundImage = "";
        }

        renderWalls();
        renderHoles();
        renderPlayers();

        console.log("Map erfolgreich geladen:", mapData);
    });
}


