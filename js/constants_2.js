const MOOR_ROOMS
 = PLTABLE([BYTE], IN_GAS, MOOR2, MOOR3, MOOR4, MOOR5, MOOR6);

const CELLAR_ROOMS
 = PLTABLE([BYTE], AT_STACK, THRONE_ROOM, AT_BOTTOM, SKEL_ROOM
, MOSS_ROOM, WC1);

const TOWER1_ROOMS
 = PLTABLE([BYTE], LEVEL1A, LEVEL1B, LEVEL1C, LEVEL1D);

const TOWER2_ROOMS
 = PLTABLE([BYTE], LEVEL2A, LEVEL2B, LEVEL2C, LEVEL2D);

const TOWER3_ROOMS
 = PLTABLE([BYTE], LEVEL3A, LEVEL3B, LEVEL3C, LEVEL3D);

var PLAIN_ROOMS
 = () => PLTABLE([BYTE], PLAIN0, PLAIN1, PLAIN2, PLAIN3, PLAIN4, PLAIN5);

const INIT_STORM_TIMER = 4;

const MIZNIA_ROOMS = PLTABLE([BYTE], IN_PORT, IN_YARD, SW_MOOR);

const JUNGLE_ROOMS
 = PLTABLE([BYTE]
, JUN0, WORM_ROOM, JUN2, JUN3, JUN4, JUN5, JUN6);

const CAVE_ROOMS
 = PLTABLE([BYTE]
, CAVE0, CAVE1, CAVE2, CAVE3, CAVE4, CAVE6);

const GRUE_SIGHTS
 = LTABLE(2
, "You sense a presence lurking in the darkness"
, "A presence lurks in the darkness close at hand"
, "Something is lurking in the darkness nearby");

const MIRROR_LIFE = 36;

const GRUE_ROOMS
 = PLTABLE([BYTE]
, CAVE0, CAVE1, CAVE2, CAVE3, CAVE4
, CAVE6, CAVE7, SE_CAVE, NE_CAVE, IN_LAIR);

const FOREST_ROOMS
 = PLTABLE([BYTE]
, TWILIGHT, FOREST1, FOREST2, FOREST3
, FOREST4, FOREST5, FOREST6);

const RUIN_ROOMS
 = PLTABLE([BYTE], RUIN0, RUIN1, RUIN2, RUIN3, RUIN4, RUIN5);

const ACCARDI_ROOMS
 = PLTABLE([BYTE], IN_ACCARDI, AT_GATE, IN_HALL, IN_WEAPON);

const SHORE_ROOMS
 = PLTABLE([BYTE], AT_LEDGE, AT_BRINE, TOWER_BASE);

var WAND_LIST
 = LTABLE(0, WAND, STAFF, STAVE, STICK, ROD, CANE);

VOC("ANNIHILATION", NOUN);
VOC("SAYONARA", NOUN);
VOC("ANESTHESIA", NOUN);
VOC("EVERSION", NOUN);
VOC("LEVITATION", NOUN);

var WAND_FUNCTIONS
 = LTABLE(0
, [BLAST_WAND_F
, DESCRIBE_BLAST_WAND
, VOC("ANNIHILATION", ADJ)]
, [TELE_WAND_F
, DESCRIBE_TELE_WAND
, VOC("SAYONARA", ADJ)]
, [SLEEP_WAND_F
, DESCRIBE_SLEEP_WAND
, VOC("ANESTHESIA", ADJ)]
, [IO_WAND_F
, DESCRIBE_IO_WAND
, VOC("EVERSION", ADJ)]
, [LEV_WAND_F
, DESCRIBE_LEV_WAND
, VOC("LEVITATION", ADJ)]);

var POTION_LIST
 = LTABLE(0, APOTION, BPOTION, CPOTION, DPOTION, EPOTION);

VOC("ENLIGHTENMENT", NOUN);
VOC("HEALING", NOUN);
VOC("DEATH", NOUN);
VOC("MIGHT", NOUN);
VOC("FORGETFUL", NOUN);

var POTION_TABLES
 = LTABLE(0
, [IQ_POTION_F
, DESCRIBE_IQ_POTION
, VOC("ENLIGHTENMENT", ADJ)]
, [HEALING_POTION_F
, DESCRIBE_HEALING_POTION
, VOC("HEALING", ADJ)]
, [DEATH_POTION_F
, DESCRIBE_DEATH_POTION
, VOC("DEATH", ADJ)]
, [MIGHT_POTION_F
, DESCRIBE_MIGHT_POTION
, VOC("MIGHT", ADJ)]
, [FORGET_POTION_F
, DESCRIBE_FORGET_POTION
, VOC("FORGETFUL", ADJ)]);

const ALL_SCROLLS
 = PLTABLE(PARCHMENT, GILT, SMOOTH, RUMPLE, VELLUM
, PALIMP, RENEWAL);

var SCROLL_LIST
 = LTABLE(0, PARCHMENT, GILT, SMOOTH, RUMPLE, VELLUM);

VOC("MISCHIEF", NOUN);
VOC("HONING", NOUN);
VOC("PROTECTION", NOUN);
VOC("FIREWORKS", NOUN);
VOC("RECALL", NOUN);

var SCROLL_FUNCTIONS
 = LTABLE(0
, [DO_PARTAY
, DESCRIBE_DO_PARTAY
, VOC("MISCHIEF", ADJ)
, "yard improvements"
, 1
, 8]
, [DO_BLESS_WEAPON
, DESCRIBE_BLESS_WEAPON
, VOC("HONING", ADJ)
, "weaponry"
, 5
, 16]
, [DO_BLESS_ARMOR
, DESCRIBE_BLESS_ARMOR
, VOC("PROTECTION", ADJ)
, "armor"
, 5
, 16]
, [DO_FILFRE
, DESCRIBE_DO_FILFRE
, VOC("FIREWORKS", ADJ)
, "humility and self-effacement"
, 1
, 8]
, [DO_GOTO
, DESCRIBE_DO_GOTO
, VOC("RECALL", ADJ)
, "transportation"
, 5
, 24]);

const TELEROOMS
 = PLTABLE([BYTE]
, HILLTOP, AT_BROOK, IN_PORT, N_MOOR, XROADS, NFORD, SFORD
, NGURTH, IN_THRIFF);

const OVERS
 = LTABLE("Ruins", "Bridge", "Forest", "Town"
, "City", "Seashore", "Roadway"
, "Fields", "Village", "Castle", "Mist"
, "Jungle", "Seaport", "Mountainside");

const HIGHEST_ZBOT = 16384;

const ORUINS = 1;
const OBRIDGE = 2;
const OFOREST = 3;
const OACCARDI = 4;
const OCITY = 5;
const OSHORE = 6;
const OXROADS = 7;
const OPLAIN = 8;
const OGRUBBO = 9;
const OCAVES = 10;
const OMOOR = 11;
const OJUNGLE = 12;
const OMIZNIA = 13;
const OTHRIFF = 14;

const FLY_TABLES
 = PLTABLE(/*1*/[ (D_SE + D_SW)
, OACCARDI, OBRIDGE]
/*2*/, [ (D_NE + D_SE + D_SW)
, ORUINS, OSHORE, OFOREST]
/*3*/, [ (D_NE + D_E + D_S)
, OBRIDGE, OACCARDI, OCITY]
/*4*/, [ (D_S + D_SW + D_W + D_NW)
, OSHORE, OXROADS, OFOREST, ORUINS]
/*5*/, [ (D_N + D_E + D_SE + D_S)
, OFOREST, OSHORE, OPLAIN, OXROADS]
/*6*/, [ (D_N + D_S + D_SW + D_W + D_NW)
, OACCARDI, OGRUBBO, OPLAIN, OCITY, OBRIDGE]
/*7*/, [ (D_N + D_NE + D_E + D_SE + D_SW)
, OCITY, OACCARDI, OPLAIN, OMIZNIA, OCAVES]
/*8*/, [ (D_NE + D_E + D_SE + D_S + D_W + D_NW)
, OSHORE, OGRUBBO, OMOOR
, OMIZNIA, OXROADS, OCITY]
/*9*/, [ (D_N + D_S + D_SW + D_W)
, OSHORE, OMOOR, OJUNGLE, OPLAIN]
/*10*/, [ (D_NE + D_SE)
, OXROADS, OTHRIFF]
/*11*/, [ (D_N + D_SW + D_NW)
, OGRUBBO, OMIZNIA, OPLAIN]
/*12*/, [ (D_NE + D_E + D_SW)
, OGRUBBO, OMIZNIA, OTHRIFF]
/*13*/, [ (D_N + D_NE + D_W + D_NW)
, OPLAIN, OMOOR, OJUNGLE, OXROADS]
/*14*/, [ (D_NE + D_NW)
, OJUNGLE, OCAVES]
);

const PICT_LIST
 = [G_EYE, G_EAR, G_NOSE, G_MOUTH, G_HAND, G_CLOCK];

const GURDY_EFFECTS
 = ["wraith of colored light"
, "brief chord of music"
, "whiff of random odors"
, "puff of tasty flavors"
, "vague itchiness"
, "strange sense of urgency"];

const GURDY_PEEKS
 = ["eyes sting"
, "ears ring"
, "nose tickle"
, "mouth water"
, "skin crawl"
, "pulse race"];

const Q_BUZZES
 = PLTABLE(VOC("WHY", null), VOC("HOW", null)
, VOC("WHEN", null), VOC("WOULD", null)
, VOC("COULD", null), VOC("SHOULD", null)
, VOC("HAS", null), VOC("AM", null), VOC("IS", null)
, VOC("WAS", null));

const N_BUZZES
 = PLTABLE(VOC("ZERO", null), VOC("ONE", null), VOC("TWO", null)
, VOC("THREE", null), VOC("FOUR", null), VOC("FIVE", null)
, VOC("SIX", null), VOC("SEVEN", null), VOC("EIGHT", null)
, VOC("NINE", null), VOC("TEN", null));

const SWEAR_WORDS
 = PLTABLE(VOC("CURSE", null), VOC("GODDAMNED", null), VOC("CUSS", null)
, VOC("DAMN", null), VOC("FUCK", null)
, VOC("SHITHEAD", null), VOC("BASTARD", null), VOC("ASS", null)
, VOC("FUCKING", null), VOC("BITCH", null), VOC("DAMNED", null)
, VOC("COCKSUCKER", null), VOC("FUCKED", null), VOC("PEE", null)
, VOC("CUNT", null), VOC("ASSHOLE", null), VOC("PISS", null)
/*VOC("SUCK", null)*/, VOC("SHIT", null), VOC("CRAP", null));

const COLOR_WORDS
 = PLTABLE(VOC("MAUVE", null), VOC("LAVENDER", null), VOC("PUCE", null)
, VOC("RED", ADJ), VOC("SILVER", null)
, VOC("GOLD", null), VOC("ORANGE", ADJ), VOC("YELLOW", ADJ));

const NO_MIRROR = -1;

const PILLAR_DOINGS
 = LTABLE(2
, " wiggles its antennae"
, " looks up at you inquisitively"
, " arches its back");

const PILLAR_MOVES
 = LTABLE(2
, " silently explores "
, " crawls across "
, " wiggles its way around ");

const BFLY_EATINGS
 = LTABLE(2
, " explores the rim of the goblet"
, " slowly opens and closes its wings"
, " wiggles its antennae");

const BFLY_DOINGS
 = LTABLE(2
, " darts around your head"
, " lights on your nose, then flutters off"
, " lands on your hand, then darts away");

const BFLY_HOVERS
 = LTABLE(2
, " hovers around "
, " seems interested in "
, " is fluttering close to ");

const REACH_TABLES
 = [PLTABLE([BYTE], 1, 3)
, PLTABLE([BYTE], 0, 2, 3, 5)
, PLTABLE([BYTE], 1, 5)
, PLTABLE([BYTE], 0, 1, 6, 7)
, PLTABLE([BYTE], 0, 1, 2, 3, 5, 6, 7, 8)
, PLTABLE([BYTE], 1, 2, 7, 8)];

const MIRROR_LIST
 = PLTABLE(MIRROR0, MIRROR1, MIRROR2, MIRROR3, MIRROR4
, MIRROR5, MIRROR6);

const AMB = 255;

/*"Removed per TAA.  No longer used for direction lookup with mouse."*/
/*const COMPASS
 = [[BYTE]
, I_NW, I_NW, I_NW, I_NW, I_NW, I_NW, AMB, I_NORTH, I_NORTH, I_NORTH, I_NORTH, I_NORTH, AMB, I_NE, I_NE, I_NE, I_NE, I_NE
, AMB, AMB, I_NW, I_NW, I_NW, I_NW, I_NW, AMB, I_NORTH, I_NORTH, I_NORTH, AMB, I_NE, I_NE, I_NE, I_NE, I_NE, AMB
, AMB, AMB, AMB, AMB, AMB, I_NW, I_NW, I_NW, I_NORTH, I_NORTH, I_NORTH, I_NE, I_NE, I_NE, AMB, AMB, AMB, AMB
, I_WEST, I_WEST, I_WEST, I_WEST, AMB, AMB, I_NW, I_NW, AMB, I_NORTH, AMB, I_NE, I_NE, AMB, AMB, I_EAST, I_EAST, I_EAST
, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, AMB, I_NW, I_NORTH, I_NE, AMB, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST
, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, AMB, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST
, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, I_WEST, AMB, I_SW, I_SOUTH, I_SE, AMB, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST, I_EAST
, I_WEST, I_WEST, I_WEST, I_WEST, AMB, AMB, I_SW, I_SW, AMB, I_SOUTH, AMB, I_SE, I_SE, AMB, AMB, I_EAST, I_EAST, I_EAST
, AMB, AMB, AMB, AMB, AMB, I_SW, I_SW, I_SW, I_SOUTH, I_SOUTH, I_SOUTH, I_SE, I_SE, I_SE, AMB, AMB, AMB, AMB
, AMB, AMB, I_SW, I_SW, I_SW, I_SW, I_SW, AMB, I_SOUTH, I_SOUTH, I_SOUTH, AMB, I_SE, I_SE, I_SE, I_SE, I_SE, AMB
, I_SW, I_SW, I_SW, I_SW, I_SW, I_SW, AMB, I_SOUTH, I_SOUTH, I_SOUTH, I_SOUTH, I_SOUTH, AMB, I_SE, I_SE, I_SE, I_SE, I_SE
, I_SW, I_SW, I_SW, I_SW, I_SW, AMB, AMB, I_SOUTH, I_SOUTH, I_SOUTH, I_SOUTH, I_SOUTH, AMB, AMB, I_SE, I_SE, I_SE, I_SE];*/


/*const DORN_SOUNDS
 = LTABLE(2
, "Far overhead, you hear something bellow \"Hurumph!\""
, "\"Hurumph!\" bellows a distant voice."
, "A loud \"Hurumph!\" echoes in the lighthouse.");*/

/*const CLOSE_DORNS
 = LTABLE(2
, "Close at hand, you hear something bellow \"Hurumph!\""
, "\"Hurumph!\" bellows a nearby voice."
, "A loud \"Hurumph!\" echoes in the lighthouse.");*/

const TREE_DOINGS
 = LTABLE(2
, " whisper among themselves"
, " shuffle around uncertainly"
, " seem to be regrouping");

const SAD_TREES
 = LTABLE(2
, " shuffle around disconsolately"
, " sing carols of mourning"
, " shake their ornaments with frustration");

const HUNTER_DOINGS
 = LTABLE(2
, " skulk about the pasture's edge"
, " shout something incoherent"
, " call out to one another");

const MINX_DOINGS
 = LTABLE(2
, " rubs up against your leg"
, " mews sweetly"
, " plays at your feet"
, " looks up at you and mews");

const DARK_MINXES
 = LTABLE(2
, " rubs up against your leg"
, " is moving about your feet"
, " purrs in the darkness");

const MINX_SETTLES
 = LTABLE(2
, " settles comfortably"
, " purrs and nudges about"
, " squirms around");

const MINX_RESTLESS
 = LTABLE(2
, " is acting a bit restless"
, " shifts its position in your arms"
, " fidgets about uncomfortably");

const MINX_SLEEPS
 = LTABLE(2
, " snores gently"
, " fidgets in its sleep"
, " yawns without waking up");

const MINX_NERVES
 = LTABLE(2
, " fidgets nervously"
, " whimpers with fear"
, " mews anxiously");

const ARCH_SNIFFS
 = LTABLE(2
, " sniffs the ground suspiciously"
, " whines anxiously, pawing at the ground"
, " is snuffling around underfoot");

const CORBIE_SOUNDS
 = LTABLE(2, "screech", "squawk", "croak");

const FEAR_CORBIES
 = LTABLE(2, "fear", "anxiety", "terror");

const MAD_CORBIES
 = LTABLE(2, "anger", "rage", "fury");

const SICK_DACT
 = LTABLE(2
, " snaps at you with its beak"
, " screeches pitifully"
, " flutters its good wing back and forth"
, " cries out with pain"
, " limps about in a helpless circle");

const HAPPY_DACT
 = LTABLE(2
, " scratches the ground with its claws"
, " emits a dry croak of contentment"
, " watches you with a sharp, beady eye"
, " screeches at the sky"
, " flutters about restlessly");

const DACT_WAITS
 = LTABLE(2
, " eyeing you expectantly"
, " sharpening its beak"
, " fluttering its wings");

const FLYING_DACT
 = LTABLE(2
, " peers at the ground below"
, " circles patiently"
, " beats its powerful wings"
, " turns to look at you");

const TORTURES
 = LTABLE(2
, "your mouth gags with the taste of orcish nightsoil"
, "the stench of burning fish cakes makes you stagger"
, "hundreds of imaginary spiders crawl across your skin"
, "a syrupy arrangement of \"Born in the GUE\" pounds in your ears"
, "the raw glare of a disco strobe sends you reeling");

const MAMA_CLIMBS
 = LTABLE(2
, " tries to climb higher, but can't quite manage it"
, " snorts at you angrily, trying to climb higher"
, " angrily paws the bottom of the maw");

const CLERIC_WOES
 = LTABLE(2
, "Woe! Woe is us"
, "Who will save us? O woe"
, "O woe is us, woe"
, "Will no one answer our prayers? Woe");

var MAGIC_WORDS
 = LTABLE(0
, [VOC("SMEE", NOUN), PLTABLE("Smee"), 0]
, [VOC("YABBA", NOUN), PLTABLE("Yabba"), 0]
, [VOC("BOK", NOUN), PLTABLE("Bok"), 0]
, [VOC("SQUIRP", NOUN), PLTABLE("Squirp"), 0]
, [VOC("STELLA", NOUN), PLTABLE("Stella"), 0]
, [VOC("BLARN", NOUN), PLTABLE("Blarn"), 0]
, [VOC("PROSSER", NOUN), PLTABLE("Prosser"), 0]
, [VOC("YQUEM", NOUN), PLTABLE("Yquem"), 0]
, [VOC("WATKIN", NOUN), PLTABLE("Watkin"), 0]
, [VOC("JUKES", NOUN), PLTABLE("Jukes"), 0]
, [VOC("MACUGA", NOUN), PLTABLE("Macuga"), 0]);

const SCARE_COLORS = LTABLE(0, "PUCE", "LAVENDER", "MAUVE");

const SHYNESS
 = LTABLE(2
, " hobbles out of your reach"
, " backs away from you"
, " won't let you near");

const CAROLS
 = LTABLE(2
, "Plover the River and Frotz the Woods"
, "Winter Bozbarland"
, "Dwaarnyn the Dark-Nosed Ur-Grue"
, "I'm Dreaming of a Black Cavern"
, "Good King Flathead"
, "Dornbeasts Roasting on an Open Fire");

const HOW_SINGS
 = LTABLE(2
, " sing a few verses of \""
, " hum the chorus from \""
, " begin crooning \"");

const XTREE_DOINGS
 = LTABLE(2
, " blink their lights"
, " whisper among themselves"
, " swish their tinsel"
, " rattle their ornaments");

const COOK_DOINGS
 = LTABLE(2
, " does his best to ignore you"
, " busies himself around the kitchen"
, " glances up at you and scowls"
, " bustles around the room");

const MAGIC_ITEMS
 = PLTABLE(STAFF, CANE, WAND, ROD, STICK, STAVE
, RENEWAL, PARCHMENT, VELLUM, SMOOTH, RUMPLE, GILT
, APOTION, BPOTION, CPOTION, DPOTION, EPOTION
, RFOOT, CLOVER, SHOE
, AMULET, GOBLET, VIAL
, SCABBARD, COCO, ROOT, RING, STONE, UHEMI, LHEMI, DIARY
, PALIMP, CHEST, PHASE, JAR, CIRCLET, GLASS
, HELM, GURDY, SPENSE, ROSE, CLOAK, WHISTLE);

const WEAPON_ITEMS
 = PLTABLE(SWORD, SHILL, AXE, DAGGER, ARROW);

const ARMOR_ITEMS
 = PLTABLE(CLOAK, TUNIC, SCALE, CHAIN, PLATE, HELM, PACK, SCABBARD);

const LIGHT_SOURCES = PLTABLE(AMULET, LANTERN);

const WIND_ALERTS
 = LTABLE(2, "You feel the wind changing direction"
, "The wind changes direction again"
, "A fresh wind blows from a new direction");


const ARCH_ROOMS
 = [ARCH_VOID, ARCH1, ARCH2, ARCH3, ARCH4, ARCH5, 0
, ARCH9, ARCH10, ARCH11, ARCH12, ARCH_VOID];

const DORN_MISSES
 = LTABLE(2
, " moves its deadly gaze across the room"
, " tries to lock eyes with yours"
, " scans the room with its deadly gaze"
, " almost stares you down");

const DORN_HITS
 = LTABLE(2
, " fixes its deadly gaze upon you"
, "'s eyes meet yours"
, " locks its eyes onto your face"
, "'s gaze stops you cold");

const DORN_ROOMS
 = PLTABLE(TOWER_TOP, LEVEL3A, LEVEL3B, LEVEL3C, LEVEL3D);

const PUPP_DOINGS
 = LTABLE(2
, "making faces at you"
, "hurling insults at you"
, "reciting libelous rhymes about your personal life"
, "spreading rumors about you"
, "accusing you of shocking indiscretions"
, "taunting you");

const PUPP_MISSES
 = LTABLE(2
, " swings back and forth in its tree"
, " pauses to think of another insult"
, " dodges behind a tree trunk"
, " stops to chuckle at its own cleverness");

const PUPP_HITS
 = LTABLE(2
, " twists its body into an unflattering parody of your own"
, " recites your nightly personal habits in excruciating detail"
, " mirrors the expression on your face with infuriating accuracy"
, " accuses your mother of shocking improprieties"
, " reminds you how much weight you've gained lately, and where");

const STRANGLES
 = LTABLE(2
, "The bony fingers close tighter around your throat"
, "You gasp for breath as the skeleton throttles your neck"
, "The skeleton grins with menace as its fingers close tighter");

const S_LADDER = 0;
const S_CAT = 1;
const S_13 = 2;
const S_UMBRELLA = 3;

var SUCKER_TYPES = LTABLE(0, S_LADDER, S_CAT, S_13, S_UMBRELLA);

const SUCKER_NAMES
 = ["stepladder"
, "black cat"
, "giant number 13"
, "spinning umbrella"];

const SUCKER_SYNS_A
 = [VOC("LADDER", NOUN)
, VOC("CAT", NOUN)
, VOC("THIRTEEN", NOUN)
, VOC("UMBRELLA", NOUN)];

const SUCKER_SYNS_B
 = [VOC("STEPLADDER", NOUN)
, VOC("KITTY", NOUN)
, VOC("INTNUM", NOUN)
, VOC("BROLLY", NOUN)];

const SUCKER_ADJS
 = [VOC("STEP", ADJ)
, VOC("KITTY", ADJ)
, VOC("NUMBER", ADJ)
, VOC("SPINNING", ADJ)];

const SUCKER_SMASHES
 = [" pirouettes across the chamber, grazing the mirror"
, " yowls playfully, leaps high and rakes its claws across the mirror"
, " studies itself in the mirror, frowns, and jabs at it angrily"
, "'s point nudges against the mirror"];

const SUCKER_HITS
 = [LTABLE(2
, " opens its legs wide, and steps right over you"
, " does a somersault over your head"
, " leaps over your head")
, LTABLE(2
, " marches back and forth in front of you"
, " places itself directly in your path"
, " slinks to and fro before you")
, LTABLE(2
, " points to itself, then at you"
, " stares you right in the face"
, " waves at you grimly")
, LTABLE(2
, " slowly opens, then snaps itself shut"
, " snaps itself open, then slowly closes"
, " opens itself as wide as possible")];

const SUCKER_MISSES
 = [LTABLE(2
, " clumps around the passage"
, " twirls on one leg"
, " tries to step over you")
, LTABLE(2
, " races around the chamber"
, " tries to cross your path"
, " slinks along the edge of the passage")
, LTABLE(2
, " slides closer to you"
, " does its best to keep your attention"
, " tries to block the passage")
, LTABLE(2
, " whacks the wall trying to open itself"
, " whirls towards the center of the passage"
, " stops moving, then spins the other way")];

const SUCKER_STALKS
 = LTABLE(2, "brushes past", "is stalking", "circles around");

const LUCKY_OBJECTS
 = PLTABLE(RFOOT, CLOVER, SHOE);

const EMPTY_WANDS
 = LTABLE(2
, " sputters uselessly"
, " emits a few feeble sparks"
, " coughs impotently");

function CONSTANTS_2_INIT() {
    PLAIN_ROOMS = PLAIN_ROOMS();
}