# Slipstrike – Master TODO
Custom Engine · p5.js · Datengetrieben · Rotation + Force Physik

---

## Grundprinzip (verbindlich)
- [ ] Engine = deterministischer Simulator
- [ ] Engine kennt **keine Spielregeln**
- [ ] Gameplay = Daten (JSON / Mods)
- [ ] Bewegung basiert auf:
  - [ ] Rotation (Richtung)
  - [ ] Force (Stoßstärke)

---

## Phase 0 – Projekt & Architektur

### Projektstruktur
- [x] Git-Repository
- [x] Ordnerstruktur
  - [x] `/engine`
  - [ ] `/rules`
  - [ ] `/content`
    - [ ] `/items`
    - [ ] `/maps`
    - [ ] `/hazards`
    - [ ] `/modes`
    - [ ] `/ai`
    - [ ] `/ui`
  - [ ] `/mods`
  - [ ] `/assets`

---

## Phase 1 – Engine-Kern (nicht auslagerbar)

### Game Loop
- [x] Fester Tick (`update(dt)`)
- [ ] Render-Pass
- [ ] Deterministische Reihenfolge

---

## Phase 2 – Physiksystem (Rotation + Force)

### Figure Physics Model
- [ ] Figure-State
  - [ ] Position (Vec2)
  - [ ] Rotation (float)
  - [ ] Velocity (Vec2)
  - [ ] Angular Velocity (optional)
- [ ] Forward-Vektor aus Rotation berechnen

### Stoß-Mechanik
- [ ] Stoßparameter
  - [ ] Richtung = Rotation
  - [ ] Stärke = Force
- [ ] Force → Velocity-Impuls
- [ ] Modifizierbare Force (Items, Map)

### Bewegung
- [ ] Positionsintegration
- [ ] Reibung (Map-basiert)
- [ ] Stillstand-Erkennung (Velocity < Threshold)

### Drift-System
- [ ] Drift-Faktor (Map)
- [ ] Lenkung:
  - [ ] Velocity tendiert zur Forward-Richtung
- [ ] Extreme Drift für Eis-Maps

---

## Phase 3 – Kollision & Reaktion

### Kollisionen
- [ ] Figur ↔ Figur
- [ ] Figur ↔ Arena
- [ ] Impuls-Weitergabe
- [ ] Richtungsänderung durch Normalen

### Arena-Grenzen
- [ ] Out-of-Bounds-Erkennung
- [ ] Death-Event

---

## Phase 4 – Runden- & Regel-Interpreter

### Runden-State-Machine (JSON)
- [ ] Item-Phase
- [ ] Stoß-Phase
- [ ] Physik-Phase
- [ ] Spielerwechsel

### Regeln (datengetrieben)
- [ ] Items pro Runde
- [ ] Stoßstärke-Limits
- [ ] Zug-Reihenfolge

---

## Phase 5 – Items (100 % Modding)

### Item-System
- [ ] Item-Schema
- [ ] Validator
- [ ] Loader

### Effekt-Typen (Engine)
- [ ] modifyForce
- [ ] modifyRotation
- [ ] lockRotation
- [ ] applyTorque
- [ ] spawnTrigger
- [ ] delayedEffect
- [ ] shield
- [ ] freeze

### GDD-Items als JSON
- [ ] Anker (Force-Multiplikator)
- [ ] Magnet (Force-Zugrichtung)
- [ ] Power-Dash (Force-Boost)
- [ ] Switch (Positions-Tausch)
- [ ] etc.

---

## Phase 6 – Maps & Hazards (Modding)

### Maps
- [ ] Map-Schema
  - [ ] Reibung
  - [ ] Drift
  - [ ] Arena-Form

### Hazards
- [ ] Hazard-Registry
- [ ] Effekte:
  - [ ] ApplyForce
  - [ ] ApplyRotation
  - [ ] KillZone

---

## Phase 7 – Input-System (Richtung = Rotation)

### Actions
- [ ] Aim (Rotation setzen)
- [ ] Charge (Force aufladen)
- [ ] Push (Force anwenden)
- [ ] UseItem

### Mapping
- [ ] Mouse
- [ ] Touch
- [ ] Controller

---

## Phase 8 – KI (Rotation + Force)

### KI-Modell
- [ ] Zielwinkel berechnen
- [ ] Force evaluieren
- [ ] Risikoabschätzung (Out-of-Bounds)

### Schwierigkeit
- [ ] Leicht – Zufallswinkel
- [ ] Mittel – Heuristik
- [ ] Schwer – Simulation (Winkel × Force)

---

## Phase 9 – UI & UX

### UI
- [ ] Richtungsanzeige
- [ ] Force-Meter
- [ ] Aktives Item

---

## Phase 10 – Plattformen

### Desktop
- [ ] Electron / Tauri
- [ ] Savegames

### Mobile
- [ ] Touch-Steuerung
- [ ] Offline-Modus

---

## Phase 11 – Discord

### Rich Presence
- [ ] Status
- [ ] Map
- [ ] Runde

---

## Optional
- [ ] Replays (Rotation + Force = perfekt deterministisch)
- [ ] Mod-Workshop
