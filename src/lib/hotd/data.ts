// House of the Dragon — companion data (Season 1).
//
// Everything here is modeled *by episode* so the UI can stay spoiler-safe:
// pick how far you've watched and the dashboard only reveals what has
// happened up to and including that episode. Facts (deaths, dragon claims,
// allegiance reveals) each carry the episode number where they become known.

export type Team = "black" | "green" | "neutral";

export const TEAMS: Record<Team, { label: string; dot: string; ring: string; text: string }> = {
  black: {
    label: "Team Black",
    dot: "bg-neutral-900",
    ring: "ring-neutral-700",
    text: "text-neutral-200",
  },
  green: {
    label: "Team Green",
    dot: "bg-emerald-600",
    ring: "ring-emerald-700",
    text: "text-emerald-300",
  },
  neutral: {
    label: "Unaligned",
    dot: "bg-amber-500",
    ring: "ring-amber-700",
    text: "text-amber-300",
  },
};

export const SEASON = 1;
export const EPISODE_COUNT = 10;

export const EPISODE_TITLES: string[] = [
  "The Heirs of the Dragon", // 1
  "The Rogue Prince", // 2
  "Second of His Name", // 3
  "King of the Narrow Sea", // 4
  "We Light the Way", // 5
  "The Princess and the Queen", // 6
  "Driftmark", // 7
  "The Lord of the Tides", // 8
  "The Green Council", // 9
  "The Black Queen", // 10
];

export interface ArcBeat {
  episode: number;
  note: string;
}

export interface Relationship {
  label: string; // e.g. "Daughter of"
  toId: string; // character id
  // Episode from which this relationship is on-screen. Marriages, births and
  // deaths are spoilers before they happen, so gate them. Defaults to 1.
  fromEpisode?: number;
}

export interface Character {
  id: string;
  name: string;
  house: string;
  team: Team;
  // The episode at which this character's allegiance is meaningfully settled.
  // Before this, their card shows as "Unaligned" to stay spoiler-safe.
  allegianceKnownFrom: number;
  claim: string;
  goal: string;
  dragonId?: string;
  relationships: Relationship[];
  // Arc beats, gated by episode. The latest beat <= watched episode is the
  // character's "last seen" status.
  arc: ArcBeat[];
  deathEpisode?: number;
  deathNote?: string;
  // Initials used for the portrait chip.
  initials: string;
}

export interface Dragon {
  id: string;
  name: string;
  // Rider history — the latest entry whose `fromEpisode` <= watched episode
  // is the current rider. `riderId: null` means riderless.
  riderHistory: { fromEpisode: number; riderId: string | null; note?: string }[];
  deathEpisode?: number;
  deathNote?: string;
  notes?: string;
}

export interface Rivalry {
  fromId: string;
  toId: string;
  label: string; // e.g. "killed", "wants revenge on", "distrusts"
  kind: "hostile" | "ally";
  knownFrom: number; // episode the relationship becomes true / visible
}

export interface EpisodeNote {
  episode: number;
  whatChanged: string[];
  deaths: { name: string; how: string }[];
  whyItMatters: string;
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export const CHARACTERS: Character[] = [
  {
    id: "viserys",
    name: "Viserys I Targaryen",
    house: "Targaryen",
    team: "black",
    allegianceKnownFrom: 1,
    claim: "The reigning King of the Seven Kingdoms",
    goal: "Keep the realm at peace and secure his succession",
    relationships: [
      { label: "Father of", toId: "rhaenyra" },
      { label: "Brother of", toId: "daemon" },
      { label: "Husband of", toId: "alicent", fromEpisode: 2 },
    ],
    arc: [
      { episode: 1, note: "Names Rhaenyra his heir after losing his wife and son in childbirth." },
      { episode: 2, note: "Weds Alicent Hightower, straining his bond with Rhaenyra." },
      { episode: 5, note: "Collapses at Rhaenyra's wedding; his health is failing." },
      { episode: 8, note: "Rallies one last time to defend Rhaenyra's claim before the court." },
    ],
    deathEpisode: 8,
    deathNote: "Dies in his sleep — his final murmur is fatally misheard by Alicent as support for Aegon.",
    initials: "V",
  },
  {
    id: "rhaenyra",
    name: "Rhaenyra Targaryen",
    house: "Targaryen",
    team: "black",
    allegianceKnownFrom: 1,
    claim: "Named heir to the Iron Throne by King Viserys",
    goal: "Claim the throne that is rightfully hers",
    dragonId: "syrax",
    relationships: [
      { label: "Daughter of", toId: "viserys" },
      { label: "Wife of", toId: "daemon", fromEpisode: 7 },
      { label: "Half-sister of", toId: "aegon", fromEpisode: 3 },
      { label: "Mother of", toId: "jacaerys", fromEpisode: 6 },
    ],
    arc: [
      { episode: 1, note: "Named Princess of Dragonstone and heir to the Iron Throne." },
      { episode: 5, note: "Weds Laenor Velaryon in a political match." },
      { episode: 7, note: "Marries Daemon Targaryen after Laena's death." },
      { episode: 8, note: "Reconciles briefly with Alicent at Viserys's last supper." },
      { episode: 10, note: "Crowned Queen at Dragonstone — then learns her son Lucerys is dead." },
    ],
    initials: "R",
  },
  {
    id: "daemon",
    name: "Daemon Targaryen",
    house: "Targaryen",
    team: "black",
    allegianceKnownFrom: 1,
    claim: "The King's younger brother; once heir presumptive",
    goal: "Power, war, and a throne for Rhaenyra (and himself)",
    dragonId: "caraxes",
    relationships: [
      { label: "Brother of", toId: "viserys" },
      { label: "Husband of", toId: "rhaenyra", fromEpisode: 7 },
      { label: "Widower of", toId: "laena", fromEpisode: 7 },
    ],
    arc: [
      { episode: 1, note: "Commands the City Watch; clashes with the Hand, Otto Hightower." },
      { episode: 3, note: "Wins the war for the Stepstones and is hailed as 'King of the Narrow Sea'." },
      { episode: 7, note: "Weds Rhaenyra after his wife Laena's death." },
      { episode: 10, note: "Chokes Rhaenyra in rage over strategy as war looms." },
    ],
    initials: "D",
  },
  {
    id: "alicent",
    name: "Alicent Hightower",
    house: "Hightower",
    team: "green",
    allegianceKnownFrom: 5,
    claim: "Queen consort; mother of the King's sons",
    goal: "Protect her children and put Aegon on the throne",
    relationships: [
      { label: "Wife of", toId: "viserys", fromEpisode: 2 },
      { label: "Daughter of", toId: "otto" },
      { label: "Mother of", toId: "aegon", fromEpisode: 3 },
    ],
    arc: [
      { episode: 1, note: "Otto Hightower's daughter and Rhaenyra's closest companion at court." },
      { episode: 2, note: "Befriends the grieving King and becomes his second wife." },
      { episode: 5, note: "Arrives late to the wedding in her father's green — a public break with Rhaenyra." },
      { episode: 7, note: "Demands an eye for Aemond's; lunges at Rhaenyra with a blade." },
      { episode: 8, note: "Mishears Viserys's dying words as naming Aegon king." },
      { episode: 9, note: "Drives the Green Council to crown Aegon II." },
    ],
    initials: "A",
  },
  {
    id: "aegon",
    name: "Aegon II Targaryen",
    house: "Targaryen",
    team: "green",
    allegianceKnownFrom: 9,
    claim: "Eldest son of Viserys; crowned by the Greens",
    goal: "Wear the crown he is handed (reluctantly at first)",
    dragonId: "sunfyre",
    relationships: [
      { label: "Son of", toId: "viserys" },
      { label: "Son of", toId: "alicent" },
      { label: "Half-brother of", toId: "rhaenyra" },
    ],
    arc: [
      { episode: 6, note: "A dissolute young prince, largely ignored by his father." },
      { episode: 9, note: "Found hiding in the city, then crowned Aegon II before the realm." },
    ],
    initials: "Ae",
  },
  {
    id: "helaena",
    name: "Helaena Targaryen",
    house: "Targaryen",
    team: "green",
    allegianceKnownFrom: 6,
    claim: "Daughter of Viserys and Alicent",
    goal: "Simply to be left in peace with her studies and children",
    dragonId: "dreamfyre",
    relationships: [
      { label: "Daughter of", toId: "alicent" },
      { label: "Sister-wife of", toId: "aegon" },
      { label: "Sister of", toId: "aemond" },
    ],
    arc: [
      { episode: 6, note: "A quiet, prophetic child fascinated by insects." },
      { episode: 8, note: "Now wed to her brother Aegon, with children of her own." },
    ],
    initials: "H",
  },
  {
    id: "aemond",
    name: "Aemond Targaryen",
    house: "Targaryen",
    team: "green",
    allegianceKnownFrom: 7,
    claim: "Second son of Viserys and Alicent",
    goal: "Respect, a dragon of his own, and vengeance for his eye",
    dragonId: "vhagar",
    relationships: [
      { label: "Son of", toId: "alicent" },
      { label: "Brother of", toId: "aegon" },
      { label: "Nephew-rival of", toId: "lucerys" },
    ],
    arc: [
      { episode: 6, note: "Mocked as the only dragonless child of his generation." },
      { episode: 7, note: "Claims Vhagar, the largest living dragon; loses an eye to Lucerys in the ensuing fight." },
      { episode: 10, note: "Loses control of Vhagar over Storm's End and kills Lucerys — the first blood of the war." },
    ],
    initials: "Am",
  },
  {
    id: "daeron",
    name: "Daeron Targaryen",
    house: "Targaryen",
    team: "green",
    allegianceKnownFrom: 6,
    claim: "Youngest son of Viserys and Alicent",
    goal: "Being fostered in Oldtown; unseen but loyal to the Greens",
    dragonId: "tessarion",
    relationships: [
      { label: "Son of", toId: "alicent" },
      { label: "Brother of", toId: "aegon" },
    ],
    arc: [
      { episode: 6, note: "Mentioned as squiring in Oldtown; rides the dragon Tessarion." },
    ],
    initials: "Da",
  },
  {
    id: "otto",
    name: "Otto Hightower",
    house: "Hightower",
    team: "green",
    allegianceKnownFrom: 1,
    claim: "Hand of the King (twice over)",
    goal: "Advance House Hightower by putting his grandson on the throne",
    relationships: [
      { label: "Father of", toId: "alicent" },
      { label: "Grandfather of", toId: "aegon", fromEpisode: 3 },
    ],
    arc: [
      { episode: 1, note: "Serves as Hand and steers his daughter toward the widowed King." },
      { episode: 4, note: "Dismissed as Hand after warning Viserys about Rhaenyra." },
      { episode: 8, note: "Reinstated as Hand as Viserys weakens." },
      { episode: 9, note: "Orchestrates the Green Council and Aegon's coronation." },
    ],
    initials: "O",
  },
  {
    id: "criston",
    name: "Ser Criston Cole",
    house: "Cole",
    team: "green",
    allegianceKnownFrom: 5,
    claim: "Lord Commander of the Kingsguard",
    goal: "Loyalty to the Greens after his fall from Rhaenyra's favor",
    relationships: [
      { label: "Sworn sword of", toId: "alicent" },
      { label: "Former favorite of", toId: "rhaenyra" },
    ],
    arc: [
      { episode: 3, note: "Named to the Kingsguard; grows close to Rhaenyra." },
      { episode: 5, note: "Beats Joffrey Lonmouth to death at the royal wedding, then turns to Alicent." },
      { episode: 9, note: "Becomes the Greens' sworn protector as Aegon is crowned." },
    ],
    initials: "C",
  },
  {
    id: "rhaenys",
    name: "Rhaenys Targaryen",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 8,
    claim: "'The Queen Who Never Was' — passed over for the throne",
    goal: "Guard her family's interests; wary of both factions",
    dragonId: "meleys",
    relationships: [
      { label: "Wife of", toId: "corlys" },
      { label: "Mother of", toId: "laena" },
      { label: "Grandmother of", toId: "jacaerys", fromEpisode: 6 },
    ],
    arc: [
      { episode: 1, note: "Passed over at the Great Council despite the senior claim." },
      { episode: 9, note: "Escapes captivity and bursts into Aegon's coronation on Meleys — but stays her hand." },
    ],
    initials: "Rs",
  },
  {
    id: "corlys",
    name: "Corlys Velaryon",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 8,
    claim: "'The Sea Snake' — Lord of the Tides, richest man in the realm",
    goal: "Secure a Velaryon on the Iron Throne through his grandsons",
    relationships: [
      { label: "Husband of", toId: "rhaenys" },
      { label: "Father of", toId: "laenor" },
      { label: "Grandfather of", toId: "jacaerys", fromEpisode: 6 },
    ],
    arc: [
      { episode: 2, note: "Snubbed at court, he pushes for a marriage alliance with the crown." },
      { episode: 8, note: "Recovers from war wounds and reaffirms Rhaenyra's claim at Driftmark." },
    ],
    initials: "Co",
  },
  {
    id: "laenor",
    name: "Laenor Velaryon",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 5,
    claim: "First husband of Rhaenyra; heir to Driftmark",
    goal: "Escape a life he never chose",
    dragonId: "seasmoke",
    relationships: [
      { label: "Son of", toId: "corlys" },
      { label: "First husband of", toId: "rhaenyra" },
      { label: "Brother of", toId: "laena" },
    ],
    arc: [
      { episode: 5, note: "Weds Rhaenyra though both love others." },
      { episode: 7, note: "His death is faked so he can slip away across the sea, free at last." },
    ],
    initials: "L",
  },
  {
    id: "laena",
    name: "Laena Velaryon",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 6,
    claim: "Rider of Vhagar; wife of Daemon",
    goal: "A dragonrider's death rather than a sickbed",
    dragonId: "vhagar",
    relationships: [
      { label: "Daughter of", toId: "corlys" },
      { label: "Wife of", toId: "daemon" },
      { label: "Sister of", toId: "laenor" },
    ],
    arc: [
      { episode: 6, note: "Living in Pentos with Daemon and their daughters." },
    ],
    deathEpisode: 7,
    deathNote: "Dying in a failed childbirth, she commands Vhagar to burn her rather than linger.",
    initials: "Ln",
  },
  {
    id: "jacaerys",
    name: "Jacaerys Velaryon",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 6,
    claim: "Rhaenyra's eldest son; heir to Dragonstone",
    goal: "Prove himself a worthy heir to his mother",
    dragonId: "vermax",
    relationships: [
      { label: "Son of", toId: "rhaenyra" },
      { label: "Brother of", toId: "lucerys" },
    ],
    arc: [
      { episode: 6, note: "Bright and dutiful, though whispers question his parentage." },
      { episode: 10, note: "Flies to the Eyrie and Winterfell to rally the North to his mother's cause." },
    ],
    initials: "J",
  },
  {
    id: "lucerys",
    name: "Lucerys Velaryon",
    house: "Velaryon",
    team: "black",
    allegianceKnownFrom: 6,
    claim: "Rhaenyra's second son; heir to Driftmark",
    goal: "Live up to a claim heavier than he is ready for",
    dragonId: "arrax",
    relationships: [
      { label: "Son of", toId: "rhaenyra" },
      { label: "Brother of", toId: "jacaerys" },
    ],
    arc: [
      { episode: 7, note: "Slashes out Aemond's eye to protect his brother during a childhood brawl." },
      { episode: 10, note: "Sent to Storm's End as an envoy — and never returns." },
    ],
    deathEpisode: 10,
    deathNote: "His young dragon Arrax is caught and devoured by Vhagar over Storm's End; the act ignites the war.",
    initials: "Lu",
  },
  {
    id: "harwin",
    name: "Ser Harwin Strong",
    house: "Strong",
    team: "black",
    allegianceKnownFrom: 6,
    claim: "'Breakbones' — the strongest man in the Seven Kingdoms",
    goal: "Quietly protect Rhaenyra and the children he cannot claim",
    relationships: [
      { label: "Protector of", toId: "rhaenyra" },
      { label: "Son of", toId: "larys" },
    ],
    arc: [
      { episode: 6, note: "Rumored to be the true father of Rhaenyra's three eldest boys." },
    ],
    deathEpisode: 6,
    deathNote: "Burns to death at Harrenhal in a fire set on the orders of his own brother, Larys.",
    initials: "Hw",
  },
  {
    id: "larys",
    name: "Larys Strong",
    house: "Strong",
    team: "green",
    allegianceKnownFrom: 6,
    claim: "'The Clubfoot' — a master of secrets",
    goal: "Trade whispers and murder for Alicent's favor",
    relationships: [
      { label: "Confidant of", toId: "alicent" },
      { label: "Brother of", toId: "harwin" },
    ],
    arc: [
      { episode: 6, note: "Has Harrenhal — and his own father and brother — burned to win Alicent's trust." },
      { episode: 9, note: "Slips Alicent's family out of the Red Keep during the Green Council." },
    ],
    initials: "Ly",
  },
  {
    id: "mysaria",
    name: "Mysaria",
    house: "—",
    team: "black",
    allegianceKnownFrom: 9,
    claim: "'The White Worm' — mistress of the city's whispers",
    goal: "Survive, and turn secrets into leverage",
    relationships: [
      { label: "Former lover of", toId: "daemon" },
    ],
    arc: [
      { episode: 1, note: "Daemon's confidante and lover in the streets of King's Landing." },
      { episode: 9, note: "Now commands a spy network beneath the capital." },
    ],
    initials: "M",
  },
];

// ---------------------------------------------------------------------------
// Dragons
// ---------------------------------------------------------------------------

export const DRAGONS: Dragon[] = [
  {
    id: "vhagar",
    name: "Vhagar",
    riderHistory: [
      { fromEpisode: 1, riderId: "laena", note: "The largest and oldest living dragon." },
      { fromEpisode: 7, riderId: null, note: "Riderless after Laena's death." },
      { fromEpisode: 7, riderId: "aemond", note: "Claimed by Aemond at Driftmark." },
    ],
    notes: "A veteran of Aegon's Conquest — a living siege engine.",
  },
  {
    id: "syrax",
    name: "Syrax",
    riderHistory: [{ fromEpisode: 1, riderId: "rhaenyra" }],
    notes: "Rhaenyra's she-dragon, kept close to Dragonstone.",
  },
  {
    id: "caraxes",
    name: "Caraxes",
    riderHistory: [{ fromEpisode: 1, riderId: "daemon" }],
    notes: "'The Blood Wyrm' — lean, red, and battle-hardened.",
  },
  {
    id: "meleys",
    name: "Meleys",
    riderHistory: [{ fromEpisode: 1, riderId: "rhaenys" }],
    notes: "'The Red Queen' — famously fast.",
  },
  {
    id: "sunfyre",
    name: "Sunfyre",
    riderHistory: [{ fromEpisode: 9, riderId: "aegon", note: "'Sunfyre the Golden'." }],
    notes: "Said to be the most beautiful dragon in the world.",
  },
  {
    id: "seasmoke",
    name: "Seasmoke",
    riderHistory: [{ fromEpisode: 1, riderId: "laenor" }],
    notes: "A silver-grey dragon; riderless after Laenor departs.",
  },
  {
    id: "dreamfyre",
    name: "Dreamfyre",
    riderHistory: [{ fromEpisode: 6, riderId: "helaena" }],
    notes: "An old she-dragon bonded to Helaena.",
  },
  {
    id: "vermax",
    name: "Vermax",
    riderHistory: [{ fromEpisode: 6, riderId: "jacaerys" }],
    notes: "Jacaerys's young dragon.",
  },
  {
    id: "arrax",
    name: "Arrax",
    riderHistory: [{ fromEpisode: 6, riderId: "lucerys" }],
    deathEpisode: 10,
    deathNote: "Killed by Vhagar over Storm's End, along with his rider.",
    notes: "Lucerys's small, young dragon.",
  },
  {
    id: "tessarion",
    name: "Tessarion",
    riderHistory: [{ fromEpisode: 6, riderId: "daeron" }],
    notes: "'The Blue Queen' — Daeron's dragon in Oldtown.",
  },
];

// ---------------------------------------------------------------------------
// Rivalries & alliances ("who hates whom")
// ---------------------------------------------------------------------------

export const RIVALRIES: Rivalry[] = [
  { fromId: "aemond", toId: "lucerys", label: "killed", kind: "hostile", knownFrom: 10 },
  { fromId: "daemon", toId: "aemond", label: "will hunt", kind: "hostile", knownFrom: 10 },
  { fromId: "rhaenyra", toId: "aemond", label: "demands justice from", kind: "hostile", knownFrom: 10 },
  { fromId: "alicent", toId: "rhaenyra", label: "distrusts", kind: "hostile", knownFrom: 5 },
  { fromId: "otto", toId: "rhaenyra", label: "schemes against", kind: "hostile", knownFrom: 1 },
  { fromId: "criston", toId: "rhaenyra", label: "resents", kind: "hostile", knownFrom: 5 },
  { fromId: "larys", toId: "harwin", label: "murdered", kind: "hostile", knownFrom: 6 },
  { fromId: "corlys", toId: "rhaenyra", label: "supports", kind: "ally", knownFrom: 8 },
  { fromId: "rhaenys", toId: "rhaenyra", label: "backs", kind: "ally", knownFrom: 9 },
  { fromId: "daemon", toId: "rhaenyra", label: "fights for", kind: "ally", knownFrom: 7 },
  { fromId: "alicent", toId: "aegon", label: "crowns", kind: "ally", knownFrom: 9 },
  { fromId: "criston", toId: "alicent", label: "serves", kind: "ally", knownFrom: 5 },
];

// ---------------------------------------------------------------------------
// Episode cliff notes
// ---------------------------------------------------------------------------

export const EPISODE_NOTES: EpisodeNote[] = [
  {
    episode: 1,
    whatChanged: [
      "A Great Council and then King Viserys name Rhaenyra heir to the Iron Throne.",
      "Daemon, the King's brother, is passed over and clashes with Hand Otto Hightower.",
    ],
    deaths: [
      { name: "Queen Aemma", how: "Dies during a brutal childbirth ordered by Viserys." },
      { name: "Prince Baelon", how: "The newborn son dies within a day." },
    ],
    whyItMatters: "For the first time a woman is named heir to the throne — the fault line the whole war will crack along.",
  },
  {
    episode: 2,
    whatChanged: [
      "Daemon seizes a dragon egg and the island of Dragonstone before backing down.",
      "Viserys chooses to wed Alicent Hightower, blindsiding the Velaryons.",
    ],
    deaths: [],
    whyItMatters: "The King's new marriage plants the seed of the Greens and snubs House Velaryon.",
  },
  {
    episode: 3,
    whatChanged: [
      "At Aegon's second-birthday hunt, Viserys is pressed to disinherit Rhaenyra but refuses.",
      "Daemon and Corlys win the war for the Stepstones.",
    ],
    deaths: [{ name: "Prince Aegon's boar hunt", how: "No major deaths — but the court openly doubts a female heir." }],
    whyItMatters: "Viserys reaffirms Rhaenyra even as the realm quietly lines up behind her half-brother.",
  },
  {
    episode: 4,
    whatChanged: [
      "Daemon returns and shows Rhaenyra the city; the two grow dangerously close.",
      "Otto is dismissed as Hand after reporting on Rhaenyra's night out.",
    ],
    deaths: [],
    whyItMatters: "Rhaenyra's reputation becomes a weapon the Greens will use for years.",
  },
  {
    episode: 5,
    whatChanged: [
      "Rhaenyra weds Laenor Velaryon to shore up her claim.",
      "Alicent arrives at the wedding in Hightower green — a public declaration of war by other means.",
    ],
    deaths: [{ name: "Ser Joffrey Lonmouth", how: "Beaten to death by Criston Cole at the wedding feast." }],
    whyItMatters: "The lines harden: Criston turns to the Greens, and Alicent stops pretending at peace.",
  },
  {
    episode: 6,
    whatChanged: [
      "A ten-year jump: Rhaenyra and Alicent now command rival broods of children.",
      "Whispers about the parentage of Rhaenyra's sons reach the King's court.",
    ],
    deaths: [{ name: "Ser Harwin Strong", how: "Burned alive at Harrenhal in a fire set by his brother Larys." }],
    whyItMatters: "Larys becomes Alicent's secret knife, and the succession question grows teeth.",
  },
  {
    episode: 7,
    whatChanged: [
      "At Laena's funeral on Driftmark, Aemond claims the great dragon Vhagar.",
      "A childhood brawl costs Aemond an eye; Rhaenyra and Daemon marry soon after.",
    ],
    deaths: [
      { name: "Laena Velaryon", how: "Commands Vhagar to burn her rather than die in childbirth." },
      { name: "Laenor Velaryon (faked)", how: "His death is staged so he can flee across the sea." },
    ],
    whyItMatters: "Vhagar — the war's deadliest weapon — falls into Green hands, and the two camps come to blows.",
  },
  {
    episode: 8,
    whatChanged: [
      "A frail Viserys drags himself to the throne one last time to defend Rhaenyra's claim.",
      "At a final family supper the two sides almost reconcile.",
    ],
    deaths: [{ name: "King Viserys I", how: "Dies in his sleep; his last words are fatally misheard by Alicent." }],
    whyItMatters: "The one man holding the peace together is gone — and both sides think the throne is theirs.",
  },
  {
    episode: 9,
    whatChanged: [
      "The Greens move first: Otto and Alicent convene a secret council and crown Aegon II.",
      "Rhaenys escapes and crashes the coronation on Meleys but spares the crowd.",
    ],
    deaths: [{ name: "Lord Beesbury", how: "Killed at the council table for objecting to the coup." }],
    whyItMatters: "A usurpation is now fact — there are two monarchs, and only one throne.",
  },
  {
    episode: 10,
    whatChanged: [
      "Rhaenyra learns of her father's death and Aegon's coronation; she is crowned at Dragonstone.",
      "Envoys are sent to win allies; Lucerys flies to Storm's End and meets Aemond on Vhagar.",
    ],
    deaths: [
      { name: "Prince Lucerys Velaryon", how: "Killed with his dragon Arrax over Storm's End by Vhagar." },
    ],
    whyItMatters: "The first dragon-blood is spilled. There is no going back — the Dance of the Dragons has begun.",
  },
];

// ---------------------------------------------------------------------------
// Family tree structure (a simple nested model the UI can render)
// ---------------------------------------------------------------------------

export interface TreeNode {
  id: string; // character id
  spouseId?: string;
  // Episode from which the spouse pairing is on-screen (marriages are
  // spoilers before they happen). Defaults to episode 1 if omitted.
  spouseFromEpisode?: number;
  children?: TreeNode[];
}

// Mirrors the "CliffsNotes" layout: King Viserys at the root, then two
// branches — Rhaenyra's line (Team Black) and Alicent's line (Team Green).
// Alicent is modeled as her own branch rather than Viserys's displayed
// consort, so the tree never implies she mothered Rhaenyra.
export const FAMILY_TREE: TreeNode = {
  id: "viserys",
  children: [
    {
      id: "rhaenyra",
      spouseId: "daemon",
      spouseFromEpisode: 7, // they wed in "Driftmark"
      children: [{ id: "jacaerys" }, { id: "lucerys" }],
    },
    {
      id: "alicent",
      children: [
        { id: "aegon" },
        { id: "helaena" },
        { id: "aemond" },
        { id: "daeron" },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lookups & episode-aware helpers
// ---------------------------------------------------------------------------

export const charById = (id: string): Character | undefined =>
  CHARACTERS.find((c) => c.id === id);

export const dragonById = (id: string): Dragon | undefined =>
  DRAGONS.find((d) => d.id === id);

/** Whether a character is known to be dead as of the watched episode. */
export function isDead(c: Character, watched: number): boolean {
  return c.deathEpisode !== undefined && c.deathEpisode <= watched;
}

/**
 * A character's effective team as of the watched episode. Before their
 * allegiance is settled on-screen we show them as "Unaligned".
 */
export function effectiveTeam(c: Character, watched: number): Team {
  return watched >= c.allegianceKnownFrom ? c.team : "neutral";
}

/** Latest arc beat at or before the watched episode ("last seen"). */
export function lastSeen(c: Character, watched: number): ArcBeat | undefined {
  const beats = c.arc.filter((b) => b.episode <= watched);
  return beats.length ? beats[beats.length - 1] : undefined;
}

/** The dragon's current rider id as of the watched episode. */
export function currentRiderId(d: Dragon, watched: number): string | null {
  const entries = d.riderHistory.filter((r) => r.fromEpisode <= watched);
  return entries.length ? entries[entries.length - 1].riderId : null;
}

/** Whether a character has appeared by the watched episode. */
export function hasAppeared(c: Character, watched: number): boolean {
  const first = c.arc.length ? c.arc[0].episode : 1;
  return first <= watched;
}
