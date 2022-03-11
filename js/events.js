`EVENTS for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

const MAX_LAMP_LIFE = 100;
var LAMP_LIFE/*NUMBER*/ = 20;

function I_LANTERN() {
    let _V;
    _V = isVISIBLE(LANTERN);
    if(--LAMP_LIFE < 1) {
        LAMP_LIFE = 0;
        DEQUEUE(I_LANTERN);
        UNMAKE(LANTERN, LIGHTED);
        isREPLACE_ADJ(LANTERN, "LIGHTED", "DARK");
        if(!(_V)) {
            return false;
        }
        P_IT_OBJECT = LANTERN;
        TELL("  The ", LANTERN
, "'s light flickers and goes out.", CR);
        SAY_IF_HERE_LIT();
        return true;
    } else if(!(_V)) {
        return false;
    } else if(isEQUAL(LAMP_LIFE, 20)) {
        P_IT_OBJECT = LANTERN;
        TELL("  The light from the ", LANTERN
, " is getting dimmer.", CR);
        return true;
    } else if(isEQUAL(LAMP_LIFE, 10)) {
        P_IT_OBJECT = LANTERN;
        TELL("  The ", LANTERN, "'s glow is fading rapidly.", CR);
        return true;
    } else {
        return false;
    }
}

const DOOR_CRASHER = 30;"Strength required to break open a door."

"Returns a direction for a monster to move, -1 if none."

function I_CRAB() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(CRAB);
    if(isEQUAL(_L, HERE)) {
        if(GETP(CRAB, "ENDURANCE") < 1) {
            TELL(TAB
, "Something falls to your feet with a ");
            ITALICIZE("plink");
            TELL(COMMA_AND);
            if(!(isLIT)) {
                TELL("a shadow");
            } else {
                TELL(THE(CRAB));
            }
            PRINT(" retreats into the ");
            TELL("darkness.", CR);
            KILL_MONSTER(CRAB);
            MOVE(CROWN, HERE);
            P_IT_OBJECT = CROWN;
            return true;
        } else if(isIS(CRAB, SURPRISED)) {
            SEE_MONSTER(CRAB);
            if(!(isIS(CRAB, SLEEPING))) {
                TELL(TAB);
                if(!(isLIT)) {
                    DARK_MOVES();
                    return true;
                }
                if((isHERE(THRONE_ROOM)
  &&  !(isIS(CRAB, TOUCHED)))) {
                    MAKE(CRAB, TOUCHED);
                    TELL(CTHE(CRAB
), "'s antennae snap to alert as you enter. He rises from ", THE(THRONE
), " and charges across ", THE(FLOOR), ", claws snapping with anticipation!", CR);
                    return true;
                }
                WHIRLS(CRAB);
                return true;
            }
        }
        if(isSTILL_SLEEPING(CRAB)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(CRAB);
        TELL(TAB);
        if(isT(_DAMAGE)) {
            if(!(isLIT)) {
                TELL("Something pinches you");
            } else {
                TELL(CTHE(CRAB), PICK_NEXT(CRAB_ATTACKS));
            }
            OUCH(CRAB, _DAMAGE);
            return true;
        } else if(!(isLIT)) {
            DARK_MOVES();
            return true;
        }
        TELL(CTHE(CRAB), PICK_NEXT(CRAB_MISSES), PERIOD);
        return true;
    }

    _DIR = isMOVE_MONSTER(CRAB);
    if(isT(_DIR)) {
        TELL(TAB);
        if(!(isLIT)) {
            TELL(YOU_HEAR, B("SOMETHING"));
            if(isIS(CRAB, SEEN)) {
                TELL(" else");
            }
            TELL(" scuttle ");
        } else {
            if(isIS(CRAB, SEEN)) {
                TELL(XTHE);
            } else {
                TELL(XA);
            }
            TELL(D(CRAB), " scuttles ");
        }
        MAKE(CRAB, SEEN);
        PASSAGE(_DIR);
        return true;
    }
    return false;
}

function PASSAGE(_DIR) {
    TELL("in from the ", B(_DIR), " passage!", CR);
    return true;
}

function I_RAT() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(RAT);
    if(isEQUAL(_L, HERE)) {
        if(GETP(RAT, "ENDURANCE") < 1) {
            TELL(TAB);
            if(!(isLIT)) {
                TELL(YOU_HEAR, B("SOMETHING"), " retreat");
            } else {
                TELL("Mortally wounded, ", THE(RAT
), " retreats");
            }
            TELL(" into the darkness.", CR);
            KILL_MONSTER(RAT);
            return true;
        } else if(isIS(RAT, SURPRISED)) {
            SEE_MONSTER(RAT);
            if(!(isIS(RAT, SLEEPING))) {
                TELL(TAB);
                if(!(isLIT)) {
                    DARK_MOVES();
                    return true;
                }
                WHIRLS(RAT);
                return true;
            }
        }
        if(isSTILL_SLEEPING(RAT)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(RAT);
        TELL(TAB);
        if(isT(_DAMAGE)) {
            if(!(isLIT)) {
                TELL("Something bites you");
            } else {
                TELL(CTHE(RAT), PICK_NEXT(RAT_ATTACKS));
            }
            OUCH(RAT, _DAMAGE);
            return true;
        } else if(!(isLIT)) {
            DARK_MOVES();
            return true;
        }
        TELL(CTHE(RAT), PICK_NEXT(RAT_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(RAT);
    if(isT(_DIR)) {
        TELL(TAB);
        if(!(isLIT)) {
            TELL(YOU_HEAR, B("SOMETHING"), " scurry ");
        } else {
            if(isIS(RAT, SEEN)) {
                TELL(XTHE);
            } else {
                TELL(XA);
            }
            TELL(D(RAT), " scurries ");
        }
        MAKE(RAT, SEEN);
        PASSAGE(_DIR);
        return true;
    }
    return false;
}

function I_SNIPE() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(SNIPE);
    if(isEQUAL(_L, HERE)) {
        if(GETP(SNIPE, "ENDURANCE") < 1) {
            TELL(TAB, "Battered beyond endurance, ", THE(SNIPE));
            PRINT(" retreats into the ");
            TELL("fog.", CR);
            KILL_MONSTER(SNIPE);
            return true;
        } else if(isIS(SNIPE, SURPRISED)) {
            SEE_MONSTER(SNIPE);
            if(!(isIS(SNIPE, SLEEPING))) {
                TELL(TAB);
                WHIRLS(SNIPE);
                return true;
            }
        }
        if(isSTILL_SLEEPING(SNIPE)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(SNIPE);
        TELL(TAB, CTHE(SNIPE));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(SNIPE_HITS));
            OUCH(SNIPE, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(SNIPE_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(SNIPE);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(SNIPE, SEEN)) {
            TELL(XTHE);
        } else {
            TELL(XA);
        }
        MAKE(SNIPE, SEEN);
        TELL(D(SNIPE), " streaks out of the mist!", CR);
        isTOPPLED(SNIPE);
        return true;
    }
    return false;
}

function I_VAPOR() {
    let _L, _DIR, _DAMAGE;
    _L = LOC(VAPOR);
    if(isEQUAL(_L, HERE)) {
        if(GETP(VAPOR, "ENDURANCE") < 1) {
            TELL(TAB, CTHE(VAPOR));
            PRINT(" disappears in a spectral flash");
            TELL(PERIOD);
            NEXT_MONSTER(SNIPE);
            KILL_MONSTER(VAPOR);
            return true;
        } else if(isIS(VAPOR, SURPRISED)) {
            SEE_MONSTER(VAPOR);
            TELL(TAB, CTHE(VAPOR
), " giggles when it sees you.", CR);
            isTOPPLED(VAPOR);
            return true;
        } else if(isTOPPLED(VAPOR)) {
            return true;
        }
        isNEXT_ENDURANCE(VAPOR);
        if((PROB(50)
  &&  isVAPOR_SNATCH())) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(VAPOR);
        TELL(TAB, CTHE(VAPOR));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(VAPOR_TICKLES), C("."));
            if(!(STATIC)) {
                TELL(" \"", PICK_NEXT(VAPOR_SNEERS)
, "!\"");
            }
            CRLF();
            UPDATE_STAT(isMSPARK(VAPOR, _DAMAGE));
            return true;
        }
        TELL(PICK_NEXT(VAPOR_DOINGS));
        if(PROB(50)) {
            TELL(PERIOD);
            return true;
        }
        TELL(". \"", PICK_NEXT(VAPOR_SNEERS), "!\"", CR);
        return true;
    }
    _DIR = isMOVE_MONSTER(VAPOR);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(VAPOR, SEEN)) {
            TELL(XTHE);
        } else {
            TELL("Without warning, an ");
        }
        MAKE(VAPOR, SEEN);
        TELL(D(VAPOR), " coalesces out of the surrounding mist");
        if(PROB(50)) {
            TELL(PERIOD);
            return true;
        }
        TELL(". \"", PICK_NEXT(VAPOR_SNEERS), "!\"", CR);
        isTOPPLED(VAPOR);
        return true;
    }
    return false;
}

function isVAPOR_SNATCH() {
    let _ANY=0, _OBJ, _NXT, _RM, _LEN, _X;
    _LEN = MOOR_ROOMS[0];
    if((_OBJ = isFIRST(PLAYER))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, NODESC)) {
                
            } else if((isIS(_OBJ, WIELDED)
  ||  isIS(_OBJ, WORN))) {
                if(!(_ANY)) {
                    TELL(TAB, CTHE(VAPOR), " tries to snatch ");
                    SAY_YOUR(_OBJ);
                    TELL(" from your grasp, ");
                    if(PROB(50)) {
                        TELL("and nearly succeeds");
                    } else {
                        TELL("but fails");
                    }
                    if(PROB(50)) {
                        TELL(PERIOD);
                        return true;
                    }
                    ++_ANY
                }
            } else if(isIS(_OBJ, TAKEABLE)) {
                while(true) {
                    _RM = toROOM(MOOR_ROOMS[RANDOM(_LEN)]);
                    if(isEQUAL(_RM, HERE)) {
                        continue;
                    }break;
                }
                UNMAKE(_OBJ, WORN);
                UNMAKE(_OBJ, WIELDED);
                MOVE(_OBJ, _RM);
                MOVE(VAPOR, _RM);
                MAKE(VAPOR, SURPRISED);
                LAST_MONSTER = isFIND_IN(HERE, MONSTER);
                LAST_MONSTER_DIR = null;
                P_IT_OBJECT = NOT_HERE_OBJECT;
                WINDOW(SHOWING_ALL);
                if(isT(_ANY)) {
                    TELL(". Instead, it encircles ");
                } else {
                    TELL(TAB
, PICK_NEXT(VAPOR_LAUGHS), ", ", THE(VAPOR), " snatches ");
                }
                SAY_YOUR(_OBJ);
                TELL(" and spirits it away!", CR);
                return true;
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    if(isT(_ANY)) {
        TELL(PERIOD);
        return true;
    }
    _X = STATS[LUCK];
    if(_X < 2) {
        
    } else if(PROB(_X)) {
        return false;
    }
    while(true) {
        _RM = toROOM(MOOR_ROOMS[RANDOM(_LEN)]);
        if(isEQUAL(_RM, HERE)) {
            continue;
        }break;
    }
    MAKE(VAPOR, SURPRISED);
    TELL(TAB, PICK_NEXT(VAPOR_LAUGHS), ", ", THE(VAPOR
), " grabs you by the ankles and lifts you high into the air!", CR);
    if(isT(VERBOSITY)) {
        CRLF();
    }
    GOTO(_RM);
    _X = STATS[ENDURANCE];
    if(_X > 5) {
        _X = -5;
    } else {
        _X = (0 - (_X - 1));
    }
    UPDATE_STAT(_X);
    TELL(TAB, "You slowly recover your bearings.", CR);
    return true;
}

function I_SPIDER() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(SPIDER);
    if(isEQUAL(_L, HERE)) {
        if(GETP(SPIDER, "ENDURANCE") < 1) {
            TELL(TAB, CTHE(SPIDER));
            PRINT(" retreats down the passageway, ");
            TELL("its wounds oozing with vile ichors.", CR);
            KILL_MONSTER(SPIDER);
            return true;
        } else if(isIS(SPIDER, SURPRISED)) {
            SEE_MONSTER(SPIDER);
            if(!(isIS(SPIDER, SLEEPING))) {
                TELL(TAB);
                WHIRLS(SPIDER);
                return true;
            }
        }
        if(isSTILL_SLEEPING(SPIDER)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(SPIDER);
        TELL(TAB, CTHE(SPIDER));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(SPIDER_HITS));
            OUCH(SPIDER, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(SPIDER_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(SPIDER);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(SPIDER, SEEN)) {
            TELL(XTHE);
        } else {
            MAKE(SPIDER, SEEN);
            TELL(XA);
        }
        TELL(D(SPIDER), " crawls in from the ", B(_DIR), " passage!", CR);
        return true;
    }
    return false;
}

function I_SLUG() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(SLUG);
    if(isEQUAL(_L, HERE)) {
        if(GETP(SLUG, "ENDURANCE") < 1) {
            TELL(TAB, CTHE(SLUG));
            PRINT(" retreats down the passageway, ");
            TELL("oozing something wet.", CR);
            KILL_MONSTER(SLUG);
            return true;
        } else if(isIS(SLUG, SURPRISED)) {
            SEE_MONSTER(SLUG);
            if(!(isIS(SLUG, SLEEPING))) {
                TELL(TAB);
                WHIRLS(SLUG);
                return true;
            }
        }
        if(isSTILL_SLEEPING(SLUG)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(SLUG);
        TELL(TAB, CTHE(SLUG));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(SLUG_HITS));
            OUCH(SLUG, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(SLUG_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(SLUG);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(SLUG, SEEN)) {
            TELL(XTHE);
        } else {
            MAKE(SLUG, SEEN);
            TELL(XA);
        }
        TELL(D(SLUG), " oozes ");
        PASSAGE(_DIR);
        return true;
    }
    return false;
}

function I_WORM() {
    let _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(WORM);
    if(isEQUAL(_L, HERE)) {
        if(GETP(WORM, "ENDURANCE") < 1) {
            TELL("  Hissing with humiliation, ", THE(WORM
), " slithers away into the undergrowth.", CR);
            KILL_MONSTER(WORM);
            return true;
        } else if(isIS(WORM, SURPRISED)) {
            SEE_MONSTER(WORM);
            if(!(isIS(WORM, SLEEPING))) {
                TELL(TAB, CTHE(WORM
), " rears up as it sees you.", CR);
                isTOPPLED(WORM);
                return true;
            }
        }
        if(isSTILL_SLEEPING(WORM)) {
            return true;
        }
        TELL(TAB, CTHE(WORM));
        if(isIN(PLAYER, MAW)) {
            PRINT(" lurks around the idol's maw");
            if(PROB(50)) {
                TELL(", sharpening its fangs");
            }
            TELL(PERIOD);
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(WORM);
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(WORM_HITS));
            OUCH(WORM, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(WORM_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(WORM);
    if(isT(_DIR)) {
        TELL(TAB, CTHE(WORM));
        PRINT(" reappears from the ");
        TELL(B(_DIR), "!", CR);
        isTOPPLED(WORM);
        return true;
    }
    return false;
}

function I_CROC() {
    let _DAMAGE;
    if(isIN(CROC, HERE)) {
        if(GETP(CROC, "ENDURANCE") < 1) {
            TELL(TAB, CTHE(CROC));
            TELL(" drags itself off into the bushes.", CR);
            KILL_MONSTER(CROC);
            return true;
        } else if(isIS(CROC, SURPRISED)) {
            SEE_MONSTER(CROC);
            if(!(isIS(CROC, SLEEPING))) {
                TELL(TAB);
                WHIRLS(CROC);
                return true;
            }
        }
        if(isSTILL_SLEEPING(CROC)) {
            return true;
        }
        TELL(TAB, CTHE(CROC));
        if(isIN(PLAYER, MAW)) {
            PRINT(" lurks around the idol's maw");
            CHOPS();
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(CROC);
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(JAW_HITS));
            OUCH(CROC, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(JAW_MISSES), PERIOD);
        return true;
    }
    return isCHARGING(CROC);
}

function isCHARGING(_OBJ) {
    let _DIR;
    _DIR = isMOVE_MONSTER(_OBJ);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(_OBJ, SEEN)) {
            TELL(XTHE);
        } else {
            MAKE(_OBJ, SEEN);
            TELL(XA);
        }
        TELL(D(_OBJ), " charges in from the ", B(_DIR), "!", CR);
        isTOPPLED(_OBJ);
        return true;
    } else {
        return false;
    }
}

function CHOPS() {
    if(PROB(50)) {
        TELL(", licking its chops");
    }
    TELL(PERIOD);
    return true;
}

function I_HOUND() {
    let _DAMAGE;
    if(isIN(HOUND, HERE)) {
        if(GETP(HOUND, "ENDURANCE") < 1) {
            TELL("  Whining with pain, ", THE(HOUND
), " limps away into the forest.", CR);
            KILL_MONSTER(HOUND);
            return true;
        } else if(isIS(HOUND, SURPRISED)) {
            SEE_MONSTER(HOUND);
            if(!(isIS(HOUND, SLEEPING))) {
                TELL(TAB, CTHE(HOUND
), " bares its fangs when it sees you.", CR);
                isTOPPLED(HOUND);
                return true;
            }
        }
        if(isSTILL_SLEEPING(HOUND)) {
            return true;
        }
        TELL(TAB, CTHE(HOUND));
        if(isIN(PLAYER, POOL)) {
            TELL(" prowls the edge of ", THE(POOL));
            CHOPS();
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(HOUND);
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(JAW_HITS));
            OUCH(HOUND, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(JAW_MISSES), PERIOD);
        return true;
    }
    return isCHARGING(HOUND);
}

function I_PUPP() {
    let _L, _PL, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(PUPP);
    if(isEQUAL(_L, HERE)) {
        if(GETP(PUPP, "ENDURANCE") < 1) {
            TELL("  With a furious snarl, ", THE(PUPP));
            PRINT(" retreats into the ");
            TELL("forest.", CR);
            NEXT_MONSTER(HOUND);
            KILL_MONSTER(PUPP);
            return true;
        } else if(isIS(PUPP, SURPRISED)) {
            SEE_MONSTER(PUPP);
            if(!(isIS(PUPP, SLEEPING))) {
                TELL(TAB, CTHE(PUPP
), " grins evilly when it sees you.", CR);
                isTOPPLED(PUPP);
                return true;
            }
        }
        if(isSTILL_SLEEPING(PUPP)) {
            return true;
        }
        isNEXT_ENDURANCE(PUPP);
        _PL = LOC(PLAYER);
        TELL(TAB, CTHE(PUPP));
        if(!(isEQUAL(_PL, HERE))) {
            TELL(PICK_NEXT(PUPP_MISSES), PERIOD);
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(PUPP);
        TELL(PICK_NEXT(PUPP_HITS));
        if(!(_DAMAGE)) {
            TELL(", but you manage to ignore it.", CR);
            return true;
        }
        TELL(PERIOD);
        UPDATE_STAT(_DAMAGE);
        return true;
    }
    _DIR = isMOVE_MONSTER(PUPP);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(PUPP, SEEN)) {
            TELL(CTHE(PUPP), " swings in from the ", B(_DIR), PERIOD);
            return true;
        }
        MAKE(PUPP, SEEN);
        LAST_MONSTER_DIR = P_WALK_DIR;
        TELL(CA(PUPP), " drops out of the treetops!", CR);
        isTOPPLED(PUPP);
        return true;
    }
    return false;
}

function I_DEAD() {
    let _DIR, _DAMAGE;
    if(isIN(DEAD, HERE)) {
        if(GETP(DEAD, "ENDURANCE") < 1) {
            TELL("  Wailing with self-pity, ", THE(DEAD
), " fades out of existence.", CR);
            KILL_MONSTER(DEAD);
            return true;
        } else if(isIS(DEAD, SURPRISED)) {
            SEE_MONSTER(DEAD);
            WHIRLS(DEAD);
            return true;
        } else if(isTOPPLED(DEAD)) {
            return true;
        }
        isNEXT_ENDURANCE(DEAD);
        _DAMAGE = isMONSTER_STRIKES(DEAD);
        TELL(TAB, CTHE(DEAD));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(DEAD_HITS));
            OUCH(DEAD, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(DEAD_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(DEAD);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(DEAD, SEEN)) {
            TELL(CTHE(DEAD));
            PRINT(" reappears from the ");
            TELL(B(_DIR));
        } else {
            MAKE(DEAD, SEEN);
            TELL("With a fearful battle cry, "
, A(DEAD), " rises out of the ruins");
        }
        TELL("!", CR);
        isTOPPLED(DEAD);
        return true;
    }
    return false;
}

function I_GHOUL() {
    let _DIR, _DAMAGE;
    if(isIN(GHOUL, HERE)) {
        if(GETP(GHOUL, "ENDURANCE") < 1) {
            NEXT_MONSTER(DEAD);
            TELL(TAB, "Howling with pain and rage, "
, THE(GHOUL), " abandons his spade and");
            PRINT(" retreats into the ");
            TELL("ruins.", CR);
            KILL_MONSTER(GHOUL);
            MOVE(SPADE, HERE);
            P_IT_OBJECT = SPADE;
            return true;
        } else if(isIS(GHOUL, SURPRISED)) {
            SEE_MONSTER(GHOUL);
            if(!(isIS(GHOUL, SLEEPING))) {
                WHIRLS(GHOUL);
                return true;
            }
        }
        if(isSTILL_SLEEPING(GHOUL)) {
            return true;
        }
        _DAMAGE = isMONSTER_STRIKES(GHOUL);
        TELL(TAB, CTHE(GHOUL));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(GHOUL_HITS));
            OUCH(GHOUL, _DAMAGE);
            return true;
        }
        TELL(PICK_NEXT(GHOUL_MISSES), PERIOD);
        return true;
    }
    _DIR = isMOVE_MONSTER(GHOUL);
    if(isT(_DIR)) {
        TELL(TAB);
        if(isIS(GHOUL, SEEN)) {
            TELL(CTHE(GHOUL));
            PRINT(" reappears from the ");
            TELL(B(_DIR));
        } else {
            MAKE(GHOUL, SEEN);
            TELL("Without warning, ", A(GHOUL
), " leaps out of the rubble");
        }
        TELL("!", CR);
        isTOPPLED(GHOUL);
        return true;
    }
    return false;
}

function I_ASUCKER() {
    return MOVE_SUCKERS(ASUCKER, BSUCKER);
}

function I_BSUCKER() {
    return MOVE_SUCKERS(BSUCKER, CSUCKER);
}

function I_CSUCKER() {
    return MOVE_SUCKERS(CSUCKER);
}

function MOVE_SUCKERS(_OBJ, _NXT=0) {
    let _DAMAGE=0, _L, _PL, _DIR, _TBL, _DEST, _X;
    _L = LOC(_OBJ);
    if(isEQUAL(_L, HERE)) {
        TELL(TAB);
        if(GETP(_OBJ, "ENDURANCE") < 1) {
            TELL("Squealing with fear, ", THE(_OBJ
), " retreats down the passageway.", CR);
            if(isT(_NXT)) {
                NEXT_MONSTER(_NXT);
                NEXT_SUCKER(_NXT);
            }
            KILL_MONSTER(_OBJ);
            return true;
        } else if(isIS(_OBJ, SURPRISED)) {
            SEE_MONSTER(_OBJ);
            if(!(isLIT)) {
                DARK_MOVES();
                return true;
            }
            TELL(CTHE(_OBJ), " glances up as you appear.", CR);
            return true;
        } else if(PROB(20)) {
            PUTP(_OBJ, "ENDURANCE", GETP(_OBJ, "EMAX"));
            WINDOW(SHOWING_ROOM);
            if(isT(isLIT)) {
                BLINK(_OBJ);
                TELL(" turns into ");
            }
            NEXT_SUCKER(_OBJ);
            if(isT(isLIT)) {
                TELL(A(_OBJ), "!", CR);
                return true;
            }
            TELL(YOU_HEAR, "a curious sound in the darkness.", CR);
            return true;
        }

        _X = STATS[LUCK];
        if(_X > 9) {
            _DAMAGE = PERCENT(10, _X);
        } else if(_X > 1) {
            _DAMAGE = 1;
        }
        isNEXT_ENDURANCE(_OBJ);
        _X = GETP(HERE, "MIRROR-OBJ");
        if(!(isEQUAL(_X, null, NO_MIRROR))) {
            if(isT(isLIT)) {
                TELL(CTHE(_OBJ
), SUCKER_SMASHES[THIS_SUCKER], PTAB);
                ITALICIZE("Pop");
                TELL("!", CR);
            } else {
                TELL(YOU_HEAR, "a flabby ");
                ITALICIZE("pop");
                TELL(" in the darkness.", CR);
            }
            DESTROY_MIRROR(_X);
            if(isNOLUCK()) {
                UPDATE_STAT((0 - _DAMAGE), LUCK, true);
            }
            return true;
        } else if(!(isLIT)) {
            
        } else if(PROB(67)) {
            TELL(CTHE(_OBJ
), PICK_NEXT(SUCKER_HITS[THIS_SUCKER])
, PERIOD);
            if(isNOLUCK()) {
                UPDATE_STAT((0 - _DAMAGE), LUCK, true);
            }
            return true;
        }
        if(isT(isLIT)) {
            TELL(CTHE(_OBJ
), PICK_NEXT(SUCKER_MISSES[THIS_SUCKER])
, PERIOD);
            return true;
        }
        TELL("Something ", PICK_NEXT(SUCKER_STALKS)
, " you in the darkness.", CR);
        return true;
    }
    _DIR = isMOVE_MONSTER(_OBJ);
    if(isT(_DIR)) {
        TELL(TAB);
        if(!(isLIT)) {
            TELL(YOU_HEAR, B("SOMETHING"
), " stalk into the passage.", CR);
            return true;
        } else if(isIS(_OBJ, SEEN)) {
            TELL(XTHE);
        } else {
            MAKE(_OBJ, SEEN);
            TELL(XA);
        }
        TELL(D(_OBJ), " stalks in from the ", B(_DIR), " passage.", CR);
        return true;
    }

    _X = GETP(LOC(_OBJ), "MIRROR-OBJ");
    if(isEQUAL(_X, null, NO_MIRROR)) {
        return false;
    }
    TELL(TAB, YOU_HEAR
, "a distant patter of stalking feet, then a flabby ");
    ITALICIZE("pop");
    PRINT(PERIOD);
    DESTROY_MIRROR(_X);
    return true;
}

function NEXT_SUCKER(_OBJ) {
    let _X;
    while(true) {
        _X = PICK_ONE(SUCKER_TYPES);
        if(isEQUAL(_X, THIS_SUCKER)) {
            continue;
        }break;
    }
    THIS_SUCKER = _X;
    _X = GETPT(_OBJ, "SYNONYM");
    _X[0] = SUCKER_SYNS_A[THIS_SUCKER];
    _X[1] = SUCKER_SYNS_B[THIS_SUCKER];
    _X = GETPT(_OBJ, "ADJECTIVE");
    _X[0] = SUCKER_ADJS[THIS_SUCKER];
    return false;
}

var AMULET_TIMER/*NUMBER*/ = 0;

function I_AMULET() {
    if(--AMULET_TIMER < 1) {
        if(isVISIBLE(AMULET)) {
            STAR_FADES();
        }
        STOP_AMULET();
        if(isWEARING_MAGIC(AMULET)) {
            NORMAL_STRENGTH();
        }
    }
    return false;
}

function STAR_FADES(_ANGRY=null) {
    TELL("  The amulet's glowing star ");
    if(isT(_ANGRY)) {
        TELL("flares angrily, ");
    }
    TELL("fades and disappears.", CR);
    return true;
}

function I_SALT() {
    if(!(isHERE(ON_WHARF))) {
        return false;
    } else if(isIS(SALT, SEEN)) {
        UNMAKE(SALT, SEEN);
        return false;
    } else if(PROB(75)) {
        return false;
    }
    MAKE(SALT, SEEN);
    TELL(TAB, CTHE(SALT), PICK_NEXT(SALT_DABS), PERIOD);
    return true;
}

var GOSSIP/*NUMBER*/ = 0;

function I_BANDITS() {
    if(!(isHERE(IN_PUB))) {
        return false;
    } else if(isIS(BANDITS, SEEN)) {
        UNMAKE(BANDITS, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    MAKE(BANDITS, SEEN);
    TELL(TAB);
    if(GOSSIP > 4) {
        TELL(PICK_NEXT(BANDIT_MUTTERS), PERIOD);
        return true;
    }
    ++GOSSIP
    if(isEQUAL(GOSSIP, 1)) {
        TELL("One of the bandits leers at you. \"Har!\"", CR);
        return true;
    } else if(isEQUAL(GOSSIP, 2)) {
        TELL("You overhear the word \"helmet\" in a conversation nearby.", CR);
        return true;
    } else if(isEQUAL(GOSSIP, 3)) {
        TELL("A bandit looks you up and down. \"Monster bait. Har!\"", CR);
        return true;
    }
    TELL("\"... north of the River Phee,\" whispers a bandit.", CR);
    return true;
}

function I_COOK() {
    if(!(isHERE(IN_KITCHEN))) {
        return false;
    } else if(isIS(COOK, SEEN)) {
        UNMAKE(COOK, SEEN);
        return false;
    } else if(PROB(75)) {
        return false;
    }
    MAKE(COOK, SEEN);
    SEE_CHARACTER(COOK);
    TELL(TAB, CTHE(COOK), PICK_NEXT(COOK_DOINGS), PERIOD);
    return true;
}

function I_ONION_OFFER() {
    if(!(isHERE(IN_KITCHEN))) {
        return false;
    } else if(isIS(COOK, SEEN)) {
        UNMAKE(COOK, SEEN);
        return false;
    }
    STOP_ONION_OFFER();
    TELL(TAB, CTHE(COOK
), "'s scowl changes to a malicious grin. \"Listen, ");
    BOY_GIRL();
    TELL(",\" he says. \"You look like somebody who knows a great vegetable when ");
    if(isIS(PLAYER, FEMALE)) {
        TELL("s");
    }
    TELL("he sees one. You want this here onion? Okay. There's an old bottle of wine lyin' around downstairs somewhere. Bring it up to me in one piece, and "
, THE(ONION), "'s yours.\" He", GLANCES_AT, THE(CELLAR_DOOR
), " and shudders. \"Simple.\"", CR);
    return true;
}

var GON/*NUMBER*/ = 14;"Gondola timetable."

function I_GONDOLA() {
    let _RIDING=0;
    if(isIN(WINNER, GONDOLA)) {
        ++_RIDING
    }
    if(++GON > 14) {
        GON = 0;
        isREPLACE_GLOBAL(AT_DOCK, DGONDOLA, NULL);
        MOVE(GONDOLA, AT_DOCK);
        MAKE(GONDOLA, OPENED);
        if(isT(_RIDING)) {
            HERE = AT_DOCK;
        } else if(isHERE(AT_DOCK)) {
            P_IT_OBJECT = GONDOLA;
        } else {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB, CTHE(GONDOLA
), " glides to a halt at ", THE(DOCK), PTAB
, "\"All off,\" calls ", THE(CONDUCTOR), " as the hatch swings open. ");
        PRINT("\"Thank you for riding the Miznia Jungle Skyway");
        TELL(". Please exit the Skycar in an orderly manner.\"", CR);
        return true;
    } else if(isEQUAL(GON, 1)) {
        if(!(isHERE(AT_DOCK))) {
            return false;
        }
        TELL(TAB, "The last few ", PASSENGERS
, " are shuffling out of ", THE(GONDOLA));
        if(isT(_RIDING)) {
            TELL(". \"All off, please,\" repeats ", THE(CONDUCTOR), ", meaning you");
        }
        TELL(PERIOD);
        return true;
    } else if(isEQUAL(GON, 2)) {
        if(!(isHERE(AT_DOCK))) {
            return false;
        }
        TELL(TAB);
        if(isT(_RIDING)) {
            MOVE(PLAYER, AT_DOCK);
            MAKE(GONDOLA, NODESC);
            P_WALK_DIR = null;
            PRINT("\"Thank you for riding the Miznia Jungle Skyway");
            TELL(",\" growls ", THE(CONDUCTOR), ", pushing you out of ", THE(GONDOLA));
            RELOOK();
        }
        TELL("Eager ", PASSENGERS, " surge into the emptied ", GONDOLA
, ". \"All aboard, please,\" announces ", THE(CONDUCTOR), " unnecessarily.", CR);
        return true;
    } else if(isEQUAL(GON, 3)) {
        UNMAKE(GONDOLA, OPENED);
        if(isT(_RIDING)) {
            
        } else if(!(isHERE(AT_DOCK))) {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB
, "\"Stay clear of the door, please,\" calls ", THE(CONDUCTOR
), " as the last few ", PASSENGERS, " squeeze into ", THE(GONDOLA), PERIOD);
        return true;
    } else if(isEQUAL(GON, 4)) {
        MOVE(GONDOLA, OVER_JUNGLE);
        isREPLACE_GLOBAL(AT_DOCK, NULL, DGONDOLA);
        if(isT(_RIDING)) {
            P_WALK_DIR = null;
            OLD_HERE = null;
            HERE = OVER_JUNGLE;
        } else if(isHERE(AT_DOCK)) {
            P_IT_OBJECT = DGONDOLA;
        } else {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB, CTHE(GONDOLA
), " slides away from the dock and glides west, high over ", THE(JUNGLE), PTAB
, "\"Welcome to the Miznia Jungle Skyway.\" drawls ", THE(CONDUCTOR
), ", his voice heavy with boredom.", CR);
        return true;
    } else if(isEQUAL(GON, 5)) {
        isREPLACE_GLOBAL(AT_DOCK, DGONDOLA, NULL);
        isREPLACE_GLOBAL(NW_SUPPORT, NULL, DGONDOLA);
        isREPLACE_GLOBAL(NW_UNDER, NULL, DGONDOLA);
        isREPLACE_GLOBAL(OVER_JUNGLE, DOCK, SUPPORT);
        PUTP(NW_UNDER, "OVERHEAD", DGONDOLA);
        if(isHERE(AT_DOCK)) {
            GONDOLA_GONE("WEST");
            return true;
        } else if(isHERE(NW_SUPPORT, NW_UNDER)) {
            VIEWGLIDE(NW_UNDER, "EAST");
            return true;
        } else if(!(_RIDING)) {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        P_IT_OBJECT = SUPPORT;
        TELL(TAB, CTHE(GONDOLA
), " glides over ", THE(JUNGLE), ", towards a tall ", SUPPORT, PTAB
, "\"The jungles of Miznia are the spawning grounds of the deadly ", WORM
, ",\" drones ", THE(CONDUCTOR
), ". \"Often mistaken for a mossy boulder, the ", WORM
, `'s fangs extend up to 32 inches during an attack.\"
  \"Oooh,\" murmurs the crowd.`, CR);
        return true;
    } else if(isEQUAL(GON, 6)) {
        MOVE(GONDOLA, NW_SUPPORT);
        if(isHERE(NW_SUPPORT)) {
            GLIDING();
        } else if(!(_RIDING)) {
            return false;
        } else {
            GLIDE_PAST(NW_SUPPORT);
        }
        TELL(TAB
, "\"The tower to your right is one of several erected to elevate the Skyway above the treetops,\" explains ", THE(CONDUCTOR
), `. \"Before the Skyway opened in 882 GUE, an average of twenty Miznia Jungle Train passengers died of wormbite each year.\"
  The crowd giggles nervously.`, CR);
        return true;
    } else if(isEQUAL(GON, 7)) {
        MOVE(GONDOLA, OVER_JUNGLE);
        if(isT(_RIDING)) {
            HERE = OVER_JUNGLE;
        } else if(isHERE(NW_SUPPORT)) {
            P_IT_OBJECT = DGONDOLA;
        } else {
            return false;
        }
        TURNS("SOUTH");
        if(!(_RIDING)) {
            return true;
        }
        TELL(TAB
, "\"The jungle is a rich source of exciting stories,\" continues "
, THE(CONDUCTOR), ", stifling a yawn. \"The most famous is the Legend of the Crocodile's Tear.\"", CR);
        return true;
    } else if(isEQUAL(GON, 8)) {
        isREPLACE_GLOBAL(NW_SUPPORT, DGONDOLA, NULL);
        isREPLACE_GLOBAL(NW_UNDER, DGONDOLA, NULL);
        PUTP(NW_UNDER, "OVERHEAD", SUPPORT);
        isREPLACE_GLOBAL(SW_SUPPORT, NULL, DGONDOLA);
        isREPLACE_GLOBAL(SW_UNDER, NULL, DGONDOLA);
        PUTP(SW_UNDER, "OVERHEAD", DGONDOLA);
        if(isHERE(NW_SUPPORT, NW_UNDER)) {
            P_IT_OBJECT = NOT_HERE_OBJECT;
            WINDOW(SHOWING_ROOM);
            TELL(TAB, CTHE(GONDOLA
), " glides southward, and is soon out of sight.", CR);
            return true;
        } else if(isHERE(SW_SUPPORT, SW_UNDER)) {
            VIEWGLIDE(SW_UNDER, "NORTH");
            return true;
        } else if(!(_RIDING)) {
            return false;
        }
        JUNGLE_GLIDE();
        TELL(TAB
, "\"The Crocodile's Tear is a sapphire of extraordinary size and clarity. It was discovered by a slave working the granola mines of Antharia, who died bringing it to the surface.\"", CR);
        TELL(TAB, "Another ", SUPPORT, " is approaching.", CR);
        return true;
    } else if(isEQUAL(GON, 9)) {
        MOVE(GONDOLA, SW_SUPPORT);
        if(isHERE(SW_SUPPORT)) {
            GLIDING();
        } else if(!(_RIDING)) {
            return false;
        } else {
            GLIDE_PAST(SW_SUPPORT);
        }
        TELL(TAB
, "\"After passing through many hands, including those of Thaddium Fzort\" (\"Bless you,\" mutters a passenger), \"the jewel came into the possession of the evil sorceress Y'Syska, whose collection of gems and minerals is still without peer.\"", CR);
        return true;
    } else if(isEQUAL(GON, 10)) {
        MOVE(GONDOLA, OVER_JUNGLE);
        if(isT(_RIDING)) {
            HERE = OVER_JUNGLE;
        } else if(isHERE(SW_SUPPORT)) {
            P_IT_OBJECT = DGONDOLA;
        } else {
            return false;
        }
        TURNS("EAST");
        if(!(_RIDING)) {
            return true;
        }
        TELL(TAB
, "\"Flash photography is prohibited,\" growls ", THE(CONDUCTOR
), " as a passenger snaps a picture of the hazy landscape.", CR);
        return true;
    } else if(isEQUAL(GON, 11)) {
        isREPLACE_GLOBAL(SW_SUPPORT, DGONDOLA, NULL);
        isREPLACE_GLOBAL(SW_UNDER, DGONDOLA, NULL);
        PUTP(SW_UNDER, "OVERHEAD", SUPPORT);
        isREPLACE_GLOBAL(SE_SUPPORT, NULL, DGONDOLA);
        isREPLACE_GLOBAL(SE_UNDER, NULL, DGONDOLA);
        PUTP(SE_UNDER, "OVERHEAD", DGONDOLA);
        if(isHERE(SW_SUPPORT, SW_UNDER)) {
            GONDOLA_GONE("EAST");
            return true;
        } else if(isHERE(SE_SUPPORT, SE_UNDER)) {
            VIEWGLIDE(SE_UNDER, "WEST");
            return true;
        } else if(!(_RIDING)) {
            return false;
        }
        JUNGLE_GLIDE();
        TELL(TAB
, "\"To protect the Crocodile's Tear from thieves, Y'Syska concealed it somewhere in the jungle below,\" concludes ", THE(CONDUCTOR
), " lamely. \"There it remains to this very day, guarded by bloodworms and whatever traps the sorceress laid to confound the unwary.\"", CR);
        TELL(TAB, "Another ", SUPPORT, " looms to the east.", CR);
        return true;
    } else if(isEQUAL(GON, 12)) {
        MOVE(GONDOLA, SE_SUPPORT);
        if(isHERE(SE_SUPPORT)) {
            GLIDING();
        } else if(!(_RIDING)) {
            return false;
        } else {
            GLIDE_PAST(SE_SUPPORT);
        }
        TELL(TAB, "\"Thirsty?\" asks ", THE(CONDUCTOR
), ". \"Stop by ");
        PRINT("the Skyway Adventure Emporium for a ");
        TELL("tall, frosty Granola Float.\" He smacks his lips dispiritedly. \"Mmm, so good.\"", CR);
        return true;
    } else if(isEQUAL(GON, 13)) {
        MOVE(GONDOLA, OVER_JUNGLE);
        if(isT(_RIDING)) {
            HERE = OVER_JUNGLE;
        } else if(!(isHERE(SE_SUPPORT))) {
            return false;
        }
        TURNS("NORTH");
        if(!(_RIDING)) {
            return true;
        }
        TELL(TAB
, "\"Bloodworms are not the only inhabitants of the Miznia jungle,\" remarks "
, THE(CONDUCTOR), ", pausing to stretch. \"Survivors have reported a wide variety of birds, reptiles and other unclassifiable dangers.\"", CR);
        return true;
    } else if(isEQUAL(GON, 14)) {
        isREPLACE_GLOBAL(SE_SUPPORT, DGONDOLA, NULL);
        isREPLACE_GLOBAL(OVER_JUNGLE, SUPPORT, DOCK);
        isREPLACE_GLOBAL(SE_UNDER, DGONDOLA, NULL);
        PUTP(SW_UNDER, "OVERHEAD", SUPPORT);
        isREPLACE_GLOBAL(AT_DOCK, NULL, DGONDOLA);
        if(isHERE(SE_SUPPORT, SE_UNDER)) {
            GONDOLA_GONE("NORTH");
            return true;
        } else if(isHERE(AT_DOCK)) {
            WINDOW(SHOWING_ROOM);
            TELL(TAB, CA(GONDOLA), SIS);
            PRINT("approaching from the south.|");
            return true;
        } else if(!(_RIDING)) {
            return false;
        }
        JUNGLE_GLIDE();
        TELL(TAB, "\"Be sure to visit ");
        PRINT("the Skyway Adventure Emporium for a ");
        TELL("thrilling selection of one-of-a-kind gift ideas,\" urges ", THE(CONDUCTOR
), " as ", THE(DOCK), " appears to the north.", CR);
        return true;
    } else {
        /*SAY_ERROR("I-GONDOLA");*/
        return false;
    }
}

function GONDOLA_GONE(_WRD) {
    WINDOW(SHOWING_ROOM);
    TELL(TAB, CTHE(GONDOLA
), " disappears to the ", B(_WRD), PERIOD);
    return true;
}

function TURNS(_WRD) {
    WINDOW(SHOWING_ROOM);
    TELL(TAB, CTHE(GONDOLA), " turns and glides ", B(_WRD
), ", away from ", THE(SUPPORT), PERIOD);
    return true;
}

function VIEWGLIDE(_RM, _WRD) {
    P_IT_OBJECT = DGONDOLA;
    WINDOW(SHOWING_ROOM);
    TELL(TAB, CA(GONDOLA), " glides into view ");
    if(isEQUAL(_RM, HERE)) {
        TELL("overhead.", CR);
        return true;
    }
    TELL("from the ", B(_WRD), PERIOD);
    return true;
}

function GLIDING() {
    WINDOW(SHOWING_ROOM);
    TELL(TAB, CTHE(GONDOLA
), " glides smoothly past, just a few feet away.", CR);
    return true;
}

function GLIDE_PAST(_RM) {
    HERE = _RM;
    WINDOW(SHOWING_ROOM);
    TELL(TAB, CTHE(GONDOLA
), " is gliding just a few feet from the top of ", THE(SUPPORT), PERIOD);
    return true;
}

function JUNGLE_GLIDE() {
    WINDOW(SHOWING_ROOM);
    P_IT_OBJECT = SUPPORT;
    TELL(TAB, CTHE(GONDOLA), " glides across "
, THE(JUNGLE), PERIOD);
    return true;
}

function I_PHASE() {
    let _L;
    if(isIS(PHASE, SEEN)) {
        /*"1-move delay."*/
        UNMAKE(PHASE, SEEN);
        return false;
    } else if(!(isIS(PHASE, NODESC))) {
        return false;
    } else if(isVISIBLE(PHASE)) {
        UNMAKE(PHASE, NODESC);
        P_IT_OBJECT = PHASE;
        WINDOW(SHOWING_ALL);
        _L = LOC(PHASE);
        TELL(TAB, CTHE(PHASE));
        if(isEQUAL(_L, PLAYER)) {
            TELL(SIN, HANDS, "s");
        } else if(isEQUAL(_L, HERE)) {
            TELL(SON);
            if(isIS(HERE, INDOORS)) {
                TELL(THE(FLOOR));
            } else {
                TELL(THE(GROUND));
            }
        } else if(isIS(_L, CONTAINER)) {
            TELL(SIN, THE(_L));
        } else if(isIS(_L, SURFACE)) {
            TELL(SON, THE(_L));
        }
        TELL(" reappears at the edge of your vision.", CR);
        return true;
    } else {
        return false;
    }
}

function I_OWOMAN() {
    if(!(isIN(OWOMAN, HERE))) {
        return false;
    } else if(isIS(OWOMAN, SEEN)) {
        UNMAKE(OWOMAN, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    P_HER_OBJECT = OWOMAN;
    MAKE(OWOMAN, SEEN);
    TELL(TAB, CTHELADY, PICK_NEXT(OWOMAN_MOVES), THE(MCASE), PERIOD);
    return true;
}

function I_MIRRORS() {
    let _V=0, _HEAR, _L, _OBJ, _CNT, _TIME, _LEN;
    _HEAR = isGRUE_ROOM();
    _LEN = MIRROR_LIST[0];
    _CNT = 7;
    while(true) {
        _OBJ = toOBJECT(MIRROR_LIST[_LEN]);
        _L = LOC(_OBJ);
        if(isT(_L)) {
            _TIME = GETP(_OBJ, "SIZE");
            if(--_TIME < 1) {
                --_CNT
                if(isEQUAL(_L, HERE)) {
                    ++_V
                    TELL(TAB);
                    SAY_MIRROR_POPS(_OBJ);
                } else if(isT(_HEAR)) {
                    ++_V
                    TELL(TAB, "A distant ");
                    ITALICIZE("pop");
                    TELL(" echoes down the passageway.", CR);
                }
                DESTROY_MIRROR(_OBJ);
            } else {
                PUTP(_OBJ, "SIZE", _TIME);
                if((isEQUAL(_L, HERE)
  &&  isEQUAL(_TIME, 2, 10, 18))) {
                    ++_V
                    TELL(TAB);
                    P_IT_OBJECT = _OBJ;
                    TELL(CTHE(_OBJ));
                    if(isEQUAL(_TIME, 2)) {
                        TELL(" is flexing dangerously now");
                        PRINT(". It probably won't last much longer.|");
                    } else if(isEQUAL(_TIME, 10)) {
                        TELL(" shimmers uncertainly for a moment.", CR);
                    } else {
                        TELL(" billows slightly, then stabilizes.", CR);
                    }
                }
            }
        } else {
            --_CNT
        }
        if(--_LEN < 1) {
            break;
        }
    }
    if(!(_CNT)) {
        DEQUEUE(I_MIRRORS);
    }
    return _V;
}

function SAY_MIRROR_POPS(_OBJ) {
    ITALICIZE("Pop");
    TELL("! ", CTHE(_OBJ), " disappears in a silver spray.", CR);
    return true;
}

function DESTROY_MIRROR(_OBJ) {
    let _L;
    if(isEQUAL(_OBJ, null, NO_MIRROR)) {
        return false;
    }
    _L = LOC(_OBJ);
    PUTP(_OBJ, "SIZE", 0);
    REMOVE(_OBJ);
    if(isEQUAL(_L, HERE)) {
        WINDOW(SHOWING_ROOM);
    }
    if(isEQUAL(GETP(_L, "MIRROR-OBJ"), _OBJ)) {
        PUTP(_L, "MIRROR-OBJ", NO_MIRROR);
        REFLECTIONS();
    }
    return false;
}

"Returns direction mirror is facing (1/3/5/7)."

function isCREATE_MIRROR(_OBJ) {
    let _DIR;
    WINDOW(SHOWING_ROOM);
    MOVE(_OBJ, HERE);
    P_IT_OBJECT = _OBJ;
    _DIR = (RANDOM(7) | 1);
    PUTP(_OBJ, "MIRROR-DIR", _DIR);
    PUTP(_OBJ, "SIZE", MIRROR_LIFE);
    if(!(isQUEUED(I_MIRRORS))) {
        QUEUE(I_MIRRORS);
    }
    return _DIR;
}

var URSCRIPT/*NUMBER*/ = 0;

function I_URGRUE() {
    let _SEE=0;
    if(!(isHERE(IN_LAIR))) {
        return false;
    } else if((isT(isLIT)
  ||  isWEARING_MAGIC(HELM))) {
        ++_SEE
    }
    MAKE(URGRUE, SEEN);
    TELL(TAB);
    if(isIS(URGRUE, SURPRISED)) {
        UNMAKE(URGRUE, SURPRISED);
        if(!(isIS(URGRUE, IDENTIFIED))) {
            MAKE(URGRUE, IDENTIFIED);
            if(isT(_SEE)) {
                TELL("As you glance around the chamber, "
, THE(URGRUE), " yawns and stretches");
            } else {
                TELL(YOU_HEAR);
                PRINT("a voice in the darkness");
                TELL(" yawn");
            }
            TELL(". \"At last we meet.\"", CR);
            return true;
        }
        TELL("\"", PICK_NEXT(URGRUE_GREETS)
, ",\" chuckles ");
        if(isT(_SEE)) {
            TELL(THE(URGRUE));
        } else {
            PRINT("a voice in the darkness");
        }
        if(URSCRIPT < 2) {
            TELL(PERIOD);
            return true;
        }
        TELL(". \"Now where were we? Ah, yes. We were deciding how best to destroy you.\"", CR);
        return true;
    }
    if(++URSCRIPT > 4) {
        TIMESTOP();
        return true;
    } else if(isEQUAL(URSCRIPT, 4)) {
        TELL("\"I know!\" cries ", THE(URGRUE
), " with delight. \"Girgol, the Time Stop spell! Love it. You'll make a hilarious statue.\"", CR);
        return true;
    } else if(isEQUAL(URSCRIPT, 3)) {
        TELL(CTHE(URGRUE
), " mutters thoughtfully to itself. \"Let's see, now. A spell. Cleesh? No; too silly. Espnis? Hmm. Better not; ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he might snore.\"", CR);
        return true;
    } else if(isEQUAL(URSCRIPT, 2)) {
        TELL("\"An interesting question,\" continues ", THE(URGRUE
), " conversationally, \"is ");
        ITALICIZE("how");
        TELL(" to destroy you. Not a trivial decision, no. I must select a spell that will enhance my image, a Magick worthy of my thoroughly evil reputation.\"", CR);
        return true;
    }

    TELL(CTHE(URGRUE
), "'s chuckling subsides. \"I rarely get visitors,\" it admits in a wistful tone. \"A pity I have to destroy you.\"", CR);
    return true;
}

var ARCHTIMER/*NUMBER*/ = 0;

function I_ARCH3() {
    ++ARCHTIMER
    TELL(TAB);
    if(isEQUAL(ARCHTIMER, 1)) {
        TELL(CTHE(ORATOR), " stills ", THE(PCROWD
), ` with a wave of his hand.
  \"Our fathers built this city at the Place Where the Great Waters
Meet,\" he cries. \"The right to name the One River belongs to us!\"`, CR
, TAB, CTHE(PCROWD), " roars its approval.", CR);
        return true;
    } else if(isEQUAL(ARCHTIMER, 2)) {
        TELL("\"The infidels from the east control the One River's mouth,\" continues "
, THE(ORATOR), ". \"But we, who dwell at the joining of the Rivers Phee and Bor, WE control the source!\" ", CTHE(PCROWD), " whistles. \"As the daughter takes the name of the father, so shall the One River be known by the place of its birth!\"", CR, TAB, "\"");
        ITALICIZE("Pheebor");
        TELL("!\" roars ", THE(PCROWD
), ". \"Hail the River Pheebor!\"", CR);
        return true;
    } else if(isEQUAL(ARCHTIMER, 3)) {
        WINDOW(SHOWING_ROOM);
        REMOVE(ORATOR);
        QCONTEXT = null;
        QCONTEXT_ROOM = null;
        P_HIM_OBJECT = NOT_HERE_OBJECT;
        TELL("\"Phee-bor! Phee-bor!\" chants ", THE(PCROWD), PTAB);
        TELL("\"We have no quarrel with the city to the east,\" claims ", THE(ORATOR), " (amid shouts to the contrary). \"But if they continue to slight our heritage with the wretched name ");
        ITALICIZE("Borphee");
        TELL("\" (the crowd hisses), \"we shall smite them from the face of the land!\"", CR, TAB, CTHE(PCROWD
), " goes wild, and carries ", THE(ORATOR), " away on its shoulders.", CR);
        return true;
    }
    WINDOW(SHOWING_ROOM);
    DEQUEUE(I_ARCH3);
    REMOVE(PCROWD);
    P_THEM_OBJECT = NOT_HERE_OBJECT;
    TELL(CTHE(PCROWD), " disperses, and you're left alone.", CR);
    return true;
}

function I_ARCH4() {
    ++ARCHTIMER
    WINDOW(SHOWING_ROOM);
    TELL(TAB);
    if(isEQUAL(ARCHTIMER, 1)) {
        MOVE(HORSE, HERE);
        SEE_CHARACTER(PRINCE);
        P_IT_OBJECT = HELM;
        TELL("A magnificent gray stallion appears amid the smoke. Its rider is a tall, proud man wearing a fabulous helmet.", CR);
        return true;
    } else if(isEQUAL(ARCHTIMER, 2)) {
        MOVE(BHORSE, HERE);
        TELL(`Another stallion, black as night, races out of the smoke. Its rider's armor gleams red in the firelight.
  \"At last we meet, Prince Foo,\" snarls the newcomer.
  The man on the gray stallion regards him coolly. \"Begone, thou eastern fop!\" he cries. \"Never shall the River Pheebor yield its sacred name!\"`, CR);
        return true;
    } else if(isEQUAL(ARCHTIMER, 3)) {
        QCONTEXT = null;
        QCONTEXT_ROOM = null;
        REMOVE(BHORSE);
        MAKE(PRINCE, SLEEPING);
        MOVE(PRINCE, HERE);
        MOVE(HELM, TRENCH);
        PUTP(PRINCE, "ACTION", DEAD_PRINCE_F);
        isREPLACE_SYN(PRINCE, "ZZZP", "HEAD");
        isREPLACE_SYN(PRINCE, "ZZZP", "BODY");
        isREPLACE_SYN(PRINCE, "ZZZP", "CORPSE");
        isREPLACE_ADJ(PRINCE, "ZZZP", "DEAD");
        TELL(`The black rider draws a gleaming sword from his scabbard and cuts off the prince's head, which rolls into the trench.
  \"The reign of Pheebor is ended!\" cries the black knight, galloping off into the smoke. \"Foo is dead! The age of Borphee is begun!\"
  The gray stallion nudges the prince's body, and whinnies softly.`, CR);
        return true;
    }
    DEQUEUE(I_ARCH4);
    if(!(isIN(HORSE, TRENCH))) {
        TELL(XA);
        SLAY_HORSE();
        TELL(TAB);
    }
    TELL("Cries of \"Foo is dead! The war is over!\" drift through the smoke. Tattered men race past; the cries grow faint; and soon all is still as death.", CR);
    return true;
}

function I_GLASS() {
    let _V;
    _V = isVISIBLE(GLASS);
    ++GLASS_BOT
    if(--GLASS_TOP < 1) {
        DEQUEUE(I_GLASS);
        if(!(_V)) {
            return false;
        }
        TELL(TAB
, "The last grains of sand fall through ", THE(GLASS), PERIOD);
        ARCH_OFF();
        return true;
    } else if(!(_V)) {
        return false;
    } else if(isEQUAL(GLASS_TOP, 2, 4)) {
        return false;
    }
    TELL(TAB);
    if(isEQUAL(GLASS_TOP, 1)) {
        TELL("The top half of ", THE(GLASS
), " is almost empty.", CR);
        return true;
    }
    TELL("Sand continues to trickle through ", THE(GLASS), PERIOD);
    return true;
}

function I_HUNTERS() {
    if(!(isHERE(IN_PASTURE))) {
        return false;
    } else if(!(isIN(HUNTERS, IN_PASTURE))) {
        HSCRIPT = 0;
        QUEUE(I_HUNT);
        MOVE(HUNTERS, IN_PASTURE);
        MAKE(HUNTERS, SEEN);
        SEE_CHARACTER(HUNTERS);
        WINDOW(SHOWING_ROOM);
        TELL("  A distant movement catches your eye. Peering between the oaks, you see men foraging at the pasture's edge. They look like hunters.", CR);
        return true;
    } else if(isIS(HUNTERS, SEEN)) {
        UNMAKE(HUNTERS, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    MAKE(HUNTERS, SEEN);
    TELL("  The distant ", HUNTERS
, PICK_NEXT(HUNTER_DOINGS), PERIOD);
    return true;
}

var HSCRIPT/*NUMBER*/ = 0;

function I_HUNT() {
    if(!(isHERE(IN_PASTURE))) {
        return false;
    }
    ++HSCRIPT
    MAKE(HUNTERS, SEEN);
    TELL(TAB);
    if(isEQUAL(HSCRIPT, 1)) {
        MOVE(MINX, OAK);
        MOVE(TRACKS, HERE);
        WINDOW(SHOWING_ROOM);
        P_HER_OBJECT = MINX;
        P_IT_OBJECT = MINX;
        TELL("\"Come back 'ere, you!\"", CR, TAB);
        ITALICIZE("Whoosh");
        TELL("! A golden bundle of fur jumps out of the forest! It bounds across the snow in quick, desperate leaps, ducks behind the trunk of "
, A(OAK));
        PRINT(" and disappears from view.|");
        TELL(TAB
, "\"I'll wring yer li'l neck,\" promises an angry voice.", CR);
        if(!(DMODE)) {
            RELOOK(true);
        }
        return true;
    } else if(isEQUAL(HSCRIPT, 2)) {
        TELL("\"I see yer dirty tracks, ye pest!\" The angry voice is getting much closer.", CR);
        return true;
    } else if(isEQUAL(HSCRIPT, 3)) {
        MOVE(HUNTER, IN_PASTURE);
        WINDOW(SHOWING_ROOM);
        SEE_CHARACTER(HUNTER);
        TELL("\"Show yerself, ye flea-bit mop!\"", CR, TAB
, "A young man strides out of the woods, an angry scowl on his windburned face");
        if(isIN(TRACKS, HERE)) {
            REMOVE(TRACKS);
            TELL(" as he follows the tracks in the snow.", CR);
            HUNTER_SEES_MINX();
            return true;
        }
        TELL("... and a nasty-looking whip in his hands", PTAB);
        TELL("\"Yo, ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("ma'am");
        } else {
            TELL("sir");
        }
        TELL(`!\" he cries, drawing closer. \"Lost a minx 'ereabouts! Came this way, if th' trail speaks truly.\"
  Something behind `, THE(OAK), " whimpers softly.", CR);
        return true;
    } else if(isEQUAL(HSCRIPT, 4)) {
        TELL(`The lad surveys the pasture impatiently. \"Blasted crayture,\" he mutters with a practiced crack of the whip. \"One o' me best. 'Twould be a shame to lose 'er.\"
  The beast behind `, THE(OAK), " makes itself as small as possible.", CR);
        return true;
    } else if(isEQUAL(HSCRIPT, 5)) {
        DEQUEUE(I_HUNT);
        HSCRIPT = 0;
        REMOVE(HUNTER);
        UNMAKE(HUNTERS, SEEN);
        P_HIM_OBJECT = NOT_HERE_OBJECT;
        WINDOW(SHOWING_ROOM);
        MOVE(MINX, IN_PASTURE);
        UNMAKE(MINX, TRYTAKE);
        UNMAKE(MINX, NOALL);
        MAKE(MINX, TAKEABLE);
        QUEUE(I_MINX);
        SEE_CHARACTER(MINX);
        TELL("\"Hide from me, will ye, ye snufflin' she-devil!\" cries ", THE(HUNTER
), " striding back into the forest. \"It's to the hounds I'll be throwin' yer bleedin' carcass!\" His curses soon ");
        PRINT("fade into the distance.|");
        TELL(TAB, CTHE(MINX
), " pokes its nose out from behind ", THE(OAK), ", sniffing fearfully. It peeks around ", THE(GCORNER), ", and its brown eyes lock with yours", PTAB
, "\"Minx?\"", CR);
        return true;
    } else {
        return false;
    }
}

function I_MINX() {
    let _L, _NL, _PL, _PLL, _V, _TBL, _DIR, _X, _TYPE;
    _L = LOC(MINX);
    if((!(_L)
  ||  !(isIS(MINX, LIVING)))) {
        DEQUEUE(I_MINX);
        return false;
    }
    _V = isVISIBLE(MINX);
    if(isIS(MINX, SLEEPING)) {
        if(!(_V)) {
            return false;
        }
        if(isIS(MINX, SEEN)) {
            UNMAKE(MINX, SEEN);
            return false;
        } else if(PROB(50)) {
            return false;
        }
        MINXTAB();
        TELL(CTHE(MINX), PICK_NEXT(MINX_SLEEPS), PERIOD);
        return true;
    } else if(isEQUAL(_L, PLAYER)) {
        MINXTAB();
        if(isIN(TRUFFLE, _L)) {
            MINX_EATS_TRUFFLE();
            return true;
        }
        TELL(CTHE(MINX));
        if(isBAD_MINX_PLACE(HERE)) {
            _X = MINX_NERVES;
            if(PROB(33)) {
                _X = MINX_RESTLESS;
            }
            TELL(PICK_NEXT(_X), PERIOD);
            return true;
        } else if(isIS(MINX, TOUCHED)) {
            UNMAKE(MINX, TOUCHED);
            MAKE(MINX, TRYTAKE);
            TELL(PICK_NEXT(MINX_SETTLES)
, " in your arms.", CR);
            return true;
        } else if(isIS(MINX, TRYTAKE)) {
            UNMAKE(MINX, TRYTAKE);
            TELL(PICK_NEXT(MINX_RESTLESS), PERIOD);
            return true;
        }
        WINDOW(SHOWING_ALL);
        PRINTC(SP);
        if(PROB(50)) {
            SAY_LEAP();
            TELL("s ");
            if(PROB(50)) {
                TELL("out of your ");
                if(PROB(50)) {
                    TELL("arms ");
                } else {
                    TELL("grasp ");
                }
            } else {
                TELL("free ");
            }
        } else {
            TELL("frees itself ");
            if(PROB(50)) {
                TELL("with a ");
                if(PROB(50)) {
                    if(PROB(50)) {
                        TELL("sudden ");
                    } else {
                        TELL("quick ");
                    }
                }
                SAY_LEAP();
                PRINTC(SP);
            }
        }
        TELL("and ");
        FALLS(MINX);
        return true;
    }
    UNMAKE(MINX, TOUCHED);
    UNMAKE(MINX, TRYTAKE);
    _PL = LOC(PLAYER);
    if(isEQUAL(_L, _PL)) {
        if(isIS(MINX, SEEN)) {
            UNMAKE(MINX, SEEN);
            return false;
        } else if((!(isIN(TRUFFLE, _L))
         &&  PROB(80))) {
            return false;
        }
        MINXTAB();
        if(!(isLIT)) {
            TELL("Something", PICK_NEXT(DARK_MINXES), PERIOD);
            return true;
        } else if((isEQUAL(_L, ARCH, ARCH4, ARCH12)
          &&  isIN(TRUFFLE, TRENCH))) {
            UNMAKE(MINX, SEEN);
            if(isHERE(ARCH12)) {
                if(isIS(TRENCH, NODESC)) {
                    DIG_UP_TRENCH();
                    return true;
                }
                MINX_EATS_TRUFFLE();
                return true;
            }
            _X = ARCH_SNIFFS;
            if(isHERE(ARCH4)) {
                
            } else if(PROB(25)) {
                _X = MINX_DOINGS;
            }
            TELL(CTHE(MINX), PICK_NEXT(_X), PERIOD);
            return true;
        } else if(isIN(TRUFFLE, _L)) {
            MINX_EATS_TRUFFLE();
            return true;
        } else if(LOC(TRUFFLE)) {
            
        } else if(isDIG_UP_TRUFFLE(_L)) {
            return true;
        }
        TELL(CTHE(MINX), PICK_NEXT(MINX_DOINGS), PERIOD);
        return true;
    } else if((isIS(_PL, VEHICLE)
  &&  isIN(_PL, _L))) {
        MOVE(MINX, _PL);
        MINXTAB();
        if(!(isLIT)) {
            TELL("Something furry");
        } else {
            WINDOW(SHOWING_ROOM);
            TELL(CTHE(MINX));
        }
        TELL(" joins you");
        ON_IN(_PL);
        TELL(PERIOD);
        return true;
    } else if((isIS(_L, SURFACE)
  ||  isIS(_L, CONTAINER))) {
        _NL = LOC(_L);
        if((isBAD_MINX_PLACE(_NL)
  ||  (isIS(_L, CONTAINER)
  &&  !(isIS(_L, OPENED))))) {
            if(isVISIBLE(_L)) {
                MINXTAB();
                if((isIS(_L, TRANSPARENT)
  &&  isT(isLIT))) {
                    TELL(CTHE(MINX));
                } else {
                    TELL("Something");
                }
                if(isIN(TRUFFLE, _L)) {
                    WINDOW((SHOWING_ROOM
 + SHOWING_INV));
                    REMOVE(TRUFFLE);
                    TELL(" is eating ", B("SOMETHING"));
                } else {
                    TELL(" moves restlessly");
                }
                ON_IN(_L);
                TELL(PERIOD);
                return true;
            } else if(isIN(TRUFFLE, _L)) {
                REMOVE(TRUFFLE);
            }
            if(!(_NL)) {
                REMOVE(MINX);
                DEQUEUE(I_MINX);
            }
            return false;
        } else if(!(_V)) {
            MOVE(MINX, _NL);
            return false;
        }
        MINXTAB();
        if(!(isLIT)) {
            TELL("Something");
        } else if(isIN(TRUFFLE, _L)) {
            MINX_EATS_TRUFFLE();
            return true;
        } else {
            WINDOW(SHOWING_ROOM);
            TELL(CTHE(MINX));
        }
        PRINTC(SP);
        SAY_LEAP();
        TELL("s");
        OUT_OF_LOC(_L);
        PRINT(PERIOD);
        MOVE(MINX, _NL);
        return true;
    }

    /*"Is player in a room adjacent to minx?"*/

    _PLL = LOC(_PL);
    _DIR = asDIRECTION("NORTH");
    while(true) {
        _TBL = GETP(_L, toDIRECTION(_DIR));
        if(isT(_TBL)) {
            _TYPE = MSB(_TBL[XTYPE]);
            if((isEQUAL(_TYPE, CONNECT, SCONNECT, X_EXIT)
  ||  (isEQUAL(_TYPE, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED)))) {
                _NL = _TBL[XROOM];
                if(isBAD_MINX_PLACE(_NL)) {
                    
                } else if(isEQUAL(_NL, _PL, _PLL)) {
                    MOVE(MINX, _NL);
                    MINXTAB();
                    if(!(isLIT)) {
                        TELL(YOU_HEAR, B("SOMETHING"
), " moving ");
                    } else {
                        WINDOW(SHOWING_ROOM);
                        TELL(CTHE(MINX), " appears ");
                    }
                    if(isEQUAL(_NL, _PL)) {
                        TELL("at your feet.", CR);
                        return true;
                    }
                    TELL("nearby.", CR);
                    return true;
                }
            }
        }
        if(--_DIR < asDIRECTION("DOWN")) {
            return false;
        }
    }
}

function MINXTAB() {
    MAKE(MINX, SEEN);
    PRINT(TAB);
    return false;
}

function isBAD_MINX_PLACE(_RM) {
    let _X;
    if(!(_RM)) {
        return true;
    }
    _X = NO_MINX[0];
    //if((_X = isINTBL(_RM, REST(NO_MINX, 1), _X, 1))) {
    if(NO_MINX.slice(1).map(toROOM).includes(_RM)) {
        return true;
    } else if((isEQUAL(_RM, IN_GARDEN)
  &&  PTIMER > 1)) {
        return true;
    } else if((isEQUAL(_RM, SADDLE)
  &&  isIN(SADDLE, DACT)
  &&  isIN(DACT, IN_SKY))) {
        return true;
    } else {
        return false;
    }
}

function isDIG_UP_TRUFFLE(_L) {
    let _X;
    if(isEQUAL(_L, LOC(OAK))) {
        _X = OAK;
    } else if(isEQUAL(_L, LOC(OAK2))) {
        _X = OAK2;
    } else if(isEQUAL(_L, LOC(OAK3))) {
        _X = OAK3;
    } else {
        return false;
    }
    if(isIS(_X, TOUCHED)) {
        return false;
    }
    OAK_FIND(_X);
    TELL(CTHE(MINX
), " snuffles inquisitively around the base of ", THE(_X
), ". She scratches around the roots, nosing aside leaves and dirt, and pulls up a ", D(TRUFFLE), " with a triumphant mew. ");
    PRINT("\"Minx! Minx! Minx!\"|");
    return true;
}

function DIG_UP_TRENCH() {
    UNMAKE(TRUFFLE, SEEN);
    REMOVE(TRUFFLE);
    UNMAKE(TRUFFLE, MUNGED);
    DEQUEUE(I_TRUFFLE);
    TRUFFLE_TIMER = 0;
    MOVE(TRENCH, HERE);
    UNMAKE(TRENCH, NODESC);
    MAKE(TRENCH, OPENED);
    WINDOW(SHOWING_ROOM);
    isREPLACE_SYN(TRENCH, "ZZZP", "MINXHOLE");
    isREPLACE_ADJ(TRENCH, "ZZZP", "MINX");
    TELL(CTHE(MINX));
    if(!(isIN(MINX, HERE))) {
        MOVE(MINX, HERE);
        TELL(" leaves ", THE(ARCH), " and");
    }
    TELL(" runs its nose over the loose earth, snuffling hungrily. Then it paws a deep hole in ", THE(GROUND), ", roots up a dirty truffle and swallows it whole"
, PTAB);
    PRINT("\"Minx! Minx! Minx!\"|");
    if(!(DMODE)) {
        RELOOK(true);
    }
    return true;
}

function SAY_LEAP() {
    let _X;
    _X = RANDOM(100);
    if(_X < 33) {
        TELL(B("LEAP"));
        return true;
    } else if(_X < 67) {
        TELL(B("BOUND"));
        return true;
    }
    TELL(B("JUMP"));
    return true;
}

function I_CORBIES() {
    let _FEAR=0, _SOUND, _EMOTION, _X;
    if(!(isPLAIN_ROOM())) {
        return false;
    }
    TELL(TAB);
    MAKE(CORBIES, SEEN);
    P_THEM_OBJECT = CORBIES;
    _SOUND = PICK_NEXT(CORBIE_SOUNDS);
    _EMOTION = PICK_NEXT(MAD_CORBIES);
    if((isEQUAL(LOC(SCARE3), HERE)
  ||  (isT(BADKEY)
  &&  isEQUAL(LOC(BADKEY), PLAYER, HERE)))) {
        ++_FEAR
        _EMOTION = PICK_NEXT(FEAR_CORBIES);
    }
    _X = RANDOM(100);
    if(_X < 33) {
        TELL("Corbies ", _SOUND, WITH, _EMOTION
, " overhead.", CR);
        return true;
    } else if(_X < 67) {
        TELL("You can hear corbies ");
    } else {
        TELL("Corbies ");
        _X = RANDOM(100);
        if((isT(_FEAR)
  ||  _X < 33)) {
            TELL("circle ");
            if(PROB(50)) {
                if(!(_FEAR)) {
                    TELL("low ");
                } else {
                    TELL("high ");
                }
            }
        } else if(_X < 67) {
            TELL("dive ");
            if(PROB(50)) {
                TELL("down from ");
            } else {
                TELL("and swoop ");
            }
        } else {
            TELL("swoop ");
            if(PROB(50)) {
                if(PROB(50)) {
                    TELL("low ");
                } else {
                    TELL("down from ");
                }
            }
        }
    }
    TELL("overhead, ", _SOUND, "ing with ", _EMOTION, PERIOD);
    return true;
}

const RESET_GURDY = 4;
var GURDY_TIMER/*NUMBER*/ = 0;

var GURDY_ROOM/*OBJECT*/ = null;

function I_COLOR() {
    let _X;
    if(--GURDY_TIMER < 1) {
        DEQUEUE(I_COLOR);
        GURDY_TIMER = 0;
        UNMAKE(ROSE_ROOM, SEEN);
        _X = PLAIN_ROOMS[0];
        while(true) {
            UNMAKE(PLAIN_ROOMS[_X], SEEN);
            if(--_X < 1) {
                break;
            }
        }
        if(isHERE(GURDY_ROOM)) {
            WINDOW(SHOWING_ROOM);
            GURDY_ROOM = null;
            TELL(TAB, "The colors in the ");
            ROOM_OR_LAND();
            TELL(" fade back to normal.", CR);
            return true;
        }
        GURDY_ROOM = null;
        return false;
    } else if(!(isHERE(GURDY_ROOM))) {
        return false;
    } else if(isEQUAL(GURDY_TIMER, 1, 3)) {
        return false;
    }
    TELL(TAB, "The heightened colors in the ");
    ROOM_OR_LAND();
    TELL(" are starting to fade.", CR);
    return true;
}

var LAST_CRANK_DIR/*OBJECT*/ = null;

function TURN_GURDY() {
    let _X;
    _X = TURN_GURDY_RIGHT;
    if(isEQUAL(LAST_CRANK_DIR, RIGHT)) {
        
    } else if((isEQUAL(LAST_CRANK_DIR, LEFT)
  ||  PROB(50))) {
        _X = TURN_GURDY_LEFT;
    }
    APPLY(_X);
    return false;
}

function isFIND_CHAR() {
    let _LEN, _OBJ;
    _LEN = CHARLIST[0];
    while(true) {
        _OBJ = CHARLIST[_LEN];
        if(isVISIBLE(_OBJ)) {
            return _OBJ;
        } else if(--_LEN < 1) {
            break;
        }
    }
    return isFIND_IN(HERE, MONSTER);
}

function TURN_GURDY_RIGHT() {
    let _M=0, _P=0, _WHO;
    _WHO = isFIND_CHAR();
    if(!(_WHO)) {
        
    } else if(isIS(_WHO, MONSTER)) {
        if(!(isIS(_WHO, SLEEPING))) {
            ++_M
        }
    } else {
        ++_P
    }
    LAST_CRANK_DIR = RIGHT;
    if(isTURN_GURDY("RIGHT", "violet")) {
        return true;
    }
    TELL(TAB);
    if(!(DPOINTER)) {
        WINDOW(SHOWING_ALL);
        P_WALK_DIR = null;
        OLD_HERE = null;
        GURDY_TIMER = RESET_GURDY;
        isLIT = true;
        TELL("A rainbow of dazzling spectra");
        PRINT(" fills the air");
        TELL("! It swirls and blends with the ");
        if(!(isPLAIN_ROOM())) {
            if(isHERE(GURDY_ROOM)) {
                TELL("already intense ");
            }
            TELL("colors of the ");
        } else {
            MAKE(HERE, SEEN);
            TELL("colorless ");
        }
        ROOM_OR_LAND();
        if(isHERE(GURDY_ROOM)) {
            TELL(PERIOD);
            return true;
        }
        GURDY_ROOM = HERE;
        QUEUE(I_COLOR);
        TELL(", creating rich, saturated hues that remind you of a postcard");
        if(isT(_M)) {
            PRINT(". Unfortunately, ");
            TELL(THE(_WHO), " seems unmoved by the display");
        }
        TELL(PERIOD);
        if(isHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isEQUAL(_WHO, OWOMAN, SALT)) {
            LOVELY(_WHO);
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, CTHE(_WHO), " gapes at the display.", CR);
        }
        return true;
    } else if(isEQUAL(DPOINTER, 1)) {
        TELL("Strains of soothing melody fill the air");
        PRINT("! You can't help but ");
        PRINT("close your eyes for a moment ");
        TELL("as the liquid chords swell to a glorious crescendo, then fade into silence");
        if(isT(_M)) {
            TELL(". Even ", THE(_WHO), " was not unmoved");
        }
        TELL(PERIOD);
        if(isVISIBLE(DACT)) {
            MAKE(DACT, SEEN);
            if(isT(DACT_SLEEP)) {
                if(!(isEQUAL(DACT_SLEEP, 3))) {
                    ++DACT_SLEEP
                }
                return true;
            }
            TELL(TAB);
            TELL("A tear trembles on ", THE(DACT
), "'s beak. You watch as it");
            DACT_TO_SLEEP(true);
            return true;
        } else if(isHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isEQUAL(_WHO, OWOMAN, MAYOR, CLERIC)) {
            LOVELY(_WHO);
            return true;
        } else if(isEQUAL(_WHO, SALT)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Thought I heard music,\" remarks "
, THE(_WHO), PERIOD);
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, CTHE(_WHO), " smiles at the sound.", CR);
            return true;
        }
        return true;
    } else if(isEQUAL(DPOINTER, 2)) {
        TELL("A tide of flavorful aromas");
        PRINT(" fills the air");
        PRINT("! You can't help but ");
        TELL("breathe deeply as the scents of a dozen exotic delicacies drift past your nostrils, one by one");
        if(isT(_M)) {
            NOW_HUNGRY(_WHO);
        }
        TELL(PERIOD);
        if(isHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Ahhh,\" sighs ", THE(_WHO), PERIOD);
        }
        return true;
    } else if(isEQUAL(DPOINTER, 3)) {
        TELL("A mouthwatering cascade of flavor washes over your tongue");
        PRINT("! You can't help but ");
        PRINT("close your eyes for a moment ");
        TELL("to savor the taste of all your favorite dishes");
        if(isT(_M)) {
            NOW_HUNGRY(_WHO);
        }
        PRINT(PERIOD);
        if(isHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Mmmmm,\" sighs ", THE(_WHO), ", smacking ");
            if(isIS(_WHO, FEMALE)) {
                TELL("her");
            } else {
                TELL("his");
            }
            TELL(" lips.", CR);
        }
        return true;
    } else if(isEQUAL(DPOINTER, 4)) {
        TELL("Invisible fingers of delight caress your skin! ");
        PRINT("! You can't help but ");
        PRINT("close your eyes for a moment ");
        TELL("as a soothing, sensuous tingle spreads over every inch of your body");
        if(isT(_M)) {
            TELL(PTAB, CTHE(_WHO
), " emits a brief moan of pleasure");
        }
        PRINT(PERIOD);
        if(isHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Mmmmm,\" moans ", THE(_WHO), PERIOD);
        }
        return true;
    }

    RENEW_ALL_IN(INGURDY);
    TELL("A flood of joyful memory swells in your mind");
    PRINT("! You can't help but ");
    PRINT("close your eyes for a moment ");
    TELL("as old friends and forgotten secrets rise one by one from of the mists of time, then fade into obscurity");
    if(isT(_M)) {
        LAST_MEAL(_WHO);
    }
    PRINT(PERIOD);
    if(isHAPPY_CHAR(_WHO)) {
        return true;
    } else if(isT(_P)) {
        MAKE(_WHO, SEEN);
        TELL(TAB, CTHE(_WHO), " smiles wistfully.", CR);
    }
    return true;
}

function LOVELY(_WHO) {
    MAKE(_WHO, SEEN);
    TELL(TAB, "\"Lovely,\" remarks ", THE(_WHO), PERIOD);
    return true;
}

function LAST_MEAL(_WHO) {
    PRINT(". Unfortunately, ");
    TELL(THE(_WHO), " seem");
    if(!(isIS(_WHO, PLURAL))) {
        TELL("s");
    }
    TELL(" to remember only its last meal");
    return true;
}

function NOW_HUNGRY(_WHO) {
    PRINT(". Unfortunately, ");
    TELL(THE(_WHO), " now looks hungrier than before");
    return true;
}

function isHAPPY_CHAR(_WHO) {
    if((isEQUAL(_WHO, MINX, UNICORN, BABY)
  ||  isEQUAL(_WHO, MAMA, DACT))) {
        TELL(TAB, CTHE(_WHO), " seemed to enjoy that.", CR);
        return true;
    } else {
        return false;
    }
}

function isUNHAPPY_CHAR(_WHO) {
    if((isEQUAL(_WHO, MINX, UNICORN, BABY)
  ||  isEQUAL(_WHO, MAMA, DACT))) {
        TELL(TAB, CTHE(_WHO), " gives you a hurt look.", CR);
        return true;
    } else {
        return false;
    }
}

function TURN_GURDY_LEFT() {
    let _M=0, _P=0, _WHO;
    _WHO = isFIND_CHAR();
    if(!(_WHO)) {
        
    } else if(isIS(_WHO, MONSTER)) {
        if(!(isIS(_WHO, SLEEPING))) {
            ++_M
        }
    } else {
        ++_P
    }
    LAST_CRANK_DIR = LEFT;
    if(isTURN_GURDY("LEFT", "crimson")) {
        return true;
    }
    TELL(TAB);
    if(!(DPOINTER)) {
        WINDOW(SHOWING_ALL);
        if(isT(GURDY_TIMER)) {
            GURDY_TIMER = 0;
            DEQUEUE(I_COLOR);
        }
        TELL(XTHE);
        if(isHERE(GURDY_ROOM)) {
            TELL("colors in the ");
            ROOM_OR_LAND();
            TELL(" around you fade back to ");
            if(isPLAIN_ROOM()) {
                OLD_HERE = null;
                P_WALK_DIR = null;
                UNMAKE(HERE, SEEN);
                TELL(B("GRAY"));
            } else {
                TELL("normal");
            }
        } else {
            if(isPLAIN_ROOM()) {
                TELL("grayness");
            } else {
                TELL("color");
            }
            TELL(" of the ");
            ROOM_OR_LAND();
            TELL(" around you becomes pasty and dull");
        }
        GURDY_ROOM = null;
        if(isT(_M)) {
            TELL(", an effect ", THE(_WHO), " seem");
            if(!(isIS(_WHO, PLURAL))) {
                TELL("s");
            }
            TELL(" not to mind in the least");
        }
        TELL(PERIOD);
        if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, CTHE(_WHO
), " glances around, puzzled.", CR);
        }
        return true;
    } else if(isEQUAL(DPOINTER, 1)) {
        TELL("A dreadful cacophony of random noise");
        PRINT(" fills the air");
        TELL("! You cover your ears and wince until the onslaught fades to a welcome silence");
        if(isT(_M)) {
            ANNOY_WHO(_WHO);
        }
        TELL(PERIOD);
        if(isUNHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Ouch,\" comments ", THE(_WHO));
            PRINT(" with a glare of annoyance.|");
        }
        return true;
    } else if(isEQUAL(DPOINTER, 2)) {
        TELL("A nauseating cloud of foul, reeking stenches");
        PRINT(" fills the air");
        TELL("! You cover your nose and try not to gag as the air clears all too slowly");
        if(isT(_M)) {
            TELL(", noting that ", THE(_WHO), " seem");
            if(!(isIS(_WHO, PLURAL))) {
                TELL("s");
            }
            TELL(" to have enjoyed the disgusting onslaught");
        }
        TELL(PERIOD);
        if(isUNHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Put that away,\" coughs ", THE(_WHO));
            PRINT(" with a glare of annoyance.|");
        }
        return true;
    } else if(isEQUAL(DPOINTER, 3)) {
        TELL("The unspeakable flavor of dead, rotting filth coats your tongue! You spit and cough uncontrollably until your mouth absorbs the dreadful taste");
        if(isT(_M)) {
            ANNOY_WHO(_WHO);
        }
        TELL(PERIOD);
        if(isUNHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Enough,\" gags ", THE(_WHO));
            PRINT(" with a glare of annoyance.|");
        }
        return true;
    } else if(isEQUAL(DPOINTER, 4)) {
        TELL("Your skin erupts in a dozen places with a painful, burning itch! No scratching can relieve the suffering you endure until the invisible rash subsides");
        if(isT(_M)) {
            ANNOY_WHO(_WHO);
        }
        TELL(PERIOD);
        if(isUNHAPPY_CHAR(_WHO)) {
            return true;
        } else if(isT(_P)) {
            MAKE(_WHO, SEEN);
            TELL(TAB, "\"Thanks,\" mutters ", THE(_WHO));
            PRINT(" with a glare of annoyance.|");
        }
        return true;
    }

    MUNG_ALL_IN(INGURDY);
    TELL("A black tide of memory swells in your mind! You blush with shame as thoughtless deeds and filthy little secrets emerge from the dark reaches of your past to taunt you");
    if(isT(_M)) {
        LAST_MEAL(_WHO);
    }
    PRINT(PERIOD);
    if(isUNHAPPY_CHAR(_WHO)) {
        return true;
    } else if(isT(_P)) {
        MAKE(_WHO, SEEN);
        TELL(TAB, CTHE(_WHO), " gives you a bitter glare.", CR);
    }
    return true;
}

function ANNOY_WHO(_WHO) {
    PRINT(". Unfortunately, ");
    TELL(THE(_WHO), " now look");
    if(!(isIS(_WHO, PLURAL))) {
        TELL("s");
    }
    TELL(" more annoyed than ever");
    return false;
}

function isTURN_GURDY(_WRD, _STR) {
    if(isNO_MAGIC_HERE(GURDY)) {
        return true;
    }
    TELL("You turn the crank on ", THE(GURDY), " to the ", B(_WRD
), ", and watch as ");
    if(isIS(GURDY, OPENED)) {
        TELL("wraiths of soft ", _STR
, " light escape from the open box, dispersing with no effect.", CR);
        return true;
    }
    TELL("a soft ", _STR
, " glow brightens the rim of the closed lid.", CR);
    return false;
}

function ROOM_OR_LAND() {
    if(isIS(HERE, INDOORS)) {
        PRINTD(GLOBAL_ROOM);
        return true;
    }
    PRINTB("LANDSCAPE");
    return true;
}

function REGAIN_SENSES() {
    P_WALK_DIR = null;
    OLD_HERE = null;
    CARRIAGE_RETURNS();
    TELL("You slowly come to your senses.", CR);
    if(isT(VERBOSITY)) {
        CRLF();
    }
    return false;
}

var STORM_TIMER/*NUMBER*/ = 0;

function I_STORM() {
    if(--STORM_TIMER < 1) {
        REMOVE(TWISTER);
        STORM_TIMER = 0;
        DEQUEUE(I_STORM);
        WINDOW(SHOWING_ROOM);
        PUTP(IN_FARM, "SDESC", 0);
        MAKE(IN_FARM, SEEN);
        PRINT(TAB);
        ITALICIZE("Crash");
        TELL("! ", CTHE(FARMHOUSE), " strikes ", THE(GROUND
), " with a sickening thud. You're thrown across the room, hit ", HEAD
, " and...||||||A ray of sunlight opens your eyes.", CR);
        return true;
    } else if(isEQUAL(STORM_TIMER, 2)) {
        TELL(TAB, CTHE(FLOOR), " lurches crazily underfoot.", CR);
        return true;
    } else if(isEQUAL(STORM_TIMER, 1)) {
        TELL("  The entire ", FARMHOUSE
, " shudders as ", THE(TWISTER
), " loosens its grip. It feels as if you're starting to fall!", CR);
        return true;
    } else {
        return false;
    }
}

function I_TWISTER() {
    let _X;
    MAKE(CORBIES, SEEN);
    TELL(TAB);
    if(--STORM_TIMER < 1) {
        DEQUEUE(I_TWISTER);
        DEQUEUE(I_CORBIES);
        TELL("The wind ");
        if(isHERE(IN_FARM)) {
            PRINT("outside ");
        }
        TELL("rises to a deafening shriek, and blowing dust turns the day to night", PTAB);
        ITALICIZE("Thwack");
        TELL("! The ");
        if(isHERE(FARM_ROOM)) {
            TELL(TWISTER
, " rips a clapboard off ", THE(FARMHOUSE
), ", blows it across the yard and drives it deep into your chest");
            JIGS_UP();
            return true;
        }
        MAKE(FARMHOUSE, SEEN);
        STORM_TIMER = INIT_STORM_TIMER;
        QUEUE(I_STORM);
        PUTP(IN_FARM, "SDESC", DESCRIBE_IN_FARM);
        WINDOW(SHOWING_ROOM);
        PUTP(IN_FARM, "FNUM", 0);
        isNEW_EXIT(IN_FARM, "NORTH", (DCONNECT + 1 + MARKBIT)
, IN_FROON, FARM_DOOR);
        isNEW_EXIT(IN_FARM, "OUT", (DCONNECT + 1 + MARKBIT)
, IN_FROON, FARM_DOOR);
        if(isIS(FARM_DOOR, OPENED)) {
            UNMAKE(FARM_DOOR, OPENED);
            TELL(FARM_DOOR, " slams shut as the ");
        }
        TELL(FARMHOUSE
, " jerks violently upward, throwing you to your knees. You feel a strange whirling sensation as ", THE(FLOOR
), " begins to dip and sway like the deck of a boat. A glance out "
, THE(FARM_WINDOW), " confirms what your popping ears already know: "
, CTHE(FARMHOUSE), " is soaring high above the Fields of Frotzen, caught in the vortex of a mighty ", TWISTER, "!", CR);
        REFRESH_MAP(null);
        return true;
    } else if(isEQUAL(STORM_TIMER, 1)) {
        TELL("The wind ");
        if(isHERE(IN_FARM)) {
            PRINT("outside ");
        }
        TELL("grows from a rumble to a roar as the churning vortex whirls closer.", CR);
        if(isHERE(IN_FARM)) {
            return true;
        } else if(!(isIS(FARM_DOOR, OPENED))) {
            WINDOW(SHOWING_ROOM);
            MAKE(FARM_DOOR, OPENED);
            TELL(TAB);
            ITALICIZE("Bang");
            TELL("! ", CTHE(FARM_DOOR
), " blows open in the gale.", CR);
        }
        if(isVISIBLE(MINX)) {
            MOVE(MINX, IN_FARM);
            WINDOW(SHOWING_ROOM);
            TELL(TAB, CTHE(MINX
), " races for the safety of "
, THE(FARM), PERIOD);
        }
        return true;
    } else if(isEQUAL(STORM_TIMER, 2)) {
        MOVE(TWISTER, HERE);
        WINDOW(SHOWING_ROOM);
        TELL("An ominous rumble ");
        _X = "SOUTHEAST";
        if(isHERE(IN_FARM)) {
            MAKE(TWISTER, NODESC);
            _X = "WINDOW";
            PRINT("outside ");
        }
        TELL("draws your eyes to the ", B(_X
), ", where a dark, boiling thundercloud is racing across the fields", PTAB);
        KERBLAM();
        TELL("Lightning heralds the approach of a deadly funnel!", CR);
        return true;
    } else if(isEQUAL(STORM_TIMER, 3)) {
        TELL("The sky ");
        if(isHERE(IN_FARM)) {
            TELL("outside ");
        }
        TELL("is becoming very dark.", CR);
        if(isVISIBLE(MINX)) {
            TELL(TAB, CTHE(MINX
), " sniffs the air and whimpers.", CR);
        }
        return true;
    } else {
        TELL("The air feels unusually still and expectant.", CR);
        return true;
    }
}

var FSCRIPT/*NUMBER*/ = 0;

function I_FROON() {
    if(isHERE(IN_FARM)) {
        if(FSCRIPT > 2) {
            if(isIS(FCROWD, SEEN)) {
                UNMAKE(FCROWD, SEEN);
                return false;
            }
            MAKE(FCROWD, SEEN);
            TELL(TAB
, "The cheers outside show no sign of stopping.", CR);
            return true;
        }
        return false;
    }
    TELL(TAB);
    if(++FSCRIPT > 11) {
        TELL("As you stand contemplating the natural beauty of the ", FROON
, "ian landscape, another ", FARMHOUSE
, " falls out of the sky and lands on ", HEAD);
        JIGS_UP();
        return true;
    } else if(isEQUAL(FSCRIPT, 11)) {
        WINDOW(SHOWING_ROOM);
        PUTP(IN_FROON, "HEAR", 0);
        REMOVE(MAYOR);
        P_HIM_OBJECT = NOT_HERE_OBJECT;
        REMOVE(LADY);
        P_HER_OBJECT = NOT_HERE_OBJECT;
        REMOVE(FCROWD);
        P_THEM_OBJECT = NOT_HERE_OBJECT;
        TELL("With a peremptory sniff, ", THE(MAYOR
), " snaps ", THE(JBOX), " shut", PTAB, `\"Very well,\" he sighs. \"I'm sure there are plenty of other heroes who would be more than happy to accept our humble gifts and everlasting adulation.\"
  Grumbling with indignation, he and the other folk sullenly retreat into `
, THE(FBEDS), ". In moments, you are completely alone.", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 10)) {
        TELL("\"The day is getting long,\" notes ", THE(MAYOR
), " with obvious irritation. \"Please choose one of the keys. ");
        ITALICIZE("Now");
        TELL(PERQ);
        return true;
    } else if(isEQUAL(FSCRIPT, 9)) {
        TELL(CTHE(MAYOR), " taps his foot impatiently. \"", CYOUR);
        HONORED_ONE();
        TELL(" will be so kind as to select a key?\"", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 8)) {
        TELL("\"Choose any key you like,\" prompts ", THE(MAYOR
), " helpfully.", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 7)) {
        WINDOW(SHOWING_ROOM);
        MAKE(JBOX, OPENED);
        TELL(CTHE(MAYOR), " opens ", THE(JBOX
), " with a grand flourish.|  \"Behold!\" he cries. \"Herein lie the Keys to the Kingdom of ", FROON
, ". This gift is the greatest honor my people can bestow. Humbly, and with eternal gratitude, do we offer one to you.\"", CR, TAB, CTHE(FCROWD
), " redoubles its cheering.", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 6)) {
        WINDOW(SHOWING_ROOM);
        MOVE(JBOX, MAYOR);
        TELL("\"Such a mighty deed commands many thanks,\" continues ", THE(MAYOR
), `. \"Bring me the Cask!\"
  \"The Cask! `, CTHE(MAYOR), " sends for the Cask!\" whispers ", THE(FCROWD
), " as a servant disappears into ", THE(FBEDS
), ". Moments later he returns bearing a small "
, JBOX, ", which is delivered to ", THE(MAYOR), PERIOD);
        return true;
    } else if(isEQUAL(FSCRIPT, 5)) {
        TELL("\"For over three hundred years, my people have suffered in the shadow of the Heeled One,\" explains ", THE(MAYOR), ", glancing hatefully at ", THE(BOOT
), `. \"At long last, his evil-smelling reign is at an end!\"
  \"Huzzah!\" cries `, THE(FCROWD), ", dancing gleefully around ", THE(FARMHOUSE
), ". \"Huzzah! The Boot is licked!\"", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 4)) {
        WINDOW(SHOWING_ROOM);
        MOVE(MAYOR, IN_FROON);
        SEE_CHARACTER(MAYOR);
        MAKE(FCROWD, NODESC);
        PUTP(IN_FROON, "HEAR", MAYOR);
        TELL("An important-looking man, tinier than all the rest, emerges from "
, THE(FCROWD), PTAB, "\"Greetings, brave ");
        SAY_SORC();
        TELL(",\" he mumbles, grovelling at your feet. \"I am Grope, Mayor of the City of ", FROON, `. On behalf of us all, I welcome you!\"
  \"Welcome! Welcome to the `);
        SAY_SORC();
        TELL("!\" echoes ", THE(FCROWD), " joyfully.", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 3)) {
        WINDOW(SHOWING_ROOM);
        MOVE(FCROWD, IN_FROON);
        P_THEM_OBJECT = FCROWD;
        PUTP(IN_FROON, "HEAR", FCROWD);
        MAKE(LADY, NODESC);
        TELL(`\"The Heeled One is fallen! Come see! Come see!\"
  More and more of the little folk emerge from `, THE(FBEDS
), ", staring first at the crushed boot, then at you. Soon you're completely surrounded by joyous little faces.", CR);
        return true;
    } else if(isEQUAL(FSCRIPT, 2)) {
        TELL(CTHE(LADY), " tiptoes over to ", THE(BOOT
), ` and gawks at it, awestruck. She gingerly reaches out to tickle the lifeless sole. Nothing happens. A broad grin spreads across her childlike face.
  \"It's dead,\" she squeaks, turning to look at you. \"You killed it.\"`, CR);
        return true;
    } else {
        return false;
    }
}

function SAY_SORC() {
    TELL("sorcere" + (isIS(PLAYER, FEMALE) ? "ss" : "r"));
    return true;
}

var SHILL_TIMER/*NUMBER*/ = 0;

function I_SHILL() {
    if(isIS(SHILL, NODESC)) {
        UNMAKE(SHILL, NODESC);
        return false;
    } else if(++SHILL_TIMER > 5) {
        DEQUEUE(I_SHILL);
        SHILL_TIMER = 0;
        VANISH(SHILL);
        if(isHERE(ON_WHARF)) {
            TELL(TAB, CTHE(SHILL
), " slowly floats out of sight.", CR);
            return true;
        }
        return false;
    } else if(!(isHERE(ON_WHARF))) {
        return false;
    } else if(isEQUAL(SHILL_TIMER, 4)) {
        TELL(TAB, CTHE(SHILL), " is beginning to float away.", CR);
        return true;
    } else if(isEQUAL(SHILL_TIMER, 1)) {
        TELL(TAB);
        SEE_SHILL();
        return true;
    } else {
        return false;
    }
}

function SEE_SHILL() {
    MAKE(SHILL, SEEN);
    SHILL_TIMER = 1;
    WINDOW(SHOWING_ROOM);
    P_IT_OBJECT = SHILL;
    MOVE(SHILL, COVE);
    TELL("A movement draws your eye to the water, where "
, A(SHILL), " is bobbing on the waves.", CR);
    return true;
}

var DACT_SLEEP/*NUMBER*/ = 0;

function I_DACT() {
    let _V=null, _X;
    _V = isVISIBLE(DACT);
    if(isT(DACT_SLEEP)) {
        --DACT_SLEEP
        if(isEQUAL(DACT_SLEEP, 3)) {
            return false;
        } else if(isT(_V)) {
            TELL(TAB);
        }
        if(!(DACT_SLEEP)) {
            WAKE_DACT();
            return true;
        } else if(!(_V)) {
            return false;
        }
        TELL(CTHE(DACT));
        if(isEQUAL(DACT_SLEEP, 1)) {
            TELL(" snorts restlessly. It looks as if it's about to wake up.", CR);
            return true;
        }
        TELL(" caws softly in its dreams.", CR);
        return true;
    }
    if(!(_V)) {
        return false;
    } else if(isIS(DACT, SEEN)) {
        UNMAKE(DACT, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    MAKE(DACT, SEEN);
    _X = HAPPY_DACT;
    if(isHERE(IN_SKY)) {
        _X = FLYING_DACT;
    } else if(isIS(DACT, MUNGED)) {
        _X = SICK_DACT;
    }
    TELL(TAB, CTHE(DACT), PICK_NEXT(_X), PERIOD);
    return true;
}

function WAKE_DACT() {
    isREPLACE_ADJ(DACT, "SLEEPING", "AWAKE");
    UNMAKE(DACT, SLEEPING);
    MAKE(DACT, SEEN);
    DACT_SLEEP = 0;
    if(isVISIBLE(DACT)) {
        WINDOW(SHOWING_ALL);
        TELL(CTHE(DACT
), " shakes its head, blinks its eyes and yawns stupidly.", CR);
        if((isIS(DACT, MUNGED)
  &&  isIN(SADDLE, DACT))) {
            MOVE(SADDLE, HERE);
            TELL(TAB, CTHE(SADDLE), SON, THE(DACT
), "'s back aggravates his wound. So he shakes it off with a violent twist");
            if(isIN(PLAYER, SADDLE)) {
                MOVE(PLAYER, HERE);
                TELL(", which sends you sprawling to ", THE(GROUND));
                RELOOK();
                return true;
            }
            PRINT(PERIOD);
            WINDOW(SHOWING_ROOM);
        }
    }
    return true;
}

var GRTIMER/*NUMBER*/ = 0;

function I_GRINDER_APPEARS() {
    if(!(isHERE(AT_GATE))) {
        return false;
    } else if(--GRTIMER < 1) {
        GRTIMER = 0;
        DEQUEUE(I_GRINDER_APPEARS);
        MOVE(GRINDER, AT_GATE);
        SEE_GRINDER();
        WINDOW(SHOWING_ROOM);
        TELL(TAB, "Blue planes of energy form in the space around you. Their patterns of intersection whirl around a vortex of laughter, growing in power and malevolence..", PERIOD);
        if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_INV, SHOWING_STATS))) {
            RELOOK(true);
        }
        return true;
    } else if(isEQUAL(GRTIMER, 1)) {
        TELL(TAB
, "The invisible voice chuckles again, and the tension in the air rises.", CR);
        return true;
    } else if(isEQUAL(GRTIMER, 2)) {
        TELL(TAB
, "A burst of hollow laughter echoes up and down the street. You turn, but see no one", PTAB, "There's a faint, electrical tension in the air.", CR);
        return true;
    } else {
        return false;
    }
}

function SEE_GRINDER() {
    SEE_CHARACTER(GRINDER);
    QUEUE(I_GRINDER);
    LAST_MONSTER = GRINDER;
    LAST_MONSTER_DIR = null;
    MAKE(GRINDER, SEEN);
    return false;
}

function I_GRINDER() {
    if(!(isHERE(AT_GATE))) {
        return false;
    }
    ++GRTIMER
    TELL(TAB);
    if(GETP(GRINDER, "ENDURANCE") < 1) {
        EXIT_GRINDER();
        TELL(CTHE(GURDY), " falls from ", THE(GRINDER
), "'s dying grasp. Moments later, his body dissolves in a puff of steam.", CR);
        return true;
    }
    isNEXT_ENDURANCE(GRINDER);
    if(isEQUAL(GRTIMER, 1)) {
        TELL(CTHE(GRINDER
), " looks you up and down. \"Peasants,\" he sniffs, adjusting a knob on his "
, GURDY, `. \"Like unto sheep.\"
  He turns the crank of `, THE(GURDY), ", and the air is filled with the combined stench of five herds of sheep, accompanied by a cacophany of hateful bleating.", CR);
    } else if(isEQUAL(GRTIMER, 2)) {
        UNMAKE(NYMPH, LIVING);
        TELL("Ignoring you for the moment, ", THE(GRINDER
), " strides across to ", THE(GUILD_HALL), `'s entrance.
  A warning nymph appears beside his `);
        NYMPH_SAYS();
        TELL("... Oomph!\" This last exclamation is ", THE(NYMPH
), "'s last; for, quick as a wink, "
, THE(GRINDER), " snatches it out of the air and crushes it in his fist. \"Miserable pests.\"", CR);
        return true;
    } else if(isEQUAL(GRTIMER, 3)) {
        TELL(CTHE(GRINDER
), " turns around. \"Still here?\" he cries, adjusting his ", GURDY, PTAB
, "He turns the crank again, and a wall of imaginary flame springs up around you. You wail as your skin burns with synthetic agony.", CR);
    } else if(isEQUAL(GRTIMER, 4)) {
        TELL("\"Guess I'll just have to finish you off.\"", CR, TAB);
    }

    if(GRTIMER > 3) {
        TELL(CTHE(GRINDER), " turns the crank, and "
, PICK_NEXT(TORTURES), PERIOD);
    }

    if(isT(AUTO)) {
        BMODE_ON();
    }
    UPDATE_STAT((0 - RANDOM(GETP(GRINDER, "STRENGTH"))));
    return true;
}

/*function I_DISTANT_DORN() {
    let _X;
    if(isIN(DORN, HERE)) {
        MAKE(DORN, SEEN);
        return false;
    } else if((isHERE(TOWER_TOP)
  ||  (_X = isINTBL(HERE, REST(TOWER1_ROOMS, 1), 4, 1))
  ||  (_X = isINTBL(HERE, REST(TOWER2_ROOMS, 1), 4, 1))
  ||  (_X = isINTBL(HERE, REST(TOWER3_ROOMS, 1), 4, 1)))) {
        if(isIS(DORN, SEEN)) {
            UNMAKE(DORN, SEEN);
            return false;
        } else if(PROB(50)) {
            return false;
        }
        MAKE(DORN, SEEN);
        TELL(TAB);
        if((_X = isINTBL(HERE, REST(DORN_ROOMS, 1), 5, 1))) {
            TELL(PICK_NEXT(CLOSE_DORNS), CR);
            return true;
        }
        TELL(PICK_NEXT(DORN_SOUNDS), CR);
        return true;
    } else {
        return false;
    }
}*/

var DORN_TIMER/*NUMBER*/ = 0;

function I_DORN() {
    let _X, _L, _DIR, _TBL, _DEST, _DAMAGE;
    _L = LOC(DORN);
    if(isEQUAL(_L, HERE)) {
        MAKE(DORN, SEEN);
        TELL(TAB);
        if(GETP(DORN, "ENDURANCE") < 1) {
            TELL("Howling with pain, ", THE(DORN
), " beats a hasty retreat.", CR);
            /*DEQUEUE(I_DISTANT_DORN);*/
            KILL_MONSTER(DORN);
            return true;
        } else if(isIS(DORN, MUNGED)) {
            TELL(CTHE(DORN));
            if(--DORN_TIMER < 1) {
                DORN_TIMER = 0;
                WINDOW(SHOWING_ROOM);
                UNMAKE(DORN, MUNGED);
                TELL(" sniffs away the last of its tears.", CR);
                return true;
            } else if(isEQUAL(DORN_TIMER, 1)) {
                TELL(" blows its nose noisily. It looks as if it's recovering.", CR);
                return true;
            } else if(isEQUAL(DORN_TIMER, 2)) {
                TELL(" flails around the room, its eyes streaming. \"Hurumph!\" it bawls.", CR);
                return true;
            }
            TELL(" almost crashes into you in its blind frenzy. \"Hurumph!\" it cries, its face soaked with tears.", CR);
            return true;
        } else if(isIS(DORN, SURPRISED)) {
            SEE_MONSTER(DORN);
            TELL(CTHE(DORN
), " begins turning its 69 eyes in your direction.", CR);
            return true;
        }
        isNEXT_ENDURANCE(DORN);
        _DAMAGE = isMONSTER_STRIKES(DORN);
        TELL(CTHE(DORN));
        if(isT(_DAMAGE)) {
            TELL(PICK_NEXT(DORN_HITS)
, ", and you feel strength drain from your body.", CR);
            UPDATE_STAT(_DAMAGE, STRENGTH);
            return true;
        }
        TELL(PICK_NEXT(DORN_MISSES), PERIOD);
        return true;
    } else if(isIS(DORN, MUNGED)) {
        if(--DORN_TIMER < 1) {
            DORN_TIMER = 0;
            UNMAKE(DORN, MUNGED);
        }
        return false;
    //} else if(!((_X = isINTBL(HERE, REST(DORN_ROOMS, 1), 5, 1)))) {
    } else if(!DORN_ROOMS.slice(1).includes(HERE)) {
        REMOVE(DORN);
        UNMAKE(DORN, SLEEPING);
        UNMAKE(DORN, MUNGED);
        MAKE(DORN, SURPRISED);
        DORN_TIMER = 0;
        MAKE(DORN, NODESC);
        DEQUEUE(I_DORN);
        return false;
    }
    _DIR = isMOVE_MONSTER(DORN, true);
    if(isT(_DIR)) {
        MAKE(DORN, SEEN);
        TELL(TAB);
        if(PROB(50)) {
            TELL("\"Hurumph!\" ");
        }
        TELL(CTHE(DORN));
        if(isEQUAL(_DIR, "UP", "DOWN")) {
            TELL(" clambers ", B(_DIR), " the steps.", CR);
            return true;
        }
        PRINT(" reappears from the ");
        TELL(B(_DIR), PERIOD);
        return true;
    }
    return false;
}

var ONION_TIMER/*NUMBER*/ = 0;

function I_ONION() {
    let _V;
    _V = isVISIBLE(ONION);
    if(--ONION_TIMER < 1) {
        ONION_TIMER = 0;
        DEQUEUE(I_ONION);
        if(isT(DORN_TIMER)) {
            DORN_TIMER = 1;
        }
        if(!(_V)) {
            return false;
        }
        TELL(TAB, CTHE(ONION
), "'s sting diminishes enough to dry your eyes.", CR);
        return true;
    } else if(!(_V)) {
        return false;
    }
    TELL(TAB);
    if((isIN(DORN, HERE)
  &&  !(isIS(DORN, MUNGED)))) {
        WINDOW(SHOWING_ROOM);
        MAKE(DORN, MUNGED);
        DORN_TIMER = 4;
        MAKE(DORN, SEEN);
        TELL(CTHE(DORN
), "'s multiple eyes turn red and watery under the pungent influence of "
, THE(ONION), ". \"Hurumph!\" it wails, utterly helpless", PTAB);
    }

    if(isEQUAL(ONION_TIMER, 1)) {
        TELL(CTHE(ONION), " seems to be losing its potency.", CR);
        return true;
    } else if(isEQUAL(ONION_TIMER, 2)) {
        TELL("You rub your swollen eyes to lessen ", THE(ONION
), "'s pungent sting.", CR);
        return true;
    }
    TELL("Your eyes become red and itchy as ", THE(ONION
), "'s potent miasma");
    PRINT(" fills the air");
    PRINT(PERIOD);
    return true;
}

VOC("ITCH", NOUN);
VOC("LONG", ADJ);VOC("SLENDER", ADJ);VOC("ITCHY", ADJ);

var MOSS_TIMER/*NUMBER*/ = 0;
var THIS_MOSS/*OBJECT*/ = null;
var MOSSES/*NUMBER*/ = 0;

function I_MOSS() {
    if(isIS(THIS_MOSS, SEEN)) {
        UNMAKE(THIS_MOSS, SEEN);
        MOSS_TIMER = 6;
        return false;
    } else if(--MOSS_TIMER < 1) {
        TELL(TAB);
        DO_MOSS();
        return true;
    } else if(isEQUAL(MOSS_TIMER, 2, 4)) {
        return false;
    }
    TELL(TAB);
    if(isEQUAL(MOSS_TIMER, 1)) {
        TELL("Those itchy fingers are becoming quite a nuisance");
        if(MOSSES > 1) {
            TELL(" again");
        }
        PRINT(PERIOD);
        return true;
    } else if(isEQUAL(MOSS_TIMER, 3)) {
        TELL("You give your fingers a satisfying scratch.", CR);
        return true;
    } else if(isEQUAL(MOSS_TIMER, 5)) {
        isREPLACE_SYN(HANDS, "ZZZP", "ITCH");
        isREPLACE_ADJ(HANDS, "ZZZP", "ITCHY");
        TELL("You idly scratch an itchy finger.", CR);
        return true;
    } else {
        return false;
    }
}

function DO_MOSS() {
    let _X;
    THIS_MOSS = null;
    MOSS_TIMER = 0;
    DEQUEUE(I_MOSS);
    MAKE(HANDS, MUNGED);
    isREPLACE_ADJ(HANDS, "ITCHY", "LONG");
    isREPLACE_ADJ(HANDS, "ZZZP", "SLENDER");
    if(isT(isLIT)) {
        _X = isLIGHT_SOURCE();
        TELL("Damn that itch! You hold your bothersome hand up to ");
        if(isT(_X)) {
            TELL(THE(_X));
        } else {
            TELL("the light");
        }
        if(MOSSES > 1) {
            TELL(" and flex your fingers again, noting their improved agility");
        } else {
            TELL("... and gasp with shock!", CR, TAB
, "Your fingers, once fat and stubby, are now long and slender as a pianist's. You flex the new digits one at a time; they respond with unfamiliar agility. Fact is, your whole body feels tighter and more coordinated than ever");
        }
    } else {
        TELL("Your fingers tingle oddly, and the itch disappears");
    }
    PRINT(PERIOD);
    UPDATE_STAT(8, DEXTERITY, true);
    return true;
}

function I_UNICORN() {
    if(!(isHERE(IN_STABLE))) {
        return false;
    } else if(isIS(STALL, OPENED)) {
        TELL(TAB, CTHE(UNICORN
), " wastes no time edging her way out of ", THE(STALL));
        if(isIN(CHEST, HERE)) {
            TELL(PERIOD);
            UNICORN_OPENS_CHEST();
            return true;
        }
        TELL(". She ");
        BYE_UNICORN();
        return true;
    } else if(isIS(UNICORN, SEEN)) {
        UNMAKE(UNICORN, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    MAKE(UNICORN, SEEN);
    P_HER_OBJECT = UNICORN;
    TELL(TAB, CTHE(UNICORN), " whinnies sadly.", CR);
    return true;
}

function I_BABY() {
    if(!(isHERE(JUN0))) {
        return false;
    } else if(isIS(BABY, SEEN)) {
        UNMAKE(BABY, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    MAKE(BABY, SEEN);
    P_HIM_OBJECT = BABY;
    TELL(TAB, CTHE(BABY), " bellows helplessly");
    if(isVISIBLE(MAMA)) {
        MAKE(MAMA, SEEN);
        if(PROB(50)) {
            P_HER_OBJECT = MAMA;
            TELL(", and its mother responds");
        }
    }
    PRINT(PERIOD);
    return true;
}

function I_MAMA() {
    let _DAMAGE, _TBL, _LEN, _X, _L, _NL, _PL, _PLL, _DIR;
    _L = LOC(MAMA);
    _PL = LOC(PLAYER);
    if(isVISIBLE(MAMA)) {
        if(!(isIS(MAMA, MONSTER))) {
            if(isIS(MAMA, SEEN)) {
                UNMAKE(MAMA, SEEN);
                return false;
            } else if(isIS(MAMA, MONSTER)) {
                
            } else if(PROB(50)) {
                return false;
            }
            P_HER_OBJECT = MAMA;
            MAKE(MAMA, SEEN);
            TELL(TAB, CTHE(MAMA), " bellows");
            if(isVISIBLE(BABY)) {
                MAKE(BABY, SEEN);
                TELL(" impotently");
                if(PROB(50)) {
                    P_HIM_OBJECT = BABY;
                    TELL(", and her baby responds");
                }
            }
            PRINT(PERIOD);
            return true;
        }
        P_HER_OBJECT = MAMA;
        MAKE(MAMA, SEEN);
        if(GETP(MAMA, "ENDURANCE") < 1) {
            TELL("  Bellowing with defeat, ", THE(MAMA), " limps away into the jungle.", CR);
            KILL_MONSTER(MAMA);
            return true;
        }
        if(isSTILL_SLEEPING(MAMA)) {
            return true;
        }
        TELL(TAB, CTHE(MAMA));
        if(isEQUAL(_L, _PL)) {
            if(isEQUAL(_L, MAW)) {
                TELL(PICK_NEXT(MAMA_CLIMBS), PERIOD);
                return true;
            }
            _X = isMONSTER_STRIKES(MAMA);
            TELL(" charges you");
            if(isT(_X)) {
                if(!(STATIC)) {
                    TELL(". Ooof!", CR);
                } else {
                    TELL(PERIOD);
                }
                UPDATE_STAT(isMSPARK(MAMA, _X));
                return true;
            }
            TELL(", missing by a hair.", CR);
            return true;
        } else if(isEQUAL(_PL, MAW)) {
            MOVE(MAMA, MAW);
            WINDOW(SHOWING_ROOM);
            TELL(" clambers onto the bottom of ", THE(_PL), ", snorting with rage!", CR);
            return true;
        }
        TELL(" circles ", THE(_PL), ", snorting angrily.", CR);
        return true;
    }

    if(!(isIS(MAMA, MONSTER))) {
        return false;
    }

    _NL = GETP(MAMA, "LAST-LOC");
    if(isT(_NL)) {
        MOVE(MAMA, _NL);
        if(isEQUAL(_NL, HERE)) {
            P_HER_OBJECT = MAMA;
            PUTP(MAMA, "LAST-LOC", null);
            WINDOW(SHOWING_ROOM);
            TELL(TAB, CTHE(MAMA), " storms into view!", CR);
            return true;
        }
    }

    /*"Is player in a room adjacent to mama?"*/

    if(!(isWEARING_MAGIC(CLOAK))) {
        _PLL = LOC(_PL);
        _DIR = asDIRECTION("NORTH");
        while(true) {
            _TBL = GETP(_L, toDIRECTION(_DIR));
            if((isT(_TBL)
            &&  isEQUAL(MSB(_TBL[XTYPE])
            , CONNECT, SCONNECT))) {
                _X = _TBL[XROOM];
                if(isEQUAL(_X, AT_FALLS)) {
                    
                } else if(isEQUAL(_X, _PL, _PLL)) {
                    PUTP(MAMA, "LAST-LOC", _X);
                    return false;
                }
            }
            if(--_DIR < asDIRECTION("NW")) {
                break;
            }
        }
    }

    PUTP(MAMA, "LAST-LOC", 0);
    return false;
}

var IMPSAY/*NUMBER*/ = 4;

function I_IMPS() {
    if(!(isHERE(APLANE))) {
        return false;
    } else if(!(isEQUAL(ABOVE, OPLAIN))) {
        return false;
    }
    MAKE(IMPS, SEEN);
    P_THEM_OBJECT = IMPS;
    TELL(TAB);
    if(--IMPSAY < 1) {
        DEQUEUE(I_IMPS);
        IMPSAY = 3;
        QUEUE(I_IMPS_TAKE);
        MOVE(COCO, APLANE);
        P_IT_OBJECT = COCO;
        WINDOW(SHOWING_ROOM);
        TELL("\"Catch!\" cries the ");
        PRINT("cheerful-looking Implementor");
        TELL(", lobbing ", THE(COCO), " high into the air", PTAB
, "\"Got it.\" A loud-mouthed Implementor jumps out of his seat, steps backwards to grab the falling ", COCO, "... and plows directly into you", PTAB);
        ITALICIZE("Plop");
        TELL(". ", CTHE(COCO), " skitters across the plane.", CR);
        return true;
    } else if(isEQUAL(IMPSAY, 3)) {
        TELL(`One of the Implementors notices your arrival. \"Company,\" he remarks with his mouth full.
  A few of the others glance down at you.`, CR);
        return true;
    } else if(isEQUAL(IMPSAY, 2)) {
        TELL(XA);
        PRINT("tall, bearded Implementor");
        TELL(" pitches ", THE(COCO
), " across the table. \"Isn't this the feeb who ");
        if(isIS(BOTTLE, SEEN)) {
            TELL("opened that mailbox");
        } else if(LAST_BAD[0]) {
            TELL("used the word '");
            PRINT_TABLE(LAST_BAD);
            TELL("'");
        } else {
            TELL("bought that stupid onion");
        }
        TELL(" a few moves ago?\" he mutters, apparently referring to you");
        if(isIS(IMPS, MUNGED)) {
            TELL(". \"Gimme another thunderbolt.\"", CR);
            return true;
        }
        TELL(PTAB, "\"That's ");
        if(isIS(PLAYER, FEMALE)) {
            TELL(B("HER"));
        } else {
            TELL(B("HIM"));
        }
        TELL(",\" agrees one of the others.", CR);
        return true;
    } else if(isEQUAL(IMPSAY, 1)) {
        TELL("A ");
        PRINT("cheerful-looking Implementor");
        TELL(" catches ", THE(COCO
), " and glares down at you with silent contempt.", CR);
        return true;
    } else {
        return false;
    }
}

function I_IMPS_TAKE() {
    let _X;
    if(!(isHERE(APLANE))) {
        return false;
    } else if(!(isEQUAL(ABOVE, OPLAIN))) {
        return false;
    }
    MAKE(IMPS, SEEN);
    P_THEM_OBJECT = IMPS;
    TELL(TAB);
    P_IT_OBJECT = COCO;
    if(--IMPSAY < 1) {
        TELL("The loud-mouthed Implementor growls something obscene, shoves you out of the way and reaches down to retrieve ", THE(COCO), PTAB);
        URGRUE_GETS_COCO(true);
        return true;
    } else if(isEQUAL(IMPSAY, 1)) {
        TELL("\"Pick up that ", COCO
, ",\" growls the Implementor, \"or I'll ");
        if(!(STATS[INTELLIGENCE] < READING_IQ)) {
            ITALICIZE("remove");
        } else if(!(VT220)) {
            TELL("(something unintelligible)");
        } else {
            _X = FONT(F_NEWFONT);
            TELL(B("REMOVE"));
            _X = FONT(F_DEFAULT);
        }
        TELL(" you.\"", CR, TAB
, "The other Implementors are enjoying this exchange.", CR);
        return true;
    } else if(isEQUAL(IMPSAY, 2)) {
        TELL("The Implementor who ran into you rises to his feet, livid with rage. \"Pick up that ", COCO, ",\" he demands.", CR);
        return true;
    } else {
        return false;
    }
}

function I_IMPQUEST() {
    if(!(isHERE(APLANE))) {
        return false;
    } else if(!(isEQUAL(ABOVE, OPLAIN))) {
        return false;
    } else if(--IMPSAY < 1) {
        IMPSAY = 3;
        DEQUEUE(I_IMPQUEST);
        QUEUE(I_IMPGIVE);
        MOVE(GOBLET, IMPS);
        P_IT_OBJECT = GOBLET;
        WINDOW(SHOWING_ROOM);
        MAKE(IMPS, SEEN);
        TELL("  A ");
        PRINT("mild-mannered Implementor");
        TELL(" empties his goblet of nectar with a gulp. \"Here,\" he says, holding it out for you. \"Carry this. It'll keep the thunderbolts off your back.\"", CR);
        return true;
    } else if(isEQUAL(IMPSAY, 1)) {
        MAKE(IMPS, SEEN);
        TELL(`  \"So,\" sighs another Implementor, toying with his sunglasses. \"The Coconut is gone. Stolen. Any volunteers to get it back?\"
  One by one, the Implementors turn to look at you.
  \"I'd say it's unanimous,\" smiles the `);
        PRINT("cheerful-looking Implementor");
        TELL(PERIOD);
        return true;
    } else if(isEQUAL(IMPSAY, 2)) {
        MAKE(IMPS, SEEN);
        TELL("  \"This is awkward,\" remarks a loudmouthed Implementor. \"No telling what the ur-grue might do with the Coconut. He could crumble the foundations of reality. Plunge the world into a thousand years of darkness. We might even have to buy our own lunch!\" The other Implementors gasp. \"And it's all ");
        HLIGHT(H_ITALIC);
        if(isIS(PLAYER, FEMALE)) {
            TELL("her");
        } else {
            TELL("his");
        }
        HLIGHT(H_NORMAL);
        TELL(" fault,\" he adds, pointing at you with a drumstick.", CR);
        return true;
    } else {
        return false;
    }
}

function I_IMPGIVE() {
    if(!(isHERE(APLANE))) {
        return false;
    } else if(!(isEQUAL(ABOVE, OPLAIN))) {
        return false;
    }
    MAKE(IMPS, SEEN);
    P_IT_OBJECT = GOBLET;
    TELL(TAB);
    if(--IMPSAY < 1) {
        MOVE(GOBLET, ON_PIKE);
        MAKE(GOBLET, NODESC);
        MAKE(GOBLET, TOUCHED);
        TELL("\"I don't think ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he's going to accept ", THE(GOBLET), ",\" sighs the ");
        PRINT("mild-mannered Implementor");
        TELL(PTAB, "\"Of course ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he will,\" smiles the ");
        PRINT("tall, bearded Implementor");
        TELL(", forcing it into your hands. \"See?\"", CR);
        ATRII_KICK();
        return true;
    } else if(isEQUAL(IMPSAY, 1)) {
        TELL("\"I really must insist that you take this goblet,\" repeats the ");
        PRINT("mild-mannered Implementor");
        TELL(PERIOD);
        return true;
    } else if(isEQUAL(IMPSAY, 2)) {
        TELL("\"Here. Take this,\" urges the ");
        PRINT("mild-mannered Implementor");
        TELL(", holding out the ");
        PRINT("goblet for you to take.|");
        return true;
    } else {
        return false;
    }
}

function I_BFLY() {
    let _FREE=0, _V, _L, _LEN;
    if(!(isIS(BFLY, LIVING))) {
        return false;
    }
    _L = LOC(BFLY);
    if(isT(_L)) {
        _V = isVISIBLE(BFLY);
        if(isIN(_L, ROOMS)) {
            
        } else if((isEQUAL(_L, ARCH)
  &&  !(isEQUAL(ATIME, PRESENT)))) {
            
        } else if((isIS(_L, SURFACE)
  ||  isIS(_L, VEHICLE)
  ||  isIS(_L, LIVING)
  ||  (isIS(_L, CONTAINER)
  &&  isIS(_L, OPENED)))) {
            ++_FREE
        }
    }
    if(isEQUAL(_L, GOBLET)) {
        if(!(_V)) {
            return false;
        } else if(isIS(BFLY, SEEN)) {
            UNMAKE(BFLY, SEEN);
            return false;
        } else if(PROB(75)) {
            return false;
        }
        MAKE(BFLY, SEEN);
        MAKE(BFLY, IDENTIFIED);
        TELL(TAB, CTHE(BFLY), PICK_NEXT(BFLY_EATINGS), PERIOD);
        return true;
    } else if(isT(_V)) {
        if(isIS(BFLY, SEEN)) {
            UNMAKE(BFLY, SEEN);
            return false;
        } else if(PROB(75)) {
            return false;
        }
        MAKE(BFLY, SEEN);
        MAKE(BFLY, IDENTIFIED);
        TELL(TAB);
        if(isEQUAL(_L, HERE)) {
            
        } else if(isT(_FREE)) {
            MOVE(BFLY, HERE);
            WINDOW(SHOWING_ALL);
            TELL(CTHE(BFLY), " flutters");
            OUT_OF_LOC(_L);
            TELL(PERIOD);
            return true;
        }
        if(isVISIBLE(GOBLET)) {
            _L = LOC(GOBLET);
            TELL(CTHE(BFLY));
            if((isEQUAL(_L, PLAYER, HERE, LOC(PLAYER))
  ||  isIS(_L, SURFACE))) {
                MOVE(BFLY, GOBLET);
                WINDOW(SHOWING_ALL);
                TELL(" alights on the rim of "
, THE(GOBLET), PERIOD);
                return true;
            }
            TELL(PICK_NEXT(BFLY_HOVERS), THE(_L), PERIOD);
            return true;
        }
        if(isHERE(LOC(ARCH))) {
            
        } else if(PROB(66)) {
            TELL(CTHE(BFLY), PICK_NEXT(BFLY_DOINGS), PERIOD);
            return true;
        }
        return isNEXT_BFLY_ROOM(HERE);
    }
    if(!(_L)) {
        return false;
    } else if(!(isIN(_L, ROOMS))) {
        if(isT(_FREE)) {
            MOVE(BFLY, LOC(_L));
        }
        return false;
    } else if(PROB(66)) {
        return false;
    }
    return isNEXT_BFLY_ROOM(_L);
}

function isNEXT_BFLY_ROOM(_L) {
    let _DIR, _CNT, _TBL, _TYPE, _X, _RM;
    if(!(isIN(_L, ROOMS))) {
        return false;
    }
    _CNT = 1;
    _DIR = I_NORTH;
    while(true) {
        _TBL = GETP(_L, PDIR_LIST[_DIR]);
        if(isT(_TBL)) {
            _X = _TBL[XTYPE];
            _TYPE = MSB(_X);
            if((isEQUAL(_TYPE, CONNECT, SCONNECT, X_EXIT)
  ||  (isEQUAL(_TYPE, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED))
  ||  (isEQUAL(_TYPE, FCONNECT)
  &&  (_X & 127)))) {
                _RM = toROOM(_TBL[XROOM]);
                if(isEQUAL(_RM, _L, ON_BRIDGE, IN_FROON)) {
                    
                } else if(isEQUAL(_RM, APLANE, IN_SPLENDOR
, LOC(ARCH))) {
                    
                } else if((!(isPLAIN_ROOM(_RM))
  &&  !(isIS(BFLY, IDENTIFIED)))) {
                    
                } else if((isIS(_RM, INDOORS)
  &&  !(isIS(_L, INDOORS)))) {
                    
                } else if((isEQUAL(_RM, HERE)
  &&  !(isWEARING_MAGIC(CLOAK)))) {
                    _CNT = 2;
                    GOOD_DIRS[2] = _DIR;
                    break;
                } else {
                    ++_CNT
                    GOOD_DIRS[_CNT] = _DIR;
                }
            }
        }
        if(++_DIR > I_NW) {
            break;
        }
    }
    if(isEQUAL(_CNT, 1)) {
        return false;
    } else if(isEQUAL(_CNT, 2)) {
        _DIR = GOOD_DIRS[2];
    } else {
        GOOD_DIRS[0] = _CNT;
        GOOD_DIRS[1] = 0;
        _DIR = PICK_ONE(GOOD_DIRS);
    }
    _RM = toROOM(GETP(_L, PDIR_LIST[_DIR])[XROOM]);
    if(isEQUAL(_L, HERE)) {
        MOVE(BFLY, _RM);
        BFLY_FLIES(_DIR);
        return true;
    } else if(isEQUAL(_RM, HERE)) {
        BFLY_ARRIVES(_DIR);
        return true;
    }
    return false;
}

function BFLY_FLIES(_DIR) {
    WINDOW(SHOWING_ROOM);
    TELL(CTHE(BFLY), " flutters away");
    if(isASSIGNED(_DIR)) {
        TELL(" to the ", B(DIR_NAMES[_DIR]));
    }
    PRINT(PERIOD);
    return true;
}

function BFLY_ARRIVES(_DIR) {
    WINDOW(SHOWING_ROOM);
    P_IT_OBJECT = BFLY;
    MOVE(BFLY, HERE);
    MAKE(BFLY, SEEN);
    MAKE(BFLY, IDENTIFIED);
    TELL(TAB);
    if(isIS(BFLY, TOUCHED)) {
        TELL(XTHE);
    } else {
        MAKE(BFLY, TOUCHED);
        TELL(XA);
    }
    TELL(D(BFLY), " flutters into view");
    if(isASSIGNED(_DIR)) {
        _DIR = (_DIR + 4);
        if(_DIR > I_NW) {
            _DIR = (_DIR - 8);
        }
        TELL(" from the ", B(DIR_NAMES[_DIR]));
    }
    PRINT(PERIOD);
    return true;
}

function I_PILLAR() {
    let _L;
    _L = LOC(BFLY);
    if(!(_L)) {
        return false;
    } else if(!(isIS(BFLY, LIVING))) {
        return false;
    } else if(isVISIBLE(BFLY)) {
        if(isIS(BFLY, SEEN)) {
            UNMAKE(BFLY, SEEN);
            return false;
        } else if(isIN(_L, ROOMS)) {
            VANISH(BFLY);
            DEQUEUE(I_PILLAR);
            TELL(TAB, CTHE(BFLY
), " seems to have crawled out of sight.", CR);
            return true;
        } else if(PROB(90)) {
            return false;
        }
        MAKE(BFLY, SEEN);
        TELL(TAB, CTHE(BFLY));
        if(PROB(50)) {
            TELL(PICK_NEXT(PILLAR_DOINGS));
        } else {
            TELL(PICK_NEXT(PILLAR_MOVES));
            if(isEQUAL(_L, PLAYER)) {
                _L = HANDS;
            } else if(!(isEQUAL(_L, HERE))) {
                
            } else if(isIS(HERE, INDOORS)) {
                _L = FLOOR;
            } else {
                _L = GROUND;
            }
            TELL(THE(_L));
        }
        TELL(PERIOD);
        return true;
    } else if(!(isIN(_L, ROOMS))) {
        return false;
    } else if(PROB(33)) {
        REMOVE(BFLY);
        DEQUEUE(I_PILLAR);
        return false;
    } else {
        return false;
    }
}

const INIT_CLERIC_SCRIPT = 4;
var CLERIC_SCRIPT/*NUMBER*/ = INIT_CLERIC_SCRIPT;

function I_CLERIC() {
    let _X;
    if(!(isHERE(IN_CHAPEL))) {
        return false;
    } else if(isIS(CLERIC, SEEN)) {
        UNMAKE(CLERIC, SEEN);
        return false;
    }
    TELL(TAB);
    if(++CLERIC_SCRIPT > INIT_CLERIC_SCRIPT) {
        CLERIC_SCRIPT = 0;
        TELL(CTHE(CLERIC), " lifts his eyes as you walk in");
        if(!(isIS(CONGREG, SEEN))) {
            MAKE(CONGREG, SEEN);
            TELL(". \"Art thou the Savior?\" he cries, and the entire "
, CONGREG, " turns to stare at you", PTAB
, "\"Naw,\" sneers an unseen voice. \"Just some ");
            _X = "GUY";
            if(isIS(PLAYER, FEMALE)) {
                _X = "DAME";
            }
            TELL(B(_X));
            if(isSEE_ANYTHING_IN(PLAYER)) {
                TELL(WITH, A(isFIRST(PLAYER)));
            }
            TELL(PERQ, TAB, "\"Oh,\" mumbles ", THE(CLERIC
), " with a sigh of resignation. \"Have a seat, good ");
            _X = "SIR";
            if(isIS(PLAYER, FEMALE)) {
                _X = "MISS";
            }
            TELL(B(_X), ", and join us in our hour of need.\"", CR);
            return true;
        }
        TELL(", and bows his head in sorrow.", CR);
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 1)) {
        TELL(C(QUOTATION), PICK_NEXT(CLERIC_WOES), C(EXCLAM));
        CLERIC_WHINES();
        TELL("Behold! The wrath of the Trees is almost upon us. When the Glyph of Warding is melted, the village will be lost!\"", CR);
        CROWD_AGREES();
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 2)) {
        TELL("\"Who can stop the marching Trees?");
        CLERIC_WHINES();
        TELL("Orkan's Glyphs are all that keep the monsters at bay. But Orkan answers not our summons; only one Glyph remains, and that is writ in snow!\"", CR);
        CROWD_AGREES();
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 3)) {
        TELL("\"The southern mountains are their nest,");
        CLERIC_WHINES();
        TELL("They march relentlessly, choking the valley with their foul gifts and blasphemous songs. They know the wizard's Glyph is melting, and with it fades our only hope!\"", CR);
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, INIT_CLERIC_SCRIPT)) {
        CLERIC_SCRIPT = 0;
        TELL("\"Where is the Savior of whom our legends speak?");
        CLERIC_WHINES();
        TELL("Anything ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he asks will be ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("her");
        } else {
            TELL("his");
        }
        TELL(" reward, if only ");
        if(isIS(PLAYER, FEMALE)) {
            TELL("s");
        }
        TELL("he fulfills the ancient prophecy, and drives the plague of Tree-daemons from our doorstep!\"", CR);
        CROWD_AGREES();
        return true;
    } else {
        return false;
    }
}

function CLERIC_WHINES() {
    let _X;
    WHIMPERS(CLERIC);
    if(PROB(50)) {
        TELL(", ");
        _X = RANDOM(100);
        if(_X < 33) {
            TELL("beating his breast");
        } else if(_X < 67) {
            TELL("wringing his hands");
        } else {
            TELL("covering his face");
        }
        if(PROB(50)) {
            if(PROB(50)) {
                TELL(" in supplication");
            } else {
                TELL(" hopelessly");
            }
        }
    }
    TELL(". \"");
    return false;
}

function CROWD_AGREES() {
    if(PROB(33)) {
        TELL(TAB, C(QUOTATION), PICK_NEXT(CLERIC_WOES), C(EXCLAM));
        WHIMPERS(CONGREG);
        PRINT(PERIOD);
    }
    return false;
}

function WHIMPERS(_OBJ) {
    let _X;
    TELL("\" ");
    _X = RANDOM(100);
    if(_X < 33) {
        TELL("mourn");
    } else if(_X < 67) {
        TELL("whine");
    } else {
        TELL("whimper");
    }
    TELL("s ", THE(_OBJ));
    return false;
}

function I_THRIFF_WIN() {
    if(!(isVISIBLE(CLERIC))) {
        return false;
    } else if(isIS(CLERIC, SEEN)) {
        UNMAKE(CLERIC, SEEN);
        return false;
    }
    ++CLERIC_SCRIPT
    TELL(TAB);
    if(isEQUAL(CLERIC_SCRIPT, 1)) {
        TELL("\"Congratulations, honored ");
        SAY_SORC();
        TELL(",\" booms ", THE(CLERIC
), " over the crowd's cheers. \"Truly, thou art the Savior foretold in our eldest legends. Would that Orkan were here to witness this day.\"", CR);
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 2)) {
        TELL("\"What reward wouldst thou claim of us?\" asks "
, THE(CLERIC), ", carefully holding ");
        PRINT("the reliquary behind his back. \"");
        TELL("Ask for anything, and it shall be yours!\"", CR);
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 3)) {
        TELL("\"Anything we possess is yours for the asking,\" repeats "
, THE(CLERIC), PERIOD);
        return true;
    } else if(isEQUAL(CLERIC_SCRIPT, 4)) {
        TELL(CTHE(CLERIC), " adjusts ");
        PRINT("the reliquary behind his back. \"");
        TELL("Perchance we have nothing to tempt such a mighty ");
        SAY_SORC();
        TELL(",\" he remarks hopefully.", CR);
        return true;
    }
    EXIT_CLERIC();
    TELL(CTHE(CONGREG), " is beginning to wander away", PTAB
, `\"Your reticence betrays your humility, honored one,\" says the Cardinal, bowing his head. \"No doubt you have forsworn earthly gifts in lieu of some greater reward in the afterlife. In that case, farewell!\"
  Clutching `, THE(RELIQUARY), ", ", THE(CLERIC));
    PRINT(" disappears into the ");
    TELL("crowd. In moments, the place is deserted.", CR);
    return true;
}

function EXIT_CLERIC() {
    DEQUEUE(I_THRIFF_WIN);
    REMOVE(CLERIC);
    P_HIM_OBJECT = NOT_HERE_OBJECT;
    REMOVE(CONGREG);
    P_THEM_OBJECT = NOT_HERE_OBJECT;
    WINDOW(SHOWING_ALL);
    return false;
}

const INIT_TRUFFLE = 50;
var TRUFFLE_TIMER = 0;

function I_TRUFFLE() {
    let _V;
    if(!(LOC(TRUFFLE))) {
        TRUFFLE_TIMER = 0;
        DEQUEUE(I_TRUFFLE);
        return false;
    } else if(isHERE(APLANE, IN_SPLENDOR)) {
        return false;
    }
    _V = isVISIBLE(TRUFFLE);
    if(isHERE(APLANE, IN_SPLENDOR)) {
        return false;
    } else if(--TRUFFLE_TIMER < 1) {
        TRUFFLE_TIMER = 0;
        DEQUEUE(I_TRUFFLE);
        VANISH(TRUFFLE);
        if(isT(_V)) {
            TELL(TAB, "All that's left of ", THE(TRUFFLE
), " is a yummy memory.", CR);
            return true;
        }
        return false;
    } else if(!(_V)) {
        return false;
    } else if(isEQUAL(TRUFFLE_TIMER, 10)) {
        TELL(TAB, CTHE(TRUFFLE
), " looks terribly soft");
        PRINT(". It probably won't last much longer.|");
        return true;
    } else if(isEQUAL(TRUFFLE_TIMER, 30)) {
        TELL(TAB, CTHE(TRUFFLE
), " looks as if it's beginning to soften.", CR);
        return true;
    } else {
        return false;
    }
}

var PTIMER/*NUMBER*/ = 0;

function I_QUEEN() {
    let _X;
    if(!(isHERE(IN_GARDEN))) {
        return false;
    }
    ++PTIMER
    if(isEQUAL(PTIMER, 1)) {
        return false;
    } else if(isEQUAL(PTIMER, 2)) {
        TELL(TAB
, "Voices can be heard somewhere in the distance.", CR);
        return true;
    } else if(isEQUAL(PTIMER, 3)) {
        TELL(TAB
, "One of the unseen voices laughs harshly.", CR);
        return true;
    } else if(isEQUAL(PTIMER, 4)) {
        UNMAKE(QUEEN, NODESC);
        TELL(TAB, YOU_HEAR
, "a chorus of unpleasant giggles. \"I'll be in my garden,\" calls one of the voices.", CR);
        return true;
    } else if(isEQUAL(PTIMER, 5)) {
        WINDOW(SHOWING_ROOM);
        TELL(TAB
, "A whirlpool of twinkling light forms in ", THE(GARDEN
), ". Something is beginning to materialize!", CR);
        if((isIN(DACT, HERE)
  &&  isIS(DACT, LIVING)
  &&  !(isIS(DACT, SLEEPING)))) {
            MAKE(DACT, SEEN);
            TELL(TAB, CTHE(DACT
), " beats its wings restlessly.", CR);
        }
        if((isVISIBLE(MINX)
  &&  isIS(MINX, LIVING)
  &&  !(isIS(MINX, SLEEPING)))) {
            MAKE(MINX, SEEN);
            TELL(TAB, CTHE(MINX
), " whimpers fearfully as ", THE(GARDEN), " brightens");
            if(!(isIN(MINX, BUSH))) {
                _X = LOC(MINX);
                MOVE(MINX, BUSH);
                WINDOW(SHOWING_ALL);
                TELL(". Before you can stop her, she ");
                if(!(isEQUAL(_X, IN_GARDEN))) {
                    TELL("leaps away from ");
                    if(isEQUAL(_X, PLAYER)) {
                        TELL("your grasp");
                    } else {
                        TELL(THE(_X));
                    }
                    TELL(", ");
                }
                TELL("streaks across the lawn and disappears behind ", THE(BUSH));
            }
            TELL(PERIOD);
        }
        return true;
    } else if(isEQUAL(PTIMER, 6)) {
        WINDOW(SHOWING_ROOM);
        MOVE(QUEEN, HERE);
        SEE_CHARACTER(QUEEN);
        TELL(TAB
, "The twinkling whirl resolves into a furry creature. Her face is turned away at the moment, but there's a flat tail sticking out from under her long, red gown.", CR);
        isTOPPLED(QUEEN);
        return true;
    } else if(isEQUAL(PTIMER, 7)) {
        WINDOW(SHOWING_ROOM);
        PUTP(QUEEN, "SDESC", 0);
        TELL(TAB
, "The furry creature turns around, revealing her dark, beady eyes and fleshy bill. She's a platypus!", CR);
        if((isIN(DACT, HERE)
  ||  !(isIN(PLAYER, BUSH)))) {
            QUEEN_SEES_YOU();
        }
        return true;
    } else if(isEQUAL(PTIMER, 8)) {
        MOVE(JAR, QUEEN);
        MAKE(BROG, CONTAINER);
        MAKE(BROG, OPENABLE);
        MAKE(BROG, OPENED);
        isREPLACE_SYN(BROG, "ZZZP", "COMPARTMENT");
        isREPLACE_ADJ(BROG, "ZZZP", "SECRET");
        WINDOW(SHOWING_ROOM);
        TELL(TAB, CTHE(QUEEN), " steps over to ", THE(BROG
), ", glancing around to be sure she is alone. Then she opens a secret compartment and pulls out ", A(JAR), PERIOD);
        return true;
    } else if(isEQUAL(PTIMER, 9)) {
        isCREATE_MIRROR(MIRROR0);
        TELL(TAB, CTHE(QUEEN
), " opens the jar, takes out a circlet and blows a silver bubble. You watch as the bubble flattens into a round mirror, rotating slowly on its edge.", CR);
        return true;
    } else if(isEQUAL(PTIMER, 10)) {
        TELL(TAB, CTHE(QUEEN
), ` stops the spinning mirror and turns it until it faces her. Gazing into it she whispers,

 \"Mirror, mirror in the air,
  Who in Quendor is most fair?\"`, CR);
        return true;
    } else if(isEQUAL(PTIMER, 11)) {
        TELL(`  The floating mirror shimmers, and a hollow voice says,

 \"Your Highness once was fair, 'tis true.
  But Morning-Star is `);
        ITALICIZE("woo woo woo");
        TELL("!\"", CR);
        return true;
    } else if(isEQUAL(PTIMER, 12)) {
        UNMAKE(BROG, OPENED);
        MOVE(JAR, BROG);
        DESTROY_MIRROR(MIRROR0);
        DEQUEUE(I_MIRRORS);
        REMOVE(QUEEN);
        DEQUEUE(I_QUEEN);
        PTIMER = 0;
        P_HER_OBJECT = NOT_HERE_OBJECT;
        TELL("  \"Liar!\" cries ", THE(QUEEN
), ", bursting the mirror with an angry swipe. She stows ", THE(JAR
), " back in ", THE(BROG
), ", blows a silver whistle and dissolves in a whirlpool of color.", CR);
        return true;
    } else {
        return false;
    }
}

function I_DUST(_INDENT) {
    let _V;
    _V = isVISIBLE(DUST);
    if(isASSIGNED(_INDENT)) {
        
    } else if(isIS(DUST, SEEN)) {
        UNMAKE(DUST, SEEN);
        return false;
    } else {
        TELL(TAB);
    }
    MAKE(DUST, SEEN);
    if(isEQUAL(BUNNIES, 1)) {
        P_THEM_OBJECT = DUST;
        PUTP(DUST, "SDESC", 0);
        MAKE(DUST, PLURAL);
        if(isT(_V)) {
            TELL("With an ominous ");
            HLIGHT(H_ITALIC);
            TELL("poof");
            HLIGHT(H_NORMAL);
            TELL(", the dust bunny divides itself in two.", CR);
        }
    } else if(isT(_V)) {
        HLIGHT(H_ITALIC);
        TELL("Poof");
        HLIGHT(H_NORMAL);
        TELL(". ", CTHE(DUST), PICK_NEXT(BUNNY_SPLITS), PERIOD);
    }
    MORE_BUNNIES();
    return _V;
}

function MORE_BUNNIES() {
    let _X;
    if(BUNNIES > BMAX) {
        return true;
    } else if(isEQUAL(BUNNIES, BMAX)) {
        ++BUNNIES
    } else {
        _X = BUNNIES;
        BUNNIES = (OBUNNIES + BUNNIES);
        OBUNNIES = _X;
    }
    WINDOW(SHOWING_ROOM);
    return false;
}

function I_MARE_SEES() {
    DEQUEUE(I_MARE_SEES);
    if(!(isHERE(IN_SPLENDOR))) {
        return false;
    }
    TELL(TAB);
    UNICORNS_FLEE("as you stand gawking at the landscape");
    return true;
}

function I_ARREST(_INDENT) {
    let _RM, _OBJ, _NXT;
    DEQUEUE(I_ARREST);
    if(!(isHERE(IN_SPLENDOR))) {
        return false;
    }
    if(!(isASSIGNED(_INDENT))) {
        TELL(TAB, XTHE);
    } else {
        TELL("As you step across the glade, the ");
    }
    TELL(`stillness is broken by the rumble of approaching hooves. Before you can think or move, you find yourself enclosed by a dozen sharp horns, each backed by a unicorn in full military regalia.
  A magnificent stallion regards you with calm authority. \"You`);
    if(isIS(HERD, SEEN)) {
        TELL("r fate is sealed");
    } else {
        TELL(" will find no welcome here");
    }
    TELL(", earth-dweller,\" whispers a stern voice in your mind. \"");
    if(isIS(HERD, SEEN)) {
        TELL("The injustice that drove us to this Plane is now yours. Forever.\""
, CR, TAB
, "A painful metal bit is forced into your mouth, and a wagonload of overweight, aristocratic unicorns is attached. The rest of your life is spent hauling this laughing burden in a small circle, with infrequent stops for dirty water and oats");
        JIGS_UP();
        return true;
    }

    MAKE(HERD, SEEN);
    TELL("Our children must never know the pain we suffered at the hands of Men. Return to your people now, and describe the fate awaiting any who dares to violate our solitude again.\"", CR, TAB
, "A lifetime of humiliating drudgery passes before your eyes. You cry out with pain and heartache as you haul wagons full of overweight aristocrats, standing silent and powerless as cruel taskmasters whip you over and over again...");
    CARRIAGE_RETURNS();
    SAFE_VEHICLE_EXIT();
    _RM = META_LOC(CHEST);
    if((_OBJ = isFIRST(IN_SPLENDOR))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(isEQUAL(_OBJ, WINNER)) {
                
            } else if(isIS(_OBJ, TAKEABLE)) {
                MOVE(_OBJ, _RM);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    P_WALK_DIR = null;
    GOTO(_RM);
    return true;
}

var CHOKE/*NUMBER*/ = 0;

function I_STRANGLE() {
    let _X;
    _X = STATS[ENDURANCE];
    TELL(TAB);
    if(CHOKE < _X) {
        TELL(PICK_NEXT(STRANGLES));
        if((_X / CHOKE) < 2) {
            TELL(". Your endurance won't last much longer");
        }
        TELL("!", CR);
        UPDATE_STAT((0 - CHOKE));
        return true;
    }
    UPDATE_STAT((0 - _X));
    TELL("The choking fingers drain your endurance to its limit. As your consciousness sinks into oblivion, you feel ", THE(SKELETON), " draping ", B("SOMETHING"
), " around your neck");
    JIGS_UP();
    return true;
}

function isNOLUCK() {
    let _CNT, _LEN, _OBJ;
    _LEN = LUCKY_OBJECTS[0];
    while(true) {
        _OBJ = toOBJECT(LUCKY_OBJECTS[_LEN]);
        if((isIN(_OBJ, PLAYER)
  &&  !(isIS(_OBJ, NEUTRALIZED)))) {
            _CNT = GETP(_OBJ, "DNUM");
            if(--_CNT < 1) {
                VANISH(_OBJ);
                TELL(TAB);
                ITALICIZE("Poof");
                TELL("! ", CTHE(_OBJ
), " is consumed in a silent flash of green.", CR);
                return false;
            }
            PUTP(_OBJ, "DNUM", _CNT);
            TELL(TAB, CYOUR, D(_OBJ), " flickers green");
            if(isEQUAL(_CNT, 1)) {
                TELL(" again, less brightly than before");
            }
            PRINT(PERIOD);
            return false;
        }
        if(--_LEN < 1) {
            return true;
        }
    }
}

var GRUE_KILLS/*NUMBER*/ = 0;

function I_GRUE() {
    let _SEE, _L, _DIR, _TBL, _DEST, _DAMAGE, _X;
    if(isT(isLIT)) {
        return false;
    } else if(isHERE(IN_LAIR)) {
        return false;
    } else if(!(isGRUE_ROOM())) {
        return false;
    }
    _SEE = isWEARING_MAGIC(HELM);
    if(isIN(GRUE, HERE)) {
        if(GETP(GRUE, "ENDURANCE") < 1) {
            if(++GRUE_KILLS > 2) {
                DEQUEUE(I_GRUE);
            }
            TELL(TAB);
            if(isT(_SEE)) {
                TELL(CTHE(GRUE), " retreats");
            } else {
                TELL(YOU_HEAR, B("SOMETHING"), " retreat");
            }
            TELL(" into the darkness.", CR);
            UPDATE_STAT(GETP(GRUE, "VALUE"), EXPERIENCE, true);
            EXUENT_MONSTER(GRUE);
            PUTP(GRUE, "ENDURANCE", GETP(GRUE, "EMAX"));
            return true;
        }
        isNEXT_ENDURANCE(GRUE);
        TELL(TAB);
        if(isT(_SEE)) {
            TELL(CTHE(GRUE));
        } else {
            TELL("Something");
        }
        TELL(" strikes out at you");
        _DAMAGE = isMONSTER_STRIKES(GRUE);
        if(!(_DAMAGE)) {
            TELL(", but misses.", CR);
            return true;
        } else if(!(STATIC)) {
            TELL(". Ouch!", CR);
        } else {
            TELL(PERIOD);
        }
        UPDATE_STAT(isMSPARK(GRUE, _DAMAGE));
        return true;
    } else if(isIS(GRUE, SURPRISED)) {
        UNMAKE(GRUE, SURPRISED);
        return false;
    }
    MOVE(GRUE, HERE);
    SEE_MONSTER(GRUE);
    if(isT(_SEE)) {
        WINDOW(SHOWING_ROOM);
    }
    TELL(TAB);
    if(isT(_SEE)) {
        TELL("A presence");
    } else {
        TELL("Something");
    }
    TELL(" lurks into the passage.", CR);
    return true;
}

function I_WIGHT() {
    let _DAMAGE;
    if(isHERE(ON_TRAIL)) {
        if(GETP(WIGHT, "ENDURANCE") < 1) {
            TELL(TAB);
            if(!(isIS(WIGHT, SLEEPING))) {
                TELL("Battered and confused, ", THE(WIGHT
), " backs over the edge of the cliff, shrieks and tumbles out of sight.", CR);
            }
            KILL_MONSTER(WIGHT);
            MOVE(DIAMOND, ON_TRAIL);
            P_IT_OBJECT = DIAMOND;
            TELL(TAB, "Something lands at your feet with a ");
            ITALICIZE("plop");
            TELL(PERIOD);
            return true;
        } else if(isIS(WIGHT, SURPRISED)) {
            SEE_MONSTER(WIGHT);
            if(!(isIS(WIGHT, SLEEPING))) {
                TELL(TAB, CTHE(WIGHT
), " whirls to face you.", CR);
                isTOPPLED(WIGHT);
                return true;
            }
        }
        if(isSTILL_SLEEPING(WIGHT)) {
            return true;
        }
        isNEXT_ENDURANCE(WIGHT);
        _DAMAGE = isMONSTER_STRIKES(WIGHT);
        TELL(TAB, CTHE(WIGHT));
        if(isT(_DAMAGE)) {
            TELL(" claws at you viciously.");
            if(!(STATIC)) {
                TELL(" Ouch!");
            }
            CRLF();
            UPDATE_STAT(isMSPARK(WIGHT, _DAMAGE));
            return true;
        }
        TELL(" strikes out at you, but misses.", CR);
        return true;
    } else {
        return false;
    }
}

var LAVA_TIMER/*NUMBER*/ = 0;

function I_LAVA() {
    if(--LAVA_TIMER < 1) {
        if(isHERE(FOREST_EDGE, ON_TRAIL, ON_PEAK, IN_CABIN)) {
            CASCADE();
            return true;
        }
        REMOVE(PLUME);
        LAVA_TIMER = 0;
        DEQUEUE(I_LAVA);
        MOVE(MAGMA_GLOW, IN_THRIFF);
        MAGMA_TIMER = 4;
        QUEUE(I_MAGMA);
        EMPTY_ROOM(FOREST_EDGE);
        PUTP(FOREST_EDGE, "SDESC", 0);
        if(!(isHERE(IN_THRIFF))) {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB
, "A violent tremor wracks the earth and sends you sprawling. You bravely cover your eyes to await the tide of magma that will sweep you and Thriff into oblivion...|||||||The silence gets the better of your curiosity.", CR);
        return true;
    } else if(isEQUAL(LAVA_TIMER, 1)) {
        if(isHERE(ON_TRAIL, ON_PEAK, IN_CABIN)) {
            CASCADE();
            return true;
        }
        REMOVE(MAILBOX);
        PUTP(ON_TRAIL, "SOUTH", 0);
        PUTP(ON_TRAIL, "IN", 0);
        isREPLACE_GLOBAL(ON_TRAIL, CABIN, NULL);
        if(isIN(WIGHT, ON_TRAIL)) {
            REMOVE(WIGHT);
            DEQUEUE(I_WIGHT);
        }
        EMPTY_ROOM(ON_TRAIL);
        if(!(isHERE(FOREST_EDGE, IN_THRIFF))) {
            return false;
        }
        TELL(TAB, CTHE(GROUND), " trembles with seismic distress");
        if(isHERE(IN_THRIFF)) {
            TELL(PERIOD);
            return true;
        }
        TELL(" as a deadly torrent of lava sweeps down the western slope, only seconds away!", CR);
        return true;
    } else if(isEQUAL(LAVA_TIMER, 2)) {
        if(isHERE(ON_PEAK)) {
            CASCADE();
            return true;
        }
        EMPTY_ROOM(ON_PEAK);
        if(!(isHERE(ON_TRAIL, FOREST_EDGE, IN_THRIFF, IN_CABIN))) {
            return false;
        }
        TELL(TAB, "Powerful shock waves rock the mountainside");
        if(isHERE(IN_CABIN)) {
            TELL(", and the entire cabin shudders.", CR);
            return true;
        } else if(isHERE(IN_THRIFF, FOREST_EDGE)) {
            TELL(PERIOD);
            return true;
        }
        TELL(" as a red-hot wall of liquid rock roars down the trail, only seconds behind you!", CR);
        return true;
    } else {
        return false;
    }
}

function CASCADE(_STR) {
    if(isASSIGNED(_STR)) {
        TELL("As you ", _STR, " the lava, a cascade of it ");
    } else {
        TELL(TAB, "A cascade of lava ");
    }
    if(isHERE(IN_CABIN)) {
        TELL("buries ", THE(CABIN));
    } else {
        if(!(isHERE(ON_PEAK))) {
            TELL("roars down the mountainside and ");
        }
        TELL("knocks you off your feet, burying you");
    }
    TELL(" instantly under tons of molten rock");
    if(isWEARING_MAGIC(RING)) {
        TELL("! Your magic ring miraculously shields you from the volcanic heat, but not from the inconvenience of having nothing to breathe");
    }
    JIGS_UP();
    return true;
}

function EMPTY_ROOM(_RM) {
    let _OBJ, _NXT;
    if((_OBJ = isFIRST(_RM))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, TAKEABLE)) {
                REMOVE(_OBJ);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    isREPLACE_GLOBAL(_RM, SNOW, LAVA);
    isREPLACE_GLOBAL(_RM, GLYPH, NULL);
    return false;
}

var MAGMA_TIMER/*NUMBER*/ = 0;

VOC("CRUST", NOUN);

function I_MAGMA() {
    let _TBL, _X;
    _TBL = GETPT(MAGMA_GLOW, "ADJECTIVE");
    if(--MAGMA_TIMER < 1) {
        MAGMA_TIMER = 0;
        DEQUEUE(I_MAGMA);
        REMOVE(MAGMA_GLOW);
        isREPLACE_SYN(LAVA, "ZZZP", "CRUST");
        if(isHERE(IN_THRIFF, FOREST_EDGE, ON_TRAIL, ON_PEAK)) {
            WINDOW(SHOWING_ROOM);
            TELL(TAB, "The red glow ");
            if(isHERE(IN_THRIFF)) {
                TELL("from the south slowly fades from view");
            } else {
                TELL("of the lava fades, leaving a hard crust underfoot");
            }
            PRINT(PERIOD);
        }
        if(isGLOBAL_IN(FOREST_EDGE, GLYPH)) {
            THRIFF_WON = true;
            DEQUEUE(I_CLERIC);
            MAKE(CLERIC, LIVING);
            CLERIC_SCRIPT = 0;
            UNMAKE(CLERIC, SEEN);
            QUEUE(I_THRIFF_WIN);
            QUEUE(I_UNHAPPY_XTREES);
            MAKE(XTREES, SEEN);
            MOVE(RELIQUARY, CLERIC);
            if(isHERE(IN_CHAPEL)) {
                WINDOW(SHOWING_ROOM);
                TELL(TAB
, "A messenger nymph appears above ", THE(ALTAR
), ". \"Hooray!\" she cries. \"");
                PRINT_TABLE(CHARNAME);
                TELL(" outfoxed ", THE(XTREES), "!\"", CR);
                return true;
            }
            UNMAKE(CLERIC, NODESC);
            _X = FOREST_EDGE;
            if(isHERE(IN_THRIFF)) {
                _X = HERE;
            }
            MOVE(CLERIC, _X);
            MOVE(CONGREG, _X);
            if(isEQUAL(HERE, _X)) {
                WINDOW(SHOWING_ROOM);
                TELL(TAB, "A cheering crowd");
                if(isHERE(IN_THRIFF)) {
                    TELL(" streams out of "
, THE(CHAPEL));
                } else {
                    PRINT(" appears from the ");
                    TELL("village");
                }
                TELL(", led by ", THE(CLERIC), PERIOD);
                return true;
            }
        }

        if(isHERE(FOREST_EDGE)) {
            SAY_XTREES();
            TELL(" test the edges of the clearing with their roots");
            if((isIS(BFLY, MUNGED)
  &&  isIS(BFLY, LIVING)
  &&  (isIN(BFLY, PLAYER)
  ||  isIN(BFLY, HERE)))) {
                TELL(", but still appear reluctant to approach you.", CR);
                return true;
            }
            TELL(". Finding no Glyphs of Warding or other inconveniences, they elect to ");
            XTREES_EAT_YOU(true);
        }

        return true;
    } else if(isEQUAL(MAGMA_TIMER, 1)) {
        _TBL[0] = "RED";
        if(isHERE(IN_THRIFF)) {
            WINDOW(SHOWING_ROOM);
            TELL(TAB, "The southern ");
            PRINT("glow fades from orange to dull red.|");
            return true;
        } else if(!(isHERE(FOREST_EDGE, ON_TRAIL, ON_PEAK))) {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB, "The lava's ");
        PRINT("glow fades from orange to dull red.|");
        if(isHERE(FOREST_EDGE)) {
            SAY_XTREES();
            TELL(" shuffle a bit closer to the clearing's edge.", CR);
        }
        return true;
    } else if(isEQUAL(MAGMA_TIMER, 2)) {
        _TBL[0] = "ORANGE";
        if(isHERE(IN_THRIFF)) {
            WINDOW(SHOWING_ROOM);
            TELL(TAB
, "You watch as the southern glow fades from yellow to orange.", CR);
            return true;
        } else if(!(isHERE(FOREST_EDGE, ON_TRAIL, ON_PEAK))) {
            return false;
        }
        WINDOW(SHOWING_ROOM);
        TELL(TAB
, "The lava's glow fades from yellow to orange as it cools.", CR);
        if(isHERE(FOREST_EDGE)) {
            SAY_XTREES();
            TELL(" are keeping well away from the clearing's edge.", CR);
        }
        return true;
    } else {
        return false;
    }
}

function SAY_XTREES() {
    MAKE(XTREES, SEEN);
    TELL(TAB, CTHE(XTREES));
    return true;
}

function I_XTREES() {
    let _X, _C;
    if(isGLOBAL_IN(FOREST_EDGE, GLYPH)) {
        if(!(isHERE(FOREST_EDGE))) {
            return false;
        } else if(isIS(XTREES, SEEN)) {
            UNMAKE(XTREES, SEEN);
            return false;
        } else if(PROB(50)) {
            return false;
        }
        SAY_XTREES();
        if(PROB(50)) {
            _X = PICK_NEXT(CAROLS);
            TELL(PICK_NEXT(HOW_SINGS), _X, PERQ);
            return true;
        }
        TELL(PICK_NEXT(XTREE_DOINGS), PERIOD);
        return true;
    } else if(isT(MAGMA_TIMER)) {
        return false;
    } else if((isHERE(FOREST_EDGE, IN_THRIFF)
  &&  isIS(BFLY, MUNGED)
  &&  isIS(BFLY, LIVING)
  &&  (isIN(BFLY, PLAYER)
  ||  isIN(BFLY, HERE)))) {
        SAY_XTREES();
        TELL(" shuffle nervously at the edge of the ");
        if(isGLOBAL_IN(SNOW, HERE)) {
            TELL(B("CLEARING"));
        } else {
            TELL(B("LAVA"));
        }
        TELL(". They");
        PRINT(" seem unwilling to approach you.|");
        return true;
    } else if(!(isIS(FOREST_EDGE, MUNGED))) {
        if(isHERE(FOREST_EDGE)) {
            XTREES_EAT_YOU();
            return true;
        }
        MAKE(FOREST_EDGE, MUNGED);
        isNEW_EXIT(ON_TRAIL, "EAST", FCONNECT, XTREES_BLOCK);
        isNEW_EXIT(ON_TRAIL, "DOWN", FCONNECT, XTREES_BLOCK);
        isNEW_EXIT(IN_THRIFF, "SOUTH", FCONNECT, XTREES_BLOCK);
        isNEW_EXIT(IN_THRIFF, "UP", FCONNECT, XTREES_BLOCK);
        isREPLACE_GLOBAL(ON_TRAIL, NULL, XTREES);
        isREPLACE_GLOBAL(IN_THRIFF, NULL, XTREES);
        if(isHERE(IN_THRIFF, IN_CHAPEL, ON_TRAIL)) {
            XTREES_APPEAR();
            return true;
        }
        return false;
    } else if(!(isIS(IN_THRIFF, MUNGED))) {
        if(isHERE(IN_THRIFF, IN_CHAPEL)) {
            XTREES_EAT_YOU();
            return true;
        }
        MAKE(IN_THRIFF, MUNGED);
        isNEW_EXIT(IN_PASTURE, "SE", FCONNECT, XTREES_BLOCK);
        isNEW_EXIT(AT_FALLS, "SW", FCONNECT, XTREES_BLOCK);
        isREPLACE_GLOBAL(IN_PASTURE, NULL, XTREES);
        isREPLACE_GLOBAL(AT_FALLS, NULL, XTREES);
        if(isHERE(IN_PASTURE, AT_FALLS)) {
            XTREES_APPEAR();
            return true;
        }
        return false;
    } else {
        return false;
    }
}

function XTREES_BLOCK() {
    if((isIN(BFLY, PLAYER)
  &&  isIS(BFLY, MUNGED))) {
        TELL(CTHE(XTREES
), " fidget nervously as you approach, but refuse to stand aside.", CR);
        return false;
    }
    PRINT("Your path is hopelessly blocked by ");
    TELL(XTREES, PERIOD);
    return false;
}

function XTREES_EAT_YOU(_X) {
    if(!(isASSIGNED(_X))) {
        SAY_XTREES();
    }
    TELL(" continue their delayed migration into Thriff, cheerfully trampling everything in their path. This includes you");
    JIGS_UP();
    return true;
}

function XTREES_APPEAR() {
    let _X;
    WINDOW(SHOWING_ROOM);
    P_THEM_OBJECT = XTREES;
    TELL(TAB);
    if(isHERE(IN_CHAPEL)) {
        TELL(YOU_HEAR, "a");
        PRINT("n ominously cheerful rustling sound ");
        TELL("outside.", CR);
        return true;
    }
    TELL("A");
    PRINT("n ominously cheerful rustling sound ");
    TELL("draws your attention to the ");
    _X = "SOUTH";
    if(isHERE(IN_PASTURE)) {
        _X = "SOUTHEAST";
    } else if(isHERE(AT_FALLS)) {
        _X = "SOUTHWEST";
    } else if(isHERE(ON_TRAIL)) {
        _X = "EAST";
    }
    TELL(B(_X), ", where a solid wall of ", XTREES
, " has completely choked the trail.", CR);
    return true;
}

function I_UNHAPPY_XTREES() {
    if(!(isHERE(FOREST_EDGE))) {
        return false;
    } else if(isIS(XTREES, SEEN)) {
        UNMAKE(XTREES, SEEN);
        return false;
    } else if(PROB(50)) {
        return false;
    }
    SAY_XTREES();
    TELL(PICK_NEXT(SAD_TREES), PERIOD);
    return true;
}

function I_HOUSEFALL() {
    if(!(isPLAIN_ROOM())) {
        return false;
    } else if(isIS(FARM, NODESC)) {
        UNMAKE(FARM, NODESC);
        return false;
    }
    DEQUEUE(I_HOUSEFALL);
    UNMAKE(FARMHOUSE, NODESC);
    if(isT(FARM_ROOM)) {
        DROP_FARM();
    }
    MAKE(CORBIES, SEEN);
    TELL("  A movement overhead catches your eye", PTAB
, "Oh, my. A small farmhouse is falling out of the clouds! You ");
    if(isHERE(FARM_ROOM)) {
        P_WALK_DIR = null;
        _OLD_HERE = null;
        WINDOW(SHOWING_ROOM);
        P_IT_OBJECT = FARMHOUSE;
        TELL("dive out of the way just in time to avoid ");
        LUMBER();
        TELL(PERIOD);
        return true;
    }
    TELL("watch it spin as it tumbles earthward, and hear ");
    LUMBER();
    TELL(" somewhere nearby.", CR);
    return true;
}

function LUMBER() {
    TELL(LTHE);
    ITALICIZE("crunch");
    TELL(" of splintering lumber");
    return false;
}

function DROP_FARM() {
    UNMAKE(FARM, NODESC);
    MOVE(FARM, FARM_ROOM);
    PUTP(FARM_ROOM, "SDESC", DESCRIBE_FARM_ROOM);
    isREPLACE_GLOBAL(FARM_ROOM, NULL, FARM_DOOR);
    isREPLACE_GLOBAL(FARM_ROOM, NULL, FARM_WINDOW);
    isNEW_EXIT(IN_FARM, "NORTH", (DCONNECT + 1 + MARKBIT)
, FARM_ROOM, FARM_DOOR);
    isNEW_EXIT(IN_FARM, "OUT", (DCONNECT + 1 + MARKBIT)
, FARM_ROOM, FARM_DOOR);
    isNEW_EXIT(FARM_ROOM, "SOUTH", (DCONNECT + 1 + MARKBIT)
, IN_FARM, FARM_DOOR);
    isNEW_EXIT(FARM_ROOM, "IN", (DCONNECT + 1 + MARKBIT)
, IN_FARM, FARM_DOOR);
    return false;
}

function I_IQ() {
    WINDOW(SHOWING_ALL);
    TELL(TAB
, "Your forehead tingles oddly for a moment.", CR);
    UPDATE_STAT(20, INTELLIGENCE, true);
    return true;
}

function I_HEAL() {
    let _STAT=0, _MAX, _OLD;
    TELL(TAB
, "Your body is flooded with an indescribable sense of well-being.", CR);
    while(true) {
        _OLD = STATS[_STAT];
        _MAX = MAXSTATS[_STAT];
        if(_MAX > _OLD) {
            UPDATE_STAT((_MAX - _OLD), _STAT);
        } else if(isEQUAL(_MAX, _OLD)) {
            UPDATE_STAT(5, _STAT, true);
        }
        if(++_STAT > STRENGTH) {
            break;
        }
    }
    BMODE_OFF();
    return true;
}

function I_MIGHT() {
    let _MAX, _OLD;
    TELL(TAB
, "You feel a surge of tension in your arms and shoulders.", CR);
    _OLD = STATS[STRENGTH];
    _MAX = MAXSTATS[STRENGTH];
    if(_MAX > _OLD) {
        UPDATE_STAT((_MAX - _OLD), STRENGTH);
    } else if(isEQUAL(_MAX, _OLD)) {
        UPDATE_STAT(16, STRENGTH, true);
    }
    return true;
}

function I_FORGET() {
    let _ANY=0, _OBJ, _LEN;
    UNMAKE(GLYPH, SEEN);
    if((_OBJ = isFIRST(ROOMS))) {
        while(true) {
            UNMAKE(_OBJ, VIEWED);
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    WINDOW(SHOWING_ALL);
    P_WALK_DIR = null;
    OLD_HERE = null;
    _LEN = MAGIC_ITEMS[0];
    while(true) {
        _OBJ = toOBJECT(MAGIC_ITEMS[_LEN]);
        if(isIS(_OBJ, IDENTIFIED)) {
            ++_ANY
            UNMAKE(_OBJ, IDENTIFIED);
            UNMAKE(_OBJ, PROPER);
        }
        if(--_LEN < 1) {
            break;
        }
    }
    TELL(TAB, "An uneasy feeling creeps into your soul.", CR);
    return true;
}

function I_DEATH() {
    TELL(TAB
, "A sickening bile rises in your throat, and sweat breaks out on your forehead as your pulse races out of control. Moments later, you experience the combined effects of coronary arrest, catastrophic respiratory collapse and rickets");
    JIGS_UP();
    return true;
}

function I_CAKE() {
    if(isIN(CAKE, IN_GURTH)) {
        REMOVE(CAKE);
        if(isHERE(IN_GURTH)) {
            WINDOW(SHOWING_ROOM);
            P_IT_OBJECT = NOT_HERE_OBJECT;
            TELL(TAB
, "An alley cat races between your legs, snatches ", THE(CAKE), " and");
            PRINT(" disappears into the ");
            TELL("crowd.", CR);
            return true;
        }
    }
    return false;
}

var QUAKE_TIMER/*NUMBER*/ = 0;

function I_QUAKE() {
    TELL(TAB);
    if(++QUAKE_TIMER > 4) {
        ENDING();
        return true;
    } else if(isEQUAL(QUAKE_TIMER, 4)) {
        TELL(CTHE(GROUND
), " heaves sharply to the right, and bits of broken rock shower down on your head. One more like that...", CR);
        return true;
    } else if(isEQUAL(QUAKE_TIMER, 3)) {
        TELL("The rumble grows to a roar as a mighty earthquake rocks the caverns to their very roots.", CR);
        return true;
    } else if(isEQUAL(QUAKE_TIMER, 2)) {
        TELL("Another tremor wracks the earth, and a deep, ominous rumble begins to swell around you.", CR);
        return true;
    } else {
        TELL(CTHE(GROUND
), " underfoot trembles for a moment.", CR);
        return true;
    }
}




















































