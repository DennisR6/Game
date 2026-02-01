🎮 Slipstrike – Game Design Document (GDD)

Version 1.1 – Updated Core Design
# 1. High Concept

Slipstrike ist ein rundenbasiertes 2D‑Arena‑Taktikspiel, in dem Spieler Figuren über rutschige Untergründe stoßen, Gegner aus der Arena schubsen und taktische Items einsetzen.
Jede Runde besteht aus Item → Stoß → Physik.
Ziel ist es, den Gegner zu eliminieren, indem man ihn aus der Arena drängt oder in Gefahrenzonen befördert.
# 2. Plattformen

Slipstrike wird plattformübergreifend entwickelt:

    PC (Steam) – Maus & Controller

    Steam Deck – Controller, 1280×800

    Android / iOS – Touch‑Steuerung

    Discord – Maus/Tastatur, Rich Presence

# 3. Kern‑Gameplay

Slipstrike basiert auf drei Grundmechaniken:
1. Item‑Phase (optional)

Der Spieler darf ein Item einsetzen.
Items können auf jede Figur oder Position angewendet werden und sind nicht an die Figur gebunden, die später gestoßen wird.
2. Stoß‑Phase (Pflicht)

Der Spieler stößt eine eigene Figur in eine Richtung.
Ein Stoß ist gleichzeitig Bewegung und Angriff.
Die Figur rutscht abhängig von Reibung, Drift und Map‑Effekten.
3. Physik‑Phase

Die Runde endet, sobald alle Figuren nahezu stillstehen.
# 4. Steuerung
PC – Maus

    Ziehen → Richtung

    Loslassen → Stoß

    Klick → Item auswählen

PC/Steam Deck – Controller

    Stick → Richtung

    Trigger → Stoßstärke

    Buttons → Items

Mobile – Touch

    Finger ziehen → Richtung

    Halten → Stoßstärke

    Tippen → Items

Discord

    Maus + Tastatur

# 5. Items

Items sind taktische Werkzeuge, die die Runde vorbereiten oder manipulieren.
Der Spieler kann ein Item pro Runde einsetzen, bevor er stößt.
Item‑Liste (10 Stück):

    Anker – Reduziert Knockback

    Magnet – Zieht Gegner an

    Köder – Bluff ohne Effekt

    Falltür – Unsichtbare Todesfalle

    Power‑Dash – Verstärkt den nächsten Stoß

    Verzögerte Mine – Explosion im Gegnerzug

    Mini‑Wall – Temporäre Barriere

    Freeze‑Shot – Verlangsamt Gegner

    Switch – Tauscht Positionen

    Jägermeister Elixier – Blockt Knockback

# 6. Maps

Jede Map hat eigene physikalische Eigenschaften und Gefahren.
Cue Clash (Billard)

    Normale Reibung

    Billardkugeln als Hindernisse

Frostbite Arena (Eis)

    Sehr niedrige Reibung

    Extreme Drift‑Kontrolle

Magma Cradle (Lava)

    Geysire

    Hitzezonen

    Lava‑Spritzer

# 7. Physik & Bewegung

Slipstrike nutzt Unitys 2D‑Physik:

    Rigidbody2D für Figuren

    AddForce() für Stoß

    PhysicsMaterial2D für Reibung

    Drift abhängig von Map

    Kollisionen erzeugen Richtungswechsel

    Figuren sterben beim Verlassen der Arena

# 8. Rundenablauf

Eine Runde besteht aus:

    Item‑Phase (optional)  
    Spieler setzt ein Item ein.

    Stoß‑Phase (Pflicht)  
    Spieler stößt eine eigene Figur.

    Physik‑Phase  
    Bewegung läuft, bis alle Figuren stillstehen.

    Rundenwechsel  
    Nächster Spieler ist am Zug.

# 9. Menüsystem

Das Menü ermöglicht die Konfiguration eines Matches.
Hauptmenü

    Spielen

    Einstellungen

    Profil / Statistiken

    Credits

    Beenden

Spielkonfiguration

    Spielmodus

        1v1 PvP

        1v1 vs KI

    Map auswählen

    Items: EIN/AUS

    Einzelne Items aktivieren/deaktivieren

    KI‑Schwierigkeit

    Match starten

Items können global oder einzeln deaktiviert werden.
# 10. KI‑Gegner

Die KI trifft Entscheidungen basierend auf:

    Positionen aller Figuren

    Gefahrenzonen

    Items im Inventar

    Knockback‑Risiko

    Map‑Effekten

Die KI führt dieselben Aktionen aus wie der Spieler:

    Item wählen

    Stoßrichtung bestimmen

    Stoßstärke berechnen

Schwierigkeitsgrade:

    Leicht – zufälliger

    Mittel – logisch

    Schwer – optimiert

# 11. UI & UX
PC

    Kompakte UI

    Maus‑optimiert

Mobile

    Große Buttons

    Touch‑optimiert

    Auto‑Zoom

Steam Deck

    Größere Schrift

    Controller‑Icons

Discord

    Minimalistische UI

# 12. Audio & Effekte

    Stoß‑Sounds

    Item‑Sounds

    Map‑Ambiente

    Partikeleffekte für Eis, Lava, Geysire

# 13. Technik (Unity + C#)

    Unity 2D

    Neues Input System

    ScriptableObjects für Items

    Prefabs für Figuren, Maps, Items

    Build Targets: Windows, Linux, Android, iOS

    Steamworks Integration

    Discord Rich Presence

# 14. Discord‑Integration

    Rich Presence (Map, Runde, Status)

    Discord‑Einladungen

    Optional: Discord Activities

# 15. Mobile‑Anpassungen

    Touch‑Steuerung

    UI‑Scaling

    Performance‑Optimierung

    Offline‑Modus

# 16. Release‑Plan
Phase 1 – Prototyp

Core‑Gameplay, eine Map, 3 Items
Phase 2 – Content

Alle Maps, alle Items, UI
Phase 3 – KI & Mobile

KI‑Gegner, Touch‑Steuerung
Phase 4 – Steam Release

Store Page, Playtests, Marketing
Phase 5 – Mobile Release

Android/iOS Builds
Phase 6 – Discord Integration

Rich Presence, Einladungen