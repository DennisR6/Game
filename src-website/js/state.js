// Zentrales Datenmodell für die Map
export const mapData = {
    name: "",
    background: null,

    screenResolution: { x: 1600, y: 900, factor: 100 },

    mapBoundarys: [],   // Wände
    holes: [],          // Löcher (max 6)
    players: [],        // Spieler + Teams

    friction: 1.0,
    drift: 0.0,

    items: [],
    effects: []
};

// Default-Werte für NEW MAP
export function resetMapData() {
    mapData.name = "";
    mapData.background = null;
    mapData.mapBoundarys = [];
    mapData.holes = [];
    mapData.players = [];
    mapData.friction = 1.0;
    mapData.drift = 0.0;
}
