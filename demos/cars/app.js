/* Kyma Car Rentals — shared script: data, translations, header/footer, page logic */
const WA = "35799000000"; // company WhatsApp, digits only
const PHONE = "+357 99 000 000";

const cars = [
  {id:"picanto", img:"picanto.jpg", n:"Kia Picanto", type:"mini", c:"#ff7a2f", cls:{en:"Mini",el:"Μίνι",ru:"Мини"}, low:24, high:36, seats:4, bags:1},
  {id:"yaris", img:"yaris.jpg", n:"Toyota Yaris Hybrid", type:"sedan", c:"#1593ad", cls:{en:"Economy",el:"Οικονομικό",ru:"Эконом"}, low:32, high:45, seats:5, bags:2, best:true},
  {id:"mini", img:"mini.jpg", n:"Mini Cooper Cabrio", type:"cabrio", c:"#e0b23b", cls:{en:"Convertible",el:"Κάμπριο",ru:"Кабриолет"}, low:59, high:85, seats:4, bags:1},
  {id:"tucson", img:"tucson.jpg", n:"Hyundai Tucson", type:"suv", c:"#3c4b63", cls:{en:"SUV",el:"SUV",ru:"Кроссовер"}, low:49, high:69, seats:5, bags:4},
  {id:"vito", img:"vito.jpg", n:"Mercedes Vito", type:"van", c:"#c9ced6", cls:{en:"9-seater",el:"9θέσιο",ru:"9 мест"}, low:79, high:110, seats:9, bags:6}
];
const places = [
  {id:"lim", fee:0, n:{en:"Limassol, hotel delivery",el:"Λεμεσός, παράδοση στο ξενοδοχείο",ru:"Лимассол, доставка в отель"}},
  {id:"lca", fee:20, n:{en:"Larnaca Airport (LCA)",el:"Αεροδρόμιο Λάρνακας (LCA)",ru:"Аэропорт Ларнаки (LCA)"}},
  {id:"pfo", fee:20, n:{en:"Paphos Airport (PFO)",el:"Αεροδρόμιο Πάφου (PFO)",ru:"Аэропорт Пафоса (PFO)"}}
];
const extras = [
  {id:"ins", day:9, on:true, n:{en:"Full insurance, zero excess",el:"Πλήρης ασφάλεια χωρίς απαλλαγή",ru:"Полная страховка без франшизы"}},
  {id:"child", day:3, n:{en:"Child seat",el:"Παιδικό κάθισμα",ru:"Детское кресло"}},
  {id:"driver", day:4, n:{en:"Additional driver",el:"Επιπλέον οδηγός",ru:"Доп. водитель"}}
];
const isHigh = d => { const m = d.getMonth(); return m >= 5 && m <= 8; }; // June to September

function carSVG(c, type){
  const roof = {mini:"M70 34 L90 14 C94 10 98 8 106 8 L150 8 C158 8 164 12 168 18 L184 34Z",
    sedan:"M64 34 L88 12 C92 8 98 6 106 6 L156 6 C166 6 172 10 178 16 L198 34Z",
    suv:"M48 34 L58 6 C60 3 64 2 70 2 L186 2 C194 2 198 4 202 10 L216 34Z",
    cabrio:"M96 34 L104 22 L120 22 L124 34Z",
    van:"M30 34 L30 4 C30 2 32 0 36 0 L196 0 C204 0 210 4 214 10 L230 34Z"}[type];
  const glass = {mini:"M80 32 L94 16 C97 13 100 12 106 12 L148 12 C154 12 158 14 162 20 L174 32Z",
    sedan:"M76 32 L92 15 C95 12 99 11 106 11 L154 11 C162 11 166 13 170 19 L186 32Z",
    suv:"M60 32 L66 9 C67 7 69 6 72 6 L184 6 C190 6 193 8 196 13 L206 32Z",
    cabrio:"M104 32 L110 24 L118 24 L120 32Z",
    van:"M40 30 L40 6 L196 6 C202 6 206 9 209 13 L220 30Z"}[type];
  return `<svg viewBox="0 0 260 110" aria-hidden="true"><ellipse cx="130" cy="100" rx="112" ry="6" fill="#000" opacity=".15"/><path d="${roof}" fill="${c}"/><path d="${glass}" fill="#d9f1f6"/><path d="M14 74 C14 50 26 38 52 34 L210 34 C238 36 250 50 250 70 L250 80 L14 80Z" fill="${c}"/><path d="M30 56h204" stroke="#000" stroke-opacity=".1" stroke-width="2"/><rect x="230" y="46" width="18" height="8" rx="4" fill="#fff4d6"/><rect x="16" y="48" width="12" height="8" rx="4" fill="#ffc2b0"/><circle cx="68" cy="82" r="18" fill="#1a1f2b"/><circle cx="68" cy="82" r="8" fill="#cfd6df"/><circle cx="196" cy="82" r="18" fill="#1a1f2b"/><circle cx="196" cy="82" r="8" fill="#cfd6df"/></svg>`;
}

const T = {
en:{
 demo:"Demo website. Kyma Car Rentals is a sample business created to show what we build.",
 navHome:"Home", navFleet:"Fleet & prices", navBook:"Book now", navPolicies:"Terms & privacy", navContact:"Contact",
 seats:"seats", bags:"bags", auto:"Automatic", ac:"A/C", day:"/day", from:"from", choose:"Book this car", popular:"Most booked", free:"free",
 fTag:"Car rental in Limassol and at Larnaca & Paphos airports.", fPages:"Pages", fContact:"Contact", fHours:"Office 08:00–21:00 · Roadside help 24/7", made:"Website by Nisi Studio",
 // home
 eyebrow:"Car rental · Limassol · Larnaca & Paphos airports", h1:"Land. Get the keys. <span>Drive the coast.</span>",
 lead:"We meet you at arrivals with a clean car and a full tank. No hidden fees, no queue at a counter.",
 b1:"per day from", b2:"deposit with full cover", b3:"roadside help", cta1:"Get my price", cta2:"See the cars",
 u1:"Free delivery to your hotel in Limassol", u2:"Full insurance with zero excess available", u3:"Free cancellation up to 48 h before pickup",
 k1:"Popular cars", homeFleetH:"Ready when you land", homeFleetP:"Three of our most booked cars. See the full fleet and seasonal prices on the next page.", allCars:"All cars and prices",
 k2:"How it works", howH:"Three steps, no paperwork queue",
 s1t:"Get a quote", s1p:"Pick a car, dates and pickup place. The price updates as you choose.",
 s2t:"Confirm on WhatsApp", s2p:"Your booking arrives as a ready message. We reply within minutes, day or night.",
 s3t:"Meet us at arrivals", s3p:"A driver waits with your name. Ten minutes of checks and you are on the road.",
 k3:"Reviews", revH:"What drivers say",
 r1:"Car was waiting at Larnaca at 1 am, spotless. Fastest rental I've ever had.", r2:"Clear price from the start, no surprises at return. We'll book again next summer.", r3:"They explained driving on the left and gave us a map of the best beaches.",
 sample:"Sample reviews. Your real Google reviews appear here.",
 ctaH:"Your car is one message away", ctaP:"Get your exact price in 20 seconds.",
 // fleet
 fleetCrumb:"Fleet & prices", fleetH1:"Cars and seasonal prices", fleetLead:"All cars are automatic, air-conditioned and right-hand drive, like everywhere in Cyprus, where you drive on the left.",
 tableH:"Price list", tableP:"Daily rates including basic insurance and unlimited mileage.",
 thCar:"Car", thClass:"Class", thLow:"Oct–May", thHigh:"Jun–Sep", thWeek:"7 days, Oct–May",
 tableNote:"Weekly price = 7 × daily rate minus 10%. Prices in euros, VAT included.",
 // booking
 bookCrumb:"Booking", bookH1:"Your price in 20 seconds", bookLead:"The price you see is the price you pay. Fuel policy is full-to-full.",
 fCar:"Car", fFrom:"Pickup date", fTo:"Return date", fWhere:"Pickup place", fName:"Your name", fFlight:"Flight number",
 rH:"Your quote", days:"days", rental:"Rental", delivery:"Delivery", total:"Total", lowS:"Low-season rate", highS:"High-season rate",
 dep:"Refundable deposit €300, or €0 with full insurance.", send:"Book on WhatsApp",
 msg:"Hello Kyma! I'd like to book:", mDates:"Dates", mPlace:"Pickup", mExtras:"Extras", mName:"Name", mFlight:"Flight", mTotal:"Quoted total", perDay:"/day",
 // policies
 polCrumb:"Terms & privacy", polH1:"Rental terms and privacy", polLead:"Plain-language rules, so nothing surprises you at pickup or return.",
 tReq:"Requirements", tIns:"Insurance", tDep:"Deposit & payment", tFuel:"Fuel & mileage", tCan:"Cancellation", tNorth:"Driving to the north", tPriv:"Privacy policy", tCook:"Cookies",
 pReq:"<ul><li>Minimum age 21, or 25 for the 9-seater.</li><li>Driving licence held for at least 12 months. Licences from outside the EU may need an International Driving Permit.</li><li>Passport or national ID and a credit or debit card in the main driver's name.</li></ul>",
 pIns:"<p>Every rental includes third-party and collision cover with an excess of €700. With full insurance (€9 per day) the excess drops to €0 and covers tyres, glass and the underside of the car.</p>",
 pDep:"<p>We hold a refundable deposit of €300 on your card at pickup and release it on return. With full insurance there is no deposit. You pay the rental at pickup by card or cash.</p>",
 pFuel:"<p>Full-to-full: you receive the car with a full tank and return it full. Mileage is unlimited.</p>",
 pCan:"<p>Free cancellation up to 48 hours before pickup. Later cancellations or no-shows are charged one day of rental.</p>",
 pNorth:"<p>You may cross to the north of the island, but our insurance does not apply there. Buy local insurance at the crossing point; any damage in the north is your responsibility.</p>",
 pPriv:"<p>Kyma Car Rentals is the data controller. We collect only what we need to rent you a car: your name, phone number, flight number, and at pickup your licence and ID details.</p><ul><li>We use this data to manage your booking and meet legal duties. We do not sell it or use it for advertising.</li><li>Booking requests reach us through WhatsApp, which processes messages under its own privacy policy.</li><li>We keep rental records for as long as Cypriot tax law requires, then delete them.</li><li>Under the GDPR you can ask to see, correct or delete your data. Write to us on WhatsApp or at the office. You can also complain to the Cyprus Commissioner for Personal Data Protection.</li></ul>",
 pCook:"<p>This website uses no tracking or advertising cookies. Your language choice is saved in your browser only.</p>",
 upd:"Last updated: October 2026 · Template text, to be reviewed with the business before going live.",
 // contact
 conCrumb:"Contact", conH1:"Talk to a person, not a call centre", conLead:"WhatsApp is the fastest way to reach us. We answer in English, Greek and Russian.",
 offH:"Where to find us", o1t:"Limassol office", o1p:"28 Makariou Avenue, Limassol. Open 08:00–21:00.", o2t:"Larnaca Airport", o2p:"Meet-and-greet at arrivals, every flight.", o3t:"Paphos Airport", o3p:"Meet-and-greet at arrivals, every flight.",
 waT:"WhatsApp, 24/7", copy:"Copy", copied:"Copied", maps:"Open in Google Maps",
 faqH:"Questions", q1:"What do I need to rent a car?", a1:"A driving licence held for at least one year, your passport or ID, and a credit or debit card. Drivers must be 21 or older.",
 q2:"What if my flight is late?", a2:"Send your flight number when you book. We track it and wait for you at no extra charge.",
 q3:"Can I return the car at a different place?", a3:"Yes. Returns at any of our three locations cost the same as pickup there.",
 q4:"Is there a minimum rental?", a4:"Two days in July and August, one day the rest of the year."
},
el:{
 demo:"Δοκιμαστική ιστοσελίδα. Η Kyma Car Rentals είναι παράδειγμα επιχείρησης.",
 navHome:"Αρχική", navFleet:"Στόλος & τιμές", navBook:"Κράτηση", navPolicies:"Όροι & απόρρητο", navContact:"Επικοινωνία",
 seats:"θέσεις", bags:"βαλίτσες", auto:"Αυτόματο", ac:"A/C", day:"/ημέρα", from:"από", choose:"Κράτηση", popular:"Πιο δημοφιλές", free:"δωρεάν",
 fTag:"Ενοικίαση αυτοκινήτων στη Λεμεσό και στα αεροδρόμια Λάρνακας & Πάφου.", fPages:"Σελίδες", fContact:"Επικοινωνία", fHours:"Γραφείο 08:00–21:00 · Οδική βοήθεια 24/7", made:"Ιστοσελίδα από Nisi Studio",
 eyebrow:"Ενοικίαση αυτοκινήτων · Λεμεσός · Αεροδρόμια Λάρνακας & Πάφου", h1:"Προσγείωση. Κλειδιά. <span>Οδήγηση στην ακτή.</span>",
 lead:"Σας περιμένουμε στις αφίξεις με καθαρό αυτοκίνητο και γεμάτο ρεζερβουάρ. Χωρίς κρυφές χρεώσεις, χωρίς ουρές.",
 b1:"την ημέρα από", b2:"εγγύηση με πλήρη κάλυψη", b3:"οδική βοήθεια", cta1:"Η τιμή μου", cta2:"Τα αυτοκίνητα",
 u1:"Δωρεάν παράδοση στο ξενοδοχείο σας στη Λεμεσό", u2:"Πλήρης ασφάλεια χωρίς απαλλαγή", u3:"Δωρεάν ακύρωση έως 48 ώρες πριν",
 k1:"Δημοφιλή", homeFleetH:"Έτοιμα όταν προσγειωθείτε", homeFleetP:"Τρία από τα πιο δημοφιλή μας. Όλος ο στόλος και οι εποχικές τιμές στην επόμενη σελίδα.", allCars:"Όλα τα αυτοκίνητα και τιμές",
 k2:"Πώς λειτουργεί", howH:"Τρία βήματα, χωρίς ουρές",
 s1t:"Δείτε την τιμή", s1p:"Διαλέξτε αυτοκίνητο, ημερομηνίες και τόπο παραλαβής. Η τιμή ενημερώνεται αμέσως.",
 s2t:"Επιβεβαίωση στο WhatsApp", s2p:"Η κράτηση φτάνει ως έτοιμο μήνυμα. Απαντάμε σε λίγα λεπτά, μέρα ή νύχτα.",
 s3t:"Συνάντηση στις αφίξεις", s3p:"Ένας οδηγός σας περιμένει με το όνομά σας. Δέκα λεπτά έλεγχος και ξεκινάτε.",
 k3:"Κριτικές", revH:"Τι λένε οι οδηγοί",
 r1:"Το αυτοκίνητο περίμενε στη Λάρνακα στη 1 το πρωί, πεντακάθαρο. Η πιο γρήγορη ενοικίαση που έχω κάνει.", r2:"Ξεκάθαρη τιμή από την αρχή, καμία έκπληξη στην επιστροφή.", r3:"Μας εξήγησαν την αριστερή οδήγηση και μας έδωσαν χάρτη με τις καλύτερες παραλίες.",
 sample:"Ενδεικτικές κριτικές. Εδώ εμφανίζονται οι πραγματικές σας κριτικές Google.",
 ctaH:"Το αυτοκίνητό σας είναι ένα μήνυμα μακριά", ctaP:"Δείτε την ακριβή τιμή σε 20 δευτερόλεπτα.",
 fleetCrumb:"Στόλος & τιμές", fleetH1:"Αυτοκίνητα και εποχικές τιμές", fleetLead:"Όλα είναι αυτόματα, με κλιματισμό και τιμόνι δεξιά, όπως παντού στην Κύπρο.",
 tableH:"Τιμοκατάλογος", tableP:"Ημερήσιες τιμές με βασική ασφάλεια και απεριόριστα χιλιόμετρα.",
 thCar:"Αυτοκίνητο", thClass:"Κατηγορία", thLow:"Οκτ–Μάι", thHigh:"Ιούν–Σεπ", thWeek:"7 ημέρες, Οκτ–Μάι",
 tableNote:"Εβδομαδιαία τιμή = 7 × ημερήσια μείον 10%. Τιμές σε ευρώ με ΦΠΑ.",
 bookCrumb:"Κράτηση", bookH1:"Η τιμή σας σε 20 δευτερόλεπτα", bookLead:"Η τιμή που βλέπετε είναι η τελική. Πολιτική καυσίμου γεμάτο-γεμάτο.",
 fCar:"Αυτοκίνητο", fFrom:"Παραλαβή", fTo:"Επιστροφή", fWhere:"Τόπος παραλαβής", fName:"Όνομα", fFlight:"Αριθμός πτήσης",
 rH:"Η προσφορά σας", days:"ημέρες", rental:"Ενοικίαση", delivery:"Παράδοση", total:"Σύνολο", lowS:"Τιμή χαμηλής περιόδου", highS:"Τιμή υψηλής περιόδου",
 dep:"Επιστρεπτέα εγγύηση €300, ή €0 με πλήρη ασφάλεια.", send:"Κράτηση στο WhatsApp",
 msg:"Γεια σας! Θα ήθελα να κλείσω:", mDates:"Ημερομηνίες", mPlace:"Παραλαβή", mExtras:"Επιπλέον", mName:"Όνομα", mFlight:"Πτήση", mTotal:"Σύνολο προσφοράς", perDay:"/ημ.",
 polCrumb:"Όροι & απόρρητο", polH1:"Όροι ενοικίασης και απόρρητο", polLead:"Απλοί κανόνες, ώστε να μην υπάρχουν εκπλήξεις.",
 tReq:"Προϋποθέσεις", tIns:"Ασφάλεια", tDep:"Εγγύηση & πληρωμή", tFuel:"Καύσιμα & χιλιόμετρα", tCan:"Ακύρωση", tNorth:"Οδήγηση στον βορρά", tPriv:"Πολιτική απορρήτου", tCook:"Cookies",
 pReq:"<ul><li>Ελάχιστη ηλικία 21, ή 25 για το 9θέσιο.</li><li>Δίπλωμα τουλάχιστον 12 μηνών. Διπλώματα εκτός ΕΕ μπορεί να χρειάζονται διεθνή άδεια.</li><li>Διαβατήριο ή ταυτότητα και κάρτα στο όνομα του οδηγού.</li></ul>",
 pIns:"<p>Κάθε ενοικίαση περιλαμβάνει κάλυψη τρίτων και σύγκρουσης με απαλλαγή €700. Με πλήρη ασφάλεια (€9 την ημέρα) η απαλλαγή γίνεται €0 και καλύπτει ελαστικά, τζάμια και κάτω μέρος.</p>",
 pDep:"<p>Δεσμεύουμε επιστρεπτέα εγγύηση €300 στην κάρτα κατά την παραλαβή. Με πλήρη ασφάλεια δεν υπάρχει εγγύηση. Πληρωμή με κάρτα ή μετρητά.</p>",
 pFuel:"<p>Γεμάτο-γεμάτο: παραλαμβάνετε με γεμάτο ρεζερβουάρ και επιστρέφετε γεμάτο. Απεριόριστα χιλιόμετρα.</p>",
 pCan:"<p>Δωρεάν ακύρωση έως 48 ώρες πριν. Μεταγενέστερη ακύρωση ή μη εμφάνιση χρεώνεται μία ημέρα.</p>",
 pNorth:"<p>Μπορείτε να περάσετε στον βορρά, αλλά η ασφάλειά μας δεν ισχύει εκεί. Αγοράστε τοπική ασφάλεια στο σημείο διέλευσης.</p>",
 pPriv:"<p>Υπεύθυνος επεξεργασίας είναι η Kyma Car Rentals. Συλλέγουμε μόνο ό,τι χρειάζεται: όνομα, τηλέφωνο, αριθμό πτήσης και, στην παραλαβή, στοιχεία διπλώματος και ταυτότητας.</p><ul><li>Τα χρησιμοποιούμε για την κράτηση και τις νόμιμες υποχρεώσεις. Δεν τα πουλάμε.</li><li>Τα αιτήματα έρχονται μέσω WhatsApp, που επεξεργάζεται τα μηνύματα με τη δική του πολιτική.</li><li>Διατηρούμε τα αρχεία όσο απαιτεί η κυπριακή φορολογική νομοθεσία.</li><li>Βάσει GDPR μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή. Μπορείτε επίσης να απευθυνθείτε στην Επίτροπο Προστασίας Δεδομένων.</li></ul>",
 pCook:"<p>Η ιστοσελίδα δεν χρησιμοποιεί cookies παρακολούθησης ή διαφήμισης. Η γλώσσα σας αποθηκεύεται μόνο στον περιηγητή σας.</p>",
 upd:"Τελευταία ενημέρωση: Οκτώβριος 2026 · Ενδεικτικό κείμενο, προς έλεγχο από την επιχείρηση.",
 conCrumb:"Επικοινωνία", conH1:"Μιλήστε με άνθρωπο, όχι με τηλεφωνικό κέντρο", conLead:"Το WhatsApp είναι ο πιο γρήγορος τρόπος. Απαντάμε στα αγγλικά, ελληνικά και ρωσικά.",
 offH:"Πού θα μας βρείτε", o1t:"Γραφείο Λεμεσού", o1p:"Λεωφόρος Μακαρίου 28, Λεμεσός. 08:00–21:00.", o2t:"Αεροδρόμιο Λάρνακας", o2p:"Υποδοχή στις αφίξεις, σε κάθε πτήση.", o3t:"Αεροδρόμιο Πάφου", o3p:"Υποδοχή στις αφίξεις, σε κάθε πτήση.",
 waT:"WhatsApp, 24/7", copy:"Αντιγραφή", copied:"Αντιγράφηκε", maps:"Άνοιγμα στο Google Maps",
 faqH:"Ερωτήσεις", q1:"Τι χρειάζομαι για να νοικιάσω;", a1:"Δίπλωμα τουλάχιστον ενός έτους, διαβατήριο ή ταυτότητα και κάρτα. Ελάχιστη ηλικία 21.",
 q2:"Κι αν καθυστερήσει η πτήση;", a2:"Στείλτε τον αριθμό πτήσης. Την παρακολουθούμε και σας περιμένουμε χωρίς χρέωση.",
 q3:"Μπορώ να επιστρέψω αλλού;", a3:"Ναι. Η επιστροφή σε οποιοδήποτε από τα τρία σημεία κοστίζει όσο και η παραλαβή εκεί.",
 q4:"Υπάρχει ελάχιστη διάρκεια;", a4:"Δύο ημέρες τον Ιούλιο και Αύγουστο, μία ημέρα τον υπόλοιπο χρόνο."
},
ru:{
 demo:"Демо-сайт. Kyma Car Rentals — пример бизнеса для портфолио.",
 navHome:"Главная", navFleet:"Автопарк и цены", navBook:"Бронь", navPolicies:"Условия", navContact:"Контакты",
 seats:"мест", bags:"сумки", auto:"Автомат", ac:"Кондиционер", day:"/день", from:"от", choose:"Забронировать", popular:"Чаще всего", free:"бесплатно",
 fTag:"Аренда авто в Лимассоле и в аэропортах Ларнаки и Пафоса.", fPages:"Страницы", fContact:"Контакты", fHours:"Офис 08:00–21:00 · Помощь на дороге 24/7", made:"Сайт от Nisi Studio",
 eyebrow:"Аренда авто · Лимассол · аэропорты Ларнаки и Пафоса", h1:"Прилетели. Ключи. <span>Вперёд по побережью.</span>",
 lead:"Встречаем в зоне прилёта на чистой машине с полным баком. Без скрытых платежей и очередей.",
 b1:"в день от", b2:"депозит с полной страховкой", b3:"помощь на дороге", cta1:"Узнать цену", cta2:"Автомобили",
 u1:"Бесплатная доставка в отель в Лимассоле", u2:"Полная страховка без франшизы", u3:"Бесплатная отмена за 48 ч",
 k1:"Популярные", homeFleetH:"Ждут вас в аэропорту", homeFleetP:"Три самых популярных авто. Весь автопарк и сезонные цены на следующей странице.", allCars:"Все авто и цены",
 k2:"Как это работает", howH:"Три шага без очередей",
 s1t:"Узнайте цену", s1p:"Выберите авто, даты и место получения. Цена обновляется сразу.",
 s2t:"Подтвердите в WhatsApp", s2p:"Бронь приходит готовым сообщением. Отвечаем за несколько минут, днём и ночью.",
 s3t:"Встреча в аэропорту", s3p:"Водитель ждёт с табличкой. Десять минут осмотра, и вы в пути.",
 k3:"Отзывы", revH:"Что говорят водители",
 r1:"Машина ждала в Ларнаке в час ночи, идеально чистая. Самая быстрая аренда в моей жизни.", r2:"Понятная цена с самого начала, никаких сюрпризов при возврате.", r3:"Объяснили левостороннее движение и дали карту лучших пляжей.",
 sample:"Примеры отзывов. Здесь будут ваши настоящие отзывы Google.",
 ctaH:"Ваша машина в одном сообщении", ctaP:"Точная цена за 20 секунд.",
 fleetCrumb:"Автопарк и цены", fleetH1:"Автомобили и сезонные цены", fleetLead:"Все машины с автоматом, кондиционером и правым рулём, как везде на Кипре, где левостороннее движение.",
 tableH:"Прайс-лист", tableP:"Цена в день с базовой страховкой и без ограничения пробега.",
 thCar:"Авто", thClass:"Класс", thLow:"Окт–Май", thHigh:"Июн–Сен", thWeek:"7 дней, Окт–Май",
 tableNote:"Цена за неделю = 7 × цена в день минус 10%. Цены в евро с НДС.",
 bookCrumb:"Бронирование", bookH1:"Цена за 20 секунд", bookLead:"Цена, которую вы видите, окончательная. Топливо: полный бак — полный бак.",
 fCar:"Автомобиль", fFrom:"Дата получения", fTo:"Дата возврата", fWhere:"Место получения", fName:"Имя", fFlight:"Номер рейса",
 rH:"Ваш расчёт", days:"дн.", rental:"Аренда", delivery:"Доставка", total:"Итого", lowS:"Цена низкого сезона", highS:"Цена высокого сезона",
 dep:"Возвратный депозит €300 или €0 с полной страховкой.", send:"Забронировать в WhatsApp",
 msg:"Здравствуйте! Хочу забронировать:", mDates:"Даты", mPlace:"Получение", mExtras:"Опции", mName:"Имя", mFlight:"Рейс", mTotal:"Сумма", perDay:"/день",
 polCrumb:"Условия", polH1:"Условия аренды и конфиденциальность", polLead:"Простые правила, чтобы при получении и возврате не было сюрпризов.",
 tReq:"Требования", tIns:"Страховка", tDep:"Депозит и оплата", tFuel:"Топливо и пробег", tCan:"Отмена", tNorth:"Поездки на север", tPriv:"Конфиденциальность", tCook:"Cookies",
 pReq:"<ul><li>Возраст от 21 года, для 9-местного авто от 25.</li><li>Стаж вождения от 12 месяцев. Для прав не из ЕС может понадобиться международное удостоверение.</li><li>Паспорт или ID и банковская карта на имя водителя.</li></ul>",
 pIns:"<p>В каждую аренду входит страховка ответственности и от столкновения с франшизой €700. С полной страховкой (€9 в день) франшиза €0, включая шины, стёкла и днище.</p>",
 pDep:"<p>При получении блокируем возвратный депозит €300 на карте. С полной страховкой депозита нет. Оплата картой или наличными.</p>",
 pFuel:"<p>Полный бак — полный бак. Пробег не ограничен.</p>",
 pCan:"<p>Бесплатная отмена за 48 часов. Более поздняя отмена или неявка — оплата одного дня.</p>",
 pNorth:"<p>Можно ехать на север острова, но наша страховка там не действует. Купите местную страховку на КПП.</p>",
 pPriv:"<p>Оператор данных — Kyma Car Rentals. Мы собираем только необходимое: имя, телефон, номер рейса, а при получении — данные прав и документа.</p><ul><li>Данные нужны для брони и законных обязанностей. Мы их не продаём.</li><li>Заявки приходят через WhatsApp, который обрабатывает сообщения по своей политике.</li><li>Храним записи столько, сколько требует налоговое право Кипра.</li><li>По GDPR вы можете запросить доступ, исправление или удаление данных, а также обратиться к Уполномоченному по защите данных Кипра.</li></ul>",
 pCook:"<p>Сайт не использует отслеживающие или рекламные cookies. Выбор языка хранится только в вашем браузере.</p>",
 upd:"Обновлено: октябрь 2026 · Шаблонный текст, требует проверки бизнесом перед запуском.",
 conCrumb:"Контакты", conH1:"С вами говорит человек, а не колл-центр", conLead:"WhatsApp — самый быстрый способ связи. Отвечаем на английском, греческом и русском.",
 offH:"Где нас найти", o1t:"Офис в Лимассоле", o1p:"Проспект Макариу 28, Лимассол. 08:00–21:00.", o2t:"Аэропорт Ларнаки", o2p:"Встреча в зоне прилёта, к любому рейсу.", o3t:"Аэропорт Пафоса", o3p:"Встреча в зоне прилёта, к любому рейсу.",
 waT:"WhatsApp, 24/7", copy:"Копировать", copied:"Скопировано", maps:"Открыть в Google Maps",
 faqH:"Вопросы", q1:"Что нужно для аренды?", a1:"Права со стажем от года, паспорт или ID и банковская карта. Возраст от 21 года.",
 q2:"А если рейс задержится?", a2:"Укажите номер рейса. Мы отслеживаем его и ждём бесплатно.",
 q3:"Можно вернуть авто в другом месте?", a3:"Да. Возврат в любой из трёх точек стоит столько же, сколько получение там.",
 q4:"Есть минимальный срок?", a4:"Два дня в июле и августе, один день в остальное время."
}
};

let lang = "en";
try { const s = localStorage.getItem("kyma-lang"); if (s && T[s]) lang = s; } catch(e) {}
const $ = id => document.getElementById(id);
const page = document.querySelector("main")?.dataset.page || "home";
const iso = d => d.toISOString().slice(0,10);
const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

function chrome(){
  const links = [["home","index.html","navHome"],["fleet","fleet.html","navFleet"],["policies","policies.html","navPolicies"],["contact","contact.html","navContact"],["booking","booking.html","navBook"]];
  $("site-nav").innerHTML = `
    <nav class="nav" aria-label="Main">
      <a class="logo" href="index.html"><i>K</i>Kyma<b>.</b></a>
      <div class="right">
        <div class="langs" role="group" aria-label="Language">
          <button type="button" data-lang="en">EN</button><button type="button" data-lang="el">ΕΛ</button><button type="button" data-lang="ru">RU</button>
        </div>
        <button class="burger" id="burger" type="button" aria-label="Menu" aria-expanded="false">☰</button>
      </div>
      <div class="menu" id="menu">${links.map(([id,href,k])=>`<a href="${href}" data-i18n="${k}" ${id===page?'aria-current="page"':""} class="${id==="booking"?"book-link":""}"></a>`).join("")}</div>
    </nav>`;
  const demo = document.createElement("div"); demo.className="demo-bar"; demo.dataset.i18n="demo";
  document.querySelector(".top").before(demo);
  $("site-footer").innerHTML = `
    <div><b>Kyma.</b><span data-i18n="fTag"></span></div>
    <div><b data-i18n="fPages"></b>${links.map(([id,href,k])=>`<a href="${href}" data-i18n="${k}"></a>`).join("")}</div>
    <div><b data-i18n="fContact"></b><span>WhatsApp ${PHONE}</span><br><span data-i18n="fHours"></span></div>
    <div><b>© 2026 Kyma Car Rentals</b><span data-i18n="made"></span></div>`;
  const fab = document.createElement("a"); fab.className="fab"; fab.id="fab"; fab.target="_blank"; fab.rel="noopener"; fab.textContent="WhatsApp";
  document.body.appendChild(fab);
  $("burger").onclick = () => { const o = $("menu").classList.toggle("open"); $("burger").setAttribute("aria-expanded", o); };
  document.querySelectorAll(".langs button").forEach(b => b.onclick = () => setLang(b.dataset.lang));
}

function carCard(c, t, cta){
  return `<article class="car"><div class="pic${c.img?" photo":""}"><span class="cls">${c.cls[lang]}${c.best?" · "+t.popular:""}</span>${c.img?`<img src="img/${c.img}" alt="${c.n}" width="900" height="600" loading="lazy">`:carSVG(c.c,c.type)}</div>
    <div class="body"><h3>${c.n}</h3><p class="alt">${c.cls[lang]}</p>
    <div class="specs"><span>${c.seats} ${t.seats}</span><span>${c.bags} ${t.bags}</span><span>${t.auto}</span><span>${t.ac}</span></div></div>
    <div class="foot"><span class="rate"><small>${t.from} </small>€${c.low}<small>${t.day}</small></span><a class="pick" href="booking.html#${c.id}">${cta}</a></div></article>`;
}

const pages = {
  home(t){
    $("featured").innerHTML = cars.filter(c=>["yaris","tucson","mini"].includes(c.id)).map(c=>carCard(c,t,t.choose)).join("");
  },
  fleet(t){
    $("fleet-grid").innerHTML = cars.map(c=>carCard(c,t,t.choose)).join("");
    $("price-table").innerHTML = `<thead><tr><th>${t.thCar}</th><th>${t.thClass}</th><th class="num">${t.thLow}</th><th class="num">${t.thHigh}</th><th class="num">${t.thWeek}</th></tr></thead>
      <tbody>${cars.map(c=>`<tr><td><b>${c.n}</b></td><td>${c.cls[lang]}</td><td class="num">€${c.low}</td><td class="num">€${c.high}</td><td class="num">€${Math.round(c.low*7*.9)}</td></tr>`).join("")}</tbody>`;
  },
  booking(t){
    const carSel = $("f-car"), keep = carSel.value || (cars.find(c=>"#"+c.id===location.hash)?.id) || "yaris";
    carSel.innerHTML = cars.map(c=>`<option value="${c.id}">${c.n} · ${t.from} €${c.low}${t.perDay}</option>`).join(""); carSel.value = keep;
    const w = $("f-where").value || "lca";
    $("f-where").innerHTML = places.map(p=>`<option value="${p.id}">${p.n[lang]} · ${p.fee?"€"+p.fee:t.free}</option>`).join(""); $("f-where").value = w;
    const on = Object.fromEntries([...document.querySelectorAll("#extras input")].map(i=>[i.value,i.checked]));
    $("extras").innerHTML = extras.map(e=>`<label><input type="checkbox" id="x-${e.id}" value="${e.id}" ${(e.id in on?on[e.id]:e.on)?"checked":""}><span>${e.n[lang]}</span><small>€${e.day}${t.perDay}</small></label>`).join("");
    quote();
  },
  policies(){}, contact(){}
};

function quote(){
  const t = T[lang];
  const from = new Date($("f-from").value), to = new Date($("f-to").value);
  let days = Math.round((to-from)/864e5); if(!(days>0)) days = 1;
  const car = cars.find(c=>c.id===$("f-car").value), pl = places.find(p=>p.id===$("f-where").value);
  const high = isHigh(from), rate = high ? car.high : car.low;
  const ex = extras.filter(e=>$("x-"+e.id)?.checked);
  const rental = rate*days, total = rental + ex.reduce((s,e)=>s+e.day*days,0) + pl.fee;
  $("receipt").innerHTML = `<h3>${t.rH}</h3><p class="car-name">${car.n} · ${days} ${t.days}</p><span class="season">${high?t.highS:t.lowS}: €${rate}${t.perDay}</span>
    <dl><dt>${t.rental} (${days} × €${rate})</dt><dd>€${rental}</dd>${ex.map(e=>`<dt>${e.n[lang]}</dt><dd>€${e.day*days}</dd>`).join("")}<dt>${t.delivery}</dt><dd>${pl.fee?"€"+pl.fee:t.free}</dd></dl>
    <div class="total"><span>${t.total}</span><b>€${total}</b></div><p class="dep">${t.dep}</p>
    <a class="btn btn-wa" target="_blank" rel="noopener" href="${wa([t.msg,`• ${car.n}`,`• ${t.mDates}: ${$("f-from").value} → ${$("f-to").value} (${days} ${t.days})`,`• ${t.mPlace}: ${pl.n[lang]}`,ex.length?`• ${t.mExtras}: ${ex.map(e=>e.n[lang]).join(", ")}`:"",`• ${t.mName}: ${$("f-name").value}`,$("f-flight").value?`• ${t.mFlight}: ${$("f-flight").value}`:"",`• ${t.mTotal}: €${total}`].filter(Boolean).join("\n"))}">${t.send}</a>`;
}

function setLang(l){
  lang = l; document.documentElement.lang = l;
  try { localStorage.setItem("kyma-lang", l); } catch(e) {}
  const t = T[l];
  pages[page](t);
  document.querySelectorAll("[data-i18n]").forEach(el=>{ const v=t[el.dataset.i18n]; if(v==null) return; /<[a-z]/i.test(v) ? el.innerHTML=v : el.textContent=v; });
  document.querySelectorAll(".langs button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===l));
  $("fab").href = wa(t.msg);
}

chrome();
if (page === "booking"){
  const d1=new Date(); d1.setDate(d1.getDate()+7); const d2=new Date(d1); d2.setDate(d2.getDate()+5);
  $("f-from").value=iso(d1); $("f-to").value=iso(d2); $("f-from").min=iso(new Date());
  $("qform").addEventListener("input",()=>{ if($("f-to").value<=$("f-from").value){const n=new Date($("f-from").value);n.setDate(n.getDate()+1);$("f-to").value=iso(n)} quote(); });
  $("qform").addEventListener("submit",e=>e.preventDefault());
  addEventListener("hashchange",()=>{ const c=cars.find(c=>"#"+c.id===location.hash); if(c){$("f-car").value=c.id;quote()} });
}
if (page === "contact"){
  $("copy").onclick = () => {
    const done = () => { $("copy").textContent=T[lang].copied; setTimeout(()=>$("copy").textContent=T[lang].copy,1500); };
    try { navigator.clipboard.writeText(PHONE).then(done).catch(()=>getSelection().selectAllChildren($("phone"))); } catch(e){ getSelection().selectAllChildren($("phone")); }
  };
}
setLang(lang);
