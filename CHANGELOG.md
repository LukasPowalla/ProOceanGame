# Änderungen / Fixes – Ocean Van Klangreise

Übersicht aller umgesetzten Verbesserungen.

## NEU in diesem Update (vs. aktuelle GitHub-Version)
- **E-Mail-/Newsletter-Feld auf der Urkunde komplett entfernt** (DSGVO).
- **QR-Code-Block jetzt oben auf der Urkunden-Seite** (über der Urkunde) – nicht mehr in der Urkunde selbst.
- **„Drucken / als PDF speichern“-Button entfernt** – nur noch „Zur Karte“ und „Nochmal spielen“ (auf der QR-Seite `certificate.html`: nur „Zum Spiel“).
- **iPhone-Audio-Fix:** kurzer Wal-Ton beim allerersten Start behoben (iOS ignoriert `volume`; beim Entsperren wird jetzt zusätzlich stummgeschaltet).

- **QR-Code für die Urkunde (DSGVO-konform):** Am Spielende erscheint zur Urkunde ein QR-Code,
  plus „Urkunde öffnen“ und „Link kopieren“ sowie der Link als Text (Fallback). Der QR-Code wird
  rein clientseitig mit einer lokalen Bibliothek (`qrcode.js`) erzeugt – kein externer Dienst,
  kein Tracking, keine Cookies, kein LocalStorage, keine Datenübertragung.
- **Neue Seite `certificate.html`:** öffnet die Urkunde aus den URL-Parametern (Name max. 30 Zeichen,
  optional; Daten via `textContent`), mit Hinweis „nur lokal erzeugt … nicht gesendet/gespeichert“.
- **Kontakt-Hinweis** in der Urkunde: „Haben wir dein Interesse geweckt? … pro-ocean.com/de/kontakt/“.
- **Startbildschirm Handy:** Seite ist am Start scrollbar (mit Wisch-Hinweis) – so klappt iOS-Safari
  die Adressleiste früh ein und das Spiel nutzt sofort den ganzen Bildschirm.
- **iPhone-Performance:** Van-Marker/Karte auf eigene Compositor-Ebenen gehoben, redundante
  Style-Schreibvorgänge pro Frame vermieden – flüssigeres Fahren.
- **Sonar-Sound deutlich leiser** (0.9 → 0.35), weiterhin gut hörbar.

## Smartphone
- **Hochformat:** Hinweis „Bitte dreh dein Handy quer".
- **Querformat:** Vollbild-Karte, die Kamera folgt dem Van (kein Gedränge mehr, man sieht immer, wo man steht).
- **Performance** beim Fahren spürbar verbessert (flüssiger).
- **Vollbild-Tipp** auf dem Startbildschirm: „Zum Home-Bildschirm hinzufügen" (echtes Vollbild auf iOS & Android).
- **Buckelwal-Sound** auf dem iPhone hörbar gemacht (Audio-Freischaltung beim Start).

## Mangroven / zu Fuß
- Zuverlässiger **„🚐 Einsteigen"-Knopf** (kein „Hängenbleiben" mehr) – funktioniert nur in Auto-Nähe (kein Cheaten).
- Eigener **Schritt-Sound** zu Fuß (statt Motorgeräusch).
- Meldung neutral: „Du kannst nichts mehr tragen" statt „Boot randvoll".

## Finale (Turbo)
- Großes **Erklär-Popup mit „GO!"** vor dem Start; die Zeit läuft erst nach dem Klick.
- **Längerer Finale-Song** (~55 s), Spielzeit darauf abgestimmt – Song ist komplett zu hören.
- Bis zu **10 Müllstücke** tragbar, **sanftere** Verlangsamung.
- Eingesammelter Müll wird im Turbo nur **1 Sekunde** groß gezeigt.

## Karte & Welt
- Recycling-Station leicht versetzt.
- **Spielgrenzen** (Strand/Auto ↔ Meer/Boot, Ruder-Lagune) exakt an die sichtbare Karte angepasst.
- **Eisbrecher**-Marker: Icon ❄️ + Name „Eisbrecher" (passend zum Eis-Hinweis – man findet ihn jetzt).
- **Fischernetz** aus dem Eis ins offene Meer verschoben; Netze lassen sich **leichter einsammeln**.

## Stationen / Infos
- Große Info-Popups bei „**Alle Tiere entdeckt**" und „**Klang-Spots freigeschaltet**".
- „Quest erneut ansehen": Wartezeit von 5 auf **12 Sekunden** erhöht.
- Finale-Antwort „Fast nichts" → „**Unterwasser-Rauschen**".
- **Sonar-Infotext** erklärt jetzt zusätzlich, wozu Sonar dient.

## Bedienung / Technik
- **Name/Mail-Eingabe**: Tastenkürzel lösen nicht mehr versehentlich aus, während man tippt.
- **Audio-Fehler** („Failed to start audio device") behoben.
- Alle Spielmeldungen **neutral** formuliert (passen zu Fuß, Auto und Boot).
- Online-Version und Offline-Einzeldatei stets **synchron** gehalten.
