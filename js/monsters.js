`MONSTERS for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All Rights Reserved.`

"*** DISCIPLINE CRAB ***"

var CRAB = () => OBJECT({
	LOC: THRONE_ROOM,
	LAST_LOC: THRONE_ROOM,
	DESC: "discipline crab",
	FLAGS: [TRYTAKE, LIVING, SURFACE, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["CRAB", "MONSTER", "SOMETHING", "THING"],
	ADJECTIVE: ["KING", "DISCIPLINE", "AWAKE"],
	LIFE: I_CRAB,
	ENDURANCE: 7,
	EMAX: 7,
	STRENGTH: 7,
	DEXTERITY: 60,
	VALUE: 5,
	HABITAT: CELLAR_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	CONTFCN: CRAB_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "skulking in the corner",
	ACTION: CRAB_F
});

function CRAB_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if((_X = isTOUCHING())) {
                TELL(CTHE(CRAB
), " snaps at your fingers. Yow!", CR);
                return true;
            }
        }
        return false;
    } else if((!(isVERB(V_HIT, V_MUNG))
  &&  (_X = isTOUCHING()))) {
        SHY_CRAB();
        return true;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        } else if(isVERB(V_PUT_ON, V_EMPTY_INTO)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " adjusts the crown on its head, and glares at you defiantly. ");
        DIAGNOSE_MONSTER();
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function SHY_CRAB() {
    TELL(CTHE(CRAB), " sidesteps out of your reach.", CR);
    return true;
}

"*** RATS ***"

var RAT = () => OBJECT({
	LOC: WC1,
	LAST_LOC: WC1,
	DESC: "rat-ant",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["RAT\-ANT", "RAT", "ANT", "MONSTER", "SOMETHING", "THING"],
	ADJECTIVE: ["RAT", "AWAKE"],
	LIFE: I_RAT,
	ENDURANCE: 6,
	EMAX: 6,
	STRENGTH: 6,
	DEXTERITY: 60,
	VALUE: 5,
	HABITAT: CELLAR_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "scuttling across the dirt",
	ACTION: RAT_F
});

function RAT_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " glares back at you, snarling. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** SKELETON ***"

var SKELETON = () => OBJECT({
	LOC: SKEL_ROOM,
	DESC: "skeleton",
	SDESC: 0,
	FLAGS: [TRYTAKE, NOALL, SURFACE],
	CAPACITY: 10,
	VALUE: 3,
	SYNONYM: ["SKELETON", "BONES", "BONE", "BODY", "CORPSE", "NECK", "MONSTER"],
	ADJECTIVE: ["SKELETON"],
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: SKELETON_F,
	ACTION: SKELETON_F
});

"SEEN = not yet fought."

function DESCRIBE_HEAP(_OBJ) {
    return TELL("heap of bones");
}

function SKELETON_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(SKELETON));
        if(isT(CHOKE)) {
            TELL(" is clutching your throat.");
        } else {
            PRINT(" lies at your feet.");
            if(!(isIS(AMULET, TOUCHED))) {
                MAKE(AMULET, NODESC);
            }
            if(isSEE_ANYTHING_IN(SKELETON)) {
                TELL(" On it you see ");
                CONTENTS(SKELETON);
                TELL(C("."));
            }
            UNMAKE(AMULET, NODESC);
        }
        if(!(isIS(AMULET, TOUCHED))) {
            TELL(" An amulet dangles from its neck.");
        }
        return true;
    } else if(isSTRANGLE(SKELETON)) {
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_TAKE, V_KICK, V_HIT, V_SHAKE, V_MOVE, V_PUSH, V_PULL, V_ADJUST)) {
        if(isIS(PRSO, MUNGED)) {
            WASTE_OF_TIME();
            return true;
        }
        WINDOW(SHOWING_ROOM);
        MAKE(PRSO, MUNGED);
        MAKE(PRSO, SEEN);
        PUTP(PRSO, "SDESC", DESCRIBE_HEAP);
        MAKE(AMULET, TOUCHED);
        isREPLACE_SYN(PRSO, "BODY", "PILE");
        isREPLACE_SYN(PRSO, "CORPSE", "HEAP");
        isREPLACE_SYN(PRSO, "NECK", "ZZZP");
        isREPLACE_ADJ(PRSO, "SKELETON", "ZZZP");
        TELL("With a sigh of exhaustion, ", THEO);
        if(isT(CHOKE)) {
            CHOKE = 0;
            DEQUEUE(I_STRANGLE);
            TELL(" releases its strangle hold and");
        }
        TELL(" crumbles into a useless ", D(PRSO), PERIOD);
        UPDATE_STAT(GETP(SKELETON, "VALUE"), EXPERIENCE);
        return true;
    } else if(isVERB(V_LOOK_ON, V_LOOK_INSIDE, V_SEARCH, V_LOOK_UNDER, V_DIG, V_DIG_UNDER)) {
        TELL("You find ");
        if(!(isIS(AMULET, TOUCHED))) {
            MAKE(AMULET, NODESC);
        }
        CONTENTS();
        UNMAKE(AMULET, NODESC);
        PRINT(PERIOD);
        return true;
    } else if((isVERB(V_EXAMINE, V_LOOK_ON)
  &&  !(isIS(PRSO, MUNGED)))) {
        TELL("It grins at you horribly. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** GUTTER SNIPES ***"

var SNIPE = () => OBJECT({
	LAST_LOC: 0,
	DESC: "guttersnipe",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["SNIPE", "GUTTERSNIPE", "BIRD", "MONSTER"],
	ADJECTIVE: ["GUTTER", "AWAKE"],
	LIFE: I_SNIPE,
	ENDURANCE: 12,
	EMAX: 12,
	STRENGTH: 10,
	DEXTERITY: 70,
	VALUE: 7,
	HABITAT: MOOR_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "lurking among the reeds",
	ACTION: SNIPE_F
});

function SNIPE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO
, "'s beak is almost a foot long, and sharp as a needle. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** ELDRITCH VAPORS ***"

var VAPOR = () => OBJECT({
	LOC: IN_GAS,
	LAST_LOC: IN_GAS,
	DESC: "eldritch vapor",
	FLAGS: [VOWEL, LIVING, MONSTER, SURPRISED],
	SYNONYM: ["VAPORS", "VAPOR", "MONSTER"],
	ADJECTIVE: ["ELDRITCH", "AWAKE"],
	LIFE: I_VAPOR,
	ENDURANCE: 6,
	EMAX: 6,
	STRENGTH: 5,
	DEXTERITY: 70,
	VALUE: 9,
	HABITAT: MOOR_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "wafting amid the reeds",
	ACTION: VAPOR_F
});

function VAPOR_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        PCLEAR();
        TELL(CTHEO, " murmurs vaguely in response.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        DIAGNOSE_MONSTER();
        if(!(isIS(PRSO, TOUCHED))) {
            MAKE(PRSO, TOUCHED);
            TELL(TAB);
            REFER_TO_PACKAGE();
        }
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

"*** SPIDERS ***"

var SPIDER = () => OBJECT({
	LOC: LEVEL1B,
	LAST_LOC: LEVEL1B,
	DESC: "giant spider",
	FLAGS: [NODESC, MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["SPIDER", "INSECT", "MANDIBLE", "MANDIBLES", "MONSTER"],
	ADJECTIVE: ["GIANT", "BIG", "LARGE", "AWAKE"],
	LIFE: I_SPIDER,
	ENDURANCE: 10,
	EMAX: 10,
	STRENGTH: 10,
	DEXTERITY: 80,
	VALUE: 7,
	HABITAT: TOWER1_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "lurking in the shadows",
	ACTION: SPIDER_F
});

function SPIDER_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " looks alarmingly well-fed. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** SLUGS ***"

var SLUG = () => OBJECT({
	LOC: LEVEL2B,
	LAST_LOC: LEVEL2B,
	DESC: "slug",
	FLAGS: [NODESC, MONSTER, LIVING, SURFACE, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["SLUG", "INSECT", "MONSTER"],
	ADJECTIVE: ["AWAKE"],
	LIFE: I_SLUG,
	ENDURANCE: 11,
	EMAX: 11,
	STRENGTH: 10,
	DEXTERITY: 60,
	VALUE: 7,
	HABITAT: TOWER2_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "squishing across the debris",
	ACTION: SLUG_F
});

function SLUG_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER, V_PUT_ON, V_PUT, V_TOUCH_TO)) {
            TOUCH_SLUG_WITH(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " is about as long as you are tall. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

function TOUCH_SLUG_WITH(_OBJ) {
    ITALICIZE("Splat");
    TELL("! ");
    if(!(isEQUAL(_OBJ, CUBE))) {
        WINDOW(SHOWING_ALL);
        MOVE(_OBJ, HERE);
        TELL(CTHE(_OBJ), " slips off ", THE(SLUG
), "'s oozing body with no effect.", CR);
        return true;
    }
    REMOVE(CUBE);
    VANISH(SLUG);
    TELL(CTHE(SLUG), " emits a shriek of agony as ", THE(_OBJ
), " slides across its body. You leap out of its path of retreat, and listen as its repulsive squeals ");
    PRINT("fade into the distance.|");
    KILL_MONSTER(SLUG);
    return true;
}

"*** DUST BUNNIES ***"

var DUST = () => OBJECT({
	LOC: LEVEL3B,
	LAST_LOC: LEVEL3B,
	DESC: "dust bunnies",
	SDESC: DESCRIBE_DUST,
	FLAGS: [MONSTER, LIVING],
	SYNONYM: ["BUNNIES", "BUNNY", "DUST", "BUNCH", "GROUP", "MONSTER", "MONSTERS"],
	ADJECTIVE: ["DUST", "AWAKE"],
	LIFE: I_DUST	/*ENDURANCE: 0*/	/*EMAX: 0*/	/*STRENGTH: 0*/	/*DEXTERITY: 0*/,
	VALUE: 10,
	HABITAT: TOWER3_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: DUST_F,
	ACTION: DUST_F
});

function DESCRIBE_DUST(_OBJ) {
    return TELL("dust bunny");
}

const BMAX = 10946;
var OBUNNIES/*NUMBER*/ = 1;
var BUNNIES/*NUMBER*/ = 1;

function DUST_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        if(BUNNIES < 5) {
            TELL(XA);
            if(isEQUAL(BUNNIES, 1)) {
                TELL("dust bunny is ");
            } else {
                if(isEQUAL(BUNNIES, 2)) {
                    TELL("pair");
                } else {
                    TELL("trio");
                }
                TELL(" of ", DUST, " are ");
            }
            TELL("lurking in ", THE(GCORNER), C("."));
            return true;
        } else if(isEQUAL(BUNNIES, 8)) {
            TELL("Eight");
        } else if(isEQUAL(BUNNIES, 13)) {
            TELL("Thirteen");
        } else if(BUNNIES > BMAX) {
            TELL("Countless");
        } else if(BUNNIES > 999) {
            TELL(N((BUNNIES / 1000)), C(COMMA
), N(MOD(BUNNIES, 1000)));
        } else {
            TELL(N(BUNNIES));
        }
        TELL(C(SP), DUST, " hover in the air.");
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isIS(DUST, TOUCHED)) {
        
    } else if((_X = isTOUCHING())) {
        START_DUST();
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MOVE(PRSO, HERE);
            WINDOW(SHOWING_ALL);
            TELL(CTHEI, " easily avoid ", THEO, PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT, V_TOUCH, V_KICK, V_TAKE, V_SHAKE)) {
        HIT_BUNNIES();
        return true;
    } else if(isVERB(V_EXAMINE, V_COUNT)) {
        UNMAKE(PRSO, SEEN);
        if(isEQUAL(BUNNIES, 1)) {
            ONLY_ONE();
            return true;
        } else if(BUNNIES > BMAX) {
            TELL(CTHEO, " number in the countless thousands.", CR);
            return true;
        }
        TELL("A quick count turns up ");
        if(BUNNIES > 999) {
            TELL(N((BUNNIES / 1000)), C(COMMA
), N(MOD(BUNNIES, 1000)));
        } else {
            TELL(N(BUNNIES));
        }
        TELL(C(SP), PRSO, PERIOD);
        return true;
    } else {
        return false;
    }
}

function HIT_BUNNIES() {
    WHOOSH();
    if(!(PRSI)) {
        PRSI = HANDS;
    }
    YOUR_OBJ();
    TELL(" swipes through ", THEO, PTAB);
    if(isSPARK_TO(PRSI, PRSO)) {
        return true;
    }
    I_DUST(null);
    return false;
}

function START_DUST() {
    MAKE(DUST, TOUCHED);
    UNMAKE(DUST, SEEN);
    QUEUE(I_DUST);
    return false;
}

"*** DORNBEAST ***"

var DORN = () => OBJECT({
	LAST_LOC: TOWER_TOP,
	DESC: "dorn",
	FLAGS: [NODESC, LIVING, MONSTER, PERSON, SURPRISED],
	LIFE: I_DORN,
	ENDURANCE: 100,
	EMAX: 100,
	STRENGTH: 25,
	DEXTERITY: 33,
	VALUE: 20,
	HABITAT: DORN_ROOMS,
	SYNONYM: ["DORNBEAST", "DORN", "BEAST", "DORNBROOK", "MONSTER"],
	ADJECTIVE: ["DORN", "MIKE", "MICHAEL", "AWAKE"],
	DESCFCN: DORN_F,
	ACTION: DORN_F
});

function DORN_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(DORN), SIS);
        if(isIS(DORN, MUNGED)) {
            TELL("thrashing about, bawling helplessly.");
            return true;
        } else if(isIS(DORN, SURPRISED)) {
            TELL("waiting for you.");
            return true;
        }
        TELL("sweeping its gaze around the room.");
        return true;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        MAKE(DORN, SEEN);
        TELL("\"Hurumph.\"", CR);
        return RFATAL();
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        SEE_CHARACTER(PRSO);
        if(isIS(PRSO, MUNGED)) {
            TELL(CTHE(DORN), " is too busy bawling to respond.", CR);
            return RFATAL();
        } else if(isT(P_CONT)) {
            WINNER = PRSO;
            return true;
        }
        TELL(CTHEO, " \"Hurumphs\" expectantly.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        if(isIS(PRSO, MUNGED)) {
            TELL(CTHEO, " is bawling like a baby. ");
        }
        DIAGNOSE_MONSTER();
        if(!(isIS(PRSO, TOUCHED))) {
            MAKE(PRSO, TOUCHED);
            TELL(TAB);
            REFER_TO_PACKAGE();
        }
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

"*** BLOODWORMS ***"

var WORM = () => OBJECT({
	LOC: WORM_ROOM,
	LAST_LOC: WORM_ROOM,
	DESC: "bloodworm",
	FLAGS: [LIVING, TRYTAKE, SURFACE, SURPRISED, SLEEPING],
	SDESC: DESCRIBE_WORM,
	SYNONYM: ["WORM", "BLOODWORM", "ROCK", "STONE"],
	ADJECTIVE: ["BLOOD", "MOSSY", "MOSS", "AWAKE"],
	LIFE: I_WORM,
	ENDURANCE: 20,
	EMAX: 20,
	STRENGTH: 16,
	DEXTERITY: 70,
	VALUE: 20,
	HABITAT: JUNGLE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: WORM_F,
	EXIT_STR: "slithering through the grass",
	ACTION: WORM_F
});

function DESCRIBE_WORM(_OBJ) {
    return TELL("mossy rock");
}

function WORM_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            if(!(isIS(WORM, MONSTER))) {
                TELL("The underbrush almost conceals ", A(WORM), C("."));
                return true;
            }
            VIEW_MONSTER();
            return true;
        }
        return false;
    } else if(isIS(WORM, MONSTER)) {
        
    } else if((isVERB(V_LOOK_UNDER, V_LOOK_BEHIND, V_SEARCH)
  ||  (_X = isTOUCHING()))) {
        START_WORM("approach");
        return true;
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO);
        if(isIS(PRSO, MONSTER)) {
            TELL(" no longer looks like a mossy rock. It's equipped with three-foot fangs, and seems eager to plunge one or both of them into your chest. ");
            DIAGNOSE_MONSTER();
            return true;
        }
        HELMLOOK();
        return true;
    } else {
        return false;
    }
}

function HELMLOOK() {
    if(isWEARING_MAGIC(HELM)) {
        TELL(" looks vaguely suspicious.", CR);
        return true;
    }
    PRINT(" seems ordinary enough.|");
    return true;
}

function START_WORM(_STR) {
    let _X;
    MAKE(WORM, MONSTER);
    UNMAKE(WORM, SLEEPING);
    MAKE(WORM, NOALL);
    UNMAKE(WORM, SURFACE);
    isREPLACE_SYN(WORM, "ROCK", "MONSTER");
    isREPLACE_SYN(WORM, "STONE", "ZZZP");
    isREPLACE_ADJ(WORM, "MOSSY", "ZZZP");
    isREPLACE_ADJ(WORM, "MOSS", "ZZZP");
    QUEUE(I_WORM);
    WINDOW(SHOWING_ROOM);
    LAST_MONSTER = WORM;
    LAST_MONSTER_DIR = P_WALK_DIR;
    P_IT_OBJECT = WORM;
    PUTP(WORM, "SDESC", DESCRIBE_MONSTERS);
    TELL("As you ", _STR
, " the rock, a three-foot set of fangs leaps ");
    PRINT("out at you, barely missing your throat!|");
    return true;
}

"*** CROCS ***"

var CROC = () => OBJECT({
	LOC: JUN2,
	LAST_LOC: JUN2,
	DESC: "crocodile",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["CROCODILE", "CROC", "LIZARD", "REPTILE", "MONSTER", "ALLIGATOR"],
	ADJECTIVE: ["AWAKE"],
	LIFE: I_CROC,
	ENDURANCE: 20,
	EMAX: 20,
	STRENGTH: 16,
	DEXTERITY: 80,
	VALUE: 20,
	HABITAT: JUNGLE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "stalking through the undergrowth",
	ACTION: CROC_F
});

function CROC_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " looks hungry. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** HOUNDS ***"

var HOUND = () => OBJECT({
	LAST_LOC: 0,
	DESC: "hellhound",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["HELLHOUND", "HOUND", "HELL", "DOG", "MONSTER"],
	ADJECTIVE: ["HELL", "AWAKE"],
	LIFE: I_HOUND,
	ENDURANCE: 40,
	EMAX: 40,
	STRENGTH: 30,
	DEXTERITY: 70,
	VALUE: 25,
	HABITAT: FOREST_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "prowling between the trees",
	ACTION: HOUND_F
});

function HOUND_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " is deciding how best to eat you. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** PUPPETS ***"

var PUPP = () => OBJECT({
	LOC: TWILIGHT,
	LAST_LOC: TWILIGHT,
	DESC: "cruel puppet",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["PUPPET", "MONSTER"],
	ADJECTIVE: ["CRUEL", "AWAKE"],
	LIFE: I_PUPP,
	ENDURANCE: 30,
	EMAX: 30,
	STRENGTH: 20,
	DEXTERITY: 80,
	VALUE: 25,
	HABITAT: FOREST_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "resting beneath a tree",
	ACTION: PUPP_F
});

function PUPP_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " twists its face to look just like you. Eeek! ");
        DIAGNOSE_MONSTER();
        return true;
    } else if((isVERB(V_LAUGH)
  &&  isEQUAL(P_PRSA_WORD, "INSULT", "OFFEND"))) {
        _X = GETP(PRSO, "EMAX");
        if(GETP(PRSO, "ENDURANCE") < _X) {
            PUTP(PRSO, "ENDURANCE", _X);
        } else if(_X < 32762) {
            _X = (_X + 5);
            PUTP(PRSO, "EMAX", _X);
            PUTP(PRSO, "ENDURANCE", _X);
        }
        TELL("You instantly regret your words, for ", THEO
, " grins with renewed vitality. It apparently ");
        ITALICIZE("feeds");
        TELL(" off insults like that!", CR);
        return true;
    } else {
        return false;
    }
}

"*** UNDEAD ***"

var DEAD = () => OBJECT({
	LAST_LOC: 0,
	DESC: "undead warrior",
	FLAGS: [MONSTER, LIVING, VOWEL, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["WARRIOR", "SOLDIER", "MAN", "FELLOW", "GUY", "UNDEAD", "MONSTER"],
	ADJECTIVE: ["UNDEAD", "AWAKE"],
	LIFE: I_DEAD,
	ENDURANCE: 36,
	EMAX: 36,
	STRENGTH: 30,
	DEXTERITY: 70,
	VALUE: 25,
	HABITAT: RUIN_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "lurking amid the ruins",
	ACTION: DEAD_F
});

function DEAD_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER, V_TOUCH_TO)) {
            TOUCH_DEAD_WITH(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " shimmers like a wave of heat. ");
        DIAGNOSE_MONSTER();
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT
, V_RIP, V_CUT, V_OPEN
, V_OPEN_WITH, V_KICK, V_STOUCH_TO)) {
        TOUCH_DEAD_WITH(PRSI);
        return true;
    } else if((_X = isTOUCHING())) {
        TOUCH_DEAD_WITH(HANDS);
        return true;
    } else {
        return false;
    }
}

function TOUCH_DEAD_WITH(_OBJ) {
    if(!(isEQUAL(_OBJ, VIAL))) {
        PASSES_THROUGH(_OBJ, DEAD);
        return true;
    }
    VANISH(VIAL);
    TELL(YOU_HEAR, "a sharp ");
    ITALICIZE("crack");
    TELL(" as ", THE(VIAL
), ` shatters, splashing your target with a shower of droplets that burst into fire on contact! The blasphemous creature opens its jaws in a silent scream as a purifying flame engulfs its ghostly form.
  Moments later, the last few cinders scatter in the breeze.`, CR);
    KILL_MONSTER(DEAD);
    return true;
}

"*** GHOULS ***"

var GHOUL = () => OBJECT({
	LOC: RUIN1,
	LAST_LOC: RUIN1,
	DESC: "ghoul",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["GHOUL", "ROBBER", "MONSTER"],
	ADJECTIVE: ["GRAVE", "AWAKE"],
	LIFE: I_GHOUL,
	ENDURANCE: 36,
	EMAX: 36,
	STRENGTH: 30,
	DEXTERITY: 70,
	VALUE: 25,
	HABITAT: RUIN_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	CONTFCN: GHOUL_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "skulking about the ruins",
	ACTION: GHOUL_F
});

function GHOUL_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if((_X = isTOUCHING())) {
                TELL("Laughing insanely, "
, THE(GHOUL), " dodges out of reach.", CR);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " glares back at you. ");
        DIAGNOSE_MONSTER();
        return true;
    } else {
        return false;
    }
}

"*** CORBIES ***"

var CORBIES = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "corbies",
	FLAGS: [NODESC, PLURAL, LIVING],
	SYNONYM: ["CORBIES", "CORBIE", "BIRDS", "BIRD", "FLOCK", "GROUP", "BUNCH", "MONSTERS", "MONSTER"],
	ADJECTIVE: ["GIANT"],
	ACTION: CORBIES_F
});

function CORBIES_F() {
    let _FEAR=0, _X;
    if((isT(BADKEY)
  &&  isEQUAL(LOC(BADKEY), PLAYER, HERE))) {
        ++_FEAR
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER, V_GIVE, V_FEED, V_SHOW)) {
            MAKE(PRSI, SEEN);
            if(!(isVERB(V_SHOW))) {
                MOVE(PRSO, HERE);
                WINDOW(SHOWING_ALL);
            }
            TELL(CTHEI);
            if(isPRSO(BADKEY)) {
                TELL(" screech with fear!", CR);
                return true;
            }
            TELL(" snatch ", THEO
, " out of the air, aim carefully and drop it");
            if(PROB(50)) {
                TELL(" on your skull. Ouch!", CR);
                UPDATE_STAT((0 - GETP(PRSO, "SIZE")));
                return true;
            }
            TELL(", narrowly missing your skull.", CR);
            return true;
        } else if((_X = isTOUCHING())) {
            CORBIES_STAY_AWAY();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        TELL(CTHE(CORBIES), " shriek back obscenities.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The flock of ", PRSO, " soars overhead in ");
        if(isT(_FEAR)) {
            TELL("high, frightened ");
        } else {
            TELL("low, menacing ");
        }
        TELL("circles.", CR);
        if(!(isIS(PRSO, IDENTIFIED))) {
            MAKE(PRSO, IDENTIFIED);
            TELL(TAB);
            REFER_TO_PACKAGE();
        }
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if(isT(_FEAR)) {
        
    } else if(isVERB(V_HIT, V_MUNG, V_CUT, V_KICK)) {
        UNMAKE(CORBIES, SEEN);
        TELL(CTHEO, " flutter out of your reach.", CR);
        return true;
    }
    if((_X = isTOUCHING())) {
        CORBIES_STAY_AWAY();
        return true;
    } else {
        return false;
    }
}

function CORBIES_STAY_AWAY() {
    TELL(CTHE(CORBIES));
    if((isT(BADKEY)
  &&  isEQUAL(LOC(BADKEY), PLAYER, HERE))) {
        MAKE(CORBIES, SEEN);
        PRINT(" seem unwilling to approach you.|");
        return true;
    }
    UNMAKE(CORBIES, SEEN);
    TELL(" easily swoop out of reach.", CR);
    return true;
}

"*** MONKEY GRINDER ***"

var GRINDER = () => OBJECT({
	LAST_LOC: AT_GATE,
	DESC: "monkey grinder",
	FLAGS: [NODESC, PERSON, LIVING, MONSTER, SURPRISED],
	LIFE: I_GRINDER,
	ENDURANCE: 100,
	EMAX: 100,
	STRENGTH: 16,
	DEXTERITY: 25,
	VALUE: 25,
	HABITAT: ACCARDI_ROOMS,
	SYNONYM: ["GRINDER", "FIGURE", "MAN", "FELLOW", "GUY", "MONSTER"],
	ADJECTIVE: ["MONKEY", "AWAKE"],
	CONTFCN: GRINDER_F,
	DESCFCN: GRINDER_F,
	ACTION: GRINDER_F
});

function GRINDER_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        P_HIM_OBJECT = GRINDER;
        TELL(CA(GRINDER), SIS);
        if(isIS(GRINDER, SURPRISED)) {
            TELL("loafing nearby.");
            return true;
        }
        TELL("attacking you with his ", GURDY, "!");
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if((_X = isTOUCHING())) {
            TELL(CTHE(GRINDER), " slaps your hand away.");
            if(PROB(50)) {
                TELL(" \"Touchy, touchy.\"");
            }
            CRLF();
            return true;
        }
        return false;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_GRINDER(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            SHOW_TO_GRINDER(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        MAKE(GRINDER, SEEN);
        TELL("\"Hello, victim.\"", CR);
        return true;
    } else if(isVERB(V_GOODBYE)) {
        TELL("\"Heh heh heh.\"", CR);
        return true;
    } else if((_X = isTALKING())) {
        PERPLEXED(GRINDER);
        TELL("You babble of ");
        if((isT(PRSI)
  &&  (isIS(PRSI, LIVING)
  ||  isIS(PRSI, MONSTER)))) {
            TELL("be");
        } else {
            TELL("th");
        }
        TELL("ings of no significance to me!\"", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        DIAGNOSE_MONSTER();
        if(!(isIS(PRSO, TOUCHED))) {
            MAKE(PRSO, TOUCHED);
            TELL(TAB);
            REFER_TO_PACKAGE();
        }
        return true;
    } else if(isVERB(V_HIT, V_MUNG)) {
        TELL(CTHEO, " easily avoids ");
        if((isEQUAL(PRSI, null, HANDS, FEET)
  ||  !(isIS(PRSI, NOARTICLE)))) {
            TELL("your ");
        }
        if((isVERB(V_KICK)
  ||  isPRSI(FEET))) {
            TELL(B("FOOT"));
        } else if(isEQUAL(PRSI, null, HANDS)) {
            TELL(B("BLOW"));
        } else {
            TELL(D(PRSI));
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function SOME(_OBJ) {
    if(isIS(_OBJ, PLURAL)) {
        TELL("some");
        return true;
    }
    TELL("one");
    return true;
}

function GIVE_TO_GRINDER(_OBJ) {
    MAKE(GRINDER, SEEN);
    if(isGIVING_LOOT(_OBJ, GRINDER)) {
        return true;
    } else if(isEQUAL(_OBJ, CHEST)) {
        GRINDERS_BANE();
        return true;
    }
    TELL("\"If I wanted ", A(_OBJ), ", I'd steal ");
    SOME(_OBJ);
    TELL(PERQ);
    return true;
}

function SHOW_TO_GRINDER(_OBJ) {
    MAKE(GRINDER, SEEN);
    if(isEQUAL(_OBJ, CHEST)) {
        GRINDERS_BANE(true);
        return true;
    }
    TELL(CTHE(GRINDER), GLANCES_AT, THE(_OBJ
), " and yawns conspicuously.", CR);
    return true;
}

function EXIT_GRINDER() {
    MOVE(GURDY, HERE);
    GRTIMER = 0;
    KILL_MONSTER(GRINDER);
    P_IT_OBJECT = GURDY;
    WINDOW(SHOWING_ALL);
    return false;
}

function GRINDERS_BANE(_TAKIT=null) {
    let _L;
    _L = LOC(CHEST);
    MOVE(CHEST, AT_GATE);
    TELL("\"A treasure chest!\" crows ", THE(GRINDER
), ", snatching it ");
    if(isEQUAL(_L, PLAYER)) {
        TELL("rudely away from you");
    } else {
        OUT_OF_LOC(_L);
    }
    TELL(". \"I just ");
    ITALICIZE("love");
    TELL(` surprises.\"
  You wince as he taps on the outside of the chest, shakes it, then turns it upside down. Nothing happens. Then he places it on the ground, stares without comprehension at the brass plate, and cracks his knuckles`, PTAB);
    DESCRIBE_GATE(GRINDER);
    EXIT_GRINDER();
    return true;
}

"*** UR-GRUE ***"

var URGRUE = () => OBJECT({
	LOC: IN_LAIR,
	LAST_LOC: IN_LAIR,
	DESC: "shadow",
	SDESC: DESCRIBE_URGRUE,
	FLAGS: [NODESC, VOWEL, LIVING, MONSTER, SURPRISED],
	SYNONYM: ["URGRUE", "UR\-GRUE", "SHADOW", "SHADOWS", "VOICE", "MONSTER"],
	ADJECTIVE: ["UR", "AWAKE"],
	VALUE: 50,
	GENERIC: GENERIC_MONSTER_F,
	ACTION: URGRUE_F
});

function DESCRIBE_URGRUE(_OBJ) {
    if((isT(isLIT)
  ||  isWEARING_MAGIC(HELM))) {
        
        return PRINTD(_OBJ);
    }
    
    return TELL("voice");
}

function URGRUE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("URGRUE", "UR\-GRUE")) {
        PCLEAR();
        TELL("It is unwise to speak of such things.", CR);
        UPDATE_STAT(-1, LUCK, true);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            HOPELESS();
            return true;
        } else if(isVERB(V_GIVE, V_SHOW, V_FEED)) {
            NO_INTS();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        NO_INTS();
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT)) {
        HOPELESS();
        return true;
    } else if(isVERB(V_EXAMINE, V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function HOPELESS() {
    TELL("A feeling of utter hopelessness stays your hand.", CR);
    return true;
}

function NO_INTS() {
    PCLEAR();
    TELL("\"Please don't interrupt my monologue,\" scolds the ");
    if((isT(isLIT)
  ||  isWEARING_MAGIC(HELM))) {
        TELL(URGRUE, PERIOD);
        return true;
    }
    TELL("voice in the darkness.", CR);
    return true;
}

"*** CHRISTMAS TREES ***"

var XTREES = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Christmas tree monsters",
	FLAGS: [LIVING, MONSTER, PLURAL, SURFACE],
	SYNONYM: ["TREES", "TREE", "MONSTER", "MONSTERS"],
	ADJECTIVE: ["CHRISTMAS", "XMAS", "TREE"],
	LIFE: 0,
	ENDURANCE: 12,
	EMAX: 12,
	STRENGTH: 6,
	DEXTERITY: 30,
	VALUE: 5,
	GENERIC: GENERIC_MONSTER_F,
	ACTION: XTREES_F
});

function XTREES_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            V_THROW();
            if((isPRSO(BFLY)
  &&  isIN(PRSO, HERE))) {
                TELL(TAB);
                isSHOW_XTREES_BFLY();
            }
            return true;
        } else if(isVERB(V_SHOW, V_GIVE, V_GET_FOR)) {
            if(isPRSO(BFLY)) {
                isSHOW_XTREES_BFLY();
                return true;
            }
            TELL(CTHE(XTREES), " show no interest in "
, THEO, PERIOD);
            return true;
        } else if((_X = isPUTTING())) {
            TELL(CTHEI, " edge away from you.", CR);
            return true;
        }
        return false;
    } else if((isVERB(V_WAVE_AT, V_HELLO)
  ||  (_X = isTALKING()))) {
        PCLEAR();
        TELL(CTHE(XTREES), " are too busy singing");
        PRINT(" to pay you much heed.|");
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        REFER_TO_PACKAGE();
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("Still singing.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("The scent of pine");
        PRINT(" fills the air");
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
        TELL("Sure. And even if you hit one tree, what about the thousands of others?", CR);
        return true;
    } else if(isVERB(V_COUNT)) {
        TELL("A quick count reveals 69,105 ", PRSO, PERIOD);
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if(isVERB(V_LAMP_OFF)) {
        isHOW();
        return true;
    } else {
        return false;
    }
}

function isSHOW_XTREES_BFLY(_INDENT=0) {
    if((!(isIS(BFLY, MUNGED))
  ||  !(isVISIBLE(BFLY)))) {
        MAKE(XTREES, SEEN);
        if(isT(_INDENT)) {
            TELL(TAB);
        }
        TELL(CTHE(XTREES), " murmur with vague concern.", CR);
        return true;
    } else if(!(isIS(BFLY, LIVING))) {
        MAKE(XTREES, SEEN);
        if(isT(_INDENT)) {
            TELL(TAB);
        }
        TELL(CTHE(XTREES
), " hesitate for a moment when they spot ", THE(BFLY
), ". But as it isn't moving, they soon resume their song.", CR);
        return true;
    }
    if(isT(_INDENT)) {
        TELL(TAB);
    }
    MAKE(XTREES, SEEN);
    TELL(CTHE(XTREES));
    if(isIS(XTREES, NEUTRALIZED)) {
        TELL(" seem to have gotten over their initial shock. Their carolling proceeds with renewed joy and determination.", CR);
        return true;
    }
    MAKE(XTREES, NEUTRALIZED);
    TELL(" stop dead in their tracks when they spot ", THE(BFLY
), ". Youngsters take root behind their mothers, and the leaders sing an emergency verse of \"", PICK_NEXT(CAROLS), PERQ);
    return true;
}

"*** GRUE ***"

var GRUE = () => OBJECT({
	LAST_LOC: 0,
	DESC: "lurking presence",
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SDESC: DESCRIBE_MONSTERS,
	SYNONYM: ["GRUE", "PRESENCE", "MONSTER"],
	ADJECTIVE: ["LURKING", "SINISTER", "AWAKE"],
	LIFE: I_GRUE,
	ENDURANCE: 99,
	EMAX: 99,
	STRENGTH: 99,
	DEXTERITY: 95,
	VALUE: 30,
	DNUM: 0,
	HABITAT: GRUE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	ACTION: GRUE_F
});

function GRUE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if(isIN(GRUE, HERE)) {
        return false;
    } else if(isVERB(V_FIND, V_WHERE)) {
        TELL("There's probably one");
        PRINT(" lurking in the darkness nearby.|");
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("Grues make no sound, but are always");
        PRINT(" lurking in the darkness nearby.|");
        return true;
    } else {
        return false;
    }
}

"*** LUCKSUCKERS ***"

var ASUCKER = () => OBJECT({
	LOC: CAVE2,
	LAST_LOC: CAVE2,
	DESC: "lucksucker",
	SDESC: DESCRIBE_SUCKERS,
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SYNONYM: ["ZZZP", "ZZZP", "LUCKSUCKER", "SUCKER", "MONSTER"],
	ADJECTIVE: ["ZZZP", "BLACK", "GIANT", "LARGE", "LUCK", "AWAKE"],
	LIFE: I_ASUCKER,
	ENDURANCE: 16,
	EMAX: 16,
	STRENGTH: 12,
	DEXTERITY: 60,
	VALUE: 20,
	DNUM: 0,
	HABITAT: GRUE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "stalking the passageway",
	ACTION: ASUCKER_F
});

function ASUCKER_F(_CONTEXT=null) {
    return isHANDLE_SUCKERS(ASUCKER);
}

var BSUCKER = () => OBJECT({
	LAST_LOC: 0,
	DESC: "lucksucker",
	SDESC: DESCRIBE_SUCKERS,
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SYNONYM: ["ZZZP", "ZZZP", "LUCKSUCKER", "SUCKER", "MONSTER"],
	ADJECTIVE: ["ZZZP", "BLACK", "GIANT", "LARGE", "LUCK", "AWAKE"],
	LIFE: I_BSUCKER,
	ENDURANCE: 16,
	EMAX: 16,
	STRENGTH: 12,
	DEXTERITY: 60,
	VALUE: 20,
	DNUM: 0,
	HABITAT: GRUE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "stalking the passageway",
	ACTION: BSUCKER_F
});

function BSUCKER_F(_CONTEXT=null) {
    return isHANDLE_SUCKERS(BSUCKER);
}

var CSUCKER = () => OBJECT({
	LAST_LOC: 0,
	DESC: "lucksucker",
	SDESC: DESCRIBE_SUCKERS,
	FLAGS: [MONSTER, LIVING, SURPRISED],
	SYNONYM: ["ZZZP", "ZZZP", "LUCKSUCKER", "SUCKER", "MONSTER"],
	ADJECTIVE: ["ZZZP", "BLACK", "GIANT", "LARGE", "LUCK", "AWAKE"],
	LIFE: I_CSUCKER,
	ENDURANCE: 16,
	EMAX: 16,
	STRENGTH: 12,
	DEXTERITY: 60,
	VALUE: 20,
	DNUM: 0,
	HABITAT: GRUE_ROOMS,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: VIEW_MONSTER,
	EXIT_STR: "stalking the passageway",
	ACTION: CSUCKER_F
});

function CSUCKER_F(_CONTEXT=null) {
    return isHANDLE_SUCKERS(CSUCKER);
}

var THIS_SUCKER/*NUMBER*/ = S_13;

function DESCRIBE_SUCKERS(_OBJ) {
    return TELL(SUCKER_NAMES[THIS_SUCKER]);
}

function isHANDLE_SUCKERS(_OBJ) {
    let _X;
    if((isNOUN_USED("INTNUM")
  &&  !(isEQUAL(P_NUMBER, 13)))) {
        TELL(CANT, "see that number here.", CR);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_SHOW)) {
            TELL(CTHEI, " seems ");
            if(!(isPRSO(RFOOT, CLOVER, SHOE))) {
                TELL("indifferent to ");
                SAY_YOUR(PRSO);
                TELL(PERIOD);
                return true;
            }
            TELL("to hesitate for a moment.", CR);
            return true;
        } else if(isVERB(V_THROW, V_THROW_OVER, V_TOUCH_TO)) {
            TOUCH_SUCKER_WITH(_OBJ, PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " returns your stare.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT
, V_RIP, V_CUT, V_OPEN
, V_OPEN_WITH, V_KICK, V_STOUCH_TO)) {
        TOUCH_SUCKER_WITH(_OBJ, PRSI);
        return true;
    } else if((_X = isTOUCHING())) {
        TOUCH_SUCKER_WITH(_OBJ, HANDS);
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function TOUCH_SUCKER_WITH(_SUCKER, _OBJ) {
    if(!(isEQUAL(_OBJ, RFOOT, CLOVER, SHOE))) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MOVE(_OBJ, HERE);
            WINDOW(SHOWING_ALL);
        }
        PASSES_THROUGH(_OBJ, _SUCKER);
        return true;
    }
    VANISH(_OBJ);
    KERBLAM();
    TELL(CTHE(_OBJ));
    BLAST_SUCKER(_SUCKER);
    return true;
}

function BLAST_SUCKER(_OBJ) {
    PUTP(_OBJ, "ENDURANCE", 0);
    TELL(" explodes in a shower of green sparks!", CR);
    return true;
}

"*** SNOW WIGHT ***"

var WIGHT = () => OBJECT({
	LOC: ON_TRAIL,
	DESC: "snow wight",
	SDESC: DESCRIBE_WIGHT,
	FLAGS: [TRYTAKE, SURFACE, CONTAINER, OPENED, SURPRISED],
	SYNONYM: ["SNOWDRIFT", "DRIFT", "SNOW"],
	ADJECTIVE: ["SNOW", "AWAKE"],
	LIFE: I_WIGHT,
	ENDURANCE: 36,
	EMAX: 36,
	STRENGTH: 30,
	DEXTERITY: 70,
	VALUE: 30,
	GENERIC: GENERIC_MONSTER_F,
	DESCFCN: WIGHT_F,
	EXIT_STR: "waiting for you",
	ACTION: WIGHT_F
});

VOC("WIGHT", NOUN);

function DESCRIBE_WIGHT(_OBJ) {
    return TELL(B("SNOWDRIFT"));
}

function START_WIGHT() {
    let _X;
    MAKE(WIGHT, MONSTER);
    MAKE(WIGHT, LIVING);
    UNMAKE(WIGHT, SURFACE);
    UNMAKE(WIGHT, CONTAINER);
    UNMAKE(WIGHT, OPENED);
    isREPLACE_SYN(WIGHT, "DRIFT", "MONSTER");
    isREPLACE_SYN(WIGHT, "SNOWDRIFT", "WIGHT");
    QUEUE(I_WIGHT);
    WINDOW(SHOWING_ROOM);
    LAST_MONSTER = WIGHT;
    LAST_MONSTER_DIR = "SOUTH";
    P_IT_OBJECT = WIGHT;
    AS_YOU_APPROACH(WIGHT);
    PUTP(WIGHT, "SDESC", 0);
    TELL("a pair of bloodstained claws swipes ");
    PRINT("out at you, barely missing your throat!|");
    return true;
}

function WIGHT_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            if(!(isIS(WIGHT, MONSTER))) {
                TELL(CA(WIGHT
), " is blocking the uphill trail.");
                return true;
            }
            VIEW_MONSTER();
            return true;
        }
        return false;
    } else if(isIS(WIGHT, MONSTER)) {
        
    } else if((_X = isTOUCHING())) {
        START_WIGHT();
        return true;
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            MONSTER_THROW();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO);
        if(isIS(PRSO, MONSTER)) {
            TELL(" is equipped with long, sharp teeth and claws, stained with the blood of its last encounter. ");
            DIAGNOSE_MONSTER();
            return true;
        }
        HELMLOOK();
        return true;
    } else {
        return false;
    }
}

"*** SHAPE ***"

var SHAPE = () => OBJECT({
	DESC: "vague outline",
	FLAGS: [TRYTAKE, NOALL, MONSTER, LIVING],
	SYNONYM: ["OUTLINE"],
	ADJECTIVE: ["AWAKE", "OUTLINE"],
	VALUE: 10,
	DESCFCN: SHAPE_F,
	ACTION: SHAPE_F
});

function SHAPE_F(_CONTEXT=null) {
    let _TBL, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            _X = asPROP("NW");
            while(true) {
                _TBL = GETP(HERE, PROP(_X));
                if(!(_TBL)) {
                    
                } else if(isEQUAL(_TBL[XDATA], OPLAIN)) {
                    break;
                }
                if(++_X > asPROP("NORTH")) {
                    /*SAY_ERROR("SHAPE-F");*/
                    return true;
                }
            }
            TELL(CA(SHAPE
), " is stretched across the ", B(DIR_NAMES[(0 - (_X - asPROP("NORTH")))]
), " plane.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_TOUCH_TO)) {
            TOUCH_SHAPE_WITH(PRSO);
            return true;
        } else if((_X = isPUTTING())) {
            if(isPRSO(PHASE)) {
                TELL(CTHEI, " flexes away from ", THEO
, PERIOD);
                return true;
            }
            PRSO_SLIDES_OFF_PRSI();
            return true;
        } else if(isVERB(V_LOOK_THRU)) {
            DISTORTED();
            return true;
        }
        return false;
    } else if((_X = isCLIMBING_ON())) {
        TELL(CTHEO
, " flexes backwards and sideways, thwarting your best efforts.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT
, V_RIP, V_CUT, V_OPEN
, V_OPEN_WITH, V_KICK, V_STOUCH_TO)) {
        TOUCH_SHAPE_WITH(PRSI);
        return true;
    } else if((_X = isTOUCHING())) {
        TOUCH_SHAPE_WITH(HANDS);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Looking directly at ", THEO
, " makes your head ache.", CR);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
        DISTORTED();
        return true;
    } else {
        return false;
    }
}

function DISTORTED() {
    TELL("The space beyond ", THE(SHAPE
), " appears hopelessly distorted.", CR);
    return true;
}

function TOUCH_SHAPE_WITH(_OBJ) {
    if(!(isEQUAL(_OBJ, PHASE))) {
        PASSES_THROUGH(_OBJ, SHAPE);
        return true;
    } else if(!(isIN(_OBJ, PLAYER))) {
        YOUD_HAVE_TO("be holding", _OBJ);
        return true;
    }
    VANISH(SHAPE);
    UNMAKE(SHAPE, LIVING);
    LAST_MONSTER = null;
    LAST_MONSTER_DIR = null;
    HUMS();
    TELL("slashes effortlessly through ", THE(SHAPE
), ". The torn edges recoil in agony, twist inside out and vanish in a toroid of collapsing geometry, leaving you with a clear path and a headache.", CR);
    UPDATE_STAT(GETP(SHAPE, "VALUE"), EXPERIENCE);
    return true;
}


function INIT_MONSTERS() {
    CRAB = CRAB();
    RAT = RAT();
    SKELETON = SKELETON();
    SNIPE = SNIPE();
    VAPOR = VAPOR();
    SPIDER = SPIDER();
    SLUG = SLUG();
    DUST = DUST();
    DORN = DORN();
    WORM = WORM();
    CROC = CROC();
    HOUND = HOUND();
    PUPP = PUPP();
    DEAD = DEAD();
    GHOUL = GHOUL();
    CORBIES = CORBIES();
    GRINDER = GRINDER();
    URGRUE = URGRUE();
    XTREES = XTREES();
    GRUE = GRUE();
    ASUCKER = ASUCKER();
    BSUCKER = BSUCKER();
    CSUCKER = CSUCKER();
    WIGHT = WIGHT();
    SHAPE = SHAPE();
}