# Recherche: Websites asiatischer Restaurants

Stand: 12.11.2026. Ziel: Muster für eine **typografisch getragene, fotolose Speisekarte** (~100 Gerichte, Handy zuerst, Hauptziele: Karte ansehen und anrufen).

Methode: jede Seite mit Playwright (Chromium headless) geöffnet, Screenshots Desktop 1440×900 und Mobil 390×844 von Startseite und Speisekarte (plus je ein gescrollter Speisekarten-Screenshot). Schriften und Farben per `getComputedStyle` und `document.fonts` ausgelesen. Die Screenshots liegen bewusst **nicht** im Repo (fremdes Material), sondern nur im temporären Scratchpad der Sitzung.

Geprüft: Hakkasan, Yauatcha, BAO London, Momofuku, Din Tai Fung, Nobu (Pflicht) sowie **Xi'an Famous Foods** und **Pinch Chinese** (selbst gewählt: kleinere Läden mit Abhol-Fokus und HTML-Speisekarte). Zur Einordnung zusätzlich Koya London und einige deutsche Lokale angesehen (siehe Randnotiz).

---

## 1. Hakkasan (Mayfair, London)

- **URL:** hakkasan.com (leitet weiter auf hakkasangroup.com/venues/hakkasan/), Karte: `/venues/hakkasan-mayfair-london/menu/`
- **Typografie:** Display „Shippori Mincho B1“ (japanische Mincho-Serife) für h2/h3 *und* Gerichtnamen (16 px/600, Laufweite 0,5 px). Fließtext „Effra“ (Weight 200!, 17 px). h1 in Open Sans 300, Versalien, 60 px, gesperrt. Preise in Open Sans 300, 16 px. Hierarchie auf der Karte: Menüname 32 px → Kategorie 22 px → Gericht 16 px gold → Zutaten ca. 11–12 px grau.
- **Farben:** Schwarz `#000` als Fläche, Gold `#AF945C` (Gerichte, Linien, Logo), Weiß für Überschriften. Gold auf Schwarz ≈ 7:1, gut lesbar.
- **Weißraum/Raster:** Desktop: linke Spalte (~25 %) für Allergiehinweis und Legende, rechts Karte zweispaltig. Viel Luft zwischen Gerichten (~60 px). Mobil: einspaltig, sehr großzügig, dadurch lange Scrollwege.
- **Bildsprache:** Startseite = Vollbild-Video/Foto, dunkel, unscharf, Dampf. Die Speisekarte kommt **ganz ohne Fotos** aus und wirkt trotzdem hochwertig: nur Serife, Gold und Schwarz. Gutes Beispiel für eine fotolose Karte.
- **Navigation:** Header verschwindet beim Runterscrollen und kommt beim Hochscrollen zurück („headroom“). „Reservations“ als umrandeter Button oben rechts.
- **Speisekarte im Detail:**
  - Struktur: 12 Teilmenüs (Lunch, À la carte, Dim Sum, Drinks, Gluten Free …) als **Pillen-Tabs** oben, darunter jeweils Kategorien (Steamed, Cheung fun, Fried).
  - Kategorienavigation: nur zwischen Menüs, nicht zwischen Kategorien. Mobil wird daraus ein „MENUS ▾“-Dropdown. **Nicht sticky.**
  - Preise: reine Zahl ohne Währung („18“), **rechtsbündig** neben dem Gerichtnamen, Open Sans light.
  - Diät-Kennzeichnung: kleine goldene Blatt-Icons (vegetarisch/vegan/glutenfrei) direkt hinter dem Namen; Legende links (mobil erst am Ende der Seite, das ist zu spät).
  - Allergene: nur der Hinweis „bitte beim Personal fragen“.
  - Suche/Filter: keine. Bestell-CTA: „Delivery“ führt zu Deliveroo.
- **Mikrointeraktionen:** Header blendet beim Scrollen weich ein und aus, sonst ruhig.
- **Mobil:** gut: Lesbarkeit, Ruhe, Icons direkt am Gericht. Schlecht: Fließtext in Weight 200 ist zu dünn, keine Schnellnavigation, die Legende steht erst unten, kein Anruf-Button.

## 2. Yauatcha (Soho, London)

- **URL:** yauatcha.com → hakkasangroup.com/venues/yauatcha/, Karte: `/venues/yauatcha-soho-london/menu/`
- **Typografie:** durchgehend „Futura PT Book“ (300), Überschriften in **Versalien** (h1 50 px, h2 32 px, h3 22 px), Gerichte 16 px/700. Keine Display/Text-Paarung, es läuft nur über Größe und Versalien.
- **Farben:** Pink `#D8679C` (Text!), Kobaltblau `#2B53D7` (Flächen, Footer), Weiß. Eigenständig und mutig, aber Pink auf Weiß hat nur ≈ 3,3:1 und die Zutaten sind noch heller (klarer WCAG-Verstoß).
- **Weißraum/Raster:** gleiches Template wie Hakkasan (Legende links, Karte rechts, zweispaltig). Hintergrund mit großen, hellen Linien-Ornamenten (konzentrische Kreise).
- **Bildsprache:** Startseite Dim-Sum-Körbe und Dampf; Karte ohne Fotos, nur das Ornament. Funktioniert ohne Fotos, weil Farbe und Muster die Identität tragen.
- **Navigation:** wie Hakkasan; Standorte als umrandete Pink-Buttons im Hero.
- **Speisekarte:** Tabs (Theatre, Lunch Set, Infinite Yum Cha, Food, Drinks …), mobil als Dropdown. Diät-Icons in Pink. Viele Hinweistexte (Zeiten, MwSt., Service) als große Versal-Überschriften, sie konkurrieren mit den Gerichten. Keine sticky Navigation, keine Suche. Preise beim Set-Menü nur pro Person.
- **Mikrointeraktionen:** `scroll-behavior: smooth`, `prefers-reduced-motion` wird in CSS berücksichtigt.
- **Mobil:** gut: klare Einspaltigkeit. Schlecht: Kontrast, und Infotexte nehmen den ersten Bildschirm ein, bevor das erste Gericht kommt.

## 3. BAO London

- **URL:** baolondon.com, Karte: `/menus/`
- **Typografie:** nur „Brown“ (Lineto) in 300/400/700. h1 Karte 59 px light, h1 Start 36 px bold. Freundlich-geometrisch, sehr zurückhaltend.
- **Farben:** Off-White `#F9F9F5`, Hellgrau `#D3D3D3` (Kartenseite), Schwarz, Akzent Orange `#FFA800` (aktive Pille), etwas Dunkelrot im Footer-Verlauf.
- **Weißraum/Raster:** zentriert, sehr reduziert, fixierte Topbar mit Haarlinie.
- **Bildsprache:** freigestellte Bao auf cremefarbenem Grund, mittig und groß; Illustrationen (Logo-Männchen, gezeichnete Drinks). Ohne Fotos würde es über das Maskottchen und die Illustrationen tragen.
- **Navigation:** schmale fixe Leiste („Restaurants, Karaoke, Shop, Deliver or Collect, Bookings“); mobil darüber eine schließbare „Book here“-Leiste.
- **Speisekarte:** Standort als Pillen (Soho, Borough …, aktiv orange), darunter **die gedruckte Karte als Bild**. Auf dem Handy ist sie praktisch unlesbar (Zoomen nötig), sie ist nicht durchsuchbar, nicht barrierefrei und nicht indexierbar. Die gedruckte Karte selbst ist typografisch sehr gut (Tabellenraster, chinesische Kategorie-Zeichen, Preise direkt hinter dem Namen).
- **Mikrointeraktionen:** Pillen-Hover, Header-Übergänge (Tailwind `transition`).
- **Mobil:** Startseite stark (großes Foto, klare h1). Speisekarte ist das **Negativbeispiel**: Bild-Menü.

## 4. Momofuku (Noodle Bar East Village)

- **URL:** momofuku.com, Karte: `/restaurants/noodle-bar-east-village/menu`
- **Typografie:** „Graphik“ 400/600 (h1 64 px, h2 32 px, Kategorien 24 px, Gericht 16 px/600) plus Handschrift-Font „Momo Sharpie“ für Kicker („LOS ANGELES“, „OPENING TIMES“) und „Andale Mono“ für die Ankündigungsleiste. Gute Paarung: neutrale Grotesk plus eine persönliche Handschrift als Akzent.
- **Farben:** Creme `#FAF7EE`, Pfirsich `#FDF0D2` (Kategorie-Karten), Anthrazit `#232323`, Grün `#397E3A`/`#008000` (Öffnungszeiten-Band, aktiver Tab), Orange (Logo-Frucht).
- **Weißraum/Raster:** Desktop: zwei Spalten mit Kategorie-Karten (Masonry), in jeder Karte noch einmal zwei Gerichtspalten. Abgerundete Ecken, 8 px Abstand.
- **Bildsprache:** große, warme Food-Fotos mit Händen, Hero mit abgerundeten Ecken. Die Karte selbst ist fotolos (nur Hero-Banner).
- **Navigation:** Pillen-Buttons „Make a Reservation / Order Online / Shop“, **mobil sticky** beim Scrollen (sie bleiben oben stehen).
- **Speisekarte im Detail:**
  - Tabs „Food/Drinks“ (grüne Pille aktiv).
  - Jede Kategorie ist ein **einklappbares Akkordeon** (Kreis-Icon „–“).
  - Preis als reine Zahl, rechtsbündig in einer eigenen schmalen Spalte neben der Beschreibung.
  - Gericht fett, darunter die Zutaten klein geschrieben, alles in Kleinbuchstaben (lässig).
  - Hinweise wie „order in advance“, „Serves 1-2“ fett als Unterzeile.
  - Keine Allergen-/Diät-Icons, keine Suche, keine sticky Kategorien.
- **Mikrointeraktionen:** Farbübergänge 0,25 s, Akkordeon. Newsletter-Popup beim ersten Besuch (sehr störend, verdeckt die Karte).
- **Mobil:** gut: die sticky CTA-Pillen und die kompakte Karte mit Preis rechts. Schlecht: das Popup und der fehlende Anruf-Button.

## 5. Din Tai Fung (USA)

- **URL:** dintaifungusa.com → dtf.com/en-us, Karte: `/en-us/menu`
- **Typografie:** Display „Heldane Display“ (Klim, Serife mit Kursiven), im Wechsel Versal/kursiv („SHAPED *by* TRADITION, CRAFTED *by* HAND“), 99 px. Gerichte ebenfalls Heldane, 19 px. Text „Suisse Intl“ 13–16 px. Die stärkste Display/Text-Paarung im Vergleich.
- **Farben:** Reisgelb/Creme `#EFEBDA`, Schwarz, Signalrot `#D7000F` (nur Logo-Zeichen und Primär-Button), Sand `#D6CAB5`.
- **Weißraum/Raster:** Desktop: **linke sticky Kategorie-Spalte** (Most Popular … Beverages, 15 Kategorien, Versalien 11 px) + 3-spaltiges Gerichte-Raster rechts.
- **Bildsprache:** freigestellte Gerichte auf weißen Tellern, schräg von oben, auf Sandfläche, sehr einheitlich. Ohne Fotos würde das Raster leer wirken; die Typo trägt aber den Hero allein.
- **Navigation:** gläserne, fixe Kopfzeile, „Reserve“ (rot) und „Order“ (Outline) als Pillen; mobil Vollbild-Overlay-Menü mit 48-px-Serife.
- **Speisekarte im Detail:**
  - Kategorien: Desktop sticky Seitenleiste mit Unterstreichung der aktiven Kategorie (Scrollspy).
  - **Mobil: sticky Leiste „APPETIZERS ▾“** zeigt immer die aktuelle Kategorie an und öffnet beim Antippen die Liste. Sehr gutes Muster für viele Kategorien.
  - Gerichte: Foto, Name (Serife, zentriert), 2–3 Zeilen Beschreibung (abgeschnitten mit „…“), Klick führt zu einer Detailseite pro Gericht.
  - **Keine Preise** (je nach Standort verschieden). Allergene: eigener „Allergen Guide“-Button direkt im Hero und unter der Kategorieliste plus ein ehrlicher Hinweis zu Kreuzkontamination.
  - Keine Suche. Bestell-CTA „Order“ dauerhaft im Header.
- **Mikrointeraktionen:** Lenis-Smooth-Scroll, Hover-Hintergründe 0,1 s, Pfeil-Icons in Buttons. Newsletter-Modal mit Maskottchen beim ersten Besuch.
- **Mobil:** gut: sticky Kategorie-Dropdown, großer Serifen-Hero. Schlecht: zweispaltiges Foto-Raster mit kleinen Namen, keine Preise, das Modal und der Consent-Button überdecken Inhalte.

## 6. Nobu (London Old Park Lane)

- **URL:** noburestaurants.com/london-old-park-lane/home, Karte: `/menus`
- **Typografie:** nur „Poppins“ (400–800). Kategorien 16–24 px/500–700, **alles in Versalien**, gold; Gerichte 14 px Versal, Preise 16 px. Logo als kursive Wortmarke. Wirkt generisch.
- **Farben:** Weiß, Hellgrau `#F4F4F4`, Anthrazit `#333`, Bronze-Gold `#886E42` (≈ 4,8:1 auf Weiß, gerade ausreichend).
- **Weißraum/Raster:** zentrierte, schmale Kartenspalte (~650 px) mit Haarlinien zwischen den Kategorien; Preis an fester rechter Kante.
- **Bildsprache:** Vollbild-Food-Slider (Hände, Tacos, Tataki). Die Karte selbst ist fotolos und eine reine Liste.
- **Navigation:** lange Textnavigation (Nobu at Home, Takeout, Menus …), „Reservations“-Button. **Mobil: drei große Buttons „RESERVE / CALL / TAKEOUT“** direkt unter dem Slider. Das ist der klarste Anruf-CTA unter den großen Häusern.
- **Speisekarte im Detail:**
  - **Sticky Tab-Leiste** (Lunch, Dinner, Omakase, Dessert, Sake & Wine, Cocktails); mobil horizontal scrollbar mit sichtbarer Scroll-Leiste als Hinweis.
  - Kategorien als zentrierte Gold-Versalien mit Linie darüber.
  - Preis als reine Zahl, rechtsbündig in einer Spalte, Zeilen mit Hover-Hintergrund.
  - Varianten als Text („CHOICE OF SPICY TUNA, SALMON OR YELLOWTAIL“, „CAN BE MADE VEGAN“).
  - Keine Diät-Icons, keine Allergene, keine Beschreibungen, keine Suche.
- **Mikrointeraktionen:** Zeilen-Hover, Tab-Wechsel. Viele Overlays: Festtags-Popup, Barrierefreiheits-Overlay-Widget, Cookie-Button, „nach oben“-Button. Mobil verdecken die schwebenden Buttons Preise.
- **Mobil:** gut: Reserve/Call/Takeout-Leiste und die sticky Tabs. Schlecht: schwebende Overlays über dem Inhalt, Versalien-Fließtext ist schwer lesbar, und die Seite ist mit ~11.800 px sehr lang.

## 7. Xi'an Famous Foods (New York, Schnellrestaurant mit Abholung) – selbst gewählt

- **URL:** xianfoods.com, Karte: `/menu`
- **Typografie:** Display „PP Supply Sans“ 700 (Versalien, 64/48 px, technisch-kantig), Text „Open Sans“ 16 px, Gerichtnamen Open Sans 700 **32 px**. Chinesischer Name klein in Rot über dem englischen.
- **Farben:** Papier-Creme `#F1EEE3`, Schwarz, Tablett-Rot `#CF0909`, Dunkelrot `#8E0808` (Nummern-Badges), Senfgelb (Buttons). Rot wird hier als Tablett und Sticker eingesetzt, also mit Augenzwinkern und nicht als Rot-Gold-Kitsch.
- **Weißraum/Raster:** 3-spaltiges Karten-Raster mit 1-px-Rahmen; mobil einspaltig.
- **Bildsprache:** Collage aus Klebeband, Polaroids, Rot-Weiß-Streifen, Wandmalerei. Gerichte freigestellt.
- **Navigation:** Laufschrift-Ticker oben („不辣不如辣 :: NOT SPICY = NOT AS GOOD“), Textnavigation mit „Pickup/Delivery“ und „Rewards App!“.
- **Speisekarte im Detail:**
  - **Gerichtnummern als großes Badge (A1, B2, F4, N9 …)**. Das Präfix steht für die Kategorie (A = Liang Pi, B = Burger, N = Noodles, F = Dumplings). Direkt übertragbar auf die nummerierte Karte eines Asia Wok.
  - **Filter-Leiste** (All, Liang Pi, Burgers, Other Specialties, Cold Dishes, Hand-ripped Noodles) filtert die Liste, mobil **sticky** und horizontal scrollbar.
  - Zweisprachige Namen (Chinesisch rot und klein, Englisch fett und groß).
  - **Keine Preise** auf der Website (die gibt es nur beim Bestellpartner); Allergene und Nährwerte als verlinktes Dokument; Schärfe-Hinweis im Intro.
  - Bestell-CTA „Pickup/Delivery“ in der Navigation.
- **Mikrointeraktionen:** Ticker, schräge „Sticker“-Buttons, Hover-Übergänge.
- **Mobil:** gut: sticky Filter und eindeutige Nummern. Schlecht: ein großes Foto pro Gericht macht die Seite lang (~9.000 px), es gibt keine Preise und keinen Anruf-Link.

## 8. Pinch Chinese (SoHo, New York, kleines Lokal) – selbst gewählt

- **URL:** pinchchinese.com, Karte als Abschnitt `/#menu`
- **Typografie:** nur „Abel“ (schmale Grotesk). h1 45 px, Kategorien 24 px rot mit **5 px Laufweite** (gesperrt, wirkt wie ein Stempel), Gerichte 16 px fett, Beschreibung 16 px/300. Preise fett.
- **Farben:** Hellgrau `#D8D8D8` als Fläche, Schwarz (Header, aktive Tabs), Ziegelrot `#A63B37` für Kategorien (≈ 4,5:1 auf dem Grau, knapp).
- **Weißraum/Raster:** eine schmale Spalte (~780 px), darin zwei Gerichtspalten; Preis direkt rechts neben dem Namen am Spaltenende.
- **Bildsprache:** ein starkes Foto (Wandkunst im Lokal), sonst textlich. Die Karte funktioniert vollständig ohne Fotos.
- **Navigation:** schwarze Kopfzeile mit **Adresse und Telefonnummer oben fix**. **Mobil steht ganz oben ein großer Button mit der Telefonnummer, darunter „Make a Reservation“**. Genau das Hauptziel „anrufen“.
- **Speisekarte im Detail:**
  - Zwei Tabs („All Day“ / „Happy Millennial Hour“), mobil als natives `<select>`.
  - Kategorien: Dumplings, Small Plates, Large Plates, Rices + Noodles, Vegetables, Our Specialties …
  - Preisformat „$18.00“ fett; mobil **unter** dem Namen (Name → Preis → Beschreibung), also gut zu überfliegen.
  - Hinweise zu Vorbestellung in Versalien („PLEASE ALLOW AT LEAST ONE HOUR …“), Gästezitat als Beschreibung.
  - Allergene: „Please call us“. Keine Diät-Icons, keine Suche, keine sticky Kategorien.
  - Bestellung über externe Plattform (Seamless), eigener Abschnitt „Takeout + Delivery“.
- **Mikrointeraktionen:** praktisch keine (Bootstrap-Seite), wirkt etwas veraltet.
- **Mobil:** gut: Anruf-Button ganz oben und vollständige HTML-Karte mit Preisen. Schlecht: keine Kategorie-Sprünge bei einer sehr langen Seite (~10.800 px), dünne Schrift (300) auf Grau.

### Randnotiz: PDF-Karten (Koya London und deutsche Lokale)

Koya (koya.co.uk, typografisch schönes Udon-Lokal) leitet `/menu/soho` auf eine **PDF-Datei** um. Auf dem Handy bedeutet das einen Download und Zoomen, und die Karte ist ohne Suche und ohne Barrierefreiheit. Gleiches gilt für mehrere geprüfte Berliner Lokale (Kuchi, Madame Ngo: PDF-Speisekarte). Das ist im deutschen Umfeld der Normalfall und damit unsere Chance, uns abzuheben.

---

## Querschnitt: Beobachtungen

| | Sticky Kategorien | Suche/Filter | Preise | Diät/Allergene | Anruf-CTA mobil |
|---|---|---|---|---|---|
| Hakkasan | nein (Tabs/Dropdown) | nein | Zahl rechts | Icons + Legende | nein |
| Yauatcha | nein | nein | Zahl rechts | Icons | nein |
| BAO | nein | nein | im Bild | im Bild | nein |
| Momofuku | nein (CTAs sticky) | nein | Zahl rechts | nein | nein |
| Din Tai Fung | **ja (Seitenleiste / Dropdown)** | nein | keine | Allergen-Guide | nein |
| Nobu | **ja (Tabs)** | nein | Zahl rechts | Text | **ja (Call)** |
| Xi'an | **ja (Filter)** | **Filter** | keine | PDF-Link | nein |
| Pinch | nein | nein | $ fett | „anrufen“ | **ja (ganz oben)** |

- **Keine** der acht Seiten hat eine Suche in der Speisekarte, und keine einen eigenen Bestellzettel. Beides wäre für uns ein echtes Alleinstellungsmerkmal.
- Die hochwertigsten Karten (Hakkasan, Nobu, Momofuku) sind selbst **fotolos**. Fotos stehen nur im Hero. Eine reine Typo-Karte ist also Branchenstandard im gehobenen Segment und kein Notbehelf.
- Preise stehen fast immer als **nackte Zahl ohne Währung, rechtsbündig**. Das spart Platz und wirkt ruhig.

---

## Was wir übernehmen

1. **Nummern-Badge als Gestaltungselement** (Xi'an): Gerichtnummer groß und tabellarisch (`font-variant-numeric: tabular-nums`) links in einer festen Spalte. Wer anruft, sagt „die 47, bitte“. Die Nummer ist damit Navigations- und Bestellhilfe zugleich.
2. **Mobil eine sticky Leiste mit der aktuellen Kategorie** (Din Tai Fung „APPETIZERS ▾“), die beim Antippen alle Kategorien als Liste (natives `<dialog>`/Popover) öffnet. Desktop: sticky Seitenleiste mit Scrollspy.
3. **Horizontal scrollbare Kategorie-Chips als Alternative** (Nobu, Xi'an), mit angeschnittenem letztem Chip als Hinweis, dass man wischen kann. Der aktive Chip wird automatisch ins Bild gescrollt.
4. **Preis als Zahl mit deutschem Komma, rechtsbündig, Tabellenziffern** („8,90“). Kein €-Zeichen an jeder Zeile, sondern einmal „Preise in Euro“ im Kopf (Hakkasan, Nobu, Momofuku). Mobil bleibt der Preis in derselben Zeile wie der Name und bricht nicht um.
5. **Display/Text-Paarung als einzige Bildsprache** (Din Tai Fung, Hakkasan): eine charaktervolle Display-Schrift für Kategorien und Hero, eine sehr gut lesbare Text-Schrift für Gerichte und Zutaten, Hierarchie Kategorie ≥ 28 px → Gericht 17–18 px fett → Zutaten 15 px. Keine Weights unter 400 für Text (Gegenbeispiele Hakkasan 200, Pinch 300).
6. **Kennzeichnung direkt am Gericht** mit kleinen, eindeutigen Markern (Hakkasan-Blätter), aber mit **Text-Kürzel statt nur Icon** (z. B. „vegan“, „scharf“), dazu **Allergen-Buchstaben (A–N nach LMIV)** als dezente Hochstellung. Legende oben und erreichbar über die sticky Leiste, nicht erst am Seitenende.
7. **Clientseitige Suche plus Diät-Filter** (Xi'an-Filter weitergedacht): ein Suchfeld über der Liste, das nach Name, Nummer und Zutat filtert, sowie Toggle-Chips „vegetarisch“, „vegan“, „scharf“, „ohne Erdnuss“. Ohne Treffer: freundlicher Leerzustand mit Anruf-Link.
8. **Anruf-Button immer erreichbar** (Pinch ganz oben, Nobu „CALL“): mobil eine fixe untere Leiste „Anrufen“ (`tel:`) plus „Bestellzettel (n)“, und die Telefonnummer schon im ersten Bildschirm der Startseite.
9. **Bestellzettel als eigener Baustein** (kommt auf keiner Seite vor): „+“ am Gericht, Menge, Summe, und am Ende eine Liste zum Vorlesen am Telefon („Nr. 47 × 2, Nr. 12 × 1 …“) mit großem Button „Jetzt anrufen“. Gespeichert lokal im Browser, ohne Konto und ohne Online-Bezahlung.
10. **Kategorie-Abschnitte als semantische Blöcke** (Momofuku-Karten, Nobu-Linien): Haarlinie oder getönte Fläche pro Kategorie, Kategorie-Kurzhinweis direkt darunter (z. B. „mit Reis serviert“, „Größe wählbar“), Varianten in einer Zeile („Huhn / Schwein 9,50 · Ente / Garnelen 11,50“) statt eigener Einträge.
11. **Ein Farbakzent mit Augenzwinkern statt Klischee** (Xi'an-Tablett-Rot, Momofuku-Grün, Din-Tai-Fung-Signalrot nur am Button): warmer Papiergrund plus **eine** kräftige Akzentfarbe für Nummern, aktive Chips und CTA. Kontrast mindestens 4,5:1 von Anfang an (Gegenbeispiel Yauatcha).
12. **Öffnungszeiten als klares Band** (Momofuku): groß und mit Tabellenziffern, mit dem Status „Jetzt geöffnet / schließt um 21:30“ (Din Tai Fung zeigt „Open until 9:00 PM“ in der Standortliste) direkt neben dem Anruf-Button.

## Was wir bewusst nicht übernehmen

- **Karte als Bild oder PDF** (BAO, Koya, viele deutsche Lokale): auf dem Handy unlesbar, nicht durchsuchbar, nicht barrierefrei, für Suchmaschinen unsichtbar.
- **Newsletter- und Aktions-Popups beim ersten Besuch** (Momofuku, Din Tai Fung, Nobu): sie verdecken genau das, wofür die Leute kommen.
- **Schwebende Overlay-Widgets** (Barrierefreiheits-Overlay, Cookie-Bubble, „nach oben“-Button bei Nobu), die Preise verdecken. Barrierefreiheit gehört in den Code und nicht in ein Overlay.
- **Luxus-Gesten**: Schwarz-Gold-Inszenierung, unscharfes Dampf-Video im Hero, Reservierungs-Button als Hauptaktion (Hakkasan, Nobu). Das passt nicht zu einem Abhol-Imbiss in Sinzig.
- **Autoplay-Video und Foto-Slider im Hero** (Hakkasan, Nobu): schwer für die Ladezeit, ohne Mehrwert für das Ziel „Karte und Anruf“; wir haben ohnehin keine eigenen Fotos.
- **Rot-Gold-Klischees, Pinselschrift-Imitate, Drachen- und Wolkenornamente**. Asiatische Schriftzeichen nur, wo sie echt und richtig sind (z. B. Gerichtnamen), nie als Dekoration.
- **Versalien für Gerichte oder Fließtext** (Nobu, Yauatcha): verlangsamt das Lesen bei ~100 Gerichten. Versalien nur für kurze Labels.
- **Ultradünne Schriftschnitte und Pastelltext auf Weiß** (Hakkasan 200, Yauatcha Pink auf Weiß ≈ 3,3:1).
- **Ein Foto pro Gericht im Raster** (Din Tai Fung, Xi'an): Seiten von 9.000–11.000 px, bei 100 Gerichten nicht zu bedienen.
- **Abgeschnittene Beschreibungen mit „…“ und Detailseiten pro Gericht** (Din Tai Fung): ein zusätzlicher Klick pro Gericht; die Zutaten müssen direkt sichtbar sein.
- **Karte ohne Preise** (Din Tai Fung, Xi'an): Bei Abholung will man den Preis vor dem Anruf kennen.
- **Allergenauskunft nur „bitte fragen“** (Hakkasan, Pinch): In Deutschland ist die Kennzeichnung der 14 Hauptallergene ohnehin Pflicht, also kennzeichnen wir sie sichtbar.
- **Lange Textnavigation mit 8–10 Punkten** (Hakkasan, Nobu): Wir brauchen höchstens Speisekarte, Anfahrt und Öffnungszeiten, Kontakt.
