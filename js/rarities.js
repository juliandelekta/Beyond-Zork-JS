`RARITIES for Beyond Zork
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

var INTNUM = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "number",
	FLAGS: [NODESC],
	SDESC: DESCRIBE_INTNUM,
	SYNONYM: ["INTNUM"]
});

function DESCRIBE_INTNUM(_OBJ) {
    TELL(INTNUM, C(SP), N(P_NUMBER));
    return true;
}

var IT = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "it",
	FLAGS: [VOWEL, NOARTICLE, NODESC, TOUCHED],
	SYNONYM: ["IT", "THAT", "ITSELF", "THING", "SOMETHING"]
});

function BE_SPECIFIC() {
    TELL("[Be specific: what do you want to ");
    return true;
}

function TO_DO_THING_USE(_STR1, _STR2) {
    TELL("[To ", _STR1, C(SP), B("SOMETHING"), ", use the command: "
, _STR2, " THING.]", CR);
    return true;
}

function CANT_USE(_PTR) {
    let _BUF;
    QUOTE_FLAG = null;
    P_OFLAG = null;
    _BUF = REST(P_LEXV, _PTR);
    TELL("[This story can't understand the word \"");
    WORD_PRINT(_BUF[0]);
    TELL("\" when you use it that way.]", CR);
    return true;
}

function DONT_UNDERSTAND() {
    TELL("[Please try to express that another way.]", CR);
    return true;
}

function NOT_IN_SENTENCE(_STR) {
    TELL("[There aren't ", _STR, " in that sentence.]", CR);
    return true;
}

var WALLS = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "wall",
	FLAGS: [NODESC, TOUCHED, SURFACE],
	SYNONYM: ["WALL", "WALLS"],
	ACTION: WALLS_F
});

function WALLS_F() {
    if(isHERE(IN_GARDEN)) {
        
    } else if(!(isIS(HERE, INDOORS))) {
        CANT_SEE_ANY(WALLS);
        return RFATAL();
    }
    if(isHANDLE_WALLS()) {
        return true;
    }
    USELESS(WALLS);
    return RFATAL();
}

function isHANDLE_WALLS() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PRSO_SLIDES_OFF_PRSI();
            return true;
        }
        return false;
    } else if(((_X = isCLIMBING_ON())
  ||  isVERB(V_LOOK_BEHIND, V_LOOK_UNDER))) {
        if(isHERE(IN_GARDEN)) {
            TELL(CTHEO, " is much too high.", CR);
            return true;
        }
        IMPOSSIBLE();
        return true;
    } else if((_X = isCLIMBING_OFF())) {
        NOT_ON();
        return true;
    } else if(((_X = isHURTING())
  ||  (_X = isMOVING()))) {
        TELL(CTHEO);
        TELL(" isn't affected.", CR);
        return true;
    } else if((_X = isTALKING())) {
        TELL("Talking to walls");
        WONT_HELP();
        return RFATAL();
    } else {
        return false;
    }
}

var CEILING = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	FLAGS: [NODESC, TOUCHED],
	DESC: "ceiling",
	SYNONYM: ["CEILING"],
	ACTION: CEILING_F
});

function CEILING_F() {
    if(!(isIS(HERE, INDOORS))) {
        CANT_SEE_ANY(CEILING);
        return RFATAL();
    } else if(isVERB(V_LOOK_UNDER)) {
        V_LOOK();
        return true;
    } else {
        return false;
    }
}

var HANDS = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "your hand",
	FLAGS: [TOOL, MANUALLY, WEAPON, NODESC, TOUCHED, NOARTICLE],
	SYNONYM: ["HAND", "HANDS", "FINGER", "FINGERS", "FIST", "ZZZP"],
	ADJECTIVE: ["MY", "OWN", "BARE", "ZZZP", "ZZZP"],
	EFFECT: 1,
	SIZE: 5,
	ACTION: HANDS_F
});

function HANDS_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((isVERB(V_SCRAPE_ON)
  &&  isT(MOSS_TIMER))) {
            DO_MOSS();
            return true;
        } else if(isVERB(V_TIE, V_PUT, V_PUT_ON, V_EMPTY_INTO)) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        if(isT(MOSS_TIMER)) {
            DO_MOSS();
            return true;
        }
        TELL(CYOUR);
        if(isIS(PRSO, MUNGED)) {
            TELL("long, slender ");
        }
        TELL("fingers are still there.", CR);
        return true;
    } else if(isVERB(V_COUNT)) {
        TELL("You still have ");
        if(isNOUN_USED("FINGERS", "FINGER")) {
            TELL("ten");
        } else {
            TELL("two");
        }
        TELL(" of them.", CR);
        return true;
    } else if(isVERB(V_LOOK_INSIDE, V_SEARCH)) {
        V_INVENTORY();
        return true;
    } else if(isVERB(V_PUT, V_PUT_UNDER, V_PUT_BEHIND)) {
        PERFORM("REACH-IN", PRSI);
        return true;
    } else if(isVERB(V_PUT_ON)) {
        PERFORM("TOUCH", PRSI);
        return true;
    } else if(isVERB(V_SCRATCH)) {
        if(isT(MOSS_TIMER)) {
            DO_MOSS();
            return true;
        }
        TELL("Your hand isn't itchy", AT_MOMENT);
        return true;
    } else if((_X = isMUST_HAVE())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var FEET = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "your foot",
	FLAGS: [CLOTHING, WORN, NODESC, NOARTICLE, SURFACE],
	SYNONYM: ["FOOT", "FEET", "TOE", "TOES", "SNEAKER", "SNEAKERS"],
	ADJECTIVE: ["MY", "OWN"],
	EFFECT: 1,
	SIZE: 5,
	ACTION: FEET_F
});

function FEET_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            WASTE_OF_TIME();
            return true;
        }
        return false;
    } else if(isVERB(V_PUT_ON)) {
        PERFORM("STAND-ON", PRSI);
        return true;
    } else if((_X = isMUST_HAVE())) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var MOUTH = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "your mouth",
	SYNONYM: ["MOUTH"],
	ADJECTIVE: ["MY", "OWN"],
	FLAGS: [NODESC, NOARTICLE, TOUCHED],
	ACTION: MOUTH_F
});

function MOUTH_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_PUT, V_PUT_ON, V_THROW)) {
            PERFORM("EAT", PRSO);
            return true;
        } else if(isVERB(V_TOUCH_TO)) {
            PERFORM("TASTE", PRSO);
            return true;
        }
    } else if(isVERB(V_REACH_IN)) {
        TELL("How rude.", CR);
        return true;
    } else if(isVERB(V_OPEN, V_OPEN_WITH, V_CLOSE)) {
        NO_NEED();
        return true;
    } else if(isVERB(V_RAPE, V_KICK, V_KISS)) {
        TELL("Good luck.", CR);
        return true;
    } else if((_X = isMUST_HAVE())) {
        IMPOSSIBLE();
        return true;
    }
    USELESS(MOUTH);
    return RFATAL();
}

var EYES = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "your eyes",
	FLAGS: [NODESC, NOARTICLE, TOUCHED],
	SYNONYM: ["EYES"],
	ADJECTIVE: ["MY", "OWN"],
	ACTION: EYES_F
});

"SEEN = given PRE-DUMB-EXAMINE admonishment."

function EYES_F() {
    let _X;
    if(isTHIS_PRSI()) {
        
    } else if(isVERB(V_OPEN)) {
        TELL("They are.", CR);
        return true;
    } else if(isVERB(V_CLOSE)) {
        if((isEQUAL(LAST_MONSTER, DORN)
  &&  !(isIS(LAST_MONSTER, MUNGED)))) {
            TELL("Something about ", THE(LAST_MONSTER
), "'s roving gaze forces your eyes to snap open.", CR);
            return true;
        } else if(isT(LAST_MONSTER)) {
            TELL("That won't make ", THE(LAST_MONSTER
), " go away.", CR);
            return true;
        }
        V_SLEEP();
        return true;
    } else if((_X = isMUST_HAVE())) {
        IMPOSSIBLE();
        return true;
    }
    USELESS(EYES);
    return RFATAL();
}

var HEAD = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "your head",
	FLAGS: [NODESC, SURFACE, TOUCHED, NOARTICLE],
	SYNONYM: ["HEAD", "NECK"],
	ADJECTIVE: ["MY", "OWN"],
	ACTION: HEAD_F
});

function HEAD_F() {
    let _X;
    if((isTHIS_PRSI()
  &&  isVERB(V_PUT_ON))) {
        if(isPRSO(HELM)) {
            PERFORM("WEAR", PRSO);
            return true;
        }
        WASTE_OF_TIME();
        return true;
    } else if((_X = isMUST_HAVE())) {
        IMPOSSIBLE();
        return true;
    }
    USELESS(HEAD);
    return RFATAL();
}

var PLAYER = () => OBJECT({
	SYNONYM: ["PROTAGONIST"],
	DESC: "yourself"	/*SDESC: SAY_CHARNAME*/,
	FLAGS: [TRANSPARENT, NODESC, NOARTICLE, PROPER],
	SIZE: 0,
	NAME_TABLE: CHARNAME,
	CAPACITY: 1000
});

var ME = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "yourself",
	FLAGS: [PERSON, LIVING, TOUCHED, NOARTICLE],
	SYNONYM: ["I", "ME", "MYSELF", "SELF", "BODY"],
	ADJECTIVE: ["MY", "OWN"],
	ACTION: ME_F
});

function ME_F(_CONTEXT=null) {
    let _ANY=null, _OBJ, _NXT, _X;
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            WASTE_OF_TIME();
            return true;
        } else if(isVERB(V_COVER)) {
            PERFORM("STAND-ON", PRSO);
            return true;
        } else if(isVERB(V_PUT_ON, V_WRAP_AROUND)) {
            if(isIS(PRSO, CLOTHING)) {
                PERFORM("WEAR", PRSO);
                return true;
            }
            IMPOSSIBLE();
            return true;
        } else if(isVERB(V_PUT)) {
            PERFORM("TASTE", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_SEARCH)) {
        TELL("You're ");
        _OBJ = isFIRST(WINNER);
        while(true) {
            if(!(_OBJ)) {
                break;
            }
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, WORN)) {
                _ANY = true;
                MOVE(_OBJ, DUMMY_OBJECT);
            }
            _OBJ = _NXT;
        }
        if(!(_ANY)) {
            TELL("not wearing anything special.", CR);
            return true;
        }
        TELL("wearing ");
        CONTENTS(DUMMY_OBJECT);
        PRINT(PERIOD);
        MOVE_ALL(DUMMY_OBJECT, WINNER);
        return true;
    } else if(isVERB(V_NAME)) {
        TELL("You already have a name. It's ");
        PRINT_TABLE(CHARNAME);
        TELL(PERIOD);
        return RFATAL();
    } else if(isVERB(V_LISTEN, V_SMELL)) {
        TELL(CANT, "help doing that.", CR);
        return true;
    } else if(isVERB(V_FIND, V_FOLLOW)) {
        PRINT("You're right here.|");
        return true;
    } else if(isVERB(V_RAPE, V_KISS)) {
        TELL("Desperate?", CR);
        return true;
    } else if(isVERB(V_HIT)) {
        TELL("You're indispensable.", CR);
        return true;
    } else if((_X = isHURTING())) {
        TELL("Punishing ");
        if(isEQUAL(WINNER, PLAYER)) {
            TELL("your");
        } else if(isIS(WINNER, FEMALE)) {
            TELL("her");
        } else if(isIS(WINNER, PERSON)) {
            TELL("him");
        } else {
            TELL("it");
        }
        TELL("self that way");
        WONT_HELP();
        return true;
    } else if(YOU_F()) {
        return true;
    } else {
        return false;
    }
}

var YOU = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "myself",
	SYNONYM: ["YOU", "YOURSELF", "US"],
	FLAGS: [NODESC, NOARTICLE],
	ACTION: YOU_F
});

function YOU_F() {
    let _X;
    if(isVERB(V_WHO, V_WHAT, V_WHERE)) {
        TELL("Good question.", CR);
        return true;
    } else if(isVERB(V_UNDRESS)) {
        INAPPROPRIATE();
        return true;
    } else if((isVERB(V_EAT, V_TASTE, V_DRINK, V_DRINK_FROM)
  ||  (_X = isMUST_HAVE()))) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

function INAPPROPRIATE() {
    TELL("That would hardly be an appropriate thing to do.", CR);
    return true;
}

function WONT_HELP() {
    TELL(" isn't likely to help matters.", CR);
    return true;
}

var GLOBAL_ROOM = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "room",
	SYNONYM: ["ROOM", "AREA", "PLACE", "LANDSCAPE", "HORIZON"],
	ADJECTIVE: ["OPENED", "THIS"],
	ACTION: GLOBAL_ROOM_F
});

function GLOBAL_ROOM_F() {
    let _X;
    if((isIS(HERE, INDOORS)
  &&  isNOUN_USED("LANDSCAPE", "HORIZON"))) {
        CANT_SEE_MUCH();
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE)) {
        V_LOOK();
        return true;
    } else if(((_X = isENTERING())
  ||  isVERB(V_DROP, EXIT))) {
        V_WALK_AROUND();
        return RFATAL();
    } else if(isVERB(V_WALK_AROUND)) {
        TELL("Walking around the area reveals nothing new", PTAB
, "[If you want to go somewhere, simply indicate a ", INTDIR, ".]", CR);
        return true;
    } else {
        return false;
    }
}

function CANT_SEE_ANY(_THING=NOT_HERE_OBJECT, _isSTRING=null) {
    isCLOCK_WAIT = true;
    PCLEAR();
    THIS_IS_IT(NOT_HERE_OBJECT);
    TELL(CANT);
    if(isVERB(V_LISTEN)) {
        TELL(B("HEAR"));
    } else if(isVERB(V_SMELL)) {
        TELL(B("SMELL"));
    } else {
        TELL(B("SEE"));
    }
    TELL(C(SP));
    if(isT(_isSTRING)) {
        TELL(_THING);
    } else {
        if(isIS(_THING, PROPER)) {
            TELL(LTHE);
        } else if(!(isIS(_THING, NOARTICLE))) {
            TELL("any ");
        }
        TELL(D(_THING));
    }
    TELL(" here.", CR);
    return true;
}

function isHOW() {
    TELL("A noble idea. How do you intend to do it?", CR);
    return true;
}

function NOT_LIKELY(_OBJ=PRSO) {
    TELL("It", PICK_NEXT(LIKELIES), " that ", THE(_OBJ));
    return true;
}

function YOUD_HAVE_TO(_STR, _OBJ=PRSO) {
    THIS_IS_IT(_OBJ);
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("You'd ");
    } else {
        TELL(CTHE(WINNER), " would ");
    }
    TELL("have to ", _STR, C(SP), THE(_OBJ), " to do that.", CR);
    return true;
}

var HER = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "her",
	FLAGS: [NODESC, NOARTICLE, PERSON, LIVING, FEMALE],
	SYNONYM: ["SHE", "HER", "HERSELF"]
});

var HIM = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "him",
	FLAGS: [NODESC, NOARTICLE, PERSON, LIVING],
	SYNONYM: ["HE", "HIM", "HIMSELF"]
});

var THEM = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "them",
	FLAGS: [NODESC, NOARTICLE],
	SYNONYM: ["THEY", "THEM", "THEMSELVES"]
});

var INTDIR = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "direction",
	FLAGS: [NODESC],
	SYNONYM: ["DIRECTION"],
	ADJECTIVE: ["NORTH", "EAST", "SOUTH", "WEST", "W", "NE", "NW", "SE", "SW", "UP", "DOWN"]
});

var GROUND = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "ground",
	FLAGS: [NODESC],
	SYNONYM: ["SURFACE", "GROUND", "GROUNDS", "EARTH", "ZZZP"],
	ACTION: GROUND_F
});

function GROUND_F() {
    let _OBJ, _NXT, _X;
    if((isHERE(IN_SKY)
  &&  (_X = isTOUCHING()))) {
        CANT_FROM_HERE();
        return true;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_PUT_ON, V_PUT, V_THROW, V_THROW_OVER)) {
            PERFORM("DROP", PRSO);
            return true;
        } else if(isVERB(V_WRITE_ON)) {
            if(!(isPRSO(GLYPH, GGLYPH))) {
                IMPOSSIBLE();
                return true;
            }
            WRITE_GLYPH();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_SEARCH)) {
        if((_OBJ = isFIRST(HERE))) {
            while(true) {
                _NXT = isNEXT(_OBJ);
                if((isIS(_OBJ, NODESC)
  ||  !(isIS(_OBJ, TAKEABLE)))) {
                    MOVE(_OBJ, C_OBJECT);
                }
                _OBJ = _NXT;
                if(!(_OBJ)) {
                    break;
                }
            }
        }
        TELL(YOU_SEE);
        CONTENTS(HERE);
        TELL(" on the ");
        GROUND_WORD();
        TELL(PERIOD);
        MOVE_ALL(C_OBJECT, HERE);
        return true;
    } else if(isVERB(V_CROSS)) {
        V_WALK_AROUND();
        return true;
    } else if(isVERB(V_LOOK_UNDER)) {
        TELL("Unfortunately, you left your X-ray glasses at home.", CR);
        return true;
    } else if(isVERB(V_DIG, V_DIG_UNDER)) {
        TELL("You dig around with ", THEI);
        BUT_FIND_NOTHING();
        return true;
    } else {
        return false;
    }
}

var FLOOR = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "floor",
	SYNONYM: ["FLOOR"],
	ACTION: FLOOR_F
});

function FLOOR_F() {
    let _X;
    if(!(isIS(HERE, INDOORS))) {
        CANT_SEE_ANY(FLOOR);
        return RFATAL();
    }
    _X = CAVE_ROOMS[0];
    if((_X = isINTBL(HERE, REST(CAVE_ROOMS, 1), _X, 1))) {
        
    } else if(isHERE(IN_LAIR, NE_CAVE, SE_CAVE)) {
        
    } else if(isVERB(V_DIG, V_DIG_UNDER)) {
        TELL(CANT, "do that here.", CR);
        return true;
    }
    return GROUND_F();
}

function NO_NEED() {
    TELL(DONT, "need to do that.", CR);
    return true;
}

function NOT_IN(_THING=PRSO) {
    THIS_IS_IT(_THING);
    TELL("You're not in ", THE(_THING), PERIOD);
    return true;
}

function NOT_ON(_THING=PRSO) {
    THIS_IS_IT(_THING);
    TELL("You're not on ", THE(_THING), PERIOD);
    return true;
}

function ALREADY_IN(_THING=PRSO) {
    THIS_IS_IT(_THING);
    TELL(ALREADY, "in ", THE(_THING), PERIOD);
    return true;
}

function ALREADY_ON(_THING=PRSO) {
    THIS_IS_IT(_THING);
    TELL(ALREADY, "on ", THE(_THING), PERIOD);
    return true;
}

function ALREADY_AT_TOP(_OBJ=PRSO) {
    ALREADY_AT("top", _OBJ);
    return true;
}

function ALREADY_AT_BOTTOM(_OBJ=PRSO) {
    ALREADY_AT("bottom", _OBJ);
    return true;
}

function ALREADY_AT(_STR, _OBJ=PRSO) {
    THIS_IS_IT(_OBJ);
    TELL(ALREADY, "at the ", _STR, " of ", THE(_OBJ), PERIOD);
    return true;
}

function CANT_SEE_MUCH() {
    PRINT("Little can be seen ");
    TELL("from here.", CR);
    return true;
}

/*function CANT_SEE_FROM_HERE(_THING=PRSO) {
    TELL(CANT, "see ", THE(_THING), " from here.", CR);
    return true;
}*/

function NOT_A(_STR) {
    TELL("You're an adventurer, not a ", _STR, PERIOD);
    return true;
}

function OPEN_CLOSED(_THING=PRSO, _VOWEL=null) {
    if(isIS(_THING, OPENED)) {
        if(isT(_VOWEL)) {
            TELL("n");
        }
        TELL(" open ");
    } else {
        TELL(" closed ");
    }
    TELL(D(_THING));
    return true;
}

function CANT_FROM_HERE() {
    TELL(IMPOSSIBLY, "do that");
    STANDING();
    return true;
}

function STANDING(_X) {
    if(!(isASSIGNED(_X))) {
        TELL(" from where you're ");
    }
    if(isEQUAL(LOC(PLAYER), SADDLE, PEW)) {
        TELL("sitt");
    } else {
        TELL(B("STAND"));
    }
    TELL("ing");
    if(!(isASSIGNED(_X))) {
        PRINT(PERIOD);
    }
    return true;
}

/*function ITS_EMPTY(_OBJ=PRSO) {
    TELL(CTHE(_OBJ));
    IS_ARE(_OBJ);
    TELL(B("EMPTY"), PERIOD);
    return true;
}*/

function IS_ARE(_THING=PRSO) {
    PRINTC(SP);
    if(isIS(_THING, PLURAL)) {
        TELL("are ");
        return true;
    }
    TELL("is ");
    return true;
}

function ISNT_ARENT(_THING=PRSO) {
    PRINTC(SP);
    if(isIS(_THING, PLURAL)) {
        TELL("are");
    } else {
        TELL("is");
    }
    TELL("n't");
    return true;
}

/*function WHICH_WAY(_STR) {
    TELL("[Which way do you want to go ", _STR, "?]", CR);
    return true;
}*/

function FIRMLY_ATTACHED(_THING, _TO, _STR=null) {
    if(!(_STR)) {
        THIS_IS_IT(_THING);
        TELL(CTHE(_THING));
        IS_ARE(_THING);
    } else {
        THIS_IS_IT(_TO);
        TELL(XTHE, _THING, SIS);
    }
    TELL(PICK_NEXT(FIRMS), "ly "
, PICK_NEXT(ATTACHES), STO, THE(_TO), PERIOD);
    return true;
}

function HERE_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE, V_SEARCH)) {
        V_LOOK();
        return true;
    } else if(isVERB(V_LOOK_BEHIND, V_LOOK_OUTSIDE)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isVERB(V_ENTER, V_WALK_TO, V_FIND)) {
        ALREADY_IN();
        return true;
    } else if(((_X = isCLIMBING_ON())
  ||  (_X = isCLIMBING_OFF()))) {
        V_WALK_AROUND();
        return true;
    } else {
        return false;
    }
}

var GLOBAL_HOLE = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "hole",
	FLAGS: [NODESC],
	SYNONYM: ["HOLE"],
	ACTION: GLOBAL_HOLE_F
});

function GLOBAL_HOLE_F() {
    if(isVERB(V_DIG, V_SDIG)) {
        WASTE_OF_TIME();
        return true;
    }
    TELL(CANT, "see any here.", CR);
    return true;
}

var SOUND_OBJ = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "sound",
	FLAGS: [NODESC],
	SYNONYM: ["SOUND", "SOUNDS", "NOISE", "NOISES"],
	ACTION: SOUND_F
});

function SOUND_F() {
    let _X;
    _X = GETP(HERE, "HEAR");
    if(isT(_X)) {
        if(isTHIS_PRSO()) {
            PERFORM(PRSA, _X, PRSI);
            return true;
        }
        PERFORM(PRSA, PRSO, _X);
        return true;
    } else if(((_X = isSEEING())
  ||  (_X = isTOUCHING()))) {
        IMPOSSIBLE();
        return true;
    } else {
        return false;
    }
}

var GCORNER = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "corner",
	FLAGS: [NODESC, SURFACE],
	SYNONYM: ["CORNER", "CORNERS"],
	ACTION: GCORNER_F
});

function GCORNER_F() {
    let _X;
    if(!(isIS(HERE, INDOORS))) {
        CANT_SEE_ANY(GCORNER);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if((_X = isPUTTING())) {
            PERFORM("DROP", PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_LOOK_INSIDE, V_LOOK_ON
, V_SEARCH, V_LOOK_BEHIND, V_LOOK_UNDER)) {
        V_LOOK();
        return true;
    } else if((_X = isENTERING())) {
        TELL(ALREADY, "close enough to ", THEO, PERIOD);
        return true;
    } else if((_X = isEXITING())) {
        V_WALK_AROUND();
        return true;
    } else {
        return false;
    }
}

var RIGHT = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that direction",
	FLAGS: [NODESC, NOARTICLE],
	SYNONYM: ["RIGHT", "CLOCKWISE", "FORWARD", "AHEAD"],
	ACTION: RL_F
});

var LEFT = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that direction",
	FLAGS: [NODESC, NOARTICLE],
	SYNONYM: ["LEFT", "COUNTERCL", "BACKWARD", "BACKWARDS", "BACK"],
	ACTION: RL_F
});

function RL_F() {
    let _X;
    if(isTHIS_PRSI()) {
        return false;
    } else if(((_X = isCLIMBING_ON())
  ||  (_X = isCLIMBING_OFF()))) {
        V_WALK_AROUND();
        return true;
    } else {
        return false;
    }
}

var GAME = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "this game",
	FLAGS: [NODESC, NOARTICLE],
	SYNONYM: ["ZORK", "GAME", "STORY"],
	ACTION: GAME_F
});

function GAME_F() {
    if(isVERB(V_TOUCH, V_READ, V_EXAMINE)) {
        TELL("[That's what you're doing.]", CR);
        return RFATAL();
    }
    USELESS(GAME);
    return RFATAL();
}

const YES_INBUF_LENGTH = 14;
const YES_INBUF = ITABLE(YES_INBUF_LENGTH, [BYTE], 0);

const YES_LEXV_LENGTH = 10;
const YES_LEXV = ITABLE(YES_LEXV_LENGTH, [BYTE], 0);

function READ_YES_LEXV(stream) {
    let _KEY;
    COPYT(YES_LEXV, 0, YES_LEXV_LENGTH);
    YES_LEXV[0] = 2;
    COPYT(YES_INBUF, 0, YES_INBUF_LENGTH);
    YES_INBUF[0] = (YES_INBUF_LENGTH - 2);
    const m_loop = loop_stream();
    m_loop.loadPreaction(() => {
        COLOR(INCOLOR, BGND);
        READ(YES_INBUF, YES_LEXV, m_loop);
    });
    m_loop.loadPostaction(_KEY => {
        if(isEQUAL(_KEY, EOL, LF)) {
            COLOR(FORE, BGND);
            m_loop.finish();
            return;
        }
        m_loop.again();
    });
    m_loop.onFinish(stream.post);
    /*while(true) {
        COLOR(INCOLOR, BGND);
        _KEY = READ(YES_INBUF, YES_LEXV);
        if(isEQUAL(_KEY, EOL, LF)) {
            COLOR(FORE, BGND);
            return false;
        }
    }*/
}

function isYES_WORD(_WORD) {
    if(!(_WORD)) {
        return false;
    } else if(isEQUAL(_WORD, "Y", "YES", "YUP")) {
        return true;
    } else if(isEQUAL(_WORD, "OKAY", "OK", "SURE")) {
        return true;
    } else {
        return false;
    }
}

function isNO_WORD(_WORD) {
    if(!(_WORD)) {
        return false;
    } else if(isEQUAL(_WORD, "N", "NO", "NOPE")) {
        return true;
    } else if(isEQUAL(_WORD, "NEGATIVE", "NAY")) {
        return true;
    } else {
        return false;
    }
}

function isYES(after) {
    let _WORD, _TBL;
    COLOR(FORE, BGND);
    CRLF();
    const loop = loop_stream();
    loop.loadPreaction(() => {
        TELL(CR, "[Please type YES or NO.] >");
        READ_YES_LEXV(loop);
    });
    loop.loadPostaction(() => {
        if(!(YES_LEXV[P_LEXWORDS])) {
            loop.again();
            return;
        }
        _WORD = YES_LEXV[P_LEXSTART];
        if(!(_WORD)) {
            loop.again();
            return;
        } else if(isYES_WORD(_WORD)) {
            loop.finish(true);
            return;
        } else if(isNO_WORD(_WORD)) {
            loop.finish(false);
            return;
        }
        loop.again();
    });
    loop.onFinish(after.post);
    /*while(true) {
        TELL(CR, "[Please type YES or NO.] >");
        READ_YES_LEXV();
        if(!(YES_LEXV[P_LEXWORDS])) {
            continue;
        }
        _WORD = YES_LEXV[P_LEXSTART];
        if(!(_WORD)) {
            continue;
        } else if(isYES_WORD(_WORD)) {
            return true;
        } else if(isNO_WORD(_WORD)) {
            return false;
        }
    }*/
}

"INITVARS must be called first!"

var VT100/*FLAG*/ = null;

function STARTUP(afterStartup) {
    let _X, _TBL, _CNT;
    //COPYT(VOCAB, VOCAB2 /*(VOCAB[0] + 2)*/);    
    let i = 0; for (const key in VOCAB) VOCAB2[key] = VOCAB[key];/*"Init VOCAB2."*/
    DEFAULT_SOFTS();
    _TBL = MACHINE_COLORS[HOST];
    if(isT(_TBL)) {
        _TBL = _TBL[1];
        BGND = _TBL[0];
        FORE = _TBL[1];
        INCOLOR = _TBL[2];
        GCOLOR = _TBL[3];
    }
    if(isEQUAL(HOST, DEC_20)) {
        CLEAR(-1);
        TELL(CR, "Is this a VT220?");
        if(!(isYES())) {
            VT100 = true;
            SETUP_APPLE_MODE();
        }
    }
    COLOR(FORE, BGND);
    CLEAR(-1);
    CRLF();
    PRINT("Copyright (C)1987 Infocom, Inc. All rights reserved.");
    CRLF();
    PRINT("|Do you want to ");
    TELL("begin a new game, restore a saved game, or quit?", CR, CR);
    const m_loop = loop_stream();
    m_loop.loadPreaction(() => {
        COLOR(FORE, BGND);
        TELL("[Type BEGIN, RESTORE or QUIT.] >");
        READ_YES_LEXV(m_loop);
    });
    m_loop.loadPostaction(() => {
        if(!(YES_LEXV[P_LEXWORDS])) {
            m_loop.again();
            return;
        }
        _X = YES_LEXV[P_LEXSTART];
        if(!(_X)) {
            m_loop.again();
            return;
        } else if(isEQUAL(_X, "BEGIN", "B", "RESTART")) {
            PROLOGUE(lazy(() => {
                CLEAR(-1);
                afterStartup.post();
            }));
            m_loop.finish();
            return;
        } else if(isEQUAL(_X, "RESTORE")) {
            V_RESTORE(() => {
                CRLF();
                DO_MAIN_LOOP();
            });
            m_loop.finish();
            return;
        } else if(isEQUAL(_X, "Q", "QUIT")) {
            CRLF();
            QUIT();
            m_loop.finish();
            return;
        }
        m_loop.again();
    });
    /*while(true) {
        COLOR(FORE, BGND);
        TELL("[Type BEGIN, RESTORE or QUIT.] >");
        READ_YES_LEXV();
        if(!(YES_LEXV[P_LEXWORDS])) {
            continue;
        }
        _X = YES_LEXV[P_LEXSTART];
        if(!(_X)) {
            continue;
        } else if(isEQUAL(_X, "BEGIN", "B", "RESTART")) {
            PROLOGUE();
            CLEAR(-1);
            return true;
        } else if(isEQUAL(_X, "RESTORE")) {
            V_RESTORE();
            CRLF();
        } else if(isEQUAL(_X, "Q", "QUIT")) {
            CRLF();
            QUIT();
            return false;
        }
    }*/
}

function SHOW_MENU_ITEM(_LINE, _INV=0) {
    let _X;
    CENTER((_LINE + 7), 35);
    COLOR(GCOLOR, BGND);
    HLIGHT(H_NORMAL);
    if(isT(_INV)) {
        if((isT(isCOLORS)
  &&  !(isEQUAL(FORE, GCOLOR)))) {
            COLOR(FORE, BGND);
        } else {
            HLIGHT(H_INVERSE);
        }
    }
    TELL(MENU_LIST[_LINE]);
    return false;
}

function SETUP_CHARACTER(after) {
    let _LAST=0, _X, _STAT;
    DBOX[0] = SP;
    COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
    const outer_loop = loop_stream();
    outer_loop.loadPreaction(() => {
        COLOR(FORE, BGND);
        CLEAR(-1);
        SPLIT(14);
        windows[0].line_counter = -999;
        if(isIS(PLAYER, NAMED)) {
            SHOW_RANK(WIDTH);
        }
        TO_TOP_WINDOW();
        COLOR(FORE, BGND);
        CENTER(5, 15);
        TELL("Character Setup");
        _STAT = 0;
        while(true) {
            SHOW_MENU_ITEM(_STAT);
            if(++_STAT > 4) {
                break;
            }
        }
        USE_ARROWS();
        PRINT("highlight your selection.||Type [RETURN] to continue. >");
        _STAT = _LAST;
        const inner_loop = loop_stream();
        inner_loop.loadPreaction(() => {
            TO_TOP_WINDOW();
            SHOW_MENU_ITEM(_STAT, 1);
            TO_BOTTOM_WINDOW();
            DO_INPUT(inner_loop);
        });
        inner_loop.loadPostaction(_X => {
            if(isEQUAL(_X, DOWN_ARROW, SP, UP_ARROW)) {
                TO_TOP_WINDOW();
                SHOW_MENU_ITEM(_STAT);
                if(isEQUAL(_X, UP_ARROW)) {
                    if(--_STAT < 0) {
                        _STAT = 4;
                    }
                    inner_loop.again();
                    return;
                }
                if(++_STAT > 4) {
                    _STAT = 0;
                }
                inner_loop.again();
                return ;
            } else if(isEQUAL(_X, EOL, LF)) {
                if(!(_STAT)) {
                    QUICK_SETUP();
                    outer_loop.post(_STAT);
                    return;
                } else if(isEQUAL(_STAT, 1)) {
                    const char_lazy = lazy();
                    PICK_A_CHAR(char_lazy);
                    char_lazy.setFn(() => {outer_loop.post(_STAT);});
                    return;
                } else if(isEQUAL(_STAT, 2)) {
                    const roll_lazy = lazy();
                    ROLL_YOUR_OWN(roll_lazy);
                    roll_lazy.setFn(() => {outer_loop.post(_STAT)});
                    return;
                } else if(isEQUAL(_STAT, 3)) {
                    const manual_lazy = lazy();
                    MANUAL(manual_lazy);
                    manual_lazy.setFn(() => {
                        CRLF();
                        if(isT(POTENTIAL)) {
                            TELL(CR, "Your unused Potential has been evenly distributed.", CR);
                        }
                        outer_loop.post(_STAT);
                    });
                    
                    //outer_loop.post(_STAT);
                    return;
                }
                CRLF();
                CRLF();
                const lazy_quit = lazy();
                V_QUIT(lazy_quit);
                lazy_quit.setFn(() => {
                    TO_TOP_WINDOW();
                    SHOW_MENU_ITEM(_STAT);
                    USE_ARROWS();
                    PRINT("highlight your selection.||Type [RETURN] to continue. >");
                    _STAT = 0;
                    inner_loop.again();
                });
                return;
            }
            SOUND(2);
            outer_loop.again();
        });
    });
    outer_loop.loadPostaction(_STAT => {
        TO_BOTTOM_WINDOW();
        CRLF();
        if(!(_STAT)) {
            outer_loop.finish();
            return;
        }
        _LAST = _STAT;
        PRINT("|Are you sure ");
        TELL("these are the attributes you want?");
        const lazy_isYES_1 = lazy();
        isYES(lazy_isYES_1);
        lazy_isYES_1.setFn(isYES1 => {
            if (!isYES1) {
                outer_loop.again();
            } else {
                const l_sex = lazy(),
                    l_name = lazy();
                GET_SEX(l_sex);
                l_sex.setFn(() => {
                    GET_NAME(l_name);
                    l_name.setFn(() => {
                        MAKE(PLAYER, NAMED);
                        SHOW_RANK(WIDTH);
                        PRINT("|Are you sure ");
                        PRINT_TABLE(CHARNAME);
                        TELL(" is the character you want?");
                        const lazy_isYES_2 = lazy();
                        isYES(lazy_isYES_2);
                        lazy_isYES_2.setFn(isYES2 => {
                            if (isYES2) {
                                outer_loop.finish(_STAT);
                            } else {
                                outer_loop.again();
                            }
                        });
                    });
                });
            }
        });
        return;
    });
    outer_loop.onFinish(_STAT => {
        SAY_STAT = true;
        COPYT(STATS, MAXSTATS, (NSTATS));

        const lazy_fn = () => {
            CHECKSUM = 0;
            _STAT = ENDURANCE;
            while(true) {
                CHECKSUM = (CHECKSUM + STATS[_STAT]);
                if(++_STAT > LUCK) {
                    break;
                }
            }
            if(CHECKSUM > (INIT_POTENTIAL + 6)) {
                CHEATER();
                return false;
            }
        
            TELL(CR, "Press any key to begin the story. >");
            INPUT(() => after.post());
        };

        if(isT(_STAT)) {
            PRINT("|Do you want to ");
            TELL("save this character before you proceed?");
            const lazy_isYES = lazy();
            isYES(lazy_isYES);
            lazy_isYES.setFn(is => {
                if(is) {
                    OOPS_INBUF[1] = 0;
                    _X = SAVE();
                    if(!(_X)) {
                        FAILED("SAVE");
                    } else if(isEQUAL(_X, 1)) {
                        COMPLETED("SAVE");
                    } else {
                        INITVARS();
                        return false;
                    }
                }
                lazy_fn();
            });
            return;
        }
        lazy_fn();
        
    });
}

function QUICK_SETUP() {
    COPYT(CSTATS[0], STATS, 12 / 2); // CADA STAT DE CSTATS son 2 bytes
    COPYT(DEFAULT_NAME, CHARNAME, DEFAULT_NAME_LENGTH);
    MAKE(PLAYER, NAMED);
    UNMAKE(PLAYER, FEMALE);
    SHOW_RANK(WIDTH);
    return false;
}

function SETUP_TOP(_NOCLEAR) {
    let _STAT=0;
    CLEAR(S_WINDOW);
    STATS[EXPERIENCE] = BEGINNERS_EXPERIENCE;
    if(isIS(PLAYER, NAMED)) {
        SHOW_RANK(WIDTH);
    }
    if(!(VT220)) {
        APPLE_BARS();
    } else {
        STATBARS(3, (Math.floor((WIDTH - BARWIDTH) / 2) - 1), LUCK);
    }
    IN_DBOX = SHOWING_STATS;
    return false;
}

function APPLE_BARS(_Y, _X) {
    let _STAT=0;
    if(!(isASSIGNED(_Y))) {
        _Y = 4;
    }
    BARY = _Y;
    if(!(isASSIGNED(_X))) {
        _X = ((WIDTH - 18) / 2);
    }
    BARX = _X;
    TO_TOP_WINDOW();
    CURSET(3, (BARX - 1));
    HLIGHT(H_INVERSE);
    PRINTT(DBOX, APPBOX, 8);
    CURSET(BARY, BARX);
    PRINTT(BAR_LABELS, LABEL_WIDTH, ARMOR_CLASS);
    while(true) {
        BAR_NUMBER(_STAT, STATS[_STAT]);
        if(++_STAT > LUCK) {
            break;
        }
    }
    TO_BOTTOM_WINDOW();
    return false;
}

function PICK_A_CHAR(after) {
    let _CHAR=0, _LMARGIN, _NX, _NY, _NTBL, _X;
    CLEAR(S_WINDOW);
    if(isIS(PLAYER, NAMED)) {
        SHOW_RANK(WIDTH);
    }
    _X = BARWIDTH;
    if(!(VT220)) {
        _X = APPBOX;
    }
    _NX = ((WIDTH - (BARMAR + _X)) / 2);
    _LMARGIN = (_NX - 1);
    IN_DBOX = SHOWING_STATS;
    TO_TOP_WINDOW();
    if(!(VT220)) {
        COLOR(FORE, BGND);
        DO_CURSET(3, _LMARGIN);
        HLIGHT(H_INVERSE);
        PRINTT(DBOX, (CNAME_LEN + 2), 8);
    }
    while(true) {
        DO_CURSET((_CHAR + 4), _NX);
        TELL(CNAMES[_CHAR]);
        if(++_CHAR > 5) {
            break;
        }
    }
    COPYT(CSTATS[0], STATS, 12);
    _X = ((_LMARGIN + BARMAR) + 1);
    if(!(VT220)) {
        APPLE_BARS(4, _X);
    } else {
        STATBARS(4, _X, LUCK);
    }
    USE_ARROWS();
    TELL("select the character you want");
    PRESS_RETURN();
    TO_TOP_WINDOW();
    _CHAR = 0;
    const outer_loop = loop_stream(),
        inner_loop = loop_stream();
    outer_loop.loadPreaction(() => {
        _NY = (_CHAR + 4);
        _NTBL = CNAMES[_CHAR];
        DO_CURSET(_NY, _NX);
        COLOR(FORE, BGND);
        if(!(VT220)) {
            HLIGHT(H_NORMAL);
        } else if((!(isCOLORS)
                ||  isEQUAL(FORE, GCOLOR))) {
            HLIGHT(H_INVERSE);
        }
        HLIGHT(H_MONO);
        TELL(_NTBL);
        COPYT(CSTATS[_CHAR], STATS, 12);
        HLIGHT(H_NORMAL);
        _X = ENDURANCE;
        while(true) {
            APPLY(STAT_ROUTINE, _X, STATS[_X]);
            if(++_X > LUCK) {
                break;
            }
        }
        TO_BOTTOM_WINDOW();
        inner_loop.loadPreaction(() => {
            DO_INPUT(inner_loop);
        });
        inner_loop.loadPostaction(_X => {
            if(isEQUAL(_X, EOL, LF)) {
                SETUP_TOP();
                after.post(false);return false;
            } else if(isEQUAL(_X, DOWN_ARROW, SP, UP_ARROW)) {
                TO_TOP_WINDOW();
                DO_CURSET(_NY, _NX);
                COLOR(FORE, BGND);
                if(!(VT220)) {
                    HLIGHT(H_INVERSE);
                } else {
                    HLIGHT(H_NORMAL);
                    if(isT(isCOLORS)) {
                        COLOR(GCOLOR, BGND);
                    }
                }
                HLIGHT(H_MONO);
                TELL(_NTBL);
                if(!(isEQUAL(_X, UP_ARROW))) {
                    if(++_CHAR > 5) {
                        _CHAR = 0;
                    }
                    outer_loop.again();return;
                }
                if(--_CHAR < 0) {
                    _CHAR = 5;
                }
                outer_loop.again();return;
            }
            SOUND(S_BOOP);
            inner_loop.again();
        });
    });
}

function USE_ARROWS() {
    let _X;
    TO_BOTTOM_WINDOW();
    TELL(CR, CR, "Use the ");
    if(isEQUAL(HOST, MACINTOSH)) {
        TELL("[SPACE] bar to ");
        return false;
    } else if(isT(VT220)) {
        _X = FONT(F_NEWFONT);
        PRINTC(92);
    } else if(isEQUAL(HOST, IBM)) {
        PRINTC(24);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _X = FONT(F_NEWFONT);
        PRINTC(75);
    } else {
        TELL("UP");
    }
    _X = FONT(F_DEFAULT);
    TELL(AND);
    if(isT(VT220)) {
        _X = FONT(F_NEWFONT);
        PRINTC(93);
    } else if(isEQUAL(HOST, IBM)) {
        PRINTC(25);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _X = FONT(F_NEWFONT);
        PRINTC(74);
    } else {
        TELL("DOWN arrow");
    }
    _X = FONT(F_DEFAULT);
    TELL(" keys to ");
    return false;
}

function PRESS_RETURN() {
    TELL(PERIOD, CR, "Press [RETURN] when you're finished. >");
    return true;
}

function MANUAL(after) {
    let _A, _OA, _X, _NX, _Y, _Z, _BX, _OBX, _OP, _KEY, _TBL;
    _A = ENDURANCE;
    while(true) {
        STATS[_A] = 1;
        if(++_A > ARMOR_CLASS) {
            break;
        }
    }
    SETUP_TOP();
    POTENTIAL = INIT_POTENTIAL;
    TO_TOP_WINDOW();
    _Y = (BARY + 7);
    if(!(VT220)) {
        CURSET(_Y, (BARX - 1));
        HLIGHT(H_INVERSE);
        PRINTT(DBOX, APPBOX, 2);
        CURSET(_Y, BARX);
        TELL("   Potential");
        BAR_NUMBER(7, POTENTIAL);
    } else {
        DO_CURSET((BARY + ARMOR_CLASS), BARX);
        PRINTT(DBOX, BARWIDTH);
        DO_CURSET(_Y, BARX);
        COLOR(FORE, BGND);
        TELL("   Potential");
        RAWBAR(7, POTENTIAL);
    }
    USE_ARROWS();
    TELL("select an attribute. Then use the ");
    if(isEQUAL(HOST, MACINTOSH)) {
        TELL("+");
    } else if(isT(VT220)) {
        _Z = FONT(F_NEWFONT);
        PRINTC(33);
    } else if(isEQUAL(HOST, IBM)) {
        PRINTC(27);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _Z = FONT(F_NEWFONT);
        PRINTC(72);
    } else {
        TELL("LEFT");
    }
    _Z = FONT(F_DEFAULT);
    TELL(AND);
    if(isEQUAL(HOST, MACINTOSH)) {
        TELL("-");
    } else if(isT(VT220)) {
        _Z = FONT(F_NEWFONT);
        PRINTC(34);
    } else if(isEQUAL(HOST, IBM)) {
        PRINTC(26);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _Z = FONT(F_NEWFONT);
        PRINTC(85);
    } else {
        TELL("RIGHT arrow");
    }
    _Z = FONT(F_DEFAULT);
    TELL(" keys to adjust that attribute");
    PRESS_RETURN();
    _OP = -1;
    _OA = -1;
    _A = ENDURANCE;

    const loop = loop_stream();

    loop.loadPreaction(() => {
        TO_TOP_WINDOW();
        _TBL = BAR_LABELS.slice(_A * LABEL_WIDTH);//REST(BAR_LABELS, (_A * LABEL_WIDTH));
        if(!(isEQUAL(_A, _OA))) {
            _OA = _A;
            DO_CURSET((BARY + _A), BARX);
            COLOR(FORE, BGND);
            if(isT(VT220)) {
                HLIGHT(H_INVERSE);
            }
            PRINTT(_TBL, LABEL_WIDTH);
            HLIGHT(H_NORMAL);
            HLIGHT(H_MONO);
            COLOR(GCOLOR, BGND);
        }
        if(!(isEQUAL(_OP, POTENTIAL))) {
            APPLY(STAT_ROUTINE, 7, POTENTIAL);
            _OP = POTENTIAL;
        }
        TO_BOTTOM_WINDOW();
        DO_INPUT(loop);
    });

    loop.loadPostaction(_KEY => {
        if(isEQUAL(_KEY, EOL, LF)) {
            loop.finish();return;
        }
        TO_TOP_WINDOW();
        if(isEQUAL(_KEY, UP_ARROW, DOWN_ARROW, SP)) {
            DO_CURSET((BARY + _A), BARX);
            COLOR(FORE, BGND);
            if(!(VT220)) {
                HLIGHT(H_INVERSE);
            }
            PRINTT(_TBL, LABEL_WIDTH);
            HLIGHT(H_NORMAL);
            HLIGHT(H_MONO);
            COLOR(GCOLOR, BGND);
            if(isEQUAL(_KEY, UP_ARROW)) {
                if(--_A < ENDURANCE) {
                    _A = LUCK;
                }
                loop.again();return;
            }
            if(++_A > LUCK) {
                _A = ENDURANCE;
            }
            loop.again();return;
        } else if((isEQUAL(_KEY, LEFT_ARROW, '\-'.charCodeAt(0), '\_'.charCodeAt(0))
                    &&  !(isEQUAL(POTENTIAL, INIT_POTENTIAL)))) {
            _X = STATS[_A];
            if(_X > 1) {
                ++POTENTIAL
                _NX = (_X - 1);
                STATS[_A] = _NX;
                APPLY(STAT_ROUTINE, _A, _NX);
                loop.again();return;
            }
        } else if(!(POTENTIAL)) {
            
        } else if(isEQUAL(_KEY, RIGHT_ARROW, '\+'.charCodeAt(0), '\='.charCodeAt(0))) {
            --POTENTIAL
            _X = STATS[_A];
            _NX = (_X + 1);
            STATS[_A] = _NX;
            APPLY(STAT_ROUTINE, _A, _NX);
            loop.again();return;
        }
        SOUND(2);
        loop.again();
    });

    loop.onFinish(() => {
        TO_TOP_WINDOW();
        FUDGE_STATS();
        COPYT(STATS, MAXSTATS, (NSTATS));
        _A = ENDURANCE;
        while(true) {
            APPLY(STAT_ROUTINE, _A, STATS[_A]);
            if(++_A > LUCK) {
                break;
            }
        }
        if(!(VT220)) {
            DO_CURSET(_Y, (BARX - 1));
            PRINTT(DBOX, 18, 2);
            HLIGHT(H_INVERSE);
        } else {
            DO_CURSET(_Y, BARX);
            HLIGHT(H_NORMAL);
            HLIGHT(H_MONO);
            PRINTT(DBOX, BARWIDTH);
            COLOR(FORE, BGND);
        }
        DO_CURSET(BARY, BARX);
        PRINTT(BAR_LABELS, LABEL_WIDTH, ARMOR_CLASS);
        TO_BOTTOM_WINDOW();
        after.post(false);
    });
}

function ROLL_YOUR_OWN(after) {
    let _STAT, _XSTAT, _OLD, _DELTA, _STAT_ORDER, _X;
    _STAT = ENDURANCE;
    while(true) {
        STATS[_STAT] = 1;
        if(++_STAT > ARMOR_CLASS) {
            break;
        }
    }
    SETUP_TOP();
    TO_BOTTOM_WINDOW();
    TELL(CR, CR
, "A new set of attributes will appear each time you press the [SPACE] bar.", CR, CR, "Press [RETURN] to select a set that you like. >");

    AUX_TABLE[0] = 7;
    _STAT_ORDER = REST(AUX_TABLE, 4);
    _STAT = ENDURANCE;

    while(true) {
        _STAT_ORDER[_STAT] = _STAT;
        if(++_STAT > LUCK) {
            break;
        }
    }
    _STAT_ORDER = REST(AUX_TABLE, 20);    /*"Set up random list here."*/
    const outer_loop = loop_stream(),
        inner_loop = loop_stream();
    outer_loop.loadPreaction(() => {
        TO_TOP_WINDOW();
        AUX_TABLE[1] = 0;        /*"Reset for PICK-ONE."*/
        _STAT = ENDURANCE;
        while(true) {
            _STAT_ORDER[_STAT] = PICK_ONE(AUX_TABLE);
            if(++_STAT > LUCK) {
                break;
            }
        }
        POTENTIAL = (INIT_POTENTIAL + 6);
        _STAT = ENDURANCE;
        while(true) {
            _XSTAT = _STAT_ORDER[_STAT];
            _DELTA = 1;
            if(isT(POTENTIAL)) {
                _DELTA = RANDOM((AVERAGE + 1));
                --_DELTA
                _DELTA = (AVERAGE + (SPREAD - _DELTA));
                if(_DELTA > POTENTIAL) {
                    _DELTA = POTENTIAL;
                }
                POTENTIAL = (POTENTIAL - _DELTA);
            }
            STATS[_XSTAT] = _DELTA;
            if(++_STAT > LUCK) {
                break;
            }
        }
        FUDGE_STATS();
        _STAT = ENDURANCE;
        while(true) {
            APPLY(STAT_ROUTINE, _STAT, STATS[_STAT]);
            if(++_STAT > LUCK) {
                break;
            }
        }
        TO_BOTTOM_WINDOW();
        inner_loop.loadPreaction(() => {
            INPUT(inner_loop.post);
        });
        inner_loop.loadPostaction(_X => {
            if(isEQUAL(_X, EOL, LF)) {
                after.post(false);return false;
            } else if(isEQUAL(_X, SP)) {
                outer_loop.again();return;
            }
            SOUND(S_BOOP);
            inner_loop.again();
        });
    });
}

function FUDGE_STATS() {
    let _TOTAL, _STAT = 0;
    if(!(POTENTIAL)) {
        return false;
    }
    _TOTAL = POTENTIAL;
    while(true) {
        STATS[_STAT] = (STATS[_STAT] + 1);
        if(--_TOTAL < 1) {
            return false;
        } else if(++_STAT > LUCK) {
            _STAT = ENDURANCE;
        }
    }
}

function GET_NAME(after) {
    let _CNT, _PTR, _APO, _DASH, _BAD, _ANY, _CAP, _SPACE, _LEN, _X, _CHAR;
    if(!(isIS(PLAYER, NAMED))) {
        COPYT(DEFAULT_NAME, CHARNAME, DEFAULT_NAME_LENGTH);
    }
    TELL(CR
, `Finally, you must select a Name for your character.||By what Name shall your character be known?`);
    const outer_loop = loop_stream(),
        inner_loop = loop_stream();
    outer_loop.loadPreaction(() => {
        COPYT(P_INBUF, 0, P_INBUF_LENGTH);
        P_INBUF[0] = (P_INBUF_LENGTH - 2);
        TELL(CR, CR, "[The default is \"");
        PRINT_TABLE(CHARNAME);
        TELL(".\"] >");
        inner_loop.loadPreaction(() => {
            COLOR(INCOLOR, BGND);
            READ(P_INBUF, 0, inner_loop);
        });
        inner_loop.loadPostaction(_X => {
            if(isEQUAL(_X, EOL, LF)) {
                outer_loop.post();return;
            }
            SOUND(2);
            inner_loop.again();
        });
    });
    outer_loop.loadPostaction(() => {
        COLOR(FORE, BGND);
        _LEN = P_INBUF[1];
        if(!(_LEN)) {
            outer_loop.finish();return;
        }
        _X = (_LEN + 1);
        _PTR = 2;
        _APO = 0;
        _DASH = 0;
        _BAD = 0;
        _ANY = 0;
        while(true) {
            _CHAR = P_INBUF[_PTR];
            _CHAR = String.fromCharCode(_CHAR).toLowerCase().charCodeAt(0);
            if((_CHAR > ('\a'.charCodeAt(0) - 1)
            &&  _CHAR < ('\z'.charCodeAt(0) + 1))) {
                ++_ANY
            } else if(isEQUAL(_CHAR, SP)) {
                
            } else if(isEQUAL(_CHAR, '\''.charCodeAt(0))) {
                ++_APO
            } else if(isEQUAL(_CHAR, '\-'.charCodeAt(0))) {
                ++_DASH
            } else {
                ++_BAD
                break;
            }
            if(++_PTR > _X) {
                break;
            }
        }
        if((!(_ANY)
        ||  isT(_BAD)
        ||  _APO > 1
        ||  _DASH > 1)) {
            BAD_NAME("silly");
            outer_loop.again();return;
        } else if(_LEN > CHARNAME_LENGTH) {
            BAD_NAME("too long");
            outer_loop.again();return;
        }
        COPYT(CHARNAME, 0, (CHARNAME_LENGTH + 1));
        _CNT = 0;
        _PTR = 2;
        _CAP = 1;
        _SPACE = 0;
        _ANY = 0;
        while(true) {
            _CHAR = P_INBUF[_PTR];
            if(isEQUAL(_CHAR, SP)) {
                ++_CAP
                ++_SPACE
                if((isT(_ANY)
                &&  isEQUAL(_SPACE, 1))) {
                    ++_CNT
                    CHARNAME[_CNT] = SP;
                }
            } else {
                ++_ANY
                _SPACE = 0;
                if(isEQUAL(_CHAR, '\''.charCodeAt(0)
                , '\-'.charCodeAt(0))) {
                    ++_CAP
                } else if(isT(_CAP)) {
                    _CAP = 0;
                    _CHAR = String.fromCharCode(_CHAR).toUpperCase().charCodeAt(0);
                } else
                    _CHAR = String.fromCharCode(_CHAR).toLowerCase().charCodeAt(0);
                ++_CNT
                CHARNAME[_CNT] = _CHAR;
            }
            if(++_PTR > _X) {
                break;
            }
        }
        CHARNAME[0] = _CNT;
        TELL(CR, "Is \"");
        PRINT_TABLE(CHARNAME);
        TELL("\" correct?");
        const l_yes = lazy();
        isYES(l_yes);
        l_yes.setFn(yes => {
            if (yes)
                outer_loop.finish();
            else {
                BAD_NAME("cast into the void");
                outer_loop.again();
            } 
        });
    });
    outer_loop.onFinish(() => {
        MAKE(PLAYER, NAMED);
        SHOW_RANK(WIDTH);
        after.post(false);
    });
    /*while(true) {
        COPYT(P_INBUF, 0, P_INBUF_LENGTH);
        P_INBUF[0] = (P_INBUF_LENGTH - 2);
        TELL(CR, CR, "[The default is \"");
        PRINT_TABLE(CHARNAME);
        TELL(".\"] >");
        while(true) {
            COLOR(INCOLOR, BGND);
            _X = READ(P_INBUF, 0);
            if(isEQUAL(_X, EOL, LF)) {
                break;
            }
            SOUND(2);
        }
        COLOR(FORE, BGND);
        _LEN = P_INBUF[1];
        if(!(_LEN)) {
            break;
        }
        _X = (_LEN + 1);
        _PTR = 2;
        _APO = 0;
        _DASH = 0;
        _BAD = 0;
        _ANY = 0;
        while(true) {
            _CHAR = P_INBUF[_PTR];
            if((_CHAR > ('\a'.charCodeAt(0) - 1)
            &&  _CHAR < ('\z'.charCodeAt(0) + 1))) {
                ++_ANY
            } else if(isEQUAL(_CHAR, SP)) {
                
            } else if(isEQUAL(_CHAR, '\''.charCodeAt(0))) {
                ++_APO
            } else if(isEQUAL(_CHAR, '\-'.charCodeAt(0))) {
                ++_DASH
            } else {
                ++_BAD
                break;
            }
            if(++_PTR > _X) {
                break;
            }
        }
        if((!(_ANY)
        ||  isT(_BAD)
        ||  _APO > 1
        ||  _DASH > 1)) {
            BAD_NAME("silly");
            continue;
        } else if(_LEN > CHARNAME_LENGTH) {
            BAD_NAME("too long");
            continue;
        }
        COPYT(CHARNAME, 0, (CHARNAME_LENGTH + 1));
        _CNT = 0;
        _PTR = 2;
        _CAP = 1;
        _SPACE = 0;
        _ANY = 0;
        while(true) {
            _CHAR = P_INBUF[_PTR];
            if(isEQUAL(_CHAR, SP)) {
                ++_CAP
                ++_SPACE
                if((isT(_ANY)
                &&  isEQUAL(_SPACE, 1))) {
                    ++_CNT
                    CHARNAME[_CNT] = SP;
                }
            } else {
                ++_ANY
                _SPACE = 0;
                if(isEQUAL(_CHAR, '\''.charCodeAt(0)
                , '\-'.charCodeAt(0))) {
                    ++_CAP
                } else if(isT(_CAP)) {
                    _CAP = 0;
                    _CHAR = (_CHAR - SP);
                }
                ++_CNT
                CHARNAME[_CNT] = _CHAR;
            }
            if(++_PTR > _X) {
                break;
            }
        }
        CHARNAME[0] = _CNT;
        TELL(CR, "Is \"");
        PRINT_TABLE(CHARNAME);
        TELL("\" correct?");
        if(isYES()) {
            break;
        }
        BAD_NAME("cast into the void");
    }
    MAKE(PLAYER, NAMED);
    SHOW_RANK(WIDTH);
    return false;*/
}

function BAD_NAME(_STR) {
    TELL(CR, "That name is ", _STR
, ". Please supply another.");
    return false;
}

function GET_SEX(after) {
    let _WORD;
    TELL(CR, "Shall your character be male or female?");
    const loop = loop_stream();
    loop.loadPreaction(() => {
        TELL(CR, CR, "[The default is ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("FE");
        }
        TELL("MALE.] >");
        READ_YES_LEXV(loop);
    });
    loop.loadPostaction(() => {
        if(!(YES_LEXV[P_LEXWORDS])) {
            after.post(true);return true;
        }
        _WORD = YES_LEXV[P_LEXSTART];
        if(isEQUAL(_WORD, "M", "MALE", "MAN")) {
            after.post(false);return false;
        } else if(isEQUAL(_WORD, "F", "FEMALE", "WOMAN")) {
            MAKE(PLAYER, FEMALE);
            after.post(false);return false;
        }
        TELL(CR, "[Please type MALE or FEMALE.]");
        loop.again();
    });
}

var HELLO_OBJECT = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that",
	FLAGS: [NODESC, NOARTICLE],
	SYNONYM: ["HELLO", "GOODBYE", "HI", "BYE"],
	ACTION: WAY_TO_TALK
});

function WAY_TO_TALK() {
    PCLEAR();
    if(isEQUAL(HERE, LOC(RIDDLE))) {
        PRINT("A hollow voice says, \"Fool!\"");
        CRLF();
        return true;
    }
    SEE_MANUAL("address characters");
    return true;
}

function NOT_AVAILABLE() {
    NYMPH_APPEARS();
    TELL("Sorry, that feature isn't available. Consult your ");
    ITALICIZE("Beyond Zork");
    TELL(" manual for more information");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

function USELESS(_THING, _STRING) {
    NYMPH_APPEARS();
    TELL(DONT, "need to refer to ");
    if(isASSIGNED(_STRING)) {
        TELL(LTHE, _THING);
    } else if(isASSIGNED(_THING)) {
        TELL(THE(_THING));
    } else {
        PRINTD(PSEUDO_OBJECT);
    }
    TO_COMPLETE();
    return true;
}

function TO_COMPLETE() {
    TELL(" to complete this story");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

function NYMPH_APPEARS(_STR) {
    PCLEAR();
    TELL(XA);
    if(!(isASSIGNED(_STR))) {
        TELL("technical");
    } else {
        TELL(_STR);
    }
    TELL(" nymph appears on your keyboard. \"");
    return true;
}

function SEE_MANUAL(_STR) {
    NYMPH_APPEARS();
    TELL("Refer to your ");
    ITALICIZE("Beyond Zork");
    TELL(" manual for the correct way to ", _STR);
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

function REFER_TO_PACKAGE(_OBJ=PRSO) {
    NYMPH_APPEARS("marketing");
    TELL("You'll find ");
    if(isVERB(V_EXAMINE)) {
        TELL("a drawing of ", THE(_OBJ));
    } else {
        TELL("that information");
    }
    TELL(" in your ");
    ITALICIZE("Beyond Zork");
    TELL(" package");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

function NONE_TO_BE_SEEN() {
    TELL("There are none to be seen.", CR);
    return true;
}

function GENERIC_MONSTER_F(_TBL, _LEN=_TBL[0], _X) {
    _TBL = REST(_TBL, 2);
    if(!(LAST_MONSTER)) {
        
    } else if((_X = isINTBL(LAST_MONSTER, _TBL, _LEN))) {
        return LAST_MONSTER;
    }
    if((_X = isINTBL(P_IT_OBJECT, _TBL, _LEN))) {
        return P_IT_OBJECT;
    }
    while(true) {
        if(--_LEN < 0) {
            return false;
        }
        _X = _TBL[_LEN];
        if((isIS(_X, LIVING)
  &&  !(isIS(_X, SLEEPING)))) {
            return _X;
        }
    }
}

function NOBODY_TO_ASK() {
    PCLEAR();
    TELL("There's nobody here to ask.", CR);
    return true;
}

function TALK_TO_SELF() {
    PCLEAR();
    if(isEQUAL(HERE, LOC(RIDDLE))) {
        PRINT("A hollow voice says, \"Fool!\"");
        CRLF();
        return true;
    }
    TELL("[You must address characters directly.]", CR);
    return true;
}

"*** DEATH ***"

var DEATH = () => OBJECT({
	LOC: ROOMS,
	DESC: "Death",
	SDESC: DESCRIBE_DEATH,
	FLAGS: [LIGHTED, LOCATION]
});

function DESCRIBE_DEATH(_OBJ) {
    if(isIS(_OBJ, MUNGED)) {
        return TELL("Defeated");;
    }
    
    return PRINTD(_OBJ);
}

function KILL_URGRUE() {
    TELL(`, directly into the core of the shadow!
  The thing within stands revealed to you for one brief instant. Then your sanity is spared by a blinding flash and concussion that throws you hard against the far wall...`);
    CARRIAGE_RETURNS();
    TELL(XTHE, `sound of sobbing jolts you to your senses.
  In the corner lies a feeble old man, bent with grief. His robes are tattered, his white hair scorched by flame. You slowly rise and draw closer, bending low to touch his shoulder`, PTAB);
    CLAMP();
    TELL(TAB
, `\"I can always count on fools like you for sympathy,\" chuckles the not-so-feeble old man as he holds your windpipe shut. \"Still, though your mind is weak, your body is young and strong. It will make a suitable vessel until I can find another grue.\" He grabs your hair, pulls your head back and directs your eyes into his own. \"Relax. This won't hurt a bit.\"
  Your fear turns to resentment, then to rage as the old man violates your mind, absorbing your compassion like a sponge as he fights to take possession of your soul.`, CR);
    UPDATE_STAT(WINNING_COMPASSION, COMPASSION);
    TELL(TAB, "\"Enough!\"|  The fingers on your neck drop away, ");
    if(STATS[COMPASSION]) {
        VANISH(URGRUE);
        DEQUEUE(I_URGRUE);
        UNMAKE(URGRUE, LIVING);
        LAST_MONSTER = null;
        TELL(`leaving you gasping but alive. You stumble backwards to find the old man leaning against the wall, breathing hard, his eyes brimming with tears.
  \"Enough,\" he cries again, gesturing towards the exit. \"Take what you want and leave this place! I cannot bring myself to murder one so virtuous. Go!\" His voice is bitter with despair. \"Leave me to wallow in Compassion.\"
  With these last words, the broken man fades into nothingness.`, CR);
        UPDATE_STAT(GETP(URGRUE, "VALUE"), EXPERIENCE, true);
        return true;
    }
    TELL("and the carcass of your former self slumps to the ground. You kick it aside with a chuckle, and pause to admire your new, young body in the floating mirror. Then you saunter off down the passageway with the Coconut of Quendor under your arm, looking for a couple of baby grues to strangle. There's no faster way to burn off unwanted Compassion");
    MAKE(DEATH, MUNGED);
    JIGS_UP();
    return true;
}

function JIGS_UP() {
    HERE = DEATH;
    MOVE(PLAYER, HERE);
    RELOOK();
    OPTIONS();
    return false;
}

function OPTIONS() {
    let _U=0, _WORD, _KEY;
    if(!(CAN_UNDO)) {
        
    } else if(!(LAST_MONSTER)) {
        ++_U
    }
    PRINT("|Do you want to ");
    if(isT(_U)) {
        TELL("undo your last command, ");
    }
    TELL("restore a previously saved game, restart from the beginning, or quit?", CR, CR);
    const loop = loop_stream();
    loop.loadPreaction(() => {
        TELL("[Type ");
        if(isT(_U)) {
            TELL("UNDO, ");
        }
        TELL("RESTORE, RESTART or QUIT.] >");
        READ_YES_LEXV(loop);
    });
    loop.loadPostaction(_KEY => {
        _WORD = YES_LEXV[P_LEXSTART];
        if(!(YES_LEXV[P_LEXWORDS])) {
            loop.again();return;
        } else if((isT(_U)
        &&  isEQUAL(_WORD, "UNDO"))) {
            V_UNDO();
            loop.finish();return;
        } else if(isEQUAL(_WORD, "RESTORE")) {
            V_RESTORE(() => {
                DO_MAIN_LOOP();
            });
            loop.finish();return;
        } else if(isEQUAL(_WORD, "RESTART")) {
            RESTART();
            FAILED("RESTART");
            loop.finish();return;
        } else if(isEQUAL(_WORD, "QUIT", "Q")) {
            CRLF();
            QUIT();
            loop.finish();return;
        }
    });
}

function ASIDE_FROM(_OBJ=ME) {
    if(PROB(50)) {
        TELL("Besides ");
    } else {
        TELL("Aside from ");
    }
    TELL(THE(_OBJ), LYOU_SEE);
    return true;
}

function GONE_NOW(_OBJ, _STR=null) {
    if(!(_STR)) {
        TELL(CTHE(_OBJ));
    } else {
        TELL(XTHE, _OBJ);
    }
    TELL(" you saw here before is gone now.", CR);
    return true;
}

function HOLLOW_VOICE(_STR) {
    PCLEAR();
    PRINT("A hollow voice says, \"Fool!\"");
    TELL(" That Name is ", _STR, ". Choose another!\"", CR);
    return true;
}

/*SYNTAX(["$RUNE"], V_RUNE);*/

/*function V_RUNE() {
    let _X;
    if(!(VT220)) {
        TELL("[Sorry, Jack.]", CR);
        return true;
    }
    PRINT("a b c d e f g h i j k l m n o p q r s t u v w x y z");
    TELL(CR, CR);
    _X = FONT(F_NEWFONT);
    PRINT("a b c d e f g h i j k l m n o p q r s t u v w x y z");
    _X = FONT(F_DEFAULT);
    TELL(CR, CR);
    return true;
}*/

var PALLETTE/*NUMBER*/ = 1;

function V_COLOR() {
    let _TBL, _PAL, _CNT;
    if(isPRSO(ROOMS)) {
        _TBL = MACHINE_COLORS[HOST];
        if((!(isCOLORS)
  &&  isEQUAL(HOST, ATARI_ST))) {
            _TBL = ST_MONO;
        } else if((!(isCOLORS)
  ||  !(_TBL)
  ||  ((_CNT = _TBL[0])
  &&  _CNT < 2))) {
            NOT_AVAILABLE();
            return true;
        }
        _TBL = _TBL[PALLETTE];
        BGND = _TBL[0];
        FORE = _TBL[1];
        INCOLOR = _TBL[2];
        GCOLOR = _TBL[3];
        V_REFRESH();
        TELL(CR, "[Color pallette ", N(PALLETTE
), " of ", N(_CNT), ".]", CR);
        if(++PALLETTE > _CNT) {
            PALLETTE = 1;
        }
        Screen.setScreenBackground(BGND);
        return true;
    } else /*if(isPRSO(INTNUM)) {
        if(!(P_NUMBER)) {
            if(++BGND > 9) {
                BGND = 1;
            }
            SAY_COLOR(BGND, "BGND");
            return true;
        } else if(isEQUAL(P_NUMBER, 1)) {
            if(++FORE > 9) {
                FORE = 1;
            }
            SAY_COLOR(FORE, "FORE");
            return true;
        } else if(isEQUAL(P_NUMBER, 2)) {
            if(++INCOLOR > 9) {
                INCOLOR = 1;
            }
            SAY_COLOR(INCOLOR, "INCOLOR");
            return true;
        } else if(isEQUAL(P_NUMBER, 3)) {
            if(++GCOLOR > 9) {
                GCOLOR = 1;
            }
            SAY_COLOR(GCOLOR, "GCOLOR");
            return true;
        } else if(isEQUAL(P_NUMBER, 4)) {
            SAY_COLOR(BGND, "BGND", 1);
            SAY_COLOR(FORE, "FORE", 1);
            SAY_COLOR(INCOLOR, "INCOLOR", 1);
            SAY_COLOR(GCOLOR, "GCOLOR", 1);
            return true;
        }
        SAY_ERROR("V-COLOR");
        return true;
    }*/
    DONT_UNDERSTAND();
    return true;
}

/*function SAY_COLOR(_C, _STR, _X) {
    if(!(isASSIGNED(_X))) {
        V_REFRESH();
    }
    TELL("[", _STR, " color = ", COLOR_NAMES[_C], ".]", CR);
    return true;
}*/

/*var DEBUG/*FLAG* / = null;*/

/*SYNTAX(["$IMP", {find:null, tokens: []}], V_$CHEAT);*/

/*function V_$CHEAT() {
    let _X, _TBL, _SEED, _DELTA;
    if(isPRSO(INTNUM)) {
        if(!(P_NUMBER)) {
            MOVE(COCO, PLAYER);
            ENDING();
            REMOVE(COCO);
            V_REFRESH();
            return true;
        } else if(isEQUAL(P_NUMBER, 1)) {
            STATS[COMPASSION] = 50;
            MAXSTATS[COMPASSION] = 50;
            MOVE(LHEMI, PLAYER);
            UNMAKE(LHEMI, NODESC);
            MOVE(UHEMI, PLAYER);
            UNMAKE(UHEMI, NODESC);
            MOVE(JAR, PLAYER);
            MOVE(RFOOT, PLAYER);
            MOVE(SHOE, PLAYER);
            MOVE(CLOVER, PLAYER);
            MOVE(LANTERN, PLAYER);
            isREPLACE_ADJ(LANTERN, "BROKEN", "ZZZP");
            UNMAKE(LANTERN, MUNGED);
            LAMP_LIFE = MAX_LAMP_LIFE;
            UNMAKE(LANTERN, NODESC);
            MOVE(HELM, PLAYER);
            UNMAKE(HELM, NODESC);
            TELL("Wheee!", CR);
            if(isT(VERBOSITY)) {
                CRLF();
            }
            GOTO(SE_WALL);
            return true;
        }
    }
    DONT_UNDERSTAND();
    return true;
}*/

function PROLOGUE(afterPrologue) {
    let _X, _Y;
    CLEAR(-1);
    TELL(CR
, `\"Our doom is sealed.\"|
  Y'Gael turned away from the window overlooking the Great Sea. \"The
Guildmaster nears the end of his final quest,\" she said softly. \"When
he succeeds, for succeed he will, our powers shall cease to be.\"|
  The silence was unbroken for a long minute. Then a tiny voice near the
door peeped, \"Forever?\"|
  \"`.replace(/\n/gi, " "));
    HLIGHT(H_ITALIC);
    TELL("No");
    HLIGHT(H_NORMAL);
    TELL(`.\" The old woman leaned forward on her staff. \"The Age of Science
will endure long; no one in this room can hope to outlive it. But our
knowledge need not die with us -- if we act at once to preserve our
priceless heritage.\"|
  \"Wherein lies your hope, Y'Gael?\" demanded a salamander in the front
row. \"What Magick is proof against the death of Magick itself?\"|
  Y'Gael's dry chuckle stilled the murmur of the crowd. \"You forget your
own history, Gustar. Are you not author of the definitive scroll on the
Coconut of Quendor?\"|
  A tumult of amphibious croaks and squeals drowned out Gustar's retort.
Y'Gael hobbled over to a table laden with mystical artifacts, selected a
small stone and raised it high.|
  \"The Coconut is our only hope,\" she cried, her eyes shining in the
stone's violet aura. \"Its seed embodies the essence of our wisdom.
Its shell is impervious to the ravages of Time. We must reclaim it from
the Implementors, and hide it away before its secrets are forgotten!\"|
  The shrill voice of a newt rose above the cheering. \"And who will steal
this Coconut from the Implementors?\" he scoffed. \"You, Y'Gael?\"|
  The violet aura faded at his words. \"Not I, Orkan,\" replied Y'Gael,
shaking the lifeless stone and replacing it with a sigh. \"The fabric of
Magick is unravelling. We dare not rely on its protection. Another
champion must be sought; an innocent unskilled in the lore of enchantment, who
cannot know the price of failure, or recognize the face of death.\"|
  Orkan's squeak was skeptical. \"Suppose your champion succeeds in this
hopeless quest. What will become of the Coconut?\"|
  Y'Gael turned to face the sea once more. \"It will await the coming of a
better age,\" she replied, her voice trembling with emotion. \"An age
beyond Magick, beyond Science ...\"||`.replace(/\n/gi, " "));
    INPUT( () => {

    _X = ((WIDTH - 52) / 2);
    _Y = ((HEIGHT - 8) / 2);
    CLEAR(-1);
    SPLIT(20);
    TO_TOP_WINDOW();

    DO_CURSET(_Y, (_X + 10));
    BIG_ZORK();

    ++_Y
    DO_CURSET(_Y, (_X + 15));
    SAY_COCO();

    _Y = (_Y + 2);
    DO_CURSET(_Y, (_X + 15));
    TELL("An Interactive Fantasy");

    ++_Y
    DO_CURSET(_Y, _X);
    PRINT("Copyright (C)1987 Infocom, Inc. All rights reserved.");

    ++_Y
    DO_CURSET(_Y, (_X + 2));
    TRADEMARK();

    TO_BOTTOM_WINDOW();
    INPUT(() => {afterPrologue.post()});
    });
}

function BIG_ZORK() {
    if(isT(isCOLORS)) {
        COLOR(FORE, BGND);
    } else if(!(isEQUAL(HOST, MACINTOSH))) {
        HLIGHT(H_BOLD);
    }
    TELL("B  E  Y  O  N  D      Z  O  R  K");
    return false;
}

function SAY_COCO() {
    COLOR(INCOLOR, BGND);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    PRINT("The Coconut of Quendor");
    COLOR(FORE, BGND);
    return false;
}

function TRADEMARK() {
    ITALICIZE("Zork");
    TELL(" is a registered trademark of Infocom, Inc.");
    return true;
}

SYNTAX(["$CREDITS"], V_$CREDITS);

function V_$CREDITS() {
    let _X;
    CLEAR(-1);
    SPLIT((HEIGHT - 1));
    TO_TOP_WINDOW();
    CENTER(2, 33);
    BIG_ZORK();
    CENTER(3, 22);
    SAY_COCO();
    CENTER(5, 17);
    TELL("by Brian Moriarty");

    CENTER(7, 7);
    COLOR(INCOLOR, BGND);
    TELL("Testing");
    COLOR(FORE, BGND);
    CENTER(8, 53);
    TELL("Gary Brennan   Max Buxton   Liz Cyr-Jones   Jacob Galley");
    CENTER(9, 70);
    TELL("Tyler Gore   Matt Hillman   Katie Kendall   Martin Price   Joe Prosser");
    CENTER(10, 44);
    TELL("Steve Meretzky   Tom Veldran   Steve Watkins");

    CENTER(12, 48);
    COLOR(INCOLOR, BGND);
    TELL("Package         Project Manager       Copywriter");

    CENTER(13, 56);
    COLOR(FORE, BGND);
    TELL("Carl Genatossio       Jon Palace       Elizabeth Langosy");

    _X = 15;
    if(HEIGHT > 23) {
        CENTER(_X, 57);
        COLOR(INCOLOR, BGND);
        TELL("Cover           Map & Book       Photography     Production");
        ++_X
        CENTER(_X, 63);
        COLOR(FORE, BGND);
        TELL("John Gamache    Bruce Hutchinson    Steve Grohe    Angela Crews");
        _X = (_X + 2);
    }

    CENTER(_X, 18);
    COLOR(INCOLOR, BGND);
    TELL("Micro Interpreters");
    ++_X
    CENTER(_X, 47);
    COLOR(FORE, BGND);
    TELL("Tim Anderson    Jon Arnold     Duncan Blanchard");
    ++_X
    CENTER(_X, 34);
    TELL("Linde Dynneson    Andy Kaluzniacki");
    _X = (_X + 2);

    COLOR(INCOLOR, BGND);
    CENTER(_X, 20);
    TELL("Z Development System");
    ++_X
    CENTER(_X, 43);
    COLOR(FORE, BGND);
    TELL("Tim Anderson    Dave Lebling    Chris Reeve");
    TO_BOTTOM_WINDOW();
    _X = INPUT();
    V_REFRESH();
    return true;
}

function TIMESTOP() {
    TELL(CTHE(URGRUE
), ` clears its throat. \"Girgol it is, then.\"
  The speed and pitch of `, THE(URGRUE
), "'s triumphant laughter increase as a web of evil Magick engulfs you. Eons of history flicker past in mere seconds of subjective time, until the Final Conflagration brings your long-forgotten existence to a merciful end");
    JIGS_UP();
    return false;
}

function SAY_ERROR(_STR) {
    TELL("[Error @ ", _STR, "]", CR);
    return true;
}

/*SYNTAX(["$SUSS", {find:null, tokens: []}], V_$SUSS);*/
/*SYNTAX(["$SUSS", {find:null, tokens: []}], V_$SUSS);*/

/*var SUSSX/*NUMBER* / = 0;*/

/*function V_$SUSS() {
    let _REV=0, _STAT=0, _OSTAT, _KEY, _X, _TBL, _PSTAT, _VAL;
    if(!(DMODE)) {
        TELL("[Switch to Enhanced mode first.]", CR);
        return true;
    } else if(!(isIS(PRSO, MONSTER))) {
        TELL("[Only monsters can be $SUSSed.]", CR);
        return true;
    } else if(isPRSI(INTNUM)) {
        KILL_MONSTER(PRSO);
        TELL("Poof.", CR);
    } else if(isT(PRSI)) {
        isHOW();
        return true;
    }
    _X = GETP(PRSO, "EMAX");
    if(!(isEQUAL(GETP(PRSO, "ENDURANCE"), _X))) {
        TELL("[", CTHEO, " must be fully recovered first.]", CR);
        return true;
    }
    if(isT(VT220)) {
        
    } else if(isEQUAL(HOST, DEC_20, APPLE_2E)) {
        ++REV
    }
    DBOX[0] = SP;
    COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
    SUSSX = (((DWIDTH - SUSS_WIDTH) / 2) + 1);
    TO_TOP_WINDOW();
    COLOR(FORE, BGND);
    DO_CURSET((SUSSY - 1), SUSSX);
    ++SUSSX
    if(!(_REV)) {
        HLIGHT(H_INVERSE);
    }
    PRINTT(DBOX, SUSS_WIDTH, SUSS_HEIGHT);
    DO_CURSET(SUSSY, SUSSX);
    PRINTT(BAR_LABELS, LABEL_WIDTH, 3);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    if(isT(_REV)) {
        HLIGHT(H_INVERSE);
    }
    while(true) {
        SUSSNUM(_STAT);
        if(++_STAT > DEXTERITY) {
            break;
        }
    }
    TO_BOTTOM_WINDOW();
    TELL("[Sussing ", D(PRSO), ". Press [RETURN] to exit.] >");


    _OSTAT = -1;
    _STAT = ENDURANCE;
    TO_TOP_WINDOW();
    COLOR(FORE, BGND);
    while(true) {
        _TBL = REST(BAR_LABELS, (_STAT * LABEL_WIDTH));
        _PSTAT = SUSS_STATS[_STAT];
        _VAL = GETP(PRSO, _PSTAT);
        if(!(isEQUAL(_STAT, _OSTAT))) {
            _OSTAT = _STAT;
            DO_CURSET((SUSSY + _STAT), SUSSX);
            HLIGHT(H_NORMAL);
            HLIGHT(H_MONO);
            if(isT(_REV)) {
                HLIGHT(H_INVERSE);
            }
            PRINTT(_TBL, LABEL_WIDTH);
        }
        TO_BOTTOM_WINDOW();

        _KEY = DO_INPUT();
        if(isEQUAL(_KEY, EOL, LF)) {
            break;
        }
        TO_TOP_WINDOW();
        COLOR(FORE, BGND);
        if(isEQUAL(_KEY, UP_ARROW, DOWN_ARROW, SP)) {
            DO_CURSET((SUSSY + _STAT), SUSSX);
            if(!(_REV)) {
                HLIGHT(H_INVERSE);
            }
            PRINTT(_TBL, LABEL_WIDTH);
            if((isEQUAL(_KEY, UP_ARROW)
  &&  --_STAT < ENDURANCE)) {
                _STAT = DEXTERITY;
            } else if((isEQUAL(_KEY, DOWN_ARROW, SP)
  &&  ++_STAT > DEXTERITY)) {
                _STAT = ENDURANCE;
            }
            continue;
        } else if((isEQUAL(_KEY, LEFT_ARROW)
  &&  _VAL > 1)) {
            PUTP(PRSO, _PSTAT, (_VAL - 1));
            if(isT(_REV)) {
                HLIGHT(H_INVERSE);
            }
            SUSSNUM(_STAT);
            continue;
        } else if((isEQUAL(_KEY, RIGHT_ARROW)
  &&  _VAL < STATMAX)) {
            PUTP(PRSO, _PSTAT, (_VAL + 1));
            if(isT(_REV)) {
                HLIGHT(H_INVERSE);
            }
            SUSSNUM(_STAT);
            continue;
        }
        SOUND(2);
    }
    PUTP(PRSO, "EMAX", GETP(PRSO, "ENDURANCE"));
    NEW_DBOX = IN_DBOX;
    TELL("[", CTHEO, " $SUSSed.]", CR);
    return true;
}*/

/*function SUSSNUM(_STAT) {
    let _X;
    _X = (SUSSX + 13);
    DO_CURSET((SUSSY + _STAT), _X);
    _X = GETP(PRSO, SUSS_STATS[_STAT]);
    if(_X < 10) {
        TELL("  ");
    } else if(_X < 100) {
        PRINTC(SP);
    }
    TELL(N(_X));
    return false;
}*/


/*function V_$RECORD() {
    DIROUT(4);
    TELL("[#RECORD ok.]", CR);
    return true;
}*/

/*function V_$UNRECORD() {
    DIROUT(-4);
    TELL("[#UNRECORD ok.]", CR);
    return true;
}*/

/*function V_$COMMAND() {
    DIRIN(1);
    TELL("[#COMMAND ok.]", CR);
    return true;
}*/

/*function V_$RANDOM() {
    if(!(isPRSO(INTNUM))) {
        TELL("[Illegal #RANDOM.]", CR);
        return true;
    }
    RANDOM((0 - P_NUMBER));
    TELL("[#RANDOM ", N(P_NUMBER), " ok.]", CR);
    return true;
}*/

function ENDING() {
    let _X, _LEVEL;
    TELL("A devastating ground shock sends you sprawling! The roof of the cavern gives way at the same moment, and you watch helplessly as tons of granite crumble all around you..");
    _X = LOC(COCO);
    if((!(_X)
  ||  (!(isEQUAL(_X, PLAYER))
  &&  !(isIN(_X, PLAYER))))) {
        JIGS_UP();
        return false;
    }
    TELL(PERIOD);
    CARRIAGE_RETURNS();
    INPUT(() => {
        CLEAR(-1);
        COLOR(FORE, BGND);
        TELL(CR, "\"Is ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL(`he still alive?\"
      The voice at your ear is familiar. You decide to open one eye.
      \"Apparently.\" `, CTHELADY
    , ` probes your left ankle with her fingers, and you wince with pain. \"Close call, though. What did you call that spell, your Worship?\"
      \"`);
        ITALICIZE("Tossio");
        TELL(`. Turns granite to fettucine.\" Cardinal Toolbox wipes his mouth. \"Any left?\"
      \"Gluttony is a sin,\" retorts `, THE(OWOMAN
    ), `, helping you to your feet. \"Is everything ready?\"
      The old sailor dabs a final touch of color onto the canvas, then signs his work with a chuckle. \"All set, Y'Gael.\"
      \"Very well.\" The old woman hands you a slim golden wand and nods at the easel. \"Here. You need the experience.\"
      The painting shimmers with Magick as the wand's rays play across its surface. You watch with growing wonder as the skillful strokes and flourishes become one with the sea and sky, artfully blending with your surroundings until it's hard to tell where one begins and the other ends.
      \"Cast off, Mister Clutchcake!\" cries the old sailor, taking his place behind the wheel. \"Let's be underway while the tide's still with us!\"
      \"Aye, Captain!\" The cook from the Rusty Lantern chops the mooring rope with a meat cleaver, and your magnificent galleon glides away from the wharf and high into the sky, held aloft by planes of sparkling Magick. The village of Grubbo-by-the-Sea dwindles off the stern; you can just see the little hilltop where your adventure began, so long ago.
      The woman called Y'Gael weighs the Coconut of Quendor thoughtfully in her hand. \"Better go below and take a nap,\" she suggests as you stifle a yawn. \"You're going to need it.\"||`);
        INPUT(() => {
            CLEAR(-1);
            SPLIT(14);
            DBOX[0] = SP;
            COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
            SHOW_RANK(WIDTH);
            if(!(VT220)) {
                APPLE_BARS();
            } else {
                STATBARS(3, (Math.floor((WIDTH - BARWIDTH) / 2) - 1), LUCK);
            }
            TELL(CR, "Thus ends the story of ");
            ITALICIZE("Beyond Zork");
            TELL(": ");
            HLIGHT(H_ITALIC);
            PRINT("The Coconut of Quendor");
            HLIGHT(H_NORMAL);
            TELL(PERIOD);
            TELL(CR, "Your final rank is ");
            _LEVEL = ANNOUNCE_RANK();
            TELL(" in ", N(MOVES), " moves, ");
            if(!(RANK)) {
                _LEVEL = (9 - _LEVEL);
                TELL(N(_LEVEL), " level");
                if(!(isEQUAL(_LEVEL, 1))) {
                    TELL("s");
                }
                TELL(" below ");
            }
            TELL("the highest possible rank.", CR);
            /*SAVE_CHAR();*/
            OPTIONS();
        });        
    });
    
    return true;
}

/*function SAVE_CHAR() {
    let _X, _Y, _SEED, _DELTA, _TBL;
    TELL(CR
, "Do you want to save your character for future reference?");
    if(isYES()) {
        _X = 63;
        while(true) {
            AUX_TABLE[_X] = RANDOM(255);
            if(--_X < 24) {
                break;
            }
        }
        _SEED = AUX_TABLE[51];
        _DELTA = AUX_TABLE[61];
        COPYT(CHARNAME, AUX_TABLE, (CHARNAME_LENGTH + 1));
        _TBL = REST(AUX_TABLE, 32);
        _X = 7;
        _Y = 0;
        while(true) {
            _TBL[_Y] = (0 - (STATS[_X] + _SEED));
            _SEED = (_SEED + _DELTA);
            --_X
            if(++Y > 7) {
                break;
            }
        }
        _X = SAVE(AUX_TABLE, 64, SAVE_NAME);
        if(!(_X)) {
            FAILED("SAVE");
        } else if(isEQUAL(_X, 1)) {
            TELL(CR, "The character \"");
            PRINT_TABLE(CHARNAME);
            TELL("\" has been saved.", CR);
        }
    }
    return false;
}*/

function CHEATER() {
    CRLF();
    NYMPH_APPEARS();
    TELL("Shame on you");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    CRLF();
    //QUIT();
    return false;
}

function INIT_RARITIES() {
    INTNUM = INTNUM();
    IT = IT();
    WALLS = WALLS();
    CEILING = CEILING();
    HANDS = HANDS();
    FEET = FEET();
    MOUTH = MOUTH();
    EYES = EYES();
    HEAD = HEAD();
    PLAYER = PLAYER();
    ME = ME();
    YOU = YOU();
    GLOBAL_ROOM = GLOBAL_ROOM();
    HER = HER();
    HIM = HIM();
    THEM = THEM();
    INTDIR = INTDIR();
    GROUND = GROUND();
    FLOOR = FLOOR();
    GLOBAL_HOLE = GLOBAL_HOLE();
    SOUND_OBJ = SOUND_OBJ();
    GCORNER = GCORNER();
    RIGHT = RIGHT();
    LEFT = LEFT();
    GAME = GAME();
    HELLO_OBJECT = HELLO_OBJECT();
    DEATH = DEATH();
}