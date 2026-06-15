# Pro Ocean – Ocean Van Klangreise 🌊🚐

Ein kreatives Lernspiel für Kinder (3./4. Klasse) – und auch für Erwachsene schön.
Die Mission von **Pro Ocean** (Meeresbildung & Plastikmüll-Vermeidung) wird spielerisch
umgesetzt: Mit dem *Ocean Van* sammelst du Müll, baust daraus ein Recycling-Boot und
reist über die Ozeankarte zu **Klang-Spots**. Dort hörst du Tierstimmen des Meeres und
findest heraus, welches Tier ruft – manche sind sogar ganz still.

---

## ▶️ Spielen

### Online (empfohlen, auch für Handy)
Über GitHub Pages gehostet:

**https://lukaspowalla.github.io/ProOceanGame/**

Läuft direkt im Browser auf Computer, Tablet und Handy.
- **Handy:** bitte **quer** halten. Für echtes Vollbild im Browser-Menü „Zum Home-Bildschirm
  hinzufügen" wählen und das Spiel über das App-Icon öffnen.

### Offline (zum Verschicken / ohne Internet)
Die Datei **`ocean_van_OFFLINE_einzeldatei.html`** ist komplett eigenständig
(alle Sounds und Bilder eingebettet). Einfach herunterladen und **doppelklicken** –
sie öffnet sich im Browser und läuft ohne Server und ohne Internet.
Ideal für Tests am Laptop/Desktop.

---

## 🎮 Steuerung
- **Computer:** Pfeiltasten oder WASD – oder mit der Maus aufs Meer klicken/tippen.
- **Handy:** Joystick unten links – oder auf die Karte tippen.
- Fahre zu einem **❓**, um eine Klang-Station zu öffnen.

## 🧩 Spielablauf (kurz)
1. **Strand aufräumen:** Sammle 5 Müllteile und bring sie zur ♻️ Recyclingstation → daraus wird dein Boot.
2. **Aufs Meer:** Sammle Ozeanplastik und liefere es ab → die Klang-Spots öffnen sich.
3. **Klang-Spots:** Höre die Tierstimmen und beantworte die Fragen.
4. **Finale:** Turbo-Müllsammeln gegen die Zeit + Urkunde.

---

## 📁 Dateien in diesem Repository
| Datei / Ordner | Wozu |
|---|---|
| `index.html`, `app.js`, `style.css` | Das eigentliche Spiel (Online-Version) |
| `manifest.json` | Web-App-Einstellungen (Vollbild beim „Zum Home-Bildschirm hinzufügen") |
| `assets/` | Sounds, Bilder, Fotos, Logos |
| `ocean_van_OFFLINE_einzeldatei.html` | **Offline-Version** als einzelne Datei (Desktop, zum Doppelklicken) |
| `ATTRIBUTION.md` | Quellen-/Lizenzangaben der verwendeten Sounds |
| `start_local_server.py`, `start_mac_linux.sh`, `start_windows.bat` | Optional: lokalen Test-Server starten |

> Hinweis: Online-Version (Ordner-Dateien) und Offline-Einzeldatei haben denselben Stand.

---

## 🖥️ Lokal testen (optional)
Im Ordner einen kleinen Server starten und im Browser öffnen:
```
python3 -m http.server 8000
```
Dann `http://localhost:8000/` öffnen. (Auf dem Handy im selben WLAN über die lokale IP des Rechners, z. B. `http://192.168.x.x:8000/`.)

## 🔧 Hosting (GitHub Pages)
Repository → **Settings → Pages** → *Deploy from a branch* → Branch **main**, Ordner **/ (root)** → **Save**.
Nach ein paar Minuten ist die Seite unter der oben genannten Adresse erreichbar.

---

## 🔊 Credits
Sound- und Bildquellen siehe **`ATTRIBUTION.md`**.
Ein Projekt rund um die Mission von **Pro Ocean** – Meeresbildung & Plastikmüll-Vermeidung.
