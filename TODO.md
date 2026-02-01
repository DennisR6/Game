# Slipstrike – Entwicklungs-TODO (Custom Engine · p5.js · Web)

Basierend auf GDD v1.1  
Keine Nutzung von Unity oder fremden Game-Engines  
Fokus: deterministisches, leichtgewichtiges System

---

## Phase 0 – Fundament & Architektur

### Projekt & Struktur
- [ ] Git-Repository anlegen
- [ ] Klare Trennung:
  - [ ] `/engine` – Rendering, Physik, Input, Loop
  - [ ] `/game` – Slipstrike-Regeln, Rundenlogik
  - [ ] `/content` – Maps & Items (JSON)
  - [ ] `/ui` – Menüs & HUD
  - [ ] `/assets` – Grafiken & Sounds
- [ ] Build-Setup (Vite oder statisch)

### Core-Engine
- [ ] p5.js initialisieren
- [ ] Fester Game-Loop
  - [ ] `update(deltaTime)`
  - [ ] `render()`
- [ ] Scene-/State-System
  - [ ] MainMenu
  - [ ] MatchSetup
  - [ ] InGame
  - [ ] Pause

---

## Phase 1 – Prototyp (Core Loop validieren)

### Physik & Bewegung (Custom, deterministisch)
- [ ] Eigene 2D-Physik
  - [ ] Position
  - [ ] Velocity
  - [ ] Reibung (Map-basiert)
  - [ ] Drift-Faktor
- [ ] Stoß-Mechanik
  - [ ] Richtung + Stärke
  - [ ] Bewegung bis Stillstand
- [ ] Kollisionen
  - [ ] Figur ↔ Figur
  - [ ] Figur ↔ Arena
- [ ] Death-Check (Arena verlassen)

### Rundenlogik
- [ ] Runden-State-Machine
  - [ ] Item-Phase (optional)
  - [ ] Stoß-Phase (Pflicht)
  - [ ] Physik-Phase (keine Eingaben)
  - [ ] Spielerwechsel
- [ ] Zugbasierte Kontrolle (kein Echtzeit-Input)

### Gameplay-Minimum
- [ ] 1v1 lokal
- [ ] Eine Map
- [ ] Drei Items (z. B. Anker, Magnet, Power-Dash)
- [ ] Siegbedingung (letzte Figur überlebt)

---

## Phase 2 – Core-Gameplay & Content

### Items
- [ ] Generisches Item-System
  - [ ] Ein Item pro Runde
  - [ ] Anwendung auf Figur oder Position
- [ ] Item-Implementierungen:
  - [ ] Anker
  - [ ] Magnet
  - [ ] Köder
  - [ ] Falltür
  - [ ] Power-Dash
  - [ ] Verzögerte Mine
  - [ ] Mini-Wall
  - [ ] Freeze-Shot
  - [ ] Switch
  - [ ] Jägermeister Elixier

### Maps
- [ ] Map-Datenmodell (JSON)
  - [ ] Reibung
  - [ ] Drift
  - [ ] Gefahrenzonen
- [ ] Map-Implementierungen:
  - [ ] Cue Clash
  - [ ] Frostbite Arena
  - [ ] Magma Cradle

### UI & UX
- [ ] HUD
  - [ ] Aktiver Spieler
  - [ ] Aktives Item
- [ ] Match-Konfiguration
  - [ ] Map-Auswahl
  - [ ] Items EIN/AUS
  - [ ] KI-Schwierigkeit
- [ ] Pause-Menü

---

## Phase 3 – KI & Mobile

### KI-Gegner
- [ ] KI-Datenmodell
  - [ ] Figurenpositionen
  - [ ] Gefahrenzonen
  - [ ] Knockback-Risiko
- [ ] KI-Aktionen
  - [ ] Item-Auswahl
  - [ ] Stoßrichtung
  - [ ] Stoßstärke
- [ ] Schwierigkeitsgrade
  - [ ] Leicht (zufällig)
  - [ ] Mittel (heuristisch)
  - [ ] Schwer (Simulation / Optimierung)

### Mobile-Unterstützung
- [ ] Touch-Input
  - [ ] Ziehen = Richtung
  - [ ] Halten = Stärke
- [ ] Touch-optimierte UI
- [ ] Responsive Skalierung
- [ ] Performance-Optimierung

---

## Phase 4 – Desktop / Steam Release

### Technik
- [ ] Desktop-Wrapper (Electron / Tauri)
- [ ] Fullscreen & Window-Handling
- [ ] Persistente Savegames
- [ ] Controller-Support

### Steam
- [ ] Steamworks-Integration
- [ ] Store Page
- [ ] Playtests
- [ ] Marketing-Material
- [ ] Achievements (optional)

---

## Phase 5 – Mobile Release

### Builds
- [ ] Android Build (Capacitor / WebView)
- [ ] iOS Build
- [ ] Offline-Modus
- [ ] Mobile Performance-Pass

---

## Phase 6 – Discord Integration

### Rich Presence
- [ ] Discord Developer App
- [ ] RPC-Anbindung
- [ ] Status-Infos
  - [ ] Menü / In Match
  - [ ] Aktuelle Map
  - [ ] Runde / Spielerzug

### Social Features
- [ ] Spiel-Einladungen
- [ ] Join-Session-Flow
- [ ] Party-Status

---

## Optional / Später
- [ ] Replays
- [ ] Modding (JSON)
- [ ] Statistiken / Profile
