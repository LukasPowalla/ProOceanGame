/* Deine Ocean Van Klangreise – Pro Ocean – v10 */
"use strict";

/* Sichtbarer Fehler-Melder (hilft bei der Fehlersuche, falls etwas hakt) */
function __showErr(msg) {
  try {
    let b = document.getElementById("__errbar");
    if (!b) {
      b = document.createElement("div");
      b.id = "__errbar";
      b.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#b00020;color:#fff;font:13px/1.4 sans-serif;padding:8px 12px;white-space:pre-wrap;";
      document.body.appendChild(b);
    }
    b.textContent = "Fehler: " + msg;
  } catch (e) {}
}
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => __showErr((e && e.message ? e.message : e) + (e && e.filename ? "" : "")));
  window.addEventListener("unhandledrejection", (e) => __showErr("Promise: " + (e && e.reason ? e.reason : e)));
}

/* ---------- Spieldaten (sprachneutral) ---------- */
const SPOTS = [
  { id: "seagull",  x: 21, y: 18, audio: "assets/audio/seagull.mp3",        image: "assets/photos/seagull.jpg",        fit: "cover" },
  { id: "sealion",  x: 41, y: 16, audio: "assets/audio/sea_lion.mp3",       image: "assets/photos/sea_lion.jpg",       fit: "cover" },
  { id: "penguin",  x: 86, y: 13, audio: "assets/audio/penguin.mp3",        image: "assets/photos/penguin.jpg",        fit: "cover" },
  { id: "seahorse", x: 16, y: 82, audio: "assets/audio/seahorse.mp3",       image: "assets/photos/seahorse.jpg",       fit: "cover" },
  { id: "dolphin",  x: 54, y: 34, audio: "assets/audio/dolphin.mp3",        image: "assets/photos/dolphin.jpg",        fit: "cover" },
  { id: "whale",    x: 62, y: 64, audio: "assets/audio/humpback_whale.mp3", image: "assets/photos/humpback_whale.jpg", fit: "cover" },
  { id: "babyseal", x: 89, y: 83, audio: "assets/audio/baby_seal.mp3",      image: "assets/photos/baby_seal.jpg",      fit: "cover" },
  { id: "jellyfish",x: 32, y: 57, audio: "assets/audio/silent_visitor.mp3", image: "assets/images/jellyfish.svg",      fit: "contain" }
];
// Finale-Stern (stille Übung) liegt draußen im Meer – NICHT am Recyclingcamp
const FINALE_SPOT = { id: "finale", x: 46, y: 86, audio: "assets/audio/ocean_30s.mp3", image: "assets/images/ocean_van.webp", fit: "contain" };
const VAN_HOME = { x: 6, y: 6 };

/* ---------- Karten-Gamification ---------- */
// Müll-Mechanik: einsammeln -> Boot wird schwerer & langsamer -> zur ♻️ Pro Ocean Recyclingstation.
// Die kleinen Müllteile stammen aus der "Archive of Trash"-Sammlung von Pro Ocean (echte Funde!).
// Es gibt einen Grundbestand + laufenden Nachschub; gesammelt wird Vielfalt (viele MüllARTEN).
const TRASH_NEEDED = 5;      // so viele Teile braucht das erste Recycling-Boot
const CARGO_MAX = 6;         // mehr kann man nicht tragen (im Turbo mehr)
function cargoMax() { return state.turbo ? 10 : CARGO_MAX; }
const REC_STATION = { x: 7, y: 8 };  // ♻️ Pro Ocean Recyclingstation (näher in die linke obere Ecke gerückt)

// Alle 87 Müll-Bilder aus der Pro-Ocean-Sammlung "Archive of Trash" mit Kategorie (für die Statistik)
const TRASH_ASSETS = [
  { img: "assets/trash/t01.png", cat: "can" },
  { img: "assets/trash/t02.png", cat: "tube" },
  { img: "assets/trash/t03.png", cat: "ball" },
  { img: "assets/trash/t04.png", cat: "toy" },
  { img: "assets/trash/t05.png", cat: "toy" },
  { img: "assets/trash/t06.png", cat: "cap" },
  { img: "assets/trash/t07.png", cat: "toy" },
  { img: "assets/trash/t08.png", cat: "toy" },
  { img: "assets/trash/t09.png", cat: "bulb" },
  { img: "assets/trash/t10.png", cat: "toy" },
  { img: "assets/trash/t11.png", cat: "card" },
  { img: "assets/trash/t12.png", cat: "ball" },
  { img: "assets/trash/t13.png", cat: "bottle" },
  { img: "assets/trash/t14.png", cat: "shoe" },
  { img: "assets/trash/t15.png", cat: "lighter" },
  { img: "assets/trash/t16.png", cat: "toy" },
  { img: "assets/trash/t17.png", cat: "toy" },
  { img: "assets/trash/t18.png", cat: "wrapper" },
  { img: "assets/trash/t19.png", cat: "other" },
  { img: "assets/trash/t20.png", cat: "hygiene" },
  { img: "assets/trash/t21.png", cat: "wrapper" },
  { img: "assets/trash/t22.png", cat: "toy" },
  { img: "assets/trash/t23.png", cat: "bottle" },
  { img: "assets/trash/t24.png", cat: "other" },
  { img: "assets/trash/t25.png", cat: "lighter" },
  { img: "assets/trash/t26.png", cat: "bottle" },
  { img: "assets/trash/t27.png", cat: "hygiene" },
  { img: "assets/trash/t28.png", cat: "wrapper" },
  { img: "assets/trash/t29.png", cat: "wrapper" },
  { img: "assets/trash/t30.png", cat: "cap" },
  { img: "assets/trash/t31.png", cat: "bottle" },
  { img: "assets/trash/t32.png", cat: "wrapper" },
  { img: "assets/trash/t33.png", cat: "can" },
  { img: "assets/trash/t34.png", cat: "toy" },
  { img: "assets/trash/t35.png", cat: "toy" },
  { img: "assets/trash/t36.png", cat: "wrapper" },
  { img: "assets/trash/t37.png", cat: "wrapper" },
  { img: "assets/trash/t38.png", cat: "plastic" },
  { img: "assets/trash/t39.png", cat: "net" },
  { img: "assets/trash/t40.png", cat: "wrapper" },
  { img: "assets/trash/t41.png", cat: "foil" },
  { img: "assets/trash/t42.png", cat: "cup" },
  { img: "assets/trash/t43.png", cat: "other" },
  { img: "assets/trash/t44.png", cat: "plastic" },
  { img: "assets/trash/t45.png", cat: "wrapper" },
  { img: "assets/trash/t46.png", cat: "ball" },
  { img: "assets/trash/t47.png", cat: "can" },
  { img: "assets/trash/t48.png", cat: "wrapper" },
  { img: "assets/trash/t49.png", cat: "other" },
  { img: "assets/trash/t50.png", cat: "wrapper" },
  { img: "assets/trash/t51.png", cat: "foil" },
  { img: "assets/trash/t52.png", cat: "can" },
  { img: "assets/trash/t53.png", cat: "tube" },
  { img: "assets/trash/t54.png", cat: "bottle" },
  { img: "assets/trash/t55.png", cat: "cup" },
  { img: "assets/trash/t56.png", cat: "cup" },
  { img: "assets/trash/t57.png", cat: "net" },
  { img: "assets/trash/t58.png", cat: "capsule" },
  { img: "assets/trash/t59.png", cat: "foil" },
  { img: "assets/trash/t60.png", cat: "other" },
  { img: "assets/trash/t61.png", cat: "other" },
  { img: "assets/trash/t62.png", cat: "can" },
  { img: "assets/trash/t63.png", cat: "wrapper" },
  { img: "assets/trash/t64.png", cat: "bottle" },
  { img: "assets/trash/t65.png", cat: "wrapper" },
  { img: "assets/trash/t66.png", cat: "wrapper" },
  { img: "assets/trash/t67.png", cat: "cap" },
  { img: "assets/trash/t68.png", cat: "cap" },
  { img: "assets/trash/t69.png", cat: "bottle" },
  { img: "assets/trash/t70.png", cat: "wrapper" },
  { img: "assets/trash/t71.png", cat: "bottle" },
  { img: "assets/trash/t72.png", cat: "wrapper" },
  { img: "assets/trash/t73.png", cat: "wrapper" },
  { img: "assets/trash/t74.png", cat: "other" },
  { img: "assets/trash/t75.png", cat: "wrapper" },
  { img: "assets/trash/t76.png", cat: "shoe" },
  { img: "assets/trash/t77.png", cat: "cup" },
  { img: "assets/trash/t78.png", cat: "other" },
  { img: "assets/trash/t79.png", cat: "other" },
  { img: "assets/trash/t80.png", cat: "other" },
  { img: "assets/trash/t81.png", cat: "foil" },
  { img: "assets/trash/t82.png", cat: "can" },
  { img: "assets/trash/t83.png", cat: "foil" },
  { img: "assets/trash/t84.png", cat: "wrapper" },
  { img: "assets/trash/t85.png", cat: "toy" },
  { img: "assets/trash/t86.png", cat: "toy" },
  { img: "assets/trash/t87.png", cat: "net" }
];
const CAT = {
  can: { de: "Dose", en: "Can" }, bottle: { de: "Flasche", en: "Bottle" }, tube: { de: "Tube", en: "Tube" },
  ball: { de: "Ball", en: "Ball" }, toy: { de: "Spielzeug", en: "Toy" }, cap: { de: "Deckel", en: "Cap" },
  bulb: { de: "Glühbirne", en: "Light bulb" }, card: { de: "Karte", en: "Card" }, shoe: { de: "Schuh", en: "Shoe" },
  lighter: { de: "Feuerzeug", en: "Lighter" }, wrapper: { de: "Verpackung", en: "Wrapper" }, cup: { de: "Becher", en: "Cup" },
  hygiene: { de: "Hygiene-Müll", en: "Hygiene item" }, net: { de: "Netz/Beutel", en: "Net/Bag" },
  plastic: { de: "Plastikteil", en: "Plastic part" }, capsule: { de: "Kaffeekapsel", en: "Coffee pod" },
  foil: { de: "Folie", en: "Foil/Film" }, other: { de: "Sonstiges", en: "Other" }
};
const TOTAL_CATS = Object.keys(CAT).length;

// Aktive (gespawnte) Müllobjekte – transient, kein Speichern
let trashItems = [];
let trashUid = 0;

// Fischernetze: beim Berühren eingefangen; teils so platziert, dass man sie gezielt anfahren/umfahren muss
const NETS = [
  { id: "net1", x: 50, y: 49, r: 6, w: 2 },
  { id: "net2", x: 64, y: 31, r: 5, w: 2 },
  { id: "net3", x: 34, y: 80, r: 5, w: 2 },
  { id: "net4", x: 58, y: 67, r: 5, w: 2 }
];
function netField() { return NETS.filter(n => !state.netsTaken.includes(n.id)); }
function activeNetAt(x, y) { return netField().find(n => Math.hypot(n.x - x, n.y - y) <= n.r); }
// Großzügigerer Radius nur fürs Einsammeln: Netz wird schon beim Drüberfahren/Berühren mit dem Boot geschnappt
const NET_PICKUP_BONUS = 2.5;
function netForPickup(x, y) { return netField().find(n => Math.hypot(n.x - x, n.y - y) <= n.r + NET_PICKUP_BONUS); }

function isSeaPos(x, y) { return !isLand(x, y) && !inIce(x, y); }
let trashAssetCursor = 0;
function nextAsset() {
  // alle 60 Teile der Reihe nach durchrotieren (gemischt) -> es tauchen wirklich alle auf
  if (trashAssetCursor === 0) TRASH_ASSETS.sort(() => Math.random() - 0.5);
  const a = TRASH_ASSETS[trashAssetCursor % TRASH_ASSETS.length];
  trashAssetCursor++;
  return a;
}
function spawnTrash(onLand) {
  for (let tries = 0; tries < 40; tries++) {
    const x = onLand ? (3 + Math.random() * 15) : (22 + Math.random() * 74);
    const y = onLand ? (8 + Math.random() * 26) : (8 + Math.random() * 84);
    const ok = onLand ? isLand(x, y) : isSeaPos(x, y);
    if (!ok) continue;
    if (Math.hypot(REC_STATION.x - x, REC_STATION.y - y) < 7) continue;
    if ([...SPOTS, FINALE_SPOT].some(s => Math.hypot(s.x - x, s.y - y) < 7)) continue;
    const a = nextAsset();
    // Drift: nur auf See; im Profi-Modus schneller -> man muss aktiver manövrieren
    const speed = onLand ? 0 : (state.mode === "pro" ? 3.2 : 1.6);
    const ang = Math.random() * Math.PI * 2;
    trashItems.push({ id: ++trashUid, x, y, cat: a.cat, img: a.img, w: 1,
      vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed });
    return true;
  }
  return false;
}
// Erster Teil der Challenge: feste, gleichmäßig verteilte Strand-/Mangroven-Positionen (kein Zufall, keine Überlappung)
const START_TRASH = [
  { x: 18, y: 7 }, { x: 20, y: 12 }, { x: 9, y: 17 }, { x: 16, y: 19 },   // oberer Strand
  { x: 6, y: 24 }, { x: 13, y: 25 }, { x: 9, y: 30 }, { x: 4, y: 31 }     // Mangroven (y >= 20)
];
// Hohe Anfangsdichte auf See; Profi-Modus deutlich mehr
function seaTarget() { return state.mode === "pro" ? 26 : 16; }
function ensureStock() {
  // Vor dem Boot: KEIN Nachschub – nur die festen Start-Positionen (in initTrash erzeugt)
  if (!state.boatBuilt) return;
  let sea = trashItems.filter(t => !isLand(t.x, t.y)).length;
  let guard = 0;
  while (sea < seaTarget() && guard++ < 40) { if (spawnTrash(false)) sea++; else break; }
}
// driftenden Müll bewegen (jedes Frame); an Rändern/Land abprallen
function driftTrash(dt) {
  for (const t of trashItems) {
    if (!t.vx && !t.vy) continue;
    let nx = t.x + t.vx * dt, ny = t.y + t.vy * dt;
    if (nx < 22 || nx > 97 || isLand(nx, ny) || inIce(nx, ny)) { t.vx *= -1; nx = t.x + t.vx * dt; }
    if (ny < 7 || ny > 93) { t.vy *= -1; ny = t.y + t.vy * dt; }
    if (isLand(nx, ny) || inIce(nx, ny)) { nx = t.x; ny = t.y; }
    t.x = Math.max(22, Math.min(97, nx)); t.y = Math.max(7, Math.min(93, ny));
    if (t.el) { t.el.style.left = t.x + "%"; t.el.style.top = t.y + "%"; }
  }
}
function initTrash() {
  trashItems = []; trashUid = 0; trashAssetCursor = 0;
  if (!state.boatBuilt) {
    // Erster Teil: feste, gleichmäßig verteilte Müllteile am Strand + in den Mangroven
    START_TRASH.forEach(p => {
      const a = nextAsset();
      trashItems.push({ id: ++trashUid, x: p.x, y: p.y, cat: a.cat, img: a.img, w: 1, vx: 0, vy: 0 });
    });
  } else {
    ensureStock();
  }
}

const distinctCats = () => Object.keys(state.collected).length;
const totalCollected = () => Object.values(state.collected).reduce((a, b) => a + b, 0);
function turboRating(s) { return s >= 200 ? "⭐⭐⭐" : s >= 100 ? "⭐⭐" : s > 0 ? "⭐" : "–"; }

// Bonus-Muscheln auf dem Meer (je +1)
const BONUS_SHELLS = [
  { x: 48, y: 22 }, { x: 70, y: 30 }, { x: 40, y: 40 },
  { x: 75, y: 55 }, { x: 55, y: 75 }, { x: 25, y: 70 }
];
// Eisbrecher-Umbau am Hafen-Anker (erscheint nach 3 gelösten Tieren)
const ANCHOR = { x: 48, y: 12 };
// Wintereis-Zonen: nur mit Eisbrecher befahrbar (größer & deutlicher als zuvor)
const ICE_ZONES = [ { x: 84, y: 13, r: 21 }, { x: 88, y: 84, r: 19 } ];
// Lautlose Lagune: Ruder-Zone (Motorlärm stört die Tiere) – größer
const ROW_ZONE = { x: 32, y: 57, rx: 12, ry: 12.5 };  // deckt sich mit der sichtbaren Lagune (SVG-Ellipse)
// Mangroven: untere Hälfte des Strandes – hier kommt der Van kaum durch (zu Fuß sammeln!)
function inMangrove(x, y) { return isLand(x, y) && y >= 20; }
// Meeresströmung: zieht das Boot nach rechts
const CURRENT_ZONE = { x: 60, y: 46, rx: 21, ry: 7, push: 7 };

function inIce(x, y) { return ICE_ZONES.some(z => Math.hypot(z.x - x, z.y - y) <= z.r); }
function inEllipse(x, y, z) { return ((x - z.x) ** 2) / (z.rx ** 2) + ((y - z.y) ** 2) / (z.ry ** 2) <= 1; }
const inRowZone = (x, y) => inEllipse(x, y, ROW_ZONE);
const inCurrent = (x, y) => inEllipse(x, y, CURRENT_ZONE);

/* ---------- Texte ---------- */
const I18N = {
  de: {
    ui: {
      eyebrow: "Ocean Van Lernspiel",
      title: "Deine Ocean Van Klangreise",
      startCatcher: "Der Ocean Van bringt das Meer vor die Haustür – und in dein Ohr.",
      startLead: "Reise über die Ozeankarte zu geheimnisvollen Klang-Spots. Höre genau hin und finde heraus, welches Tier dort ruft – manche sind sogar ganz still!",
      nameLabel: "Dein Forschername (für deine Urkunde):",
      namePlaceholder: "z. B. Mia",
      modeKid: "🐠 Entdecker-Modus",
      modeKidSub: "Mit Hilfen – für Kinder",
      modePro: "🦈 Hör-Profi-Modus",
      modeProSub: "Ohne Hilfen, doppelte Muscheln",
      startFs: "Spiel im Vollbild starten",
      startWin: "Ohne Vollbild starten",
      mapHint: "Steuere den Ocean Van mit den Pfeiltasten – oder tippe aufs Meer. Fahre zu einem ❓!",
      mapHintFinale: "Alle Tiere entdeckt! Fahre hinaus zum ⭐ im Meer für das große Finale.",
      mapHintDone: "Klangreise geschafft! Du kannst jede Station noch einmal besuchen.",
      rotateHint: "Bitte dreh dein Handy quer – so passt die ganze Karte auf den Bildschirm.",
      missionTitle1: "Du bist ein Pro Ocean Müllsammler! 🌊",
      missionText1: "Der Müll in diesem Spiel basiert auf echten Funden von Pro Ocean. Deine Mission: Sammle möglichst viele UNTERSCHIEDLICHE Müllteile und cleare das Spiel! Räum zuerst den Strand auf (5 Teile) und bring sie zur ♻️ Pro Ocean Recyclingstation – daraus bauen wir dein Boot.",
      missionTitle2: "Dein Recycling-Boot ist fertig! 🛥️",
      missionText2: "Aber das Meer ist noch voller Plastik! Sammle mindestens 3 Ozeanplastik-Teile und bring sie zur ♻️ Müllsammelstelle. Erst dann öffnen sich die Klang-Spots 🔒.",
      missionOk: "Los geht's!",
      questSea: (n, m) => `Sammle Ozeanplastik und bring es zur ♻️ Müllsammelstelle! (${n}/${m}) Dann öffnen sich die Klang-Spots 🔒.`,
      toastSpotsLocked: "Die Klang-Spots sind noch verschlossen 🔒 – recycle erst etwas Ozeanplastik!",
      toastSpotsUnlocked: "🎉 Die Klang-Spots sind freigeschaltet! Fahre zu einem ❓ und höre genau hin.",
      spotsUnlockedTitle: "🎉 Klang-Spots frei!",
      finaleReadyTitle: "🎉 Alle Tiere entdeckt!",
      toastTooHeavy: "Zu schwer! Das kannst du nicht mehr tragen – bring deinen Müll erst zur ♻️ Müllsammelstelle.",
      heavyInfo: {
        ghostnet: "Ein Geisternetz! 🎣 Verlorene Fischernetze treiben jahrelang im Meer und sind tödliche Fallen für Tiere. (+3 Ladung!)",
        tire: "Ein alter Autoreifen! 🛞 Gummi zerfällt im Meer zu winzigem Mikroplastik. (+3 Ladung!)",
        barrel: "Ein altes Fass! 🛢️ Großmüll gehört fachgerecht entsorgt – niemals ins Meer. (+3 Ladung!)"
      },
      toastOceanClean: "🎉 Unglaublich – du hast das GANZE Meer müllfrei gemacht! +5 Bonus-Muscheln. Du bist ein echter Pro-Ocean-Held!",
      recLabel: "Pro Ocean Recycling",
      netLabel: "Fischernetz",
      netTangle: "Ein Geisternetz! 🕸️ Bleib kurz dran und strample dich frei...",
      netHauled: "Netz geborgen! 🎣 Verlorene Fischernetze fangen jahrelang Tiere – gut, dass es weg ist! (+Ladung)",
      // Tauch-Quest
      diveTitle: "Tauchgang beim Buckelwal 🐋",
      diveIntro: "Tauch ab und sieh dich in Ruhe um. Schau nach rechts und entdecke, was sich im Wasser verbirgt.",
      diveJumpIn: "🤿 Abtauchen",
      diveDeeper: "Tiefer tauchen…",
      diveLookHint: "Schau dich um: Ziehe nach rechts (oder Pfeiltaste →), um weiter durchs Riff zu gleiten.",
      diveSpinProgress: (p) => `Umsehen… ${p}%`,
      diveAfterBoat: "Schau weiter nach rechts – das Wasser wird trüber...",
      diveWhaleHeard: "Hörst du das tiefe Lied? Irgendwo hier in der Tiefe ist ein großer Sänger...",
      diveBoatNoise: "⚠️ Ein Motorboot rast über dir vorbei – unter Wasser ohrenbetäubend laut!",
      diveQuestion: "Welcher Meeresriese singt hier unten?",
      diveSonarBtn: "Weiter unter Wasser bleiben…",
      diveSonarPlaying: "Was ist das für ein lautes Pulsieren?",
      sonarInfoTitle: "Sonar – Lärm im Meer 📡",
      sonarInfoText: "Das war ein Sonar. Schiffe und U-Boote senden damit Schallwellen aus und hören auf das Echo – so „sehen“ sie mit Tönen, was unter Wasser ist: den Meeresboden, andere Schiffe oder Fischschwärme. Praktisch für die Menschen – aber unter Wasser sind diese Töne extrem laut und stören die Wale: Sie können sich dann schlechter verständigen und orientieren. Weniger Unterwasserlärm hilft den Walen.",
      diveResurface: "🌊 Wieder auftauchen",
      diveBackToBoat: "Zurück im Boot! Du weißt jetzt, wie sehr Lärm den Walen zusetzt.",
      diveOnce: "Diesen Tauchgang gibt es nur einmal pro Spiel.",
      questTrash: (n, m) => `Winter-Mission: Sammle ${m} Plastikteile am Strand! (${n}/${m}) 🛍️`,
      questDeliverFirst: "Stark! Bring den Müll zur ♻️ Müllsammelstelle – daraus wird dein Boot gebaut!",
      questDeliver: "Voll beladen! 🐌 Bring den Müll zur ♻️ Müllsammelstelle!",
      questAnchor: "❄️ Hol dir deinen Eisbrecher (❄️ auf der Karte) – damit fährst du durchs Wintereis!",
      toastCargo: (n, m) => `🗑️ ${n}/${m} geladen – du wirst langsamer!`,
      toastCargoFull: "Du kannst nichts mehr tragen! 🧺 Ab zur ♻️ Müllsammelstelle.",
      toastCargoFullFoot: "Du kannst nichts mehr tragen! 🧺 Ab zur ♻️ Müllsammelstelle.",
      toastDeliver: (n) => `♻️ ${n} Müllteile recycelt: +${n} Muscheln! Das Meer dankt dir.`,
      toastDeliverMore: (n, m) => `Schon ${n} von ${m} Teilen dabei – sammle noch mehr, bevor du recycelst!`,
      toastBoat: "Müll recycelt! Daraus entsteht dein eigenes Recycling-Boot. Ab aufs Meer! 🛥️",
      toastNoBoat: "Halt! Baue zuerst dein Boot: Sammle Müll und bring ihn zur ♻️ Müllsammelstelle.",
      toastIceLocked: "Brrr, dickes Wintereis! ❄️ Ohne Eisbrecher kommst du hier nicht durch. Schau dir zuerst die anderen ❓-Quests an!",
      toastMangrove: "🌳 Mangroven! Hier kommst du mit dem Auto kaum durch – beweg dich langsam und sammle den Müll von Hand ein.",
      toastMangroveCar: "🌳 Mangroven! Mit dem Auto kommst du hier nicht durch. Steig aus (Knopf „Aussteigen“ oder Taste E) und sammle zu Fuß.",
      toastOnFoot: "🚶 Zu Fuß unterwegs! Sammle den Müll und geh dann zurück zum Auto (Knopf „Einsteigen“ oder E).",
      toastInCar: "🚐 Wieder im Auto! Weiter geht's.",
      toastBackToCar: "Geh zuerst zurück zu deinem geparkten Auto, um einzusteigen.",
      toastFootWater: "Aussteigen geht nur an Land.",
      btnExitCar: "🚶 Aussteigen",
      btnEnterCar: "🚐 Einsteigen",
      questReopen: (s) => `Nochmal anhören? Bleib hier… ${s}`,
      toastTurbo: "🚀 TURBO! Sammle so viel Müll wie möglich und komm zurück zum ♻️ Camp!",
      turboIntroTitle: "🚀 Finale: Turbo-Müllsammeln!",
      turboIntroHtml: "So funktioniert das große Finale:<br><br>• Sammle Müll und bring ihn zur ♻️ Recyclingstation.<br>• Je mehr Müll du zur Station bringst, desto mehr Punkte!<br>• Müll, den du noch dabei hast, gibt auch ein paar Punkte.<br>• Turbo ist an: Du kannst bis zu 10 Müllstücke tragen – aber bring lieber ab und zu etwas zur Station, damit du schnell bleibst! 🚀<br><br>Bereit? Du hast ca. 1 Minute Zeit!",
      turboIntroGo: "GO! 🚀",
      mapHintTurbo: "🚀 Turbo: sammle Müll und bring ihn zurück zum ♻️ Camp!",
      turboHud: (s, sc) => `🚀 ⏱ ${s}s · Punkte: ${sc}`,
      turboDeliver: (n) => `♻️ Im Camp abgegeben! +${n * 5} Punkte`,
      turboOverTitle: "Zeit um! 🏁",
      turboOverText: (sc, un) => un > 0
        ? `Dein Turbo-Score: ${sc} Punkte.\n(${un} Müllteile nicht mehr abgegeben: -${un * 5} Punkte. Schaff es nächstes Mal rechtzeitig zurück zum Camp!)`
        : `Stark! Dein Turbo-Score: ${sc} Punkte. Alles rechtzeitig zum Camp gebracht! 🎉`,
      toastIcebreaker: "Eisbrecher montiert! ❄️ Echte Eisbrecher haben einen extra verstärkten Rumpf – jetzt durchs Packeis!",
      toastRow: "Ruder-Zone! 🚣 Motorlärm stört die Meerestiere – hier wird leise gerudert.",
      toastCurrent: "Eine Meeresströmung zieht dich mit! Strömungen tragen Wärme – und leider auch Plastik – durchs Meer.",
      toastShell: "+1 Muschel gefunden! 🐚",
      praises: ["Super! 🌟", "Toll gemacht! 👏", "Klasse! 💙", "Weiter so! 🐚", "Stark! 💪", "Bravo! 🎉", "Mega! 🌊"],
      toastNewType: (name, d, tot) => `Neue Müllart: ${name}! 🆕 ${d}/${tot} Arten · +1 Muschel`,
      statsTitle: "Dein Müll-Fund",
      statsTotal: (n) => `Insgesamt eingesammelt: ${n} Teile`,
      statsDistinct: (d, tot) => `Verschiedene Müllarten: ${d} von ${tot}`,
      highlightsTitle: "Deine Müll-Highlights",
      turboBtn: "🚀 Turbo: weiter Müll sammeln!",
      mailHeading: "Urkunde per E-Mail / Newsletter (optional)",
      mailPlaceholder: "deine@email.de",
      consentCert: "Urkunde per E-Mail erhalten: Meine E-Mail wird nur zum einmaligen Versand dieser Urkunde genutzt und nicht gespeichert.",
      consentNews: "Pro Ocean Newsletter abonnieren: Meine E-Mail darf für den Newsletter gespeichert und genutzt werden (Einwilligung, jederzeit widerrufbar).",
      mailSend: "📧 Absenden",
      mailSubject: "Meine Pro Ocean Forscher-Urkunde",
      mailNote: "Hinweis: Ohne Häkchen wird nichts versendet oder gespeichert. Drucken/PDF geht ganz ohne E-Mail. (Für den Newsletter wird eine kleine Datei mit deiner Einwilligung erzeugt, die Pro Ocean in ihr System übernimmt.)",
      reset: "Neu starten",
      resetTitle: "Neu starten?",
      resetConfirm: "Alles wird zurückgesetzt: Muscheln, Tiere, Müll und Name. Danach geht es ganz von vorne los.",
      resetYes: "Ja, von vorne!",
      resetNo: "Abbrechen",
      start: "Start",
      mapLabel: "Karte",
      spotsSolved: (a, b) => `${a} von ${b} Tieren`,
      stepListen: "Anhören",
      stepHint: "Frage",
      stepAnswer: "Antwort",
      stepLearn: "Lernen",
      listen: "🔊 Anhören",
      listenAgain: "🔊 Noch einmal",
      lauschen: "🤫 Lauschen",
      lauschenAgain: "🤫 Noch einmal lauschen",
      lauschenRunning: "🌊 30 Sekunden lauschen...",
      showQuestion: "❓ Frage anzeigen",
      questionAfter60: "❓ Frage nach 60 Sekunden",
      readAloud: "Text vorlesen",
      backToMap: "🗺️ Zur Karte",
      nextToMap: "🗺️ Weiterreisen",
      toCert: "🏅 Zu deiner Urkunde",
      toTurbo: "🚀 Finale: Turbo-Müllsammeln!",
      mysteryListen: "erst hören",
      mysteryLausch: "lausch mal",
      mysteryAlt: "Verdecktes Rätselbild eines Meerestiers",
      audioBlocked: "Der Browser hat den Ton blockiert. Klicke noch einmal auf Anhören.",
      afterListen: "Höre gut zu. Danach erscheint die Frage, und du entscheidest dich für eine Antwort.",
      afterSoundEnd: "Der Klang ist vorbei. Klicke jetzt auf Frage anzeigen und wähle danach deine Antwort.",
      questionTime: "Jetzt kommt die Frage. Wähle die Antwort, die am besten zu dem Klang passt.",
      questionTimeAuto: "Die Lauschzeit ist vorbei. Jetzt kommt die Frage: Was hast du wahrgenommen?",
      wrongTry: "Noch nicht ganz. Die kleine Hilfe ist eingeblendet. Höre bei Bedarf noch einmal und wähle dann erneut.",
      wrongTryPro: "Noch nicht ganz – im Profi-Modus gibt es keine Hilfe. Höre noch einmal genau hin!",
      finaleListenIntro: "Psst. Jetzt läuft eine halbe Minute Ozean-Geräusch. Warte bis zum Ende und überlege: Was hörst du wirklich?",
      cue1: "Psst, hört ihr was?",
      cue2: "Macht mal die Augen kurz zu und konzentriert euch auf das Geräusch.",
      successNarrator: "Sehr gut! Jetzt erfährst du, warum diese Stimme im Ozean wichtig ist.",
      successNarratorFinale: "Juhu, ihr habt es geschafft! Jetzt seid ihr Stimmen für den Ozean.",
      shellsEarned: (n) => `+${n} ${n === 1 ? "Muschel" : "Muscheln"} 🐚`,
      factResearch: "Forscher-Fact",
      factLearn: "Was lernen wir?",
      factProtect: "Meeresschutz",
      factTask: "Ocean-Van-Auftrag",
      certEyebrow: "Pro Ocean Forscher-Urkunde",
      certTitle: "Urkunde der Ozean-Lauscher",
      certText: "hat alle Stimmen des Ozeans entdeckt – die lauten, die leisen und sogar die stillen – und weiß jetzt, warum das Meer unseren Schutz braucht.",
      certAnon: "Ein mutiger Ozean-Forscher / eine mutige Ozean-Forscherin",
      certScore: (n, r) => `Gesammelte Muscheln: ${n} 🐚 · Recycelte Müllteile: ${r} ♻️`,
      certTurbo: (sc, r) => `Turbo-Finale: ${sc} Punkte ${r}`,
      print: "📄 Als PDF speichern / drucken",
      playAgain: "🔁 Noch einmal spielen",
      travelTo: "Der Ocean Van reist los...",
      stationOf: (a, b) => `${a}/${b}`
    },
    spots: {
      seagull: {
        zone: "Klang-Spot Küste", title: "Ein Ruf über den Wellen", animal: "Möwe",
        intro: "Der Ocean Van parkt an der Küste. Über den Wellen ruft ein Tier. Höre zuerst genau hin – das Bild bleibt noch verdeckt.",
        hint: "Dieses Tier fliegt oft über Strände, Häfen und Klippen. Sein Ruf kann Warnung, Streit oder Kontakt bedeuten.",
        question: "Welches Tier ruft hier?", choices: ["Möwe", "Delfin", "Pinguin"], correct: "Möwe",
        success: "Richtig! Das war eine Möwe.",
        funFact: "Möwen nutzen verschiedene Rufe für verschiedene Situationen. Es gibt zum Beispiel Kontakt-, Warn- und Streitlaute.",
        learn: "Tierlaute sind nicht einfach nur Geräusche. Sie können Informationen tragen – fast wie kurze Nachrichten.",
        protect: "Was am Strand liegen bleibt, kann ins Meer geweht werden. Saubere Strände schützen Küsten- und Meerestiere.",
        task: "Merke dir: Schon am Strand beginnt Meeresschutz.",
        alt: "Eine rufende Möwe am Wasser"
      },
      sealion: {
        zone: "Klang-Spot Felsenstrand", title: "Wer bellt am Meer?", animal: "Seelöwe",
        intro: "Am Felsenstrand hört der Ocean Van ein lautes Bellen. Aber hier steht kein Hund. Starte den Klang und höre genau hin.",
        hint: "Dieses Meeressäugetier lebt oft in Gruppen. Manche seiner Laute klingen fast wie Hundebellen.",
        question: "Wer bellt da am Meer?", choices: ["Walross", "Seelöwe", "Buckelwal"], correct: "Seelöwe",
        success: "Richtig! Das war ein Seelöwe.",
        funFact: "Seelöwen können bellen, knurren und rufen. Muttertiere und Jungtiere können sich an ihren Stimmen wiedererkennen.",
        learn: "Stimmen helfen Tieren, in einer Gruppe Kontakt zu halten und sich wiederzufinden.",
        protect: "Seelöwen brauchen Ruheplätze. Abstand halten hilft ihnen beim Ausruhen und beim Aufziehen der Jungtiere.",
        task: "Dein Auftrag: Tiere aus der Ferne beobachten – nicht verfolgen und nicht füttern.",
        alt: "Ein Kalifornischer Seelöwe am Meer"
      },
      penguin: {
        zone: "Klang-Spot Kalte Insel", title: "Stimmen im Gewimmel", animal: "Pinguin",
        intro: "Der Ocean Van bringt dich zu einer kalten Insel. Viele Tiere rufen durcheinander. Deine Aufgabe: Finde heraus, wer hier so auffällig ruft.",
        hint: "Diese Vögel leben oft in großen Kolonien. Dort müssen sie Partner, Eltern oder Küken zwischen vielen Stimmen wiederfinden.",
        question: "Welches Tier lebt in solchen rufenden Gruppen?", choices: ["Robbe", "Albatros", "Pinguin"], correct: "Pinguin",
        success: "Richtig! Das war ein Pinguin.",
        funFact: "Pinguine können wichtige Stimmmerkmale unterscheiden. So finden Familienmitglieder einander auch in einer sehr lauten Kolonie.",
        learn: "Genaues Hören kann wichtiger sein als gutes Sehen, besonders wenn viele Tiere eng zusammenleben.",
        protect: "Lärm, Störungen und veränderte Lebensräume können die Orientierung von Tieren erschweren.",
        task: "Dein Auftrag: Ruhig bleiben, wenn Tiere brüten oder Jungtiere aufziehen.",
        alt: "Ein Königspinguin mit orange-gelben Kopffedern"
      },
      seahorse: {
        zone: "Klang-Spot Seegraswiese", title: "Kleine Klicks im Seegras", animal: "Seepferdchen",
        intro: "Jetzt wird es viel leiser. Der Ocean Van nimmt dich mit in eine Seegraswiese. Vielleicht hörst du nur ein kleines Klick-Klick.",
        hint: "Dieses kleine Tier ist gut getarnt. Es hält sich mit seinem Schwanz gern an Pflanzen oder Korallen fest.",
        question: "Welches kleine Meerestier könnte hier klicken?", choices: ["Buckelwal", "Seepferdchen", "Garnele"], correct: "Seepferdchen",
        success: "Richtig! Das war ein Seepferdchen.",
        funFact: "Seepferdchen wirken still, doch einige Arten erzeugen kurze Klicklaute – zum Beispiel beim Fressen, bei der Balz oder bei Stress.",
        learn: "Nicht alle Tierlaute sind laut. Manche Hinweise der Natur entdeckt man nur, wenn man aufmerksam und geduldig ist.",
        protect: "Seegraswiesen sind Kinderstuben des Meeres. Sie bieten jungen Tieren Schutz und speichern außerdem Kohlenstoff.",
        task: "Dein Auftrag: Kleine Lebensräume ernst nehmen – auch wenn sie unscheinbar wirken.",
        alt: "Ein Seepferdchen unter Wasser"
      },
      dolphin: {
        zone: "Klang-Spot Offenes Meer", title: "Pfeifen im blauen Wasser", animal: "Delfin",
        intro: "Jetzt geht die Reise ins offene Meer. Dort sind Pfeiftöne und schnelle Klicks zu hören. Starte den Klang.",
        hint: "Dieses soziale Tier nutzt Pfeiftöne und Klicks, um Kontakt zu halten und sich unter Wasser zu orientieren.",
        question: "Wer pfeift und klickt hier?", choices: ["Walross", "Seekuh", "Delfin"], correct: "Delfin",
        success: "Richtig! Das war ein Delfin.",
        funFact: "Delfine nutzen Pfeiftöne, Klicks und schnelle Pulslaute. Klicks helfen ihnen, die Umgebung akustisch abzutasten.",
        learn: "Unter Wasser ist Schall sehr wichtig: Er hilft bei Orientierung, Kontakt und Nahrungssuche.",
        protect: "Zu viel Unterwasserlärm kann Kommunikation und Orientierung stören. Ruhigere Meere schützen Delfine und viele andere Meerestiere.",
        task: "Dein Auftrag: Erzähle weiter, dass Lärm im Meer ein echtes Problem sein kann.",
        alt: "Ein Delfin unter Wasser"
      },
      whale: {
        zone: "Klang-Spot Tiefes Blau", title: "Das Lied des Riesen", animal: "Buckelwal",
        intro: "Jetzt tauchst du tiefer. Ein langer, tiefer Klang zieht durch das Wasser. Höre, wie weit eine Stimme reisen kann.",
        hint: "Dieses Tier ist riesig. Seine tiefen Laute können sich im Wasser weit ausbreiten.",
        question: "Welcher Meeresriese singt hier?", choices: ["Buckelwal", "Riesenkrake", "Mondfisch"], correct: "Buckelwal",
        success: "Richtig! Das war ein Buckelwal.",
        funFact: "Buckelwale sind für lange und komplexe Gesangsmuster bekannt. Besonders bekannt sind die Gesänge der Männchen.",
        learn: "Tiefe Töne können im Meer über große Strecken wahrnehmbar sein. Klang verbindet Lebensräume, die weit voneinander entfernt sind.",
        protect: "Wale brauchen möglichst störungsarme Klangräume, damit ihre Stimmen nicht von Schiffslärm überdeckt werden.",
        task: "Dein Auftrag: Große Tiere brauchen große, geschützte Meeresräume.",
        alt: "Buckelwal mit Kalb unter Wasser"
      },
      babyseal: {
        zone: "Klang-Spot Eisrand", title: "Ein Ruf am Eisrand", animal: "Robbenjunges",
        intro: "Am Eisrand ist ein helles Rufen zu hören. Es klingt jung und suchend. Höre genau hin.",
        hint: "Dieses Jungtier ruft nach seiner Mutter. Seine Stimme kann helfen, wieder zusammenzufinden.",
        question: "Welches Jungtier ruft hier?", choices: ["Pinguinküken", "Robbenjunges", "Eisbärjunges"], correct: "Robbenjunges",
        success: "Richtig! Das war ein Robbenjunges.",
        funFact: "Bei vielen Robbenarten helfen Rufe dabei, dass Mutter und Jungtier einander wiederfinden, besonders wenn viele Tiere in der Nähe sind.",
        learn: "Für Jungtiere kann Kommunikation überlebenswichtig sein. Ein Ruf kann bedeuten: Ich bin hier.",
        protect: "Jungtiere niemals anfassen und nicht zu nah herangehen. Abstand, Ruhe und Respekt schützen sie.",
        task: "Dein Auftrag: Wenn du ein Wildtier findest, hole Erwachsene oder Fachleute – aber halte Abstand.",
        alt: "Ein junges Robbenbaby auf Eis"
      },
      jellyfish: {
        zone: "Klang-Spot Lautlose Lagune", title: "Der stille Gast", animal: "Qualle",
        intro: "An diesem Spot wird es geheimnisvoll. Der Ocean Van hält an einer stillen Lagune. Höre genau hin – hörst du überhaupt etwas?",
        hint: "Achtung, Trick-Frage! Dieses Tier hat keine Stimme, keine Knochen und kein Gehirn. Es schwebt fast lautlos durchs Wasser.",
        question: "Hier war nur Wasser zu hören. Welches Tier schwebt trotzdem ganz still vorbei?",
        choices: ["Schweinswal", "Qualle", "Papageifisch"], correct: "Qualle",
        success: "Richtig! Das war eine Qualle – ein Tier ganz ohne Stimme.",
        funFact: "Quallen bestehen zu über 95 Prozent aus Wasser. Sie haben kein Gehirn und kein Herz – und machen selbst so gut wie keine Geräusche.",
        learn: "Nicht jedes Meerestier hat eine Stimme. Auch die stillen Tiere gehören zum Ozean und brauchen Schutz.",
        protect: "Plastiktüten sehen im Wasser fast aus wie Quallen. Meeresschildkröten verwechseln sie und fressen sie. Weniger Plastik rettet Leben!",
        task: "Dein Auftrag: Nimm eine Stofftasche statt einer Plastiktüte – dem Meer zuliebe.",
        alt: "Eine Qualle schwebt still durchs Wasser"
      },
      finale: {
        zone: "Finale – Der stille Ozean", title: "Was bleibt, wenn es still wird?", animal: "Pro Ocean",
        intro: "Du hast viele Stimmen des Ozeans gehört. Jetzt kommt eine ganze Minute zum Lauschen. Bleib ruhig und achte darauf, was du im Meer wahrnimmst.",
        hint: "Manchmal ist die wichtigste Botschaft nicht laut. Manche Tiere hören wir Menschen kaum, obwohl sie da sind und Schutz brauchen.",
        question: "Was hörst du jetzt?", choices: ["Viele laute Stimmen", "Unterwasser-Rauschen", "Einen Schiffsmotor"], correct: "Unterwasser-Rauschen",
        success: "Juhu, geschafft! Ihr habt die Klangreise gemeistert.",
        funFact: "Der Ozean ist nicht leer, wenn wir Menschen nichts hören. Viele Tiere sind weit weg, sehr leise oder nur mit besonderen Geräten gut wahrnehmbar.",
        learn: "Manche Tiere rufen laut, manche klicken sehr leise, manche bleiben für uns fast unhörbar. Trotzdem sind alle wichtig.",
        protect: "Wenn die Tiere nicht laut genug für sich sprechen können, brauchen sie eure Stimme: gegen Müll, für Schutzgebiete und für einen respektvollen Umgang mit dem Meer.",
        task: "Mit dem Ocean Van bringt Pro Ocean das Meer zu Kindern. Erzähle anderen, was du gehört hast und warum der Ozean Schutz braucht.",
        alt: "Pro Ocean Ocean Van mit Meeresmotiven"
      }
    }
  },

  en: {
    ui: {
      eyebrow: "Ocean Van Learning Game",
      title: "Your Ocean Van Sound Journey",
      startCatcher: "The Ocean Van brings the sea to your doorstep – and into your ear.",
      startLead: "Travel across the ocean map to mysterious sound spots. Listen closely and find out which animal is calling – some are even completely silent!",
      nameLabel: "Your explorer name (for your certificate):",
      namePlaceholder: "e.g. Mia",
      modeKid: "🐠 Explorer Mode",
      modeKidSub: "With hints – for kids",
      modePro: "🦈 Listening Pro Mode",
      modeProSub: "No hints, double shells",
      startFs: "Start game in fullscreen",
      startWin: "Start without fullscreen",
      mapHint: "Steer the Ocean Van with the arrow keys – or tap the sea. Drive to a ❓!",
      mapHintFinale: "All animals discovered! Sail out to the ⭐ in the sea for the grand finale.",
      mapHintDone: "Sound journey complete! You can visit every station again.",
      rotateHint: "Please turn your phone sideways – so the whole map fits the screen.",
      missionTitle1: "You are a Pro Ocean litter collector! 🌊",
      missionText1: "The litter in this game is based on real finds by Pro Ocean. Your mission: collect as many DIFFERENT pieces of litter as possible and clear the game! Clean up the beach first (5 pieces) and bring them to the ♻️ Pro Ocean recycling station – we'll build your boat from them.",
      missionTitle2: "Your recycling boat is ready! 🛥️",
      missionText2: "But the sea is still full of plastic! Collect at least 3 pieces of ocean plastic and bring them to the ♻️ recycling point. Only then will the sound spots unlock 🔒.",
      missionOk: "Let's go!",
      questSea: (n, m) => `Collect ocean plastic and bring it to the ♻️ recycling point! (${n}/${m}) Then the sound spots will unlock 🔒.`,
      toastSpotsLocked: "The sound spots are still locked 🔒 – recycle some ocean plastic first!",
      toastSpotsUnlocked: "🎉 The sound spots are unlocked! Drive to a ❓ and listen closely.",
      spotsUnlockedTitle: "🎉 Sound spots unlocked!",
      finaleReadyTitle: "🎉 All animals discovered!",
      toastTooHeavy: "Too heavy! You can't carry that – bring your litter to the ♻️ recycling point first.",
      heavyInfo: {
        ghostnet: "A ghost net! 🎣 Lost fishing nets drift in the sea for years and are deadly traps for animals. (+3 load!)",
        tire: "An old car tyre! 🛞 Rubber breaks down into tiny microplastics in the sea. (+3 load!)",
        barrel: "An old barrel! 🛢️ Bulky waste must be disposed of properly – never in the sea. (+3 load!)"
      },
      toastOceanClean: "🎉 Incredible – you made the WHOLE sea litter-free! +5 bonus shells. You are a true Pro Ocean hero!",
      recLabel: "Pro Ocean Recycling",
      netLabel: "Fishing net",
      netTangle: "A ghost net! 🕸️ Stay on it a moment and wriggle free...",
      netHauled: "Net recovered! 🎣 Lost fishing nets keep trapping animals for years – good it's gone! (+load)",
      // Dive quest
      diveTitle: "Dive with the humpback whale 🐋",
      diveIntro: "Dive down and look around. Look to the right and discover what's hidden in the water.",
      diveJumpIn: "🤿 Dive down",
      diveDeeper: "Diving deeper…",
      diveLookHint: "Look around: drag to the right (or arrow key →) to glide further through the reef.",
      diveSpinProgress: (p) => `Looking around… ${p}%`,
      diveAfterBoat: "Keep looking right – the water turns murkier...",
      diveWhaleHeard: "Can you hear the deep song? Somewhere down here is a great singer...",
      diveBoatNoise: "⚠️ A motorboat races past above you – deafeningly loud underwater!",
      diveQuestion: "Which ocean giant is singing down here?",
      diveSonarBtn: "Stay underwater…",
      diveSonarPlaying: "What is that loud pulsing sound?",
      sonarInfoTitle: "Sonar – noise in the sea 📡",
      sonarInfoText: "That was a sonar. Ships and submarines send out sound waves and listen for the echo – that way they ‘see’ with sound what's underwater: the seabed, other ships or schools of fish. Handy for people – but underwater these sounds are extremely loud and disturb the whales: they can no longer communicate or navigate as well. Less underwater noise helps the whales.",
      diveResurface: "🌊 Surface again",
      diveBackToBoat: "Back in the boat! Now you know how much noise troubles the whales.",
      diveOnce: "This dive happens only once per game.",
      questTrash: (n, m) => `Winter mission: collect ${m} pieces of plastic on the beach! (${n}/${m}) 🛍️`,
      questDeliverFirst: "Great! Bring the litter to the ♻️ recycling point – your boat will be built from it!",
      questDeliver: "Fully loaded! 🐌 Bring the litter to the ♻️ recycling point!",
      questAnchor: "❄️ Get your icebreaker (❄️ on the map) – then you can cross the winter ice!",
      toastCargo: (n, m) => `🗑️ ${n}/${m} loaded – you're getting slower!`,
      toastCargoFull: "You can't carry any more! 🧺 Head to the ♻️ recycling point.",
      toastCargoFullFoot: "You can't carry any more! 🧺 Head to the ♻️ recycling point.",
      toastDeliver: (n) => `♻️ ${n} pieces recycled: +${n} shells! The ocean thanks you.`,
      toastDeliverMore: (n, m) => `Only ${n} of ${m} pieces with you – collect more before recycling!`,
      toastBoat: "Litter recycled! It becomes your very own recycling boat. Off to sea! 🛥️",
      toastNoBoat: "Stop! Build your boat first: collect litter and bring it to the ♻️ recycling point.",
      toastIceLocked: "Brrr, thick winter ice! ❄️ You can't get through without an icebreaker. Try the other ❓ quests first!",
      toastMangrove: "🌳 Mangroves! You can barely get through by car here – move slowly and collect the litter by hand.",
      toastMangroveCar: "🌳 Mangroves! You can't get through by car. Get out (button “Get out” or key E) and collect on foot.",
      toastOnFoot: "🚶 On foot! Collect the litter, then walk back to the car (button “Get in” or E).",
      toastInCar: "🚐 Back in the car! Let's go.",
      toastBackToCar: "Walk back to your parked car first to get in.",
      toastFootWater: "You can only get out on land.",
      btnExitCar: "🚶 Get out",
      btnEnterCar: "🚐 Get in",
      questReopen: (s) => `Listen again? Stay here… ${s}`,
      toastTurbo: "🚀 TURBO! Collect as much litter as you can and get back to the ♻️ camp!",
      turboIntroTitle: "🚀 Finale: Turbo litter pickup!",
      turboIntroHtml: "How the grand finale works:<br><br>• Collect litter and bring it to the ♻️ recycling station.<br>• The more litter you deliver, the more points!<br>• Litter you're still carrying also gives you a few points.<br>• Turbo is on: you can carry up to 10 pieces of litter – but bring some to the station now and then so you stay fast! 🚀<br><br>Ready? You have about 1 minute!",
      turboIntroGo: "GO! 🚀",
      mapHintTurbo: "🚀 Turbo: collect litter and bring it back to the ♻️ camp!",
      turboHud: (s, sc) => `🚀 ⏱ ${s}s · Score: ${sc}`,
      turboDeliver: (n) => `♻️ Delivered at camp! +${n * 5} points`,
      turboOverTitle: "Time's up! 🏁",
      turboOverText: (sc, un) => un > 0
        ? `Your turbo score: ${sc} points.\n(${un} pieces not delivered: -${un * 5} points. Next time make it back to camp in time!)`
        : `Awesome! Your turbo score: ${sc} points. Everything back at camp in time! 🎉`,
      toastIcebreaker: "Icebreaker fitted! ❄️ Real icebreakers have an extra-strong hull – now through the pack ice!",
      toastRow: "Rowing zone! 🚣 Engine noise disturbs sea animals – row quietly here.",
      toastCurrent: "An ocean current is pulling you along! Currents carry warmth – and sadly plastic too – across the sea.",
      toastShell: "+1 shell found! 🐚",
      praises: ["Great! 🌟", "Well done! 👏", "Awesome! 💙", "Keep going! 🐚", "Strong! 💪", "Bravo! 🎉", "Mega! 🌊"],
      toastNewType: (name, d, tot) => `New litter type: ${name}! 🆕 ${d}/${tot} types · +1 shell`,
      statsTitle: "Your litter haul",
      statsTotal: (n) => `Collected in total: ${n} pieces`,
      statsDistinct: (d, tot) => `Different litter types: ${d} of ${tot}`,
      highlightsTitle: "Your litter highlights",
      turboBtn: "🚀 Turbo: keep collecting!",
      mailHeading: "Certificate by email / newsletter (optional)",
      mailPlaceholder: "you@email.com",
      consentCert: "Receive certificate by email: my email is used only to send this certificate once and is not stored.",
      consentNews: "Subscribe to the Pro Ocean newsletter: my email may be stored and used for the newsletter (consent, revocable anytime).",
      mailSend: "📧 Submit",
      mailSubject: "My Pro Ocean Explorer Certificate",
      mailNote: "Note: nothing is sent or stored without a checkbox. Printing/PDF works without email. (For the newsletter a small consent file is created for Pro Ocean to import into their system.)",
      reset: "Restart",
      resetTitle: "Restart?",
      resetConfirm: "Everything will be reset: shells, animals, litter and name. You will start again from the very beginning.",
      resetYes: "Yes, start over!",
      resetNo: "Cancel",
      start: "Start",
      mapLabel: "Map",
      spotsSolved: (a, b) => `${a} of ${b} animals`,
      stepListen: "Listen",
      stepHint: "Question",
      stepAnswer: "Answer",
      stepLearn: "Learn",
      listen: "🔊 Listen",
      listenAgain: "🔊 Once more",
      lauschen: "🤫 Listen closely",
      lauschenAgain: "🤫 Listen once more",
      lauschenRunning: "🌊 Listening for 30 seconds...",
      showQuestion: "❓ Show question",
      questionAfter60: "❓ Question after 60 seconds",
      readAloud: "Read aloud",
      backToMap: "🗺️ Back to map",
      nextToMap: "🗺️ Travel on",
      toCert: "🏅 Get your certificate",
      toTurbo: "🚀 Finale: turbo litter pickup!",
      mysteryListen: "listen first",
      mysteryLausch: "shh, listen",
      mysteryAlt: "Hidden mystery picture of a sea animal",
      audioBlocked: "The browser blocked the sound. Please click Listen again.",
      afterListen: "Listen carefully. Then the question appears and you choose an answer.",
      afterSoundEnd: "The sound is over. Click Show question and then pick your answer.",
      questionTime: "Here comes the question. Choose the answer that fits the sound best.",
      questionTimeAuto: "Listening time is over. Now the question: what did you notice?",
      wrongTry: "Not quite. A little hint has appeared. Listen again if you like and try once more.",
      wrongTryPro: "Not quite – there are no hints in Pro mode. Listen again very closely!",
      finaleListenIntro: "Shh. Half a minute of ocean sound is playing now. Wait until the end and think: what do you really hear?",
      cue1: "Psst, can you hear anything?",
      cue2: "Close your eyes for a moment and focus on the sound.",
      successNarrator: "Well done! Now find out why this voice matters in the ocean.",
      successNarratorFinale: "Hooray, you made it! Now you are voices for the ocean.",
      shellsEarned: (n) => `+${n} shell${n === 1 ? "" : "s"} 🐚`,
      factResearch: "Researcher fact",
      factLearn: "What do we learn?",
      factProtect: "Ocean protection",
      factTask: "Ocean Van mission",
      certEyebrow: "Pro Ocean Explorer Certificate",
      certTitle: "Certificate of the Ocean Listeners",
      certText: "has discovered all the voices of the ocean – the loud ones, the quiet ones and even the silent ones – and now knows why the sea needs our protection.",
      certAnon: "A brave ocean explorer",
      certScore: (n, r) => `Shells collected: ${n} 🐚 · Litter recycled: ${r} ♻️`,
      certTurbo: (sc, r) => `Turbo finale: ${sc} points ${r}`,
      print: "📄 Save as PDF / print",
      playAgain: "🔁 Play again",
      travelTo: "The Ocean Van is on its way...",
      stationOf: (a, b) => `${a}/${b}`
    },
    spots: {
      seagull: {
        zone: "Sound Spot Coast", title: "A call above the waves", animal: "Seagull",
        intro: "The Ocean Van parks at the coast. Above the waves an animal is calling. Listen closely first – the picture stays hidden.",
        hint: "This animal often flies over beaches, harbours and cliffs. Its call can mean warning, quarrel or contact.",
        question: "Which animal is calling here?", choices: ["Seagull", "Dolphin", "Penguin"], correct: "Seagull",
        success: "Correct! That was a seagull.",
        funFact: "Seagulls use different calls for different situations – for example contact calls, alarm calls and quarrel calls.",
        learn: "Animal sounds are not just noise. They can carry information – almost like short messages.",
        protect: "Whatever is left on the beach can be blown into the sea. Clean beaches protect coastal and marine animals.",
        task: "Remember: ocean protection starts right on the beach.",
        alt: "A calling seagull by the water"
      },
      sealion: {
        zone: "Sound Spot Rocky Shore", title: "Who is barking by the sea?", animal: "Sea lion",
        intro: "At the rocky shore the Ocean Van hears loud barking. But there is no dog here. Start the sound and listen closely.",
        hint: "This marine mammal often lives in groups. Some of its calls sound almost like a dog barking.",
        question: "Who is barking by the sea?", choices: ["Walrus", "Sea lion", "Humpback whale"], correct: "Sea lion",
        success: "Correct! That was a sea lion.",
        funFact: "Sea lions can bark, growl and call. Mothers and pups can recognise each other by their voices.",
        learn: "Voices help animals stay in contact within a group and find each other again.",
        protect: "Sea lions need resting places. Keeping your distance helps them rest and raise their pups.",
        task: "Your mission: watch animals from afar – never chase or feed them.",
        alt: "A California sea lion by the sea"
      },
      penguin: {
        zone: "Sound Spot Cold Island", title: "Voices in the crowd", animal: "Penguin",
        intro: "The Ocean Van takes you to a cold island. Many animals are calling at once. Your task: find out who is calling so loudly here.",
        hint: "These birds often live in huge colonies. There they must find partners, parents or chicks among many voices.",
        question: "Which animal lives in such noisy groups?", choices: ["Seal", "Albatross", "Penguin"], correct: "Penguin",
        success: "Correct! That was a penguin.",
        funFact: "Penguins can tell important voice features apart. That is how family members find each other even in a very loud colony.",
        learn: "Careful listening can be more important than good eyesight, especially where many animals live close together.",
        protect: "Noise, disturbance and changing habitats can make it harder for animals to find their way.",
        task: "Your mission: stay calm and quiet when animals are breeding or raising their young.",
        alt: "A king penguin with orange-yellow head feathers"
      },
      seahorse: {
        zone: "Sound Spot Seagrass Meadow", title: "Tiny clicks in the seagrass", animal: "Seahorse",
        intro: "Now it gets much quieter. The Ocean Van takes you into a seagrass meadow. Maybe you only hear a tiny click-click.",
        hint: "This little animal is well camouflaged. It likes to hold on to plants or corals with its tail.",
        question: "Which small sea creature could be clicking here?", choices: ["Humpback whale", "Seahorse", "Shrimp"], correct: "Seahorse",
        success: "Correct! That was a seahorse.",
        funFact: "Seahorses seem silent, but some species make short clicking sounds – for example while feeding, courting or under stress.",
        learn: "Not all animal sounds are loud. Some of nature's clues can only be found with patience and attention.",
        protect: "Seagrass meadows are the nurseries of the sea. They shelter young animals and also store carbon.",
        task: "Your mission: take small habitats seriously – even if they look plain.",
        alt: "A seahorse underwater"
      },
      dolphin: {
        zone: "Sound Spot Open Sea", title: "Whistles in the blue water", animal: "Dolphin",
        intro: "Now the journey heads into the open sea. You can hear whistles and fast clicks there. Start the sound.",
        hint: "This social animal uses whistles and clicks to stay in touch and find its way underwater.",
        question: "Who is whistling and clicking here?", choices: ["Walrus", "Manatee", "Dolphin"], correct: "Dolphin",
        success: "Correct! That was a dolphin.",
        funFact: "Dolphins use whistles, clicks and fast pulsed sounds. Clicks help them scan their surroundings with sound.",
        learn: "Underwater, sound is essential: it helps with navigation, contact and finding food.",
        protect: "Too much underwater noise can disturb communication and navigation. Quieter seas protect dolphins and many other animals.",
        task: "Your mission: tell others that noise in the sea can be a real problem.",
        alt: "A dolphin underwater"
      },
      whale: {
        zone: "Sound Spot Deep Blue", title: "The song of the giant", animal: "Humpback whale",
        intro: "Now you dive deeper. A long, deep sound travels through the water. Hear how far a voice can go.",
        hint: "This animal is huge. Its deep sounds can spread far through the water.",
        question: "Which ocean giant is singing here?", choices: ["Humpback whale", "Giant squid", "Sunfish"], correct: "Humpback whale",
        success: "Correct! That was a humpback whale.",
        funFact: "Humpback whales are famous for long and complex song patterns. The songs of the males are especially well known.",
        learn: "Deep sounds can travel huge distances in the sea. Sound connects habitats that are far apart.",
        protect: "Whales need calm soundscapes so their voices are not drowned out by ship noise.",
        task: "Your mission: big animals need big, protected ocean areas.",
        alt: "Humpback whale with calf underwater"
      },
      babyseal: {
        zone: "Sound Spot Ice Edge", title: "A call at the ice edge", animal: "Seal pup",
        intro: "At the edge of the ice you hear a bright calling. It sounds young and searching. Listen closely.",
        hint: "This young animal is calling for its mother. Its voice helps them find each other again.",
        question: "Which baby animal is calling here?", choices: ["Penguin chick", "Seal pup", "Polar bear cub"], correct: "Seal pup",
        success: "Correct! That was a seal pup.",
        funFact: "In many seal species, calls help mother and pup find each other – especially when many animals are around.",
        learn: "For young animals, communication can be vital. A call can mean: I am here.",
        protect: "Never touch young wild animals and don't get too close. Distance, calm and respect protect them.",
        task: "Your mission: if you find a wild animal, get adults or experts – but keep your distance.",
        alt: "A young seal pup on ice"
      },
      jellyfish: {
        zone: "Sound Spot Silent Lagoon", title: "The silent guest", animal: "Jellyfish",
        intro: "This spot is mysterious. The Ocean Van stops at a silent lagoon. Listen closely – can you hear anything at all?",
        hint: "Careful, trick question! This animal has no voice, no bones and no brain. It floats almost silently through the water.",
        question: "You could only hear water here. Which animal still floats by in complete silence?",
        choices: ["Porpoise", "Jellyfish", "Parrotfish"], correct: "Jellyfish",
        success: "Correct! That was a jellyfish – an animal with no voice at all.",
        funFact: "Jellyfish are more than 95 percent water. They have no brain and no heart – and make almost no sound themselves.",
        learn: "Not every sea animal has a voice. The silent animals belong to the ocean too and need protection.",
        protect: "Plastic bags look almost like jellyfish in the water. Sea turtles mistake them for food and eat them. Less plastic saves lives!",
        task: "Your mission: take a cloth bag instead of a plastic bag – for the sake of the sea.",
        alt: "A jellyfish floating silently through the water"
      },
      finale: {
        zone: "Finale – The Silent Ocean", title: "What remains when it gets quiet?", animal: "Pro Ocean",
        intro: "You have heard many voices of the ocean. Now comes a whole minute of listening. Stay calm and notice what you can hear in the sea.",
        hint: "Sometimes the most important message is not loud. Some animals are nearly impossible for humans to hear, although they are there and need protection.",
        question: "What do you hear now?", choices: ["Many loud voices", "Underwater noise", "A ship's engine"], correct: "Underwater noise",
        success: "Hooray, you did it! You have mastered the sound journey.",
        funFact: "The ocean is not empty just because we humans hear nothing. Many animals are far away, very quiet or only audible with special equipment.",
        learn: "Some animals call loudly, some click very quietly, some remain almost inaudible to us. Yet all of them matter.",
        protect: "If the animals cannot speak loudly enough for themselves, they need your voice: against litter, for protected areas and for treating the sea with respect.",
        task: "With the Ocean Van, Pro Ocean brings the sea to children. Tell others what you heard and why the ocean needs protection.",
        alt: "Pro Ocean Ocean Van with sea designs"
      }
    }
  }
};

/* ---------- DOM ---------- */
const $ = (id) => document.getElementById(id);
const els = {
  startOverlay: $("startOverlay"), startBtn: $("startBtn"), startWindowBtn: $("startWindowBtn"),
  langDe: $("langDe"), langEn: $("langEn"), langToggle: $("langToggle"), soundToggle: $("soundToggle"),
  diveScreen: $("diveScreen"), diveScene: $("diveScene"), diveBg: $("divePanoBg"),
  diveBoat: $("diveBoat"), diveCompass: $("diveCompass"),
  collectPop: $("collectPop"),
  certHighlights: $("certHighlights"),
  mailHeading: $("mailHeading"), mailInput: $("mailInput"), mailBtn: $("mailBtn"), mailNote: $("mailNote"),
  consentCert: $("consentCert"), consentCertText: $("consentCertText"),
  consentNews: $("consentNews"), consentNewsText: $("consentNewsText"),
  diveNarrator: $("diveNarrator"), diveActionBtn: $("diveActionBtn"),
  diveQuestionBox: $("diveQuestionBox"), diveQuestionText: $("diveQuestionText"),
  diveChoices: $("diveChoices"), diveFeedback: $("diveFeedback"),
  modeKid: $("modeKid"), modePro: $("modePro"), nameInput: $("nameInput"),
  fullscreenAgain: $("fullscreenAgain"),
  scorePill: $("scorePill"), progressText: $("progressText"),
  mapScreen: $("mapScreen"), mapCanvas: $("mapCanvas"), vanMarker: $("vanMarker"),
  mapHint: $("mapHint"), resetBtn: $("resetBtn"), footBtn: $("footBtn"),
  parkedCar: $("parkedCar"), questHover: $("questHover"), turboTimer: $("turboTimer"),
  joystick: $("joystick"), joyKnob: $("joyKnob"),
  mapToast: $("mapToast"),
  missionOverlay: $("missionOverlay"), missionTitle: $("missionTitle"),
  missionText: $("missionText"), missionOkBtn: $("missionOkBtn"), missionCancelBtn: $("missionCancelBtn"),
  stationScreen: $("stationScreen"),
  zoneLabel: $("zoneLabel"), stationTitle: $("stationTitle"), narratorText: $("narratorText"),
  animalImage: $("animalImage"), mysteryBadge: $("mysteryBadge"),
  imageCard: document.querySelector(".image-card"), eq: $("eq"), passStrip: $("passStrip"),
  playBtn: $("playBtn"), hintBtn: $("hintBtn"), hintBox: $("hintBox"),
  questionBox: $("questionBox"), questionText: $("questionText"), choices: $("choices"),
  feedbackBox: $("feedbackBox"), mapBtn: $("mapBtn"), nextBtn: $("nextBtn"),
  readAloudBtn: $("readAloudBtn"), audio: $("animalAudio"),
  oceanCueOverlay: $("oceanCueOverlay"), oceanCueText: $("oceanCueText"),
  certScreen: $("certScreen"), certTitle: $("certTitle"), certName: $("certName"),
  certText: $("certText"), certCards: $("certCards"), certScore: $("certScore"),
  certStats: $("certStats"), certDate: $("certDate"),
  printBtn: $("printBtn"), certMapBtn: $("certMapBtn"), certRestartBtn: $("certRestartBtn"),
  steps: { listen: $("stepListen"), hint: $("stepHint"), answer: $("stepAnswer"), learn: $("stepLearn") }
};

/* ---------- Zustand ---------- */
const SAVE_KEY = "oceanvan_v10";
const state = {
  lang: "de",
  mode: "kid",            // kid | pro
  name: "",
  solved: {},             // id -> shells earned
  shells: 0,
  cargo: 0,               // geladenes Müllgewicht (macht langsam!)
  boatBuilt: false,       // erstes Recycling: Boot gebaut
  recycled: 0,            // insgesamt recycelte Müllteile
  collected: {},          // Kategorie -> Anzahl (für Statistik/Vielfalt)
  collectedImgs: {},      // Kategorie -> Beispielbild (für Urkunde-Highlights)
  netsTaken: [],          // eingesammelte Netze
  barrelsTaken: [],       // eingesammelte Fässer/Reifen
  bonusTaken: [],         // Indizes der gesammelten Bonus-Muscheln
  icebreaker: false,
  diveDone: false,        // Tauch-Quest in diesem Zyklus schon gespielt?
  turbo: false,           // Endmodus nach dem Finale
  turboScore: null,       // Ergebnis der Turbo-Power-Runde (für die Urkunde)
  finaleAnnounced: false, // großes "Alle Tiere entdeckt"-Popup schon gezeigt?
  sound: true,            // Geräusche an/aus
  current: null,          // aktueller Spot (Objekt) oder null
  isFinale: false,
  phase: "listen",
  hasListened: false, hasHint: false, answered: false, tries: 0,
  oceanCueTimers: [], oceanCueHideTimer: null,
  started: false
};

/* Bewusst KEINE Spielstand-Speicherung: Jeder Start ist ein frisches Spiel
   (wichtig für Events, wenn viele Kinder nacheinander spielen).
   Nur die Sprache wird gemerkt. */
function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ lang: state.lang }));
  } catch (e) { /* privat-Modus o.ä. */ }
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    if (d.lang) state.lang = d.lang;
  } catch (e) { /* ignore */ }
}

const UI = () => I18N[state.lang].ui;
const SPOT_TEXT = (id) => I18N[state.lang].spots[id];
const allSolved = () => SPOTS.every(s => state.solved[s.id] !== undefined);
const solvedCount = () => SPOTS.filter(s => state.solved[s.id] !== undefined).length;
const boatUnlocked = () => state.boatBuilt;
// Klang-Spots öffnen erst, wenn nach dem Bootsbau Ozeanplastik recycelt wurde (5 Strand + 3 See)
const SEA_TRASH_TO_UNLOCK = 3;
const spotsUnlocked = () => state.recycled >= TRASH_NEEDED + SEA_TRASH_TO_UNLOCK;
const anchorAvailable = () => solvedCount() >= 3 && !state.icebreaker;
// Im Turbo sanfter abbremsen (bei voller Ladung 10 noch ~50% Tempo), sonst wie gehabt
const cargoFactor = () => state.turbo
  ? Math.max(0.7, 1 - 0.03 * state.cargo)
  : Math.max(0.18, 1 - 0.14 * state.cargo);

/* ---------- Sprache ---------- */
function applyStaticTexts() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = UI()[key];
    if (typeof val === "string") el.textContent = val;
  });
  els.nameInput.placeholder = UI().namePlaceholder;
  els.startBtn.textContent = UI().startFs;
  els.startWindowBtn.textContent = UI().startWin;
  els.readAloudBtn.textContent = UI().readAloud;
  els.resetBtn.textContent = UI().reset;
  els.printBtn.textContent = UI().print;
  els.certMapBtn.textContent = UI().backToMap;
  els.certRestartBtn.textContent = UI().playAgain;
  els.langToggle.textContent = state.lang === "de" ? "EN" : "DE";
  els.langDe.classList.toggle("active", state.lang === "de");
  els.langEn.classList.toggle("active", state.lang === "en");
}

function setLang(lang) {
  state.lang = lang;
  applyStaticTexts();
  save();
  if (!state.started) return;
  if (!els.mapScreen.classList.contains("hidden")) renderMap();
  else if (!els.stationScreen.classList.contains("hidden")) renderStation();
  else if (!els.certScreen.classList.contains("hidden")) renderCertificate();
}

/* ---------- Screens ---------- */
function showScreen(name) {
  els.mapScreen.classList.toggle("hidden", name !== "map");
  els.stationScreen.classList.toggle("hidden", name !== "station");
  els.certScreen.classList.toggle("hidden", name !== "cert");
  els.diveScreen.classList.toggle("hidden", name !== "dive");
  if (name !== "map" && els.footBtn) els.footBtn.classList.add("hidden");
}

/* ---------- Karte ---------- */
function spotEmoji(spot) {
  if (state.solved[spot.id] === undefined) {
    if (spot.id === "finale") return "⭐";
    return spotsUnlocked() ? "❓" : "🔒";
  }
  const icons = {
    seagull: "🐦", sealion: "🦭", penguin: "🐧", seahorse: "🌿",
    dolphin: "🐬", whale: "🐋", babyseal: "🤍", jellyfish: "🪼", finale: "🏅"
  };
  return icons[spot.id] || "✅";
}

function renderMap() {
  showScreen("map");
  els.scorePill.classList.remove("hidden");
  els.scorePill.textContent = `🐚 ${state.shells}`;
  els.progressText.textContent = UI().spotsSolved(solvedCount(), SPOTS.length);

  // Spots neu aufbauen
  els.mapCanvas.querySelectorAll(".spot").forEach(n => n.remove());
  const spots = allSolved() ? [...SPOTS, FINALE_SPOT] : SPOTS;
  spots.forEach(spot => {
    const isSolved = state.solved[spot.id] !== undefined;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "spot" + (isSolved ? " solved" : "") + (spot.id === "finale" ? " finale-spot" : "");
    btn.setAttribute("data-spot", spot.id);
    btn.style.left = spot.x + "%";
    btn.style.top = spot.y + "%";
    btn.innerHTML = `<span class="spot-icon">${spotEmoji(spot)}</span>` +
      (isSolved ? `<span class="spot-name">${SPOT_TEXT(spot.id).animal}</span>` : "");
    btn.setAttribute("aria-label", isSolved ? SPOT_TEXT(spot.id).animal : UI().mapHint);
    btn.addEventListener("click", () => travelTo(spot));
    els.mapCanvas.appendChild(btn);
  });

  ensureStock();
  renderPickups();
  updateMapHint();

  // Wiedereinstieg: Van steht am zuletzt besuchten Spot; dieser öffnet erst wieder,
  // wenn man kurz wegfährt oder ihn gezielt antippt.
  van.guardSpot = state.current ? state.current.id : null;
  drawVan();
  updateFootBtn();
  if (els.turboTimer) els.turboTimer.classList.toggle("hidden", !turbo.active);
}

function updateMapHint() {
  const u = UI();
  if (state.turbo) { els.mapHint.textContent = u.mapHintTurbo; return; }
  if (!boatUnlocked()) {
    els.mapHint.textContent = state.cargo >= TRASH_NEEDED ? u.questDeliverFirst : u.questTrash(state.cargo, TRASH_NEEDED);
  } else if (!spotsUnlocked()) els.mapHint.textContent = u.questSea(Math.max(0, state.recycled - TRASH_NEEDED), SEA_TRASH_TO_UNLOCK);
  else if (state.cargo >= cargoMax()) els.mapHint.textContent = u.questDeliver;
  else if (state.solved.finale !== undefined) els.mapHint.textContent = u.mapHintDone;
  else if (allSolved()) els.mapHint.textContent = u.mapHintFinale;
  else if (anchorAvailable()) els.mapHint.textContent = u.questAnchor;
  else els.mapHint.textContent = u.mapHint;
}

function addPickup(cls, x, y, emoji, label) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "pickup " + cls;
  el.style.left = x + "%";
  el.style.top = y + "%";
  el.textContent = emoji;
  el.setAttribute("aria-label", label || emoji);
  el.addEventListener("click", () => { van.tx = x; van.ty = y; }); // Antippen = hinfahren
  els.mapCanvas.appendChild(el);
  return el;
}

function addRecStation() {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "pickup rec-station";
  el.style.left = REC_STATION.x + "%";
  el.style.top = REC_STATION.y + "%";
  el.setAttribute("aria-label", UI().recLabel);
  el.innerHTML = `<img class="rec-img" src="assets/images/recycling_station.png" alt="">`;
  el.addEventListener("click", () => { van.tx = REC_STATION.x; van.ty = REC_STATION.y + 3; });
  els.mapCanvas.appendChild(el);
}

function addNet(n) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "pickup net";
  el.style.left = n.x + "%";
  el.style.top = n.y + "%";
  el.style.setProperty("--net-r", n.r);
  el.setAttribute("aria-label", UI().netLabel);
  el.innerHTML = `<span class="net-mesh" aria-hidden="true"></span><span class="net-fish" aria-hidden="true">🐟</span>`;
  el.addEventListener("click", () => { van.tx = n.x; van.ty = n.y; });
  els.mapCanvas.appendChild(el);
}

function addTrashImg(t) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "pickup trash-img";
  el.style.left = t.x + "%";
  el.style.top = t.y + "%";
  el.setAttribute("aria-label", (state.lang === "de" ? CAT[t.cat].de : CAT[t.cat].en));
  el.innerHTML = `<img src="${t.img}" alt="">`;
  el.addEventListener("click", () => { van.tx = t.x; van.ty = t.y; });
  els.mapCanvas.appendChild(el);
  t.el = el;
}

// Feste Mangroven-Positionen (ändern sich NIE) – deterministisch berechnet
const MANGROVE_TREES = (() => {
  const t = [];
  for (let y = 21; y <= 33; y += 3) {
    for (let x = 2; x <= 18; x += 3) {
      if (isLand(x, y) && y >= 20) t.push({ x, y });
    }
  }
  return t;
})();
function addMangroves() {
  els.mapCanvas.querySelectorAll(".mangrove-deco").forEach(n => n.remove());
  MANGROVE_TREES.forEach(t => {
    const s = document.createElement("span");
    s.className = "mangrove-deco";
    s.textContent = "🌳";
    s.style.left = t.x + "%"; s.style.top = t.y + "%";
    els.mapCanvas.appendChild(s);
  });
}

function renderPickups() {
  els.mapCanvas.querySelectorAll(".pickup").forEach(n => n.remove());
  addMangroves();
  addRecStation();   // Pro Ocean Recyclingstation ist immer da
  if (boatUnlocked()) netField().forEach(addNet);
  // Müllteile (echte Bilder aus der Pro-Ocean-Sammlung)
  trashItems.forEach(addTrashImg);
  if (boatUnlocked()) {
    BONUS_SHELLS.forEach((b, i) => {
      if (!state.bonusTaken.includes(i)) addPickup("pickup-shell", b.x, b.y, "🐚", "Bonus-Muschel");
    });
  }
  if (anchorAvailable()) addPickup("pickup-anchor", ANCHOR.x, ANCHOR.y, "❄️", "Eisbrecher");
}

/* Kurze Karten-Nachrichten */
let toastTimer = null;
let lastToastText = "";
let lastToastAt = 0;
function toast(text, ms = 4200) {
  if (text === lastToastText && performanceNow() - lastToastAt < 2600) return;
  lastToastText = text;
  lastToastAt = performanceNow();
  els.mapToast.textContent = text;
  els.mapToast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.mapToast.classList.add("hidden"), ms);
}
function performanceNow() { return lastTs === null ? 0 : lastTs; }

/* Eingesammeltes Müllteil kurz groß einblenden, damit man es gut sieht */
let collectPopTimer = null;
function showCollectPop(img, ms) {
  if (!els.collectPop) return;
  ms = ms || 5000;   // Müll 5 Sekunden groß zeigen
  const im = els.collectPop.querySelector("img");
  if (im) im.src = img;
  const pr = document.getElementById("collectPraise");
  if (pr) { const p = UI().praises; pr.textContent = p[Math.floor(Math.random() * p.length)]; }
  els.collectPop.style.animationDuration = ms + "ms";
  els.collectPop.classList.remove("hidden", "show");
  void els.collectPop.offsetWidth;   // Reflow für Neustart der Animation
  els.collectPop.classList.add("show");
  clearTimeout(collectPopTimer);
  collectPopTimer = setTimeout(() => els.collectPop.classList.add("hidden"), ms);
}

/* ---------- Audio-Engine (echte Sounddateien, zuverlässig & leise) ---------- */
const AUDIO = {
  cache: {},
  mode: "off",
  unlocked: false,

  get(src) {
    if (!this.cache[src]) {
      const a = new Audio(src);
      a.preload = "auto";
      this.cache[src] = a;
    }
    return this.cache[src];
  },

  // Auf erster Nutzergeste die Audiowiedergabe freischalten (mobile Autoplay-Politik)
  prime() {
    if (this.unlocked) return;
    this.unlocked = true;
    ["assets/audio/car.mp3", "assets/audio/engine.mp3", "assets/audio/rowing.mp3", "assets/audio/steps.mp3"].forEach(src => {
      try {
        const a = this.get(src);
        a.loop = true; a.volume = 0;
        a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => {});
      } catch (e) {}
    });
  },

  // Drei Dauer-Loops mit weichem Lautstärke-Crossfade: Auto (Land), Boot (Wasser), Rudern (Lagune)
  loopSrc: { car: "assets/audio/car.mp3", boat: "assets/audio/engine.mp3", row: "assets/audio/rowing.mp3", step: "assets/audio/steps.mp3" },
  target: { car: 0, boat: 0, row: 0, step: 0 },
  cur: { car: 0, boat: 0, row: 0, step: 0 },

  // Ziel-Lautstärken setzen (Fade übernimmt tick)
  setTargets(t) {
    this.target.car = t.car || 0;
    this.target.boat = t.boat || 0;
    this.target.row = t.row || 0;
    this.target.step = t.step || 0;
    if (!state.sound) { this.target.car = this.target.boat = this.target.row = this.target.step = 0; }
    ["car", "boat", "row", "step"].forEach(k => {
      if (this.target[k] > 0) {
        try { const a = this.get(this.loopSrc[k]); a.loop = true; if (a.paused) a.play().catch(() => {}); } catch (e) {}
      }
    });
  },

  // weiches Ein-/Ausblenden jedes Frame
  tick(dt) {
    const rate = 2.4 * (dt || 0.016);   // Fade-Geschwindigkeit
    ["car", "boat", "row", "step"].forEach(k => {
      const c = this.cur[k], tg = this.target[k];
      let nv = c + Math.max(-rate, Math.min(rate, tg - c));
      if (Math.abs(tg - c) < rate) nv = tg;
      this.cur[k] = nv;
      const a = this.cache[this.loopSrc[k]];
      if (a) {
        try {
          a.volume = Math.max(0, Math.min(1, nv));
          if (nv <= 0.001 && !a.paused) a.pause();
        } catch (e) {}
      }
    });
  },

  // Rückwärtskompatibel: setMode("off") schaltet alle Loops weich ab
  setMode(mode) {
    if (mode === "off" || !state.sound) { this.setTargets({}); return; }
    const presets = { car: { car: 0.22 }, boat: { boat: 0.30 }, row: { row: 0.34 } };
    this.setTargets(presets[mode] || {});
  },

  ensure() { this.prime(); return state.sound; },

  playOnce(src, vol) {
    if (!state.sound) return null;
    const a = this.get(src);
    a.loop = false; a.volume = (vol == null ? 1 : vol);
    try { a.currentTime = 0; } catch (e) {}
    try { a.play().catch(() => {}); } catch (e) {}
    return a;
  },
  playLoop(src, vol) {
    if (!state.sound) return null;
    const a = this.get(src);
    a.loop = true; a.volume = (vol == null ? 1 : vol);
    try { a.currentTime = 0; } catch (e) {}
    try { a.play().catch(() => {}); } catch (e) {}
    return a;
  },
  stop(src) { const a = this.cache[src]; if (a) { try { a.pause(); } catch (e) {} } },

  // kurzer Piep für den akustischen Countdown (letzte 5 Sekunden)
  beep(freq, ms) {
    if (!state.sound) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!this._bctx) this._bctx = new AC();
      const c = this._bctx, o = c.createOscillator(), g = c.createGain();
      o.type = "square"; o.frequency.value = freq || 880;
      o.connect(g); g.connect(c.destination);
      const t = c.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (ms || 150) / 1000);
      o.start(t); o.stop(t + (ms || 150) / 1000 + 0.02);
    } catch (e) {}
  },

  muteAll() {
    this.setTargets({});
    Object.values(this.cache).forEach(a => { try { a.pause(); } catch (e) {} });
  }
};

/* ---------- Fahr-Engine: Tasten, Touch, Boot & Wellen ---------- */
const van = {
  x: VAN_HOME.x, y: VAN_HOME.y,
  tx: null, ty: null,          // Autopilot-Ziel (Tippen/Klicken)
  facing: 1,
  moving: false,
  guardSpot: null,             // Spot, der erst nach Wegfahren wieder öffnet
  wakeAccum: 0,
  netId: null, netHold: 0,     // Fischernetz-Freistrampeln
  onFoot: false, parkX: 0, parkY: 0,   // zu Fuß in den Mangroven; geparktes Auto
  questHoverId: null, questHover: 0,    // erneutes Aktivieren bereits gelöster Spots
  lastDt: 0.016
};
let collectLockUntil = 0;       // kurze Sammelsperre während der Müll groß angezeigt wird
let turbo = { active: false, endAt: 0, score: 0, ended: false };
const keys = new Set();
const SPEED = 22;              // % der Karte pro Sekunde
const ARRIVE_RADIUS = 5;

function isLand(x, y) {
  // Folgt der SICHTBAREN Strand-Kontur (SVG-Pfad in index.html): oben bis x≈32, links bis y≈40.6,
  // leicht konvex (Exponent 1.08). So passt der Auto<->Boot-Wechsel exakt zur sichtbaren Sandkante.
  return Math.pow(x / 32, 1.08) + Math.pow(y / 40.6, 1.08) < 1;
}

function activeSpots() {
  return allSolved() ? [...SPOTS, FINALE_SPOT] : SPOTS;
}

function travelTo(spot) {
  // Gezieltes Antippen eines Spots: Autopilot dorthin
  van.tx = spot.x; van.ty = spot.y;
  if (van.guardSpot === spot.id) van.guardSpot = null;
}

// Smartphone-Kamera-Zustand (früh deklariert, da drawVan() schon beim Laden laufen kann)
const WORLD_AR = 1000 / 640;   // Seitenverhältnis der Spielwelt
const CAM_ZOOM = 1.12;         // leichte Vergrößerung, damit Symbole nicht zu klein sind
let camOn = false;
function drawVan() {
  els.vanMarker.style.left = van.x + "%";
  els.vanMarker.style.top = van.y + "%";
  const water = !isLand(van.x, van.y);
  els.vanMarker.classList.toggle("on-water", water && !van.onFoot);
  els.vanMarker.classList.toggle("on-foot", van.onFoot);
  els.vanMarker.classList.toggle("driving", van.moving);
  els.vanMarker.classList.toggle("icebreaker", state.icebreaker && !van.onFoot);
  els.vanMarker.classList.toggle("breaking-ice", state.icebreaker && !van.onFoot && inIce(van.x, van.y));
  els.vanMarker.classList.toggle("turbo", state.turbo && !van.onFoot);
  els.vanMarker.classList.toggle("cargo-heavy", state.cargo >= 3 && !van.onFoot);
  els.vanMarker.classList.toggle("cargo-full", state.cargo >= 5 && !van.onFoot);
  if (!els._vanEmoji) {   // Referenzen einmalig cachen (kein querySelector pro Frame)
    els._vanEmoji = els.vanMarker.querySelector(".van-emoji");
    els._vanInner = els.vanMarker.querySelector(".van-inner");
    els._cargoBadge = els.vanMarker.querySelector(".cargo-badge");
  }
  const emoji = els._vanEmoji;
  if (emoji) emoji.textContent = van.onFoot ? "🚶" : "🚐";
  const inner = els._vanInner;
  if (inner) inner.style.transform = `scaleX(${van.facing})`;
  const badge = els._cargoBadge;
  if (badge) {
    badge.textContent = state.cargo > 0 ? `🗑️${state.cargo}` : "";
    badge.classList.toggle("hidden", state.cargo === 0);
  }
  // geparktes Auto am Mangroven-Rand anzeigen
  if (els.parkedCar) {
    els.parkedCar.classList.toggle("hidden", !van.onFoot);
    if (van.onFoot) { els.parkedCar.style.left = van.parkX + "%"; els.parkedCar.style.top = van.parkY + "%"; }
  }
  updateCamera();   // Smartphone: Kamera dem Van nachführen
}

const PICKUP_RADIUS = 3.2;
const STATION_RADIUS = 4.2;

// Aus dem Auto aussteigen / wieder einsteigen (Mangroven zu Fuß)
function toggleFoot() {
  if (!van.onFoot) {
    if (!isLand(van.x, van.y)) { toast(UI().toastFootWater); return; }
    van.onFoot = true; van.parkX = van.x; van.parkY = van.y;
    van.tx = null; van.ty = null; keys.clear();
    toast(UI().toastOnFoot, 4000);
  } else {
    if (Math.hypot(van.parkX - van.x, van.parkY - van.y) > 5) { toast(UI().toastBackToCar, 4000); return; }
    van.onFoot = false; van.x = van.parkX; van.y = van.parkY;
    van.tx = null; van.ty = null; keys.clear();
    toast(UI().toastInCar, 3500);
  }
  updateFootBtn();
  drawVan();
}
function updateFootBtn() {
  // Aussteigen/Einsteigen passiert automatisch an den Mangroven – kein Knopf nötig
  if (els.footBtn) els.footBtn.classList.add("hidden");
}

// Voll-Meldung: einheitlich "Du kannst nichts mehr tragen" (im Van wie zu Fuß)
function cargoFullMsg() { return van.onFoot ? UI().toastCargoFullFoot : UI().toastCargoFull; }
// Anzeigedauer des eingesammelten Teils: im Turbo nur 1 s, sonst 3-5 s
function collectPopMs() { return turbo.active ? 1000 : (state.boatBuilt ? 3000 : 5000); }

function pickTrashItem(t) {
  // Ein kleines Müllteil einsammeln -> Ladung + Vielfalt-Tracking
  if (state.cargo + t.w > cargoMax()) { toast(cargoFullMsg()); return; }
  trashItems = trashItems.filter(o => o.id !== t.id);
  state.cargo += t.w;
  if (turbo.active) turbo.score += 10;   // Turbo: jedes Teil zählt
  const isNew = !state.collected[t.cat];
  state.collected[t.cat] = (state.collected[t.cat] || 0) + 1;
  if (!state.collectedImgs) state.collectedImgs = {};
  state.collectedImgs[t.cat] = t.img;   // ein Beispielbild je Art für die Urkunde
  // Im ersten Teil 5 s zeigen, danach 3 s (im Turbo nur 1 s) – kein weiteres Aufsammeln währenddessen
  const popMs = collectPopMs();
  collectLockUntil = performanceNow() + popMs;
  showCollectPop(t.img, popMs);
  renderPickups();
  updateMapHint();
  if (isNew) {
    state.shells += 1;   // kleine Belohnung für eine neue Müllart
    els.scorePill.textContent = `🐚 ${state.shells}`;
    toast(UI().toastNewType(state.lang === "de" ? CAT[t.cat].de : CAT[t.cat].en, distinctCats(), TOTAL_CATS), 3600);
  } else if (!boatUnlocked() && state.cargo >= TRASH_NEEDED) {
    toast(UI().questDeliverFirst, 5200);
  } else if (state.cargo >= cargoMax()) {
    toast(cargoFullMsg(), 5200);
  } else {
    toast(UI().toastCargo(state.cargo, cargoMax()), 2400);
  }
}

function collectPickups() {
  const locked = performanceNow() < collectLockUntil;   // Sammelsperre während der Anzeige

  // Fischernetz: beim Berühren sofort einfangen (zählt als Müllart "Netz/Beutel")
  const net = !locked && netForPickup(van.x, van.y);
  if (net) {
    if (state.cargo + net.w <= cargoMax()) {
      state.netsTaken.push(net.id);
      state.cargo += net.w;
      if (turbo.active) turbo.score += 10;
      const isNew = !state.collected.net;
      state.collected.net = (state.collected.net || 0) + 1;
      if (isNew) { state.shells += 1; els.scorePill.textContent = `🐚 ${state.shells}`; }
      collectLockUntil = performanceNow() + (state.boatBuilt ? 3000 : 5000);
      renderPickups(); updateMapHint();
      toast(UI().netHauled, 5200);
    } else {
      toast(UI().toastCargoFull);
    }
  }

  // Müllteile (echte Bilder) – nur wenn nicht gerade gesperrt (max. 1 pro Anzeige)
  if (!locked) {
    for (const t of trashItems.slice()) {
      if (Math.hypot(t.x - van.x, t.y - van.y) <= PICKUP_RADIUS) { pickTrashItem(t); break; }
    }
  }

  // Abgabe an der Recyclingstation
  if (state.cargo > 0 && Math.hypot(REC_STATION.x - van.x, REC_STATION.y - van.y) <= STATION_RADIUS) {
    if (!boatUnlocked() && state.cargo < TRASH_NEEDED) {
      toast(UI().toastDeliverMore(state.cargo, TRASH_NEEDED));
    } else {
      const n = state.cargo;
      const firstBoat = !state.boatBuilt;
      const wereUnlocked = spotsUnlocked();
      state.cargo = 0;
      state.shells += n;
      state.recycled += n;
      state.boatBuilt = true;
      if (turbo.active) turbo.score += n * 5;   // Zurück im Camp = Extrapunkte
      els.scorePill.textContent = `🐚 ${state.shells}`;
      ensureStock();   // Nachschub auf dem Meer

      if (turbo.active) {
        renderPickups(); updateMapHint();
        toast(UI().turboDeliver(n), 3500);
      } else if (firstBoat) {
        renderPickups(); updateMapHint(); showMission(2);
      } else if (!wereUnlocked && spotsUnlocked()) {
        celebrate(["❓", "🎉", "✨", "🐬", "❓", "💙", "🎉", "✨"]);
        renderMap();
        showInfoPopup(UI().spotsUnlockedTitle, UI().toastSpotsUnlocked);
      } else {
        toast(UI().toastDeliver(n), 5200);
        renderPickups(); updateMapHint();
      }
    }
  }

  if (!boatUnlocked()) return; // ohne Boot keine Muscheln/kein Anker erreichbar

  // Bonus-Muscheln
  BONUS_SHELLS.forEach((b, i) => {
    if (state.bonusTaken.includes(i)) return;
    if (Math.hypot(b.x - van.x, b.y - van.y) <= PICKUP_RADIUS) {
      state.bonusTaken.push(i);
      state.shells += 1;
      save();
      els.scorePill.textContent = `🐚 ${state.shells}`;
      renderPickups();
      toast(UI().toastShell, 2200);
    }
  });
  // Eisbrecher-Umbau am Anker
  if (anchorAvailable() && Math.hypot(ANCHOR.x - van.x, ANCHOR.y - van.y) <= PICKUP_RADIUS) {
    state.icebreaker = true;
    save();
    renderPickups();
    updateMapHint();
    toast(UI().toastIcebreaker, 5200);
  }
}

/* Quest-Annäherung: neue Spots sofort öffnen, bereits gelöste erst nach 5 s Verweilen */
function handleQuestProximity(dt) {
  let near = null;
  if (boatUnlocked() && spotsUnlocked() && !van.onFoot && !turbo.active && !turboStartMode) {
    for (const spot of activeSpots()) {
      if (Math.hypot(spot.x - van.x, spot.y - van.y) <= ARRIVE_RADIUS) { near = spot; break; }
    }
  }
  if (!near) {
    van.questHoverId = null; van.questHover = 0;
    if (els.questHover) els.questHover.classList.add("hidden");
    if (van.guardSpot) {
      const g = activeSpots().find(s => s.id === van.guardSpot);
      if (!g || Math.hypot(g.x - van.x, g.y - van.y) > ARRIVE_RADIUS + 1.5) van.guardSpot = null;
    }
    return;
  }
  const solved = state.solved[near.id] !== undefined;
  if (!solved) {
    if (near.id === van.guardSpot) return;   // gerade verlassen, nicht sofort wieder
    enterSpot(near);
  } else {
    // bereits gelöst -> 12 Sekunden darüber verweilen, bevor die Quest neu startet
    if (van.questHoverId !== near.id) { van.questHoverId = near.id; van.questHover = 0; }
    van.questHover += dt;
    const left = Math.ceil(12 - van.questHover);
    if (els.questHover) {
      els.questHover.classList.remove("hidden");
      els.questHover.style.left = near.x + "%";
      els.questHover.style.top = (near.y - 9) + "%";
      els.questHover.textContent = UI().questReopen(Math.max(1, left));
    }
    if (van.questHover >= 12) {
      van.questHoverId = null; van.questHover = 0;
      if (els.questHover) els.questHover.classList.add("hidden");
      enterSpot(near);
    }
  }
}
function enterSpot(spot) {
  van.tx = null; van.ty = null; van.moving = false; keys.clear();
  van.x = spot.x; van.y = spot.y - 0.5;
  drawVan();
  if (spot.id === "whale" && !state.diveDone && state.solved.whale === undefined) startDive(spot);
  else openStation(spot);
}

/* ---------- Turbo-Endmodus (30-Sekunden-Wettlauf) ---------- */
const TURBO_SECONDS = 55;   // >= Länge des Finale-Tracks (~54,7 s), damit der Song komplett zu hören ist
function startTurbo() {
  state.turbo = true;
  turbo.active = true; turbo.ended = false; turbo.score = 0;
  turbo.endAt = (lastTs || 0) + TURBO_SECONDS * 1000;
  turbo.lastBeep = -1;
  van.guardSpot = null;
  ensureStock();
  renderMap();
  if (els.turboTimer) els.turboTimer.classList.remove("hidden");
  AUDIO.playOnce(SND_FINALE, 0.9);   // Finale-Track synchron zum Countdown
  toast(UI().toastTurbo, 6000);
}
function updateTurbo() {
  const remaining = Math.max(0, (turbo.endAt - (lastTs || 0)) / 1000);
  const secs = Math.ceil(remaining);
  if (els.turboTimer) {
    els.turboTimer.classList.remove("hidden");
    els.turboTimer.textContent = UI().turboHud(secs, turbo.score);
    els.turboTimer.classList.toggle("final5", secs <= 5);
  }
  // akustischer Countdown in den letzten 5 Sekunden (einmal pro Sekunde)
  if (secs <= 5 && secs >= 1 && turbo.lastBeep !== secs) {
    turbo.lastBeep = secs;
    AUDIO.beep(880, 140);
  }
  if (remaining <= 0 && !turbo.ended) endTurbo();
}
function endTurbo() {
  turbo.ended = true; turbo.active = false; state.turbo = false;
  AUDIO.stop(SND_FINALE);
  AUDIO.beep(1320, 400);   // "Bäm" – Ziel/Finale
  celebrate(["🏁", "🎉", "🚀", "✨", "🐚", "💙", "🏁", "⭐"]);
  // Strafe, wenn man Müll nicht mehr zum Camp zurückgebracht hat
  const undelivered = state.cargo;
  if (undelivered > 0) turbo.score -= undelivered * 5;
  if (els.turboTimer) els.turboTimer.classList.add("hidden");
  state.turboScore = turbo.score;   // fließt in die Urkunde ein
  drawVan();
  // Ergebnis als Popup -> danach Urkunde
  els.missionTitle.textContent = UI().turboOverTitle;
  els.missionText.textContent = UI().turboOverText(turbo.score, undelivered);
  els.missionOkBtn.textContent = UI().toCert;
  els.missionCancelBtn.classList.add("hidden");
  confirmResetMode = false; diveSonarInfoMode = false; turboOverMode = true;
  els.missionOverlay.classList.remove("hidden");
}

function spawnWake() {
  const wake = document.createElement("span");
  wake.className = "wake";
  wake.style.left = (van.x - van.facing * 2 + (Math.random() * 1.6 - 0.8)) + "%";
  wake.style.top = (van.y + 1.6 + (Math.random() * 1.4 - 0.7)) + "%";
  els.mapCanvas.appendChild(wake);
  setTimeout(() => wake.remove(), 900);
}

function mapVisible() {
  return state.started && !els.mapScreen.classList.contains("hidden");
}

function keyVector() {
  let dx = 0, dy = 0;
  if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
  if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
  if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
  if (keys.has("ArrowDown") || keys.has("s")) dy += 1;
  return { dx, dy };
}

// Joystick-Zustand (analog, Werte in [-1, 1])
const joy = { active: false, dx: 0, dy: 0, pid: null };

// Liefert die aktive Steuerrichtung: Tasten haben Vorrang, dann Joystick.
function inputVector() {
  const kv = keyVector();
  if (kv.dx || kv.dy) {
    const len = Math.hypot(kv.dx, kv.dy);
    return { dx: kv.dx / len, dy: kv.dy / len };   // normiert, volle Kraft
  }
  if (joy.active && (joy.dx || joy.dy)) {
    return { dx: joy.dx, dy: joy.dy };             // analog (Betrag <= 1)
  }
  return { dx: 0, dy: 0 };
}
const hasInput = () => inputVector().dx !== 0 || inputVector().dy !== 0;

let lastTs = null;
function gameLoop(ts) {
  if (lastTs === null) lastTs = ts;
  const dt = Math.min((ts - lastTs) / 1000, 0.12);
  lastTs = ts;
  van.lastDt = dt;

  try {
  if (mapVisible()) {
    if (boatUnlocked()) driftTrash(dt);   // treibender Müll
    let dx = 0, dy = 0;
    // Turbo-Endmodus schneller; im ersten Teil (vor dem Boot) sehr langsam – Fokus auf dem Müll
    const spd = SPEED * (state.turbo ? 1.7 : (boatUnlocked() ? 1 : 0.4));
    const iv = inputVector();
    if (iv.dx || iv.dy) {
      van.tx = null; van.ty = null;           // Tasten/Joystick übersteuern Autopilot
      dx = iv.dx * spd * dt;
      dy = iv.dy * spd * dt;
    } else if (van.tx !== null) {
      const ddx = van.tx - van.x, ddy = van.ty - van.y;
      const dist = Math.hypot(ddx, ddy);
      if (dist < 0.8) { van.tx = null; van.ty = null; }
      else {
        const step = Math.min(spd * dt, dist);
        dx = (ddx / dist) * step;
        dy = (ddy / dist) * step;
      }
    }

    const onWater = !isLand(van.x, van.y);

    // Geladener Müll macht langsam!
    dx *= cargoFactor(); dy *= cargoFactor();

    // Ruder-Zone: Lagune nur mit halber Kraft (leise rudern!)
    const rowing = onWater && inRowZone(van.x, van.y);
    if (rowing) { dx *= 0.45; dy *= 0.45; }
    if (rowing && !van.wasRowing) toast(UI().toastRow);
    van.wasRowing = rowing;
    els.vanMarker.classList.toggle("rowing", rowing);

    // Fischernetz bremst leicht
    const inNet = onWater && !!activeNetAt(van.x, van.y);
    if (inNet) { dx *= 0.5; dy *= 0.5; }
    els.vanMarker.classList.toggle("in-net", inNet);

    // Eisbrecher fährt langsam durchs Packeis
    const breakingIce = state.icebreaker && inIce(van.x, van.y);
    if (breakingIce) { dx *= 0.5; dy *= 0.5; }

    // Zu Fuß (in den Mangroven) etwas langsamer
    const inMang = van.onFoot && inMangrove(van.x, van.y);
    if (van.onFoot) { dx *= 0.7; dy *= 0.7; }
    els.vanMarker.classList.toggle("in-mangrove", inMang);

    // Meeresströmung zieht das Boot mit
    let driftX = 0;
    if (onWater && boatUnlocked() && inCurrent(van.x, van.y)) {
      driftX = CURRENT_ZONE.push * dt;
      if (!van.wasInCurrent) toast(UI().toastCurrent);
      van.wasInCurrent = true;
    } else {
      van.wasInCurrent = false;
    }

    let nx = Math.max(2, Math.min(98, van.x + dx + driftX));
    let ny = Math.max(4, Math.min(94, van.y + dy));

    // Ohne Recycling-Boot bleibt der Van am Strand
    if (!boatUnlocked() && !isLand(nx, ny)) {
      nx = van.x; ny = van.y;
      if (van.tx !== null || hasInput()) toast(UI().toastNoBoat);
      van.tx = null; van.ty = null;
    }
    // Wintereis nur mit Eisbrecher
    if (!state.icebreaker && !van.onFoot && inIce(nx, ny)) {
      nx = van.x; ny = van.y;
      toast(UI().toastIceLocked);
      van.tx = null; van.ty = null;
    }
    // Auto erreicht die Mangroven -> automatisch aussteigen, Auto bleibt am Rand stehen
    if (!van.onFoot && inMangrove(nx, ny)) {
      van.onFoot = true; van.parkX = van.x; van.parkY = van.y; van.leftCar = false;
      toast(UI().toastMangroveCar, 5200);
      // nx/ny dürfen jetzt (zu Fuß) in die Mangrove
    }
    // Zu Fuß: nur in den Mangroven (oder zurück zum Auto). Sonst Hinweis "zuerst zum Auto"
    if (van.onFoot) {
      const nearCar = Math.hypot(van.parkX - nx, van.parkY - ny) <= 3;
      if (!inMangrove(nx, ny) && !nearCar) {
        nx = van.x; ny = van.y;
        if (van.tx !== null || hasInput()) toast(UI().toastBackToCar, 4000);
        van.tx = null; van.ty = null;
      }
    }

    van.moving = (nx !== van.x || ny !== van.y);
    if (van.moving) {
      if (nx !== van.x) van.facing = nx > van.x ? 1 : -1;
      van.x = nx; van.y = ny;

      // Wellen hinter dem Boot (beim Rudern weniger)
      if (!isLand(van.x, van.y)) {
        van.wakeAccum += dt;
        if (van.wakeAccum > (rowing ? 0.3 : (camOn ? 0.26 : 0.09))) { van.wakeAccum = 0; spawnWake(); }
      }
    }

    // Zu Fuß: wenn man zum geparkten Auto zurückkommt -> automatisch wieder einsteigen
    if (van.onFoot) {
      const distCar = Math.hypot(van.parkX - van.x, van.parkY - van.y);
      if (distCar > 4) van.leftCar = true;
      if (van.leftCar && distCar < 2) {
        van.onFoot = false; van.x = van.parkX; van.y = van.parkY;
        van.tx = null; van.ty = null;
        toast(UI().toastInCar, 3500);
      }
    }

    // Einsammeln/Abliefern/Netze laufen jedes Frame (auch beim Stillstehen am Netz/an der Station)
    collectPickups();

    // Verschlossene Spots: Hinweis beim Vorbeifahren
    if (van.moving && boatUnlocked() && !spotsUnlocked()) {
      for (const spot of activeSpots()) {
        if (Math.hypot(spot.x - van.x, spot.y - van.y) <= ARRIVE_RADIUS) { toast(UI().toastSpotsLocked); break; }
      }
    }

    // Quest-Annäherung (jedes Frame): neue Spots sofort, bereits gelöste erst nach 5 s Verweilen
    handleQuestProximity(dt);

    // Turbo-Countdown
    if (turbo.active) updateTurbo();

    drawVan();
    updateFootBtn();

    // Motor-/Ruder-Geräusch je nach Lage – mit Idle (Boot immer leise hörbar) und weichem Fade
    if (turbo.active) {
      AUDIO.setTargets({});   // im Turbo läuft der Finale-Track, Motor aus
    } else if (state.sound && state.started) {
      const t = { car: 0, boat: 0, row: 0, step: 0 };
      if (van.onFoot) {
        t.step = van.moving ? 0.5 : 0;          // Zu Fuß (Mangroven): Schritte nur beim Gehen, kein Motor
      } else if (rowing) {
        t.row = van.moving ? 0.34 : 0.14;       // Rudern: leise auch im Stand
        t.boat = 0.05;
      } else if (onWater && boatUnlocked()) {
        t.boat = van.moving ? 0.30 : 0.12;      // Boot: Tuckern im Stand, lauter beim Fahren
      } else if (!onWater) {
        t.car = van.moving ? 0.22 : 0.07;       // Auto: leiser Leerlauf, lauter beim Fahren
      }
      AUDIO.setTargets(t);
    } else {
      AUDIO.setTargets({});
    }
  } else {
    AUDIO.setTargets({});
  }
  AUDIO.tick(dt);
  } catch (err) {
    __showErr("Loop: " + (err && err.message ? err.message : err));
    if (state.started) { try { drawVan(); } catch (e) {} }   // Van trotzdem bewegen
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (!mapVisible()) return;
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "a", "d", "w", "s"].includes(k)) {
    keys.add(k);
    e.preventDefault();
  }
});
document.addEventListener("keyup", (e) => {
  const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  keys.delete(k);
});

/* ---------- Komplett mit Tastatur spielbar (ohne Maus) ---------- */
function clickIfVisible(el) {
  if (el && !el.classList.contains("hidden") && !el.disabled) { el.click(); return true; }
  return false;
}
document.addEventListener("keydown", (e) => {
  const k = e.key;
  const lower = k.length === 1 ? k.toLowerCase() : k;
  const visible = (el) => el && !el.classList.contains("hidden");
  const ae = document.activeElement;
  const typing = !!ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable);

  // Mission-/Info-Popup
  if (visible(els.missionOverlay)) {
    if (k === "Enter") { e.preventDefault(); clickIfVisible(els.missionOkBtn); }
    else if (k === "Escape") { e.preventDefault(); clickIfVisible(els.missionCancelBtn); }
    return;
  }
  // Startbildschirm
  if (visible(els.startOverlay)) {
    if (k === "Enter") { e.preventDefault(); startGame(false); }
    else if (!typing && lower === "l") { e.preventDefault(); clickIfVisible(els.langToggle); }
    else if (!typing && k === "1") { e.preventDefault(); clickIfVisible(els.modeKid); }
    else if (!typing && k === "2") { e.preventDefault(); clickIfVisible(els.modePro); }
    return;
  }
  // Station (Hör-Quiz)
  if (visible(els.stationScreen)) {
    if (typing) return;
    if (lower === "p") { e.preventDefault(); clickIfVisible(els.playBtn); }
    else if (lower === "f" || lower === "h") { e.preventDefault(); clickIfVisible(els.hintBtn); }
    else if (lower === "v") { e.preventDefault(); clickIfVisible(els.readAloudBtn); }
    else if (lower === "m" || k === "Escape") { e.preventDefault(); clickIfVisible(els.mapBtn); }
    else if (k === "Enter") { e.preventDefault(); if (!clickIfVisible(els.nextBtn)) clickIfVisible(els.playBtn); }
    else if (["1", "2", "3", "4"].includes(k)) {
      const btns = els.choices.querySelectorAll(".choice-button");
      const b = btns[parseInt(k, 10) - 1]; if (b) { e.preventDefault(); b.click(); }
    }
    return;
  }
  // Tauchgang
  if (visible(els.diveScreen)) {
    if (k === "Enter" || k === " ") { e.preventDefault(); clickIfVisible(els.diveActionBtn); }
    else if (["1", "2", "3"].includes(k) && visible(els.diveQuestionBox)) {
      const btns = els.diveChoices.querySelectorAll(".choice-button");
      const b = btns[parseInt(k, 10) - 1]; if (b) { e.preventDefault(); b.click(); }
    }
    return;
  }
  // Urkunde
  if (visible(els.certScreen)) {
    if (typing) return;   // Während Name-/Mail-Eingabe keine Tastenkürzel auslösen
    if (k === "Enter") { e.preventDefault(); clickIfVisible(els.certRestartBtn); }
    else if (lower === "p") { e.preventDefault(); clickIfVisible(els.printBtn); }
    else if (lower === "m" || k === "Escape") { e.preventDefault(); clickIfVisible(els.certMapBtn); }
    return;
  }
});

function pointerTarget(e) {
  const rect = els.mapCanvas.getBoundingClientRect();
  van.tx = Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100));
  van.ty = Math.max(4, Math.min(94, ((e.clientY - rect.top) / rect.height) * 100));
}
let mapPointerDown = false;
els.mapCanvas.addEventListener("pointerdown", (e) => {
  if (!mapVisible()) return;
  mapPointerDown = true;
  pointerTarget(e);
  e.preventDefault();
});
els.mapCanvas.addEventListener("pointermove", (e) => {
  if (!mapVisible() || !mapPointerDown) return;
  pointerTarget(e);
  e.preventDefault();
});
window.addEventListener("pointerup", () => { mapPointerDown = false; });
window.addEventListener("pointercancel", () => { mapPointerDown = false; });

// iOS/Safari ignoriert touch-action teils -> Touch-Scroll/Swipe auf der Karte hart unterbinden
els.mapScreen.addEventListener("touchmove", (e) => {
  if (mapVisible()) e.preventDefault();
}, { passive: false });

/* ---------- Touch-Joystick (unten links) ---------- */
const isTouch = (typeof window !== "undefined") &&
  (("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0);

function joySet(e) {
  const base = els.joystick.querySelector(".joy-base");
  const rect = base.getBoundingClientRect();
  const r = rect.width / 2;
  let ox = e.clientX - (rect.left + r);
  let oy = e.clientY - (rect.top + r);
  const dist = Math.hypot(ox, oy);
  const max = r * 0.92;
  if (dist > max) { ox = ox / dist * max; oy = oy / dist * max; }
  joy.dx = ox / max;
  joy.dy = oy / max;
  els.joyKnob.style.transform = `translate(${ox}px, ${oy}px)`;
}
function joyReset() {
  joy.active = false; joy.pid = null; joy.dx = 0; joy.dy = 0;
  els.joyKnob.style.transform = "translate(0px, 0px)";
}
if (els.joystick) {
  els.joystick.addEventListener("pointerdown", (e) => {
    joy.active = true; joy.pid = e.pointerId;
    try { els.joystick.setPointerCapture(e.pointerId); } catch (err) {}
    joySet(e);
    e.preventDefault();
    e.stopPropagation();
  });
  els.joystick.addEventListener("pointermove", (e) => {
    if (!joy.active || e.pointerId !== joy.pid) return;
    joySet(e);
    e.preventDefault();
    e.stopPropagation();
  });
  const joyEnd = (e) => { if (e.pointerId === joy.pid) joyReset(); };
  els.joystick.addEventListener("pointerup", joyEnd);
  els.joystick.addEventListener("pointercancel", joyEnd);
}

/* ---------- Station ---------- */
function openStation(spot) {
  state.current = spot;
  state.isFinale = spot.id === "finale";
  state.hasListened = false; state.hasHint = false; state.answered = false; state.tries = 0;
  clearOceanCueTimers();
  renderStation();
  showScreen("station");
}

function setPhase(phase) {
  state.phase = phase;
  const order = ["listen", "hint", "answer", "learn"];
  Object.entries(els.steps).forEach(([key, el]) => {
    el.classList.remove("active", "done");
    if (key === phase) el.classList.add("active");
    if (order.indexOf(key) < order.indexOf(phase)) el.classList.add("done");
  });
}

function setImageMode(mode) {
  els.imageCard.classList.remove("mystery-mode", "photo-mode", "contain-mode", "revealed");
  if (mode) els.imageCard.classList.add(mode);
}

function renderPassStrip() {
  els.passStrip.innerHTML = "";
  SPOTS.forEach(s => {
    const isSolved = state.solved[s.id] !== undefined;
    const card = document.createElement("div");
    card.className = "pass-card" + (isSolved ? " unlocked" : "");
    if (isSolved) {
      card.innerHTML = `<img src="${s.image}" alt="${SPOT_TEXT(s.id).animal}"><span>${SPOT_TEXT(s.id).animal}</span>`;
    } else {
      card.innerHTML = `<div class="pass-q">?</div>`;
    }
    els.passStrip.appendChild(card);
  });
}

function renderStation() {
  const spot = state.current;
  const t = SPOT_TEXT(spot.id);
  const alreadySolved = state.solved[spot.id] !== undefined;

  els.scorePill.classList.remove("hidden");
  els.scorePill.textContent = `🐚 ${state.shells}`;
  els.progressText.textContent = UI().spotsSolved(solvedCount(), SPOTS.length);

  els.zoneLabel.textContent = t.zone;
  els.stationTitle.textContent = t.title;
  els.narratorText.textContent = t.intro;

  els.hintBox.classList.add("hidden");
  els.questionBox.classList.add("hidden");
  els.feedbackBox.classList.add("hidden");
  els.nextBtn.classList.add("hidden");

  els.hintBtn.classList.add("hidden");   // "Frage anzeigen" entfällt – Frage erscheint automatisch
  els.playBtn.disabled = false;
  els.playBtn.textContent = state.isFinale ? UI().lauschen : UI().listen;
  els.mapBtn.textContent = UI().backToMap;

  els.mysteryBadge.textContent = state.isFinale ? UI().mysteryLausch : UI().mysteryListen;
  setImageMode("mystery-mode");
  els.animalImage.src = state.isFinale ? "assets/images/finale.svg" : "assets/images/mystery.svg";
  els.animalImage.alt = UI().mysteryAlt;

  if (alreadySolved) {
    // Wiederbesuch: Bild direkt zeigen, kein erneutes Punktesammeln
    revealAnswer(spot, t);
    els.mysteryBadge.textContent = t.animal;
  }

  buildChoices(t);
  renderPassStrip();
  setPhase("listen");
  setEq(false);
}

function buildChoices(t) {
  els.questionText.textContent = t.question;
  els.choices.innerHTML = "";
  t.choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(choice, button));
    els.choices.appendChild(button);
  });
}

/* ---------- Audio + Visualisierung ---------- */
function setEq(on) { els.eq.classList.toggle("playing", on); }

function clearOceanCueTimers() {
  state.oceanCueTimers.forEach(t => clearTimeout(t));
  state.oceanCueTimers = [];
  clearTimeout(state.oceanCueHideTimer);
  state.oceanCueHideTimer = null;
  els.oceanCueOverlay.classList.add("hidden");
}

function showOceanCue(text, duration = 6500) {
  els.oceanCueText.textContent = text;
  els.oceanCueOverlay.classList.remove("hidden");
  clearTimeout(state.oceanCueHideTimer);
  state.oceanCueHideTimer = setTimeout(() => els.oceanCueOverlay.classList.add("hidden"), duration);
}

function playCurrentSound() {
  const spot = state.current;
  state.hasListened = true;
  setPhase(state.answered ? "learn" : "hint");

  els.audio.pause();
  els.audio.currentTime = 0;
  els.audio.src = spot.audio;

  if (state.isFinale) {
    els.hintBtn.disabled = true;
    els.playBtn.disabled = true;
    els.playBtn.textContent = UI().lauschenRunning;
    els.narratorText.textContent = UI().finaleListenIntro;
    els.audio.play().then(() => {
      setEq(true);
      clearOceanCueTimers();
      state.oceanCueTimers.push(setTimeout(() => {
        if (state.isFinale && !state.answered && !state.hasHint) {
          els.narratorText.textContent = UI().cue1; showOceanCue(UI().cue1);
        }
      }, 10000));
      state.oceanCueTimers.push(setTimeout(() => {
        if (state.isFinale && !state.answered && !state.hasHint) {
          els.narratorText.textContent = UI().cue2; showOceanCue(UI().cue2, 8500);
        }
      }, 20000));
    }).catch(() => {
      clearOceanCueTimers();
      els.playBtn.disabled = false;
      els.playBtn.textContent = UI().lauschenAgain;
      els.narratorText.textContent = UI().audioBlocked;
    });
    return;
  }

  els.audio.play().then(() => {
    setEq(true);
    els.playBtn.textContent = UI().listenAgain;
  }).catch(() => {
    els.narratorText.textContent = UI().audioBlocked;
  });
  // Frage erscheint sofort – kein extra "Frage anzeigen" mehr (auch per Tastatur 1/2/3 lösbar)
  if (!state.answered) showHint(false);
}

function showHint(auto = false) {
  if (!state.hasListened) return;
  state.hasHint = true;
  els.hintBox.classList.add("hidden");
  els.questionBox.classList.remove("hidden");
  els.hintBtn.disabled = true;
  els.narratorText.textContent = auto ? UI().questionTimeAuto : UI().questionTime;
  setPhase("answer");
}

/* ---------- Antworten + Punkte ---------- */
function shellsForTry(tries) {
  const base = tries === 1 ? 3 : tries === 2 ? 2 : 1;
  return state.mode === "pro" ? base * 2 : base;
}

function checkAnswer(choice, clickedButton) {
  if (!state.hasHint || state.answered) return;
  const spot = state.current;
  const t = SPOT_TEXT(spot.id);
  const firstSolve = state.solved[spot.id] === undefined;
  state.tries += 1;

  if (choice === t.correct) {
    state.answered = true;
    document.querySelectorAll(".choice-button").forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === t.correct) btn.classList.add("correct");
    });
    let earned = 0;
    if (firstSolve && !state.isFinale) {
      earned = shellsForTry(state.tries);
      state.solved[spot.id] = earned;
      state.shells += earned;
      save();
    } else if (firstSolve && state.isFinale) {
      state.solved[spot.id] = 0;
      save();
    }
    els.scorePill.textContent = `🐚 ${state.shells}`;
    els.progressText.textContent = UI().spotsSolved(solvedCount(), SPOTS.length);
    revealAnswer(spot, t);
    showSuccess(t, earned);
  } else {
    clickedButton.classList.add("wrong");
    clickedButton.disabled = true;
    if (state.mode === "pro") {
      els.narratorText.textContent = UI().wrongTryPro;
    } else {
      els.hintBox.textContent = t.hint;
      els.hintBox.classList.remove("hidden");
      els.narratorText.textContent = UI().wrongTry;
    }
  }
}

function revealAnswer(spot, t) {
  els.animalImage.src = spot.image;
  els.animalImage.alt = t.alt;
  els.mysteryBadge.textContent = state.isFinale ? "Pro Ocean" : t.animal;
  setImageMode(spot.fit === "contain" ? "contain-mode" : "photo-mode");
  void els.imageCard.offsetWidth;
  els.imageCard.classList.add("revealed");
}

function playCelebrationSound() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      o.connect(g); g.connect(ctx.destination);
      const s = ctx.currentTime + i * 0.09;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.16, s + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
      o.start(s); o.stop(s + 0.22);
    });
  } catch (e) { /* Erfolg ist auch ohne Ton sichtbar */ }
}

function celebrate(symbols) {
  playCelebrationSound();
  const burst = document.createElement("div");
  burst.className = "celebration-burst";
  burst.setAttribute("aria-hidden", "true");
  symbols.forEach((sym, i) => {
    const item = document.createElement("span");
    item.textContent = sym;
    item.style.left = `${8 + i * 12}%`;
    item.style.animationDelay = `${i * 0.06}s`;
    burst.appendChild(item);
  });
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 2400);
}

function showSuccess(t, earned) {
  setPhase("learn");
  els.narratorText.textContent = state.isFinale ? UI().successNarratorFinale : UI().successNarrator;

  const shellLine = earned > 0 ? `<p class="shell-line">${UI().shellsEarned(earned)}</p>` : "";
  els.feedbackBox.innerHTML = `
    <h3>${t.success}</h3>
    ${shellLine}
    <div class="fact-grid">
      <div class="fact-card"><strong>${UI().factResearch}</strong><p>${t.funFact}</p></div>
      <div class="fact-card"><strong>${UI().factLearn}</strong><p>${t.learn}</p></div>
      <div class="fact-card"><strong>${UI().factProtect}</strong><p>${t.protect}</p></div>
      <div class="fact-card"><strong>${UI().factTask}</strong><p>${t.task}</p></div>
    </div>`;
  els.feedbackBox.classList.remove("hidden");
  renderPassStrip();

  if (state.isFinale) {
    celebrate(["🌊", "🐢", "✨", "💙", "🐬", "🎉", "🐋", "⭐"]);
    els.nextBtn.textContent = UI().toTurbo;   // nach dem stillen Finale kommt die Turbo-Power-Runde
    els.nextBtn.classList.remove("hidden");
    setTimeout(() => els.feedbackBox.scrollIntoView({ block: "start", behavior: "smooth" }), 80);
  } else {
    celebrate(["🐚", "✨", "💙", "🐚", "✨", "🐚", "💙", "✨"]);
    els.nextBtn.textContent = UI().nextToMap;
    els.nextBtn.classList.remove("hidden");
  }
}

/* ---------- Tauch-Quest beim Buckelwal (First-Person, echtes Panorama) ---------- */
const SND_SONAR = "assets/audio/sonar.mp3";
const SND_BOATPASS = "assets/audio/boat_pass.mp3";
const SND_WHALE = "assets/audio/humpback_whale.mp3";
const SND_FINALE = "assets/audio/finale_song.mp3";
const DIVE_BOAT_AT = 38;     // Fortschritt %, ab dem das Motorboot vorbeifährt
const DIVE_WHALE_AT = 72;    // Fortschritt %, ab dem die Wal-Zone beginnt

const dive = { phase: "off", progress: 0, tries: 0, spot: null, boatDone: false, whaleDone: false, boatTimer: null };

function startDive(spot) {
  dive.phase = "surface"; dive.progress = 0; dive.tries = 0; dive.spot = spot;
  dive.boatDone = false; dive.whaleDone = false;
  state.current = spot;
  AUDIO.setMode("off");
  showScreen("dive");
  clearTimeout(dive.boatTimer);
  els.diveScene.classList.remove("deep", "shake", "boat-pass", "looking");
  els.diveScene.classList.add("surface");
  setDiveProgress(0);
  if (els.diveCompass) { els.diveCompass.classList.remove("active"); els.diveCompass.style.setProperty("--rot", "0deg"); }
  els.diveQuestionBox.classList.add("hidden");
  els.diveFeedback.classList.add("hidden");
  els.diveNarrator.textContent = UI().diveIntro;
  els.diveActionBtn.classList.remove("hidden");
  els.diveActionBtn.disabled = false;
  els.diveActionBtn.textContent = UI().diveJumpIn;
}

function setDiveProgress(p) {
  dive.progress = Math.max(0, Math.min(100, p));
  if (els.diveBg) els.diveBg.style.backgroundPositionX = dive.progress + "%";
  if (els.diveCompass) els.diveCompass.style.setProperty("--rot", `${dive.progress * 3.6}deg`);
}

function diveJump() {
  dive.phase = "descending";
  els.diveScene.classList.remove("surface");
  els.diveScene.classList.add("deep");
  els.diveActionBtn.classList.add("hidden");
  els.diveNarrator.textContent = UI().diveDeeper;
  setTimeout(() => {
    dive.phase = "look";
    els.diveScene.classList.add("looking");
    els.diveNarrator.textContent = UI().diveLookHint;
    if (els.diveCompass) els.diveCompass.classList.add("active");
  }, 1300);
}

// nach rechts schauen = Fortschritt erhöhen (nur vorwärts)
function diveRotate(delta) {
  if (dive.phase !== "look") return;
  setDiveProgress(dive.progress + Math.abs(delta) * 0.5);
  if (!dive.boatDone && dive.progress >= DIVE_BOAT_AT) { diveBoatPass(); return; }
  if (dive.boatDone && !dive.whaleDone && dive.progress >= DIVE_WHALE_AT) { diveWhaleZone(); return; }
  if (dive.progress < DIVE_BOAT_AT) els.diveNarrator.textContent = UI().diveSpinProgress(Math.round(dive.progress / DIVE_BOAT_AT * 100));
}

function diveBoatPass() {
  dive.boatDone = true;
  dive.phase = "boat";
  if (els.diveCompass) els.diveCompass.classList.remove("active");
  els.diveScene.classList.remove("looking");
  els.diveScene.classList.add("boat-pass", "shake");
  AUDIO.playOnce(SND_BOATPASS, 0.95);
  els.diveNarrator.textContent = UI().diveBoatNoise;
  clearTimeout(dive.boatTimer);
  const done = () => {
    els.diveScene.classList.remove("shake", "boat-pass");
    dive.phase = "look";
    els.diveScene.classList.add("looking");
    if (els.diveCompass) els.diveCompass.classList.add("active");
    els.diveNarrator.textContent = UI().diveAfterBoat;
  };
  dive.boatTimer = setTimeout(done, 4500);
}

function diveWhaleZone() {
  dive.whaleDone = true;
  dive.phase = "whalezone";
  if (els.diveCompass) els.diveCompass.classList.remove("active");
  els.diveScene.classList.remove("looking");
  AUDIO.playLoop(SND_WHALE, 0.85);
  els.diveNarrator.textContent = UI().diveWhaleHeard;
  setTimeout(diveShowQuestion, 1800);
}

function diveShowQuestion() {
  dive.phase = "question";
  const t = SPOT_TEXT("whale");
  els.diveQuestionText.textContent = UI().diveQuestion;
  els.diveChoices.innerHTML = "";
  t.choices.forEach(choice => {
    const b = document.createElement("button");
    b.className = "choice-button"; b.type = "button"; b.textContent = choice;
    b.addEventListener("click", () => diveCheck(choice, b));
    els.diveChoices.appendChild(b);
  });
  els.diveQuestionBox.classList.remove("hidden");
}

function diveCheck(choice, btn) {
  const t = SPOT_TEXT("whale");
  dive.tries += 1;
  if (choice === t.correct) {
    Array.from(els.diveChoices.querySelectorAll(".choice-button")).forEach(b => {
      b.disabled = true;
      if (b.textContent === t.correct) b.classList.add("correct");
    });
    const earned = shellsForTry(dive.tries);
    state.solved.whale = earned;
    state.shells += earned;
    save();
    els.scorePill.textContent = `🐚 ${state.shells}`;
    const shellLine = `<p class="shell-line">${UI().shellsEarned(earned)}</p>`;
    els.diveFeedback.innerHTML = `
      <h3>${t.success}</h3>
      ${shellLine}
      <div class="fact-grid">
        <div class="fact-card"><strong>${UI().factResearch}</strong><p>${t.funFact}</p></div>
        <div class="fact-card"><strong>${UI().factLearn}</strong><p>${t.learn}</p></div>
      </div>`;
    els.diveFeedback.classList.remove("hidden");
    els.diveQuestionBox.classList.add("hidden");
    // Nach dem Raten NICHT direkt auftauchen -> erst Sonar + Info
    dive.phase = "afterquiz";
    els.diveActionBtn.classList.remove("hidden");
    els.diveActionBtn.disabled = false;
    els.diveActionBtn.textContent = UI().diveSonarBtn;
  } else {
    btn.classList.add("wrong"); btn.disabled = true;
    els.diveNarrator.textContent = state.mode === "pro" ? UI().wrongTryPro : t.hint;
  }
}

function diveSonar() {
  dive.phase = "sonar";
  els.diveActionBtn.classList.add("hidden");
  AUDIO.stop(SND_WHALE);
  els.diveScene.classList.add("shake");
  AUDIO.playOnce(SND_SONAR, 0.9);
  els.diveNarrator.textContent = UI().diveSonarPlaying;
  clearTimeout(dive.boatTimer);
  dive.boatTimer = setTimeout(() => {
    els.diveScene.classList.remove("shake");
    // Große Info-Meldung zum Sonar
    showSonarInfo();
  }, 3200);
}

function showSonarInfo() {
  dive.phase = "sonarinfo";
  els.missionTitle.textContent = UI().sonarInfoTitle;
  els.missionText.textContent = UI().sonarInfoText;
  els.missionOkBtn.textContent = UI().diveResurface;
  els.missionCancelBtn.classList.add("hidden");
  confirmResetMode = false;
  diveSonarInfoMode = true;
  els.missionOverlay.classList.remove("hidden");
}

function diveResurface() {
  diveSonarInfoMode = false;
  dive.phase = "surfacing";
  state.diveDone = true;
  save();
  els.diveScene.classList.remove("deep");
  els.diveScene.classList.add("surface");
  AUDIO.stop(SND_WHALE); AUDIO.stop(SND_SONAR);
  celebrate(["🐋", "🌊", "✨", "💙", "🫧", "🎉", "🐋", "⭐"]);
  setTimeout(() => {
    dive.phase = "off";
    els.diveNarrator.textContent = UI().diveBackToBoat;
    van.guardSpot = "whale";
    goToMap();
  }, 1100);
}

// Tauch-Steuerung: ziehen / Pfeiltaste rechts -> nach rechts schauen (nur vorwärts)
let diveDragX = null;
let diveSonarInfoMode = false;
if (els.diveScene) {
  els.diveScene.addEventListener("pointerdown", (e) => { if (dive.phase === "look") { diveDragX = e.clientX; e.preventDefault(); } });
  els.diveScene.addEventListener("pointermove", (e) => {
    if (dive.phase !== "look" || diveDragX === null) return;
    const dx = e.clientX - diveDragX; diveDragX = e.clientX;
    if (dx > 0) diveRotate(dx);   // nur nach rechts
    e.preventDefault();
  });
  const endDrag = () => { diveDragX = null; };
  els.diveScene.addEventListener("pointerup", endDrag);
  els.diveScene.addEventListener("pointercancel", endDrag);
}
document.addEventListener("keydown", (e) => {
  if (dive.phase !== "look") return;
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "ArrowLeft" || e.key === "a") { diveRotate(24); e.preventDefault(); }
});

/* ---------- Urkunde ---------- */
function renderCertificate() {
  showScreen("cert");
  const u = UI();
  els.certTitle.textContent = u.certTitle;
  els.certName.textContent = state.name || u.certAnon;
  els.certText.textContent = u.certText;
  els.certScore.textContent = u.certScore(state.shells, state.recycled)
    + (state.turboScore != null ? "  ·  " + u.certTurbo(state.turboScore, turboRating(state.turboScore)) : "");
  els.certDate.textContent = new Date().toLocaleDateString(state.lang === "de" ? "de-DE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" });

  // Müll-Statistik: welche Arten + wie viele je Art
  if (els.certStats) {
    const cats = Object.keys(state.collected).sort((a, b) => state.collected[b] - state.collected[a]);
    let html = `<h3 class="stats-title">${u.statsTitle}</h3>`;
    html += `<p class="stats-sum">${u.statsDistinct(distinctCats(), TOTAL_CATS)} · ${u.statsTotal(totalCollected())}</p>`;
    if (cats.length) {
      html += `<div class="stats-grid">` + cats.map(c =>
        `<div class="stat-chip"><span class="stat-name">${state.lang === "de" ? CAT[c].de : CAT[c].en}</span><span class="stat-count">${state.collected[c]}×</span></div>`
      ).join("") + `</div>`;
    }
    els.certStats.innerHTML = html;
  }

  // Müll-Highlights: Bilder der gesammelten Müllarten
  if (els.certHighlights) {
    const imgs = state.collectedImgs || {};
    const cats = Object.keys(imgs);
    if (cats.length) {
      els.certHighlights.innerHTML = `<p class="hl-title">${u.highlightsTitle}</p>` +
        `<div class="hl-grid">` + cats.map(c =>
          `<div class="hl-item"><img src="${imgs[c]}" alt=""><span>${state.lang === "de" ? CAT[c].de : CAT[c].en}</span></div>`
        ).join("") + `</div>`;
    } else { els.certHighlights.innerHTML = ""; }
  }

  // E-Mail / Newsletter (DSGVO): Texte + Zustand zurücksetzen
  if (els.mailHeading) els.mailHeading.textContent = u.mailHeading;
  if (els.mailInput) els.mailInput.placeholder = u.mailPlaceholder;
  if (els.consentCertText) els.consentCertText.textContent = u.consentCert;
  if (els.consentNewsText) els.consentNewsText.textContent = u.consentNews;
  if (els.mailBtn) { els.mailBtn.textContent = u.mailSend; els.mailBtn.disabled = true; }
  if (els.mailNote) els.mailNote.textContent = u.mailNote;
  if (els.consentCert) els.consentCert.checked = false;
  if (els.consentNews) els.consentNews.checked = false;

  els.certCards.innerHTML = "";
  SPOTS.forEach(s => {
    const card = document.createElement("div");
    card.className = "cert-animal";
    card.innerHTML = `<img src="${s.image}" alt="${SPOT_TEXT(s.id).animal}"><span>${SPOT_TEXT(s.id).animal}</span>`;
    els.certCards.appendChild(card);
  });
  document.querySelector("[data-i18n='certEyebrow']").textContent = u.certEyebrow;
}

function buildCertMailto() {
  const u = UI();
  const cats = Object.keys(state.collected).sort((a, b) => state.collected[b] - state.collected[a]);
  const lines = cats.map(c => `- ${state.lang === "de" ? CAT[c].de : CAT[c].en}: ${state.collected[c]}`);
  const body = [
    u.certTitle, "",
    `${u.certName ? "" : ""}${state.name || u.certAnon}`,
    u.certScore(state.shells, state.recycled), "",
    u.statsDistinct(distinctCats(), TOTAL_CATS),
    u.statsTotal(totalCollected()), "",
    u.highlightsTitle, ...lines, "",
    "Pro Ocean – " + u.certEyebrow
  ].join("\n");
  const subject = u.mailSubject;
  return `mailto:${encodeURIComponent(els.mailInput ? els.mailInput.value.trim() : "")}` +
    `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ---------- Navigation ---------- */
function goToMap() {
  els.audio.pause();
  setEq(false);
  clearOceanCueTimers();
  // Tauch-Sounds stoppen, falls noch aktiv
  AUDIO.stop(SND_SONAR); AUDIO.stop(SND_BOATPASS); AUDIO.stop(SND_WHALE); AUDIO.stop(SND_FINALE);
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  renderMap();
  // Großes Popup, sobald alle Tiere entdeckt sind (einmalig) – führt zum Finale-Stern
  if (allSolved() && state.solved.finale === undefined && !state.finaleAnnounced) {
    state.finaleAnnounced = true; save();
    showInfoPopup(UI().finaleReadyTitle, UI().mapHintFinale);
  }
}

function resetVan() {
  van.x = VAN_HOME.x; van.y = VAN_HOME.y;
  van.tx = null; van.ty = null;
  van.guardSpot = null;
  van.wasRowing = false;
  van.wasInCurrent = false;
  van.onFoot = false; van.leftCar = false; van.questHoverId = null; van.questHover = 0;
  keys.clear();
}

function resetProgress() {
  state.solved = {};
  state.shells = 0;
  state.current = null;
  state.cargo = 0;
  state.boatBuilt = false;
  state.recycled = 0;
  state.collected = {};
  state.collectedImgs = {};
  state.netsTaken = [];
  state.barrelsTaken = [];
  state.bonusTaken = [];
  state.icebreaker = false;
  state.diveDone = false;
  state.turbo = false;
  state.turboScore = null;
  state.finaleAnnounced = false;
  turbo = { active: false, endAt: 0, score: 0, ended: false };
  collectLockUntil = 0;
  if (els.turboTimer) els.turboTimer.classList.add("hidden");
  if (els.parkedCar) els.parkedCar.classList.add("hidden");
  if (els.questHover) els.questHover.classList.add("hidden");
  resetVan();
  initTrash();
}

function freshStart() {
  // Wirklich frische Platte: Fortschritt, Name und Modus weg
  resetProgress();
  state.name = "";
  els.nameInput.value = "";
  state.mode = "kid";
  els.modeKid.classList.add("active");
  els.modePro.classList.remove("active");
  els.audio.pause();
  setEq(false);
  clearOceanCueTimers();
  els.missionOverlay.classList.add("hidden");
  els.mapToast.classList.add("hidden");
  lastToastText = "";
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  // Tauchgang sauber beenden
  dive.phase = "off"; clearTimeout(dive.boatTimer);
  AUDIO.stop(SND_SONAR); AUDIO.stop(SND_BOATPASS); AUDIO.stop(SND_WHALE); AUDIO.stop(SND_FINALE);
  AUDIO.setMode("off");
  state.started = false;
  els.startOverlay.classList.remove("hidden");
  els.scorePill.classList.add("hidden");
  els.progressText.textContent = UI().start;
  drawVan();
}

function fullReset() {
  showResetConfirm();
}

/* ---------- Vorlesen ---------- */
function readCurrentText() {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const t = SPOT_TEXT(state.current.id);
  const parts = [
    els.zoneLabel.textContent,
    els.stationTitle.textContent,
    els.narratorText.textContent,
    !els.hintBox.classList.contains("hidden") ? els.hintBox.textContent : "",
    !els.feedbackBox.classList.contains("hidden") ? `${t.success}. ${t.funFact}. ${t.learn}. ${t.protect}. ${t.task}` : ""
  ].filter(Boolean);
  const utt = new SpeechSynthesisUtterance(parts.join(" "));
  utt.lang = state.lang === "de" ? "de-DE" : "en-GB";
  utt.rate = 0.92;
  window.speechSynthesis.speak(utt);
}

/* ---------- Start ---------- */
async function requestFullScreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  } catch (e) { /* optional */ }
}

function startGame(withFullscreen) {
  if (withFullscreen) requestFullScreen();
  state.name = els.nameInput.value.trim();
  save();
  state.started = true;
  if (state.sound) AUDIO.prime();   // Audiowiedergabe per Nutzergeste freischalten
  els.startOverlay.classList.add("hidden");
  renderMap();
  showMission(1);
}

/* Mission-Popup (auch als eigener Bestätigungs-Dialog, da confirm() im
   Vollbild/auf Smartphones unzuverlässig ist) */
let confirmResetMode = false;
let turboOverMode = false;
let turboStartMode = false;
// Großes Info-Popup für wichtige Meilensteine (nur Bestätigen, keine weitere Aktion)
function showInfoPopup(title, text) {
  confirmResetMode = false; turboOverMode = false; turboStartMode = false; diveSonarInfoMode = false;
  els.missionCancelBtn.classList.add("hidden");
  els.missionTitle.textContent = title;
  els.missionText.textContent = text;
  els.missionOkBtn.textContent = UI().missionOk;
  els.missionOverlay.classList.remove("hidden");
}
// Großes Erklär-Popup vor dem Turbo-Finale; startet den Turbo erst nach Klick auf „GO“
function showTurboIntro() {
  const u = UI();
  confirmResetMode = false; turboOverMode = false; diveSonarInfoMode = false; turboStartMode = true;
  els.missionCancelBtn.classList.add("hidden");
  els.missionTitle.textContent = u.turboIntroTitle;
  els.missionText.innerHTML = u.turboIntroHtml;
  els.missionOkBtn.textContent = u.turboIntroGo;
  els.missionOverlay.classList.remove("hidden");
}
function showMission(num) {
  const u = UI();
  confirmResetMode = false; turboStartMode = false;
  els.missionCancelBtn.classList.add("hidden");
  els.missionTitle.textContent = num === 1 ? u.missionTitle1 : u.missionTitle2;
  els.missionText.textContent = num === 1 ? u.missionText1 : u.missionText2;
  els.missionOkBtn.textContent = u.missionOk;
  els.missionOverlay.classList.remove("hidden");
}

function showResetConfirm() {
  const u = UI();
  confirmResetMode = true;
  els.missionTitle.textContent = u.resetTitle;
  els.missionText.textContent = u.resetConfirm;
  els.missionOkBtn.textContent = u.resetYes;
  els.missionCancelBtn.textContent = u.resetNo;
  els.missionCancelBtn.classList.remove("hidden");
  els.missionOverlay.classList.remove("hidden");
}

/* ---------- Events ---------- */
els.startBtn.addEventListener("click", () => startGame(true));
els.startWindowBtn.addEventListener("click", () => startGame(false));
els.fullscreenAgain.addEventListener("click", requestFullScreen);
els.langDe.addEventListener("click", () => setLang("de"));
els.langEn.addEventListener("click", () => setLang("en"));
els.langToggle.addEventListener("click", () => setLang(state.lang === "de" ? "en" : "de"));
els.modeKid.addEventListener("click", () => {
  state.mode = "kid";
  els.modeKid.classList.add("active"); els.modePro.classList.remove("active");
  save();
});
els.modePro.addEventListener("click", () => {
  state.mode = "pro";
  els.modePro.classList.add("active"); els.modeKid.classList.remove("active");
  save();
});
els.playBtn.addEventListener("click", playCurrentSound);
els.hintBtn.addEventListener("click", () => showHint(false));
els.mapBtn.addEventListener("click", goToMap);
els.nextBtn.addEventListener("click", () => {
  if (state.isFinale && state.answered) { showScreen("map"); showTurboIntro(); }   // erst Erklär-Popup, dann Turbo
  else goToMap();
});
els.resetBtn.addEventListener("click", fullReset);
els.readAloudBtn.addEventListener("click", readCurrentText);
els.printBtn.addEventListener("click", () => window.print());
els.certMapBtn.addEventListener("click", goToMap);
els.certRestartBtn.addEventListener("click", () => {
  freshStart();
  showScreen("map");
});
els.footBtn.addEventListener("click", toggleFoot);
els.missionOkBtn.addEventListener("click", () => {
  els.missionOverlay.classList.add("hidden");
  if (turboStartMode) {
    turboStartMode = false;
    startTurbo();
  } else if (confirmResetMode) {
    confirmResetMode = false;
    freshStart();
  } else if (turboOverMode) {
    turboOverMode = false;
    renderCertificate();
  } else if (diveSonarInfoMode) {
    diveResurface();
  }
});
els.missionCancelBtn.addEventListener("click", () => {
  confirmResetMode = false;
  els.missionOverlay.classList.add("hidden");
});
els.diveActionBtn.addEventListener("click", () => {
  if (dive.phase === "surface") diveJump();
  else if (dive.phase === "afterquiz") diveSonar();
});
els.soundToggle.addEventListener("click", () => {
  state.sound = !state.sound;
  els.soundToggle.textContent = state.sound ? "🔊" : "🔇";
  if (!state.sound) AUDIO.muteAll();
  else AUDIO.ensure();
});

// Urkunde per E-Mail / Newsletter (DSGVO)
function updateMailBtn() {
  const any = (els.consentCert && els.consentCert.checked) || (els.consentNews && els.consentNews.checked);
  const hasMail = els.mailInput && /\S+@\S+\.\S+/.test(els.mailInput.value.trim());
  if (els.mailBtn) els.mailBtn.disabled = !(any && hasMail);
}
if (els.consentCert) els.consentCert.addEventListener("change", updateMailBtn);
if (els.consentNews) els.consentNews.addEventListener("change", updateMailBtn);
if (els.mailInput) els.mailInput.addEventListener("input", updateMailBtn);
if (els.mailBtn) {
  els.mailBtn.addEventListener("click", () => {
    const email = els.mailInput ? els.mailInput.value.trim() : "";
    if (!email) return;
    // Newsletter-Einwilligung: kleine Datei für den Entwickler/Pro Ocean erzeugen (DSGVO-Nachweis)
    if (els.consentNews && els.consentNews.checked) {
      try {
        const record = {
          email, newsletter: true, certificate: !!(els.consentCert && els.consentCert.checked),
          name: state.name || "", shells: state.shells, recycled: state.recycled,
          consentText: UI().consentNews, timestamp: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(record, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "proocean_newsletter_consent.json";
        document.body.appendChild(a); a.click(); a.remove();
      } catch (e) {}
    }
    // Urkunde per E-Mail: Mailprogramm öffnen (keine Speicherung)
    if (els.consentCert && els.consentCert.checked) {
      try { window.location.href = buildCertMailto(); } catch (e) {}
    }
  });
}

els.audio.addEventListener("pause", () => setEq(false));
els.audio.addEventListener("play", () => setEq(true));
els.audio.addEventListener("ended", () => {
  setEq(false);
  clearOceanCueTimers();
  if (state.isFinale && !state.answered && !state.hasHint) {
    els.playBtn.disabled = false;
    els.playBtn.textContent = UI().lauschenAgain;
    showHint(true);
    return;
  }
  if (!state.answered && !state.hasHint) {
    els.hintBtn.disabled = false;
    els.narratorText.textContent = UI().afterSoundEnd;
  }
});

/* ---------- Init ---------- */
load();
applyStaticTexts();
if (state.name) els.nameInput.value = state.name;
if (state.mode === "pro") {
  els.modePro.classList.add("active"); els.modeKid.classList.remove("active");
}
els.progressText.textContent = UI().start;
els.vanMarker.innerHTML = '<span class="van-inner"><span class="boat" aria-hidden="true"></span><span class="van-emoji">🚐</span></span><span class="cargo-badge hidden" aria-hidden="true"></span>';
if (isTouch && els.joystick) els.joystick.classList.remove("hidden");
initTrash();
drawVan();
requestAnimationFrame(gameLoop);

// Moderater Müll-Nachschub auf dem Meer: höchstens 2 neue Teile pro Intervall
if (typeof setInterval === "function") {
  setInterval(() => {
    if (!mapVisible() || !boatUnlocked()) return;
    const target = state.turbo ? seaTarget() + 8 : seaTarget();
    let sea = trashItems.filter(t => !isLand(t.x, t.y)).length;
    let added = 0;
    while (sea < target && added < 2) { if (spawnTrash(false)) { sea++; added++; } else break; }
    if (added) renderPickups();
  }, 5000);
}

/* ---------- Smartphone: Vollbild-Karte mit Kamera, die dem Van folgt ---------- */
function camSize() {
  const c = els.mapCanvas; if (!c) return;
  const frame = c.parentElement;
  const vw = frame.clientWidth, vh = frame.clientHeight;
  if (!vw || !vh) { c._camW = 0; return; }
  let CW, CH;
  if (vw / vh >= WORLD_AR) { CW = vw; CH = vw / WORLD_AR; }   // breiter Schirm: Breite voll ausnutzen
  else { CH = vh; CW = vh * WORLD_AR; }
  CW *= CAM_ZOOM; CH *= CAM_ZOOM;
  c.style.right = "auto"; c.style.bottom = "auto"; c.style.left = "0"; c.style.top = "0";
  c.style.width = CW + "px"; c.style.height = CH + "px";
  c._camW = CW; c._camH = CH; c._vw = vw; c._vh = vh;
}
function setCamera(on) {
  const c = els.mapCanvas; if (!c) return;
  camOn = on;
  if (on) { c.style.willChange = "transform"; camSize(); }
  else {
    c.style.left = c.style.top = c.style.width = c.style.height = "";
    c.style.right = c.style.bottom = c.style.transform = c.style.willChange = "";
    c._camW = 0;
  }
}
function updateCamera() {
  if (!camOn) return;
  const c = els.mapCanvas;
  if (!c._camW) { camSize(); if (!c._camW) return; }
  const CW = c._camW, CH = c._camH, vw = c._vw, vh = c._vh;
  let tx = vw / 2 - (van.x / 100) * CW;
  let ty = vh / 2 - (van.y / 100) * CH;
  tx = Math.min(0, Math.max(vw - CW, tx));
  ty = Math.min(0, Math.max(vh - CH, ty));
  c.style.transform = `translate3d(${Math.round(tx)}px, ${Math.round(ty)}px, 0)`;
}
function updateViewportMode() {
  const r = document.documentElement;
  const touch = (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
    || ("ontouchstart" in window) || ((navigator.maxTouchPoints || 0) > 0);
  const phone = touch && Math.min(window.innerWidth, window.innerHeight) <= 600;
  const portrait = window.innerHeight >= window.innerWidth;
  r.classList.toggle("phone-portrait", phone && portrait);
  r.classList.toggle("phone-landscape", phone && !portrait);
  setCamera(phone && !portrait);
}
window.addEventListener("resize", updateViewportMode);
window.addEventListener("orientationchange", () => setTimeout(updateViewportMode, 250));
updateViewportMode();

// Schlanker Test-Hook (nur für automatisierte Tests; im Spiel ungenutzt)
if (typeof window !== "undefined") {
  window.__oceanvan = {
    van, joy, inputVector, dive, diveRotate, AUDIO,
    REC_STATION, SPOTS, FINALE_SPOT, NETS, MANGROVE_TREES,
    get trashItems() { return trashItems; },
    ensureStock, distinctCats, totalCollected, toggleFoot, startTurbo,
    get turbo() { return turbo; },
    get state() { return state; }
  };
}
