`PLACES for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

function GET_OWOMAN_AND_CURTAIN() {
    MAKE(CURTAIN, NODESC);
    if(!(isIN(CURTAIN, HERE))) {
        MOVE(CURTAIN, HERE);
    }
    PUTP(OWOMAN, "LAST-LOC", HERE);
    if(!(isIN(OWOMAN, HERE))) {
        MOVE(OWOMAN, HERE);
    }
    REMOVE_ALL(OWOMAN);
    SEE_CHARACTER(OWOMAN);
    return false;
}

function isGET_DACT() {
    if((!(isIS(DACT, TOUCHED))
  &&  !(isIS(HERE, TOUCHED))
  &&  isLAST_ROOM_IN(MOOR_ROOMS, 2))) {
        MAKE(DACT, TOUCHED);
        MOVE(DACT, HERE);
        QUEUE(I_DACT);
        return true;
    }
    return false;
}

var HILLTOP = () => OBJECT({
	LOC: ROOMS,
	DESC: "Hilltop",
	FLAGS: [LIGHTED, LOCATION],
	EAST: SAY_TO(COVESIDE, "You amble down the hill."),
	NW: TO(ON_PIKE),
	DOWN: PER(EXIT_A_TREE),
	UP: PER(CLIMB_A_TREE),
	OVERHEAD: OAK2,
	EXIT_STR: "The hillside is too steep that way.",
	GLOBAL: [GRUBBO],
	FNUM: OGRUBBO,
	THINGS: [
		["", "HILL", HERE_F],
		["", "HILLTOP", HERE_F],
		["GREAT", "SEA", USELESS],
		["", "SHORE", USELESS]
	],
	ACTION: HILLTOP_F
});

"SEEN = seen morning."

function HILLTOP_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The horizon is lost in the glare of morning upon the Great Sea. You shield your eyes to sweep the shore below, where a village lies nestled beside a quiet cove.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        P_IT_OBJECT = OAK2;
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "DOWN")) {
            P_WALK_DIR = "EAST";
        }
        return false;
    } else {
        return false;
    }
}

var COVESIDE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Cove",
	FLAGS: [LIGHTED, LOCATION],
	NE: TO(AT_LEDGE, 3),
	EAST: TO(ON_WHARF),
	SOUTH: TO(OUTSIDE_PUB),
	WEST: TO(HILLTOP),
	UP: TO(HILLTOP),
	GLOBAL: [GRUBBO],
	FNUM: OGRUBBO,
	THINGS: [
		["", "COVE", HERE_F],
		["", "GULLS", USELESS],
		["", "SHANTIES", null]
	],
	ACTION: COVESIDE_F
});

function COVESIDE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Gulls circle the far end of a wharf extending east across the cove. The street is dotted with shanties bleached by years of sun and salt.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "UP")) {
            P_WALK_DIR = "WEST";
        }
        return false;
    } else {
        return false;
    }
}

var OUTSIDE_PUB = () => OBJECT({
	LOC: ROOMS,
	DESC: "Outside Pub",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(COVESIDE),
	SOUTH: TO(N_MOOR),
	WEST: THRU(PUB_DOOR, IN_PUB),
	IN: THRU(PUB_DOOR, IN_PUB),
	GLOBAL: [PUB_DOOR, PUB, GRUBBO],
	FNUM: OGRUBBO,
	HEAR: PUB,
	ODOR: PUB,
	ACTION: OUTSIDE_PUB_F
});

function OUTSIDE_PUB_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Harsh laughter and mouthwatering aromas waft ");
        if(isIS(PUB_DOOR, OPENED)) {
            TELL("through the open ");
        } else {
            TELL("out from under the ");
        }
        TELL("door of a shanty on the street's west side. ");
        DESCRIBE_PUB_SIGN();
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_PUB_SIGN() {
    let _X;
    TELL("The words \"Ye Rusty Lantern, A Publick House\" appear in fading script above ");
    if((_X = isFIRST(PUB_SIGN))) {
        THIS_IS_IT(_X);
        if(isEQUAL(_X, LANTERN)) {
            TELL("a real ", D(_X));
        } else {
            TELL(A(_X));
        }
        TELL(", dangling from a ");
    } else {
        P_IT_OBJECT = PUB_SIGN;
        TELL("an empty ");
    }
    TELL("hook.", CR);
    return true;
}

var N_MOOR = () => OBJECT({
	LOC: ROOMS,
	DESC: "Moor's Edge",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(OUTSIDE_PUB),
	SOUTH: PER(N_MOOR_S, 1),
	FNUM: OGRUBBO,
	GLOBAL: [GRUBBO],
	ACTION: N_MOOR_F
});

function N_MOOR_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A gray scrim of mist lies across the southern moors, obscuring the path only a few steps away. The outskirts of a village");
        PRINT(" can be seen not far to the north.|");
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isEQUAL(P_WALK_DIR, "NORTH")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_GAS = () => OBJECT({
	LOC: ROOMS,
	DESC: "Gasses",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: IN_GAS_F
});

function IN_GAS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Your feet make wet, sucking noises as you trudge across patches of rotting vegetable matter. An unwholesome miasma of gasses is making your head swim.", CR);
        MENTION_MOOR_EXIT();
        return true;
    } else {
        return false;
    }
}

/*function DO_GAS_EXIT() {
    let _DIR, _CNT, _TBL;
    if((isEQUAL(P_WALK_DIR, "IN", "OUT")
  ||  isEQUAL(P_WALK_DIR, "UP", "DOWN"))) {
        return false;
    }
    _DIR = "NW";
    _CNT = 1;
    while(true) {
        _TBL = GETP(HERE, _DIR);
        if(!(_TBL)) {
            
        } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT)) {
            ++_CNT
            GOOD_DIRS[_CNT] = _DIR;
        }
        if(++_DIR > "NORTH") {
            break;
        }
    }
    if(isEQUAL(_CNT, 2)) {
        _DIR = GOOD_DIRS[2];
    } else {
        GOOD_DIRS[0] = _CNT;
        GOOD_DIRS[1] = 0;
        while(true) {
            _DIR = PICK_ONE(GOOD_DIRS);
            if(isEQUAL(_DIR, PRSO)) {
                continue;
            }break;
        }
    }
    if(PROB((STATMAX - STATS[LUCK]))) {
        PRSO = _DIR;
        P_WALK_DIR = _DIR;
        TELL("You stumble uncertainly in the whirling gas.", CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
    }
    return false;
}*/

var MOOR2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Eyes",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: MOOR2_F
});

function MOOR2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Silent, unblinking eyes peer down at you from the fog-shrouded trees.", CR);
        MENTION_MOOR_EXIT();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        isGET_DACT();
        return false;
    } else {
        return false;
    }
}

var MOOR3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Deep Mist",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: MOOR3_F
});

function MOOR3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Spooky fingers of mist swirl around your feet. It's hard to see more than a few yards in any ", INTDIR, PERIOD);
        MENTION_MOOR_EXIT();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        isGET_DACT();
        return false;
    } else {
        return false;
    }
}

var MOOR4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Noises",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: MOOR4_F
});

function MOOR4_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A cacophony of peeps, hoots and croaks sets your nerves on edge.", CR);
        MENTION_MOOR_EXIT();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        isGET_DACT();
        return false;
    } else {
        return false;
    }
}

var MOOR5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Mud Flats",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: MOOR5_F
});

function MOOR5_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Narrow paths wander off between pools of black, fetid mud. The damp chill in the air is making you shiver.", CR);
        MENTION_MOOR_EXIT();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        isGET_DACT();
        return false;
    } else {
        return false;
    }
}

var MOOR6 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Odors",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OMOOR,
	EXIT_STR: "Tall reeds block your path.",
	GLOBAL: [SWAMP, FOG],
	ACTION: MOOR6_F
});

function MOOR6_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Gray wraiths of mist linger among the reeds, filling your nostrils with the odor of things long dead.", CR);
        MENTION_MOOR_EXIT();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        isGET_DACT();
        return false;
    } else {
        return false;
    }
}

function MENTION_MOOR_EXIT() {
    let _WRD=0, _TBL;
    _TBL = GETP(HERE, "SW");
    if((isT(_TBL)
  &&  isEQUAL(_TBL[XROOM], SW_MOOR))) {
        _WRD = "SOUTHWEST";
    } else {
        _TBL = GETP(HERE, "NORTH");
        if((isT(_TBL)
  &&  isEQUAL(_TBL[XROOM], N_MOOR))) {
            _WRD = "NORTH";
        }
    }
    if(!(_WRD)) {
        return false;
    }
    TELL(TAB, "The mist thins out a bit to the ", B(_WRD), PERIOD);
    return true;
}

var SW_MOOR = () => OBJECT({
	LOC: ROOMS,
	DESC: "Bluffs",
	FLAGS: [LIGHTED, LOCATION],
	NE: PER(SW_MOOR_NE, 5),
	WEST: TO(IN_PORT),
	FNUM: OMIZNIA,
	ACTION: SW_MOOR_F
});

function SW_MOOR_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Circling gulls and a forest of masts disclose a seaport not far to the west. The view to the northeast is obscured by a blanket of mist.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isEQUAL(P_WALK_DIR, "SW")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_PORT = () => OBJECT({
	LOC: ROOMS,
	DESC: "Mizniaport",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: THRU(BOUTIQUE_DOOR, IN_BOUTIQUE),
	IN: THRU(BOUTIQUE_DOOR, IN_BOUTIQUE),
	NE: TO(IN_YARD),
	EAST: TO(SW_MOOR),
	SE: SORRY("You'd fall in the bay if you went that way."),
	SOUTH: SORRY("You'd fall in the bay if you went that way."),
	SW: SORRY("You'd fall in the bay if you went that way."),
	WEST: TO(AT_DOCK),
	NW: TO(XROADS, 11),
	FNUM: OMIZNIA,
	GLOBAL: [BOUTIQUE_DOOR, BOUTIQUE, STABLE],
	ACTION: IN_PORT_F
});

function IN_PORT_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Mizniaport is a magnet for the wealthy yipples of Borphee, who browse the colorful shops in search of next year's fashions", PTAB
, "An especially swank boutique stands just north of here. Beside it, a path marked \"Private Way\" bends northeast.", CR);
        return true;
    } else {
        return false;
    }
}

var IN_YARD = () => OBJECT({
	LOC: ROOMS,
	DESC: "Private Way",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(IN_STABLE),
	IN: TO(IN_STABLE),
	SW: TO(IN_PORT),
	FNUM: OMIZNIA,
	GLOBAL: [STABLE],
	ACTION: IN_YARD_F
});

function IN_YARD_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This shady nook obviously belongs to some well-to-do yipple. The arborvitaes are lush and neatly trimmed, with twin beds of flowers leading up to a little red ", STABLE, PERIOD);
        return true;
    } else {
        return false;
    }
}

var IN_STABLE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Stablehouse",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	SOUTH: TO(IN_YARD),
	OUT: PER(EXIT_STABLE),
	IN: PER(STABLE_IN),
	FNUM: OMIZNIA,
	GLOBAL: [STABLE],
	ACTION: IN_STABLE_F
});

function STABLE_IN() {
    PERFORM("ENTER", STALL);
    return false;
}

function EXIT_STABLE() {
    if(isIN(PLAYER, STALL)) {
        PERFORM("EXIT", STALL);
        return false;
    }
    return IN_YARD;
}

function IN_STABLE_F(_CONTEXT=null) {
    let _U=0, _ANY, _X;
    if(isIN(UNICORN, STALL)) {
        ++_U
    }
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        if(isIS(STALL, MUNGED)) {
            TELL("The splintered ruins of ", THE(STALL
), " look out of place in this otherwise");
        } else {
            TELL("Not a straw is out of place in this");
        }
        TELL(" immaculate ", STABLE);
        if(isIN(PLAYER, STALL)) {
            PRINT(PERIOD);
            return true;
        }
        _ANY = isSEE_ANYTHING_IN(STALL);
        if(isIS(STALL, MUNGED)) {
            if(isT(_ANY)) {
                TELL(". ");
                PRINT("Peering inside, you see ");
                CONTENTS(STALL);
                P_IT_OBJECT = STALL;
            }
            TELL(PERIOD);
            return true;
        }
        TELL(". The one");
        OPEN_CLOSED(STALL);
        TELL(SIS);
        if(isT(_U)) {
            TELL("occupied by a snow-white ", UNICORN
, ", who gazes at you mournfully from between the slats");
            if(isT(_ANY)) {
                TELL(". You can also ");
            }
        } else {
            TELL("unoccupied");
            if(isT(_ANY)) {
                TELL("; you can ");
            }
        }
        if(isT(_ANY)) {
            TELL("see ");
            CONTENTS(STALL);
            TELL(" inside");
            P_IT_OBJECT = STALL;
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isT(_U)) {
            SEE_CHARACTER(UNICORN);
            MAKE(UNICORN, SEEN);
            QUEUE(I_UNICORN);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isT(_U)) {
            DEQUEUE(I_UNICORN);
            TELL(CTHE(UNICORN
), " whinnies pitifully as you leave.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}


var IN_BOUTIQUE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Boutique",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	SOUTH: THRU(BOUTIQUE_DOOR, IN_PORT),
	OUT: THRU(BOUTIQUE_DOOR, IN_PORT),
	EAST: PER(ENTER_CURTAIN),
	IN: PER(ENTER_CURTAIN),
	GLOBAL: [BOUTIQUE_DOOR, BOUTIQUE],
	THIS_CASE: BCASE,
	FNUM: OMIZNIA,
	ACTION: IN_BOUTIQUE_F
});

function IN_BOUTIQUE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The sheer, flowing fabrics and gossamer pastels in this little shop create an atmosphere of taste and calm conducive to reckless spending.|  A ");
        SHOP_DOOR(BOUTIQUE_DOOR);
        TELL(" offers the latest in travel fashions");
        LOOK_ON_CASE(ON_BCASE);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        GET_OWOMAN_AND_CURTAIN();
        QUEUE(I_OWOMAN);
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        DEQUEUE(I_OWOMAN);
        if(isIN(OWOMAN, IN_BOUTIQUE)) {
            TELL("\"See you later,\" calls ", THE(OWOMAN), " as you leave.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var IN_PUB = () => OBJECT({
	LOC: ROOMS,
	DESC: "The Rusty Lantern",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	EAST: THRU(PUB_DOOR, OUTSIDE_PUB),
	WEST: TO(IN_KITCHEN),
	OUT: THRU(PUB_DOOR, OUTSIDE_PUB),
	IN: TO(IN_KITCHEN),
	HEAR: PUB,
	ODOR: PUB,
	FNUM: OGRUBBO,
	GLOBAL: [PUB, KITCHEN, PUB_DOOR, CELLAR, GRUBBO],
	THINGS: [
		["", "FIREPLACE", USELESS]
	],
	ACTION: IN_PUB_F
});

function IN_PUB_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Loud voices and clattering dishes make this smarmy dive sound busier than it really is. Your eyes sting from the greasy smoke drifting in from "
, THE(KITCHEN), PTAB, CA(BANDITS), " is hogging the fireplace.", CR);
        if((_X = isFIRST(PUBWALL))) {
            P_IT_OBJECT = _X;
            TELL(TAB, CA(_X), " is imbedded in the wall.", CR);
        }
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        QUEUE(I_BANDITS);
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        P_THEM_OBJECT = BANDITS;
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(P_WALK_DIR)) {
            
        } else if(isIS(DAGGER, NODESC)) {
            UNMAKE(DAGGER, NODESC);
            WINDOW(SHOWING_ROOM);
            MOVE(DAGGER, PUBWALL);
            P_IT_OBJECT = DAGGER;
            MAKE(BANDITS, SEEN);
            TELL("You edge towards the ");
            if(isEQUAL(P_WALK_DIR, "WEST", "IN")) {
                TELL(KITCHEN);
            } else {
                TELL(B("EXIT"));
            }
            TELL(PTAB);
            ITALICIZE("Thwack");
            TELL(`! A dagger streaks past your ear, imbedding itself deep into the wall.|  \"Har!\" chortles a bandit.`, CR);
            return RFATAL();
        }
        DEQUEUE(I_BANDITS);
        return false;
    } else {
        return false;
    }
}

var IN_KITCHEN = () => OBJECT({
	LOC: ROOMS,
	DESC: "Kitchen",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	BELOW: CELLAR_DOOR,
	IN: THRU(CELLAR_DOOR, AT_BOTTOM),
	OUT: TO(IN_PUB),
	EAST: TO(IN_PUB),
	DOWN: THRU(CELLAR_DOOR, AT_BOTTOM),
	HEAR: PUB,
	ODOR: PUB,
	FNUM: OGRUBBO,
	GLOBAL: [CELLAR_DOOR, CELLAR_STAIR, KITCHEN, CELLAR, PUB, GRUBBO],
	ACTION: IN_KITCHEN_F
});

function IN_KITCHEN_F(_CONTEXT=null) {
    let _D=0, _L;
    if(isIS(CELLAR_DOOR, OPENED)) {
        ++_D
    }
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Coils of greasy steam rise from a cauldron bubbling over a roaring hearth. "
        , CTHE(CEILING), " is hung with crusty pots and strips of old meat", PTAB, "A");
        if(isIS(CELLAR_DOOR, MUNGED)) {
            TELL(" gaping hole");
        } else if(isT(_D)) {
            TELL("n open door");
        } else {
            TELL(" closed door");
        }
        TELL(SIN, THE(GCORNER));
        if(isT(_D)) {
            TELL(" reveals a stair leading downward.", CR);
            return true;
        }
        TELL(" bears the legend, \"Keepeth Out.\"", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIN(COOK, IN_KITCHEN))) {
            MOVE(COOK, IN_KITCHEN);
        }
        UNMAKE(COOK, NODESC);
        SEE_CHARACTER(COOK);
        MAKE(COOK, SEEN);
        QUEUE(I_COOK);
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIS(BOTTLE, MUNGED)) {
            return false;
        } else if(isIN(BOTTLE, PLAYER)) {
            TELL(TAB);
            COOK_SEES_BOTTLE();
            return true;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isT(P_WALK_DIR)
        &&  isIS(ONION, TOUCHED)
        &&  !(isIS(BOTTLE, IDENTIFIED)))) {
            UNMAKE(COOK, SEEN);
            TELL("\"Wait a second.\"", CR);
            I_ONION_OFFER();
            return RFATAL();
        } else if(isEQUAL(P_WALK_DIR, "DOWN", "IN")) {
            if(!(_D)) {
                ITS_CLOSED(CELLAR_DOOR);
                return RFATAL();
            } else if(!(isIS(CELLAR_DOOR, TOUCHED))) {
                MAKE(CELLAR_DOOR, TOUCHED);
                if(!(isSETUP_CELLAR())) {
                    return false;
                }
            }
            DEQUEUE(I_COOK);
            TELL("You clump down "
            , THE(CELLAR_STAIR), PERIOD);
            return true;
        } else if(isEQUAL(P_WALK_DIR, "EAST", "OUT")) {
            P_WALK_DIR = "EAST";
            DEQUEUE(I_COOK);
        }
        return false;
    } else {
        return false;
    }
}

var KITCHEN_JUNK = () => OBJECT({
	LOC: IN_KITCHEN,
	DESC: "that",
	FLAGS: [NOARTICLE, NODESC, TRYTAKE, NOALL],
	SYNONYM: ["MEAT", "CAULDRON", "STRIPS", "HEARTH", "POT", "POTS"],
	ACTION: USELESS
});

var ON_WHARF = () => OBJECT({
	LOC: ROOMS,
	DESC: "Wharf",
	FLAGS: [LIGHTED, LOCATION],
	COORDS: MAP_RIGHT,
	WEST: TO(COVESIDE),
	DOWN: PER(ON_WHARF_DOWN),
	IN: PER(ON_WHARF_DOWN),
	HEAR: COVE,
	ODOR: WHARF,
	SEE_ALL: COVE,
	BELOW: COVE,
	GLOBAL: [GRUBBO, WHARF],
	FNUM: OGRUBBO,
	ACTION: ON_WHARF_F
});

function ON_WHARF_DOWN() {
    MAKE(SALT, SEEN);
    TELL("\"Careful!\" warns ", THE(SALT
), ", holding you back. \"Water's mighty cool this time o' year.\"", CR);
    return false;
}

function ON_WHARF_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        PRINT("Dank, fishy smells permeate this old wharf to its very bones.");
        TELL(" Far below, you ");
        PRINT("hear the slurp of oily seawater against the piers");
        if(isFIRST(COVE)) {
            TELL(PTAB, YOU_SEE);
            CONTENTS(COVE);
            TELL(" bobbing on the waves");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(SHILL, BUOYANT))) {
            MAKE(SHILL, BUOYANT);
            QUEUE(I_SHILL);
        }
        MAKE(SALT, SEEN);
        QUEUE(I_SALT);
        SEE_CHARACTER(SALT);
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(isIS(SHILL, SEEN))) {
            SEE_SHILL();
            return RFATAL();
        }
        DEQUEUE(I_SALT);
        if(isT(P_WALK_DIR)) {
            TELL("\"See y'later,\" chuckles the salt as you walk away.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var NULL = () => OBJECT({
	FLAGS: [NODESC]
});

var AT_BOTTOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Wine Cellar",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	UP: THRU(CELLAR_DOOR, IN_KITCHEN),
	OUT: SORRY("Which way do you want to go out?"),
	OVERHEAD: CELLAR_DOOR,
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	GLOBAL: [NULL, CELLAR_STAIR, CELLAR_DOOR, CELLAR],
	ACTION: AT_BOTTOM_F
});

function LOCK_CELLAR_DOOR() {
    MAKE(CELLAR_DOOR, LOCKED);
    TELL(YOU_HEAR, LTHE);
    ITALICIZE("snap");
    TELL(" of a substantial lock.", CR);
    return true;
}

function AT_BOTTOM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You're standing at the bottom of a short, rickety stairway, ankle-deep in refuse. ");
        if(isIS(CELLAR_DOOR, OPENED)) {
            TELL("Light streams down through a");
            if(isIS(CELLAR_DOOR, MUNGED)) {
                TELL(" gaping hole");
            } else {
                TELL("n open door");
            }
            TELL(" overhead.", CR);
            return true;
        }
        TELL("The door overhead is closed.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIN(COOK, AT_BOTTOM))) {
            MOVE(COOK, AT_BOTTOM);
            MAKE(COOK, NODESC);
        }
        P_IT_OBJECT = CELLAR_DOOR;
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "UP")) {
            if(isIS(CELLAR_DOOR, MUNGED)) {
                if(isT(AUTO)) {
                    BMODE_OFF();
                }
                YOU_CLIMB_UP(true);
                return true;
            } else if(isIS(CELLAR_DOOR, LOCKED)) {
                P_IT_OBJECT = CELLAR_DOOR;
                TELL(CTHE(P_IT_OBJECT), " is locked.", CR);
                return RFATAL();
            } else if(isIS(CELLAR_DOOR, OPENED)) {
                WINDOW(SHOWING_ROOM);
                P_IT_OBJECT = CELLAR_DOOR;
                UNMAKE(CELLAR_DOOR, OPENED);
                UNMAKE(AT_BOTTOM, LIGHTED);
                ITALICIZE("Bang");
                TELL("! An unseen hand slams "
, THE(CELLAR_DOOR), " in your face.", CR);
                SAY_IF_HERE_LIT();
                TELL(TAB);
                LOCK_CELLAR_DOOR();
                return RFATAL();
            }
        }
        return false;
    } else {
        return false;
    }
}

var WC1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Reeking Room",
	FLAGS: [LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	GLOBAL: [NULL, CELLAR],
	ACTION: WC1_F
});

function WC1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Smashed bottles litter the floor, and the air reeks of sour wine.", CR);
        return true;
    } else {
        return false;
    }
}

var SKEL_ROOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Shadowy Stacks",
	FLAGS: [LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	GLOBAL: [NULL, CELLAR],
	ACTION: SKEL_ROOM_F
});

function SKEL_ROOM_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Precarious stacks of barrels loom in the shadows on every side.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_BEG)) {
        if(!(CHOKE)) {
            return false;
        } else if(isVERB(V_SAVE, V_UNDO)) {
            MUMBLAGE(SKELETON);
            return true;
        } else if((isVERB(V_WAIT, V_LOOK)
  ||  (_X = isGAMEVERB()))) {
            return false;
        }
        _X = P_PRSA_WORD;
        if(isVERB(V_WALK, V_WALK_TO)) {
            _X = "MOVE";
        } else if((_X = isTALKING())) {
            _X = "SPEAK";
        } else if((_X = isSEEING())) {
            _X = "SEE";
        } else if(isEQUAL(SKELETON, PRSO, PRSI)) {
            return false;
        }
        TELL("It's not easy to ");
        if(!(_X)) {
            TELL("do that");
        } else {
            TELL(B(_X));
        }
        TELL(" while you're being strangled to death.", CR);
        return RFATAL();
    } else {
        return false;
    }
}

var MOSS_ROOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Musty Corridor",
	FLAGS: [LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	THINGS: [
		["DAMP", "CORRIDOR", HERE_F],
		["DAMP", "HALL", HERE_F],
		["DAMP", "HALLWAY", HERE_F]
	],
	GLOBAL: [NULL, CELLAR],
	ACTION: MOSS_ROOM_F
});

function MOSS_ROOM_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        _X = isLIGHT_SOURCE();
        if(!(_X)) {
            TELL("The dim light");
        } else {
            TELL(CTHE(_X), "'s glow");
        }
        TELL(" reveals a gray patch of moss on the wall.", CR);
        return true;
    } else {
        return false;
    }
}

var AT_STACK = () => OBJECT({
	LOC: ROOMS,
	DESC: "Bottom of Stack",
	FLAGS: [LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	OVERHEAD: CRATES,
	UP: PER(UPSTACK, 1),
	DOWN: SORRY("You're already at the bottom of the stack."),
	GLOBAL: [NULL, CELLAR, CRATES],
	ACTION: AT_STACK_F
});

function UPSTACK() {
    let _BAD=0;
    if(!(isLIT)) {
        TOO_DARK();
        return false;
    }
    TELL("You teeter ");
    if(STATS[DEXTERITY] < 15) {
        ++_BAD
        TELL("uncertainly");
    } else {
        TELL("for a moment");
    }
    TELL(" on the lowest crates");
    if(isT(_BAD)) {
        TELL(", lose your balance, and sprawl to ", THE(GROUND));
        if(!(isIS(CRATES, SEEN))) {
            MAKE(CRATES, SEEN);
            TELL(". Not very coordinated, are you?", CR);
            return false;
        }
        PRINT(PERIOD);
        return false;
    }
    TELL(", then slowly edge your way upward.", CR);
    if(isT(VERBOSITY)) {
        CRLF();
    }
    return BARRELTOP;
}

function AT_STACK_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Empty wine crates are stacked to "
, THE(CEILING), " in a stairlike spiral.", CR);
        return true;
    } else {
        return false;
    }
}

var THRONE_ROOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Throne Room",
	FLAGS: [LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OGRUBBO,
	GLOBAL: [NULL, CELLAR],
	ACTION: THRONE_ROOM_F
});

function THRONE_ROOM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A shallow nest of sea shells, coral and other bits of ocean debris lies in "
, THE(GCORNER));
        if(isSEE_ANYTHING_IN(THRONE)) {
            TELL(". Upon this pile you see ");
            CONTENTS(THRONE);
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(!(isIS(CRAB, MONSTER))) {
            MAKE(CRAB, MONSTER);
            WINDOW(SHOWING_ROOM);
            QUEUE(I_CRAB);
        }
        return false;
    } else {
        return false;
    }
}

var BARRELTOP = () => OBJECT({
	LOC: ROOMS,
	DESC: "Top of Stack",
	FLAGS: [LOCATION, INDOORS],
	NORTH: SORRY("You'd fall off the barrel if you went that way."),
	NE: SORRY("You'd fall off the barrel if you went that way."),
	EAST: SORRY("You'd fall off the barrel if you went that way."),
	SE: SORRY("You'd fall off the barrel if you went that way."),
	SOUTH: SORRY("You'd fall off the barrel if you went that way."),
	SW: SORRY("You'd fall off the barrel if you went that way."),
	WEST: SORRY("You'd fall off the barrel if you went that way."),
	NW: SORRY("You'd fall off the barrel if you went that way."),
	DOWN: SAY_TO(AT_STACK, "You carefully descend the stack."),
	UP: SORRY("You're up as high as you can go."),
	FNUM: OGRUBBO,
	GLOBAL: [CRATES, CELLAR],
	ACTION: BARRELTOP_F
});

function BARRELTOP_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You struggle to keep your balance as the stack sways back and forth in the darkness.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isEQUAL(P_WALK_DIR, "UP")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_THRIFF = () => OBJECT({
	LOC: ROOMS,
	DESC: "Thriff",
	FLAGS: [LIGHTED, LOCATION],
	NE: TO(AT_FALLS),
	SOUTH: TO(FOREST_EDGE),
	UP: TO(FOREST_EDGE),
	NW: TO(IN_PASTURE),
	WEST: THRU(CHAPEL_DOOR, IN_CHAPEL),
	IN: THRU(CHAPEL_DOOR, IN_CHAPEL),
	FNUM: OTHRIFF,
	GLOBAL: [CHAPEL_DOOR, THRIFF, CHAPEL],
	ACTION: IN_THRIFF_F
});

function IN_THRIFF_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Trim white cottages are clustered around a central grove of mountain firs, tall and lovingly tended. A little chapel graces the west side of the street");
        if(isIS(CHAPEL_DOOR, OPENED)) {
            TELL(", its front doors wide open");
        }
        TELL(PTAB, "Turning south, you see a ");
        if(isIS(FOREST_EDGE, MUNGED)) {
            TELL("wall of ", XTREES
, " waiting to descend upon the village.", CR);
            return true;
        }
        TELL("narrow trail winding up into the mountains");
        if(isT(MAGMA_TIMER)) {
            TELL(", backlit by a ");
            GLOW_COLOR();
            TELL("glow of heat");
        }
        TELL(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "IN")) {
            P_WALK_DIR = "WEST";
        } else if(isEQUAL(P_WALK_DIR, "UP", "SOUTH")) {
            P_WALK_DIR = "SOUTH";
            if(isT(MAGMA_TIMER)) {
                if(isWEARING_MAGIC(RING)) {
                    TELL("Your ring finger tingles as you draw closer to the blistering heat.", CR);
                    return true;
                }
                TELL("A blistering wall of heat forces you to turn back.", CR);
                return RFATAL();
            } else if(isGLOBAL_IN(FOREST_EDGE, SNOW)) {
                TELL("Your feet become dusted with snow as you ascend.", CR);
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_CHAPEL = () => OBJECT({
	LOC: ROOMS,
	DESC: "Chapel",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	FNUM: OTHRIFF,
	EAST: THRU(CHAPEL_DOOR, IN_THRIFF),
	OUT: THRU(CHAPEL_DOOR, IN_THRIFF),
	UP: PER(EXIT_PEW),
	GLOBAL: [CHAPEL_DOOR, CHAPEL],
	ACTION: IN_CHAPEL_F
});

var THRIFF_WON/*FLAG*/ = null;

function IN_CHAPEL_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        if(isIN(CLERIC, IN_CHAPEL)) {
            if(isIN(RELIQUARY, CLERIC)) {
                TELL(CTHE(CLERIC
), " stands beside ", THE(ALTAR), ", holding ");
                CONTENTS(CLERIC);
            } else {
                TELL("An anxious ", CONGREG
, " kneels in silent prayer before ", THE(CLERIC
), ". On the altar beside him rests ");
                CONTENTS(ALTAR);
            }
        } else {
            TELL("Rows of empty pews face a deserted altar");
            if(isSEE_ANYTHING_IN(ALTAR)) {
                TELL(", upon which rests ");
                CONTENTS(ALTAR);
            }
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_BEG)) {
        if(!(isIN(CLERIC, IN_CHAPEL))) {
            return false;
        } else if(isVERB(V_HIT, V_MUNG, V_KICK)) {
            TELL("This is no place for violence.", CR);
            return RFATAL();
        } else if(isT(THRIFF_WON)) {
            
        } else if((_X = isTALKING())) {
            MAKE(CLERIC, SEEN);
            PCLEAR();
            TELL(C(QUOTATION));
            _X = RANDOM(100);
            if(_X < 33) {
                TELL("Shhh");
            } else if(_X < 67) {
                TELL("Quiet");
            } else {
                TELL("Shush");
            }
            TELL("!\" whispers a member of ", THE(CONGREG), PERIOD);
            return RFATAL();
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(CLERIC, LIVING))) {
            MAKE(CLERIC, LIVING);
            UNMAKE(CLERIC, SEEN);
            P_HIM_OBJECT = CLERIC;
            P_THEM_OBJECT = CONGREG;
            CLERIC_SCRIPT = INIT_CLERIC_SCRIPT;
            QUEUE(I_CLERIC);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "OUT")) {
            P_WALK_DIR = "EAST";
        }
        if(isT(THRIFF_WON)) {
            
        } else if(isIN(CLERIC, IN_CHAPEL)) {
            DEQUEUE(I_CLERIC);
            TELL(C(QUOTATION), PICK_NEXT(CLERIC_WOES)
, "!\" wails ", THE(CLERIC), PERIOD);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var FOREST_EDGE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lava Flow",
	SDESC: DESCRIBE_FOREST_EDGE,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(IN_THRIFF),
	DOWN: TO(IN_THRIFF),
	NE: SORRY("Rock walls block your path."),
	NW: SORRY("Rock walls block your path."),
	WEST: TO(ON_TRAIL),
	UP: TO(ON_TRAIL),
	EXIT_STR: "Christmas trees block your path.",
	GLOBAL: [XTREES, SNOW, GLYPH, TRAIL],
	FNUM: OTHRIFF,
	ACTION: FOREST_EDGE_F
});

function DESCRIBE_FOREST_EDGE(_OBJ) {
    return TELL("Snowy Clearing");
}

function FOREST_EDGE_F(_CONTEXT=null) {
    let _BHERE=0;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        if(isGLOBAL_IN(FOREST_EDGE, LAVA)) {
            TELL("An avalanche of lava has consumed the upward trail, ending here in a ");
            if(isT(MAGMA_TIMER)) {
                GLOW_COLOR();
                TELL(B("POOL"));
            } else {
                TELL("dark, steaming crust");
            }
            TELL(". Many of the surrounding ");
            SAY_TREES();
            TELL(" are damaged; the survivors linger near the blackened edge of the clearing.", CR);
        } else {
            TELL("The upward trail bends sharply west here, winding out of sight between the ");
            SAY_TREES();
            TELL(PERIOD);
        }
        isMENTION_GLYPH();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIS(XTREES, SEEN)) {
            P_THEM_OBJECT = XTREES;
        }
        if(isGLOBAL_IN(FOREST_EDGE, GLYPH)) {
            P_IT_OBJECT = GLYPH;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(isIS(XTREES, TOUCHED))) {
            SEE_XTREES();
            return RFATAL();
        }
        if(isEQUAL(P_WALK_DIR, "UP")) {
            P_WALK_DIR = "WEST";
        }
        if(isEQUAL(P_WALK_DIR, "DOWN")) {
            P_WALK_DIR = "NORTH";
        }
        if(isEQUAL(P_WALK_DIR, "NORTH")) {
            if(isT(LAVA_TIMER)) {
                TELL("Volcanic heat singes your eyebrows as you race down the mountainside.", CR);
                return true;
            }
            TELL("You stride down into the village");
            BYE_BFLY();
            return true;
        } else if(!(isEQUAL(P_WALK_DIR, "WEST"))) {
            return false;
        } else if(isT(LAVA_TIMER)) {
            CASCADE("approach");
            return RFATAL();
        }
        TELL(CTHE(XTREES), " shuffle ");
        if(isT(MAGMA_TIMER)) {
            TELL("impotently at the lava's edge");
        } else if((isIN(BFLY, PLAYER)
  &&  isIS(BFLY, MUNGED)
  &&  isIS(BFLY, LIVING))) {
            TELL("nervously out of your way");
        } else {
            MAKE(XTREES, SEEN);
            TELL("across the upward trail, blocking it completely.", CR);
            return RFATAL();
        }
        TELL(" as you ascend the slope");
        BYE_BFLY();
        return true;
    } else {
        return false;
    }
}

function BYE_BFLY() {
    if((isIN(BFLY, HERE)
  &&  isIS(BFLY, MUNGED)
  &&  isIS(BFLY, LIVING))) {
        REMOVE(BFLY);
        DEQUEUE(I_PILLAR);
        TELL("; behind you, ", THE(BFLY), " crawls out of sight");
    }
    PRINT(PERIOD);
    return true;
}

function SEE_XTREES() {
    MAKE(XTREES, TOUCHED);
    MAKE(XTREES, SEEN);
    WINDOW(SHOWING_ROOM);
    P_THEM_OBJECT = XTREES;
    P_WALK_DIR = null;
    OLD_HERE = null;
    MOVE(ORNAMENT, HERE);
    P_IT_OBJECT = ORNAMENT;
    QUEUE(I_XTREES);
    ITALICIZE("Bonk");
    TELL("! Something hard hits the back of ", HEAD
, " and rolls to your feet.", CR);
    BMODE_ON();
    UPDATE_STAT(-5, ENDURANCE);
    TELL(TAB
, "A strange chorus of humming rises from the forest as you rub ", HEAD
, ". It takes a few moments for you to recall the familiar melody: \""
, PICK_NEXT(CAROLS), "!\"", CR);
    return false;
}

function SAY_TREES() {
    if(isIS(XTREES, TOUCHED)) {
        TELL(XTREES);
    } else {
        TELL(B("TREES"));
    }
    return true;
}

function isMENTION_GLYPH() {
    let _X;
    if(isGLOBAL_IN(HERE, GLYPH)) {
        TELL(TAB, CA(GLYPH), " is inscribed in the ");
        if(isGLOBAL_IN(HERE, SNOW)) {
            TELL(B("SNOW"));
        } else if(!(MAGMA_TIMER)) {
            TELL("hardened crust");
        } else {
            GLOW_COLOR();
            TELL(B("LAVA"));
        }
        TELL(" at your feet.", CR);
    }
    return true;
}

var ON_TRAIL = () => OBJECT({
	LOC: ROOMS,
	DESC: "Mountain Trail",
	FLAGS: [LIGHTED, LOCATION],
	EAST: TO(FOREST_EDGE),
	DOWN: TO(FOREST_EDGE),
	SOUTH: THRU(CABIN_DOOR, IN_CABIN),
	IN: THRU(CABIN_DOOR, IN_CABIN),
	WEST: TO(ON_PEAK),
	UP: TO(ON_PEAK),
	EXIT_STR: "Steep rock walls block your path.",
	GLOBAL: [SNOW, NULL, TRAIL],
	FNUM: OTHRIFF,
	ACTION: ON_TRAIL_F
});

function ON_TRAIL_F(_CONTEXT=null) {
    let _W=0, _LV=0;
    if((isIN(WIGHT, ON_TRAIL)
  &&  isIS(WIGHT, MONSTER))) {
        ++_W
    }
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        _LV = isGLOBAL_IN(ON_TRAIL, LAVA);
        TELL("This ");
        if(isT(_LV)) {
            TELL("high trail has been consumed by an avalanche of ");
            if(isT(MAGMA_TIMER)) {
                GLOW_COLOR();
            }
            TELL(LAVA);
            if(!(MAGMA_TIMER)) {
                TELL(", still steaming in the frosty air");
            }
        } else {
            TELL("snowbound trail commands a superb view of the surrounding countryside. Maybe you could enjoy the sights if ");
            if(!(LAVA_TIMER)) {
                TELL("your teeth would stop chatter");
            } else {
                TELL(THE(GROUND), " would stop shak");
            }
            TELL("ing");
        }
        if(isIS(FOREST_EDGE, MUNGED)) {
            TELL(". The downward path is hopelessly choked with "
, XTREES);
        }
        PRINT(PERIOD);
        if(!(_LV)) {
            TELL(TAB, CA(CABIN
), " hugs the south side of the trail");
            if(isIS(CABIN_DOOR, OPENED)) {
                TELL(", its front door banging open and shut in the wind");
            }
            TELL(". Before it stands a");
            if(isIS(MAILBOX, OPENED)) {
                TELL("n open ");
            } else {
                TELL(" closed ");
            }
            TELL(MAILBOX, PERIOD);
        }
        isMENTION_GLYPH();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isGLOBAL_IN(ON_TRAIL, GLYPH)) {
            P_IT_OBJECT = GLYPH;
        }
        if(isT(_W)) {
            P_IT_OBJECT = WIGHT;
            LAST_MONSTER = WIGHT;
            LAST_MONSTER_DIR = "EAST";
            QUEUE(I_WIGHT);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "DOWN")) {
            P_WALK_DIR = "EAST";
        } else if(isEQUAL(P_WALK_DIR, "UP")) {
            P_WALK_DIR = "WEST";
        } else if(isEQUAL(P_WALK_DIR, "IN")) {
            P_WALK_DIR = "SOUTH";
        }
        if(isEQUAL(P_WALK_DIR, "WEST")) {
            if(isT(LAVA_TIMER)) {
                CASCADE("you approach");
                return RFATAL();
            } else if(isIN(WIGHT, ON_TRAIL)) {
                if(!(isIS(WIGHT, MONSTER))) {
                    START_WIGHT();
                    return RFATAL();
                }
                TELL(CTHE(WIGHT
), " leaps into your path and snarls.", CR);
                return RFATAL();
            }
            return false;
        } else if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            if(!(isIS(CABIN_DOOR, OPENED))) {
                return false;
            } else if((isT(_W)
  &&  !(isIS(_W, SLEEPING)))) {
                SNARLS();
            } else {
                TELL(CYOU);
            }
            DEQUEUE(I_WIGHT);
            TELL("retreat into the shelter of "
, THE(CABIN));
            if(isT(LAVA_TIMER)) {
                PRINT(", a cascade of lava hot on your heels");
            }
            PRINT(PERIOD);
            return true;
        } else if(!(isEQUAL(P_WALK_DIR, "EAST"))) {
            return false;
        } else if((isT(_W)
  &&  !(isIS(WIGHT, SLEEPING)))) {
            SNARLS();
        } else {
            TELL(CYOU);
        }
        DEQUEUE(I_WIGHT);
        TELL("stumble down ", THE(TRAIL));
        if(isT(LAVA_TIMER)) {
            PRINT(", a cascade of lava hot on your heels");
            PRINT(PERIOD);
            return true;
        }
        BYE_BFLY();
        return true;
    } else {
        return false;
    }
}

function SNARLS() {
    TELL(CTHE(WIGHT), " snarls a threat as you ");
    return true;
}

var IN_CABIN = () => OBJECT({
	LOC: ROOMS,
	DESC: "Laboratory",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: THRU(CABIN_DOOR, ON_TRAIL),
	OUT: THRU(CABIN_DOOR, ON_TRAIL),
	IN: SORRY("You're in as far as you can go."),
	GLOBAL: [CABIN, CABIN_DOOR],
	FNUM: OTHRIFF,
	ACTION: IN_CABIN_F
});

function IN_CABIN_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Whoever works in this isolated cabin ought to consider the services of a maid nymph. Retorts, alembics and other dubious ", CHEMS, " are spilled across "
, THE(BENCH), " in the center of the room");
        MAKE(CHEMS, NODESC);
        if(isSEE_ANYTHING_IN(BENCH)) {
            TELL(". You also see ");
            CONTENTS(BENCH);
            TELL(" lying amid the mess");
        }
        UNMAKE(CHEMS, NODESC);
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

var ON_PEAK = () => OBJECT({
	LOC: ROOMS,
	DESC: "Peak",
	FLAGS: [LIGHTED, LOCATION],
	EAST: TO(ON_TRAIL),
	DOWN: TO(ON_TRAIL),
	UP: SORRY("You're up as high as you can go."),
	EXIT_STR: "You'd tumble off the peak if you went that way.",
	GLOBAL: [SNOW, NULL, TRAIL],
	FNUM: OTHRIFF,
	ACTION: ON_PEAK_F
});

function ON_PEAK_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL(XTHE);
        if(isGLOBAL_IN(ON_PEAK, LAVA)) {
            if(isT(MAGMA_TIMER)) {
                GLOW_COLOR();
            }
            TELL("flow of lava");
        } else {
            TELL("upward trail");
        }
        TELL(" ends here, at the brink of ", A(CRATER), ". ");
        if(isIN(DOME, ON_PEAK)) {
            TELL("Most of the opening is hidden beneath ", A(DOME
), " of light, at least a hundred yards across and almost as high.", CR);
        } else if(isT(LAVA_TIMER)) {
            TELL("Molten lava is spewing out of the opening in a spectacular plume.", CR);
        } else {
            SAY_STEAM();
        }
        isMENTION_GLYPH();
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "DOWN")) {
            P_WALK_DIR = "EAST";
        }
        if(isEQUAL(P_WALK_DIR, "EAST")) {
            if(isT(LAVA_TIMER)) {
                TELL("An onrushing tide of red-hot magma encourages your descent.", CR);
                return true;
            }
            TELL("You stumble down the steep trail");
            BYE_BFLY();
            return true;
        }
        return false;
    } else {
        return false;
    }
}

function SAY_STEAM() {
    TELL("Billowing clouds of steam obscure ", THE(CRATER
), "'s interior.", CR);
    return true;
}

var AT_LEDGE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Ledge",
	FLAGS: [LIGHTED, LOCATION],
	SW: TO(COVESIDE, 3),
	WEST: SORRY("Sheer cliff walls block your path."),
	NW: TO(AT_BRINE, 3),
	EXIT_STR: "You'd plummet into the sea if you went that way.",
	THINGS: [
		["SHORE", "ROAD", HERE_F],
		["ROCKY", "LEDGE", HERE_F]
	],
	FNUM: OSHORE,
	GLOBAL: [GREAT_SEA, NULL],
	ACTION: AT_LEDGE_F
});

function AT_LEDGE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This narrow path curves along a rocky ledge overlooking the sea. You ");
        if(isIS(CREVICE, NODESC)) {
            TELL("press your back against ");
            PRINT("the sheer cliff wall");
            TELL(", trying");
        } else {
            TELL("try");
        }
        TELL(" not to hear the waves crashing on the rocks, far below");
        if(!(isIS(CREVICE, NODESC))) {
            P_IT_OBJECT = CREVICE;
            TELL(PTAB, CA(CREVICE), " has been blasted into ");
            PRINT("the sheer cliff wall");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(CREVICE, NODESC))) {
            P_IT_OBJECT = CREVICE;
        }
        return false;
    } else {
        return false;
    }
}

var TOWER_BASE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lighthouse",
	FLAGS: [LIGHTED, LOCATION],
	EAST: SORRY("Sheer cliff walls block your path."),
	EXIT_STR: "Sheer cliff walls block your path.",
	UP: PER(TOWER_BASE_UP, 1),
	FNUM: OSHORE,
	GLOBAL: [TOWER, TOWER_STEPS, CREVICE],
	ACTION: TOWER_BASE_F
});

function TOWER_BASE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("An ancient ", TOWER, " stands upon this secret plateau, looming in dark silhouette against the sky. Crumbled steps lead up into its shadowy interior.", CR);
        return true;
    } else {
        return false;
    }
}

var AT_BRINE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Tidal Flats",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: SORRY("You'd get soaked if you went that way."),
	NE: TO(IN_ACCARDI),
	EAST: SORRY("You'd get soaked if you went that way."),
	SE: TO(AT_LEDGE, 3),
	NW: TO(AT_BROOK, 3),
	ODOR: BRINE,
	BELOW: BRINE,
	EXIT_STR: "Sheer cliff walls block your path.",
	THINGS: [
		["SHORE", "ROAD", HERE_F]
	],
	FNUM: OSHORE,
	GLOBAL: [GREAT_SEA, ACCARDI, BRIDGE, BROOK],
	ACTION: AT_BRINE_F
});

function AT_BRINE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        PRINT("The ocean smell is strong");
        TELL(" here, where a nameless brook meets the tidal flats of the Great Sea. One road follows the water inland; another spans a bridge to the northeast.", CR);
        return true;
    } else {
        return false;
    }
}

var AT_BROOK = () => OBJECT({
	LOC: ROOMS,
	DESC: "Babbling Brook",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: SORRY("You'd get soaked if you went that way."),
	NE: SORRY("You'd get soaked if you went that way."),
	SE: TO(AT_BRINE, 3),
	WEST: PER(AT_BROOK_WEST, 9),
	NW: SORRY("You'd get soaked if you went that way."),
	EXIT_STR: "A thick forest blocks your path.",
	THINGS: [
		["", "PATH", HERE_F],
		["", "FOOTPATH", HERE_F]
	],
	FNUM: OACCARDI,
	GLOBAL: [BROOK],
	ACTION: AT_BROOK_F
});

function AT_BROOK_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A footpath emerges from the shadow of a forbidding forest, curving southwest along the edge of a brook.", CR);
        return true;
    } else {
        return false;
    }
}

var IN_ACCARDI = () => OBJECT({
	LOC: ROOMS,
	DESC: "Accardi-by-the-Sea",
	FLAGS: [LIGHTED, LOCATION],
	EAST: TO(AT_GATE),
	WEST: THRU(WEAPON_DOOR, IN_WEAPON),
	IN: THRU(WEAPON_DOOR, IN_WEAPON),
	SW: TO(AT_BRINE),
	FNUM: OACCARDI,
	GLOBAL: [GREAT_SEA, ACCARDI, GUILD_HALL, WEAPON_DOOR, WEAPON_SHOP],
	ACTION: IN_ACCARDI_F
});

function IN_ACCARDI_F(_CONTEXT=null) {
    let _OBJ;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Home of the most famous of all Enchanters' Guilds, Accardi is usually crowded with autograph seekers and hopeful young apprentices. But the crooked streets are oddly quiet today"
, PTAB, CA(WEAPON_SHOP), " stands near ", THE(BRIDGE), " leading out of town");
        if(isIS(WEAPON_DOOR, OPENED)) {
            TELL(". Its ", WEAPON_DOOR, " is wide open");
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

var IN_WEAPON = () => OBJECT({
	LOC: ROOMS,
	DESC: "Weapon Shop",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	EAST: THRU(WEAPON_DOOR, IN_ACCARDI),
	OUT: THRU(WEAPON_DOOR, IN_ACCARDI),
	NORTH: PER(ENTER_CURTAIN),
	IN: PER(ENTER_CURTAIN),
	THIS_CASE: WCASE,
	FNUM: OACCARDI,
	GLOBAL: [WEAPON_DOOR, WEAPON_SHOP, ACCARDI],
	ACTION: IN_WEAPON_F
});

function IN_WEAPON_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Lethal instruments of iron and steel crowd every inch of this tiny establishment. The gleam of polished metal makes your fist clench with expensive fantasies of aggression", PTAB, "Your attention comes to rest on a ");
        SHOP_DOOR(WEAPON_DOOR);
        LOOK_ON_CASE(ON_WCASE);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        GET_OWOMAN_AND_CURTAIN();
        return false;
    } else {
        return false;
    }
}

var AT_GATE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Outside Guild Hall",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(IN_HALL),
	IN: TO(IN_HALL),
	WEST: TO(IN_ACCARDI),
	FNUM: OACCARDI,
	GLOBAL: [GUILD_HALL, ACCARDI, NYMPH],
	ACTION: AT_GATE_F
});

function NYMPH_SAYS() {
    TELL("ear. \"There's no one here right now,\" she squeaks, \"so you'd better not");
    return true;
}

function AT_GATE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Before you stands the headquarters of The Accardi Chapter of the Guild of Enchanters, better known as \"The Circle.\" Its legendary membership and mighty deeds need no introduction.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIN(GRINDER, AT_GATE)) {
            SEE_GRINDER();
            TELL(TAB, "\"Welcome back,\" coos ", THE(GRINDER
), " with an evil grin.", CR);
            return true;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(P_WALK_DIR)) {
            return false;
        } else if(isIN(GRINDER, AT_GATE)) {
            if(isEQUAL(P_WALK_DIR, "WEST")) {
                DEQUEUE(I_GRINDER);
                TELL("\"Coward!\" taunts ", THE(GRINDER), " as you duck out of range.", CR);
                return true;
            }
            TELL(CTHE(GRINDER
), " steps into your path, laughing.", CR);
            return RFATAL();
        } else if(isEQUAL(P_WALK_DIR, "NORTH", "IN")) {
            if(!(isIS(NYMPH, LIVING))) {
                TELL("You step unchallenged through the open gate.", CR);
                return true;
            } else if(isIS(GRINDER, NODESC)) {
                UNMAKE(GRINDER, NODESC);
                GRTIMER = 4;
                QUEUE(I_GRINDER_APPEARS);
            }

            if(isIS(GUILD_HALL, TOUCHED)) {
                TELL(CTHE(NYMPH
), " promptly reappears. \"They're not back yet. Go away");
            } else {
                TELL("A tiny ", NYMPH
, " appears, floating in the air beside your ");
                NYMPH_SAYS();
                TELL(" come in");
            }
            MAKE(GUILD_HALL, TOUCHED);
            PRINT(". Bye!\"|  She disappears with a wink.|");
            return RFATAL();
        } else if(isEQUAL(P_WALK_DIR, "WEST")) {
            if((isIS(GRINDER, NODESC)
  ||  isT(GRTIMER))) {
                TELL("A");
                if(isEQUAL(GRTIMER, 1, 2)) {
                    TELL("nother");
                }
                PRINT(" noise makes you hesitate.|");
                if(isIS(GRINDER, NODESC)) {
                    UNMAKE(GRINDER, NODESC);
                    GRTIMER = 3;
                    QUEUE(I_GRINDER_APPEARS);
                }
                I_GRINDER_APPEARS();
                return RFATAL();
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_HALL = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lobby",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	SOUTH: TO(AT_GATE),
	OUT: TO(AT_GATE),
	FNUM: OACCARDI,
	GLOBAL: [ACCARDI, GUILD_HALL, NYMPH],
	ACTION: IN_HALL_F
});

VOC("DISPEL", NOUN);
VOC("DISPEL", ADJ);

function IN_HALL_F(_CONTEXT=null) {
    let _OBJ;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL(CTHE(CEILING
), " of this once-splendid chamber has collapsed, burying doors and stairwells under tons of debris. The elliptical scorches on the walls are unmistakable, even to a novice; but why would anyone fire magic missiles here, in the very midst of the Circle?", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(IN_HALL, SEEN))) {
            MAKE(IN_HALL, SEEN);
            _OBJ = toOBJECT(PICK_ONE(WAND_LIST));
            UNMAKE(_OBJ, NODESC);
            PUTP(_OBJ, "ACTION", DISPEL_WAND_F);
            PUTP(_OBJ, "SDESC", DESCRIBE_DISPEL_WAND);
            GETPT(_OBJ, "SYNONYM")[0] = "DISPEL";
            GETPT(_OBJ, "ADJECTIVE")[0] = "DISPEL";
            PUTP(_OBJ, "DESCFCN", DESCRIBE_HALL_WAND);
            MOVE(_OBJ, IN_HALL);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL1A = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lighthouse, 1st Level",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SAY_TO(TOWER_BASE, "You hurry down the steps."),
	GLOBAL: [TOWER, TOWER_STEPS, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL1A_F
});

function LEVEL1A_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A welcome patch of daylight is visible at the bottom of the stairway.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "DOWN", "OUT")) {
            /*if(isIS(DORN, LIVING)) {
                DEQUEUE(I_DISTANT_DORN);
            }*/
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else {
        return false;
    }
}

function TOWER_BASE_UP() {
    let _RM, _X;
    if(!(isIS(LEVEL1A, TOUCHED))) {
        MAKE(LEVEL1A, TOUCHED);
        SCRAMBLE(TOWER1_ROOMS);
        while(true) {
            _RM = toROOM(TOWER1_ROOMS[RANDOM(4)]);
            if(isEQUAL(_RM, LEVEL1A)) {
                continue;
            }break;
        }
        isNEXT_WAND(DESCRIBE_TOWER_WAND, _RM);
    }
    /*if(isIS(DORN, LIVING)) {
        MAKE(DORN, SEEN);
        QUEUE(I_DISTANT_DORN);
    }*/
    if(isIS(SPIDER, NODESC)) {
        UNMAKE(SPIDER, NODESC);
        QUEUE(I_SPIDER);
    }
    YOU_CLIMB_UP();
    return LEVEL1A;
}

function LEVEL1_UP() {
    let _RM;
    if(!(isIS(LEVEL2A, TOUCHED))) {
        MAKE(LEVEL2A, TOUCHED);
        isNEW_EXIT(LEVEL2A, "DOWN", (SCONNECT + 1 + MARKBIT), HERE);
        SCRAMBLE(TOWER2_ROOMS);
        while(true) {
            _RM = toROOM(TOWER2_ROOMS[RANDOM(4)]);
            if(isEQUAL(_RM, LEVEL2A)) {
                continue;
            }break;
        }
        MOVE(CARD, _RM);
    }
    if(isIS(SLUG, NODESC)) {
        UNMAKE(SLUG, NODESC);
        QUEUE(I_SLUG);
    }
    YOU_CLIMB_UP();
    return LEVEL2A;
}

function LEVEL2_UP() {
    let _RM, _X;
    if(!(isIS(LEVEL3A, TOUCHED))) {
        MAKE(LEVEL3A, TOUCHED);
        isNEW_EXIT(LEVEL3A, "DOWN", (SCONNECT + 1 + MARKBIT), HERE);
        SCRAMBLE(TOWER3_ROOMS);

        while(true) {
            _RM = toROOM(TOWER3_ROOMS[RANDOM(4)]);
            if(isEQUAL(_RM, LEVEL3A)) {
                continue;
            }break;
        }
        isNEXT_SCROLL(DESCRIBE_TOWER_SCROLL, _RM);
    }
    YOU_CLIMB_UP();
    return LEVEL3A;
}

function LEVEL3_UP() {
    if(!(isIS(TOWER_TOP, TOUCHED))) {
        MAKE(TOWER_TOP, TOUCHED);
        isNEW_EXIT(TOWER_TOP, "DOWN", (SCONNECT + 1 + MARKBIT)
, HERE);
        isNEW_EXIT(HERE, "UP", (CONNECT + 1 + MARKBIT), TOWER_TOP);
    }
    YOU_CLIMB_UP();
    return TOWER_TOP;
}

function isMENTION_TOWER_STEPS() {
    if(isGLOBAL_IN(HERE, TOWER_STEPS)) {
        TELL(". A narrow flight of steps winds upward");
    }
    PRINT(PERIOD);
    return true;
}

function SAY_EXIT() {
    let _TBL, _DIR, _XDIR;
    _XDIR = (RANDOM(8) - 1);
    _DIR = _XDIR;
    while(true) {
        if(++_DIR > I_NW) {
            _DIR = I_NORTH;
        }
        _TBL = GETP(HERE, PDIR_LIST[_DIR]);
        if(!(_TBL)) {
            
        } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT)) {
            TELL(B(DIR_NAMES[_DIR]));
            return false;
        }
    }
}

var LEVEL1B = () => OBJECT({
	LOC: ROOMS,
	DESC: "Crumbling Walls",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL1B_F
});

function LEVEL1B_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Uneven rays of daylight seep in through walls crumbling with age");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER1_ROOMS)) {
            isNEW_EXIT(LEVEL1B, "UP", (FCONNECT + 1 + MARKBIT), LEVEL1_UP);
            isREPLACE_GLOBAL(LEVEL1B, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL1C = () => OBJECT({
	LOC: ROOMS,
	DESC: "Room of Gloom",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL1C_F
});

function LEVEL1C_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The dusty light streaming in from the ");
        SAY_EXIT();
        TELL(" only deepens the gloom of this forgotten chamber");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER1_ROOMS)) {
            isNEW_EXIT(LEVEL1C, "UP", (FCONNECT + 1 + MARKBIT), LEVEL1_UP);
            isREPLACE_GLOBAL(LEVEL1C, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL1D = () => OBJECT({
	LOC: ROOMS,
	DESC: "Creaky Corner",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL1D_F
});

function LEVEL1D_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Rotten floorboards creak with age as you tiptoe across them");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER1_ROOMS)) {
            isNEW_EXIT(LEVEL1D, "UP", (FCONNECT + 1 + MARKBIT), LEVEL1_UP);
            isREPLACE_GLOBAL(LEVEL1D, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL2A = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lighthouse, 2nd Level",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SAY_TO(LEVEL2A, "You descend the steps."),
	GLOBAL: [TOWER, TOWER_STEPS, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL2A_F
});

function LEVEL2A_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The steps winding downward are choked in a tangle of shadows and useless debris.", CR);
        return true;
    } else {
        return false;
    }
}

var LEVEL2B = () => OBJECT({
	LOC: ROOMS,
	DESC: "Twilit Room",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL2B_F
});

function LEVEL2B_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The faint smudge of light from the ");
        SAY_EXIT();
        TELL(" is barely enough to light your way");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER2_ROOMS)) {
            isNEW_EXIT(LEVEL2B, "UP", (FCONNECT + 1 + MARKBIT), LEVEL2_UP);
            isREPLACE_GLOBAL(LEVEL2B, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL2C = () => OBJECT({
	LOC: ROOMS,
	DESC: "Saggy Ceiling",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL2C_F
});

function LEVEL2C_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You duck low to avoid the sagging, wormy timbers overhead");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER2_ROOMS)) {
            isNEW_EXIT(LEVEL2C, "UP", (FCONNECT + 1 + MARKBIT), LEVEL2_UP);
            isREPLACE_GLOBAL(LEVEL2C, NULL, TOWER_STEPS);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_END)) {
        if(PROB(10)) {
            TELL(TAB, "You bang your head on ", THE(CEILING), ". Oof!", CR);
            UPDATE_STAT(-4);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL2D = () => OBJECT({
	LOC: ROOMS,
	DESC: "Chamber of Light",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL2D_F
});

function LEVEL2D_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Planes of daylight slice the air through cracks in the walls and ceiling");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER2_ROOMS)) {
            isNEW_EXIT(LEVEL2D, "UP", (FCONNECT + 1 + MARKBIT), LEVEL2_UP);
            isREPLACE_GLOBAL(LEVEL2D, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL3A = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lighthouse, 3rd Level",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SAY_TO(LEVEL3A, "You climb down the steps."),
	GLOBAL: [TOWER, TOWER_STEPS, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL3A_F
});

function LEVEL3A_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Deep, inky shadows obscure the stairwell winding downward.", CR);
        return true;
    } else {
        return false;
    }
}

var LEVEL3B = () => OBJECT({
	LOC: ROOMS,
	DESC: "Dusty Corner",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL3B_F
});

function LEVEL3B_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The sound of your footsteps is dampened by the fine dust coating every inch of this dimly lit chamber");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER3_ROOMS)) {
            isNEW_EXIT(LEVEL3B, "UP", (FCONNECT + 1 + MARKBIT)
, LEVEL3_UP);
            isREPLACE_GLOBAL(LEVEL3B, NULL, TOWER_STEPS);
        }
        if(isIN(DUST, LEVEL3B)) {
            P_IT_OBJECT = DUST;
            P_THEM_OBJECT = DUST;
            if(BUNNIES > 89) {
                TELL("A cloud of dust billows up as you enter!", CR);
                if(isT(VERBOSITY)) {
                    CRLF();
                }
            }
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIN(DUST, HERE)) {
            LAST_MONSTER = DUST;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, null, "UP", "DOWN")) {
            
        } else if(isIN(DUST, HERE)) {
            UNMAKE(DUST, SEEN);
            if(BUNNIES > 89) {
                PRINT("Your path is hopelessly blocked by ");
                TELL(DUST, PERIOD);
                return RFATAL();
            }
            TELL("You edge your way past ", THE(DUST), PERIOD);
            return true;
        }
        return false;
    } else {
        return false;
    }
}



var LEVEL3C = () => OBJECT({
	LOC: ROOMS,
	DESC: "Dimly-Lit Room",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL3C_F
});

function LEVEL3C_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Streaks of light from the ");
        SAY_EXIT();
        TELL(" exit fall in jagged patches across ", THE(FLOOR));
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER3_ROOMS)) {
            isNEW_EXIT(LEVEL3C, "UP", (FCONNECT + 1 + MARKBIT)
, LEVEL3_UP);
            isREPLACE_GLOBAL(LEVEL3C, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var LEVEL3D = () => OBJECT({
	LOC: ROOMS,
	DESC: "Saggy Floor",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: SORRY("There aren't any stairs leading up from here."),
	DOWN: SORRY("There aren't any stairs leading down from here."),
	GLOBAL: [TOWER, NULL, DEBRIS],
	DNUM: 0,
	FNUM: OSHORE,
	ACTION: LEVEL3D_F
});

function LEVEL3D_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL(YOU_HEAR
, "the creak of sagging timber as ", THE(FLOOR
), " struggles to bear your weight");
        isMENTION_TOWER_STEPS();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isLAST_ROOM_IN(TOWER3_ROOMS)) {
            isNEW_EXIT(LEVEL3D, "UP", (FCONNECT + 1 + MARKBIT)
, LEVEL3_UP);
            isREPLACE_GLOBAL(LEVEL3D, NULL, TOWER_STEPS);
        }
        return false;
    } else {
        return false;
    }
}

var TOWER_TOP = () => OBJECT({
	LOC: ROOMS,
	DESC: "Lamp Room",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	UP: SORRY("You're up as high as you can go."),
	DOWN: SAY_TO(TOWER_TOP, "You scramble down the steps."),
	FNUM: OSHORE,
	GLOBAL: [TOWER, TOWER_STEPS, DEBRIS],
	ACTION: TOWER_TOP_F
});

function TOWER_TOP_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Nothing remains of the stormproof panes that once enclosed this circular chamber on every side. The floor is littered with glass and debris");
        if(isSEE_ANYTHING_IN(LAMPHOUSE)) {
            TELL(", in which you also see ");
            CONTENTS(LAMPHOUSE);
        }
        TELL(PTAB, "A flight of steps descends into shadow.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIN(DORN, TOWER_TOP)) {
            SEE_CHARACTER(DORN);
        }
        return false;
    } else {
        return false;
    }
}

var AT_DOCK = () => OBJECT({
	LOC: ROOMS,
	DESC: "Skyway Entrance",
	FLAGS: [LIGHTED, LOCATION],
	EAST: TO(IN_PORT),
	EXIT_STR: "Dense jungle blocks your path.",
	SEE_ALL: JUNGLE,
	IN: PER(ENTER_GONDOLA),
	GLOBAL: [NULL, DOCK, JUNGLE],
	FNUM: OMIZNIA,
	ACTION: AT_DOCK_F
});

function ENTER_GONDOLA() {
    if(!(isIN(GONDOLA, AT_DOCK))) {
        TELL(CTHE(DGONDOLA), " isn't back yet.", CR);
        return false;
    }
    PERFORM("ENTER", GONDOLA);
    return false;
}

function AT_DOCK_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Aggressive ad campaigns and the deregulation of ZIFMIA spells have made Miznia's Jungle Skyway the fifth biggest tourist attraction in the Southlands. Passengers ");
        if(isIN(GONDOLA, HERE)) {
            TELL("are ");
            if(GON < 2) {
                TELL("streaming out of ");
            } else {
                TELL("crowding for a space in ");
            }
            TELL(THE(GONDOLA));
            if(!(isIN(PLAYER, GONDOLA))) {
                TELL(" docked nearby");
            }
            TELL(PERIOD);
            return true;
        }
        TELL("crowd around the entry gate, ");
        if(isEQUAL(GON, 4)) {
            TELL("watching a ", GONDOLA
, " glide away into the haze.", CR);
            return true;
        }
        TELL("waiting for the ");
        if(isEQUAL(GON, 14)) {
            TELL(GONDOLA, " now ");
            PRINT("approaching from the south.|");
            return true;
        }
        TELL("next ", GONDOLA, " to appear.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(DGONDOLA, SEEN))) {
            MAKE(DGONDOLA, SEEN);
            QUEUE(I_GONDOLA);
        }
        if(isIN(GONDOLA, AT_DOCK)) {
            P_IT_OBJECT = GONDOLA;
            SEE_CHARACTER(CONDUCTOR);
        }
        MOVE(PASSENGERS, AT_DOCK);
        P_THEM_OBJECT = PASSENGERS;
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        MOVE(PASSENGERS, GONDOLA);
        return false;
    } else {
        return false;
    }
}

var NW_UNDER = () => OBJECT({
	LOC: ROOMS,
	DESC: "Support Tower",
	FLAGS: [LIGHTED, LOCATION],
	SE: PER(NW_UNDER_SE, 1),
	UP: TO(NW_SUPPORT),
	DOWN: SORRY("You're already at the bottom of the ladder."),
	EXIT_STR: "Dense jungle blocks your path.",
	OVERHEAD: SUPPORT,
	SEE_ALL: JUNGLE,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: UNDERS_F
});

var SW_UNDER = () => OBJECT({
	LOC: ROOMS,
	DESC: "Support Tower",
	FLAGS: [LIGHTED, LOCATION],
	NE: PER(SW_UNDER_NE, 1),
	UP: TO(SW_SUPPORT),
	DOWN: SORRY("You're already at the bottom of the ladder."),
	EXIT_STR: "Dense jungle blocks your path.",
	SEE_ALL: JUNGLE,
	OVERHEAD: SUPPORT,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: UNDERS_F
});

var SE_UNDER = () => OBJECT({
	LOC: ROOMS,
	DESC: "Support Tower",
	FLAGS: [LIGHTED, LOCATION],
	NW: PER(SE_UNDER_NW, 1),
	UP: TO(SE_SUPPORT),
	DOWN: SORRY("You're already at the bottom of the ladder."),
	EXIT_STR: "Dense jungle blocks your path.",
	SEE_ALL: JUNGLE,
	OVERHEAD: SUPPORT,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: UNDERS_F
});

function UNDERS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Steel girders rise high above the treetops of the surrounding jungle");
        if(isGLOBAL_IN(HERE, DGONDOLA)) {
            TELL(". Peering upward, you notice ", A(DGONDOLA
), " gliding overhead");
        }
        TELL(PTAB, "A skinny ladder leads upward.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "UP")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
            TELL("You scoot up the ladder.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var NW_SUPPORT = () => OBJECT({
	LOC: ROOMS,
	DESC: "top",
	SDESC: DESCRIBE_TOPS,
	FLAGS: [LIGHTED, LOCATION],
	DOWN: TO(NW_UNDER),
	UP: SORRY("You're up as high as you can go."),
	IN: PER(SUPPORTS_IN),
	EXIT_STR: "You'd fall off the platform if you went that way.",
	SEE_ALL: JUNGLE,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, PLATFORM, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: TOPS_F
});

var SW_SUPPORT = () => OBJECT({
	LOC: ROOMS,
	DESC: "top",
	SDESC: DESCRIBE_TOPS,
	FLAGS: [LIGHTED, LOCATION],
	DOWN: TO(SW_UNDER),
	UP: SORRY("You're up as high as you can go."),
	IN: PER(SUPPORTS_IN),
	EXIT_STR: "You'd fall off the platform if you went that way.",
	SEE_ALL: JUNGLE,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, PLATFORM, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: TOPS_F
});

var SE_SUPPORT = () => OBJECT({
	LOC: ROOMS,
	DESC: "top",
	SDESC: DESCRIBE_TOPS,
	FLAGS: [LIGHTED, LOCATION],
	DOWN: TO(SE_UNDER),
	UP: SORRY("You're up as high as you can go."),
	IN: PER(SUPPORTS_IN),
	EXIT_STR: "You'd fall off the platform if you went that way.",
	SEE_ALL: JUNGLE,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	GLOBAL: [NULL, SUPPORT, PLATFORM, JUNGLE],
	FNUM: OJUNGLE,
	ACTION: TOPS_F
});

function SUPPORTS_IN() {
    if(isIN(PLAYER, GONDOLA)) {
        PERFORM("EXIT", GONDOLA);
        return false;
    } else if(isIN(GONDOLA, HERE)) {
        PERFORM("ENTER", GONDOLA);
        return false;
    } else if(isGLOBAL_IN(HERE, DGONDOLA)) {
        PERFORM("ENTER", DGONDOLA);
        return false;
    }
    V_WALK_AROUND();
    return false;
}

function DESCRIBE_TOPS(_OBJ) {
    if(isIN(PLAYER, GONDOLA)) {
        
        return TELL("Beside Tower");
    }
    
    return TELL("Maintenance Platform");
}

function TOPS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        if(isIN(PLAYER, GONDOLA)) {
            TELL(CYOUR, GONDOLA
, " is passing a few feet away from a Skyway support tower. A small maintenance ", PLATFORM, " is enclosed within the steel girders; beside it, you notice a skinny ladder leading down towards the treetops.", CR);
            return true;
        }
        TELL("A spiderweb of structural steel rises above the treetops, tapering up to this narrow vantage near the top. The topmost rungs of a skinny ladder are within your reach.", CR);
        if((isIN(GONDOLA, HERE)
  ||  isGLOBAL_IN(HERE, DGONDOLA))) {
            TELL(TAB, CA(DGONDOLA), " is gliding ");
            if(isIN(GONDOLA, HERE)) {
                TELL("close by ");
            } else if(isEQUAL(GON, 11, 8, 5)) {
                TELL("towards ");
            } else {
                TELL("away from ");
            }
            TELL(THE(PLATFORM), PERIOD);
        }
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(!(isIS(DGONDOLA, SEEN))) {
            MAKE(DGONDOLA, SEEN);
            QUEUE(I_GONDOLA);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "DOWN")) {
            if(isIN(PLAYER, GONDOLA)) {
                YOUD_HAVE_TO("get out of", GONDOLA);
                return RFATAL();
            }
            TELL("You scramble down the ladder.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var JUN0 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Quicksand",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DOWN: PER(ENTER_QUICKSAND),
	IN: PER(ENTER_QUICKSAND),
	EXIT_STR: "Dense jungle blocks your path.",
	DNUM: 0,
	BELOW: QUICKSAND,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	FNUM: OJUNGLE,
	ACTION: JUN0_F
});

function JUN0_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A strip of dry path winds alongside a pool of ", QUICKSAND);
        if(isSEE_ANYTHING_IN(QUICKSAND)) {
            TELL(". ", YOU_SEE);
            CONTENTS(QUICKSAND);
            TELL(" stuck into the wet, gritty surface");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIS(MAMA, NODESC)) {
            UNMAKE(MAMA, NODESC);
            QUEUE(I_BABY);
            QUEUE(I_MAMA);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, null, "UP")) {
            
        } else if(isIN(BABY, QUICKSAND)) {
            MAKE(BABY, SEEN);
            TELL(CTHE(BABY
), " bellows mournfully as you walk away.", CR);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var WORM_ROOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Fungus",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	FNUM: OJUNGLE,
	ACTION: WORM_ROOM_F
});

function WORM_ROOM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL(CTHE(GROUND
), " here is concealed beneath a growth of fungus, green and squishy.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(isIS(WORM, MONSTER))) {
            START_WORM("step past");
            return RFATAL();
        }
        return false;
    } else {
        return false;
    }
}

var JUN2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	FNUM: OJUNGLE,
	ACTION: JUNGLE_ROOM_F
});

var JUN3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	FNUM: OJUNGLE,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	ACTION: JUNGLE_ROOM_F
});

var JUN4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	FNUM: OJUNGLE,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	ACTION: JUNGLE_ROOM_F
});

var JUN5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	FNUM: OJUNGLE,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	ACTION: JUNGLE_ROOM_F
});

var JUN6 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	UP: 0,
	DOWN: 0,
	BELOW: 0,
	IN: 0,
	OUT: 0,
	OVERHEAD: 0,
	DNUM: 0,
	FNUM: OJUNGLE,
	SEE_ALL: JUNGLE,
	HEAR: JUNGLE,
	ODOR: JUNGLE,
	GLOBAL: [JUNGLE],
	EXIT_STR: "Dense jungle blocks your path.",
	ACTION: JUNGLE_ROOM_F
});

function JUNGLE_ROOM_F(_CONTEXT=null) {
    let _TBL;
    if(!(isEQUAL(_CONTEXT, M_ENTERING))) {
        return false;
    } else if(isIS(HERE, TOUCHED)) {
        return false;
    } else if((!(isIS(CROCO, SEEN))
  &&  isLAST_ROOM_IN(JUNGLE_ROOMS, 3))) {
        MAKE(CROCO, SEEN);
        PUTP(HERE, "ACTION", IDOL_ROOM_F);
        PUTP(HERE, "SDESC", DESCRIBE_IDOL_ROOM);
        MOVE(CROCO, HERE);
        MOVE(MAW, HERE);
        isNEW_EXIT(HERE, "UP"
, (FCONNECT + 1 + MARKBIT), ENTER_CROCO);
        isNEW_EXIT(HERE, "IN"
, (FCONNECT + 1 + MARKBIT), ENTER_CROCO);
        isNEW_EXIT(HERE, "OUT"
, (FCONNECT + 1 + MARKBIT), EXIT_CROCO);
        CLEAR_MAW_EXITS();
        return false;
    } else {
        _TBL = PICK_ONE(JUNGLE_DESCS);
        PUTP(HERE, "SDESC", _TBL[0]);
        PUTP(HERE, "ACTION", _TBL[1]);
        return false;
    }
}

function CLEAR_MAW_EXITS() {
    let _X;
    _X = LOC(CROCO);
    PUTP(_X, "BELOW", 0);
    PUTP(_X, "OVERHEAD", MAW);
    isNEW_EXIT(_X, "DOWN", SORRY_EXIT, NOT_IN_MAW);
    return false;
}

function DESCRIBE_IDOL_ROOM(_OBJ) {
    return TELL("Idol");
}

function IDOL_ROOM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A stone idol, carved in the likeness of a giant crocodile, stands in a clearing");
        if(isSEE_ANYTHING_IN(MAW)) {
            TELL(". ", YOU_SEE);
            CONTENTS(MAW);
            TELL(" in its gaping maw");
        }
        TELL(PERIOD);
        return true;
    } else {
        return false;
    }
}

function NOT_IN_MAW() {
    TELL("You're not in the maw.", CR);
    return false;
}

function DESCRIBE_JD0(_OBJ) {
    return TELL("Underbrush");
}

function JD0_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Unseen creatures scurry out of your path as you struggle through the damp underbrush.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_JD1(_OBJ) {
    return TELL("Birdcries");
}

function JD1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The unnerving cries of exotic birds echo in the treetops.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_JD2(_OBJ) {
    return TELL("Creepers");
}

function JD2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A slimy tangle of vines and creepers dangles high overhead, swinging to and fro in the humid breeze.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_JD3(_OBJ) {
    return TELL("Ferns");
}

function JD3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A natural canopy of ferns mutes the sunlight to a cool, emerald dusk.", CR);
        return true;
    } else {
        return false;
    }
}

var OVER_JUNGLE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Over Jungle",
	FLAGS: [LIGHTED, LOCATION],
	SEE_ALL: JUNGLE,
	BELOW: JUNGLE,
	ODOR: JUNGLE,
	HEAR: JUNGLE,
	FNUM: OJUNGLE,
	EXIT_STR: "You'd plummet to your death if you went that way.",
	GLOBAL: [DOCK, JUNGLE, NULL],
	ACTION: OVER_JUNGLE_F
});

function OVER_JUNGLE_F(_CONTEXT=null) {
    let _X, _Y;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        _X = "WEST";
        if(isEQUAL(GON, 7, 8)) {
            _X = "SOUTH";
        } else if(isEQUAL(GON, 10, 11)) {
            _X = "EAST";
        } else if(isEQUAL(GON, 13, 14)) {
            _X = "NORTH";
        }
        TELL(CYOUR, GONDOLA, " is gliding ", B(_X
), ", high over the lush jungles and sparkling rivers of Miznia. ");
        if(isEQUAL(GON, 4)) {
            RECEDING(DOCK);
            return true;
        } else if(isEQUAL(GON, 5)) {
            EMERGING(SUPPORT);
            return true;
        } else if(isEQUAL(GON, 8, 11)) {
            EMERGING(SUPPORT, "Another ");
            return true;
        } else if(isEQUAL(GON, 14)) {
            EMERGING(DOCK);
            return true;
        }
        RECEDING(SUPPORT);
        return true;
    } else {
        return false;
    }
}

function EMERGING(_OBJ, _X) {
    if(isASSIGNED(_X)) {
        TELL("Another ");
    } else {
        TELL(XTHE);
    }
    TELL(D(_OBJ), " is emerging from the haze ahead.", CR);
    return true;
}

function RECEDING(_OBJ) {
    TELL(CTHE(_OBJ), " is receding into the haze.", CR);
    return true;
}

var AT_FALLS = () => OBJECT({
	LOC: ROOMS,
	DESC: "Waterfall",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: PER(AT_FALLS_N, 5),
	SW: TO(IN_THRIFF),
	IN: PER(ENTER_FALLS),
	ODOR: JUNGLE,
	HEAR: WATERFALL,
	GLOBAL: [JUNGLE, NULL],
	FNUM: OJUNGLE,
	THINGS: [
		["", "LEDGE", USELESS]
	],
	ACTION: AT_FALLS_F
});

function AT_FALLS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A dazzling cascade roars down from a ledge overhead, fed by the snowy peaks rising to the south");
        if(isIS(IN_THRIFF, MUNGED)) {
            TELL(". The trail leading ", B("SOUTHWEST"
), " is choked with ", XTREES);
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_PASTURE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Mountain Pasture",
	FLAGS: [LIGHTED, LOCATION],
	SE: TO(IN_THRIFF),
	WEST: TO(SE_WALL),
	UP: PER(CLIMB_A_TREE),
	DOWN: PER(EXIT_A_TREE),
	THINGS: [
		["", "PASTURE", HERE_F]
	],
	OVERHEAD: OAK,
	FNUM: OTHRIFF,
	GLOBAL: [SNOW, NULL, NULL],
	ACTION: IN_PASTURE_F
});

function IN_PASTURE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This windswept pasture is dotted with ancient oaks. A snowy trail winds upward");
        if(isIS(IN_THRIFF, MUNGED)) {
            TELL(", and a solid wall of ", XTREES
, " lies to the ", B("SOUTHEAST"));
        }
        TELL(PERIOD);
        isMENTION_GLYPH();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIN(HUNTERS, IN_PASTURE)) {
            MAKE(HUNTERS, SEEN);
            SEE_CHARACTER(HUNTERS);
        }
        QUEUE(I_HUNTERS);
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isIN(MINX, OAK)
  &&  isIS(MINX, LIVING))) {
            TELL("A loud voice makes you hesitate.", CR);
            return RFATAL();
        }
        DEQUEUE(I_HUNTERS);
        if(isEQUAL(P_WALK_DIR, "UP")) {
            P_WALK_DIR = "WEST";
        }
        if(isIN(HUNTER, IN_PASTURE)) {
            ABORT_HUNT();
            TELL(CTHE(HUNTER), " watches you leave.", CR);
            return true;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_END)) {
        if(!(isIN(HUNTER, IN_PASTURE))) {
            
        } else if(!(isEQUAL(WINNER, PLAYER))) {
            
        } else if(isVERB(V_LISTEN, V_SMELL)) {
            
        } else if((isVERB(V_ASK_ABOUT, V_ASK_FOR, V_TELL_ABOUT)
  &&  isPRSI(OAK, MINX))) {
            
        } else if(isEQUAL(OAK, PRSO, PRSI)) {
            DRAW_ATTENTION_TO(OAK);
            return true;
        } else if(isEQUAL(MINX, PRSO, PRSI)) {
            DRAW_ATTENTION_TO(MINX);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

function DRAW_ATTENTION_TO(_OBJ) {
    TELL(TAB, "Your action draws ", THE(HUNTER
), "'s attention to ", THE(_OBJ), PERIOD);
    HUNTER_SEES_MINX();
    return true;
}

function HUNTER_SEES_MINX() {
    ABORT_HUNT();
    TELL(TAB
, `\"Aha!\" he cries, plucking the minx out from behind the oak by the scruff of her neck. \"Thought ye'd get away from me, did ye? It's back home I'll be bringin' you, for a whippin' ye won't soon forget!\"
  The last thing you hear is a tearful cry of \"Minx!\" as `, THE(HUNTER
), " stalks away with his quarry.", CR);
    return true;
}

function ABORT_HUNT() {
    DEQUEUE(I_HUNT);
    REMOVE(HUNTER);
    P_HIM_OBJECT = NOT_HERE_OBJECT;
    REMOVE(MINX);
    P_HER_OBJECT = NOT_HERE_OBJECT;
    QCONTEXT = null;
    QCONTEXT_ROOM = null;
    WINDOW(SHOWING_ROOM);
    return false;
}

var SE_WALL = () => OBJECT({
	LOC: ROOMS,
	DESC: "Rock Wall",
	FLAGS: [LIGHTED, LOCATION],
	EAST: TO(IN_PASTURE),
	SOUTH: SORRY("The rock wall blocks your path."),
	NW: PER(CANT_ENTER_WALL),
	IN: PER(CANT_ENTER_WALL),
	WEST: SORRY("The rock wall blocks your path."),
	DOWN: TO(IN_PASTURE),
	GLOBAL: [SWALL, CASTLE, SNOW, NULL],
	FNUM: OTHRIFF,
	ACTION: SE_WALL_F
});

function CANT_ENTER_WALL() {
    let _X;
    if(isEQUAL(P_WALK_DIR, "IN", "OUT")) {
        TELL(CANT, "see anywhere to go ");
        _X = "OUT";
        if(isEQUAL(P_WALK_DIR, null, "IN")) {
            _X = "IN";
        }
        TELL(B(_X), PERIOD);
        return false;
    }
    _X = GETP(HERE, "EXIT-STR");
    if(isT(_X)) {
        TELL(_X, CR);
        return false;
    }
    PRINT("The rock wall blocks your path.");
    CRLF();
    return false;
}

function SE_WALL_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A sunlit wall of stone rises above the snow-dusted ground. Gazing farther up the mountainside, you see the parapets of a mighty ", CASTLE, PERIOD);
        if(isIS(SWALL, SEEN)) {
            TELL(TAB);
            SEE_DOORLIKE(SWALL);
            TELL("wall.", CR);
        }
        isMENTION_GLYPH();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIS(SWALL, SEEN)) {
            P_IT_OBJECT = SWALL;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isEQUAL(P_WALK_DIR, "IN")
  &&  isIS(SWALL, OPENED))) {
            P_WALK_DIR = "NW";
        }
        return false;
    } else {
        return false;
    }
}

var SE_CAVE = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	SE: PER(CANT_ENTER_WALL),
	OUT: PER(CANT_ENTER_WALL),
	SW: TO(CAVE7),
	IN: 0,
	FNUM: OCAVES,
	EXIT_STR: "A cold, hard wall blocks your path.",
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SWALL, SUNBEAM],
	ACTION: SE_CAVE_F
});

function SE_CAVE_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        NOTE_WALL(SWALL, "SOUTHEAST");
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIN(GRUE, HERE)) {
            REMOVE(GRUE);
        }
        if(isIS(SE_CAVE, SEEN)) {
            
        } else if(!(isSETUP_CAVES())) {
            return RFATAL();
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIS(SWALL, SEEN)) {
            P_IT_OBJECT = SWALL;
        }
        if(isIS(LANTERN, LIGHTED)) {
            isNO_LANTERN_HERE();
        }
        return false;
    } else {
        return false;
    }
}

function CHUCKLE() {
    TELL(TAB);
    if(isHERE(IN_LAIR)) {
        MAKE(URGRUE, SEEN);
        TELL("\"Heh, heh, heh,\" chuckles ", THE(URGRUE), PERIOD);
        return true;
    }
    TELL("An evil chuckle echoes through the caverns.", CR);
    return true;
}

function NOTE_WALL(_OBJ, _WRD) {
    TELL("This ");
    if(!(isIS(_OBJ, OPENED))) {
        TELL("dead-end ");
    }
    TELL("passage grows wider as it bends ", B(_WRD
), ", ending at a flat wall of rock");
    if(isIS(_OBJ, SEEN)) {
        TELL(". ");
        if(isIS(_OBJ, OPENED)) {
            TELL("Daylight ");
            if(isHERE(SE_CAVE)) {
                TELL("streams in from ");
            } else {
                TELL("can be seen beyond ");
            }
            TELL("an ", B("OPENING"));
        } else {
            PRINT("A doorlike ");
            TELL(B("OUTLINE"), " is visible");
        }
        TELL(" therein");
    }
    PRINT(PERIOD);
    return true;
}

var NE_CAVE = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NW: PER(CANT_ENTER_WALL),
	OUT: PER(CANT_ENTER_WALL),
	SW: 0,
	IN: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [NWALL, SUNBEAM],
	EXIT_STR: "A cold, hard wall blocks your path.",
	ACTION: NE_CAVE_F
});

function NE_CAVE_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        NOTE_WALL(NWALL, "NORTHWEST");
        isMENTION_BEAM();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIN(GRUE, HERE)) {
            REMOVE(GRUE);
        }
        if(isIS(NE_CAVE, SEEN)) {
            
        } else if(!(isSETUP_CAVES())) {
            return RFATAL();
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIS(NWALL, SEEN)) {
            P_IT_OBJECT = NWALL;
        }
        if(isIS(LANTERN, LIGHTED)) {
            isNO_LANTERN_HERE();
        }
        return false;
    } else {
        return false;
    }
}

var NE_WALL = () => OBJECT({
	LOC: ROOMS,
	DESC: "Shady Wall",
	FLAGS: [LIGHTED, LOCATION],
	EAST: SORRY("The rock wall blocks your path."),
	SE: PER(CANT_ENTER_WALL),
	IN: PER(CANT_ENTER_WALL),
	SOUTH: SORRY("The rock wall blocks your path."),
	NE: TO(XROADS),
	GLOBAL: [NULL, NWALL, CASTLE],
	FNUM: OXROADS,
	ACTION: NE_WALL_F
});

function NE_WALL_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The air is cool here, beneath the shadow of a towering wall of rock");
        if(isIS(NWALL, SEEN)) {
            TELL(". ");
            SEE_DOORLIKE(NWALL);
            TELL(B("WALL"));
        }
        TELL(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERED)) {
        if(isIS(NWALL, SEEN)) {
            P_IT_OBJECT = NWALL;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isEQUAL(P_WALK_DIR, "IN")
  &&  isIS(NWALL, OPENED))) {
            P_WALK_DIR = "SE";
        }
        return false;
    } else {
        return false;
    }
}

var CAVE0 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE0_F
});

function CAVE0_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Cold, clammy walls of rock recede deep into the shadows.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE1_F
});

function CAVE1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The steady drip of invisible moisture echoes in the passageway.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE2_F
});

function CAVE2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The air here is pungent with subterranean vapors.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE3_F
});

function CAVE3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Ebony walls of rock deepen the shadows on every side.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE4_F
});

function CAVE4_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Only a few feet separate the walls of this stultifying passage.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE6 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	SW: 0,
	NW: 0,
	DNUM: 0,
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE6_F
});

function CAVE6_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The close, stale air in this chamber makes breathing difficult.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

var CAVE7 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_CAVES,
	FLAGS: [LOCATION, INDOORS],
	NE: TO(SE_CAVE),
	NW: 0,
	IN: 0,
	OUT: TO(SE_CAVE),
	FNUM: OCAVES,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	GLOBAL: [SUNBEAM],
	ACTION: CAVE7_F
});

function CAVE7_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The walls of this shallow chamber are coated with a thick blanket of moss, fed by unseen trickles of water.", CR);
    }
    return isMOVE_GRUE(_CONTEXT);
}

function isMOVE_GRUE(_CONTEXT) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        isMENTION_BEAM();
        return true;
    } else if((isEQUAL(_CONTEXT, M_ENTERING)
  &&  isIN(GRUE, HERE))) {
        REMOVE(GRUE);
        return true;
    } else {
        return false;
    }
}

function isMENTION_BEAM() {
    let _DIR, _TBL;
    if(isEQUAL(GETP(HERE, "MIRROR-OBJ"), NO_MIRROR)) {
        _DIR = GETP(HERE, "BEAM-DIR");
        if(isEQUAL(_DIR, NO_MIRROR)) {
            return false;
        }
        PRINT("  A beam of sunlight ");
        TELL("shines in from the ", B(DIR_NAMES[_DIR]));
        _DIR = (_DIR + 4);
        if(_DIR > I_NW) {
            _DIR = (_DIR - 8);
        }
        _TBL = GETP(HERE, PDIR_LIST[_DIR]);
        if(!(_TBL)) {
            
        } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT)) {
            TELL(", and disappears to the "
, B(DIR_NAMES[_DIR]));
        }
        TELL(PERIOD);
        return true;
    }
    return false;
}

var ON_PIKE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Edge of Storms",
	FLAGS: [LIGHTED, LOCATION],
	SE: TO(HILLTOP),
	WEST: PER(ENTER_PLAIN_E, 13),
	GLOBAL: [PRAIRIE],
	FNUM: OGRUBBO,
	THINGS: [
		["", "BILLBOARD", BILLBOARD_PSEUDO],
		["BILL", "BOARD", BILLBOARD_PSEUDO],
		["", "SIGN", BILLBOARD_PSEUDO],
		["", "NOTICE", BILLBOARD_PSEUDO]
	],
	ACTION: ON_PIKE_F
});

function ON_PIKE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        SEE_FIELDS("WEST");
        TELL(PTAB, "A billboard stands in a ", WEEDS);
        if(isSEE_ANYTHING_IN(WEEDS)) {
            TELL(". Around it you see ");
            CONTENTS(WEEDS);
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(isEQUAL(P_WALK_DIR, "WEST"))) {
            return false;
        }
        return isENTER_PLAIN();
    } else {
        return false;
    }
}

var XROADS = () => OBJECT({
	LOC: ROOMS,
	DESC: "Intersection",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(IN_GURTH),
	SE: TO(IN_PORT, 11),
	SW: TO(NE_WALL),
	EAST: PER(ENTER_PLAIN_W, 13),
	GLOBAL: [PRAIRIE, GURTH],
	FNUM: OXROADS,
	ACTION: XROADS_F
});

function XROADS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        SEE_FIELDS("EAST");
        TELL(". But the snow-capped peaks of Southern Mithicus are bright with sunshine"
, PTAB, "The outskirts of Gurth City");
        PRINT(" can be seen not far to the north.|");
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isEQUAL(P_WALK_DIR, "WEST")) {
            if(isT(AUTO)) {
                BMODE_OFF();
            }
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "EAST")) {
            return isENTER_PLAIN();
        } else if(isEQUAL(P_WALK_DIR, "NORTH")) {
            ENTER_CITY();
            return true;
        }
        return false;
    } else {
        return false;
    }
}

function ENTER_CITY() {
    TELL(PICK_NEXT(CITY_ENTRIES)
, " as you cross the city limits.", CR);
    return true;
}

function SEE_FIELDS(_WRD) {
    TELL("Gray fields extend to the ", B(_WRD));
    PRINT(" as far as you can see");
    TELL(", under ");
    PRINT("a sky black with thunderclouds");
    return true;
}

function isENTER_PLAIN() {
    let _X, _Y, _L, _LL;
    _L = LOC(GOBLET);
    KERBLAM();
    TELL("Forks of ", B("LIGHTNING"
), " dance across your path");
    if(!(isIS(ROSE_ROOM, LOCATION))) {
        TELL(", and the clouds boom with laughter");
    }
    if((isEQUAL(_L, PLAYER)
  ||  (isT(_L)
  &&  isIN(_L, PLAYER)
  &&  isSEE_INSIDE(_L)))) {
        if(isIS(ROSE_ROOM, LOCATION)) {
            TELL(", answered by ", THE(GOBLET));
            if(!(isEQUAL(_L, PLAYER))) {
                ON_IN(_L);
            }
        } else {
            TELL(". But ", THE(GOBLET));
            if(!(isEQUAL(_L, PLAYER))) {
                ON_IN(_L);
            }
            TELL(" emits an answering flash, and the threat from the sky subsides");
        }
        TELL(PTAB);
    } else {
        MAKE(IMPS, MUNGED);
        TELL(PERIOD);
        return RFATAL();
    }
    _L = LOC(MINX);
    if((isT(_L)
  &&  isIS(MINX, LIVING))) {
        _LL = LOC(_L);
        if(isEQUAL(PLAYER, _L, _LL)) {
            MOVE(MINX, HERE);
            TELL(CTHE(MINX), " struggles out of ");
            if(isEQUAL(_L, PLAYER)) {
                TELL("your arms");
            } else {
                TELL(THE(_L));
            }
            TELL(" and");
            PRINT(" cowers at the field's edge.|  ");
        } else if(isEQUAL(HERE, _L)) {
            TELL(CTHE(MINX));
            PRINT(" cowers at the field's edge.|  ");
        }
    }

    MAKE(CORBIES, SEEN);
    QUEUE(I_CORBIES);
    if(!(isIS(ROSE_ROOM, LOCATION))) {
        MAKE(ROSE_ROOM, LOCATION);
        TELL("As you set out across ", THE(PRAIRIE
), ", the colors around you seem to smudge and fade. Soon the entire landscape is rendered in shades of gray.", CR);
        return true;
    }
    TELL("All color drains from the landscape.", CR);
    return true;
}

var PLAIN_COUNT/*NUMBER*/ = 6;

function isPLAIN_CONTEXT(_CONTEXT) {
    let _TBL, _X;
    if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(HERE, TOUCHED))) {
            if(--PLAIN_COUNT < 1) {
                FARM_ROOM = HERE;
                isNEW_EXIT(FARM_ROOM, "SOUTH", SORRY_EXIT
, "The ground is a bit too rough that way.", null);
                if(!(isIS(FARMHOUSE, NODESC))) {
                    DROP_FARM();
                }
            } else if(isEQUAL(PLAIN_COUNT, 5)) {
                MOVE(SCARE1, HERE);
            } else if(isEQUAL(PLAIN_COUNT, 4)) {
                MOVE(CLOVER, HERE);
            } else if(isEQUAL(PLAIN_COUNT, 3)) {
                MOVE(SCARE2, HERE);
            } else if(isEQUAL(PLAIN_COUNT, 2)) {
                isNEXT_SCROLL(DESCRIBE_PLAIN_SCROLL, HERE);
            } else if(isEQUAL(PLAIN_COUNT, 1)) {
                MOVE(SCARE3, HERE);
            }
        }
        MAKE(CORBIES, SEEN);
        if(isIS(FARMHOUSE, SEEN)) {
            
        } else if(isIS(FARMHOUSE, NODESC)) {
            
        } else if(isHERE(FARM_ROOM)) {
            STORM_TIMER = 5;
            QUEUE(I_TWISTER);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isIS(FARMHOUSE, SEEN)) {
            
        } else if(isIS(FARMHOUSE, NODESC)) {
            
        } else if(isHERE(FARM_ROOM)) {
            if(isEQUAL(STORM_TIMER, 3)) {
                TELL("A sudden");
                PRINT(" noise makes you hesitate.|");
                return RFATAL();
            } else if(isEQUAL(P_WALK_DIR, "SOUTH", "IN")) {
                if(isIN(TWISTER, HERE)) {
                    MOVE(TWISTER, IN_FARM);
                    TELL("You fight your way through the rising gale.", CR);
                    return true;
                }
                return false;
            } else if(isEQUAL(STORM_TIMER, 0, 4, 5)) {
                STORM_TIMER = 0;
                DEQUEUE(I_TWISTER);
            } else {
                P_WALK_DIR = null;
                TELL("The rising gale makes it impossible to walk that way.", CR);
                return RFATAL();
            }
        }
        if(isIS(HERE, SEEN)) {
            
        } else if(((isEQUAL(P_WALK_DIR, "WEST")
  &&  isHERE(WEST_EXIT))
  ||  (isEQUAL(P_WALK_DIR, "EAST")
  &&  isHERE(EAST_EXIT)))) {
            TELL("Color slowly returns to the landscape.", CR);
            return true;
        }
        if(!(isEQUAL(P_WALK_DIR, "NORTH"))) {
            return false;
        }
        _X = GETP(HERE, P_WALK_DIR);
        if(!(_X)) {
            return false;
        } else if(!(isEQUAL(_X[XROOM], ROSE_ROOM))) {
            return false;
        } else if((isT(BADKEY)
  &&  isIN(BADKEY, PLAYER))) {
            TELL("Screeching with fear, ", THE(CORBIES
), " swoop out of your way.", CR);
            return true;
        }
        TELL("A screeching wall of corbies blocks the way.", CR);
        return RFATAL();
    } else {
        return false;
    }
}

var WEST_EXIT/*OBJECT*/ = null;
var EAST_EXIT/*OBJECT*/ = null;
var FARM_ROOM/*OBJECT*/ = null;

var PLAIN0 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN0_F
});

function PLAIN0_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The landscape is mottled with rocky terrain and windswept tracts of g"
        + GOLD_GRAY()
        +" grass");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

var PLAIN1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN1_F
});

function PLAIN1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("G" + GOLD_GRAY() + " hills of grass sweep back and forth in the storm-driven wind");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

var PLAIN2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN2_F
});

function PLAIN2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A sky black with thunderclouds looms over g" + GOLD_GRAY()
        + " acres of windswept grass");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

var PLAIN3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN3_F
});

function PLAIN3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Flashes of lightning light your path between the barren rocks and g"+GOLD_GRAY()
        + " patches of grass");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

var PLAIN4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN4_F
});

function PLAIN4_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The windblown grass stretches in every ", INTDIR);
        PRINT(" as far as you can see");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

var PLAIN5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_FROTZEN,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	EXIT_STR: "The ground is a bit too rough that way.",
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [NULL, NULL, PRAIRIE, STORM],
	ACTION: PLAIN5_F
});

function PLAIN5_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("G" + GOLD_GRAY()
        + " tracts of windswept grass sway to and fro under the dark, stormy sky");
        MENTION_CORBIES();
        return true;
    }
    return isPLAIN_CONTEXT(_CONTEXT);
}

function DESCRIBE_FROTZEN(_OBJ) {
    return "The G" + GOLD_GRAY() + " Fields of Frotzen";
}

function GOLD_GRAY() {
    return isIS(HERE, SEEN) ? "olden" : "ray";
}

function DESCRIBE_FARM_ROOM(_OBJ) {
    return isIS(FARMHOUSE, SEEN) ? "Vacant Lot" : "Farmyard";
}

function MENTION_CORBIES() {
    let _TBL;
    if((isHERE(FARM_ROOM)
  &&  isIN(TWISTER, HERE))) {
        TELL(PERIOD);
        return false;
    }
    TELL(". ");
    if(PROB(50)) {
        TELL("Corbies are ");
    } else {
        TELL("A flock of corbies is ");
    }
    TELL("circling ");
    _TBL = GETP(HERE, "NORTH");
    if(!(_TBL)) {
        
    } else if(isEQUAL(_TBL[XROOM], ROSE_ROOM)) {
        TELL("a point on ", THE(GROUND
), " not far to the north.", CR);
        return true;
    }
    TELL("in tight, menacing circles overhead.", CR);
    return true;
}

var ROSE_ROOM = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: DESCRIBE_ROSE_ROOM,
	FLAGS: [LIGHTED, /*LOCATION*/],
	SOUTH: TO(ROSE_ROOM),
	EXIT_STR: "The ground is a bit too rough that way.",
	FNUM: OPLAIN,
	THINGS: [
		["", "GROTTO", HERE_F]
	],
	GLOBAL: [PRAIRIE, STORM, CORBIES],
	ACTION: ROSE_ROOM_F
});

function DESCRIBE_ROSE_ROOM(_OBJ) {
    return (isIS(ROSE_ROOM, SEEN) ? "Golden" : "Gray") + " Grotto";
}

function ROSE_ROOM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You're in the grotto.", CR);
        return true;
    } else {
        return false;
    }
}

var IN_FARM = () => OBJECT({
	LOC: ROOMS,
	DESC: "Farm House",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	NORTH: THRU(FARM_DOOR, IN_FARM),
	OUT: THRU(FARM_DOOR, IN_FARM),
	IN: SORRY("You're in as far as you can go."),
	SEE_ALL: FARMHOUSE,
	DNUM: 0,
	FNUM: OPLAIN,
	GLOBAL: [FARMHOUSE, FARM_DOOR, FARM_WINDOW],
	ACTION: IN_FARM_F
});

function DESCRIBE_IN_FARM(_OBJ) {
    PRINTD(_OBJ);
    TELL(", in a ", TWISTER);
    return true;
}

function IN_FARM_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This tiny shack looks much as you'd expect after falling thousands of feet. No two of the splintered walls are parallel. The floor and ceiling are likewise skewed at crazy angles.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isEQUAL(P_WALK_DIR, "NORTH", "OUT")
  &&  isIS(FARM_DOOR, OPENED))) {
            if(isIN(TWISTER, IN_FARM)) {
                UNMAKE(FARM_DOOR, OPENED);
                WINDOW(SHOWING_ROOM);
                ITALICIZE("Bang");
                TELL("! The wind slams ", THE(FARM_DOOR
), " in your face.", CR);
                return RFATAL();
            } else if(isIN(FCROWD, IN_FROON)) {
                TELL(CTHE(FCROWD
), " cheers louder as you leave ", THE(FARMHOUSE), PERIOD);
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}

var IN_GURTH = () => OBJECT({
	LOC: ROOMS,
	DESC: "South Market",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(AT_MAGICK),
	SOUTH: TO(XROADS),
	GLOBAL: [GURTH],
	FNUM: OCITY,
	EXIT_STR: "An impatient crowd of shoppers pushes you back.",
	ACTION: IN_GURTH_F
});

function IN_GURTH_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Both sides of this busy thoroughfare are crammed with stalls. Hawkers shout and gesticulate at the passersby, their hoarse obscenities mingling with the smell of sweat and burning food.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(P_WALK_DIR)) {
            
        } else if(isIS(CAKE, NODESC)) {
            UNMAKE(CAKE, NODESC);
            MOVE(CAKE, HERE);
            P_IT_OBJECT = CAKE;
            QUEUE(I_CAKE, 3);
            WINDOW(SHOWING_ROOM);
            TELL(`\"Oof!\"
  The street hawker you just bumped into glowers. \"Watch where I'm goin', will ya!\" You clumsily help to pick up her spilled wares; she stomps away without a word of thanks.
  As you dust yourself off, you notice something`);
            PRINT(" lying in the dust.");
            CRLF();
            return RFATAL();
        } else /*if(isEQUAL(P_WALK_DIR, "NORTH")) {
            CROWD_PUSH();
            return true;
        }*//*if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            EXIT_CITY();
            return true;
        }*/
        return false;
    } else {
        return false;
    }
}

/*function CROWD_PUSH() {
    PRINT("You push your way ");
    if(PROB(50)) {
        TELL(B("THROUGH"));
    } else {
        TELL("deeper into");
    }
    TELL(" the teeming crowd.", CR);
    return true;
}*/

/*function EXIT_CITY() {
    let _X;
    _X = RANDOM(100);
    TELL(XTHE);
    if(_X < 33) {
        TELL(B("SMELL"));
    } else if(_X < 67) {
        TELL(B("NOISE"));
    } else {
        TELL(B("SMELL"), "s and ", B("NOISE"));
    }
    TELL("s of the city fade behind you.", CR);
    return true;
}*/

var AT_MAGICK = () => OBJECT({
	LOC: ROOMS,
	DESC: "North Market",
	FLAGS: [LIGHTED, LOCATION],
	NE: TO(NGURTH),
	SOUTH: TO(IN_GURTH),
	WEST: THRU(MAGICK_DOOR, IN_MAGICK),
	IN: THRU(MAGICK_DOOR, IN_MAGICK),
	GLOBAL: [MAGICK_DOOR, MSHOPPE, GURTH],
	FNUM: OCITY,
	ACTION: AT_MAGICK_F
});

function AT_MAGICK_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This is the safer end of Gurth City's notorious market district. Shop windows are mostly unbroken here, and the cobblestones don't stick to your shoes"
, PTAB, "The gabled facade of Ye Olde Magick Shoppe lends an air of ersatz charm to the west side of the street");
        if(isIS(MAGICK_DOOR, OPENED)) {
            TELL(". The front door is wide open");
        }
        PRINT(PERIOD);
        return true;
    } else /*if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "NORTH")) {
            EXIT_CITY();
            return true;
        } else if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            CROWD_PUSH();
            return true;
        }
        return false;
    }*/{
        return false;
    }
}

var IN_MAGICK = () => OBJECT({
	LOC: ROOMS,
	DESC: "Magick Shoppe",
	FLAGS: [LIGHTED, LOCATION, INDOORS],
	EAST: THRU(MAGICK_DOOR, AT_MAGICK),
	OUT: THRU(MAGICK_DOOR, AT_MAGICK),
	WEST: PER(ENTER_CURTAIN),
	IN: PER(ENTER_CURTAIN),
	FNUM: OCITY,
	THIS_CASE: MCASE,
	GLOBAL: [MAGICK_DOOR, MSHOPPE, GURTH],
	ACTION: IN_MAGICK_F
});

function IN_MAGICK_F(_CONTEXT=null) {
    let _CNT=0;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A lone black candle obscures the proportions of this windowless shop. The scent of tallow is strong, heightening the aura of arcane mystery", PTAB
, "Your eyes are irresistibly drawn to a ");
        SHOP_DOOR(MAGICK_DOOR);
        LOOK_ON_CASE(ON_MCASE);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(!(isIS(MCASE, SEEN))) {
            MAKE(MCASE, SEEN);
            while(true) {
                PUTP(isNEXT_POTION(MCASE), "VALUE", 24);
                if(++_CNT > 2) {
                    break;
                }
            }
        }
        GET_OWOMAN_AND_CURTAIN();
        return false;
    } else {
        return false;
    }
}

var NGURTH = () => OBJECT({
	LOC: ROOMS,
	DESC: "Outskirts",
	FLAGS: [LIGHTED, LOCATION],
	SW: TO(AT_MAGICK),
	NORTH: PER(NGURTH_N, 1),
	FNUM: OCITY,
	GLOBAL: [GURTH],
	ACTION: NGURTH_F
});

function NGURTH_F(_CONTEXT=null) {
    let _X, _WRD;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The path before you leads away from the ");
        if(isEQUAL(P_WALK_DIR, "NE")) {
            PRINT("outskirts of Gurth City");
            _WRD = "SOUTH";
            _X = "edge of a vast forest";
        } else {
            PRINT("edge of a vast forest");
            _WRD = "NORTH";
            _X = "outskirts of Gurth City";
        }
        TELL(", meandering across the hills towards the ", B(_WRD), "ernmost ", _X, PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            ENTER_CITY();
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var TWILIGHT = () => OBJECT({
	LOC: ROOMS,
	DESC: "Twilight",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	IN: 0,
	OUT: 0,
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	OVERHEAD: OAK3,
	DOWN: PER(EXIT_A_TREE),
	UP: PER(CLIMB_A_TREE),
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: TWILIGHT_F
});

function TWILIGHT_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("An ancient oak tree turns the day to twilight beneath the impressive sprawl of its branches");
        LOOK_UNDER_OAK(OAK3);
        CRLF();
        return true;
    } else {
        return false;
    }
}

var FOREST1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

var FOREST2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

var FOREST3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

var FOREST4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

var FOREST5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

var FOREST6 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: OFOREST,
	GLOBAL: [WOODS],
	ACTION: FOREST_ROOM_F
});

function FOREST_ROOM_F(_CONTEXT) {
    let _TBL;
    if(!(isEQUAL(_CONTEXT, M_ENTERING))) {
        return false;
    } else if(isIS(HERE, TOUCHED)) {
        return false;
    } else if((isIS(BOULDER, NODESC)
  &&  isLAST_ROOM_IN(FOREST_ROOMS, 2))) {
        UNMAKE(BOULDER, NODESC);
        MOVE(BOULDER, HERE);
        PUTP(HERE, "SDESC", DESCRIBE_POOL);
        PUTP(HERE, "ACTION", AT_POOL_F);
        return false;
    } else {
        _TBL = PICK_ONE(FOREST_DESCS);
        PUTP(HERE, "SDESC", _TBL[0]);
        PUTP(HERE, "ACTION", _TBL[1]);
        return false;
    }
}

function OPEN_POOL() {
    isREPLACE_SYN(BOULDER, "YOUTH", "ZZZP");
    WINDOW(SHOWING_ALL);
    P_WALK_DIR = null;
    OLD_HERE = null;
    MOVE(POOL, HERE);
    P_IT_OBJECT = POOL;
    SETUP_POND_EXITS();
    TELL(`\"Behold the Pool of Eternal Youth.\"
  The hollow voice fades in the air as beams of sunlight converge on the clearing, forming a shallow pool of radiance that flows and ripples like a golden liquid.`, CR);
    return true;
}

function SETUP_POND_EXITS() {
    isNEW_EXIT(HERE, "IN", (FCONNECT + 1 + MARKBIT), ENTER_POOL);
    isNEW_EXIT(HERE, "OUT", SORRY_EXIT, "You're not in the pool.");
    return false;
}

function DESCRIBE_POOL(_OBJ) {
    return TELL("Clearing");
}

function AT_POOL_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Soft rays of sunlight filter down through the overhanging trees");
        if(isIN(POOL, HERE)) {
            TELL(", forming a circular ", POOL);
            if((!(isIN(PLAYER, POOL))
  &&  isSEE_ANYTHING_IN(POOL))) {
                TELL(". You can make out ");
                CONTENTS(POOL);
                TELL(" enveloped within");
            }
        }
        TELL(PERIOD);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F1(_OBJ) {
    return TELL("Birches");
}

function F1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A graceful stand of birches has taken root amid the tangle of roots and underbrush.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F2(_OBJ) {
    return TELL("Catalpa");
}

function F2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Your head brushes past the blossoms of a stately old catalpa tree, home of many an unseen songbird.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F3(_OBJ) {
    return TELL("Pine Grove");
}

function F3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A carpet of amber softens your footsteps between the rows of tall, sweet-smelling pines.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F4(_OBJ) {
    return TELL("Eerie Copse");
}

function F4_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A nameless blight has twisted the surrounding elms into sinister forms that creak and groan in the dry breeze.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F5(_OBJ) {
    return TELL("Willow");
}

function F5_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The limbs of an old, melancholy willow sway to and fro in the whispering breeze.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_F6(_OBJ) {
    return TELL("Talons");
}

function F6_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The gnarled branch of an ironwood tree looms above the path like the talons of a hawk descending.", CR);
        return true;
    } else {
        return false;
    }
}

var SFORD = () => OBJECT({
	LOC: ROOMS,
	DESC: "South Chasm",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(ON_BRIDGE, 9),
	SW: PER(SFORD_S, 1),
	FNUM: OFOREST,
	GLOBAL: [ZBRIDGE, ZSIGN, RIVER],
	ACTION: SFORD_F
});

function SFORD_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        SEE_BRIDGE("SOUTH");
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "NORTH")) {
            BRIDGE_DIR = "North";
            ZTOP = 1;
            ZBOT = 2;
        }
        return false;
    } else {
        return false;
    }
}

function SEE_BRIDGE(_WRD) {
    TELL("You're shivering on the ", B(_WRD
), " edge of a broad chasm. Clammy mists chill the air, and ", THE(GROUND
), " trembles with the roar of a cataract", PTAB
, "Your heart sinks as you inspect the crude rope bridge spanning the chasm. A notice hangs near ", THE(ZBRIDGE), "'s entrance.", CR);
    return true;
}

var NFORD = () => OBJECT({
	LOC: ROOMS,
	DESC: "North Chasm",
	FLAGS: [LIGHTED, LOCATION],
	NE: PER(NFORD_NE, 1),
	SOUTH: TO(ON_BRIDGE, 9),
	FNUM: ORUINS,
	GLOBAL: [ZBRIDGE, ZSIGN, RIVER],
	ACTION: NFORD_F
});

function NFORD_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        SEE_BRIDGE("NORTH");
        TELL(TAB
, "The ruins of an ancient city lie not far to the ", B("NORTHEAST"), PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            BRIDGE_DIR = "South";
            ZTOP = 1;
            ZBOT = 2;
        }
        return false;
    } else {
        return false;
    }
}

var ON_BRIDGE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Bridge",
	SDESC: DESCRIBE_ON_BRIDGE,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: TO(ON_BRIDGE, 9),
	SOUTH: TO(ON_BRIDGE, 9),
	EXIT_STR: "You'd plunge into the water if you went that way.",
	DOWN: PER(JUMP_OFF_BRIDGE),
	BELOW: RIVER,
	GLOBAL: [ZBRIDGE, RIVER],
	FNUM: OBRIDGE,
	ACTION: ON_BRIDGE_F
});

var BRIDGE_DIR/*STRING*/ = 0;
var ZTOP/*NUMBER*/ = 1;
var ZBOT/*NUMBER*/ = 2;

function DESCRIBE_ON_BRIDGE(_OBJ) {
    let str = "";
    if(isEQUAL(ZBOT, 2)) {
        str += "Halfway";
    } else if(isEQUAL(ZBOT, -1)) {
        str += "Immeasurably Close";
    } else {
        if((isEQUAL(ZBOT, HIGHEST_ZBOT)  &&  ZTOP < (HIGHEST_ZBOT - 1))) {
           str += "About ";
        }
        str += ZTOP + "/" + ZBOT + " of the Way";
    }
    if(!(BRIDGE_DIR)) {
        
        return TELL(str + " Across");
    }
   
    return  TELL(str + " to the ", BRIDGE_DIR, " End");
}

function ON_BRIDGE_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The entire bridge jerks and sways as you struggle to keep your footing on the slippery ropes. ", PICK_NEXT(BRIDGE_TYPES), PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if((isEQUAL(ZTOP, 1)
  &&  isEQUAL(ZBOT, 2)
  &&  isIS(PARASOL, NODESC)
  &&  !(isIS(PARASOL, TOUCHED)))) {
            UNMAKE(PARASOL, NODESC);
            MOVE(PARASOL, ON_BRIDGE);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(!(isEQUAL(P_WALK_DIR, "NORTH", "SOUTH"))) {
            return false;
        } else if(isIN(PARASOL, ON_BRIDGE)) {
            REMOVE(PARASOL);
            MAKE(PARASOL, NODESC);
        }
        if((!(BRIDGE_DIR)
  ||  (isEQUAL(P_WALK_DIR, "NORTH")
  &&  isEQUAL(BRIDGE_DIR, "North"))
  ||  (isEQUAL(P_WALK_DIR, "SOUTH")
  &&  isEQUAL(BRIDGE_DIR, "South")))) {
            if(isEQUAL(ZBOT, HIGHEST_ZBOT, -1)) {
                ZBOT = -1;
            } else {
                ZTOP = (ZTOP + ZBOT);
                ZBOT = (ZBOT + ZBOT);
            }
        } else if(isEQUAL(ZBOT, HIGHEST_ZBOT, -1)) {
            BRIDGE_DIR = 0;
            ZBOT = 2;
            ZTOP = 1;
        } else {
            ZBOT = (ZBOT + ZBOT);
            ZTOP = (ZBOT - ZTOP);
        }
        BRIDGE_DIR = "North";
        if(isEQUAL(P_WALK_DIR, "SOUTH")) {
            BRIDGE_DIR = "South";
        }
        return false;
    } else {
        return false;
    }
}

function JUMP_OFF_BRIDGE() {
    let _OBJ, _NXT, _X;
    TELL("You leap off the ");
    if(isHERE(ON_BRIDGE)) {
        TELL("slippery ropes");
    } else {
        TELL("chasm's edge");
    }
    TELL(AND);
    if((isIN(PARASOL, PLAYER)
  &&  isIS(PARASOL, OPENED)
  &&  !(isIS(PARASOL, MUNGED)))) {
        PCLEAR();
        TELL("drift down towards the raging water", PTAB);
        ITALICIZE("Rip");
        TELL("! A gust of spray");
        TEARS_PARASOL();
        TELL(", and you hit the freezing water...");
        if((_OBJ = isFIRST(PLAYER))) {
            while(true) {
                _NXT = isNEXT(_OBJ);
                if(isIS(_OBJ, WORN)) {
                    
                } else if(isIS(_OBJ, TAKEABLE)) {
                    MOVE(_OBJ, AT_BROOK);
                    UNMAKE(_OBJ, WIELDED);
                    if((isEQUAL(_OBJ, MINX)
  &&  isIS(_OBJ, LIVING))) {
                        KILL_MINX();
                    }
                }
                _OBJ = _NXT;
                if(!(_OBJ)) {
                    break;
                }
            }
        }
        REGAIN_SENSES();
        UNMAKE(AT_BROOK, TOUCHED);
        GOTO(AT_BROOK);
        _X = STATS[ENDURANCE];
        if(_X > 1) {
            if(isT(AUTO)) {
                BMODE_ON();
            }
            UPDATE_STAT((0 - (_X - 1)));
        }
        return false;
    }    /*"Important!"*/
    TELL("plummet to a cold, violent death in the raging waters");
    JIGS_UP();
    return false;
}

var ARCH_VOID = () => OBJECT({
	LOC: ROOMS,
	DESC: "Void",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "Nothing but void lies that way.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	FNUM: ORUINS,
	ACTION: ARCH_VOID_F
});

function ARCH_VOID_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A timeless, dimensionless void stretches be");
        if(!(ATIME)) {
            TELL("hind you, re");
            PRINT("ceding into the infinite ");
            TELL("past.", CR);
            return true;
        }
        TELL("fore you, pro");
        PRINT("ceding into the infinite ");
        TELL("future.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Savannah",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	THINGS: [
		["", "SAVANNAH", HERE_F],
		["HUGE", "DINOSAURS", USELESS],
		["HUGE", "DINOSAUR", USELESS],
		["", "VOLCANOS", USELESS]
	],
	ACTION: ARCH1_F
});

function ARCH1_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Huge dinosaurs feed on unfamiliar vegetation, lumbering against a sky red with the glare of active volcanos.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Forest Clearing",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	THINGS: [
		["", "CLEARING", HERE_F],
		["", "HUTS", USELESS],
		["", "HUT", USELESS]
	],
	GLOBAL: [PHEEBOR],
	ACTION: ARCH2_F
});

function ARCH2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The perimeter of this grassy ", B("CLEARING"
), " is dotted with primitive huts.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "New Plaza",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	GLOBAL: [PLAZA, PHEEBOR],
	ACTION: ARCH3_F
});

function ARCH3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The spires of a young and arrogant city rise around ", THE(PLAZA));
        if(isIN(PCROWD, HERE)) {
            TELL(", which is filled to capacity with a cheering throng");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        MOVE(ORATOR, HERE);
        SEE_CHARACTER(ORATOR);
        MOVE(PCROWD, HERE);
        P_THEM_OBJECT = PCROWD;
        QUEUE(I_ARCH3);
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isIN(ORATOR, HERE)) {
            REMOVE(ORATOR);
        }
        if(isIN(PCROWD, HERE)) {
            REMOVE(PCROWD);
        }
        DEQUEUE(I_ARCH3);
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Battleground",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	GLOBAL: [PLAZA, PHEEBOR],
	ACTION: ARCH4_F
});

function ARCH4_F(_CONTEXT=null) {
    let _V=0, _NEWIQ=0, _NAC=0, _OBJ, _NXT;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A mighty conflagration obscures the dying city in a pall of smoke. Motionless bodies are strewn around ", THE(ARCH), PTAB
, "Battle trenches zigzag across the plaza like open wounds. The one nearest you is ");
        if(isIN(HORSE, TRENCH)) {
            TELL("blocked by the body of ", A(HORSE));
        } else if(isSEE_ANYTHING_IN(TRENCH)) {
            TELL("sheltering ");
            CONTENTS(TRENCH);
        } else {
            TELL("unoccupied");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        REMOVE_ALL(TRENCH);
        MAKE(TRENCH, NODESC);
        MOVE(TRENCH, HERE);
        MAKE(TRENCH, OPENED);
        isREPLACE_SYN(TRENCH, "MINXHOLE", "ZZZP");
        isREPLACE_ADJ(TRENCH, "MINX", "ZZZP");
        QUEUE(I_ARCH4);
        if(!(isIN(HELM, PRINCE))) {
            if(isVISIBLE(HELM)) {
                ++_V
                if((isIN(HELM, PLAYER)
  &&  isIS(HELM, WORN))) {
                    ++_NAC
                    if(!(isIS(HELM, NEUTRALIZED))) {
                        ++_NEWIQ
                    }
                }
            }
            MOVE(HELM, PRINCE);
            PUTP(HELM, "VALUE", GETP(HELM, "DNUM"));
            UNMAKE(HELM, WORN);
            UNMAKE(HELM, WIELDED);
            if(isT(_V)) {
                WINDOW(SHOWING_ALL);
                TELL(CTHE(HELM
), " abruptly fades from view.", CR);
                if(isT(_NAC)) {
                    UPDATE_STAT((0 - GETP(HELM, "EFFECT"))
, ARMOR_CLASS);
                }
                if(isT(_NEWIQ)) {
                    NORMAL_IQ();
                }
                return true;
            }
            return false;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        DEQUEUE(I_ARCH4);
        if((_OBJ = isFIRST(TRENCH))) {
            while(true) {
                _NXT = isNEXT(_OBJ);
                if(isEQUAL(_OBJ, TEAR, DIAMOND, PHASE)) {
                    
                } else if(isEQUAL(_OBJ, TRUFFLE)) {
                    if(!(isIS(_OBJ, MUNGED))) {
                        REMOVE(_OBJ);
                    }
                } else if(!(isIS(_OBJ, FERRIC))) {
                    REMOVE(_OBJ);
                }
                _OBJ = _NXT;
                if(!(_OBJ)) {
                    break;
                }
            }
        }
        REMOVE(TRENCH);
        UNMAKE(TRENCH, OPENED);
        REMOVE(BHORSE);
        UNMAKE(PRINCE, SLEEPING);
        MAKE(PRINCE, NODESC);
        MOVE(PRINCE, HORSE);
        PUTP(PRINCE, "ACTION", PRINCE_F);
        isREPLACE_SYN(PRINCE, "HEAD", "ZZZP");
        isREPLACE_SYN(PRINCE, "BODY", "ZZZP");
        isREPLACE_SYN(PRINCE, "CORPSE", "ZZZP");
        isREPLACE_ADJ(PRINCE, "DEAD", "ZZZP");
        REMOVE(HORSE);
        REMOVE(DEAD_HORSE);
        MAKE(HORSE, LIVING);
        UNMAKE(HORSE, NODESC);
        /*isREPLACE_ADJ(HORSE, "DEAD", "ZZZP");*/
        /*PUTP(HORSE, "ACTION", HORSE_F);*/
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Rubble",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	GLOBAL: [PLAZA, PHEEBOR],
	ACTION: ARCH5_F
});

function ARCH5_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Time has not yet softened the layers of dirt and rubble obscuring the remains of the plaza.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

function isHANDLE_ARCH_ROOMS(_CONTEXT) {
    let _X, _OBJ, _NXT;
    if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isHERE(toROOM(ARCH_ROOMS[PRESENT]))) {
            return false;
        } else if((_OBJ = isFIRST(HERE))) {
            while(true) {
                _NXT = isNEXT(_OBJ);
                if(isIS(_OBJ, TAKEABLE)) {
                    REMOVE(_OBJ);
                }
                _OBJ = _NXT;
                if(!(_OBJ)) {
                    return false;
                }
            }
        }
        return false;
    } else if(!(isEQUAL(_CONTEXT, M_BEG))) {
        return false;
    } else if(isEQUAL(ATIME, PRESENT)) {
        return false;
    } else if((_X = isTALKING())) {
        TELL("Your voice has the faint, wistful quality of words ");
        if(ATIME < PRESENT) {
            TELL("yet to be spoken");
        } else {
            TELL("spoken long ago");
        }
        _X = isQCONTEXT_GOOD();
        if(isT(_X)) {
            TELL("; ", THE(_X), " seems not to hear");
        }
        PRINT(PERIOD);
        return RFATAL();
    } else {
        return false;
    }
}

var ARCH9 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Frost",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	GLOBAL: [PLAZA, PHEEBOR],
	ACTION: ARCH9_F
});

function ARCH9_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Ages of windblown dust lie hardened upon the frozen earth. The air is touched with an ominous arctic chill.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH10 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Glacier",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	THINGS: [
		["", "GLACIER", HERE_F],
		["GLACIAL", "ICE", HERE_F]
	],
	FNUM: ORUINS,
	ACTION: ARCH10_F
});

function ARCH10_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The last traces of the plaza are lost beneath an impenetrable layer of glacial ice.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH11 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Highway",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	THINGS: [
		["METAL", "MECHANISM", USELESS],
		["GLASS", "MECHANISM", USELESS],
		["", "BOULDERS", USELESS],
		["", "ROCKS", USELESS],
		["", "HIGHWAY", HERE_F]
	],
	FNUM: ORUINS,
	ACTION: ARCH11_F
});

function ARCH11_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Strange mechanisms of metal and glass zoom across a rugged landscape strewn with glacial boulders.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ARCH12 = () => OBJECT({
	LOC: ROOMS,
	DESC: "Desolation",
	FLAGS: [LIGHTED, LOCATION],
	EXIT_STR: "An irresistible force holds you near the arch.",
	NORTH: PER(TIMESHIFT, 9),
	SOUTH: PER(TIMESHIFT, 9),
	IN: PER(ENTER_ARCH),
	OUT: PER(EXIT_ARCH),
	FNUM: ORUINS,
	ACTION: ARCH12_F
});

function ARCH12_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Patient centuries have eroded much of the topsoil from the landscape. Loose, charred earth stretches away in every ", INTDIR, PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isIN(TRENCH, HERE)) {
            MAKE(TRENCH, NODESC);
            UNMAKE(TRENCH, OPENED);
            REMOVE(TRENCH);
        }
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

var ATIME/*NUMBER*/ = PRESENT;

function TIMESHIFT() {
    let _X;
    if((!(isIS(ARCH, SEEN))
  ||  (isEQUAL(P_WALK_DIR, "NORTH")
  &&  isEQUAL(ATIME, MAX_ATIME))
  ||  (isEQUAL(P_WALK_DIR, "SOUTH")
  &&  !(ATIME)))) {
        TELL("The weight of centuries restricts your motion.", CR);
        return false;
    }

    _X = APPLY(GETP(HERE, "ACTION"), M_EXIT);
    if(isT(_X)) {
        if(isEQUAL(_X, M_FATAL)) {
            return false;
        } else if(isT(VERBOSITY)) {
            CRLF();
        }
    }
    if(isEQUAL(P_WALK_DIR, "NORTH")) {
        ++ATIME
    } else {
        --ATIME
    }
    HERE = toROOM(ARCH_ROOMS[ATIME]);
    MOVE(ARCH, HERE);
    OLD_HERE = null;
    ARCHTIMER = 0;
    APPLY(GETP(HERE, "ACTION"), M_ENTERING);

    if(isIS(LIGHTSHOW, TOUCHED)) {
        TELL("You slide ");
    } else {
        TELL("The merest effort of will is enough to slide you ");
    }
    if(isEQUAL(P_WALK_DIR, "NORTH")) {
        TELL(B("FOR"));
    } else {
        TELL(B("BACK"));
    }
    TELL("ward through ", THE(LIGHTSHOW));
    if(!(isIS(LIGHTSHOW, TOUCHED))) {
        MAKE(LIGHTSHOW, TOUCHED);
        TELL(", guided by the Magick of the arch");
    }
    RELOOK();
    if(isT(GLASS_TOP)) {
        I_GLASS();
    }
    return false;
}

var IN_LAIR = () => OBJECT({
	LOC: ROOMS,
	DESC: "Treasure Chamber",
	FLAGS: [LOCATION, INDOORS],
	NE: 0,
	SE: 0,
	OUT: 0,
	MIRROR_OBJ: NO_MIRROR,
	BEAM_DIR: NO_MIRROR,
	EXIT_STR: "Rock walls block your path.",
	FNUM: OCAVES,
	GLOBAL: [SUNBEAM],
	ACTION: IN_LAIR_F
});

function IN_LAIR_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The plunder of many kingdoms lies in a vast, sparkling mound of the type often employed by dragons as a mattress. Luckily, there are no dragons to be seen");
        if(isIN(URGRUE, IN_LAIR)) {
            TELL("; but the southeast corner of the chamber is obscured by a curious shadow");
        }
        TELL(PERIOD);
        if(isSEE_ANYTHING_IN(HEAP)) {
            TELL(TAB, YOU_SEE);
            CONTENTS(HEAP);
            TELL(" lying among the treasures.", CR);
        }
        isMENTION_BEAM();
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIN(GRUE, HERE)) {
            REMOVE(GRUE);
        }
        if(isIN(URGRUE, IN_LAIR)) {
            UNMAKE(URGRUE, SEEN);
            MAKE(URGRUE, SURPRISED);
            P_HIM_OBJECT = URGRUE;
            LAST_MONSTER = URGRUE;
            QUEUE(I_URGRUE);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isIN(URGRUE, IN_LAIR)) {
            DEQUEUE(I_URGRUE);
            TELL("\"", PICK_NEXT(URGRUE_BYES)
, "\" chuckles ", THE(URGRUE), PERIOD);
            return true;
        }
        return false;
    } else {
        return false;
    }
}

var IN_FROON = () => OBJECT({
	LOC: ROOMS,
	DESC: "Froon",
	FLAGS: [LIGHTED, LOCATION, SEEN],
	SOUTH: THRU(FARM_DOOR, IN_FARM),
	IN: THRU(FARM_DOOR, IN_FARM),
	GLOBAL: [FARM_DOOR, FARM_WINDOW, FARMHOUSE, FROON],
	HEAR: 0,
	SEE_ALL: FBEDS,
	ACTION: IN_FROON_F
});

function IN_FROON_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Lullabies sing of places such as this. Songbirds swoop and glide between rows of dainty cottages; a rainbow of flowers lines the sun-dappled street, filling the air with a gentle fragrance", PTAB, XTHE);
        if(isIS(FARM_DOOR, OPENED)) {
            TELL(B("OPEN"));
        } else {
            TELL(B("CLOSED"));
        }
        TELL(C(SP), FARMHOUSE
, " leans askew upon the roadside. Beneath it, you notice what appears to be the heel of ", A(BOOT), PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIN(MAYOR, IN_FROON)) {
            P_HIM_OBJECT = MAYOR;
        }
        if(isIN(FCROWD, IN_FROON)) {
            P_THEM_OBJECT = FCROWD;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isEQUAL(P_WALK_DIR, "SOUTH", "IN")
  &&  isIS(FARM_DOOR, OPENED)
  &&  isIN(MAYOR, IN_FROON)
  &&  FSCRIPT > 5)) {
            BYE_MAYOR();
            return RFATAL();
        }
        return false;
    } else {
        return false;
    }
}

var INNARDS = () => OBJECT({
	LOC: ROOMS,
	DESC: "Inside Idol",
	FLAGS: [LOCATION, INDOORS],
	FNUM: OJUNGLE,
	EXIT_STR: "Whoever built this chamber forgot to provide any exits.",
	ACTION: INNARDS_F
});

function INNARDS_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This long, low chamber is shaped much like the gizzard of a crocodile. Trickles of fetid moisture feed the moss crusting the walls and ceiling.", CR);
        return true;
    } else {
        return false;
    }
}

var APLANE = () => OBJECT({
	LOC: ROOMS,
	DESC: "Ethereal Plane Of Atrii",
	SDESC: DESCRIBE_APLANE,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: () => [0, toROOM(APLANE), 0],
	NE: () => [0, toROOM(APLANE), 0],
	EAST: () => [0, toROOM(APLANE), 0],
	SE: () => [0, toROOM(APLANE), 0],
	SOUTH: () => [0, toROOM(APLANE), 0],
	SW: () => [0, toROOM(APLANE), 0],
	WEST: () => [0, toROOM(APLANE), 0],
	NW: () => [0, toROOM(APLANE), 0],
	BELOW: 0,
	ACTION: APLANE_F
});

function DESCRIBE_APLANE(_OBJ) {
    return PRINTD(_OBJ) + (isIN(PLAYER, _OBJ) ? TELL(", Above ", OVERS[ABOVE]) : "");
}

function APLANE_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL(XTHE);
        if(isEQUAL(ABOVE, OPLAIN)) {
            TELL("thunderclouds are ");
        } else {
            TELL("landscape is ");
        }
        TELL("compressed into a flat optical plane, stretching away below your feet in every ", INTDIR, PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        NEXT_OVER();
        return false;
    } else {
        return false;
    }
}

var IN_SKY = () => OBJECT({
	LOC: ROOMS,
	DESC: "Flying",
	SDESC: DESCRIBE_IN_SKY,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: () => [0, toROOM(IN_SKY), 0],
	NE: () => [0, toROOM(IN_SKY), 0],
	EAST: () => [0, toROOM(IN_SKY), 0],
	SE: () => [0, toROOM(IN_SKY), 0],
	SOUTH: () => [0, toROOM(IN_SKY), 0],
	SW: () => [0, toROOM(IN_SKY), 0],
	WEST: () => [0, toROOM(IN_SKY), 0],
	NW: () => [0, toROOM(IN_SKY), 0],
	BELOW: 0,
	FNUM: 0,
	ACTION: IN_SKY_F
});

var ABOVE/*NUMBER*/ = null;

function DESCRIBE_IN_SKY(_OBJ) {
    return TELL("Over ", OVERS[ABOVE]);
}

function IN_SKY_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You're soaring on ", A(DACT
), "'s back, high above ", THE(GROUND), PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        NEXT_OVER();
        return false;
    } else {
        return false;
    }
}

var IN_GARDEN = () => OBJECT({
	LOC: ROOMS,
	DESC: "Royal Garden",
	FLAGS: [LIGHTED, LOCATION]	/*IN: PER(ENTER_BUSH)*/,
	OUT: PER(EXIT_BUSH),
	UP: PER(EXIT_BUSH),
	FNUM: OCAVES,
	GLOBAL: [GARDEN, CASTLE],
	EXIT_STR: "High castle walls block your path.",
	ACTION: IN_GARDEN_F
});

function IN_GARDEN_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("You're in a private garden, enclosed by the high walls of a castle and guarded by a brooding statue of a brogmoid");
        if(isIS(BROG, OPENED)) {
            TELL(". A secret compartment in ", THE(BROG), " is open");
            if(isSEE_ANYTHING_IN(BROG)) {
                TELL(", revealing ");
                CONTENTS(BROG);
            }
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(_CONTEXT, M_ENTERING)) {
        if(isIS(QUEEN, NODESC)) {
            PTIMER = 0;
            QUEUE(I_QUEEN);
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if(isIN(QUEEN, IN_GARDEN)) {
            REMOVE(QUEEN);
            if(isIN(MIRROR0, IN_GARDEN)) {
                DESTROY_MIRROR(MIRROR0);
                DEQUEUE(I_MIRRORS);
            }
        }
        DEQUEUE(I_QUEEN);
        return false;
    } else if(isEQUAL(_CONTEXT, M_BEG)) {
        if(!(isIN(QUEEN, IN_GARDEN))) {
            return false;
        } else if((_X = isTALKING())) {
            APPROACH_QUEEN("at the sound of your voice");
            return RFATAL();
        }
        return false;
    } else {
        return false;
    }
}

var RUIN0 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: ORUINS,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

var RUIN1 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: ORUINS,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

var RUIN2 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	FNUM: ORUINS,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

var RUIN3 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	IN: 0,
	OUT: 0,
	FNUM: ORUINS,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

var RUIN4 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	DNUM: 0,
	IN: 0,
	OUT: 0,
	FNUM: ORUINS,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

var RUIN5 = () => OBJECT({
	LOC: ROOMS,
	DESC: "foo",
	SDESC: 0,
	FLAGS: [LIGHTED, LOCATION],
	NORTH: 0,
	NE: 0,
	EAST: 0,
	SE: 0,
	SOUTH: 0,
	SW: 0,
	WEST: 0,
	NW: 0,
	IN: 0,
	OUT: 0,
	DNUM: 0,
	GLOBAL: [PHEEBOR, NULL, DEBRIS],
	FNUM: ORUINS,
	EXIT_STR: "Ruins block your path.",
	ACTION: RUIN_ROOM_F
});

function RUIN_ROOM_F(_CONTEXT=null) {
    let _TBL, _X;
    if(!(isEQUAL(_CONTEXT, M_ENTERING))) {
        return false;
    } else if(isIS(HERE, TOUCHED)) {
        return false;
    } else if((!(isIS(PLAZA, SEEN))
  &&  isLAST_ROOM_IN(RUIN_ROOMS))) {
        MAKE(PLAZA, SEEN);
        ARCH_ROOMS[PRESENT] = HERE;
        isREPLACE_GLOBAL(HERE, NULL, PLAZA);
        MOVE(ARCH, HERE);
        PUTP(HERE, "SDESC", DESCRIBE_ARCH7);
        PUTP(HERE, "ACTION", ARCH7_F);
        isNEW_EXIT(HERE, "IN", (FCONNECT + 1 + MARKBIT), ENTER_ARCH);
        isNEW_EXIT(HERE, "OUT", (FCONNECT + 1 + MARKBIT), EXIT_ARCH);
        return false;
    } else {
        _TBL = PICK_ONE(RUIN_DESCS);
        PUTP(HERE, "SDESC", _TBL[0]);
        _X = _TBL[1];
        PUTP(HERE, "ACTION", _X);
        if(isEQUAL(_X, RD3_F)) {
            MOVE(WEEDS2, HERE);
        }
        return false;
    }
}

function DESCRIBE_ARCH7(_OBJ) {
    return TELL("Plaza");
}

function ARCH7_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("This vast expanse may have served as a public meetingplace in centuries long past. Waves of heat rise from the stone pavement underfoot.", CR);
        return true;
    }
    return isHANDLE_ARCH_ROOMS(_CONTEXT);
}

function DESCRIBE_RD0(_OBJ) {
    return TELL("Courtyard");
}

function RD0_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Tall pillars of stone once enclosed this circular courtyard. The sad remains lie smashed and scattered at your feet.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_RD1(_OBJ) {
    return TELL("Aqueduct");
}

function RD1_F(_CONTEXT=null) {
    let _TBL, _DIR;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        _DIR = I_NORTH;
        while(true) {
            _TBL = GETP(HERE, PDIR_LIST[_DIR]);
            if(!(_TBL)) {
                
            } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT)) {
                break;
            }
            if(++_DIR > I_NW) {
                break;
            }
        }
        TELL("A boulevard of cracked marble leads "
, B(DIR_NAMES[_DIR]
), " beneath the shadows of a crumbling aqueduct.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_RD2(_OBJ) {
    return TELL("Debris");
}

function RD2_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("Alleys strewn with centuries of debris wind between the silent ruins.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_RD3(_OBJ) {
    return TELL("Glare");
}

function RD3_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("The hard glare of sunlight on the windswept ruins is making your eyes water. Weeds are growing between the cracks in the street.", CR);
        return true;
    } else {
        return false;
    }
}

function DESCRIBE_RD4(_OBJ) {
    return TELL("Dusty Street");
}

function RD4_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("A dry, cheerless wind blows dust in your face as you regard the broken facades on every side.", CR);
        return true;
    } else {
        return false;
    }
}

var IN_SPLENDOR = () => OBJECT({
	LOC: ROOMS,
	DESC: "Plane of TransInfinite Splendor",
	FLAGS: [LIGHTED, LOCATION],
	NORTH: SORRY("Lush vegetation blocks your path."),
	NE: SORRY("Lush vegetation blocks your path."),
	EAST: SORRY("Lush vegetation blocks your path."),
	SE: SORRY("Lush vegetation blocks your path."),
	SOUTH: SORRY("Lush vegetation blocks your path."),
	SW: SORRY("Lush vegetation blocks your path."),
	WEST: SORRY("Lush vegetation blocks your path."),
	NW: SORRY("Lush vegetation blocks your path."),
	FNUM: 0,
	ACTION: IN_SPLENDOR_F
});

function IN_SPLENDOR_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_LOOK)) {
        TELL("An unspoiled landscape of rolling meadows, sparkling streams and orchards bursting with fruit stretches away in every direction. You must be alone here; for no ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("wo");
        }
        TELL("man could visit this place and leave it voluntarily.", CR);
        return true;
    } else if(isEQUAL(_CONTEXT, M_BEG)) {
        if((isIN(HERD, IN_SPLENDOR)
  &&  (_X = isTALKING()))) {
            UNICORNS_FLEE("at the sound of your voice");
            return RFATAL();
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_EXIT)) {
        if((isEQUAL(P_WALK_DIR, null, "IN", "OUT")
  ||  isEQUAL(P_WALK_DIR, "UP", "DOWN"))) {
            return false;
        } else if(isIN(HERD, IN_SPLENDOR)) {
            UNICORNS_FLEE();
            return RFATAL();
        }
        I_ARREST(null);
        return RFATAL();
    } else {
        return false;
    }
}

"*** MAZE SETUP ***"

function isSETUP_CELLAR() {
    SCRAMBLE(CELLAR_ROOMS);
    isNEXT_WAND(DESCRIBE_CELLAR_WAND, WC1);
    QUEUE(I_RAT);
    return true;
}

function N_MOOR_S() {
    if(isSETUP_MOOR()) {
        return GETP(N_MOOR, "SOUTH")[XROOM];
    }
    return false;
}

function SW_MOOR_NE() {
    if(isSETUP_MOOR()) {
        return GETP(SW_MOOR, "NE")[XROOM];
    }
    return false;
}

function isSETUP_MOOR() {
    let _RM, _RM2, _RM3, _OBJ, _LEN;
    SCRAMBLE(MOOR_ROOMS);

    /*"Connect N-MOOR to north edge of moor."*/

    _RM = isN_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-MOOR? <1>");
        return false;
    }*/
    isNEW_EXIT(_RM, "NORTH", (CONNECT + 1 + MARKBIT), N_MOOR);
    isNEW_EXIT(N_MOOR, "SOUTH", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect SW-MOOR to southwest corner of moor."*/

    _RM = isSW_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-MOOR? <2>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SW", (CONNECT + 5 + MARKBIT), SW_MOOR);
    isNEW_EXIT(SW_MOOR, "NE", (CONNECT + 5 + MARKBIT), _RM);

    _LEN = MOOR_ROOMS[0];
    _RM = toROOM(MOOR_ROOMS[RANDOM(_LEN)]);
    isNEXT_SCROLL(DESCRIBE_MOOR_SCROLL, _RM);

    while(true) {
        _RM2 = toROOM(MOOR_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM2, _RM)) {
            continue;
        }break;
    }
    isNEXT_POTION(_RM2, DESCRIBE_MOOR_POTION);

    while(true) {
        _RM3 = toROOM(MOOR_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM3, _RM2, _RM)) {
            continue;
        }break;
    }
    isNEXT_WAND(DESCRIBE_MOOR_WAND, _RM3);
    QUEUE(I_VAPOR);
    return true;
}

function NW_UNDER_SE() {
    if(isSETUP_JUNGLE()) {
        return GETP(NW_UNDER, "SE")[XROOM];
    }
    return false;
}

function SW_UNDER_NE() {
    if(isSETUP_JUNGLE()) {
        return GETP(SW_UNDER, "NE")[XROOM];
    }
    return false;
}

function SE_UNDER_NW() {
    if(isSETUP_JUNGLE()) {
        return GETP(SE_UNDER, "NW")[XROOM];
    }
    return false;
}

function AT_FALLS_N() {
    if(isSETUP_JUNGLE()) {
        return GETP(AT_FALLS, "NORTH")[XROOM];
    }
    return false;
}

function isSETUP_JUNGLE() {
    let _RM, _RM2, _RM3, _LEN;
    SCRAMBLE(JUNGLE_ROOMS);

    /*"Connect NW-UNDER to northwest edge of jungle."*/

    _RM = isNW_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-JUNGLE? <1>");
        return false;
    }*/
    isNEW_EXIT(_RM, "NW", (CONNECT + 1 + MARKBIT), NW_UNDER);
    isNEW_EXIT(NW_UNDER, "SE", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect SE-UNDER to southeast edge."*/

    _RM = isSE_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-JUNGLE? <2>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SE", (CONNECT + 1 + MARKBIT), SE_UNDER);
    isNEW_EXIT(SE_UNDER, "NW", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect SW-UNDER to southwest edge."*/

    _RM = isSW_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-JUNGLE? <3>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SW", (CONNECT + 1 + MARKBIT), SW_UNDER);
    isNEW_EXIT(SW_UNDER, "NE", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect AT-FALLS to southern edge."*/

    _RM = isS_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-JUNGLE? <4>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SOUTH", (CONNECT + 5 + MARKBIT), AT_FALLS);
    isNEW_EXIT(AT_FALLS, "NORTH", (CONNECT + 5 + MARKBIT), _RM);

    _LEN = JUNGLE_ROOMS[0];
    while(true) {
        _RM = toROOM(JUNGLE_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM, JUN0)) {
            continue;
        }break;
    }
    MOVE(TUSK, _RM);

    while(true) {
        _RM2 = toROOM(JUNGLE_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM2, _RM, JUN0)) {
            continue;
        }break;
    }
    isNEXT_WAND(DESCRIBE_JUNGLE_WAND, _RM2);

    while(true) {
        _RM3 = toROOM(JUNGLE_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM3, _RM2, _RM, JUN0)) {
            continue;
        }break;
    }
    isNEXT_SCROLL(DESCRIBE_JUNGLE_SCROLL, _RM3);
    QUEUE(I_CROC);
    return true;
}

function ENTER_PLAIN_W() {
    if(isSETUP_PLAIN()) {
        return GETP(XROADS, "EAST")[XROOM];
    }
    return false;
}

function ENTER_PLAIN_E() {
    if(isSETUP_PLAIN()) {
        return GETP(ON_PIKE, "WEST")[XROOM];
    }
    return false;
}

function isSETUP_PLAIN() {
    let _RM, _OBJ, _LEN;
    SCRAMBLE_LENGTH = 3;
    SCRAMBLE(PLAIN_ROOMS, 61166/*1110111011101110*/);
    SCRAMBLE_LENGTH = 1;

    /*"Connect XROADS to west edge of moor."*/

    _RM = isW_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-PLAIN? <1>");
        return false;
    }*/
    WEST_EXIT = _RM;
    isNEW_EXIT(_RM, "WEST", (CONNECT + 13 + MARKBIT), XROADS);
    isNEW_EXIT(XROADS, "EAST", (CONNECT + 13 + MARKBIT), _RM);

    /*"Connect ON-PIKE to east edge."*/

    _RM = isE_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-PLAIN? <2>");
        return false;
    }*/
    EAST_EXIT = _RM;
    isNEW_EXIT(_RM, "EAST", (CONNECT + 13 + MARKBIT), ON_PIKE);
    isNEW_EXIT(ON_PIKE, "WEST", (CONNECT + 13 + MARKBIT), _RM);

    /*"Connect ROSE-ROOM to north edge."*/

    _RM = isN_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-PLAIN? <3>");
        return false;
    }*/
    isNEW_EXIT(_RM, "NORTH", (CONNECT + 3 + MARKBIT), ROSE_ROOM);
    isNEW_EXIT(ROSE_ROOM, "SOUTH", (CONNECT + 3 + MARKBIT), _RM);

    QUEUE(I_BFLY);
    return true;
}

function NGURTH_N() {
    if(isSETUP_FOREST()) {
        return GETP(NGURTH, "NORTH")[XROOM];
    }
    return false;
}

function AT_BROOK_WEST() {
    if(isSETUP_FOREST()) {
        return GETP(AT_BROOK, "WEST")[XROOM];
    }
    return false;
}

function SFORD_S() {
    if(isSETUP_FOREST()) {
        return GETP(SFORD, "SW")[XROOM];
    }
    return false;
}

function isSETUP_FOREST() {
    let _LEN, _RM, _RM2;
    SCRAMBLE(FOREST_ROOMS);

    /*"Connect NGURTH to south edge of forest."*/

    _RM = isS_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-FOREST? <1>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SOUTH", (CONNECT + 1 + MARKBIT), NGURTH);
    isNEW_EXIT(NGURTH, "NORTH", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect SFORD to northeast edge of forest."*/

    _RM = isNE_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-FOREST? <2>");
        return false;
    }*/
    isNEW_EXIT(_RM, "NE", (CONNECT + 1 + MARKBIT), SFORD);
    isNEW_EXIT(SFORD, "SW", (CONNECT + 1 + MARKBIT), _RM);

    /*"Connect AT-BROOK to east side of forest."*/

    _RM = isE_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-FOREST? <3>");
        return false;
    }*/
    isNEW_EXIT(_RM, "EAST", (CONNECT + 9 + MARKBIT), AT_BROOK);
    isNEW_EXIT(AT_BROOK, "WEST", (CONNECT + 9 + MARKBIT), _RM);

    _LEN = FOREST_ROOMS[0];
    _RM = toROOM(FOREST_ROOMS[RANDOM(_LEN)]);
    isNEXT_SCROLL(DESCRIBE_FOREST_SCROLL, _RM);

    while(true) {
        _RM2 = toROOM(FOREST_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM2, _RM)) {
            continue;
        }break;
    }
    isNEXT_WAND(DESCRIBE_FOREST_WAND, _RM2);

    QUEUE(I_PUPP);
    return true;
}

function NFORD_NE() {
    if(isSETUP_RUINS()) {
        return GETP(NFORD, "NE")[XROOM];
    }
    return false;
}

function isSETUP_RUINS() {
    let _RM;
    SCRAMBLE(RUIN_ROOMS, 61166/*1110111011101110*/);

    _RM = isSW_ROOM();
    /*if(!(_RM)) {
        SAY_ERROR("SETUP-RUINS? <1>");
        return false;
    }*/
    isNEW_EXIT(_RM, "SW", (CONNECT + 1 + MARKBIT), NFORD);
    isNEW_EXIT(NFORD, "NE", (CONNECT + 1 + MARKBIT), _RM);

    _RM = toROOM(RUIN_ROOMS[RANDOM(RUIN_ROOMS[0])]);
    isNEXT_POTION(_RM, DESCRIBE_RUINS_POTION);

    QUEUE(I_GHOUL);
    return true;
}

function isSETUP_CAVES() {
    let _RM;
    SCRAMBLE(CAVE_ROOMS, 43690/*1010101010101010*/);

    _RM = isSE_ROOM();
    isNEW_EXIT(_RM, "SE", (CONNECT + 1), CAVE7);
    isNEW_EXIT(CAVE7, "NW", (CONNECT + 1), _RM);
    isNEW_EXIT(CAVE7, "IN", (CONNECT + 1), _RM);

    _RM = isNE_ROOM();
    isNEW_EXIT(_RM, "NE", (CONNECT + 1), NE_CAVE);
    isNEW_EXIT(NE_CAVE, "SW", (CONNECT + 1), _RM);
    isNEW_EXIT(NE_CAVE, "IN", (CONNECT + 1), _RM);

    _RM = isW_ROOM();
    isNEW_EXIT(IN_LAIR, "NE", (CONNECT + 1), _RM);
    isNEW_EXIT(_RM, "SW", (CONNECT + 1), IN_LAIR);

    MAKE(SE_CAVE, SEEN);
    MAKE(NE_CAVE, SEEN);
    NEXT_SUCKER(ASUCKER);
    QUEUE(I_ASUCKER);
    QUEUE(I_GRUE);
    return true;
}

"*** THE MAZE MACHINE ***"

var GOOD_DIRS/*TABLE*/ = ITABLE(16);;
var LAST_CONNECTION/*NUMBER*/ = -1;

function SCRAMBLE(_RTBL, _MASK) {
    let _HOME, _LEN, _RM, _NXT, _X;
    COPYT(DEFAULT_BORDERS, BORDERS, 50);    /*"Reset room borders."*/
    if(isASSIGNED(_MASK)) {
        _LEN = 24;
        while(true) {
            BORDERS[_LEN] = (BORDERS[_LEN] & _MASK);
            if(--_LEN < 0) {
                break;
            }
        }
        BORDERS[0] = 49;
    }

    _LEN = _RTBL[0];
    _HOME = toROOM(_RTBL[1]);    /*"HOME starts at 1st list element."*/

    /*"Make MAZE-ROOMS a PICK-ONE table, excluding HOME."*/

    _X = _LEN;
    while(true) {
        MAZE_ROOMS[_X] = _RTBL[_X];
        if(--_X < 2) {
            break;
        }
    }
    MAZE_ROOMS[1] = 0;
    MAZE_ROOMS[0] = _LEN;

    /*"Make AUX-TABLE a PICK-NEXT table."*/

    ++_LEN
    AUX_TABLE[0] = _LEN;
    AUX_TABLE[1] = 3;    /*"Skip over HOME."*/
    AUX_TABLE[2] = _HOME;
    while(true) {
        AUX_TABLE[_LEN] = toROOM(PICK_ONE(MAZE_ROOMS));
        if(--_LEN < 3) {
            break;
        }
    }

    COPYT(MAZE_ROOMS, 0, 51);    /*"Reset."*/

    UNMAKE(_HOME, TOUCHED);
    PUTP(_HOME, "DNUM", 25);    /*"Always start @ center(?)"*/
    MAZE_ROOMS[25] = _HOME;

    /*if((isT(MAZING)
  &&  isT(DEBUG))) {
        TELL("[SCRAMBLE homes ", D(_HOME), " to ", N(_X));
        PAUSE();
    }*/

    while(true) {
        LAST_CONNECTION = -1;
        CLEAR_MAPBITS(_RTBL);
        _RM = _HOME;
        MAKE(_HOME, MAPPED);
        while(true) {
            _NXT = isNEXT_ROOM(_RM);
            if(!(_NXT)) {
                _HOME = isNEW_HOME(_HOME);
                if(!(_HOME)) {
                    SAY_ERROR("SCRAMBLE");
                    return false;
                }
                break;
            } else if(isEQUAL(AUX_TABLE[1], 2)) {
                /*"No more?"*/
                CLEAR_MAPBITS(_RTBL);
                exitProxysToArray(_RTBL);
                return false;
            } else if(isEQUAL(_NXT, _HOME)) {
                continue;
            } else if(isIS(_NXT, MAPPED)) {
                _HOME = _NXT;
                break;
            }
            MAKE(_NXT, MAPPED);
            _RM = _NXT;
        }
    }
}

const exitProxysToArray = t => t.slice(1).map(toROOM)
    .forEach(r => {
        for (const x of m_dirs) {
            const exit = r[x];
            if (exit.valueOf instanceof ProxyArray) {
                // Change proxy to array
                r[x] = exit.slice(0, 3);
            }
        }
    });

function CLEAR_MAPBITS(_TBL) {
    let _LEN;
    _LEN = _TBL[0];
    while(true) {
        UNMAKE(toROOM(_TBL[_LEN]), MAPPED);
        if(--_LEN < 1) {
            return false;
        }
    }
}

function isNEW_HOME(_RM) {
    let _DIR, _CNT, _TBL;
    _CNT = 1;
    _DIR = asPROP("NW");
    while(true) {
        _TBL = GETP(_RM, PROP(_DIR));
        if(isT(_TBL) && _TBL[0] !== NO_EXIT) {
            ++_CNT
            GOOD_DIRS[_CNT] = _TBL[XROOM];
        }
        if(++_DIR > asPROP("NORTH")) {
            break;
        }
    }
    if(isEQUAL(_CNT, 1)) {
        /*"No exits left, so scram."*/
        return false;
    } else if(isEQUAL(_CNT, 2)) {
        /*"Save time if only 1 DIR found."*/
        return GOOD_DIRS[2];
    }
    GOOD_DIRS[0] = _CNT;    /*"Setup a PICK-ONE table."*/
    GOOD_DIRS[1] = 0;
    return PICK_ONE(GOOD_DIRS);
}

var SCRAMBLE_LENGTH/*NUMBER*/ = 1;

function isNEXT_ROOM(_RM) {
    let _DIR=0, _DIAG=0, _PATH_LEN, _CNT, _BITS, _RNUM, _NRM, _NRNUM, _X, _LEN, _TBL;
    _RNUM = GETP(_RM, "DNUM");    /*"Get position in matrix."*/
    if(!(_RNUM)) {
        return false;
    }
    _BITS = BORDERS[_RNUM];    /*"Get cell borders."*/

    /*"Make a list of adjoining cells with accessible rooms."*/

    _CNT = 1;
    while(true) {
        if(_BITS & DBIT_LIST[_DIR]) {
            /*"Accessible?"*/
            _X = (_RNUM + DIR_HACKS[_DIR]);
            if(MAZE_ROOMS[_X]) {
                /*"Is there a room?"*/
                ++_CNT

                GOOD_DIRS[_CNT] = _DIR;
            }
        }
        if(++_DIR > 7) {
            break;
        }
    }
    if(isEQUAL(_CNT, 1)) {
        /*"No adjoining rooms found."*/

        /*"Make a list of all accessible directions."*/

        _DIR = 0;
        while(true) {
            if(_BITS & DBIT_LIST[_DIR]) {
                /*"Access?"*/
                if((GETP(_RM, PDIR_LIST[_DIR])[0] === NO_EXIT)) {
                    ++_CNT
                    GOOD_DIRS[_CNT] = _DIR;
                }
            }
            if(++_DIR > 7) {
                break;
            }
        }
        if(isEQUAL(_CNT, 1)) {
            /*"No exits left, so scram."*/
            return false;
        } else if(isEQUAL(_CNT, 2)) {
            /*"Save time if only 1 DIR found."*/
            _DIR = GOOD_DIRS[2];
        } else {
            GOOD_DIRS[0] = _CNT;            /*"Setup a PICK-ONE table."*/
            GOOD_DIRS[1] = 0;
            while(true) {
                _DIR = PICK_ONE(GOOD_DIRS);
                if(!(isEQUAL(_DIR, LAST_CONNECTION))) {
                    break;
                }
            }
        }
    } else if(isEQUAL(_CNT, 2)) {
        /*"Save time if only 1 DIR found."*/
        _DIR = GOOD_DIRS[2];
    } else {
        GOOD_DIRS[0] = _CNT;        /*"Setup a PICK-ONE table."*/
        GOOD_DIRS[1] = 0;
        while(true) {
            _DIR = PICK_ONE(GOOD_DIRS);
            if(!(isEQUAL(_DIR, LAST_CONNECTION))) {
                break;
            }
        }
    }

    LAST_CONNECTION = _DIR;
    _NRNUM = (_RNUM + DIR_HACKS[_DIR]);    /*"Calc new room ID."*/

    if(_DIR & 1) {
        /*"Handle diagonal paths."*/
        ++_DIAG
        KILL_DIAGONAL(_RNUM, _DIR);
    }

    _PATH_LEN = SCRAMBLE_LENGTH;
    while(true) {
        _X = isCAN_EXTEND(_NRNUM, _DIR);
        if(!(_X)) {
            break;
        } else if(PROB(67)) {
            break;
        } else if(isT(_DIAG)) {
            KILL_DIAGONAL(_NRNUM, _DIR);
        }
        EXTEND(_NRNUM, _DIR);
        _PATH_LEN = (_PATH_LEN + 2);
        _NRNUM = _X;
    }

    _NRM = MAZE_ROOMS[_NRNUM];
    if(!(_NRM)) {
        _NRM = PICK_NEXT(AUX_TABLE);        /*"Pick next room in chain."*/
        PUTP(_NRM, "DNUM", _NRNUM);
        MAZE_ROOMS[_NRNUM] = _NRM;
    }

    /*"Install the exit."*/

    _LEN = (CONNECT + _PATH_LEN);
    isNEW_EXIT(_RM, PDIR_LIST[_DIR], _LEN, _NRM);

    BORDERS[_RNUM] = (_BITS & XDBIT_LIST[_DIR]);

    _DIR = (_DIR + 4);
    if(_DIR > 7) {
        _DIR = (_DIR - 8);
    }    /*"Mirror the exit."*/

    isNEW_EXIT(_NRM, PDIR_LIST[_DIR], _LEN, _RM);

    _BITS = BORDERS[_NRNUM];
    BORDERS[_NRNUM] = (_BITS & XDBIT_LIST[_DIR]);

    return _NRM;
}

function isCAN_EXTEND(_RNUM, _DIR) {
    let _CNT=0, _XDIR, _X, _BITS;
    _XDIR = (_DIR + 4);
    if(_XDIR > 7) {
        _XDIR = (_XDIR - 8);
    }    /*"Establish opposite DIR."*/

    /*"ALL directions must be available to win."*/

    while(true) {
        if(isEQUAL(_CNT, _XDIR)) {
            
        } else if(!(_BITS & DBIT_LIST[_CNT])) {
            return false;
        }
        if(++_CNT > 7) {
            break;
        }
    }
    return (_RNUM + DIR_HACKS[_DIR]);
}

function EXTEND(_RNUM, _DIR) {
    let _CNT=0, _XRNUM, _XDIR, _BITS, _LIST;

    BORDERS[_RNUM] = 0;    /*"Forbid all future access."*/
    _LIST = REST(XDBIT_LIST, 4);
    _XDIR = (_DIR + 4);
    if(_XDIR > 7) {
        _XDIR = (_XDIR - 8);
    }

    /*"Close off all adjacent rooms."*/

    while(true) {
        if(!(isEQUAL(_CNT, _DIR, _XDIR))) {
            _XRNUM = (_RNUM + DIR_HACKS[_CNT]);
            _BITS = BORDERS[_XRNUM];
            BORDERS[_XRNUM] = (_BITS & _LIST[_CNT]);
        }
        if(++_CNT > 7) {
            return false;
        }
    }
}

function KILL_DIAGONAL(_RNUM, _DIR) {
    let _CNT=0, _BITS, _XDIR, _XRNUM, _XBITS;
    _BITS = BORDERS[_RNUM];
    _DIR = Math.floor(_DIR / 2);
    while(true) {
        _XRNUM = (_RNUM + DIR_HACKS[REST(QDIRS, _CNT)[_DIR]]);
        _XDIR = REST(ZDIRS, (_CNT + _CNT))[_DIR];
        _XBITS = XDBIT_LIST[_XDIR];
        BORDERS[_XRNUM] = (BORDERS[_XRNUM] & _XBITS);
        if(++_CNT > 1) {
            return false;
        }
    }
}

"Find northernmost room in maze."

function isN_ROOM() {
    let _ROW, _OFFSET, _RM;
    _ROW = 4;
    while(true) {
        _RM = MAZE_ROOMS[_ROW];
        if(isT(_RM)) {
            return _RM;
        }
        _OFFSET = 1;
        while(true) {
            _RM = MAZE_ROOMS[(_ROW + _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _RM = MAZE_ROOMS[(_ROW - _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            } else if(++_OFFSET > 3) {
                break;
            }
        }
        _ROW = (_ROW + 7);
        if(_ROW > 46) {
            break;
        }
    }
    /*SAY_ERROR("N-ROOM?");*/
    return false;
}

"Find southernmost room in maze."

function isS_ROOM() {
    let _ROW, _OFFSET, _RM;
    _ROW = 46;
    while(true) {
        _RM = MAZE_ROOMS[_ROW];
        if(isT(_RM)) {
            return _RM;
        }
        _OFFSET = 1;
        while(true) {
            _RM = MAZE_ROOMS[(_ROW + _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _RM = MAZE_ROOMS[(_ROW - _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            } else if(++_OFFSET > 3) {
                break;
            }
        }
        _ROW = (_ROW - 7);
        if(_ROW < 4) {
            break;
        }
    }
    /*SAY_ERROR("S-ROOM?");*/
    return false;
}

"Find westernmost room in maze."

function isW_ROOM() {
    let _COL, _OFFSET, _RM;
    _COL = 22;
    while(true) {
        _RM = MAZE_ROOMS[_COL];
        if(isT(_RM)) {
            return _RM;
        }
        _OFFSET = 7;
        while(true) {
            _RM = MAZE_ROOMS[(_COL + _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _RM = MAZE_ROOMS[(_COL - _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _OFFSET = (_OFFSET + 7);
            if(_OFFSET > 21) {
                break;
            }
        }
        if(++_COL > 28) {
            break;
        }
    }
    /*SAY_ERROR("W-ROOM?");*/
    return false;
}

"Find easternmost room in maze."

function isE_ROOM() {
    let _COL, _OFFSET, _RM;
    _COL = 28;
    while(true) {
        _RM = MAZE_ROOMS[_COL];
        if(isT(_RM)) {
            return _RM;
        }
        _OFFSET = 7;
        while(true) {
            _RM = MAZE_ROOMS[(_COL + _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _RM = MAZE_ROOMS[(_COL - _OFFSET)];
            if(isT(_RM)) {
                return _RM;
            }
            _OFFSET = (_OFFSET + 7);
            if(_OFFSET > 21) {
                break;
            }
        }
        if(--_COL < 22) {
            break;
        }
    }
    /*SAY_ERROR("E-ROOM?");*/
    return false;
}

"Find northwesternmost room in maze."

function isNW_ROOM() {
    let _COL, _PTR, _X, _I, _RM;
    _COL = 1;
    while(true) {
        _X = _COL;
        _PTR = _COL;
        while(true) {
            _RM = MAZE_ROOMS[_PTR];
            if(isT(_RM)) {
                return _RM;
            } else if(--_X < 1) {
                break;
            }
            _PTR = (_PTR + 6);
        }
        if(++_COL > 7) {
            break;
        }
    }
    /*SAY_ERROR("NW-ROOM?");*/
    return false;
}

"Find northeasternmost room in maze."

function isNE_ROOM() {
    let _COL, _PTR, _X, _I, _RM;
    _COL = 7;
    _I = 1;
    while(true) {
        _PTR = _COL;
        _X = _I;
        while(true) {
            _RM = MAZE_ROOMS[_PTR];
            if(isT(_RM)) {
                return _RM;
            } else if(--_X < 1) {
                break;
            }
            _PTR = (_PTR + 8);
        }
        ++_I
        if(--_COL < 1) {
            break;
        }
    }
    /*SAY_ERROR("NE-ROOM?");*/
    return false;
}

"Find southwesternmost room in maze."

function isSW_ROOM() {
    let _COL, _PTR, _X, _RM;
    _COL = 1;
    while(true) {
        _X = _COL;
        _PTR = (_COL + 42);
        while(true) {
            _RM = MAZE_ROOMS[_PTR];
            if(isT(_RM)) {
                return _RM;
            } else if(--_X < 1) {
                break;
            }
            _PTR = (_PTR - 8);
        }
        if(++_COL > 7) {
            break;
        }
    }
    /*SAY_ERROR("SW-ROOM?");*/
    return false;
}

"Find southeasternmost room in maze."

function isSE_ROOM() {
    let _COL, _PTR, _X, _I, _RM;
    _COL = 7;
    _I = 1;
    while(true) {
        _PTR = (_COL + 42);
        _X = _I;
        while(true) {
            _RM = MAZE_ROOMS[_PTR];
            if(isT(_RM)) {
                return _RM;
            } else if(--_X < 1) {
                break;
            }
            _PTR = (_PTR - 6);
        }
        ++_I
        if(--_COL < 1) {
            break;
        }
    }
    /*SAY_ERROR("SE-ROOM?");*/
    return false;
}

function INIT_PLACES() {
    HILLTOP = HILLTOP();
    COVESIDE = COVESIDE();
    OUTSIDE_PUB = OUTSIDE_PUB();
    N_MOOR = N_MOOR();
    IN_GAS = IN_GAS();
    MOOR2 = MOOR2();
    MOOR3 = MOOR3();
    MOOR4 = MOOR4();
    MOOR5 = MOOR5();
    MOOR6 = MOOR6();
    SW_MOOR = SW_MOOR();
    IN_PORT = IN_PORT();
    IN_YARD = IN_YARD();
    IN_STABLE = IN_STABLE();
    IN_BOUTIQUE = IN_BOUTIQUE();
    IN_PUB = IN_PUB();
    IN_KITCHEN = IN_KITCHEN();
    KITCHEN_JUNK = KITCHEN_JUNK();
    ON_WHARF = ON_WHARF();
    NULL = NULL();
    AT_BOTTOM = AT_BOTTOM();
    WC1 = WC1();
    SKEL_ROOM = SKEL_ROOM();
    MOSS_ROOM = MOSS_ROOM();
    AT_STACK = AT_STACK();
    THRONE_ROOM = THRONE_ROOM();
    BARRELTOP = BARRELTOP();
    IN_THRIFF = IN_THRIFF();
    IN_CHAPEL = IN_CHAPEL();
    FOREST_EDGE = FOREST_EDGE();
    ON_TRAIL = ON_TRAIL();
    IN_CABIN = IN_CABIN();
    ON_PEAK = ON_PEAK();
    AT_LEDGE = AT_LEDGE();
    TOWER_BASE = TOWER_BASE();
    AT_BRINE = AT_BRINE();
    AT_BROOK = AT_BROOK();
    IN_ACCARDI = IN_ACCARDI();
    IN_WEAPON = IN_WEAPON();
    AT_GATE = AT_GATE();
    IN_HALL = IN_HALL();
    LEVEL1A = LEVEL1A();
    LEVEL1B = LEVEL1B();
    LEVEL1C = LEVEL1C();
    LEVEL1D = LEVEL1D();
    LEVEL2A = LEVEL2A();
    LEVEL2B = LEVEL2B();
    LEVEL2C = LEVEL2C();
    LEVEL2D = LEVEL2D();
    LEVEL3A = LEVEL3A();
    LEVEL3B = LEVEL3B();
    LEVEL3C = LEVEL3C();
    LEVEL3D = LEVEL3D();
    TOWER_TOP = TOWER_TOP();
    AT_DOCK = AT_DOCK();
    NW_UNDER = NW_UNDER();
    SW_UNDER = SW_UNDER();
    SE_UNDER = SE_UNDER();
    NW_SUPPORT = NW_SUPPORT();
    SW_SUPPORT = SW_SUPPORT();
    SE_SUPPORT = SE_SUPPORT();
    JUN0 = JUN0();
    WORM_ROOM = WORM_ROOM();
    JUN2 = JUN2();
    JUN3 = JUN3();
    JUN4 = JUN4();
    JUN5 = JUN5();
    JUN6 = JUN6();
    OVER_JUNGLE = OVER_JUNGLE();
    AT_FALLS = AT_FALLS();
    IN_PASTURE = IN_PASTURE();
    SE_WALL = SE_WALL();
    SE_CAVE = SE_CAVE();
    NE_CAVE = NE_CAVE();
    NE_WALL = NE_WALL();
    CAVE0 = CAVE0();
    CAVE1 = CAVE1();
    CAVE2 = CAVE2();
    CAVE3 = CAVE3();
    CAVE4 = CAVE4();
    CAVE6 = CAVE6();
    CAVE7 = CAVE7();
    ON_PIKE = ON_PIKE();
    XROADS = XROADS();
    PLAIN0 = PLAIN0();
    PLAIN1 = PLAIN1();
    PLAIN2 = PLAIN2();
    PLAIN3 = PLAIN3();
    PLAIN4 = PLAIN4();
    PLAIN5 = PLAIN5();
    ROSE_ROOM = ROSE_ROOM();
    IN_FARM = IN_FARM();
    IN_GURTH = IN_GURTH();
    AT_MAGICK = AT_MAGICK();
    IN_MAGICK = IN_MAGICK();
    NGURTH = NGURTH();
    TWILIGHT = TWILIGHT();
    FOREST1 = FOREST1();
    FOREST2 = FOREST2();
    FOREST3 = FOREST3();
    FOREST4 = FOREST4();
    FOREST5 = FOREST5();
    FOREST6 = FOREST6();
    SFORD = SFORD();
    NFORD = NFORD();
    ON_BRIDGE = ON_BRIDGE();
    ARCH_VOID = ARCH_VOID();
    ARCH1 = ARCH1();
    ARCH2 = ARCH2();
    ARCH3 = ARCH3();
    ARCH4 = ARCH4();
    ARCH5 = ARCH5();
    ARCH9 = ARCH9();
    ARCH10 = ARCH10();
    ARCH11 = ARCH11();
    ARCH12 = ARCH12();
    IN_LAIR = IN_LAIR();
    IN_FROON = IN_FROON();
    INNARDS = INNARDS();
    APLANE = APLANE();
    IN_SKY = IN_SKY();
    IN_GARDEN = IN_GARDEN();
    RUIN0 = RUIN0();
    RUIN1 = RUIN1();
    RUIN2 = RUIN2();
    RUIN3 = RUIN3();
    RUIN4 = RUIN4();
    RUIN5 = RUIN5();
    IN_SPLENDOR = IN_SPLENDOR();
}