import { initSidebar, initNewMapButton, initDownload, initImport } from "./ui.js";
import { initMapEditor } from "./editor-map.js";
import { initItemsEditor } from "./editor-items.js";
import { initHazardsEditor } from "./editor-hazards.js";
import { initModesEditor } from "./editor-modes.js";
import { initAIEditor } from "./editor-ai.js";
import { initPreview } from "./preview.js";

window.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initNewMapButton();
    initDownload();
    initImport();

    initMapEditor();
    initItemsEditor();
    initHazardsEditor();
    initModesEditor();
    initAIEditor();

    initPreview();

    console.log("Slipstrike Editor vollständig initialisiert");
});
