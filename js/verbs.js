`VERBS for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All Rights Reserved.`

function GOTO(_WHERE) {
    let _CR=0, _WHO, _X, _L, _OLIT;
    _OLIT = isLIT;
    _WHO = WINNER;
    _L = LOC(WINNER);
    if((isEQUAL(_L, SADDLE)
  &&  isIN(_L, DACT))) {
        _WHO = DACT;
    } else if((!(isEQUAL(_L, HERE))
  &&  isIS(_L, VEHICLE))) {
        if(isEQUAL(PERFORM("EXIT", _L), M_FATAL)) {
            P_WALK_DIR = null;
            return true;
        }
        P_WALK_DIR = null;
        OLD_HERE = null;
        ++_CR
    }
    _X = APPLY(GETP(HERE, "ACTION"), M_EXIT);
    if(isEQUAL(_X, M_FATAL)) {
        P_WALK_DIR = null;
        return true;
    } else if(isT(_X)) {
        if(isT(_CR)) {
            TELL(TAB);
        }
        ++_CR
    }
    /*if(isEQUAL(_WHERE, APLANE, DEATH)) {
        
    } else if(isT(EXIT_LINE)) {
        if(isT(_CR)) {
            TELL(TAB);
        }
        TELL(EXIT_LINE, CR);
        ++_CR
    }*/
    /*EXIT_LINE = null;*/
    if((isEQUAL(_WHO, WINNER)
  &&  isIN(DACT, HERE)
  &&  isIS(DACT, LIVING)
  &&  !(isIS(DACT, MUNGED))
  &&  !(isIS(DACT, SLEEPING)))) {
        REMOVE(DACT);
        if(!(isEQUAL(_WHERE, APLANE, DEATH))) {
            if(isT(_CR)) {
                TELL(TAB);
            }
            ++_CR
            TELL("A shadow passes over ", HEAD, " as you leave.", CR);
        }
    }
    if((isT(_CR)
  &&  isT(VERBOSITY))) {
        CRLF();
    }
    HERE = _WHERE;
    MOVE(_WHO, _WHERE);
    isLIT = isIS_LIT();
    if((!(_OLIT)
  &&  !(isLIT))) {
        if(isT(_CR)) {
            TELL(TAB);
        }
        TELL(CYOU, PICK_NEXT(DARK_WALKS));

        if(isGRUE_ROOM()) {
            
        } else if(PROB(50)) {
            TELL(", straight into the jaws of a deadly presence lurking in the darkness");
            JIGS_UP();
            return true;
        }
        PRINT(PERIOD);
        if(isT(VERBOSITY)) {
            CRLF();
        }
    }

    APPLY(GETP(HERE, "ACTION"), M_ENTERING);
    if(!(isEQUAL(HERE, _WHERE))) {
        return true;
    }
    if(!(isLIT)) {
        MARK_DIR();
    }
    LAST_PSEUDO_LOC = null;
    MAKE(PSEUDO_OBJECT, NOARTICLE);
    UNMAKE(PSEUDO_OBJECT, VOWEL);
    UNMAKE(PSEUDO_OBJECT, TRYTAKE);
    LAST_MONSTER = null;
    LAST_MONSTER_DIR = null;
    P_IT_OBJECT = NOT_HERE_OBJECT;
    P_THEM_OBJECT = NOT_HERE_OBJECT;
    P_HIM_OBJECT = NOT_HERE_OBJECT;
    P_HER_OBJECT = NOT_HERE_OBJECT;
    V_LOOK(null);
    APPLY(GETP(HERE, "ACTION"), M_ENTERED);
    return true;
}

function MARK_DIR(_DIR=P_WALK_DIR) {
    let _TBL, _WRD, _TYPE, _LEN;
    if(asDIRECTION(_DIR) < asDIRECTION("DOWN")) {
        return false;
    }
    _TBL = GETP(HERE, XPDIR_LIST[(0 - (asDIRECTION(_DIR) - asDIRECTION("NORTH")))]);
    if(!(_TBL)) {
        return false;
    }
    _WRD = _TBL[XTYPE];
    if(_WRD & MARKBIT) {
        return true;
    }
    _TYPE = MSB(_WRD);
    _LEN = (_WRD & 127);
    if((isEQUAL(_TYPE, CONNECT, SCONNECT, X_EXIT)
  ||  (isEQUAL(_TYPE, FCONNECT)
  &&  isT(_LEN))
  ||  (isEQUAL(_TYPE, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED)))) {
        _TBL[XTYPE] = (_WRD + MARKBIT);
        return true;
    }
    return false;
}

function DO_WALK(_DIR1, _DIR2=null, _DIR3=null) {
    let _X;
    P_WALK_DIR = _DIR1;
    _X = PERFORM("WALK", _DIR1);
    if(isEQUAL(_X, M_FATAL)) {
        return RFATAL();
    } else if(isT(_DIR2)) {
        CRLF();
        P_WALK_DIR = _DIR2;
        _X = PERFORM("WALK", _DIR2);
        if(isEQUAL(_X, M_FATAL)) {
            return RFATAL();
        } else if(isT(_DIR3)) {
            CRLF();
            P_WALK_DIR = _DIR3;
            _X = PERFORM("WALK", _DIR3);
        }
    }
    return _X;
}

function V_WALK() {
    let _TBL, _TYPE, _DATA;
    if(!(P_WALK_DIR)) {
        if(isT(PRSO)) {
            PRINT("[Presumably, you mean ");
            TELL("WALK TO ", THEO);
            PRINTC('\.'.charCodeAt(0));
            PRINT(BRACKET);
            PERFORM("WALK-TO", PRSO);
            return true;
        }
        V_WALK_AROUND();
        return true;
    } else if((isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        return NEXT_SKY();
    } else if(isHERE(APLANE)) {
        return NEXT_APLANE();
    }
    _TBL = GETP(HERE, PRSO);
    if(!(_TBL)) {
        NO_EXIT_THAT_WAY();
        return RFATAL();
    }
    _TYPE = MSB(_TBL[XTYPE]);

    if(isEQUAL(_TYPE, NO_EXIT, SHADOW_EXIT)) {
        NO_EXIT_THAT_WAY();
        return RFATAL();
    }

    if((!(isEQUAL(LAST_MONSTER, null, DORN, MAMA))
  &&  isIN(LAST_MONSTER, HERE)
  &&  isIN(WINNER, HERE)
  &&  isIS(LAST_MONSTER, LIVING)
  &&  !(isIS(LAST_MONSTER, SLEEPING))
  &&  isEQUAL(LAST_MONSTER_DIR, P_WALK_DIR)
  &&  isT(isLIT))) {
        TELL(CTHE(LAST_MONSTER), " block");
        if((!(isLIT)
  ||  !(isIS(LAST_MONSTER, PLURAL)))) {
            TELL("s");
        }
        TELL(" your path!", CR);
        return true;
    }

    _DATA = _TBL[XROOM];
    if(isEQUAL(_TYPE, CONNECT, X_EXIT)) {
        GOTO(_DATA);
        return true;
    } else if(isEQUAL(_TYPE, SORRY_EXIT)) {
        TELL(_DATA, CR);
        return RFATAL();
    } else /*if(isEQUAL(_TYPE, FSORRY_EXIT)) {
        _TYPE = _TBL[XDATA];
        if(!(_TYPE)) {
            _DATA = APPLY(_DATA);
            return RFATAL();
        }
        _DATA = APPLY(_DATA, _TYPE);
        return RFATAL();
    }*/if(isEQUAL(_TYPE, SCONNECT)) {
        TELL(_TBL[XDATA], CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
        GOTO(_DATA);
        return true;
    } else if(isEQUAL(_TYPE, FCONNECT)) {
        _DATA = APPLY(_DATA);
        if(isT(_DATA)) {
            GOTO(_DATA);
            return true;
        }
        return RFATAL();
    } else if(isEQUAL(_TYPE, DCONNECT)) {
        _TYPE = _TBL[XDATA];
        if(isIS(_TYPE, OPENED)) {
            GOTO(_DATA);
            return true;
        }
        ITS_CLOSED(_TYPE);
        return RFATAL();
    }
    /*SAY_ERROR("V-WALK");*/
    return RFATAL();
}

function NO_EXIT_THAT_WAY() {
    let _STR;
    _STR = GETP(HERE, "EXIT-STR");
    if(isEQUAL(P_WALK_DIR, null, "UP", "DOWN")) {
        
    } else if(isEQUAL(P_WALK_DIR, "IN", "OUT")) {
        
    } else if(isT(_STR)) {
        TELL(_STR, CR);
        return true;
    }
    TELL("There's no exit that way.", CR);
    return true;
}

function NEXT_OVER() {
    let _CNT=0, _DIR, _BITS, _TBL, _XTBL, _TYPE, _DATA;
    _XTBL = FLY_TABLES[ABOVE];
    _BITS = _XTBL[0];
    _DIR = I_NORTH;
    while(true) {
        _TBL = GETP(HERE, PDIR_LIST[_DIR]);
        _DATA = 0;
        if(_BITS & DBIT_LIST[_DIR]) {
            _TYPE = (CONNECT + 9 + MARKBIT);
            ++_CNT
            _DATA = _XTBL[_CNT];
            if((isHERE(IN_SKY)
  &&  isEQUAL(_DATA, OPLAIN))) {
                _TYPE = (FCONNECT + 9 + MARKBIT);
            } else if((isHERE(APLANE)
  &&  isEQUAL(_DATA, OCAVES))) {
                _TYPE = NO_EXIT;
                _DATA = 0;
            }
        } else if(isHERE(IN_SKY)) {
            _TYPE = (FCONNECT + 9 + MARKBIT);
        } else {
            _TYPE = NO_EXIT;
        }
        _TBL[XTYPE] = _TYPE;
        _TBL[XDATA] = _DATA;
        if(++_DIR > I_NW) {
            return false;
        }
    }
}

function NEXT_SKY() {
    let _DIR, _IDIR, _D1, _D2, _D3, _TBL, _DATA, _X;
    if((isT(DACT_SLEEP)
  ||  isIS(DACT, SLEEPING)
  ||  isIS(DACT, MUNGED)
  ||  !(isIS(DACT, LIVING)))) {
        TELL(CTHE(DACT), " is in no condition to move around.", CR);
        return RFATAL();
    }
    _DIR = P_WALK_DIR;
    P_WALK_DIR = null;
    if(isEQUAL(_DIR, "UP")) {
        if(isHERE(IN_SKY)) {
            TELL(CTHE(DACT
), " puffs and strains, but cannot lift you any higher.", CR);
            return RFATAL();
        }
        _X = GETP(HERE, "FNUM");
        if(!(_X)) {
            TELL(CANT, "fly here.", CR);
            return RFATAL();
        }
        TELL(CTHE(DACT));
        if((isHERE(IN_GARDEN)
  &&  isT(PTIMER))) {
            TELL(" cocks his head, hesitating.", CR);
            return true;
        }
        TELL(" spreads his leathery wings and ");
        if((isIN(PARASOL, PLAYER)
  &&  isIS(PARASOL, OPENED))) {
            TELL("tries to take off. But your open ", PARASOL
, " seems to be dragging him down.", CR);
            return true;
        }
        ABOVE = _X;
        PUTP(IN_SKY, "FNUM", ABOVE);
        TELL("rises into the sky.", CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
        GOTO(IN_SKY);
        CHECK_BREEZE();
        return true;
    } else if(isEQUAL(_DIR, "DOWN")) {
        if(!(isHERE(IN_SKY))) {
            TELL(CTHE(DACT), " is already on ", THE(GROUND
), PERIOD);
            return RFATAL();
        }
        _X = isDOWN_TO();
        if(!(_X)) {
            if(isEQUAL(ABOVE, OTHRIFF)) {
                TELL(CTHE(DACT
), " tries his best to land, but ", THE(GROUND
), " below is completely choked with ", XTREES, PERIOD);
            }
            return RFATAL();
        }
        TELL(CTHE(DACT), " glides earthward.", CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
        GOTO(_X);
        return true;
    } else if(isEQUAL(_DIR, null, "IN", "OUT")) {
        PUZZLED_DACT();
        return RFATAL();
    } else if(!(isHERE(IN_SKY))) {
        P_WALK_DIR = null;
        TELL("It's hard enough for a ", DACT
, " to walk, even when there's not an adventurer riding his back.", CR);
        return RFATAL();
    }

    _TBL = GETP(HERE, _DIR);
    _DATA = _TBL[XDATA];
    if(isEQUAL(_TBL[XTYPE], (FCONNECT + 9 + MARKBIT))) {
        TELL("The sky is filled with impenetrable ");
        if(isEQUAL(_DATA, OPLAIN)) {
            TELL("funnel ");
        }
        TELL("clouds in that ", INTDIR, PERIOD);
        return RFATAL();
    }

    /*"D1-D3 are IDIRs favored by the wind."*/

    _D1 = (WINDIR + 4);
    if(_D1 > I_NW) {
        _D1 = (_D1 - 8);
    }
    _D2 = (_D1 + 1);
    if(_D2 > I_NW) {
        _D2 = I_NORTH;
    }
    _D3 = (_D1 - 1);
    if(_D3 < I_NORTH) {
        _D3 = I_NW;
    }
    _IDIR = (0 - (asDIRECTION(_DIR) - asDIRECTION("NORTH")));
    if(isEQUAL(_IDIR, _D1, _D2, _D3)) {
        UNMAKE(BREEZE, SEEN);
        TELL(CTHE(DACT));
        TELL(" banks smoothly to the ", B(DIR_NAMES[_IDIR]), PERIOD);
        FLYOVER(_DATA);
        return true;
    }

    /*"Check for crosswinds."*/

    MAKE(BREEZE, SEEN);
    _D1 = (WINDIR - 2);
    if(_D1 < I_NORTH) {
        _D1 = (_D1 + 8);
    }
    if(isEQUAL(_IDIR, _D1)) {
        _D2 = (WINDIR - 3);
        if(_D2 < I_NORTH) {
            _D2 = (_D2 + 8);
        }
        return DO_CROSSWIND(_IDIR, _D2);
    }

    _D1 = (WINDIR + 2);
    if(_D1 > I_NW) {
        _D1 = (_D1 - 8);
    }
    if(isEQUAL(_IDIR, _D1)) {
        _D2 = (WINDIR + 3);
        if(_D2 > I_NW) {
            _D2 = (_D2 - 8);
        }
        return DO_CROSSWIND(_IDIR, _D2);
    }

    TELL(CTHE(DACT
), " does his best to fly into the wind, but fails.", CR);
    return RFATAL();
}

function DO_CROSSWIND(_IDIR, _D2) {
    let _TBL, _DATA;
    _TBL = GETP(IN_SKY, PDIR_LIST[_D2]);
    _DATA = _TBL[XDATA];
    if((isEQUAL(_DATA, 0, OPLAIN, OCAVES)
  ||  isEQUAL(_TBL[XTYPE], (FCONNECT + 9 + MARKBIT))
  ||  PROB(50))) {
        TELL("A strong crosswind prevents ", THE(DACT), " from flying that way.", CR);
        return RFATAL();
    }
    TELL(CTHE(DACT));
    TELL(" banks to the ", B(DIR_NAMES[_IDIR]
), ", but a strong crosswind blows him off course.", CR);
    FLYOVER(_DATA);
    return true;
}

function FLYOVER(_DATA) {
    ABOVE = _DATA;
    PUTP(IN_SKY, "FNUM", ABOVE);
    NEXT_OVER();
    RELOOK(true);
    CHECK_BREEZE();
    return true;
}

function CHECK_BREEZE() {
    if(((isEQUAL(ABOVE, OTHRIFF)
  &&  isEQUAL(WINDIR, I_EAST, I_SE, I_SOUTH))
  ||  (isEQUAL(ABOVE, OXROADS)
  &&  isEQUAL(WINDIR, I_NORTH, I_NE, I_EAST)))) {
        WINDIR = isNEXT_WINDIR();
        MAKE(BREEZE, SEEN);
        TELL(TAB, PICK_NEXT(WIND_ALERTS), PERIOD);
    }
    return false;
}

function NEXT_APLANE() {
    let _DIR, _TBL, _DATA, _NEW, _X;
    _DIR = P_WALK_DIR;
    P_WALK_DIR = null;
    _X = LOC(PLAYER);
    if((isEQUAL(_DIR, "UP", "DOWN")
  ||  isEQUAL(_DIR, "IN", "OUT"))) {
        TELL("Such ", INTDIR, "s have no meaning here.", CR);
        return RFATAL();
    } else if(isEQUAL(_X, APLANE)) {
        
    } else if(isIS(_X, VEHICLE)) {
        if(isEQUAL(PERFORM("EXIT", _X), M_FATAL)) {
            return RFATAL();
        }
        TELL(TAB);
    }
    _TBL = GETP(HERE, _DIR);
    _DATA = _TBL[XTYPE];
    if(isEQUAL(_DATA, NO_EXIT)) {
        TELL("The local geometry does not extend in that "
, INTDIR, PERIOD);
        return RFATAL();
    } else if(isEQUAL(ABOVE, OPLAIN)) {
        if(isT(IMPSAY)) {
            PERMISSION();
            return RFATAL();
        }
        EXIT_IMPS();
    }
    _NEW = _TBL[XDATA];
    if(isEQUAL(_NEW, OPLAIN)) {
        if(isIS(SHAPE, LIVING)) {
            if(!(isIN(SHAPE, APLANE))) {
                WINDOW(SHOWING_ROOM);
                MOVE(SHAPE, APLANE);
                LAST_MONSTER = SHAPE;
                LAST_MONSTER_DIR = null;
                P_IT_OBJECT = SHAPE;
                TELL("The space before you flexes in on itself, twists sideways and reopens into "
, A(SHAPE), ", stretched across your path like the skin of a drum.", CR);
                return RFATAL();
            }
            TELL(CTHE(SHAPE
), " stretches itself tighter across your path.", CR);
            return RFATAL();
        } else if(!(IMPSAY)) {
            KERBLAM();
            TELL("A bolt of ", B("LIGHTNING"
), " blocks your path.", CR);
            return RFATAL();
        }
    }
    if(isEQUAL(ABOVE, OACCARDI, OCITY, OMIZNIA)) {
        REMOVE(CURTAIN);
    }
    if(isIN(SHAPE, APLANE)) {
        REMOVE(SHAPE);
        LAST_MONSTER = null;
        P_IT_OBJECT = NOT_HERE_OBJECT;
        TELL(CTHE(SHAPE), " disincorporates as you retreat.", CR);
        if(isT(VERBOSITY)) {
            CRLF();
        }
    }
    ABOVE = _NEW;
    GET_APLANE_THINGS();
    NEXT_OVER();
    V_LOOK();
    return true;
}

function PERMISSION() {
    TELL("\"We didn't say you could leave yet,\" notes an Implementor dryly.", CR);
    return true;
}

function EXIT_IMPS() {
    REMOVE(IMPTAB);
    REMOVE(IMPS);
    DEQUEUE(I_IMPS);
    return false;
}

function GET_APLANE_THINGS() {
    if(isEQUAL(ABOVE, OCITY, OMIZNIA, OACCARDI)) {
        if(!(isIN(CURTAIN, APLANE))) {
            MOVE(CURTAIN, APLANE);
            UNMAKE(CURTAIN, NODESC);
        }
        return true;
    } else if((isEQUAL(ABOVE, OPLAIN)
  &&  !(isIN(IMPS, APLANE)))) {
        MOVE(IMPTAB, APLANE);
        MOVE(IMPS, APLANE);
        QUEUE(I_IMPS);
        return true;
    } else {
        return false;
    }
}

function isANY_TOUCHED(_TBL, _EXCLUDED) {
    let _LEN, _RM, _CNT;
    _LEN = _TBL[0];
    _CNT = 1;
    while(true) {
        _RM = toROOM(_TBL[_LEN]);
        if((isIS(_RM, TOUCHED)
  &&  (!(isASSIGNED(_EXCLUDED))
  ||  !(isIS(_RM, _EXCLUDED))))) {
            ++_CNT
            AUX_TABLE[_CNT] = _RM;
        }
        if(--_LEN < 1) {
            break;
        }
    }
    if(isEQUAL(_CNT, 1)) {
        return false;
    } else if(isEQUAL(_CNT, 2)) {
        return AUX_TABLE[2];
    }
    AUX_TABLE[0] = _CNT;
    AUX_TABLE[1] = 0;
    return PICK_ONE(AUX_TABLE);
}

function isDOWN_TO() {
    let _RM=0, _X;
    if(isEQUAL(ABOVE, ORUINS)) {
        _RM = isANY_TOUCHED(RUIN_ROOMS);
        if((!(_RM)
  &&  isSETUP_RUINS())) {
            _RM = isRANDOM_ROOM(RUIN_ROOMS);
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OBRIDGE)) {
        BRIDGE_DIR = 0;
        ZTOP = 1;
        ZBOT = 2;
        return ON_BRIDGE;
    } else if(isEQUAL(ABOVE, OFOREST)) {
        _RM = isANY_TOUCHED(FOREST_ROOMS);
        if((!(_RM)
  &&  isSETUP_FOREST())) {
            _RM = isRANDOM_ROOM(FOREST_ROOMS);
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OACCARDI)) {
        _RM = IN_ACCARDI;
        if((isIS(AT_GATE, TOUCHED)
  &&  PROB(50))) {
            _RM = AT_GATE;
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OCITY)) {
        _RM = IN_GURTH;
        if(isIS(AT_MAGICK, TOUCHED)) {
            _RM = AT_MAGICK;
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OSHORE)) {
        _RM = isANY_TOUCHED(SHORE_ROOMS);
        if(!(_RM)) {
            _RM = AT_LEDGE;
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OXROADS)) {
        return XROADS;
    } else if(isEQUAL(ABOVE, OPLAIN)) {
        return false;
    } else if(isEQUAL(ABOVE, OGRUBBO)) {
        return HILLTOP;
    } else if(isEQUAL(ABOVE, OCAVES)) {
        return IN_GARDEN;
    } else if(isEQUAL(ABOVE, OMOOR)) {
        _RM = isANY_TOUCHED(MOOR_ROOMS);
        if((!(_RM)
  &&  isSETUP_MOOR())) {
            _RM = isRANDOM_ROOM(MOOR_ROOMS);
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OJUNGLE)) {
        _RM = isANY_TOUCHED(JUNGLE_ROOMS);
        if((!(_RM)
  &&  isSETUP_JUNGLE())) {
            _RM = isRANDOM_ROOM(JUNGLE_ROOMS);
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OMIZNIA)) {
        _RM = isANY_TOUCHED(MIZNIA_ROOMS);
        if(!(_RM)) {
            _RM = IN_PORT;
        }
        return _RM;
    } else if(isEQUAL(ABOVE, OTHRIFF)) {
        _RM = IN_THRIFF;
        if(isIS(IN_THRIFF, MUNGED)) {
            _RM = IN_PASTURE;
        }
        return _RM;
    } else {
        /*SAY_ERROR("DOWN-TO?");*/
        return false;
    }
}

function isRANDOM_ROOM(_TBL) {
    let _OHERE, _RM, _X;
    _RM = toROOM(_TBL[RANDOM(_TBL[0])]);
    if(!(isIS(_RM, TOUCHED))) {
        _OHERE = HERE;
        HERE = _RM;
        _X = APPLY(GETP(_RM, "ACTION"), M_ENTERING);
        HERE = _OHERE;
        MAKE(_RM, TOUCHED);
    }
    return _RM;
}

function PRE_TAKE() {
    let _L, _LL, _WHO, _X, _X2;
    _L = LOC(PRSO);
    if(isT(_L)) {
        _LL = LOC(_L);
    }
    if((!(isLIT)
  &&  !(isEQUAL(WINNER, _L, _LL)))) {
        TOO_DARK();
        return true;
    } else if(isEQUAL(_L, GLOBAL_OBJECTS)) {
        IMPOSSIBLE();
        return true;
    } else if(isEQUAL(_L, WINNER)) {
        THIS_IS_IT(PRSO);
        TELL(ALREADY);
        if(isIS(PRSO, WORN)) {
            TELL(B("WEAR"));
        } else {
            TELL(B("HOLD"));
        }
        TELL("ing ", THEO, PERIOD);
        return true;
    } else if((!(isEQUAL(_L, null, BROG))
  &&  isIS(_L, CONTAINER)
  &&  isIS(_L, TRANSPARENT)
  &&  !(isIS(_L, OPENED)))) {
        CANT_REACH_INTO(_L);
        return true;
    } else if((!(isEQUAL(_LL, null, BROG))
  &&  isIS(_LL, CONTAINER)
  &&  isIS(_LL, TRANSPARENT)
  &&  !(isIS(_LL, OPENED)))) {
        CANT_REACH_INTO(_LL);
        return true;
    } else if(isT(PRSI)) {
        if(isPRSO(PRSI)) {
            _X = P_NAMW[0];
            _X2 = P_ADJW[0];
            if((isEQUAL(_X, P_NAMW[1])
  ||  isEQUAL(_X2, P_ADJW[1]))) {
                IMPOSSIBLE();
                return true;
            }
        } else if(isPRSI(ME)) {
            if(isEQUAL(WINNER, PLAYER)) {
                NOBODY_TO_ASK();
                return true;
            } else if(!(isEQUAL(_L, WINNER))) {
                TELL(CTHE(WINNER), " doesn't have "
, THEO, PERIOD);
                return true;
            } else {
                return false;
            }
        } else if(!(isEQUAL(_L, PRSI))) {
            if((isEQUAL(_L, ON_MCASE, ON_WCASE, ON_BCASE)
  &&  isPRSI(MCASE, WCASE, BCASE))) {
                return false;
            }
            TELL(CTHEO);
            ISNT_ARENT();
            ON_IN(PRSI);
            TELL(PERIOD);
            return true;
        }
        return false;
    } else if(isEQUAL(PRSO, LOC(WINNER))) {
        if(isPRSO(BUSH, POOL)) {
            return false;
        }
        TELL("Difficult. You're");
        ON_IN();
        TELL(PERIOD);
        return true;
    } else {
        return false;
    }
}

function CANT_REACH_INTO(_L) {
    TELL(CANT, "reach into ", THE(_L), ". It's closed.", CR);
    return true;
}

function V_TAKE() {
    let _L;
    _L = ITAKE();
    if(!(_L)) {
        return true;
    } else if(isSPARK(null)) {
        TELL(TAB);
    }
    if((isT(isP_MULT)
  ||  isEQUAL(_L, UNDERUG, UNDERPEW, LAMPHOUSE)
  ||  (isT(STATIC)
  &&  isIS(PRSO, FERRIC)))) {
        TAKEN();
        return true;
    } else if((isIS(_L, CONTAINER)
  ||  isIS(_L, SURFACE)
  ||  isIS(_L, PERSON)
  ||  isIS(_L, LIVING))) {
        TELL("You take ", THEO);
        OUT_OF_LOC(_L);
        TELL(PERIOD);
        return true;
    } else if(PROB(50)) {
        TAKEN();
        return true;
    }
    TELL(CYOU);
    if(isEQUAL(P_PRSA_WORD, "GRAB", "SEIZE", "SNATCH")) {
        TELL(B(P_PRSA_WORD));
    } else if(PROB(50)) {
        TELL("pick up");
    } else {
        TELL(B("TAKE"));
    }
    TELL(C(SP), THEO, PERIOD);
    return true;
}

function TAKEN() {
    TELL("Taken.", CR);
    return true;
}

function isFIRST_TAKE() {
    if((isVERB(V_TAKE)
  &&  !(isIS(PRSO, TOUCHED)))) {
        if(ITAKE()) {
            PUTP(PRSO, "DESCFCN", 0);
            TAKEN();
        }
        return true;
    } else {
        return false;
    }
}

function ITAKE(_VB=true) {
    let _CNT=0, _OBJ, _L, _X, _MAX;
    if((!(PRSO)
  ||  !((_L = LOC(PRSO))))) {
        CANT_SEE_ANY();
        return false;
    }
    THIS_IS_IT(PRSO);
    if(!(isIS(PRSO, TAKEABLE))) {
        if(isT(_VB)) {
            IMPOSSIBLE();
        }
        return false;
    } else if((isIS(_L, CONTAINER)
  &&  isIS(_L, OPENABLE)
  &&  !(isIS(_L, OPENED))
  &&  !(isEQUAL(_L, LOC(WINNER))))) {
        if(isT(_VB)) {
            YOUD_HAVE_TO("open", _L);
        }
        return false;
    }
    if((isEQUAL(WINNER, UNICORN)
  &&  (_X = isFIRST(WINNER)))) {
        MOVE(_X, LOC(WINNER));
        TELL("[putting down ", THE(_X), " first", BRACKET);
    } else if(isEQUAL(WINNER, PLAYER)) {
        if(isIN(ONION, PLAYER)) {
            if(isT(_VB)) {
                YOUD_HAVE_TO("put down", ONION);
            }
            return false;
        }
        _X = WEIGHT(PRSO);
        _MAX = (LOAD_ALLOWED + (STATS[STRENGTH] / 10));
        if((!(isIN(_L, WINNER))
  &&  (_X + WEIGHT(WINNER)) > _MAX)) {
            if(isT(_VB)) {
                if((_X = isFIRST(WINNER))) {
                    TELL("Your load is ");
                } else {
                    TELL(CTHEO);
                    IS_ARE();
                }
                TELL("too heavy.", CR);
            }
            return false;
        }

        if((_OBJ = isFIRST(WINNER))) {
            while(true) {
                if(isIS(_OBJ, NODESC)) {
                    
                } else if(isIS(_OBJ, WORN)) {
                    
                } else if(isIS(_OBJ, TAKEABLE)) {
                    ++_CNT
                }
                if(!((_OBJ = isNEXT(_OBJ)))) {
                    break;
                }
            }
        }
        _MAX = (FUMBLE_NUMBER + (STATS[DEXTERITY] / 10));
        if(_CNT > _MAX) {
            if(isT(_VB)) {
                TELL("Your hands are full.", CR);
            }
            return false;
        }
    }

    WINDOW(SHOWING_ALL);
    MAKE(PRSO, TOUCHED);
    UNMAKE(PRSO, NODESC);
    UNMAKE(PRSO, NOALL);
    MOVE(PRSO, WINNER);
    return _L;
}"So that .L an be analyzed."

"Return total weight of objects in THING."

function WEIGHT(_THING) {
    let _WT=0, _OBJ;
    if((_OBJ = isFIRST(_THING))) {
        while(true) {
            if((isEQUAL(_THING, WINNER)
  &&  isIS(_OBJ, WORN))) {
                ++_WT
            } else {
                _WT = (_WT + WEIGHT(_OBJ));
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    return (_WT + GETP(_THING, "SIZE"));
}

function V_WIELD() {
    let _OBJ;
    if(!(isIS(PRSO, TAKEABLE))) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIN(PRSO, WINNER))) {
        MUST_HOLD(PRSO);
        TELL(" before you can wield it.", CR);
        return true;
    } else if(isIS(PRSO, WORN)) {
        YOUD_HAVE_TO("take off", PRSO);
        return true;
    } else if(isIS(PRSO, WIELDED)) {
        TELL(ALREADY, "wielding ", THEO, PERIOD);
        return true;
    }
    if((_OBJ = isFIRST(WINNER))) {
        while(true) {
            if(isIS(_OBJ, WIELDED)) {
                UNMAKE(_OBJ, WIELDED);
                TELL("[setting aside ", THE(_OBJ), " first", BRACKET);
                break;
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    WINDOW(SHOWING_INV);
    MAKE(PRSO, WIELDED);
    TELL("You wield ", THEO, PERIOD);
    return true;
}

function V_UNWIELD() {
    if(!(isIS(PRSO, TAKEABLE))) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIS(PRSO, WIELDED))) {
        TELL("You're not wielding ", THEO, PERIOD);
        return true;
    }
    WINDOW(SHOWING_INV);
    UNMAKE(PRSO, WIELDED);
    TELL("You set aside ", THEO, PERIOD);
    return true;
}

function isSPARK(_INDENT=true, _OBJ=PRSO) {
    if(isNO_SPARK(_OBJ)) {
        return false;
    } else if(isT(_INDENT)) {
        TELL(TAB);
    }
    ITALICIZE("Snap");
    TELL("! You feel a ");
    if(STATIC > 2) {
        TELL("painful ");
    }
    TELL("spark as you touch ", THE(_OBJ), PERIOD);
    UPDATE_STAT((0 - STATIC));
    SPARK_OBJ(_OBJ);
    return true;
}

function isSPARK_TO(_OBJ1=PRSO, _OBJ2=PRSI) {
    if(isNO_SPARK(_OBJ2)) {
        return false;
    } else if(isEQUAL(_OBJ1, HANDS, FEET, ME)) {
        
    } else if(!(isIS(_OBJ1, FERRIC))) {
        return false;
    }
    SAY_SNAP();
    SAY_YOUR(_OBJ1);
    TELL(AND, THE(_OBJ2), "!", CR);
    if(!(isIS(_OBJ1, FERRIC))) {
        UPDATE_STAT((0 - STATIC));
    }
    SPARK_OBJ(_OBJ2);
    return true;
}

function SAY_SNAP() {
    ITALICIZE("Snap");
    TELL("! A ");
    if(STATIC > 3) {
        TELL("painful ");
    }
    TELL("spark leaps between ");
    return false;
}

function isNO_SPARK(_OBJ) {
    let _L;
    if(!(STATIC)) {
        return true;
    }
    _L = LOC(_OBJ);
    if(isEQUAL(_L, null, LOCAL_GLOBALS, GLOBAL_OBJECTS)) {
        return true;
    } else if(isEQUAL(PLAYER, _L, LOC(_L))) {
        return true;
    } else {
        return false;
    }
}

function SPARK_OBJ(_OBJ) {
    if(!(isIS(_OBJ, LIVING))) {
        
    } else if(isEQUAL(_OBJ, DUST)) {
        VANISH(DUST);
        DEQUEUE(I_DUST);
        MOVE(RING, HERE);
        P_IT_OBJECT = RING;
        P_THEM_OBJECT = NOT_HERE_OBJECT;
        TELL("  A bright blue ");
        ITALICIZE("snap");
        TELL(" of electricity lights the room! ");
        BLINK(DUST);
        TELL(" draw");
        if(isEQUAL(BUNNIES, 1)) {
            TELL("s itself");
        } else {
            TELL(" themselves");
        }
        TELL(" together into a hard ring of particles, which falls with a clatter to your feet.", CR);
        UPDATE_STAT(GETP(DUST, "VALUE"), EXPERIENCE);
    } else if(isIS(_OBJ, MONSTER)) {
        MAKE(_OBJ, STRICKEN);
        PUTP(_OBJ, "ENDURANCE"
, (GETP(_OBJ, "ENDURANCE") - STATIC));
    } else {
        TELL(TAB, CTHE(_OBJ), " looks at you reproachfully.", CR);
        if(isEQUAL(_OBJ, UNICORN)) {
            UPDATE_STAT(-5, LUCK, true);
        }
    }
    STATIC = 0;
    return false;
}

function BLINK(_OBJ) {
    TELL("In the blink of an eye, ", THE(_OBJ));
    return false;
}

"Takes monster OBJ and NEGATIVE damage, returns net damage."

function isMSPARK(_OBJ, _DAMAGE) {
    let _X;
    if(!(STATIC)) {
        return _DAMAGE;
    }
    _X = (GETP(_OBJ, "ENDURANCE") + _DAMAGE);
    TELL(TAB);
    SAY_SNAP();
    TELL("you and ", THE(_OBJ));
    if(_X < 1) {
        _X = 1;
        TELL(", leaving it nearly stunned");
    }
    TELL(PERIOD);
    PUTP(_OBJ, "ENDURANCE", _X);
    _DAMAGE = (_DAMAGE - STATIC);
    STATIC = 0;
    return _DAMAGE;
}

function V_DROP() {
    if(IDROP()) {
        SAY_DROPPED();
    }
    return true;
}

function SAY_DROPPED() {
    if((isT(isP_MULT)
  ||  PROB(50))) {
        TELL("Dropped.", CR);
        return true;
    }
    TELL(CYOU);
    if(PROB(50)) {
        TELL("drop ");
    } else {
        TELL("put down ");
    }
    TELL(THEO, PERIOD);
    return true;
}

function IDROP() {
    let _L;
    _L = LOC(PRSO);
    if((isEQUAL(_L, null, LOCAL_GLOBALS, GLOBAL_OBJECTS)
  ||  isPRSO(WINNER, ME))) {
        IMPOSSIBLE();
        return false;
    } else if(!(isEQUAL(_L, WINNER))) {
        if(isEQUAL(WINNER, PLAYER)) {
            TELL("You'd ");
        } else {
            TELL(CTHE(WINNER), " would ");
        }
        TELL("have to take ", THEO);
        OUT_OF_LOC(_L);
        TELL(SFIRST);
        return false;
    } else if((isIS(PRSO, WORN)
  &&  isIN(PRSO, WINNER))) {
        if(isTAKE_OFF_PRSO_FIRST()) {
            return true;
        }
    } else if(isPRSO(MINX)) {
        UNMAKE(PRSO, SEEN);
        UNMAKE(PRSO, TOUCHED);
        UNMAKE(PRSO, TRYTAKE);
    } else if(isPRSO(TRUFFLE)) {
        UNMAKE(MINX, SEEN);
    }
    UNMAKE(PRSO, WIELDED);
    WINDOW(SHOWING_ALL);
    _L = LOC(WINNER);
    if((isHERE(IN_SKY, ON_BRIDGE, APLANE)
  ||  isEQUAL(_L, SADDLE))) {
        TELL(CTHEO, C(SP));
        FALLS();
        return false;
    }
    MOVE(PRSO, _L);
    return true;
}

function PRSO_SLIDES_OFF_PRSI() {
    TELL(CTHEO, " slide");
    if(!(isIS(PRSO, PLURAL))) {
        TELL("s");
    }
    TELL(" off ", THEI, AND);
    FALLS();
    return true;
}

function FALLS(_OBJ=PRSO, _V=true) {
    let _S, _L, _X;
    _S = "s ";
    if(isIS(_OBJ, PLURAL)) {
        _S = " ";
    }
    _L = LOC(WINNER);
    WINDOW(SHOWING_ALL);
    UNMAKE(_OBJ, WIELDED);
    UNMAKE(_OBJ, WORN);
    if(isHERE(ON_BRIDGE)) {
        VANISH(_OBJ);
        if(isT(_V)) {
            TELL("slip", _S, B("BETWEEN"), " the ropes and ");
        }
        TELL("fall", _S, "out of sight.", CR);
        return true;
    } else if(isHERE(IN_SKY, APLANE)) {
        _X = isDOWN_TO();
        if(!(_X)) {
            REMOVE(_OBJ);
        } else {
            MOVE(_OBJ, _X);
        }
        if(isHERE(IN_SKY)) {
            TELL("fall", _S, "out of sight.", CR);
            return true;
        }
        if(isEQUAL(_OBJ, PHASE)) {
            MUNG_PHASE();
        }
        TELL("disappear", _S, "in a spectral flash.", CR);
        return true;
    } else if(isEQUAL(_L, SADDLE)) {
        _X = LOC(_L);
        if(isIS(_X, VEHICLE)) {
            MOVE(_OBJ, LOC(_X));
        } else {
            MOVE(_OBJ, _X);
        }
        if(isT(_V)) {
            TELL("slide", _S, "off ", THE(_L), AND);
        }
    } else {
        MOVE(_OBJ, _L);
    }
    TELL("land", _S, "on the ");
    GROUND_WORD();
    TELL(PERIOD);
    return true;
}

function V_CASH() {
    if(!(LOOT)) {
        PRINT("You're broke.|");
        return true;
    }
    SAY_CASH();
    return true;
}

function V_INVENTORY() {
    if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_ROOM, SHOWING_STATS))) {
        PRINT_INVENTORY();
    } else {
        TELL("You take stock of your possessions.", CR);
        DBOX_TOP = 0;
        UPDATE_INVENTORY();
        if(LOWCORE(FLAGS) & 1) {
            DIROUT(D_SCREEN_OFF);
            CRLF();
            PRINT_INVENTORY();
            DIROUT(D_SCREEN_ON);
        }
    }
    if(!(isIS(MONEY, TOUCHED))) {
        MAKE(MONEY, TOUCHED);
        TELL(TAB);
        NYMPH_APPEARS("financial");
        TELL("By the way, you can check the amount of cash you're holding at any time with the CASH command. Or, just type a $ followed by [RETURN]");
        PRINT(". Bye!\"|  She disappears with a wink.|");
    }
    return true;
}

function UPDATE_INVENTORY() {
    IN_DBOX = SHOWING_INV;
    SETUP_DBOX();
    PRINT_INVENTORY();
    JUSTIFY_DBOX();
    DISPLAY_DBOX();
    return false;
}

var WEARING = () => OBJECT({

});
var HOLDING = () => OBJECT({

});

var isINV_PRINTING/*FLAG*/ = null;

function PRINT_INVENTORY() {
    let _HOLDS=0, _WORNS=0, _ANY=0, _B=0, _OBJ, _NXT;
    if(!((_OBJ = isFIRST(WINNER)))) {
        NUTHIN();
        return true;
    }
    isINV_PRINTING = true;
    while(true) {
        _NXT = isNEXT(_OBJ);
        if((isIS(_OBJ, NODESC)
  ||  !(isIS(_OBJ, TAKEABLE)))) {
            MOVE(_OBJ, DUMMY_OBJECT);
        } else if((isIS(_OBJ, CLOTHING)
  &&  isIS(_OBJ, WORN))) {
            ++_WORNS
            MOVE(_OBJ, WEARING);
        } else if((isEQUAL(_OBJ, GOBLET)
  &&  isIN(BFLY, _OBJ)
  &&  isIS(BFLY, LIVING))) {
            ++_B
            MAKE(BFLY, NODESC);
        }
        if((isSEE_INSIDE(_OBJ)
  &&  isSEE_ANYTHING_IN(_OBJ))) {
            ++_HOLDS
            MOVE(_OBJ, HOLDING);
        }
        _OBJ = _NXT;
        if(!(_OBJ)) {
            break;
        }
    }

    if((_OBJ = isFIRST(WINNER))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, WIELDED)) {
                REMOVE(_OBJ);
                MOVE(_OBJ, WINNER);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
        ++_ANY
        TELL("You're carrying ");
        CONTENTS(WINNER);
        PRINT(PERIOD);
    }

    if(isT(_HOLDS)) {
        if(isT(_ANY)) {
            TELL(TAB, "You're also ");
        } else {
            TELL("You're ");
        }
        ++_ANY
        TELL("carrying ");
        CONTENTS(HOLDING);
        if((_OBJ = isFIRST(HOLDING))) {
            while(true) {
                TELL(". ");
                if(isEQUAL(_OBJ, GURDY)) {
                    TELL("Within");
                } else if(isIS(_OBJ, CONTAINER)) {
                    TELL("Inside");
                } else {
                    TELL("Upon");
                }
                TELL(C(SP), THE(_OBJ), " you see ");
                CONTENTS(_OBJ);
                if(!((_OBJ = isNEXT(_OBJ)))) {
                    break;
                }
            }
        }
        TELL(PERIOD);
        MOVE_ALL(HOLDING, WINNER);
    }

    if(isT(_WORNS)) {
        if(isT(_ANY)) {
            TELL(TAB);
        }
        ++_ANY
        TELL("You're wearing ");
        CONTENTS(WEARING);
        if((_OBJ = isFIRST(WEARING))) {
            while(true) {
                if((isSEE_INSIDE(_OBJ)
  &&  isSEE_ANYTHING_IN(_OBJ))) {
                    TELL(". ");
                    if(isIS(_OBJ, CONTAINER)) {
                        TELL("Inside");
                    } else {
                        TELL("Upon");
                    }
                    TELL(C(SP), THE(_OBJ), " you see ");
                    CONTENTS(_OBJ);
                }
                if(!((_OBJ = isNEXT(_OBJ)))) {
                    break;
                }
            }
        }
        TELL(PERIOD);
        MOVE_ALL(WEARING, WINNER);
    }

    MOVE_ALL(DUMMY_OBJECT, WINNER);
    if(!(_ANY)) {
        NUTHIN();
    } else if(isT(LOOT)) {
        TELL(TAB);
        SAY_CASH();
    }
    if(isT(_B)) {
        UNMAKE(BFLY, NODESC);
    }
    isINV_PRINTING = null;
    return true;
}

function NUTHIN() {
    TELL(DONT, "have anything");
    if(isT(LOOT)) {
        TELL(" except ");
        SAY_LOOT();
    }
    PRINT(PERIOD);
    return true;
}

function PRE_EXAMINE() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else {
        return false;
    }
}

function V_EXAMINE() {
    if(isIS(PRSO, OPENABLE)) {
        TELL("It looks as if ", THEO);
        IS_ARE();
        if(isIS(PRSO, OPENED)) {
            PRINTB("OPEN");
        } else {
            PRINTB("CLOSED");
        }
        PRINT(PERIOD);
        return true;
    } else if(isIS(PRSO, PLACE)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isIS(PRSO, READABLE)) {
        TELL("There appears to be something written on it.", CR);
        return true;
    } else if(isIS(PRSO, SURFACE)) {
        TELL(YOU_SEE);
        CONTENTS();
        TELL(SON, THEO);
        PRINT(PERIOD);
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        if((isIS(PRSO, OPENED)
  ||  isIS(PRSO, TRANSPARENT))) {
            V_LOOK_INSIDE();
            return true;
        }
        ITS_CLOSED();
        return true;
    } else if(isLOOK_INTDIR()) {
        return true;
    } else if((isIS(PRSO, PERSON)
  &&  isSEE_ANYTHING_IN())) {
        TELL(CTHEO, " has ");
        CONTENTS();
        PRINT(PERIOD);
        return true;
    }
    NOTHING_INTERESTING();
    TELL(" about ", THEO, PERIOD);
    return true;
}

function NOTHING_INTERESTING() {
    TELL(YOU_SEE, "nothing ", PICK_NEXT(YAWNS));
    return false;
}

var CAN_UNDO/*NUMBER*/ = 0;

function V_UNDO() {
    if(isCANT_SAVE()) {
        return true;
    }
    OLD_HERE = null;
    IRESTORE(_X => {
        if(isEQUAL(_X, -1)) {
            NOT_AVAILABLE();
        } else if (_X === 1) {
            INITVARS();
            V_REFRESH();

            COMPLETED("RESTORE");
            CRLF();
            V_LOOK();
        } else 
            FAILED("UNDO");
        //setTimeout(DO_MAIN_LOOP, 20);
        return true;
    });
    
}

function isCANT_SAVE() {
    let _OBJ, _NXT, _X;
    if(isT(CHOKE)) {
        MUMBLAGE(SKELETON);
        return true;
    } else if((_OBJ = isFIRST(HERE))) {
        while(true) {
            if((isIS(_OBJ, MONSTER)
  &&  isIS(_OBJ, LIVING)
  &&  !(isIS(_OBJ, SLEEPING)))) {
                MUMBLAGE(_OBJ);
                return true;
            } else if(!((_OBJ = isNEXT(_OBJ)))) {
                return false;
            }
        }
    }
    return false;
}

function MUMBLAGE(_OBJ) {
    PCLEAR();
    TELL("You begin to mumble the Spell of ");
    if(isVERB(V_SAVE)) {
        TELL("Sav");
    } else {
        TELL("Undo");
    }
    TELL("ing, but the ");
    if(isT(isLIT)) {
        TELL("sight of ", THE(_OBJ), " makes");
    } else {
        TELL("noises in the darkness make");
    }
    TELL(" your mind wander.", CR);
    return true;
}

function V_USE() {
    if(isIS(PRSO, PERSON)) {
        TELL(CTHEO, " might resent that.", CR);
        return true;
    }
    isHOW();
    return true;
}

function V_BITE() {
    if(!(isSPARK(null))) {
        HACK_HACK("Biting");
    }
    return true;
}

function V_BLOW_INTO() {
    if(isIS(PRSO, PERSON)) {
        P_PRSA_WORD = "USE";
        PERFORM("USE", PRSO);
        return true;
    }
    HACK_HACK("Blowing");
    return true;
}

function V_LIGHT_ON() {
    TELL(CANT, "light ", THEO, " on anything.", CR);
    return true;
}

function V_LIGHT_WITH() {
    V_BURN_WITH();
    return true;
}

function V_BURN_WITH() {
    if(isT(PRSI)) {
        TELL("With ", A(PRSI), "? ");
    }
    TELL(PICK_NEXT(YUKS), PERIOD);
    return true;
}

function ALREADY_HAVE(_OBJ=PRSO) {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("You already have ");
    } else {
        TELL(CTHE(WINNER), " already has ");
    }
    TELL(A(_OBJ), PERIOD);
    return true;
}

/*function NO_MONEY() {
    TELL(DONT, "have any money.", CR);
    return true;
}*/

function V_CLEAN() {
    if(!(isSPARK(null))) {
        HACK_HACK("Cleaning");
    }
    return true;
}

function V_CLEAN_OFF() {
    if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO, SON, THEI, PERIOD);
    return true;
}

function V_CLIMB_DOWN() {
    if((isEQUAL(P_PRSA_WORD, "JUMP", "LEAP", "HURDLE")
  ||  isEQUAL(P_PRSA_WORD, "VAULT", "BOUND"))) {
        PERFORM("DIVE", PRSO);
        return true;
    } else if(isPRSO(ROOMS)) {
        DO_WALK("DOWN");
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_CLIMB_ON() {
    if(isEQUAL(P_PRSA_WORD, "TAKE")) {
        PERFORM("HIT", PRSO);
        return true;
    } else if(isIS(PRSO, VEHICLE)) {
        PERFORM("ENTER", PRSO);
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), " onto that.", CR);
    return true;
}

function V_CLIMB_OVER() {
    if(isPRSO(ROOMS)) {
        V_WALK_AROUND();
        return true;
    }
    TELL(CANT);
    TELL("climb over that.", CR);
    return true;
}

function V_CLIMB_UP() {
    if(isPRSO(ROOMS)) {
        DO_WALK("UP");
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_OPEN_WITH() {
    if(!(isIS(PRSO, OPENABLE))) {
        CANT_OPEN_PRSO();
        return true;
    } else if(isIS(PRSO, OPENED)) {
        ITS_ALREADY("open");
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO, WITH, THEI, PERIOD);
    return true;
}

function CANT_OPEN_PRSO() {
    TELL(IMPOSSIBLY, "open ", AO, PERIOD);
    return true;
}

function V_OPEN() {
    let _X;
    if(!(isIS(PRSO, OPENABLE))) {
        CANT_OPEN_PRSO();
        return true;
    } else if(isIS(PRSO, OPENED)) {
        ITS_ALREADY("open");
        return true;
    } else if(isIS(PRSO, LOCKED)) {
        TELL(CTHEO, " seems to be locked.", CR);
        return true;
    }
    if(isSPARK()) {
        TELL(TAB);
    }
    TELL("You open ", THEO, PERIOD);
    IOPEN();
    if((isPRSO(CELLAR_DOOR)
  &&  !(isIS(ONION, TOUCHED)))) {
        TELL(TAB);
        COOK_MENTIONS_ONION();
    }
    return true;
}

function IOPEN(_OBJ=PRSO) {
    WINDOW(SHOWING_ALL);
    MAKE(_OBJ, OPENED);
    if((isIS(_OBJ, DOORLIKE)
  &&  isIN(_OBJ, LOCAL_GLOBALS))) {
        MARK_EXITS();
        if(!(DMODE)) {
            LOWER_SLINE();
            return false;
        }
        DRAW_MAP();
        SHOW_MAP();
        return false;
    } else if(isIS(_OBJ, CONTAINER)) {
        if(isIS(_OBJ, TRANSPARENT)) {
            return false;
        } else if(!(isSEE_ANYTHING_IN(_OBJ))) {
            return false;
        }
        TELL(TAB);
        PRINT("Peering inside, you see ");
        CONTENTS(_OBJ);
        PRINT(PERIOD);
    }
    return false;
}

function ICLOSE(_OBJ=PRSO) {
    WINDOW(SHOWING_ALL);
    UNMAKE(_OBJ, OPENED);
    if((isIS(_OBJ, DOORLIKE)
  &&  isIN(_OBJ, LOCAL_GLOBALS))) {
        if(!(DMODE)) {
            LOWER_SLINE();
            return false;
        }
        DRAW_MAP();
        SHOW_MAP();
    }
    return false;
}

function V_CLOSE() {
    if(isIS(PRSO, OPENABLE)) {
        if(isIS(PRSO, OPENED)) {
            if(isSPARK()) {
                TELL(TAB);
            }
            TELL("You close ", THEO, PERIOD);
            ICLOSE();
            return true;
        }
        ITS_ALREADY("closed");
        return true;
    }
    TELL(CANT);
    TELL("close ", AO, PERIOD);
    return true;
}

function V_COUNT() {
    if(isIS(PRSO, PLURAL)) {
        TELL("Your mind wanders, and you lose count.", CR);
        return true;
    }
    ONLY_ONE();
    return true;
}

function ONLY_ONE() {
    TELL("You only see one.", CR);
    return true;
}

function V_COVER() {
    PERFORM("PUT-ON", PRSI, PRSO);
    return true;
}

function V_HOLD_OVER() {
    WASTE_OF_TIME();
    return true;
}

function V_CROSS() {
    TELL(CANT);
    TELL("cross that.", CR);
    return true;
}

function V_CUT() {
    if(isPRSI(DAGGER, SWORD, AXE)) {
        NYMPH_APPEARS("safety");
        TELL("Careful with that ", PRSI
, "!\" she scolds, wagging a tiny finger. \"You might hurt ", ME);
        PRINT(". Bye!\"|  She disappears with a wink.|");
        return true;
    }
    V_RIP();
    return true;
}

function V_RIP() {
    TELL(IMPOSSIBLY, B(P_PRSA_WORD), C(SP), THEO);
    if(!(isPRSI(HANDS))) {
        TELL(WITH, THEI);
    }
    PRINT(PERIOD);
    return true;
}

function V_DEFLATE() {
    IMPOSSIBLE();
    return true;
}

function V_DETONATE() {
    IMPOSSIBLE();
    return true;
}

function PRE_DIG_UNDER() {
    return PRE_DIG();
}

function PRE_DIG() {
    if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isT(PRSI)) {
        return false;
    }
    PRSI = HANDS;
    if(isIN(SPADE, PLAYER)) {
        PRSI = SPADE;
    }
    TELL("[with ", THEI, BRACKET);
    return false;
}

function V_DIG_UNDER() {
    WASTE_OF_TIME();
    return true;
}

function V_DIG() {
    WASTE_OF_TIME();
    return true;
}

function V_SDIG() {
    PERFORM("DIG", PRSI, PRSO);
    return RFATAL();
}

function V_DRINK(_isFROM=null) {
    TELL(CANT);
    TELL("drink ");
    if(isT(_isFROM)) {
        TELL("from ");
    }
    TELL(D(NOT_HERE_OBJECT), PERIOD);
    return true;
}

function V_DRINK_FROM() {
    V_DRINK(true);
    return true;
}

function V_EAT() {
    if(isEQUAL(WINNER, PLAYER)) {
        NOT_LIKELY();
        TELL(" would agree with you.", CR);
        return true;
    }
    TELL("\"It", PICK_NEXT(LIKELIES)
, " that ", THEO, " would agree with me.\"", CR);
    return true;
}

function V_ENTER() {
    let _X;
    if(isIS(PRSO, VEHICLE)) {
        if(isIN(PLAYER, PRSO)) {
            TELL("You're already");
            ON_IN();
            TELL(PERIOD);
            return true;
        } else if(!(isEQUAL(LOC(PRSO), HERE, LOCAL_GLOBALS))) {
            CANT_FROM_HERE();
            return true;
        } else if(isDROP_ONION_FIRST()) {
            return true;
        }
        OLD_HERE = null;
        WINDOW(SHOWING_ROOM);
        MOVE(PLAYER, PRSO);
        TELL("You get");
        ON_IN();
        RELOOK();
        return true;
    } else if(isPRSO(ROOMS)) {
        _X = isFIND_IN(HERE, VEHICLE);
        if(isT(_X)) {
            P_PRSA_WORD = "ENTER";
            PERFORM("ENTER", _X);
            return true;
        }
        DO_WALK("IN");
        return true;
    } else if(isIS(PRSO, CLOTHING)) {
        PRINT("[Presumably, you mean ");
        TELL("WEAR ", THEO);
        PRINTC('\.'.charCodeAt(0));
        PRINT(BRACKET);
        P_PRSA_WORD = "WEAR";
        PERFORM("WEAR", PRSO);
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_ESCAPE() {
    if(isIS(PRSO, PLACE)) {
        NOT_IN();
        return true;
    }
    V_WALK_AROUND();
    return true;
}

function PRE_DUMB_EXAMINE() {
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isLOOK_INTDIR()) {
        return true;
    }
    if(!(isIS(EYES, SEEN))) {
        MAKE(EYES, SEEN);
        PRINT("[Presumably, you mean ");
        TELL("LOOK AT ", THEO
, ", not LOOK INSIDE or LOOK UNDER or LOOK BEHIND ", THEO);
        PRINTC('\.'.charCodeAt(0));
        PRINT(BRACKET);
    }
    PERFORM("EXAMINE", PRSO);
    return true;
}

function V_DUMB_EXAMINE() {
    V_EXAMINE();
    return true;
}

function isLOOK_INTDIR() {
    let _X;
    if(isPRSO(RIGHT, LEFT)) {
        
    } else if(!(isPRSO(INTDIR))) {
        return false;
    }
    _X = GETP(HERE, "SEE-ALL");
    if(isT(_X)) {
        THIS_IS_IT(_X);
        TELL(YOU_SEE);
        if((!(isIS(_X, NOARTICLE))
  &&  !(isIS(_X, PLURAL)))) {
            TELL(LTHE);
        }
        TELL(D(_X), " that way.", CR);
        return true;
    }
    NOTHING_INTERESTING();
    TELL(SIN, D(RIGHT), PERIOD);
    return true;
}

function PRE_EXAMINE_IN() {
    let _L;
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(isIN(PRSI, GLOBAL_OBJECTS)) {
        return false;
    } else if((isIN(PRSI, LOCAL_GLOBALS)
  &&  isIS(PRSI, PLACE))) {
        return false;
    }
    _L = LOC(PRSO);
    if(isEQUAL(_L, PRSI)) {
        return false;
    } else if(isIN(_L, PRSI)) {
        return false;
    }
    TELL(CTHEO);
    ISNT_ARENT();
    ON_IN(PRSI);
    TELL(PERIOD);
    return true;
}

function V_EXAMINE_IN() {
    V_EXAMINE();
    return true;
}

function V_EXIT() {
    let _L;
    if(isPRSO(ROOMS)) {
        _L = LOC(WINNER);
        if(isIS(_L, VEHICLE)) {
            PERFORM("EXIT", _L);
            return true;
        }
        DO_WALK("OUT");
        return true;
    } else if((isT(PRSO)
  &&  isIS(PRSO, VEHICLE))) {
        if(!(isIN(WINNER, PRSO))) {
            TELL("You're not");
            ON_IN();
            TELL(PERIOD);
            return true;
        }
        OLD_HERE = null;
        WINDOW(SHOWING_ROOM);
        MOVE(WINNER, LOC(PRSO));
        TELL("You get");
        OUT_OF_LOC(PRSO);
        RELOOK();
        return true;
    }
    _L = LOC(PRSO);
    if(isIS(PRSO, PLACE)) {
        NOT_IN();
        return true;
    } else if((isIS(_L, CONTAINER)
  &&  isVISIBLE(PRSO))) {
        TELL("[from ", D(_L), BRACKET);
        PERFORM("TAKE", PRSO);
        return true;
    }
    DO_WALK("OUT");
    return true;
}

function V_FILL_FROM() {
    V_FILL();
    return true;
}

function V_FILL() {
    if((isPRSO(VIAL, GOBLET)
  &&  isVISIBLE(POOL))) {
        TELL("[from ", THE(POOL), BRACKET);
        P_PRSA_WORD = "GET";
        PERFORM("FILL-FROM", PRSO, POOL);
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO, PERIOD);
    return true;
}

function V_SUBMERGE() {
    if((isPRSO(CIRCLET)
  &&  isVISIBLE(JAR))) {
        TELL("[into ", THE(JAR), BRACKET);
        DIP_CIRCLET();
        return true;
    } else if(isIN(POOL, HERE)) {
        TELL("[in ", THE(POOL), BRACKET);
        if(isPRSO(VIAL, GOBLET)) {
            PERFORM("FILL-FROM", PRSO, POOL);
            return true;
        }
        PERFORM("PUT-UNDER", PRSO, POOL);
        return true;
    }
    TELL(NOTHING, "here in which to ", B(P_PRSA_WORD
), C(SP), THEO, PERIOD);
    return true;
}

function V_FIND() {
    let _L;
    _L = LOC(PRSO);
    if(!(_L)) {
        
    } else if(isPRSO(ME, HANDS, WINNER)) {
        PRINT("You're right here.|");
        return true;
    } else if(isIN(PRSO, WINNER)) {
        TELL("You're holding it.", CR);
        return true;
    } else if((isIN(PRSO, HERE)
  ||  (isIN(PRSO, LOCAL_GLOBALS)
  &&  isGLOBAL_IN(HERE, PRSO))
  ||  isIN(PRSO, LOC(WINNER)))) {
        ITS_RIGHT_HERE();
        return true;
    } else if(((isIS(_L, PERSON)
  ||  isIS(_L, LIVING))
  &&  isVISIBLE(_L))) {
        TELL(CTHE(_L), " has it.", CR);
        return true;
    } else if((isSEE_INSIDE(_L)
  &&  isVISIBLE(_L))) {
        SAY_ITS();
        ON_IN(_L);
        TELL(PERIOD);
        return true;
    }
    DO_IT_YOURSELF();
    return true;
}

function DO_IT_YOURSELF() {
    TELL("You'll have to do that ", D(ME), PERIOD);
    return true;
}

function ITS_RIGHT_HERE() {
    SAY_ITS();
    TELL(" right here in front of you.", CR);
    return true;
}

function SAY_ITS() {
    if(isIS(PRSO, PLURAL)) {
        TELL("They're");
        return true;
    } else if(isIS(PRSO, FEMALE)) {
        TELL("She's");
        return true;
    } else if(isIS(PRSO, PERSON)) {
        TELL("He's");
        return true;
    }
    TELL("It's");
    return true;
}

function V_LAND() {
    if(isHERE(IN_SKY)) {
        DO_WALK("DOWN");
        return true;
    }
    NOT_FLYING();
    return true;
}

function NOT_FLYING() {
    TELL("You're not flying", AT_MOMENT);
    return true;
}

function V_LAND_ON() {
    if(!(isHERE(IN_SKY))) {
        NOT_FLYING();
        return true;
    } else if(isPRSO(GROUND, FLOOR)) {
        DO_WALK("DOWN");
        return true;
    }
    V_WALK_AROUND();
    return true;
}

function V_BANK() {
    if((isPRSO(INTDIR)
  &&  isT(P_DIRECTION)
  &&  isHERE(IN_SKY))) {
        V_WALK();
        return true;
    }
    NOT_FLYING();
    return true;
}

function V_FLY() {
    if((isPRSO(ROOMS)
  &&  isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        if(isHERE(IN_SKY)) {
            TELL("Try looking down.", CR);
            return true;
        }
        DO_WALK("UP");
        return true;
    }
    TELL("Psst! Guess what? ", CANT, "fly unassisted.", CR);
    return true;
}

function V_FLY_UP() {
    if((isPRSO(ROOMS)
  &&  isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        DO_WALK("UP");
        return true;
    }
    V_FLY();
    return true;
}

function V_FLY_DOWN() {
    if((isPRSO(ROOMS)
  &&  isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        DO_WALK("DOWN");
        return true;
    }
    V_FLY();
    return true;
}

function V_FOLD() {
    IMPOSSIBLE();
    return true;
}

function V_FOLLOW() {
    if(!(PRSO)) {
        CANT_SEE_ANY();
        return RFATAL();
    }
    TELL("But ");
    if(isPRSO(ME, WINNER)) {
        if(isEQUAL(WINNER, PLAYER)) {
            TELL("you're");
        } else {
            TELL(THE(WINNER), " is");
        }
        PRINT(" right here.|");
        return true;
    } else {
        TELL(THEO);
        if(isIS(PRSO, PLURAL)) {
            TELL(" are");
        } else {
            TELL(" is");
        }
        if((isVISIBLE(PRSO)
  ||  isIN(PRSO, GLOBAL_OBJECTS))) {
            PRINT(" right here.|");
            return true;
        }
    }
    TELL("n't visible", AT_MOMENT);
    return true;
}

function PRE_FEED() {
    if(PRE_GIVE(true)) {
        return true;
    } else {
        return false;
    }
}

function V_FEED() {
    if(isPRSI(ME, WINNER)) {
        if(isEQUAL(WINNER, PLAYER)) {
            TELL("You");
        } else {
            TELL(CTHE(WINNER));
        }
    } else {
        TELL(CTHEI);
    }
    TELL(" can't eat that.", CR);
    return true;
}

function V_SFEED() {
    PERFORM("FEED", PRSI, PRSO);
    return true;
}

function PRE_GIVE(_isFEED=null) {
    if((!(PRSO)
  ||  !(PRSI))) {
        REFERRING();
        return true;
    } else if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isEQUAL(PRSO, PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(isIN(PRSI, GLOBAL_OBJECTS)) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIS(PRSI, LIVING))) {
        TELL(CANT);
        if(isT(_isFEED)) {
            TELL("feed ");
        } else {
            TELL("give ");
        }
        TELL("anything to ", A(PRSI), PERIOD);
        return true;
    } else if(isPRSO(MONEY, INTNUM)) {
        return false;
    } else if(isPRSI(ME, WINNER)) {
        if(isIN(PRSO, WINNER)) {
            ALREADY_HAVE();
            return true;
        }
    } else if(isDONT_HAVE()) {
        return true;
    }
    if((isIS(PRSO, WORN)
  &&  isIN(PRSO, WINNER))) {
        return isTAKE_OFF_PRSO_FIRST();
    } else {
        return false;
    }
}

function V_SGIVE() {
    PERFORM("GIVE", PRSI, PRSO);
    return true;
}

function V_GIVE() {
    if(isPRSI(ME)) {
        NOBODY_TO_ASK();
        return true;
    } else if(isIS(PRSO, PERSON)) {
        TELL(CTHEI, " shows little interest in your offer.", CR);
        return true;
    }
    NOT_LIKELY(PRSI);
    TELL(" would accept your offer.", CR);
    return true;
}

function PRE_SHOW() {
    if((!(PRSO)
  ||  !(PRSI))) {
        REFERRING();
        return true;
    } else if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isEQUAL(PRSO, PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(isIN(PRSI, GLOBAL_OBJECTS)) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIS(PRSI, LIVING))) {
        TELL(CANT);
        TELL("show things to ", A(PRSI), PERIOD);
        return true;
    } else if(isPRSO(MONEY, INTNUM)) {
        return false;
    } else if(isPRSI(ME, WINNER)) {
        if(isIN(PRSO, WINNER)) {
            ALREADY_HAVE();
            return true;
        }
        return false;
    } else if(isDONT_HAVE()) {
        return true;
    } else {
        return false;
    }
}

function V_SSHOW() {
    PERFORM("SHOW", PRSI, PRSO);
    return true;
}

function V_SHOW() {
    TELL(CTHEI, " glance");
    if(!(isIS(PRSI, PLURAL))) {
        TELL("s");
    }
    TELL(" at ", THEO, ", but make");
    if(!(isIS(PRSI, PLURAL))) {
        TELL("s");
    }
    TELL(" no comment.", CR);
    return true;
}

function V_REFUSE() {
    if(!(isIS(PRSO, TAKEABLE))) {
        WASTE_OF_TIME();
        return true;
    }
    TELL("How could you turn down such a tempting ", D(PRSO), "?", CR);
    return true;
}

function V_HIDE() {
    if(isHERE(LOC(ARCH))) {
        TELL("[under ", THE(ARCH), BRACKET);
        ENTER_ARCH();
        return true;
    } else if(isHERE(IN_GARDEN)) {
        TELL("[behind ", THE(BUSH), BRACKET);
        ENTER_BUSH();
        return true;
    }
    TELL("There aren't any good hiding places here.", CR);
    return true;
}

function V_KICK() {
    if(isSPARK(null)) {
        return true;
    } else if(isIS(PRSO, MONSTER)) {
        PERFORM("HIT", PRSO, FEET);
        return true;
    }
    HACK_HACK("Kicking");
    return true;
}

function V_BOUNCE() {
    if(isPRSO(ROOMS)) {
        WASTE_OF_TIME();
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_KNOCK() {
    if(isSPARK(null)) {
        return true;
    } else if(isIS(PRSO, DOORLIKE)) {
        if(isIS(PRSO, OPENED)) {
            ITS_ALREADY("open");
            return true;
        }
        TELL("There's no answer.", CR);
        return true;
    } else if(isIS(PRSO, PERSON)) {
        PERFORM("USE", PRSO);
        return true;
    }
    WASTE_OF_TIME();
    return true;
}

function V_KISS() {
    if(!(isSPARK(null))) {
        WASTE_OF_TIME();
    }
    return true;
}

function V_LAMP_OFF() {
    if(isPRSO(ROOMS)) {
        if(isEQUAL(WINNER, PLAYER)) {
            TELL("You pause");
        } else {
            TELL(CTHE(WINNER), " pauses");
        }
        TELL(" for a moment.", CR);
        return true;
    }
    V_LAMP_ON(true);
    return true;
}

function V_LAMP_ON(_isOFF=null) {
    TELL(IMPOSSIBLY, "turn that ");
    if(isT(_isOFF)) {
        TELL("off");
    } else {
        TELL("on");
    }
    if(!(isEQUAL(PRSI, null, HANDS))) {
        TELL(", ", D(PRSI), " or no ", D(PRSI));
    }
    PRINT(PERIOD);
    return true;
}

function V_LEAP() {
    if(!(isPRSO(ROOMS))) {
        TELL("That'd be a cute trick.", CR);
        return true;
    } else if(isHERE(OVER_JUNGLE)) {
        JUNGLE_JUMP();
        return true;
    } else if(isHERE(ON_BRIDGE)) {
        JUMP_OFF_BRIDGE();
        return true;
    }
    WASTE_OF_TIME();
    return true;
}

function V_LEAVE() {
    if(isIS(PRSO, PLACE)) {
        NOT_IN();
        return true;
    } else if((isPRSO(ROOMS)
  ||  !(isIS(PRSO, TAKEABLE)))) {
        DO_WALK("OUT");
        return true;
    } else if(isDONT_HAVE()) {
        return true;
    }
    PERFORM("DROP", PRSO);
    return true;
}

function V_SLEEP() {
    V_LIE_DOWN();
    return true;
}

function V_LIE_DOWN() {
    TELL("This is no time for that.", CR);
    return true;
}

function V_LISTEN() {
    let _OBJ=null;
    if(isPRSO(ROOMS, SOUND_OBJ)) {
        _OBJ = GETP(HERE, "HEAR");
        if(!(_OBJ)) {
            TELL(DONT, "hear anything "
, PICK_NEXT(YAWNS), PERIOD);
            return true;
        }
        PERFORM("LISTEN", _OBJ);
        return true;
    } else if(isIS(PRSO, LIVING)) {
        TELL("No doubt ", THEO, " appreciate");
        if(!(isIS(PRSO, PLURAL))) {
            TELL("s");
        }
        TELL(" your attention.", CR);
        return true;
    }
    TELL("At the moment, ", THEO);
    IS_ARE();
    TELL("silent.", CR);
    return true;
}

function V_LOCK() {
    if((isIS(PRSO, OPENABLE)
  ||  isIS(PRSO, CONTAINER))) {
        if(isIS(PRSO, OPENED)) {
            YOUD_HAVE_TO("close");
            return true;
        } else if(isIS(PRSO, LOCKED)) {
            TELL(CTHEO);
            IS_ARE();
            TELL("already locked.", CR);
            return true;
        }
        THING_WONT_LOCK(PRSI, PRSO);
        return true;
    }
    CANT_LOCK();
    return true;
}

function V_UNLOCK() {
    if((isIS(PRSO, OPENABLE)
  ||  isIS(PRSO, CONTAINER))) {
        if((isIS(PRSO, OPENED)
  ||  !(isIS(PRSO, LOCKED)))) {
            TELL(CTHEO);
            ISNT_ARENT();
            TELL(" locked.", CR);
            return true;
        }
        THING_WONT_LOCK(PRSI, PRSO, true);
        return true;
    }
    CANT_LOCK(true);
    return true;
}

function CANT_LOCK(_isUN=null) {
    TELL(CANT);
    if(isT(_isUN)) {
        TELL("un");
    }
    TELL("lock ", AO, PERIOD);
    return true;
}

function THING_WONT_LOCK(_THING, _CLOSED_THING, _isUN=null) {
    NOT_LIKELY(_THING);
    TELL(" could ");
    if(isT(_isUN)) {
        TELL("un");
    }
    TELL("lock ", THE(_CLOSED_THING), PERIOD);
    return true;
}

/*function V_SCREW_WITH() {
    NOT_LIKELY(PRSI);
    TELL(" could help you do that.", CR);
    return true;
}*/

/*function V_UNSCREW() {
    TELL(CANT, "unscrew ", THEO);
    if(!(isPRSI(HANDS))) {
        TELL(", with or without ", THEI);
    }
    PRINT(PERIOD);
    return true;
}*/

/*function V_UNSCREW_FROM() {
    if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIN(PRSO, PRSI))) {
        if(isIS(PRSI, LIVING)) {
            TELL(CTHEI, " doesn't have ", THEO, PERIOD);
            return true;
        }
        TELL(CTHEO);
        ISNT_ARENT();
        ON_IN(PRSI);
        TELL(PERIOD);
        return true;
    }
    TELL(CANT, "unscrew ", THEO, PERIOD);
    return true;
}*/

function V_UNTIE() {
    TELL(CANT, B(P_PRSA_WORD), C(SP), AO, PERIOD);
    return true;
}

function V_LOOK_ON() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(isIS(PRSO, SURFACE)) {
        TELL(YOU_SEE);
        CONTENTS();
        TELL(SON, THEO, PERIOD);
        return true;
    } else if(isIS(PRSO, READABLE)) {
        TELL(CTHEO);
        IS_ARE();
        TELL("undecipherable.", CR);
        return true;
    }
    NOTHING_INTERESTING();
    TELL(SON, THEO, PERIOD);
    return true;
}

function V_LOOK_BEHIND() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(isIS(PRSO, DOORLIKE)) {
        if(isIS(PRSO, OPENED)) {
            CANT_SEE_MUCH();
            return true;
        }
        ITS_CLOSED();
        return true;
    }
    TELL(NOTHING, "behind ", THEO, PERIOD);
    return true;
}

function V_LOOK_DOWN() {
    let _X;
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isIS(PRSO, PLACE)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isPRSO(ROOMS)) {
        _X = GETP(HERE, "BELOW");
        if(isT(_X)) {
            PERFORM("EXAMINE", _X);
            return true;
        } else if(isIS(HERE, INDOORS)) {
            PERFORM("EXAMINE", FLOOR);
            return true;
        }
        PERFORM("EXAMINE", GROUND);
        return true;
    }
    PERFORM("LOOK-INSIDE", PRSO);
    return true;
}

function V_LOOK_UP() {
    let _X=null;
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(isPRSO(ROOMS)) {
        _X = GETP(HERE, "OVERHEAD");
        if(isT(_X)) {
            PERFORM("EXAMINE", _X);
            return true;
        }
        NOTHING_INTERESTING();
        PRINT(PERIOD);
        return true;
    }
    TELL(CANT, "look up ", AO, PERIOD);
    return true;
}

function V_LOOK_INSIDE() {
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isIS(PRSO, PLACE)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isIS(PRSO, PERSON)) {
        NOT_A("surgeon");
        return true;
    } else if(isIS(PRSO, LIVING)) {
        NOT_A("veterinarian");
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        if((!(isIS(PRSO, OPENED))
  &&  !(isIS(PRSO, TRANSPARENT)))) {
            ITS_CLOSED();
            return true;
        } else if(isSEE_ANYTHING_IN()) {
            TELL(YOU_SEE);
            CONTENTS();
            TELL(SIN, THEO, PERIOD);
            return true;
        }
        TELL(CTHEO, " is empty.", CR);
        return true;
    } else if(isIS(PRSO, DOORLIKE)) {
        if(isIS(PRSO, OPENED)) {
            CANT_SEE_MUCH();
            return true;
        }
        ITS_CLOSED();
        return true;
    }
    TELL(CANT, "look inside ", AO, PERIOD);
    return true;
}

function V_LOOK_OUTSIDE() {
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isPRSO(ROOMS)) {
        if(isIS(HERE, INDOORS)) {
            NOTHING_INTERESTING();
            TELL(C(SP));
        } else {
            TELL(ALREADY);
        }
        TELL(B("OUTSIDE"), PERIOD);
        return true;
    } else if(isIS(PRSO, DOORLIKE)) {
        if(isIS(PRSO, OPENED)) {
            CANT_SEE_MUCH();
            return true;
        }
        ITS_CLOSED();
        return true;
    }
    TELL(CANT, "look out of ", AO, PERIOD);
    return true;
}

function V_SLOOK_THRU() {
    PERFORM("LOOK-THRU", PRSI, PRSO);
    return true;
}

function V_LOOK_THRU() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if((isT(PRSI)
  &&  !(isIS(PRSI, TRANSPARENT)))) {
        TELL(CANT, "look through that.", CR);
        return true;
    }
    NOTHING_INTERESTING();
    PRINT(PERIOD);
    return true;
}

function V_LOOK_UNDER() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    }
    NOTHING_INTERESTING();
    TELL(" under ", THEO, PERIOD);
    return true;
}

function V_WEDGE() {
    PERFORM("LOOSEN", PRSI, PRSO);
    return true;
}

function V_LOOSEN() {
    WASTE_OF_TIME();
    return true;
}

function V_LOWER() {
    if(isPRSO(ROOMS)) {
        DO_WALK("DOWN");
        return true;
    }
    V_RAISE();
    return true;
}

function V_MAKE() {
    isHOW();
    return true;
}

function V_MELT() {
    isHOW();
    return true;
}

function V_MOVE() {
    if(isPRSO(ROOMS)) {
        V_WALK_AROUND();
        return true;
    } else if(isIS(PRSO, TAKEABLE)) {
        TELL("Moving ", THEO, " would", PICK_NEXT(HO_HUM)
, PERIOD);
        return true;
    }
    TELL(IMPOSSIBLY, B(P_PRSA_WORD), C(SP), THEO, PERIOD);
    return true;
}

function V_MUNG() {
    if(isIS(PRSO, MONSTER)) {
        PERFORM("HIT", PRSO, PRSI);
        return true;
    } else if(!(isSPARK(null))) {
        HACK_HACK("Trying to destroy");
    }
    return true;
}


function V_PICK() {
    if(isIS(PRSO, OPENABLE)) {
        NOT_A("locksmith");
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_POINT() {
    if(isT(PRSI)) {
        if(isIS(PRSI, PERSON)) {
            TELL(CTHEI);
            if(isPRSO(PRSI)) {
                TELL(" looks confused.", CR);
                return true;
            }
            TELL(GLANCES_AT, THEO, ", but doesn't respond.", CR);
            return true;
        }
        NOT_LIKELY(PRSI);
        PRINT(" would respond.|");
        return true;
    }
    TELL("You point at ", THEO);
    NOTHING_HAPPENS();
    return true;
}

function NOTHING_HAPPENS(_BUT=true) {
    if(!(_BUT)) {
        PRINTC('\N'.charCodeAt(0));
    } else {
        TELL(", but n");
    }
    TELL("othing ", PICK_NEXT(YAWNS), " happens.", CR);
    return true;
}

function V_SPOINT_AT() {
    PERFORM("POINT-AT", PRSI, PRSO);
    return true;
}

function PRE_POINT_AT() {
    if((!(isLIT)
  &&  !(isEQUAL(PRSI, null, ME)))) {
        TOO_DARK();
        return true;
    } else {
        return false;
    }
}

function V_POINT_AT() {
    if(isPRSO(ME, HANDS)) {
        V_POINT();
        return true;
    }
    TELL(CYOU, B(P_PRSA_WORD), C(SP), THEO, " at ", THEI);
    NOTHING_HAPPENS();
    return true;
}

function V_POP() {
    TELL(CANT, B(P_PRSA_WORD), C(SP), AO, PERIOD);
    return true;
}

function V_POUR() {
    if(isPRSO(HANDS)) {
        TELL("[To do that, just DROP EVERYTHING.]", CR);
        return RFATAL();
    } else if(isIS(PRSO, SURFACE)) {
        EMPTY_PRSO(GROUND);
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        if(isIS(PRSO, OPENED)) {
            EMPTY_PRSO(GROUND);
            return true;
        }
        ITS_CLOSED();
        return true;
    }
    TELL(CANT, "empty that.", CR);
    return true;
}

function V_POUR_FROM() {
    if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(isPRSI(HANDS)) {
        PERFORM("DROP", PRSO);
        return true;
    } else if((!(isIS(PRSI, CONTAINER))
  &&  !(isIS(PRSI, SURFACE)))) {
        TELL(CANT, B(P_PRSA_WORD), " things from ", A(PRSI), PERIOD);
        return true;
    } else if((isIS(PRSI, CONTAINER)
  &&  !(isIS(PRSI, OPENED)))) {
        ITS_CLOSED(PRSI);
        return true;
    } else if(isIN(PRSO, PRSI)) {
        if(isIS(PRSO, TAKEABLE)) {
            TELL(CTHEO, C(SP));
            FALLS();
            return true;
        }
        IMPOSSIBLE();
        return true;
    }
    TELL(CTHEO, " isn't in ", THEI, PERIOD);
    return true;
}

function V_EMPTY_INTO() {
    if(isPRSI(HANDS, ME)) {
        V_EMPTY();
        return true;
    } else if(isPRSI(GROUND, FLOOR, GLOBAL_ROOM)) {
        if(isHERE(IN_SKY)) {
            CANT_FROM_HERE();
            return true;
        }
        V_EMPTY(LOC(WINNER));
        return true;
    } else if(isIS(PRSI, SURFACE)) {
        V_EMPTY(PRSI);
        return true;
    } else if(isIS(PRSI, CONTAINER)) {
        if(isIS(PRSI, OPENED)) {
            V_EMPTY(PRSI);
            return true;
        }
        ITS_CLOSED(PRSI);
        return true;
    }
    TELL(CANT, "empty ", THEO);
    ON_IN(PRSI);
    TELL(PERIOD);
    return true;
}

function V_EMPTY(_DEST=0) {
    if(isIS(PRSO, PERSON)) {
        
    } else if(isIS(PRSO, LIVING)) {
        
    } else if(isIS(PRSO, MONSTER)) {
        
    } else if(isIS(PRSO, SURFACE)) {
        EMPTY_PRSO(_DEST);
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        if(isIS(PRSO, OPENED)) {
            EMPTY_PRSO(_DEST);
            return true;
        }
        ITS_CLOSED();
        return true;
    }
    TELL(IMPOSSIBLY, "empty ", THEO, PERIOD);
    return true;
}

function EMPTY_PRSO(_DEST) {
    let _ANY=0, _OBJ, _NXT, _X, _ICAP, _ILOAD, _OSIZE;
    if(isT(_DEST)) {
        _X = LOC(_DEST);
        if((!(_X)
  ||  isEQUAL(PRSO, _DEST))) {
            IMPOSSIBLE();
            return true;
        } else if((isEQUAL(_X, PRSO)
  ||  isIN(_X, PRSO))) {
            YOUD_HAVE_TO("remove", _DEST);
            return true;
        }
    } else {
        _DEST = WINNER;
    }
    if(!(isSEE_ANYTHING_IN())) {
        TELL("There's nothing");
        ON_IN();
        TELL(PERIOD);
        return true;
    }
    isP_MULT = true;
    if(!(isEQUAL(_DEST, WINNER, LOC(WINNER)))) {
        _ILOAD = WEIGHT(_DEST);
        _ILOAD = (_ILOAD - GETP(_DEST, "SIZE"));
        _ICAP = GETP(_DEST, "CAPACITY");
    }
    if((_OBJ = isFIRST(PRSO))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if(!(isIS(_OBJ, TAKEABLE))) {
                
            } else if(!(isIS(_OBJ, NODESC))) {
                ++_ANY
                _OSIZE = GETP(_OBJ, "SIZE");
                if(!(isIS(_OBJ, NOARTICLE))) {
                    TELL(XTHE);
                }
                TELL(D(_OBJ), ": ");
                if(isEQUAL(_DEST, WINNER)) {
                    _X = PERFORM("TAKE", _OBJ, PRSO);
                    if(isEQUAL(_X, M_FATAL)) {
                        break;
                    }
                } else if(isEQUAL(_DEST, LOC(WINNER))) {
                    if(isIS(_OBJ, PLURAL)) {
                        TELL("They ");
                    } else {
                        TELL("It ");
                    }
                    FALLS(_OBJ);
                } else if(_OSIZE > _ICAP) {
                    TELL(CTHE(_OBJ));
                    IS_ARE(_OBJ);
                    TELL("too big to fit in "
, THE(_DEST), PERIOD);
                } else if((_ILOAD + _OSIZE) > _ICAP) {
                    NO_ROOM_IN(_DEST);
                } else {
                    UNMAKE(_OBJ, WIELDED);
                    MOVE(_OBJ, _DEST);
                    TELL("Done.", CR);
                }
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    WINDOW(SHOWING_ALL);
    isP_MULT = null;
    if(!(_ANY)) {
        TELL(NOTHING, "you can take.", CR);
    }
    return true;
}

function V_PULL() {
    if(!(isSPARK(null))) {
        HACK_HACK("Pulling on");
    }
    return true;
}

function V_PUSH() {
    if(!(isSPARK(null))) {
        HACK_HACK("Pushing around");
    }
    return true;
}

function V_PUSH_TO() {
    if((isPRSO(HANDS)
  &&  isT(PRSI))) {
        PERFORM("REACH-IN", PRSI);
        return true;
    }
    PUSHOVER();
    return true;
}

function PUSHOVER() {
    TELL(CANT, "push ", THEO, " around like that.", CR);
    return true;
}

function V_PUSH_UP() {
    if((isPRSO(HANDS)
  &&  isT(PRSI))) {
        PERFORM("RAISE", PRSI);
        return true;
    }
    PUSHOVER();
    return true;
}

function V_PUSH_DOWN() {
    if((isPRSO(HANDS)
  &&  isT(PRSI))) {
        PERFORM("LOWER", PRSI);
        return true;
    }
    PUSHOVER();
    return true;
}

function PRE_PUT() {
    let _L;
    _L = LOC(PRSO);
    if(isPRSO(PRSI)) {
        isHOW();
        return true;
    } else if(isPRSI(INTDIR, RIGHT, LEFT)) {
        NYMPH_APPEARS();
        TELL("You really must specify an object");
        PRINT(". Bye!\"|  She disappears with a wink.|");
        return true;
    } else if(isPRSI(HANDS, HEAD)) {
        if((isPRSI(HEAD)
  &&  isPRSO(HELM))) {
            PERFORM("WEAR", PRSO);
            return true;
        }
        NOT_LIKELY();
        TELL(" would fit very well.", CR);
        return true;
    } else if((isEQUAL(FEET, PRSO, PRSI)
  ||  isEQUAL(HEAD, PRSO, PRSI))) {
        WASTE_OF_TIME();
        return true;
    } else if(!(isLIT)) {
        if((isPRSI(GRUE, URGRUE)
  &&  isWEARING_MAGIC(HELM))) {
            
        } else if(isIN(PRSI, WINNER)) {
            
        } else {
            TOO_DARK();
            return true;
        }
    }
    if(isPRSO(MONEY, INTNUM)) {
        BENJAMIN();
        return true;
    } else if(isPRSI(GROUND, FLOOR)) {
        PERFORM("DROP", PRSO);
        return true;
    } else if(isIN(PRSI, GLOBAL_OBJECTS)) {
        IMPOSSIBLE();
        return true;
    } else if(isPRSO(HANDS)) {
        PERFORM("REACH-IN", PRSI);
        return true;
    } else if(isEQUAL(_L, PRSI)) {
        TELL(CTHEO);
        IS_ARE();
        TELL("already");
        ON_IN(PRSI);
        TELL(PERIOD);
        return true;
    } else if((isEQUAL(PRSO, PRSI)
  ||  isEQUAL(_L, GLOBAL_OBJECTS)
  ||  !(isIS(PRSO, TAKEABLE)))) {
        IMPOSSIBLE();
        return true;
    } else if(!(isACCESSIBLE(PRSI))) {
        CANT_SEE_ANY(PRSI);
        return true;
    } else if((isIS(PRSO, WORN)
  &&  isEQUAL(_L, WINNER)
  &&  !(isPRSI(ME, WINNER)))) {
        return isTAKE_OFF_PRSO_FIRST();
    } else if((isIN(_L, WINNER)
  &&  isVISIBLE(PRSO))) {
        TAKING_OBJ_FIRST(PRSO);
        if(ITAKE()) {
            return false;
        }
        return true;
    } else {
        return false;
    }
}

function isTAKE_OFF_PRSO_FIRST() {
    let _X;
    _X = GETP(PRSO, "EFFECT");
    if(!(_X)) {
        
    } else if(isPRSO(CLOAK)) {
        
    } else if((isIN(CLOAK, PLAYER)
  &&  isIS(CLOAK, WORN))) {
        YOUD_HAVE_TO("take off", CLOAK);
        return true;
    }
    UNMAKE(PRSO, WORN);
    WINDOW(SHOWING_INV);
    TELL("[taking off ", THEO, " first]", CR);
    if((isPRSO(AMULET)
  &&  isT(AMULET_TIMER))) {
        NORMAL_STRENGTH();
        return true;
    } else if(isHOTFOOT(true)) {
        return true;
    } else if((isPRSO(HELM)
  &&  !(isIS(PRSO, NEUTRALIZED)))) {
        NORMAL_IQ();
    }
    if(isT(_X)) {
        UPDATE_STAT((0 - _X), ARMOR_CLASS);
    }
    TELL(TAB);
    return false;
}

function PRE_PUT_ON() {
    if(PRE_PUT()) {
        return true;
    } else if(isPRSI(CHEST)) {
        return false;
    } else if(!(isIS(PRSI, SURFACE))) {
        NO_GOOD_SURFACE();
        return true;
    } else {
        return false;
    }
}

function NO_GOOD_SURFACE(_OBJ=PRSI) {
    TELL("There's no good surface on ", THE(_OBJ), PERIOD);
    return true;
}

function V_PUT_ON() {
    if(isPRSI(ME)) {
        PERFORM("WEAR", PRSO);
        return true;
    }
    V_PUT();
    return true;
}

function V_PUT() {
    let _OL, _ICAP, _ILOAD, _OSIZE;
    _OL = LOC(PRSO);
    if((!(_OL)
  ||  (isT(PRSI)
  &&  !(isIS(PRSI, SURFACE))
  &&  !(isIS(PRSI, CONTAINER))))) {
        IMPOSSIBLE();
        return true;
    } else if((!(isIS(PRSI, OPENED))
  &&  !(isIS(PRSI, SURFACE)))) {
        THIS_IS_IT(PRSI);
        TELL(CTHEI);
        ISNT_ARENT(PRSI);
        TELL(" open.", CR);
        return true;
    } else if(!(isEQUAL(_OL, WINNER))) {
        TELL("Maybe you should take ", THEO);
        OUT_OF_LOC(_OL);
        TELL(SFIRST);
        return true;
    }
    _ILOAD = WEIGHT(PRSI);
    _ILOAD = (_ILOAD - GETP(PRSI, "SIZE"));
    _ICAP = GETP(PRSI, "CAPACITY");
    _OSIZE = GETP(PRSO, "SIZE");
    if(_OSIZE > _ICAP) {
        TELL(CTHEO);
        IS_ARE();
        TELL("too big to fit");
        ON_IN(PRSI);
        TELL(PERIOD);
        return true;
    } else if((_ILOAD + _OSIZE) > _ICAP) {
        NO_ROOM_IN(PRSI);
        return true;
    }
    WINDOW(SHOWING_ALL);
    UNMAKE(PRSO, WIELDED);
    MOVE(PRSO, PRSI);
    MAKE(PRSO, TOUCHED);
    if(isT(isP_MULT)) {
        TELL("Done.", CR);
        return true;
    }
    TELL("You put ", THEO);
    ON_IN(PRSI);
    TELL(PERIOD);
    return true;
}

function NO_ROOM_IN(_OBJ) {
    TELL("There isn't enough room");
    ON_IN(_OBJ);
    TELL(PERIOD);
    return true;
}

/*function V_SCREW() {
    TELL(CANT, "screw ");
    O_INTO_I();
    return true;
}*/

function V_PLUG_IN() {
    TELL(CANT, B(P_PRSA_WORD), C(SP));
    O_INTO_I();
    return true;
}

function NEVER_FIT() {
    TELL("You'd never fit ");
    O_INTO_I();
    return true;
}

function O_INTO_I(_NOCR) {
    TELL(THEO, SINTO, THEI);
    if(!(isASSIGNED(_NOCR))) {
        TELL(PERIOD);
    }
    return false;
}

function V_UNPLUG() {
    TELL(CTHEO);
    ISNT_ARENT();
    TELL(" connected to ");
    if(isT(PRSI)) {
        TELL(THEI);
    } else {
        TELL("anything");
    }
    PRINT(PERIOD);
    return true;
}

function V_PUT_BEHIND() {
    TELL("That hiding place is too obvious.", CR);
    return true;
}

function V_PUT_UNDER() {
    TELL(CANT, "put anything under that.", CR);
    return true;
}

function V_RAPE() {
    TELL("What a wholesome idea.", CR);
    return true;
}

function V_RAISE() {
    if(isPRSO(ROOMS)) {
        V_STAND();
        return true;
    } else if(!(isSPARK(null))) {
        HACK_HACK("Toying in this way with");
    }
    return true;
}

function V_REACH_IN() {
    let _OBJ;
    _OBJ = isFIRST(PRSO);
    if((isIS(PRSO, PERSON)
  ||  isIS(PRSO, LIVING))) {
        NOT_A("surgeon");
        return true;
    } else if(isIS(PRSO, DOORLIKE)) {
        if(isIS(PRSO, OPENED)) {
            REACH_INTO_PRSO();
            TELL(", but experience nothing "
, PICK_NEXT(YAWNS), PERIOD);
            return true;
        }
        ITS_CLOSED();
        return true;
    } else if(!(isIS(PRSO, CONTAINER))) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIS(PRSO, OPENED))) {
        TELL("It's not open.", CR);
        return true;
    } else if((isIN(PRSO, PLAYER)
  &&  isIS(PRSO, WORN))) {
        YOUD_HAVE_TO("take off");
        return true;
    } else if((!(_OBJ)
  ||  !(isIS(_OBJ, TAKEABLE)))) {
        PRINT("It's empty.|");
        return true;
    }
    THIS_IS_IT(_OBJ);
    REACH_INTO_PRSO();
    TELL(" and feel ", B("SOMETHING"), PERIOD);
    return true;
}

function REACH_INTO_PRSO() {
    TELL("You reach into ", THEO);
    return true;
}

function V_READ() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(!(isIS(PRSO, READABLE))) {
        HOW_READ();
        TELL("?", CR);
        return true;
    }
    TELL(NOTHING, "written on it.", CR);
    return true;
}

function V_READ_TO() {
    if(!(isLIT)) {
        TOO_DARK();
        return RFATAL();
    } else if(!(isIS(PRSO, READABLE))) {
        HOW_READ();
        TELL(STO, A(PRSI), "?", CR);
        return true;
    } else if(isEQUAL(WINNER, PLAYER)) {
        NOT_LIKELY(PRSI);
        TELL(" would appreciate your reading.", CR);
        return true;
    }
    TELL("Maybe you ought to do it.", CR);
    return true;
}

function HOW_READ() {
    TELL("How can you read ", AO);
    return true;
}

function V_RELEASE() {
    if(isIN(PRSO, WINNER)) {
        PERFORM("DROP", PRSO);
        return true;
    }
    if(isPRSO(ME)) {
        TELL("You aren't");
    } else {
        TELL(CTHEO);
        ISNT_ARENT();
    }
    TELL(" being held by anything.", CR);
    return true;
}

function V_REPLACE() {
    if(isPRSO(ME)) {
        TELL("Easily done.", CR);
        return true;
    }
    TELL(CTHEO, " doesn't need replacement.", CR);
    return true;
}

function V_REPAIR() {
    if(isPRSO(ME)) {
        TELL("You aren't");
    } else {
        TELL(CTHEO);
        ISNT_ARENT();
    }
    TELL(" in need of repair.", CR);
    return true;
}

function V_HELP() {
    TELL("[If you're really stuck, maps and InvisiClues(TM) Hint Booklets are available at most Infocom dealers, or use the order form included in your game package.]", CR);
    return true;
}

function V_RESCUE() {
    if(isPRSO(ME)) {
        if(isEQUAL(WINNER, PLAYER)) {
            V_HELP();
            return true;
        }
        isHOW();
        return true;
    }
    TELL(CTHEO);
    if(isIS(PRSO, PLURAL)) {
        TELL(" do");
    } else {
        TELL(" does");
    }
    TELL("n't need any help.", CR);
    return true;
}

function V_RIDE() {
    if(isIS(PRSO, LIVING)) {
        NOT_LIKELY();
        TELL(" wants to play piggyback.", CR);
        return true;
    } else if(isIS(PRSO, VEHICLE)) {
        PERFORM("ENTER", PRSO);
        return true;
    }
    TELL(CANT, "ride that.", CR);
    return true;
}

function V_TOUCH() {
    if(!(isSPARK(null))) {
        HACK_HACK("Fiddling with");
    }
    return true;
}

function V_STOUCH_TO() {
    PERFORM("TOUCH-TO", PRSI, PRSO);
    return true;
}

function V_TOUCH_TO() {
    if(isSPARK_TO()) {
        return true;
    }
    TELL(CYOU, B(P_PRSA_WORD), C(SP), THEO, " against ", THEI);
    NOTHING_HAPPENS();
    return true;
}

function V_SCRATCH() {
    if(!(isSPARK(null))) {
        TELL(CYOU, B(P_PRSA_WORD), " your fingers across ", THEO);
        BUT_NOTHING_HAPPENS();
    }
    return true;
}

function BUT_NOTHING_HAPPENS() {
    TELL(", but nothing ", PICK_NEXT(YAWNS), " happens.", CR);
    return true;
}

function BUT_FIND_NOTHING() {
    TELL(", but nothing ", PICK_NEXT(YAWNS), " turns up.", CR);
    return true;
}

function V_PEEL() {
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO, PERIOD);
    return true;
}

function V_SCRAPE_ON() {
    if(isSPARK_TO()) {
        return true;
    } else if(isPRSO(HANDS)) {
        PERFORM("TOUCH", PRSI);
        return true;
    } else if(isPRSO(FEET)) {
        PERFORM("KICK", PRSI);
        return true;
    }
    TELL(CYOU, B(P_PRSA_WORD), C(SP), THEO);
    if(!(isEQUAL(PRSI, null, HANDS))) {
        TELL(SON, THEI);
    }
    NOTHING_HAPPENS();
    return true;
}

function V_BOW() {
    HACK_HACK("Paying respect to");
    return true;
}

function V_SEARCH() {
    if(isIS(PRSO, PLACE)) {
        CANT_SEE_MUCH();
        return true;
    } else if(isIS(PRSO, CONTAINER)) {
        if((!(isIS(PRSO, OPENED))
  &&  !(isIS(PRSO, TRANSPARENT)))) {
            YOUD_HAVE_TO("open");
            return true;
        }
        TELL(YOU_SEE);
        CONTENTS();
        TELL(" inside ", THEO, PERIOD);
        return true;
    } else if(isIS(PRSO, SURFACE)) {
        TELL(YOU_SEE);
        CONTENTS();
        TELL(SON, THEO, PERIOD);
        return true;
    } else if(isIS(PRSO, PERSON)) {
        PERFORM("USE", PRSO);
        return true;
    }
    NOTHING_INTERESTING();
    PRINT(PERIOD);
    return true;
}

function V_SHAKE() {
    if(isSPARK(null)) {
        return true;
    } else if(isIS(PRSO, PERSON)) {
        PERFORM("ALARM", PRSO);
        return true;
    } else if((!(isIS(PRSO, TAKEABLE))
  &&  !(isIS(PRSO, TRYTAKE)))) {
        HACK_HACK("Shaking");
        return true;
    }
    WASTE_OF_TIME();
    return true;
}

function V_SFIRE_AT() {
    PERFORM("FIRE-AT", PRSI, PRSO);
    return true;
}

function V_FIRE_AT() {
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO, " at anything.", CR);
    return true;
}

function V_ZAP_WITH() {
    TELL(CANT, "zap things with ", A(PRSI), PERIOD);
    return true;
}

function V_SIT() {
    if(isPRSO(ROOMS)) {
        if(isHERE(IN_CHAPEL)) {
            ENTER_PEW();
            return true;
        }
    }
    NO_PLACE_TO_PRSA();
    return true;
}

function NO_PLACE_TO_PRSA() {
    TELL("There's no place to ", B(P_PRSA_WORD), " here.", CR);
    return true;
}

function V_SMELL() {
    let _X;
    if(isPRSO(ROOMS)) {
        _X = GETP(HERE, "ODOR");
        if(!(_X)) {
            TELL(DONT, "smell anything "
, PICK_NEXT(YAWNS), PERIOD);
            return true;
        }
        PERFORM("SMELL", _X);
        return true;
    } else if(!(isIS(PRSO, LIVING))) {
        TELL("It");
    } else if(isIS(PRSO, FEMALE)) {
        TELL("She");
    } else {
        TELL("He");
    }
    TELL(" smells just like ", AO, PERIOD);
    return true;
}

function V_PLANT() {
    IMPOSSIBLE();
    return true;
}

function V_UPROOT() {
    TELL(CTHEO, " isn't rooted anywhere.", CR);
    return true;
}

function V_SPIN() {
    if(isPRSO(ROOMS, ME)) {
        TELL("You begin to feel a little dizzy.", CR);
        return true;
    }
    TELL(CANT, "spin that.", CR);
    return true;
}

function V_SQUEEZE() {
    if(!(isSPARK(null))) {
        WASTE_OF_TIME();
    }
    return true;
}

function V_DUCK() {
    WASTE_OF_TIME();
    return true;
}

function V_STAND() {
    if(isPRSO(ROOMS)) {
        if(isIN(PLAYER, PEW)) {
            EXIT_PEW();
            return true;
        }
    }
    ALREADY_STANDING();
    return true;
}

function ALREADY_STANDING() {
    TELL(ALREADY, "standing.", CR);
    return true;
}

function V_STAND_ON() {
    WASTE_OF_TIME();
    return true;
}

function V_STAND_UNDER() {
    IMPOSSIBLE();
    return true;
}

function V_SWING() {
    if(!(PRSI)) {
        WASTE_OF_TIME();
        return true;
    }
    PERFORM("HIT", PRSI, PRSO);
    return true;
}

function V_DIVE() {
    if(isPRSO(ROOMS)) {
        if(isHERE(IN_SKY)) {
            DISMOUNT_DACT();
            return true;
        }
    }
    V_SWIM();
    return true;
}

function V_SWIM() {
    if(isPRSO(ROOMS)) {
        if(isHERE(ON_BRIDGE)) {
            JUMP_OFF_BRIDGE();
            return true;
        } else if(isHERE(JUN0)) {
            ENTER_QUICKSAND();
            return true;
        } else if(isHERE(ON_WHARF, AT_LEDGE, AT_BRINE)) {
            DO_WALK("DOWN");
            return true;
        }
        NO_PLACE_TO_PRSA();
        return true;
    } else if((isPRSO(INTDIR)
  &&  isT(P_DIRECTION)
  &&  isEQUAL(WINNER, PLAYER))) {
        TELL(CANT, B(P_PRSA_WORD), " that way from here.", CR);
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_SGET_FOR() {
    PERFORM("TAKE", PRSI);
    return true;
}

function V_GET_FOR() {
    PERFORM("TAKE", PRSO);
    return true;
}

function V_TAKE_WITH() {
    isHOW();
    return true;
}

function V_TAKE_OFF() {
    let _X;
    if(isPRSO(ROOMS)) {
        _X = LOC(WINNER);
        if((isEQUAL(P_PRSA_WORD, "GET")
  &&  !(isEQUAL(_X, HERE))
  &&  isIS(_X, VEHICLE))) {
            PERFORM("EXIT", _X);
            return true;
        }
        V_WALK_AROUND();
        return true;
    } else if(isPRSO(HANDS, FEET)) {
        IMPOSSIBLE();
        return true;
    } else if(isIS(PRSO, PLACE)) {
        NOT_IN();
        return true;
    } else if(isIS(PRSO, TAKEABLE)) {
        _X = LOC(PRSO);
        if(!(_X)) {
            REFERRING();
            return true;
        } else if((isEQUAL(_X, WINNER)
  &&  isIS(PRSO, CLOTHING))) {
            if(isIS(PRSO, WORN)) {
                if(isHOTFOOT()) {
                    return true;
                }
                TAKEOFF();
                _X = GETP(PRSO, "EFFECT");
                if(isT(_X)) {
                    UPDATE_STAT((0 - _X), ARMOR_CLASS);
                }
                return true;
            }
            PRINT("You're not wearing ");
            TELL(THEO, PERIOD);
            return true;
        } else if(!(isIS(_X, SURFACE))) {
            TELL(CTHEO, " isn't \"on\" anything.", CR);
            return true;
        }
        PERFORM("TAKE", PRSO);
        return true;
    } else if(isIS(PRSO, VEHICLE)) {
        PERFORM("EXIT", PRSO);
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function TAKEOFF() {
    WINDOW(SHOWING_INV);
    UNMAKE(PRSO, WORN);
    TELL("You take off ", THEO, PERIOD);
    return true;
}

function isHOTFOOT(_INDENT) {
    if((isPRSO(RING)
  &&  isT(MAGMA_TIMER)
  &&  isHERE(FOREST_EDGE, ON_TRAIL, ON_PEAK))) {
        if(isASSIGNED(_INDENT)) {
            TELL(TAB);
        }
        TELL("You slip ", THEO, " off ", HANDS, PTAB);
        ITALICIZE("Whoosh");
        TELL("! Your flesh bakes in the volcanic heat of the lava underfoot");
        JIGS_UP();
        return true;
    } else {
        return false;
    }
}

function V_TASTE() {
    PERFORM("EAT", PRSO);
    return true;
}

function V_ADJUST() {
    if(!(isSPARK(null))) {
        TELL(CTHEO, " doesn't need adjustment.", CR);
    }
    return true;
}

"*** CHARACTER INTERACTION DEFAULTS ***"

function isSILLY_SPEAK() {
    if(isEQUAL(PRSO, null, ROOMS)) {
        return false;
    } else if(!(isIS(PRSO, PERSON))) {
        NOT_LIKELY();
        PRINT(" would respond.|");
        PCLEAR();
        return true;
    } else if(isPRSO(ME, PRSI, WINNER)) {
        WASTE_OF_TIME();
        PCLEAR();
        return true;
    } else {
        THIS_IS_IT(PRSO);
        return false;
    }
}

function V_ASK_ABOUT() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    } else if(isEQUAL(WINNER, PRSI)) {
        WASTE_OF_TIME();
        return RFATAL();
    } else if((isPRSO(ME)
  ||  isEQUAL(WINNER, PLAYER))) {
        TALK_TO_SELF();
        return true;
    }
    NO_RESPONSE();
    return true;
}

function V_REPLY() {
    let _WHO;
    if(isSILLY_SPEAK()) {
        return RFATAL();
    }
    NO_RESPONSE(PRSO);
    return true;
}

function V_QUESTION() {
    if(isEQUAL(WINNER, PLAYER)) {
        TO_DO_THING_USE("ask about", "ASK CHARACTER ABOUT");
        return RFATAL();
    }
    NO_RESPONSE();
    return true;
}

function V_ALARM() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    }
    if(isPRSO(ROOMS, ME)) {
        TELL(ALREADY, "wide awake.", CR);
        return true;
    } else if(isIS(PRSO, LIVING)) {
        TELL(CTHEO);
        IS_ARE();
        TELL("already wide awake.", CR);
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_YELL() {
    if(isPRSO(ROOMS)) {
        TELL("You begin to get a sore throat.", CR);
        if(isHERE(ON_WHARF)) {
            TELL(TAB);
            NOT_DEAF();
        }
        return true;
    }
    V_SAY();
    return true;
}

function V_LAUGH() {
    if(isPRSO(ROOMS)) {
        TELL("There's a place for people who ", B(P_PRSA_WORD), " without reason.", CR);
        return true;
    } else if(isEQUAL(P_PRSA_WORD, "INSULT", "OFFEND")) {
        if(isIS(PRSO, MONSTER)) {
            TELL(CTHEO, " look");
            if(!(isIS(PRSO, PLURAL))) {
                TELL("s");
            }
            TELL(" mad enough already.", CR);
            return true;
        } else if(isIS(PRSO, LIVING)) {
            TELL(CTHEO, " remain");
            if(!(isIS(PRSO, PLURAL))) {
                TELL("s");
            }
            TELL(" silent. Maybe you should too.", CR);
            return true;
        }
        NOT_LIKELY();
        TELL(" would be offended.");
        return true;
    }
    V_SAY();
    return true;
}

function PRE_NAME() {
    if(!(PRSI)) {
        SEE_MANUAL("name things");
        return true;
    } else if(!(isPRSI(QWORD))) {
        HOLLOW_VOICE("reserved by the Implementors");
        return true;
    } else {
        return false;
    }
}

function V_NAME(_OBJ=PRSO) {
    let _TBL, _WORD, _BASE, _LEN, _PTR, _CHAR, _COMPLEX, _BAD, _ANY, _X;
    PCLEAR();
    _TBL = GETP(_OBJ, "NAME-TABLE");
    if((!(isIS(_OBJ, NAMEABLE))
  ||  !(_TBL))) {
        TELL("Alas; ", THE(_OBJ));
        if(isIS(PRSO, PERSON)) {
            TELL(" already ha");
            if(isIS(PRSO, PLURAL)) {
                TELL("ve");
            } else {
                TELL("s");
            }
            TELL(" a Name.", CR);
            return true;
        }
        TELL(" cannot be Named.", CR);
        return true;
    } else if(isIS(_OBJ, NAMED)) {
        TELL("You've already assigned a Name to ", THE(_OBJ
), ". To alter that Name, you must first Unmake ");
        PRONOUN(_OBJ, true);
        TELL(", a dangerous procedure requiring years of magical training. Someday, perhaps...", CR);
        return true;
    }

    COPYT(_TBL, 0, (NAMES_LENGTH + 1));

    /*"Convert word typed into a byte LTABLE in AUX-TABLE."*/

    _BASE = P_LEXV.strings[P_QWORD];//REST(P_LEXV, (P_QWORD));
    _LEN = _BASE.length;//_BASE[2];    /*"Length of word typed."*/
    AUX_TABLE[0] = _LEN;    /*"Save it here."*/
    //_BASE = REST(P_INBUF, _BASE[3]);    /*"And start"*/
    COPYT(_BASE.split(""), REST(AUX_TABLE, 1), _LEN);
    AUX_TABLE[(_LEN + 1)] = 0;    /*"Zero-terminate."*/

    /*"Scan for obviously silly names."*/

    _PTR = _LEN;
    _BAD = 0;
    _ANY = 0;
    while(true) {
        _CHAR = AUX_TABLE[_PTR];
        /*if((_CHAR > ('\a'.charCodeAt(0) - 1)
  &&  _CHAR < ('\z'.charCodeAt(0) + 1))) {*/
        if (/[A-Z]/.test(_CHAR)){
            ++_ANY
        } else {
            ++_BAD
            break;
        }
        if(--_PTR < 1) {
            break;
        }
    }
    if((!(_ANY)
  ||  isT(_BAD))) {
        HOLLOW_VOICE("too complex");
        return true;
    } else if(_LEN > (NAMES_LENGTH - 1)) {
        HOLLOW_VOICE("too long");
        return true;
    }

    /*"Copy AUX-TABLE into TBL w/appropriate caps."*/

    /*_PTR = 1;
    while(true) {
        _CHAR = AUX_TABLE[_PTR];
        if(isEQUAL(_PTR, 1)) {
            _CHAR = (_CHAR - 32);
        }
        _TBL[_PTR] = _CHAR;
        if(++_PTR > _LEN) {
            break;
        }
    }
    _TBL[0] = _LEN;
    _TBL[(_LEN + 1)] = 0;    /*"Zero-terminate."*/
    _TBL[0] = _LEN;
    _TBL[1] = _BASE[0] + _BASE.slice(1).toLowerCase();

    ADD_VOCAB(_BASE, _OBJ);
    isADD_CAP(_BASE);
    MAKE(_OBJ, NAMED);
    MAKE(_OBJ, NOARTICLE);
    MAKE(_OBJ, PROPER);
    WINDOW(SHOWING_ALL);
    TELL("You invoke the Spell of Naming, and the ");
    if((isEQUAL(_OBJ, BFLY)
  &&  isIS(BFLY, MUNGED))) {
        PRINT("caterpillar");
    } else if((isEQUAL(_OBJ, PHASE)
  &&  !(isHERE(APLANE)))) {
        TELL(B("OUTLINE"));
    } else {
        PRINTD(_OBJ);
    }
    TELL(" basks in the glow of a new-forged synonym. Henceforth, you may refer to ");
    PRONOUN(_OBJ, true);
    TELL(" as \"");
    PRINT_TABLE([_TBL[0], ..._TBL[1].split("")]);
    TELL(PERQ);
    return true;
}

`Adds the ASCII byte-LTABLE string at TBL to the alternate charset, using
 the PS? field of synonym .WRD. Returns base address of new word.`

function ADD_VOCAB(_TBL, _OBJ) {
    let _WRD, _SYNS, _SIBS, _ELEN, _CNT, _BASE, _LEN;
    _SYNS = GETPT(_OBJ, "SYNONYM");
    _WRD = _SYNS[0];
    _SYNS.push(_TBL);
    VOCAB2[_TBL] = [...VOCAB2[_WRD]];
    //_SIBS = VOCAB2[0];    /*"Size of SIB table."*/
    //_ELEN = REST(VOCAB2, (_SIBS + 1))[0];    /*"Entry length."*/
    //_CNT = REST(VOCAB2, (_SIBS + 2))[0];    /*"# entries."*/

    /*_BASE = REST(VOCAB2, (_SIBS + 4));
    if(isT(_CNT)) {
        _BASE = REST(_BASE, (_ELEN * (0 - _CNT)));
    }*/

    //ZWSTR(_TBL, _TBL[0], 1, _BASE);

    //_TBL = REST(_WRD, 6);    /*"Point to PS? field of synonym."*/
    //_LEN = (_ELEN - 6);    /*"Length of PS? field."*/
    //COPYT(_TBL, REST(_BASE, 6), _LEN);    /*"Copy PS? field of synonym."*/

    //--_CNT    /*"List is unsorted, so CNT is negative."*/
    //REST(VOCAB2, (_SIBS + 2))[0] = _CNT;    /*"Update count."*/
    //_SYNS[1] = _BASE;
    //return _BASE;
}

function V_GOODBYE() {
    V_HELLO();
    return true;
}

function V_HELLO() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    } else if(isPRSO(ROOMS)) {
        TALK_TO_SELF();
        return true;
    }
    NO_RESPONSE(PRSO);
    return true;
}

function V_WAVE_AT() {
    V_WHAT();
    return true;
}

function V_REQUEST() {
    let _L;
    _L = LOC(PRSO);
    if(!(isVISIBLE(_L))) {
        CANT_SEE_ANY();
        return true;
    } else if(isIS(_L, PERSON)) {
        SPOKEN_TO(_L);
        PERFORM("ASK-FOR", _L, PRSO);
        return true;
    } else if(isIS(PRSO, TAKEABLE)) {
        
    } else if(isIS(PRSO, TRYTAKE)) {
        
    } else {
        NOT_LIKELY();
        TELL(" could be moved.", CR);
        return true;
    }
    TELL(DONT, "have to ask for ", THEO, ". Just take ");
    if(isIS(PRSO, PLURAL)) {
        TELL(B("THEM"));
    } else {
        TELL(B("IT"));
    }
    if((isIS(_L, SURFACE)
  ||  isIS(_L, CONTAINER))) {
        OUT_OF_LOC(_L);
    }
    TELL(PERIOD);
    return true;
}

function V_SASK_FOR() {
    PERFORM("ASK-FOR", PRSI, PRSO);
    return true;
}

function V_ASK_FOR() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    } else if((isEQUAL(WINNER, PRSI)
  ||  !(isIS(PRSI, TAKEABLE)))) {
        IMPOSSIBLE();
        return true;
    }
    NO_RESPONSE(PRSO);
    return true;
}

function V_TELL() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    } else if(isPRSO(ME)) {
        if(isEQUAL(WINNER, PLAYER)) {
            TALK_TO_SELF();
            return true;
        }
    } else {
        SEE_CHARACTER(PRSO);
        if(isT(P_CONT)) {
            WINNER = PRSO;
            return true;
        }
    }
    NO_RESPONSE(PRSO);
    return true;
}

function V_TELL_ABOUT() {
    if(!(isEQUAL(WINNER, PLAYER))) {
        TELL(CTHE(WINNER));
        if(isPRSO(ME)) {
            TELL(" shrugs. \"I don't know anything about ", THEI, " you don't know.", CR);
            return true;
        }
        TELL(" snorts. \"Don't be ridiculous.\"", CR);
        return true;
    }
    V_WHAT();
    return true;
}

function V_THANK() {
    if(isSILLY_SPEAK()) {
        return RFATAL();
    } else if(isEQUAL(WINNER, PLAYER)) {
        if(isPRSO(ME)) {
            TELL("Self-congratulations");
            WONT_HELP();
            return true;
        }
        TELL("There's no need to thank ", THEO, PERIOD);
        return true;
    }
    return true;
}

function V_WHO() {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("Who, indeed?", CR);
        return true;
    }
    NO_RESPONSE();
    return true;
}

function V_WHERE() {
    if(isEQUAL(WINNER, PLAYER)) {
        if(isVISIBLE(PRSO)) {
            if(isIS(PRSO, PLURAL)) {
                TELL("They're ");
            } else if(isIS(PRSO, FEMALE)) {
                TELL("She's ");
            } else if(isIS(PRSO, PERSON)) {
                TELL("He's ");
            } else {
                TELL("It's ");
            }
            TELL("right here.", CR);
            return true;
        }
        TELL("Where, indeed?", CR);
        return true;
    }
    NO_RESPONSE();
    return true;
}

function V_WHAT() {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("What, indeed?", CR);
        return true;
    }
    NO_RESPONSE();
    return true;
}

function NO_RESPONSE(_OBJ=WINNER) {
    PCLEAR();
    SEE_CHARACTER(_OBJ);
    TELL(CTHE(_OBJ));
    PRINT(" looks at you expectantly. ");
    CRLF();
    return true;
}

function V_THROUGH() {
    let _X;
    if(isPRSO(ROOMS)) {
        _X = LOC(PLAYER);
        if(isIS(_X, VEHICLE)) {
            PERFORM("ENTER", _X);
            return true;
        }
        DO_WALK("IN");
        return true;
    } else /*if(isIS(PRSO, OPENABLE)) {
        DO_WALK(OTHER_SIDE(PRSO));
        return true;
    }*/if(isIS(PRSO, VEHICLE)) {
        PERFORM("ENTER", PRSO);
        return true;
    } else /*if(isIN(PRSO, WINNER)) {
        TELL("That would involve quite a contortion.", CR);
        return true;
    }*/if(isIS(PRSO, LIVING)) {
        V_RAPE();
        return true;
    } else /*if(!(isIS(PRSO, TAKEABLE))) {
        TELL("You hit ", HEAD, " against ", THEO
, " as you attempt this feat.", CR);
        return true;
    }*/
    IMPOSSIBLE();
    return true;
}

function V_STHROW() {
    PERFORM("THROW", PRSI, PRSO);
    return true;
}

function PRE_THROW_OVER() {
    return PRE_PUT();
}

function V_THROW_OVER() {
    WASTE_OF_TIME();
    return true;
}

function PRE_THROW() {
    return PRE_PUT();
}

function V_THROW() {
    if(isIS(PRSI, DOORLIKE)) {
        WASTE_OF_TIME();
        return true;
    } else if(IDROP()) {
        TELL("Thrown", PTAB, CTHEO, " lands on the ");
        if(isIS(HERE, INDOORS)) {
            TELL(FLOOR);
        } else {
            TELL(GROUND);
        }
        TELL(" nearby.", CR);
    }
    return true;
}

function V_TIE() {
    TELL(IMPOSSIBLY, "tie ", THEO);
    if(isT(PRSI)) {
        TELL(STO, THEI);
    }
    PRINT(PERIOD);
    return true;
}

function V_TIE_UP() {
    TELL(CANT, "tie anything with that.", CR);
    return true;
}

function V_TURN() {
    if((!(isIS(PRSO, TAKEABLE))
  &&  !(isIS(PRSO, TRYTAKE)))) {
        IMPOSSIBLE();
        return true;
    } else if(isSPARK(null)) {
        return true;
    }
    HACK_HACK("Turning");
    return true;
}

function V_TURN_TO() {
    if(isVISIBLE(PRSO)) {
        PERFORM("EXAMINE", PRSO);
        return true;
    }
    TELL(DONT, "see ", THEO, PERIOD);
    return true;
}

function V_WALK_AROUND() {
    PCLEAR();
    TELL("Which way do you want to go?", CR);
    return true;
}

function V_WALK_TO() {
    if(isPRSO(ROOMS)) {
        V_WALK_AROUND();
        return true;
    } else if(isPRSO(INTDIR)) {
        DO_WALK(P_DIRECTION);
        return true;
    } else if(isPRSO(RIGHT, LEFT)) {
        MORE_SPECIFIC();
        return true;
    }
    V_FOLLOW();
    return true;
}

function V_WAIT(_N=3) {
    let _X=null;
    TELL("Time passes.", CR);
    while(true) {
        if((isT(_X)
  ||  _N < 1)) {
            return true;
        } else if(CLOCKER()) {
            _X = true;
            isCLOCK_WAIT = true;
        }
        --_N
    }
    return true;
}

function V_WAIT_FOR() {
    if(isPRSO(INTNUM)) {
        if(!(P_NUMBER)) {
            isCLOCK_WAIT = true;
            IMPOSSIBLE();
            return true;
        } else if(P_NUMBER > 120) {
            isCLOCK_WAIT = true;
            TELL("[That's too long to WAIT.]", CR);
            return true;
        }
        V_WAIT((P_NUMBER - 1));
        return true;
    } else if(isVISIBLE(PRSO)) {
        TELL(CTHEO);
        IS_ARE();
        TELL("already here.", CR);
        return true;
    }
    TELL("You may be waiting quite a while.", CR);
    return true;
}

function V_WEAR() {
    let _X;
    if((isIN(PRSO, WINNER)
  &&  isIS(PRSO, WORN))) {
        TELL(ALREADY, "wearing ", THEO, PERIOD);
        return true;
    } else if(!(isIS(PRSO, CLOTHING))) {
        TELL(CANT, "wear ", THEO, PERIOD);
        return true;
    } else if(isDONT_HAVE()) {
        return true;
    }
    PUTON();
    _X = GETP(PRSO, "EFFECT");
    if(isT(_X)) {
        UPDATE_STAT(_X, ARMOR_CLASS);
    }
    return true;
}

function PUTON() {
    WINDOW(SHOWING_INV);
    MAKE(PRSO, WORN);
    TELL("You put on ", THEO, PERIOD);
    return true;
}

function isWEARING_MAGIC(_OBJ) {
    if((isIN(_OBJ, PLAYER)
  &&  isIS(_OBJ, WORN)
  &&  !(isIS(_OBJ, NEUTRALIZED)))) {
        return true;
    } else {
        return false;
    }
}

function V_WIND() {
    TELL(CANT, "wind ", AO, PERIOD);
    return true;
}

function YOU_CLIMB_UP(_NOCR=0) {
    TELL(CYOU);
    if(PROB(33)) {
        TELL(B("ASCEND"));
    } else {
        if(PROB(50)) {
            TELL(B("CLAMBER"));
        } else {
            TELL(B("CLIMB"));
        }
        TELL(" up");
    }
    TELL(" the steps.", CR);
    if(isT(_NOCR)) {
        return true;
    } else if(isT(VERBOSITY)) {
        CRLF();
    }
    return true;
}

function HACK_HACK(_STR) {
    TELL(_STR, C(SP), THEO, " would", PICK_NEXT(HO_HUM), PERIOD);
    return true;
}

function IMPOSSIBLE() {
    TELL(PICK_NEXT(YUKS), PERIOD);
    return true;
}

function TOO_DARK() {
    PCLEAR();
    TELL("It's too dark to see.", CR);
    return true;
}

/*function CANT_GO() {
    if(isIS(HERE, INDOORS)) {
        TELL("There's no exit ");
    } else {
        TELL(CANT, "go ");
    }
    TELL("that way.", CR);
    return true;
}*/

/*function ALREADY_OPEN() {
    ITS_ALREADY("open");
    return true;
}*/

/*function ALREADY_CLOSED() {
    ITS_ALREADY("closed");
    return true;
}*/

function ITS_ALREADY(_STR) {
    TELL("It's already ", _STR, PERIOD);
    return true;
}

function REFERRING() {
    TELL("[To what are you referring?]", CR);
    return true;
}

function MORE_SPECIFIC() {
    NYMPH_APPEARS();
    TELL("You really must be more specific");
    PRINT(". Bye!\"|  She disappears with a wink.|");
    return true;
}

function WASTE_OF_TIME() {
    TELL(PICK_NEXT(POINTLESS), PERIOD);
    return true;
}

function isWHAT_TALK(_WHO, _OBJ) {
    MAKE(_WHO, SEEN);
    if(isVISIBLE(_OBJ)) {
        return false;
    }
    PERPLEXED(_WHO);
    TELL("I'm afraid I'm not sure");
    WHO_WHAT(_OBJ);
    TELL("you're talking about.\"", CR);
    return true;
}

function PERPLEXED(_WHO) {
    let _STR, _X;
    PCLEAR();
    _STR = PICK_NEXT(PUZZLES);
    TELL(CTHE(_WHO));
    _X = RANDOM(100);
    if(_X < 33) {
        TELL(" gives you a ", _STR, "ed look");
    } else if(_X < 67) {
        if(PROB(50)) {
            TELL(" look");
        } else {
            TELL(" appear");
        }
        TELL("s ");
        if(PROB(50)) {
            if(PROB(50)) {
                TELL("somewhat ");
            } else {
                TELL("a bit ");
            }
        }
        TELL(_STR, "ed");
    } else {
        TELL(" looks at you with a ", _STR
, "ed expression");
    }
    TELL(". \"");
    return true;
}

function WHO_WHAT(_OBJ) {
    TELL(" wh");
    if(isIS(_OBJ, PERSON)) {
        TELL("o ");
        return true;
    } else if(isIS(_OBJ, PLACE)) {
        TELL("ere ");
        return true;
    }
    TELL("at ");
    return true;
}

function V_SWRAP() {
    PERFORM("WRAP-AROUND", PRSI, PRSO);
    return true;
}

function V_WRAP_AROUND() {
    TELL(IMPOSSIBLY, B(P_PRSA_WORD), C(SP), THEO
, " around ", THEI, PERIOD);
    return true;
}

function V_DRESS() {
    if(isPRSO(ROOMS, ME)) {
        TELL("Try putting ", B("SOMETHING"), " on.", CR);
        return true;
    } else if(isIS(PRSO, PERSON)) {
        TELL(CTHEO, " has all the clothing ");
        if(isIS(PRSO, FEMALE)) {
            TELL("s");
        }
        TELL("he needs.", CR);
        return true;
    }
    TELL(CANT, "dress ", AO, PERIOD);
    return true;
}

function V_UNDRESS() {
    let _ANY=null, _X, _OBJ, _NXT;
    if(isPRSO(ROOMS, ME, WINNER)) {
        _OBJ = isFIRST(WINNER);
        while(true) {
            if(!(_OBJ)) {
                break;
            }
            _NXT = isNEXT(_OBJ);
            if(isIS(_OBJ, WORN)) {
                _ANY = true;
                isP_MULT = true;
                _X = PERFORM("TAKE-OFF", _OBJ);
                if(isEQUAL(_X, M_FATAL)) {
                    break;
                }
            }
            _OBJ = _NXT;
        }
        if(isT(_ANY)) {
            isP_MULT = null;
            if(!(_X)) {
                return true;
            }
            return _X;
        }
        PRINT("You're not wearing ");
        TELL("anything unusual.", CR);
        return true;
    } else if(isIS(PRSO, PERSON)) {
        INAPPROPRIATE();
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), C(SP), AO, PERIOD);
    return true;
}

function V_HANG() {
    let _X;
    if(isHERE(OUTSIDE_PUB, ON_BRIDGE)) {
        _X = PUB_SIGN;
        if(isHERE(ON_BRIDGE)) {
            _X = ZBRIDGE;
        }
        TELL("[on ", THE(_X), BRACKET);
        PERFORM("HANG-ON", PRSO, _X);
        return true;
    }
    TELL(NOTHING, "here on which to "
, B(P_PRSA_WORD), C(SP), THEO, PERIOD);
    return true;
}

function V_HANG_ON() {
    TELL(CTHEI);
    IS_ARE(PRSI);
    TELL("hardly suitable for ", B(P_PRSA_WORD), "ing things.", CR);
    return true;
}

function V_LURK() {
    TELL("Leave the ", B(P_PRSA_WORD), "ing to the grues.", CR);
    return true;
}

function V_SAY() {
    if(!(isMAGICWORD(P_LEXV[P_CONT]))) {
        TALK_TO_SELF();
    }
    PCLEAR();
    return true;
}

function V_MAGIC() {
    if(isMAGICWORD()) {
        return true;
    } else if(isEQUAL(P_PRSA_WORD, "DISPEL")) {
        isHOW();
        return true;
    }
    NOTHING_HAPPENS(null);
    return true;
}

/*function YOU_CANT() {
    SAY_YOU();
    TELL(" can't ");
    return true;
}*/

/*function SAY_YOU() {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("You");
        return true;
    }
    TELL(CTHE(WINNER));
    return true;
}*/

/*function YOURE() {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("You're ");
        return true;
    }
    TELL(CTHE(WINNER), SIS);
    return true;
}*/

function V_ERASE_WITH() {
    TELL(CANT, B(P_PRSA_WORD), C(SP), THEO);
    if(!(isPRSI(HANDS))) {
        TELL(WITH, THEI);
    }
    PRINT(PERIOD);
    return true;
}

function V_WRITE_ON() {
    TELL("It would be difficult to ", B(P_PRSA_WORD), C(SP), AO
, SON, THEI, PERIOD);
    return true;
}

function V_WRITE_WITH() {
    NOT_LIKELY(PRSI);
    TELL(" could ", B(P_PRSA_WORD), " anything on ", THEO, PERIOD);
    return true;
}

function V_CRANK() {
    if(isPRSO(ROOMS)) {
        if(isVISIBLE(GURDY)) {
            PRINTC('\['.charCodeAt(0));
            TELL(THE(GURDY), BRACKET);
            LAST_CRANK_DIR = null;
            TURN_GURDY();
            return true;
        }
        TELL(NOTHING, "here to crank.", CR);
        return true;
    }
    TELL(CANT, "crank ", THEO, PERIOD);
    return true;
}

function V_UNMAKE() {
    TELL("Such magic lies far beyond your meager abilities.", CR);
    return true;
}

function V_SPELLS() {
    TELL(DONT, "know any. Few ");
    ANNOUNCE_RANK();
    TELL("s do.", CR);
    return true;
}

"*** BARTERING ***"

var MONEY = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "foo",
	SDESC: DESCRIBE_MONEY,
	FLAGS: [NODESC, NOARTICLE, NOALL],
	SYNONYM: ["MONEY", "ZORKMIDS", "ZORKMID", "ZM", "CASH", "LOOT", "ASSETS", "COINS", "COIN", "CREDIT", "LINE"],
	ADJECTIVE: ["INTNUM", "MY", "PERSONAL", "CREDIT"],
	ACTION: MONEY_F
});

var LOOT/*NUMBER*/ = 1;

function DESCRIBE_MONEY(_OBJ) {
    return "your zorkmid" + (!(isEQUAL(LOOT, 1)) ? "s" : "");
}

function MONEY_F() {
    let _X;
    if(isTHIS_PRSI()) {
        if((isVERB(V_TRADE_FOR)
  &&  isHERE(IN_MAGICK, IN_BOUTIQUE, IN_WEAPON))) {
            TRADE_FOR_LOOT(PRSO);
            return true;
        }
        return false;
    } else if(isVERB(V_SPEND)) {
        return true;
    } else if(isVERB(V_FIND, V_BUY)) {
        TELL("Good luck.", CR);
        return true;
    } else if(!(LOOT)) {
        PRINT("You're broke.|");
        return RFATAL();
    } else if(isVERB(V_EXAMINE, V_COUNT)) {
        SAY_CASH();
        return true;
    } else if(isVERB(V_WHAT)) {
        TELL("Zorkmids are the local unit of currency.", CR);
        return true;
    } else if((isVERB(V_DROP, V_EMPTY)
  ||  (_X = isPUTTING()))) {
        BENJAMIN();
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function SAY_CASH() {
    TELL("You have ");
    SAY_LOOT();
    PRINT(PERIOD);
    return true;
}

function isNOT_ENOUGH_LOOT(_AMT) {
    if(_AMT > LOOT) {
        TELL("You only have ");
        SAY_LOOT();
        TELL(PERIOD);
        return true;
    } else {
        return false;
    }
}

function SAY_LOOT(_VAL=LOOT) {
    TELL(N(_VAL), " zorkmid");
    if(!(isEQUAL(_VAL, 1))) {
        TELL("s");
    }
    return true;
}

function BENJAMIN() {
    TELL("A zorkmid saved is a zorkmid earned.", CR);
    return true;
}

function isGIVING_LOOT(_OBJ, _WHO) {
    if(!(isEQUAL(_OBJ, MONEY, INTNUM))) {
        return false;
    } else if(!(LOOT)) {
        PRINT("You're broke.|");
        return true;
    }
    _OBJ = LOOT;
    if(!(isEQUAL(P_NUMBER, -1))) {
        if(isNOT_ENOUGH_LOOT(P_NUMBER)) {
            return true;
        }
        _OBJ = P_NUMBER;
    }
    TELL(CTHE(_WHO
), " gives you a bewildered look, shrugs, and accepts ", D(MONEY));
    LOOT = (LOOT - _OBJ);
    TELL(" without question.", CR);
    return true;
}

function PRE_BUY() {
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(!(PRSI)) {
        PRSI = MONEY;
        TELL("[with ", D(PRSI), BRACKET);
        return false;
    } else {
        return false;
    }
}

function V_SBUY() {
    PERFORM("BUY", PRSI, PRSO);
    return true;
}

function V_BUY() {
    if(!(isVISIBLE(PRSO))) {
        NONE_FOR_SALE();
        return RFATAL();
    } else if(isHELD()) {
        ALREADY_HAVE();
        return true;
    } else if(isHERE(IN_MAGICK, IN_WEAPON, IN_BOUTIQUE)) {
        BUY_X_WITH_Y();
        return true;
    }
    NOT_LIKELY();
    TELL(" is for sale.", CR);
    return true;
}

function NONE_FOR_SALE() {
    TELL("There are none here to buy.", CR);
    return true;
}

function V_SPEND() {
    if(isPRSO(ROOMS, MONEY, INTNUM)) {
        TELL("Easily done");
        if(isHERE(IN_MAGICK, IN_BOUTIQUE, IN_WEAPON)) {
            TELL(", especially here");
        }
        PRINT(PERIOD);
        return true;
    }
    IMPOSSIBLE();
    return true;
}

function V_PAY() {
    PERFORM("GIVE", PRSI, PRSO);
    return true;
}

function V_BUY_FROM() {
    if(!(isVISIBLE(PRSO))) {
        NONE_FOR_SALE();
        return RFATAL();
    } else if(isHELD()) {
        ALREADY_HAVE();
        return true;
    } else if(isPRSI(OWOMAN, MCASE, BCASE, WCASE)) {
        BUY_X_WITH_Y();
        return true;
    }
    NOT_LIKELY(PRSI);
    TELL(" could sell you ", THEO, PERIOD);
    return true;
}

function PRE_TRADE_FOR() {
    if(PRE_SELL_TO()) {
        return true;
    } else if(isIN(PRSI, WINNER)) {
        ALREADY_HAVE(PRSI);
        return true;
    } else {
        return false;
    }
}

function V_TRADE_FOR() {
    let _L;
    _L = LOC(PRSI);
    if(!(_L)) {
        IMPOSSIBLE();
        return true;
    } else if(isHERE(IN_MAGICK, IN_BOUTIQUE, IN_WEAPON)) {
        BUY_X_WITH_Y(PRSI, PRSO);
        return true;
    } else if(isIS(_L, PERSON)) {
        TELL(CTHE(_L), " seems reluctant to give up ", THEI, PERIOD);
        return true;
    }
    TELL("Why not just pick up ", THEI, " instead?", CR);
    return true;
}

function PRE_SELL_TO() {
    if(!(PRSI)) {
        if(isIN(OWOMAN, HERE)) {
            PERFORM(PRSA, PRSO, OWOMAN);
            return true;
        }
    }
    if(isEQUAL(null, PRSO, PRSI)) {
        REFERRING();
        return true;
    } else if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(isPRSO(PRSI)) {
        IMPOSSIBLE();
        return true;
    } else if(isPRSI(MONEY, INTNUM)) {
        return false;
    } else if((isIN(PRSI, GLOBAL_OBJECTS)
  ||  (!(isIS(PRSO, TAKEABLE))
  &&  !(isIS(PRSO, TRYTAKE))))) {
        IMPOSSIBLE();
        return true;
    } else if((isIS(PRSO, WORN)
  &&  isIN(PRSO, WINNER))) {
        return isTAKE_OFF_PRSO_FIRST();
    } else {
        return false;
    }
}

function V_SELL_TO() {
    if(!(isEQUAL(WINNER, PLAYER))) {
        NOT_LIKELY(WINNER);
        IS_ARE();
        TELL("interested in selling anything");
        return true;
    } else if(isPRSI(PRSO, ME, WINNER)) {
        IMPOSSIBLE();
        return true;
    } else if(!(isIS(PRSI, PERSON))) {
        NOT_LIKELY(PRSI);
        TELL(" would buy anything.", CR);
        return true;
    }
    NOT_A("salesperson");
    return true;
}

function V_SSELL_TO() {
    PERFORM("SELL-TO", PRSI, PRSO);
    return true;
}

function BUY_X_WITH_Y(_X=PRSO, _Y=PRSI) {
    let _CASE, _VAL, _OFFER, _CHANGE;
    _CASE = GETP(HERE, "THIS-CASE");
    if(!(isVISIBLE(_X))) {
        TELL("\"I don't have any for sale,\" admits "
, THE(OWOMAN), PERIOD);
        return true;
    } else if(!(isIN(_X, _CASE))) {
        TELL("\"Only the items in ", THE(_CASE
), " are for sale.\"", CR);
        return true;
    }
    _VAL = GETP(_X, "VALUE");
    if(_VAL < 1) {
        NO_WORTH(_X);
        return true;
    } else if(isEQUAL(_Y, null, MONEY, INTNUM)) {
        _OFFER = P_NUMBER;
        if(!(LOOT)) {
            PRINT("You're broke.|");
            return true;
        } else if((!(_Y)
  ||  isEQUAL(P_NUMBER, -1))) {
            _OFFER = LOOT;
        } else if(isNOT_ENOUGH_LOOT(_OFFER)) {
            return true;
        }
        if(_OFFER < _VAL) {
            TELL(CTHELADY
, " shakes her head firmly. \"My price is ");
            SAY_LOOT(_VAL);
            TELL(", dear.\"", CR);
            return true;
        }
        PUTP(_X, "VALUE", (_VAL / 2));
        if((!(isEQUAL(P_NUMBER, -1))
  &&  _OFFER > _VAL)) {
            LOOT = (LOOT - P_NUMBER);
            PRINT("\"You are too kind");
        } else {
            LOOT = (_OFFER - _VAL);
            TELL("\"Done");
        }
        TELL(",\" says ", THE(OWOMAN), ", taking your zorkmid");
        if(!(isEQUAL(_VAL, 1))) {
            TELL("s");
        }
        SOLD(_X);
        return true;
    } else if(isNO_DEAL(_Y)) {
        return true;
    } else if(isIN(_Y, GLOBAL_OBJECTS)) {
        TELL("\"Don't be silly.\"", CR);
        return true;
    }
    _OFFER = GETP(_Y, "VALUE");
    if(!(_OFFER)) {
        NO_WORTH(_Y);
        return true;
    } else if(_OFFER < _VAL) {
        WORTHLESS(_Y);
        TELL(" only worth ");
        SAY_LOOT(_OFFER);
        TELL(". This ", D(_X), " is valued at ");
        SAY_LOOT(_VAL);
        TELL("!\"", CR);
        return true;
    }
    WINDOW(SHOWING_ALL);
    MOVE(_Y, _CASE);
    MAKE(_Y, USED);
    PUTP(_Y, "VALUE", (_OFFER + _OFFER));
    PUTP(_X, "VALUE", (_VAL / 2));
    if(_OFFER > _VAL) {
        PRINT("\"You are too kind");
    } else {
        TELL("\"Done");
    }
    TELL(",\" says ", THE(OWOMAN), ", taking ");
    SAY_YOUR(_Y);
    if(_OFFER > _VAL) {
        _CHANGE = (_OFFER - _VAL);
        LOOT = (LOOT + _CHANGE);
        SOLD(_X, _CHANGE);
        PRINT(" and handing you ");
        SAY_LOOT(_CHANGE);
        TELL(" in change.", CR);
        return true;
    }
    SOLD(_X);
    return true;
}

function SOLD(_OBJ, _CHANGE=0) {
    WINDOW(SHOWING_ALL);
    THIS_IS_IT(_OBJ);
    MAKE(_OBJ, USED);
    if(isT(_CHANGE)) {
        TELL(", ");
    } else {
        TELL(AND);
    }
    if(ITAKE(null)) {
        MOVE(_OBJ, PLAYER);
        TELL("handing you ", THE(_OBJ));
    } else {
        MOVE(_OBJ, GETP(GETP(HERE, "THIS-CASE"), "DNUM"));
        TELL("setting ", THE(_OBJ), SON, THE(MCASE));
    }
    if(!(_CHANGE)) {
        PRINT(PERIOD);
    }
    return true;
}

function NO_WORTH(_OBJ) {
    WORTHLESS(_OBJ);
    TELL(" not worth anything here.\"", CR);
    return true;
}

function WORTHLESS(_OBJ) {
    TELL(CTHELADY, GLANCES_AT, THE(_OBJ
), " and shakes her head. \"");
    if(isIS(_OBJ, FEMALE)) {
        TELL("She's");
    } else if(isIS(_OBJ, LIVING)) {
        TELL("He's");
    } else if(isIS(_OBJ, PLURAL)) {
        TELL("They're");
    } else {
        TELL("That's");
    }
    return true;
}

function isNO_DEAL(_OBJ) {
    if(isEQUAL(_OBJ, HELM, RUG, CAKE)) {
        TELL("\"No,\" replies ", THE(OWOMAN
), ", shaking her head firmly. \"I don't think I want to carry this.\"", CR);
        return true;
    } else {
        return false;
    }
}

function TRADE_FOR_LOOT(_OBJ) {
    let _VAL, _CASE;
    if(!(isIN(_OBJ, PLAYER))) {
        TAKE_FIRST(_OBJ, LOC(_OBJ));
        return true;
    }
    if(isNO_DEAL(_OBJ)) {
        return true;
    }
    _VAL = GETP(_OBJ, "VALUE");
    _CASE = toOBJECT(GETP(HERE, "THIS-CASE"));
    TELL(CTHELADY, " examines ", THE(_OBJ));
    if(!(_VAL)) {
        TELL(" and hands it back to you with a shrug. \"Worthless.\"", CR);
        return true;
    }
    WINDOW(SHOWING_ALL);
    LOOT = (_VAL + LOOT);
    TELL(" critically. \"Okay,\" she agrees, ");
    if(isEQUAL(_OBJ, TRUFFLE)) {
        VANISH(_OBJ);
        TELL("popping ", THE(_OBJ), " in her mouth");
    } else {
        PUTP(_OBJ, "VALUE", (_VAL + _VAL));
        MOVE(_OBJ, _CASE);
        TELL("stashing it away in ", THE(_CASE));
    }
    PRINT(" and handing you ");
    SAY_LOOT(_VAL);
    TELL(" in return.", CR);
    return true;
}

function V_ZOOM() {
    let _WRD;
    if(!(isPRSO(ROOMS))) {
        BAD_COMMAND("ZOOM", "that way");
        return true;
    } else if(!(DMODE)) {
        BAD_COMMAND("ZOOM", "in this display mode");
        return true;
    } else if(isEQUAL(MAP_ROUTINE, CLOSE_MAP)) {
        MAP_ROUTINE = FAR_MAP;
        _WRD = "OUT";
    } else {
        MAP_ROUTINE = CLOSE_MAP;
        _WRD = "IN";
    }
    SAME_COORDS = null;
    TELL("[Zooming ", B(_WRD), ".]", CR);
    NEW_MAP();
    SHOW_MAP();
    return true;
}

var PRIOR/*NUMBER*/ = 0;

function V_PRIORITY_ON() {
    if(isBAD_PRIOR()) {
        return true;
    } else if(isEQUAL(PRIOR, IN_DBOX)) {
        TELL("already ");
    } else {
        PRIOR = IN_DBOX;
        TELL("now ");
    }
    TELL("set to ");
    SAY_PRIORITY();
    TELL(".]", CR);
    return true;
}

function SAY_PRIORITY() {
    if(isEQUAL(PRIOR, SHOWING_ROOM)) {
        TELL("Room Descriptions");
        return true;
    } else if(isEQUAL(PRIOR, SHOWING_INV)) {
        TELL("Inventory");
        return true;
    } else {
        TELL("Player Status");
        return true;
    }
}

function V_PRIORITY_OFF() {
    if(isBAD_PRIOR()) {
        return true;
    } else if(!(PRIOR)) {
        TELL("already ");
    } else {
        PRIOR = 0;
        TELL("now ");
    }
    TELL("disabled.]", CR);
    return true;
}

function isBAD_PRIOR() {
    if(!(isPRSO(ROOMS))) {
        BAD_COMMAND("PRIORITY", "that way");
        return true;
    } else if(!(DMODE)) {
        BAD_COMMAND("PRIORITY", "in this display mode");
        return true;
    }
    TELL("[Display priority is ");
    return false;
}

function BAD_COMMAND(_STR1, _STR2) {
    TELL("[", CANT, "use the ", _STR1, " command ", _STR2, ".]", CR);
    return true;
}

var DMODE/*FLAG*/ = true;"T = enhanced, <> = normal."

function V_MODE() {
    let _STR;
    _STR = "Normal";
    if(!(DMODE)) {
        _STR = "Enhanced";
        DMODE = true;
    } else {
        DMODE = null;
    }
    V_REFRESH();
    CRLF();
    PRINTC('\['.charCodeAt(0));
    TELL(_STR, " display mode.]", CR, CR);
    return true;
}

var VERBOSITY/*NUMBER*/ = 1;"0 = super, 1 = brief, 2 = verbose."

function V_VERBOSE() {
    VERBOSITY = 2;
    TELL("[Maximum verbosity");
    FOR_SCRIPTING();
    if(!(DMODE)) {
        CRLF();
        V_LOOK();
    }
    return true;
}

function V_BRIEF() {
    VERBOSITY = 1;
    TELL("[Brief descriptions");
    FOR_SCRIPTING();
    return true;
}

function V_SUPER_BRIEF() {
    VERBOSITY = 0;
    TELL("[Superbrief descriptions");
    FOR_SCRIPTING();
    return true;
}

function FOR_SCRIPTING() {
    if(isT(DMODE)) {
        TELL(" for transcripting");
    }
    TELL(".]", CR);
    return true;
}

function V_QUIT(after) {
    stop_main_loop = true;
    PRINT("Are you sure you want to ");
    TELL("leave the story now?");
    const lazy_yes = lazy();
    isYES(lazy_yes);
    lazy_yes.setFn(yes => {
        if (yes) {
            CRLF();
            QUIT();
        }
        CONTINUING();
        stop_main_loop = false;
        if (after)
            after.post();
        else
            DO_MAIN_LOOP();
    });
}

function CONTINUING() {
    TELL(CR, "[Continuing.]", CR);
    return true;
}

function V_RESTART() {
    stop_main_loop = true;
    V_SCORE();
    CRLF();
    PRINT("Are you sure you want to ");
    TELL("restart the story?");
    const lazy_yes = lazy();
    isYES(lazy_yes);
    lazy_yes.setFn(yes => {
        if(yes) {
            RESTART();
            FAILED("RESTART");
        }
        stop_main_loop = false;
        DO_MAIN_LOOP();
    });
}

function V_RESTORE(after=DO_MAIN_LOOP) {
    OLD_HERE = null;
    RESTORE(() => {
        V_RESTORE2();
        after();
    });
}

var CHECKSUM/*NUMBER*/ = 0;

function V_SAVE() {
    let _X, _STAT;
    if(isCANT_SAVE()) {
        return true;
    }
    TELL("You mumble the Spell of Saving.", CR);
    PCLEAR();
    OLD_HERE = null;
    OOPS_INBUF[1] = 0;    /*"Retrofix #50"*/

    _STAT = ENDURANCE;
    CHECKSUM = 0;
    while(true) {
        CHECKSUM = (CHECKSUM + STATS[_STAT]);
        if(++_STAT > EXPERIENCE) {
            break;
        }
    }
    _STAT = ENDURANCE;
    while(true) {
        CHECKSUM = (CHECKSUM + MAXSTATS[_STAT]);
        if(++_STAT > EXPERIENCE) {
            break;
        }
    }
    CHECKSUM = (0 - CHECKSUM);

    _X = SAVE();

    if(!(_X)) {
        FAILED("SAVE");
        return RFATAL();
    } else if(isEQUAL(_X, 1)) {
        COMPLETED("SAVE");
        return RFATAL();
    }
}

function V_RESTORE2() {
    INITVARS();
    V_REFRESH();

    COMPLETED("RESTORE");
    CRLF();
    V_LOOK();

    _STAT = ENDURANCE;
    _X = 0;
    while(true) {
        _X = (_X + STATS[_STAT]);
        if(++_STAT > EXPERIENCE) {
            break;
        }
    }
    _STAT = ENDURANCE;
    while(true) {
        _X = (_X + MAXSTATS[_STAT]);
        if(++_STAT > EXPERIENCE) {
            break;
        }
    }
    if(!(isEQUAL((0 - CHECKSUM), _X))) {
        CHEATER();
    }
    return RFATAL();
}

function COMPLETED(_STR) {
    TELL(CR, "[", _STR, " completed.]", CR);
    return true;
}

function FAILED(_STR) {
    TELL(CR, "[", _STR, " failed.]", CR);
    return true;
}

function V_SCORE() {
    TELL("[Your rank is ");
    ANNOUNCE_RANK();
    TELL(", achieved in ", N(MOVES), " move");
    if(!(isEQUAL(MOVES, 1))) {
        TELL("s");
    }
    TELL(".]", CR);
    return true;
}

function V_DIAGNOSE() {
    if(isPRSO(ME, ROOMS)) {
        NYMPH_APPEARS("medical");
        TELL("Please use the STATUS command to monitor your health");
        PRINT(". Bye!\"|  She disappears with a wink.|");
        return true;
    } else if(isIS(PRSO, MONSTER)) {
        DIAGNOSE_MONSTER();
        return true;
    } else if(isIS(PRSO, LIVING)) {
        TELL(CTHEO, " seem");
        if(!(isIS(PRSO, PLURAL))) {
            TELL("s");
        }
        TELL(" well enough.", CR);
        return true;
    } else if(isIS(PRSO, PERSON)) {
        TELL(CTHEO);
        ISNT_ARENT();
        TELL(" looking well.", CR);
        return true;
    }
    TELL(CANT, B(P_PRSA_WORD), C(SP), AO, PERIOD);
    return true;
}

var SAY_STAT/*FLAG*/ = null;

function V_NOTIFY() {
    TELL("[Status notification is now o");
    if(isT(SAY_STAT)) {
        SAY_STAT = null;
        TELL("ff");
    } else {
        SAY_STAT = true;
        TELL("n");
    }
    TELL(".]", CR);
    return true;
}

function V_TIME() {
    TELL("This is a timeless tale.", CR);
    return true;
}

function V_SCRIPT() {
    PRINT("[Transcripting o");
    TELL("n.]", CR);
    DIROUT(D_PRINTER_ON);
    TRANSCRIPT("begin");
    return true;
}

function V_UNSCRIPT() {
    TRANSCRIPT("end");
    DIROUT(D_PRINTER_OFF);
    PRINT("[Transcripting o");
    TELL("ff.]", CR);
    return true;
}

function TRANSCRIPT(_STR) {
    DIROUT(D_SCREEN_OFF);
    TELL(CR, "Here ", _STR, "s a transcript of interaction with", CR);
    V_VERSION();
    DIROUT(D_SCREEN_ON);
    return true;
}

function V_VERSION() {
    let _X;
    CRLF();
    if(isT(isCOLORS)) {
        COLOR(INCOLOR, BGND);
    } else if(!(isEQUAL(HOST, MACINTOSH))) {
        HLIGHT(H_BOLD);
    }
    TELL("BEYOND ZORK: ");
    PRINT("The Coconut of Quendor");
    CRLF();
    COLOR(FORE, BGND);
    HLIGHT(H_NORMAL);
    PRINT("Copyright (C)1987 Infocom, Inc. All rights reserved.");
    CRLF();
    TRADEMARK();
    CRLF();
    TELL("Release ");
    PRINTN((LOWCORE(ZORKID) & 2047));
    TELL(" / Serial Number ");
    //LOWCORE_TABLE(SERIAL, 6, PRINTC);
    CRLF();
    INTERPRETER_ID();
    return true;
}

function V_$VERIFY() {
    /*if(isT(PRSO)) {
        if((isPRSO(INTNUM)
  &&  isEQUAL(P_NUMBER, 105))) {
            TELL(N(SERIAL), CR);
            return true;
        }
        DONT_UNDERSTAND();
        return true;
    }*/
    INTERPRETER_ID();
    TELL(CR, "[Verifying.]", CR);
    if(VERIFY()) {
        NYMPH_APPEARS();
        TELL("Your disk is correct");
        PRINT(". Bye!\"|  She disappears with a wink.|");
        return true;
    }
    FAILED("$VERIFY");
    return true;
}

function INTERPRETER_ID() {
    if(HOST < 1) {
        TELL("XZIP");
    } else if(HOST > MACHINES[0]) {
        TELL("Interpreter ", N(HOST));
    } else {
        TELL(MACHINES[HOST]);
    }
    if(isT(isCOLORS)) {
        TELL(" Color");
    }
    TELL(" Version ", C(LOWCORE(INTVR)), CR);
    return true;
}

var POTENTIAL/*NUMBER*/ = 0;
var STATS/*TABLE*/ = [0, 0, 0, 0, 0, 0, 0, 0];
var MAXSTATS/*TABLE*/ = [0, 0, 0, 0, 0, 0, 0, 0];

function V_STATUS() {
    let _CNT=0, _X;
    if((isT(DMODE)
  &&  isT(VT220)
  &&  !(isEQUAL(IN_DBOX, SHOWING_STATS))
  &&  !(PRIOR))) {
        TELL("[Displaying status.]", CR);
        SHOW_RANK();
        DISPLAY_STATS();
    } else {
        STANDARD_STATS();
    }
    if(LOWCORE(FLAGS) & 1) {
        DIROUT(D_SCREEN_OFF);
        STANDARD_STATS();
        DIROUT(D_SCREEN_ON);
    }
    return true;
}

function STANDARD_STATS() {
    PRINT_TABLE(CHARNAME);
    PRINTC('\/'.charCodeAt(0));
    ANNOUNCE_RANK();
    CRLF();
    TEXT_STATS();
    CRLF();
    return true;
}

var BMODE/*FLAG*/ = null;"Battle display mode flag."
var AUTO/*FLAG*/ = true;"Automatic display mode flag."

function V_MONITOR() {
    let _X;
    if(!(VT220)) {
        NOT_AVAILABLE();
        return true;
    } else if(!(DMODE)) {
        TELL("[That command works only in Enhanced display mode.]", CR);
        return true;
    } else if(!(AUTO)) {
        AUTO = true;
        _X = STATS[ENDURANCE];
        if(_X < MAXSTATS[ENDURANCE]) {
            BMODE_ON();
        }
        PRINT("[Combat monitor o");
        TELL("n.]", CR);
        return true;
    }
    AUTO = 0;
    if(isT(BMODE)) {
        BATTLE_MODE_OFF();
    }
    PRINT("[Combat monitor o");
    TELL("ff.]", CR);
    return true;
}

function BMODE_OFF() {
    let _X;
    if((!(BMODE)
  ||  !(VT220))) {
        return false;
    }
    _X = STATS[ENDURANCE];
    if(!(_X < MAXSTATS[ENDURANCE])) {
        BATTLE_MODE_OFF();
    }
    return false;
}

function BATTLE_MODE_OFF() {
    BMODE = 0;
    WINDOW(SHOWING_ALL);
    DHEIGHT = MAX_DHEIGHT;
    TO_TOP_WINDOW();
    DO_CURSET((DHEIGHT + (11 - MAX_DHEIGHT)), 2);
    PRINT_SPACES(DWIDTH);
    TO_BOTTOM_WINDOW();
    return false;
}

function BMODE_ON() {
    if((!(DMODE)
  ||  isT(BMODE)
  ||  !(VT220)
  ||  isEQUAL(SHOWING_STATS, IN_DBOX, NEW_DBOX))) {
        return false;
    }
    BATTLE_MODE_ON();
    return false;
}

function BATTLE_MODE_ON() {
    let _Y;
    BMODE = true;
    WINDOW(SHOWING_ALL);
    _Y = (DHEIGHT + (11 - MAX_DHEIGHT));
    TO_TOP_WINDOW();
    DO_CURSET(_Y, 2);
    PRINT_SPACES(DWIDTH);
    TO_BOTTOM_WINDOW();
    STATBARS(_Y, 0, 0);
    DHEIGHT = (MAX_DHEIGHT - 1);
    return false;
}

function V_DEFINE() {
    keydown_handler.inDefine(true);
    let _KEYS, _TOP, _LTBL, _LMARGIN, _DKEY, _TBL, _TBL2, _LEN, _HIT, _X, _Y;
    /*"Set up routine constants."*/
    stop_main_loop = true;
    _KEYS = 9;
    if(isEQUAL(HOST, C128, C64)) {
        _KEYS = 7;
    }
    _TOP = Math.floor((HEIGHT - (_KEYS + 7)) / 2);
    _LTBL = KEY_LABELS;
    if((isEQUAL(HOST, APPLE_2E, APPLE_2C, APPLE_2GS)
  ||  isEQUAL(HOST, MACINTOSH))) {
        _LTBL = APPLE_LABELS;
    }
    _LMARGIN = Math.floor((WIDTH - (SOFT_LEN + 4)) / 2);

    /*"Init screen."*/

    COLOR(GCOLOR, BGND);
    CLEAR(-1);
    SPLIT(20);
    TO_TOP_WINDOW();

    /*"Set up image of SOFT-KEYS in DBOX."*/

    DO_CURSET(_TOP, (8 + _LMARGIN));
    TELL("Function Key Definitions");

    SOFTS_TO_DBOX(_KEYS);
    _X = (_LMARGIN + 4);
    DO_CURSET((_TOP + 2), _X);
    HLIGHT(H_INVERSE);
    PRINTT(DBOX, SOFT_LEN, (_KEYS + 1));

    /*"Print key labels."*/

    if((!(isCOLORS)
  ||  isEQUAL(FORE, GCOLOR))) {
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
    }
    _X = 0;
    while(true) {
        DO_CURSET(((_TOP + _X) + 2), _LMARGIN);
        TELL(_LTBL[_X]);
        if(++_X > _KEYS) {
            break;
        }
    }

    _X = (_LMARGIN + 4);
    DO_CURSET(((_KEYS + 4) + _TOP), _X);
    TELL(" Restore Defaults ");
    DO_CURSET(((_KEYS + 6) + _TOP), _X);
    PRINT(" Exit ");

    _DKEY = 0;
    const outer_loop = loop_stream(),
        inner_loop = loop_stream();
    outer_loop.loadPreaction(() => {
        _Y = ((_DKEY + _TOP) + 2);
        COLOR(FORE, BGND);
        HLIGHT(H_INVERSE);

        if(isEQUAL(_DKEY, (_KEYS + 1))) {
            _X = (_LMARGIN + 4);
            DO_CURSET(((_KEYS + 4) + _TOP), _X);
            TELL(" Restore Defaults ");
            HLIGHT(H_NORMAL);
            SCREEN(S_TEXT);
            inner_loop.loadPreaction(() => {
                DO_INPUT(inner_loop);
            });
            inner_loop.loadPostaction(_HIT => {
                const post_sure = () => {
                    if(isEQUAL(_HIT, UP_ARROW, DOWN_ARROW)) {
                        _DKEY = (_KEYS + 2);
                        if(isEQUAL(_HIT, UP_ARROW)) {
                            _DKEY = _KEYS;
                        }
                        SCREEN(S_WINDOW);
                        HLIGHT(H_NORMAL);
                        HLIGHT(H_MONO);
                        COLOR(GCOLOR, BGND);
                        if((isT(isCOLORS)
                          &&  !(isEQUAL(FORE, GCOLOR)))) {
                            HLIGHT(H_INVERSE);
                        }
                        _X = (_LMARGIN + 4);
                        DO_CURSET(((_KEYS + 4) + _TOP), _X);
                        TELL(" Restore Defaults ");
                        inner_loop.finish();return;
                    }
                    SOUND(S_BOOP);
                    inner_loop.again();
                };
                if(isEQUAL(_HIT, EOL, LF)) {
                    const lazy_sure = lazy(
                        sure => {
                            if (sure) {
                                DEFAULT_SOFTS();
                                SOFTS_TO_DBOX(_KEYS);
                                SCREEN(S_WINDOW);
                                HLIGHT(H_NORMAL);
                                HLIGHT(H_MONO);
                                HLIGHT(H_INVERSE);
                                COLOR(GCOLOR, BGND);
                                _X = (_LMARGIN + 4);
                                DO_CURSET((_TOP + 2), _X);
                                PRINTT(DBOX, SOFT_LEN, (_KEYS + 1));
                                inner_loop.finish();return;
                            } else {
                                _HIT = DOWN_ARROW;
                                post_sure();
                            }
                        }
                    );
                    isMAKE_SURE(lazy_sure);
                } else
                    post_sure();
                
            });
            inner_loop.onFinish(() => {
                setTimeout(outer_loop.again, 20);
            });
        } else if(isEQUAL(_DKEY, (_KEYS + 2))) {
            _X = (_LMARGIN + 4);
            DO_CURSET(((_KEYS + 6) + _TOP), _X);
            PRINT(" Exit ");
            HLIGHT(H_NORMAL);
            SCREEN(S_TEXT);
            inner_loop.loadPreaction(() => {
                DO_INPUT(inner_loop);
            });
            inner_loop.loadPostaction(_HIT => {
                const post_sure = () => {
                    if(isEQUAL(_HIT, UP_ARROW, DOWN_ARROW)) {
                        _DKEY = 0;
                        if(isEQUAL(_HIT, UP_ARROW)) {
                            _DKEY = (_KEYS + 1);
                        }
                        SCREEN(S_WINDOW);
                        HLIGHT(H_NORMAL);
                        HLIGHT(H_MONO);
                        COLOR(GCOLOR, BGND);
                        if((isT(isCOLORS)
                          &&  !(isEQUAL(FORE, GCOLOR)))) {
                            HLIGHT(H_INVERSE);
                        }
                        _X = (_LMARGIN + 4);
                        DO_CURSET(((_KEYS + 6) + _TOP), _X);
                        PRINT(" Exit ");
                        inner_loop.finish();return;
                    }
                    SOUND(S_BOOP);
                };
                if(isEQUAL(_HIT, EOL, LF)) {
                    if(!(isEQUAL(HOST, MACINTOSH))) {
                        V_REFRESH();
                        CONTINUING();
                        stop_main_loop = false;
                        keydown_handler.inDefine(false);
                        setTimeout(DO_MAIN_LOOP, 20);
                        return true;
                    } else {
                        const lazy_sure = lazy();
                        isMAKE_SURE(lazy_sure);
                        lazy_sure.setFn(sure => {
                            if (sure) {
                                V_REFRESH();
                                CONTINUING();
                                return true;
                            } else {
                                _HIT = DOWN_ARROW;
                                post_sure();
                            }
                        });
                        return;
                    }
                } else
                    post_sure();
            });
            inner_loop.onFinish(() => {
                setTimeout(outer_loop.again, 20);
            });
        } else {
            setTimeout(outer_loop.post, 20);
        }

        
    });
    outer_loop.loadPostaction(() => {
        DO_CURSET(_Y, _LMARGIN);
        TELL(_LTBL[_DKEY]);
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        DBOX[0] = SP;
        COPYT(DBOX, REST(DBOX, 1), NSOFT_LEN);
        _TBL = SOFT_KEYS[_DKEY][3].split("");
        _TBL = [_TBL.length, ..._TBL];
        _LEN = _TBL[0];
        if(isT(_LEN)) {
            COPYT(_TBL.slice(1), DBOX, _LEN);
        }
        DO_CURSET(_Y, (_LMARGIN + 4));
        COLOR(INCOLOR, BGND);
        PRINTT(DBOX, SOFT_LEN);

        DO_CURSET(_Y, ((_LMARGIN + _LEN) + 4));
        inner_loop.loadPreaction(() => {
            keydown_handler.setLine(SOFT_KEYS[_DKEY][3]);
            READ(_TBL, 0, inner_loop);
        });
        inner_loop.loadPostaction(_HIT => {
            if((isEQUAL(_HIT, EOL, LF)
            ||  isEQUAL(_HIT, UP_ARROW, DOWN_ARROW, MAC_UP_ARROW
            , MAC_DOWN_ARROW))) {
                inner_loop.finish(_HIT);return;
            }
            SOUND(S_BOOP);
            inner_loop.again();
        });
        inner_loop.onFinish(_HIT => {
            DBOX[0] = SP;
            COPYT(DBOX, REST(DBOX, 1), NSOFT_LEN);
            _LEN = _TBL[1];
            if(!(_LEN)) {
                _TBL[0] = SP;
                //COPYT(_TBL, REST(_TBL, 1), NSOFT_LEN);
                _TBL = "".padEnd(SOFT_LEN,0).split("").map(()=>32);
                _TBL2 = KEY_DEFAULTS[_DKEY][2].split("");
                _LEN = _TBL2.length;
                //_TBL[0] = SOFT_LEN;
                //_TBL[1] = _LEN;
                _X = [_LEN,_LEN,..._TBL2.map(x => x.charCodeAt(0))];//REST(_TBL2, 1);
                COPYT(_X, _TBL, _LEN+2);
                if(!(isEQUAL(HOST, C128, C64))) {
                    
                } else if((_X = isINTBL('\|'.charCodeAt(0), _TBL, _LEN+2, 1))) {
                    _X[0] = '\!'.charCodeAt(0);
                }
            }
            COPYT(_TBL
                .slice(2)
                .map(x => String.fromCharCode(x))
                .join("")
                .toLowerCase()
                .padEnd(SOFT_LEN," ")
                .split("")
                .map(x => x.charCodeAt(0)), DBOX, _LEN);
            SOFT_KEYS[_DKEY][3] = _TBL.slice(2,_TBL[1]+2).map(x => String.fromCharCode(x)).join("").toLowerCase();
            
            Screen.blinking.disable();
            DO_CURSET(_Y, (_LMARGIN + 4));
            COLOR(GCOLOR, BGND);
            HLIGHT(H_INVERSE);
            PRINTT(DBOX, SOFT_LEN);

            _Y = ((_DKEY + 2) + _TOP);
            DO_CURSET(_Y, _LMARGIN);
            if((!(isCOLORS)
              ||  isEQUAL(FORE, GCOLOR))) {
                HLIGHT(H_NORMAL);
                HLIGHT(H_MONO);
            }
            COLOR(GCOLOR, BGND);
            TELL(_LTBL[_DKEY]);
            printBuffer();
    
            if(isEQUAL(_HIT, EOL, DOWN_ARROW, LF, MAC_DOWN_ARROW)) {
                ++_DKEY
            } else if(--_DKEY < 0) {
                _DKEY = (_KEYS + 2);
            }
            Screen.blinking.enable();
            setTimeout(outer_loop.again, 20);
        });
    });
}

function isMAKE_SURE(after) {
    let _X;
    TELL(CR, "Are you sure? (Y/N) >");
    const lazy_input = lazy();
    INPUT(lazy_input.post);
    lazy_input.setFn(_X => {
        CRLF();
        CLEAR(S_TEXT);
        if(isEQUAL(_X, '\Y'.charCodeAt(0), '\y'.charCodeAt(0))) {
            after.post(true);return true;
        } else {
            after.post(false);return false;
        }
    });
}

function DEFAULT_SOFTS() {
    let _CNT=0, _TBL, _X, _LEN;
    while(true) {
        _TBL = SOFT_KEYS[_CNT];
        _TBL[0] = SOFT_LEN;
        _TBL = REST(_TBL, 1);
        _X = KEY_DEFAULTS[_CNT];
        _LEN = (_X[0] + 1);
        COPYT(_X, _TBL, _LEN);
        if((isEQUAL(HOST, C128, C64)
  &&  (_X = isINTBL('\|'.charCodeAt(0), _TBL, _LEN, 1)))) {
            _X[0] = '\!'.charCodeAt(0);
        }
        if(++_CNT > 9) {
            return false;
        }
    }
}

function SOFTS_TO_DBOX(_KEYS) {
    let _X, _TBL, _TBL2, _LEN;
    DBOX[0] = SP;
    COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
    _X = 0;
    while(true) {
        _TBL2 = REST(DBOX, (_X * SOFT_LEN));
        //_TBL = SOFT_KEYS[_X];
        //_LEN = _TBL[1];
        _TBL = SOFT_KEYS[_X][3].split("");
        _LEN = _TBL.length;
        if(isT(_LEN)) {
            COPYT(_TBL, _TBL2, _LEN);
        }
        if(++_X > _KEYS) {
            return false;
        }
    }
}

function V_SETTINGS() {
    let _TOP, _LMARGIN, _LINE, _X, _KEY;
    _TOP = Math.floor((HEIGHT - 19) / 2);
    _LMARGIN = Math.floor((WIDTH - 52) / 2);
    COLOR(GCOLOR, BGND);
    CLEAR(-1);
    SPLIT(22);
    TO_TOP_WINDOW();
    DO_CURSET(_TOP, (_LMARGIN + 18));
    COLOR(FORE, BGND);
    TELL("Display Settings");

    _LINE = 0;
    while(true) {
        SHOW_SETLINE(_LINE, _TOP, _LMARGIN);
        if(++_LINE > 8) {
            break;
        }
    }
    stop_main_loop = true;
    _LINE = 0;
    const outer = lazy(),
        inner_loop = loop_stream();
    outer.setFn(() => {
        SHOW_SETLINE(_LINE, _TOP, _LMARGIN, 1);
        HLIGHT(H_NORMAL);
        SCREEN(S_TEXT);
        if(isEQUAL(_LINE, 7)) {
            /*"Restore."*/
            inner_loop.loadPreaction(() => {
                DO_INPUT(inner_loop);
            });
            inner_loop.loadPostaction(_KEY => {
                const after_sure = () => {
                    if(isEQUAL(_KEY, UP_ARROW, DOWN_ARROW
                        , MAC_UP_ARROW, MAC_DOWN_ARROW)) {
                            _LINE = 8;
                            if(isEQUAL(_KEY, UP_ARROW, MAC_UP_ARROW)) {
                                _LINE = 6;
                                if(!(DMODE)) {
                                    _LINE = 3;
                                }
                            }
                            SHOW_SETLINE(7, _TOP, _LMARGIN);
                            inner_loop.finish();return;
                        }
                        SOUND(S_BOOP);
                        inner_loop.again();
                };
                if(isEQUAL(_KEY, EOL, LF)) {
                    const lazy_sure = lazy();
                    isMAKE_SURE(lazy_sure);
                    lazy_sure.setFn(sure => {
                        if(sure) {
                            if(!(DMODE)) {
                                DMODE = true;
                                SHOW_SETLINE(0, _TOP, _LMARGIN);
                                MAP_ROUTINE = CLOSE_MAP;
                                if(!(VT220)) {
                                    MAP_ROUTINE = FAR_MAP;
                                }
                                IN_DBOX = SHOWING_ROOM;
                                SHOW_SETLINE(4, _TOP, _LMARGIN);
                                PRIOR = 0;
                                SHOW_SETLINE(5, _TOP, _LMARGIN);
                                AUTO = true;
                                SHOW_SETLINE(6, _TOP, _LMARGIN);
                            }
                            if(!(isEQUAL(VERBOSITY, 1))) {
                                VERBOSITY = 1;
                                SHOW_SETLINE(1, _TOP, _LMARGIN);
                            }
                            if(LOWCORE(FLAGS) & 1) {
                                DIROUT(D_PRINTER_OFF);
                                SHOW_SETLINE(2, _TOP, _LMARGIN);
                            }
                            if(!(SAY_STAT)) {
                                SAY_STAT = true;
                                SHOW_SETLINE(3, _TOP, _LMARGIN);
                            }
                            if((isT(VT220)
                            &&  isEQUAL(MAP_ROUTINE
                            , FAR_MAP))) {
                                MAP_ROUTINE = CLOSE_MAP;
                                SHOW_SETLINE(4, _TOP, _LMARGIN);
                            } else if((!(VT220)
                            &&  isEQUAL(MAP_ROUTINE
                            , CLOSE_MAP))) {
                                MAP_ROUTINE = FAR_MAP;
                                SHOW_SETLINE(4, _TOP, _LMARGIN);
                            }
                            if(isT(PRIOR)) {
                                PRIOR = 0;
                                SHOW_SETLINE(5, _TOP, _LMARGIN);
                            }
                            if(!(AUTO)) {
                                AUTO = true;
                                SHOW_SETLINE(6, _TOP, _LMARGIN);
                            }
                            /*break;*/
                        }
                        _KEY = DOWN_ARROW;
                        after_sure();
                    });
                } else
                    after_sure();
                
            });
            inner_loop.onFinish(() => {
                setTimeout(outer.post, 20);
            });
            return;
        } else if(isEQUAL(_LINE, 8)) {
            /*"Exit"*/
            inner_loop.loadPreaction(() => {
                DO_INPUT(inner_loop);
            });
            inner_loop.loadPostaction(_KEY => {
                const after_sure = () => {
                    if(isEQUAL(_KEY, UP_ARROW, DOWN_ARROW)) {
                        _LINE = 0;
                        if(isEQUAL(_KEY, UP_ARROW)) {
                            _LINE = 7;
                        }
                        SHOW_SETLINE(8, _TOP, _LMARGIN);
                        inner_loop.finish();return;
                    }
                    SOUND(S_BOOP);
                    inner_loop.again();
                };
                if(isEQUAL(_KEY, EOL, LF)) {
                    if((!(isEQUAL(HOST, MACINTOSH)))) {
                        V_REFRESH();
                        CONTINUING();
                        stop_main_loop = false;
                        setTimeout(DO_MAIN_LOOP, 20);
                        return true;
                    } else {
                        const lazy_sure = lazy();
                        isMAKE_SURE(lazy_sure)
                        lazy_sure.setFn(sure => {
                            if (sure) {
                                V_REFRESH();
                                CONTINUING();
                                stop_main_loop = false;
                                setTimeout(DO_MAIN_LOOP, 20);
                                return true;
                            } else {
                                _KEY = DOWN_ARROW;
                                after_sure();
                            }
                        });
                    }
                } else
                    after_sure();
            });
            inner_loop.onFinish(() => {
                setTimeout(outer.post, 20);
            });
            return;
        }
        inner_loop.loadPreaction(() => {
            DO_INPUT(inner_loop);
        });
        inner_loop.loadPostaction(_KEY => {
            if(isEQUAL(_KEY, UP_ARROW)) {
                SHOW_SETLINE(_LINE, _TOP, _LMARGIN);
                if(--_LINE < 0) {
                    _LINE = 8;
                }
                inner_loop.finish();return;
            } else if(isEQUAL(_KEY, DOWN_ARROW, EOL, LF)) {
                SHOW_SETLINE(_LINE, _TOP, _LMARGIN);
                if((!(DMODE)
                  &&  isEQUAL(_LINE, 3))) {
                    _LINE = 7;
                    inner_loop.finish();return;
                }
                ++_LINE
                inner_loop.finish();return;
            } else if(isEQUAL(_KEY, RIGHT_ARROW, LEFT_ARROW, SP)) {
                if(!(_LINE)) {
                    if(!(DMODE)) {
                        ++DMODE
                    } else {
                        DMODE = 0;
                    }
                    SHOW_SETLINE(4, _TOP, _LMARGIN);
                    SHOW_SETLINE(5, _TOP, _LMARGIN);
                    SHOW_SETLINE(6, _TOP, _LMARGIN);
                } else if(isEQUAL(_LINE, 2)) {
                    if(LOWCORE(FLAGS) & 1) {
                        DIROUT(D_PRINTER_OFF);
                    } else {
                        DIROUT(D_PRINTER_ON);
                    }
                } else if(isEQUAL(_LINE, 3)) {
                    if(!(SAY_STAT)) {
                        ++SAY_STAT
                    } else {
                        SAY_STAT = 0;
                    }
                } else if(isEQUAL(_LINE, 4)) {
                    if(isEQUAL(MAP_ROUTINE, CLOSE_MAP)) {
                        MAP_ROUTINE = FAR_MAP;
                    } else {
                        MAP_ROUTINE = CLOSE_MAP;
                    }
                } else if(isEQUAL(_LINE, 6)) {
                    if(!(AUTO)) {
                        ++AUTO
                    } else {
                        AUTO = 0;
                    }
                } else if(isEQUAL(_KEY, RIGHT_ARROW, SP)) {
                    if(isEQUAL(_LINE, 1)) {
                        if(++VERBOSITY > 2) {
                            VERBOSITY = 0;
                        }
                    } else if(isEQUAL(_LINE, 5)) {
                        if(!(PRIOR)) {
                            PRIOR = SHOWING_ROOM;
                            IN_DBOX = SHOWING_ROOM;
                        } else if(isEQUAL(PRIOR, SHOWING_ROOM)) {
                            PRIOR = SHOWING_INV;
                            IN_DBOX = SHOWING_INV;
                        } else if((isEQUAL(PRIOR
                        , SHOWING_INV)
                        &&  !(isEQUAL(STAT_ROUTINE
                        , BAR_NUMBER)))) {
                            PRIOR = SHOWING_STATS;
                            IN_DBOX = SHOWING_STATS;
                        } else {
                            PRIOR = 0;
                        }
                    }
                } else {
                    if(isEQUAL(_LINE, 1)) {
                        if(--VERBOSITY < 0) {
                            VERBOSITY = 2;
                        }
                    } else if(isEQUAL(_LINE, 5)) {
                        if(!(PRIOR)) {
                            PRIOR = SHOWING_STATS;
                            IN_DBOX = SHOWING_STATS;
                            if(isEQUAL(STAT_ROUTINE
                            , BAR_NUMBER)) {
                                PRIOR = SHOWING_INV;
                                IN_DBOX = SHOWING_INV;
                            }
                        } else if(isEQUAL(PRIOR, SHOWING_ROOM)) {
                            PRIOR = 0;
                        } else if(isEQUAL(PRIOR, SHOWING_INV)) {
                            PRIOR = SHOWING_ROOM;
                            IN_DBOX = SHOWING_ROOM;
                        } else if(!(isEQUAL(STAT_ROUTINE
                        , BAR_NUMBER))) {
                            PRIOR = SHOWING_INV;
                            IN_DBOX = SHOWING_INV;
                        }
                    }
                }
                inner_loop.finish();return;
            }
            SOUND(S_BOOP);
            setTimeout(inner_loop.again, 20);
        });
        inner_loop.onFinish(() => {
            setTimeout(outer.post, 20);
        });
    });
    outer.post();
}

function SHOW_SETLINE(_LINE, _TOP, _LMARGIN, _HL=0) {
    let _X;
    SCREEN(S_WINDOW);
    _TOP = (_TOP + 2);
    _X = (SETOFFS[_LINE] + _LMARGIN);
    DO_CURSET(((_LINE * 2) + _TOP), _X);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    COLOR(FORE, BGND);
    if(isT(_HL)) {
        HLIGHT(H_INVERSE);
    }
    PRINT(SNAMES[_LINE]);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    PRINTC(SP);
    if(isEQUAL(_LINE, 7, 8)) {
        return true;
    } else if(!(_LINE)) {
        if(isT(DMODE)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Enhanced ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(!(DMODE)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Standard ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else if(isEQUAL(_LINE, 1)) {
        if(!(VERBOSITY)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Superbrief ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(isEQUAL(VERBOSITY, 1)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Brief ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(isEQUAL(VERBOSITY, 2)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Verbose ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else if(isEQUAL(_LINE, 2)) {
        _X = (LOWCORE(FLAGS) & 1);
        if(!(_X)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Off ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(isT(_X)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" On ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else if(isEQUAL(_LINE, 3)) {
        if(!(SAY_STAT)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Off ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(isT(SAY_STAT)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" On ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else if(isEQUAL(_LINE, 4)) {
        if(!(DMODE)) {
            
        } else if(isEQUAL(MAP_ROUTINE, CLOSE_MAP)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Normal ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(!(DMODE)) {
            
        } else if(isEQUAL(MAP_ROUTINE, FAR_MAP)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Wide ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else if(isEQUAL(_LINE, 5)) {
        if(!(DMODE)) {
            
        } else if(!(PRIOR)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Off ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(!(DMODE)) {
            
        } else if(isEQUAL(PRIOR, SHOWING_ROOM)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Room ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(!(DMODE)) {
            
        } else if(isEQUAL(PRIOR, SHOWING_INV)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Inventory ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        if(!(isEQUAL(STAT_ROUTINE, BAR_NUMBER))) {
            PRINTC(SP);
            if(!(DMODE)) {
                
            } else if(isEQUAL(PRIOR, SHOWING_STATS)) {
                HLIGHT(H_INVERSE);
            }
            TELL(" Status ");
            HLIGHT(H_NORMAL);
            HLIGHT(H_MONO);
        }
        return true;
    } else if(isEQUAL(_LINE, 6)) {
        if(!(DMODE)) {
            
        } else if(isT(AUTO)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Automatic ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        PRINTC(SP);
        if(!(DMODE)) {
            
        } else if(!(AUTO)) {
            HLIGHT(H_INVERSE);
        }
        TELL(" Off ");
        HLIGHT(H_NORMAL);
        HLIGHT(H_MONO);
        return true;
    } else {
        return false;
    }
}





function INIT_VERBS() {
    WEARING = WEARING();
    HOLDING = HOLDING();
    MONEY = MONEY();
}