`PEOPLE for BEYOND ZORK: Copyright 1987 Infocom, Inc.
 All rights reserved.`

"*** OLD SALT ***"

var SALT = () => OBJECT({
	LOC: ON_WHARF,
	DESC: "old sailor",
	FLAGS: [VOWEL, LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["SAILOR", "ARTIST", "PAINTER", "MAN", "GUY", "FELLOW", "HIMSELF", "YOURSELF", "M", "MALE"],
	ADJECTIVE: ["OLD"],
	LIFE: I_SALT,
	DESCFCN: SALT_F,
	CONTFCN: SALT_F,
	ACTION: SALT_F
});

function SALT_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(SALT), " is seated before ", A(EASEL
), ", dabbing color onto ", A(CANVAS));
        if(isSEE_ANYTHING_IN(SALT)) {
            TELL(". He's holding ");
            CONTENTS(SALT);
        }
        TELL(C('.'));
        return true;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, SALT))) {
            GREET_SAILOR();
            return RFATAL();
        } else if((isVERB(V_TELL_ABOUT, V_SSHOW)
  &&  isPRSO(ME))) {
            ASK_SALT_ABOUT(PRSI);
            return RFATAL();
        } else if((isVERB(V_EXAMINE, V_WHAT, V_WHO, V_WHERE)
  ||  (isVERB(V_SHOW)
  &&  isPRSI(ME)))) {
            ASK_SALT_ABOUT(PRSO);
            return RFATAL();
        } else if((isVERB(V_GIVE, V_GET_FOR)
  &&  isPRSI(ME))) {
            ASK_SALT_FOR(PRSO);
            return RFATAL();
        } else if((isVERB(V_SGIVE, V_SGET_FOR)
  &&  isPRSO(ME))) {
            ASK_SALT_FOR(PRSI);
            return RFATAL();
        }
        DEAF_SALT();
        return RFATAL();
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            HARMLESS(PRSI);
            return true;
        } else if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_SALT(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            DO_GLANCE(SALT, PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, "'s ice-blue eyes glance up from his work.", CR);
        return true;
    } else if(isVERB(V_YELL)) {
        NOT_DEAF();
        return true;
    } else if(isVERB(V_ASK_FOR)) {
        ASK_SALT_FOR(PRSI);
        return true;
    } else if(isVERB(V_ASK_ABOUT)) {
        ASK_SALT_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        DO_GLANCE(SALT, PRSI);
        return true;
    } else if(isVERB(V_HELLO, V_GOODBYE, V_WAVE_AT)) {
        GREET_SAILOR();
        return true;
    } else if((_X = isHURTING())) {
        HARMLESS();
        return true;
    } else {
        return false;
    }
}

function NOT_DEAF() {
    MAKE(SALT, SEEN);
    TELL(CTHE(SALT), " cringes. \"I'm not deaf, y'know!\"", CR);
    return true;
}

function DEAF_SALT() {
    let _X;
    MAKE(SALT, SEEN);
    _X = RANDOM(100);
    if(_X < 33) {
        TELL(CTHE(SALT
), " doesn't look up from his work. Perhaps he didn't hear you.", CR);
        return true;
    } else if(_X < 67) {
        TELL(CTHE(SALT
), " cocks his head. \"Eh? Didn't catch that.\"", CR);
        return true;
    }
    TELL("\"Stop whispering, ");
    BOY_GIRL();
    TELL("! Can't hear a word you're sayin'.\"", CR);
    return true;
}

function BOY_GIRL() {
    if(isIS(PLAYER, FEMALE)) {
        TELL(B("GIRL"));
        return true;
    }
    TELL(B("BOY"));
    return true;
}

function GREET_SAILOR() {
    MAKE(SALT, SEEN);
    if(PROB(33)) {
        DEAF_SALT();
        return true;
    }
    TELL(CTHE(SALT));
    if(isIS(SALT, TOUCHED)) {
        TELL(" shrugs. \"Okay. Hello, again.\"", CR);
        return true;
    }
    MAKE(SALT, TOUCHED);
    if((isEQUAL(P_PRSA_WORD, "HELLO")
  &&  isNOUN_USED("SAILOR"))) {
        TELL(" chuckles softly and nods. \"Thought I 'membered you. ");
    } else {
        TELL(" nods. \"");
    }
    TELL("Hello, ");
    BOY_GIRL();
    TELL(PERQ);
    return true;
}

function ASK_SALT_ABOUT(_OBJ) {
    let _TBL, _LEN, _X;
    MAKE(SALT, SEEN);
    if(PROB(33)) {
        DEAF_SALT();
        return true;
    }
    if(!(isVISIBLE(_OBJ))) {
        PERPLEXED(SALT);
        TELL("Not sure");
        WHO_WHAT(_OBJ);
        TELL("you're talkin' 'bout, ");
        BOY_GIRL();
        TELL(PERQ);
        return true;
    } else if(isEQUAL(_OBJ, SALT)) {
        TELL("\"Been retired, ah, goin' on five years.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, SHILL)) {
        TELL("\"Lucky ye saw it a-floatin' there.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, EASEL, CANVAS)) {
        TELL("\"Like it? Reminds me o' the good old days.\"", CR);
        return true;
    } else if(PROB(75)) {
        DEAF_SALT();
        return true;
    }
    IGNORANT(SALT, _OBJ);
    return true;
}

function ASK_SALT_FOR(_OBJ) {
    let _X, _L;
    MAKE(SALT, SEEN);
    if(PROB(33)) {
        DEAF_SALT();
        return true;
    } else if(isEQUAL(_OBJ, EASEL, CANVAS)) {
        TELL("\"Sorry. Not for sale.\"", CR);
        return true;
    }
    AINT_GOT(SALT, _OBJ);
    return true;
}

function AINT_GOT(_WHO, _OBJ) {
    TELL("\"Don't have ", A(_OBJ));
    PRINT(",\" points out ");
    TELL(THE(_WHO), PERIOD);
    return true;
}

function GIVE_TO_SALT(_OBJ) {
    MAKE(SALT, SEEN);
    if(isGIVING_LOOT(_OBJ, SALT)) {
        return true;
    }
    NO_THANKS(SALT);
    return true;
}

function NO_THANKS(_WHO) {
    TELL(CTHE(_WHO), " shakes his head. \"No, thanks.\"", CR);
    return true;
}

function DO_GLANCE(_WHO, _OBJ) {
    MAKE(_WHO, SEEN);
    TELL(CTHE(_WHO));
    if(isVISIBLE(_OBJ)) {
        TELL(GLANCES_AT, THE(_OBJ));
    } else {
        PRINT(" gives you a puzzled frown");
    }
    PRINT(", but says nothing.|");
    return true;
}

"*** INNCOOK ***"

var COOK = () => OBJECT({
	LOC: IN_KITCHEN,
	DESC: "cook",
	FLAGS: [NOALL, LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["GROTE", "CLUTCHCAKE", "COOK", "MAN", "GUY", "FELLOW", "PERSON", "SELF", "HIMSELF", "YOURSELF"],
	ADJECTIVE: ["GROTE"],
	LIFE: I_COOK,
	DESCFCN: COOK_F,
	ACTION: COOK_F
});

function COOK_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL("A skinny old cook is bustling around the kitchen.");
        return true;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_TELL_ABOUT, V_SSHOW)
  &&  isPRSO(ME))) {
            ASK_COOK_ABOUT(PRSI);
            return RFATAL();
        } else if((isVERB(V_EXAMINE, V_WHAT, V_WHO, V_WHERE)
  ||  (isVERB(V_SHOW)
  &&  isPRSI(ME)))) {
            ASK_COOK_ABOUT(PRSO);
            return RFATAL();
        } else if((isVERB(V_GIVE, V_GET_FOR)
  &&  isPRSI(ME))) {
            ASK_COOK_FOR(PRSO);
            return RFATAL();
        } else if((isVERB(V_SGIVE, V_SGET_FOR)
  &&  isPRSO(ME))) {
            ASK_COOK_FOR(PRSI);
            return RFATAL();
        }
        TELL(CTHE(COOK
), " scowls. \"Don't bother me now, I'm busy!\"", CR);
        return RFATAL();
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isIS(PRSI, NODESC)) {
            CANT_FROM_HERE();
            return true;
        } else if(isVERB(V_BUY_FROM)) {
            ASK_COOK_FOR(PRSO);
            return true;
        } else if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_COOK(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            SHOW_TO_COOK(PRSO);
            return true;
        }
        return false;
    } else if(isIS(PRSO, NODESC)) {
        if((_X = isTALKING())) {
            PCLEAR();
            TELL("He");
            PRINT(" doesn't seem to hear you.|");
            return RFATAL();
        }
        CANT_FROM_HERE();
        return true;
    } else if(isVERB(V_ASK_FOR)) {
        ASK_COOK_FOR(PRSI);
        return true;
    } else if(isVERB(V_ASK_ABOUT)) {
        ASK_COOK_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        SHOW_TO_COOK(PRSI);
        return true;
    } else {
        return false;
    }
}

function ASK_COOK_ABOUT(_OBJ) {
    let _TBL, _LEN, _X;
    SEE_CHARACTER(COOK);
    MAKE(COOK, SEEN);
    if(isEQUAL(_OBJ, BOTTLE)) {
        if(isIS(ONION, SEEN)) {
            TELL("\"Got it put away, nice and safe. Thanks again.\"", CR);
            return true;
        } else if(isIS(BOTTLE, IDENTIFIED)) {
            TELL("\"This here onion's yours if you ");
            if(isVISIBLE(_OBJ)) {
                TELL("hand it over.\"", CR);
                return true;
            }
            TELL("get it for me.\"", CR);
            return true;
        } else if(isIS(ONION, TOUCHED)) {
            UNMAKE(COOK, SEEN);
            TELL("\"Ahem.\"", CR);
            I_ONION_OFFER();
            return true;
        }
        DO_GLANCE(COOK, CELLAR_DOOR);
        return true;
    } else if(isEQUAL(_OBJ, COOK)) {
        TELL("\"Grote Clutchcake's the name.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, CELLAR, CELLAR_DOOR)) {
        TELL("\"Used t'be a wine cellar. Can't go down no more; too dangerous.\"", CR);
        return true;
    } else if(!(isVISIBLE(_OBJ))) {
        PERPLEXED(COOK);
        TELL("Don't know");
        WHO_WHAT(_OBJ);
        TELL("you're talkin' 'bout.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, ONION)) {
        COOK_MENTIONS_ONION();
        return true;
    }
    TELL(CTHE(COOK), " shrugs impatiently. \"Can't say anythin' 'bout ");
    PRONOUN(_OBJ);
    TELL(" you wouldn't know already.\"", CR);
    return true;
}

function ASK_COOK_FOR(_OBJ) {
    let _X, _L;
    SEE_CHARACTER(COOK);
    _L = LOC(_OBJ);
    MAKE(COOK, SEEN);
    if(!(isVISIBLE(_OBJ))) {
        
    } else if(isEQUAL(_OBJ, ONION)) {
        if(isIS(_OBJ, SEEN)) {
            TELL("\"It's yours. Roll it outa here.\"", CR);
            return true;
        } else if(isIS(BOTTLE, IDENTIFIED)) {
            TELL("\"Yours for ", THE(BOTTLE));
            if(!(isIS(BOTTLE, TOUCHED))) {
                TELL(" downstairs");
            }
            TELL(PERQ);
            return true;
        }
        COOK_MENTIONS_ONION();
        return true;
    }
    AINT_GOT(COOK, _OBJ);
    return true;
}

function COOK_MENTIONS_ONION() {
    if(!(isIS(ONION, TOUCHED))) {
        MAKE(ONION, TOUCHED);
        MAKE(COOK, SEEN);
        DEQUEUE(I_COOK);
        QUEUE(I_ONION_OFFER);
        TELL(CTHE(COOK), " gives ", THE(ONION
), " an affectionate kick. ");
    }
    TELL("\"Nice, eh? Won second place at the Borphee County Fair.\"", CR);
    return true;
}

function STOP_ONION_OFFER() {
    MAKE(BOTTLE, IDENTIFIED);
    DEQUEUE(I_ONION_OFFER);
    if(!(isQUEUED(I_COOK))) {
        QUEUE(I_COOK);
    }
    MAKE(COOK, SEEN);
    return false;
}

function GIVE_TO_COOK(_OBJ) {
    SEE_CHARACTER(COOK);
    MAKE(COOK, SEEN);
    if(isGIVING_LOOT(_OBJ, COOK)) {
        return true;
    }
    TELL(CTHE(COOK));
    if(isEQUAL(_OBJ, BOTTLE)) {
        VANISH(_OBJ);
        MAKE(ONION, SEEN);
        TELL("'s eyes grow large as he takes ", THE(_OBJ
), ". \"Been after this thing for years,\" he cries, turning it over and over in his hands before stowing it quickly out of sight. ");
        if(!(isIS(BOTTLE, IDENTIFIED))) {
            TELL("\"I owe you a big favor, ");
            BOY_GIRL();
            TELL(". A ");
            ITALICIZE("very");
            TELL(" big favor. Big as this here onion.\" ");
        }
        STOP_ONION_OFFER();
        TELL("Your eyes follow his to ", THE(ONION
), " near the exit. \"All yours,\" he says, patting it affectionately.", CR);
        return true;
    }
    TELL(" refuses ", THE(_OBJ
), " with a shake of his head. \"No, thanks.\"", CR);
    return true;
}

function COOK_SEES_BOTTLE() {
    STOP_ONION_OFFER();
    MAKE(BOTTLE, MUNGED);
    TELL("\"The bottle!\" gasps ", THE(COOK
), " when he sees it");
    if(isIN(BOTTLE, PLAYER)) {
        TELL(" in your hands");
    }
    PRINT(". \"You got it!\"|");
    return true;
}

function SHOW_TO_COOK(_OBJ) {
    SEE_CHARACTER(COOK);
    MAKE(COOK, SEEN);
    if(isEQUAL(_OBJ, BOTTLE)) {
        if(!(isIS(_OBJ, IDENTIFIED))) {
            COOK_SEES_BOTTLE();
            return true;
        }
        STOP_ONION_OFFER();
        TELL("\"That's the one!\" he gasps");
        PRINT(". \"You got it!\"|");
        return true;
    }
    TELL("\"How interesting,\" yawns ", THE(COOK));
    if(isVISIBLE(_OBJ)) {
        TELL(", glancing at ", THE(_OBJ));
    }
    PRINT(PERIOD);
    return true;
}

"*** BAND ***"

var BANDITS = () => OBJECT({
	LOC: IN_PUB,
	DESC: "group of bandits",
	FLAGS: [NODESC, LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["BANDITS", "BANDIT", "PEOPLE", "GUYS", "FELLOWS", "GROUP"],
	ACTION: BANDITS_F
});

function BANDITS_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_POINT_AT, V_TOUCH_TO, V_FIRE_AT)) {
            TELL("There are too many of them here.", CR);
            return true;
        } else if(isVERB(V_THROW, V_THROW_OVER)) {
            SUICIDE();
            return true;
        } else if(isVERB(V_GIVE, V_SHOW, V_GET_FOR, V_FEED)) {
            HEEDLESS();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        HEEDLESS();
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        NOSEY("starin' at");
        return true;
    } else if(isVERB(V_LISTEN)) {
        NOSEY("listenin' to");
        return true;
    } else if((_X = isHURTING())) {
        SUICIDE();
        return true;
    } else {
        return false;
    }
}

function NOSEY(_STR) {
    MAKE(PRSO, SEEN);
    TELL("\"Who're you ", _STR
, "?\" demands a very large bandit. You wisely decide to turn your attention elsewhere.", CR);
    return true;
}

function SUICIDE() {
    TELL("Suicide. Monsters are one thing; an armed ", BANDITS
, " is quite another.", CR);
    return true;
}

function HEEDLESS() {
    PCLEAR();
    TELL("The bandits glare at your interruption. \"Scram.\"", CR);
    return true;
}

var OWOMAN = () => OBJECT({
	LAST_LOC: 0,
	DESC: "old woman",
	FLAGS: [VOWEL, LIVING, PERSON, FEMALE, TRANSPARENT],
	SYNONYM: ["Y\'GAEL", "WOMAN", "LADY", "DAME", "FEMALE", "F"],
	ADJECTIVE: ["OLD"],
	LIFE: I_OWOMAN,
	DESCFCN: OWOMAN_F,
	ACTION: OWOMAN_F
});

function OWOMAN_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(OWOMAN), SIS, PICK_NEXT(OWOMAN_EYES), C("."));
        return true;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_TELL_ABOUT, V_SSHOW)
  &&  isPRSO(ME))) {
            ASK_OWOMAN_ABOUT(PRSI);
            return RFATAL();
        } else if((isVERB(V_EXAMINE, V_REQUEST, V_WHAT, V_WHO, V_WHERE)
  ||  (isVERB(V_SHOW)
  &&  isPRSI(ME)))) {
            ASK_OWOMAN_ABOUT(PRSO);
            return RFATAL();
        } else if((isVERB(V_GIVE, V_GET_FOR)
  &&  isPRSI(ME))) {
            ASK_OWOMAN_FOR(PRSO);
            return RFATAL();
        } else if((isVERB(V_SGIVE, V_SGET_FOR)
  &&  isPRSO(ME))) {
            ASK_OWOMAN_FOR(PRSI);
            return RFATAL();
        } else if((isVERB(V_SELL_TO)
  &&  isPRSI(ME))) {
            BUY_X_WITH_Y(PRSO, MONEY);
            return true;
        } else if((isVERB(V_SSELL_TO)
  &&  isPRSO(ME))) {
            BUY_X_WITH_Y(PRSI, MONEY);
            return true;
        } else if((isVERB(V_HELLO, V_GOODBYE)
  &&  isPRSO(ROOMS, OWOMAN))) {
            GREET_OWOMAN();
            return RFATAL();
        }
        TELL("\"I'm not used to being ordered about,\" observes "
, THE(OWOMAN), " coldly.", CR);
        return RFATAL();
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("Y\'GAEL")) {
        if(!(isIS(OWOMAN, MUNGED))) {
            MAKE(OWOMAN, MUNGED);
            TELL(CTHELADY);
            PRINT(" raises an eyebrow");
            TELL(" as you speak her Name.", CR);
            return RFATAL();
        }
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            HARMLESS(PRSI);
            return true;
        } else if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_OWOMAN(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            ASK_OWOMAN_ABOUT(PRSO);
            return true;
        } else if(isVERB(V_SELL_TO)) {
            TRADE_FOR_LOOT(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE)) {
        _X = GETP(PRSO, "LAST-LOC");
        if(isVISIBLE(_X)) {
            
        } else if(isT(_X)) {
            TELL("That's odd. She looks just like the woman you met in ", THE(_X), PERIOD);
            return true;
        }
        TELL(CTHEO, " regards you with equal interest.", CR);
        return true;
    } else if(isVERB(V_ASK_FOR)) {
        ASK_OWOMAN_FOR(PRSI);
        return true;
    } else if(isVERB(V_ASK_ABOUT)) {
        ASK_OWOMAN_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        if(isIN(PRSI, PLAYER)) {
            GIVE_TO_OWOMAN(PRSI);
            return true;
        }
        ASK_OWOMAN_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_HELLO, V_WAVE_AT, V_GOODBYE)) {
        GREET_OWOMAN();
        return true;
    } else if((_X = isHURTING())) {
        HARMLESS();
        return true;
    } else {
        return false;
    }
}

function GREET_OWOMAN() {
    MAKE(OWOMAN, SEEN);
    TELL(CTHELADY, " nods graciously.", CR);
    return true;
}

const OWOMAN_TABLE
 = PLTABLE([SPADE, "I've always been one to call a spade a spade"]
, [LEAFLET, "I don't look at other people's mail"]
, [PARCEL, "I don't look at other people's mail"]
, [CROWN, "Tidy little trinket, that"]
, [DOUBLOON, "Tidy little trinket, that"]
, [DIAMOND, "Tidy little trinket, that"]
, [ORNAMENT, "Aluminized plastic. Festive, though"]
, [RELIQUARY, "Standard clerical issue"]
, [SADDLE, "Smallish; must be for a pony"]
, [SEXTANT, "Antiques are big nowadays"]
, [LANTERN, "Antiques are big nowadays"]
, [RUG, "Phew! That thing wants a good airing"]
, [TUSK, "That'll make some piano awfully happy"]
, [BOTTLE, "A fair vintage"]
, [BFLY, "A fair specimen"]
, [CARD, "Not the handsomest of mages"]
);

function ASK_OWOMAN_ABOUT(_OBJ) {
    let _TBL, _LEN, _X;
    SEE_CHARACTER(OWOMAN);
    if(isEQUAL(_OBJ, MONEY, INTNUM)) {
        TELL("\"My favorite subject.\"", CR);
        return true;
    } else if(isWHAT_TALK(OWOMAN, _OBJ)) {
        return true;
    } else if(isEQUAL(_OBJ, KEY1, KEY2, KEY3)) {
        TELL("\"How tawdry.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, PARASOL)) {
        TELL(CTHELADY);
        PRINT(" raises an eyebrow");
        PRINT(", but says nothing.|");
        return true;
    } else if((isEQUAL(_OBJ, BOUTIQUE, WEAPON_SHOP, MSHOPPE)
  ||  isEQUAL(_OBJ, BCASE, MCASE, WCASE))) {
        TELL("\"Best selection in the Southlands.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, CURTAIN, OWOMAN, ME)) {
        TELL(CTHELADY, " smiles wryly");
        PRINT(", but says nothing.|");
        return true;
    } else if((isHERE(IN_BOUTIQUE)
  &&  isBOUTIQUE_KNOWLEDGE(_OBJ))) {
        return true;
    } else if((isHERE(IN_WEAPON)
  &&  isWEAPON_KNOWLEDGE(_OBJ))) {
        return true;
    } else if((isHERE(IN_MAGICK)
  &&  isMAGICK_KNOWLEDGE(_OBJ))) {
        return true;
    }

    _LEN = OWOMAN_TABLE[0];
    while(true) {
        _TBL = OWOMAN_TABLE[_LEN];
        _X = _TBL[0];
        if(isEQUAL(_X, _OBJ)) {
            TELL("\"", _TBL[1]);
            REVEAL_VALUE(_X, GETP(HERE, "THIS-CASE"));
            return true;
        } else if(--_LEN < 1) {
            break;
        }
    }

    if((!(isHERE(IN_MAGICK))
  &&  (_X = MAGIC_ITEMS[0])
//  &&  (_X = isINTBL(_OBJ, REST(MAGIC_ITEMS, 2), _X)))) {
  &&  (_X = MAGIC_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        ASK_IN(_OBJ, "Magick Shoppe in Gurth City");
        return true;
    }
    if((!(isHERE(IN_WEAPON))
  &&  (_X = WEAPON_ITEMS[0])
  //&&  (_X = isINTBL(_OBJ, REST(WEAPON_ITEMS, 2), _X)))) {
    &&  (_X = WEAPON_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        ASK_IN(_OBJ, "weapon shop in Accardi");
        return true;
    }
    if((!(isHERE(IN_BOUTIQUE))
  &&  (_X = ARMOR_ITEMS[0])
  //&&  (_X = isINTBL(_OBJ, REST(ARMOR_ITEMS, 2), _X)))) {
    &&  (_X = ARMOR_ITEMS.slice(2).map(toOBJECT).includes(_OBJ)))) {
        ASK_IN(_OBJ, "boutique in Mizniaport");
        return true;
    }

    TELL("\"I'm afraid I can't tell you very much about ");
    PRONOUN(_OBJ);
    TELL(",\" apologizes ", THE(OWOMAN), PERIOD);
    return true;
}

function ASK_IN(_OBJ, _STR) {
    TELL(CTHELADY, GLANCES_AT, THE(_OBJ
), ". \"Can't tell you much about this here,\" she mutters. \"Bet the ", _STR
, " would know something, though.\"", CR);
    return true;
}

function isBOUTIQUE_KNOWLEDGE(_OBJ) {
    if(isEQUAL(_OBJ, PACK)) {
        TELL("\"Perfect for those long adventures");
    } else if(isEQUAL(_OBJ, CLOAK)) {
        TELL("\"A fine example of elvish tailoring. 'Tis said a potent virtue is woven into the cloth");
    } else if(isEQUAL(_OBJ, TUNIC)) {
        TELL("\"Oh, that. Last week's fashion, I'm afraid");
    } else if(isEQUAL(_OBJ, SCALE)) {
        TELL("\"Good basic protection. Not too bulky, not too expensive");
    } else if(isEQUAL(_OBJ, CHAIN)) {
        TELL("\"An effective design, if not particularly comfortable");
    } else if(isEQUAL(_OBJ, PLATE)) {
        TELL("\"The last word in protection,\" states ", THE(OWOMAN
), " flatly. \"That stuff'll turn aside anything short of a grue's fangs");
    } else if(isEQUAL(_OBJ, HELM, SCABBARD)) {
        SECRET_VIRTUE(_OBJ);
        return true;
    } else {
        return false;
    }

    REVEAL_VALUE(_OBJ, BCASE);
    return true;
}

function isWEAPON_KNOWLEDGE(_OBJ) {
    if(isEQUAL(_OBJ, ARROW)) {
        TELL("\"A primitive design; high drag coefficient");
    } else if(isEQUAL(_OBJ, DAGGER)) {
        TELL("\"Suitable for cleaning fish, I suppose");
    } else if(isEQUAL(_OBJ, SWORD)) {
        TELL("\"Of ancient elvish workmanship, if I'm not mistaken");
    } else if(isEQUAL(_OBJ, SHILL)) {
        TELL("\"Many an orc's skull bears the mark of this ", SHILL);
    } else if(isEQUAL(_OBJ, AXE)) {
        TELL("\"A real skull-cleaver, that one");
    } else if(isEQUAL(_OBJ, PHASE, SCABBARD, HELM)) {
        SECRET_VIRTUE(_OBJ);
        return true;
    } else {
        return false;
    }

    REVEAL_VALUE(_OBJ, WCASE);
    return true;
}

function isMAGICK_KNOWLEDGE(_OBJ) {
    let _VAL, _ACT, _FX;
    IDING = _OBJ;
    _ACT = GETP(_OBJ, "ACTION");
    _FX = GETP(_OBJ, "EFFECT");
    if(isEQUAL(_ACT, SLEEP_WAND_F)) {
        DO_ID();
        TELL("Aim this at a creature and watch it stagger");
    } else if(isEQUAL(_ACT, BLAST_WAND_F)) {
        DO_ID();
        TELL("Instant death, with few exceptions");
    } else if(isEQUAL(_ACT, TELE_WAND_F)) {
        DO_ID();
        TELL("Teleports trouble out of your way");
    } else if(isEQUAL(_ACT, IO_WAND_F)) {
        DO_ID();
        TELL("Makes things turn inside-out");
    } else if(isEQUAL(_ACT, LEV_WAND_F)) {
        DO_ID();
        TELL("Floats 'most anything that isn't nailed down");
    } else if(isEQUAL(_ACT, DISPEL_WAND_F)) {
        TELL(CTHELADY, " scowls. ");
        DO_ID();
        TELL("Neutralizes the effects of Magick");
    } else /*Potions.*/if(isEQUAL(_ACT, HEALING_POTION_F)) {
        DO_ID();
        TELL("Just the thing in the heat of battle");
    } else if(isEQUAL(_ACT, FORGET_POTION_F)) {
        DO_ID();
        TELL("Hmm,\" mutters ", THE(OWOMAN
), ". \"Tried one of those once; can't recall what it does. Oh, well");
    } else if(isEQUAL(_ACT, DEATH_POTION_F)) {
        DO_ID();
        TELL("Don't understand why they mix these things");
    } else if((isEQUAL(_ACT, MIGHT_POTION_F)
  ||  isEQUAL(_OBJ, ROOT))) {
        DO_ID();
        TELL("That'll put hair on your chest");
        if(isIS(PLAYER, FEMALE)) {
            TELL(".\" ", CTHELADY
, " blushes. \"Well, you know what I mean");
        }
    } else if(isEQUAL(_ACT, IQ_POTION_F)) {
        DO_ID();
        TELL("Four years faster than GUE Tech, and a lot cheaper");
    } else /*Scrolls.*/if(isEQUAL(_FX, DO_PARTAY)) {
        DO_ID();
        TELL("Big fun at parties");
    } else if(isEQUAL(_FX, DO_FILFRE)) {
        DO_ID();
        TELL("Essential reading");
    } else if(isEQUAL(_FX, DO_GOTO)) {
        DO_ID();
        TELL("Just the thing for emergencies");
    } else if(isEQUAL(_FX, DO_BLESS_ARMOR)) {
        DO_ID();
        TELL("Bestows a rich blessing upon your armor");
    } else if(isEQUAL(_FX, DO_BLESS_WEAPON)) {
        DO_ID();
        TELL("Adds a touch of enchantment to any weapon");
    } else if(isEQUAL(_FX, DO_RENEWAL)) {
        DO_ID();
        TELL("How refreshing");
    } else if(isEQUAL(_FX, DO_GATE)) {
        DO_ID();
        TELL("Not as robust as Dimension Door, but serviceable");
    } else if(isEQUAL(_OBJ, CAKE)) {
        TELL(CTHELADY
, " grimaces. \"Bleah. My aunt used to make those. Good for your brain, but not much else");
    } else if(isEQUAL(_OBJ, CLOAK)) {
        DO_ID();
        TELL("Elvish, if the weave speaks true");
    } else if(isEQUAL(_OBJ, RING)) {
        TELL(CTHELADY, " smirks. ");
        DO_ID();
        TELL("Same as the Coal-Walkers of Egreth use");
    } else if(isEQUAL(_OBJ, HELM)) {
        DO_ID();
        MAKE(_OBJ, PROPER);
        TELL("A potent relic of the past 'Tis said the wearer commands the wisdom of kings, and can see the unseeable.\" She shudders visibly. \"Some things are better left unseen");
    } else if(isEQUAL(_OBJ, GOBLET)) {
        if(!(GOBLET_WORD)) {
            SETUP_GOBLET();
        }
        TELL(CTHELADY
, " turns pale, and lowers her voice to a barely audible whisper. \"The ");
        PRINT_TABLE(GETP(_OBJ, "NAME-TABLE"));
        TELL(",\" she hisses");
        if(!(isIS(_OBJ, NEUTRALIZED))) {
            TELL(", and thunder rumbles outside");
        }
        TELL(". \"Beware! for its Name incurs the wrath of the Implementors");
    } else if(isEQUAL(_OBJ, UHEMI, LHEMI)) {
        TELL("\"Hmm,\" mutters ", THE(OWOMAN
), ". \"Some great potential lies within");
    } else if(isEQUAL(_OBJ, STONE)) {
        if(!(isIS(STONE, NAMED))) {
            SETUP_STONE();
        }
        TELL("\"Ah! The ");
        PRINT_TABLE(GETP(_OBJ, "NAME-TABLE"));
        TELL("! Visions of things yet to be lie within its depths, for those with enough wit to see them");
    } else if(isEQUAL(_OBJ, RFOOT, CLOVER, SHOE)) {
        TELL("\"A charm to ward off ill luck");
    } else if(isEQUAL(_OBJ, SCABBARD)) {
        MAKE(_OBJ, IDENTIFIED);
        TELL(CTHELADY
, "'s voice lowers to a respectful whisper. \"Behold ", THE(_OBJ
), ", Blade of Entharion,\" she says. \"Though the Blade is long lost, the scabbard retains much virtue; for ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he who wears it is blessed with wondrous powers of recuperation");
    } else if(isEQUAL(_OBJ, VIAL)) {
        TELL("\"Holy water,\" explains ", THE(OWOMAN
), " after a brief glance. \"Standard issue against vampires, wraiths, anything dead that moves");
    } else if(isEQUAL(_OBJ, GLASS)) {
        TELL("\"A relic of ancient Pheebor,\" explains ", THE(OWOMAN
), ". \"Its purpose is lost in Time. Perhaps it is part of some greater Magick");
    } else if(isEQUAL(_OBJ, ROSE)) {
        TELL("\"A compass rose! Just the thing for an ill wind");
    } else if(isEQUAL(_OBJ, GURDY)) {
        TELL("\"A versatile instrument. Dangerous in the wrong hands");
    } else if(isEQUAL(_OBJ, WHISTLE)) {
        DO_ID();
        TELL("Wrought by a platypus, like most nowadays");
    } else if(isEQUAL(_OBJ, PHASE)) {
        TELL("\"Little more than a curiosity, at least on this Plane of existence");
    } else if(isEQUAL(_OBJ, CHEST)) {
        TELL(CTHELADY
, " studies ", THE(_OBJ), " closely. \"Careful with this,\" she warns. \"The plaque on the lid is well worth reading");
    } else if(isEQUAL(_OBJ, AMULET)) {
        TELL("\"A useful bit of Magick, this. ");
        if(!(AMULET_STARS)) {
            TELL("Too bad it's all used up");
        } else {
            TELL("Still got some life in it, too");
        }
    } else if(isEQUAL(_OBJ, SPENSE, SPENSE2)) {
        TELL("\"Spenseweed, of course. A wholesome treat");
    } else if(isEQUAL(_OBJ, BURIN)) {
        TELL("\"Diamond-tipped, I see. Top of the line");
    } else if(isEQUAL(_OBJ, JAR, CIRCLET)) {
        TELL("\"A vain bit of Magick; yet not without its uses");
    } else {
        return false;
    }

    if(isIS(_OBJ, NEUTRALIZED)) {
        PRINT(". Unfortunately, ");
        TELL("its Magick");
        PRINT(" appears to have been neutralized");
    }
    REVEAL_VALUE(_OBJ, MCASE);
    return true;
}

function REVEAL_VALUE(_OBJ, _CASE) {
    let _VAL, _X;
    _VAL = GETP(_OBJ, "VALUE");
    TELL(C("."));
    if(!(_VAL)) {
        TELL("\"", CR);
        return true;
    }
    TELL(C(SP));
    _X = OFFERS;
    if(!(isIN(_OBJ, _CASE))) {
        _X = USED_OFFERS;
    }
    TELL(PICK_NEXT(_X), N(_VAL), " zorkmid");
    if(!(isEQUAL(_VAL, 1))) {
        TELL("s");
    }
    TELL(PERQ);
    return true;
}

function SECRET_VIRTUE(_OBJ) {
    TELL(CTHELADY, " scrutinizes ", THE(_OBJ
), " with care. \"Hmm,\" she mutters. \"There may be a virtue in this ");
    PRINTD(_OBJ);
    TELL(" beyond its simple face value. Perhaps you should bring it to the ");
    PRINT("Magick Shoppe in Gurth City");
    TELL(PERQ);
    return true;
}

var IDING/*OBJECT*/ = null;

function DO_ID() {
    if(!(isIS(IDING, IDENTIFIED))) {
        MAKE(IDING, IDENTIFIED);
        WINDOW(SHOWING_ALL);
    }
    TELL("\"", PICK_NEXT(AH_YESSES), D(IDING), ". ");
    return false;
}

function ASK_OWOMAN_FOR(_OBJ) {
    let _X, _L;
    SEE_CHARACTER(OWOMAN);
    _L = LOC(_OBJ);
    if(!(isEQUAL(_L, OWOMAN))) {
        if(isVISIBLE(_OBJ)) {
            TELL("\"I see ");
            if(isIS(_OBJ, PLURAL)) {
                TELL(B("SOME"));
            } else {
                TELL(B("ONE"));
            }
            TELL(" there ");
            SAY_WHERE(_L);
            TELL(",\" smiles ", THE(OWOMAN), PERIOD);
            return true;
        }
        TELL("\"I'm afraid I don't have ", A(_OBJ), PERQ);
        return true;
    }
    NOT_SO_FAST(OWOMAN);
    return true;
}

function NOT_SO_FAST(_OBJ) {
    TELL("\"Not so fast!\" laughs ", THE(_OBJ
), ", drawing away from you.", CR);
    return true;
}

function GIVE_TO_OWOMAN(_OBJ) {
    let _X;
    SEE_CHARACTER(OWOMAN);
    if(isGIVING_LOOT(_OBJ, OWOMAN)) {
        return true;
    }
    _X = MAGIC_ITEMS[0];
    //if((_X = isINTBL(_OBJ, REST(MAGIC_ITEMS, 2), _X))) {
    if((_X = MAGIC_ITEMS.slice(2).map(toOBJECT).includes(_OBJ))) {
        if(!(isHERE(IN_MAGICK))) {
            CANT_USE_HERE(_OBJ, "Magick Shoppe in Gurth City");
            return true;
        }
        TRADE_FOR_LOOT(_OBJ);
        return true;
    }
    _X = ARMOR_ITEMS[0];
    //if((_X = isINTBL(_OBJ, REST(ARMOR_ITEMS, 2), _X))) {
    if((_X = ARMOR_ITEMS.slice(2).map(toOBJECT).includes(_OBJ))) {
        if(!(isHERE(IN_BOUTIQUE))) {
            CANT_USE_HERE(_OBJ, "boutique in Mizniaport");
            return true;
        }
        TRADE_FOR_LOOT(_OBJ);
        return true;
    }
    _X = WEAPON_ITEMS[0];
    //if((_X = isINTBL(_OBJ, REST(WEAPON_ITEMS, 2), _X))) {
    if((_X = WEAPON_ITEMS.slice(2).map(toOBJECT).includes(_OBJ))) {
        if(!(isHERE(IN_WEAPON))) {
            CANT_USE_HERE(_OBJ, "weapon shop in Accardi");
            return true;
        }
        TRADE_FOR_LOOT(_OBJ);
        return true;
    }
    TRADE_FOR_LOOT(_OBJ);
    return true;
}

function CANT_USE_HERE(_OBJ, _STR) {
    TELL(CTHELADY, GLANCES_AT, THE(_OBJ
), ". \"Can't use this here,\" she mutters. \"Maybe the "
, _STR, " would be interested.\"", CR);
    return true;
}

"*** ORATOR ***"

var ORATOR = () => OBJECT({
	DESC: "orator",
	FLAGS: [LIVING, PERSON, VOWEL, TRANSPARENT],
	LIFE: 0,
	SYNONYM: ["ORATOR", "SPEAKER", "MAN", "GUY", "FELLOW", "PERSON"],
	DESCFCN: ORATOR_F,
	ACTION: ORATOR_F
});

function ORATOR_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(ORATOR), " stands nearby, addressing the crowd.");
        return true;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        return false;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO, " looks and acts very important.", CR);
        return true;
    } else {
        return false;
    }
}

var PCROWD = () => OBJECT({
	DESC: "throng",
	FLAGS: [NODESC, LIVING, PERSON, PLURAL, TRANSPARENT],
	SYNONYM: ["THRONG", "CROWD", "PEOPLE"]	/*ACTION: PCROWD_F*/
});

"*** PRINCE ***"

var PRINCE = () => OBJECT({
	LOC: HORSE,
	DESC: "prince",
	SDESC: DESCRIBE_PRINCE,
	FLAGS: [NODESC, LIVING, PERSON, TRYTAKE, NOALL, TRANSPARENT],
	SYNONYM: ["PRINCE", "MAN", "GUY", "FELLOW", "RIDER", "ZZZP", "ZZZP", "ZZZP"],
	ADJECTIVE: ["PRINCE\'S", "ZZZP"],
	CONTFCN: PRINCE_F,
	ACTION: PRINCE_F
});

function DESCRIBE_PRINCE(_OBJ) {
    return (isIS(_OBJ, SLEEPING) ? "dead " : "") + TELL(PRINCE);;
}

function PRINCE_F(_CONTEXT=null) {
    let _OBJ, _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_CONT)) {
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
        }
        return false;
    } else if((_X = isTALKING())) {
        CONTEMPT();
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL("He's wearing ", A(HELM), PERIOD);
        return true;
    } else if((_X = isTOUCHING())) {
        ZING();
        return true;
    } else {
        return false;
    }
}

function CONTEMPT() {
    PCLEAR();
    TELL(CTHEO
, " silences you with a gesture of contempt.", CR);
    return true;
}

function DEAD_PRINCE_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isNOUN_USED("HEAD")) {
        if(!(isIN(HORSE, TRENCH))) {
            SAY_SLAY();
            return RFATAL();
        }
        TELL(CANT, "see it anymore.", CR);
        return RFATAL();
    }
    if((_X = isTOUCHING())) {
        TELL("Ick! He's all bloody.", CR);
        return true;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        NOT_LIKELY();
        PRINT(" would respond.|");
        return true;
    } else if(isVERB(V_EXAMINE, V_LOOK_ON, V_SEARCH)) {
        TELL("His head is missing. Yuk.", CR);
        return true;
    } else {
        return false;
    }
}

function SAY_SLAY() {
    let _X;
    TELL("As you ");
    if((_X = isSEEING())) {
        TELL("peer into ");
    } else if((_X = isTOUCHING())) {
        TELL("reach towards ");
    } else {
        TELL("approach ");
    }
    TELL(THE(TRENCH), ", a ");
    SLAY_HORSE();
    return true;
}

var KNIGHT = () => OBJECT({
	LOC: BHORSE,
	DESC: "knight",
	FLAGS: [LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["KNIGHT", "MAN", "GUY", "FELLOW", "RIDER"],
	ACTION: KNIGHT_F
});

function KNIGHT_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            BATTLE_MISS();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        CONTEMPT();
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL("His regal bearing does not disguise his youth.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        ZING();
        return true;
    } else {
        return false;
    }
}

"*** HUNTERS ***"

var HUNTERS = () => OBJECT({
	DESC: "hunters",
	FLAGS: [LIVING, PERSON, PLURAL, TRANSPARENT],
	SYNONYM: ["HUNTERS", "HUNTER", "PEASANTS", "PEASANT", "PEOPLE", "MEN", "GUYS"],
	ADJECTIVE: ["TRUFFLE"],
	GENERIC: GENERIC_HUNTERS_F,
	DESCFCN: HUNTERS_F,
	ACTION: HUNTERS_F
});

function HUNTERS_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL("Hunters are foraging under the distant trees.");
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_SHOW, V_GIVE, V_FEED)) {
            DISTANT_HUNTERS();
            return true;
        }
        return false;
    } else if(isVERB(V_YELL, V_WAVE_AT)) {
        TELL("A few of the distant ", PRSO
, " glance up at you, then return to work.", CR);
        return true;
    } else if((_X = isTALKING())) {
        PCLEAR();
        DISTANT_HUNTERS();
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHEO
, " trudge slowly among the oaks, peering at the ground.", CR);
        return true;
    } else if(isVERB(V_WALK_TO, V_FOLLOW)) {
        TELL(CTHEO, " are running around in every "
, INTDIR, PERIOD);
        return true;
    } else if((isVERB(V_LISTEN, V_SMELL)
  ||  (_X = isTOUCHING()))) {
        CANT_FROM_HERE();
        return true;
    } else {
        return false;
    }
}

function DISTANT_HUNTERS() {
    TELL("None of ", THE(HUNTERS
), " respond. They're too far away to hear you.", CR);
    return true;
}

function GENERIC_HUNTERS_F(_TBL, _LEN=0) {
    return HUNTER;
}

"*** HUNTER ***"

var HUNTER = () => OBJECT({
	DESC: "hunter",
	FLAGS: [LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["HUNTER", "PEASANT", "BOY", "LAD", "MAN", "GUY", "FELLOW"],
	ADJECTIVE: ["PEASANT", "TRUFFLE"],
	LIFE: 0,
	GENERIC: GENERIC_HUNTERS_F,
	DESCFCN: HUNTER_F,
	ACTION: HUNTER_F
});

function HUNTER_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(HUNTER), " is standing nearby.");
            return true;
        } else if(isEQUAL(_CONTEXT, M_CONT)) {
            if((_X = isTOUCHING())) {
                HANDS_OFF_HUNTER();
                return true;
            }
            return false;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_HUNTER(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            SHOW_TO_HUNTER(PRSO);
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        PCLEAR();
        TELL(CTHE(HUNTER
), " frowns. \"Wha' say ye? Ye got a funny way o' talkin', ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("ma'am.\"", CR);
            return RFATAL();
        }
        TELL("mister.\"", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_LOOK_ON)) {
        TELL(CTHEO
, " is a lad of twelve or thirteen years, dressed in peasant garb. A burlap sack is slung over his narrow shoulders.", CR);
        return true;
    } else if(isVERB(V_KISS, V_RAPE, V_TOUCH)) {
        HANDS_OFF_HUNTER();
        return true;
    } else {
        return false;
    }
}

function GIVE_TO_HUNTER(_OBJ) {
    if(isGIVING_LOOT(_OBJ, HUNTER)) {
        return true;
    }
    TELL("\"No, thanks,\" says ", THE(HUNTER
), ", shaking his head.\"", CR);
    return true;
}

function SHOW_TO_HUNTER(_OBJ) {
    TELL(CTHE(HUNTER), GLANCES_AT, THE(_OBJ));
    if(isEQUAL(_OBJ, MINX)) {
        TELL(PERIOD);
        HUNTER_SEES_MINX();
        return true;
    }
    PRINT(", but says nothing.|");
    return true;
}

function HANDS_OFF_HUNTER() {
    TELL("\"Keep to yerself, ");
    MAAM_OR_MISTER();
    TELL("!\" cries ", THE(HUNTER), ", drawing quickly away.", CR);
    return true;
}

function MAAM_OR_MISTER() {
    if(isIS(PLAYER, FEMALE)) {
        TELL("ma'am");
        return true;
    }
    TELL("mister");
    return true;
}

"*** MINX! ***"

var MINX = () => OBJECT({
	DESC: "minx",
	SDESC: DESCRIBE_MINX,
	FLAGS: [TRYTAKE, NOALL, LIVING, PERSON, TRANSPARENT, FEMALE, NAMEABLE],
	LIFE: 0,
	SIZE: 7,
	SYNONYM: ["MINX", "MINX", "ZZZP"],
	ADJECTIVE: ["AWAKE", "ZZZP"],
	NAME_TABLE: ITABLE((NAMES_LENGTH + 1), [BYTE], 0),
	DESCFCN: MINX_F,
	ACTION: MINX_F
});

function DESCRIBE_MINX(_OBJ) {
    
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    
    return PRINTD(_OBJ);
}

function MINX_F(_CONTEXT=null) {
    let _X;
    P_IT_OBJECT = MINX;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        MAKE(MINX, SEEN);
        TELL(CA(MINX));
        if(isSEE_ANYTHING_IN(MINX)) {
            TELL(WITH);
            CONTENTS(MINX);
            TELL(" in its mouth");
        }
        TELL(" is playing at your feet.");
        return true;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if((isIN(MINX, OAK)
  &&  isT(HSCRIPT)
  &&  (_X = isTOUCHING()))) {
        TELL("The thing behind ", THE(OAK
), " shrinks out of reach.", CR);
        return true;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            HARMLESS(PRSI);
            return true;
        } else if(isVERB(V_SHOW)) {
            SHOW_TO_MINX();
            return true;
        } else if(isVERB(V_GIVE, V_FEED)) {
            GIVE_TO_MINX();
            return true;
        }
        return false;
    } else if(isVERB(V_EXAMINE, V_WHAT, V_WHO)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else if(isVERB(V_TELL, V_ASK_ABOUT, V_ASK_FOR, V_TELL_ABOUT)) {
        PCLEAR();
        TELL(CTHEO);
        if(PROB(50)) {
            TELL(" looks at you incomprehendingly");
        } else {
            TELL(" gives you a blank look");
        }
        TELL(". \"Minx?\"", CR);
        return RFATAL();
    } else if(isVERB(V_TOUCH)) {
        MAKE(MINX, SEEN);
        TELL(CTHEO);
        if(PROB(50)) {
            TELL(" purrs");
        } else {
            TELL(" thumps her tail");
        }
        TELL(" with pleasure. \"Minx.\"", CR);
        return true;
    } else if((_X = isHURTING())) {
        HARMLESS();
        return true;
    } else {
        return false;
    }
}

function GIVE_TO_MINX(_OBJ=PRSO) {
    MAKE(MINX, SEEN);
    if(isEQUAL(_OBJ, TRUFFLE)) {
        MINX_EATS_TRUFFLE();
        return true;
    }
    WRINKLES(_OBJ);
    return true;
}

function WRINKLES(_OBJ) {
    TELL(CTHE(MINX), " sniffs ", THE(_OBJ
), " and wrinkles her nose.", CR);
    return true;
}

function SHOW_TO_MINX(_OBJ=PRSO) {
    MAKE(MINX, SEEN);
    if(isEQUAL(_OBJ, TRUFFLE)) {
        TELL(CTHE(MINX), " eagerly thumps her tail. \"Minx!\"", CR);
        return true;
    }
    WRINKLES(_OBJ);
    return true;
}

function MINX_EATS_TRUFFLE() {
    WINDOW(SHOWING_ALL);
    REMOVE(TRUFFLE);
    MAKE(MINX, SEEN);
    P_IT_OBJECT = MINX;
    P_HER_OBJECT = MINX;
    TELL(CTHE(MINX));
    if(!(isIS(TRUFFLE, SEEN))) {
        MAKE(TRUFFLE, SEEN);
        TELL(" looks up at you as she sniffs the ", B("TRUFFLE"
), ". \"Minx?\" she mews, thumping her tail imploringly. When you don't object, she");
    }
    TELL(" pops the delicacy into her mouth, licks her paws clean and purrs with contentment.", CR);
    return true;
}


function KILL_MINX() {
    UNMAKE(MINX, LIVING);
    DEQUEUE(I_MINX);
    PUTP(MINX, "ACTION", DEAD_MINX_F);
    isREPLACE_ADJ(MINX, "AWAKE", "DEAD");
    isREPLACE_ADJ(MINX, "SLEEPING", "DEAD");
    return false;
}

function DEAD_MINX_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        if(isEQUAL(_CONTEXT, M_OBJDESC)) {
            TELL(CA(MINX), " lies nearby.");
            return true;
        }
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        TELL(CTHE(MINX));
        PRINT(" doesn't seem to hear you.|");
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL(CTHE(MINX), " is still as death.", CR);
        return true;
    } else if((_X = isHURTING())) {
        TELL("You're lucky your compassion didn't go down.", CR);
        return true;
    } else {
        return false;
    }
}

"*** MAYOR ***"

var MAYOR = () => OBJECT({
	DESC: "Mayor",
	FLAGS: [LIVING, PERSON, TRANSPARENT],
	LIFE: 0,
	SYNONYM: ["MAYOR", "GROPE", "MIDGET", "DWARF", "MUNCHKIN", "MAN", "GUY", "FELLOW"],
	ADJECTIVE: ["LITTLE", "SMALL", "MAYOR"],
	GENERIC: GENERIC_MUNCHKIN_F,
	DESCFCN: MAYOR_F,
	ACTION: MAYOR_F
});

function MAYOR_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CTHE(MAYOR), " of ", FROON, SIS);
        if((_X = isFIRST(MAYOR))) {
            TELL("standing next to you, holding ");
            CONTENTS(MAYOR);
        } else {
            TELL("grovelling at your feet");
        }
        TELL(". A joyous ", FCROWD
, " is gathered around him.");
        return true;
    } else if(isINSULTED(MAYOR)) {
        return RFATAL();
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, MAYOR))) {
            GREET_MAYOR();
            return true;
        } else if((isVERB(V_GOODBYE)
  &&  isPRSO(ROOMS, MAYOR))) {
            BYE_MAYOR();
            return true;
        } else if((isVERB(V_TELL_ABOUT, V_SSHOW)
  &&  isPRSO(ME))) {
            ASK_MAYOR_ABOUT(PRSI);
            return RFATAL();
        } else if((isVERB(V_EXAMINE, V_WHAT, V_WHO, V_WHERE)
  ||  (isVERB(V_SHOW)
  &&  isPRSI(ME)))) {
            ASK_MAYOR_ABOUT(PRSO);
            return RFATAL();
        } else if((isVERB(V_GIVE, V_GET_FOR)
  &&  isPRSI(ME))) {
            ASK_MAYOR_FOR(PRSO);
            return RFATAL();
        } else if((isVERB(V_SGIVE, V_SGET_FOR)
  &&  isPRSO(ME))) {
            ASK_MAYOR_FOR(PRSI);
            return RFATAL();
        }
        TELL(CTHE(MAYOR), " sighs.", CR);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_MAYOR(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            SHOW_TO_MAYOR(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        GREET_MAYOR();
        return true;
    } else if(isVERB(V_GOODBYE)) {
        BYE_MAYOR();
        return true;
    } else if(isVERB(V_ASK_FOR)) {
        ASK_MAYOR_FOR(PRSI);
        return true;
    } else if(isVERB(V_ASK_ABOUT)) {
        ASK_MAYOR_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        SHOW_TO_MAYOR(PRSI);
        return true;
    } else {
        return false;
    }
}

function BYE_MAYOR() {
    TELL("\"Wait! Don't go yet,\" pleads ", THE(MAYOR), ", holding you back.", CR);
    return true;
}

function GREET_MAYOR() {
    TELL("\"Greetings, O noble one.\"", CR);
    return true;
}

const MAYOR_TABLE
 = PLTABLE([MAYOR, "My predecessor died suddenly"]
, [FROON, "Froon! A beautiful land, honorable to serve"]
, [KEY1, "Ah, yes. Such a delicate shade of puce"]
, [KEY2, "Mmm. Lovely mauve highlights"]
, [KEY3, "Lavender! One of my favorite colors"]);

function ASK_MAYOR_ABOUT(_OBJ) {
    let _TBL, _LEN, _X;
    SEE_CHARACTER(MAYOR);
    if(!(isVISIBLE(_OBJ))) {
        PERPLEXED(MAYOR);
        TELL("I'm uncertain as to");
        WHO_WHAT(_OBJ);
        TELL("you are referring.\"", CR);
        return true;
    }
    _LEN = MAYOR_TABLE[0];
    while(true) {
        _TBL = MAYOR_TABLE[_LEN];
        _X = _TBL[0];
        if(isEQUAL(_TBL[0], _OBJ)) {
            PRINTC('\"'.charCodeAt(0));
            TELL(_TBL[1], PERQ);
            return true;
        } else if(--_LEN < 1) {
            break;
        }
    }
    TELL(CTHE(MAYOR), " looks at ", THE(GROUND), " sheepishly");
    ALAS();
    TELL("I possess but little knowledge of ");
    PRONOUN(_OBJ);
    TELL(PERQ);
    return true;
}

function ALAS() {
    TELL(". \"Alas, ");
    HONORED_ONE();
    TELL(". ");
    return true;
}

function ASK_MAYOR_FOR(_OBJ) {
    let _X, _L;
    _L = LOC(_OBJ);
    if(!(isEQUAL(_L, MAYOR))) {
        if(isVISIBLE(_OBJ)) {
            TELL("\"I notice ");
            if(isIS(_OBJ, PLURAL)) {
                TELL(B("SOME"));
            } else {
                TELL(B("ONE"));
            }
            TELL(" there ");
            SAY_WHERE(_L);
            TELL(",\" remarks ", THE(MAYOR), PERIOD);
            return true;
        }
        MAYOR_SORRY();
        TELL("have none to offer at the moment.\"", CR);
        return true;
    } else if(isEQUAL(_OBJ, KEY1, KEY2, KEY3)) {
        AWARD_KEY(_OBJ);
        return true;
    }
    MAYOR_SORRY();
    TELL("cannot give you ");
    PRONOUN(_OBJ);
    TELL(PERQ);
    return true;
}

function MAYOR_SORRY() {
    TELL("\"My apologies, ");
    HONORED_ONE();
    TELL(",\" mumbles ", THE(MAYOR));
    if(PROB(50)) {
        TELL(", hanging his head");
    }
    TELL(". \"I ");
    return true;
}

function GIVE_TO_MAYOR(_OBJ) {
    if(isGIVING_LOOT(_OBJ, MAYOR)) {
        return true;
    }
    NO_THANKS(MAYOR);
    return true;
}

function HONORED_ONE() {
    TELL("Honored ");
    if(isIS(PLAYER, FEMALE)) {
        TELL("Ma'am");
        return true;
    }
    TELL("Sir");
    return true;
}

function SHOW_TO_MAYOR(_OBJ) {
    TELL(CTHE(MAYOR));
    if(!(isVISIBLE(_OBJ))) {
        TELL(" looks confused. \"What do you mean?\"", CR);
        return true;
    }
    TELL(GLANCES_AT, THE(_OBJ
), ", but shows only polite interest.", CR);
    return true;
}

var LADY = () => OBJECT({
	DESC: "little lady",
	FLAGS: [LIVING, PERSON, FEMALE, TRANSPARENT],
	SYNONYM: ["LADY", "MIDGET", "MUNCHKIN", "WOMAN", "GIRL"],
	ADJECTIVE: ["LITTLE", "SMALL", "TINY", "MIDGET", "MUNCHKIN"],
	LIFE: 0,
	GENERIC: GENERIC_MUNCHKIN_F,
	DESCFCN: LADY_F,
	ACTION: LADY_F
});

function LADY_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(LADY), " is standing near ", THE(FARMHOUSE), C("."));
        return true;
    } else if(isIN(FCROWD, HERE)) {
        TELL(CTHE(LADY), " is lost in ", THE(FCROWD), PERIOD);
        return RFATAL();
    } else if(isINSULTED(LADY)) {
        return RFATAL();
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, LADY))) {
            GREET_LADY();
            return RFATAL();
        }
        SHY_LADY();
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_GET_FOR, V_SHOW)) {
            SHOW_TO_LADY(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        return false;
    } else if(isVERB(V_ASK_FOR, V_ASK_ABOUT)) {
        SHY_LADY();
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        SHOW_TO_LADY(PRSI);
        return true;
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        GREET_LADY();
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Her bright, colorful garb blends in with the flowers.", CR);
        return true;
    } else {
        return false;
    }
}

function SHOW_TO_LADY(_OBJ) {
    if(!(isVISIBLE(_OBJ))) {
        SHY_LADY();
        return true;
    }
    TELL(CTHE(LADY), GLANCES_AT, THE(_OBJ
), ", blushes, and says nothing.", CR);
    return true;
}

function SHY_LADY() {
    TELL(CTHE(LADY), " blushes. She's too shy to respond.", CR);
    return true;
}

function GREET_LADY() {
    TELL(CTHE(LADY), " nods at you shyly.", CR);
    return true;
}

var FCROWD = () => OBJECT({
	DESC: "crowd",
	FLAGS: [LIVING, PERSON, TRANSPARENT],
	SYNONYM: ["CROWD", "PEOPLE", "MUNCHKINS", "MUNCHKIN", "GATHERING"],
	ADJECTIVE: ["MUNCHKIN", "LITTLE"],
	GENERIC: GENERIC_MUNCHKIN_F,
	DESCFCN: FCROWD_F,
	ACTION: FCROWD_F
});

function FCROWD_F(_CONTEXT=null) {
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL("A joyous ", FCROWD
, " of little people is standing all around you.");
        return true;
    } else if(isINSULTED(FCROWD)) {
        return RFATAL();
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, FCROWD))) {
            CROWD_GREET();
            return RFATAL();
        }
        LOUD_CROWD();
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_GET_FOR, V_SHOW)) {
            TELL("No one in ", THEI
, " shows any interest.", CR);
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        return false;
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        CROWD_GREET();
        return true;
    } else if(isVERB(V_ASK_FOR, V_ASK_ABOUT, V_TELL_ABOUT)) {
        LOUD_CROWD();
        return true;
    } else {
        return false;
    }
}

function CROWD_GREET() {
    TELL(CTHE(FCROWD), " waves and cheers.", CR);
    return true;
}

function LOUD_CROWD() {
    TELL(CTHE(FCROWD
), " is cheering too loudly to hear you.", CR);
    return true;
}

function isINSULTED(_OBJ) {
    if((isNOUN_USED("MUNCHKIN", "MUNCHKINS")
  ||  isADJ_USED("MUNCHKIN"))) {
        TELL(CTHE(_OBJ), " covers ");
        HAND_PRONOUN(_OBJ);
        TELL(" ears with ");
        HAND_PRONOUN(_OBJ);
        TELL(" hands. \"Don't call ");
        if(isEQUAL(_OBJ, FCROWD)) {
            TELL(B("US"));
        } else {
            TELL(B("ME"));
        }
        TELL(" that!\"", CR);
        return true;
    }
    return false;
}

function HAND_PRONOUN(_OBJ) {
    if(isEQUAL(_OBJ, FCROWD)) {
        TELL("their");
        return true;
    } else if(isEQUAL(_OBJ, MAYOR)) {
        TELL("his");
        return true;
    }
    TELL("her");
    return true;
}

function GENERIC_MUNCHKIN_F(_TBL, _LEN=_TBL[0]) {
    if(isIN(MAYOR, HERE)) {
        return MAYOR;
    }
    return FCROWD;
}

"*** IMPLEMENTORS ***"

var IMPS = () => OBJECT({
	DESC: "Implementors",
	FLAGS: [LIVING, PERSON, PLURAL, TRANSPARENT],
	SYNONYM: ["IMPLEMENTORS", "IMPS", "IMP", "PEOPLE", "MEN", "GROUP"],
	LIFE: I_IMPS,
	DESCFCN: IMPS_F,
	CONTFCN: IMPS_F,
	ACTION: IMPS_F
});

function IMPS_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL("A group of Implementors is seated around a food-laden table");
        if(isIN(COCO, IMPS)) {
            TELL(", playing catch with a coconut.");
            return true;
        } else if(isIN(GOBLET, IMPS)) {
            TELL(". One of them is holding out a ");
            PRINT("goblet for you to take.|");
            return true;
        }
        TELL(", glaring at you angrily.");
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if(isEQUAL(GOBLET, PRSO, PRSI)) {
            return false;
        } else if((_X = isTOUCHING())) {
            TELL(CTHE(IMPS), " won't let you near.", CR);
            return true;
        }
        return false;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if((_X = isTALKING())) {
        PCLEAR();
        TELL("\"I think I just heard something insignificant,\" remarks an Implementor"
, PTAB, "\"How dull,\" replies another, stifling a yawn.", CR);
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_WHAT, V_WHO, V_WHERE)) {
        REFER_TO_PACKAGE();
        return RFATAL();
    } else {
        return false;
    }
}

var CONGREG = () => OBJECT({
	LOC: IN_CHAPEL,
	DESC: "congregation",
	FLAGS: [LIVING, PERSON, NODESC, TRANSPARENT],
	SYNONYM: ["CONGREGATION", "CROWD", "PEOPLE", "FOLKS"],
	ACTION: CONGREG_F
});

function CONGREG_F(_CONTEXT=null) {
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        return false;
    } else if(isVERB(V_EXAMINE)) {
        TELL("Their heads are bowed in fervent prayer.", CR);
        return true;
    } else {
        return false;
    }
}

var CLERIC = () => OBJECT({
	LOC: IN_CHAPEL,
	DESC: "Cardinal Toolbox",
	FLAGS: [NODESC, NOARTICLE, PERSON, TRANSPARENT, /*LIVING*/],
	SYNONYM: ["TOOLBOX", "CARDINAL", "CLERIC", "PRIEST", "MAN", "FELLOW", "GUY", "SIR"],
	ADJECTIVE: ["CARDINAL"],
	LIFE: I_CLERIC,
	DESCFCN: CLERIC_F,
	CONTFCN: CLERIC_F,
	ACTION: CLERIC_F
});

function CLERIC_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CTHE(CLERIC
), " is here, surrounded by a grateful crowd of villagers. He's holding ");
        CONTENTS(CLERIC);
        TELL(C("."));
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if((_X = isTOUCHING())) {
            NOT_SO_FAST(CLERIC);
            return true;
        }
        return false;
    } else if(isEQUAL(_CONTEXT, M_WINNER)) {
        if((isVERB(V_HELLO)
  &&  isPRSO(ROOMS, CLERIC))) {
            GREET_CLERIC();
            return RFATAL();
        } else if((isVERB(V_TELL_ABOUT, V_SSHOW)
  &&  isPRSO(ME))) {
            ASK_CLERIC_ABOUT(PRSI);
            return RFATAL();
        } else if((isVERB(V_EXAMINE, V_WHAT, V_WHO, V_WHERE)
  ||  (isVERB(V_SHOW)
  &&  isPRSI(ME)))) {
            ASK_CLERIC_ABOUT(PRSO);
            return RFATAL();
        } else if((isVERB(V_GIVE, V_GET_FOR)
  &&  isPRSI(ME))) {
            ASK_CLERIC_FOR(PRSO);
            return RFATAL();
        } else if((isVERB(V_SGIVE, V_SGET_FOR)
  &&  isPRSO(ME))) {
            ASK_CLERIC_FOR(PRSI);
            return RFATAL();
        }
        TELL("\"Your accent is strange. I don't understand.\"", CR);
        return RFATAL();
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            HARMLESS(PRSI);
            return true;
        } else if(isVERB(V_GIVE, V_GET_FOR)) {
            GIVE_TO_CLERIC(PRSO);
            return true;
        } else if(isVERB(V_SHOW)) {
            DO_GLANCE(CLERIC, PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_TELL)) {
        if(isT(P_CONT)) {
            return false;
        }
        NO_RESPONSE();
        return true;
    } else if(isVERB(V_EXAMINE)) {
        TELL("He");
        if(isSEE_ANYTHING_IN()) {
            TELL("'s holding ");
            CONTENTS();
            TELL(", and");
        }
        TELL(" looks as if he hasn't slept for days.", CR);
        return true;
    } else if(isVERB(V_ASK_FOR)) {
        ASK_CLERIC_FOR(PRSI);
        return true;
    } else if(isVERB(V_ASK_ABOUT)) {
        ASK_CLERIC_ABOUT(PRSI);
        return true;
    } else if(isVERB(V_TELL_ABOUT)) {
        DO_GLANCE(CLERIC, PRSI);
        return true;
    } else if(isVERB(V_HELLO, V_WAVE_AT)) {
        GREET_CLERIC();
        return true;
    } else if((_X = isHURTING())) {
        HARMLESS();
        return true;
    } else {
        return false;
    }
}

function GREET_CLERIC() {
    TELL(CTHE(CLERIC), " bows deeply.", CR);
    return true;
}

const CLERIC_TABLE
 = PLTABLE([CLERIC, "I preside over this humble diocese"]
, [ORKAN, "He disappeared a few weeks ago without trace"]
, [THRIFF, "I preside over this humble diocese"]
, [XTREES, "Woe is us! Woe"]);

function ASK_CLERIC_ABOUT(_OBJ) {
    let _TBL, _LEN, _X;
    if(isWHAT_TALK(CLERIC, _OBJ)) {
        return true;
    }
    _LEN = CLERIC_TABLE[0];
    while(true) {
        _TBL = CLERIC_TABLE[_LEN];
        _X = _TBL[0];
        if(isEQUAL(_TBL[0], _OBJ)) {
            PRINTC('\"'.charCodeAt(0));
            TELL(_TBL[1], PERQ);
            return true;
        } else if(--_LEN < 1) {
            break;
        }
    }
    TELL(CTHE(CLERIC), " shrugs. \"I claim little knowledge of ");
    PRONOUN(_OBJ);
    TELL(PERQ);
    return true;
}

function ASK_CLERIC_FOR(_OBJ) {
    MAKE(CLERIC, SEEN);
    if((isEQUAL(_OBJ, RELIQUARY)
  &&  isIN(_OBJ, CLERIC))) {
        GET_RELIQUARY();
        return true;
    }
    TELL(CTHE(CLERIC
), " searches the pockets of his robes. \"Alas. I have none to offer.\"", CR);
    return true;
}

function GET_RELIQUARY() {
    EXIT_CLERIC();
    MOVE(RELIQUARY, PLAYER);
    TELL(CTHE(CLERIC
), " grudgingly surrenders ", THE(RELIQUARY), " and");
    PRINT(" disappears into the ");
    TELL("crowd, which soon wanders away.", CR);
    return true;
}

function GIVE_TO_CLERIC(_OBJ) {
    MAKE(CLERIC, SEEN);
    if(isGIVING_LOOT(_OBJ, CLERIC)) {
        return true;
    }
    NO_THANKS(CLERIC);
    return true;
}

"*** ORKAN ***"

var MSTAR = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "Morningstar",
	FLAGS: [NOARTICLE, NODESC, FEMALE],
	SYNONYM: ["MORNINGSTAR", "MORNING\-STAR", "PRINCESS"],
	ADJECTIVE: ["PRINCESS"],
	ACTION: MISSING_F
});

var ORKAN = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "Orkan",
	FLAGS: [NOARTICLE, NODESC, VOWEL],
	SYNONYM: ["ORKAN"],
	ACTION: MISSING_F
});

function MISSING_F() {
    let _OBJ;
    _OBJ = PRSO;
    if(!(PRSI)) {
        
    } else if(isTHIS_PRSI()) {
        _OBJ = PRSI;
    }
    PCLEAR();
    TELL("Alas. ", CTHE(_OBJ), " isn't here", AT_MOMENT);
    return RFATAL();
}

"*** QUEEN ***"

var QUEEN = () => OBJECT({
	DESC: "platypus",
	SDESC: DESCRIBE_QUEEN,
	FLAGS: [NODESC, LIVING, PERSON, FEMALE, TRANSPARENT],
	LIFE: I_QUEEN,
	SYNONYM: ["PLATYPUS", "CREATURE", "QUEEN", "LADY", "WOMAN", "HIGHNESS", "ALEXIS"],
	ADJECTIVE: ["YOUR", "FURRY"],
	DESCFCN: QUEEN_F,
	CONTFCN: QUEEN_F,
	ACTION: QUEEN_F
});

function DESCRIBE_QUEEN(_OBJ) {
    return TELL("furry ", B("CREATURE"));
}

function QUEEN_F(_CONTEXT=null) {
    let _X;
    if(isEQUAL(_CONTEXT, M_OBJDESC)) {
        TELL(CA(QUEEN), " is preening herself nearby");
        if(isSEE_ANYTHING_IN(QUEEN)) {
            TELL(". She's clutching ");
            CONTENTS(QUEEN);
            TELL(" in her paw");
        }
        TELL(C("."));
        return true;
    } else if(isEQUAL(_CONTEXT, M_CONT)) {
        if((_X = isTOUCHING())) {
            QUEEN_SEES_YOU();
            return true;
        }
        return false;
    } else if(isT(_CONTEXT)) {
        return false;
    } else if((isNOUN_USED("PLATYPUS", "ALEXIS")
  &&  GETP(QUEEN, "SDESC")
  &&  !(isIS(QUEEN, IDENTIFIED)))) {
        MAKE(QUEEN, IDENTIFIED);
        TELL("[Good guess.", BRACKET);
    }
    if(isTHIS_PRSI()) {
        if(isVERB(V_GIVE, V_SHOW, V_FEED)) {
            APPROACH_QUEEN();
            return true;
        }
        return false;
    } else if(isVERB(V_HIT, V_MUNG, V_WALK_TO, V_WAVE_AT, V_FOLLOW, V_RAPE, V_UNDRESS)) {
        QUEEN_SEES_YOU();
        return true;
    } else if((_X = isTALKING())) {
        APPROACH_QUEEN("at the sound of your voice");
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL("Her red gown is a bit too snug");
        if(isSEE_ANYTHING_IN()) {
            TELL(". She's holding ");
            CONTENTS();
            TELL(" in one of her paws");
        }
        PRINT(PERIOD);
        return true;
    } else {
        return false;
    }
}

function APPROACH_QUEEN(_STR=null) {
    if(!(isIS(QUEEN, TOUCHED))) {
        MAKE(QUEEN, TOUCHED);
        MAKE(QUEEN, SEEN);
        TELL(CTHE(QUEEN
), " glances around her garden, listening intently. Anxious moments pass; then, hearing nothing further, she turns her back with a shrug.", CR);
        return true;
    }
    QUEEN_SEES_YOU(_STR);
    return true;
}

function QUEEN_SEES_YOU(_STR=null) {
    TELL(CTHE(QUEEN), " wheels around ");
    if(isT(_STR)) {
        TELL(_STR);
    } else {
        TELL("as you step into view");
    }
    TELL(`. \"A spy!\" she cries, blowing a shrill note on her whistle.
  Before you can think or move, twenty-seven heavily armed platypus guards materialize around you. After suffering exquisite torture at the skilled hands of the Queen, you're led away to twenty years of backbreaking labor in the granola mines of Antharia`);
    JIGS_UP();
    return true;
}

var CONDUCTOR = () => OBJECT({
	LOC: GONDOLA,
	DESC: "conductor",
	FLAGS: [LIVING, PERSON, NODESC, TRANSPARENT],
	SYNONYM: ["CONDUCTOR", "MAN", "GUY", "FELLOW"],
	ADJECTIVE: ["GONDOLA"],
	ACTION: CONDUCTOR_F
});

function CONDUCTOR_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            TELL("Passengers block your target.", CR);
            return true;
        } else if(isVERB(V_GIVE, V_SHOW, V_FEED)) {
            CONDUCTOR_BUSY();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        PCLEAR();
        CONDUCTOR_BUSY();
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL("His face is sallow with boredom.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        TELL("A crowd of ", PASSENGERS
, " bars your approach.", CR);
        return true;
    } else {
        return false;
    }
}

function CONDUCTOR_BUSY() {
    TELL(CTHE(CONDUCTOR), " is too busy ");
    if(isHERE(AT_DOCK)) {
        TELL("herding ", PASSENGERS);
    } else {
        TELL("with his monologue");
    }
    PRINT(" to pay you much heed.|");
    return true;
}

var PASSENGERS = () => OBJECT({
	LOC: GONDOLA,
	DESC: "passengers",
	FLAGS: [PLURAL, NODESC, PERSON, LIVING, TRANSPARENT],
	SYNONYM: ["PASSENGER", "PEOPLE", "CROWD", "RIDERS"],
	ACTION: PASSENGERS_F
});

function PASSENGERS_F(_CONTEXT=null) {
    let _X;
    if(isT(_CONTEXT)) {
        return false;
    } else if(isTHIS_PRSI()) {
        if(isVERB(V_THROW, V_THROW_OVER)) {
            TELL("You might hurt somebody.", CR);
            return true;
        } else if(isVERB(V_GIVE, V_SHOW, V_FEED)) {
            PASSENGERS_BUSY();
            return true;
        }
        return false;
    } else if((_X = isTALKING())) {
        PCLEAR();
        PASSENGERS_BUSY();
        return RFATAL();
    } else if(isVERB(V_EXAMINE)) {
        TELL("A suspicious passenger returns your stare.", CR);
        return true;
    } else if((_X = isTOUCHING())) {
        TELL("Suspicious ", PASSENGERS, " edge away from your approach.", CR);
        return true;
    } else {
        return false;
    }
}

function PASSENGERS_BUSY() {
    TELL(CTHE(PASSENGERS), " are too busy ");
    if(isHERE(AT_DOCK)) {
        TELL("crowding around ", THE(GONDOLA));
    } else {
        TELL("gawking at the scenery");
    }
    PRINT(" to pay you much heed.|");
    return true;
}









function INIT_PEOPLE() {
    SALT = SALT();
    COOK = COOK();
    BANDITS = BANDITS();
    OWOMAN = OWOMAN();
    ORATOR = ORATOR();
    PCROWD = PCROWD();
    PRINCE = PRINCE();
    KNIGHT = KNIGHT();
    HUNTERS = HUNTERS();
    HUNTER = HUNTER();
    MINX = MINX();
    MAYOR = MAYOR();
    LADY = LADY();
    FCROWD = FCROWD();
    IMPS = IMPS();
    CONGREG = CONGREG();
    CLERIC = CLERIC();
    MSTAR = MSTAR();
    ORKAN = ORKAN();
    QUEEN = QUEEN();
    CONDUCTOR = CONDUCTOR();
    PASSENGERS = PASSENGERS();
}