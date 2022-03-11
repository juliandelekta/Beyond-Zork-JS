`THINGS for BEYOND ZORK: Copyright (C)1987 Infocom, Inc. All rights
 reserved.`

"*** PSEUDO OBJECTS ***"

function isHANDLE_SIGNS() {
    let _X;
    if((_X = isMOVING())) {
        TELL("Signs are for reading.", CR);
        return true;
    } else {
        return false;
    }
}

function BILLBOARD_PSEUDO() {
    MAKE(PSEUDO_OBJECT, TRYTAKE);
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        PRINT("The billboard");
        FROTZEN_SIGN();
        return true;
    } else if(isHANDLE_SIGNS()) {
        return true;
    } else {
        return false;
    }
}

function FROTZEN_SIGN() {
    TELL(" says,", CR, CR);
    HLIGHT(H_MONO);
    if(!(isEQUAL(HOST, MACINTOSH))) {
        HLIGHT(H_BOLD);
    }
    TELL("WELCOME TO THE FIELDS OF FROTZEN", CR);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    TELL(" Last sign for next 120 bloits.", CR);
    HLIGHT(H_NORMAL);
    return true;
}

"*** STANDARD OBJECTS ***"

var SUN = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "sun",
	FLAGS: [NODESC],
	SYNONYM: ["SUN", "SUNLIGHT"],
	ACTION: SUN_F
});

function SUN_F() {
    let _X;
    if((isIS(HERE, INDOORS)
  ||  isPLAIN_ROOM()
  ||  isHERE(NE_WALL))) {
        NOT_VISIBLE(SUN);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL(CTHEO, " is as bright as ever");
        if(isHERE(XROADS, ON_PIKE)) {
            TELL(", except to the ");
            if(isHERE(ON_PIKE)) {
                TELL(B("WEST"));
            } else {
                TELL(B("EAST"));
            }
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_FOLLOW)) {
        DO_WALK("SOUTH");
        return true;
    } else if(((_X = isTOUCHING())
  ||  (_X = isENTERING())
  ||  isVERB(V_LOOK_BEHIND))) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

function NOT_VISIBLE(_OBJ) {
    PCLEAR();
    TELL(CTHE(_OBJ), " isn't visible", AT_MOMENT);
    return true;
}

var SKY = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "sky",
	FLAGS: [NODESC],
	SYNONYM: ["SKY", "AIR", "CLOUDS"],
	ACTION: SKY_F
});

function SKY_F() {
    let _X;
    if(isIS(HERE, INDOORS)) {
        NOT_VISIBLE(SKY);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_LOOK_UP, V_SEARCH)) {
        if(isHERE(IN_SKY)) {
            V_LOOK();
            return true;
        }
        PERFORM("EXAMINE", SUN);
        return true;
    } else if(isVERB(V_FLY_UP, V_WALK_TO, V_ENTER, V_THROUGH, V_CLIMB_ON, V_CLIMB_UP)) {
        V_FLY();
        return true;
    } else if(isVERB(V_EXIT, V_FLY_DOWN, V_CLIMB_DOWN, V_LEAVE, V_CLIMB_DOWN)) {
        V_LAND();
        return true;
    } else if(((_X = isTOUCHING())
  ||  isVERB(V_LOOK_BEHIND, V_LAND_ON))) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var BREEZE = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "wind",
	FLAGS: [NODESC, SEEN],
	SYNONYM: ["WIND", "BREEZE", "GUST"],
	ACTION: BREEZE_F
});

function BREEZE_F() {
    let _X;
    MAKE(BREEZE, SEEN);
    if((isIS(HERE, INDOORS)
  ||  isHERE(APLANE, IN_GARDEN, IN_FROON, IN_SPLENDOR))) {
        TELL("There's no wind here to speak of.", CR);
        return RFATAL();
    } else if((_X = isSEEING())) {
        TELL("Wind is transparent.", CR);
        return true;
    } else if(isVERB(V_TOUCH)) {
        TELL(CTHE(BREEZE), " feels cool and fresh.", CR);
        return true;
    } else if(((_X = isENTERING())
  ||  (_X = isEXITING()))) {
        V_WALK_AROUND();
        return true;
    } else if((_X = isTOUCHING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var PACK = () => OBJECT({
	LOC: PLAYER,
	DESC: "pack",
	FLAGS: [TAKEABLE, CLOTHING, WORN, CONTAINER, OPENED],
	CAPACITY: 30,
	SIZE: 10,
	VALUE: 2,
	SYNONYM: ["PACK", "BACKPACK", "BAG"],
	ACTION: PACK_F
});

function PACK_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO)) {
            if(isPRSO(RUG)) {
                NEVER_FIT();
                return true;
            } else if((isPRSO(PARASOL)
  &&  isIS(PRSO, OPENED))) {
                YOUD_HAVE_TO("close");
                return true;
            }
            return false;
        }
        return false;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        ITS_ALREADY("open");
        return true;
    } else if(isVERB(V_CLOSE)) {
        TELL("It's not that type of pack.", CR);
        return true;
    } else {
        return false;
    }
}

var CELLAR_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "cellar door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE],
	SYNONYM: ["DOOR", "DOORWAY", "ZZZP", "ZZZP"],
	ADJECTIVE: ["CELLAR"],
	ACTION: CELLAR_DOOR_F
});

function CELLAR_DOOR_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_BEHIND)
  &&  isIS(PRSO, MUNGED))) {
        ITS_MUNGED("DOOR");
        return true;
    } else if(isVERB(V_CLOSE)) {
        if(isIS(PRSO, MUNGED)) {
            ITS_MUNGED("DOOR");
            return true;
        } else if(!(isIS(PRSO, OPENED))) {
            return false;
        }
        ICLOSE();
        TELL("You pull ", THEO, " shut.", CR);
        if(isHERE(AT_BOTTOM)) {
            UNMAKE(HERE, LIGHTED);
            SAY_IF_HERE_LIT();
        }
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        if(isIS(PRSO, MUNGED)) {
            ITS_MUNGED("DOOR");
            return true;
        } else if(isIS(PRSO, OPENED)) {
            return false;
        } else if((isHERE(AT_BOTTOM)
  &&  !(isIS(PRSO, LOCKED)))) {
            LOCK_CELLAR_DOOR();
            return true;
        } else if(!(PRSI)) {
            return false;
        } else if(isVERB(V_OPEN_WITH)) {
            CRASH_CELLAR_DOOR(PRSI);
            return true;
        }
        return false;
    } else if(((_X = isENTERING())
  ||  (_X = isEXITING()))) {
        if(isHERE(AT_BOTTOM)) {
            DO_WALK("UP");
            return true;
        }
        DO_WALK("DOWN");
        return true;
    } else if(isVERB(V_KICK, V_HIT, V_MUNG, V_LOOSEN, V_PUSH, V_SHAKE, V_CUT, V_KNOCK)) {
        if(isIS(PRSO, MUNGED)) {
            ITS_ALREADY("in ruins");
            return true;
        } else if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        } else if(isVERB(V_KNOCK)) {
            if(isHERE(AT_BOTTOM)) {
                TELL(YOU_HEAR, "a muffled \"Har!\"", CR);
                return true;
            }
            TELL("\"Nobody down there,\" snickers "
, THE(COOK), PERIOD);
            return true;
        }
        _X = PRSI;
        if(isVERB(V_KICK)) {
            _X = FEET;
        }
        CRASH_CELLAR_DOOR(_X);
        return true;
    } else {
        return false;
    }
}

function ITS_MUNGED(_WRD) {
    TELL("Little remains of the ", B(_WRD), PERIOD);
    return true;
}

function CRASH_CELLAR_DOOR(_OBJ=HANDS) {
    let _TBL;
    ITALICIZE("Wham");
    TELL("! Your ");
    if(isEQUAL(_OBJ, null, HANDS, ME)) {
        TELL(B("FIST"));
    } else if(isEQUAL(_OBJ, FEET)) {
        TELL(B("FOOT"));
    } else {
        TELL(D(_OBJ));
    }
    TELL(" deals ", THE(CELLAR_DOOR), " a mighty blow");
    if(STATS[STRENGTH] < 50) {
        NOTE_NOISE();
        return true;
    }
    MAKE(CELLAR_DOOR, OPENED);
    UNMAKE(CELLAR_DOOR, LOCKED);
    MAKE(CELLAR_DOOR, MUNGED);
    MAKE(AT_BOTTOM, LIGHTED);
    _TBL = GETPT(CELLAR_DOOR, "SYNONYM");
    _TBL[2] = "HOLE";
    _TBL[3] = "OPENING";
    _TBL = GETP(AT_BOTTOM, "UP");
    _TBL[XTYPE] = (CONNECT + 1);
    _TBL[XROOM] = IN_KITCHEN;
    _TBL = GETP(IN_KITCHEN, "DOWN");
    _TBL[XTYPE] = (CONNECT + 1);
    _TBL[XROOM] = AT_BOTTOM;
    _TBL = GETP(IN_KITCHEN, "IN");
    _TBL[XTYPE] = (CONNECT + 1);
    _TBL[XROOM] = AT_BOTTOM;
    TELL(", shattering it and much of ", THE(KITCHEN), " wall into splinters");
    RELOOK();
    TELL(TAB, "\"Yow,\" murmurs ");
    if(isHERE(AT_BOTTOM)) {
        TELL("an admiring voice upstairs.", CR);
        return true;
    }
    MAKE(COOK, SEEN);
    TELL(THE(COOK), ", gawking at you admiringly.", CR);
    return true;
}

function NOTE_NOISE() {
    TELL(", with little effect except for the noise.", CR);
    return true;
}

var PUB_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "front door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE],
	SYNONYM: ["DOOR", "DOORWAY"],
	ADJECTIVE: ["FRONT"]
});

var CELLAR_STAIR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "stairway",
	FLAGS: [NODESC, CONTAINER],
	SYNONYM: ["STAIR", "STAIRS", "STAIRWAY", "STEPS"],
	ACTION: CELLAR_STAIR_F
});

function CELLAR_STAIR_F() {
    let _X;
    if((!(isIS(CELLAR_DOOR, OPENED))
  &&  isHERE(IN_KITCHEN))) {
        CANT_SEE_ANY();
        return RFATAL();
    } else if(isHERE(IN_KITCHEN)) {
        
    } else if((_X = isCLIMBING_ON())) {
        if(isIS(CELLAR_DOOR, OPENED)) {
            DO_WALK("UP");
            return true;
        }
        P_IT_OBJECT = CELLAR_DOOR;
        TELL(CTHE(CELLAR_DOOR), " at the top is closed.", CR);
        return true;
    }
    return isHANDLE_STAIRS(IN_KITCHEN);
}

function isMIGHT_TRIP() {
    if(isVERB(V_PUT, V_PUT_ON, V_EMPTY_INTO, V_THROW, V_THROW_OVER)) {
        TELL("Better not. You might trip on ");
        if(isIS(PRSO, PLURAL)) {
            TELL("them");
        } else {
            TELL("it");
        }
        TELL(" later.", CR);
        return true;
    }
    return false;
}

function isHANDLE_STAIRS(_TOP) {
    let _X;
    if(!(isHERE(_TOP))) {
        _TOP = null;
    }
    if(isTHIS_PRSI()) {
        if(isMIGHT_TRIP()) {
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " leads ");
        if(isT(_TOP)) {
            TELL("down");
        } else {
            TELL("up");
        }
        TELL("ward.", CR);
        return true;
    } else if(isVERB(V_LOOK_UP)) {
        if(isT(_TOP)) {
            ALREADY_AT_TOP();
            return true;
        }
        CANT_SEE_MUCH();
        return true;
    } else if(isVERB(V_LOOK_DOWN)) {
        if(isT(_TOP)) {
            CANT_SEE_MUCH();
            return true;
        }
        ALREADY_AT_BOTTOM();
        return true;
    } else if(isVERB(V_FOLLOW, V_USE)) {
        if(isT(_TOP)) {
            DO_WALK("DOWN");
            return true;
        }
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_ON())) {
        if(isT(_TOP)) {
            ALREADY_AT_TOP();
            return true;
        }
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        if(isT(_TOP)) {
            DO_WALK("DOWN");
            return true;
        }
        ALREADY_AT_BOTTOM();
        return true;
    } else {
        return false;
    }
}

var PUB = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "tavern",
	FLAGS: [NODESC],
	SYNONYM: ["TAVERN", "PUB", "BAR", "SHANTY", "HOUSE", "LANTERN"],
	ADJECTIVE: ["BROKEN", "LANTERN", "PUBLIC", "PUBLICK"],
	ACTION: PUB_F
});

function PUB_F() {
    let _X;
    if((isHERE(IN_PUB)
  &&  HERE_F())) {
        return true;
    } else if((_X = isENTERING())) {
        DO_WALK("IN");
        return true;
    } else if(isVERB(V_EXAMINE)) {
        if(isHERE(OUTSIDE_PUB)) {
            DESCRIBE_PUB_SIGN();
            return true;
        }
        V_LOOK();
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("Mouthwatering aromas hang in the air.", CR);
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("Raucous laughter");
        PRINT(" fills the air");
        TELL(PERIOD);
        return true;
    } else {
        return false;
    }
}

var PUB_SIGN = () => OBJECT({
	LOC: OUTSIDE_PUB,
	DESC: "sign",
	FLAGS: [NODESC, READABLE, SURFACE],
	CAPACITY: 7,
	SYNONYM: ["SIGN", "WORDS", "HOOK"],
	ADJECTIVE: ["CURIOUS"],
	ACTION: PUB_SIGN_F
});

function PUB_SIGN_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_HANG_ON, V_EMPTY_INTO)) {
            if(isPRSO(LANTERN, PARASOL)) {
                if((_X = isFIRST(PRSI))) {
                    YOUD_HAVE_TO("remove", _X);
                    return true;
                } else if((isPRSO(PARASOL)
  &&  isIS(PRSO, OPENED))) {
                    YOUD_HAVE_TO("close");
                    return true;
                }
                WINDOW(SHOWING_ALL);
                MOVE(PRSO, PRSI);
                TELL("You carefully hang ", THEO);
                if(isPRSO(LANTERN)) {
                    TELL(" back");
                }
                TELL(SON, THEI, PERIOD);
                return true;
            } else if(isVERB(V_HANG_ON)) {
                return false;
            }
            PRSO_SLIDES_OFF_PRSI();
            return true;
        } else if(isVERB(V_PUT_UNDER)) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isNOUN_USED("HOOK")) {
        if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            if((_X = isFIRST(PUB_SIGN))) {
                TELL(CA(_X), " hangs from it.", CR);
                return true;
            }
            TELL(XTHE, "hook is empty.", CR);
            return true;
        } else if((_X = isMOVING())) {
            FIRMLY_ATTACHED("hook", PRSO, true);
            return true;
        }
    }
    if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        DESCRIBE_PUB_SIGN();
        return true;
    } else if(isVERB(V_PUSH, V_TOUCH, V_SWING, V_SHAKE, V_PULL, V_LOOK_BEHIND)) {
        TELL(CTHEO, " swings back and forth for a moment.", CR);
        return true;
    } else if((_X = isMOVING())) {
        FIRMLY_ATTACHED(PRSO, PUB);
        return true;
    } else {
        return false;
    }
}

var LANTERN = () => OBJECT({
	LOC: PUB_SIGN,
	DESC: "lantern",
	SDESC: DESCRIBE_LANTERN,
	FLAGS: [TAKEABLE, OPENED, FERRIC],
	SIZE: 7,
	VALUE: 2,
	SYNONYM: ["LANTERN", "LAMP", "LIGHT", "SWITCH", "BATTERY"],
	ADJECTIVE: ["LIGHT", "LAMP", "RUSTY", "RUSTED", "DARK", "ZZZP"],
	ACTION: LANTERN_F
});


function LANTERN_F() {
    let _TBL, _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            ITS_SEALED(LANTERN);
            return true;
        }
        return false;
    } else if(isNOUN_USED("BATTERY")) {
        if(((_TBL = isSEEING())
  ||  (_TBL = isMOVING())
  ||  isVERB(V_REPAIR, V_REPLACE))) {
            ITS_SEALED(LANTERN);
            return true;
        }
    } else if(isNOUN_USED("SWITCH")) {
        if((_TBL = isMOVING())) {
            FIRMLY_ATTACHED("switch", PRSO, true);
            return true;
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL(CTHEO, "'s switch is o");
            if(isIS(PRSO, OPENED)) {
                TELL("ff.", CR);
                return true;
            }
            TELL("n.", CR);
            return true;
        }
    }
    if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL(CTHEO);
        if(isIS(PRSO, MUNGED)) {
            TELL(" is broken beyond repair.", CR);
            return true;
        }
        TELL(" looks ");
        if(isIS(PRSO, MAPPED)) {
            /*"Renewed?"*/
            TELL("good as new");
        } else {
            TELL("much as you'd expect it to after years of hanging outdoors");
        }
        if(isIS(PRSO, LIGHTED)) {
            TELL(". Its glow is ");
            if(LAMP_LIFE > 20) {
                TELL("bright and strong.", CR);
                return true;
            } else if(LAMP_LIFE > 10) {
                TELL("a bit dim.", CR);
                return true;
            }
            TELL("fading rapidly");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_OPEN, V_UNPLUG)) {
        ITS_SEALED(LANTERN);
        return true;
    } else if(isVERB(V_LAMP_ON, V_USE)) {
        if(!(isIS(PRSO, OPENED))) {
            ITS_SWITCHED("ON");
            return true;
        } else if(isCANT_REACH_LANTERN()) {
            return true;
        }
        UNMAKE(PRSO, OPENED);
        ITALICIZE("Click");
        TELL(". ");
        if((isIS(PRSO, MUNGED)
        ||  !(LAMP_LIFE))) {
            TELL("Nothing happens.", CR);
            return true;
        }
        TELL(CTHEO, " emits a ");
        if(LAMP_LIFE > 20) {
            TELL("brilliant");
        } else {
            TELL("feeble");
        }
        TELL(" glow.", CR);
        LIGHT_LANTERN();
        return true;
    } else if(isVERB(V_LIGHT_WITH)) {
        if(isEQUAL(PRSI, null, HANDS)) {
            PERFORM("LAMP-ON", PRSO);
            return true;
        }
        TELL(CANT, "light ", THEO, WITH, THEI, PERIOD);
        return true;
    } else if(isVERB(V_LAMP_OFF)) {
        if(isIS(PRSO, OPENED)) {
            ITS_SWITCHED("OFF");
            return true;
        } else if(isCANT_REACH_LANTERN()) {
            return true;
        }
        MAKE(PRSO, OPENED);
        ITALICIZE("Click");
        TELL(". ");
        if(isIS(PRSO, LIGHTED)) {
            TELL(CTHEO, " goes out.", CR);
            LANTERN_OUT();
            return true;
        }
        TELL("You switch off ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_MUNG, V_HIT, V_KICK)) {
        if(isIS(PRSO, MUNGED)) {
            TELL("It's already broken enough.", CR);
            return true;
        }
        ITALICIZE("Bang");
        TELL("! You smash ", THEO, WITH);
        if((isVERB(V_KICK)
  ||  isPRSI(FEET))) {
            TELL(D(FEET));
        } else if(isEQUAL(PRSI, null, HANDS)) {
            TELL("your fist");
        } else {
            TELL(THEI);
        }
        PRINT(PERIOD);
        BREAK_LANTERN();
        return true;
    } else if((isVERB(V_THROW)
  &&  !(isIS(PRSO, MUNGED)))) {
        ITALICIZE("Smash");
        TELL("!", CR);
        BREAK_LANTERN();
        return true;
    } else if((isVERB(V_REPAIR)
  &&  isIS(PRSO, MUNGED))) {
        TELL("You're not a member of the Guild of Lanternmakers.", CR);
        return true;
    } else {
        return false;
    }
}

function ITS_SWITCHED(_WRD) {
    TELL("It's already switched ", B(_WRD), PERIOD);
    return true;
}

function isCANT_REACH_LANTERN() {
    let _L;
    _L = LOC(LANTERN);
    if(isEQUAL(_L, PLAYER, LOC(PLAYER))) {
        return false;
    } else if(isIS(_L, SURFACE)) {
        return false;
    }
    TAKE_FIRST(LANTERN, _L);
    return true;
}

function LIGHT_LANTERN() {
    WINDOW((SHOWING_INV + SHOWING_ROOM));
    if(isNO_LANTERN_HERE()) {
        return true;
    }
    QUEUE(I_LANTERN);
    isREPLACE_ADJ(LANTERN, "DARK", "LIGHTED");
    LIGHT_ROOM_WITH(LANTERN);
    return true;
}

function isNO_LANTERN_HERE() {
    let _LEN;
    if(!(isIS(URGRUE, LIVING))) {
        return false;
    } else if(isIN(GRUE, HERE)) {
        EXUENT_MONSTER(GRUE);
    }
    if(isGRUE_ROOM()) {
        VANISH(LANTERN);
        TELL(TAB);
        KERBLAM();
        TELL("A bolt of lightning ");
        if(!(isHERE(IN_LAIR))) {
            TELL("zigzags down the passageways, ");
        }
        TELL("strikes your lantern and blows it into little, tiny bits.", CR);
        if(isIS(LANTERN, LIGHTED)) {
            LANTERN_OUT();
        }
        CHUCKLE();
        return true;
    } else {
        return false;
    }
}

function LANTERN_OUT() {
    WINDOW(SHOWING_ALL);
    UNMAKE(LANTERN, LIGHTED);
    DEQUEUE(I_LANTERN);
    isREPLACE_ADJ(LANTERN, "LIGHTED", "DARK");
    SAY_IF_HERE_LIT();
    return true;
}

function BREAK_LANTERN() {
    UNMAKE(PRSO, SEEN);
    MAKE(LANTERN, MUNGED);
    WINDOW(SHOWING_ALL);
    isREPLACE_ADJ(LANTERN, "ZZZP", "BROKEN");
    if(isIS(LANTERN, LIGHTED)) {
        LANTERN_OUT();
    }
    return true;
}

var GRUBBO = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "village",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["VILLAGE", "TOWN", "GRUBBO"],
	ACTION: GRUBBO_F
});

function GRUBBO_F() {
    let _X;
    if(!(isHERE(HILLTOP, N_MOOR, AT_LEDGE))) {
        return HERE_F();
    } else if((_X = isENTERING())) {
        _X = "EAST";
        if(isHERE(N_MOOR)) {
            _X = "NORTH";
        } else if(isHERE(AT_LEDGE)) {
            _X = "SW";
        }
        DO_WALK(_X);
        return true;
    } else if((_X = isSEEING())) {
        CANT_SEE_MUCH();
        return true;
    } else {
        return false;
    }
}

var SHILL = () => OBJECT({
	DESC: "shillelagh",
	SDESC: DESCRIBE_SHILL,
	FLAGS: [NODESC, TAKEABLE, WEAPON, NAMEABLE],
	SYNONYM: ["SHILLELAGH", "ZZZP", "CUDGEL", "CLUB", "DRIFTWOOD", "WOOD", "PIECE"],
	SIZE: 5,
	EFFECT: 40,
	EMAX: 40,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DESCRIBE_WEAPONS,
	ACTION: SHILL_F
});


"BUOYANT = queue flag, NODESC = appearance delay."

function SHILL_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_TOUCH, V_SWING, V_SHAKE)) {
        TELL("Feels hefty.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Years of drifting on the open sea have toughened this stout club into a formidable skull-basher.", CR);
        return true;
    } else if((isVERB(V_WHAT)
  &&  isNOUN_USED("SHILLELAGH"))) {
        TELL("It's a club.", CR);
        return true;
    } else if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(ITAKE()) {
            TELL(XTHE, B("DRIFTWOOD"
), " begins to float out of reach as you bend over the side of the wharf. You strain your arm lower towards the water, lower... got it!", CR);
            GET_SHILL();
        }
        return true;
    } else {
        return false;
    }
}

function GET_SHILL() {
    MAKE(SHILL, TOUCHED);
    DEQUEUE(I_SHILL);
    MAKE(SALT, SEEN);
    TELL(TAB, "\"Found yerself a genu-ine ", D(SHILL), " there, ");
    BOY_GIRL();
    TELL(",\" remarks the artist");
    if(isIN(SHILL, PLAYER)) {
        TELL(" as you shake off the seawater");
    }
    TELL(". \"Come in handy nowadays.\"", CR);
    return true;
}

var SWORD = () => OBJECT({
	LOC: WCASE,
	DESC: "longsword",
	SDESC: DESCRIBE_SWORD,
	FLAGS: [TAKEABLE, TOOL, FERRIC, WEAPON, NAMEABLE],
	SYNONYM: ["SWORD", "ZZZP", "LONGSWORD", "BLADE", "WEAPON"],
	ADJECTIVE: ["ELVISH", "ELVIN", "LONG"],
	SIZE: 7,
	EFFECT: 85,
	EMAX: 85,
	VALUE: 100,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DESCRIBE_WEAPONS,
	ACTION: SWORD_F
});


function SWORD_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("It's of elvish workmanship.", CR);
        return true;
    } else {
        return false;
    }
}

var AXE = () => OBJECT({
	LOC: WCASE,
	DESC: "battleaxe",
	SDESC: DESCRIBE_AXE,
	FLAGS: [TAKEABLE, TOOL, FERRIC, WEAPON, NAMEABLE],
	SYNONYM: ["AXE", "ZZZP", "AX", "BATTLEAXE", "WEAPON"],
	ADJECTIVE: ["BATTLE"],
	SIZE: 7,
	EFFECT: 75,
	EMAX: 75,
	VALUE: 40,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DESCRIBE_WEAPONS,
	ACTION: AXE_F
});


function AXE_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Just the thing for cleaving briskets, and other inconveniences.", CR);
        return true;
    } else {
        return false;
    }
}

var DAGGER = () => OBJECT({
	DESC: "dagger",
	SDESC: DESCRIBE_DAGGER,
	FLAGS: [NODESC, TAKEABLE, WEAPON, TOOL, MUNGED, FERRIC, NAMEABLE],
	SYNONYM: ["DAGGER", "ZZZP", "KNIFE", "BLADE", "WEAPON"],
	ADJECTIVE: ["RUSTY", "RUSTED"],
	SIZE: 2,
	EFFECT: 30,
	EMAX: 30,
	VALUE: 5,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DESCRIBE_WEAPONS,
	ACTION: DAGGER_F
});


function DAGGER_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It's a very basic ", PRSO, " with a ");
        if(isIS(PRSO, MUNGED)) {
            TELL(B("RUSTY"));
        } else {
            TELL("razor-sharp");
        }
        TELL(" blade.", CR);
        return true;
    } else {
        return false;
    }
}

var PUBWALL = () => OBJECT({
	LOC: IN_PUB,
	DESC: "wall",
	FLAGS: [NODESC, SURFACE],
	SYNONYM: ["WALL"],
	ACTION: PUBWALL_F
});

function PUBWALL_F() {
    let _X;
    if(isVERB(V_EMPTY, V_TAKE)) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE, V_SEARCH)) {
        if((_X = isFIRST(PRSO))) {
            TELL(CA(_X), " is imbedded there.", CR);
            return true;
        }
        return false;
    }
    return isHANDLE_WALLS();
}

var BOTTLE = () => OBJECT({
	LOC: BARRELTOP,
	DESC: "wine bottle",
	FLAGS: [TAKEABLE, CONTAINER, OPENABLE],
	SYNONYM: ["BOTTLE", "WINE", "LABEL", "BLANC", "MAILBOX", "HOUSE"],
	ADJECTIVE: ["RED", "GRAY", "GREY", "WINE", "CHATEAU", "WHITE"],
	SIZE: 5,
	CAPACITY: 4,
	VALUE: 5,
	ACTION: BOTTLE_F
});

"SEEN = tried opening box."

function BOTTLE_F() {
    let _C=0;
    if(isNOUN_USED("MAILBOX")) {
        if(!(isLIT)) {
            
        } else if(isTHIS_PRSI()) {
            
        } else if(isVERB(V_OPEN)) {
            if(!(isIS(PRSO, SEEN))) {
                MAKE(PRSO, SEEN);
                TELL("Opening the small mailbox reveals a leaflet", PTAB);
                KERBLAM();
                TELL("An Implementor appears in a dazzling flash! He slams the mailbox on "
, THE(BOTTLE
), " shut, wags a disapproving finger and disappears before you can speak or move.", CR);
                return true;
            }
            TELL(CANT, "open the ");
            PRINT("mailbox on the bottle's label");
            TELL(PERIOD);
            return RFATAL();
        }
        USELESS("mailbox on the bottle's label", true);
        return RFATAL();
    } else if(isSEE_COLOR()) {
        ++_C
        if((isADJ_USED("GRAY", "GREY", "WHITE")
  &&  !(isNOUN_USED("HOUSE")))) {
            TELL(XTHE, "wine in ", THE(BOTTLE
), " is red, not gray.", CR);
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_LOOK_THRU)) {
            if(isPRSO(PRSI, ME, HEAD)) {
                IMPOSSIBLE();
                return true;
            }
            TELL("When viewed through ", THEI, ", ");
            if(isPRSO(AMULET)) {
                if(!(AMULET_WORD)) {
                    SETUP_AMULET();
                }
                WINDOW(SHOWING_ALL);
                TELL("the word \"");
                PRINT_TABLE(GETP(AMULET, "NAME-TABLE"));
                TELL("\" stands out clearly against the swirls and flourishes of the "
, AMULET, PERIOD);
                return true;
            }
            TELL(THEO, " appears ");
            if(isT(_C)) {
                TELL("pale and ruddy.", CR);
                return true;
            }
            TELL("gray and muddy.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_INSIDE, V_SEARCH)) {
        if(isVERB(V_EXAMINE, V_READ)) {
            TELL(XTHE, "words \"");
            ITALICIZE("Chateau Blanc 877");
            TELL(", bottled by ");
            FROBOZZ("Wine");
            TELL(", Ltd\" appear on ", THEO
, "'s label, above a picture of a white house with a small mailbox.");
            if(isVERB(V_READ)) {
                CRLF();
                return true;
            }
            TELL(C(SP));
        }
        TELL("A pale ");
        if(isT(_C)) {
            TELL(B("RED"));
        } else {
            TELL(B("GRAY"));
        }
        TELL(" liquid swishes around inside. You can see right through it.", CR);
        return true;
    } else if(isVERB(V_SHAKE, V_SPIN)) {
        TELL(XTHE);
        if(isT(_C)) {
            TELL(B("RED"));
        } else {
            TELL(B("GRAY"));
        }
        TELL(" liquid in ", THEO, " swishes around.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_DRINK, V_DRINK_FROM)) {
        TELL(CTHEO, " is tightly corked.", CR);
        return true;
    } else if(isVERB(V_OPEN_WITH)) {
        TELL("You'll never open ", THEO, WITH, THEI
, ". Only a corkscrew will do.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
        PRSO_SHATTER();
        TELL(", and wine ");
        PRINT("splashes all over the place.|");
        return true;
    } else if((isVERB(V_SPIN)
  &&  isEQUAL(P_PRSA_WORD, "SPIN"))) {
        TELL("Lonely?", CR);
        return true;
    } else {
        return false;
    }
}

var CRATES = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "stack of crates",
	FLAGS: [NODESC],
	SYNONYM: ["STACK", "PILE", "HEAP", "BOXES", "CRATES", "CRATE", "SPIRAL"],
	ADJECTIVE: ["WINE"],
	ACTION: CRATES_F
});

function CRATES_F() {
    if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_OPEN, V_OPEN_WITH)) {
        TELL("They're all empty.", CR);
        return true;
    } else if(isVERB(V_SHAKE, V_KICK, V_PUSH)) {
        TELL(CTHEO, " sways dangerously back and forth.", CR);
        return true;
    } else if(isHANDLE_STAIRS(BARRELTOP)) {
        return true;
    } else {
        return false;
    }
}

var AMULET = () => OBJECT({
	LOC: SKELETON,
	DESC: "amulet",
	SDESC: DESCRIBE_AMULET,
	FLAGS: [VOWEL, TAKEABLE, CLOTHING, FERRIC],
	SIZE: 1,
	VALUE: 12,
	SYNONYM: ["ZZZP", "AMULET", "CHAIN", "RUNES", "RUNE", "SWIRLS", "FLOURISHES", "STARS", "STAR"],
	ADJECTIVE: ["ZZZP", "DARK", "GREEN", "RED"],
	NAME_TABLE: 0,
	ACTION: AMULET_F
});


var AMULET_STARS/*NUMBER*/ = 3;
var AMULET_WORD = null;

function SETUP_AMULET() {
    let _TBL;
    _TBL = PICK_ONE(MAGIC_WORDS);
    _TBL[2] = 1;
    AMULET_WORD = _TBL[0];
    PUTP(AMULET, "NAME-TABLE", _TBL[1]);
    GETPT(AMULET, "SYNONYM")[0] = AMULET_WORD;
    GETPT(AMULET, "ADJECTIVE")[0] = AMULET_WORD;
    MAKE(AMULET, NAMED);
    MAKE(AMULET, IDENTIFIED);
    MAKE(AMULET, PROPER);
    return false;
}

function AMULET_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((isNOUN_USED("STARS", "STAR")
  ||  isADJ_USED("SILVER"))) {
        if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
            if(isT(AMULET_TIMER)) {
                if(AMULET_STARS > 1) {
                    PRINT("One of the stars");
                } else {
                    PRINT("The star");
                }
                PRINT(" on the amulet ");
                TELL("is glowing.", CR);
                return true;
            }
            PRINT("The star");
            if(!(isEQUAL(AMULET_STARS, 1))) {
                TELL("s");
            }
            PRINT(" on the amulet ");
            TELL("twinkle");
            if(isEQUAL(AMULET_STARS, 1)) {
                TELL("s");
            }
            TELL(" with hidden power.", CR);
            return true;
        } else if((_X = isMOVING())) {
            PRINT("The star");
            if(AMULET_STARS > 1) {
                TELL("s are ");
            } else {
                TELL(SIS);
            }
            ETCHED();
            return true;
        }
    } else if((isNOUN_USED("SWIRLS", "FLOURISHES")
  ||  isADJ_USED("RED"))) {
        if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
            TELL(XTHE);
            SAY_RED();
            PRINT(" swirls and flourishes");
            TELL(" are skillfully wrought.", CR);
            return true;
        } else if((_X = isMOVING())) {
            TELL(XTHE, "swirls are ");
            ETCHED();
            return true;
        }
    } else if((isNOUN_USED("RUNES", "RUNE")
  ||  isADJ_USED("GREEN"))) {
        if(isVERB(V_READ, V_EXAMINE, V_LOOK_ON)) {
            READ_RUNES();
            return true;
        } else if((_X = isMOVING())) {
            TELL(XTHE, "runes are ");
            ETCHED();
            return true;
        }
    }
    if(isSTRANGLE(AMULET)) {
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " is inscribed with ");
        SAY_GREEN();
        TELL(" runes, ");
        PRINT("confusingly intertwined with ");
        SAY_RED();
        PRINT(" swirls and flourishes");
        if(AMULET_STARS > 0) {
            TELL(AND);
            if(isEQUAL(AMULET_STARS, 1)) {
                TELL("a shiny star.", CR);
                return true;
            } else if(isEQUAL(AMULET_STARS, 2)) {
                TELL(B("TWO"));
            } else {
                TELL(B("THREE"));
            }
            TELL(" shiny stars");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_READ)) {
        READ_RUNES();
        return true;
    } else if((isVERB(V_SAY, V_YELL)
  &&  isT(AMULET_WORD)
  &&  isNOUN_USED(AMULET_WORD))) {
        SAY_AMULET_WORD();
        return true;
    } else if((isVERB(V_WEAR)
  &&  isT(AMULET_TIMER)
  &&  !(isIS(PRSO, WORN)))) {
        PUTON();
        MEGA_STRENGTH();
        return true;
    } else if((isVERB(V_TAKE_OFF)
  &&  isT(AMULET_TIMER)
  &&  isIN(PRSO, PLAYER)
  &&  isIS(PRSO, WORN))) {
        TAKEOFF();
        NORMAL_STRENGTH();
        return true;
    } else {
        return false;
    }
}

function isSTRANGLE(_OBJ) {
    let _X;
    if(((_X = isTOUCHING())
  &&  !(isIS(SKELETON, SEEN)))) {
        MAKE(SKELETON, SEEN);
        CHOKE = PERCENT(20, STATS[ENDURANCE]);
        if(!(CHOKE)) {
            ++CHOKE
        }
        QUEUE(I_STRANGLE);
        WINDOW(SHOWING_ROOM);
        LAST_MONSTER = SKELETON;
        LAST_MONSTER_DIR = null;
        P_IT_OBJECT = SKELETON;
        P_HIM_OBJECT = SKELETON;
        TELL("You reach down to touch ", THE(_OBJ), "..", PTAB);
        CLAMP();
        BMODE_ON();
        UPDATE_STAT((0 - CHOKE));
        return true;
    } else {
        return false;
    }
}

function CLAMP() {
    ITALICIZE("Snap");
    TELL("! Ten bony fingers clamp around your throat!", CR);
    return true;
}

function ETCHED() {
    TELL("permanently etched onto the ", PRSO, PERIOD);
    return true;
}

function READ_RUNES() {
    TELL(XTHE);
    SAY_GREEN();
    TELL(" runes are hard to see. They're ");
    PRINT("confusingly intertwined with ");
    TELL(LTHE);
    SAY_RED();
    PRINT(" swirls and flourishes");
    TELL(" on the ", PRSO, PERIOD);
    return true;
}

function SAY_RED() {
    if(isSEE_COLOR()) {
        TELL(B("RED"));
        return false;
    }
    TELL(B("GRAY"));
    return false;
}

function SAY_GREEN() {
    if(isSEE_COLOR()) {
        TELL(B("GREEN"));
        return false;
    }
    TELL(B("GRAY"));
    return false;
}

function SAY_AMULET_WORD() {
    if(!(AMULET_STARS)) {
        
    } else if(isIS(AMULET, NEUTRALIZED)) {
        
    } else if(isNO_MAGIC_HERE(AMULET)) {
        return true;
    } else if(isVISIBLE(AMULET)) {
        if(isT(AMULET_TIMER)) {
            STAR_FADES(true);
            STOP_AMULET();
            if(isWEARING_MAGIC(AMULET)) {
                NORMAL_STRENGTH();
            }
            return true;
        } else if(AMULET_STARS > 1) {
            PRINT("One of the stars");
        } else {
            PRINT("The star");
        }
        PRINT(" on the amulet ");
        TELL("begins to glow.", CR);
        PUTP(AMULET, "VALUE", (GETP(AMULET, "VALUE") - 3));
        if(isWEARING_MAGIC(AMULET)) {
            MEGA_STRENGTH();
        }
        LIGHT_ROOM_WITH(AMULET);
        AMULET_TIMER = 3;
        QUEUE(I_AMULET);
        return true;
    }
    NOTHING_HAPPENS(null);
    return true;
}

function MEGA_STRENGTH() {
    let _S;
    _S = STATS[STRENGTH];
    if(_S < 2) {
        _S = 9;
    } else {
        _S = (9 * _S);
    }
    TELL(TAB, "A pulse of energy surges through your muscles!", CR);
    UPDATE_STAT(_S, STRENGTH);
    return true;
}

function NORMAL_STRENGTH() {
    let _S, _MAX;
    TELL(TAB, "The tension in your muscles subsides.", CR);
    _S = STATS[STRENGTH];
    _MAX = MAXSTATS[STRENGTH];
    if(_S > _MAX) {
        UPDATE_STAT((0 - (_S - _MAX)), STRENGTH);
    }
    return true;
}

function STOP_AMULET() {
    DEQUEUE(I_AMULET);
    AMULET_TIMER = 0;
    UNMAKE(AMULET, LIGHTED);
    if(--AMULET_STARS < 1) {
        AMULET_STARS = 0;
        isREPLACE_SYN(AMULET, "STAR", "ZZZP");
        isREPLACE_SYN(AMULET, "STARS", "ZZZP");
        isREPLACE_ADJ(AMULET, "SILVER", "ZZZP");
    }
    if(isVISIBLE(AMULET)) {
        SAY_IF_HERE_LIT();
    }
    return false;
}

var KITCHEN = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "kitchen",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["KITCHEN"],
	ACTION: KITCHEN_F
});

function KITCHEN_F() {
    let _X;
    if(isHERE(IN_KITCHEN)) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isENTERING())) {
        DO_WALK("WEST");
        return true;
    } else {
        return false;
    }
}

function TEARS_PARASOL() {
    let _WRD1, _WRD2;
    _WRD1 = "OPENED";
    _WRD2 = "OPEN";
    if(!(isIS(PARASOL, OPENED))) {
        _WRD1 = "CLOSED";
    }
    isREPLACE_ADJ(PARASOL, _WRD1, "BROKEN");
    MAKE(PARASOL, MUNGED);
    UNMAKE(PARASOL, OPENED);
    UNMAKE(PARASOL, VOWEL);
    UNMAKE(PARASOL, BUOYANT);
    PUTP(PARASOL, "VALUE", 0);
    TELL(" tears ", THE(PARASOL), " from your grasp a little too soon");
    return false;
}

var CROWN = () => OBJECT({
	LOC: CRAB,
	DESC: "tiny crown",
	FLAGS: [TAKEABLE, FERRIC],
	SIZE: 1,
	VALUE: 20,
	SYNONYM: ["CROWN", "TREASURE"],
	ADJECTIVE: ["TINY", "GOLD", "GOLDEN"],
	ACTION: CROWN_F
});

function CROWN_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("The tiny crown ");
        if(isIN(PRSO, CRAB)) {
            TELL("on the crab's head ");
        }
        TELL("is exquisitely wrought in what appears to be solid gold.", CR);
        return true;
    } else if(isVERB(V_WEAR, V_USE)) {
        TELL("Your head is too fat.", CR);
        return true;
    } else {
        return false;
    }
}

var GREAT_SEA = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "sea",
	FLAGS: [NODESC, CONTAINER, OPENED],
	SYNONYM: ["SEA", "OCEAN", "WATER", "WAVES"],
	ADJECTIVE: ["GREAT", "FLATHEAD"],
	ACTION: GREAT_SEA_F
});

function GREAT_SEA_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WATER_VANISH();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " stretches east");
        PRINT(" as far as you can see");
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_LOOK_UNDER, V_SEARCH)) {
        PRINT("Little can be seen ");
        TELL("in the foamy waters.", CR);
        return true;
    } else if((_X = isENTERING())) {
        DO_WALK("EAST");
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if((_X = isTOUCHING())) {
        TELL(CANT, "reach the water from here.", CR);
        return true;
    } else {
        return false;
    }
}

var ACCARDI = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Accardi-by-the-Sea",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["ACCARDI", "ACCARDI\-BY\-THE\-SEA", "VILLAGE", "TOWN"],
	ACTION: ACCARDI_F
});

function ACCARDI_F() {
    let _X;
    if(isHERE(IN_ACCARDI)) {
        return HERE_F();
    } else if((_X = isENTERING())) {
        _X = "WEST";
        if(isHERE(IN_HALL)) {
            _X = "SOUTH";
        } else if(isHERE(AT_BRINE)) {
            _X = "NE";
        }
        DO_WALK(_X);
        return true;
    } else {
        return false;
    }
}

var TOWER = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "lighthouse",
	FLAGS: [NODESC],
	SYNONYM: ["LIGHTHOUSE", "HOUSE"],
	ADJECTIVE: ["LIGHT"],
	ACTION: TOWER_F
});

function TOWER_F() {
    let _X;
    if((_X = isCLIMBING_ON())) {
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        DO_WALK("DOWN");
        return true;
    } else if(HERE_F()) {
        return true;
    } else {
        return false;
    }
}

var TOWER_STEPS = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "steps",
	FLAGS: [NODESC, PLURAL],
	SYNONYM: ["STEPS", "STAIR", "STAIRS", "STAIRWAY"],
	ACTION: TOWER_STEPS_F
});

function TOWER_STEPS_F() {
    if(isTHIS_PRSI()) {
        if(isMIGHT_TRIP()) {
            return true;
        }
        return false;
    } else if(isVERB(V_CLIMB_ON, V_CLIMB_UP, V_CLIMB_OVER)) {
        DO_WALK("UP");
        return true;
    } else if(isVERB(V_CLIMB_DOWN)) {
        DO_WALK("DOWN");
        return true;
    } else if(isVERB(V_COUNT)) {
        TELL("There are fewer than 69,105 steps.", CR);
        return true;
    } else if(isVERB(V_LOOK_UP, V_LOOK_DOWN)) {
        CANT_SEE_MUCH();
        return true;
    } else {
        return false;
    }
}

var BOUTIQUE_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE],
	SYNONYM: ["DOOR", "DOORWAY"],
	ADJECTIVE: ["FRONT", "BOUTIQUE", "SHOP", "STORE"]
});

var BOUTIQUE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "boutique",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["BOUTIQUE", "SHOP", "STORE", "BUILDING"],
	ACTION: BOUTIQUE_F
});

function BOUTIQUE_F() {
    let _X;
    if(isHERE(IN_BOUTIQUE)) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isENTERING())) {
        DO_WALK("NORTH");
        return true;
    } else {
        return false;
    }
}

var GONDOLA = () => OBJECT({
	LOC: AT_DOCK,
	DESC: "gondola",
	FLAGS: [NODESC, VEHICLE, CONTAINER, OPENED],
	SYNONYM: ["GONDOLA", "SKYWAY", "SKYCAR", "CAR", "RIDE"],
	CAPACITY: 100,
	ACTION: GONDOLA_F
});

function GONDOLA_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        _OBJ = PRSO;
        if(isTHIS_PRSI()) {
            _OBJ = PRSI;
        }
        if(isEQUAL(_CONTEXT, M_BEG)) {
            return isCANT_REACH_WHILE_IN(_OBJ, GONDOLA);
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isIN(PLAYER, GONDOLA)) {
                return false;
            } else if(!(_OBJ)) {
                return false;
            } else if((_X = isTOUCHING())) {
                YOUD_HAVE_TO("board", GONDOLA);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(((_X = isENTERING())
  &&  !(isIN(PLAYER, PRSO)))) {
        if((isHERE(AT_DOCK)
  &&  isEQUAL(GON, 0, 1, 14))) {
            TELL("\"Wait yer turn, ");
            if(isIS(PLAYER, FEMALE)) {
                TELL(B("LADY"));
            } else {
                TELL("buddy");
            }
            TELL(",\" growls a passenger in front of you.", CR);
            return true;
        }
        OLD_HERE = null;
        P_WALK_DIR = null;
        WINDOW(SHOWING_ROOM);
        MOVE(WINNER, PRSO);
        UNMAKE(PRSO, NODESC);
        if(isHERE(AT_DOCK)) {
            TELL("You shove your way ");
        } else {
            PRINT("Children tug their parents' sleeves and point as you clamber ");
        }
        TELL("into ", THEO);
        RELOOK();
        return true;
    } else if(((_X = isEXITING())
  &&  isIN(PLAYER, PRSO))) {
        MAKE(PRSO, NODESC);
        if(isHERE(OVER_JUNGLE)) {
            JUNGLE_JUMP();
            return true;
        }
        OLD_HERE = null;
        P_WALK_DIR = null;
        WINDOW(SHOWING_ROOM);
        MOVE(WINNER, HERE);
        if(isHERE(AT_DOCK)) {
            PRINT("You push your way ");
            TELL("out of ", THEO);
            RELOOK();
            return true;
        }
        PRINT("Children tug their parents' sleeves and point as you clamber ");
        PRINT("over the gondola's edge");
        RELOOK();
        TELL(TAB
, "\"Passengers will please remain seated,\" drones ", THE(CONDUCTOR), PERIOD);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL("A decal on the side says, \"");
        FROBOZZ("Gondola");
        TELL(PERQ);
        return true;
    } else {
        return false;
    }
}

function JUNGLE_JUMP() {
    PRINT("Children tug their parents' sleeves and point as you clamber ");
    PRINT("over the gondola's edge");
    TELL(", and plummet to your death in the jungle far below");
    JIGS_UP();
    return false;
}

var DGONDOLA = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "gondola",
	FLAGS: [NODESC],
	SYNONYM: ["GONDOLA", "RIDE", "SKYWAY", "SKYCAR", "CAR"],
	ACTION: DGONDOLA_F
});

function DGONDOLA_F() {
    let _X;
    if(((_X = isTOUCHING())
  ||  (_X = isCLIMBING_ON()))) {
        TELL(CTHE(DGONDOLA), " is too far away now.", CR);
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isSEEING())) {
        CANT_SEE_MUCH();
        return true;
    } else {
        return false;
    }
}

var SUPPORT = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "support tower",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["TOWER", "SUPPORT", "GIRDER", "GIRDERS", "LADDER"],
	ADJECTIVE: ["SUPPORT", "STEEL", "SKINNY"],
	ACTION: SUPPORT_F
});

function SUPPORT_F() {
    let _X;
    if((_X = isCLIMBING_ON())) {
        if(isHERE(OVER_JUNGLE)) {
            CANT_FROM_HERE();
            return true;
        } else if(isIN(PLAYER, GONDOLA)) {
            PERFORM("EXIT", GONDOLA);
            return true;
        }
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        if(isHERE(OVER_JUNGLE)) {
            CANT_FROM_HERE();
            return true;
        } else if(isIN(PLAYER, GONDOLA)) {
            NOT_ON(SUPPORT);
            return true;
        }
        DO_WALK("DOWN");
        return true;
    } else if(isHERE(OVER_JUNGLE)) {
        if((_X = isTOUCHING())) {
            CANT_FROM_HERE();
            return true;
        } else if((_X = isSEEING())) {
            CANT_SEE_MUCH();
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var DOCK = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "loading dock",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["DOCK", "GATE"],
	ADJECTIVE: ["LOADING", "ENTRY", "ENTRANCE"],
	ACTION: DOCK_F
});

function DOCK_F() {
    let _X;
    if(isHERE(AT_DOCK)) {
        return HERE_F();
    } else if((_X = isTOUCHING())) {
        CANT_FROM_HERE();
    } else if((_X = isSEEING())) {
        CANT_SEE_MUCH();
        return true;
    } else {
        return false;
    }
}

var ZBRIDGE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "bridge",
	FLAGS: [NODESC, SURFACE],
	SYNONYM: ["BRIDGE", "ROPES"],
	ADJECTIVE: ["ROPE", "LONG", "NARROW"],
	ACTION: ZBRIDGE_F
});

function ZBRIDGE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(((_X = isPUTTING())
  ||  isVERB(V_HANG_ON))) {
            VANISH();
            TELL(CTHEO);
            if(isPRSO(PARASOL, LANTERN)) {
                TELL(" dangles uncertainly for a moment,");
            }
            TELL(" falls off the slippery ropes and plummets into the roaring water.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The long, narrow ", D(PRSO), " leads ");
        if(isHERE(ON_BRIDGE, SFORD)) {
            TELL(B("NORTH"));
            if(isHERE(ON_BRIDGE)) {
                TELL(AND, B("SOUTH"));
            }
        } else {
            TELL(B("SOUTH"));
        }
        TELL(" across the roaring water.", CR);
        return true;
    } else if(isVERB(V_ENTER, V_STAND_ON, V_WALK_TO)) {
        if(isHERE(ON_BRIDGE)) {
            ALREADY_ON();
            return true;
        } else if(isHERE(SFORD)) {
            DO_WALK("NORTH");
            return true;
        }
        DO_WALK("SOUTH");
        return true;
    } else if((_X = isCLIMBING_ON())) {
        _X = "NORTH";
        if(isHERE(SFORD)) {
            
        } else if((isHERE(ON_BRIDGE)
  &&  isEQUAL(GETP(HERE, "DNUM"), "North"))) {
            
        } else {
            _X = "SOUTH";
        }
        DO_WALK(_X);
        return true;
    } else if((isJUMPING_OFF()
  ||  isVERB(V_STAND_UNDER))) {
        DO_WALK("DOWN");
        return true;
    } else if((_X = isEXITING())) {
        if(!(isHERE(ON_BRIDGE))) {
            NOT_ON();
            return true;
        }
        V_WALK_AROUND();
        return true;
    } else {
        return false;
    }
}

var SWALL = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "wall of rock",
	SDESC: DESCRIBE_WALL,
	FLAGS: [NODESC],
	SYNONYM: ["ZZZP", "WALL", "WALLS", "OUTLINE", "OPENING", "HOLE", "DOOR", "DOORWAY"],
	ADJECTIVE: ["ZZZP", "STONE", "ROCK", "SMOOTH"],
	NAME_TABLE: 0,
	ACTION: SWALL_F
});

function SWALL_F() {
    let _X;
    if((isNOUN_USED("OPENING", "HOLE")
  &&  !(isIS(SWALL, OPENED)))) {
        NONE_HERE("OPENING");
        return RFATAL();
    } else if((!(isIS(SWALL, SEEN))
  &&  isNOUN_USED("DOOR", "DOORWAY"))) {
        NONE_HERE("DOOR");
        return RFATAL();
    } else if(isNOUN_USED("OUTLINE")) {
        if(isIS(SWALL, OPENED)) {
            TELL(XTHE, B("OUTLINE"
), " is now an ", B("OPENING"), PERIOD);
            return RFATAL();
        } else if(!(isIS(SWALL, SEEN))) {
            NONE_HERE("OUTLINE");
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_SAY, V_YELL)
  &&  isT(WALL_WORD)
  &&  (isNOUN_USED(WALL_WORD)
  ||  isADJ_USED(WALL_WORD)))) {
        SAY_WALL_WORD();
        return true;
    } else if(isVERB(V_EXAMINE, V_SEARCH, V_LOOK_ON
, V_LOOK_INSIDE, V_LOOK_BEHIND, V_LOOK_UNDER)) {
        if(isIS(PRSO, SEEN)) {
            SEE_DOORLIKE(PRSO);
            if(isHERE(SE_CAVE)) {
                TELL(B("SOUTHEAST"), C(SP));
            }
            TELL(B("WALL"), PERIOD);
            return true;
        }
        SEAMLESS_WALL();
        return true;
    } else if(isVERB(V_ENTER, V_WALK_TO, V_THROUGH, V_WALK_AROUND, V_FOLLOW)) {
        _X = "SW";
        if(isHERE(NE_CAVE)) {
            _X = "NE";
        }
        DO_WALK(_X);
        return true;
    } else if(isVERB(V_OPEN, V_PUSH, V_MOVE)) {
        if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        } else if(!(isIS(SWALL, SEEN))) {
            SHOVE_STRAIN();
            return true;
        }
        OPEN_SWALL();
        WALLPUSH();
        return true;
    } else if(isVERB(V_CLOSE, V_PULL)) {
        if(!(isIS(PRSO, OPENED))) {
            if(!(isIS(SWALL, SEEN))) {
                NONE_HERE("OPENING");
                return true;
            }
            ITS_ALREADY("closed");
            return true;
        }
        CLOSE_SWALL();
        WALLCLOSE();
        return true;
    } else {
        return false;
    }
}

function WALLCLOSE() {
    TELL("You slowly pull the secret door shut.", CR);
    return true;
}

function WALLPUSH() {
    TELL("You push against the outline on the wall with all your might, and an opening appears.", CR);
    return true;
}

function NONE_HERE(_WRD) {
    TELL(DONT, "see any ", B(_WRD), "s here.", CR);
    return true;
}

function CLOSE_SWALL() {
    UNMAKE(SWALL, OPENED);
    isNEW_EXIT(SE_WALL, "NW", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(SE_WALL, "IN", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(SE_CAVE, "SE", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(SE_CAVE, "OUT", FCONNECT, CANT_ENTER_WALL);
    UNMAKE(SE_CAVE, LIGHTED);
    PUTP(SE_CAVE, "BEAM-DIR", NO_MIRROR);
    REFLECTIONS();
    REFRESH_MAP();
    return true;
}

function OPEN_SWALL() {
    let _X;
    MAKE(SWALL, OPENED);
    isNEW_EXIT(SE_WALL, "NW", (CONNECT + 1 + MARKBIT), SE_CAVE);
    isNEW_EXIT(SE_WALL, "IN", (CONNECT + 1 + MARKBIT), SE_CAVE);
    isNEW_EXIT(SE_CAVE, "SE", (CONNECT + 1 + MARKBIT), SE_WALL);
    isNEW_EXIT(SE_CAVE, "OUT", (CONNECT + 1 + MARKBIT), SE_WALL);
    MAKE(SE_CAVE, LIGHTED);
    PUTP(SE_CAVE, "BEAM-DIR", I_SE);
    if(isHERE(SE_CAVE)) {
        isLIT = true;
    }
    REFLECTIONS();
    if(!(isHERE(SE_CAVE))) {
        REFRESH_MAP();
    }
    return true;
}

var NWALL = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "wall of rock",
	SDESC: DESCRIBE_WALL,
	FLAGS: [NODESC],
	SYNONYM: ["ZZZP", "WALL", "WALLS", "OUTLINE", "OPENING", "HOLE", "DOOR", "DOORWAY"],
	ADJECTIVE: ["ZZZP", "ROCK", "STONE", "ZZZP"],
	NAME_TABLE: 0,
	ACTION: NWALL_F
});

function NWALL_F() {
    let _X;
    if((isNOUN_USED("OPENING", "HOLE")
  &&  !(isIS(NWALL, OPENED)))) {
        NONE_HERE("OPENING");
        return RFATAL();
    } else if((!(isIS(NWALL, SEEN))
  &&  isNOUN_USED("DOOR", "DOORWAY"))) {
        NONE_HERE("DOOR");
        return RFATAL();
    } else if(isNOUN_USED("OUTLINE")) {
        if(isIS(NWALL, OPENED)) {
            TELL(XTHE, B("OUTLINE"
), " is now an ", B("OPENING"), PERIOD);
            return RFATAL();
        } else if(!(isIS(NWALL, SEEN))) {
            NONE_HERE("OUTLINE");
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_SAY, V_YELL)
  &&  isT(WALL_WORD)
  &&  (isNOUN_USED(WALL_WORD)
  ||  isADJ_USED(WALL_WORD)))) {
        SAY_WALL_WORD();
        return true;
    } else if(isVERB(V_EXAMINE, V_SEARCH, V_LOOK_ON
, V_LOOK_INSIDE, V_LOOK_BEHIND, V_LOOK_UNDER)) {
        if(isIS(NWALL, SEEN)) {
            SEE_DOORLIKE(PRSO);
            if(isHERE(NE_CAVE)) {
                TELL(B("NORTHWEST"), C(SP));
            }
            TELL(B("WALL"), PERIOD);
            return true;
        }
        SEAMLESS_WALL();
        return true;
    } else if(isVERB(V_ENTER, V_WALK_TO, V_THROUGH, V_WALK_AROUND, V_FOLLOW)) {
        _X = "SE";
        if(isHERE(NE_CAVE)) {
            _X = "NW";
        }
        DO_WALK(_X);
        return true;
    } else if(isVERB(V_OPEN, V_PUSH, V_MOVE)) {
        if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        } else if(!(isIS(NWALL, SEEN))) {
            SHOVE_STRAIN();
            return true;
        }
        OPEN_NWALL();
        WALLPUSH();
        return true;
    } else if(isVERB(V_CLOSE, V_PULL)) {
        if(!(isIS(PRSO, OPENED))) {
            if(isIS(NWALL, SEEN)) {
                NONE_HERE("OPENING");
                return true;
            }
            ITS_ALREADY("closed");
            return true;
        }
        CLOSE_NWALL();
        WALLCLOSE();
        return true;
    } else {
        return false;
    }
}

function SEE_DOORLIKE(_OBJ) {
    PRINT("A doorlike ");
    if(isIS(_OBJ, OPENED)) {
        TELL(B("OPENING"));
    } else {
        TELL(B("OUTLINE"));
    }
    PRINT(" is visible in the ");
    return false;
}

function SHOVE_STRAIN() {
    TELL("You shove and strain against ", THEO, ", but to no avail.", CR);
    return true;
}

function SEAMLESS_WALL() {
    TELL("All you see is a seamless wall of stone.", CR);
    return true;
}

function CLOSE_NWALL() {
    UNMAKE(NWALL, OPENED);
    isNEW_EXIT(NE_WALL, "SE", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(NE_WALL, "IN", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(NE_CAVE, "NW", FCONNECT, CANT_ENTER_WALL);
    isNEW_EXIT(NE_CAVE, "OUT", FCONNECT, CANT_ENTER_WALL);
    UNMAKE(NE_CAVE, LIGHTED);
    REFRESH_MAP();
    return true;
}

function OPEN_NWALL() {
    let _X;
    MAKE(NWALL, OPENED);
    isNEW_EXIT(NE_WALL, "SE", (CONNECT + 1 + MARKBIT), NE_CAVE);
    isNEW_EXIT(NE_WALL, "IN", (CONNECT + 1 + MARKBIT), NE_CAVE);
    isNEW_EXIT(NE_CAVE, "NW", (CONNECT + 1 + MARKBIT), NE_WALL);
    isNEW_EXIT(NE_CAVE, "OUT", (CONNECT + 1 + MARKBIT), NE_WALL);
    MAKE(NE_CAVE, LIGHTED);
    if(isHERE(NE_CAVE)) {
        isLIT = true;
    }
    REFRESH_MAP();
    return true;
}

var WEAPON_SHOP = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "weapon shop",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["SHOP", "STORE", "BUILDING"],
	ADJECTIVE: ["WEAPON"],
	ACTION: WEAPON_SHOP_F
});

function WEAPON_SHOP_F() {
    let _X;
    if(isHERE(IN_WEAPON)) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isENTERING())) {
        DO_WALK("WEST");
        return true;
    } else {
        return false;
    }
}

var WEAPON_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "front door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE],
	SYNONYM: ["DOOR", "DOORWAY"],
	ADJECTIVE: ["FRONT"]
});

var MSHOPPE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Magick Shoppe",
	FLAGS: [NODESC, PROPER, PLACE],
	SYNONYM: ["SHOPPE", "SHOP", "STORE", "BUILDING"],
	ADJECTIVE: ["YE", "OLDE", "MAGICK", "MAGIC"],
	ACTION: MSHOPPE_F
});

function MSHOPPE_F() {
    let _X;
    if(isHERE(IN_MAGICK)) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isENTERING())) {
        DO_WALK("WEST");
        return true;
    } else {
        return false;
    }
}

var MAGICK_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE],
	SYNONYM: ["DOOR", "DOORWAY"],
	ADJECTIVE: ["FRONT"],
	ACTION: MAGICK_DOOR_F
});

function MAGICK_DOOR_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_OPEN)
  &&  !(isIS(PRSO, OPENED)))) {
        TINKLES("OPEN");
        IOPEN();
        return true;
    } else if((isVERB(V_CLOSE)
  &&  isIS(PRSO, OPENED))) {
        TINKLES("CLOSE");
        ICLOSE();
        return true;
    } else {
        return false;
    }
}

function TINKLES(_WRD) {
    TELL("As you ", B(_WRD), C(SP), THEO
, ", a concealed bell tinkles merrily.", CR);
    return true;
}

var LAMPHOUSE = () => OBJECT({
	LOC: TOWER_TOP,
	DESC: "lamphouse",
	FLAGS: [NODESC, TRYTAKE, NOALL, CONTAINER, OPENED],
	SYNONYM: ["LAMPHOUSE", "HOUSE", "GLASS", "DEBRIS"],
	ADJECTIVE: ["LAMP"],
	CAPACITY: 25,
	ACTION: LAMPHOUSE_F
});

function LAMPHOUSE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        GET_SEXTANT();
        TELL(CTHEO, " is shattered beyond all usefulness");
        if((_X = isFIRST(PRSO))) {
            PRINT(". There seems to be something ");
            TELL("lying upon the debris within");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        GET_SEXTANT();
        if((_X = isFIRST(PRSO))) {
            _X = "YOU";
            TELL("Sifting");
        } else {
            _X = "BUT";
            TELL("You sift");
        }
        TELL(" through the debris, ", B(_X), " discover ");
        CONTENTS();
        PRINT(PERIOD);
        P_IT_OBJECT = LAMPHOUSE;
        return true;
    } else if(isVERB(V_LAMP_ON)) {
        TELL("Not a chance.", CR);
        return true;
    } else if(isVERB(V_LAMP_OFF)) {
        TELL("It's been off for a long time.", CR);
        return true;
    } else if((_X = isMOVING())) {
        TELL("The remains of ", THEO);
        PRINT(" cannot be moved.|");
        return true;
    } else {
        return false;
    }
}

function GET_SEXTANT() {
    if(isIS(SEXTANT, NODESC)) {
        UNMAKE(SEXTANT, NODESC);
        MOVE(SEXTANT, PRSO);
        WINDOW(SHOWING_ROOM);
    }
    return false;
}

var SEXTANT = () => OBJECT({
	DESC: "antique sextant",
	FLAGS: [NODESC, TAKEABLE, FERRIC, VOWEL],
	SYNONYM: ["SEXTANT", "INSTRUMENT"],
	ADJECTIVE: ["PLATINUM", "ANTIQUE"],
	SIZE: 5,
	VALUE: 20,
	ACTION: SEXTANT_F
});

function SEXTANT_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("A quaint but obsolete instrument, long since replaced by Kaluzniacki's ");
        ITALICIZE("nonav");
        TELL(" spell. Nevertheless, even he would have hesitated to throw this sextant away, as it appears to be wrought of solid platinum.", CR);
        return true;
    } else if(isVERB(V_POINT_AT, V_TURN_TO, V_ADJUST, V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        TELL("You have no idea how to operate this arcane instrument.", CR);
        return true;
    } else {
        return false;
    }
}

var CHEST = () => OBJECT({
	LOC: TOWER_TOP,
	DESC: "sea chest",
	FLAGS: [TAKEABLE, CONTAINER, OPENABLE, READABLE],
	CAPACITY: 20,
	SIZE: 20,
	VALUE: 10,
	SYNONYM: ["CHEST", "BOX", "TRUNK", "LID", "COVER", "PLATE"],
	ADJECTIVE: ["SEA", "BRASS", "METAL"],
	DESCFCN: CHEST_F,
	ACTION: CHEST_F
});

function CHEST_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("An old ", CHEST, " lies half-buried in debris.");
            return true;
        }
        return false;
    } else if((_X = isTOUCHING())) {
        if((isHERE(TOWER_TOP)
  &&  isIS(DORN, LIVING)
  &&  isIS(DORN, NODESC))) {
            UNMAKE(DORN, NODESC);
            QUEUE(I_DORN);
            MOVE(DORN, TOWER_TOP);
            SEE_CHARACTER(DORN);
            WINDOW(SHOWING_ROOM);
            PRINT("As you reach towards the chest, you ");
            TELL("hear a loud \"Hurumph!\" immediately behind you.", CR);
            if((!(DMODE)
  ||  !(isEQUAL(PRIOR, 0, SHOWING_ROOM)))) {
                RELOOK(true);
            }
            return true;
        } else if((isVISIBLE(DORN)
  &&  !(isIS(DORN, MUNGED)))) {
            TELL(CTHE(DORN), " won't let you near ", THE(CHEST
), PERIOD);
            return true;
        }
    }
    if(isNOUN_USED("LID", "COVER")) {
        if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
            PERFORM("LOOK-INSIDE", CHEST);
            return true;
        } else if(isVERB(V_OPEN, V_RAISE)) {
            OPEN_CHEST();
            return true;
        }
    } else if((isNOUN_USED("PLATE")
  ||  isADJ_USED("BRASS", "METAL"))) {
        if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
            READ_PLATE();
            return true;
        } else if((_X = isMOVING())) {
            FIRMLY_ATTACHED("brass plate", CHEST, true);
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO)) {
            if(!(isIS(PRSI, OPENED))) {
                YOUD_HAVE_TO("open", PRSI);
                return true;
            } else if((isPRSO(PARASOL)
  &&  isIS(PRSO, OPENED))) {
                YOUD_HAVE_TO("close");
                return true;
            }
            return false;
        } else if(isVERB(V_PUT_ON)) {
            if(isIS(PRSI, OPENED)) {
                YOUD_HAVE_TO("close", PRSI);
                return true;
            }
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_TAKE)) {
        if(isIS(PRSO, OPENED)) {
            YOUD_HAVE_TO("close");
            return true;
        } else if(ITAKE()) {
            PUTP(PRSO, "DESCFCN", 0);
            TELL("Taken.", CR);
        }
        return true;
    } else if(isVERB(V_READ)) {
        READ_PLATE();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The oak chest is compact and sturdy, probably the craft of Antharian dwarves. No latch or keyhole is visible, but a brass plate is affixed to the top of the ");
        if(isIS(PRSO, OPENED)) {
            TELL(B("OPEN"));
        } else {
            TELL(B("CLOSED"));
        }
        TELL(" lid.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        OPEN_CHEST();
        return true;
    } else {
        return false;
    }
}

function READ_PLATE() {
    MAKE(CHEST, SEEN);
    TELL("The brass plate on ", THEO
, "'s lid is engraved with a simple warning in many languages, including yours: ");
    PRINT("\"Do Not Open This Chest.\"|");
    return true;
}

function OPEN_CHEST() {
    let _L;
    _L = LOC(CHEST);
    if(!(isEQUAL(_L, LOC(PLAYER)))) {
        YOUD_HAVE_TO("put down", CHEST);
        return true;
    } else if(isIS(CHEST, OPENED)) {
        ITS_ALREADY("open");
        return true;
    } else if(isIS(IN_SPLENDOR, TOUCHED)) {
        
    } else if(!(isIS(CHEST, SEEN))) {
        MAKE(CHEST, SEEN);
        PRINT("As you reach towards the chest, you ");
        TELL("notice a brass plate inscribed with the words ");
        PRINT("\"Do Not Open This Chest.\"|");
        return true;
    }

    /*"This clause added 5/20/88. -- Prof"*/

    if((isIN(PLAYER, ARCH)
  ||  !(isEQUAL(ATIME, PRESENT)))) {
        TELL("The arch's presence keeps the chest tightly shut.", CR);
        return true;
    } else if((isHERE(APLANE)
  &&  isEQUAL(ABOVE, OPLAIN))) {
        PERMISSION();
        return true;
    }

    TO_SPLENDOR();
    return true;
}

function TO_SPLENDOR(_WHO) {
    let _DIR, _X, _Y;
    PUTP(IN_SPLENDOR, "FNUM", GETP(HERE, "FNUM"));
    _DIR = asPROP("NW");
    while(true) {
        _X = SORRY_EXIT;
        _Y = "Lush vegetation blocks your path.";
        if(PROB(50)) {
            _X = (CONNECT + 9 + MARKBIT);
            _Y = IN_SPLENDOR;
        }
        isNEW_EXIT(IN_SPLENDOR, PROP(_DIR), _X, _Y);
        if(++_DIR > asPROP("NORTH")) {
            break;
        }
    }
    SAFE_VEHICLE_EXIT();
    MOVE(HERD, IN_SPLENDOR);
    QUEUE(I_MARE_SEES, 3);
    DESCRIBE_GATE();
    CARRIAGE_RETURNS();
    GOTO(IN_SPLENDOR);
    return true;
}

function DESCRIBE_GATE(_WHO) {
    PCLEAR();
    MAKE(CHEST, OPENED);
    if(isIS(PHASE, NOALL)) {
        UNMAKE(PHASE, NOALL);
        QUEUE(I_PHASE);
    }
    TELL("Rays of golden light burst from ", THE(CHEST
), "'s interior as the lid creaks open. ");
    if(isASSIGNED(_WHO)) {
        TELL(CTHE(_WHO), " is");
    } else {
        TELL("You're");
    }
    TELL(" bathed in a chorus of radiant ecstasy that almost drowns out the telltale ");
    HLIGHT(H_ITALIC);
    TELL("snap");
    HLIGHT(H_NORMAL);
    TELL(" of an opening Gate.", CR);
    if(isASSIGNED(_WHO)) {
        WINDOW(SHOWING_ALL);
        TELL(TAB, "When your head clears, ", THE(_WHO
), " is gone without a trace.", CR);
    }
    return true;
}

var HERD = () => OBJECT({
	DESC: "herd of unicorns",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["HERD", "UNICORNS", "UNICORN", "MARES", "COLTS", "PONIES", "HORN", "HORNS", "KEY", "KEYS"],
	ADJECTIVE: ["UNICORN"],
	GENERIC: GENERIC_KEYS_F,
	DESCFCN: HERD_F,
	ACTION: HERD_F
});

function HERD_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(HERD
), " grazes peacefully among the trees.");
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL("This herd is mostly mares and colts, who rub their horns affectionately against their mothers' flanks. Oddly, every unicorn is wearing a gold key on a chain around its neck.", CR);
        return true;
    } else if(((_X = isTOUCHING())
  ||  (_X = isCLIMBING_ON()))) {
        UNICORNS_FLEE();
        return true;
    } else {
        return false;
    }
}

function UNICORNS_FLEE(_STR) {
    PCLEAR();
    DEQUEUE(I_MARE_SEES);
    QUEUE(I_ARREST, 2);
    REMOVE(HERD);
    WINDOW(SHOWING_ROOM);
    TELL("One of the mares glances up ");
    if(isASSIGNED(_STR)) {
        TELL(_STR);
    } else {
        TELL("as you draw closer");
    }
    TELL(". Her nostrils flare with surprise, and a high-pitched voice in your head cries, \"");
    if(isIS(HERD, SEEN)) {
        TELL("Another i");
    } else {
        TELL("I");
    }
    TELL(`ntruder!\"
  The herd springs to full alert. Mothers nudge their frightened colts out of sight, then gallop away between the trees. Within moments, the glade is completely deserted.`, CR);
    return true;
}

var PHASE = () => OBJECT({
	LOC: CHEST,
	DESC: "phase blade",
	SDESC: DESCRIBE_PHASE,
	FLAGS: [TAKEABLE, NOALL, NAMEABLE],
	SYNONYM: ["OUTLINE", "ZZZP", "SHAPE", "ZZZP"],
	ADJECTIVE: ["VAGUE"],
	SIZE: 0,
	EFFECT: 0,
	VALUE: 20,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DESCRIBE_WEAPONS,
	ACTION: SOFT_PHASE_F
});

"NOALL = never seen."


function HARD_PHASE_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        TELL("The sharp blade blazes in a rainbow of anticipation.", CR);
        SHAPESEE();
        return true;
    } else if(isVERB(V_SWING)) {
        HUMS();
        TELL("swings, a blazing streak of color in its wake.", CR);
        SHAPESEE();
        return true;
    } else {
        return false;
    }
}

function SHAPESEE() {
    if(isIN(SHAPE, HERE)) {
        TELL(TAB, CTHE(SHAPE), " quivers nervously.", CR);
    }
    return true;
}

function HUMS() {
    WHOOSH();
    TELL(CTHE(PHASE), " hums with Magick as it ");
    return true;
}

function SOFT_PHASE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_TOUCH_TO)) {
            if(isPRSO(HANDS)) {
                FEEL_PHASE();
                return true;
            }
            PASS_THRU(PRSO, PRSI);
            return true;
        } else if(isVERB(V_HIT, V_MUNG, V_CUT)) {
            PHASE_WHOOSH();
            return true;
        }
        return false;
    } else if((_X = isSEEING())) {
        if(isIS(PRSO, NODESC)) {
            TELL("You still can't see ", THEO, PERIOD);
            return true;
        }
        MAKE(PHASE, NODESC);
        MAKE(PHASE, SEEN);
        WINDOW(SHOWING_ALL);
        TELL(CTHEO
, " disappears the moment you set eyes on it.", CR);
        return true;
    } else if(isVERB(V_TOUCH_TO)) {
        if(isEQUAL(PRSI, null, HANDS)) {
            FEEL_PHASE();
            return true;
        }
        PASS_THRU(PRSO, PRSI);
        return true;
    } else if(isVERB(V_TOUCH, V_HIT, V_SQUEEZE)) {
        if(isEQUAL(PRSI, null, HANDS)) {
            FEEL_PHASE();
            return true;
        }
        PASS_THRU(PRSI, PRSO);
        return true;
    } else {
        return false;
    }
}

function PHASE_WHOOSH() {
    WHOOSH();
    TELL("You swing ", THEI, ", but it");
    RIGHT_THRU();
    return false;
}

function PASS_THRU(_OBJ1, _OBJ2) {
    TELL("Oddly enough, ", THE(_OBJ1));
    RIGHT_THRU(_OBJ2);
    return true;
}

function PASSES_THROUGH(_WITH, _OBJ) {
    YOUR_OBJ(_WITH);
    RIGHT_THRU(_OBJ, true);
    TELL(" as if it weren't there!", CR);
    return true;
}

function RIGHT_THRU(_OBJ=PRSO, _NOCR) {
    TELL(" passes right through ", THE(_OBJ));
    if(!(isASSIGNED(_NOCR))) {
        TELL(PERIOD);
    }
    return true;
}

function FEEL_PHASE() {
    TELL("You feel a cool, sharp sensation, like brushing against the edge of a knife. But ", THE(PHASE), " seems");
    PRINT(" to possess no physical substance.|");
    return true;
}

VOC("PHASE", ADJ);

function SETUP_PHASE() {
    let _TBL;
    WINDOW(SHOWING_INV);
    DEQUEUE(I_PHASE);
    UNMAKE(PHASE, NODESC);
    PUTP(PHASE, "ACTION", HARD_PHASE_F);
    PUTP(PHASE, "SIZE", 7);
    PUTP(PHASE, "EFFECT", 75);
    MAKE(PHASE, WEAPON);
    _TBL = GETPT(PHASE, "SYNONYM");
    _TBL[0] = "SWORD";
    _TBL[2] = "BLADE";
    _TBL[3] = "WEAPON";
    isREPLACE_ADJ(PHASE, "VAGUE", "PHASE");
    return false;
}

function MUNG_PHASE() {
    let _TBL;
    WINDOW(SHOWING_INV);
    QUEUE(I_PHASE);
    UNMAKE(PHASE, NODESC);
    UNMAKE(PHASE, SEEN);
    PUTP(PHASE, "ACTION", SOFT_PHASE_F);
    PUTP(PHASE, "SIZE", 0);
    PUTP(PHASE, "EFFECT", 0);
    UNMAKE(PHASE, WEAPON);
    _TBL = GETPT(PHASE, "SYNONYM");
    _TBL[0] = "OUTLINE";
    _TBL[2] = "SHAPE";
    _TBL[3] = "ZZZP";
    isREPLACE_ADJ(PHASE, "PHASE", "VAGUE");
    return false;
}

var THRONE = () => OBJECT({
	LOC: THRONE_ROOM,
	DESC: "nest of seashells",
	FLAGS: [NODESC, TRYTAKE, SURFACE, CONTAINER, OPENED],
	SYNONYM: ["NEST", "PILE", "HEAP", "SHELLS", "DEBRIS", "SHELL", "SEASHELL", "SEASHELLS"],
	CAPACITY: 25,
	ACTION: THRONE_F
});

function THRONE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        isGET_DOUBLOON();
        TELL("The material is heaped into a crude throne");
        if((_X = isFIRST(PRSO))) {
            PRINT(". On it you see ");
            CONTENTS();
        }
        PRINT(PERIOD);
        P_IT_OBJECT = PRSO;
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        isGET_DOUBLOON();
        if((_X = isFIRST(PRSO))) {
            _X = "YOU";
            TELL("Sifting");
        } else {
            _X = "BUT";
            TELL("You sift");
        }
        TELL(" through the material in ", THEO, ", ", B(_X), " discover ");
        CONTENTS();
        PRINT(PERIOD);
        P_IT_OBJECT = PRSO;
        return true;
    } else if((_X = isMOVING())) {
        TELL("None of it seems worth moving");
        if(isGET_DOUBLOON()) {
            P_IT_OBJECT = DOUBLOON;
            TELL(", except for ", THE(DOUBLOON
), " you just noticed");
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

function isGET_DOUBLOON() {
    if(isIS(DOUBLOON, NODESC)) {
        UNMAKE(DOUBLOON, NODESC);
        MOVE(DOUBLOON, PRSO);
        WINDOW(SHOWING_ROOM);
        return true;
    } else {
        return false;
    }
}

var DOUBLOON = () => OBJECT({
	DESC: "gold doubloon",
	FLAGS: [NODESC, TAKEABLE, FERRIC],
	SYNONYM: ["DOUBLOON", "COIN", "MONEY", "GOLD"],
	ADJECTIVE: ["GOLD", "GOLDEN"],
	SIZE: 0,
	VALUE: 10,
	ACTION: DOUBLOON_F
});

function DOUBLOON_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Obviously of significant value.", CR);
        return true;
    } else {
        return false;
    }
}

var STAVE = () => OBJECT({
	DESC: "stave",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "STAVE"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 2,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});

var STAFF = () => OBJECT({
	DESC: "staff",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "STAFF"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 1,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});

var WAND = () => OBJECT({
	DESC: "wand",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "WAND"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 1,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});

var STICK = () => OBJECT({
	DESC: "stick",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "STICK"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 1,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});

var ROD = () => OBJECT({
	DESC: "rod",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "ROD"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 3,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});

var CANE = () => OBJECT({
	DESC: "cane",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, BUOYANT],
	SYNONYM: ["ZZZP", "CANE"],
	ADJECTIVE: ["ZZZP"],
	SIZE: 3,
	ENDURANCE: 3,
	STRENGTH: 5,
	VALUE: 10,
	DESCFCN: 0,
	ACTION: 0
});



function TELE_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_TELE(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_TELE(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_TELE(_OBJ, _W) {
    let _S, _L, _LEN, _RM;
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isNOT_LIVING(_OBJ, _W)) {
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    }
    _S = isWAND_STRENGTH(_W);
    _L = LOC(_OBJ);
    TELL("A ray of hard blue ");
    EXPLODES(_W);
    if((isEQUAL(_OBJ, ME, HANDS, FEET)
  ||  isEQUAL(_OBJ, GRINDER)
  ||  isEQUAL(_L, PLAYER)
  ||  isIN(_L, PLAYER))) {
        if(isEQUAL(_OBJ, GRINDER)) {
            QUICKER();
            TELL(" and uses the lid to reflect the ray back into your face");
        }
        _LEN = TELEROOMS[0];
        while(true) {
            _RM = toROOM(TELEROOMS[RANDOM(_LEN)]);
            if(isEQUAL(_RM, HERE)) {
                continue;
            }break;
        }
        TELL("! You're engulfed");
        PRINT(" in a dizzy maelstrom of sound and motion");
        TELL("...", CR);
        P_WALK_DIR = null;
        OLD_HERE = null;
        SAFE_VEHICLE_EXIT();
        CARRIAGE_RETURNS();
        GOTO(_RM);
        TELL(TAB, XTHE, B("LANDSCAPE"), " stops reeling");
    } else if(isIS(_OBJ, MONSTER)) {
        if(!(isEQUAL(_OBJ, DUST, WIGHT))) {
            MAKE(_OBJ, SLEEPING);
            MAKE(_OBJ, NEUTRALIZED);
            TELEPORT_MONSTER(_OBJ);
        }
        TELL(", engulfing ", THE(_OBJ));
        PRINT(" in a dizzy maelstrom of sound and motion");
        TELL(PERIOD);
        if(isEQUAL(_OBJ, DUST)) {
            if(!(isIS(_OBJ, TOUCHED))) {
                START_DUST();
            }
            UNMAKE(_OBJ, SEEN);
            UPDATE_STAT((0 - GETP(_W, "STRENGTH")), STRENGTH);
            return true;
        }
        TELL(TAB);
        ITALICIZE("Poof");
        TELL(". ", CTHE(_OBJ));
        if(isEQUAL(_OBJ, WIGHT)) {
            PRINT(" disappears in a spectral flash");
            TELL(", rematerializing ten feet beyond the edge of the cliff. It");
            PRINT(" gives you a puzzled frown");
            TELL(", looks down, looks back up at you, waves goodbye and plummets out of sight");
        } else {
            TELL(" is nowhere to be seen");
        }
    } else {
        PRINT(", barely missing its wide-eyed target");
    }
    PRINT(PERIOD);
    UPDATE_STAT((0 - GETP(_W, "STRENGTH")), STRENGTH);
    if(isEQUAL(_OBJ, WIGHT)) {
        KILL_MONSTER(WIGHT);
    }
    STARTLE(_OBJ, _W);
    return true;
}

function EXPLODES(_W) {
    TELL("Magick explodes from the tip of ", THE(_W));
    return true;
}

function TELEPORT_MONSTER(_OBJ) {
    let _TBL, _LEN, _RM;
    _TBL = GETP(_OBJ, "HABITAT");
    _LEN = _TBL[0];
    while(true) {
        _RM = toROOM(_TBL[RANDOM(_LEN)]);
        if(isEQUAL(_RM, HERE)) {
            continue;
        }break;
    }
    EXUENT_MONSTER(_OBJ);
    MOVE(_OBJ, _RM);
    return false;
}


function SLEEP_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_SLEEP(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_SLEEP(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_SLEEP(_OBJ, _W) {
    let _S, _LEN;
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isNOT_LIVING(_OBJ, _W)) {
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    }
    _S = isWAND_STRENGTH(_W);
    TELL("A beam of soothing amber radiance ");
    if(isEQUAL(_OBJ, ME)) {
        ATTACK_MODE = THRUSTING;
        TELL("forces you to stifle a yawn.", CR);
        UPDATE_STAT(_S, STRENGTH);
        return true;
    }
    TELL("envelops ", THE(_OBJ), " as you train ", THE(_W), " upon ");
    PRONOUN(_OBJ, true);
    _LEN = NO_SLEEPS[0];
    if(isEQUAL(_OBJ, DACT)) {
        if(isT(DACT_SLEEP)) {
            if(!(isEQUAL(DACT_SLEEP, 3))) {
                ++DACT_SLEEP
            }
            TELL(", and he snuggles deeper into his nap.", CR);
            UPDATE_STAT(_S, STRENGTH);
            return true;
        }
        TELL(PTAB, CTHE(_OBJ));
        DACT_TO_SLEEP();
    } else if(isEQUAL(_OBJ, DORN)) {
        TELL(". Two or three of its 69 eyes flutter drowsily.", CR);
    } else if(isEQUAL(_OBJ, OWOMAN)) {
        TELL(PTAB
, "\"Stop it!\" she laughs, brushing aside the beam with a wave. \"That tickles.\"", CR);
    } else if(isEQUAL(_OBJ, CORBIES)) {
        TELL(". A few seem to hesitate in their flight; but they recover quickly.", CR);
    } else if(isEQUAL(_OBJ, PUPP)) {
        TELL(PTAB, CTHE(_OBJ
), " promptly mimics your action, using its third finger to represent your "
, D(_W), PERIOD);
    } else if(((_LEN = isINTBL(_OBJ, REST(NO_SLEEPS, 2), _LEN))
  ||  (isEQUAL(_OBJ, WORM)
  &&  !(isIS(_OBJ, MONSTER))))) {
        TELL(". But ", THE(_OBJ
), " appears to be completely unaffected.", CR);
    } else if((isEQUAL(_OBJ, GRINDER)
  ||  !(isIS(_OBJ, MONSTER)))) {
        TELL("; but aside from a brief fit of yawning, ", THE(_OBJ
), " seems unaffected.", CR);
    } else if(isIS(_OBJ, SLEEPING)) {
        TELL(". Nothing further seems to happen.", CR);
    } else {
        WINDOW(SHOWING_ROOM);
        isREPLACE_ADJ(_OBJ, "AWAKE", "STUNNED");
        MAKE(_OBJ, SLEEPING);
        MAKE(_OBJ, NEUTRALIZED);
        TELL(PERIOD);
    }
    UPDATE_STAT(_S, STRENGTH);
    return true;
}

function DACT_TO_SLEEP(_G=0) {
    TELL(" closes his eyes, swaying his skinny head back and forth with drowsy reminiscences");
    if(isT(_G)) {
        TELL(". Soon his snore drowns out the fading song");
    }
    if(isHERE(IN_SKY)) {
        TELL(PTAB
, "You tumble into a nose dive as ", THE(DACT), "'s wings go limp. Desperate screams of terror do not wake him in time to avoid a crash");
        JIGS_UP();
        return false;
    }
    TELL(PERIOD);
    WINDOW(SHOWING_ALL);
    isREPLACE_ADJ(DACT, "AWAKE", "SLEEPING");
    MAKE(DACT, SLEEPING);
    DACT_SLEEP = 4;
    return false;
}


function IO_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_IO(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_IO(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_IO(_OBJ, _W) {
    let _S, _NXT, _X;
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    }
    _S = isWAND_STRENGTH(_W);
    ITALICIZE("Blit");
    TELL("! A zone of negative geometry forms in the space around ");
    if(isEQUAL(_OBJ, ME, HANDS, FEET)) {
        ATTACK_MODE = THRUSTING;
        TELL("your body");
    } else {
        TELL(THE(_OBJ), ", effectively turning ");
        PRONOUN(_OBJ, true);
        TELL(" inside out");
    }

    TELL(". This disconcerting effect lasts only for a moment");

    if(isEQUAL(_OBJ, ME, HANDS, FEET)) {
        
    } else if((isEQUAL(_OBJ, IDOL_ROOM)
  &&  isHERE(INNARDS))) {
        P_WALK_DIR = null;
        OLD_HERE = null;
        HERE = LOC(MAW);
        UNMAKE(HERE, TOUCHED);
        MOVE(PLAYER, HERE);
        MOVE_ALL(INNARDS, HERE, NODESC);
    } else if(isEQUAL(_OBJ, OWOMAN)) {
        TELL(PTAB
, "\"Very funny,\" she remarks, regaining her composure");
    } else if(isEQUAL(_OBJ, BOTTLE)) {
        TELL("; very little of ", THE(_OBJ
), "'s contents escapes.", CR);
    } else if((isEQUAL(_OBJ, MAMA)
  &&  (_NXT = isFIRST(_OBJ)))) {
        _OBJ = _NXT;
        while(true) {
            _NXT = isNEXT(_OBJ);
            UNMAKE(_OBJ, NODESC);
            MOVE(_OBJ, LOC(MAMA));
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
        WINDOW(SHOWING_ROOM);
        TELL("; but long enough for the undigested contents of ", THE(MAMA
), "'s stomach to fall ");
        _OBJ = GROUND;
        if(!(isIN(MAMA, HERE))) {
            TELL("on");
            _OBJ = LOC(MAMA);
        }
        TELL("to ", THE(_OBJ));
    } else if(isIS(_OBJ, LIVING)) {
        TELL(", and leaves ", THE(_OBJ), " looking ");
        if((isIS(_OBJ, MONSTER)
  &&  !(isIS(_OBJ, SLEEPING)))) {
            ATTACK_MODE = THRUSTING;
            TELL("madder than ever");
        } else {
            TELL("rather upset");
        }
    } else if((isIS(_OBJ, CONTAINER)
  &&  (_OBJ = isFIRST(_OBJ)))) {
        _X = 0;
        while(true) {
            if(isIS(_OBJ, NODESC)) {
                
            } else if(isIS(_OBJ, TAKEABLE)) {
                ++_X
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
        if(isT(_X)) {
            TELL("; but you catch a glimpse of some");
            if(isEQUAL(_X, 1)) {
                TELL(B("THING"));
            } else {
                TELL(" things");
            }
            TELL(" inside");
        }
    }

    TELL(PERIOD);
    UPDATE_STAT(_S, STRENGTH);
    return true;
}


function LEV_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_LEV(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_LEV(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_LEV(_OBJ, _W) {
    let _M=0, _L, _X, _S;
    _S = STATS[STRENGTH];
    if(_S > 24) {
        _S = -24;
    } else {
        _S = (0 - (_S - 1));
    }
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isEQUAL(_OBJ, _W)) {
        IMPOSSIBLE();
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    } else if(isEQUAL(_OBJ, ME, LOC(PLAYER))) {
        WAND_STRUGGLE(_S, _W);
        return true;
    } else if(isEQUAL(_OBJ, UNICORN)) {
        TELL(CTHE(UNICORN
), " whinnies with fear as her hooves leave the floor! ");
        PRINT("Sweat breaks out on your forehead as you ");
        PRINT("guide the heavy burden over the ");
        TELL("tall gate");
        PRINT(" and safely down to the ground.|");
        UPDATE_STAT(_S, STRENGTH);
        if(isIN(CHEST, HERE)) {
            UNICORN_OPENS_CHEST();
            return true;
        }
        TELL(TAB, CTHE(UNICORN), C(SP));
        BYE_UNICORN();
        return true;
    } else if(isEQUAL(_OBJ, BABY)) {
        VANISH(BABY);
        DEQUEUE(I_BABY);
        VANISH(MAMA);
        DEQUEUE(I_MAMA);
        TELL(CTHE(_OBJ
), " bellows with surprise as he rises out of ", THE(QUICKSAND), "! ");
        PRINT("Sweat breaks out on your forehead as you ");
        PRINT("guide the heavy burden over the ");
        TELL(B("MUD"));
        PRINT(" and safely down to the ground.|");
        UPDATE_STAT(_S, STRENGTH);
        TELL(TAB
, "The ungainly creature nuzzles you with his muddy snout, and bats his eyelashes with joy and gratitude. Then he ");
        if(isIN(MAMA, HERE)) {
            TELL("and his mother amble");
        } else {
            TELL("ambles");
        }
        TELL(" away into the jungle to");
        if(isIN(MAMA, HERE)) {
            TELL("gether");
        } else {
            TELL(" find his mother");
        }
        TELL(", pausing for a final bellow of farewell.", CR);
        UPDATE_STAT(15, COMPASSION, true);
        return true;
    }
    if((isEQUAL(_OBJ, ARROW)
  &&  isIN(_OBJ, DACT)
  &&  isIS(_OBJ, NODESC))) {
        TELL(CTHE(DACT));
        if(isIS(DACT, SLEEPING)) {
            TELL(" stirs restlessly");
        } else {
            TELL(" screeches with pain");
        }
        TELL(" as ", THE(_OBJ), " tugs against his wound.", CR);
        if(_S < -3) {
            _S = -3;
        }
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(isEQUAL(_OBJ, XTREES)) {
        TELL("Ornaments and tinsel disappear into the sky.", CR);
        if(_S < -3) {
            _S = -3;
        }
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(isEQUAL(_OBJ, DUST)) {
        TELL("Dust bunnies scatter all over the room.", CR);
        if(_S < -3) {
            _S = -3;
        }
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(isIN(_OBJ, GRINDER)) {
        TELL(CTHE(GRINDER), " retrieves the rising "
, D(_OBJ), " with a chuckle. \"Cute.\"", CR);
        if(_S < -3) {
            _S = -3;
        }
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(isIS(_OBJ, TAKEABLE)) {
        _L = LOC(_OBJ);
        TELL(CTHE(_OBJ));
        if((isEQUAL(_L, PLAYER)
  &&  isIS(_OBJ, WORN))) {
            TELL(" tugs vainly against your body for a few moments.", CR);
        } else if((isEQUAL(_OBJ, RELIQUARY)
  &&  isEQUAL(_L, ALTAR))) {
            TELL(" begins to float");
            OUT_OF_LOC(_L);
            MAKE(CLERIC, SEEN);
            TELL(PTAB
, "\"A sign!\" cries ", THE(CLERIC), ", snatching ", THE(_OBJ
), " out of the air and gently replacing it. \"A sign from the gods!\""
, CR, TAB, CTHE(CONGREG), " grovels in fear and wonder.", CR);
        } else if(isEQUAL(_L, MCASE, BCASE, WCASE)) {
            TELL(" begins to float off its shelf in ", THE(_L), PTAB
, "\"No shoplifting!\" snaps ", THE(OWOMAN
), COMMA_AND, THE(_OBJ), " drops back into place.", CR);
        } else {
            TELL(" rises");
            if(isEQUAL(_L, PLAYER)) {
                TELL(" out of your grasp");
            } else {
                OUT_OF_LOC(_L);
            }
            TELL(", hovers for a moment and ");
            FALLS(_OBJ, null);
        }
        _X = GETP(_OBJ, "SIZE");
        _S = (STATS[STRENGTH] - 1);
        if(_X < 1) {
            _X = 1;
        } else if(_X > _S) {
            _X = _S;
        }
        UPDATE_STAT((0 - _X), STRENGTH);
        if((isEQUAL(_OBJ, SHILL)
  &&  !(isIS(SHILL, TOUCHED)))) {
            GET_SHILL();
        }
        return true;
    } else if(isIS(_OBJ, LIVING)) {
        TELL(CTHE(_OBJ));
        if((isEQUAL(_OBJ, DACT)
  &&  isHERE(IN_SKY))) {
            TELL(" spins out of control and crashes, killing you both instantly");
            JIGS_UP();
            return true;
        }
        TELL(" begins to rise off the ");
        GROUND_WORD();
        TELL(", but ");
        if(isEQUAL(_OBJ, OWOMAN)) {
            TELL("her glare of annoyance prompt");
        } else {
            if(isIS(_OBJ, FEMALE)) {
                TELL(B("HER"));
            } else if(isIS(_OBJ, MONSTER)) {
                TELL("its");
            } else {
                TELL("his");
            }
            if((isIS(_OBJ, MONSTER)
  ||  isIS(_OBJ, SLEEPING))) {
                TELL(" wild thrashing force");
            } else {
                TELL(" obvious distress prompt");
            }
        }
        TELL("s you to set ");
        if(isIS(_OBJ, FEMALE)) {
            TELL(B("HER"));
        } else if(isIS(_OBJ, MONSTER)) {
            TELL(B("IT"));
        } else {
            TELL(B("HIM"));
        }
        TELL(" down at once.", CR);
        UPDATE_STAT(_S, STRENGTH);
        return true;
    }
    WAND_STRUGGLE(_S, _W, _OBJ);
    return true;
}

function WAND_STRUGGLE(_S, _W, _OBJ) {
    TELL("Your strength wanes sharply as ", THE(_W
), " struggles for influence");
    if(isASSIGNED(_OBJ)) {
        TELL("over ", THE(_OBJ));
    }
    TELL(PERIOD);
    UPDATE_STAT(_S, STRENGTH);
    return true;
}


function BLAST_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_BLAST(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_BLAST(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_BLAST(_OBJ, _W) {
    let _B=0, _S, _L;
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isNOT_LIVING(_OBJ, _W)) {
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    }
    _S = isWAND_STRENGTH(_W);
    _L = LOC(_OBJ);
    KERBLAM();
    TELL("A searing bolt of ");
    EXPLODES(_W);
    if((isEQUAL(_OBJ, ME, HANDS, FEET)
  ||  isEQUAL(_L, PLAYER)
  ||  isIN(_L, PLAYER))) {
        TELL(", instantly consuming ");
        if(isEQUAL(_OBJ, ME)) {
            TELL("you in flames");
        } else {
            TELL(THE(_OBJ), " in flames, and you with it");
        }
        JIGS_UP();
        return true;
    } else if(isEQUAL(_OBJ, GRINDER)) {
        QUICKER();
        TELL(", whirls the crank and sucks the deadly plasma under the lid.", CR);
    } else if(isEQUAL(_OBJ, DUST)) {
        if(!(isIS(_OBJ, TOUCHED))) {
            START_DUST();
        }
        while(true) {
            MORE_BUNNIES();
            if(++_B > 2) {
                break;
            }
        }
        TELL(", scattering dust bunnies all over the room.", CR);
    } else if(isIS(_OBJ, MONSTER)) {
        PUTP(_OBJ, "ENDURANCE", 0);
        PUTP(_OBJ, "STRENGTH", 0);
        TELL(", striking ", THE(_OBJ), " squarely in the face!", CR);
    } else {
        TELL(", barely missing ");
        if((isEQUAL(_OBJ, WORM)
  &&  !(isIS(_OBJ, MONSTER)))) {
            TELL(THE(_OBJ));
        } else {
            TELL("its wide-eyed target");
        }
        PRINT(PERIOD);
    }
    UPDATE_STAT(_S, STRENGTH);
    STARTLE(_OBJ, _W);
    return true;
}

function QUICKER() {
    TELL(", but ", THE(GRINDER
), " is quicker. He throws open his ", GURDY);
    return true;
}


function DISPEL_WAND_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_ZAP_WITH)) {
            DO_DISPEL(PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
        DO_DISPEL(PRSI, PRSO);
        return true;
    } else if(isHANDLE_WANDS()) {
        return true;
    } else {
        return false;
    }
}

function DO_DISPEL(_OBJ, _W) {
    let _NAC=0, _H=0, _S, _X, _Y;
    _S = isWAND_STRENGTH(_W);
    if(isDONT_HAVE_WAND(_OBJ, _W)) {
        return true;
    } else if(isEQUAL(_OBJ, _W)) {
        IMPOSSIBLE();
        return true;
    } else if(isOUT_OF_GAS(_W)) {
        return true;
    } else if(isEQUAL(_OBJ, ME, LOC(PLAYER))) {
        WAND_STRUGGLE(_S, _W);
        return true;
    }
    TELL("A vortex of energy forms at the tip of ", THE(_W
), ", reaches outward and ");
    if((isEQUAL(_OBJ, DOME)
  ||  (isEQUAL(_OBJ, CRATER, PLUME)
  &&  isIN(DOME, ON_PEAK)))) {
        LAVA_TIMER = 4;
        QUEUE(I_LAVA);
        REMOVE(DOME);
        MOVE(LAVA, ON_PEAK);
        PUTP(CRATER, "ACTION", CRATER_F);
        WINDOW(SHOWING_ROOM);
        HAZE_ENVELOPS(DOME);
        TELL("You watch as it spreads across the perimeter, patiently undoing the mystic forces that define its structure", PTAB);
        KERBLAM();
        TELL("The mountain roars with volcanic triumph as a thousand years of pent-up fury breaches the bonds of Time. A plume of white-hot lava swells up from the heart of the mountain, only seconds away from where you stand!", CR);
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(isEQUAL(_OBJ, ASUCKER, BSUCKER, CSUCKER)) {
        HAZE_ENVELOPS(_OBJ);
        PRINT("You hear a noise like a vacuum cleaner, then a satisfied slurp as ");
        TELL(THE(_OBJ));
        BLAST_SUCKER(_OBJ);
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if((isEQUAL(_OBJ, BCASE, MCASE, WCASE)
  ||  isEQUAL(LOC(_OBJ), BCASE, MCASE, WCASE))) {
        MAKE(OWOMAN, SEEN);
        TELL("reflects harmlessly off "
, THE(MCASE), PTAB, CTHELADY, " conceals a smirk.", CR);
        UPDATE_STAT(_S, STRENGTH);
        return true;
    } else if(((_X = MAGIC_ITEMS[0])
 // &&  (_X = isINTBL(_OBJ, REST(MAGIC_ITEMS, 2), _X)))) {
    &&  (_X = MAGIC_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        HAZE_ENVELOPS(_OBJ);
        if(isIS(_OBJ, NEUTRALIZED)) {
            PRINT("But nothing seems to come of it; and ");
        } else {
            if((isEQUAL(_OBJ, HELM)
  &&  isWEARING_MAGIC(HELM))) {
                ++H
            }
            MAKE(_OBJ, NEUTRALIZED);
            PRINT("You hear a noise like a vacuum cleaner, then a satisfied slurp as ");
        }
    } else if(((_X = ARMOR_ITEMS[0])
 // &&  (_X = isINTBL(_OBJ, REST(ARMOR_ITEMS, 2), _X)))) {
    &&  (_X = ARMOR_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        HAZE_ENVELOPS(_OBJ);
        _X = GETP(_OBJ, "EMAX");
        _Y = GETP(_OBJ, "EFFECT");
        if((!(isEQUAL(0, _X, _Y))
  &&  _Y > _X)) {
            PUTP(_OBJ, "EFFECT", _X);
            _NAC = (_Y - _X);
            PRINT("You hear a noise like a vacuum cleaner, then a satisfied slurp as ");
        } else {
            PRINT("But nothing seems to come of it; and ");
        }
    } else if(((_X = WEAPON_ITEMS[0])
//  &&  (_X = isINTBL(_OBJ, REST(WEAPON_ITEMS, 2), _X)))) {
    &&  (_X = WEAPON_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        HAZE_ENVELOPS(_OBJ);
        _X = GETP(_OBJ, "EMAX");
        _Y = GETP(_OBJ, "EFFECT");
        if((!(isEQUAL(0, _X, _Y))
  &&  _Y > _X)) {
            PUTP(_OBJ, "EFFECT", _X);
            PRINT("You hear a noise like a vacuum cleaner, then a satisfied slurp as ");
        } else {
            PRINT("But nothing seems to come of it; and ");
        }
    } else {
        TELL("explores ", THE(_OBJ), ". ");
        if(isEQUAL(_OBJ, OWOMAN)) {
            TELL("\"How rude,\" she sniffs as ");
        } else {
            PRINT("But nothing seems to come of it; and ");
        }
    }

    TELL("the aura abruptly collapses.", CR);
    UPDATE_STAT(_S, STRENGTH);
    if(isT(_H)) {
        NORMAL_IQ();
    }
    if(isEQUAL(_OBJ, GLASS)) {
        ARCH_OFF();
    }
    if(isT(_NAC)) {
        UPDATE_STAT((0 - _NAC), ARMOR_CLASS);
    }
    return true;
}

function HAZE_ENVELOPS(_OBJ) {
    TELL("envelops ", THE(_OBJ), " in a swirling haze. ");
    return true;
}

function isWAND_STRENGTH(_OBJ) {
    let _S, _X;
    _S = GETP(_OBJ, "STRENGTH");
    _X = (STATS[ENDURANCE] - 1);
    if(_S < 1) {
        _S = 1;
    } else if(_S > _X) {
        _S = _X;
    }
    return (0 - _S);
}

function isOUT_OF_GAS(_W) {
    let _GAS;
    MAKE(_W, USED);
    _GAS = GETP(_W, "ENDURANCE");
    if((!(_GAS)
  ||  isIS(_W, NEUTRALIZED))) {
        TELL(CTHE(_W), PICK_NEXT(EMPTY_WANDS), ". Its virtue");
        if(!(_GAS)) {
            TELL(" seems to be exhausted.", CR);
            return true;
        }
        PRINT(" appears to have been neutralized");
        TELL(PERIOD);
        return true;
    }
    PUTP(_W, "ENDURANCE", (_GAS - 1));
    return false;
}

function isNOT_LIVING(_OBJ, _W) {
    if(isIS(_OBJ, LIVING)) {
        return false;
    }
    TELL(CTHE(_W
), " crackles lifelessly as you direct it at ", THE(_OBJ
), ". Perhaps its Magick works only on living things.", CR);
    return true;
}

function STARTLE(_OBJ, _W) {
    if(isEQUAL(_OBJ, OWOMAN)) {
        VANISH(_W);
        TELL(TAB, CTHE(_OBJ), " snatches ", THE(_W
), " away from you, snaps it in two and discards it angrily. \"That is ");
        ITALICIZE("not");
        TELL(" a toy.\"", CR);
        return true;
    } else if((isEQUAL(_OBJ, SALT, COOK)
  ||  isEQUAL(_OBJ, CLERIC))) {
        TELL(TAB, "\"Hey! Careful with that,\" growls "
, THE(_OBJ), PERIOD);
        return true;
    } else if((isEQUAL(_OBJ, MINX, DACT)
  &&  !(isIS(_OBJ, SLEEPING)))) {
        TELL(TAB, CTHE(_OBJ), " gives you a reproachful look.", CR);
        return true;
    } else {
        return false;
    }
}

function isNEXT_WAND(_FCN, _RM) {
    let _OBJ, _X;
    _OBJ = toOBJECT(PICK_ONE(WAND_LIST));
    if(isIS(_OBJ, NODESC)) {
        UNMAKE(_OBJ, NODESC);
        _X = PICK_ONE(WAND_FUNCTIONS);
        PUTP(_OBJ, "ACTION", _X[0]);
        PUTP(_OBJ, "SDESC", _X[1]);
        _X = _X[2];
        GETPT(_OBJ, "SYNONYM")[0] = _X;
        GETPT(_OBJ, "ADJECTIVE")[0] = _X;
        if(isASSIGNED(_FCN)) {
            PUTP(_OBJ, "DESCFCN", _FCN);
        }
        if(isASSIGNED(_RM)) {
            MOVE(_OBJ, _RM);
        }
        return _OBJ;
    } else {
        /*SAY_ERROR("NEXT-WAND?");*/
        return false;
    }
}

function isHANDLE_WANDS() {
    if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_SWING)) {
        TELL("You feel potential swell in ", THEO
, ", eager for release.", CR);
        return true;
    } else {
        return false;
    }
}

var CURTAIN = () => OBJECT({
	LOC: IN_MAGICK,
	DESC: "curtain",
	FLAGS: [NODESC, TRYTAKE, NOALL],
	SYNONYM: ["CURTAIN", "DRAPES"],
	DESCFCN: CURTAIN_F,
	ACTION: CURTAIN_F
});

function CURTAIN_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A closed curtain hangs suspended in midair.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_CLOSE)) {
        ITS_ALREADY("closed");
        return true;
    } else if((isVERB(V_LOOK_BEHIND, V_LOOK_UNDER)
  ||  (_X = isENTERING())
  ||  (_X = isTOUCHING()))) {
        if(!(isHERE(APLANE))) {
            ENTER_CURTAIN();
            return true;
        }
        if(isHELD(PHASE)) {
            MUNG_PHASE();
        }
        AS_YOU_APPROACH();
        TELL("your eyes momentarily lose their focus.", CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
        _X = IN_MAGICK;
        if(isEQUAL(ABOVE, OACCARDI)) {
            UNMAKE(WEAPON_DOOR, OPENED);
            _X = IN_WEAPON;
        } else if(isEQUAL(ABOVE, OMIZNIA)) {
            UNMAKE(BOUTIQUE_DOOR, OPENED);
            _X = IN_BOUTIQUE;
        }
        GOTO(_X);
        TELL(TAB, CTHELADY, " glances up as you appear. \"");
        _X = RANDOM(100);
        if(_X < 33) {
            TELL("Hello");
        } else if(_X < 67) {
            TELL("Welcome");
        } else {
            TELL("Greetings");
        }
        TELL(",\" she says, ");
        if(isEQUAL(ABOVE, OCITY)) {
            TELL("glaring at the");
            OPEN_CLOSED(MAGICK_DOOR);
            TELL(". \"Gotta fix that bell.\"", CR);
            return true;
        }
        TELL("frowning at the closed door.", CR);
        return true;
    } else {
        return false;
    }
}

function ENTER_CURTAIN() {
    P_WALK_DIR = null;
    AS_YOU_APPROACH(CURTAIN);
    TELL("the shop subtly rearranges itself until you find yourself facing the other way");
    if(isIN(OWOMAN, HERE)) {
        TELL(". ", CTHELADY
, " watches you with wry amusement");
    }
    PRINT(PERIOD);
    return false;
}

var MIRROR0 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR0_F,
	ACTION: MIRROR0_F
});

function MIRROR0_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR0, _CONTEXT);
}

var MIRROR1 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR1_F,
	ACTION: MIRROR1_F
});

function MIRROR1_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR1, _CONTEXT);
}

var MIRROR2 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR2_F,
	ACTION: MIRROR2_F
});

function MIRROR2_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR2, _CONTEXT);
}

var MIRROR3 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR3_F,
	ACTION: MIRROR3_F
});

function MIRROR3_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR3, _CONTEXT);
}

var MIRROR4 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR4_F,
	ACTION: MIRROR4_F
});

function MIRROR4_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR4, _CONTEXT);
}

var MIRROR5 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR5_F,
	ACTION: MIRROR5_F
});

function MIRROR5_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR5, _CONTEXT);
}

var MIRROR6 = () => OBJECT({
	DESC: "mirror",
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON],
	SYNONYM: ["MIRROR", "BUBBLE", "BUBBLES", "REFLECTION"],
	ADJECTIVE: ["MAGIC", "FLOATING", "ROUND"],
	MIRROR_DIR: NO_MIRROR,
	SIZE: 0,
	GENERIC: GENERIC_BUBBLE_F,
	DESCFCN: MIRROR6_F,
	ACTION: MIRROR6_F
});

function MIRROR6_F(_CONTEXT=null) {
    return isHANDLE_MIRRORS(MIRROR6, _CONTEXT);
}

function NOTE_MIRROR(_OBJ, _WRD) {
    TELL(" is suspended in midair");
    if(!(isIN(QUEEN, HERE))) {
        TELL(", facing ", B(_WRD));
        BEAM_DETAILS(_OBJ);
    }
    return false;
}

function BEAM_DETAILS(_OBJ) {
    let _DIR, _SDIR, _X1, _X2, _X3;
    if(!(isEQUAL(GETP(HERE, "MIRROR-OBJ"), _OBJ))) {
        return false;
    }
    _SDIR = GETP(HERE, "BEAM-DIR");    /*"Beam here?"*/
    if(isEQUAL(_SDIR, NO_MIRROR)) {
        /*"No, scram."*/
        return false;
    }
    _DIR = GETP(_OBJ, "MIRROR-DIR");
    TELL(". Sunlight from the "
, B(DIR_NAMES[_SDIR]), " exit is ");
    if(isEQUAL(_SDIR, _DIR)) {
        TELL("shining directly onto the mirror's face");
        return true;
    }

    _X1 = (_SDIR + 1);
    if(_X1 > I_NW) {
        _X1 = I_NORTH;
    }
    if(isEQUAL(_DIR, _X1)) {
        if(++_X1 > I_NW) {
            _X1 = I_NORTH;
        }
        REFLECT_TO(_X1);
        return true;
    }

    _X1 = (_SDIR - 1);
    if(_X1 < I_NORTH) {
        _X1 = I_NW;
    }
    if(isEQUAL(_DIR, _X1)) {
        if(--_X1 < I_NORTH) {
            _X1 = I_NW;
        }
        REFLECT_TO(_X1);
        return true;
    }

    _X1 = (_SDIR - 2);
    if(_X1 < I_NORTH) {
        _X1 = (_X1 + 8);
    }
    _X2 = (_SDIR + 2);
    if(_X2 > I_NW) {
        _X2 = (_X2 - 8);
    }
    if(isEQUAL(_DIR, _X1, _X2)) {
        TELL("glinting on the mirror's edge");
        return true;
    }

    _X1 = (_SDIR + 4);
    if(_X1 > I_NW) {
        _X1 = (_X1 - 8);
    }
    _X2 = (_SDIR + 3);
    if(_X2 > I_NW) {
        _X2 = (_X2 - 8);
    }
    _X3 = (_SDIR - 3);
    if(_X3 < I_NORTH) {
        _X3 = (_X3 + 8);
    }
    if(isEQUAL(_DIR, _X1, _X2, _X3)) {
        TELL("illuminating the back of the mirror");
    }
    return true;
}

function REFLECT_TO(_DIR) {
    TELL("reflected ", B(DIR_NAMES[_DIR]));
    _DIR = GETP(HERE, PDIR_LIST[_DIR]);
    if(!(_DIR)) {
        
    } else if(isEQUAL(MSB(_DIR[XTYPE]), CONNECT)) {
        return false;
    }
    TELL(", onto the wall");
    return true;
}

function isHANDLE_MIRRORS(_OBJ, _CONTEXT) {
    let _DIR, _WRD, _X;
    _DIR = GETP(_OBJ, "MIRROR-DIR");
    _WRD = DIR_NAMES[_DIR];
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(_OBJ));
        NOTE_MIRROR(_OBJ, _WRD);
        TELL(C("."));
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("BUBBLES")) {
        TELL("There's only one ", B("BUBBLE"), " here.", CR);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        MIRROR_REFLECTS();
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO);
        NOTE_MIRROR(_OBJ, _WRD);
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_POINT_AT, V_PUSH_TO)) {
        if(!(isLIT)) {
            TOO_DARK();
            return true;
        } else if(isPRSI(URGRUE)) {
            _X = GETP(PRSI, "DNUM");
            if(isEQUAL(_X, _DIR)) {
                ALREADY_FACING();
                return true;
            }
            NEW_MIRROR_DIR(_X);
            return true;
        } else if(isPRSI(INTDIR)) {
            if((isEQUAL(P_DIRECTION, "UP", "DOWN")
  ||  isEQUAL(P_DIRECTION, "IN", "OUT"))) {
                TELL(CTHEO);
                PRINT(" can't be moved that way.|");
                return true;
            } else if(isEQUAL(PDIR_LIST[_DIR], P_DIRECTION)) {
                ALREADY_FACING();
                return true;
            }
            NEW_MIRROR_DIR((0 - (P_DIRECTION - asDIRECTION("NORTH"))));
            return true;
        }
        NYMPH_APPEARS();
        TELL("To direct the mirror, simply specify a ", INTDIR
, "; for example, TURN THE MIRROR TO THE NORTH or AIM MIRROR SW");
        PRINT(". Bye!\"|  She disappears with a wink.|");
        return true;
    } else if(isVERB(V_SPIN, V_SWING, V_TURN, V_PUSH, V_MOVE)) {
        while(true) {
            _X = (RANDOM(7) | 1);
            if(isEQUAL(_X, _DIR)) {
                continue;
            }break;
        }
        WINDOW(SHOWING_ROOM);
        PUTP(PRSO, "MIRROR-DIR", _X);
        TELL(CTHEO
, " spins randomly around, slows and stops. It's now facing "
, B(DIR_NAMES[_X]), PERIOD);
        if(isEQUAL(GETP(HERE, "MIRROR-OBJ"), _OBJ)) {
            REFLECTIONS();
        }
        return true;
    } else if(isVERB(V_LOOK_INSIDE)) {
        TELL(YOU_SEE);
        if(isIN(QUEEN, HERE)) {
            TELL(THE(QUEEN));
        } else {
            TELL(ME);
        }
        TELL(" reflected in ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_HIT, V_SQUEEZE, V_KICK, V_REACH_IN, V_POP, V_MUNG)) {
        DESTROY_MIRROR(_OBJ);
        SAY_MIRROR_POPS(_OBJ);
        return true;
    } else if(isVERB(V_THROW)) {
        MOVE(PRSI, HERE);
        TELL(CTHEI, " strikes ", THEO, ", ");
        if(GETP(PRSI, "SIZE") < 1) {
            WINDOW(SHOWING_ROOM);
            TELL("slides off and lands at your feet.", CR);
            return true;
        }
        TELL("which explodes with a flabby ");
        ITALICIZE("pop");
        PRINT(PERIOD);
        DESTROY_MIRROR(_OBJ);
        return true;
    } else if((_X = isENTERING())) {
        TELL("Wrong fantasy.", CR);
        return true;
    } else {
        return false;
    }
}

function ALREADY_FACING() {
    TELL(CTHEO, " is already facing that way.", CR);
    return true;
}

function NEW_MIRROR_DIR(_DIR) {
    PUTP(PRSO, "MIRROR-DIR", _DIR);
    TELL("You carefully rotate ", THEO, " until it faces "
, B(DIR_NAMES[_DIR]), PERIOD);
    if(isEQUAL(GETP(HERE, "MIRROR-OBJ"), PRSO)) {
        REFLECTIONS();
        return true;
    }
    WINDOW(SHOWING_ROOM);
    return true;
}

function MIRROR_REFLECTS() {
    PCLEAR();
    TELL(CTHE(MIRROR0), " reflects on your words in silence.", CR);
    return true;
}

/*function isPATTERN_MATCH() {
    let _WRD;
    if(!(isEQUAL(P_LEXV[P_CONT], "MIRROR"))) {
        return true;
    }
    P_CONT = (P_CONT + P_LEXELEN);
    _WRD = P_LEXV[P_CONT];
    if(isEQUAL(_WRD, "THEN", ",", "PERIOD")) {
        P_CONT = (P_CONT + P_LEXELEN);
        _WRD = P_LEXV[P_CONT];
    }
    if(!(_WRD)) {
        return false;
    } else if(!(isEQUAL(_WRD, "IN", "ON"))) {
        return true;
    }
    P_CONT = (P_CONT + P_LEXELEN);
    _WRD = P_LEXV[P_CONT];
    if(isEQUAL(_WRD, "THE", "A")) {
        P_CONT = (P_CONT + P_LEXELEN);
        _WRD = P_LEXV[P_CONT];
    }
    if(!(_WRD)) {
        return false;
    } else if(!(isEQUAL(_WRD, "AIR", "WALL"))) {
        return true;
    }
    P_CONT = (P_CONT + P_LEXELEN);
    _WRD = P_LEXV[P_CONT];
    if(isEQUAL(_WRD, "THEN", ",", "PERIOD")) {
        if(!(isEQUAL(_WRD, "THEN"))) {
            CHANGE_LEXV(P_CONT, "THEN");
        }
        P_CONT = (P_CONT + P_LEXELEN);
        _WRD = P_LEXV[P_CONT];
    }
    if(!(_WRD)) {
        return false;
    }
    return true;
}*/

var SUNBEAM = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "sunbeam",
	FLAGS: [NODESC],
	SYNONYM: ["SUNBEAM", "BEAM", "LIGHT", "SUNLIGHT", "DAYLIGHT"],
	ADJECTIVE: ["LIGHT", "SUN"],
	ACTION: SUNBEAM_F
});

function SUNBEAM_F() {
    let _DIR;
    _DIR = GETP(HERE, "BEAM-DIR");
    if(isEQUAL(_DIR, NO_MIRROR)) {
        if((isHERE(SE_CAVE)
  &&  isIS(SWALL, OPENED))) {
            _DIR = I_SE;
        } else {
            TELL(CANT, "see that here.", CR);
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " is coming from the "
, B(DIR_NAMES[_DIR]), PERIOD);
        return true;
    } else if(isVERB(V_WALK_TO, V_FOLLOW)) {
        DO_WALK(PDIR_LIST[_DIR]);
        return true;
    } else {
        return false;
    }
}

var JAR = () => OBJECT({
	DESC: "crystal jar",
	FLAGS: [TAKEABLE, CONTAINER, TRANSPARENT, OPENABLE],
	SIZE: 2,
	CAPACITY: 1,
	VALUE: 20,
	SYNONYM: ["JAR", "LIQUID", "SOAP", "CONTENTS", "LID", "TOP"],
	ADJECTIVE: ["CRYSTAL", "RICH", "PEARLY"],
	DESCFCN: JAR_F,
	CONTFCN: JAR_F,
	ACTION: JAR_F
});

function JAR_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(XA, JAR, " glitters in the ");
        _X = isLIGHT_SOURCE();
        if(!(_X)) {
            TELL("dim ");
        } else if(isEQUAL(_X, SUN)) {
            TELL(SUN);
        } else {
            PRINTD(_X);
            TELL("'s ");
        }
        TELL("light.");
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if(isIS(JAR, OPENED)) {
            
        } else if((_X = isTOUCHING())) {
            YOUD_HAVE_TO("open", JAR);
            return true;
        }
        return false;
    } else if(isNOUN_USED("LID", "TOP")) {
        if(isVERB(V_CLOSE, V_PLUG_IN)) {
            
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL("The jar's lid is ");
            if(isIS(PRSO, OPENED)) {
                TELL("open.", CR);
                return true;
            }
            TELL("closed.", CR);
            return true;
        } else if(isVERB(V_LOOK_UNDER)) {
            V_OPEN();
            return true;
        } else if((_X = isMOVING())) {
            TELL("The jar's lid");
            PRINT(" can't be moved that way.|");
            return true;
        }
    } else if(isNOUN_USED("LIQUID", "SOAP", "CONTENTS")) {
        if(isTHIS_PRSI()) {
            
        } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
            TELL("The rich, pearly liqEMPTY_INTOuid ");
            SAY_LIQUID();
            return true;
        } else if(isVERB(V_TOUCH, V_SQUEEZE, V_PUSH)) {
            TOUCH_LIQUID();
            return true;
        } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE, V_UNPLUG)) {
            IMPOSSIBLE();
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if((isVERB(V_POUR_FROM)
  &&  isPRSO(PRSI))) {
            if(isEQUAL(P_NAMW[0]
, "LIQUID", "SOAP", "CONTENTS")) {
                
            } else if(!(isEQUAL(P_OFW[0]
, "LIQUID", "SOAP", "CONTENTS"))) {
                return false;
            }
            if(isEQUAL(P_NAMW[1]
, "LIQUID", "SOAP", "CONTENTS")) {
                return false;
            } else if(isEQUAL(P_OFW[1]
, "LIQUID", "SOAP", "CONTENTS")) {
                return false;
            }
            if(!(isIS(PRSI, OPENED))) {
                ITS_CLOSED(PRSI);
                return true;
            }
            EMPTY_JAR();
            return true;
        } else if(isVERB(V_PUT, V_PUT_UNDER, V_EMPTY_INTO)) {
            if((isVERB(V_PUT_UNDER)
  &&  !(isEQUAL(P_PRSA_WORD, "DIP"
, "SUBMERGE")))) {
                return false;
            } else if(!(isIS(PRSI, OPENED))) {
                YOUD_HAVE_TO("open", PRSI);
                return true;
            } else if(isPRSO(CIRCLET)) {
                if(isVERB(V_PUT_UNDER)) {
                    DIP_CIRCLET();
                    return true;
                } else if(!(isIS(PRSO, SEEN))) {
                    RENEW_FILM();
                }
                return false;
            } else if(isIN(CIRCLET, PRSI)) {
                YOUD_HAVE_TO("take out", CIRCLET);
                return true;
            } else if(GETP("SIZE", PRSO) > 1) {
                TELL(CTHEO, " is too big to fit in "
, THEI, PERIOD);
                return true;
            }
            VANISH();
            TELL("As you drop ");
            O_INTO_I(0);
            TELL(", it melts into the pearly liquid and disappears.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(XTHE);
        if(isIS(PRSO, OPENED)) {
            TELL(B("OPEN"));
        } else {
            TELL(B("CLOSED"));
        }
        TELL(" jar appears to have been carved from a solid block of crystal.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        TELL(CTHEO, " is filled with a rich, pearly liquid that ");
        SAY_LIQUID();
        return true;
    } else if(isVERB(V_EMPTY, V_EMPTY_INTO, V_POUR)) {
        if(!(isIS(PRSO, OPENED))) {
            ITS_CLOSED();
            return true;
        }
        EMPTY_JAR();
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_UNPLUG)) {
        V_OPEN();
        return true;
    } else if(isVERB(V_DRINK, V_TASTE, V_KISS, V_SMELL)) {
        if(!(isNOUN_USED("LIQUID", "SOAP", "CONTENTS"))) {
            TELL("[the ", B("LIQUID"), BRACKET);
        }
        if(!(isIS(PRSO, OPENED))) {
            ITS_CLOSED();
            return true;
        }
        TELL("Its sharp, metallic odor ");
        if(isVERB(V_SMELL)) {
            TELL("makes your nostrils burn.", CR);
            return true;
        }
        TELL("changes your mind.", CR);
        return true;
    } else if(isVERB(V_SHAKE)) {
        if(isIS(PRSO, OPENED)) {
            EMPTY_JAR();
            return true;
        }
        TELL("The liquid in ", THEO
, " swirls around.", CR);
        return true;
    } else if(isVERB(V_REACH_IN)) {
        TOUCH_LIQUID();
        return true;
    } else {
        return false;
    }
}

function EMPTY_JAR() {
    TELL("The liquid seems quite content in its little jar, and refuses to come out despite vigorous turning and shaking.", CR);
    return true;
}

function TOUCH_LIQUID() {
    if(!(isIS(PRSO, OPENED))) {
        ITS_CLOSED();
        return true;
    }
    TELL("You feel a sharp, metallic sensation.", CR);
    return true;
}

function SAY_LIQUID() {
    TELL("swirls and shimmers with a life all its own");
    if(isIN(CIRCLET, JAR)) {
        TELL(". A ", CIRCLET, " is suspended within");
    }
    PRINT(PERIOD);
    return true;
}

var CIRCLET = () => OBJECT({
	LOC: JAR,
	DESC: "circlet",
	FLAGS: [TAKEABLE, SEEN],
	SIZE: 1,
	VALUE: 0,
	SYNONYM: ["CIRCLET", "CIRCLE", "BUBBLE", "BUBBLES", "FILM"],
	ADJECTIVE: ["SWIRLING"],
	GENERIC: GENERIC_BUBBLE_F,
	ACTION: CIRCLET_F
});

"SEEN = bubbly."

function GENERIC_BUBBLE_F(_TBL, _LEN=_TBL[0]) {
    let _X;
    _TBL = REST(_TBL, 2);
    if((isVERB(V_BLOW_INTO)
  //&&  (_X = isINTBL(CIRCLET, _TBL, _LEN)))) {
    &&  _TBL.slice(0, _LEN).includes(CIRCLET))) {
        return CIRCLET;
    } else if(_LEN > 2) {
        return false;
    }
    _X = _TBL[0];
    if(isEQUAL(_X, CIRCLET)) {
        return _TBL[1];
    }
    return _X;
}

function CIRCLET_F() {
    let _X, _B;
    _B = isNOUN_USED("BUBBLE", "BUBBLES");
    if(isIS(CIRCLET, SEEN)) {
        
    } else if((isNOUN_USED("FILM")
  ||  isADJ_USED("SWIRLING"))) {
        PCLEAR();
        TELL(CANT, "see any", AT_MOMENT);
        return RFATAL();
    }
    if(isVERB(V_BLOW_INTO)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        }
        TELL(CYOU);
        if(isIS(PRSO, SEEN)) {
            
        } else if(isT(_B)) {
            if(isVISIBLE(JAR)) {
                TELL("dip ", THEO, SIN, THE(JAR
), ", draw it out and blow into the swirling film.", CR);
                START_MIRROR();
                return true;
            }
        }
        TELL("blow gently into the ");
        if(isEMPTY_CIRCLET()) {
            return true;
        }
        TELL(PRSO, "'s swirling film.", CR);
        START_MIRROR();
        return true;
    } else if(isT(_B)) {
        PCLEAR();
        TELL(CANT, "see any ", B("BUBBLES"), " here.", CR);
        return RFATAL();
    }
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            TELL(CTHEI, " is much too small.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_SWING)) {
        TELL(CYOU, B(P_PRSA_WORD), STHE);
        if(isEMPTY_CIRCLET()) {
            return true;
        }
        TELL(PRSO, " through the air.", CR);
        START_MIRROR();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The flat, hollow ", PRSO);
        if(isIN(PRSO, JAR)) {
            TELL(SIN, THE(JAR));
        }
        TELL(" is attached to a short handle");
        if(isIS(PRSO, SEEN)) {
            TELL(", and is filled with a swirling film");
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

function DIP_CIRCLET() {
    TELL("You dip ", THE(CIRCLET), SINTO, THE(JAR), PERIOD);
    if(!(isIS(CIRCLET, SEEN))) {
        RENEW_FILM();
    }
    return false;
}

function isEMPTY_CIRCLET() {
    if(isIS(CIRCLET, SEEN)) {
        KILL_FILM();
        return false;
    }
    TELL("empty ", CIRCLET);
    BUT_NOTHING_HAPPENS();
    return true;
}

function KILL_FILM() {
    UNMAKE(CIRCLET, SEEN);
    isREPLACE_SYN("CIRCLET", "FILM", "ZZZP");
    isREPLACE_ADJ("CIRCLET", "SWIRLING", "ZZZP");
    return false;
}

function RENEW_FILM() {
    MAKE(CIRCLET, SEEN);
    isREPLACE_SYN("CIRCLET", "ZZZP", "FILM");
    isREPLACE_ADJ("CIRCLET", "ZZZP", "SWIRLING");
    return false;
}

function START_MIRROR() {
    let _LEN, _OBJ, _X;
    if(!(isLIT)) {
        TELL(TAB, "Moments later, you hear a flabby ");
        ITALICIZE("pop");
        TELL(PERIOD);
        return true;
    }
    _X = isPLAIN_ROOM();
    if((isT(_X)
  ||  isHERE(ON_BRIDGE, APLANE, IN_SKY, IN_SPLENDOR))) {
        SAY_BUBBLE();
        TELL(", but ");
        if(isT(_X)) {
            MAKE(CORBIES, SEEN);
            TELL("a corbie instantly swoops down to pop it.", CR);
            return true;
        } else if(isHERE(ON_BRIDGE)) {
            TELL("river mist instantly dissolves it.", CR);
            return true;
        } else if(isHERE(APLANE, IN_SPLENDOR)) {
            TELL("it");
            PRINT(" disappears in a spectral flash");
            TELL(PERIOD);
            return true;
        }
        TELL("upper air currents soon blow it out of sight.", CR);
        return true;
    }

    _LEN = MIRROR_LIST[0];
    while(true) {
        _OBJ = toOBJECT(MIRROR_LIST[_LEN]);
        _X = LOC(_OBJ);
        if(!(_X)) {
            break;
        } else if(isEQUAL(_X, HERE)) {
            DESTROY_MIRROR(_OBJ);
            SAY_BUBBLE();
            TELL(" and bounces into the other bubble hovering nearby. Both disappear with a flabby ");
            ITALICIZE("pop");
            TELL(PERIOD);
            return true;
        } else if(--_LEN < 1) {
            SAY_BUBBLE();
            TELL(", but it pops almost immediately.", CR);
            break;
        }
    }

    SAY_BUBBLE();
    TELL("! You watch as it flattens into a perfectly circular mirror, rotating more and more slowly until it faces "
, B(DIR_NAMES[isCREATE_MIRROR(_OBJ)]), PERIOD);
    if(isIN(URGRUE, HERE)) {
        TELL(TAB, "\"How droll,\" remarks ", THE(URGRUE), PERIOD);
    }
    if(isEQUAL(GETP(HERE, "MIRROR-OBJ"), NO_MIRROR)) {
        PUTP(HERE, "MIRROR-OBJ", _OBJ);
        REFLECTIONS();
    }
    return true;
}

function SAY_BUBBLE() {
    TELL(TAB
, "A silvery bubble blows out of ", THE(CIRCLET));
    return true;
}

function REFLECTIONS() {
    let _ALERT=0, _POPIT=0, _RM, _TBL, _X, _OBJ, _ANGLE, _DIR, _XDIR;
    _X = GRUE_ROOMS[0];
    while(true) {
        _RM = toROOM(GRUE_ROOMS[_X]);
        if(isEQUAL(HERE, _RM)) {
            ++_ALERT
        }
        UNMAKE(_RM, LIGHTED);
        PUTP(_RM, "BEAM-DIR", NO_MIRROR);
        if(--_X < 1) {
            break;
        }
    }

    if(isIS(NWALL, OPENED)) {
        MAKE(NE_CAVE, LIGHTED);
    }
    if(isIS(SWALL, OPENED)) {
        MAKE(SE_CAVE, LIGHTED);
    }

    _OBJ = GETP(SE_CAVE, "MIRROR-OBJ");
    if(isEQUAL(_OBJ, null, NO_MIRROR)) {
        
    } else if((isIS(SWALL, OPENED)
  &&  isEQUAL(GETP(_OBJ, "MIRROR-DIR"), I_SOUTH))) {
        PUTP(SE_CAVE, "BEAM-DIR", I_SE);
        MAKE(SE_CAVE, LIGHTED);
        _RM = SE_CAVE;
        _DIR = I_SW;
        while(true) {
            _TBL = GETP(_RM, PDIR_LIST[_DIR]);
            if(!(_TBL)) {
                break;
            } else if(!(isEQUAL(MSB(_TBL[XTYPE])
, CONNECT, SCONNECT))) {
                break;
            }
            _XDIR = (_DIR + 4);            /*"Establish opposite DIR."*/
            if(_XDIR > I_NW) {
                _XDIR = (_XDIR - 8);
            }
            _RM = toROOM(_TBL[XROOM]);            /*"Check next room."*/
            _OBJ = GETP(_RM, "MIRROR-OBJ");            /*"Got a mirror?"*/
            if(!(_OBJ)) {
                /*"Escaped caves, so done."*/
                break;
            } else if(isIS(_RM, LIGHTED)) {
                ++_POPIT
            }
            PUTP(_RM, "BEAM-DIR", _XDIR);
            MAKE(_RM, LIGHTED);

            if(isEQUAL(_OBJ, NO_MIRROR)) {
                /*"Continue if none."*/
                continue;
            }
            _ANGLE = GETP(_OBJ, "MIRROR-DIR");            /*"Angle of new."*/
            if(isEQUAL(_ANGLE, _DIR)) {
                /*"Back facing beam?"*/
                if(isHERE(_RM)) {
                    TELL(TAB, "The back of ", THE(MIRROR0
), " is illuminated by a sunbeam.", CR);
                }
                break;
            } else if(isEQUAL(_ANGLE, _XDIR)) {
                if(isHERE(_RM)) {
                    TELL(TAB, "A sunbeam is reflected "
, B(DIR_NAMES[_XDIR]
), PERIOD);
                }
                break;
            }
            _X = (_DIR + 2);            /*"Check for edge-on mirror."*/
            if(_X > I_NW) {
                _X = (_X - 8);
            }
            if(isEQUAL(_ANGLE, _X)) {
                if(isHERE(_RM)) {
                    MENTION_GLIMMER(_XDIR);
                }
                continue;
            }
            _X = (_DIR - 2);            /*"Check other edge."*/
            if(_X < I_NORTH) {
                _X = (_X + 8);
            }
            if(isEQUAL(_ANGLE, _X)) {
                if(isHERE(_RM)) {
                    MENTION_GLIMMER(_XDIR);
                }
                continue;
            }
            _X = (_DIR + 3);            /*"Check for CW reflection."*/
            if(_X > I_NW) {
                _X = (_X - 8);
            }
            if(isEQUAL(_ANGLE, _X)) {
                _DIR = (_DIR + 2);
                if(_DIR > I_NW) {
                    _DIR = (_DIR - 8);
                }
                if(isHERE(_RM)) {
                    SAY_BEAM(_XDIR, _DIR);
                }
                continue;
            }
            _X = (_DIR + 5);            /*"Check for CCW reflection."*/
            if(_X > I_NW) {
                _X = (_X - 8);
            }
            if(isEQUAL(_ANGLE, _X)) {
                _DIR = (_DIR - 2);
                if(_DIR < I_NORTH) {
                    _DIR = (_DIR + 8);
                }
                if(isHERE(_RM)) {
                    SAY_BEAM(_XDIR, _DIR);
                }
                continue;
            }
            break;
        }
    }
    if(isT(_ALERT)) {
        SAY_IF_HERE_LIT();
    }
    REFRESH_MAP();
    if(isT(_POPIT)) {
        PUTP(GETP(SE_CAVE, "MIRROR-OBJ"), "SIZE", 1);
    }
    return false;
}

function SAY_BEAM(_FROM, _TO) {
    PRINT("  A beam of sunlight ");
    TELL("is reflected ", B(DIR_NAMES[_FROM]
), STO, B(DIR_NAMES[_TO]));
    if((isHERE(IN_LAIR)
  &&  isEQUAL(_TO, I_SE)
  &&  isIN(URGRUE, IN_LAIR))) {
        KILL_URGRUE();
        return true;
    }
    TELL(PERIOD);
    return true;
}

function MENTION_GLIMMER(_DIR) {
    TELL(TAB, XTHE, B(DIR_NAMES[_DIR]
), " edge of the mirror gleams.", CR);
    return true;
}

function URGRUE_GETS_COCO(_I=null) {
    DEQUEUE(I_IMPS_TAKE);
    IMPSAY = 4;
    QUEUE(I_IMPQUEST);
    REMOVE(COCO);
    MAKE(COCO, NODESC);
    MAKE(COCO, SEEN);
    WINDOW(SHOWING_ROOM);
    TELL("As ");
    if(!(_I)) {
        TELL("you reach");
    } else {
        TELL("the Implementor reaches");
    }
    TELL(" towards ", THE(COCO
), `, a vortex of laughing darkness boils up from underfoot!
  \"More company,\" sighs the `);
    PRINT("cheerful-looking Implementor");
    TELL(PTAB
, "You back away from the zone of darkness as it spreads across the Plane, reaching out with long black fingers, searching, searching..", PTAB);
    ITALICIZE("Slurp");
    TELL("! ", CTHE(COCO
), ` falls into the eye of the vortex and disappears, along with a stack of lunch meat and bits of cutlery from the Implementors' table. Then, with a final chortle, the vortex draws itself together, turns sideways and flickers out of existence.
  \"Ur-grue?\" asks the only woman Implementor.
  \"Ur-grue,\" nods another.`, CR);
    return true;
}

var PLAZA = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "plaza",
	FLAGS: [NODESC],
	SYNONYM: ["PLAZA"],
	ACTION: HERE_F
});

"SEEN = assigned."

var ARCH = () => OBJECT({
	DESC: "arch",
	FLAGS: [VEHICLE, VOWEL, CONTAINER, OPENED, SURFACE],
	SYNONYM: ["ARCH", "OPENING"],
	ADJECTIVE: ["STONE", "ROCK"],
	CAPACITY: 1000,
	DESCFCN: ARCH_F,
	ACTION: ARCH_F
});

function ARCH_F(_CONTEXT=null) {
    let _TIME, _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A crumbling stone arch stands ");
            if(isEQUAL(ATIME, PRESENT)) {
                TELL("at the exact center of ", THE(PLAZA));
            } else {
                TELL("nearby");
            }
            if(isSEE_ANYTHING_IN(ARCH)) {
                TELL(". Beneath it you see ");
                CONTENTS(ARCH);
            }
            TELL(C("."));
            P_IT_OBJECT = ARCH;
            return true;
        } else if(isEQUAL(_CONTEXT, M_BEG)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(isCANT_REACH_WHILE_IN(_OBJ, ARCH)) {
                return true;
            }
            return isHANDLE_ARCH_ROOMS(_CONTEXT);
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON)) {
            TELL("The top of ", THEI, " is high out of reach.", CR);
            return true;
        } else if(isVERB(V_THROW_OVER)) {
            WASTE_OF_TIME();
            return true;
        } else if(isVERB(V_PUT_UNDER)) {
            if(isIN(PLAYER, PRSI)) {
                PERFORM("DROP", PRSO);
                return true;
            }
            PERFORM("PUT", PRSO, PRSI);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " is tall and narrow. The opening beneath is shaped like an hourglass.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_LOOK_UNDER, V_SEARCH)) {
        if(isIN(PLAYER, PRSO)) {
            ASIDE_FROM();
        } else {
            TELL(YOU_SEE);
        }
        CONTENTS();
        TELL(" under ", THEO, PERIOD);
        P_IT_OBJECT = PRSO;
        return true;
    } else if(isVERB(V_ENTER, V_THROUGH, V_WALK_TO, V_STAND_UNDER, V_FOLLOW)) {
        ENTER_ARCH();
        return true;
    } else if((_X = isEXITING())) {
        EXIT_ARCH();
        return RFATAL();
    } else if(isVERB(V_WALK_AROUND, V_LOOK_BEHIND)) {
        if(isIN(PLAYER, PRSO)) {
            YOUD_HAVE_TO("leave");
            return true;
        }
        TELL("You walk slowly around ", THEO
, ", but find nothing ", PICK_NEXT(YAWNS), PERIOD);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        TELL("The sides of ", THEO, " are too steep to climb.", CR);
        return true;
    } else if(isVERB(V_CLOSE)) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

function ENTER_ARCH() {
    if(isIN(PLAYER, ARCH)) {
        TELL(ALREADY, "under ", THE(ARCH), PERIOD);
        return false;
    } else if(isDROP_ONION_FIRST()) {
        return false;
    }
    OLD_HERE = null;
    P_WALK_DIR = null;
    MOVE(PLAYER, ARCH);
    TELL("You step beneath the shadow of ", THE(ARCH), PERIOD);
    if((isIN(MINX, HERE)
  &&  isIS(MINX, LIVING))) {
        I_MINX();
    }
    if((isIN(DACT, HERE)
  &&  isIS(DACT, LIVING)
  &&  !(isIS(DACT, SLEEPING)))) {
        WINDOW(SHOWING_ROOM);
        REMOVE(DACT);
        TELL(TAB, CTHE(DACT
), " spreads its wings and soars out of sight.", CR);
    }
    if(!(DMODE)) {
        CRLF();
    }
    if(isT(GLASS_TOP)) {
        ARCH_ON();
    }
    return false;
}

function EXIT_ARCH() {
    if(!(isIN(PLAYER, ARCH))) {
        TELL("You're not under ", THE(ARCH), PERIOD);
        return false;
    } else if(isIS(ARCH, SEEN)) {
        PRINT("Such movement is meaningless now.");
        CRLF();
        return false;
    }
    OLD_HERE = null;
    MOVE(PLAYER, HERE);
    TELL("You step out from under ", THE(ARCH), PERIOD);
    if(!(DMODE)) {
        CRLF();
    }
    return false;
}

function ARCH_ON() {
    if((isIN(PLAYER, ARCH)
  &&  !(isIS(GLASS, NEUTRALIZED)))) {
        TURN_ON_ARCH();
    }
    return false;
}

function TURN_ON_ARCH() {
    let _DIR, _TBL, _X;
    MAKE(ARCH, SEEN);
    P_WALK_DIR = null;
    OLD_HERE = null;
    PUTP(HERE, "EXIT-STR", "Such movement is meaningless now.");
    if(!(isHERE(ARCH_VOID))) {
        isNEW_EXIT(HERE, "OUT", NO_EXIT);
    }
    isNEW_EXIT(HERE, "NORTH", (FCONNECT + 9 + MARKBIT), TIMESHIFT);
    isNEW_EXIT(HERE, "SOUTH", (FCONNECT + 9 + MARKBIT), TIMESHIFT);
    if(isEQUAL(ATIME, PRESENT)) {
        _DIR = asDIRECTION("NW");
        while(true) {
            if(!(isEQUAL(toDIRECTION(_DIR), "SOUTH"))) {
                _TBL = GETP(HERE, toDIRECTION(_DIR));
                if(isT(_TBL)) {
                    _X = (_TBL[XTYPE] & 255);
                    _TBL[XTYPE] = (_X + NO_EXIT);
                }
            }
            if(++_DIR > asDIRECTION("NE")) {
                break;
            }
        }
    }
    MOVE(LIGHTSHOW, ARCH);
    TELL(TAB);
    if(isIS(ARCH, IDENTIFIED)) {
        TELL("The nightmare sensation returns");
    } else {
        MAKE(ARCH, IDENTIFIED);
        TELL("A nightmare sensation grips your senses! Your field of vision warps into a narrow ", LIGHTSHOW, ", stretching ");
        PRINT("north and south into infinity");
    }
    PRINT(PERIOD);
    if(!(DMODE)) {
        CRLF();
    }
    return false;
}

function ARCH_OFF() {
    let _X;
    _X = LOC(PLAYER);
    if((isEQUAL(_X, ARCH, LOC(ARCH))
  &&  isIS(ARCH, SEEN))) {
        TURN_OFF_ARCH();
    }
    return false;
}

function TURN_OFF_ARCH() {
    let _DIR, _TBL, _X, _STR;
    UNMAKE(ARCH, SEEN);
    P_WALK_DIR = null;
    OLD_HERE = null;
    isNEW_EXIT(HERE, "NORTH", NO_EXIT);
    isNEW_EXIT(HERE, "SOUTH", NO_EXIT);
    _STR = "An irresistible force keeps you near the arch.";
    if(isHERE(ARCH_VOID)) {
        _STR = "Only void lies that way.";
    } else {
        isNEW_EXIT(HERE, "OUT", (FCONNECT + MARKBIT));
        if(isEQUAL(ATIME, PRESENT)) {
            _STR = "Ruins block your path.";
            _DIR = asDIRECTION("NW");
            while(true) {
                if(!(isEQUAL(toDIRECTION(_DIR), "SOUTH"))) {
                    _TBL = GETP(HERE, toDIRECTION(_DIR));
                    if(isT(_TBL)) {
                        _X = (_TBL[XTYPE] & 255);
                        _TBL[XTYPE] = (_X + CONNECT);
                    }
                }
                if(++_DIR > asDIRECTION("NE")) {
                    break;
                }
            }
        }
    }
    PUTP(HERE, "EXIT-STR", _STR);
    REMOVE(LIGHTSHOW);
    TELL(TAB);
    if(isIS(PLAZA, IDENTIFIED)) {
        TELL("Y");
    } else {
        MAKE(PLAZA, IDENTIFIED);
        TELL("The infinite ", LIGHTSHOW
, " abruptly collapses, and y");
    }
    TELL("our field of view snaps back to normal.", CR);
    if(!(DMODE)) {
        CRLF();
    }
    return false;
}

var LIGHTSHOW = () => OBJECT({
	DESC: "corridor of light",
	FLAGS: [NODESC],
	SYNONYM: ["CORRIDOR", "LIGHT"],
	ADJECTIVE: ["INFINITE", "INFINITY"],
	ACTION: LIGHTSHOW_F
});

function LIGHTSHOW_F() {
    let _X;
    if((isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE)
  ||  (_X = isENTERING())
  ||  (_X = isEXITING()))) {
        TELL(CTHEO, " seems to extend ");
        PRINT("north and south into infinity");
        PRINT(PERIOD);
        return true;
    } else if((_X = isTOUCHING())) {
        CANT_FROM_HERE();
        return true;
    } else if((_X = isSEEING())) {
        CANT_SEE_MUCH();
        return true;
    }
    USELESS(LIGHTSHOW);
    return RFATAL();
}

var HELM = () => OBJECT({
	LOC: PRINCE,
	DESC: "helmet",
	SDESC: DESCRIBE_HELM,
	FLAGS: [TAKEABLE, CLOTHING, FERRIC],
	SIZE: 2,
	EFFECT: 5,
	EMAX: 5,
	VALUE: 25,
	DNUM: 25,
	SYNONYM: ["HELM", "HELMET", "HEADPIECE", "PHEE", "PHEEHELM"],
	ADJECTIVE: ["PHEE"],
	ACTION: HELM_F
});


function HELM_F() {
    let _FX;
    _FX = GETP(HELM, "EFFECT");
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("This dazzling treasure is so heavily crusted with jewels, it's hard to see the precious metals underneath.", CR);
        return true;
    } else if((isVERB(V_WEAR)
  &&  !(isIS(PRSO, WORN)))) {
        if(isDONT_HAVE()) {
            return true;
        }
        WINDOW(SHOWING_INV);
        MAKE(PRSO, WORN);
        TELL("You lower ", THEO, " onto ", HEAD);
        if(isIN(GRUE, HERE)) {
            WINDOW(SHOWING_ROOM);
            TELL(COMMA_AND, A(GRUE
), " takes shape in the darkness nearby");
        }
        PRINT(PERIOD);
        UPDATE_STAT(_FX, ARMOR_CLASS);
        if(!(isIS(PRSO, NEUTRALIZED))) {
            WINDOW(SHOWING_ALL);
            UPDATE_STAT(30, INTELLIGENCE);
        }
        return true;
    } else if((isVERB(V_TAKE_OFF)
  &&  isIS(PRSO, WORN)
  &&  isIN(PRSO, PLAYER))) {
        WINDOW(SHOWING_INV);
        UNMAKE(PRSO, WORN);
        TELL("You lift ", THEO, " off ", HEAD);
        if(isIN(GRUE, HERE)) {
            WINDOW(SHOWING_ROOM);
            TELL(COMMA_AND, THE(GRUE
), " merges into the darkness");
        }
        TELL(PERIOD);
        UPDATE_STAT((0 - _FX), ARMOR_CLASS);
        if(!(isIS(PRSO, NEUTRALIZED))) {
            NORMAL_IQ();
        }
        return true;
    } else {
        return false;
    }
}

function NORMAL_IQ() {
    let _X, _MAX;
    WINDOW(SHOWING_ALL);
    _X = STATS[INTELLIGENCE];
    _MAX = MAXSTATS[INTELLIGENCE];
    if(_X > _MAX) {
        UPDATE_STAT((0 - (_X - _MAX)), INTELLIGENCE);
    }
    return false;
}

var BHORSE = () => OBJECT({
	DESC: "black stallion",
	FLAGS: [SURFACE, LIVING],
	SYNONYM: ["STALLION", "HORSE"],
	ADJECTIVE: ["BLACK", "DARK"],
	DESCFCN: BHORSE_F,
	ACTION: BHORSE_F
});

function BHORSE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A black horse");
            PRINT(" bears a sinister knight.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            BATTLE_MISS();
            return true;
        } else if((_X = isPUTTING())) {
            CANT_FROM_HERE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO);
        PRINT(" bears a sinister knight.");
        CRLF();
        return true;
    } else if((_X = isCLIMBING_ON())) {
        NOT_LONELY(KNIGHT);
        return true;
    } else if((_X = isTALKING())) {
        NOT_LIKELY();
        PRINT(" would respond.|");
        return true;
    } else if((_X = isTOUCHING())) {
        ZING();
        return true;
    } else {
        return false;
    }
}

function SLAY_HORSE() {
    MOVE(DEAD_HORSE, HERE);
    WINDOW(SHOWING_ROOM);
    UNMAKE(PRINCE, NODESC);
    MOVE(HORSE, TRENCH);
    UNMAKE(TRENCH, OPENED);
    MAKE(HORSE, NODESC);
    UNMAKE(HORSE, LIVING);
    /*isREPLACE_ADJ(HORSE, "ZZZP", "DEAD");*/
    /*PUTP(HORSE, "ACTION", DEAD_HORSE_F);*/
    TELL("stray arrow strikes the prince's stallion in the flank. The luckless beast shrieks piteously, stumbles into ", THE(TRENCH), " and lies still.", CR);
    return true;
}

var HORSE = () => OBJECT({
	DESC: "stallion",
	SDESC: DESCRIBE_HORSE,
	FLAGS: [SURFACE, LIVING],
	CAPACITY: 25,
	SYNONYM: ["STALLION", "HORSE"],
	ADJECTIVE: ["GRAY", "GREY", "PRINCE\'S"],
	CONTFCN: HORSE_F,
	DESCFCN: HORSE_F,
	ACTION: HORSE_F
});


function HORSE_F(_CONTEXT=null) {
    let _X, _OBJ;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            if(isIN(PRINCE, HORSE)) {
                TELL("A prince sits on a ", D(HORSE), C("."));
                return true;
            }
            TELL(CA(HORSE
), " stands beside the headless body of a prince.");
            return true;
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(!(_OBJ)) {
                
            } else if((_X = isTOUCHING())) {
                TELL(CANT, "reach ", THE(_OBJ
), AT_MOMENT);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            BATTLE_MISS();
            return true;
        } else if((_X = isPUTTING())) {
            CANT_FROM_HERE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, SIS);
        if(isIN(PRINCE, PRSO)) {
            TELL("bearing ", THE(PRINCE), PERIOD);
            return true;
        }
        TELL("riderless.", CR);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        if(isIN(PRINCE, PRSO)) {
            NOT_LONELY(PRINCE);
            return true;
        }
        ZING();
        return true;
    } else if(isVERB(V_TELL, V_ASK_ABOUT, V_ASK_FOR, V_TELL_ABOUT, V_YELL)) {
        TELL(CTHE(HORSE), " pays no attention.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        ZING();
        return true;
    } else {
        return false;
    }
}

function NOT_LONELY(_WHO) {
    TELL(CTHE(_WHO), " doesn't seem lonely.", CR);
    return true;
}

function BATTLE_MISS() {
    MOVE(PRSO, HERE);
    WINDOW(SHOWING_ALL);
    TELL(CTHEO, " narrowly misses ", THEI
, " and tumbles to ", THE(GROUND), PERIOD);
    return true;
}

var DEAD_HORSE = () => OBJECT({
	DESC: "stallion",
	FLAGS: [NODESC, TRYTAKE, NOALL, SURFACE],
	SYNONYM: ["HORSE", "STALLION"],
	ADJECTIVE: ["DEAD", "GRAY", "GREY"],
	ACTION: DEAD_HORSE_F
});

function DEAD_HORSE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        } else if((_X = isPUTTING())) {
            CANT_FROM_HERE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO);
        PRINT(" is lying across ");
        TELL(THE(TRENCH), PERIOD);
        return true;
    } else if(isVERB(V_TELL, V_ASK_ABOUT, V_ASK_FOR, V_TELL_ABOUT, V_YELL)) {
        NOT_LIKELY();
        TELL(" will respond.", CR);
        return true;
    } else if((_X = isMOVING())) {
        TELL(CTHEO, " is much too heavy.", CR);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        ZING();
        return true;
    } else {
        return false;
    }
}

var TRENCH = () => OBJECT({
	DESC: "trench",
	SDESC: DESCRIBE_TRENCH,
	FLAGS: [NODESC, CONTAINER, OPENED],
	CAPACITY: 100,
	SYNONYM: ["TRENCH", "PIT", "HOLE", "ZZZP"],
	ADJECTIVE: ["ZZZP"],
	CONTFCN: TRENCH_F,
	DESCFCN: TRENCH_F,
	ACTION: TRENCH_F
});

VOC("MINXHOLE", NOUN);


function TRENCH_F(_CONTEXT=null) {
    let _X, _OBJ;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(TRENCH), " is visible on ", THE(GROUND));
            if(isSEE_ANYTHING_IN(TRENCH)) {
                TELL(". Inside it you see ");
                CONTENTS(TRENCH);
                P_IT_OBJECT = TRENCH;
            }
            TELL(C("."));
            return true;
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(isEQUAL(_OBJ, null, HORSE)) {
                return false;
            } else if(isIN(HORSE, TRENCH)) {
                
            } else if((isHERE(ARCH4)
  &&  isIN(HELM, TRENCH))) {
                SAY_SLAY();
                return RFATAL();
            } else {
                return false;
            }
            TELL(CANT);
            if((_X = isSEEING())) {
                TELL(B("SEE"));
            } else if((_X = isTOUCHING())) {
                TELL(B("REACH"));
            } else {
                TELL("do that to");
            }
            TELL(C(SP), THE(_OBJ), ". ", CTHE(HORSE
), " is blocking ", THE(TRENCH), PERIOD);
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO, V_THROW)) {
            MOVE(PRSO, PRSI);
            WINDOW(SHOWING_ALL);
            TELL(CTHEO, " rolls deep into ", THEI, PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        TELL(CTHEO);
        if(isHERE(ARCH4)) {
            TELL(" forms an unsightly gash in the plaza");
        } else {
            TELL(" looks much like any other");
        }
        if(isIN(HORSE, PRSO)) {
            TELL(". ", CA(HORSE));
            PRINT(" is lying across ");
            TELL(B("IT"));
        } else if(isSEE_ANYTHING_IN()) {
            TELL(". ");
            PRINT("Peering inside, you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        IMPOSSIBLE();
        return true;
    } else if((isVERB(V_REACH_IN)
  ||  (_X = isENTERING()))) {
        if(isIN(HORSE, TRENCH)) {
            TELL(CTHE(HORSE), " is blocking ", THEO, PERIOD);
            return true;
        } else if(isVERB(V_REACH_IN)) {
            TELL("You grope around in ", THEO);
            if(isSEE_ANYTHING_IN()) {
                TELL(", and feel something.", CR);
                return true;
            }
            TELL(", but feel nothing "
, PICK_NEXT(YAWNS), PERIOD);
            return true;
        }
        TELL(CTHEO
, "'s sides begin to crumble, so you hastily scramble out again.", CR);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

function ZING() {
    AS_YOU_APPROACH();
    TELL("an arrow zings across your path.", CR);
    return true;
}

function AS_YOU_APPROACH(_OBJ=PRSO) {
    TELL("As you approach ", THE(_OBJ), ", ");
    return true;
}

var SACK = () => OBJECT({
	LOC: HUNTER,
	DESC: "burlap sack",
	FLAGS: [TRYTAKE, NOALL, CONTAINER, OPENABLE],
	SYNONYM: ["SACK", "BAG"],
	ADJECTIVE: ["BURLAP"],
	CAPACITY: 10	/*ACTION: SACK_F*/
});

var MAW = () => OBJECT({
	DESC: "idol's maw",
	FLAGS: [NODESC, VOWEL, SURFACE, VEHICLE],
	CAPACITY: 100,
	SYNONYM: ["MOUTH", "MAW", "JAW"],
	ADJECTIVE: ["IDOL\'S", "LOWER"],
	CONTFCN: MAW_F,
	DESCFCN: MAW_F,
	ACTION: MAW_F
});

function MAW_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        _OBJ = PRSO;
        if(isTHIS_PRSI()) {
            _OBJ = PRSI;
        }
        if(isEQUAL(_CONTEXT, M_BEG)) {
            return isCANT_REACH_WHILE_IN(_OBJ, MAW);
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isIN(PLAYER, MAW)) {
                if(!(isEQUAL(_OBJ, TEAR))) {
                    return false;
                } else if(isIS(_OBJ, TAKEABLE)) {
                    return false;
                } else if((_X = isTOUCHING())) {
                    TOUCH_TEAR();
                    return RFATAL();
                }
                return false;
            } else if((_X = isTOUCHING())) {
                YOUD_HAVE_TO("climb up into", MAW);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        SEE_MAW();
        return true;
    }
    return isHANDLE_MAW();
}

function SEE_MAW() {
    TELL("The maw hangs wide open, its lower jaw touching ", THE(GROUND
), " to form an inclined walkway lined with rows of stone teeth.", CR);
    return true;
}

function isHANDLE_MAW() {
    let _X;
    if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        if(isIN(PLAYER, MAW)) {
            ASIDE_FROM();
        } else {
            TELL(YOU_SEE);
        }
        CONTENTS(MAW);
        TELL(" lying in ", THE(MAW), PERIOD);
        P_IT_OBJECT = PRSO;
        return true;
    } else if((_X = isCLIMBING_ON())) {
        ENTER_CROCO();
        if(isIN(PLAYER, MAW)) {
            return true;
        }
        return RFATAL();
    } else if((_X = isCLIMBING_OFF())) {
        EXIT_CROCO();
        return RFATAL();
    } else {
        return false;
    }
}

var CROCO = () => OBJECT({
	DESC: "idol",
	FLAGS: [NODESC, VOWEL],
	SYNONYM: ["IDOL", "CROCODILE", "STATUE"],
	ADJECTIVE: ["CROCODILE", "STONE", "ROCK"],
	ACTION: CROCO_F
});

function CROCO_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_EMPTY_INTO)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("This monstrous idol is approximately the size and shape of a subway train, not counting the limbs and tail. ");
        SEE_MAW();
        if(isIN(TEAR, MAW)) {
            TELL(TAB, CA(TEAR
), " adorns the idol's face, just below one eye.", CR);
        }
        return true;
    } else if(isHANDLE_MAW()) {
        return true;
    } else {
        return false;
    }
}

function EXIT_CROCO() {
    if(!(isIN(PLAYER, MAW))) {
        NOT_IN(MAW);
        return false;
    } else if(isIN(MAMA, MAW)) {
        TELL(CTHE(MAMA), " is blocking the way.", CR);
        return false;
    }
    CLEAR_MAW_EXITS();
    MOVE(PLAYER, LOC(MAW));
    P_WALK_DIR = null;
    TELL(CTHE(MAW), " steadies itself as you descend");
    RELOOK();
    return false;
}

function ENTER_CROCO() {
    let _TBL;
    if(isIN(PLAYER, MAW)) {
        TELL(CYOU);
        if(isIN(MAMA, MAW)) {
            TELL("squeeze ", ME
, " up as far as you can go.", CR);
            return false;
        }
        TELL("edge a bit further into the open maw.", CR);
        INTO_INNARDS();
        return false;
    }
    PUTP(HERE, "BELOW", MAW);
    isNEW_EXIT(HERE, "DOWN", (FCONNECT + 1 + MARKBIT), EXIT_CROCO);
    MOVE(PLAYER, MAW);
    WINDOW(SHOWING_ROOM);
    P_WALK_DIR = null;
    TELL("You climb up into ", THE(MAW));
    RELOOK();
    TELL(TAB
, "The stone jaw lurches underfoot, and you struggle to keep your balance. It's like standing on a seesaw.", CR);
    return false;
}

function INTO_INNARDS() {
    let _OBJ, _NXT;
    CLEAR_MAW_EXITS();
    GOOD_MAMA();
    TELL(TAB);
    ITALICIZE("Creak");
    TELL("! The bottom of the jaw tilts backward, pitching you helplessly forward...");
    CARRIAGE_RETURNS();
    P_WALK_DIR = null;
    OLD_HERE = null;
    UNMAKE(INNARDS, SEEN);
    HERE = INNARDS;
    MOVE(PLAYER, INNARDS);
    if((_OBJ = isFIRST(MAW))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, TAKEABLE)) {
                MOVE(_OBJ, INNARDS);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    return false;
}

function TOUCH_TEAR() {
    let _M=0;
    TELL(CTHE(MAW), " tilts dangerously as you reach upward");
    if((isIN(MAMA, MAW)
  ||  isIS(TEAR, MUNGED))) {
        TELL(", standing on tiptoe to grasp the sparkling treasure..", PERIOD);
        if(isIN(MAMA, MAW)) {
            MAKE(TEAR, MUNGED);
            UNMAKE(TEAR, TRYTAKE);
            UNMAKE(TEAR, NOALL);
            MAKE(TEAR, TAKEABLE);
            MOVE(TEAR, MAMA);
            GOOD_MAMA();
            TELL(TAB
, "Got it! The jewel pops off the idol's face, slips from your grasp and rolls down to ", THE(MAMA
), "'s feet, where she promptly eats it, turns and lumbers off the jaw.", CR);
        }
        INTO_INNARDS();
        return true;
    }
    MAKE(TEAR, MUNGED);
    TELL(`!
  Slowly, slowly, you draw your hand away from `, THE(TEAR
), ", and the jaw settles back to the ground.", CR);
    return true;
}

var TEAR = () => OBJECT({
	LOC: MAW,
	DESC: "tear-shaped jewel",
	FLAGS: [TRYTAKE, NOALL],
	VALUE: 1000,
	SIZE: 0,
	SYNONYM: ["JEWEL", "GEM", "TEAR", "TREASURE"],
	ADJECTIVE: ["TEAR", "SHAPED", "TEAR\-SHAPED", "CROCODILE"],
	ACTION: TEAR_F
});

function TEAR_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_LOOK_ON)) {
        TELL("Its pale ");
        if(isSEE_COLOR()) {
            TELL("blue");
        } else {
            TELL("gray");
        }
        TELL(" facets sparkle with obvious value.", CR);
        return true;
    } else {
        return false;
    }
}

var IDOL_ROOM = () => OBJECT({
	LOC: INNARDS,
	DESC: "idol",
	FLAGS: [NODESC, VOWEL, PLACE],
	SYNONYM: ["IDOL", "CROCODILE", "CHAMBER", "ROOM", "WALLS", "WALL"],
	ADJECTIVE: ["STONE", "ROCK"],
	ACTION: HERE_F
});

var JUNGLE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "jungle",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["JUNGLE", "FOREST"],
	ACTION: JUNGLE_F
});

function JUNGLE_F() {
    let _LEN, _X;
    _LEN = JUNGLE_ROOMS[0];
    if(isVERB(V_LISTEN)) {
        TELL(YOU_HEAR, "the cries of exotic birds.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("The air is warm and humid.", CR);
        return true;
    } else if((_LEN = isINTBL(HERE, REST(JUNGLE_ROOMS, 1), _LEN, 1))) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        if(isHERE(AT_FALLS)) {
            CANT_SEE_MUCH();
            return true;
        } else if(isHERE(OVER_JUNGLE, NW_SUPPORT, SW_SUPPORT, SE_SUPPORT)) {
            TELL(CTHEO
, " stretches off in every ", INTDIR, PERIOD);
            return true;
        }
        V_LOOK();
        return true;
    } else if((_X = isENTERING())) {
        if(isHERE(NW_UNDER)) {
            DO_WALK("SE");
            return true;
        } else if(isHERE(SW_UNDER)) {
            DO_WALK("NE");
            return true;
        } else if(isHERE(SE_UNDER)) {
            DO_WALK("NW");
            return true;
        } else if(isHERE(AT_FALLS)) {
            DO_WALK("NORTH");
            return true;
        }
        TELL("It's a long way down.", CR);
        return true;
    } else if((_X = isEXITING())) {
        if(isHERE(SW_UNDER, NW_UNDER, SE_UNDER)) {
            DO_WALK("UP");
            return true;
        }
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var PRAIRIE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "field",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["FIELDS", "FIELD", "FROTZEN", "PRAIRIE", "PLAIN", "GRASS"],
	ADJECTIVE: ["FROTZEN", "GOLD", "GOLDEN", "GRAY", "GREY"],
	ACTION: PRAIRIE_F
});

function PRAIRIE_F() {
    let _X;
    if((isADJ_USED("GRAY", "GREY")
  &&  isIS(HERE, SEEN))) {
        NOTE_COLOR(PRAIRIE);
        return RFATAL();
    } else if(isPLAIN_ROOM()) {
        if(HERE_F()) {
            return true;
        }
        return false;
    } else if((_X = isENTERING())) {
        _X = "EAST";
        if(isHERE(ON_PIKE)) {
            _X = "WEST";
        }
        DO_WALK(_X);
        return true;
    } else if((_X = isEXITING())) {
        NOT_ON();
        return true;
    } else {
        return false;
    }
}

function NOTE_COLOR(_OBJ) {
    TELL("Look again. ", CTHE(_OBJ));
    ISNT_ARENT(_OBJ);
    TELL(" gray anymore.", CR);
    return true;
}

var FARM_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE, OPENED],
	SYNONYM: ["DOOR", "DOORWAY"],
	ACTION: FARM_DOOR_F
});

function FARM_DOOR_F() {
    if(!(isHERE(IN_FARM))) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_OPEN, V_OPEN_WITH, V_HIT, V_MUNG, V_KICK)
  &&  isIN(TWISTER, HERE)
  &&  !(isIS(PRSO, OPENED)))) {
        TELL("No use. The wind is holding ", THEO
, " tightly shut.", CR);
        return true;
    } else {
        return false;
    }
}

var FARM_WINDOW = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "window",
	FLAGS: [NODESC, CONTAINER, OPENED],
	CAPACITY: 10000,
	SYNONYM: ["WINDOW"],
	ACTION: FARM_WINDOW_F
});

function FARM_WINDOW_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_THROW, V_THROW_OVER, V_EMPTY_INTO)) {
            if(!(isIS(PRSI, OPENED))) {
                YOUD_HAVE_TO("open", PRSI);
                return true;
            }
            VANISH();
            TELL(CTHEO, " falls ");
            if(isHERE(FARM_ROOM, IN_FROON)) {
                MOVE(PRSO, IN_FARM);
                TELL("in");
            } else {
                if(!(STORM_TIMER)) {
                    MOVE(PRSO, FARM_ROOM);
                }
                TELL("out");
            }
            TELL("side ", THEI);
            PRINT(" and disappears from view.|");
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, SIS);
        if(isIS(PRSO, OPENED)) {
            TELL("wide open.", CR);
            return true;
        }
        TELL("closed.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_LOOK_OUTSIDE)) {
        if(isHERE(FARM_ROOM, IN_FROON)) {
            if(isVERB(V_LOOK_OUTSIDE)) {
                TELL(ALREADY, "outside ", THEO, PERIOD);
                return true;
            }
            CANT_SEE_MUCH();
            return true;
        } else if(!(LOC(TWISTER))) {
            TELL("It seems to be getting darker.", CR);
            return true;
        }
        TELL("Whirling clouds of dust obscure the view.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
        WASTE_OF_TIME();
        return true;
    } else if(isVERB(V_LEAP, V_ENTER, V_THROUGH, V_CLIMB_OVER, V_ESCAPE, V_DIVE)) {
        if(!(isIS(PRSO, OPENED))) {
            YOUD_HAVE_TO("open");
            return true;
        } else if(isHERE(FARM_ROOM, IN_FROON)) {
            WINDOW_SQUEEZE(IN_FARM);
            return true;
        } else if(!(isIS(FARMHOUSE, SEEN))) {
            WINDOW_SQUEEZE(GETP(IN_FARM, "NORTH")[XROOM]);
            return true;
        }
        TELL("You leap recklessly out the open ", PRSO
, " into a maelstrom of wind and dust, then plummet to a painful death");
        JIGS_UP();
        return true;
    } else {
        return false;
    }
}

function WINDOW_SQUEEZE(_DEST) {
    TELL("You squeeze through ", THEO, PERIOD);
    if(isT(VERBOSITY)) {
        CRLF();
    }
    GOTO(_DEST);
    return true;
}

var FARM = () => OBJECT({
	DESC: "farm house",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["FARMHOUSE", "HOUSE", "HOME", "BUILDING", "FARM", "SHACK"],
	ADJECTIVE: ["RED", "GRAY", "GREY", "LITTLE", "SMALL", "FARM", "ONE\-ROOM"],
	DESCFCN: FARMHOUSE_F,
	ACTION: FARMHOUSE_F
});

"NODESC = delay for I-HOUSEFALL."

var FARMHOUSE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "farm house",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["FARMHOUSE", "HOUSE", "HOME", "BUILDING", "FARM", "SHACK"],
	ADJECTIVE: ["RED", "GRAY", "GREY", "LITTLE", "SMALL", "FARM", "ONE\-ROOM"],
	ACTION: FARMHOUSE_F
});

"NODESC = not seen correct color."

function FARMHOUSE_F(_CONTEXT=null) {
    let _DIR=0, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A little gray ", FARM, " stands nearby. The front door is ");
            if(isIS(FARM_DOOR, OPENED)) {
                TELL("wide open.");
                return true;
            }
            TELL(B("CLOSED"), C("."));
            return true;
        }
        return false;
    } else if((isIS(FARMHOUSE, SEEN)
  &&  isHERE(FARM_ROOM))) {
        GONE_NOW(FARMHOUSE);
        return RFATAL();
    } else if((isADJ_USED("GRAY", "GREY")
  &&  isIS(HERE, SEEN))) {
        NOTE_COLOR(FARMHOUSE);
        return RFATAL();
    } else if(isHERE(IN_FARM)) {
        return HERE_F();
    } else if((!(isHERE(FARM_ROOM, IN_FROON))
  &&  (_X = isTOUCHING()))) {
        CANT_FROM_HERE();
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isSEEING())) {
        if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL(XTHE);
            if(isPLAIN_ROOM()) {
                TELL("distant ");
            } else if(isIS(HERE, SEEN)) {
                TELL("red ");
            } else {
                TELL("gray ");
            }
            TELL(PRSO, " isn't much to look at.", CR);
            return true;
        } else if((isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)
  &&  isHERE(IN_FROON))) {
            P_IT_OBJECT = BOOT;
            TELL(CA(BOOT));
            PRINT(" lies crushed beneath ");
            TELL(THEO, PERIOD);
            return true;
        }
        CANT_SEE_MUCH();
        return true;
    } else if((_X = isENTERING())) {
        if(isHERE(FARM_ROOM, IN_FROON)) {
            DO_WALK("IN");
            return true;
        }
        CANT_FROM_HERE();
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var SCARE1 = () => OBJECT({
	DESC: "scarecrow",
	FLAGS: [TRYTAKE, NOALL, SURFACE],
	CAPACITY: 10,
	SYNONYM: ["SCARECROW", "MAN", "RAGS", "CLOTH", "CORN", "PATCH", "HUSKS"],
	ADJECTIVE: ["GRAY", "GRAY", "GREY"],
	DESCFCN: SCARE1_F,
	ACTION: SCARE1_F
});

function SCARE1_F(_CONTEXT=null) {
    let _WRD;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            _WRD = "GRAY";
            if(isIS(HERE, SEEN)) {
                _WRD = isRAG_COLOR_WORD(SCARE1);
            }
            TELL("A weatherbeaten ", SCARE1, " stands in a patch of dead corn, its ", B(_WRD
), " rags flapping in the wind.");
            return true;
        }
        return false;
    }
    return isHANDLE_SCARES(SCARE1);
}

var SCARE2 = () => OBJECT({
	DESC: "scarecrow",
	FLAGS: [TRYTAKE, NOALL, SURFACE],
	CAPACITY: 10,
	SYNONYM: ["SCARECROW", "MAN", "RAGS", "CLOTH", "CORN", "PATCH", "HUSKS"],
	ADJECTIVE: ["GRAY", "GRAY", "GREY"],
	DESCFCN: SCARE2_F,
	ACTION: SCARE2_F
});

function SCARE2_F(_CONTEXT=null) {
    let _WRD;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            _WRD = "GRAY";
            if(isIS(HERE, SEEN)) {
                _WRD = isRAG_COLOR_WORD(SCARE2);
            }
            TELL(XTHE, B(_WRD
), " rags of another ", SCARE2
, " flap uselessly in a dead patch of corn.");
            return true;
        }
        return false;
    }
    return isHANDLE_SCARES(SCARE2);
}

var SCARE3 = () => OBJECT({
	DESC: "scarecrow",
	FLAGS: [TRYTAKE, NOALL, SURFACE],
	CAPACITY: 10,
	SYNONYM: ["SCARECROW", "MAN", "RAGS", "CLOTH", "CORN", "PATCH", "HUSKS"],
	ADJECTIVE: ["GRAY", "GRAY", "GREY"],
	DESCFCN: SCARE3_F,
	ACTION: SCARE3_F
});

function SCARE3_F(_CONTEXT=null) {
    let _WRD;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            _WRD = "GRAY";
            if(isIS(HERE, SEEN)) {
                _WRD = isRAG_COLOR_WORD(SCARE3);
            }
            TELL("A patch of corn is flourishing nearby, presided over by a third "
, SCARE3, SIN, B(_WRD), " rags.");
            return true;
        }
        return false;
    }
    return isHANDLE_SCARES(SCARE3);
}

function isHANDLE_SCARES(_OBJ) {
    let _S3=0, _WRD, _X;
    if(isEQUAL(_OBJ, SCARE3)) {
        ++_S3
    }
    _WRD = "GRAY";
    if((isIS(HERE, SEEN)
  &&  isIS(_OBJ, SEEN))) {
        _WRD = GETPT(_OBJ, "ADJECTIVE")[0];
    }
    if((isIS(HERE, SEEN)
  &&  isADJ_USED("GRAY", "GREY"))) {
        NOTE_COLOR(_OBJ);
        return RFATAL();
    }
    if((isNOUN_USED("RAGS", "CLOTH")
  ||  isADJ_USED(_WRD, "GRAY", "GREY"))) {
        if(isTHIS_PRSI()) {
            if((_X = isPUTTING())) {
                WASTE_OF_TIME();
                return true;
            }
            return false;
        } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_WEAR)) {
            if((!(isIS(_OBJ, SEEN))
  &&  isIS(HERE, SEEN))) {
                _WRD = isRAG_COLOR_WORD(_OBJ);
            }
            TELL(XTHE, B(_WRD), " rags on ", THEO
, " are tattered and useless.", CR);
            return true;
        } else if(isVERB(V_SEARCH, V_LOOK_INSIDE, V_LOOK_UNDER)) {
            TELL("You find nothing ", PICK_NEXT(YAWNS)
, PERIOD);
            return true;
        } else if((_X = isMOVING())) {
            TELL("Your grasp only shreds the rags worse than before.", CR);
            return true;
        }
        return false;
    } else if(isNOUN_USED("CORN", "PATCH", "HUSKS")) {
        if(isTHIS_PRSI()) {
            if((_X = isPUTTING())) {
                PERFORM("DROP", PRSO);
                return true;
            }
            return false;
        } else if(isVERB(V_TAKE)) {
            if(isHERE(FARM_ROOM)) {
                TELL("Whoever owns the corn might not like that.", CR);
                return true;
            }
            TELL("There's none left worth taking.", CR);
            return true;
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL("The corn around ", THEO, SIS);
            if(isT(_S3)) {
                TELL("almost ready for harvest.", CR);
                return true;
            }
            TELL("dead; only withered husks remain.", CR);
            return true;
        } else if(isVERB(V_LOOK_INSIDE, V_LOOK_UNDER, V_SEARCH)) {
            ASIDE_FROM(PRSO);
            TELL("nothing ", PICK_NEXT(YAWNS)
, " in the corn.", CR);
            return true;
        } else if(isVERB(V_EAT, V_TASTE)) {
            if(isT(_S3)) {
                TELL("It's not quite ripe enough.", CR);
                return true;
            }
            TELL(NOTHING, "left to eat.", CR);
            return true;
        } else if(isVERB(V_SMELL)) {
            TELL("The corn smells ");
            if(isT(_S3)) {
                TELL("almost ripe.", CR);
                return true;
            }
            TELL("rotten.", CR);
            return true;
        } else if(isVERB(V_DRINK)) {
            IMPOSSIBLE();
            return true;
        } else if((_X = isENTERING())) {
            if(isT(_S3)) {
                TELL("Thick husks block your path.", CR);
                return true;
            }
            TELL("Dead husks crunch underfoot.", CR);
            return true;
        } else if((_X = isEXITING())) {
            TELL("Which way?", CR);
            return true;
        } else if((_X = isTOUCHING())) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        if((!(isIS(_OBJ, SEEN))
  &&  isIS(HERE, SEEN))) {
            _WRD = isRAG_COLOR_WORD(_OBJ);
        }
        TELL("Considering the stormy climate hereabouts, it's remarkable that this ", PRSO
, " is still standing. Threadbare ", B(_WRD
), " rags hang from the wooden limbs, flapping");
        PRINT(" in the steady wind.|");
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("Its limp rags flap");
        PRINT(" in the steady wind.|");
        return true;
    } else if((_X = isMOVING())) {
        ROOTED(_OBJ);
        return true;
    } else {
        return false;
    }
}

function ROOTED(_OBJ) {
    TELL(CTHE(_OBJ), " is firmly rooted in the ground.", CR);
    return true;
}

var SCARES_SEEN/*NUMBER*/ = 0;
var BADKEY/*OBJECT*/ = null;"Key that will scare corbies."

function isRAG_COLOR_WORD(_OBJ) {
    let _WRD, _BAD;
    if(isIS(_OBJ, SEEN)) {
        return GETPT(_OBJ, "ADJECTIVE")[0];
    }
    _WRD = SET_RAG_COLOR(_OBJ);
    if(isEQUAL(_OBJ, SCARE3)) {
        _SCARES_SEEN = 3;
    } else if(!(++SCARES_SEEN > 1)) {
        return _WRD;
    }
    if((isIS(FARMHOUSE, NODESC)
  &&  isIS(FARM, NODESC))) {
        QUEUE(I_HOUSEFALL);
    }
    if(!(isIS(SCARE1, SEEN))) {
        SET_RAG_COLOR(SCARE1);
    }
    if(!(isIS(SCARE2, SEEN))) {
        SET_RAG_COLOR(SCARE2);
    }
    if(!(isIS(SCARE3, SEEN))) {
        _BAD = SET_RAG_COLOR(SCARE3);
    } else {
        _BAD = GETPT(SCARE3, "ADJECTIVE")[0];
    }
    BADKEY = KEY1;
    if(isEQUAL(_BAD, "MAUVE")) {
        BADKEY = KEY2;
    } else if(isEQUAL(_BAD, "LAVENDER")) {
        BADKEY = KEY3;
    }
    return _WRD;
}

function SET_RAG_COLOR(_OBJ) {
    let _WRD;
    MAKE(_OBJ, SEEN);
    _WRD = PICK_ONE(SCARE_COLORS);
    GETPT(_OBJ, "ADJECTIVE")[0] = _WRD;
    return _WRD;
}

var JBOX = () => OBJECT({
	DESC: "jewel box",
	FLAGS: [CONTAINER, OPENABLE, TRYTAKE, NOALL],
	SYNONYM: ["BOX", "CASK"],
	ADJECTIVE: ["JEWEL"],
	CAPACITY: 3,
	ACTION: JBOX_F
});

function JBOX_F() {
    let _X;
    if((_X = isTOUCHING())) {
        TELL(CTHE(MAYOR), " backs way from you. \"Please, ");
        HONORED_ONE();
        TELL("! Not so hasty.\"", CR);
        return true;
    } else {
        return false;
    }
}

var KEY1 = () => OBJECT({
	LOC: JBOX,
	DESC: "key",
	SDESC: DESCRIBE_KEYS,
	FLAGS: [TAKEABLE],
	SIZE: 1,
	VALUE: 0,
	SYNONYM: ["KEY", "KEYS"],
	ADJECTIVE: ["PUCE", "FIRST", "GRAY", "GREY"],
	GENERIC: GENERIC_KEYS_F,
	ACTION: KEY1_F
});

var KEY2 = () => OBJECT({
	LOC: JBOX,
	DESC: "key",
	SDESC: DESCRIBE_KEYS,
	FLAGS: [TAKEABLE],
	SIZE: 1,
	VALUE: 0,
	SYNONYM: ["KEY", "KEYS"],
	ADJECTIVE: ["MAUVE", "SECOND", "GRAY", "GREY"],
	GENERIC: GENERIC_KEYS_F,
	ACTION: KEY2_F
});

var KEY3 = () => OBJECT({
	LOC: JBOX,
	DESC: "key",
	SDESC: DESCRIBE_KEYS,
	FLAGS: [TAKEABLE],
	SIZE: 1,
	VALUE: 0,
	SYNONYM: ["KEY", "KEYS"],
	ADJECTIVE: ["LAVENDER", "THIRD", "LAST", "GRAY", "GREY"],
	GENERIC: GENERIC_KEYS_F,
	ACTION: KEY3_F
});


function GENERIC_KEYS_F(_TBL, _LEN=_TBL[0]) {
    if(isHERE(IN_SPLENDOR)) {
        return HERD;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        return _TBL[1];
    } else {
        return false;
    }
}

function KEY1_F() {
    return isHANDLE_KEYS(KEY1);
}

function KEY2_F() {
    return isHANDLE_KEYS(KEY2);
}

function KEY3_F() {
    return isHANDLE_KEYS(KEY3);
}

function isHANDLE_KEYS(_OBJ) {
    let _WORD, _K1, _K2, _K3;
    _WORD = GETPT(_OBJ, "ADJECTIVE")[0];
    if(!(isSEE_COLOR())) {
        _WORD = "GRAY";
    }
    if(isNOUN_USED("KEYS")) {
        _K1 = isVISIBLE(KEY1);
        _K2 = isVISIBLE(KEY2);
        _K3 = isVISIBLE(KEY3);
        if(((isEQUAL(_OBJ, KEY1)
  &&  !(_K2)
  &&  !(_K3))
  ||  (isEQUAL(_OBJ, KEY2)
  &&  !(_K1)
  &&  !(_K3))
  ||  (isEQUAL(_OBJ, KEY3)
  &&  !(_K2)
  &&  !(_K1)))) {
            ONLY_ONE();
            return RFATAL();
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL("There are three keys, colored mauve, puce and lavender.", CR);
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_OPEN, V_UNLOCK)) {
            TELL("Forget it. That phoney ", D(PRSI
), " couldn't open anything.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        if(!(isVERB(V_READ))) {
            TELL("This is actually a cheap piece of styrofoam, cut into the shape of a giant key, spray painted ", B(_WORD), " and sprinkled with bits of glitter. ");
        }
        TELL("The words ");
        ITALICIZE("City of Froon");
        TELL(" are scrawled in crayon across the front.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("It smells like ", B(_WORD), " paint.", CR);
        return true;
    } else if(isIS(PRSO, TOUCHED)) {
        return false;
    } else if(isVERB(V_POINT)) {
        AWARD_KEY(PRSO);
        return true;
    } else if(isVERB(V_TAKE)) {
        if(!(ITAKE())) {
            return true;
        }
        TELL("You ceremoniously lift ", THEO);
        OUT_OF_LOC(JBOX);
        TELL(PERIOD);
        EXIT_FROON(PRSO);
        return true;
    } else {
        return false;
    }
}

function AWARD_KEY(_OBJ) {
    MAKE(_OBJ, TOUCHED);
    MOVE(_OBJ, PLAYER);
    WINDOW(SHOWING_ALL);
    P_IT_OBJECT = _OBJ;
    TELL("With a gracious bow, ", THE(MAYOR
), " sets ", THE(_OBJ), " onto your outstretched palm.", CR);
    EXIT_FROON(_OBJ);
    return true;
}

function EXIT_FROON(_OBJ) {
    let _WRD, _S1, _S2, _S3;
    if(!(BADKEY)) {
        _WRD = GETPT(_OBJ, "ADJECTIVE")[0];
        _S1 = GETPT(SCARE1, "ADJECTIVE")[0];
        _S2 = GETPT(SCARE2, "ADJECTIVE")[0];
        _S3 = GETPT(SCARE3, "ADJECTIVE")[0];
        if(!(isIS(SCARE3, SEEN))) {
            while(true) {
                _S3 = PICK_ONE(SCARE_COLORS);
                if(isEQUAL(_S3, _WRD, _S2, _S1)) {
                    continue;
                }
                MAKE(SCARE3, SEEN);
                GETPT(SCARE3, "ADJECTIVE")[0] = _S3;break;
            }
        }
        if(!(isIS(SCARE2, SEEN))) {
            while(true) {
                _S2 = PICK_ONE(SCARE_COLORS);
                if(isEQUAL(_S2, _S3, _S1)) {
                    continue;
                }
                MAKE(SCARE2, SEEN);
                GETPT(SCARE2, "ADJECTIVE")[0] = _S2;break;
            }
        }
        if(!(isIS(SCARE1, SEEN))) {
            while(true) {
                _S1 = PICK_ONE(SCARE_COLORS);
                if(isEQUAL(_S1, _S3, _S2)) {
                    continue;
                }
                MAKE(SCARE1, SEEN);
                GETPT(SCARE1, "ADJECTIVE")[0] = _S1;break;
            }
        }
    }
    DEQUEUE(I_FROON);
    QUEUE(I_CORBIES);
    REMOVE(FARM);
    isREPLACE_GLOBAL(FARM_ROOM, FARM_DOOR, NULL);
    isREPLACE_GLOBAL(FARM_ROOM, FARM_WINDOW, NULL);
    isNEW_EXIT(FARM_ROOM, "SOUTH", SORRY_EXIT
, "The ground is a bit too rough that way.");
    isNEW_EXIT(FARM_ROOM, "IN", NO_EXIT, 0, 0);
    TELL("  \"An excellent choice,\" remarks ", THE(MAYOR
), ". \"Bye!\"", CR);
    REGAIN_SENSES();
    GOTO(FARM_ROOM);
    /*REFRESH_MAP(null);*/
    return true;
}

var FROON = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Froon",
	FLAGS: [NODESC, NOARTICLE, PROPER, PLACE],
	SYNONYM: ["FROON", "CITY"],
	ACTION: FROON_F
});

function FROON_F() {
    if(isHERE(IN_FROON)) {
        return HERE_F();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_WHAT, V_WHO, V_WHERE, V_FIND, V_WALK_TO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

var GURDY = () => OBJECT({
	LOC: GRINDER,
	DESC: "hurdy-gurdy",
	FLAGS: [TAKEABLE, CONTAINER, OPENABLE, SURFACE],
	SYNONYM: ["GURDY", "HURDY\-GURDY", "ORGAN", "BOX", "CRANK", "HANDLE", "TURNER", "LID", "TOP", "DIAL", "KNOB", "POINTER", "PAINTINGS", "PICTURES"],
	ADJECTIVE: ["HURDY", "SENSE", "SIX"],
	SIZE: 7,
	CAPACITY: 7,
	VALUE: 30,
	GENERIC: GENERIC_DIAL_F,
	ACTION: GURDY_F
});

var INGURDY = () => OBJECT({
	FLAGS: [NODESC]
});

function GURDY_F() {
    let _X;
    if(isNOUN_USED("LID", "TOP")) {
        if(isTHIS_PRSI()) {
            
        } else if(isVERB(V_EXAMINE)) {
            TELL("The lid of ", THEO, SIS);
            if(isIS(PRSO, OPENED)) {
                TELL("open.", CR);
                return true;
            }
            TELL("closed.", CR);
            return true;
        } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
            LOOK_IN_GURDY();
            return true;
        } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
            
        } else if((_X = isMOVING())) {
            FIRMLY_ATTACHED("lid", PRSO, true);
            return true;
        }
    } else if((isNOUN_USED("DIAL", "KNOB", "POINTER")
  ||  isNOUN_USED("PAINTINGS", "PICTURES"))) {
        return GDIAL_F();
    } else if(isNOUN_USED("CRANK", "HANDLE", "TURNER")) {
        return CRANK_F();
    }
    if(isTHIS_PRSI()) {
        if((isVERB(V_PUT, V_EMPTY_INTO)
  &&  !(isIS(PRSI, OPENED)))) {
            ITS_CLOSED(PRSI);
            return true;
        } else if(isVERB(V_PUT_ON)) {
            if(isIS(PRSI, OPENED)) {
                YOUD_HAVE_TO("close", PRSI);
                return true;
            }
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        LOOK_IN_GURDY();
        return true;
    } else if(isVERB(V_REACH_IN)) {
        if(!(isIS(PRSO, OPENED))) {
            ITS_CLOSED();
            return true;
        }
        TELL("Your hand tingles.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        if((isVERB(V_OPEN_WITH)
  &&  !(isPRSI(HANDS)))) {
            WASTE_OF_TIME();
            return true;
        } else if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        }
        MOVE_ALL(INGURDY, GURDY);
        MAKE(PRSO, OPENED);
        MENTION_PUFF();
        TELL(" as you open it.", CR);
        return true;
    } else if(isVERB(V_CLOSE)) {
        if(!(isIS(PRSO, OPENED))) {
            ITS_ALREADY("closed");
            return true;
        }
        UNMAKE(PRSO, OPENED);
        MOVE_ALL(GURDY, INGURDY, NODESC);
        WINDOW(SHOWING_ALL);
        TELL(CTHEO, " creaks shut.", CR);
        return true;
    } else if((isVERB(V_TURN, V_CRANK, V_USE)
  ||  (isVERB(V_TOUCH)
  &&  isEQUAL(P_PRSA_WORD, "PLAY")))) {
        LAST_CRANK_DIR = null;
        TURN_GURDY();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("This squat contraption is about the size of a ");
        FROBOZZ("Breadbox");
        TELL(" breadbox, and made of brightly painted wood. There's a big dial up front, and a crank jutting from the side, just below the ");
        if(isIS(PRSO, OPENED)) {
            TELL(B("OPEN"));
        } else {
            TELL(B("CLOSED"));
        }
        TELL(" lid.", CR);
        return true;
    } else if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
        if(isPRSI(PRSO)) {
            IMPOSSIBLE();
            return true;
        } else if(isPRSI(LEFT, RIGHT)) {
            OOPS_THE(CRANK);
            if(isPRSI(RIGHT)) {
                TURN_GURDY_RIGHT();
                return true;
            }
            TURN_GURDY_LEFT();
            return true;
        //} else if((_X = isINTBL(PRSI, PICT_LIST.map(toOBJECT), 6))) {
        } else if(PICT_LIST.map(toOBJECT).includes(PRSI)) {
            OOPS_THE(GDIAL);
            TURN_DIAL();
            return true;
        }
        WASTE_OF_TIME();
        return true;
    } else {
        return false;
    }
}

function MENTION_PUFF() {
    WINDOW(SHOWING_ALL);
    TELL(XA, GURDY_EFFECTS[DPOINTER], " seeps out");
    return true;
}

function OOPS_THE(_OBJ) {
    P_IT_OBJECT = _OBJ;
    TELL("[", THE(_OBJ), BRACKET);
    return true;
}

function LOOK_IN_GURDY() {
    if(!(isIS(GURDY, OPENED))) {
        YOUD_HAVE_TO("open", GURDY);
        return true;
    }
    TELL("Looking inside ", THEO, " makes your "
, GURDY_PEEKS[DPOINTER]);
    if(isSEE_ANYTHING_IN(GURDY)) {
        TELL(". But you can glimpse ");
        CONTENTS(GURDY);
        TELL(" within");
        P_IT_OBJECT = GURDY;
    }
    PRINT(PERIOD);
    return true;
}

var CRANK = () => OBJECT({
	LOC: GURDY,
	DESC: "crank",
	FLAGS: [NODESC, TRYTAKE, NOALL, PART],
	SYNONYM: ["CRANK", "HANDLE", "TURNER"],
	ADJECTIVE: ["TED"],
	GENERIC: GENERIC_DIAL_F,
	ACTION: CRANK_F
});

function CRANK_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            IMPOSSIBLE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It juts from the side of ", THE(GURDY), PERIOD);
        return true;
    } else if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
        if(isPRSO(PRSI)) {
            IMPOSSIBLE();
            return true;
        } else if(isPRSI(RIGHT)) {
            TURN_GURDY_RIGHT();
            return true;
        } else if(isPRSI(LEFT)) {
            TURN_GURDY_LEFT();
            return true;
        }
        TELL(CTHEO);
        if(isPRSI(INTDIR)) {
            TELL(" turns only to the left or right.", CR);
            return true;
        }
        PRINT(" won't turn that way");
        //if((_X = isINTBL(PRSI, PICT_LIST, 6))) {
        if(PICT_LIST.map(toOBJECT).includes(PRSI)) {
            P_IT_OBJECT = GDIAL;
            TELL(". But ", THE(GDIAL), " will");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_TURN, V_CRANK, V_SPIN, V_PUSH, V_MOVE, V_USE)) {
        LAST_CRANK_DIR = null;
        TURN_GURDY();
        return true;
    } else if((_X = isMOVING())) {
        FIRMLY_ATTACHED("crank", GURDY, true);
        return true;
    } else {
        return false;
    }
}

var G_EYE = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of an eye",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["EYE", "PICTURE", "PAINTING"],
	ADJECTIVE: ["EYE", "FIRST"],
	DNUM: 0,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_EYE_F
});

function G_EYE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The eye on ", THE(GURDY
), " stares back at you.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var G_EAR = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of an ear",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["EAR", "PICTURE", "PAINTING"],
	ADJECTIVE: ["EAR", "SECOND"],
	DNUM: 1,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_EAR_F
});

function G_EAR_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        TELL(CTHEO, " listens intently.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The ear on ", THE(GURDY
), " perks up.", CR);
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("It listens back.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var G_NOSE = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of a nose",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["NOSE", "PICTURE", "PAINTING"],
	ADJECTIVE: ["NOSE", "THIRD"],
	DNUM: 2,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_NOSE_F
});

function G_NOSE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_SMELL, V_LISTEN)) {
        TELL("The nose on ", THE(GURDY
), " sniffs you curiously.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var G_MOUTH = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of a mouth",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["MOUTH", "PICTURE", "PAINTING"],
	ADJECTIVE: ["MOUTH", "FOURTH"],
	DNUM: 3,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_MOUTH_F
});

function G_MOUTH_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_EXAMINE, V_LOOK_ON)
  ||  (_X = isTALKING()))) {
        TELL("The mouth on ", THE(GURDY
), " sticks out its tongue at you.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var G_HAND = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of a hand",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["HAND", "PICTURE", "PAINTING"],
	ADJECTIVE: ["HAND", "FIFTH"],
	DNUM: 4,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_HAND_F
});

function G_HAND_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The hand on ", THE(GURDY
), " waves at you.", CR);
        return true;
    } else if(isVERB(V_WAVE_AT, V_HELLO, V_BOW)) {
        TELL(CTHEO, " waves back.", CR);
        return true;
    } else if((isVERB(V_SHAKE)
  &&  isEQUAL(P_PRSA_WORD, "SHAKE"))) {
        TELL(CTHEO, " isn't ");
        ITALICIZE("that");
        TELL(" friendly.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var G_CLOCK = () => OBJECT({
	LOC: GURDY,
	DESC: "picture of a clock",
	FLAGS: [TRYTAKE, NOALL, NODESC, PART],
	SYNONYM: ["CLOCK", "PICTURE", "PAINTING"],
	ADJECTIVE: ["CLOCK", "SIXTH", "LAST"],
	DNUM: 5,
	GENERIC: GENERIC_PICTURE_F,
	ACTION: G_CLOCK_F
});

function G_CLOCK_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The clock on ", THE(GURDY
), " is quite old-fashioned.", CR);
        return true;
    } else if((_X = isMOVING())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

function GENERIC_PICTURE_F(_TBL, _LEN=_TBL[0]) {
    let _OBJ, _X;
    _TBL = REST(_TBL, 2);
    if((_X = isINTBL(P_IT_OBJECT, _TBL, _LEN))) {
        return P_IT_OBJECT;
    } else if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
        return false;
    }
    _OBJ = toOBJECT(PICT_LIST[DPOINTER]);
    if((_X = isINTBL(_OBJ, _TBL, _LEN))) {
        return _OBJ;
    }
    return false;
}

var GDIAL = () => OBJECT({
	LOC: GURDY,
	DESC: "dial",
	FLAGS: [NODESC, TRYTAKE, NOALL, PART],
	SYNONYM: ["DIAL", "KNOB", "POINTER", "PAINTINGS", "PICTURES"],
	ADJECTIVE: ["SIX"],
	DNUM: G_EYE,
	GENERIC: GENERIC_DIAL_F,
	ACTION: GDIAL_F
});

function GENERIC_DIAL_F(_TBL, _LEN) {
    let _X, _Y;
    _X = _TBL[1];
    _Y = _TBL[2];
    if(isEQUAL(_X, GURDY)) {
        return _Y;
    } else if(isEQUAL(_Y, GURDY)) {
        return _X;
    } else {
        return false;
    }
}

var DPOINTER/*NUMBER*/ = 0;

function GDIAL_F() {
    let _X;
    if((isNOUN_USED("PAINTINGS", "PICTURES")
  ||  isADJ_USED("SIX"))) {
        if(isTHIS_PRSI()) {
            if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
                HOW_TO_CLICK();
                return true;
            }
        } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
            TELL(YOU_SEE, "a circle of ");
            PRINT("six little pictures, cunningly painted: an eye, an ear, a nose, a mouth, a hand and a clock");
            TELL(", with a dial in the center.", CR);
            return true;
        } else if((_X = isMOVING())) {
            IMPOSSIBLE();
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            IMPOSSIBLE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, SON, THE(GURDY), " is encircled by ");
        PRINT("six little pictures, cunningly painted: an eye, an ear, a nose, a mouth, a hand and a clock");
        TELL(". At the moment, the dial points to "
, THE(toOBJECT(PICT_LIST[DPOINTER])), PERIOD);
        return true;
    } else if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
        if(isPRSI(LEFT)) {
            if(--DPOINTER < 0) {
                DPOINTER = 5;
            }
            CLICK_DIAL("left");
            return true;
        } else if(isPRSI(RIGHT)) {
            if(++DPOINTER > 5) {
                DPOINTER = 0;
            }
            CLICK_DIAL("right");
            return true;
        } else if(isPRSI(INTDIR)) {
            TELL(CTHEO, " only turns left or right.", CR);
            return true;
        }
        TURN_DIAL();
        return true;
    } else if(isVERB(V_SPIN, V_ADJUST, V_WIND, V_TOUCH)) {
        while(true) {
            _X = RANDOM(6);
            --_X
            if(isEQUAL(_X, DPOINTER)) {
                continue;
            }break;
        }
        DPOINTER = _X;
        WINDOW(SHOWING_ALL);
        PRSO_FIDDLE();
        return true;
    } else if((_X = isMOVING())) {
        FIRMLY_ATTACHED(PRSO, GURDY);
        return true;
    } else {
        return false;
    }
}

function CLICK_DIAL(_STR=null) {
    WINDOW(SHOWING_ALL);
    ITALICIZE("Click");
    TELL(". You turn ", THE(GDIAL));
    if(isT(_STR)) {
        TELL(" once to the ", _STR, ". It now ");
    } else {
        TELL(" until it ");
    }
    TELL("points to ", THE(toOBJECT(PICT_LIST[DPOINTER])), PERIOD);
    if(isIS(GURDY, OPENED)) {
        PRINT(TAB);
        MENTION_PUFF();
        PRINT(PERIOD);
    }
    return true;
}

function TURN_DIAL() {
    let _X;
    if(isPRSI(PRSO)) {
        IMPOSSIBLE();
        return true;
    //} else if((_X = isINTBL(PRSI, PICT_LIST, 6))) {
    } else if(PICT_LIST.map(toOBJECT).includes(PRSI)) {
        _X = GETP(PRSI, "DNUM");
        if(isEQUAL(_X, DPOINTER)) {
            TELL(CTHE(GDIAL), " already points to "
, THEI, PERIOD);
            return true;
        }
        DPOINTER = _X;
        CLICK_DIAL();
        return true;
    } else if(isPRSI(INTNUM)) {
        if(P_NUMBER < 1) {
            HOW_TO_CLICK();
            return true;
        } else if(P_NUMBER > 6) {
            TELL("There are only six ", B("PAINTINGS"
), SON, THE(GURDY), PERIOD);
            return true;
        }
        DPOINTER = (P_NUMBER - 1);
        CLICK_DIAL();
        return true;
    }
    TELL(CTHE(GDIAL), SON, THE(GURDY));
    PRINT(" won't turn that way");
    PRINT(PERIOD);
    return true;
}

function HOW_TO_CLICK() {
    PCLEAR();
    NYMPH_APPEARS();
    TELL("You must specify one of the six paintings; for example, TURN THE DIAL TO THE PAINTING OF THE EAR or POINT ARROW AT MOUTH");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

var FHILLS = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "foothills",
	FLAGS: [NODESC, PLACE, PLURAL],
	SYNONYM: ["FOOTHILLS", "HILLS", "HILL"],
	ADJECTIVE: ["STEEP", "RUGGED"],
	ACTION: FHILLS_F
});
var HILL, HILLS, FOOTHILLS;

function FHILLS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " are discouragingly steep and rugged.", CR);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var WHARF = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "wharf",
	FLAGS: [NODESC, PLACE, SURFACE],
	SYNONYM: ["WHARF", "PIER", "PIERS"],
	ACTION: WHARF_F
});

function WHARF_F() {
    let _ON=0, _X;
    if(isHERE(ON_WHARF)) {
        ++_ON
    }
    if((_X = isCLIMBING_ON())) {
        if(isT(_ON)) {
            ALREADY_ON();
            return true;
        }
        DO_WALK("EAST");
        return true;
    } else if((_X = isEXITING())) {
        if(isT(_ON)) {
            DO_WALK("WEST");
            return true;
        }
        NOT_ON();
        return true;
    } else if(isT(_ON)) {
        if(isVERB(V_SMELL)) {
            PRINT("Dank, fishy smells permeate this old wharf to its very bones.");
            CRLF();
            return true;
        }
        return HERE_F();
    } else if((_X = isTOUCHING())) {
        CANT_FROM_HERE();
        return true;
    } else if((_X = isSEEING())) {
        CANT_SEE_MUCH();
        return true;
    } else {
        return false;
    }
}

var FBEDS = () => OBJECT({
	LOC: IN_FROON,
	DESC: "flower beds",
	FLAGS: [NODESC],
	SYNONYM: ["BEDS", "BED", "FLOWERS", "FLOWER"],
	ADJECTIVE: ["FLOWER"],
	ACTION: FBEDS_F
});

function FBEDS_F() {
    let _STR, _X;
    if(!(FSCRIPT)) {
        _STR = "backs away from";
        if((_X = isSEEING())) {
            _STR = "blinks at";
        }
        START_FROON(_STR);
        return true;
    } else if((_X = isTOUCHING())) {
        TELL("The flowers deftly shift themselves away from your touch.", CR);
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("They are exceptionally beautiful.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("So sweet and delicate!", CR);
        return true;
    } else {
        return false;
    }
}

function START_FROON(_STR) {
    WINDOW(SHOWING_ROOM);
    QUEUE(I_FROON);
    MOVE(LADY, IN_FROON);
    SEE_CHARACTER(LADY);
    PUTP(IN_FROON, "HEAR", LADY);
    TELL("One of the flowers ", _STR, " you!", CR, TAB
, "You leap back in alarm as a tiny figure emerges from the flower beds. It's a woman, garbed in bright clothes, and standing less than two feet high.", CR);
    return true;
}

var COVE = () => OBJECT({
	LOC: ON_WHARF,
	DESC: "water",
	FLAGS: [NODESC, CONTAINER, OPENED, PLACE],
	CAPACITY: 10000,
	SYNONYM: ["WATER", "COVE", "SEA", "OCEAN", "WAVES", "SURFACE"],
	ACTION: COVE_F
});

function COVE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            VANISH();
            ITALICIZE("Splash");
            TELL("! ", CTHEO);
            if(isIS(PRSO, BUOYANT)) {
                TELL(" hits the water and floats out of sight.", CR);
                return true;
            }
            TELL(" disappears beneath the water.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        if(isSEE_ANYTHING_IN()) {
            TELL(YOU_SEE);
            CONTENTS();
            P_IT_OBJECT = PRSO;
            TELL(" floating ");
        } else {
            TELL("Sunlight sparkles ");
        }
        TELL("on the surface of ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
        PRINT("Little can be seen ");
        TELL("in the sparkling water.", CR);
        return true;
    } else if((isVERB(V_LEAP)
  ||  (_X = isENTERING()))) {
        DO_WALK("DOWN");
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL(CYOU);
        PRINT("hear the slurp of oily seawater against the piers");
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_EAT)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_DRINK, V_TASTE, V_DRINK_FROM, V_KISS)) {
        TELL("Ugh! Salty.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        WASTE_OF_TIME();
        return true;
    } else {
        return false;
    }
}

var POOL = () => OBJECT({
	DESC: "pool of radiance",
	FLAGS: [NODESC, VEHICLE, CONTAINER, OPENED],
	SYNONYM: ["POOL", "RADIANCE", "LIGHT", "SUNLIGHT", "YOUTH"],
	ADJECTIVE: ["YOUTH", "ETERNAL"],
	CAPACITY: 10000,
	CONTFCN: POOL_F,
	ACTION: POOL_F
});

function ENTER_POOL() {
    P_PRSA_WORD = "ENTER";
    PERFORM("ENTER", POOL);
    return false;
}

function EXIT_POOL() {
    P_PRSA_WORD = "EXIT";
    PERFORM("EXIT", POOL);
    return false;
}

function INTO_POOL(_OBJ=PRSO) {
    WINDOW(SHOWING_ALL);
    MOVE(_OBJ, POOL);
    if((isEQUAL(_OBJ, TRUFFLE)
  ||  isIN(TRUFFLE, _OBJ))) {
        MUNG_TRUFFLE();
        return true;
    } else {
        return false;
    }
}

function MUNG_TRUFFLE() {
    if(isIS(TRUFFLE, MUNGED)) {
        return false;
    }
    MAKE(TRUFFLE, MUNGED);
    TRUFFLE_TIMER = 0;
    DEQUEUE(I_TRUFFLE);
    if(isVISIBLE(TRUFFLE)) {
        TELL(TAB, CTHE(TRUFFLE
), "'s color darkens to a rich, mouthwatering brown.", CR);
    }
    return true;
}

function POOL_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        _OBJ = PRSO;
        if(isTHIS_PRSI()) {
            _OBJ = PRSI;
        }
        if(isEQUAL(_CONTEXT, M_BEG)) {
            return isCANT_REACH_WHILE_IN(_OBJ, POOL);
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isIN(PLAYER, POOL)) {
                return false;
            } else if(!(_OBJ)) {
                return false;
            } else if((_X = isSEEING())) {
                TELL(CANT, "see ", THE(_OBJ), " very well");
            } else if((_X = isTOUCHING())) {
                CANT_REACH(_OBJ);
            } else {
                return false;
            }
            TELL(" from the edge of the pool.", CR);
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_UNDER)) {
            TELL("You lower ");
            O_INTO_I();
            INTO_POOL();
            return true;
        } else if(isVERB(V_THROW, V_THROW_OVER)) {
            TELL("With a silent splash of light, ", THEO
, " tumbles into the pool.", CR);
            INTO_POOL();
            return true;
        } else if(isVERB(V_FILL_FROM)) {
            if(isPRSO(GOBLET, VIAL)) {
                TELL(CTHEO
, " seems unable to contain the golden radiance.", CR);
                return true;
            }
            return false;
        }
        return false;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        IMPOSSIBLE();
        return true;
    } else if(((_X = isENTERING())
  ||  isVERB(V_SWIM, V_CROSS, V_CLIMB_DOWN))) {
        if(isIN(PLAYER, PRSO)) {
            return false;
        } else if(isDROP_ONION_FIRST()) {
            return true;
        }
        isNEW_EXIT(HERE, "IN", SORRY_EXIT
, "You're in as far as you can go.");
        isNEW_EXIT(HERE, "OUT", (FCONNECT + 1 + MARKBIT)
, EXIT_POOL);
        MOVE(PLAYER, PRSO);
        P_WALK_DIR = null;
        OLD_HERE = null;
        TELL(CYOU);
        if(!(isIS(PRSO, TOUCHED))) {
            MAKE(PRSO, TOUCHED);
            TELL("test the shifting radiance with a timid foot, then ");
        }
        TELL("slowly wade into the middle of the pool");
        RELOOK();
        _X = LOC(TRUFFLE);
        if(!(_X)) {
            
        } else if((isEQUAL(_X, PLAYER)
  ||  isIN(_X, PLAYER))) {
            MUNG_TRUFFLE();
        }
        return true;
    } else if(((_X = isEXITING())
  ||  isVERB(V_CLIMB_UP))) {
        if(!(isIN(PLAYER, PRSO))) {
            NOT_IN();
            return true;
        }
        SETUP_POND_EXITS();
        P_WALK_DIR = null;
        OLD_HERE = null;
        MOVE(PLAYER, LOC(PRSO));
        TELL("You slowly wade");
        OUT_OF_LOC(PRSO);
        RELOOK();
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_UNDER)) {
        if(isSEE_ANYTHING_IN()) {
            TELL(YOU_SEE);
            CONTENTS();
            P_IT_OBJECT = PRSO;
            TELL(" enveloped");
        } else {
            TELL("Nothing can be seen");
        }
        TELL(" within.", CR);
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("The circular ", POOL, " shimmers and ripples like the surface of a pond.", CR);
        return true;
    } else if(isVERB(V_COUNT)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_TASTE, V_DRINK, V_DRINK_FROM)) {
        PRINT("Your mouth tingles with refreshment.|");
        return true;
    } else if(isVERB(V_TOUCH, V_KISS)) {
        TELL("You feel a refreshing tingle.", CR);
        return true;
    } else if(isVERB(V_EAT)) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var VIAL = () => OBJECT({
	LOC: UNDERPEW,
	DESC: "vial",
	FLAGS: [NOALL, TAKEABLE, CONTAINER, TRANSPARENT],
	SYNONYM: ["VIAL", "WATER"],
	ADJECTIVE: ["HOLY"],
	SIZE: 2,
	CAPACITY: 4,
	VALUE: 4,
	ACTION: VIAL_F
});

function VIAL_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO, V_FILL_FROM, V_POUR_FROM, V_TAKE)) {
            VIAL_SEALED();
            return true;
        }
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        TELL(CTHEO, " is filled with water.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        if(!(isVERB(V_READ))) {
            TELL("This delicate vial was blown from fine glass of extraordinary clarity. ");
        }
        TELL("Looking closely, you see the legend \"");
        FROBOZZ("Vial");
        TELL("\" inscribed on the bottom.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
        PRSO_SHATTER();
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_SHAKE)) {
        TELL("Water slooshes around inside.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE, V_POUR, V_EMPTY, V_REACH_IN
, V_EMPTY_INTO, V_TASTE, V_DRINK, V_DRINK_FROM)) {
        VIAL_SEALED();
        return true;
    } else {
        return false;
    }
}

function VIAL_SEALED() {
    TELL(CTHE(VIAL), " appears to be permanently sealed.", CR);
    return true;
}

function PRSO_SHATTER() {
    VANISH();
    ITALICIZE("Crash");
    TELL("! ", CTHEO, " shatters into useless fragments");
    return true;
}

var SADDLE = () => OBJECT({
	LOC: STALL,
	DESC: "saddle",
	FLAGS: [TAKEABLE, SURFACE, VEHICLE],
	SYNONYM: ["SADDLE"],
	SIZE: 10,
	CAPACITY: 20,
	VALUE: 4,
	ACTION: SADDLE_F
});

function SADDLE_F(_CONTEXT=null) {
    let _OBJ, _L, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_BEG)) {
            if(!(isIN(SADDLE, DACT))) {
                return false;
            }
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(isEQUAL(_OBJ, null, SADDLE, DACT)) {
                return false;
            }
            return isCANT_REACH_WHILE_IN(_OBJ, DACT);
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_EMPTY_INTO, V_THROW, V_PUT)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        } else if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if((_X = isCLIMBING_ON())) {
        _L = LOC(PRSO);
        if(!(_L)) {
            IMPOSSIBLE();
            return true;
        } else if((isEQUAL(_L, PLAYER)
  ||  isIN(_L, PLAYER))) {
            YOUD_HAVE_TO("put down");
            return true;
        } else if(isVERB(V_LIE_DOWN)) {
            TELL(CTHEO, " isn't big enough.", CR);
            return true;
        } else if(isIN(PLAYER, PRSO)) {
            if(isVERB(V_STAND_ON)) {
                MOVE(PLAYER, LOC(PRSO));
                TELL("You rise shakily to your feet");
                LOSE_BALANCE();
                CRLF();
                V_LOOK();
                return true;
            }
            TELL(ALREADY, "sitting on ", THEO, PERIOD);
            return true;
        } else if(isDROP_ONION_FIRST()) {
            return true;
        } else if(isEQUAL(_L, LOC(PLAYER))) {
            if(isVERB(V_STAND_ON)) {
                TELL("You climb shakily onto ", THEO);
                LOSE_BALANCE();
                return true;
            }
            MOVE(PLAYER, PRSO);
            TELL("You lower ", ME, SINTO, THEO);
            RELOOK();
            return true;
        } else if(isEQUAL(_L, DACT)) {
            MOUNT_DACT();
            return true;
        }
        PRINT("You'd have to get ");
        TELL(THEO);
        OUT_OF_LOC(_L);
        TELL(SFIRST);
        return true;
    } else if((isVERB(V_EXIT, V_CLIMB_DOWN, V_LEAVE, V_LEAP, V_DIVE, V_ESCAPE)
  ||  (isVERB(V_EMPTY)
  &&  isIN(PLAYER, PRSO)))) {
        if(!(isIN(PLAYER, PRSO))) {
            TELL("You're not sitting on ", THEO, PERIOD);
            return true;
        } else if(isIN(SADDLE, DACT)) {
            DISMOUNT_DACT();
            return true;
        }
        MOVE(PLAYER, LOC(PRSO));
        TELL("You clamber off ", THEO);
        RELOOK();
        return true;
    } else if(isVERB(V_STAND_ON, V_LIE_DOWN)) {
        TELL("Saddles are for sitting.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        TELL("A small label on it says, \"");
        FROBOZZ("Saddle");
        TELL(PERQ);
        return true;
    } else {
        return false;
    }
}


function LOSE_BALANCE() {
    TELL(", lose your balance and slide off.", CR);
    return true;
}

var DACT = () => OBJECT({
	DESC: "pterodactyl",
	FLAGS: [VEHICLE, LIVING, PERSON, SURFACE, TRYTAKE, NOALL, MUNGED, NAMEABLE],
	SYNONYM: ["PTERODACTYL", "ZZZP", "DINOSAUR", "CREATURE", "ANIMAL", "BIRD", "WING", "WINGS", "WOUND"],
	ADJECTIVE: ["WOUNDED", "HURT", "AWAKE"],
	LIFE: I_DACT,
	CAPACITY: 20,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: DACT_F,
	CONTFCN: DACT_F,
	ACTION: DACT_F
});

function isSHY_DACT() {
    let _X;
    if((!(DACT_SLEEP)
  &&  isIS(DACT, MUNGED)
  &&  ((_X = isTOUCHING())
  ||  (_X = isCLIMBING_ON())))) {
        TELL("The wounded ", DACT, PICK_NEXT(SHYNESS)
, PERIOD);
        return true;
    }
    return false;
}

function DACT_F(_CONTEXT=null) {
    let _HURT=0, _W=0, _X;
    P_IT_OBJECT = DACT;
    if(isNOUN_USED("BIRD")) {
        TELL("Pterodactyls are not birds.", CR);
        return RFATAL();
    } else if(isIS(DACT, MUNGED)) {
        ++_HURT
    } else if((isNOUN_USED("WOUND")
  ||  isADJ_USED("WOUNDED", "HURT"))) {
        TELL(CTHE(DACT), "'s wound is gone now.", CR);
        return RFATAL();
    }
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(DACT));
        if(isT(DACT_SLEEP)) {
            TELL(" lies nearby, snoring fitfully");
        } else if(isT(_HURT)) {
            TELL(" is hobbling around in slow, painful circles");
        } else {
            TELL(" is", PICK_NEXT(DACT_WAITS));
        }
        if((isIN(ARROW, DACT)
  &&  isIS(ARROW, NODESC))) {
            TELL(". One of its wings is pierced by "
, A(ARROW));
        }
        if(isIN(SADDLE, DACT)) {
            if(isT(_HURT)) {
                TELL("; and a ");
            } else {
                TELL(". A ");
            }
            TELL(SADDLE, " rests upon its back");
        }
        if(isIN(WHISTLE, DACT)) {
            TELL(". ", CA(WHISTLE
), " hangs on a chain around its skinny neck");
        }
        TELL(C("."));
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if(isSHY_DACT()) {
            return true;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        MAKE(DACT, SEEN);
        if(((isVERB(V_WALK, V_FLY, V_BANK, V_TURN, V_TURN_TO
, V_SPOINT_AT)
  &&  isPRSO(INTDIR))
  ||  (isVERB(V_POINT_AT)
  &&  isPRSI(INTDIR)))) {
            P_WALK_DIR = P_DIRECTION;
            NEXT_SKY();
            return RFATAL();
        } else if((isVERB(V_FLY, V_FLY_UP, V_CLIMB_UP)
  &&  isEQUAL(PRSO, null, ROOMS, SKY))) {
            DO_WALK("UP");
            return RFATAL();
        } else if((isVERB(V_LAND)
  ||  (isVERB(V_CLIMB_DOWN)
  &&  isPRSO(ROOMS)
  &&  isEQUAL(P_PRSA_WORD, "DESCEND"))
  ||  (isVERB(V_LAND_ON)
  &&  isPRSO(GROUND, FLOOR)))) {
            DO_WALK("DOWN");
            return RFATAL();
        } else if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, DACT))) {
            HELLO_DACT();
            return RFATAL();
        }
        PUZZLED_DACT();
        return RFATAL();
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("WING", "WINGS", "WOUND")) {
        if(isSHY_DACT()) {
            return true;
        } else if(isTHIS_PRSI()) {
            if((isVERB(V_TOUCH_TO)
  ||  (isVERB(V_PUT_ON, V_PUT)
  &&  isPRSO(SPENSE)))) {
                TOUCH_DACT_WITH(PRSO);
                return true;
            } else if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
                WASTE_OF_TIME();
                return true;
            } else if((_X = isPUTTING())) {
                PRSO_SLIDES_OFF_PRSI();
                return true;
            }
            return false;
        } else if(isVERB(V_STOUCH_TO)) {
            TOUCH_DACT_WITH(PRSI);
            return true;
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            if(isIN(ARROW, DACT)) {
                P_IT_OBJECT = ARROW;
                TELL(CA(ARROW), " has pierced one of ", THEO
, "'s wings.", CR);
                return true;
            }
            TELL(CTHEO, "'s wing");
            if(isIS(PRSO, MUNGED)) {
                TELL(" has a nasty wound.", CR);
                return true;
            }
            TELL("s ");
            if(isHERE(IN_SKY)) {
                TELL("beat slowly up and down.", CR);
                return true;
            }
            TELL("appear healthy and strong.", CR);
            return true;
        } else if(isVERB(V_TELL)) {
            TELL(CANT, "talk to a wing.", CR);
            return RFATAL();
        } else if(isVERB(V_REPAIR, V_DRESS)) {
            if(isIS(PRSO, MUNGED)) {
                isHOW();
                return true;
            }
            TELL(CTHEO, "'s wing is fine now.", CR);
            return true;
        } else if((_X = isCLIMBING_ON())) {
            NO_GOOD_SURFACE(PRSO);
            return true;
        } else if((_X = isCLIMBING_OFF())) {
            NOT_ON();
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_THROW_OVER, V_PUT)) {
            MAKE(DACT, SEEN);
            WINDOW(SHOWING_ALL);
            TELL(CYOU, B(P_PRSA_WORD), C(SP), THEO
, " onto ", THEI, "'s back");
            if((!(DACT_SLEEP)
  &&  isIS(PRSI, MUNGED))) {
                MOVE(PRSO, LOC(PLAYER));
                TELL(", but the wounded creature shakes it loose and throws it to your feet.", CR);
                return true;
            } else if(!(isPRSO(SADDLE))) {
                TELL(", but ");
                if(isIS(PRSO, PLURAL)) {
                    TELL("they slide");
                } else {
                    TELL("it slides");
                }
                TELL(" off and ");
                FALLS();
                return true;
            }
            MOVE(PRSO, PRSI);
            TELL(", where it settles comfortably.", CR);
            return true;
        } else if(isSHY_DACT()) {
            return true;
        } else if((isVERB(V_TOUCH_TO)
  &&  isPRSO(SPENSE))) {
            TELL("[", THEI, "'s wing", BRACKET);
            TOUCH_DACT_WITH(PRSO);
            return true;
        } else if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        if(!(DACT_SLEEP)) {
            return false;
        }
        TELL("The snoring ", DACT, " doesn't respond.", CR);
        return RFATAL();
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        HELLO_DACT();
        return true;
    } else if(isVERB(V_ASK_ABOUT, V_ASK_FOR, V_TELL_ABOUT)) {
        PUZZLED_DACT();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " appears to be ");
        if(isIS(PRSO, SLEEPING)) {
            TELL(B("SLEEPING"));
        } else if(isIS(PRSO, MUNGED)) {
            TELL(B("WOUNDED"));
        } else {
            TELL("watching you");
        }
        if(isIN(WHISTLE, DACT)) {
            REMOVE(WHISTLE);
            ++_W
            TELL(". There's ", A(WHISTLE
), " hung around his neck");
        }
        if(isSEE_ANYTHING_IN()) {
            TELL(". On his back you see ");
            CONTENTS();
        }
        TELL(PERIOD);
        if(isT(_W)) {
            MOVE(WHISTLE, DACT);
        }
        P_IT_OBJECT = DACT;
        return true;
    } else if(isVERB(V_RESCUE)) {
        if(isIS(PRSO, MUNGED)) {
            TELL("Medical aid might help.", CR);
            return true;
        }
        return false;
    } else if((_X = isCLIMBING_OFF())) {
        DISMOUNT_DACT();
        return true;
    } else if(isVERB(V_ALARM)) {
        if(!(DACT_SLEEP)) {
            TELL(CTHEO, " isn't asleep", AT_MOMENT);
            return true;
        }
        WAKE_DACT();
        return true;
    } else if(isSHY_DACT()) {
        return true;
    } else if((_X = isCLIMBING_ON())) {
        MOUNT_DACT();
        return true;
    } else if((isVERB(V_STOUCH_TO)
  &&  isPRSI(SPENSE))) {
        TELL("[", THEO, "'s wing", BRACKET);
        TOUCH_DACT_WITH(PRSI);
        return true;
    } else if(isVERB(V_TOUCH)) {
        TELL(CTHEO, " caws appreciatively.", CR);
        return true;
    } else {
        return false;
    }
}

function MOUNT_DACT() {
    MAKE(DACT, SEEN);
    if((isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        TELL(ALREADY, "riding ", THE(DACT), PERIOD);
        return true;
    } else if(isDROP_ONION_FIRST()) {
        return true;
    } else if(!(isIN(SADDLE, DACT))) {
        if(!(DACT_SLEEP)) {
            TELL(CTHE(DACT), " does its best to oblige");
        } else {
            TELL("The sleeping ", DACT
, " does nothing to hinder you");
        }
        TELL(", but you keep sliding off its skinny back.", CR);
        return true;
    }
    MAKE(DACT, NODESC);
    MOVE(PLAYER, SADDLE);
    TELL("You climb up onto ", THE(DACT
), "'s back, and settle into ", THE(SADDLE));
    RELOOK();
    return true;
}

function DISMOUNT_DACT() {
    if((!(isIN(PLAYER, SADDLE))
  ||  !(isIN(SADDLE, DACT)))) {
        NOT_ON(DACT);
        return true;
    } else if(isIN(DACT, IN_SKY)) {
        TELL("You slide confidently");
        OUT_OF_LOC(SADDLE);
        TELL(", and plummet hundreds of bloits to a senseless death");
        JIGS_UP();
        return true;
    }
    UNMAKE(DACT, NODESC);
    MOVE(PLAYER, LOC(DACT));
    TELL("You clamber");
    OUT_OF_LOC(SADDLE);
    TELL(", and slip off ", THE(DACT), "'s back");
    RELOOK();
    return true;
}

function TOUCH_DACT_WITH(_OBJ) {
    if(!(isIN(_OBJ, PLAYER))) {
        YOUD_HAVE_TO("be holding", _OBJ);
        return true;
    } else if(!(isEQUAL(_OBJ, SPENSE))) {
        TELL(CTHE(DACT), "'s ");
        if(isIS(DACT, MUNGED)) {
            TELL("wounded ");
        }
        TELL("wing is unaffected.", CR);
        return true;
    }
    TELL("You gently press ", THE(_OBJ), " against the wounded wing", PTAB, CTHE(DACT
), "'s sleep seems to deepen, and the tension in its limbs relaxes");
    if(isIN(ARROW, DACT)) {
        TELL(" a bit. But its flesh remains torn by the piercing arrow.", CR);
        return true;
    }
    VANISH(_OBJ);
    UNMAKE(DACT, MUNGED);
    TELL(". You watch in astonishment as the weed begins to flow and congeal, blending itself into the torn flesh until no trace of the wound remains.", CR);
    return true;
}

function HELLO_DACT() {
    if(!(isDACT_SLEEPING())) {
        TELL(CTHE(DACT), " eyes you silently.", CR);
    }
    return true;
}

function PUZZLED_DACT() {
    if(!(isDACT_SLEEPING())) {
        TELL(CTHE(DACT));
        PRINT(" gives you a puzzled frown");
        TELL(PERIOD);
    }
    return true;
}

function isDACT_SLEEPING() {
    MAKE(DACT, SEEN);
    if(!(DACT_SLEEP)) {
        return false;
    }
    TELL(CTHE(DACT), " responds with a fitful snore.", CR);
    return true;
}

var ARROW = () => OBJECT({
	LOC: DACT,
	SDESC: DESCRIBE_ARROW,
	DESC: "arrow",
	FLAGS: [NODESC, TAKEABLE, VOWEL, NAMEABLE],
	SYNONYM: ["ARROW", "ARROW"],
	SIZE: 3,
	EFFECT: 10,
	EMAX: 10,
	VALUE: 2,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	ACTION: BAD_ARROW_F
});


function ARROW_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("A crude design. Looks like ", B("SOMETHING"), " you'd find in a museum.", CR);
        return true;
    } else if(isVERB(V_FIRE_AT)) {
        TELL(DONT, "have a bow.", CR);
        return true;
    } else {
        return false;
    }
}

function BAD_ARROW_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_TOUCH_TO)) {
            TOUCH_BAD_ARROW(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " is piercing one of ", THE(DACT
), "'s wings.", CR);
        return true;
    } else if(isVERB(V_TAKE, V_PULL)) {
        if(!(isEQUAL(PRSI, null, HANDS))) {
            TWIST_ARROW();
            return true;
        } else if(!(ITAKE())) {
            return true;
        }
        PUTP(PRSO, "ACTION", ARROW_F);
        TOUCH_BAD_ARROW();
        TELL("  Gritting your teeth, you grasp the shaft firmly, close your eyes and give it a quick, determined yank", PTAB);
        ITALICIZE("Rip");
        TELL(". ", CTHEO
, " pulls free, and dark blood trickles from the wound.", CR);
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TOUCH_BAD_ARROW();
        return true;
    } else if(isVERB(V_HIT, V_PUSH, V_KICK)) {
        YOUR_OBJ();
        TELL(" strikes ", THEO, " edgewise, driving it");
        DRIVE_DEEPER();
        return true;
    } else if(isVERB(V_TURN, V_LOOSEN, V_MOVE, V_LOWER, V_RAISE, V_SPIN)) {
        if(isEQUAL(PRSI, null, HANDS)) {
            TOUCH_BAD_ARROW();
            return true;
        }
        TWIST_ARROW();
        return true;
    } else {
        return false;
    }
}

function TWIST_ARROW() {
    TELL("You fumble uncertainly with ", THEI
, ", driving ", THEO);
    DRIVE_DEEPER();
    return true;
}

function DRIVE_DEEPER() {
    TELL(" deeper into ", THE(DACT), "'s wing", PTAB
, "The luckless creature moans softly in its sleep.", CR);
    return true;
}

function TOUCH_BAD_ARROW(_OBJ=null) {
    TELL("You gently touch the end of ", THE(ARROW));
    if(isEQUAL(_OBJ, null, HANDS, ME)) {
        TELL(", probing with your fingers");
    } else {
        TELL(WITH, THE(_OBJ));
    }
    TELL(". It barely gives at all.", CR);
    return true;
}

var WEEDS = () => OBJECT({
	LOC: ON_PIKE,
	DESC: "patch of weeds",
	FLAGS: [NODESC, SURFACE, CONTAINER, OPENED, TRYTAKE, NOALL],
	CAPACITY: 100,
	SYNONYM: ["WEEDS", "PATCH", "PLANTS", "BUNCH", "WEED", "PLANT", "SPENSEWEED"],
	ADJECTIVE: ["WEED", "SPENSE"],
	GENERIC: GENERIC_WEED_F,
	ACTION: WEEDS_F
});

var WEEDS2 = () => OBJECT({
	DESC: "weeds",
	FLAGS: [NODESC, SURFACE, CONTAINER, OPENED, TRYTAKE, NOALL, PLURAL],
	CAPACITY: 100,
	SYNONYM: ["WEEDS", "PATCH", "PLANTS", "BUNCH", "WEED", "PLANT", "SPENSEWEED"],
	ADJECTIVE: ["WEED", "SPENSE"],
	GENERIC: GENERIC_WEED_F,
	ACTION: WEEDS_F
});

function WEEDS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WINDOW(SHOWING_ALL);
            MOVE(PRSO, PRSI);
            TELL(CTHEO, " fall");
            if(!(isIS(PRSO, PLURAL))) {
                TELL("s");
            }
            TELL(" into the weeds.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_UNDER)) {
        TELL("Aside from the ", B("BILLBOARD"), LYOU_SEE);
        CONTENTS();
        P_IT_OBJECT = PRSO;
        TELL(" among the weeds.", CR);
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("The weeds remind you of your garden back home.", CR);
        return true;
    } else if(isVERB(V_TAKE, V_PICK, V_UPROOT, V_LOOSEN, V_PULL)) {
        _X = SPENSE;
        if(isPRSO(WEEDS2)) {
            _X = SPENSE2;
        }
        if(isPICK_WEED(_X)) {
            return true;
        }
        TELL("None of the other weeds catches your eye.", CR);
        return true;
    } else {
        return false;
    }
}

function GENERIC_WEED_F(_TBL, _LEN=_TBL[0]) {
    return SPENSE;
}

var SPENSE = () => OBJECT({
	LOC: WEEDS,
	DESC: "limp weed",
	FLAGS: [NODESC, TAKEABLE],
	SIZE: 1,
	VALUE: 2,
	SYNONYM: ["WEED", "SPENSEWEED", "PLANT"],
	ADJECTIVE: ["SPENSE", "LIMP"],
	GENERIC: GENERIC_WEED_F,
	ACTION: SPENSE_F
});

var SPENSE2 = () => OBJECT({
	LOC: WEEDS2,
	DESC: "dry weed",
	FLAGS: [NODESC, TAKEABLE],
	SIZE: 1,
	VALUE: 2,
	SYNONYM: ["WEED", "SPENSEWEED", "PLANT"],
	ADJECTIVE: ["SPENSE", "DRY"],
	GENERIC: GENERIC_WEED_F,
	ACTION: SPENSE_F
});

function SPENSE_F() {
    let _X, _MAX;
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_TAKE, V_PICK, V_UPROOT, V_PULL, V_LOOSEN)
  &&  isPICK_WEED())) {
        return true;
    } else if(isVERB(V_TASTE)) {
        TELL("A little taste finds ", THEO);
        PRINT(" sweet and wholesome.|");
        return true;
    } else if(isVERB(V_EAT)) {
        VANISH();
        TELL("You cram ", THEO, SINTO, MOUTH
, " and swallow it whole, enjoying its sweet, wholesome taste.", CR);
        _X = STATS[ENDURANCE];
        _MAX = MAXSTATS[ENDURANCE];
        if(_X < _MAX) {
            UPDATE_STAT((_MAX - _X));
        }
        _X = STATS[STRENGTH];
        _MAX = MAXSTATS[STRENGTH];
        if(_X < _MAX) {
            UPDATE_STAT((_MAX - _X), STRENGTH);
        }
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL(CTHEO, "'s scent is");
        PRINT(" sweet and wholesome.|");
        return true;
    } else if(isVERB(V_EXAMINE, V_WHAT)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if(isVERB(V_PLANT)) {
        DO_PLANT();
        return true;
    } else {
        return false;
    }
}

function DO_PLANT() {
    if(isIS(PRSO, TOUCHED)) {
        TELL("You left your trowel at home.", CR);
        return true;
    }
    TELL(ALREADY, "planted.", CR);
    return true;
}

function isPICK_WEED(_OBJ=PRSO) {
    if(isIS(_OBJ, TOUCHED)) {
        return false;
    } else if(!(isEQUAL(PRSI, null, HANDS))) {
        PRSI_FUMBLE(WEEDS2);
        return true;
    }
    WINDOW(SHOWING_INV);
    P_IT_OBJECT = _OBJ;
    MOVE(_OBJ, PLAYER);
    UNMAKE(_OBJ, NODESC);
    MAKE(_OBJ, TOUCHED);
    TELL("With a modest tug, ", A(_OBJ
), " pops out of ", THE(GROUND), PERIOD);
    return true;
}

function PRSI_FUMBLE(_OBJ) {
    TELL("You poke around with ", THEI
, ", noting little effect on ", THE(_OBJ), PERIOD);
    return true;
}

var BRINE = () => OBJECT({
	LOC: AT_BRINE,
	DESC: "patch of brine",
	FLAGS: [SURFACE, CONTAINER, OPENED, TRYTAKE, NOALL],
	CAPACITY: 100,
	SYNONYM: ["BRINE", "PATCH", "SALT"],
	ADJECTIVE: ["SALT", "WHITE"],
	GENERIC: GENERIC_SALT_F,
	DESCFCN: BRINE_F,
	ACTION: BRINE_F
});

function GENERIC_SALT_F(_TBL, _LEN) {
    return CUBE;
}

function BRINE_F(_CONTEXT=null) {
    let _S=0, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A white ", BRINE, " is drying in the sun");
            if(isSEE_ANYTHING_IN(BRINE)) {
                PRINT(". On it you see ");
                CONTENTS(BRINE);
                P_IT_OBJECT = BRINE;
            }
            TELL(C("."));
            return true;
        }
        return false;
    }
    if((isIN(CUBE, BRINE)
  &&  isIS(CUBE, NODESC))) {
        ++_S
    }
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            if(isPRSO(CUBE)) {
                MAKE(PRSO, NODESC);
            }
            MOVE(PRSO, PRSI);
            WINDOW(SHOWING_ALL);
            TELL("You deposit ", THEO, SON, THEI, PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("A shallow pool of seawater must have evaporated here");
        if(isSEE_ANYTHING_IN()) {
            TELL(". Upon ", THEO, " you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_TAKE, V_PICK, V_UPROOT, V_LOOSEN, V_PULL)) {
        if(isT(_S)) {
            SNARF_CUBE();
            return true;
        }
        TELL("You've taken the only loose bit already.", CR);
        return true;
    } else if(isVERB(V_TOUCH, V_KICK, V_HIT)) {
        TELL(CTHEO, " is hard as a rock");
        if(isT(_S)) {
            TELL(". One bit seems a bit loose, though");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_TASTE)) {
        TELL("Ugh! Convincingly salty.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        PRINT("The ocean smell is strong");
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        TELL("Sorry. All evaporated.", CR);
        return true;
    } else if(isVERB(V_EAT)) {
        YOUD_HAVE_TO("loosen a bit of");
        return true;
    } else {
        return false;
    }
}

function SNARF_CUBE() {
    if(!(isEQUAL(PRSI, null, HANDS))) {
        PRSI_FUMBLE(BRINE);
        return true;
    }
    WINDOW(SHOWING_INV);
    P_IT_OBJECT = CUBE;
    MOVE(CUBE, PLAYER);
    UNMAKE(CUBE, NODESC);
    MAKE(CUBE, TOUCHED);
    TELL("You scrape a loose ", CUBE);
    OUT_OF_LOC(BRINE);
    TELL(PERIOD);
    return true;
}

var CUBE = () => OBJECT({
	LOC: BRINE,
	DESC: "bit of salt",
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["SALT", "BRINE", "BIT", "PIECE"],
	SIZE: 1,
	VALUE: 0,
	GENERIC: GENERIC_SALT_F,
	ACTION: CUBE_F
});

function CUBE_F() {
    if(isTHIS_PRSI()) {
        if((isVERB(V_HIT, V_MUNG, V_CUT)
  &&  isPRSO(SLUG))) {
            TOUCH_SLUG_WITH(CUBE);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It's no bigger than a die.", CR);
        return true;
    } else if(isVERB(V_EAT)) {
        VANISH();
        TELL("You pop ", THEO
, " into your mouth, and manage to swallow it without gagging.", CR);
        UPDATE_STAT(-5);
        return true;
    } else if(isVERB(V_TASTE)) {
        TELL("A quick taste confirms ", THEO
, "'s identity.", CR);
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_SMELL)) {
        PRINT("The ocean smell is strong");
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

var ROSES = () => OBJECT({
	LOC: ROSE_ROOM,
	DESC: "rosebush",
	FLAGS: [SURFACE, CONTAINER, OPENED, TRYTAKE],
	CAPACITY: 100,
	SYNONYM: ["BUSH", "BUSHES", "ROSEBUSH", "ROSES", "ROSE", "FLOWER", "FLOWERS"],
	ADJECTIVE: ["ROSE", "FLOWER"],
	GENERIC: GENERIC_ROSE_F,
	DESCFCN: ROSES_F,
	ACTION: ROSES_F
});

function ROSES_F(_CONTEXT=null) {
    let _R=0, _X;
    if((isIN(ROSE, ROSES)
  &&  isIS(ROSE, NODESC))) {
        ++_R
    }
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL("A lone ", ROSES
, " has somehow managed to survive the stormy climate.");
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_UNDER)) {
        TELL(YOU_SEE);
        CONTENTS();
        P_IT_OBJECT = PRSO;
        TELL(" among ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Aside from a few thorns, ");
        if(isT(_R)) {
            TELL("a solitary rose is the bush's only adornment.", CR);
            return true;
        }
        TELL(THEO, " is barren.", CR);
        return true;
    } else if(isVERB(V_TAKE, V_PICK, V_UPROOT, V_LOOSEN, V_PULL, V_RAISE)) {
        if(isT(_R)) {
            PICK_ROSE();
            return true;
        }
        TELL(CTHEO, " is barren of flowers.", CR);
        return true;
    } else {
        return false;
    }
}

function GENERIC_ROSE_F(_TBL, _LEN=_TBL[0]) {
    return ROSE;
}

var ROSE = () => OBJECT({
	LOC: ROSES,
	DESC: "rose",
	FLAGS: [NODESC, TAKEABLE],
	SIZE: 1,
	VALUE: 20,
	SYNONYM: ["ROSE", "FLOWER", "STEM", "PETALS"],
	ADJECTIVE: ["COMPASS", "ROSE\'S"],
	GENERIC: GENERIC_ROSE_F,
	ACTION: ROSE_F
});

function ROSE_F() {
    let _NODROOP=0, _WRD;
    if((isIS(HERE, INDOORS)
  ||  isHERE(IN_GARDEN, APLANE, IN_FROON, IN_SPLENDOR))) {
        ++_NODROOP
    }
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, "'s delicate stem ");
        if(isT(_NODROOP)) {
            TELL("is standing straight and tall.", CR);
            return true;
        } else if(isPLAIN_ROOM()) {
            TELL("blows wildly back and forth in the stormy winds.", CR);
            return true;
        }
        MAKE(BREEZE, SEEN);
        TELL("is tilted to the ", B(DIR_NAMES[WINDIR]), PERIOD);
        if(!(isIS(PRSO, IDENTIFIED))) {
            MAKE(PRSO, IDENTIFIED);
            TELL(TAB);
            REFER_TO_PACKAGE();
        }
        return true;
    } else if((isVERB(V_TAKE, V_PICK, V_UPROOT, V_PULL, V_LOOSEN, V_RAISE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        PICK_ROSE();
        return true;
    } else if(isVERB(V_TURN_TO, V_POINT_AT, V_PUSH_TO)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if(isPRSI(LEFT)) {
            if(--WINDIR < I_NORTH) {
                WINDIR = I_NW;
            }
            _WRD = "LEFT";
        } else if(isPRSI(RIGHT)) {
            if(++WINDIR > I_NW) {
                WINDIR = I_NORTH;
            }
            _WRD = "RIGHT";
        } else {
            if(isPRSI(INTDIR)) {
                if((P_DIRECTION > (asDIRECTION("NW") - 1)
  &&  P_DIRECTION < (asDIRECTION("NORTH") + 1))) {
                    WINDIR = (0 - (P_DIRECTION - asDIRECTION("NORTH")));
                    _WRD = DIR_NAMES[WINDIR];
                } else if(isEQUAL(P_DIRECTION, asDIRECTION("UP"), asDIRECTION("DOWN"))) {
                    TELL(CTHEO);
                    if(isPLAIN_ROOM()) {
                        TELL(" blows back and forth.", CR);
                        return true;
                    } else if(isT(_NODROOP)) {
                        TELL(" springs up again.", CR);
                        return true;
                    }
                    TELL(" droops back to the "
, B(DIR_NAMES[WINDIR]
), PERIOD);
                    return true;
                }
            } else {
                TELL(CANT, B(P_PRSA_WORD), C(SP), THEO
, " that way.", CR);
                return true;
            }
        }
        TELL(CYOU, B(P_PRSA_WORD), C(SP), THEO
, "'s stem to the ", B(_WRD));
        if(isT(_NODROOP)) {
            TELL(", but it springs upright again.", CR);
            return true;
        } else if(isPLAIN_ROOM()) {
            TELL(", but the wind blows it wildly around.", CR);
            return true;
        }
        TELL(PERIOD);
        isNEW_WINDIR();
        return true;
    } else if(isVERB(V_SPIN, V_ADJUST, V_WIND, V_TOUCH)) {
        PRSO_FIDDLE();
        isNEW_WINDIR(isNEXT_WINDIR());
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        TELL("You hurt your mouth on a thorn. Ouch!", CR);
        UPDATE_STAT(-2);
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL(CTHEO, "'s scent is unusually delicate.", CR);
        return true;
    } else if(isVERB(V_WHAT)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function PRSO_FIDDLE() {
    TELL("You fiddle aimlessly with ", THEO, " for a while.", CR);
    return true;
}

function PICK_ROSE() {
    if(!(isEQUAL(PRSI, null, HANDS))) {
        PRSI_FUMBLE(BUSH);
        return true;
    }
    WINDOW(SHOWING_INV);
    P_IT_OBJECT = ROSE;
    MOVE(ROSE, PLAYER);
    UNMAKE(ROSE, NODESC);
    MAKE(ROSE, TOUCHED);
    TELL("You pluck the flower off ", THE(ROSES), PERIOD);
    return true;
}

var GUILD_HALL = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Guild Hall",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["HALL", "BUILDING", "GUILD", "GATE", "LOBBY"],
	ADJECTIVE: ["GUILD", "ENCHANTER", "FRONT"],
	ACTION: GUILD_HALL_F
});

function GUILD_HALL_F() {
    let _X;
    if(isVERB(V_WALK_TO, V_ENTER, V_THROUGH, V_STAND_UNDER)) {
        _X = "NORTH";
        if(isHERE(IN_ACCARDI)) {
            _X = "EAST";
        }
        DO_WALK(_X);
        return true;
    } else if(isHERE(IN_ACCARDI)) {
        CANT_FROM_HERE();
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    }
    if(isNOUN_USED("GATE")) {
        if(isVERB(V_EXAMINE)) {
            MENTION_REZROV();
            return true;
        } else if((_X = isMOVING())) {
            IMPOSSIBLE();
            return true;
        }
    }
    if(isVERB(V_EXAMINE)) {
        TELL(CTHEO
, " is as vast and majestic as you always imagined it. ");
        MENTION_REZROV();
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_BEHIND)) {
        TELL("The lobby beyond the open gate looks deserted.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        ITS_ALREADY("open");
        return true;
    } else if(isVERB(V_CLOSE)) {
        MENTION_REZROV();
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

function MENTION_REZROV() {
    TELL("A permanent REZROV spell holds the front gate wide open.", CR);
    return true;
}

var THRIFF = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Thriff",
	FLAGS: [NODESC, PLACE, NOARTICLE, PROPER],
	SYNONYM: ["THRIFF"],
	ACTION: THRIFF_F
});

function THRIFF_F() {
    if(isVERB(V_RESCUE)) {
        isHOW();
        return true;
    } else if(isHERE(IN_THRIFF)) {
        return HERE_F();
    } else {
        return false;
    }
}

var NYMPH = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "warning nymph",
	FLAGS: [NODESC, LIVING],
	SYNONYM: ["NYMPH", "NYMPHS"],
	ADJECTIVE: ["WARNING"],
	ACTION: NYMPH_F
});

function NYMPH_F() {
    PCLEAR();
    if(!(isIS(GUILD_HALL, TOUCHED))) {
        NONE_TO_BE_SEEN();
        return RFATAL();
    }
    GONE_NOW(NYMPH);
    return RFATAL();
}

var ONION = () => OBJECT({
	LOC: IN_KITCHEN,
	DESC: "giant onion",
	FLAGS: [TRYTAKE, SURFACE],
	SIZE: 25,
	CAPACITY: 5,
	SYNONYM: ["ONION"],
	ADJECTIVE: ["GIANT", "GIGANTIC", "HUGE", "HUMONGOUS", "LARGE"],
	ACTION: ONION_F
});

"TOUCHED = tried to take, SEEN = paid for."

function isDROP_ONION_FIRST() {
    if(!(isIN(ONION, PLAYER))) {
        return false;
    }
    TELL("You'll have to put down that ", ONION, SFIRST);
    return true;
}

function ONION_F() {
    let _X, _LEN;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("This onion is about twice the diameter of a ");
        FROBOZZ("Beachball");
        TELL(" beachball");
        if(isIS(PRSO, MUNGED)) {
            TELL(", and sports a large gash in its surface");
        }
        PRINT(PERIOD);
        if(!(isIS(ONION, TOUCHED))) {
            TELL(TAB);
            COOK_MENTIONS_ONION();
        }
        return true;
    } else if(isVERB(V_TAKE)) {
        PICK_UP_ONION();
        return true;
    } else if(isVERB(V_RAISE)) {
        if(isEQUAL(P_PRSA_WORD, "RAISE", "LIFT", "HOIST")) {
            
        } else if(isEQUAL(P_PRSA_WORD, "TAKE", "HOLD", "ELEVATE")) {
            
        } else if(isEQUAL(P_PRSA_WORD, "PULL")) {
            
        } else if(GETP(HERE, "UP")) {
            ROLL_ONION("UP");
            return true;
        }
        PICK_UP_ONION();
        return true;
    } else if(isVERB(V_PUSH_TO)) {
        if(isPRSI(PRSO)) {
            IMPOSSIBLE();
            return true;
        } else if(isPRSI(INTDIR)) {
            ROLL_ONION(P_DIRECTION);
            return true;
        } else if(isWATER()) {
            VANISH();
            ITALICIZE("Sploosh");
            TELL("! ", CTHEO, " disappears in ", THEI, PERIOD);
            return true;
        } else if(isIS(PRSI, VEHICLE)) {
            
        } else if((isEQUAL(PRSI, null, LEFT, RIGHT)
  ||  isIS(PRSI, PLACE))) {
            HOW_TO_MOVE_ONION();
            return true;
        }
        TELL("You'd have a hard time ", B(P_PRSA_WORD
), "ing that ", ONION);
        ON_IN(PRSI);
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_LOWER)) {
        if(isEQUAL(P_PRSA_WORD, "LOWER", "HOLD")) {
            
        } else if(GETP(HERE, "DOWN")) {
            ROLL_ONION("DOWN");
            return true;
        }
        ONION_ROLLS();
        return true;
    } else if(isVERB(V_PUSH_UP, V_PUSH_DOWN)) {
        if(isPRSO(PRSI)) {
            IMPOSSIBLE();
            return true;
        } else if(!(isGLOBAL_IN(HERE, PRSI))) {
            
        } else if((isVERB(V_PUSH_UP)
  &&  GETP(HERE, "UP"))) {
            ROLL_ONION("UP");
            return true;
        } else if((isVERB(V_PUSH_DOWN)
  &&  GETP(HERE, "DOWN"))) {
            ROLL_ONION("DOWN");
            return true;
        }
        YOUD_HAVE_TO("pick up");
        return true;
    } else if(isVERB(V_BUY)) {
        if(isIS(PRSO, SEEN)) {
            TELL("You already did that.", CR);
            return true;
        } else if(!(isVISIBLE(PRSO))) {
            return false;
        }
        PERFORM("GIVE", PRSI, COOK);
        return true;
    } else if(isVERB(V_PUSH, V_MOVE, V_ADJUST, V_SPIN, V_KICK)) {
        ONION_ROLLS();
        return true;
    } else if(isVERB(V_SIT, V_STAND_ON, V_LIE_DOWN, V_CLIMB_UP, V_CLIMB_ON
, V_CLIMB_OVER)) {
        TELL("You slide off the smooth, oniony surface.", CR);
        return true;
    } else if(isVERB(V_CUT, V_HIT, V_MUNG, V_PEEL, V_KICK)) {
        if(isEQUAL(PRSI, null, HANDS, FEET)) {
            TELL("Ouch! It's tough as leather.", CR);
            return true;
        } else if(isPRSI(SWORD, AXE, DAGGER, ARROW)) {
            _LEN = NOPEELS[0];
            while(true) {
                _X = NOPEELS[_LEN];
                if(isVISIBLE(_X)) {
                    TELL("\"Not in front of ");
                    ITALICIZE("me");
                    TELL(" you don't,\" growls ", THE(_X), PERIOD);
                    return true;
                }
                if(--_LEN < 1) {
                    break;
                }
            }
            if(isIS(PRSO, MUNGED)) {
                if(!(ONION_TIMER)) {
                    QUEUE(I_ONION);
                }
                TELL(CTHEI
, " slightly widens the slash in ");
            } else {
                MAKE(PRSO, MUNGED);
                QUEUE(I_ONION);
                TELL("Your two-week stint as a short-order cook in Borphee stands you in good stead as you slash ");
            }
            ONION_TIMER = 4;
            TELL(THEO, "'s surface.", CR);
            return true;
        }
        TELL("Thump! ");
        YOUR_OBJ(PRSI);
        TELL(" has little effect on ", THEO, PERIOD);
        return true;
    } else {
        return false;
    }
}

function ROLL_ONION(_DIR) {
    _DIR = toDIRECTION(_DIR);
    let _X, _OHERE;
    if(isSPARK(null, ONION)) {
        TELL(TAB);
    }
    if(((isHERE(NE_WALL)
  &&  isEQUAL(_DIR, "SE", "IN")
  &&  isIS(NE_WALL, OPENED))
  ||  (isHERE(SE_WALL)
  &&  isEQUAL(_DIR, "SW", "IN")
  &&  isIS(SE_WALL, OPENED)))) {
        TELL(CTHE(ONION), " won't fit through the "
, B("OPENING"), PERIOD);
        return true;
    } else if(isHERE(IN_KITCHEN)) {
        if(isEQUAL(_DIR, "DOWN", "IN")) {
            TELL(XTHE);
            if(isIS(CELLAR_DOOR, MUNGED)) {
                TELL("hole in the wall");
            } else {
                TELL(CELLAR_DOOR);
            }
            TELL(" isn't wide enough to fit ", THE(ONION));
            if(!(isIS(CELLAR_DOOR, OPENED))) {
                TELL(". Besides, it's closed");
            }
            PRINT(PERIOD);
            return true;
        } else if((isEQUAL(_DIR, "EAST", "OUT")
  &&  !(isIS(ONION, SEEN)))) {
            TELL("As you roll ", THE(ONION
), " towards the exit, ", THE(COOK
), " jumps into your path. \"");
            if(!(isIS(ONION, TOUCHED))) {
                TELL("This ain't no free soup kitchen");
                PRINT(",\" he barks, shoving the ungainly vegetable back into place.|");
                TELL(TAB);
                COOK_MENTIONS_ONION();
                return true;
            } else if(!(isIS(BOTTLE, IDENTIFIED))) {
                TELL("Leave it alone");
            } else {
                MAKE(COOK, SEEN);
                TELL("No bottle, no onion");
            }
            PRINT(",\" he barks, shoving the ungainly vegetable back into place.|");
            return true;
        }
    }
    _OHERE = HERE;
    DO_WALK(_DIR);
    if(!(isEQUAL(HERE, _OHERE, DEATH))) {
        MOVE(ONION, HERE);
        P_IT_OBJECT = ONION;
        WINDOW(SHOWING_ROOM);
        TELL(TAB, CTHE(ONION), " rolls to a stop.", CR);
    }
    return false;
}

function ONION_ROLLS() {
    TELL(CTHE(ONION), " rolls freely across the ");
    if(isIS(HERE, INDOORS)) {
        TELL(FLOOR);
    } else {
        TELL(GROUND);
    }
    TELL(". You could probably push it in any ", INTDIR
, " you want.", CR);
    return true;
}

function PICK_UP_ONION() {
    let _H=null, _OBJ;
    if((_OBJ = isFIRST(PLAYER))) {
        while(true) {
            if(isIS(_OBJ, NODESC)) {
                
            } else if(isIS(_OBJ, WORN)) {
                
            } else if(isIS(_OBJ, TAKEABLE)) {
                TELL("You'd have to drop everything to get your arms around that ", PRSO, PERIOD);
                return true;
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    PRINT("Sweat breaks out on your forehead as you ");
    if(STATS[STRENGTH] < 25) {
        _H = true;
        TELL("try to ");
    }
    TELL("heft ", THEO, ". But it's ");
    if(!(_H)) {
        TELL("too awkward for you");
    } else {
        TELL("beyond your strength");
    }
    TELL(" to carry it", PTAB);
    ITALICIZE("Thud");
    TELL(PERIOD);
    return true;
}

function HOW_TO_MOVE_ONION() {
    NYMPH_APPEARS();
    TELL("To move ", THE(ONION), ", just indicate a ", INTDIR
, "; for example, ROLL THE GIANT ONION TO THE NORTH or V_PUSH ONION WEST");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

var MOSS = () => OBJECT({
	LOC: MOSS_ROOM,
	DESC: "moss",
	FLAGS: [NODESC, TRYTAKE, NOALL, SEEN],
	SYNONYM: ["MOSS", "PATCH"],
	ADJECTIVE: ["GRAY", "GREY"],
	ACTION: MOSS_F
});

var MOSS2 = () => OBJECT({
	LOC: INNARDS,
	DESC: "moss",
	FLAGS: [NODESC, TRYTAKE, NOALL, SEEN],
	SYNONYM: ["MOSS", "PATCH"],
	ADJECTIVE: ["GRAY", "GREY"],
	ACTION: MOSS_F
});

var MOSS3 = () => OBJECT({
	LOC: CAVE7,
	DESC: "moss",
	FLAGS: [NODESC, TRYTAKE, NOALL, SEEN],
	SYNONYM: ["MOSS", "PATCH"],
	ADJECTIVE: ["GRAY", "GREY"],
	ACTION: MOSS_F
});

function MOSS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_TOUCH_TO)) {
            PRINT("The moss seems soft and pliant.|");
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " is sickly gray, glistening with moisture.", CR);
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        TELL(CANT, "eat it off the wall.", CR);
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL(CTHEO, " smells like a diet-control capsule.", CR);
        return true;
    } else if(isVERB(V_SQUEEZE)) {
        if(!(isLIT)) {
            TOO_DARK();
            return RFATAL();
        } else if(!(isIS(PRSO, TOUCHED))) {
            MAKE(PRSO, TOUCHED);
            THIS_MOSS = PRSO;
            ++MOSSES
            QUEUE(I_MOSS);
        }
        PRINT("The moss seems soft and pliant.|");
        return true;
    } else if(isVERB(V_TOUCH, V_HIT, V_PUSH, V_REACH_IN, V_KICK)) {
        if(isVERB(V_KICK)) {
            
        } else if(isEQUAL(PRSI, null, HANDS)) {
            TELL(CTHEO, " feels moist and spongy.", CR);
            return true;
        }
        PRINT("The moss seems soft and pliant.|");
        return true;
    } else if((_X = isMOVING())) {
        TELL("Despite your best efforts, ", THEO
, " stays firmly stuck on the wall.", CR);
        return true;
    } else {
        return false;
    }
}

var UNICORN = () => OBJECT({
	LOC: STALL,
	DESC: "unicorn",
	FLAGS: [NODESC, VOWEL, TRYTAKE, NOALL, LIVING
, PERSON, FEMALE, SURFACE, NAMEABLE],
	SYNONYM: ["UNICORN", "ZZZP", "MARE", "PONY", "HORN", "BEAST", "ANIMAL", "CREATURE"],
	ADJECTIVE: ["UNICORN\'S"],
	LIFE: I_UNICORN,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	ACTION: UNICORN_F
});

function UNICORN_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("HORN")) {
        if(isTHIS_PRSI()) {
            
        } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL("Her horn is slender, the color of fine ivory, with a deep spiral groove.", CR);
            return true;
        } else if(isVERB(V_KISS)) {
            if(isSPARK(null)) {
                return true;
            }
            TELL(CTHEO, " backs away");
            if(!(isIS(PRSO, TOUCHED))) {
                MAKE(PRSO, TOUCHED);
                TELL("; but not before you touch her horn with your lips.", CR);
                UPDATE_STAT(15, LUCK, true);
                return true;
            }
            PRINT(PERIOD);
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            HARMLESS(PRSI);
            return true;
        } else if(isVERB(V_GIVE, V_FEED)) {
            PERFORM("PUT", PRSO, STALL);
            return true;
        } else if((isVERB(V_SHOW)
  &&  isPRSO(CHEST))) {
            MAKE(PRSI, SEEN);
            TELL(CTHEI, " pricks up her ears.", CR);
            return true;
        } else if((_X = isPUTTING())) {
            MAKE(PRSI, SEEN);
            MOVE(PRSO, STALL);
            WINDOW(SHOWING_ALL);
            TELL(CTHEI, " shakes off ", THEO
, " and gives you a black look.", CR);
            return true;
        }
        return false;
    } else if((isVERB(V_RELEASE, V_RESCUE)
  &&  isEQUAL(PRSI, null, HANDS))) {
        PERFORM("OPEN", STALL);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("She's just a pony.", CR);
        return true;
    } else if((_X = isTALKING())) {
        TELL(CTHEO, " is too melancholy to respond.", CR);
        return RFATAL();
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if((_X = isHURTING())) {
        HARMLESS();
        return true;
    } else if((_X = isTOUCHING())) {
        TELL(CTHE(UNICORN), " backs shyly away.", CR);
        return true;
    } else {
        return false;
    }
}

var STALL = () => OBJECT({
	LOC: IN_STABLE,
	DESC: "stall",
	FLAGS: [NODESC, VEHICLE, CONTAINER, OPENABLE, LOCKED, TRANSPARENT],
	SYNONYM: ["STALL", "GATE", "DOOR", "LOCK"],
	CAPACITY: 100,
	CONTFCN: STALL_F,
	ACTION: STALL_F
});

function STALL_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        _OBJ = PRSO;
        if(isTHIS_PRSI()) {
            _OBJ = PRSI;
        }
        if(isEQUAL(_CONTEXT, M_BEG)) {
            return isCANT_REACH_WHILE_IN(_OBJ, STALL);
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isIN(WINNER, STALL)) {
                return false;
            } else if(isEQUAL(_OBJ, null, UNICORN)) {
                return false;
            } else if(isGLOBAL_IN(HERE, _OBJ)) {
                return false;
            } else if((_X = isTOUCHING())) {
                CANT_REACH(_OBJ);
                TELL(" while you're outside "
, THE(STALL), PERIOD);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_THROW, V_PUT_BEHIND, V_EMPTY_INTO)) {
            if((isIS(PRSI, OPENED)
  ||  isIN(PLAYER, PRSI))) {
                return false;
            }
            MOVE(PRSO, PRSI);
            WINDOW(SHOWING_ALL);
            TELL("You drop ", THEO, " over the side of ", THEI);
            if(isPRSO(CHEST)) {
                TELL(", where it falls with a heavy ");
                ITALICIZE("clunk");
                PRINT(PERIOD);
                if(isIN(UNICORN, PRSI)) {
                    UNICORN_OPENS_CHEST();
                }
                return true;
            }
            PRINT(PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        if(!(isNOUN_USED("STALL"))) {
            TELL("The stall's ");
        } else {
            TELL(CTHEO
, "'s sides are tall enough to discourage escape. Its ");
        }
        TELL("gate is ");
        if(isIS(PRSO, MUNGED)) {
            TELL("utterly demolished.", CR);
            return true;
        } else if(isIS(PRSO, OPENED)) {
            TELL("wide open.", CR);
            return true;
        }
        TELL(B("CLOSED"));
        if(isIS(PRSO, LOCKED)) {
            TELL(" and locked");
        }
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_BEHIND)) {
        if(isIN(PLAYER, PRSO)) {
            ASIDE_FROM();
        } else if(isIN(UNICORN, PRSO)) {
            ASIDE_FROM(UNICORN);
        } else {
            TELL(YOU_SEE);
        }
        CONTENTS();
        P_IT_OBJECT = PRSO;
        PRINT(PERIOD);
        return true;
    } else if((isVERB(V_REACH_IN)
  &&  !(isIN(PLAYER, PRSO)))) {
        TELL(CANT, "reach very far.", CR);
        return true;
    } else if(isVERB(V_CLIMB_ON, V_CLIMB_UP, V_CLIMB_OVER, V_SIT, V_RIDE
, V_STAND_ON, V_LIE_DOWN)) {
        TELL("The sides of ", THEO, " are too tall.", CR);
        return true;
    } else if((isVERB(V_CLOSE)
  &&  isIS(PRSO, MUNGED))) {
        ITS_MUNGED("GATE");
        return true;
    } else if(isVERB(V_ENTER, V_THROUGH, V_WALK_TO)) {
        if(isIN(PLAYER, PRSO)) {
            ALREADY_IN();
            return true;
        } else if(isIS(PRSO, OPENED)) {
            return false;
        }
        ITS_CLOSED();
        return true;
    } else if(isVERB(V_EXIT, V_LEAVE, V_ESCAPE)) {
        if(!(isIN(PLAYER, PRSO))) {
            NOT_IN();
            return true;
        } else if(isIS(PRSO, OPENED)) {
            return false;
        }
        ITS_CLOSED();
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        if(isIS(PRSO, MUNGED)) {
            ITS_MUNGED("GATE");
            return true;
        } else if(isIS(PRSO, OPENED)) {
            return false;
        } else if(!(PRSI)) {
            return false;
        } else if(isVERB(V_OPEN_WITH)) {
            MUNG_STALL();
            return true;
        }
        return false;
    } else if(isVERB(V_KICK, V_HIT, V_MUNG, V_LOOSEN, V_PUSH, V_SHAKE, V_CUT)) {
        if(isIS(PRSO, MUNGED)) {
            ITS_ALREADY("in ruins");
            return true;
        } else if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("opened");
            return true;
        }
        if(isVERB(V_KICK)) {
            PRSI = FEET;
        }
        MUNG_STALL();
        return true;
    } else {
        return false;
    }
}

function MUNG_STALL(_OBJ=PRSI) {
    let _TBL;
    ITALICIZE("Wham");
    TELL("! ");
    YOUR_OBJ(_OBJ);
    TELL(" deals the gate a mighty blow");
    if(STATS[STRENGTH] < 50) {
        NOTE_NOISE();
        if(isIN(UNICORN, STALL)) {
            MAKE(UNICORN, SEEN);
            TELL(TAB, CTHE(UNICORN
), " slowly shakes her head.", CR);
        }
        return true;
    }
    WINDOW(SHOWING_ROOM);
    MAKE(STALL, OPENED);
    UNMAKE(STALL, LOCKED);
    MAKE(STALL, MUNGED);
    UNMAKE(UNICORN, SEEN);
    TELL(", shattering it into splinters.", CR);
    return true;
}

function UNICORN_OPENS_CHEST() {
    TELL(TAB, CTHE(UNICORN
), " cranes her neck towards ", THE(CHEST
), " and snuffles the lid curiously. She ");
    HAPPY_UNICORN();
    TELL("prods the lid of the chest with her nose.", CR, TAB);
    DESCRIBE_GATE(UNICORN);
    UPDATE_STAT(15, COMPASSION, true);
    return true;
}

function HAPPY_UNICORN() {
    EXIT_UNICORN();
    TELL("whinnies with joy and nuzzles your face with shy gratitude. Then, eyes bright with anticipation, the lovely creature ");
    return true;
}

function BYE_UNICORN() {
    HAPPY_UNICORN();
    TELL("shakes her mane and races out of "
, THE(STABLE), ", where her hoofbeats quickly fade into the distance.", CR);
    UPDATE_STAT(15, COMPASSION, true);
    return false;
}

function EXIT_UNICORN() {
    VANISH(UNICORN);
    DEQUEUE(I_UNICORN);
    return false;
}

var STABLE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "stablehouse",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["STABLEHOUSE", "STABLE", "STABLES", "HOUSE"],
	ADJECTIVE: ["STABLE", "LITTLE", "RED"],
	ACTION: STABLE_F
});

function STABLE_F() {
    let _X;
    if(isHERE(IN_STABLE)) {
        return HERE_F();
    } else if((_X = isENTERING())) {
        DO_WALK("NORTH");
        return true;
    } else {
        return false;
    }
}

var STORM = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "thunderclouds",
	FLAGS: [NODESC, PLURAL],
	SYNONYM: ["CLOUDS", "CLOUD", "THUNDER", "THUNDERCLOUD", "SKY"],
	ADJECTIVE: ["STORM", "THUNDER"],
	ACTION: STORM_F
});

function STORM_F() {
    let _X;
    if(((_X = isTOUCHING())
  ||  isVERB(V_LOOK_BEHIND))) {
        IMPOSSIBLE();
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL(CTHEO, " boil with dark energy.", CR);
        return true;
    } else {
        return false;
    }
}

var TWISTER = () => OBJECT({
	DESC: "tornado",
	FLAGS: [NOALL],
	SYNONYM: ["TORNADO", "TWISTER", "CYCLONE", "FUNNEL", "STORM", "CLOUD", "CLOUDS", "SKY"],
	ADJECTIVE: ["FUNNEL", "STORM"],
	DESCFCN: TWISTER_F,
	ACTION: TWISTER_F
});

function TWISTER_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A roaring funnel of wind is bearing down upon the farm!");
            return true;
        }
        return false;
    } else if((_X = isTOUCHING())) {
        TELL("Luckily, ", THE(TWISTER), " isn't close enough.", CR);
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("It looks just like the one in ");
        ITALICIZE("The Wizard of Froon");
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL(YOU_HEAR, A(SOUND_OBJ), " like a raging locomotive amid the thunder.", CR);
        return true;
    } else {
        return false;
    }
}

var MCASE = () => OBJECT({
	LOC: IN_MAGICK,
	DESC: "display case",
	FLAGS: [NODESC, CONTAINER, TRANSPARENT, OPENABLE, SURFACE],
	CAPACITY: 20,
	SYNONYM: ["CASE", "SHELVES", "SHELF"],
	ADJECTIVE: ["DISPLAY", "GLASS"],
	DNUM: ON_MCASE,
	CONTFCN: MCASE_F,
	ACTION: MCASE_F
});

var ON_MCASE = () => OBJECT({
	LOC: IN_MAGICK,
	DESC: "case",
	FLAGS: [NODESC, NOALL, SURFACE],
	CAPACITY: 15
});

function MCASE_F(_CONTEXT=null) {
    return isHANDLE_CASE(MCASE, ON_MCASE, _CONTEXT);
}

var BCASE = () => OBJECT({
	LOC: IN_BOUTIQUE,
	DESC: "display case",
	FLAGS: [NODESC, CONTAINER, TRANSPARENT, OPENABLE, SURFACE],
	CAPACITY: 20,
	SYNONYM: ["CASE", "SHELVES", "SHELF"],
	ADJECTIVE: ["DISPLAY", "GLASS"],
	DNUM: ON_BCASE,
	CONTFCN: BCASE_F,
	ACTION: BCASE_F
});

var ON_BCASE = () => OBJECT({
	LOC: IN_BOUTIQUE,
	DESC: "case",
	FLAGS: [NODESC, NOALL, SURFACE],
	CAPACITY: 15
});

function BCASE_F(_CONTEXT=null) {
    return isHANDLE_CASE(BCASE, ON_BCASE, _CONTEXT);
}

var WCASE = () => OBJECT({
	LOC: IN_WEAPON,
	DESC: "display case",
	FLAGS: [NODESC, CONTAINER, TRANSPARENT, OPENABLE, SURFACE],
	CAPACITY: 20,
	SYNONYM: ["CASE", "SHELVES", "SHELF"],
	ADJECTIVE: ["DISPLAY", "GLASS"],
	DNUM: ON_WCASE,
	CONTFCN: WCASE_F,
	ACTION: WCASE_F
});

var ON_WCASE = () => OBJECT({
	LOC: IN_WEAPON,
	DESC: "case",
	FLAGS: [NODESC, NOALL, SURFACE],
	CAPACITY: 15
});

function WCASE_F(_CONTEXT=null) {
    return isHANDLE_CASE(WCASE, ON_WCASE, _CONTEXT);
}

function isHANDLE_CASE(_OBJ, _TOP, _CONTEXT) {
    let _ANY=0, _ANYTOP, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if((_X = isTOUCHING())) {
                CANT_REACH_IN(_OBJ);
                return true;
            } else if(isVERB(V_SMELL, V_TASTE, V_EAT)) {
                YOUD_HAVE_TO("open", _OBJ);
                return true;
            }
            return false;
        }
        return false;
    } else if(isNOUN_USED("SHELVES", "SHELF")) {
        if((_X = isTOUCHING())) {
            CANT_REACH_IN(_OBJ);
            return true;
        } else if(isTHIS_PRSI()) {
            return false;
        } else if(isVERB(V_LOOK_ON, V_EXAMINE)) {
            LOOK_IN_CASE(_OBJ);
            return true;
        }
    }
    _ANYTOP = isSEE_ANYTHING_IN(_TOP);
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_UNDER, V_PUT_BEHIND, V_EMPTY_INTO)) {
            ITS_CLOSED(PRSI);
            return true;
        } else if(isVERB(V_PUT_ON)) {
            WINDOW(SHOWING_ALL);
            MOVE(PRSO, _TOP);
            TELL("You put ", THEO, SON, THE(_OBJ), PERIOD);
            if(!(isIS(PRSO, IDENTIFIED))) {
                TELL(TAB);
                ASK_OWOMAN_ABOUT(PRSO);
            }
            return true;
        } else if(isVERB(V_THROW, V_THROW_OVER)) {
            MUNG_CASE_WITH(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("The interior of the glass ", PRSO, " is lined with ");
        if(isSEE_ANYTHING_IN()) {
            ++_ANY
            TELL("shelves, upon which you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
        } else {
            TELL("empty shelves");
        }
        if(isT(_ANYTOP)) {
            TELL(". ");
            if(isT(_ANY)) {
                TELL("You also");
            } else {
                TELL("On top of the case you");
            }
            TELL(" see ");
            CONTENTS(_TOP);
            P_IT_OBJECT = PRSO;
            if(isT(_ANY)) {
                TELL(" on top of the case");
            }
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_ON)) {
        TELL(YOU_SEE);
        CONTENTS(_TOP);
        P_IT_OBJECT = PRSO;
        TELL(SON, THEO, PERIOD);
        return true;
    } else if(isVERB(V_SEARCH, V_LOOK_INSIDE, V_LOOK_UNDER
, V_LOOK_BEHIND)) {
        LOOK_IN_CASE(PRSO);
        return true;
    } else if(isVERB(V_OPEN, V_REACH_IN, V_EMPTY)) {
        if((isT(_ANYTOP)
  &&  isVERB(V_EMPTY))) {
            PRSO = _TOP;
            V_EMPTY();
            PRSO = _OBJ;
            return true;
        }
        TELL(CTHELADY, " slaps ", HANDS, " away. \"Ask.\"", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_OPEN_WITH)) {
        MUNG_CASE_WITH(PRSI);
        return true;
    } else if(isVERB(V_KICK)) {
        MUNG_CASE_WITH(FEET);
        return true;
    } else if(isVERB(V_CLOSE)) {
        ITS_ALREADY("closed");
        return true;
    } else if((_X = isCLIMBING_ON())) {
        MUNG_CASE_WITH(HANDS);
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_ON();
        return true;
    } else {
        return false;
    }
}

function LOOK_IN_CASE(_OBJ) {
    if(!(isSEE_ANYTHING_IN(_OBJ))) {
        TELL("The shelves in ", THE(_OBJ
), " are empty.", CR);
        return true;
    }
    TELL("Peering under the glass", LYOU_SEE);
    CONTENTS(_OBJ);
    P_IT_OBJECT = _OBJ;
    PRINT(PERIOD);
    return true;
}

function CANT_REACH_IN(_OBJ) {
    TELL(CANT, "reach into ", THE(_OBJ), PERIOD);
    return true;
}

function MUNG_CASE_WITH(_OBJ) {
    MAKE(OWOMAN, SEEN);
    if(isEQUAL(_OBJ, HANDS, FEET)) {
        TELL("\"Stop that");
    } else {
        TELL("\"Put th");
        if(isIS(_OBJ, PLURAL)) {
            TELL("ose ");
        } else {
            TELL("at ");
        }
        TELL(D(_OBJ), " down");
    }
    TELL(",\" demands ", THE(OWOMAN), PERIOD);
    return true;
}

var PLATE = () => OBJECT({
	LOC: BCASE,
	DESC: "plate mail",
	FLAGS: [CLOTHING, TAKEABLE, SURFACE, CONTAINER, OPENED, NOARTICLE],
	SYNONYM: ["MAIL", "PLATE", "ARMOR"],
	ADJECTIVE: ["PLATE"],
	SIZE: 10,
	EFFECT: 60,
	EMAX: 60,
	VALUE: 200,
	ACTION: PLATE_F
});

function PLATE_F() {
    let _X;
    if(isHANDLE_ARMOR(PLATE)) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The bulky ", D(PRSO
), " looks as if it could turn aside any blade you could wield.", CR);
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL(CTHEO, " feels as sturdy as it looks.", CR);
        return true;
    } else {
        return false;
    }
}

var CHAIN = () => OBJECT({
	DESC: "chain mail",
	FLAGS: [CLOTHING, TAKEABLE, SURFACE, CONTAINER, OPENED, NOARTICLE],
	SYNONYM: ["MAIL", "CHAIN", "ARMOR"],
	ADJECTIVE: ["CHAIN", "ELVIN", "ELVISH"],
	SIZE: 3,
	EFFECT: 35,
	EMAX: 35,
	VALUE: 100,
	ACTION: CHAIN_F
});

function CHAIN_F() {
    let _X;
    if(isHANDLE_ARMOR(CHAIN)) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The intricate silver mesh sparkles as you gaze upon it.", CR);
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL(CTHEO, " feels remarkably light and supple.", CR);
        return true;
    } else {
        return false;
    }
}

var SCALE = () => OBJECT({
	LOC: BCASE,
	DESC: "scale mail",
	FLAGS: [CLOTHING, TAKEABLE, SURFACE, CONTAINER, OPENED, NOARTICLE],
	SYNONYM: ["MAIL", "SCALE", "ARMOR"],
	ADJECTIVE: ["SCALE"],
	SIZE: 3,
	EFFECT: 20,
	EMAX: 20,
	VALUE: 60,
	ACTION: SCALE_F
});

function SCALE_F() {
    let _X;
    if(isHANDLE_ARMOR(SCALE)) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        LEATHER();
        TELL("overcoat, with metal scales sewn on the outside.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        OILY();
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL(CTHEO, " feels sturdy enough.", CR);
        return true;
    } else {
        return false;
    }
}

var TUNIC = () => OBJECT({
	LOC: BCASE,
	DESC: "leather tunic",
	FLAGS: [CLOTHING, TAKEABLE, SURFACE, CONTAINER, OPENED],
	SYNONYM: ["TUNIC", "ARMOR"],
	ADJECTIVE: ["LEATHER"],
	SIZE: 3,
	EFFECT: 10,
	EMAX: 10,
	VALUE: 20,
	ACTION: TUNIC_F
});

function TUNIC_F() {
    let _X;
    if(isHANDLE_ARMOR(TUNIC)) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " wouldn't stop a hellhound, or even an arrow. But it looks comfortable.", CR);
        return true;
    } else if(isVERB(V_SMELL)) {
        OILY();
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL(CTHEO, " feels soft and supple.", CR);
        return true;
    } else {
        return false;
    }
}

function OILY() {
    TELL(CTHEO, " smells rich and oily.", CR);
    return true;
}

var CLOAK = () => OBJECT({
	LOC: BCASE,
	DESC: "cloak",
	SDESC: DESCRIBE_CLOAK,
	FLAGS: [CLOTHING, TAKEABLE, SURFACE, CONTAINER, OPENED, BUOYANT],
	SYNONYM: ["CLOAK", "STEALTH"],
	ADJECTIVE: ["STEALTH"],
	SIZE: 3,
	EFFECT: 5,
	EMAX: 5,
	VALUE: 30,
	ACTION: CLOAK_F
});


function CLOAK_F() {
    let _W=0, _EFX, _X;
    _EFX = GETP(CLOAK, "EFFECT");
    if((isIN(CLOAK, PLAYER)
  &&  isIS(CLOAK, WORN))) {
        ++_W
    }
    if(isHANDLE_ARMOR(CLOAK)) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        O_WEARING();
        TELL(" is so utterly unremarkable in color (dull gray), style (utilitarian) and cut (shapeless), that your eyes feel compelled to look elsewhere.", CR);
        return true;
    } else if(isVERB(V_WEAR, V_USE)) {
        if(isT(_W)) {
            return false;
        } else if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("pick up");
            return true;
        }
        MAKE(PRSO, WORN);
        TELL("You slip ", THEO, " over ");
        DO_CLOAK(_EFX);
        return true;
    } else if(isVERB(V_TAKE_OFF)) {
        if(!(_W)) {
            return false;
        }
        UNMAKE(PRSO, WORN);
        TELL("You slip ", THEO, " off ");
        DO_CLOAK((0 - _EFX));
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL(CTHEO, " feels surprisingly soft and lightweight.", CR);
        return true;
    } else {
        return false;
    }
}

function O_WEARING() {
    TELL(CTHEO);
    if(isIS(PRSO, WORN)) {
        PRINT(" you're wearing");
    }
    return false;
}

function DO_CLOAK(_EFX) {
    TELL("your shoulders.", CR);
    WINDOW(SHOWING_INV);
    UPDATE_STAT(_EFX, ARMOR_CLASS);
    return false;
}

function isHANDLE_ARMOR(_OBJ) {
    let _W=0, _C=0, _EFX, _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO, V_PUT_UNDER, V_PUT_BEHIND)) {
            TELL(CTHEI, " has no pockets in which to "
, B(P_PRSA_WORD), " things.", CR);
            return true;
        } else if(isVERB(V_PUT_ON, V_THROW, V_THROW_OVER)) {
            NO_GOOD_SURFACE();
            return true;
        }
        return false;
    }

    if((isIN(_OBJ, PLAYER)
  &&  isIS(_OBJ, WORN))) {
        ++_W
    }
    if(isVERB(V_REACH_IN, V_EMPTY, V_LOOK_INSIDE, V_SEARCH, V_LOOK_UNDER
, V_LOOK_BEHIND, V_SHAKE)) {
        if(isT(_W)) {
            TELL("Except for ", ME, ", the ");
        } else {
            TELL(XTHE);
        }
        TELL(D(PRSO), " is empty.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        TELL(DONT, "need to do that with this ", PRSO, PERIOD);
        return true;
    } else if(isEQUAL(_OBJ, CLOAK)) {
        return false;
    }
    _EFX = GETP(_OBJ, "EFFECT");
    if((isIN(CLOAK, PLAYER)
  &&  isIS(CLOAK, WORN))) {
        ++_C
    }
    if(isVERB(V_WEAR, V_USE)) {
        if(isT(_W)) {
            return false;
        } else if((_X = isFIRST(PLAYER))) {
            while(true) {
                if((!(isEQUAL(_X, CLOAK, HELM))
  &&  isIS(_X, CLOTHING)
  &&  isIS(_X, WORN)
  &&  GETP(_X, "EFFECT"))) {
                    break;
                }
                if(!((_X = isNEXT(_X)))) {
                    break;
                }
            }
        }
        if(isT(_X)) {
            YOUD_HAVE_TO("take off", _X);
            return true;
        } else if(!(isIN(_OBJ, PLAYER))) {
            YOUD_HAVE_TO("pick up");
            return true;
        }
        MAKE(PRSO, WORN);
        TELL(CYOU);
        if(isT(_C)) {
            TELL("slip off your ", D(CLOAK), ", ");
        }
        TELL("put on ", THEO);
        if(isT(_C)) {
            TELL(" and throw the cloak back over it");
        }
        DO_WEAR(_EFX);
        return true;
    } else if(isVERB(V_TAKE_OFF)) {
        if(!(_W)) {
            return false;
        }
        UNMAKE(PRSO, WORN);
        TELL(CYOU);
        if(isT(_C)) {
            TELL("remove your ", D(CLOAK), ", ");
        }
        TELL("take off ", THEO);
        if(isT(_C)) {
            TELL(" and slip the cloak back on");
        }
        DO_WEAR((0 - _EFX));
        return true;
    } else {
        return false;
    }
}

function DO_WEAR(_EFX) {
    PRINT(PERIOD);
    WINDOW(SHOWING_INV);
    UPDATE_STAT(_EFX, ARMOR_CLASS);
    return false;
}

var QUICKSAND = () => OBJECT({
	LOC: JUN0,
	DESC: "quicksand",
	FLAGS: [NODESC, TRYTAKE, NOALL, CONTAINER, OPENED, SURFACE],
	CAPACITY: 10000,
	SYNONYM: ["QUICKSAND", "SAND", "POOL", "MUD"],
	ADJECTIVE: ["QUICK"],
	CONTFCN: QUICKSAND_F,
	ACTION: QUICKSAND_F
});

function QUICKSAND_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(!(_OBJ)) {
                return false;
            } else if(isVERB(V_THROW, V_THROW_OVER)) {
                HIT_SANDED_OBJ_WITH(PRSI, PRSO);
                return true;
            } else if(isVERB(V_KICK)) {
                HIT_SANDED_OBJ_WITH(PRSO, FEET);
                return true;
            } else if(isVERB(V_HIT, V_KICK, V_MUNG)) {
                HIT_SANDED_OBJ_WITH(PRSO, PRSI);
                return true;
            } else if((_X = isTOUCHING())) {
                CANT_REACH(_OBJ);
                STANDING();
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            ITALICIZE("Ploop");
            TELL("! ", CTHEO, " lands on ", THEI, AND);
            if((isPRSO(PARASOL)
  &&  isIS(PRSO, OPENED))) {
                
            } else if(GETP(PRSO, "SIZE") > 2) {
                VANISH();
                TELL("slowly sinks out of sight.", CR);
                return true;
            }
            MOVE(PRSO, PRSI);
            WINDOW(SHOWING_ALL);
            TELL("floats uncertainly.", CR);
            return true;
        } else if(isVERB(V_TOUCH_TO)) {
            HIT_SAND_WITH(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_LOOK_ON, V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        TELL(YOU_SEE);
        CONTENTS();
        P_IT_OBJECT = PRSO;
        TELL(" floating on ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND, V_OPEN, V_CLOSE)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_TOUCH, V_REACH_IN, V_SQUEEZE, V_EMPTY)) {
        HIT_SAND_WITH(HANDS);
        return true;
    } else if(isVERB(V_KICK)) {
        HIT_SAND_WITH(FEET);
        return true;
    } else if(isVERB(V_HIT, V_MUNG)) {
        HIT_SAND_WITH(PRSI);
        return true;
    } else if(((_X = isENTERING())
  ||  isVERB(V_SWIM, V_DIVE, V_CLIMB_DOWN))) {
        ENTER_QUICKSAND();
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if((_X = isMOVING())) {
        ITALICIZE("Gloop");
        TELL(". It seems that ");
        GRITTY();
        TELL(" is virtually impossible to move.", CR);
        return true;
    } else {
        return false;
    }
}

function HIT_SANDED_OBJ_WITH(_OBJ, _WITH) {
    YOUR_OBJ(_WITH);
    TELL(" misses ", THE(_OBJ));
    if((isVERB(V_THROW, V_THROW_OVER)
  &&  !(isEQUAL(_WITH, null, HANDS, FEET)))) {
        TELL(", lands with a ");
        ITALICIZE("ploop");
        TELL(SIN, THE(QUICKSAND), AND);
        if((isIS(_OBJ, BUOYANT)
  ||  GETP(_OBJ, "SIZE") < 3
  ||  (isEQUAL(_OBJ, PARASOL)
  &&  isIS(_OBJ, OPENED)))) {
            MOVE(_WITH, QUICKSAND);
            WINDOW(SHOWING_ALL);
            TELL("floats there uncertainly");
        } else {
            VANISH(_WITH);
            TELL("sinks out of sight");
        }
    } else {
        TELL(". It's just beyond your reach");
    }
    PRINT(PERIOD);
    if((!(isEQUAL(_OBJ, BABY))
  ||  isIS(MAMA, MONSTER)
  ||  !(isVISIBLE(MAMA)))) {
        return true;
    }
    LAST_MONSTER = MAMA;
    MAMA_TO_MONSTER();
    TELL(TAB, "A sound like a snorting bull turns your attention to "
, THE(MAMA), ". It looks as if she's about to attack!", CR);
    return true;
}

function MAMA_TO_MONSTER() {
    MAKE(MAMA, MONSTER);
    isREPLACE_SYN(MAMA, "ZZZP", "MONSTER");
    PUTP(MAMA, "GENERIC", GENERIC_MONSTER_F);
    return false;
}

function HIT_SAND_WITH(_OBJ) {
    TELL("Ick! ");
    YOUR_OBJ(_OBJ);
    TELL(" pulls away from ");
    GRITTY();
    TELL(" with a sickening ");
    ITALICIZE("slurp");
    PRINT(PERIOD);
    return true;
}

function GRITTY() {
    TELL("the wet, gritty ", QUICKSAND);
    return true;
}

function ENTER_QUICKSAND() {
    TELL("You step boldly into the pool, and thrash helplessly for a while in ");
    GRITTY();
    TELL(" until your mouth fills");
    JIGS_UP();
    return false;
}

var MAMA = () => OBJECT({
	LOC: JUN0,
	LAST_LOC: JUN0,
	DESC: "mother hungus",
	FLAGS: [NODESC, LIVING, TRYTAKE, NOALL, FEMALE, NAMEABLE],
	SYNONYM: ["HUNGUS", "HUNGUS", "MOTHER", "MAMA", "MA", "MOM", "MOMMA", "ZZZP"],
	ADJECTIVE: ["MOTHER", "MAMA", "MA"],
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	LIFE: I_MAMA,
	ENDURANCE: 30,
	EMAX: 30,
	STRENGTH: 16,
	DEXTERITY: 95,
	GENERIC: 0,
	CONTFCN: MAMA_F,
	DESCFCN: MAMA_F,
	ACTION: MAMA_F
});

function GOOD_MAMA() {
    if(isIN(BABY, QUICKSAND)) {
        UNMAKE(MAMA, MONSTER);
        isREPLACE_SYN(MAMA, "MONSTER", "ZZZP");
        PUTP(MAMA, "GENERIC", 0);
    }
    PUTP(MAMA, "LAST-LOC", JUN0);
    MOVE(MAMA, JUN0);
    return false;
}

function MAMA_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(MAMA), " is standing nearby");
            if(isVISIBLE(BABY)) {
                TELL(", gazing anxiously at her baby");
            }
            TELL(C("."));
            return true;
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(!(_OBJ)) {
                return false;
            }
            TELL(CANT);
            if((_X = isSEEING())) {
                TELL("see ");
            } else if((_X = isTOUCHING())) {
                TELL("reach ");
            } else {
                TELL("do that with ");
            }
            TELL(THE(_OBJ), " while it's inside ", THE(MAMA), PERIOD);
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isTALK_TO_MUNGI()) {
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        GAZEBACK();
        TELL("suspiciously.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
        TELL(CTHEO, " avoids your ");
        if(isEQUAL(PRSI, null, HANDS)) {
            TELL("blow");
        } else if((isVERB(V_KICK)
  ||  isPRSI(FEET))) {
            TELL("foot");
        } else {
            TELL(D(PRSI));
        }
        TELL(", and bellows a warning.", CR);
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function isTALK_TO_MUNGI() {
    let _X;
    if((_X = isTALKING())) {
        TELL("Hunguses (hungi?) aren't smart enough to understand.", CR);
        return true;
    }
    return false;
}

var BABY = () => OBJECT({
	LOC: QUICKSAND,
	DESC: "baby hungus",
	FLAGS: [TRYTAKE, NOALL, LIVING, NAMEABLE],
	SYNONYM: ["BABY", "HUNGUS"],
	ADJECTIVE: ["BABY", "LITTLE", "SMALL"],
	LIFE: I_BABY,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	ACTION: BABY_F
});

function BABY_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isTALK_TO_MUNGI()) {
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        GAZEBACK();
        TELL("helplessly.", CR);
        return true;
    } else if(isVERB(V_RESCUE, V_RELEASE)) {
        TELL("Easier said than done.", CR);
        return true;
    } else if(isVERB(V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

function GAZEBACK() {
    TELL(CTHEO, " gazes back at you ");
    return false;
}

var PARASOL = () => OBJECT({
	DESC: "umbrella",
	SDESC: DESCRIBE_PARASOL,
	FLAGS: [NODESC, TAKEABLE, OPENABLE, FERRIC],
	SYNONYM: ["UMBRELLA", "PARASOL", "BROLLY", "HANDLE", "PARROT", "HEAD"],
	ADJECTIVE: ["CLOSED", "PARROT\'S"],
	SIZE: 8,
	VALUE: 2,
	DESCFCN: PARASOL_F,
	ACTION: PARASOL_F
});


function PARASOL_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(PARASOL), " dangles uncertainly from one of the ropes.");
            return true;
        }
        return false;
    } else if((isNOUN_USED("HANDLE", "PARROT", "HEAD")
  ||  isADJ_USED("PARROT\'S"))) {
        if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            TELL("The parrot's head stares back at you.", CR);
            return true;
        } else if(isVERB(V_TAKE, V_MOVE, V_PULL)) {
            TELL("The handle is firmly attached to the "
, PRSO, PERIOD);
            return true;
        }
        USELESS("umbrella's handle", true);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            TELL(CTHEO, " glances off the ", D(PRSI), AND);
            FALLS();
            return true;
        } else if(isVERB(V_PUT, V_PUT_ON, V_EMPTY_INTO)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL(CTHEO
, "'s handle is carved in the shape of a parrot's head.", CR);
        return true;
    } else if(isVERB(V_READ, V_LOOK_ON)) {
        if(isIS(PRSO, OPENED)) {
            TELL("Nothing is legible on the ", PRSO, PERIOD);
            return true;
        }
        YOUD_HAVE_TO("open");
        return true;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_STAND_UNDER)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if(!(isIS(PRSO, OPENED))) {
            ITS_CLOSED();
            return true;
        }
        TELL(ALREADY, "doing that.", CR);
        return true;
    } else if((isVERB(V_OPEN, V_OPEN_WITH)
  &&  isEQUAL(PRSI, null, HANDS))) {
        if(isIS(PRSO, MUNGED)) {
            TELL(CANT, "open ", THEO, " anymore.", CR);
            return true;
        } else if(!(isIN(PARASOL, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        }
        MAKE(PRSO, OPENED);
        MAKE(PRSO, SURFACE);
        MAKE(PRSO, VOWEL);
        MAKE(PRSO, BUOYANT);
        WINDOW(SHOWING_INV);
        isREPLACE_ADJ(PRSO, "CLOSED", "OPEN");
        TELL("You snap open the ", PRSO, PERIOD);
        if((isIS(HERE, INDOORS)
  &&  isNOLUCK())) {
            UPDATE_STAT(-1, LUCK, true);
            return true;
        } else if(isHERE(IN_SKY)) {
            P_WALK_DIR = null;
            TELL(TAB
, "Before you can think or move, a gust of wind pulls you");
            OUT_OF_LOC(SADDLE);
            TELL(", and you float down to a ");
            _X = isDOWN_TO();
            if(!(_X)) {
                if(isEQUAL(ABOVE, OTHRIFF)) {
                    TELL("hideous death among ", THE(XTREES
), " of Thriff");
                    JIGS_UP();
                    return true;
                }
                /*SAY_ERROR("PARASOL-F");*/
                return true;
            }
            OLD_HERE = null;
            P_WALK_DIR = null;
            WINDOW(SHOWING_ALL);
            MOVE(PLAYER, _X);
            TELL("reasonably soft landing");
            RELOOK();
        }
        return true;
    } else if(isVERB(V_CLOSE, V_FOLD)) {
        if(isIS(PRSO, MUNGED)) {
            TELL(CANT, "close ", THEO, " anymore.", CR);
            return true;
        } else if(!(isIN(PARASOL, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if(!(isIS(PRSO, OPENED))) {
            ITS_ALREADY("closed");
            return true;
        }
        UNMAKE(PRSO, OPENED);
        UNMAKE(PRSO, SURFACE);
        UNMAKE(PRSO, VOWEL);
        UNMAKE(PRSO, BUOYANT);
        WINDOW(SHOWING_INV);
        isREPLACE_ADJ(PRSO, "OPEN", "CLOSED");
        TELL("You snap the ", PRSO, " shut.", CR);
        return true;
    } else if(isVERB(V_FILL_FROM)) {
        if(isWATER()) {
            TELL("Water ");
            PRINT("splashes all over the place.|");
            return true;
        } else if(isPRSI(POOL)) {
            TELL("Radiance leaks through ", THEO
, " and dissipates in the air.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var ZSIGN = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "notice",
	FLAGS: [NODESC, READABLE, TRYTAKE],
	SYNONYM: ["NOTICE", "SIGN"],
	ACTION: ZSIGN_F
});

function ZSIGN_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        TELL(CTHEO, " says,||");
        HLIGHT(H_MONO);
        TELL("    ZENO'S BRIDGE|Cross at thy Own Risk", CR);
        HLIGHT(H_NORMAL);
        return true;
    } else if((_X = isMOVING())) {
        ROOTED(PRSO);
        return true;
    } else {
        return false;
    }
}

var WHISTLE = () => OBJECT({
	LOC: DACT,
	DESC: "whistle",
	SDESC: DESCRIBE_WHISTLE,
	FLAGS: [TAKEABLE, CLOTHING],
	SIZE: 1,
	VALUE: 10,
	SYNONYM: ["WHISTLE", "SUMMONING", "CHAIN"],
	ADJECTIVE: ["SUMMONING"],
	ACTION: WHISTLE_F
});


var HOOTS/*NUMBER*/ = 0;

function WHISTLE_F() {
    let _ITAL=0, _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isNOUN_USED("CHAIN")) {
        if(isVERB(V_BLOW_INTO)) {
            IMPOSSIBLE();
            return true;
        } else if((isVERB(V_EXAMINE, V_LOOK_ON)
  ||  (_X = isMOVING()))) {
            FIRMLY_ATTACHED("chain", PRSO, true);
            return true;
        }
    }
    if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        TELL(CTHEO, " has a picture of a ", DACT
, " etched on it, and has a chain for wearing.", CR);
        return true;
    } else if(isVERB(V_BLOW_INTO, V_USE)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if(!(isEQUAL(HOST, APPLE_2E, APPLE_2C))) {
            ++_ITAL
        }
        TELL(CTHEO, " emits a long, harsh wail");
        if(isPLAIN_ROOM()) {
            TELL(" that is swallowed in a clap of thunder");
        }
        TELL(PTAB);
        if(isIS(PRSO, NEUTRALIZED)) {
            
        } else if(isVISIBLE(DACT)) {
            if(isIS(DACT, SLEEPING)) {
                WAKE_DACT();
                return true;
            }
            TELL(CTHE(DACT));
            PRINT(" looks at you expectantly. ");
            if(isT(_ITAL)) {
                HLIGHT(H_ITALIC);
            } else {
                PRINTC(QUOTATION);
            }
            TELL("I await your pleasure");
            if(isT(_ITAL)) {
                HLIGHT(H_NORMAL);
            }
            PRINTC('\,'.charCodeAt(0));
            if(!(_ITAL)) {
                PRINTC(QUOTATION);
            }
            TELL(" whispers a voice in ", HEAD, PERIOD);
            return true;
        }
        if((isHERE(IN_GARDEN)
  &&  isIN(QUEEN, HERE))) {
            QUEEN_SEES_YOU("at the sound");
            return true;
        }
        TELL("Nothing happens");
        if((isIS(PRSO, NEUTRALIZED)
  ||  isHERE(IN_FROON, APLANE, IN_SPLENDOR)
  ||  isPLAIN_ROOM()
  ||  !(isEQUAL(ATIME, PRESENT))
  ||  isIN(PLAYER, ARCH)
  ||  isIS(HERE, INDOORS)
  ||  isIS(DACT, SLEEPING)
  ||  isIS(DACT, MUNGED)
  ||  !(isIS(DACT, LIVING))
  ||  ++HOOTS > 3)) {
            PRINT(PERIOD);
            return true;
        }
        TELL(" for a moment. Then, with a raucous cry and a great beating of wings, "
, THE(DACT));
        if((isT(LAST_MONSTER)
  ||  isFIND_IN(HERE, MONSTER)
  ||  isIN(PLAYER, GONDOLA)
  ||  isHERE(NW_SUPPORT, SW_SUPPORT, SE_SUPPORT)
  ||  (!(isEQUAL(0, LAVA_TIMER, MAGMA_TIMER))
  &&  isHERE(FOREST_EDGE, ON_TRAIL, ON_PEAK)))) {
            TELL(" swoops overhead. Finding no safe place to land, he soars away again.", CR);
            return true;
        }
        TELL(" lands by your side", PTAB);
        MOVE(DACT, HERE);
        UNMAKE(DACT, NODESC);
        WINDOW(SHOWING_ROOM);
        if(isT(_ITAL)) {
            HLIGHT(H_ITALIC);
        } else {
            PRINTC(QUOTATION);
        }
        TELL("This is the ");
        if(isEQUAL(HOOTS, 3)) {
            TELL("last time I shall answer");
        } else {
            if(isEQUAL(HOOTS, 1)) {
                TELL("first");
            } else {
                TELL("second");
            }
            TELL(" time I have answered");
        }
        TELL(" the whistle's call");
        if(isT(_ITAL)) {
            HLIGHT(H_NORMAL);
        }
        PRINTC('\,'.charCodeAt(0));
        if(!(_ITAL)) {
            PRINTC(QUOTATION);
        }
        TELL(" observes a voice in ", HEAD);
        if(isEQUAL(HOOTS, 3)) {
            VANISH();
            TELL("; and as it speaks, ", THEO
, " melts away into nothingness");
        }
        TELL(". ");
        if(isT(_ITAL)) {
            HLIGHT(H_ITALIC);
        } else {
            PRINTC(QUOTATION);
        }
        if(HOOTS < 3) {
            if(isEQUAL(HOOTS, 1)) {
                TELL("Twice");
            } else {
                TELL("Once");
            }
            TELL(" more you may use it to summon me");
            if(isT(_ITAL)) {
                HLIGHT(H_NORMAL);
            }
            TELL(". ");
            if(isT(_ITAL)) {
                HLIGHT(H_ITALIC);
            }
        }
        TELL("I wait at your disposal");
        if(isT(_ITAL)) {
            HLIGHT(H_NORMAL);
        }
        PRINTC(".");
        if(!(_ITAL)) {
            PRINTC(QUOTATION);
        }
        CRLF();
        return true;
    } else {
        return false;
    }
}

var CHAPEL = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "chapel",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["CHAPEL", "CHURCH", "TEMPLE"],
	ACTION: CHAPEL_F
});

function CHAPEL_F() {
    let _X;
    if((_X = isEXITING())) {
        if(isHERE(IN_CHAPEL)) {
            DO_WALK("EAST");
            return true;
        }
        NOT_IN();
        return true;
    } else if((_X = isENTERING())) {
        DO_WALK("WEST");
        return true;
    } else if(isHERE(IN_CHAPEL)) {
        return HERE_F();
    } else {
        return false;
    }
}

var CHAPEL_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE, OPENED],
	SYNONYM: ["DOOR", "DOORS", "DOORWAY"],
	ADJECTIVE: ["FRONT", "CHAPEL"]
});

var PEW = () => OBJECT({
	LOC: IN_CHAPEL,
	DESC: "pew",
	FLAGS: [VEHICLE, SURFACE],
	CAPACITY: 100,
	SYNONYM: ["PEW", "SEAT", "CHAIR"],
	ACTION: PEW_F
});

var UNDERPEW = () => OBJECT({
	LOC: IN_CHAPEL,
	DESC: "pew",
	FLAGS: [NODESC, NOALL, SURFACE]
});

function PEW_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            _X = isSEE_ANYTHING_IN(PEW);
            TELL("There's a");
            if(!(_X)) {
                TELL("n empty");
            }
            TELL(" pew just inside ", THE(CHAPEL_DOOR));
            if(isT(_X)) {
                PRINT(". On it you see ");
                CONTENTS(PEW);
                P_IT_OBJECT = PEW;
            }
            PRINTC(".");
            return true;
        } else if(isEQUAL(_CONTEXT, M_BEG)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(isEQUAL(_OBJ, null, PEW, UNDERPEW)) {
                return false;
            } else if(isIN(_OBJ, UNDERPEW)) {
                return false;
            } else if(isGLOBAL_IN(HERE, _OBJ)) {
                return false;
            } else if((isIN(_OBJ, HERE)
  &&  (_X = isTOUCHING()))) {
                CANT_REACH(_OBJ);
                TELL(" while you're sitting on "
, THE(PEW), PERIOD);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
            if(GETP(PRSO, "SIZE") > 6) {
                TELL(CTHEO, " won't fit under ", THEI, PERIOD);
                return true;
            }
            STASH(UNDERPEW);
            return true;
        }
        return false;
    } else if(isVERB(V_ENTER, V_SIT)) {
        ENTER_PEW();
        return true;
    } else if(isVERB(V_STAND_ON, V_LEAP, V_LIE_DOWN)) {
        TELL("Pews are for sitting.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " looks ");
        if(isIN(PLAYER, PRSO)) {
            TELL("and feels ");
        }
        TELL("uncomfortably hard");
        if(isSEE_ANYTHING_IN()) {
            TELL(". Upon it you see ");
            CONTENTS(PRSO);
            P_IT_OBJECT = PRSO;
            if((_X = isFIRST(UNDERPEW))) {
                TELL(". There also ");
                PRINT("seems to be something underneath");
            }
        } else if((_X = isFIRST(UNDERPEW))) {
            TELL(". There ");
            PRINT("seems to be something underneath");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_SEARCH, V_LOOK_BEHIND)) {
        if((_X = isFIRST(UNDERPEW))) {
            TELL("Peering under ", THEO, LYOU_SEE);
            CONTENTS(UNDERPEW);
            P_IT_OBJECT = PRSO;
        } else {
            TELL(NOTHING, "under ", THEO);
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

function STASH(_OBJ) {
    MOVE(PRSO, _OBJ);
    WINDOW(SHOWING_INV);
    TELL("You stash ", THEO, " out of sight beneath "
, THEI, PERIOD);
    return true;
}

function ENTER_PEW() {
    if(isIN(PLAYER, PEW)) {
        ALREADY_ON(PEW);
        return false;
    }
    MOVE(PLAYER, PEW);
    PEWSLIDE();
    return false;
}

function EXIT_PEW() {
    if(!(isIN(PLAYER, PEW))) {
        NOT_ON();
        return false;
    }
    MOVE(PLAYER, IN_CHAPEL);
    PEWSLIDE(true);
    return false;
}

function PEWSLIDE(_X) {
    WINDOW(SHOWING_ROOM);
    OLD_HERE = null;
    P_WALK_DIR = null;
    if(!(isIS(VIAL, TOUCHED))) {
        MAKE(VIAL, TOUCHED);
        P_IT_OBJECT = VIAL;
        TELL("As you slide into the pew, "
, FEET, " nudges something underneath.", CR);
        return true;
    }
    TELL("You slide quietly ");
    if(isASSIGNED(_X)) {
        TELL(B("OFF"));
    } else {
        TELL(B("INTO"));
    }
    TELL(C(SP), THE(PEW), PERIOD);
    return true;
}

var BFLY = () => OBJECT({
	LOC: PLAIN1,
	DESC: "butterfly",
	SDESC: DESCRIBE_BFLY,
	FLAGS: [TRYTAKE, /*TAKEABLE*/LIVING, PERSON, FEMALE, NAMEABLE],
	SYNONYM: ["BUTTERFLY", "ZZZP", "FLY", "INSECT"],
	ADJECTIVE: ["BUTTER"],
	LIFE: I_BFLY,
	SIZE: 1,
	VALUE: 5,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: BFLY_F,
	ACTION: BFLY_F
});

VOC("CATERPILLAR", NOUN);


function BFLY_F(_CONTEXT=null) {
    let _ALIVE=0, _CAT=0, _X;
    P_IT_OBJECT = BFLY;
    if(isIS(BFLY, LIVING)) {
        ++_ALIVE
    }
    if(isIS(BFLY, MUNGED)) {
        ++_CAT
    }
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        MAKE(BFLY, IDENTIFIED);
        TELL(CA(BFLY), SIS);
        if(!(_ALIVE)) {
            TELL("lying on");
        } else if(isT(_CAT)) {
            TELL("crawling around");
        } else {
            TELL("fluttering around ", HEAD, C("."));
            return true;
        }
        TELL(STHE);
        GROUND_WORD();
        TELL(C("."));
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        if(!(_ALIVE)) {
            NOT_LIKELY();
            PRINT(" would respond.|");
            return RFATAL();
        }
        TELL(CTHE(BFLY), " pretends not to understand you.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        MAKE(BFLY, IDENTIFIED);
        if(!(_ALIVE)) {
            TELL("She's dead.", CR);
            return true;
        }
        TELL(CTHEO);
        if(!(_CAT)) {
            TELL(" is almost as big as your hand, and dappled with splotches of ");
            if(isSEE_COLOR()) {
                TELL("bright color.", CR);
                return true;
            }
            TELL("gray.", CR);
            return true;
        }
        TELL(" assigns one of her eyes to stare back at you.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        if((!(_ALIVE)
  ||  isT(_CAT))) {
            return false;
        }
        UNMAKE(PRSO, SEEN);
        WINDOW(SHOWING_ALL);
        _X = LOC(PRSO);
        TELL(CTHEO);
        if(!(isEQUAL(_X, HERE))) {
            MOVE(PRSO, HERE);
            TELL(" flutters");
            OUT_OF_LOC(_X);
            TELL(" and");
        }
        TELL(" darts out of reach.", CR);
        return true;
    } else {
        return false;
    }
}

var GOBLET = () => OBJECT({
	DESC: "goblet",
	SDESC: DESCRIBE_GOBLET,
	FLAGS: [TAKEABLE, CONTAINER, OPENED, FERRIC],
	SYNONYM: ["ZZZP", "GOBLET", "CHALICE", "ZZZP", "CUP", "COATING", "LIQUID", "NECTAR"],
	ADJECTIVE: ["ZZZP", "GOLD", "GOLDEN", "STICKY"],
	SIZE: 3,
	CAPACITY: 2,
	VALUE: 50,
	NAME_TABLE: 0,
	ACTION: GOBLET_F
});


function GOBLET_F(_CONTEXT=null) {
    let _B=0, _X;
    if((isIN(BFLY, GOBLET)
  &&  isIS(BFLY, LIVING)
/*!(isIS(BFLY, MUNGED))*/)) {
        ++_B
    }
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    }
    if(isNOUN_USED("COATING", "LIQUID", "NECTAR")) {
        if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE)) {
            TELL("The coating on the inside of ", THEO
, " is thin and transparent.", CR);
            return true;
        } else if((isVERB(V_TOUCH)
  ||  (_X = isMOVING()))) {
            TELL("You succeed only in getting your fingers sticky, so you lick them clean"
, PTAB);
            TASTE_NECTAR();
            return true;
        } else if(isVERB(V_DRINK, V_TASTE)) {
            TASTE_NECTAR();
            return true;
        }
    }
    if(isVERB(V_EXAMINE)) {
        TELL("Despite a sticky coating on the inside, ", THEO
, " gleams with the lustre of pure gold");
        if(isT(_B)) {
            TELL(". There's ");
            TELL(A(BFLY));
            PRINT(" resting on the rim");
        }
        PRINT(PERIOD);
        return true;
    } else if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(!(ITAKE())) {
            ++IMPSAY
            return true;
        }
        TELL("The Implementor smiles kindly as you take ", THEO
, ". \"And now you will excuse us. My fellow Implementors and I must prepare for something too awesome to reveal to one as insignificant as you.\"", CR);
        ATRII_KICK();
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        if(isT(_B)) {
            REMOVE(BFLY);
        }
        TELL("Aside from a sticky coating, ");
        if(isSEE_ANYTHING_IN()) {
            TELL("you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
            TELL(SIN, THEO);
            if(isT(_B)) {
                TELL(". There's also ");
            }
        } else {
            TELL(THEO, " is empty");
            if(isT(_B)) {
                TELL(". But there's ");
            }
        }
        if(isT(_B)) {
            MOVE(BFLY, PRSO);
            TELL(A(BFLY));
            PRINT(" resting on the rim");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_TASTE, V_DRINK)) {
        TELL("[the sticky coating", BRACKET);
        TASTE_NECTAR();
        return true;
    } else if((isVERB(V_SAY, V_YELL)
  &&  isT(GOBLET_WORD)
  &&  isNOUN_USED(GOBLET_WORD)
  &&  isSAY_GOBLET_WORD())) {
        return true;
    } else {
        return false;
    }
}

function TASTE_NECTAR() {
    TELL("Few indeed are those lucky enough to taste the nectar of the Implementors");
    if(!(isIS(GOBLET, MUNGED))) {
        MAKE(GOBLET, MUNGED);
        TELL(PERIOD);
        UPDATE_STAT(15, LUCK, true);
        return true;
    }
    PRINT(". Unfortunately, ");
    TELL("very little remains.", CR);
    return true;
}

var GOBLET_WORD/*WORD*/ = null;

function SETUP_GOBLET() {
    let _TBL;
    _TBL = PICK_ONE(MAGIC_WORDS);
    /*if(isT(_TBL[2])) {
        SAY_ERROR("MAGIC-WORDS");
        return false;
    }*/
    _TBL[2] = 1;
    GOBLET_WORD = _TBL[0];
    PUTP(GOBLET, "NAME-TABLE", _TBL[1]);
    GETPT(GOBLET, "SYNONYM")[0] = GOBLET_WORD;
    GETPT(GOBLET, "ADJECTIVE")[0] = GOBLET_WORD;
    MAKE(GOBLET, PROPER);
    MAKE(GOBLET, NAMED);
    MAKE(GOBLET, IDENTIFIED);
    WINDOW(SHOWING_ALL);
    return false;
}

function isSAY_GOBLET_WORD() {
    if((isHERE(APLANE)
  &&  isEQUAL(ABOVE, OPLAIN))) {
        TELL("\"Speak not that Name!\" growls an Implementor, polishing a thunderbolt.", CR);
        return true;
    } else if(isIS(GOBLET, NEUTRALIZED)) {
        return false;
    } else if((isHERE(IN_SPLENDOR, IN_FROON, IN_GARDEN, APLANE)
  ||  isIS(HERE, INDOORS))) {
        TELL(YOU_HEAR, "a distant rumble of thunder.", CR);
        return true;
    } else {
        KERBLAM();
        TELL("Lightning forks across the sky.", CR);
        return true;
    }
}

var IMPTAB = () => OBJECT({
	DESC: "table",
	FLAGS: [NODESC, SURFACE],
	SYNONYM: ["TABLE"],
	ADJECTIVE: ["LONG"],
	CAPACITY: 100,
	CONTFCN: IMPTAB_F,
	ACTION: IMPTAB_F
});

function IMPTAB_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if((_X = isTOUCHING())) {
                TELL(CTHE(IMPS), " growl at your approach.", CR);
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
            TELL("There's no room under ", THEI, PERIOD);
            return true;
        }
        return false;
    } else if((_X = isCLIMBING_ON())) {
        TELL("\"Stop that,\" growls an Implementor.", CR);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
        TELL("The Implementors' legs are there.", CR);
        return true;
    } else {
        return false;
    }
}

var ALTAR = () => OBJECT({
	LOC: IN_CHAPEL,
	DESC: "altar",
	FLAGS: [NODESC, SURFACE],
	CAPACITY: 25,
	SYNONYM: ["ALTAR", "TABLE"],
	CONTFCN: ALTAR_F,
	ACTION: ALTAR_F
});

function ALTAR_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(!(_OBJ)) {
                return false;
            } else if((isIN(CLERIC, IN_CHAPEL)
  &&  (_X = isTOUCHING()))) {
                MAKE(CLERIC, SEEN);
                TELL("\"Touch not the sacred "
, D(_OBJ), "!\" growls ", THE(CLERIC
), ", standing between you and "
, THE(ALTAR), PERIOD);
                CROWD_AGREES();
                return true;
            }
            return false;
        }
        return false;
    } else if((isIN(CLERIC, IN_CHAPEL)
  &&  (_X = isTOUCHING()))) {
        MAKE(CLERIC, SEEN);
        TELL("\"Approach not the sacred altar!\" growls "
, THE(CLERIC), PERIOD);
        CROWD_AGREES();
        return true;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
            TELL("There's no room there.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var RELIQUARY = () => OBJECT({
	LOC: ALTAR,
	DESC: "reliquary",
	FLAGS: [CONTAINER, OPENABLE, TAKEABLE],
	CAPACITY: 2,
	SIZE: 3,
	VALUE: 2,
	SYNONYM: ["RELIQUARY", "CLASP", "FOLDER"],
	ACTION: RELIQUARY_F
});

function RELIQUARY_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        LEATHER();
        TELL(B("FOLDER"));
        if(isIS(PRSO, OPENED)) {
            TELL(". Its metal clasp is open.", CR);
            return true;
        }
        TELL(", closed with a metal clasp.", CR);
        return true;
    } else {
        return false;
    }
}

function LEATHER() {
    TELL(CTHEO, " looks like a leather ");
    return false;
}

var OAK = () => OBJECT({
	LOC: IN_PASTURE,
	DESC: "oak tree",
	FLAGS: [VOWEL, CONTAINER, OPENED],
	CAPACITY: 10,
	SYNONYM: ["TREE", "TRUNK", "OAK", "ROOTS"],
	ADJECTIVE: ["OAK", "TREE", "BARREN"],
	DESCFCN: OAK_F,
	ACTION: OAK_F
});

function OAK_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A barren ", OAK2, " looms over your path");
            LOOK_UNDER_OAK(OAK);
            return true;
        }
        return false;
    }
    return isHANDLE_OAKS();
}

var OAK2 = () => OBJECT({
	LOC: HILLTOP,
	DESC: "oak tree",
	FLAGS: [VOWEL, CONTAINER, OPENED],
	SYNONYM: ["OAK", "TREE", "ROOTS"],
	ADJECTIVE: ["OAK", "STUNTED"],
	DESCFCN: OAK2_F,
	ACTION: OAK2_F
});

function OAK2_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("A stunted ", OAK2, " shades the inland road");
            LOOK_UNDER_OAK(OAK2);
            return true;
        }
        return false;
    }
    return isHANDLE_OAKS();
}

var OAK3 = () => OBJECT({
	LOC: TWILIGHT,
	DESC: "oak tree",
	FLAGS: [NODESC, VOWEL, CONTAINER, OPENED],
	SYNONYM: ["OAK", "TREE", "ROOTS"],
	ADJECTIVE: ["OAK"],
	ACTION: isHANDLE_OAKS
});

function isHANDLE_OAKS() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_UNDER)) {
            PERFORM("DROP", PRSO);
            return true;
        } else if(isVERB(V_PUT_BEHIND)) {
            WINDOW(SHOWING_ALL);
            MOVE(PRSO, PRSI);
            TELL("You drop ", THEO, " behind ", THEI, PERIOD);
            return true;
        } else if((_X = isPUTTING())) {
            TELL(CTHEO, " tumbles out of ", THEI, AND);
            FALLS();
            return true;
        }
        return false;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE, V_REACH_IN, V_EMPTY)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Its gnarled roots cover ", THE(GROUND
), " at your feet");
        LOOK_UNDER_OAK(PRSO);
        CRLF();
        return true;
    } else if(isVERB(V_LOOK_BEHIND, V_LOOK, V_LOOK_UNDER, V_SEARCH, V_LOOK_INSIDE)) {
        if((_X = isFIRST(PRSO))) {
            PEERING_BEHIND();
            return true;
        }
        TELL(YOU_SEE, "nothing ", PICK_NEXT(YAWNS)
, " anywhere under ", THEO, PERIOD);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        CLIMB_A_TREE();
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        EXIT_A_TREE();
        return true;
    } else if(isVERB(V_STAND_UNDER)) {
        TELL(ALREADY, "under ", THEO, PERIOD);
        return true;
    } else if(isVERB(V_DIG_UNDER)) {
        TELL("You poke around under ", THEO);
        if(isIS(PRSO, TOUCHED)) {
            TELL(" a bit more");
            PRINT(", but turn up nothing of interest.|");
            return true;
        } else if(!(isPRSI(SPADE))) {
            TELL(", but ", THEI, " makes a poor digging tool amid the tangled roots.", CR);
            return true;
        } else if(LOC(TRUFFLE)) {
            TELL(WITH, THEI);
            PRINT(", but turn up nothing of interest.|");
            return true;
        }
        OAK_FIND(PRSO);
        TELL(", and soon turn up ", A(TRUFFLE), PERIOD);
        return true;
    } else {
        return false;
    }
}

function LOOK_UNDER_OAK(_OBJ) {
    P_IT_OBJECT = _OBJ;
    if((_OBJ = isFIRST(_OBJ))) {
        PRINT(". There seems to be something ");
        TELL("behind it");
    }
    TELL(C("."));
    return false;
}

function EXIT_A_TREE() {
    TELL("You're not in the tree.", CR);
    return false;
}

function CLIMB_A_TREE() {
    if(isHERE(IN_PASTURE)) {
        TELL("The windswept oak");
        PRINT(" offers no good footholds.|");
        return false;
    }
    TELL("You clamber onto a convenient branch, but an ominous creak sends you scurrying back down.", CR);
    return false;
}

function OAK_FIND(_OBJ) {
    MAKE(_OBJ, TOUCHED);
    MOVE(TRUFFLE, LOC(_OBJ));
    UNMAKE(TRUFFLE, MUNGED);
    TRUFFLE_TIMER = INIT_TRUFFLE;
    QUEUE(I_TRUFFLE);
    WINDOW(SHOWING_ROOM);
    P_IT_OBJECT = TRUFFLE;
    UNMAKE(MINX, SEEN);
    return false;
}

var TRUFFLE = () => OBJECT({
	DESC: "chocolate truffle",
	FLAGS: [TAKEABLE],
	SYNONYM: ["TRUFFLE", "CANDY", "CHOCOLATE"],
	ADJECTIVE: ["CHOCOLATE", "BROWN", "GRAY", "GREY"],
	SIZE: 1,
	VALUE: 5,
	ACTION: TRUFFLE_F
});

function TRUFFLE_F() {
    let _FRESH=0, _X, _WRD;
    if((isIS(TRUFFLE, MUNGED)
  ||  TRUFFLE_TIMER > 40)) {
        ++_FRESH
    }
    _WRD = "GRAY";
    if(isSEE_COLOR()) {
        _WRD = "BROWN";
        if(isADJ_USED("GRAY", "GREY")) {
            TELL(CTHE(TRUFFLE), " is brown, not gray.", CR);
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, SIS);
        if(isT(_FRESH)) {
            
        } else if(TRUFFLE_TIMER < 11) {
            TELL("almost too runny to be edible.", CR);
            return true;
        } else if(TRUFFLE_TIMER < 31) {
            TELL("getting a bit runny. Still edible, though.", CR);
            return true;
        }
        TELL("dark ", B(_WRD), " in color, ");
        if(isT(_FRESH)) {
            TELL("and looks fresh from the harvest.", CR);
            return true;
        }
        TELL("with only a trace of runniness.", CR);
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        VANISH();
        TELL("Gulp! Sure was yummy");
        if(isT(_FRESH)) {
            TELL(". Fresh-tasting, too");
        }
        TELL(PERIOD);
        if((isIS(MINX, LIVING)
  &&  isVISIBLE(MINX))) {
            MAKE(MINX, SEEN);
            TELL(TAB, CTHE(MINX
), " mews with disappointment.", CR);
            UPDATE_STAT(-1, COMPASSION, true);
        }
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("Mmm! Smells ");
        if(isT(_FRESH)) {
            TELL("delightfully fresh and ");
        }
        TELL("yummy.", CR);
        return true;
    } else if(isVERB(V_WHAT, V_WHERE, V_FIND)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

var CASTLE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "castle",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["CASTLE", "PALACE", "TOWER", "TOWERS"],
	ACTION: CASTLE_F
});

function CASTLE_F() {
    let _X;
    if(isHERE(IN_GARDEN)) {
        return HERE_F();
    } else if(isVERB(V_EXAMINE, V_LOOK_BEHIND)) {
        TELL("The distant ", PRSO
, " is shrouded in mountain mist.", CR);
        return true;
    } else if((isVERB(V_LOOK_INSIDE, V_SEARCH)
  ||  (_X = isTOUCHING())
  ||  (_X = isENTERING()))) {
        TELL(CTHEO, " is quite inaccessible from here.", CR);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var GARDEN = () => OBJECT({
	LOC: IN_GARDEN,
	DESC: "garden",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["GARDEN"],
	ADJECTIVE: ["PRIVATE"],
	ACTION: HERE_F
});

var BUSH = () => OBJECT({
	LOC: IN_GARDEN,
	DESC: "morgia bush",
	FLAGS: [VEHICLE, CONTAINER, OPENED],
	SYNONYM: ["BUSH", "BUSHES", "THORN", "THORNS", "ROOTS", "ROOT"],
	ADJECTIVE: ["MORGIA"],
	CAPACITY: 200,
	GENERIC: GENERIC_MORGIA_F,
	ACTION: BUSH_F
});

function BUSH_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_BEG)) {
            _OBJ = PRSO;
            if(isTHIS_PRSI()) {
                _OBJ = PRSI;
            }
            if(isCANT_REACH_WHILE_IN(_OBJ, BUSH)) {
                return RFATAL();
            } else if((isIN(QUEEN, IN_GARDEN)
  &&  (_X = isTALKING()))) {
                APPROACH_QUEEN("at the sound of your voice");
                return RFATAL();
            }
            return false;
        } else if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("The air is filled with the fragrance of a nearby ", BUSH, C("."));
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_UNDER, V_PUT_BEHIND)) {
            if(isIN(PLAYER, PRSI)) {
                PERFORM("DROP", PRSO);
                return true;
            } else if(isPRSO(ROOT)) {
                PRSO_SLIDES_OFF_PRSI();
                return true;
            }
            MOVE(PRSO, PRSI);
            WINDOW(SHOWING_ALL);
            TELL(CTHEO, " disappears behind ", THEI, PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        if(isIN(PLAYER, PRSO)) {
            V_LOOK();
            return true;
        }
        TELL("The thorny ", PRSO
, " has thrust its roots deep into the soil beside the castle wall.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_LOOK_BEHIND, V_LOOK_UNDER, V_SEARCH)) {
        if(!(isIN(PLAYER, PRSO))) {
            PEERING_BEHIND();
            return true;
        }
        ASIDE_FROM();
        CONTENTS();
        P_IT_OBJECT = PRSO;
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_ENTER, V_WALK_TO, V_THROUGH, V_WALK_AROUND, V_STAND_UNDER)) {
        ENTER_BUSH();
        return true;
    } else if((_X = isCLIMBING_ON())) {
        TELL("Ouch! ");
        NO_FOOTHOLDS();
        return true;
    } else if(isVERB(V_TAKE, V_PICK, V_UPROOT, V_LOOSEN, V_PULL, V_RAISE, V_TOUCH, V_SQUEEZE)) {
        if(isVERB(V_TOUCH, V_SQUEEZE)) {
            
        } else if((isIS(ROOT, NODESC)
  &&  isIN(ROOT, PRSO))) {
            PICK_ROOT();
            return true;
        }
        TELL("You prick your finger on a thorn. Ouch!", CR);
        UPDATE_STAT(-2);
        return true;
    } else if((_X = isEXITING())) {
        EXIT_BUSH();
        return true;
    } else {
        return false;
    }
}

function NO_FOOTHOLDS() {
    TELL(CTHEO, " has no good footholds.", CR);
    return true;
}

function ENTER_BUSH() {
    if(isIN(PLAYER, BUSH)) {
        TELL("Ouch! ", CANT, "go in any farther.", CR);
        return false;
    }
    DO_THORNS(BUSH);
    return false;
}

function DO_THORNS(_DEST) {
    OLD_HERE = null;
    P_WALK_DIR = null;
    WINDOW(SHOWING_ROOM);
    TELL("Ouch! ");
    PRINT("You push your way ");
    if(isIN(PLAYER, BUSH)) {
        TELL("out of");
    } else {
        TELL(B("BEHIND"));
    }
    TELL(" the thorns.", CR);
    MOVE(PLAYER, _DEST);
    if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_INV, SHOWING_STATS))) {
        RELOOK(true);
    }
    return true;
}

function EXIT_BUSH() {
    if(!(isIN(PLAYER, BUSH))) {
        TELL("You're not behind ", THE(BUSH), PERIOD);
        return false;
    }
    DO_THORNS(IN_GARDEN);
    if(isIN(QUEEN, IN_GARDEN)) {
        TELL(TAB);
        QUEEN_SEES_YOU();
    }
    return false;
}

var ROOT = () => OBJECT({
	LOC: BUSH,
	DESC: "morgia root",
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ROOT"],
	ADJECTIVE: ["MORGIA"],
	SIZE: 1,
	VALUE: 2,
	GENERIC: GENERIC_MORGIA_F,
	ACTION: ROOT_F
});

function ROOT_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_TAKE, V_PICK, V_UPROOT, V_PULL, V_LOOSEN, V_RAISE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        PICK_ROOT();
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        }
        TELL("You gnaw thoughtfully on ", THEO, ", ");
        if(isIS(PRSO, NEUTRALIZED)) {
            
        } else if(!(isIS(PRSO, SEEN))) {
            MAKE(PRSO, SEEN);
            TELL("and newfound vitality bubbles in your veins.", CR);
            PUTP(PRSO, "VALUE", 0);
            _X = (STATS[STRENGTH] / 3);
            if(_X < 1) {
                _X = 1;
            }
            UPDATE_STAT(_X, STRENGTH, true);
            return true;
        }
        TELL("but its virtue appears to be ");
        if(isIS(PRSO, SEEN)) {
            TELL("spent.", CR);
            return true;
        }
        TELL("neutralized.", CR);
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM)) {
        IMPOSSIBLE();
        return true;
    } else if(isVERB(V_PLANT)) {
        DO_PLANT();
        return true;
    } else {
        return false;
    }
}

function GENERIC_MORGIA_F(_TBL, _LEN=_TBL[0]) {
    return ROOT;
}

function PICK_ROOT() {
    if(!(isEQUAL(PRSI, null, HANDS))) {
        PRSI_FUMBLE(BUSH);
        return true;
    }
    WINDOW(SHOWING_INV);
    P_IT_OBJECT = ROOT;
    MOVE(ROOT, PLAYER);
    UNMAKE(ROOT, NODESC);
    MAKE(ROOT, TOUCHED);
    TELL("Reaching carefully to avoid the thorns, you yank a loose root out from under ", THE(BUSH), PERIOD);
    return true;
}

var BROG = () => OBJECT({
	LOC: IN_GARDEN,
	DESC: "statue",
	FLAGS: [NODESC, TRYTAKE, NOALL],
	CAPACITY: 2,
	SYNONYM: ["STATUE", "BROGMOID", "ERNIE", "ZZZP"],
	ADJECTIVE: ["BROGMOID", "ZZZP"],
	CONTFCN: BROG_F,
	ACTION: BROG_F
});

VOC("COMPARTMENT", NOUN);

function BROG_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isIS(BROG, OPENED)) {
                
            } else if((isT(PRSO)
  ||  isT(PRSI))) {
                TELL(CANT, "see that here.", CR);
                return RFATAL();
            }
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isIS(PRSO, CONTAINER)) {
            return false;
        } else if(isVERB(V_PUT, V_EMPTY_INTO)) {
            NO_BROG_OPENINGS();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_SEARCH)) {
        TELL(CTHEO
, " is a full head taller than you, but not as ugly");
        if(isIS(PRSO, OPENED)) {
            TELL(". Its secret compartment is still open");
        } else if(isIS(PRSO, CONTAINER)) {
            TELL(". Looking closely, you can trace the outlines of a secret compartment");
        }
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_WALK_AROUND, V_LOOK_BEHIND)) {
        TELL("You circle ", THEO, ", but find no");
        if(isEQUAL(P_PRSA_WORD, "HIDE")) {
            TELL(" good places to hide.", CR);
            return true;
        }
        TELL("thing ", PICK_NEXT(YAWNS), PERIOD);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        TELL(CTHEO);
        PRINT(" offers no good footholds.|");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_ON();
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_OPEN, V_OPEN_WITH, V_CLOSE, V_EMPTY)) {
        NO_BROG_OPENINGS();
        return true;
    } else {
        return false;
    }
}

function NO_BROG_OPENINGS() {
    TELL(CTHE(BROG), " has no obvious openings.", CR);
    return true;
}

var RUG = () => OBJECT({
	LOC: IN_PUB,
	DESC: "bearskin rug",
	FLAGS: [TAKEABLE, SURFACE, VEHICLE],
	SYNONYM: ["RUG", "CARPET", "BEARSKIN", "SKIN"],
	ADJECTIVE: ["BEARSKIN", "BEAR", "SKIN"],
	SIZE: 15,
	CAPACITY: 15,
	VALUE: 2,
	DESCFCN: RUG_F,
	ACTION: RUG_F
});

function RUG_F(_CONTEXT=null) {
    let _X, _L;
    _L = LOC(RUG);
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(RUG));
        PRINT(" is lying across ");
        TELL(LTHE);
        GROUND_WORD();
        if(isSEE_ANYTHING_IN(RUG)) {
            PRINT(". On it you see ");
            CONTENTS(RUG);
            P_IT_OBJECT = PRSO;
        }
        TELL(C("."));
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_TOUCH_TO)) {
            TOUCH_RUG_WITH(PRSO);
            return true;
        } else if(isVERB(V_PUT)) {
            PERFORM("PUT-ON", PRSO, PRSI);
            return true;
        } else if(isVERB(V_PUT_UNDER, V_PUT_BEHIND)) {
            if(isPRSI(PRSO)) {
                IMPOSSIBLE();
                return true;
            } else if(isGOT_RUG()) {
                return true;
            }
            STASH(UNDERUG);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO);
        if(isIN(PLAYER, PRSO)) {
            TELL(" on which you stand");
        }
        TELL(" is dreadfully old and ratty");
        if(isSEE_ANYTHING_IN()) {
            PRINT(". On it you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_SEARCH, V_LOOK_INSIDE, V_LOOK_ON)) {
        if(isIN(PLAYER, PRSO)) {
            ASIDE_FROM();
        } else {
            TELL(YOU_SEE);
        }
        CONTENTS();
        TELL(SON, THEO);
        if((isVERB(V_SEARCH)
  &&  (_X = isFIRST(UNDERUG)))) {
            TELL(". ");
            if(isIN(PLAYER, PRSO)) {
                FEEL_UNDER_RUG();
                return true;
            }
            TELL("Peering underneath, you find ");
            CONTENTS(UNDERUG);
        }
        P_IT_OBJECT = PRSO;
        TELL(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND)) {
        TELL(YOU_SEE);
        CONTENTS(UNDERUG);
        P_IT_OBJECT = PRSO;
        TELL(" under ", THE(UNDERUG), PERIOD);
        return true;
    } else if(isVERB(V_WEAR, V_STAND_UNDER, V_ENTER, V_THROUGH, V_SMELL)) {
        if(isEQUAL(P_PRSA_WORD, "LAY")) {
            LIE_ON_RUG();
            return true;
        } else if(!(isEQUAL(_L, PLAYER, LOC(PLAYER)))) {
            TAKE_FIRST(PRSO, _L);
            return true;
        } else if(!(isVERB(V_SMELL))) {
            TELL("You duck under ");
            PRINT("the rug for a moment, but the smell quickly drives you ");
            TELL("out. ");
        }
        TELL("Phew!", CR);
        return true;
    } else if(isVERB(V_TAKE)) {
        if(ITAKE()) {
            MOVE_ALL(UNDERUG, _L);
            WINDOW(SHOWING_ALL);
            TELL("You lift ", THEO);
            OUT_OF_LOC(_L);
            TELL(PERIOD);
        }
        return true;
    } else if(isVERB(V_TOUCH)) {
        if(isEQUAL(P_PRSA_WORD, "RUB", "PET", "PAT")) {
            TOUCH_RUG_WITH(HANDS);
            return true;
        }
        FEEL_RUG();
        return true;
    } else if(isVERB(V_STAND_ON, V_CLIMB_ON, V_SIT, V_LIE_DOWN, V_RIDE)) {
        if(isIN(PLAYER, PRSO)) {
            TELL(ALREADY, "on it.", CR);
            return true;
        } else if(isGOT_RUG()) {
            return true;
        } else if(!(isEQUAL(_L, HERE))) {
            TAKE_FIRST(PRSO, _L);
            return true;
        } else if(isVERB(V_SIT, V_LIE_DOWN)) {
            LIE_ON_RUG();
            return true;
        }
        MOVE(PLAYER, RUG);
        WINDOW(SHOWING_ALL);
        P_WALK_DIR = null;
        TELL("You step onto ", THEO);
        RELOOK();
        return true;
    } else if(isVERB(V_EXIT, V_LEAVE, V_ESCAPE)) {
        if(!(isIN(PLAYER, PRSO))) {
            NOT_ON();
            return true;
        }
        MOVE(PLAYER, _L);
        WINDOW(SHOWING_ALL);
        P_WALK_DIR = null;
        TELL("You step off ", THEO);
        RELOOK();
        isDO_CHARGE();
        return RFATAL();
    } else if(isVERB(V_CROSS)) {
        TELL("You walk across ", THEO, PERIOD);
        isDO_CHARGE();
        return true;
    } else {
        return false;
    }
}

function LIE_ON_RUG() {
    TELL("You sprawl onto ");
    PRINT("the rug for a moment, but the smell quickly drives you ");
    TELL("off. Phew!", CR);
    return true;
}

function FEEL_RUG() {
    let _X;
    if((_X = isFIRST(UNDERUG))) {
        FEEL_UNDER_RUG();
        return true;
    }
    TELL("It feels soft and hairy.", CR);
    return true;
}

function FEEL_UNDER_RUG() {
    TELL("It feels as if there's something underneath.", CR);
    return true;
}

function TOUCH_RUG_WITH(_OBJ) {
    TELL("You rub ", THE(_OBJ), " against the rug");
    if(isEQUAL(_OBJ, HANDS, FEET)) {
        TELL(". ");
        FEEL_RUG();
    } else {
        TELL(PERIOD);
    }
    if(isIS(_OBJ, FERRIC)) {
        return false;
    }
    isDO_CHARGE();
    return true;
}

var STATIC/*NUMBER*/ = 0;

function isDO_CHARGE() {
    if(isHERE(ON_BRIDGE)) {
        return false;
    }
    TELL(TAB, "You feel ");
    if(!(STATIC)) {
        TELL("the hairs on the back of your neck stand on end");
    } else {
        TELL("your body hair tingle again");
    }
    TELL(PERIOD);
    if(++STATIC > STATS[ENDURANCE]) {
        TELL(TAB);
        ITALICIZE("Zap");
        TELL("! The built-up static potential in your body discharges in a deadly flash");
        JIGS_UP();
    } else if(isIN(DUST, HERE)) {
        TELL(TAB, CTHE(DUST), " crackle");
        if(!(isIS(DUST, PLURAL))) {
            TELL("s");
        }
        TELL(" uneasily.", CR);
    }
    return true;
}

function isGOT_RUG() {
    if((isIN(RUG, PLAYER)
  ||  isIN(LOC(RUG), PLAYER))) {
        YOUD_HAVE_TO("put down", RUG);
        return true;
    }
    return false;
}

var UNDERUG = () => OBJECT({
	LOC: RUG,
	DESC: "rug",
	FLAGS: [NODESC, TRYTAKE, NOALL, SURFACE],
	CONTFCN: UNDERUG_F
});

function UNDERUG_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isEQUAL(_CONTEXT, M_CONT)) {
        _OBJ = PRSO;
        if(isTHIS_PRSI()) {
            _OBJ = PRSI;
        }
        if(!(_OBJ)) {
            return false;
        } else if(isVERB(V_TAKE)) {
            return false;
        } else if((_X = isSEEING())) {
            TELL("That'd be easier if you took ");
        } else {
            PRINT("You'd have to get ");
        }
        TELL(THE(_OBJ), " out from under ", THE(UNDERUG), PERIOD);
        return true;
    } else {
        return false;
    }
}

var RING = () => OBJECT({
	DESC: "ring",
	SDESC: DESCRIBE_RING,
	FLAGS: [TAKEABLE, CLOTHING],
	SYNONYM: ["RING", "SHIELDING"],
	ADJECTIVE: ["SHIELDING"],
	SIZE: 0,
	VALUE: 50,
	ACTION: RING_F
});


function RING_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        O_WEARING();
        TELL(" is encircled with a pattern of curly lines resembling tongues of flame.", CR);
        return true;
    } else if((isVERB(V_WEAR)
  &&  !(isIS(PRSO, WORN)))) {
        if(isDONT_HAVE()) {
            return true;
        }
        MAKE(PRSO, WORN);
        WINDOW(SHOWING_INV);
        TELL("A chill passes through your body as you slip "
, THEO, " onto your finger.", CR);
        return true;
    } else if((isVERB(V_TAKE_OFF)
  &&  isIS(PRSO, WORN))) {
        if(isHOTFOOT()) {
            return true;
        }
        UNMAKE(PRSO, WORN);
        WINDOW(SHOWING_INV);
        TELL("You slip ", THEO, " off your finger.", CR);
        return true;
    } else {
        return false;
    }
}

var WOODS = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "forest",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["FOREST", "WOODS", "TREES", "TREE"],
	ACTION: HERE_F
});

var TRACKS = () => OBJECT({
	DESC: "footprints",
	FLAGS: [TRYTAKE, NOALL, SURFACE, PLURAL],
	SYNONYM: ["FOOTPRINTS", "PRINTS", "TRACKS", "TRACK", "TRAIL"],
	ADJECTIVE: ["FOOT"],
	DESCFCN: TRACKS_F,
	ACTION: TRACKS_F
});

function TRACKS_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL("Tiny ", TRACKS
, " are visible in the snow.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if((isVERB(V_TOUCH_TO)
  &&  isEQUAL(P_PRSA_WORD, "RUB"))) {
            RUBOUT_TRACKS(PRSO);
            return true;
        } else if(isVERB(V_PUT_ON, V_EMPTY_INTO)) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON, V_FOLLOW)) {
        TELL(CTHEO, " lead behind ", THE(OAK), PERIOD);
        return true;
    } else if(isVERB(V_CLEAN_OFF)) {
        if((isEQUAL(PRSI, null, GROUND, ROOMS)
  ||  isEQUAL(PRSI, SNOW))) {
            RUBOUT_TRACKS();
            return true;
        }
        TELL(CTHEO, " aren't on ", THEI, PERIOD);
        return true;
    } else if(isVERB(V_ERASE_WITH, V_HIDE, V_KICK, V_TAKE_OFF, V_MUNG, V_CLEAN)) {
        RUBOUT_TRACKS();
        return true;
    } else {
        return false;
    }
}

function RUBOUT_TRACKS(_OBJ) {
    REMOVE(TRACKS);
    P_THEM_OBJECT = NOT_HERE_OBJECT;
    WINDOW(SHOWING_ROOM);
    TELL("You obliterate all trace of ", THE(TRACKS));
    if(isT(_OBJ)) {
        TELL(WITH, THE(_OBJ));
    }
    TELL(PERIOD);
    UPDATE_STAT(15, COMPASSION, true);
    return true;
}

var GURTH = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "Gurth",
	FLAGS: [NODESC, NOARTICLE, PROPER, PLACE],
	SYNONYM: ["GURTH", "CITY"],
	ADJECTIVE: ["GURTH"],
	ACTION: GURTH_F
});

function GURTH_F() {
    let _X;
    if(isHERE(IN_GURTH, AT_MAGICK, IN_MAGICK)) {
        return HERE_F();
    } else if((_X = isENTERING())) {
        _X = "SW";
        if(isHERE(XROADS)) {
            _X = "NORTH";
        }
        DO_WALK(_X);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var CELLAR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "wine cellar",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["CELLAR", "BASEMENT"],
	ADJECTIVE: ["WINE"],
	ACTION: CELLAR_F
});

function CELLAR_F() {
    let _X;
    _X = CELLAR_ROOMS[0];
    if(((_X = isINTBL(HERE, REST(CELLAR_ROOMS, 1), _X, 1))
  ||  isHERE(BARRELTOP))) {
        return HERE_F();
    } else if(((_X = isENTERING())
  ||  isVERB(V_CLIMB_DOWN))) {
        if(isHERE(IN_KITCHEN)) {
            DO_WALK("DOWN");
            return true;
        }
        CANT_FROM_HERE();
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var SPADE = () => OBJECT({
	LOC: GHOUL,
	DESC: "spade",
	SDESC: DESCRIBE_SPADE,
	FLAGS: [TAKEABLE, WEAPON, NAMEABLE],
	SYNONYM: ["SPADE", "ZZZP", "SHOVEL"],
	SIZE: 6,
	EFFECT: 50,
	VALUE: 2,
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	ACTION: SPADE_F
});


function SPADE_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " is worn but serviceable.", CR);
        return true;
    } else {
        return false;
    }
}

var PHEEBOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "ruins",
	FLAGS: [NODESC, PLACE, PLURAL],
	SYNONYM: ["RUINS", "PHEEBOR", "CITY"],
	ACTION: HERE_F
});

var GLASS = () => OBJECT({
	LOC: MCASE,
	DESC: "hourglass",
	FLAGS: [VOWEL, TAKEABLE, CONTAINER],
	CAPACITY: 0,
	SIZE: 2,
	VALUE: 1000,
	SYNONYM: ["HOURGLASS", "GLASS", "SAND", "TIME"],
	ADJECTIVE: ["HOUR", "MINIATURE", "TINY"],
	ACTION: GLASS_F
});

var GLASS_BOT/*NUMBER*/ = FULL;
var GLASS_TOP/*NUMBER*/ = 0;

function GLASS_F() {
    let _X;
    if(isNOUN_USED("SAND")) {
        if(isVERB(V_SHAKE)) {
            
        } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
            TELL("The sand in ", THEO, SIS);
            if(isT(GLASS_TOP)) {
                TELL("falling in a steady trickle.", CR);
                return true;
            }
            TELL("exceptionally fine.", CR);
            return true;
        } else if(isTOUCHING()) {
            TELL(CANT, "reach the sand. ");
            ITS_SEALED(GLASS);
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO)) {
            ITS_SEALED(GLASS);
            return true;
        }
        return false;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_REACH_IN, V_CLOSE)) {
        ITS_SEALED(GLASS);
        return true;
    } else if(isVERB(V_SHAKE)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        }
        TELL("You give the ");
        if(isT(GLASS_TOP)) {
            TELL("trickling sand in the ");
        }
        TELL(GLASS, " a vigorous shake.", CR);
        if(!(GLASS_TOP)) {
            QUEUE(I_GLASS);
            ARCH_ON();
        }
        while(true) {
            _X = RANDOM((FULL - 1));
            if(isEQUAL(_X, GLASS_TOP)) {
                continue;
            }break;
        }
        GLASS_TOP = _X;
        GLASS_BOT = (0 - (_X - FULL));
        return true;
    } else if(isVERB(V_TURN, V_SPIN)) {
        if((isVERB(V_SPIN)
  ||  isEQUAL(PRSI, null, HANDS))) {
            if(!(isIN(PRSO, PLAYER))) {
                YOUD_HAVE_TO("be holding");
                return true;
            }
            TELL("You turn over ", THEO
, ", and watch as the sand ");
            if(!(GLASS_TOP)) {
                GLASS_TOP = FULL;
                GLASS_BOT = 0;
                QUEUE(I_GLASS);
                TELL("begins to fall in a slow, steady trickle.", CR);
                ARCH_ON();
                return true;
            }
            TELL("reverses ", INTDIR
, " and resumes its steady trickle.", CR);
            _X = GLASS_TOP;
            GLASS_TOP = GLASS_BOT;
            GLASS_BOT = _X;
            return true;
        }
        TELL(DONT, "need ", THEI, STO
, B(P_PRSA_WORD), C(SP), THEO, PERIOD);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        TELL("The miniature ", GLASS
, " is wrought of brass and crystal");
        if(isT(GLASS_TOP)) {
            TELL(". Fine, white sand is falling through it in a steady trickle.", CR);
            return true;
        }
        TELL(", and filled with fine, white sand.", CR);
        return true;
    } else if((isVERB(V_LAMP_OFF)
  &&  isEQUAL(P_PRSA_WORD, "STOP", "HALT"))) {
        if(!(GLASS_TOP)) {
            TELL("The sand in ", THEO
, " isn't trickling", AT_MOMENT);
            return true;
        }
        TELL("Patience. It'll stop eventually.", CR);
        return true;
    } else {
        return false;
    }
}

function ITS_SEALED(_OBJ) {
    TELL(CTHE(_OBJ), " is permanently sealed.", CR);
    return true;
}

var SCABBARD = () => OBJECT({
	LOC: WCASE,
	DESC: "silver scabbard",
	SDESC: DESCRIBE_SCABBARD,
	FLAGS: [TAKEABLE, CONTAINER, OPENED, CLOTHING, FERRIC],
	SYNONYM: ["SCABBARD", "SHEATH", "GRUESLAYER"],
	ADJECTIVE: ["SILVER"],
	SIZE: 4,
	CAPACITY: 4,
	VALUE: 80,
	ACTION: SCABBARD_F
});


function SCABBARD_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_EMPTY_INTO)) {
            TELL(CTHEO);
            if(isPRSO(SWORD)) {
                TELL(" seems oddly reluctant to enter ");
            } else if(GETP(PRSO, "SIZE") > 2) {
                TELL(" won't fit in ");
            } else {
                TELL(" would just fall through ");
            }
            TELL(THEI, PERIOD);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Only the mightiest blade could be worthy of such a sheath.", CR);
        return true;
    } else {
        return false;
    }
}

var RFOOT = () => OBJECT({
	LOC: MCASE,
	DESC: "rabbit's foot",
	FLAGS: [TAKEABLE],
	SYNONYM: ["FOOT"],
	ADJECTIVE: ["RABBIT\'S", "RABBIT"],
	SIZE: 2,
	VALUE: 5,
	DNUM: 3,
	ACTION: RFOOT_F
});

function RFOOT_F() {
    if(isTHIS_PRSI()) {
        if((isVERB(V_TOUCH_TO)
  &&  isPRSO(HANDS, ME))) {
            RUB_RFOOT();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Poor wittle bunny wabbit. Sniff.", CR);
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        TELL("Gross.", CR);
        return true;
    } else if((isVERB(V_TOUCH)
  &&  isEQUAL(P_PRSA_WORD, "RUB"))) {
        RUB_RFOOT();
        return true;
    } else {
        return false;
    }
}

function RUB_RFOOT() {
    TELL("You run a finger across ", THE(RFOOT), PERIOD);
    if((isIS(RFOOT, MUNGED)
  ||  isIS(RFOOT, NEUTRALIZED))) {
        return true;
    }
    MAKE(RFOOT, MUNGED);
    UPDATE_STAT(10, LUCK, true);
    return true;
}

var CLOVER = () => OBJECT({
	DESC: "four-leaf clover",
	FLAGS: [TAKEABLE],
	SYNONYM: ["CLOVER", "LEAVES"],
	ADJECTIVE: ["FOUR\-LEAF", "FOUR", "LEAF"],
	SIZE: 0,
	VALUE: 5,
	DNUM: 3,
	DESCFCN: CLOVER_F,
	ACTION: CLOVER_F
});

function CLOVER_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(CLOVER), " is growing at your feet.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Aside from its four leaves, the clover");
        PRINT(" seems ordinary enough.|");
        return true;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if((isVERB(V_COUNT)
  &&  isNOUN_USED("LEAVES"))) {
        TELL("One. Two. Three. Four. Satisfied?", CR);
        return true;
    } else {
        return false;
    }
}

var SHOE = () => OBJECT({
	LOC: IN_STABLE,
	DESC: "old horseshoe",
	FLAGS: [VOWEL, TAKEABLE, FERRIC],
	SYNONYM: ["SHOE", "HORSESHOE"],
	ADJECTIVE: ["HORSE"],
	SIZE: 3,
	VALUE: 2,
	DNUM: 3,
	DESCFCN: SHOE_F,
	ACTION: SHOE_F
});

function SHOE_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(SHOE));
            PRINT(" lies forgotten in ");
            TELL(THE(GCORNER), C("."));
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_WEAR)) {
        TELL("No.", CR);
        return true;
    } else {
        return false;
    }
}


var DIAMOND = () => OBJECT({
	DESC: "small diamond",
	FLAGS: [TAKEABLE],
	SDESC: DESCRIBE_DIAMOND,
	SYNONYM: ["SNOWFLAKE", "FLAKE", "SNOW"],
	ADJECTIVE: ["SMALL"],
	SIZE: 0,
	VALUE: 50,
	DESCFCN: DIAMOND_F,
	ACTION: DIAMOND_F
});

VOC("DIAMOND", NOUN);


function DIAMOND_F(_CONTEXT=null) {
    let _X, _TBL;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(DIAMOND), " glitters at your feet.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(ITAKE()) {
            TELL(CTHEO
, " feels unusually hard as you pick it up. Hard as a diamond, in fact.", CR);
            PUTP(PRSO, "DESCFCN", 0);
            PUTP(PRSO, "SDESC", 0);
            _TBL = GETPT(PRSO, "SYNONYM");
            _TBL[0] = "DIAMOND";
            _TBL[1] = "GEM";
            _TBL[2] = "STONE";
            WINDOW(SHOWING_ALL);
        }
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        if(!(isIS(PRSO, TOUCHED))) {
            TELL(CTHEO, " glitters invitingly.", CR);
            return true;
        }
        TELL("This remarkable gem is fashioned in the likeness of a snowflake.", CR);
        return true;
    } else {
        return false;
    }
}

var PARCHMENT = () => OBJECT({
	DESC: "bit of parchment",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, READABLE],
	SYNONYM: ["ZZZP", "ZZZP", "PARCHMENT", "PAPER", "BIT", "PIECE", "SCROLL", "SCROLLS", "WRITING", "WORDS"],
	ADJECTIVE: ["ZZZP", "ZZZP", "PARCHMENT"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: 0,
	EFFECT: 0,
	ACTION: HANDLE_SCROLL_F
});

var VELLUM = () => OBJECT({
	DESC: "vellum scroll",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, READABLE],
	SYNONYM: ["ZZZP", "ZZZP", "SCROLL", "SCROLLS", "WRITING", "WORDS"],
	ADJECTIVE: ["ZZZP", "ZZZP", "VELLUM"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: 0,
	EFFECT: 0,
	ACTION: HANDLE_SCROLL_F
});

var SMOOTH = () => OBJECT({
	DESC: "smooth scroll",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, READABLE],
	SYNONYM: ["ZZZP", "ZZZP", "SCROLL", "SCROLLS", "WRITING", "WORDS"],
	ADJECTIVE: ["ZZZP", "ZZZP", "SMOOTH"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: 0,
	EFFECT: 0,
	ACTION: HANDLE_SCROLL_F
});

var RUMPLE = () => OBJECT({
	DESC: "rumpled scroll",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, READABLE],
	SYNONYM: ["ZZZP", "ZZZP", "SCROLL", "SCROLLS", "WRITING", "WORDS"],
	ADJECTIVE: ["ZZZP", "ZZZP", "RUMPLED"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: 0,
	EFFECT: 0,
	ACTION: HANDLE_SCROLL_F
});

var GILT = () => OBJECT({
	DESC: "gilt-edged scroll",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE, READABLE],
	SYNONYM: ["ZZZP", "ZZZP", "GILT\-EDGE", "SCROLL", "SCROLLS", "WRITING", "WORDS"],
	ADJECTIVE: ["ZZZP", "ZZZP", "GILT\-EDGE", "GILT", "EDGED"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: 0,
	EFFECT: 0,
	ACTION: HANDLE_SCROLL_F
});

function HANDLE_SCROLL_F() {
    let _X, _WRD;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_EMPTY_INTO)) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    }
    _WRD = GETPT(PRSO, "SYNONYM")[1];
    if((isVERB(V_SAY, V_YELL)
  &&  !(isEQUAL(_WRD, "ZZZP"))
  &&  isNOUN_USED(_WRD))) {
        _X = APPLY(GETP(PRSO, "EFFECT"), PRSO);
        return true;
    } else if(isVERB(V_READ)) {
        READ_SCROLL();
        return true;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_RIP, V_SQUEEZE)) {
        VANISH();
        ITALICIZE("Poof");
        TELL("! ", CTHEO, " evaporates in a flash.", CR);
        return true;
    } else {
        return false;
    }
}

function GENERIC_PAPER_F(_TBL, _LEN=_TBL[0]) {
    //if((_TBL = isINTBL(P_IT_OBJECT, REST(_TBL, 2), _LEN))) {
    if(_TBL.slice(2, _LEN).includes(P_IT_OBJECT)) {
        return P_IT_OBJECT;
    }
    return false;
}

function READ_SCROLL() {
    let _SYNS, _TBL, _WRD, _STAT, _X;
    if(!(isIN(PRSO, PLAYER))) {
        TELL("The writing on ", THEO
, " is quite tiny. You'll have to pick it up to read it.", CR);
        return true;
    }
    _SYNS = GETPT(PRSO, "SYNONYM");
    _WRD = _SYNS[1];
    if(isEQUAL(_WRD, "ZZZP")) {
        _TBL = PICK_ONE(MAGIC_WORDS);
        /*if(isT(_TBL[2])) {
            SAY_ERROR("MAGIC-WORDS");
            return false;
        }*/
        _TBL[2] = 1;
        _WRD = _TBL[0];
        _SYNS[1] = _WRD;
        GETPT(PRSO, "ADJECTIVE")[1] = _WRD;
        PUTP(PRSO, "NAME-TABLE", _TBL[1]);
    }
    TELL("The meaning of ", THEO
, " is obscure. It seems to have something to do with "
, GETP(PRSO, "DNUM"), ". ");
    _X = GETP(PRSO, "READIQ");
    _STAT = STATS[INTELLIGENCE];
    if(!(_STAT < _X)) {
        PRINT("The word ");
        if(isEQUAL(HOST, APPLE_2E, APPLE_2C, C128)) {
            TELL("\"");
        } else {
            HLIGHT(H_ITALIC);
        }
        PRINT_TABLE(GETP(PRSO, "NAME-TABLE"));
        if(isEQUAL(HOST, APPLE_2E, APPLE_2C, C128)) {
            TELL("\"");
        }
        HLIGHT(H_NORMAL);
        TELL(SIS);
    } else if(!(VT220)) {
        TELL("Strange, flowing runes are ");
    } else {
        TELL("The runes ");
        RUNE(_WRD);
        TELL(" are ");
    }
    TELL("inscribed across the top");
    if(_STAT < _X) {
        TELL("; you could probably understand them if you'd studied harder at school");
    }
    PRINT(PERIOD);
    return true;
}

function RUNE(_WRD) {
    let _PTR, _LEN, _CHAR, _X;
    DIROUT(D_TABLE_ON, AUX_TABLE);
    PRINTB(_WRD);
    DIROUT(D_TABLE_OFF);
    _LEN = (AUX_TABLE[0] + 1);
    _PTR = 2;
    while(true) {
        _X = FONT(F_NEWFONT);
        _CHAR = AUX_TABLE[_PTR];
        if((_CHAR < '\a'.charCodeAt(0)
  ||  _CHAR > '\z'.charCodeAt(0))) {
            _X = FONT(F_DEFAULT);
        }
        PRINTC(_CHAR);
        if(++_PTR > _LEN) {
            break;
        }
    }
    _X = FONT(F_DEFAULT);
    return false;
}


function DO_PARTAY(_OBJ=PRSO) {
    if(isFINE_PRINT(_OBJ)) {
        return true;
    }
    VANISH(_OBJ);
    ITALICIZE("Poof");
    TELL("! ", CTHE(_OBJ));
    PRINT(" disappears in a spectral flash");
    TELL(". At the same moment, a housewife in a suburb of Mareilon watches in astonishment as her lawn furniture silently rearranges itself.", CR);
    return true;
}


function DO_BLESS_WEAPON(_SCR=PRSO) {
    let _CNT=0, _OBJ, _WOBJ, _X;
    if(isFINE_PRINT(_SCR)) {
        return true;
    }
    VANISH(_SCR);
    ITALICIZE("Poof");
    TELL("! ", CTHE(_SCR));
    PRINT(" disappears in a spectral flash");
    if((_OBJ = isFIRST(PLAYER))) {
        while(true) {
            if((isIS(_OBJ, WEAPON)
  &&  isIS(_OBJ, WIELDED))) {
                _X = GETP(_OBJ, "EFFECT");
                if(isT(_X)) {
                    ++_CNT
                    _WOBJ = _OBJ;
                    PUTP(_OBJ, "EFFECT"
, (_X + (_X / 2)));
                    _X = GETP(_OBJ, "VALUE");
                    PUTP(_OBJ, "VALUE"
, (_X + (_X / 3)));
                }
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    if(isT(_CNT)) {
        TELL(COMMA_AND);
        if(isEQUAL(_CNT, 1)) {
            SAY_YOUR(_WOBJ);
            TELL(" flickers");
        } else {
            TELL("your weapons flicker");
        }
        TELL(" with newfound power");
    }
    TELL(PERIOD);
    return true;
}


function DO_BLESS_ARMOR(_SCR=PRSO) {
    let _CNT=0, _NAC=0, _OBJ, _WOBJ, _X;
    if(isFINE_PRINT(_SCR)) {
        return true;
    }
    VANISH(_SCR);
    ITALICIZE("Poof");
    TELL("! ", CTHE(_SCR));
    PRINT(" disappears in a spectral flash");
    if((_OBJ = isFIRST(PLAYER))) {
        while(true) {
            if(isIS(_OBJ, WORN)) {
                _X = GETP(_OBJ, "EFFECT");
                if(isT(_X)) {
                    ++_CNT
                    _WOBJ = _OBJ;
                    _X = (_X + (_X / 2));
                    if(_X > STATMAX) {
                        _X = STATMAX;
                    }
                    _NAC = (_NAC + _X);
                    PUTP(_OBJ, "EFFECT", _X);
                    _X = GETP(_OBJ, "VALUE");
                    PUTP(_OBJ, "VALUE"
, (_X + (_X / 3)));
                }
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    if(isT(_CNT)) {
        TELL(COMMA_AND);
        if(isEQUAL(_CNT, 1)) {
            SAY_YOUR(_WOBJ);
        } else {
            TELL("your armor");
        }
        TELL(" flickers with newfound ruggedness");
    }
    TELL(PERIOD);
    if(isT(_NAC)) {
        UPDATE_STAT((_NAC - STATS[AC]), AC);
    }
    return true;
}


function DO_FILFRE(_OBJ=PRSO) {
    if(isFINE_PRINT(_OBJ)) {
        return true;
    }
    VANISH(_OBJ);
    V_$CREDITS();
    TELL(CR, "The fireworks fade around you.", CR);
    return true;
}


function DO_GOTO(_OBJ=PRSO) {
    if(isFINE_PRINT(_OBJ)) {
        return true;
    }
    VANISH(_OBJ);
    KERBLAM();
    TELL("A searing flash consumes ", THE(_OBJ
), " in an instant, burning its runes upon your retina. Vision soon returns; but ", THE(GWORD), " continue to swim before your eyes");
    if(isHERE(ON_BRIDGE, IN_SKY, OVER_JUNGLE)) {
        TELL(" until a puff of wind disperses them.", CR);
        return true;
    }
    PRINT(PERIOD);
    MOVE(GWORD, HERE);
    P_THEM_OBJECT = GWORD;
    P_IT_OBJECT = GWORD;
    TELEWORD = GETPT(_OBJ, "SYNONYM")[1];
    GETPT(GWORD, "SYNONYM")[0] = TELEWORD;
    GETPT(GWORD, "ADJECTIVE")[0] = TELEWORD;
    PUTP(GWORD, "NAME-TABLE", GETP(_OBJ, "NAME-TABLE"));
    PUTP(GWORD, "READIQ", GETP(_OBJ, "READIQ"));
    return true;
}

var GWORD = () => OBJECT({
	DESC: "glowing runes",
	FLAGS: [TRYTAKE, NOALL, LIGHTED, PLURAL],
	SYNONYM: ["ZZZP", "WORD", "RUNE", "RUNES", "GLOW"],
	ADJECTIVE: ["ZZZP", "GLOWING"],
	READIQ: 0,
	NAME_TABLE: 0,
	DESCFCN: GWORD_F,
	ACTION: GWORD_F
});

var TELEWORD = null;

function GWORD_F(_CONTEXT=null) {
    let _DUMB=0, _TBL, _X;
    _TBL = GETP(GWORD, "NAME-TABLE");
    _X = GETP(GWORD, "READIQ");
    if(STATS[INTELLIGENCE] < _X) {
        ++_DUMB
    }
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        if(!(_DUMB)) {
            PRINT("The word \"");
            PRINT_TABLE(_TBL);
            TELL("\" hangs ");
        } else {
            TELL("Glowing runes hang ");
        }
        TELL("suspended in midair.");
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if((_X = isTOUCHING())) {
        TELL(CTHE(GWORD), " seem");
        PRINT(" to possess no physical substance.|");
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        TELL(XTHE);
        if((isT(_DUMB)
  &&  !(VT220))) {
            TELL("undecipherable ");
        }
        TELL("runes swim in your vision like the afterglow of a meteor");
        if((!(_DUMB)
  ||  isT(VT220))) {
            TELL(", forming the word ");
            if(!(_DUMB)) {
                HLIGHT(H_ITALIC);
                PRINT_TABLE(_TBL);
                HLIGHT(H_NORMAL);
            } else {
                RUNE(TELEWORD);
            }
        }
        PRINT(PERIOD);
        return true;
    } else if((isVERB(V_SAY, V_YELL)
  &&  isNOUN_USED(TELEWORD))) {
        SAY_TELEWORD();
        return true;
    } else if((_X = isCLIMBING_ON())) {
        TELL(CTHEO, " recede from your approach.", CR);
        return true;
    } else {
        return false;
    }
}

function SAY_TELEWORD() {
    let _L;
    _L = LOC(GWORD);
    if(isEQUAL(_L, LOC(PLAYER))) {
        TELL(CTHE(GWORD), " flare with Magick, and you ");
        PRINT("feel a moment of dizziness");
        PRINT(PERIOD);
        return true;
    }
    if((isGRUE_ROOM()
  ||  isIN(PLAYER, ARCH)
  ||  !(isEQUAL(ATIME, PRESENT))
  ||  isHERE(IN_FROON, IN_GARDEN, APLANE, IN_SPLENDOR)
  ||  isPLAIN_ROOM())) {
        TELL(CYOU);
        PRINT("feel a moment of dizziness");
        TELL(" as unseen forces struggle for control. ");
        INFLUENCE();
        return true;
    }
    WINDOW(SHOWING_ROOM);
    P_WALK_DIR = null;
    OLD_HERE = null;
    SAFE_VEHICLE_EXIT();
    GOTO(_L);
    return true;
}


function isFINE_PRINT(_OBJ=PRSO) {
    if(!(isVISIBLE(_OBJ))) {
        PRINT("A hollow voice says, \"Fool!\"");
        CRLF();
        return true;
    } else if(!(isIN(_OBJ, PLAYER))) {
        SPUTTERS(_OBJ);
        TELL("Perhaps you must hold it to wield its Magick.", CR);
        return true;
    } else if(isIS(_OBJ, NEUTRALIZED)) {
        SPUTTERS(_OBJ);
        TELL("Its virtue");
        PRINT(" appears to have been neutralized");
        PRINT(PERIOD);
        return true;
    } else if(isNO_MAGIC_HERE(_OBJ)) {
        return true;
    } else {
        return false;
    }
}

function isNEXT_SCROLL(_FCN, _RM) {
    let _OBJ;
    _OBJ = toOBJECT(PICK_ONE(SCROLL_LIST));
    if(isIS(_OBJ, NODESC)) {
        UNMAKE(_OBJ, NODESC);
        INIT_SCROLL(_OBJ);
        if(isASSIGNED(_FCN)) {
            PUTP(_OBJ, "DESCFCN", _FCN);
        }
        if(isASSIGNED(_RM)) {
            MOVE(_OBJ, _RM);
        }
        return _OBJ;
    } else {
        /*SAY_ERROR("NEXT-SCROLL?");*/
        return false;
    }
}

function INIT_SCROLL(_OBJ) {
    let _TBL, _X;
    _TBL = PICK_ONE(SCROLL_FUNCTIONS);
    PUTP(_OBJ, "EFFECT", _TBL[0]);
    PUTP(_OBJ, "SDESC", _TBL[1]);
    _X = _TBL[2];
    GETPT(_OBJ, "SYNONYM")[0] = _X;
    GETPT(_OBJ, "ADJECTIVE")[0] = _X;
    PUTP(_OBJ, "DNUM", _TBL[3]);
    PUTP(_OBJ, "VALUE", _TBL[4]);
    PUTP(_OBJ, "READIQ", _TBL[5]);
    return false;
}

var RENEWAL = () => OBJECT({
	LOC: AT_BOTTOM,
	DESC: "crinkly scroll",
	SDESC: DESCRIBE_RENEWAL,
	FLAGS: [TAKEABLE, READABLE, BUOYANT],
	SYNONYM: ["RENEWAL", "ZZZP", "SCROLL", "WRITING", "WORDS"],
	ADJECTIVE: ["RENEWAL", "ZZZP", "CRINKLY"],
	SIZE: 1,
	VALUE: 5,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 8,
	NAME_TABLE: 0,
	DNUM: "refreshment",
	EFFECT: DO_RENEWAL,
	DESCFCN: RENEWAL_DESC,
	ACTION: HANDLE_SCROLL_F
});


function DO_RENEWAL(_OBJ=PRSO) {
    let _STAT, _MAX, _OLD;
    if(isFINE_PRINT(_OBJ)) {
        return true;
    }
    VANISH(_OBJ);
    TELL("A refreshing pink aura envelops you ");
    if(isFIRST(PLAYER)) {
        TELL("and all your possessions ");
    }
    TELL("as you study ", THE(_OBJ
), ". Then the aura fades, and ", THE(_OBJ), " disappears.", CR);
    RENEW_ALL_IN(PLAYER);
    _STAT = ENDURANCE;
    while(true) {
        _MAX = MAXSTATS[_STAT];
        _OLD = STATS[_STAT];
        if(_MAX > _OLD) {
            UPDATE_STAT((_MAX - _OLD), _STAT);
        }
        if(++_STAT > LUCK) {
            break;
        }
    }
    BMODE_OFF();
    return true;
}

function RENEW_ALL_IN(_OBJ) {
    let _L;
    if(isIS(GURDY, OPENED)) {
        WINDOW(SHOWING_ALL);
    }
    _L = LOC(DAGGER);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(isIS(DAGGER, MUNGED)) {
            UNMAKE(DAGGER, MUNGED);
            PUTP(DAGGER, "EFFECT", 30);
            PUTP(DAGGER, "VALUE"
, (GETP(DAGGER, "VALUE") * 2));
            isREPLACE_ADJ(DAGGER, "RUSTED", "ZZZP");
            isREPLACE_ADJ(DAGGER, "RUSTY", "ZZZP");
        }
    }
    _L = LOC(TRUFFLE);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(isIS(TRUFFLE, MUNGED)) {
            UNMAKE(TRUFFLE, MUNGED);
            TRUFFLE_TIMER = INIT_TRUFFLE;
            QUEUE(I_TRUFFLE);
        } else if(TRUFFLE_TIMER > 1) {
            TRUFFLE_TIMER = (TRUFFLE_TIMER / 2);
        }
    }

    _L = LOC(LANTERN);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        LAMP_LIFE = MAX_LAMP_LIFE;
        UNMAKE(LANTERN, MUNGED);
        MAKE(LANTERN, MAPPED);
        isREPLACE_ADJ(LANTERN, "BROKEN", "ZZZP");
        isREPLACE_ADJ(LANTERN, "RUSTY", "ZZZP");
        isREPLACE_ADJ(LANTERN, "RUSTED", "ZZZP");
        if(!(isIS(LANTERN, OPENED))) {
            if(isVISIBLE(LANTERN)) {
                TELL(TAB, CTHE(LANTERN
), " begins to glow.", CR);
            }
            LIGHT_LANTERN();
        }
    }
    _L = LOC(GLASS);
    if(!(_L)) {
        
    } else if(!(GLASS_TOP)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        GLASS_TOP = FULL;
        GLASS_BOT = 0;
    }
    _L = LOC(BFLY);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(!(isIS(BFLY, LIVING))) {
            MAKE(BFLY, LIVING);
            if(isIS(BFLY, MUNGED)) {
                QUEUE(I_PILLAR);
            } else {
                QUEUE(I_BFLY);
            }
            UNMAKE(BFLY, SLEEPING);
            isREPLACE_ADJ(BFLY, "DEAD", "ZZZP");
        } else if(isIS(BFLY, MUNGED)) {
            DEQUEUE(I_PILLAR);
            QUEUE(I_BFLY);
            UNMAKE(BFLY, MUNGED);
            UNMAKE(BFLY, TAKEABLE);
            isREPLACE_SYN(BFLY, "CATERPILLAR", "BUTTERFLY");
            isREPLACE_SYN(BFLY, "ZZZP", "FLY");
            isREPLACE_ADJ(BFLY, "ZZZP", "BUTTER");
        }
    }
    _L = LOC(PARASOL);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(isIS(PARASOL, MUNGED)) {
            UNMAKE(PARASOL, MUNGED);
            isREPLACE_ADJ(PARASOL, "BROKEN", "CLOSED");
            MAKE(PARASOL, BUOYANT);
            PUTP(PARASOL, "VALUE", 2);
        }
    }
    return false;
}

function MUNG_ALL_IN(_OBJ) {
    let _L;
    if(isIS(GURDY, OPENED)) {
        WINDOW(SHOWING_ALL);
    }
    _L = LOC(DAGGER);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        MAKE(DAGGER, MUNGED);
        PUTP(DAGGER, "EFFECT", 25);
        PUTP(DAGGER, "VALUE"
, (GETP(DAGGER, "VALUE") / 2));
        isREPLACE_ADJ(DAGGER, "ZZZP", "RUSTY");
        isREPLACE_ADJ(DAGGER, "ZZZP", "RUSTED");
    }
    _L = LOC(TRUFFLE);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(!(isIS(TRUFFLE, MUNGED))) {
            TRUFFLE_TIMER = INIT_TRUFFLE;
        }
    }
    _L = LOC(GLASS);
    if(!(_L)) {
        
    } else if(!(GLASS_TOP)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        GLASS_TOP = 1;
        GLASS_BOT = (FULL - 1);
    }

    _L = LOC(LANTERN);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(!(LAMP_LIFE < 20)) {
            LAMP_LIFE = 20;
        }
        UNMAKE(LANTERN, MAPPED);
        isREPLACE_ADJ(LANTERN, "ZZZP", "RUSTY");
        isREPLACE_ADJ(LANTERN, "ZZZP", "RUSTED");
        if(!(isIS(LANTERN, OPENED))) {
            if(isVISIBLE(LANTERN)) {
                TELL(TAB, CTHE(LANTERN
), " goes out.", CR);
            }
            LANTERN_OUT();
        }
    }
    _L = LOC(BFLY);
    if(!(_L)) {
        
    } else if((isEQUAL(_L, _OBJ)
  ||  isIN(_L, _OBJ))) {
        if(!(isIS(BFLY, MUNGED))) {
            SETUP_PILLAR();
        }
    }
    return false;
}

function SETUP_PILLAR() {
    if(isIS(BFLY, LIVING)) {
        DEQUEUE(I_BFLY);
        QUEUE(I_PILLAR);
    }
    MAKE(BFLY, MUNGED);
    MAKE(BFLY, TAKEABLE);
    isREPLACE_SYN(BFLY, "BUTTERFLY", "CATERPILLAR");
    isREPLACE_SYN(BFLY, "FLY", "ZZZP");
    isREPLACE_ADJ(BFLY, "BUTTER", "ZZZP");
    return false;
}

var PALIMP = () => OBJECT({
	LOC: CHEST,
	DESC: "palimpsest",
	SDESC: DESCRIBE_PALIMP,
	FLAGS: [TAKEABLE, READABLE, BUOYANT],
	SYNONYM: ["GATING", "ZZZP", "PALIMPSEST", "SCROLL", "SCROLLS", "PAPER", "PIECE", "WRITING", "WORDS"],
	ADJECTIVE: ["GATING", "ZZZP", "GATE"],
	SIZE: 1,
	VALUE: 10,
	GENERIC: GENERIC_PAPER_F,
	READIQ: 16,
	NAME_TABLE: 0,
	DESCFCN: 0,
	DNUM: "transcendental physics",
	EFFECT: DO_GATE,
	ACTION: HANDLE_SCROLL_F
});


var PALIMP_CHARGES/*NUMBER*/ = 5;

function DO_GATE(_OBJ=PRSO) {
    let _X;
    if(!(PALIMP_CHARGES)) {
        TELL("Nothing happens. ", CTHE(_OBJ
), "'s virtue seems to be exhausted.", CR);
        return true;
    } else if(isHERE(APLANE)) {
        if(isEQUAL(ABOVE, OPLAIN)) {
            PERMISSION();
            return true;
        }
        _X = isDOWN_TO();
        if(!(_X)) {
            _X = HILLTOP;
        }
    } else if(isFINE_PRINT(_OBJ)) {
        return true;
    } else {
        _X = GETP(HERE, "FNUM");
        if(!(_X)) {
            _X = OCITY;
        }
        --PALIMP_CHARGES
    }
    PCLEAR();
    P_WALK_DIR = null;
    MAKE(PALIMP, USED);
    if(isT(AUTO)) {
        BMODE_OFF();
    }
    if(!(isIS(APLANE, TOUCHED))) {
        TELL("As you speak the Word on ", THE(_OBJ), ", the ");
        if(isIS(HERE, INDOORS)) {
            TELL("walls, floor and ", CEILING);
        } else {
            TELL("sky and ", B("LANDSCAPE"));
        }
        TELL(" begin to warp like a funhouse mirror", PTAB);
    }
    LOSE_FOCUS();
    if(!(isHERE(APLANE))) {
        if(isIN(SHAPE, APLANE)) {
            REMOVE(SHAPE);
        }
        if(isHELD(PHASE)) {
            SETUP_PHASE();
        }
        SAFE_VEHICLE_EXIT();
        SAME_COORDS = true;
        ABOVE = _X;
        GET_APLANE_THINGS();
        _X = APLANE;
    }
    GOTO(_X);
    return true;
}

function SAFE_VEHICLE_EXIT() {
    let _X;
    _X = LOC(PLAYER);
    if(!(isEQUAL(_X, HERE))) {
        if(isEQUAL(_X, POOL)) {
            SETUP_POND_EXITS();
        } else if(isEQUAL(_X, MAW)) {
            CLEAR_MAW_EXITS();
        }
        MAKE(GONDOLA, NODESC);
        UNMAKE(DACT, NODESC);
        MOVE(PLAYER, HERE);
    }
    _X = CELLAR_ROOMS[0];
    //if((_X = isINTBL(HERE, REST(CELLAR_ROOMS, 1), _X, 1))) {
    if(CELLAR_ROOMS.slice(1).map(toROOM).includes(HERE)) {
        UNMAKE(CELLAR_DOOR, LOCKED);
    }
    return false;
}

function LOSE_FOCUS() {
    TELL("Your eyes lose their focus momentarily.", CR);
    if(isT(VERBOSITY)) {
        CRLF();
    }
    if(isHERE(APLANE)) {
        if(isEQUAL(ABOVE, OPLAIN)) {
            EXIT_IMPS();
        }
        if(isHELD(PHASE)) {
            MUNG_PHASE();
        }
    }
    return false;
}

function ATRII_KICK() {
    DEQUEUE(I_IMPGIVE);
    IMPSAY = 0;
    P_WALK_DIR = null;
    UNMAKE(ON_PIKE, TOUCHED);
    TELL(TAB);
    LOSE_FOCUS();
    GOTO(ON_PIKE);
    if((isIN(GOBLET, ON_PIKE)
  &&  isIS(GOBLET, NODESC))) {
        UNMAKE(GOBLET, NODESC);
        P_IT_OBJECT = GOBLET;
        WINDOW(SHOWING_ROOM);
        TELL(TAB, CTHE(GOBLET), " clatters to the ground.", CR);
    }
    return true;
}

var TUSK = () => OBJECT({
	DESC: "ivory tusk",
	FLAGS: [TAKEABLE, VOWEL],
	SYNONYM: ["TUSK"],
	ADJECTIVE: ["IVORY"],
	SIZE: 10,
	VALUE: 40,
	DESCFCN: TUSK_F,
	ACTION: TUSK_F
});

function TUSK_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(TUSK
), " marks the final resting place of a mighty pachyderm.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Obviously valuable. The smooth, creamy curve is virtually flawless.", CR);
        return true;
    } else if(isVERB(V_TOUCH)) {
        TELL("You run your hand along the smooth curve.", CR);
        return true;
    } else {
        return false;
    }
}

var CARD = () => OBJECT({
	DESC: "bubble gum card",
	FLAGS: [TAKEABLE],
	SYNONYM: ["CARD"],
	ADJECTIVE: ["BUBBLE", "GUM"],
	SIZE: 1,
	VALUE: 30,
	ACTION: CARD_F
});

function CARD_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("This card, featuring Orkan of Thriff, is the rarest issue in the Famous Enchanter Series.", CR);
        return true;
    } else {
        return false;
    }
}

var RIDDLE = () => OBJECT({
	LOC: AT_LEDGE,
	DESC: "inscription",
	FLAGS: [VOWEL, TRYTAKE, NOALL, READABLE],
	SYNONYM: ["INSCRIPTION", "WRITING", "WORDS", "RIDDLE", "LIGHTNING", "CLIFF", "FACE"],
	DESCFCN: RIDDLE_F,
	ACTION: RIDDLE_F
});

function RIDDLE_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            PRINT("An inscription is carved upon the face of ");
            TELL("the cliff.");
            return true;
        }
        return false;
    } else if(isNOUN_USED("LIGHTNING")) {
        OPEN_CLIFF();
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        TELL("The carved ", PRSO, " reads,||");
        HLIGHT(H_MONO);
        TELL(`\"My tines be long,
 My tines be short,
 My tines end ere my first report.
 What am I?\"`, CR);
        HLIGHT(H_NORMAL);
        return true;
    } else {
        return false;
    }
}

function OPEN_CLIFF() {
    PCLEAR();
    REMOVE(RIDDLE);
    P_WALK_DIR = null;
    OLD_HERE = null;
    UNMAKE(CREVICE, NODESC);
    P_IT_OBJECT = CREVICE;
    isREPLACE_GLOBAL(AT_LEDGE, NULL, CREVICE);
    isNEW_EXIT(AT_LEDGE, "WEST", (CONNECT + 1 + MARKBIT), TOWER_BASE);
    isNEW_EXIT(TOWER_BASE, "EAST", (CONNECT + 1 + MARKBIT), AT_LEDGE);
    WINDOW(SHOWING_ROOM);
    KERBLAM();
    TELL("A blast from the sky sends you sprawling over the brink of the ledge! You grab onto a rocky outcrop and manage to drag ", ME, " back up to safety.", CR);
    if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_INV, SHOWING_STATS))) {
        RELOOK(true);
    }
    return true;
}

var CREVICE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "opening",
	FLAGS: [NODESC, VOWEL],
	SYNONYM: ["OPENING", "HOLE"],
	ACTION: CREVICE_F
});

function CREVICE_F() {
    let _X;
    if(isIS(CREVICE, NODESC)) {
        CANT_SEE_ANY();
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("It leads ");
        _X = "WEST";
        if(isHERE(TOWER_BASE)) {
            _X = "EAST";
        }
        TELL(B(_X), "ward.", CR);
        return true;
    } else if((_X = isENTERING())) {
        _X = "WEST";
        if(isHERE(TOWER_BASE)) {
            _X = "EAST";
        }
        DO_WALK(_X);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if(isVERB(V_CLOSE)) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var SWAMP = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "moor",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["MOOR", "MOORS", "SWAMP"],
	ACTION: HERE_F
});

var FOG = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "mist",
	FLAGS: [NODESC],
	SYNONYM: ["MIST", "FOG"],
	ACTION: FOG_F
});

function FOG_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_SEARCH)) {
        TELL("It's hard to see more than a few yards.", CR);
        return true;
    } else {
        return false;
    }
}

var PLATFORM = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "platform",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["PLATFORM"],
	ADJECTIVE: ["MAINTENANCE"],
	ACTION: PLATFORM_F
});

function PLATFORM_F() {
    let _X;
    if((_X = isCLIMBING_ON())) {
        if(isIN(PLAYER, GONDOLA)) {
            PERFORM("EXIT", GONDOLA);
            return true;
        }
        ALREADY_ON();
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        if(isIN(PLAYER, GONDOLA)) {
            NOT_ON();
            return true;
        } else if(isIN(GONDOLA, HERE)) {
            PERFORM("ENTER", GONDOLA);
            return true;
        }
        DO_WALK("DOWN");
        return true;
    } else {
        return false;
    }
}

var GGLYPH = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "glyph",
	FLAGS: [READABLE],
	SYNONYM: ["GLYPH", "GLYPHS", "WARDING", "MARK", "MARKS", "SYMBOL", "SYMBOLS"],
	ADJECTIVE: ["WARDING"],
	GENERIC: GENERIC_GLYPH_F,
	ACTION: GGLYPH_F
});

function GGLYPH_F() {
    let _X;
    if((isIS(DIARY, MUNGED)
  &&  isVISIBLE(DIARY))) {
        P_IT_OBJECT = DIARY;
        TELL("[the glyph in the diary", BRACKET);
        if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            DESCRIBE_GLYPH();
            return true;
        } else if((_X = isMOVING())) {
            IMPOSSIBLE();
            return true;
        }
        return DIARY_F();
    }
    PCLEAR();
    TELL("There aren't any visible here.", CR);
    return RFATAL();
}

var GLYPH = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "glyph",
	FLAGS: [READABLE, SURFACE],
	CAPACITY: 100,
	SYNONYM: ["GLYPH", "WARDING", "MARK", "SYMBOL"],
	ADJECTIVE: ["WARDING"],
	GENERIC: GENERIC_GLYPH_F,
	ACTION: GLYPH_F
});

function GENERIC_GLYPH_F(_TBL, _LEN=_TBL[0]) {
    if((_LEN = isINTBL(GLYPH, REST(_TBL, 2), _LEN))) {
        return GLYPH;
    } else {
        return GGLYPH;
    }
}

function GLYPH_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((isVERB(V_TOUCH_TO)
  &&  isEQUAL(P_PRSA_WORD, "RUB"))) {
            RUBOUT_GLYPH();
            return true;
        } else if((_X = isPUTTING())) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        TELL(CTHEO, SIS);
        SAY_GLYPH();
        return true;
    } else if(isVERB(V_CLEAN_OFF)) {
        if((isEQUAL(PRSI, null, GROUND, ROOMS)
  ||  isEQUAL(PRSI, SNOW, LAVA))) {
            RUBOUT_GLYPH();
            return true;
        }
        TELL(CTHEO, " isn't on ", THEI, PERIOD);
        return true;
    } else if(isVERB(V_ERASE_WITH, V_KICK, V_TAKE_OFF, V_MUNG, V_CLEAN)) {
        RUBOUT_GLYPH();
        return true;
    } else {
        return false;
    }
}

function SAY_GLYPH() {
    MAKE(GLYPH, SEEN);
    TELL("a surprisingly simple pattern of lines and curves. Even a ");
    ANNOUNCE_RANK();
    TELL(" like you could inscribe one just like it.", CR);
    return true;
}

function WRITE_GLYPH() {
    let _X;
    if(!(isIN(BURIN, PLAYER))) {
        TELL("The inscription of glyphs is a delicate business. You'll need a proper tool first");
        if(isIS(GLYPH, SEEN)) {
            PRINT(PERIOD);
            return true;
        }
        TELL(". Besides, you ");
        PRINT("haven't studied any glyphs well enough to inscribe one yourself.|");
        return true;
    } else if(isGLOBAL_IN(HERE, GLYPH)) {
        TELL("There's already ", A(GLYPH
), " written here.", CR);
        return true;
    } else if(!(isIS(GLYPH, SEEN))) {
        TELL(CYOU);
        PRINT("haven't studied any glyphs well enough to inscribe one yourself.|");
        return true;
    } else if((isGLOBAL_IN(HERE, NULL)
  &&  isGLOBAL_IN(HERE, SNOW, LAVA))) {
        _X = SNOW;
        if(isGLOBAL_IN(HERE, LAVA)) {
            if(!(MAGMA_TIMER)) {
                LAVA_TOO_HARD();
                return true;
            }
            _X = LAVA;
        }
        isREPLACE_GLOBAL(HERE, NULL, GLYPH);
        P_IT_OBJECT = GLYPH;
        WINDOW(SHOWING_ROOM);
        TELL("You carefully trace ", A(GLYPH), SIN, THE(_X), " with your burin");
        if(isGLOBAL_IN(HERE, XTREES)) {
            TELL(", and notice ", THE(XTREES), " fidgeting with rage");
        }
        PRINT(PERIOD);
        return true;
    }
    TELL(XTHE);
    GROUND_WORD();
    TELL(" here is too hard to write anything.", CR);
    return true;
}

function LAVA_TOO_HARD() {
    TELL(CTHE(LAVA), " underfoot is too hard now.", CR);
    return true;
}

function RUBOUT_GLYPH() {
    let _X;
    if((isGLOBAL_IN(HERE, LAVA)
  &&  !(MAGMA_TIMER))) {
        LAVA_TOO_HARD();
        return true;
    }
    isREPLACE_GLOBAL(HERE, GLYPH, NULL);
    WINDOW(SHOWING_ROOM);
    TELL("You rub out ", THE(GLYPH));
    if(isTHIS_PRSI()) {
        TELL(WITH, THEO);
    }
    PRINT(PERIOD);
    return true;
}

var SNOW = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "snow",
	FLAGS: [NODESC, SURFACE, TRYTAKE, NOALL],
	SYNONYM: ["SNOW", "SNOWFALL", "SNOWFLAKE", "POWDER"],
	ADJECTIVE: ["FROZEN", "POWDERY", "WHITE"],
	ACTION: SNOW_F
});

function SNOW_F() {
    let _X;
    if(isTHIS_PRSI()) {
        
    } else if(isVERB(V_LOOK_UNDER, V_DIG, V_DIG_UNDER, V_LOOK_INSIDE, V_SEARCH)) {
        TELL("You poke through ", THEO);
        BUT_FIND_NOTHING();
        return true;
    } else if(isVERB(V_TAKE, V_TOUCH)) {
        TELL("The powdery ", PRSO, " falls between your fingers.", CR);
        return true;
    } else if((_X = isMOVING())) {
        WASTE_OF_TIME();
        return true;
    }
    return GROUND_F();
}

var LAVA = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "lava",
	FLAGS: [NODESC, SURFACE, TRYTAKE, NOALL],
	CAPACITY: 1000,
	SYNONYM: ["LAVA", "MAGMA", "FLOW", "ROCK", "ZZZP"],
	ADJECTIVE: ["LAVA"],
	ACTION: LAVA_F
});

function LAVA_F() {
    let _X;
    if(isTHIS_PRSI()) {
        
    } else if((isVERB(V_LOOK_UNDER)
  ||  (_X = isMOVING()))) {
        TELL(XTHE);
        if(!(MAGMA_TIMER)) {
            TELL("hardened lava");
            PRINT(" cannot be moved.|");
            return true;
        }
        TELL("cooling lava slurps between your fingers.", CR);
        return true;
    }
    return GROUND_F();
}

var DOME = () => OBJECT({
	LOC: ON_PEAK,
	DESC: "iridescent dome",
	FLAGS: [VOWEL, NODESC, TRYTAKE, NOALL, CONTAINER, OPENED, SURFACE],
	SYNONYM: ["DOME", "[object Object]", "[object Object]", "VOLCANO", "FIELD"],
	ADJECTIVE: ["IRIDESCENT", "GIRGOL"],
	CAPACITY: 1000,
	CONTFCN: DOME_F,
	ACTION: DOME_F
});

function DOME_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
            if(isTHIS_PRSI()) {
                if((_X = isPUTTING())) {
                    DOMESLIDE();
                    return true;
                } else if((_X = isTOUCHING())) {
                    TOUCH_DOME_WITH(PRSO);
                    return true;
                }
                return false;
            } else if((_X = isTOUCHING())) {
                TOUCH_DOME_WITH();
                return true;
            }
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            DOMESLIDE();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("Your eyes cannot focus on ");
        PRINT("the iridescent surface of the dome");
        TELL(". But a fiery glow emanates from within.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_LOOK_BEHIND, V_LOOK_UNDER, V_SEARCH)) {
        TELL("Peering within ");
        PRINT("the iridescent surface of the dome");
        TELL(", you see a spectacular plume of molten lava, frozen in mid-explosion above a crater seething with molten magma.", CR);
        return true;
    } else if(isVERB(V_REACH_IN)) {
        TOUCH_DOME_WITH();
        return true;
    } else if(isVERB(V_KICK)) {
        TOUCH_DOME_WITH(FEET);
        return true;
    } else if(isVERB(V_TOUCH, V_SQUEEZE)) {
        TELL("The surface of ", THEO
, " feels hard and slightly warm.", CR);
        return true;
    } else {
        return false;
    }
}

function DOMESLIDE() {
    THIS_IS_IT(PRSO);
    MOVE(PRSO, HERE);
    WINDOW(SHOWING_ALL);
    TELL(CTHEO, " strikes the perimeter of ", THE(DOME
), " and slides to ", THE(GROUND), PERIOD);
    return true;
}

function TOUCH_DOME_WITH(_OBJ) {
    YOUR_OBJ(_OBJ);
    if(PROB(50)) {
        TELL(" will go no farther than ");
    } else {
        TELL(" stops at ");
    }
    TELL("the dome's perimeter.", CR);
    return true;
}

var PLUME = () => OBJECT({
	LOC: DOME,
	DESC: "lava",
	FLAGS: [NODESC, TRYTAKE, NOALL, SURFACE, CONTAINER, OPENED],
	SYNONYM: ["LAVA", "PLUME", "SPRAY", "MAGMA"],
	ADJECTIVE: ["LAVA", "MOLTEN"],
	CAPACITY: 1000,
	ACTION: PLUME_F
});

function PLUME_F() {
    let _X;
    if(isT(LAVA_TIMER)) {
        if(((_X = isTOUCHING())
  ||  (_X = isENTERING()))) {
            CASCADE("approach");
            return true;
        }
        CASCADE("gawk at");
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE)) {
        TELL(CTHEO, " seems frozen in a moment of time.", CR);
        return true;
    } else {
        return false;
    }
}

var CRATER = () => OBJECT({
	LOC: ON_PEAK,
	DESC: "crater",
	FLAGS: [NODESC, PLACE, CONTAINER, OPENED],
	SYNONYM: ["CRATER", "HOLE", "BRINK"],
	CAPACITY: 1000,
	ACTION: DOME_F
});

function CRATER_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            VANISH();
            TELL(CTHEO, " disappears into the steam.", CR);
            return true;
        }
        return false;
    } else if((_X = isSEEING())) {
        SAY_STEAM();
        return true;
    } else if((_X = isENTERING())) {
        TELL("Hot steam drives you away from ", THEO, PERIOD);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else {
        return false;
    }
}

var MAGMA_GLOW = () => OBJECT({
	DESC: "glow",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["GLOW", "LIGHT", "SKY"],
	ADJECTIVE: ["YELLOW", "DULL"],
	ACTION: MAGMA_GLOW_F
});

function MAGMA_GLOW_F(_CONTEXT=null) {
    let _X;
    if((_X = isENTERING())) {
        DO_WALK("SOUTH");
        return true;
    } else if((_X = isTOUCHING())) {
        CANT_FROM_HERE();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE)) {
        TELL(CTHE(MAGMA_GLOW), " feels warm on your face.", CR);
        return true;
    } else {
        return false;
    }
}

function GLOW_COLOR() {
    if(MAGMA_TIMER > 2) {
        TELL("fiery yellow ");
    } else if(isEQUAL(MAGMA_TIMER, 2)) {
        TELL("warm orange ");
    } else {
        TELL("dull red ");
    }
    return true;
}

var TRAIL = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "trail",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["TRAIL", "PATH"],
	ACTION: TRAIL_F
});

function TRAIL_F() {
    let _X;
    if((_X = isCLIMBING_ON())) {
        DO_WALK("UP");
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        DO_WALK("DOWN");
        return true;
    } else if(isGLOBAL_IN(HERE, SNOW)) {
        return SNOW_F();
    } else if(isGLOBAL_IN(HERE, LAVA)) {
        return LAVA_F();
    } else {
        return GROUND_F;
    }
}

var ORNAMENT = () => OBJECT({
	DESC: "silver ornament",
	FLAGS: [TAKEABLE],
	SYNONYM: ["ORNAMENT"],
	ADJECTIVE: ["SILVER"],
	SIZE: 1,
	VALUE: 2,
	ACTION: ORNAMENT_F
});

function ORNAMENT_F() {
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " is crafted in an old-fashioned holiday style. Might fetch a few zorkmids in Mizniaport.", CR);
        return true;
    } else {
        return false;
    }
}

var BOOT = () => OBJECT({
	LOC: IN_FROON,
	DESC: "enormous boot",
	FLAGS: [NODESC, VOWEL, TRYTAKE, NOALL],
	SYNONYM: ["BOOT"],
	ADJECTIVE: ["ENORMOUS", "GIANT", "LARGE"],
	ACTION: BOOT_F
});

function BOOT_FACING() {
    TELL(CTHE(BOOT), " is facing the wrong way.", CR);
    return true;
}

function BOOT_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            BOOT_FACING();
            return true;
        }
        return false;
    } else if((isVERB(V_LOOK_INSIDE, V_REACH_IN)
  ||  (_X = isENTERING()))) {
        BOOT_FACING();
        return true;
    } else if(isVERB(V_WEAR)) {
        TELL(DONT, "take a size 105.", CR);
        return true;
    } else if((_X = isMOVING())) {
        TELL(CTHEO, " is firmly wedged under ", THE(FARMHOUSE), PERIOD);
        return true;
    } else if(isVERB(V_EXAMINE, V_SEARCH)) {
        TELL(CTHEO);
        PRINT(" lies crushed beneath ");
        TELL(THE(FARMHOUSE), ", its tongue hanging in the dirt.", CR);
        return true;
    } else {
        return false;
    }
}

var BROOK = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "brook",
	FLAGS: [NODESC, CONTAINER, OPENED],
	SYNONYM: ["BROOK", "RIVER", "STREAM", "WATER"],
	ADJECTIVE: ["BABBLING"],
	ACTION: BROOK_F
});

function BROOK_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WATER_VANISH();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " meanders ");
        if(isHERE(AT_BRINE)) {
            TELL(B("NORTHWEST"), PERIOD);
            return true;
        }
        TELL("west, into a deep forest.", CR);
        return true;
    } else if((_X = isENTERING())) {
        DO_WALK("NORTH");
        return true;
    } else if(isHANDLE_WATER()) {
        return true;
    } else {
        return false;
    }
}

var WATERFALL = () => OBJECT({
	LOC: AT_FALLS,
	DESC: "waterfall",
	FLAGS: [NODESC, CONTAINER, OPENED],
	SYNONYM: ["WATERFALL", "FALLS", "WATER", "CASCADE"],
	ADJECTIVE: ["FALLING"],
	ACTION: WATERFALL_F
});

function WATERFALL_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isPUTTING()) {
            VANISH();
            TELL(CTHEO, " disappears in the swirling water.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_ENTER, V_WALK_AROUND, V_LOOK_BEHIND)) {
        TELL("Sorry. No secret caves.", CR);
        return true;
    } else if((_X = isENTERING())) {
        ENTER_FALLS();
        return true;
    } else if(isVERB(V_LISTEN)) {
        TELL("The roar is loud and exhilarating.", CR);
        return true;
    } else if(isHANDLE_WATER()) {
        return true;
    } else {
        return false;
    }
}

function ENTER_FALLS() {
    TELL("One touch of the chilly water changes your mind.", CR);
    return false;
}

function isHANDLE_WATER() {
    let _X;
    if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_LOOK_UNDER, V_SEARCH)) {
        PRINT("Little can be seen ");
        TELL("in the swirling water.", CR);
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if(isVERB(V_DRINK, V_DRINK_FROM, V_TASTE)) {
        TELL("The water is cool and refreshing.", CR);
        return true;
    } else if(isVERB(V_TOUCH, V_REACH_IN, V_KICK)) {
        TELL("Brr!", CR);
        return true;
    } else {
        return false;
    }
}

var RIVER = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "river",
	FLAGS: [NODESC, CONTAINER, OPENED],
	SYNONYM: ["RIVER", "STREAM", "WATER", "FORD"],
	ACTION: RIVER_F
});

function RIVER_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WATER_VANISH();
            return true;
        }
        return false;
    } else if((_X = isSEEING())) {
        TELL("Blowing mist obscures the roaring water.", CR);
        return true;
    } else if((isVERB(V_LEAP)
  ||  (_X = isENTERING()))) {
        JUMP_OFF_BRIDGE();
        return true;
    } else if((_X = isEXITING())) {
        NOT_IN();
        return true;
    } else if((_X = isTOUCHING())) {
        CANT_FROM_HERE();
        return true;
    } else {
        return false;
    }
}

var CABIN = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "log cabin",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["CABIN", "HOUSE", "BUILDING", "LABORATORY", "LAB", "LOGS"],
	ADJECTIVE: ["LOG"],
	ACTION: CABIN_F
});

function CABIN_F() {
    let _X;
    if(isHERE(IN_CABIN)) {
        if(isVERB(V_SEARCH)) {
            PERFORM(PRSA, CHEMS);
            return true;
        }
        return HERE_F();
    } else if((_X = isENTERING())) {
        DO_WALK("SOUTH");
        return true;
    } else {
        return false;
    }
}

var CABIN_DOOR = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "door",
	FLAGS: [NODESC, DOORLIKE, OPENABLE, OPENED],
	SYNONYM: ["DOOR", "DOORWAY"],
	ADJECTIVE: ["CABIN"]
});

var BENCH = () => OBJECT({
	LOC: IN_CABIN,
	DESC: "workbench",
	FLAGS: [NODESC, SURFACE, TRYTAKE, NOALL],
	SYNONYM: ["WORKBENCH", "BENCH", "TABLE"],
	CAPACITY: 20,
	ACTION: BENCH_F
});

function BENCH_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isCLIMBING_ON())) {
        TELL(CTHEO, " doesn't look as if it would support you.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        MAKE(CHEMS, NODESC);
        TELL("Aside from ", THE(CHEMS), LYOU_SEE);
        CONTENTS();
        TELL(SON, THEO, PERIOD);
        UNMAKE(CHEMS, NODESC);
        P_IT_OBJECT = PRSO;
        return true;
    } else if(isVERB(V_SEARCH)) {
        PERFORM(PRSA, CHEMS);
        return true;
    } else if((_X = isMOVING())) {
        TELL(CTHEO, " is much too bulky.", CR);
        return true;
    } else {
        return false;
    }
}

var CHEMS = () => OBJECT({
	LOC: BENCH,
	DESC: "chemicals",
	FLAGS: [TRYTAKE, NOALL, SURFACE, PLURAL],
	SYNONYM: ["CHEMICALS", "RETORTS", "ALEMBICS", "LIQUID", "LIQUIDS"],
	ACTION: CHEMS_F
});

function CHEMS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_UNDER, V_PUT_BEHIND, V_PUT)) {
            WASTE_OF_TIME();
            return true;
        } else if((_X = isPUTTING())) {
            PERFORM(PRSA, PRSO, BENCH);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " are fouled beyond recognition or usefulness");
        MAKE(PRSO, NODESC);
        if(isSEE_ANYTHING_IN(BENCH)) {
            TELL(". ", YOU_SEE);
            CONTENTS(BENCH);
            P_IT_OBJECT = PRSO;
            TELL(" lying among them");
        }
        UNMAKE(PRSO, NODESC);
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_SEARCH, V_LOOK_INSIDE, V_LOOK_UNDER, V_LOOK_BEHIND)) {
        TELL("You carefully sift through ", THEO);
        if(!(isIS(UHEMI, NODESC))) {
            PRINT(", but find nothing else of interest.|");
            return true;
        }
        FIND_UHEMI();
        TELL(", and turn up ", A(UHEMI), PERIOD);
        return true;
    } else if((_X = isTOUCHING())) {
        TELL(CTHEO, " are sticky and useless.", CR);
        return true;
    } else {
        return false;
    }
}

function FIND_UHEMI() {
    MAKE(DIARY, TOUCHED);
    UNMAKE(UHEMI, NODESC);
    MOVE(UHEMI, BENCH);
    P_IT_OBJECT = UHEMI;
    WINDOW(SHOWING_ALL);
    return true;
}

var UHEMI = () => OBJECT({
	DESC: "black hemisphere",
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["HEMISPHERE", "CRYSTAL", "CRYSTALS", "PEG"],
	ADJECTIVE: ["BLACK"],
	SIZE: 2,
	VALUE: 25,
	ACTION: UHEMI_F
});

function UHEMI_F() {
    return isHANDLE_HEMI(UHEMI, LHEMI, "PEG");
}

var LHEMI = () => OBJECT({
	LOC: RELIQUARY,
	DESC: "white hemisphere",
	FLAGS: [TAKEABLE],
	SYNONYM: ["HEMISPHERE", "CRYSTAL", "CRYSTALS", "HOLE"],
	ADJECTIVE: ["WHITE"],
	SIZE: 2,
	VALUE: 25,
	ACTION: LHEMI_F
});

function LHEMI_F() {
    return isHANDLE_HEMI(LHEMI, UHEMI, "HOLE");
}

function isHANDLE_HEMI(_OBJ, _OTHER, _WRD) {
    let _X;
    if(isNOUN_USED(_WRD)) {
        if(isTHIS_PRSI()) {
            if(isVERB(V_PUT, V_PUT_ON, V_PLUG_IN)) {
                if(isPRSO(PRSI)) {
                    IMPOSSIBLE();
                    return true;
                } else if(isEQUAL(PRSO, _OTHER)) {
                    FUSION();
                    return true;
                } else if(isEQUAL(_WRD, "PEG")) {
                    IMPOSSIBLE();
                    return true;
                }
                TELL(XTHE, B(_WRD), SON, THE(_OBJ
), " is much too tiny.", CR);
                return true;
            } else if((_X = isPUTTING())) {
                IMPOSSIBLE();
                return true;
            }
            return false;
        } else if((_X = isMOVING())) {
            TELL(XTHE, B(_WRD), SON, THE(_OBJ));
            PRINT(" cannot be moved.|");
            return true;
        } else if(isVERB(V_EXAMINE)) {
            TELL("It's set into the center of "
, THE(_OBJ), PERIOD);
            return true;
        } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
            if(isEQUAL(_WRD, "PEG")) {
                IMPOSSIBLE();
                return true;
            }
            PRINT("It's empty.|");
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_ON, V_PLUG_IN)) {
            if(isPRSO(PRSI)) {
                IMPOSSIBLE();
                return true;
            } else if(isEQUAL(PRSO, _OTHER)) {
                FUSION();
                return true;
            }
            return false;
        }
        return false;
    } else if(isVERB(V_LOOK_INSIDE)) {
        PRINT("You fix your gaze deep within the crystal, ");
        TELL("and sense a vague incompleteness.", CR);
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("This curious artifact is wide as your palm, and fashioned of some ");
        if(isEQUAL(_OBJ, LHEMI)) {
            TELL(B("WHITE"));
        } else {
            TELL(B("BLACK"));
        }
        TELL(" crystalline substance. A tiny ");
        if(isEQUAL(_OBJ, LHEMI)) {
            TELL(B("HOLE"));
        } else {
            TELL(B("PEG"));
        }
        TELL(" is set in the middle of its flat side.", CR);
        return true;
    } else {
        return false;
    }
}

function FUSION() {
    let _L;
    _L = LOC(PRSI);
    WINDOW(SHOWING_ALL);
    TELL("The crystals fit together with a satisfying ");
    HLIGHT(H_ITALIC);
    TELL("click");
    HLIGHT(H_NORMAL);
    TELL(" to form a perfect sphere, half white, half black");
    if((isIS(PRSO, NEUTRALIZED)
  ||  isIS(PRSI, NEUTRALIZED))) {
        if(!(isIN(PRSO, _L))) {
            MOVE(PRSO, _L);
        }
        TELL(". But they fall apart the moment you release them.", CR);
        return true;
    }
    TELL(PERIOD);
    MOVE(STONE, _L);
    REMOVE(PRSI);
    REMOVE(PRSO);
    P_IT_OBJECT = STONE;
    if(isHERE(IN_BOUTIQUE, IN_MAGICK, IN_WEAPON)) {
        TELL(TAB, "\"Cover your eyes,\" warns "
, THE(OWOMAN), PERIOD);
    }
    TELL(TAB
, "Nothing happens for a moment. Then, in a fraction of an instant, the two hemispheres switch colors! You hardly have time to gasp before the colors switch again, and then again, faster, faster, until you shield your eyes from the blinding strobe effect.", CR);
    return true;
}

var STONE = () => OBJECT({
	DESC: "gray sphere",
	SDESC: DESCRIBE_STONE,
	FLAGS: [TAKEABLE],
	SYNONYM: ["ZZZP", "SCRYSTONE", "STONE", "CRYSTAL", "SPHERE", "BALL"],
	ADJECTIVE: ["ZZZP", "GRAY", "GREY"],
	SIZE: 4,
	VALUE: 50,
	NAME_TABLE: 0,
	ACTION: STONE_F
});


var VISION/*NUMBER*/ = 0;

function STONE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " is perfectly smooth and seamless");
        if(!(isIS(PRSO, NEUTRALIZED))) {
            TELL(". Its surface draws your eyes deep into its cloudy interior");
        }
        PRINT(PERIOD);
        return true;
    } else if(isVERB(V_LOOK_INSIDE)) {
        if(!(isIN(PRSO, PLAYER))) {
            TELL("You're not likely to see much unless you're holding it.", CR);
            return true;
        }
        _X = LOC(STONE);
        PRINT("You fix your gaze deep within the crystal, ");
        if((isIS(PRSO, NEUTRALIZED)
  ||  STATS[INTELLIGENCE] < 69)) {
            TELL("but an unintelligible swirl is all you can see.", CR);
            return true;
        }
        TELL("and watch its swirling depths coalesce into the image of a ");
        if(++VISION > 3) {
            VISION = 0;
            TELL("samurai warrior, slashing through armies of bloodthirsty foes in an epic struggle for power and honor");
            PRINT(". This curious vision quickly fades.|");
            return true;
        } else if(isEQUAL(VISION, 1)) {
            if(!(WALL_WORD)) {
                _X = PICK_ONE(MAGIC_WORDS);
                _X[2] = 1;
                WALL_WORD = _X[0];
                _X = _X[1];
                PUTP(NWALL, "NAME-TABLE", _X);
                MAKE(NWALL, NAMED);
                PUTP(SWALL, "NAME-TABLE", _X);
                MAKE(SWALL, NAMED);
            }
            TELL("warlock, standing before a seamless wall of stone. He mutters the word \"");
            PRINT_TABLE(GETP(NWALL, "NAME-TABLE"));
            TELL(",\" and a doorlike outline appears which he pushes open. The vision fades as he steps inside.", CR);
            return true;
        } else if(isEQUAL(VISION, 2)) {
            TELL("huge cauldron, bubbling in the midst of a vast, excessive castle");
            PRINT(". This curious vision quickly fades.|");
            return true;
        }
        TELL("giant balloon-shaped head, wagging its tongue at you from the depths of outer space");
        PRINT(". This curious vision quickly fades.|");
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        TELL(CTHEO, " is completely seamless.", CR);
        return true;
    } else {
        return false;
    }
}

var WALL_WORD/*WORD*/ = null;

function SETUP_STONE() {
    let _WRD, _TBL;
    _TBL = PICK_ONE(MAGIC_WORDS);
    _TBL[2] = 1;
    _WRD = _TBL[0];
    GETPT(STONE, "SYNONYM")[0] = _WRD;
    GETPT(STONE, "ADJECTIVE")[0] = _WRD;
    PUTP(STONE, "NAME-TABLE", _TBL[1]);
    MAKE(STONE, PROPER);
    MAKE(STONE, NAMED);
    MAKE(STONE, IDENTIFIED);
    WINDOW(SHOWING_ALL);
    return false;
}

function SAY_WALL_WORD() {
    if((isHERE(SE_WALL, SE_CAVE)
  &&  !(isIS(SWALL, SEEN)))) {
        SEE_WALL(SWALL);
        return true;
    } else if((isHERE(NE_WALL, NE_CAVE)
  &&  !(isIS(NWALL, SEEN)))) {
        SEE_WALL(NWALL);
        return true;
    }
    NOTHING_HAPPENS(null);
    return true;
}

function SEE_WALL(_OBJ) {
    MAKE(_OBJ, SEEN);
    WINDOW(SHOWING_ROOM);
    MAKE(_OBJ, PROPER);
    MAKE(_OBJ, IDENTIFIED);
    GETPT(_OBJ, "SYNONYM")[0] = WALL_WORD;
    GETPT(_OBJ, "ADJECTIVE")[0] = WALL_WORD;
    TELL(CTHE(GROUND), " shudders at the sound of your voice");
    if(isT(isLIT)) {
        TELL(", and the outline of a door appears in the rock wall");
    }
    TELL(PERIOD);
    REFRESH_MAP();
    return true;
}


var DIARY = () => OBJECT({
	LOC: BENCH,
	DESC: "little black book",
	FLAGS: [TAKEABLE, READABLE],
	SYNONYM: ["BOOK", "DIARY", "JOURNAL", "ENTRY", "ENTRIES"],
	SIZE: 3,
	VALUE: 10,
	GENERIC: GENERIC_GLYPH_F,
	ACTION: DIARY_F
});

function DIARY_F() {
    let _X;
    if(isNOUN_USED("GLYPH")) {
        if(isVERB(V_EXAMINE, V_LOOK_ON)) {
            DESCRIBE_GLYPH();
            return true;
        } else if((_X = isMOVING())) {
            TELL(CTHE(GLYPH), SIN, THE(DIARY));
            PRINT(" cannot be moved.|");
            return true;
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_ON, V_EMPTY_INTO)) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(ITAKE()) {
            FIND_UHEMI();
            TELL("As you pick up ", THEO, ", you notice ", A(UHEMI
), " lying among ", THE(CHEMS), PERIOD);
        }
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It appears to be a personal journal or diary of some kind. The faint glow of the penmanship betrays its author as a mage.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH, V_OPEN)) {
        TELL("Many of the pages are still intact.", CR);
        return true;
    } else if(isVERB(V_READ)) {
        TELL("You nosily thumb the pages.|| \"");
        ITALICIZE("23 July");
        TELL(". Hot again. Retorts and alembics spoiling! Hate this northern clime", PTAB);
        ITALICIZE("26 July");
        TELL(". Gated Thriff to Miznia, via Atrii. Relief at last! Villagers perplexed but grateful", PTAB);
        ITALICIZE("2 August");
        TELL(". Mtn not dormant after all. Yonked a girgol just in nick of time.|  ");
        ITALICIZE("9 August");
        TELL(". Wilderness life stinks. Raccoon nest in chimney; guncho took flue and all! Broke last burin warding off Xmas pests. Better off up north?|  ");
        ITALICIZE("13 August");
        TELL(". Borphee tomorrow. Y'Gael ");
        ITALICIZE("must");
        TELL(" be wrong.\"||  ");
        DESCRIBE_GLYPH();
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_GLYPH() {
    MAKE(DIARY, MUNGED);
    TELL("A tiny glyph is scrawled beside the entry dated \"9 August.\" It");
    if(isIS(GLYPH, SEEN)) {
        TELL(" looks just like the one you saw outside.", CR);
        return true;
    }
    TELL("'s ");
    SAY_GLYPH();
    return false;
}

var MAILBOX = () => OBJECT({
	LOC: ON_TRAIL,
	DESC: "mailbox",
	FLAGS: [NODESC, TRYTAKE, NOALL, CONTAINER, OPENABLE],
	CAPACITY: 10,
	SYNONYM: ["MAILBOX", "BOX"],
	ADJECTIVE: ["MAIL"],
	ACTION: MAILBOX_F
});

function MAILBOX_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        return false;
    } else if((_X = isMOVING())) {
        TELL(CTHEO, " is rooted firmly in ", THE(GROUND), PERIOD);
        return true;
    } else {
        return false;
    }
}

var LEAFLET = () => OBJECT({
	LOC: MAILBOX,
	DESC: "leaflet",
	FLAGS: [TAKEABLE, READABLE],
	SIZE: 1,
	VALUE: 0,
	SYNONYM: ["LEAFLET", "PAPER", "MAIL", "AD", "ADVERTISEMENT"],
	ACTION: LEAFLET_F
});

function LEAFLET_F() {
    if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It seems to be an advertisement for some curious form of entertainment.", CR);
        return true;
    } else if(isVERB(V_READ)) {
        MOVE(PARCEL, LOC(PRSO));
        VANISH();
        P_IT_OBJECT = PARCEL;
        TELL("With a silent puff, ", THEO
, " turns into ", A(PARCEL), PERIOD);
        return true;
    } else {
        return false;
    }
}

var PARCEL = () => OBJECT({
	DESC: "parcel",
	FLAGS: [TAKEABLE, CONTAINER, OPENABLE],
	SIZE: 3,
	VALUE: 0,
	SYNONYM: ["PARCEL", "PACKAGE", "BOX", "MAIL", "ADDRESS"],
	ACTION: PARCEL_F
});

function PARCEL_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        TELL(CTHEO, " is from the ");
        FROBOZZ("Magic Equipment");
        TELL(", and is addressed to \"Orkan/Thriff/North Frobozz.\" Curiously, the words \"North Frobozz\" have been scratched out, and the word \"Miznia\" scribbled over them as an afterthought.", CR);
        return true;
    } else if(isVERB(V_SHAKE)) {
        TELL("Feels as if there's something inside.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        WINDOW(SHOWING_ALL);
        _X = LOC(PRSO);
        REMOVE(PRSO);
        MOVE(BURIN, _X);
        P_IT_OBJECT = BURIN;
        TELL("All traces of ", THE(PARCEL
), " disappear in a puff as you open it, leaving the contents");
        if(isEQUAL(_X, PLAYER, HERE, LOC(PLAYER))) {
            TELL(C(SP), B("BEHIND"));
        } else {
            ON_IN(_X);
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

var BURIN = () => OBJECT({
	DESC: "burin",
	FLAGS: [TAKEABLE, FERRIC],
	SIZE: 3,
	VALUE: 5,
	SYNONYM: ["BURIN", "STYLUS"],
	ACTION: BURIN_F
});

function BURIN_F() {
    if(isTHIS_PRSI()) {
        if(isVERB(V_WRITE_WITH)) {
            if(isPRSO(GGLYPH, GLYPH)) {
                PERFORM("WRITE-ON", PRSO, GROUND);
                return true;
            }
            return false;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " is long and tapered, with a diamond tip for precision inscribing. The words \"");
        FROBOZZ("Burin");
        TELL("\" are inscribed along the side.", CR);
        return true;
    } else if(isVERB(V_USE)) {
        PERFORM("WRITE-ON", GGLYPH, GROUND);
        return true;
    } else {
        return false;
    }
}

var BRIDGE = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "bridge",
	FLAGS: [NODESC, PLACE],
	SYNONYM: ["BRIDGE"],
	ACTION: BRIDGE_F
});

function BRIDGE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO, " leads ");
        _X = "SOUTHWEST";
        if(isHERE(AT_BRINE)) {
            _X = "NORTHEAST";
        }
        TELL(B(_X), PERIOD);
        return true;
    } else if(isVERB(V_LOOK_UNDER, V_LOOK_BEHIND, V_SEARCH)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isVERB(V_STAND_UNDER, V_LEAP)) {
        CANT_FROM_HERE();
        return true;
    } else if((_X = isCLIMBING_ON())) {
        _X = "SW";
        if(isHERE(AT_BRINE)) {
            _X = "NE";
        }
        DO_WALK(_X);
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_ON();
        return true;
    } else {
        return false;
    }
}

var FOOD = () => OBJECT({
	LOC: IMPTAB,
	DESC: "food",
	FLAGS: [TRYTAKE, NOALL],
	SYNONYM: ["FOOD"],
	ACTION: FOOD_F
});

function FOOD_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_SMELL)) {
        TELL("Your stomach growls.", CR);
        return true;
    } else {
        return false;
    }
}

var DEBRIS = () => OBJECT({
	LOC: LOCAL_GLOBALS,
	DESC: "debris",
	FLAGS: [NODESC, TRYTAKE, NOALL, SURFACE],
	SYNONYM: ["DEBRIS", "DUST", "DIRT", "JUNK"],
	ACTION: DEBRIS_F
});

function DEBRIS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE
, V_LOOK_UNDER, V_SEARCH, V_LOOK_BEHIND
, V_REACH_IN)) {
        TELL("You rummage through ", THEO);
        BUT_FIND_NOTHING();
        return true;
    } else if((_X = isMOVING())) {
        TELL("A waste of time. ", CTHEO
, " is obviously useless.", CR);
        return true;
    } else {
        return false;
    }
}

var EASEL = () => OBJECT({
	LOC: ON_WHARF,
	DESC: "easel",
	FLAGS: [VOWEL, TRYTAKE, NODESC, SURFACE],
	SYNONYM: ["EASEL"],
	ACTION: EASEL_F
});

function EASEL_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_PUT, V_EMPTY_INTO)) {
            YOUD_HAVE_TO("remove", CANVAS);
            return true;
        } else if((_X = isPUTTING())) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if((_X = isMOVING())) {
        SHOO();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("There's ", A(CANVAS), " on it.", CR);
        return true;
    } else {
        return false;
    }
}

function SHOO() {
    MAKE(SALT, SEEN);
    TELL("\"Hands off,\" snaps ", THE(SALT), PERIOD);
    return true;
}

var CANVAS = () => OBJECT({
	LOC: EASEL,
	DESC: "canvas",
	FLAGS: [TRYTAKE, SURFACE],
	SYNONYM: ["CANVAS", "PAINTING", "PICTURE", "ART", "GALLEON", "SHIP"],
	ACTION: CANVAS_F
});

function CANVAS_F() {
    let _X;
    if((_X = isTOUCHING())) {
        SHOO();
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("A magnificent galleon is taking shape on the canvas, soaring across the sky on planes of sparkling Magick.", CR);
        return true;
    } else {
        return false;
    }
}

var APOTION = () => OBJECT({
	DESC: "cloudy potion",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ZZZP", "POTION", "POTIONS"],
	ADJECTIVE: ["ZZZP", "CLOUDY"],
	SIZE: 1,
	VALUE: 12,
	DESCFCN: 0,
	ACTION: 0
});

var BPOTION = () => OBJECT({
	DESC: "dark potion",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ZZZP", "POTION", "POTIONS"],
	ADJECTIVE: ["ZZZP", "DARK"],
	SIZE: 1,
	VALUE: 12,
	DESCFCN: 0,
	ACTION: 0
});

var CPOTION = () => OBJECT({
	DESC: "clear potion",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ZZZP", "POTION", "POTIONS"],
	ADJECTIVE: ["ZZZP", "CLEAR"],
	SIZE: 1,
	VALUE: 12,
	DESCFCN: 0,
	ACTION: 0
});

var DPOTION = () => OBJECT({
	DESC: "gray potion",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ZZZP", "POTION", "POTIONS"],
	ADJECTIVE: ["ZZZP", "GRAY", "GREY"],
	SIZE: 1,
	VALUE: 12,
	DESCFCN: 0,
	ACTION: 0
});

var EPOTION = () => OBJECT({
	DESC: "milky potion",
	SDESC: 0,
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["ZZZP", "POTION", "POTIONS"],
	ADJECTIVE: ["ZZZP", "MILKY", "MILK"],
	SIZE: 1,
	VALUE: 12,
	DESCFCN: 0,
	ACTION: 0
});



function IQ_POTION_F() {
    return isHANDLE_POTION(I_IQ);
}

function HEALING_POTION_F() {
    return isHANDLE_POTION(I_HEAL);
}

function DEATH_POTION_F() {
    return isHANDLE_POTION(I_DEATH);
}

function MIGHT_POTION_F() {
    return isHANDLE_POTION(I_MIGHT);
}

function FORGET_POTION_F() {
    return isHANDLE_POTION(I_FORGET);
}

function isNEXT_POTION(_RM, _FCN) {
    let _OBJ, _X;
    _OBJ = toOBJECT(PICK_ONE(POTION_LIST));
    if(isIS(_OBJ, NODESC)) {
        UNMAKE(_OBJ, NODESC);
        _X = PICK_ONE(POTION_TABLES);
        PUTP(_OBJ, "ACTION", _X[0]);
        PUTP(_OBJ, "SDESC", _X[1]);
        _X = _X[2];
        GETPT(_OBJ, "SYNONYM")[0] = _X;
        GETPT(_OBJ, "ADJECTIVE")[0] = _X;
        if(isASSIGNED(_RM)) {
            MOVE(_OBJ, _RM);
        }
        if(isASSIGNED(_FCN)) {
            PUTP(_OBJ, "DESCFCN", _FCN);
        }
        return _OBJ;
    } else {
        /*SAY_ERROR("NEXT-POTION?");*/
        return false;
    }
}

function isHANDLE_POTION(_INT) {
    if(isTHIS_PRSI()) {
        if(isVERB(V_POUR_FROM)) {
            PRINT("Wastrel.|");
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_READ)) {
        MAKE(BPOTION, SEEN);
        TELL("A legend on the potion says, \"Shake before using. Another fine product of the ");
        FROBOZZ("Potion");
        TELL(PERQ);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        TELL(XTHE, B(GETPT(PRSO, "ADJECTIVE")[1]
), " liquid ");
        if(isIS(PRSO, MUNGED)) {
            TELL("swirls with potency.", CR);
            return true;
        }
        TELL("looks a bit flat.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH)) {
        TELL(DONT
, "need to. It'll open itself when you drink it.", CR);
        return true;
    } else if(isVERB(V_POUR, V_EMPTY, V_EMPTY_INTO)) {
        PRINT("Wastrel.|");
        return true;
    } else if(isVERB(V_CLOSE)) {
        ITS_ALREADY("closed");
        return true;
    } else if(isVERB(V_SHAKE)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        }
        MAKE(PRSO, MUNGED);
        TELL("You give the potion a vigorous shake.", CR);
        return true;
    } else if(isVERB(V_DRINK, V_USE)) {
        if(!(isIN(PRSO, PLAYER))) {
            YOUD_HAVE_TO("be holding");
            return true;
        } else if((isIS(PRSO, MUNGED)
  &&  !(isIS(PRSO, NEUTRALIZED)))) {
            QUEUE(_INT, 2);
        }
        VANISH();
        TELL("Gloop, gloop, gloop! You drain ", THEO
, " to the last drop, and watch as the container melts into nothingness.", CR);
        if(isIN(OWOMAN, HERE)) {
            MAKE(OWOMAN, SEEN);
            TELL("  \"");
            if(!(isIS(BPOTION, SEEN))) {
                TELL("Should've read it first");
            } else if((isEQUAL(_INT, I_DEATH)
  &&  isIS(PRSO, MUNGED)
  &&  !(isIS(PRSO, NEUTRALIZED)))) {
                TELL("Nice knowing you");
            } else {
                TELL("Cheers");
            }
            TELL(",\" mutters ", THE(OWOMAN), PERIOD);
        }
        return true;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_MUNG, V_CUT, V_HIT)) {
        TELL("And risk breaking this expensive ", D(PRSO), "? ");
        WASTE_OF_TIME();
        return true;
    } else {
        return false;
    }
}

var CAKE = () => OBJECT({
	DESC: "fish cake",
	FLAGS: [NODESC, TAKEABLE],
	SYNONYM: ["CAKE", "FISH"],
	ADJECTIVE: ["FISH"],
	SIZE: 1,
	VALUE: 2,
	DESCFCN: CAKE_F,
	ACTION: CAKE_F
});

function CAKE_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(CAKE));
            PRINT(" lies at your feet.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isFIRST_TAKE()) {
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        JUST_LIKE("LOOK");
        return true;
    } else if(isVERB(V_SMELL, V_KISS)) {
        JUST_LIKE("SMELL");
        return true;
    } else if(isVERB(V_EAT, V_TASTE)) {
        if(!(isIS(PRSO, NEUTRALIZED))) {
            QUEUE(I_IQ, 4);
        }
        VANISH();
        TELL("With a mighty effort of will, you cram ", THEO
, " into your mouth, chew and swallow. Bleah.", CR);
        return true;
    } else {
        return false;
    }
}

function JUST_LIKE(_WRD) {
    TELL("It ", B(_WRD
), "s just like the ones your aunt used to make. Bleah.", CR);
    return true;
}

var HEAP = () => OBJECT({
	LOC: IN_LAIR,
	DESC: "mound of plunder",
	FLAGS: [NODESC, TRYTAKE, SURFACE],
	SYNONYM: ["MOUND", "HEAP", "PILE", "PLUNDER", "TREASURE", "TREASURES"],
	ADJECTIVE: ["TREASURE"],
	CAPACITY: 100,
	CONTFCN: HEAP_F,
	ACTION: HEAP_F
});

function HEAP_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if((isEQUAL(_CONTEXT, M_CONT)
  &&  isURGRUE_STOPS())) {
            return true;
        }
        return false;
    } else if(((_X = isTOUCHING())
  &&  isURGRUE_STOPS())) {
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_COUNT)) {
        TELL("A rapid survey turns up at least 69,105 treasures.", CR);
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("The exotic treasures piled here are almost beyond counting");
        if(isSEE_ANYTHING_IN()) {
            TELL(". Among them you see ");
            CONTENTS();
            P_IT_OBJECT = PRSO;
        }
        PRINT(PERIOD);
        return true;
    } else if((isVERB(V_LOOK_INSIDE, V_SEARCH, V_LOOK_BEHIND, V_LOOK_UNDER)
  ||  (_X = isMOVING()))) {
        if(isURGRUE_STOPS()) {
            return true;
        } else if(isIS(COCO, NODESC)) {
            UNMAKE(COCO, NODESC);
            WINDOW(SHOWING_ROOM);
            MOVE(COCO, IN_LAIR);
            P_IT_OBJECT = COCO;
            TELL("As you sift excitedly through ", THEO
, ", something small and hard rolls out and lands on your toe. Ouch!", CR);
            return true;
        }
        TELL("It'd take weeks to sift through everything else.", CR);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        if(isURGRUE_STOPS()) {
            return true;
        }
        TELL("Stop gloating.", CR);
        return true;
    } else {
        return false;
    }
}

function isURGRUE_STOPS() {
    if(isIN(URGRUE, HERE)) {
        TELL("\"Do keep away from that,\" urges ", THE(URGRUE), PERIOD);
        return true;
    } else {
        return false;
    }
}

var COCO = () => OBJECT({
	LOC: IMPS,
	DESC: "coconut",
	FLAGS: [TAKEABLE],
	SIZE: 5,
	VALUE: 0,
	SYNONYM: ["COCONUT", "NUT", "QUENDOR"],
	ACTION: COCO_F
});

function COCO_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("It's hard to see what all the fuss is about.", CR);
        return true;
    } else if(((_X = isTOUCHING())
  &&  !(isIS(COCO, SEEN)))) {
        URGRUE_GETS_COCO();
        return true;
    } else if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(ITAKE()) {
            QUEUE(I_QUAKE);
            TELL("An angelic choir swells as you lift ", THEO, " off the floor.", CR);
        }
        return true;
    } else if(isVERB(V_SMELL)) {
        TELL("Phew! It's a few centuries overripe.", CR);
        return true;
    } else if(isVERB(V_HIT, V_MUNG, V_CUT, V_KICK, V_KNOCK, V_OPEN, V_OPEN_WITH)) {
        TELL("Thump! Hard as a rock.", CR);
        return true;
    } else if(isVERB(V_EAT, V_TASTE, V_DRINK, V_DRINK_FROM
, V_LOOK_INSIDE, V_REACH_IN, V_EMPTY)) {
        YOUD_HAVE_TO("open");
        return true;
    } else if(isVERB(V_SHAKE)) {
        TELL("Something slooshes around inside.", CR);
        return true;
    } else {
        return false;
    }
}

var BOULDER = () => OBJECT({
	DESC: "boulder",
	FLAGS: [NODESC, TRYTAKE, NOALL, SURFACE, READABLE],
	SYNONYM: ["BOULDER", "ROCK", "STONE", "FACE", "INSCRIPTION", "WRITING", "WORDS", "RIDDLE", "YOUTH"],
	DESCFCN: BOULDER_F,
	ACTION: BOULDER_F
});

function BOULDER_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            PRINT("An inscription is carved upon the face of ");
            TELL("an enormous boulder.");
            return true;
        }
        return false;
    } else if(isNOUN_USED("YOUTH")) {
        OPEN_POOL();
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_READ, V_LOOK_ON)) {
        TELL("The carved ", RIDDLE, " reads,||");
        HLIGHT(H_MONO);
        TELL(`\"Never ahead, ever behind,
 Yet flying swiftly past;
 For a child, I last forever,
 For adults, I'm gone too fast.
 What am I?\"`, CR);
        HLIGHT(H_NORMAL);
        return true;
    } else if((_X = isMOVING())) {
        TELL(CTHEO, " is much too big and heavy.", CR);
        return true;
    } else if((_X = isCLIMBING_ON())) {
        NO_FOOTHOLDS();
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_ON();
        return true;
    } else {
        return false;
    }
}



function INIT_THINGS() {
    SUN = SUN();
    SKY = SKY();
    WCASE = WCASE();
    BREEZE = BREEZE();
    PACK = PACK();
    CELLAR_DOOR = CELLAR_DOOR();
    PUB_DOOR = PUB_DOOR();
    CELLAR_STAIR = CELLAR_STAIR();
    PUB = PUB();
    PUB_SIGN = PUB_SIGN();
    LANTERN = LANTERN();
    GRUBBO = GRUBBO();
    SHILL = SHILL();
    SWORD = SWORD();
    AXE = AXE();
    DAGGER = DAGGER();
    PUBWALL = PUBWALL();
    BOTTLE = BOTTLE();
    CRATES = CRATES();
    KITCHEN = KITCHEN();
    GREAT_SEA = GREAT_SEA();
    ACCARDI = ACCARDI();
    TOWER = TOWER();
    TOWER_STEPS = TOWER_STEPS();
    BOUTIQUE_DOOR = BOUTIQUE_DOOR();
    BOUTIQUE = BOUTIQUE();
    GONDOLA = GONDOLA();
    DGONDOLA = DGONDOLA();
    SUPPORT = SUPPORT();
    DOCK = DOCK();
    ZBRIDGE = ZBRIDGE();
    SWALL = SWALL();
    NWALL = NWALL();
    WEAPON_SHOP = WEAPON_SHOP();
    WEAPON_DOOR = WEAPON_DOOR();
    MSHOPPE = MSHOPPE();
    MAGICK_DOOR = MAGICK_DOOR();
    LAMPHOUSE = LAMPHOUSE();
    SEXTANT = SEXTANT();
    CHEST = CHEST();
    HERD = HERD();
    PHASE = PHASE();
    THRONE = THRONE();
    DOUBLOON = DOUBLOON();
    STAVE = STAVE();
    STAFF = STAFF();
    WAND = WAND();
    STICK = STICK();
    ROD = ROD();
    CANE = CANE();
    CURTAIN = CURTAIN();
    MIRROR0 = MIRROR0();
    MIRROR1 = MIRROR1();
    MIRROR2 = MIRROR2();
    MIRROR3 = MIRROR3();
    MIRROR4 = MIRROR4();
    MIRROR5 = MIRROR5();
    MIRROR6 = MIRROR6();
    SUNBEAM = SUNBEAM();
    JAR = JAR();
    CIRCLET = CIRCLET();
    PLAZA = PLAZA();
    ARCH = ARCH();
    LIGHTSHOW = LIGHTSHOW();
    BHORSE = BHORSE();
    HORSE = HORSE();
    DEAD_HORSE = DEAD_HORSE();
    TRENCH = TRENCH();
    MAW = MAW();
    CROCO = CROCO();
    TEAR = TEAR();
    IDOL_ROOM = IDOL_ROOM();
    JUNGLE = JUNGLE();
    PRAIRIE = PRAIRIE();
    FARM_DOOR = FARM_DOOR();
    FARM_WINDOW = FARM_WINDOW();
    FARM = FARM();
    FARMHOUSE = FARMHOUSE();
    SCARE1 = SCARE1();
    SCARE2 = SCARE2();
    SCARE3 = SCARE3();
    JBOX = JBOX();
    KEY1 = KEY1();
    KEY2 = KEY2();
    KEY3 = KEY3();
    FROON = FROON();
    INGURDY = INGURDY();
    FHILLS = HILLS = HILL = FOOTHILLS = FHILLS();
    WHARF = WHARF();
    FBEDS = FBEDS();
    COVE = COVE();
    POOL = POOL();
    DACT = DACT();
    ARROW = ARROW();
    WEEDS = WEEDS();
    WEEDS2 = WEEDS2();
    SPENSE = SPENSE();
    SPENSE2 = SPENSE2();
    BRINE = BRINE();
    CUBE = CUBE();
    ROSES = ROSES();
    ROSE = ROSE();
    GUILD_HALL = GUILD_HALL();
    THRIFF = THRIFF();
    NYMPH = NYMPH();
    ONION = ONION();
    MOSS = MOSS();
    MOSS2 = MOSS2();
    MOSS3 = MOSS3();
    STALL = STALL();
    STABLE = STABLE();
    STORM = STORM();
    TWISTER = TWISTER();
    MCASE = MCASE();
    ON_MCASE = ON_MCASE();
    BCASE = BCASE();
    ON_BCASE = ON_BCASE();
    ON_WCASE = ON_WCASE();
    PLATE = PLATE();
    CHAIN = CHAIN();
    SCALE = SCALE();
    TUNIC = TUNIC();
    CLOAK = CLOAK();
    QUICKSAND = QUICKSAND();
    MAMA = MAMA();
    BABY = BABY();
    PARASOL = PARASOL();
    ZSIGN = ZSIGN();
    WHISTLE = WHISTLE();
    CHAPEL = CHAPEL();
    CHAPEL_DOOR = CHAPEL_DOOR();
    PEW = PEW();
    UNDERPEW = UNDERPEW();
    BFLY = BFLY();
    GOBLET = GOBLET();
    IMPTAB = IMPTAB();
    ALTAR = ALTAR();
    RELIQUARY = RELIQUARY();
    OAK = OAK();
    OAK2 = OAK2();
    OAK3 = OAK3();
    TRUFFLE = TRUFFLE();
    CASTLE = CASTLE();
    GARDEN = GARDEN();
    BUSH = BUSH();
    ROOT = ROOT();
    BROG = BROG();
    RUG = RUG();
    UNDERUG = UNDERUG();
    RING = RING();
    WOODS = WOODS();
    TRACKS = TRACKS();
    GURTH = GURTH();
    CELLAR = CELLAR();
    PHEEBOR = PHEEBOR();
    GLASS = GLASS();
    SCABBARD = SCABBARD();
    RFOOT = RFOOT();
    CLOVER = CLOVER();
    SHOE = SHOE();
    DIAMOND = DIAMOND();
    PARCHMENT = PARCHMENT();
    VELLUM = VELLUM();
    SMOOTH = SMOOTH();
    RUMPLE = RUMPLE();
    GILT = GILT();
    GWORD = GWORD();
    RENEWAL = RENEWAL();
    PALIMP = PALIMP();
    TUSK = TUSK();
    CARD = CARD();
    RIDDLE = RIDDLE();
    CREVICE = CREVICE();
    SWAMP = SWAMP();
    FOG = FOG();
    PLATFORM = PLATFORM();
    GGLYPH = GGLYPH();
    GLYPH = GLYPH();
    SNOW = SNOW();
    LAVA = LAVA();
    DOME = DOME();
    PLUME = PLUME();
    CRATER = CRATER();
    MAGMA_GLOW = MAGMA_GLOW();
    TRAIL = TRAIL();
    ORNAMENT = ORNAMENT();
    BOOT = BOOT();
    BROOK = BROOK();
    WATERFALL = WATERFALL();
    RIVER = RIVER();
    CABIN = CABIN();
    CABIN_DOOR = CABIN_DOOR();
    BENCH = BENCH();
    CHEMS = CHEMS();
    UHEMI = UHEMI();
    LHEMI = LHEMI();
    STONE = STONE();
    DIARY = DIARY();
    MAILBOX = MAILBOX();
    LEAFLET = LEAFLET();
    PARCEL = PARCEL();
    BURIN = BURIN();
    BRIDGE = BRIDGE();
    FOOD = FOOD();
    DEBRIS = DEBRIS();
    EASEL = EASEL();
    CANVAS = CANVAS();
    APOTION = APOTION();
    BPOTION = BPOTION();
    CPOTION = CPOTION();
    DPOTION = DPOTION();
    EPOTION = EPOTION();
    CAKE = CAKE();
    HEAP = HEAP();
    BOULDER = BOULDER();
}

function INIT_THINGS_2() {
    AMULET = AMULET();
    CROWN = CROWN();
    GURDY = GURDY();
    G_EYE = G_EYE();
    G_EAR = G_EAR();
    G_NOSE = G_NOSE();
    G_MOUTH = G_MOUTH();
    G_HAND = G_HAND();
    G_CLOCK = G_CLOCK();
    GDIAL = GDIAL();
    CRANK = CRANK();
    HELM = HELM();
    SACK = SACK();
    VIAL = VIAL();
    SADDLE = SADDLE();
    UNICORN = UNICORN();
    SPADE = SPADE();
    COCO = COCO();
}