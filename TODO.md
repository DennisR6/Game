# Game TODO – p5.js Engine + Game + Discord Integration

## Phase 0 – Projekt-Setup & Architektur

### Projektstruktur
- [ ] Git-Repository anlegen
- [ ] `/engine` – Rendering, Input, Core-Systeme
- [ ] `/game` – Gameplay-Logik, Regeln
- [ ] `/ui` – Menüs, HUD
- [ ] `/assets` – Grafiken, Sounds
- [ ] Build-Setup (z. B. Vite oder statisch)

### Technische Basis
- [ ] p5.js initialisieren (Canvas, Resize, DPI-Scaling)
- [ ] Game-Loop trennen:
  - `update(deltaTime)`
  - `render()`
- [ ] Scene-/State-System (Menu, Game, Pause)

---

## Phase 1 – Prototyp

### Engine
- [ ] Scene-System (Wechsel zwischen Menüs & Spiel)
- [ ] Input-Abstraktion
  - [ ] Keyboard
  - [ ] Mouse
- [ ] Entity-Basissystem
  - [ ] Position
  - [ ] Bewegung
  - [ ] Render-Komponente

### Gameplay
- [ ] Spieler-Entity
- [ ] Spielerbewegung
- [ ] Kollisionen (AABB)
- [ ] Gewinn-/Verlustbedingung
- [ ] Neustart-Logik

### Content
- [ ] Eine spielbare Map
- [ ] Erstes Item
- [ ] Platzhalter-Grafiken

---

## Phase 2 – Core-Gameplay & Content

### Engine
- [ ] Asset-Loader (Images, Sounds)
- [ ] Kamera-System
- [ ] Collision-Layer
- [ ] Event-System (z. B. `onPickup`, `onDeath`)
- [ ] Save/Load via LocalStorage

### Gameplay
- [ ] Item-System
  - [ ] Item-Typen
  - [ ] Effekte
- [ ] Gegner-Grundlogik (ohne KI)
- [ ] Health- & Damage-System

### Content
- [ ] Mehrere Maps (datengetrieben, z. B. JSON)
- [ ] Mehrere Items
- [ ] UI
  - [ ] HUD
  - [ ] Inventar
  - [ ] Pause-Menü

---

## Phase 3 – KI & Mobile

### KI
- [ ] Gegner-State-Machine
  - [ ] Idle
  - [ ] Chase
  - [ ] Attack
- [ ] Einfaches Pathfinding (Grid oder Nodes)
- [ ] Difficulty-Scaling

### Mobile-Vorbereitung
- [ ] Touch-Input-Abstraktion
- [ ] Virtuelle Buttons / Joystick
- [ ] Responsive UI-Skalierung
- [ ] Performance-Optimierung

---

## Phase 4 – Steam Release

### Technik
- [ ] Web-Build bündeln
- [ ] Desktop-Wrapper (Electron / Tauri / NW.js)
- [ ] Fullscreen & Window-Handling
- [ ] Persistente Saves außerhalb des Browsers

### Steam
- [ ] Steam-App anlegen
- [ ] Store-Page erstellen
- [ ] Playtests
- [ ] Marketing (Trailer, Screenshots)
- [ ] Achievements (optional)

---

## Phase 5 – Mobile Release

### Builds
- [ ] Android Build (Capacitor / WebView)
- [ ] iOS Build
- [ ] Touch-UX Feinschliff
- [ ] Mobile Performance-Pass

---

## Phase 6 – Discord Integration

### Rich Presence
- [ ] Discord Developer App erstellen
- [ ] Discord RPC Integration
- [ ] Status-Anzeigen
  - [ ] Im Menü
  - [ ] In-Game
  - [ ] Aktuelle Map / Level

### Social Features
- [ ] Spiel-Einladungen
- [ ] Join-Game-Flow
- [ ] Party-/Session-Status

---

## Optional / Nice to Have
- [ ] Mod-Support (JSON / Skripte)
- [ ] Replay-System
- [ ] Telemetrie für Balancing
