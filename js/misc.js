`MISC for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All Rights Reserved.`

"*** ZCODE STARTS HERE ***"

var GLOBAL_OBJECTS = () => OBJECT({
	FLAGS: [LOCATION, LIGHTED, INDOORS, MAPPED, PLACE, NODESC
, NOARTICLE, PROPER, VOWEL, PLURAL, NOALL, SEEN, PART
, TOUCHED, SURFACE, CONTAINER, OPENABLE, DOORLIKE, OPENED
, TRANSPARENT, LOCKED, TAKEABLE, TRYTAKE, CLOTHING, WORN
, LIVING, PERSON, FEMALE, MUNGED, TOOL, VEHICLE, FERRIC
, READABLE, MANUALLY, WIELDED, WEAPON, MONSTER, SLEEPING
, STRICKEN, SURPRISED, NAMED, BUOYANT, NEUTRALIZED
, IDENTIFIED, USED, VIEWED, NAMEABLE]
});

var LOCAL_GLOBALS = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that",
	FLAGS: [NODESC]
});

var ROOMS = () => OBJECT({
	FLAGS: [NODESC, NOARTICLE],
	DESC: "that"
});

var DUMMY_OBJECT = () => OBJECT({
	FLAGS: [NODESC, NOARTICLE],
	DESC: "nothing"
});

var WINNER/*OBJECT*/ = 0;

var TAB = "  ";
var PERIOD = ".|";
var PTAB = ".|  ";
var YOU_SEE = "You see ";
var LYOU_SEE = ", you see ";
var CANT = "You can't ";
var DONT = "You don't ";
var YOU_HEAR = "You hear ";
var ALREADY = "You're already ";
var BRACKET = "]|  ";
var IMPOSSIBLY = "You couldn't possibly ";
var XTHE = "The ";
var LTHE = "the ";
var COMMA_AND = ", and ";
var SINTO = " into ";
var WITH = " with ";
var CYOU = "You ";
var AND = " and ";
var CYOUR = "Your ";
var SIN = " in ";
var SON = " on ";
var SIS = " is ";
var STO = " to ";
var XA = "A ";
var STHE = " the ";
var GLANCES_AT = " glances at ";
var NOTHING = "There's nothing ";
var AT_MOMENT = " at the moment.|";
var CTHELADY = "The old woman";
var SFIRST = " first.|";
var PERQ = ".\"|";

var HOST = 0;"Host machine ID."
var VT220/*FLAG*/ = null;"Charsets available?"
var COLORS/*FLAG*/ = null;"Color available?"
var GRAPHICS/*FLAG*/ = null;"Graphics available?"
var CWIDTH/*NUMBER*/ = 0;"Pixel width of mono chars."
var CHEIGHT/*NUMBER*/ = 0;"Pixel height of mono chars."
var WIDTH/*NUMBER*/ = 0;"Character width of screen."
var HEIGHT/*NUMBER*/ = 0;"Character height of screen."
var SWIDTH/*NUMBER*/ = 0;"Width of status bars (in characters)."
var BARWIDTH/*NUMBER*/ = 0;"Width of a complete status bar."
var DWIDTH/*NUMBER*/ = 0;"Width of status line and DBOX window."
var BOXWIDTH/*NUMBER*/ = 0;"Justify and display width for DBOX."
var MOUSEDGE/*NUMBER*/ = 0;"Left edge of mouse mindow."
var BAR_RES/*NUMBER*/ = 0;"Number of pixels/character."
var DHEIGHT/*NUMBER*/ = 0;"Current height of DBOX."
var MAX_DHEIGHT/*NUMBER*/ = 0;"Maximum height of DBOX."
var STAT_ROUTINE = null;"Vector to stat-printing routine."
var BGND/*NUMBER*/ = C_BLACK;
var FORE/*NUMBER*/ = C_WHITE;
var INCOLOR/*NUMBER*/ = C_CYAN;
var GCOLOR/*NUMBER*/ = C_RED;

function GO() {
    HERE = HILLTOP;
    MOVE(PLAYER, HERE);
    WINNER = PLAYER;
    isLIT = true;
    INITVARS();
    const lazy_go = lazy();
    STARTUP(lazy_go);
    lazy_go.setFn(() =>{
        const lazy_setup = lazy();
        SETUP_CHARACTER(lazy_setup);
        lazy_setup.setFn(() => {
            WINDIR = (RANDOM(8) - 1);
            QUEUE(I_BREEZE);
            V_REFRESH();
            CRLF();
            V_LOOK();
            DO_MAIN_LOOP();
        });
    });
}

function DO_MAIN_LOOP() {
    MAIN_LOOP();
}

var P_MULT/*FLAG*/ = null;
var stop_main_loop = false;

function MAIN_LOOP() {
    const main_loop = loop_stream();
    let _ICNT, _OCNT, _NUM, _CNT, _OBJ, _TBL, _V=null, _PTBL, _OBJ1, _TMP, _X;
    main_loop.loadPreaction(() => {
        if (HERE === DEATH || stop_main_loop) return;
        _CNT = 0;
        _OBJ = null;
        _PTBL = true;
        if(!(isHERE(QCONTEXT_ROOM))) {
            QCONTEXT = null;
            QCONTEXT_ROOM = null;
        }
        PARSER(main_loop);
    });
    main_loop.loadPostaction(_P_WON => {
        P_WON = _P_WON;
    if(isT(P_WON)) {
        _ICNT = P_PRSI[P_MATCHLEN];
        _OCNT = P_PRSO[P_MATCHLEN];
        if((isT(P_IT_OBJECT)
        &&  isACCESSIBLE(P_IT_OBJECT))) {
            _TMP = null;
            while(true) {
                if(++_CNT > _ICNT) {
                    break;
                } else if(isEQUAL(P_PRSI[_CNT], IT)) {
                    P_PRSI[_CNT] = P_IT_OBJECT;
                    _TMP = true;
                    break;
                }
            }
            if(!(_TMP)) {
                _CNT = 0;
                while(true) {
                    if(++_CNT > _OCNT) {
                        break;
                    } else if(isEQUAL(P_PRSO[_CNT], IT)) {
                        P_PRSO[_CNT] = P_IT_OBJECT;
                        break;
                    }
                }
            }
            _CNT = 0;
        }
        _NUM = 1;
        if(!(_OCNT)) {
            _NUM = 0;
        } else if(_OCNT > 1) {
            _TBL = P_PRSO;
            _OBJ = null;
            if(isT(_ICNT)) {
                _OBJ = P_PRSI[1];
            }
            _NUM = _OCNT;
        } else if(_ICNT > 1) {
            _PTBL = null;
            _TBL = P_PRSI;
            _OBJ = P_PRSO[1];
            _NUM = _ICNT;
        }
        if((!(_OBJ)
        &&  isEQUAL(_ICNT, 1))) {
            _OBJ = P_PRSI[1];
        }
        if(isVERB(V_WALK)) {
            _V = PERFORM(PRSA, PRSO);
        } else if(!(_NUM)) {
            if(!((P_SYNTAX[P_SBITS] & P_SONUMS))) {
                _V = PERFORM(PRSA);
                PRSO = null;
            } else if(!(isLIT)) {
                PCLEAR();
                TOO_DARK();
            } else {
                PCLEAR();
                TELL("[There isn't anything to ");
                _TMP = P_ITBL[P_VERBN];
                if((_X = isTALKING())) {
                    TELL("talk to");
                } else if((isT(P_MERGED)
                ||  isT(P_OFLAG))) {
                    PRINTB(_TMP[0]);
                } else {
                    _X = _TMP[3];
                    WORD_PRINT(_TMP[2], _X);
                }
                TELL(".]", CR);
                _V = null;
            }
        } else /*if((isT(_PTBL)
  &&  _NUM > 1
  &&  isVERB(V_COMPARE))) {
            _V = PERFORM(PRSA, OBJECT_PAIR);
        }*/{
            _X = 0;
            isP_MULT = null;
            if(_NUM > 1) {
                isP_MULT = true;
            }
            _TMP = null;
            while(true) {
                if(++_CNT > _NUM) {
                    if(_X > 0) {
                        TELL("[The ");
                        if(!(isEQUAL(_X, _NUM))) {
                            TELL("other ");
                        }
                        TELL("object");
                        if(!(isEQUAL(_X, 1))) {
                            TELL("s");
                        }
                        TELL(" that you mentioned ");
                        if(!(isEQUAL(_X, 1))) {
                            TELL("are");
                        } else {
                            TELL("is");
                        }
                        TELL("n't here.]", CR);
                    } else if(!(_TMP)) {
                        REFERRING();
                    }
                    break;
                }
                if(isT(_PTBL)) {
                    _OBJ1 = P_PRSO[_CNT];
                } else {
                    _OBJ1 = P_PRSI[_CNT];
                }
                if((_NUM > 1
                ||  isEQUAL(P_ITBL[P_NC1][0]
                , "ALL", "EVERYTHING"))) {
                    if(isEQUAL(_OBJ1, NOT_HERE_OBJECT)) {
                        ++_X
                        continue;
                    } else if((isEQUAL(P_GETFLAGS, P_ALL)
                    &&  isDONT_ALL(_OBJ1, _OBJ))) {
                        continue;
                    } else if(!(isACCESSIBLE(_OBJ1))) {
                        continue;
                    } else if(isEQUAL(_OBJ1, PLAYER)) {
                        continue;
                    }
                    if(isEQUAL(_OBJ1, IT)) {
                        if(!(isIS(P_IT_OBJECT, NOARTICLE))) {
                            TELL(XTHE);
                        }
                        TELL(D(P_IT_OBJECT));
                    } else {
                        if(!(isIS(_OBJ1, NOARTICLE))) {
                            TELL(XTHE);
                        }
                        TELL(D(_OBJ1));
                    }
                    TELL(": ");
                }
                _TMP = true;
                PRSO = _OBJ1;
                PRSI = _OBJ;
                if(!(_PTBL)) {
                    PRSO = _OBJ;
                    PRSI = _OBJ1;
                }
                isPSEUDO_PRSO = null;
                if(isEQUAL(PRSO, PSEUDO_OBJECT)) {
                    isPSEUDO_PRSO = true;
                }
                _V = PERFORM(PRSA, PRSO, PRSI);
                if(isEQUAL(_V, M_FATAL)) {
                    break;
                }
            }
        }
        if(isEQUAL(_V, M_FATAL)) {
            P_CONT = null;
        }
    } else {
        P_CONT = null;
    }
    if((isT(P_WON)
  &&  !(isEQUAL(_V, M_FATAL))
  &&  !((_X = isGAMEVERB())))) {
        _V = CLOCKER();
    }
    PRSA = null;
    PRSO = null;
    PRSI = null;

    setTimeout(main_loop.again, 20);
    return false;
});
}

function isDONT_ALL(_O, _I) {
    let _L, _X;
    _L = LOC(_O);
    if((!(_L)
  ||  isEQUAL(_O, _I))) {
        return true;
    } else if(isVERB(V_TAKE)) {
        if(isEQUAL(_L, WINNER)) {
            return true;
        } else /*if(isIN(_L, WINNER)) {
            return true;
        }*/if((!(isLIT)
  &&  !(isIN(_L, WINNER)))) {
            return true;
        } else if(isIS(_O, NOALL)) {
            return true;
        } else if((!(isIS(_O, TAKEABLE))
  &&  !(isIS(_O, TRYTAKE)))) {
            return true;
        } else if((isIS(_L, CONTAINER)
  &&  !(isIS(_L, OPENED)))) {
            return true;
        } else if(isT(_I)) {
            if(!(isEQUAL(_L, _I))) {
                return true;
            } else if(isSEE_INSIDE(_I)) {
                return false;
            }
            return true;
        } else if(isEQUAL(_L, LOC(PLAYER))) {
            return false;
        } else if((!(isIS(_L, TAKEABLE))
  &&  isSEE_INSIDE(_L))) {
            return false;
        } else {
            return true;
        }
    } else if((_X = isPUTTING())) {
        if(isIS(_O, WORN)) {
            return true;
        } else if(isIS(_O, WIELDED)) {
            return true;
        } else if(isEQUAL(_L, WINNER)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

var C_INTS/*NUMBER*/ = C_TABLE_LENGTH;

function DEQUEUE(_RTN) {
    _RTN = isQUEUED(_RTN);
    if(isT(_RTN)) {
        C_TABLE.splice(C_TABLE.indexOf(_RTN), 1);
    }
    return false;
}

function isQUEUED(_RTN) {
    const interrupt = C_TABLE.filter(x => x[0] === _RTN)[0];
    return interrupt
    ? (interrupt[C_TICK] !== 0 ? interrupt : false)
    : false;
}

"This version of QUEUE automatically enables as well."

function QUEUE(_RTN, _TICK=-1) {
    let interrupt = C_TABLE.filter(x => x[0] === _RTN)[0];
    let alreadyPast = false;
    if (!interrupt) {
        interrupt = [_RTN];
        C_TABLE.push(interrupt);
    } else {
        alreadyPast = C_TABLE.indexOf(interrupt) > C_TABLE.indexOf(CLOCK_HAND);
    }

    if (alreadyPast) _TICK = -(_TICK + 3);

    interrupt[C_TICK] = _TICK;

    return interrupt;
}

var isCLOCK_WAIT/*FLAG*/ = null;
var CLOCK_HAND/*NUMBER*/ = null;
var MOVES/*NUMBER*/ = 0;

function CLOCKER() {
    let _FLG=0, _TICK, _RTN, _X;
    if(isT(isCLOCK_WAIT)) {
        isCLOCK_WAIT = null;
        return false;
    }

    for (let i = 0; i < C_TABLE.length; i++) {
        CLOCK_HAND = C_TABLE[i];
        _TICK = CLOCK_HAND[C_TICK];
        if(_TICK < -1) {
            CLOCK_HAND[C_TICK] = (-_TICK - 3);
        } else if(isT(_TICK)) {
            if(_TICK > 0) {
                CLOCK_HAND[C_TICK] = --_TICK;
            }
            if(!(_TICK > 0)) {
                _RTN = CLOCK_HAND[C_RTN];
                if(!(_TICK)) {
                    C_TABLE.splice(C_TABLE.indexOf(CLOCK_HAND), 1);
                }
                _X = APPLY(_RTN);
                if(isT(_X)) {
                    _FLG = true;
                }
            }
        }
    }

    ++MOVES;
    return _FLG || isREFRESH_STATS();
}

var NO_REFRESH/*NUMBER*/ = -1;"Which stat NOT to refresh."

function isREFRESH_STATS() {
    let _CNT=0, _ANY=0, _STAT, _OSTAT, _NSTAT, _DELTA, _MAX, _RATE;
    _RATE = NORMAL_RATE;
    if((isIN(SCABBARD, PLAYER)
  &&  isIS(SCABBARD, WORN)
  &&  !(isIS(SCABBARD, NEUTRALIZED)))) {
        _RATE = BLESSED_RATE;
    }
    _STAT = ENDURANCE;
    while(true) {
        _OSTAT = STATS[_STAT];
        _MAX = MAXSTATS[_STAT];
        if((isEQUAL(_STAT, INTELLIGENCE)
  &&  isWEARING_MAGIC(HELM))) {
            
        } else if(isEQUAL(NO_REFRESH, _STAT)) {
            NO_REFRESH = -1;
        } else if(!(isEQUAL(_OSTAT, _MAX))) {
            _DELTA = PERCENT(_RATE, _MAX);
            if(_DELTA < 1) {
                _DELTA = 1;
            }
            if(_OSTAT > _MAX) {
                _NSTAT = (_OSTAT - _DELTA);
                if(_NSTAT < _MAX) {
                    _NSTAT = _MAX;
                }
            } else {
                _NSTAT = (_OSTAT + _DELTA);
                if(_NSTAT > _MAX) {
                    _NSTAT = _MAX;
                }
            }
            STATS[_STAT] = _NSTAT;
            if(!(DMODE)) {
                
            } else if((isEQUAL(IN_DBOX, SHOWING_STATS)
  ||  (isT(BMODE)
  &&  isEQUAL(_STAT, ENDURANCE)))) {
                SHOW_STAT(_STAT);
            }
            ++_ANY
            if(isEQUAL(_NSTAT, _MAX)) {
                ++_CNT
                NEW_STATS[_CNT] = _STAT;
            }
        }
        if(++_STAT > LUCK) {
            break;
        }
    }

    if(!(_ANY)) {
        return false;
    } else if(!(DMODE)) {
        UPPER_SLINE();
    } else if(!(VT220)) {
        APPLE_STATS();
    }

    if(!(_CNT)) {
        return false;
    } else if(!(SAY_STAT)) {
        return false;
    }

    if(!(isEQUAL(HOST, MACINTOSH))) {
        HLIGHT(H_BOLD);
    }
    TELL(TAB, "[Your ");
    _ANY = _CNT;
    while(true) {
        TELL(STAT_NAMES[NEW_STATS[_ANY]]);
        if(--_ANY < 1) {
            break;
        } else if(isEQUAL(_ANY, 1)) {
            TELL(AND);
        } else {
            TELL(", ");
        }
    }
    TELL(C(SP));
    if(_CNT > 1) {
        TELL(B("ARE"));
    } else {
        TELL(B("IS"));
    }
    TELL(" back to normal.]", CR);
    HLIGHT(H_NORMAL);
    SOUND(S_BEEP);
    if(!(AUTO)) {
        
    } else if(isEQUAL(NEW_STATS[1], ENDURANCE)) {
        BMODE_OFF();
    }
    return true;
}

function INITVARS() {
    let _X;
    HOST = LOWCORE(INTID);    /*"Establish host machine ID."*/
    isCOLORS = (LOWCORE([ZVERSION, 1]) & 1);
    isGRAPHICS = (LOWCORE(FLAGS) & 8);
    BAR_RES = 8;
    if(isEQUAL(HOST, MACINTOSH)) {
        TCHARS[FIRST_MAC_ARROW] = MAC_UP_ARROW;
        TCHARS[(FIRST_MAC_ARROW + 1)] = MAC_DOWN_ARROW;
        BAR_RES = 6;
    }
    HLIGHT(H_MONO);
    CWIDTH = LOWCORE([FWRD, 0]);    /*"Pixel width of chars."*/
    CHEIGHT = LOWCORE([FWRD, 1]);    /*"Pixel height of chars."*/
    _X = FONT(F_NEWFONT);    /*"For IBM."*/
    _X = FONT(F_DEFAULT);
    HLIGHT(H_NORMAL);

    _X = LOWCORE(HWRD);    /*"Get pixel width of screen."*/
    //WIDTH = (_X / CWIDTH);    /*"Screen width in chars."*/
    WIDTH = LOWCORE(SCRH);
    if(WIDTH > 80) {
        WIDTH = 80;
    }

    _X = LOWCORE(VWRD);    /*"Get pixel height of screen."*/
    //HEIGHT = (_X / CHEIGHT);    /*"Screen width in chars."*/
    HEIGHT = LOWCORE(SCRV);

    DWIDTH = (WIDTH - (MWIDTH + 3));    /*"Width of DBOX."*/
    BOXWIDTH = DWIDTH;
    if(isEQUAL(HOST, APPLE_2C)) {
        --BOXWIDTH
    }
    MOUSEDGE = ((WIDTH - MWIDTH) - 1);

    SWIDTH = (Math.floor(STATMAX / BAR_RES) + 1);
    BARWIDTH = ((LABEL_WIDTH + SWIDTH) + 5);

    CAN_UNDO = 0;
    STAT_ROUTINE = RAWBAR;
    VT220 = true;
    MAX_DHEIGHT = NORMAL_DHEIGHT;
    DHEIGHT = MAX_DHEIGHT;
    MAP_ROUTINE = CLOSE_MAP;
    if((isT(VT100)
  ||  isEQUAL(HOST, APPLE_2E, APPLE_2C)
  ||  (!(isGRAPHICS)
  &&  isEQUAL(HOST, IBM)))) {
        SETUP_APPLE_MODE();
    }
    return false;
}

function SETUP_APPLE_MODE() {
    VT220 = null;
    isGRAPHICS = null;
    STAT_ROUTINE = BAR_NUMBER;
    MAX_DHEIGHT = (NORMAL_DHEIGHT - 1);
    MAP_ROUTINE = FAR_MAP;
    DHEIGHT = MAX_DHEIGHT;
    return false;
}

function CENTER(_Y, _X) {
    DO_CURSET(_Y, ((WIDTH - _X) / 2));
    return false;
}

function DO_CURSET(_Y, _X) {
    /*if(!(isEQUAL(1, CWIDTH, CHEIGHT))) {
        --_X
        _X = (_X * CWIDTH);
        ++_X
        --_Y
        _Y = (_Y * CHEIGHT);
        ++_Y
    }*/
    CURSET(_Y, _X);
    return false;
}

function TO_TOP_WINDOW() {
    let _X;
    _X = FONT(F_DEFAULT);
    SCREEN(S_WINDOW);
    BUFOUT(null);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    COLOR(GCOLOR, BGND);
    return false;
}

function TO_BOTTOM_WINDOW() {
    let _X;
    _X = FONT(F_DEFAULT);
    SCREEN(S_TEXT);
    BUFOUT(true);
    HLIGHT(H_NORMAL);
    COLOR(FORE, BGND);
    return false;
}

var OLD_HERE/*OBJECT*/ = null;

function V_REFRESH() {
    let _REDGE, _X;
    _X = LOWCORE(FLAGS);
    LOWCORE(FLAGS, (_X & 65531/*1111111111111011*/));
    OLD_HERE = null;
    P_WALK_DIR = null;
    COLOR(FORE, BGND);
    CLEAR(-1);
    if(!(DMODE)) {
        SPLIT(2);
        TO_BOTTOM_WINDOW();
        return true;
    }
    NEW_DBOX = IN_DBOX;
    SPLIT(12);

    if(!(VT220)) {
        APPLE_STATS();
        if(isEQUAL(HOST, APPLE_2C)) {
            $2C_BOX();
        } else if(isEQUAL(HOST, IBM)) {
            IBM_BOX();
        }
        return true;
    }

    TO_TOP_WINDOW();
    _X = FONT(F_NEWFONT);
    _REDGE = ((WIDTH - MWIDTH) - 1);

    DO_CURSET(2, 1);
    PRINTC(TLC);
    _X = _REDGE;
    while(true) {
        PRINTC(TOP);
        if(--_X < 3) {
            break;
        }
    }
    PRINTC(TRC);

    DO_CURSET(12, 1);
    PRINTC(BLC);
    _X = _REDGE;
    while(true) {
        PRINTC(BOT);
        if(--_X < 3) {
            break;
        }
    }
    PRINTC(BRC);

    _X = 3;
    while(true) {
        DO_CURSET(_X, 1);
        PRINTC(RSID);
        DO_CURSET(_X, _REDGE);
        PRINTC(LSID);
        if(++_X > 11) {
            break;
        }
    }

    DHEIGHT = MAX_DHEIGHT;
    TO_BOTTOM_WINDOW();
    if(isEQUAL(PRIOR, SHOWING_STATS)) {
        SHOW_RANK();
        DISPLAY_STATS();
    } else if(isT(BMODE)) {
        BATTLE_MODE_ON();
    }
    return true;
}

function IBM_BOX() {
    let _REDGE, _X;
    TO_TOP_WINDOW();
    _X = FONT(F_NEWFONT);

    _REDGE = ((WIDTH - MWIDTH) - 1);

    CURSET(3, 1);
    PRINTC(IBM_TLC);
    _X = _REDGE;
    while(true) {
        PRINTC(IBM_HORZ);
        if(--_X < 3) {
            break;
        }
    }
    PRINTC(IBM_TRC);

    DO_CURSET(12, 1);
    PRINTC(IBM_BLC);
    _X = _REDGE;
    while(true) {
        PRINTC(IBM_HORZ);
        if(--_X < 3) {
            break;
        }
    }
    PRINTC(IBM_BRC);

    _X = 4;
    while(true) {
        DO_CURSET(_X, 1);
        PRINTC(IBM_VERT);
        DO_CURSET(_X, _REDGE);
        PRINTC(IBM_VERT);
        if(++_X > 11) {
            break;
        }
    }

    TO_BOTTOM_WINDOW();
    return true;
}

function $2C_BOX() {
    let _CNT, _X;
    TO_TOP_WINDOW();
    _X = FONT(F_NEWFONT);

    /*"Draw bottom edge."*/

    _X = ((WIDTH - MWIDTH) - 2);    /*"Right edge."*/
    _CNT = 2;
    CURSET(12, 2);
    while(true) {
        PRINTC(APPLE_HORZ);
        if(++_CNT > _X) {
            break;
        }
    }

    /*"Do sides."*/

    _X = 1;
    while(true) {
        CURSET(_X, 1);
        PRINTC(APPLE_RIGHT);
        CURSET(_X, _CNT);
        PRINTC(APPLE_LEFT);
        if(++_X > 11) {
            break;
        }
    }
    TO_BOTTOM_WINDOW();
    return true;
}

function DISPLAY_PLACE() {
    let _DIR=0, _LEN, _X, _DEST, _END;
    _LEN = ROOMS_MAPPED[0];
    if(!(_LEN)) {
        
    } else if(!(OLD_HERE)) {
        
    //} else if((_DEST = isINTBL(OLD_HERE, REST(ROOMS_MAPPED, 1), _LEN, 1))) {
    } else if((_DEST = ROOMS_MAPPED.includes(OLD_HERE))) {
        _END = REST(ROOMS_MAPPED, _LEN);
        if(_DEST < _END) {
            _X = (0 - (_END - _DEST));
            COPYT(REST(_DEST, 1), _DEST, _X);
        }
        ROOMS_MAPPED[0] = (_LEN - 1);
    }
    SETUP_SLINE();
    SAY_HERE();
    CENTER_SLINE();
    SHOW_SLINE();
    if((isEQUAL(P_WALK_DIR, null, "UP", "DOWN")
  ||  isEQUAL(P_WALK_DIR, "IN", "OUT"))) {
        NEW_MAP();
    } else {
        while(true) {
            if(isEQUAL(P_WALK_DIR, PDIR_LIST[_DIR])) {
                _X = (_DIR + 4);
                if(_X > I_NW) {
                    _X = (_X - 8);
                }
                _LEN = GETP(HERE, PDIR_LIST[_X]);
                if(!(_LEN)) {
                    NEW_MAP();
                    break;
                }
                _LEN = (_LEN[XTYPE] & 127);
                ++_LEN
                _X = YOFFS[_DIR];
                if(isEQUAL(MAP_ROUTINE, CLOSE_MAP)) {
                    _X = (_X + _X);
                }
                _X = (_X * _LEN);
                MAPY = (MAPY + _X);
                _X = XOFFS[_DIR];
                if(isEQUAL(MAP_ROUTINE, CLOSE_MAP)) {
                    _X = (_X + _X);
                }
                _X = (_X * _LEN);
                MAPX = (MAPX + _X);
                if((MAPY < 1
                ||  MAPY > (MHEIGHT - 2)
                ||  MAPX < 1
                ||  MAPX > (MWIDTH - 2))) {
                    NEW_MAP();
                    break;
                }
                /*APPLY(MAP_ROUTINE, HERE, MAPY, MAPX);*/
                DRAW_MAP();
                break;
            }
            if(++_DIR > I_NW) {
                break;
            }
        }
    }

    SHOW_MAP();
    if((isT(DMODE)
  &&  isEQUAL(PRIOR, 0, SHOWING_ROOM))) {
        DBOX_TOP = 0;
        UPDATE_ROOMDESC();
    }
    OLD_HERE = HERE;
    return true;
}

function REFRESH_MAP(_NEW=true) {
    if(!(DMODE)) {
        LOWER_SLINE();
        return false;
    }
    SAME_COORDS = _NEW;
    WINDOW(SHOWING_ROOM);
    NEW_MAP();
    SHOW_MAP();
    return false;
}

function SHOW_MAP() {
    let _X;
    TO_TOP_WINDOW();
    if(isT(VT220)) {
        _X = FONT(F_NEWFONT);
    }
    DO_CURSET(1, (WIDTH - MWIDTH));
    PRINTT("".padEnd(MWIDTH+1," "), MWIDTH+1);
    DO_CURSET(1, (WIDTH - MWIDTH));
    PRINTT(MAP, MWIDTH, MHEIGHT);
    TO_BOTTOM_WINDOW();
    return false;
}

function SHOW_RANK(_RIGHT_EDGE=DWIDTH) {
    let _LEN, _X;
    SETUP_SLINE();
    TELL(C(SP));
    PRINT_TABLE(CHARNAME);
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    COPYT(REST(AUX_TABLE, 2), SLINE, _LEN);
    AUX_TABLE[0] = 0;
    DIROUT(D_TABLE_ON, AUX_TABLE);
    ANNOUNCE_RANK();
    PRINTC(SP);
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    _X = REST(SLINE, (_RIGHT_EDGE - _LEN));
    COPYT(REST(AUX_TABLE, 2), _X, _LEN);
    SHOW_SLINE(1, _RIGHT_EDGE);
    return true;
}

var RANK/*NUMBER*/ = 0;

function ANNOUNCE_RANK() {
    let _LEVEL=0, _STAT;
    _STAT = STATS[EXPERIENCE];
    TELL("Level ")
    while(true) {
        if(_STAT < THRESHOLDS[_LEVEL]) {
            break;
        } else if(++_LEVEL > MAX_LEVEL) {
            _LEVEL = 0;
            STATS[EXPERIENCE] = 0;
            if(++RANK > 2) {
                RANK = 2;
            }
            break;
        }
    }
    TELL(N(_LEVEL), C(SP));
    if(isIS(PLAYER, FEMALE)) {
        TELL("Fem");
    } else {
        TELL("M");
    }
    TELL("ale ", RANK_NAMES[RANK]);
    return _LEVEL;
}

function SETUP_SLINE() {
    SLINE[0] = SP;
    COPYT(SLINE, REST(SLINE, 1), (0 - (SLINE_LENGTH - 1)));
    AUX_TABLE[0] = 0;
    DIROUT(D_TABLE_ON, AUX_TABLE);
    return false;
}

function CENTER_SLINE() {
    let _X, _LEN;
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    _X = REST(SLINE, Math.floor((DWIDTH - _LEN) / 2));
    COPYT(REST(AUX_TABLE, 2), _X, _LEN);
    return false;
}

function SHOW_SLINE(_Y=1, _RIGHT_EDGE=DWIDTH) {
    let _X;
    TO_TOP_WINDOW();
    DO_CURSET(_Y, 1);
    if(isEQUAL(_RIGHT_EDGE, WIDTH)) {
        
    } else if(isT(VT220)) {
        _X = FONT(F_NEWFONT);
        PRINTC(58);
        _X = FONT(F_DEFAULT);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _X = FONT(F_NEWFONT);
        PRINTC(APPLE_RIGHT);
        _X = FONT(F_DEFAULT);
    } else {
        TELL(C(SP));
    }
    HLIGHT(H_INVERSE);
    PRINTT(SLINE, _RIGHT_EDGE);
    HLIGHT(H_NORMAL);
    HLIGHT(H_MONO);
    if(isEQUAL(_RIGHT_EDGE, WIDTH)) {
        
    } else if(isT(VT220)) {
        _X = FONT(F_NEWFONT);
        PRINTC(57);
        _X = FONT(F_DEFAULT);
    } else if(isEQUAL(HOST, APPLE_2C)) {
        _X = FONT(F_NEWFONT);
        PRINTC(APPLE_LEFT);
        _X = FONT(F_DEFAULT);
    } else {
        TELL(C(SP));
    }
    TO_BOTTOM_WINDOW();
    return false;
}

function SAY_HERE() {
    let _X;
    if(isHERE(DEATH)) {
        
    } else if(!(isLIT)) {
        TELL("Darkness");
        return true;
    }
    TELL(D(HERE));
    _X = LOC(PLAYER);
    if(isIS(_X, VEHICLE)) {
        TELL(C(COMMA));
        if((isEQUAL(_X, SADDLE)
  &&  isIN(SADDLE, DACT))) {
            TELL(SON, A(DACT));
            return true;
        }
        ON_IN(_X);
    }
    return true;
}

function PRINT_SPACES(_N) {
    while(true) {
        if(--_N < 0) {
            return true;
        }
        TELL(C(SP));
    }
}

var MAPX/*NUMBER*/ = CENTERX;
var MAPY/*NUMBER*/ = CENTERY;

var MAP_ROUTINE = null;

var SAME_COORDS/*FLAG*/ = null;

function NEW_MAP() {
    let _TBL, _X;
    if(isT(SAME_COORDS)) {
        SAME_COORDS = null;
    } else {
        MAPX = CENTERX;
        MAPY = CENTERY;
        _TBL = GETPT(HERE, "COORDS");
        if(isT(_TBL)) {
            _X = _TBL[0];
            if(isT(_X)) {
                MAPX = _X;
            }
            _X = _TBL[1];
            if(isT(_X)) {
                MAPY = _X;
            }
        }
    }
    DRAW_MAP();
    return true;
}

function DRAW_MAP() {
    COPYT(ROOMS_MAPPED, 0, ROOMS_MAPPED_LENGTH);
    MAP[0] = SP;
    COPYT(MAP, REST(MAP, 1), (0 - (MAP_SIZE - 1)));
    APPLY(MAP_ROUTINE, HERE, MAPY, MAPX);
    return false;
}

function CLOSE_MAP(_RM, _Y, _X) {
    let _DIR, _TBL, _CHAR, _TYPE, _LEN, _DEST, _NY, _NX, _YOFF, _XOFF, _CTBL;
    _LEN = ROOMS_MAPPED[0];
    if((!(_LEN)
    //||  !((_CHAR = isINTBL(_RM, REST(ROOMS_MAPPED, 1), _LEN, 1))))) {
    ||  !((_CHAR = ROOMS_MAPPED.includes(_RM))))) {
        if(++_LEN > (ROOMS_MAPPED_LENGTH - 1)) {
            /*SAY_ERROR("CLOSE-MAP <1>");*/
            return true;
        }
        ROOMS_MAPPED[_LEN] = _RM;
        ROOMS_MAPPED[0] = _LEN;
    }
    if((_Y > -1
    &&  _Y < MHEIGHT
    &&  _X > -1
    &&  _X < MWIDTH)) {
        if(isT(VT220)) {
            _CHAR = isSMART_CHAR(_RM);
        } else {
            _CHAR = isDUMB_CHAR(_RM);
        }
        REST(MAP, (_Y * MWIDTH))[_X] = _CHAR;
        /*if(isT(DRAW)) {
            SHOW_DRAWING(_Y, _X, _CHAR);
        }*/
    }
    MAKE(_RM, MAPPED);
    _DIR = -1;
    while(true) {
        if(++_DIR > I_NW) {
            UNMAKE(_RM, MAPPED);
            return true;
        }
        _LEN = 0;
        _DEST = null;        /*"Very important!"*/
        _TYPE = null;
        _CTBL = XCHARS;        /*"Assume exit edges."*/

        /*"Get attributes of a direction."*/
        _TBL = GETP(_RM, PDIR_LIST[_DIR]);
        if(isT(_TBL)) {
            _TYPE = _TBL[XTYPE];
            _LEN = (_TYPE & 255);
            _TYPE = MSB(_TYPE);
        }
        if((!(_TBL)
        ||  isEQUAL(_TYPE, NO_EXIT, SORRY_EXIT/*FSORRY_EXIT*/)
        ||  !(_LEN & MARKBIT)
        )) {
            _CTBL = NXCHARS;
        } else if(isEQUAL(_TYPE, FCONNECT)) {
            _DEST = -1;
            _LEN = (_LEN & 127);
            if(!(_LEN)) {
                _CTBL = NXCHARS;
            }
        } else {
            _DEST = _TBL[XROOM];
            if((!(_DEST)
            ||  !(isIN(_DEST, ROOMS)))) {
                /*SAY_ERROR("CLOSE-MAP <3>");*/
                return false;
            } else if((isEQUAL(_TYPE, SHADOW_EXIT)
            ||  (isEQUAL(_TYPE, DCONNECT)
            &&  !(isIS(_TBL[XDATA], OPENED))))) {
                _CTBL = NXCHARS;
            }
        }
        _LEN = (_LEN & 127);
        _YOFF = YOFFS[_DIR];        /*"Establish offsets."*/
        _XOFF = XOFFS[_DIR];
        _NY = (_Y + _YOFF);        /*"Do room edge."*/
        _NX = (_X + _XOFF);
        if((_NY < 0
        ||  _NY > (MHEIGHT - 1)
        ||  _NX < 0
        ||  _NX > (MWIDTH - 1))) {
            continue;
        }
        _CHAR = _CTBL[_DIR];
        if(!(VT220)) {
            _CHAR = SHITCHARS[_DIR];
            if(isEQUAL(_CTBL, NXCHARS)) {
                _CHAR = SP;
            }
        } else if(isHERE(_RM)) {
            _CHAR = (_CHAR + 17);
        }
        REST(MAP, (_NY * MWIDTH))[_NX] = _CHAR;
        /*if(isT(DRAW)) {
            SHOW_DRAWING(_NY, _NX, _CHAR);
        }*/
        if((!(_TBL)/*"If no exit ..."*/
        ||  !(_TYPE)
        ||  !(_DEST)/*"Or no connection ..."*/
        ||  _Y < 0
        ||  _Y > (MHEIGHT - 1)
        ||  _X < 0
        ||  _X > (MWIDTH - 1))) {
            continue;
        }
        _LEN = (_LEN + (_LEN & 254/*11111110*/));
        _CHAR = MCHARS[_DIR];        /*"Continue the path."*/
        if(isEQUAL(_TYPE, X_EXIT)) {
            if(_DIR & 1) {
                _CHAR = XCROSS;
                if(!(VT220)) {
                    _CHAR = '\X'.charCodeAt(0);
                }
            } else {
                _CHAR = HVCROSS;
                if(!(VT220)) {
                    _CHAR = '\+'.charCodeAt(0);
                }
            }
        } else if(isEQUAL(_CTBL, NXCHARS)) {
            /*"For closed doors."*/
            _CHAR = SOLID;
            if(!(VT220)) {
                _CHAR = SP;
            }
        } else if(!(VT220)) {
            _CHAR = SHITCHARS[_DIR];
        }
        while(true) {
            _NY = (_NY + _YOFF);
            _NX = (_NX + _XOFF);
            if((_NY < 0
            ||  _NY > (MHEIGHT - 1)
            ||  _NX < 0
            ||  _NX > (MWIDTH - 1))) {
                break;
            }
            REST(MAP, (_NY * MWIDTH))[_NX] = _CHAR;
            /*if(isT(DRAW)) {
                SHOW_DRAWING(_NY, _NX, _CHAR);
            }*/
            if(--_LEN < 1) {
                break;
            }
        }
        if(isEQUAL(_DEST, -1)) {
            /*"If it's an FCONNECT ..."*/
            continue;
        } else if(isIS(_DEST, MAPPED)) {
            continue;
        //} else if((_CHAR = isINTBL(_DEST, REST(ROOMS_MAPPED, 1), ROOMS_MAPPED[0], 1))) {
        } else if((_CHAR = ROOMS_MAPPED.includes(_DEST))) {
            continue;
        } else if(!(isIS(_DEST, VIEWED))) {
            continue;
        }
        _NY = (_NY + (_YOFF + _YOFF));
        _NX = (_NX + (_XOFF + _XOFF));
        if((_NY < -1
        ||  _NY > MHEIGHT
        ||  _NX < -1
        ||  _NX > MWIDTH)) {
            continue;
        }
        CLOSE_MAP(_DEST, _NY, _NX);
    }
}

function isDUMB_CHAR(_RM) {
    let _CHAR;
    _CHAR = '\*'.charCodeAt(0);
    if(isHERE(_RM)) {
        _CHAR = '\@'.charCodeAt(0);
    } else if(!(isIS_LIT(_RM))) {
        _CHAR = '\?'.charCodeAt(0);
    }
    return _CHAR;
}

function isSMART_CHAR(_RM) {
    let _CHAR, _TBL;
    _CHAR = SOLID;
    if(isHERE(_RM)) {
        _CHAR = ISOLID;
    }
    if(!(isIS_LIT(_RM))) {
        _CHAR = QMARK;
        if(isHERE(_RM)) {
            _CHAR = IQMARK;
        }
    }
    _TBL = GETP(_RM, "UP");
    if((isT(_TBL)
  &&  isCHECK_EXIT(_RM, _TBL))) {
        _CHAR = UARROW;
        if(isHERE(_RM)) {
            _CHAR = IUARROW;
        }
    }
    _TBL = GETP(_RM, "DOWN");
    if((isT(_TBL)
  &&  isCHECK_EXIT(_RM, _TBL))) {
        if(isEQUAL(_CHAR, UARROW)) {
            return UDARROW;
        } else if(isEQUAL(_CHAR, IUARROW)) {
            return IUDARROW;
        } else if(isHERE(_RM)) {
            return IDARROW;
        }
        return DARROW;
    }
    return _CHAR;
}

function isCHECK_EXIT(_RM, _TBL) {
    let _EXIT_WORD, _ROOM, _XDIR, _XTBL, _TYPE, _LEN;
    /*"Make sure exit is unique."*/

    _EXIT_WORD = _TBL[XTYPE];
    _ROOM = _TBL[XROOM];
    _XDIR = asPROP("NW");
    while(true) {
        _XTBL = GETP(_RM, PROP(_XDIR));
        if((isT(_TBL)
        &&  isEQUAL(_XTBL[XTYPE], _EXIT_WORD)
        &&  isEQUAL(_XTBL[XROOM], _ROOM))) {
            return false;
        }
        if(++_XDIR > asPROP("NORTH")) {
            break;
        }
    }

    /*"Exit is unique, so see if it's open."*/

    _TYPE = MSB(_EXIT_WORD);
    _LEN = (_EXIT_WORD & 127);
    if(isEQUAL(_TYPE, NO_EXIT, SORRY_EXIT/*FSORRY_EXIT*/)) {
        return false;
    } else if(!(_EXIT_WORD & MARKBIT)) {
        return false;
    } else if(isEQUAL(_TYPE, CONNECT, SCONNECT, X_EXIT)) {
        return true;
    } else if((isEQUAL(_TYPE, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED))) {
        return true;
    } else if((isEQUAL(_TYPE, FCONNECT)
  &&  isT(_LEN))) {
        return true;
    } else {
        return false;
    }
}

function FAR_MAP(_RM, _Y, _X) {
    let _DIR, _TBL, _CHAR, _TYPE, _LEN, _DEST, _NY, _NX, _YOFF, _XOFF;
    _LEN = ROOMS_MAPPED[0];
    if((!(_LEN)
  ||  !((_CHAR = isINTBL(_RM, REST(ROOMS_MAPPED, 1), _LEN, 1))))) {
        if(++_LEN > (ROOMS_MAPPED_LENGTH - 1)) {
            /*SAY_ERROR("FAR-MAP <1>");*/
            return true;
        }
        ROOMS_MAPPED[_LEN] = _RM;
        ROOMS_MAPPED[0] = _LEN;
    }
    if((_Y > -1
  &&  _Y < MHEIGHT
  &&  _X > -1
  &&  _X < MWIDTH)) {
        if(!(VT220)) {
            _CHAR = isDUMB_CHAR(_RM);
        } else {
            _CHAR = SMBOX;
            if(isHERE(_RM)) {
                _CHAR = ISOLID;
            }
        }
        REST(MAP, (_Y * MWIDTH))[_X] = _CHAR;
    }
    MAKE(_RM, MAPPED);
    _DIR = -1;
    while(true) {
        if(++_DIR > I_NW) {
            UNMAKE(_RM, MAPPED);
            return true;
        }
        _LEN = 0;
        _DEST = null;
        _TYPE = null;
        _TBL = GETP(_RM, PDIR_LIST[_DIR]);
        if(!(_TBL)) {
            continue;
        }
        _TYPE = _TBL[XTYPE];
        _LEN = (_TYPE & 255);
        _TYPE = MSB(_TYPE);
        if(!(_TYPE)) {
            /*SAY_ERROR("FAR-MAP <2>");*/
            return false;
        } else if(isEQUAL(_TYPE, NO_EXIT, SORRY_EXIT/*FSORRY_EXIT*/)) {
            continue;
        } else if(!(_LEN & MARKBIT)) {
            continue;
        } else if(isEQUAL(_TYPE, FCONNECT)) {
            _DEST = -1;
        } else {
            _DEST = _TBL[XROOM];
            if((!(_DEST)
  ||  !(isIN(_DEST, ROOMS)))) {
                /*SAY_ERROR("FAR-MAP <3>");*/
                return false;
            }
        }
        if((!(_DEST)/*"No connection ..."*/
  ||  _Y < 0
  ||  _Y > (MHEIGHT - 1)
  ||  _X < 0
  ||  _X > (MWIDTH - 1))) {
            continue;
        }
        _LEN = (_LEN & 127);
        _YOFF = YOFFS[_DIR];        /*"Establish offsets."*/
        _XOFF = XOFFS[_DIR];
        _CHAR = MCHARS[_DIR];        /*"Continue the path."*/
        if(isEQUAL(_TYPE, X_EXIT)) {
            if(_DIR & 1) {
                _CHAR = XCROSS;
                if(!(VT220)) {
                    _CHAR = '\X'.charCodeAt(0);
                }
            } else {
                _CHAR = HVCROSS;
                if(!(VT220)) {
                    _CHAR = '\+'.charCodeAt(0);
                }
            }
        } else if((isEQUAL(_TYPE, SHADOW_EXIT)
  ||  (isEQUAL(_TYPE, DCONNECT)
  &&  !(isIS(_TBL[XDATA], OPENED))))) {
            _CHAR = SOLID;
            if(!(VT220)) {
                _CHAR = SP;
            }
        } else if(!(VT220)) {
            _CHAR = SHITCHARS[_DIR];
        }
        _NY = _Y;
        _NX = _X;
        while(true) {
            _NY = (_NY + _YOFF);
            _NX = (_NX + _XOFF);
            if((_NY < 0
  ||  _NY > (MHEIGHT - 1)
  ||  _NX < 0
  ||  _NX > (MWIDTH - 1))) {
                break;
            }
            REST(MAP, (_NY * MWIDTH))[_NX] = _CHAR;
            if(--_LEN < 1) {
                break;
            }
        }
        if(isEQUAL(_DEST, -1)) {
            /*"If it's an FCONNECT ..."*/
            continue;
        } else if(isIS(_DEST, MAPPED)) {
            continue;
        } else if((_CHAR = isINTBL(_DEST, REST(ROOMS_MAPPED, 1)
, ROOMS_MAPPED[0], 1))) {
            continue;
        } else if(!(isIS(_DEST, VIEWED))) {
            continue;
        }
        _NY = (_NY + _YOFF);
        _NX = (_NX + _XOFF);
        if((_NY < -1
  ||  _NY > MHEIGHT
  ||  _NX < -1
  ||  _NX > MWIDTH)) {
            continue;
        }
        FAR_MAP(_DEST, _NY, _NX);
    }
}

function RELOOK(_NOP=0) {
    if(!(_NOP)) {
        PRINT(PERIOD);
    }
    if(isT(VERBOSITY)) {
        CRLF();
    }
    V_LOOK();
    return false;
}

function V_LOOK(_V=true) {
    if(!(isEQUAL(HOST, MACINTOSH))) {
        HLIGHT(H_BOLD);
    }
    SAY_HERE();
    CRLF();
    HLIGHT(H_NORMAL);
    if(isT(isLIT)) {
        MARK_EXITS();
    }
    if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_STATS, SHOWING_INV))) {
        DESCRIBE_HERE(_V);
        if(!(DMODE)) {
            UPPER_SLINE();
            LOWER_SLINE();
            OLD_HERE = HERE;
            return true;
        }
        DISPLAY_PLACE();
        return true;
    }
    DISPLAY_PLACE();
    if(LOWCORE(FLAGS) & 1) {
        DIROUT(D_SCREEN_OFF);
        DESCRIBE_HERE(_V);
        DIROUT(D_SCREEN_ON);
    }
    return true;
}

"Mark each visible exit as TOUCHED by setting bit 7 of XTYPE word."

function MARK_EXITS() {
    let _DIR, _TBL, _WRD, _TYPE, _LEN;
    _DIR = asPROP("NORTH");
    while(true) {
        _TBL = GETP(HERE, PROP(_DIR));
        if(isT(_TBL)) {
            _WRD = _TBL[XTYPE];
            _TYPE = MSB(_WRD);
            _LEN = (_WRD & 127);
            if(_WRD & MARKBIT) {
                
            } else /*Already marked?*/if((isEQUAL(_TYPE, CONNECT, SCONNECT, X_EXIT)
            ||  (isEQUAL(_TYPE, FCONNECT)
            &&  isT(_LEN))
            ||  (isEQUAL(_TYPE, DCONNECT)
            &&  isIS(_TBL[XDATA], OPENED)))) {
                _TBL[XTYPE] = (_WRD + MARKBIT);
            }
        }
        if(--_DIR < asPROP("DOWN")) {
            return false;
        }
    }
}

function UPDATE_ROOMDESC() {
    IN_DBOX = SHOWING_ROOM;
    SETUP_DBOX();
    DESCRIBE_HERE();
    JUSTIFY_DBOX();
    DISPLAY_DBOX();
    return false;
}

function DESCRIBE_HERE(_V=null) {
    let _INDENT=0, _X;
    if((!(DMODE)
  ||  isEQUAL(PRIOR, SHOWING_INV, SHOWING_STATS))) {
        ++_INDENT
    }
    if(isHERE(DEATH)) {
        if(isT(_INDENT)) {
            TELL(TAB);
        }
        TELL("You are de");
        if(isIS(DEATH, MUNGED)) {
            TELL("feated.", CR);
            return true;
        }
        TELL("ad.", CR);
        return true;
    } else if(!(isLIT)) {
        MAKE(HERE, TOUCHED);
        MAKE(HERE, VIEWED);
        if(isT(_INDENT)) {
            TELL(TAB);
        }
        if(isWEARING_MAGIC(HELM)) {
            if(isIN(URGRUE, HERE)) {
                P_IT_OBJECT = URGRUE;
                LAST_MONSTER = URGRUE;
                TELL("You sense the presence of an obscure shadow in the darkness.", CR);
                return true;
            } else if(isIN(GRUE, HERE)) {
                MAKE(GRUE, SEEN);
                P_IT_OBJECT = GRUE;
                LAST_MONSTER = GRUE;
                TELL(PICK_NEXT(GRUE_SIGHTS), PERIOD);
                return true;
            }
        }
        TELL("It's completely dark");
        if((!(isIS(GRUE, SEEN))
  ||  PROB(50))) {
            MAKE(GRUE, SEEN);
            TELL(". You are likely to be eaten by a grue");
        }
        PRINT(PERIOD);
        return true;
    }
    UNMAKE(GRUE, SEEN);
    _X = GETP(HERE, "ACTION");
    if(isT(_X)) {
        if((isT(_V)
  ||  !(_INDENT)
  ||  isEQUAL(VERBOSITY, 2)
  ||  (isEQUAL(VERBOSITY, 1)
  &&  !(isIS(HERE, TOUCHED))))) {
            if(isT(_INDENT)) {
                TELL(TAB);
            }
            APPLY(_X, M_LOOK);
        }
    }
    MAKE(HERE, TOUCHED);
    MAKE(HERE, VIEWED);
    if((isT(_V)
  ||  isT(VERBOSITY)
  ||  !(_INDENT))) {
        DESCRIBE_OBJECTS();
    }
    return true;
}

function UPPER_SLINE() {
    SETUP_SLINE();
    TELL(C(SP));
    PRINT_TABLE(CHARNAME);
    NEXTLINE();
    TEXT_STATS();
    PRINTLINE(1);
    return true;
}

function TEXT_STATS() {
    let _STAT=0, _X;
    while(true) {
        TELL(STSTR[_STAT]);
        PRINTC('\:'.charCodeAt(0));
        _X = STATS[_STAT];
        /*if(_X < 10) {
            PRINTC('\0'.charCodeAt(0));
        }*/
        TELL((""+_X).padStart(2,0), C(SP));
        if(++_STAT > 6) {
            return false;
        }
    }
}

function NEXTLINE() {
    let _LEN;
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    COPYT(REST(AUX_TABLE, 2), SLINE, _LEN);
    DIROUT(D_TABLE_ON, AUX_TABLE);
    AUX_TABLE[0] = 0;
    return false;
}

function PRINTLINE(_LINE) {
    let _LEN, _X;
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    _X = REST(SLINE, (WIDTH - _LEN));
    COPYT(REST(AUX_TABLE, 2), _X, _LEN);
    TO_TOP_WINDOW();
    DO_CURSET(_LINE, 1);
    HLIGHT(H_INVERSE);
    PRINTT(SLINE, WIDTH);
    TO_BOTTOM_WINDOW();
    return false;
}

function LOWER_SLINE() {
    let _ANY=0, _PTR, _DIR, _TBL, _TYPE, _X;
    SETUP_SLINE();
    PRINTC(SP);
    SAY_HERE();
    NEXTLINE();
    TELL("Exits:");
    if(!(isLIT)) {
        TELL(" None visible");
    } else {
        COPYT(GOOD_DIRS, 0, 32);        /*"List N-NW, remember in GOOD-DIRS."*/
        _DIR = I_NORTH;
        while(true) {
            _TBL = GETP(HERE, PDIR_LIST[_DIR]);
            if(isT(_TBL)) {
                _TYPE = _TBL[XTYPE];
                _X = MSB(_TYPE);
                if((isEQUAL(_X, CONNECT, SCONNECT, X_EXIT)
  ||  (isEQUAL(_X, FCONNECT)
  &&  (_TYPE & 127))
  ||  (isEQUAL(_X, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED)))) {
                    COPYT(_TBL, REST(GOOD_DIRS, (_DIR * 4)), -4);
                    ++_ANY
                    TELL(C(SP), XLIST_NAMES[_DIR]);
                }
            }
            if(++_DIR > I_NW) {
                break;
            }
        }
        _PTR = REST(GOOD_DIRS, 2);        /*"Point to XROOM entries."*/
        while(true) {
            _TBL = GETP(HERE, PDIR_LIST[_DIR]);
            if(isT(_TBL)) {
                _TYPE = _TBL[XTYPE];
                _X = MSB(_TYPE);
                if((isEQUAL(_X, CONNECT, SCONNECT, X_EXIT)
  ||  (isEQUAL(_X, FCONNECT)
  &&  (_TYPE & 127))
  ||  (isEQUAL(_X, DCONNECT)
  &&  isIS(_TBL[XDATA], OPENED)))) {
                    if((!((_X = isINTBL(_TYPE, GOOD_DIRS, 8, 132)))
  ||  !((_X = isINTBL(_TBL[XROOM]
, _PTR, 8, 132))))) {
                        ++_ANY
                        TELL(C(SP
), XLIST_NAMES[_DIR]);
                    }
                }
            }
            if(++_DIR > 11) {
                break;
            }
        }
        if(!(_ANY)) {
            TELL(" None");
        }
    }
    PRINTC(SP);
    PRINTLINE(2);
    return true;
}

var DBOX_LINES/*NUMBER*/ = 0;"Number of lines in current DBOX."
var DBOX_TOP/*NUMBER*/ = 0;"Top line to be displayed."

var IN_DBOX/*NUMBER*/ = SHOWING_ROOM;"Current contents of DBOX."
var NEW_DBOX/*NUMBER*/ = SHOWING_ROOM;"DBOX to update if visible."

function SETUP_DBOX() {
    DBOX_LINES = 0;
    DBOX[0] = SP;
    COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
    DBOX[0] = 0;
    DIROUT(D_TABLE_ON, DBOX);
    return false;
}

function JUSTIFY_DBOX() {
    DIROUT(D_TABLE_OFF);
    const content = Screen.processContent(
        DBOX.slice(2, DBOX[0] + 2).join(""), BOXWIDTH
    )
    .map(x => x.padEnd(BOXWIDTH, " "))
    .join("");
    let i = 2;
    for (const c of content) DBOX[i++] = c;
    return true;
}

function DISPLAY_DBOX() {
    let _MORE=0, _TLC, _BASE, _LINES;
    NEW_DBOX = 0;
    _TLC = (12 - MAX_DHEIGHT);
    _BASE = REST(DBOX, 2);
    if(isT(DBOX_TOP)) {
        _BASE = (_BASE + (DBOX_TOP * BOXWIDTH));
    }
    _LINES = DHEIGHT;
    if(IN_DBOX & SHOWING_STATS) {
        _LINES = MAX_DHEIGHT;
    } else if((DBOX_LINES - DBOX_TOP) > DHEIGHT) {
        ++_MORE
        --_LINES
    }
    TO_TOP_WINDOW();
    COLOR(FORE, BGND);
    DO_CURSET(_TLC, 2);
    if(isEQUAL(HOST, APPLE_2C)) {
        /*"Nudge it over."*/
        PRINTC(SP);
    } else if(!(VT220)) {
        if(!(isEQUAL(HOST, IBM))) {
            HLIGHT(H_INVERSE);
        }
    }
    PRINTT(_BASE, BOXWIDTH, _LINES);
    if(isT(DBOX_TOP)) {
        SAY_MORE(_TLC, true);
    }
    if(isT(_MORE)) {
        SAY_MORE((DHEIGHT + (11 - MAX_DHEIGHT)));
    }
    TO_BOTTOM_WINDOW();
    return true;
}

function SAY_MORE(_Y, _UP=null) {
    let _X;
    COLOR(GCOLOR, BGND);
    DO_CURSET(_Y, 2);
    if(isEQUAL(HOST, APPLE_2C)) {
        PRINTC(SP);
    }
    TELL("[MORE]");
    if(isEQUAL(HOST, MACINTOSH)) {
        PRINT_SPACES((BOXWIDTH - 30));
        TELL("[Press ");
        if(isT(_UP)) {
            TELL("\\");
        } else {
            TELL("/");
        }
        TELL(" or ");
        _X = FONT(F_NEWFONT);
        if(isT(_UP)) {
            PRINTC(92);
        } else {
            PRINTC(93);
        }
        _X = FONT(F_DEFAULT);
    } else if((isT(VT220)
  ||  isEQUAL(HOST, APPLE_2C, IBM))) {
        PRINT_SPACES((BOXWIDTH - 25));
        TELL("[Press ");
        _X = FONT(F_NEWFONT);
        if(isT(VT220)) {
            _X = 93;
            if(isT(_UP)) {
                --_X
            }
        } else if(isEQUAL(HOST, APPLE_2C)) {
            _X = 74;
            if(isT(_UP)) {
                ++_X
            }
        } else {
            _X = 25;
            if(isT(_UP)) {
                --_X
            }
        }
        PRINTC(_X);
        _X = FONT(F_DEFAULT);
    } else {
        PRINT_SPACES((BOXWIDTH - 34));
        if(isT(_UP)) {
            TELL("  ");
        }
        TELL("[Press ");
        if(isT(_UP)) {
            TELL("UP");
        } else {
            TELL("DOWN");
        }
        TELL(" arrow");
    }
    TELL(" to scroll]");
    return false;
}

var X_OBJECT = () => OBJECT({

});

var DESCING/*OBJECT*/ = null;"Object currently being described."

function DESCRIBE_OBJECTS() {
    let _isTWO=0, _isIT=0, _isANY=0, _CR=0, _B=0, _is$1ST, _OBJ, _NXT, _STR, _X;
    if(!(isLIT)) {
        TOO_DARK();
        return true;
    } else if(!((_OBJ = isFIRST(HERE)))) {
        return true;
    }    /*"Nothing here, so scram."*/

    /*"Handle vehicles."*/

    _OBJ = LOC(WINNER);
    if((!(isEQUAL(_OBJ, HERE))
  &&  isIS(_OBJ, VEHICLE)
  &&  isIN(_OBJ, HERE))) {
        MOVE(_OBJ, DUMMY_OBJECT);
        if(isSEE_ANYTHING_IN(_OBJ)) {
            TELL(TAB, YOU_SEE);
            CONTENTS(_OBJ);
            ON_IN(_OBJ);
            TELL(PERIOD);
        }
    }

    /*"Hide invisible objects"*/

    if((_OBJ = isFIRST(HERE))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if((isIS(_OBJ, NODESC)
  ||  isEQUAL(_OBJ, WINNER))) {
                MOVE(_OBJ, DUMMY_OBJECT);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }

    /*"Apply FDESCs."*/

    /*if((_OBJ = isFIRST(HERE))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            _STR = GETP(_OBJ, "FDESC");
            if((isT(_STR)
  &&  !(isIS(_OBJ, TOUCHED)))) {
                TELL(TAB, _STR, CR);
                THIS_IS_IT(_OBJ);
                MOVE(_OBJ, DUMMY_OBJECT);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }*/

    /*"Apply DESCFCNs."*/

    if((_OBJ = isFIRST(HERE))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            _STR = GETP(_OBJ, "DESCFCN");
            if(isT(_STR)) {
                DESCING = _OBJ;
                TELL(TAB);
                APPLY(_STR, M_OBJDESC);
                CRLF();
                THIS_IS_IT(_OBJ);
                MOVE(_OBJ, DUMMY_OBJECT);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }

    /*"Print whatever's left in a nice sentence"*/

    _is$1ST = 1;
    _OBJ = isFIRST(HERE);
    while(true) {
        if(!(_OBJ)) {
            if(isT(_is$1ST)) {
                break;
            } else /*Nothin' left.*/if((isT(_isIT)
                                    &&  !(_isTWO))) {
                THIS_IS_IT(_OBJ);
            }
            TELL(" here.");
            ++_isANY
            break;
        }
        _NXT = isNEXT(_OBJ);
        if(isT(_is$1ST)) {
            --_is$1ST
            TELL(TAB);
            if(isT(_NXT)) {
                TELL(YOU_SEE);
            } else if(isIS(_OBJ, PLURAL)) {
                TELL("There are ");
            } else {
                TELL("There's ");
            }
        } else {
            if(isT(_NXT)) {
                TELL(", ");
            } else {
                TELL(AND);
            }
        }
        DESCING = _OBJ;
        TELL(A(_OBJ));
        if((isEQUAL(_OBJ, GOBLET)
        &&  isIN(BFLY, _OBJ)
        &&  isIS(BFLY, LIVING))) {
            ++_B
            TELL(WITH, A(BFLY));
            PRINT(" resting on the rim");
            REMOVE(BFLY);
        }
        if((isSEE_INSIDE(_OBJ)
        &&  isSEE_ANYTHING_IN(_OBJ))) {
            MOVE(_OBJ, X_OBJECT);
        }
        if((!(_isIT)
        &&  !(_isTWO))) {
            _isIT = _OBJ;
        } else {
            _isTWO = true;
            _isIT = null;
        }
        _OBJ = _NXT;
    }
    if((_OBJ = isFIRST(X_OBJECT))) {
        while(true) {
            ++_isANY
            TELL(C(SP));
            if(isEQUAL(_OBJ, GURDY)) {
                TELL("Within");
            } else if(isEQUAL(_OBJ, ARCH)) {
                TELL("Under");
            } else if(isIS(_OBJ, SURFACE)) {
                TELL("On");
            } else {
                TELL("Inside");
            }
            TELL(C(SP), THE(_OBJ), " you see ");
            CONTENTS(_OBJ);
            PRINTC(".");
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    if(isT(_B)) {
        MOVE(BFLY, GOBLET);
    }
    if(isT(_isANY)) {
        CRLF();
    }
    DESCING = null;
    MOVE_ALL(X_OBJECT, HERE);
    MOVE_ALL(DUMMY_OBJECT, HERE);
    return true;
}

function isSEE_ANYTHING_IN(_OBJ=PRSO) {
    if((_OBJ = isFIRST(_OBJ))) {
        while(true) {
            if(isIS(_OBJ, NODESC)) {
                
            } else if(!(isEQUAL(_OBJ, WINNER))) {
                return true;
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                return false;
            }
        }
    }
    return false;
}

function isSEE_INSIDE(_OBJ) {
    if(!(_OBJ)) {
        return false;
    } else /*if(isT(P_MOBY_FLAG)) {
        return true;
    }*/if(isEQUAL(_OBJ, WINNER, PLAYER)) {
        return true;
    } else if(isIS(_OBJ, VEHICLE)) {
        return true;
    } else if(isIS(_OBJ, SURFACE)) {
        return true;
    } else if(isIS(_OBJ, PERSON)) {
        return true;
    } else if(isIS(_OBJ, LIVING)) {
        return true;
    } else if(!(isIS(_OBJ, CONTAINER))) {
        return false;
    } else if(isIS(_OBJ, OPENED)) {
        return true;
    } else if(isIS(_OBJ, TRANSPARENT)) {
        return true;
    } else {
        return false;
    }
}

function isACCESSIBLE(_OBJ) {
    let _L;
    if(isEQUAL(_OBJ, null, NOT_HERE_OBJECT)) {
        return false;
    } else if(isEQUAL(_OBJ, PSEUDO_OBJECT)) {
        if(isEQUAL(LAST_PSEUDO_LOC, HERE)) {
            return true;
        }
        return false;
    }
    _L = META_LOC(_OBJ);
    if(isEQUAL(_L, GLOBAL_OBJECTS)) {
        return true;
    } else if((isEQUAL(_L, WINNER, HERE, LOC(WINNER))
  &&  isVISIBLE(_OBJ))) {
        return true;
    } else {
        return false;
    }
}

function META_LOC(_OBJ) {
    while(true) {
        if(!(_OBJ)) {
            return false;
        } else if(isIN(_OBJ, GLOBAL_OBJECTS)) {
            return GLOBAL_OBJECTS;
        } else if(isIN(_OBJ, ROOMS)) {
            return _OBJ;
        }
        _OBJ = LOC(_OBJ);
    }
}

function isVISIBLE(_OBJ) {
    let _L;
    if(isEQUAL(_OBJ, null, NOT_HERE_OBJECT)) {
        return false;
    } else if(isEQUAL(_OBJ, PSEUDO_OBJECT)) {
        if(isEQUAL(LAST_PSEUDO_LOC, HERE)) {
            return true;
        }
        return false;
    } else if(isEQUAL(_OBJ, LOC(WINNER))) {
        return true;
    }
    _L = LOC(_OBJ);
    if(isEQUAL(_L, null, GLOBAL_OBJECTS)) {
        return false;
    } else if(isEQUAL(_L, WINNER, LOC(WINNER), HERE)) {
        return true;
    } else if((isEQUAL(_L, LOCAL_GLOBALS)
  &&  isGLOBAL_IN(HERE, _OBJ))) {
        return true;
    } else if((isSEE_INSIDE(_L)
  &&  isVISIBLE(_L))) {
        return true;
    } else {
        return false;
    }
}

function DPRINT(_O) {
    let _X;
    _X = GETP(_O, "SDESC");
    if(isT(_X)) {
        return APPLY(_X, _O);
    } else if(isIS(_O, NOARTICLE)) {
        _X = GETP(_O, "NAME-TABLE");
        if(isT(_X)) {
            return PRINT_TABLE(_X);
        }
    }
    return PRINTD(_O);
}

function THE_PRINT(_O=PRSO) {
    let art = "";
    if(!(isIS(_O, NOARTICLE))) {
        art = LTHE;
    }
    return art + DPRINT(_O);
}

function CTHE_PRINT(_O=PRSO) {
    let art = "";
    if(!(isIS(_O, PROPER))) {
        art = XTHE;
    }
    return art + DPRINT(_O);
}

/*function CRCTHE_PRINT(_O=PRSO) {
    let _X;
    CRLF();
    if(!(isIS(_O, PROPER))) {
        TELL(XTHE);
    }
    DPRINT(_O);
    return true;
}*/

function THEI_PRINT() {
    let art = "";
    if(!(isIS(PRSI, NOARTICLE))) {
        art = LTHE;
    }
    
    return art + DPRINT(PRSI);
}

function CTHEI_PRINT() {
    let art = "";
    if(!(isIS(PRSI, PROPER))) {
        art = XTHE;
    }
    
    return art + DPRINT(PRSI);
}

function PRINTA(_O=PRSO) {
    let _X;
    let art = "";
    if(isIS(_O, NOARTICLE)) {
        
    } else if((isIS(_O, PROPER)
  ||  (isIS(_O, PLURAL)
  &&  isIS(_O, PERSON)))) {
        //TELL(LTHE);
        art = LTHE;
    } else if(isIS(_O, VOWEL)) {
        //PRINTI("an ");
        art = "an ";
    } else {
        //PRINTI("a ");
        art = "a ";
    }
    return art + DPRINT(_O);
}

function PRINTCA(_O=PRSO) {
    let art = "";
    if(isIS(_O, NOARTICLE)) {
        
    } else if((isIS(_O, PROPER)
  ||  (isIS(_O, PLURAL)
  &&  isIS(_O, PERSON)))) {
        //TELL(XTHE);
        art = XTHE;
    } else if(isIS(_O, VOWEL)) {
        //PRINTI("An ");
        art = "An ";
    } else {
        //TELL(XA);
        art = XA;
    }
    
    return art + DPRINT(_O);
}

function DESCRIBE_LANTERN(_OBJ) {
    let txt = "";
    if(isIS(_OBJ, MUNGED)) {
        txt = TELL(B("BROKEN"), C(SP));
    } else if(isIS(_OBJ, LIGHTED)) {
        txt = TELL(B("LIGHTED"), C(SP));
    } else if(!(isIS(_OBJ, MAPPED))) {
        txt = TELL(B("RUSTY"), C(SP));
    }
    return txt + PRINTD(_OBJ);
}

function DESCRIBE_SHILL(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    if(isIS(_OBJ, TOUCHED)) {
        return PRINTD(_OBJ);
    }
    
    return TELL("piece of ", B("DRIFTWOOD"));;
}

function DESCRIBE_SWORD(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    
    return PRINTD(_OBJ);;
}

function DESCRIBE_AXE(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    
    return PRINTD(_OBJ);;
}

function DESCRIBE_DAGGER(_OBJ) {
    let txt = "";
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        txt = TELL(STHE);
    }
    if(isIS(_OBJ, MUNGED)) {
        txt = TELL(B("RUSTY"), C(SP));
    }
    
    return txt + PRINTD(_OBJ);
}

function DESCRIBE_AMULET(_OBJ) {
    if(isIS(AMULET, IDENTIFIED)) {
        return "Amulet of " + _OBJ["NAME_TABLE"][1];
    }
    
    return PRINTD(_OBJ);
}

function DESCRIBE_PHASE(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    if(isHERE(APLANE)) {
        
        return PRINTD(_OBJ);
    }
    
    return TELL(SHAPE);
}

function DESCRIBE_JUNGLE_WAND(_CONTEXT) {
    return TELL(CA(DESCING), " lies in a clump of grass.");;
}

function DESCRIBE_MOOR_WAND(_CONTEXT) {
    
    return TELL("The end of ", A(DESCING), " sticks out of the mud.");
}

function DESCRIBE_FOREST_WAND(_CONTEXT) {
    
    return TELL("Somebody has left ", A(DESCING), " lying across the path.");
}

function DESCRIBE_CELLAR_WAND(_CONTEXT) {
    TELL(CA(DESCING), " lies in a shadowy corner.");
    return true;
}

function DESCRIBE_TOWER_WAND(_CONTEXT) {
    TELL(CA(DESCING));
    PRINT(" lies half-hidden in ");
    TELL("a corner.");
    return true;
}

function DESCRIBE_HALL_WAND(_CONTEXT) {
    TELL("The tip of ", A(DESCING));
    PRINT(" is visible in the ");
    TELL("rubble.");
    return true;
}

function DESCRIBE_TELE_WAND(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Sayonara" : "");
}

function DESCRIBE_SLEEP_WAND(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Anesthesia" : "");
}

function DESCRIBE_IO_WAND(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Eversion" : "");
}

function DESCRIBE_LEV_WAND(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Levitation" : "");
}

function DESCRIBE_BLAST_WAND(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Annihilation" : "");
}

function DESCRIBE_DISPEL_WAND(_OBJ) {
    return (isIS(_OBJ, IDENTIFIED) ? "Dispel " : "") + PRINTD(_OBJ);
}

function DESCRIBE_HELM(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        
        return TELL("Pheehelm");
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_HORSE(_OBJ) {
    return TELL((isIS(HORSE, LIVING) ? B("GRAY") : B("DEAD")), C(SP), HORSE);
}

function DESCRIBE_TRENCH(_OBJ) {
    if(isHERE(ARCH12)) {
        return TELL("minxhole");
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_KEYS(_OBJ) {
    let _WORD = GETPT(_OBJ, "ADJECTIVE")[0];
    if(!(isSEE_COLOR())) {
        _WORD = "GRAY";
    }
    return _WORD.toLowerCase() + " " + PRINTD(_OBJ);
}

function DESCRIBE_ARROW(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_CLOAK(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Stealth" : "");
}

function DESCRIBE_PARASOL(_OBJ) {
    let adj;
    if(isIS(_OBJ, MUNGED)) {
        adj = TELL(B("BROKEN"));
    } else if(isIS(_OBJ, OPENED)) {
        adj = TELL(B("OPEN"));
    } else {
        adj = TELL(B("CLOSED"));
    }
    return adj + " " + PRINTD(_OBJ);
}

function DESCRIBE_WHISTLE(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Summoning" : "");
}

function DESCRIBE_BFLY(_OBJ) {
    let art = "";
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        art = (STHE);
    }
    if(!(isIS(_OBJ, LIVING))) {
        art += ("dead ");
    }
    if(isIS(_OBJ, MUNGED)) {
        return art + PRINT("caterpillar");
    }
    
    return art + PRINTD(_OBJ);
}

function DESCRIBE_GOBLET(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        TELL("Chalice of ");
        PRINT_TABLE(GETP(_OBJ, "NAME-TABLE"));
        return true;
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_RING(_OBJ) {
    return PRINTD(_OBJ) + (isIS(_OBJ, IDENTIFIED) ? " of Shielding" : "");
}

function DESCRIBE_SPADE(_OBJ) {
    if(isIS(_OBJ, NAMED)) {
        if(!(isINV_PRINTING)) {
            return GETP(_OBJ, "NAME-TABLE")[1];
        }
        TELL(STHE);
    }
    
    return PRINTD(_OBJ);
}

function DESCRIBE_SCABBARD(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        return TELL("Sheath of Grueslayer");
    }
    
    return PRINTD(_OBJ);
}

function DESCRIBE_DIAMOND(_OBJ) {
    
    return TELL(B("SNOWFLAKE"));
}

function DESCRIBE_DO_PARTAY(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "scroll of Mischief" : PRINTD(_OBJ);
}

function DESCRIBE_BLESS_WEAPON(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "scroll of Honing" : PRINTD(_OBJ);
}

function DESCRIBE_BLESS_ARMOR(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "scroll of Protection" : PRINTD(_OBJ);
}

function DESCRIBE_DO_FILFRE(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "scroll of Fireworks" : PRINTD(_OBJ);
}

function DESCRIBE_DO_GOTO(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "scroll of Recall" : PRINTD(_OBJ);
}

function DESCRIBE_TOWER_SCROLL(_CONTEXT) {
    TELL(CA(DESCING));
    PRINT(" lies half-hidden in ");
    TELL("shadow.");
    return true;
}

function DESCRIBE_FOREST_SCROLL(_CONTEXT) {
    TELL(CA(DESCING));
    PRINT(" lies forgotten in ");
    TELL("the underbrush.");
    return true;
}

function DESCRIBE_PLAIN_SCROLL(_CONTEXT) {
    TELL(CA(DESCING), " is blowing against a clump of grass.");
    return true;
}

function DESCRIBE_MOOR_SCROLL(_CONTEXT) {
    TELL(CA(DESCING), " lies trodden in the mud.");
    return true;
}

function DESCRIBE_JUNGLE_SCROLL(_CONTEXT) {
    TELL("The undergrowth nearly conceals ", A(DESCING), C("."));
    return true;
}

function DESCRIBE_RENEWAL(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        return TELL("scroll of Renewal");
    }
    return PRINTD(_OBJ);
}

function RENEWAL_DESC(_CONTEXT) {
    TELL(CA(RENEWAL), " lies trampled in the dust.");
    return true;
}

function DESCRIBE_PALIMP(_OBJ) {
    return  isIS(_OBJ, IDENTIFIED) ? "scroll of Gating" : PRINTD(_OBJ);
}

function DESCRIBE_STONE(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        TELL("Scrystone of ");
        PRINT_TABLE(GETP(_OBJ, "NAME-TABLE"));
        return true;
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_WALL(_OBJ) {
    if(isIS(_OBJ, IDENTIFIED)) {
        if(isEQUAL(_OBJ, NWALL)) {
            TELL("Nor");
        } else {
            TELL("Sou");
        }
        TELL("th Wall of ");
        PRINT_TABLE(GETP(_OBJ, "NAME-TABLE"));
        return true;
    }
    return PRINTD(_OBJ);
}

function DESCRIBE_IQ_POTION(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "potion of Enlightenment" : PRINTD(_OBJ);
}

function DESCRIBE_HEALING_POTION(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "potion of Healing" : PRINTD(_OBJ);
}

function DESCRIBE_DEATH_POTION(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "potion of Death" : PRINTD(_OBJ);
}

function DESCRIBE_MIGHT_POTION(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "potion of Might" : PRINTD(_OBJ);
}

function DESCRIBE_FORGET_POTION(_OBJ) {
    return isIS(_OBJ, IDENTIFIED) ? "potion of Forgetfulness" : PRINTD(_OBJ);
}

function DESCRIBE_MOOR_POTION(_CONTEXT) {
    TELL("Some luckless fool has left ", A(DESCING), " in the mud.");
    return true;
}

function DESCRIBE_RUINS_POTION(_CONTEXT) {
    TELL("Someone else must have been here recently. There's "
, A(DESCING));
    PRINT(" lying in the dust.");
    return true;
}

function KERBLAM() {
    ITALICIZE("Kerblam");
    TELL("! ");
    return false;
}

function WHOOSH() {
    ITALICIZE("Whoosh");
    TELL("! ");
    return false;
}

"Don't call this when you're in Screen 1!"

function ITALICIZE(_STR) {
    let _PTR=2, _LEN, _CHAR;
    AUX_TABLE[0] = 0;
    DIROUT(D_TABLE_ON, AUX_TABLE);
    TELL(_STR);
    DIROUT(D_TABLE_OFF);
    _LEN = AUX_TABLE[0];
    ++_LEN;
    if(_LEN < 2) {
        return true;
    } else if(LOWCORE([ZVERSION, 1]) & 8) {
        /*"Italics?"*/
        HLIGHT(H_ITALIC);
        while(true) {
            _CHAR = AUX_TABLE[_PTR];
            if((!(isEQUAL(HOST, ATARI_ST))
  &&  (isEQUAL(_CHAR, SP, PER, 44)
  ||  isEQUAL(_CHAR, EXCLAM, 63, 59)
  ||  isEQUAL(_CHAR, 58)))) {
                HLIGHT(H_NORMAL);
                PRINTC(_CHAR);
                HLIGHT(H_ITALIC);
            } else {
                PRINTC(_CHAR);
            }
            if(isEQUAL(_PTR, _LEN)) {
                break;
            }
            ++_PTR
        }
        HLIGHT(H_NORMAL);
        return true;
    }
    while(true) {
        /*"Caps if no italics."*/
        _CHAR = AUX_TABLE[_PTR];
        if((_CHAR > 96
  &&  _CHAR < 123)) {
            _CHAR = (_CHAR - SP);
        }
        PRINTC(_CHAR);
        if(isEQUAL(_PTR, _LEN)) {
            break;
        }
        ++_PTR
    }
    return true;
}

function isNOUN_USED(_WORD1, _WORD2=null, _WORD3=null) {
    let _O, _I, _OOF, _IOF;
    if(!(_WORD1)) {
        return false;
    } else if((_O = isREVERSEVERB())) {
        _O = P_NAMW[1];
        _OOF = P_OFW[1];
        _I = P_NAMW[0];
        _IOF = P_OFW[0];
    } else {
        _O = P_NAMW[0];
        _OOF = P_OFW[0];
        _I = P_NAMW[1];
        _IOF = P_OFW[1];
    }
    if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD1, _O, _OOF))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD1, _I, _IOF)))) {
        return _WORD1;
    } else if(!(_WORD2)) {
        return false;
    } else if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD2, _O, _OOF))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD2, _I, _IOF)))) {
        return _WORD2;
    } else if(!(_WORD3)) {
        return false;
    } else if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD3, _O, _OOF))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD3, _I, _IOF)))) {
        return _WORD3;
    } else {
        return false;
    }
}

function isADJ_USED(_WORD1, _WORD2=null, _WORD3=null) {
    let _O, _I;
    if(!(_WORD1)) {
        return false;
    } else if((_O = isREVERSEVERB())) {
        _O = P_ADJW[1];
        _I = P_ADJW[0];
    } else {
        _O = P_ADJW[0];
        _I = P_ADJW[1];
    }
    if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD1, _O))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD1, _I)))) {
        return _WORD1;
    } else if(!(_WORD2)) {
        return false;
    } else if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD2, _O))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD2, _I)))) {
        return _WORD2;
    } else if(!(_WORD3)) {
        return false;
    } else if(((isTHIS_PRSO()
  &&  isEQUAL(_WORD3, _O))
  ||  (isT(PRSI)
  &&  isTHIS_PRSI()
  &&  isEQUAL(_WORD3, _I)))) {
        return _WORD3;
    } else {
        return false;
    }
}

function isREPLACE_ADJ(_OBJ, _OLD, _NEW) {
    let _TBL, _LEN;
    _TBL = GETPT(_OBJ, "ADJECTIVE");
    if(!(_TBL)) {
        return false;
    }
    const i = _TBL.indexOf(_OLD);
    if (i >= 0) _TBL[i] = _NEW
    /*_LEN = (_TBL.length / 2);
    while(true) {
        if(--_LEN < 0) {
            return false;
        } else if(isEQUAL(_TBL[_LEN], _OLD)) {
            _TBL[_LEN] = _NEW;
            return true;
        }
    }*/
}

function isREPLACE_SYN(_OBJ, _OLD, _NEW) {
    let _TBL, _LEN;
    _TBL = GETPT(_OBJ, "SYNONYM");
    if(!(_TBL)) {
        return false;
    }
    const i = _TBL.indexOf(_OLD);
    if (i >= 0) _TBL[i] = _NEW
    /*let _TBL, _LEN;
    _TBL = GETPT(_OBJ, "SYNONYM");
    if(!(_TBL)) {
        return false;
    }
    _LEN = (_TBL.length / 2);
    while(true) {
        if(--_LEN < 0) {
            return false;
        } else if(isEQUAL(_TBL[_LEN], _OLD)) {
            _TBL[_LEN] = _NEW;
            return true;
        }
    }*/
}

function isREPLACE_GLOBAL(_OBJ, _OLD, _NEW) {
    let _TBL, _LEN;
    _TBL = GETPT(_OBJ, "GLOBAL");
    if(!(_TBL)) {
        return false;
    }
    const i = _TBL.indexOf(_OLD);
    if (i >= 0) _TBL[i] = _NEW;
    _OBJ.GLOBAL = _TBL;
    /*let _TBL, _LEN;
    _TBL = GETPT(_OBJ, "GLOBAL");
    if(!(_TBL)) {
        return false;
    }
    _LEN = (_TBL.length / 2);
    while(true) {
        if(--_LEN < 0) {
            return false;
        } else if(isEQUAL(_TBL[_LEN], _OLD)) {
            _TBL[_LEN] = _NEW;
            return true;
        }
    }*/
}

var BARY/*NUMBER*/ = 0;"Y-pos of status bar display."
var BARX/*NUMBER*/ = 0;"X-pos of status bar display."

function DISPLAY_STATS() {
    BMODE = null;
    DHEIGHT = MAX_DHEIGHT;
    DBOX_TOP = 0;
    DBOX_LINES = 0;
    IN_DBOX = SHOWING_STATS;
    DBOX[0] = SP;
    COPYT(DBOX, REST(DBOX, 1), (0 - (DBOX_LENGTH - 1)));
    DISPLAY_DBOX();
    STATBARS((13 - MAX_DHEIGHT));
    return false;
}

function STATBARS(_Y, _X, _N) {
    let _STAT=0;
    if(!(_X)) {
        _X = (Math.floor((DWIDTH - BARWIDTH) / 2) + 1);
    }
    if(!(isASSIGNED(_N))) {
        _N = ARMOR_CLASS;
    }
    BARY = _Y;
    BARX = _X;
    TO_TOP_WINDOW();
    COLOR(FORE, BGND);
    DO_CURSET(BARY, BARX);
    PRINTT(BAR_LABELS, LABEL_WIDTH, (_N + 1));
    while(true) {
        APPLY(STAT_ROUTINE, _STAT, STATS[_STAT]);
        if(++_STAT > _N) {
            break;
        }
    }
    TO_BOTTOM_WINDOW();
    return false;
}

function SHOW_STAT(_STAT) {
    TO_TOP_WINDOW();
    APPLY(STAT_ROUTINE, _STAT, STATS[_STAT]);
    TO_BOTTOM_WINDOW();
    return false;
}

function BAR_NUMBER(_STAT, _VAL) {
    let _Y;
    HLIGHT(H_NORMAL);
    _Y = (_STAT + BARY);
    CURSET(_Y, (BARX + (LABEL_WIDTH + 1)));
    if(_VAL < 10) {
        TELL("  ");
    } else if(_VAL < 100) {
        TELL(C(SP));
    }
    TELL(N(_VAL));
    return false;
}

function RAWBAR(_STAT, _VAL) {
    let _PTR, _X, _Y, _Z;
    SLINE[0] = BASE_CHAR;    /*"Clear bar."*/
    _X = (0 - SWIDTH);
    COPYT(SLINE, REST(SLINE, 1), _X);

    _X = (BASE_CHAR + BAR_RES);    /*"Solid char."*/
    _Y = (_VAL / BAR_RES);    /*"# solids to print."*/
    _Z = (SWIDTH - 1);    /*"Maximum."*/
    _PTR = 1;
    while(true) {
        if(_PTR > _Y) {
            break;
        }
        SLINE[_PTR] = _X;
        if(++_PTR > _Z) {
            break;
        }
    }
    SLINE[_PTR] = (BASE_CHAR + MOD(_VAL, BAR_RES));

    SLINE[0] = LCAP;    /*"Install caps at both ends."*/
    SLINE[(SWIDTH + 1)] = RCAP;

    _Y = (_STAT + BARY);
    _X = (BARX + LABEL_WIDTH);

    DO_CURSET(_Y, _X);
    _Z = FONT(F_NEWFONT);
    COLOR(GCOLOR, BGND);
    _Z = (SWIDTH + 2);
    PRINTT(SLINE, _Z);

    DO_CURSET(_Y, (_Z + _X));
    _Z = FONT(F_DEFAULT);
    COLOR(FORE, BGND);
    if(_VAL < 10) {
        PRINTC(SP);
    }
    TELL(N(_VAL), "%");
    return false;
}

function APPLE_STATS() {
    let _CNT=0, _X;
    SETUP_SLINE();
    while(true) {
        TELL(STSTR[_CNT], ":");
        _X = STATS[_CNT];
        if(_X < 10) {
            TELL("0");
        }
        TELL(N(_X));
        if(++_CNT > 6) {
            break;
        }
        PRINTC(SP);
        if(DWIDTH > 46) {
            PRINTC(SP);
        }
    }
    CENTER_SLINE();
    SHOW_SLINE(2);
    return true;
}

function UPDATE_STAT(_DELTA, _STAT=ENDURANCE, _UPDATE_MAX=null) {
    let _NEWRANK=0, _NSTAT, _OSTAT, _MAX, _OMAX, _NLVL, _OLVL, _X;
    if(!(_DELTA)) {
        return false;
    }
    _OSTAT = STATS[_STAT];
    _NSTAT = (_OSTAT + _DELTA);
    if(_NSTAT < 0) {
        _NSTAT = 0;
    } else if(isEQUAL(_STAT, EXPERIENCE)) {
        
    } else if(_NSTAT > STATMAX) {
        _NSTAT = STATMAX;
    }
    if(isEQUAL(_OSTAT, _NSTAT)) {
        return false;
    }
    STATS[_STAT] = _NSTAT;

    _OMAX = MAXSTATS[_STAT];
    if(!(_UPDATE_MAX)) {
        
    } else if(isEQUAL(_STAT, EXPERIENCE)) {
        
    } else if(!(isEQUAL(_NSTAT, _OMAX))) {
        _MAX = (_DELTA + _OMAX);
        if(_MAX < 0) {
            _MAX = 0;
        } else if(_MAX > STATMAX) {
            _MAX = STATMAX;
        }
        MAXSTATS[_STAT] = _MAX;
    }

    if(!(isEQUAL(_NSTAT, _OMAX))) {
        NO_REFRESH = _STAT;
    }

    if(isEQUAL(_STAT, EXPERIENCE)) {
        _NLVL = isGET_LEVEL(_NSTAT);
        _OLVL = isGET_LEVEL(_OSTAT);
        if((_NLVL > _OLVL
  ||  (!(_NLVL)
  &&  isEQUAL(_OLVL, MAX_LEVEL)))) {
            UPGRADE_RANK();
            ++_NEWRANK
        }
    }

    if(isT(SAY_STAT)) {
        if(!(isEQUAL(HOST, MACINTOSH))) {
            HLIGHT(H_BOLD);
        }
        TELL(TAB, "[Your ", STAT_NAMES[_STAT]);
        _X = S_BEEP;
        if(isEQUAL(_NSTAT, _OMAX)) {
            TELL(" is back to normal");
        } else {
            TELL(" just went ");
            if(_DELTA < 0) {
                _X = S_BOOP;
                TELL(B("DOWN"));
            } else {
                TELL(B("UP"));
            }
        }

        if(isT(_NEWRANK)) {
            TELL(". You have achieved the rank of ");
            ANNOUNCE_RANK();
        }

        TELL(".]", CR);
        HLIGHT(H_NORMAL);
        SOUND(_X);
    }

    if(!(DMODE)) {
        UPPER_SLINE();
    } else if(!(VT220)) {
        APPLE_STATS();
    } else if(isEQUAL(IN_DBOX, SHOWING_STATS)) {
        if(isT(_NEWRANK)) {
            SHOW_RANK();
            TO_TOP_WINDOW();
            _STAT = ENDURANCE;
            while(true) {
                APPLY(STAT_ROUTINE, _STAT, STATS[_STAT]);
                if(++_STAT > ARMOR_CLASS) {
                    break;
                }
            }
            TO_BOTTOM_WINDOW();
            return true;
        } else if(isEQUAL(_STAT, EXPERIENCE)) {
            return true;
        }
        SHOW_STAT(_STAT);
    } else if(!(BMODE)) {
        
    } else if((isT(_NEWRANK)
  ||  isEQUAL(_STAT, ENDURANCE))) {
        SHOW_STAT(ENDURANCE);
    }

    if((!(_NSTAT)
  &&  isEQUAL(_STAT, ENDURANCE, STRENGTH))) {
        TELL(TAB, "Your last ounce of ", STAT_NAMES[_STAT]
, " gives out");
        JIGS_UP();
    }
    return true;
}

function isGET_LEVEL(_VAL) {
    let _LVL=0;
    while(true) {
        if(_VAL < THRESHOLDS[_LVL]) {
            return _LVL;
        } else if(++_LVL > MAX_LEVEL) {
            return false;
        }
    }
}

function UPGRADE_RANK() {
    let _TBL, _O, _N;
    _TBL = STATS;
    while(true) {
        _O = _TBL[ENDURANCE];
        _N = ((STATMAX - _O) / 10);
        if(_N < 1) {
            _N = 1;
        }
        _N = (_O + _N);
        if(_N > STATMAX) {
            _N = STATMAX;
        } else if(_N < 1) {
            _N = 1;
        }
        _TBL[ENDURANCE] = _N;
        if(isEQUAL(_TBL, MAXSTATS)) {
            return false;
        }
        _TBL = MAXSTATS;
    }
}

function PRINT_TABLE(_TBL) {
    let _PTR=1, _LEN;
    _LEN = _TBL[0];
    if(!(_LEN)) {
        return false;
    }
    while(true) {
        PRINTC(_TBL[_PTR]);
        if(++_PTR > _LEN) {
            return false;
        }
    }
}

function WATER_VANISH() {
    VANISH();
    TELL(CTHEO);
    PRINT(" disappears into the ");
    TELL("water.", CR);
    return true;
}

function VANISH(_OBJ=PRSO) {
    WINDOW(SHOWING_ALL);
    REMOVE(_OBJ);
    P_IT_OBJECT = NOT_HERE_OBJECT;
    return false;
}

function isLIGHT_SOURCE() {
    let _OBJ, _LEN;
    if(isIS(HERE, INDOORS)) {
        
    } else if(!(isPLAIN_ROOM())) {
        return SUN;
    }
    _LEN = LIGHT_SOURCES[0];
    while(true) {
        _OBJ = toOBJECT(LIGHT_SOURCES[_LEN]);
        if((isIS(_OBJ, LIGHTED)
  &&  isVISIBLE(_OBJ))) {
            return _OBJ;
        }
        if(--_LEN < 1) {
            break;
        }
    }
    _OBJ = isFIND_IN(WINNER, LIGHTED);
    if(!(_OBJ)) {
        _OBJ = isFIND_IN(LOC(WINNER), LIGHTED);
    }
    return _OBJ;
}

var STORAGE/*NUMBER*/ = 0;

function isNEW_EXIT(_OBJ, _DIR, _TYPE, _ROOM, _DATA) {
    let _PTR, _X, _TBL, _BYTES;
    _TBL = GETP(_OBJ, _DIR);
    if(_TBL[0] === NO_EXIT) {
        _BYTES = 4;
        if(isASSIGNED(_DATA)) {
            _BYTES = 6;
        }
        _PTR = STORAGE;
        _X = (STORAGE + _BYTES);
        if(_X > STORAGE_SPACE) {
            SAY_ERROR("NEW-EXIT?");
            return false;
        }
        STORAGE = _X;
        _TBL = [0, 0, 0];//REST(FREE_STORAGE, _PTR);
        PUTP(_OBJ, _DIR, _TBL);
    }
    _TBL[XTYPE] = _TYPE;
    if(isASSIGNED(_ROOM)) {
        _TBL[XROOM] = _ROOM;
    }
    if(isASSIGNED(_DATA)) {
        _TBL[XDATA] = _DATA;
    }
    return true;
}

function isJUMPING_OFF() {
    if(isVERB(V_LEAP)) {
        return true;
    } else if((isVERB(V_DIVE)
  &&  isEQUAL(P_PRSA_WORD, "DIVE"))) {
        return true;
    } else if((isVERB(V_CLIMB_DOWN)
  &&  (isEQUAL(P_PRSA_WORD, "JUMP", "LEAP", "HURDLE")
  ||  isEQUAL(P_PRSA_WORD, "VAULT", "BOUND")))) {
        return true;
    }
    return false;
}

function isDONT_HAVE_WAND(_OBJ, _W) {
    if(!(isIN(_W, PLAYER))) {
        MUST_HOLD(_W);
        TELL(" to direct its power.", CR);
        return true;
    } else if(isEQUAL(_OBJ, _W)) {
        TELL(CANT, B(P_PRSA_WORD), C(SP), THE(_W), " at itself.", CR);
        return true;
    } else if(isNO_MAGIC_HERE(_W)) {
        return true;
    } else {
        return false;
    }
}

function MUST_HOLD(_OBJ) {
    TELL("You must be holding ", THE(_OBJ));
    return true;
}

function isCANT_REACH_WHILE_IN(_OBJ1, _OBJ2) {
    let _X;
    if(isEQUAL(_OBJ1, null, _OBJ2)) {
        return false;
    } else if(isGLOBAL_IN(HERE, _OBJ1)) {
        return false;
    } else if((isIN(_OBJ1, HERE)
  &&  ((_X = isTOUCHING())
  ||  (isVERB(V_THRUST)
  &&  isEQUAL(_OBJ1, PRSO, LAST_MONSTER))))) {
        CANT_REACH(_OBJ1);
        TELL(" while you're ");
        if(isEQUAL(_OBJ2, ARCH)) {
            TELL(B("UNDER"));
        } else if(isEQUAL(_OBJ2, DACT)) {
            TELL(B("ON"));
        } else if(isEQUAL(_OBJ2, BUSH)) {
            TELL(B("BEHIND"));
        } else {
            TELL(B("IN"));
        }
        TELL(C(SP), THE(_OBJ2), PERIOD);
        return true;
    } else {
        return false;
    }
}

function CANT_REACH(_OBJ) {
    TELL(CANT, "quite reach ", THE(_OBJ));
    return false;
}

function isNO_MAGIC_HERE(_OBJ) {
    if(isIN(PLAYER, ARCH)) {
        
    } else if(!(isEQUAL(ATIME, PRESENT))) {
        
    } else if(isHERE(IN_CABIN, IN_FROON, IN_GARDEN)) {
        
    } else if(isGRUE_ROOM()) {
        
    } else if((!(isEQUAL(_OBJ, GURDY))
  &&  isPLAIN_ROOM())) {
        
    } else if((isHERE(IN_SKY)
  &&  isEQUAL(ABOVE, OCAVES))) {
        
    } else if(isEQUAL(_OBJ, PALIMP)) {
        return false;
    } else if(!(isHERE(APLANE, IN_SPLENDOR))) {
        return false;
    }
    SPUTTERS(_OBJ);
    INFLUENCE();
    return true;
}

function SPUTTERS(_OBJ) {
    TELL(CTHE(_OBJ), " sputters ineffectually. ");
    return true;
}

function INFLUENCE() {
    TELL("A nearby influence must be blocking its Magick.", CR);
    return true;
}

function isSEE_COLOR() {
    if(!(isPLAIN_ROOM())) {
        return true;
    } else if(isIS(HERE, SEEN)) {
        return true;
    } else {
        return false;
    }
}

const isGRUE_ROOM = () => GRUE_ROOMS.map(toROOM).includes(HERE);

function isPLAIN_ROOM(_RM=HERE) {
    let _X;
    if(isEQUAL(_RM, IN_FARM, ROSE_ROOM)) {
        return true;
    }
    _X = PLAIN_ROOMS[0];
    //if((_X = isINTBL(_RM, REST(PLAIN_ROOMS, 1), _X, 1))) {
    if(PLAIN_ROOMS.includes(_RM)) {
        return true;
    } else {
        return false;
    }
}

function GROUND_WORD() {
    if(isIS(HERE, INDOORS)) {
        TELL(B("FLOOR"));
        return false;
    }
    TELL(B("GROUND"));
    return false;
}

"*** THE MONSTER MACHINE ***"

function VIEW_MONSTER(_CONTEXT) {
    let _X;
    if(isIS(DESCING, SLEEPING)) {
        TELL(CTHE(DESCING), " lies stunned upon the ");
        GROUND_WORD();
        TELL(C("."));
        return true;
    } else if(isIS(DESCING, SURPRISED)) {
        _X = GETP(DESCING, "EXIT-STR");
        if((isIS(DESCING, SEEN)
  ||  !(_X))) {
            TELL(CTHE(DESCING), " is waiting for you.");
            return true;
        }
        MAKE(DESCING, SEEN);
        TELL(CA(DESCING), SIS, _X, C("."));
        return true;
    }
    _X = RANDOM(100);
    if(_X < 33) {
        TELL(CA(DESCING), " is attacking you");
    } else if(_X < 67) {
        TELL("You're being attacked by ", A(DESCING));
    } else {
        TELL("You're under attack by ", A(DESCING));
    }
    TELL("!");
    return true;
}

function DARK_MOVES() {
    TELL(PICK_NEXT(DARK_MOVINGS), " in the darkness");
    if(PROB(50)) {
        TELL(" nearby");
    }
    TELL(PERIOD);
    return true;
}

function OUCH(_OBJ, _DAMAGE) {
    if(isT(STATIC)) {
        
    } else if(PROB(25)) {
        TELL(". ", PICK_NEXT(OUCHES));
    }
    TELL("!", CR);
    UPDATE_STAT(isMSPARK(_OBJ, _DAMAGE));
    return true;
}

var LAST_MONSTER/*OBJECT*/ = null;"Last monster that bothered you."
var LAST_MONSTER_DIR = 0;"Direction he came from."

VOC("STUNNED", ADJ);

function isSTILL_SLEEPING(_OBJ) {
    if(isIS(_OBJ, SLEEPING)) {
        LAST_MONSTER_DIR = -1;
        ATTACK_MODE = NORMAL_ATTACK;
        TELL(TAB);
        if(isIS(_OBJ, NEUTRALIZED)) {
            UNMAKE(_OBJ, NEUTRALIZED);
            TELL(CTHE(_OBJ
), " blinks its eyes, yawns and staggers with groggy impotence");
        } else {
            WINDOW(SHOWING_ROOM);
            UNMAKE(_OBJ, SLEEPING);
            isREPLACE_ADJ(_OBJ, "STUNNED", "AWAKE");
            TELL(CTHE(_OBJ), " shakes itself out of its stupor");
        }
        TELL(PERIOD);
        isTOPPLED(_OBJ);
        return true;
    }
    isNEXT_ENDURANCE(_OBJ);
    return false;
}

function isNEXT_ENDURANCE(_OBJ) {
    let _X, _MAX, _CHANGE;
    _X = GETP(_OBJ, "ENDURANCE");
    if(isIS(_OBJ, STRICKEN)) {
        UNMAKE(_OBJ, STRICKEN);
        return _X;
    }
    _MAX = GETP(_OBJ, "EMAX");
    if(_MAX > _X) {
        _CHANGE = PERCENT(2, _MAX);
        if(_CHANGE < 1) {
            _CHANGE = 1;
        }
        _X = (_X + _CHANGE);
        if(_X > _MAX) {
            _X = _MAX;
        }
        PUTP(_OBJ, "ENDURANCE", _X);
    }
    return _X;
}

function WHIRLS(_OBJ) {
    TELL(CTHE(_OBJ), " whirls to face you!", CR);
    isTOPPLED(SNIPE);
    return true;
}

function isTOPPLED(_OBJ) {
    if(isIS(DACT, MUNGED)) {
        return false;
    } else if((isIN(PLAYER, SADDLE)
  &&  isIN(SADDLE, DACT))) {
        P_WALK_DIR = null;
        OLD_HERE = null;
        MOVE(PLAYER, LOC(DACT));
        EXIT_DACT(_OBJ, "play horsey", "sprawling across the dust");
        return true;
    } else if(isVISIBLE(DACT)) {
        EXIT_DACT(_OBJ, "stick around", "abandoned and alone");
        return true;
    } else {
        return false;
    }
}

function EXIT_DACT(_OBJ, _STR1, _STR2) {
    UNMAKE(DACT, NODESC);
    WINDOW(SHOWING_ROOM);
    REMOVE(DACT);
    TELL(TAB, CTHE(DACT));
    if(isIS(DACT, SLEEPING)) {
        UNMAKE(DACT, SLEEPING);
        TELL(" shakes himself awake,");
    }
    TELL(" takes one good look at ", THE(_OBJ
), " and decides that he doesn't want to ", _STR1
, " anymore. Before you can think or move, you find yourself ", _STR2
, ", with a cowardly shadow soaring out of sight overhead.", CR);
    return true;
}

function SEE_MONSTER(_OBJ) {
    LAST_MONSTER = _OBJ;
    UNMAKE(_OBJ, SURPRISED);
    return false;
}

function isMONSTER_STRIKES(_OBJ) {
    let _DAMAGE=0, _STR, _CHANCE, _X;
    SEE_MONSTER(_OBJ);
    _STR = GETP(_OBJ, "STRENGTH");
    if(_STR < 1) {
        return false;
    }
    MAKE(_OBJ, STRICKEN);
    _CHANCE = (MIN_HIT_PROB / 4);
    if(!(isEQUAL(ATTACK_MODE, PARRYING))) {
        _CHANCE = GETP(_OBJ, "DEXTERITY");
        if(isEQUAL(ATTACK_MODE, NORMAL_ATTACK)) {
            _CHANCE = (_CHANCE / 2);
        }
        _CHANCE = PERCENT(_CHANCE, (MAX_HIT_PROB - MIN_HIT_PROB));
        _CHANCE = (_CHANCE + MIN_HIT_PROB);
        if(_CHANCE > MAX_HIT_PROB) {
            _CHANCE = MAX_HIT_PROB;
        }
    }
    ATTACK_MODE = NORMAL_ATTACK;
    if(PROB(_CHANCE)) {
        _DAMAGE = (STATMAX - STATS[ARMOR_CLASS]);
        _DAMAGE = (((_DAMAGE * _STR) + 99) / 100);
        if(_DAMAGE < 2) {
            _DAMAGE = 1;
        } else {
            _DAMAGE = RANDOM(_DAMAGE);
        }
        if(isT(AUTO)) {
            BMODE_ON();
        }
        return (0 - _DAMAGE);
    } else {
        return false;
    }
}

"Returns ,W? of monster appearance, else false."

function isMOVE_MONSTER(_OBJ, _UD=0) {
    let _L, _RLIST, _RLEN, _CNT, _DIR, _TBL, _DEST, _X, _BRIGHT, _FEAR;
    if(isIS(_OBJ, SLEEPING)) {
        UNMAKE(_OBJ, SLEEPING);
        UNMAKE(_OBJ, STRICKEN);
        UNMAKE(_OBJ, NEUTRALIZED);
        return false;
    }
    MAKE(_OBJ, SURPRISED);
    isNEXT_ENDURANCE(_OBJ);
    _L = LOC(_OBJ);
    _FEAR = LOC(SCARE3);
    _RLIST = GETP(_OBJ, "HABITAT");
    /*if(!(_RLIST)) {
        SAY_ERROR("MOVE-MONSTER? <1>");
        return false;
    }*/
    _RLEN = _RLIST[0];
    _RLIST = REST(_RLIST, 1);
    _CNT = 1;
    _DIR = asPROP("NORTH");
    while(true) {
        _TBL = GETP(_L, PROP(_DIR));
        if(!(_TBL)) {
            
        } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT, SCONNECT, X_EXIT)) {
            _DEST = _TBL[XROOM];
            //if(((_X = isINTBL(_DEST, _RLIST, _RLEN, 1))
            if(((_X = _RLIST.map(toROOM).includes(_DEST))
  &&  (!(isEQUAL(_OBJ, GRUE))
  ||  !(isIS_LIT(_DEST))))) {
                if(isT(LAST_MONSTER)) {
                    
                } else if(isWEARING_MAGIC(CLOAK)) {
                    
                } else if((isEQUAL(_DEST, HERE)
  &&  !(isEQUAL(_DEST, _FEAR)))) {
                    _CNT = 2;
                    GOOD_DIRS[2] = _DIR;
                    break;
                }
                if(!(isEQUAL(_DEST, _FEAR))) {
                    ++_CNT
                    GOOD_DIRS[_CNT] = _DIR;
                }
            }
        }
        if(--_DIR < asPROP("NW")) {
            break;
        }
    }

    if(isT(_UD)) {
        _DIR = asPROP("UP");
        while(true) {
            _TBL = GETP(_L, PROP(_DIR));
            if(!(_TBL)) {
                
            } else if(isEQUAL(MSB(_TBL[XTYPE]), CONNECT, SCONNECT)) {
                _DEST = _TBL[XROOM];
                //if(((_X = isINTBL(_DEST, _RLIST, _RLEN, 1)){
                if((_X = _RLIST.map(toROOM).includes(_DEST))){
                    if(isT(LAST_MONSTER)) {
                        
                    } else if(isWEARING_MAGIC(CLOAK)) {
                        
                    } else if(isEQUAL(_DEST, HERE)) {
                        _CNT = 2;
                        GOOD_DIRS[2] = _DIR;
                        break;
                    }
                    ++_CNT
                    GOOD_DIRS[_CNT] = _DIR;
                }
            }
            if(isEQUAL(_DIR, asPROP("DOWN"))) {
                break;
            }
            _DIR = asPROP("DOWN");
        }
    }

    _DIR = PROP(_DIR);

    if(isEQUAL(_CNT, 1)) {
        /*"Can't move!"*/
        return false;
    } else if(isEQUAL(_CNT, 2)) {
        /*"Only one way out."*/
        _DIR = GOOD_DIRS[2];
        _DEST = GETP(_L, PROP(_DIR))[XROOM];
    } else {
        _X = GETP(_OBJ, "LAST-LOC");
        GOOD_DIRS[0] = _CNT;
        GOOD_DIRS[1] = 0;
        while(true) {
            _DIR = PICK_ONE(GOOD_DIRS);
            _DEST = GETP(_L, PROP(_DIR))[XROOM];
            if(isEQUAL(_DEST, _X)) {
                continue;
            }break;
        }
    }

    /*if(!(isIN(_DEST, ROOMS))) {
        SAY_ERROR("MOVE-MONSTER? <2>");
        return false;
    }*/

    if(!(LAST_MONSTER)) {
        
    } else if(isEQUAL(_DEST, HERE)) {
        return false;
    }
    MOVE(_OBJ, _DEST);
    PUTP(_OBJ, "LAST-LOC", _DEST);
    if(!(isEQUAL(_DEST, HERE))) {
        return false;
    } else if(isT(isLIT)) {
        WINDOW(SHOWING_ROOM);
    }
    if(!(isEQUAL(PROP(_DIR), "UP", "DOWN"))) {
        _DIR = (_DIR + 4);
        if(_DIR > asPROP("NORTH")) {
            _DIR = (_DIR - 8);
        }
        LAST_MONSTER_DIR = _DIR;
    }
    THIS_IS_IT(_OBJ);
    LAST_MONSTER = _OBJ;
    UNMAKE(_OBJ, SURPRISED);
    if(isEQUAL(PROP(_DIR), "UP")) {
        LAST_MONSTER_DIR = "DOWN";
        return "UP";
    } else if(isEQUAL(PROP(_DIR), "DOWN")) {
        LAST_MONSTER_DIR = "UP";
        return "DOWN";
    }
    return DIR_NAMES[(0 - (_DIR - asPROP("NORTH")))];
}

"Activates monster NXT."

function NEXT_MONSTER(_OBJ) {
    let _RLIST, _LEN, _CNT, _X, _RM;
    if(!(_OBJ)) {
        return false;
    }
    _RLIST = GETP(_OBJ, "HABITAT");
    /*if(!(_RLIST)) {
        SAY_ERROR("NEXT-MONSTER");
        return false;
    }*/
    _LEN = _RLIST[0];
    _X = _LEN;
    _CNT = 1;
    while(true) {
        _RM = toROOM(_RLIST[_X]);
        if(isEQUAL(_RM, HERE)) {
            
        } else if((isEQUAL(_OBJ, GRUE)
  &&  isIS(_RM, LIGHTED))) {
            
        } else if(!(isIS(_RM, TOUCHED))) {
            ++_CNT
            AUX_TABLE[_CNT] = _RM;
        }
        if(--_X < 1) {
            break;
        }
    }
    if(isEQUAL(_CNT, 1)) {
        while(true) {
            _RM = toROOM(_RLIST[RANDOM(_LEN)]);
            if(isEQUAL(_RM, HERE)) {
                continue;
            } else if((isEQUAL(_OBJ, GRUE)
  &&  isIS(_RM, LIGHTED))) {
                continue;
            }break;
        }
    } else if(isEQUAL(_CNT, 2)) {
        _RM = AUX_TABLE[2];
    } else {
        AUX_TABLE[0] = _CNT;
        AUX_TABLE[1] = 0;
        _RM = PICK_ONE(AUX_TABLE);
    }
    MOVE(_OBJ, _RM);
    MAKE(_OBJ, SURPRISED);
    PUTP(_OBJ, "LAST-LOC", _RM);
    QUEUE(GETP(_OBJ, "LIFE"));
    return false;
}

function V_SHIT() {
    PERFORM("HIT", PRSI, PRSO);
    return true;
}

function PRE_HIT() {
    let _OBJ, _X;
    if(isDARKFIGHT()) {
        return true;
    } else if(isT(PRSI)) {
        return false;
    }
    PRSI = HANDS;
    if((_OBJ = isFIRST(WINNER))) {
        while(true) {
            if(isIS(_OBJ, WIELDED)) {
                PRSI = _OBJ;
                break;
            } else if(isIS(_OBJ, WEAPON)) {
                PRSI = _OBJ;
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    if(!(isPRSI(HANDS))) {
        TELL("[with ", THEI, BRACKET);
    }
    return false;
}

var ATTACK_MODE/*NUMBER*/ = 0;

function V_PUNCH() {
    PERFORM("HIT", PRSO, HANDS);
    return true;
}

function V_HIT() {
    let _MODE=NORMAL_ATTACK;
    if(isEQUAL(P_PRSA_WORD, "THRUST")) {
        _MODE = THRUSTING;
    }
    HIT_MONSTER(_MODE);
    return true;
}

function V_THRUST() {
    if(isPRACTICE("THRUST")) {
        return true;
    }
    HIT_MONSTER(THRUSTING);
    return true;
}

function isDARKFIGHT() {
    if(!(isLIT)) {
        if((isPRSO(GRUE, URGRUE)
  &&  isWEARING_MAGIC(HELM))) {
            return false;
        }
        TOO_DARK();
        return true;
    } else {
        return false;
    }
}

function isPRACTICE(_WRD) {
    if(!(PRSO)) {
        if(!(LAST_MONSTER)) {
            TELL("You practice ", B(_WRD), "ing ");
            if(!(isLIT)) {
                TELL("in the dark ");
            }
            TELL("for a few moments.", CR);
            return true;
        }
        PRSO = LAST_MONSTER;
    }
    return isDARKFIGHT();
}

function V_PARRY() {
    if(isPRACTICE("PARRY")) {
        return true;
    }
    if((!(isIS(PRSO, LIVING))
  ||  !(isIS(PRSO, MONSTER))
  ||  isIS(PRSO, SLEEPING))) {
        TELL(CTHEO, " isn't attacking you", AT_MOMENT);
        return true;
    }
    ATTACK_MODE = PARRYING;
    LAST_MONSTER_DIR = null;
    if((isIN(PLAYER, MAW)
  &&  !(isIN(PRSO, MAW)))) {
        TELL(CTHEO, " can't seem to reach you.", CR);
        return true;
    }
    TELL("You leap away from ", THEO, "'s attack.", CR);
    return true;
}

"Returns <> if battle should end, T otherwise."

var ATTACK_MODE/*NUMBER*/ = NORMAL_ATTACK;

function HARMLESS(_OBJ=PRSO) {
    TELL(CTHE(_OBJ), " obviously means you no harm; ");
    if(STATS[COMPASSION] < 15) {
        TELL("even your meager compassion is enough to stay ");
    } else {
        TELL("compassion stays ");
    }
    TELL(HANDS, PERIOD);
    return true;
}

function HIT_MONSTER(_MODE=NORMAL_ATTACK) {
    let _STR, _DAM, _L, _MEND, _PCENT, _MIN, _X;
    if(isDARKFIGHT()) {
        return true;
    } else if(!(isIS(PRSO, LIVING))) {
        TELL("Attacking ", THEO);
        if(!(isEQUAL(PRSI, null, HANDS))) {
            TELL(WITH, A(PRSI));
        }
        WONT_HELP();
        return true;
    } else if(!(isIS(PRSO, MONSTER))) {
        HARMLESS();
        return true;
    }

    ATTACK_MODE = _MODE;
    if((!(PRSI)
  &&  PRE_HIT())) {
        return true;
    }
    _L = LOC(PLAYER);
    if(!(isIN(PRSO, _L))) {
        TELL(CANT, "quite reach ", THEO, AT_MOMENT);
        return true;
    } else if(isPRSO(CORBIES)) {
        CORBIES_STAY_AWAY();
        return true;
    } else if(isPRSO(URGRUE)) {
        HOPELESS();
        return true;
    } else if(isPRSO(DUST)) {
        HIT_BUNNIES();
        return true;
    } else if(isPRSO(SHAPE)) {
        TOUCH_SHAPE_WITH(PRSI);
        return true;
    } else if((isPRSI(PHASE)
  &&  !(isHERE(APLANE)))) {
        PHASE_WHOOSH();
        return true;
    } else if(isPRSO(ASUCKER, BSUCKER, CSUCKER)) {
        TOUCH_SUCKER_WITH(PRSO, PRSI);
        return true;
    } else if(isPRSO(DEAD)) {
        TOUCH_DEAD_WITH(PRSI);
        return true;
    }
    _L = STATS[LUCK];
    _STR = STATS[STRENGTH];

    NO_REFRESH = ENDURANCE;

    _PCENT = MAX_HIT_PROB;
    if(!(isIS(PRSO, SLEEPING))) {
        _PCENT = STATS[DEXTERITY];
        if(_PCENT < MAX_HIT_PROB) {
            if(_PCENT < MIN_HIT_PROB) {
                _PCENT = MIN_HIT_PROB;
            }
            _X = PERCENT(_L, (MAX_HIT_PROB - _PCENT));
            if(!(_X < 1)) {
                _PCENT = (_PCENT + _X);
            }
        }
    }

    if(isEQUAL(_MODE, THRUSTING)) {
        _PCENT = MAX_HIT_PROB;
    } else if(_PCENT > MAX_HIT_PROB) {
        _PCENT = MAX_HIT_PROB;
    } else if(_PCENT < MIN_HIT_PROB) {
        _PCENT = MIN_HIT_PROB;
    }

    if(PROB(_PCENT)) {
        if(isSPARK_TO(PRSI, PRSO)) {
            TELL(TAB);
        }
        _MEND = GETP(PRSO, "ENDURANCE");
        if(_MEND < 1) {
            /*"Static killed it!"*/
            return false;
        }

        if(_STR > 1) {
            _DAM = RANDOM(_STR);
        }
        _X = PERCENT(STATS[LUCK], _DAM);
        if(_X < 1) {
            _X = 1;
        }
        _DAM = (_DAM + _X);
        if(_DAM > _STR) {
            _DAM = _STR;
        }

        _MIN = (_DAM / 5);
        _DAM = (((GETP(PRSI, "EFFECT") * _DAM) + 99) / 100);
        if(_DAM < _MIN) {
            _DAM = _MIN;
        } else if(!(isIS(PRSI, WIELDED))) {
            _DAM = (_DAM / 2);
            if(_DAM < _MIN) {
                _DAM = _MIN;
            }
        }

        /*"No important damage."*/

        MAKE(PRSO, STRICKEN);
        if(_DAM < _MEND) {
            /*"Non-fatal damage inflicted."*/
            _PCENT = RATIO(_DAM, _MEND);
            _MEND = (_MEND - _DAM);
            PUTP(PRSO, "ENDURANCE", _MEND);
            YOUR_OBJ(PRSI);
            TELL(C(SP));
            if(!(isLIT)) {
                TELL("strikes a blow.", CR);
                return true;
            }
            HOW_BAD(_PCENT);
            TELL("ly wounds ", THEO);
            if(_PCENT < 20) {
                TOO_BAD();
            }
            PRINT(PERIOD);
            return true;
        }

        /*"Got the sucker!"*/

        PUTP(PRSO, "ENDURANCE", 0);
        PUTP(PRSO, "STRENGTH", 0);
        TELL("You deal ");
        if(isT(isLIT)) {
            TELL(THEO, C(SP));
        }
        TELL("a decisive blow");
        if(!(isEQUAL(PRSI, null, HANDS))) {
            TELL(WITH, THEI);
        }
        TELL("!", CR);
        return true;
    }

    /*"Missed!"*/

    TELL(CYOU);
    if(isEQUAL(PRSI, FEET)) {
        TELL(B("KICK"));
    } else if((isEQUAL(PRSI, HANDS)
  ||  PROB(50))) {
        TELL(B("SWING"));
    } else {
        TELL(B("STRIKE"));
    }
    if(!(isLIT)) {
        TELL(" at the darkness, with no effect.", CR);
        return true;
    }
    TELL(" at ", THEO);
    if(!(isEQUAL(PRSI, null, HANDS, FEET))) {
        TELL(WITH, THEI);
    }
    TELL(", ", PICK_NEXT(MISSES));
    TOO_BAD();
    PRINT(PERIOD);
    return true;
}

function TOO_BAD() {
    if(isPRSI(HANDS, FEET)) {
        return false;
    } else if((isIS(PRSI, WEAPON)
  &&  !(isIS(PRSI, WIELDED)))) {
        TELL(". Too bad you're not wielding ", THEI);
    }
    return false;
}

function MONSTER_THROW() {
    MOVE(PRSO, LOC(PRSI));
    WINDOW(SHOWING_ALL);
    YOUR_OBJ(PRSO);
    TELL(" just misses ", THEI, PERIOD);
    return true;
}

function KILL_MONSTER(_OBJ) {
    let _X;
    EXUENT_MONSTER(_OBJ);
    UNMAKE(_OBJ, LIVING);
    PUTP(_OBJ, "STRENGTH", 0);
    PUTP(_OBJ, "DEXTERITY", 0);
    PUTP(_OBJ, "ENDURANCE", 0);
    _X = GETP(_OBJ, "LIFE");
    if(isT(_X)) {
        DEQUEUE(_X);
        PUTP(_OBJ, "LIFE", 0);
    }
    _X = GETP(_OBJ, "VALUE");
    if(isT(_X)) {
        PUTP(_OBJ, "VALUE", 0);
        UPDATE_STAT(_X, EXPERIENCE);
    }
    return false;
}

function EXUENT_MONSTER(_OBJ) {
    VANISH(_OBJ);
    MAKE(_OBJ, SURPRISED);
    UNMAKE(_OBJ, STRICKEN);
    ATTACK_MODE = NORMAL_ATTACK;
    QCONTEXT = NOT_HERE_OBJECT;
    QCONTEXT_ROOM = null;
    LAST_MONSTER = isFIND_IN(HERE, MONSTER);
    LAST_MONSTER_DIR = null;
    return false;
}

function DIAGNOSE_MONSTER(_OBJ=PRSO) {
    let _MAX, _MEND;
    _MAX = GETP(_OBJ, "EMAX");
    _MEND = GETP(_OBJ, "ENDURANCE");
    if(isIS(_OBJ, FEMALE)) {
        TELL("She");
    } else {
        TELL("He");
    }
    TELL(" appears to be ");
    if(isIS(_OBJ, SLEEPING)) {
        TELL(B("STUNNED"), ", ");
        if(isEQUAL(_MEND, _MAX)) {
            TELL(B("BUT"));
        } else {
            TELL(B("AND"));
        }
        TELL(", ");
    }
    if(isEQUAL(_MAX, _MEND)) {
        TELL("in excellent condition");
        if((isEQUAL(_OBJ, DORN)
  &&  isIS(_OBJ, MUNGED))) {
            TELL(" otherwise");
        }
        TELL(PERIOD);
        return true;
    }
    HOW_BAD(RATIO(_MEND, _MAX));
    TELL("ly wounded.", CR);
    return true;
}

function HOW_BAD(_PCENT) {
    if(_PCENT < 20) {
        TELL("dangerous");
        return true;
    } else if(_PCENT < 40) {
        TELL("grave");
        return true;
    } else if(_PCENT < 60) {
        TELL("serious");
        return true;
    } else if(_PCENT < 80) {
        TELL("noticeab");
        return true;
    } else {
        TELL("slight");
        return true;
    }
}

function isWATER(_OBJ=PRSI) {
    if((isEQUAL(_OBJ, GREAT_SEA, COVE, BROOK)
  ||  isEQUAL(_OBJ, WATERFALL, RIVER))) {
        return true;
    } else {
        return false;
    }
}

function isMAGICWORD(_WRD=null) {
    let _LEN, _OBJ, _X;
    if((isT(TELEWORD)
  &&  isEQUAL(TELEWORD, P_PRSA_WORD, _WRD))) {
        SAY_TELEWORD();
        return true;
    } else if((isEQUAL("LIGHTNING", P_PRSA_WORD, _WRD)
  &&  isEQUAL(HERE, LOC(RIDDLE)))) {
        OPEN_CLIFF();
        return true;
    } else if((isEQUAL("YOUTH", P_PRSA_WORD, _WRD)
  &&  isEQUAL(HERE, LOC(BOULDER))
  &&  !(LOC(POOL)))) {
        OPEN_POOL();
        return true;
    } else if((isT(AMULET_WORD)
  &&  isEQUAL(AMULET_WORD, P_PRSA_WORD, _WRD))) {
        SAY_AMULET_WORD();
        return true;
    } else if((isT(WALL_WORD)
  &&  isEQUAL(WALL_WORD, P_PRSA_WORD, _WRD))) {
        SAY_WALL_WORD();
        return true;
    } else if((isT(GOBLET_WORD)
  &&  isEQUAL(GOBLET_WORD, P_PRSA_WORD, _WRD)
  &&  isSAY_GOBLET_WORD())) {
        return true;
    }
    _LEN = ALL_SCROLLS[0];
    while(true) {
        _OBJ = toOBJECT(ALL_SCROLLS[_LEN]);
        if((isEQUAL(_OBJ, PRSO) ||  isVISIBLE(_OBJ))) {
            _X = GETPT(_OBJ, "SYNONYM")[1];
            if(isEQUAL(_X, "ZZZP")) {
                
            } else if(isEQUAL(_X, _WRD, P_PRSA_WORD)) {
                _X = APPLY(GETP(_OBJ, "EFFECT"), _OBJ);
                return true;
            }
        }
        if(--_LEN < 1) {
            return false;
        }
    }
}

function DESCRIBE_MONSTERS(_OBJ) {
    let d = "";
    if(!(isIS(_OBJ, LIVING))) {
        d = "dead ";
    } else if(isIS(_OBJ, SLEEPING)) {
        d = "stunned ";
    }
    return d + PRINTD(_OBJ);
}

function isLAST_ROOM_IN(_TBL, _LAST=1) {
    let _LEN, _RM;
    if(isIS(HERE, TOUCHED)) {
        return false;
    }
    _LEN = _TBL[0];
    while(true) {
        _RM = toROOM(_TBL[_LEN]);
        if(isEQUAL(HERE, _RM)) {
            
        } else if(!(isIS(_RM, TOUCHED))) {
            return false;
        }
        if(--_LEN < _LAST) {
            return true;
        }
    }
}

var WINDIR/*NUMBER*/ = 0;

function I_BREEZE() {
    if(isIS(BREEZE, SEEN)) {
        UNMAKE(BREEZE, SEEN);
        return false;
    } else if(PROB(7)) {
        return isNEW_WINDIR(isNEXT_WINDIR());
    } else {
        return false;
    }
}

function isNEXT_WINDIR() {
    let _X;
    while(true) {
        _X = RANDOM(8);
        --_X
        if(isEQUAL(_X, WINDIR)) {
            continue;
        } else if(!(isHERE(IN_SKY))) {
            
        } else if((isEQUAL(ABOVE, OXROADS)
  &&  isEQUAL(_X, I_NE, I_NORTH, I_EAST))) {
            continue;
        } else if((isEQUAL(ABOVE, OTHRIFF)
  &&  isEQUAL(_X, I_SE, I_SOUTH, I_EAST))) {
            continue;
        }break;
    }
    return _X;
}

function isNEW_WINDIR(_X) {
    if(isASSIGNED(_X)) {
        WINDIR = _X;
    }
    MAKE(BREEZE, SEEN);
    if(isIS(HERE, INDOORS)) {
        return false;
    } else if(isHERE(APLANE, IN_SPLENDOR, IN_FROON, IN_GARDEN)) {
        return false;
    } else if(isPLAIN_ROOM()) {
        return false;
    //} else if((_X = isINTBL(HERE, ARCH_ROOMS, MAX_ATIME, 1))) {
    } else if((_X = ARCH_ROOMS.slice(0, MAX_ATIME).map(toROOM).includes(HERE))) {
        return false;
    }
    TELL(TAB, PICK_NEXT(WIND_ALERTS), PERIOD);
    return true;
}

function isFIND_IN(_OBJ, _BIT) {
    if((_OBJ = isFIRST(_OBJ))) {
        while(true) {
            if(isIS(_OBJ, _BIT)) {
                break;
            } else if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    return _OBJ || null;
}

function ON_IN(_OBJ=PRSO) {
    PRINTC(SP);
    if(isEQUAL(_OBJ, BUSH)) {
        TELL(B("BEHIND"));
    } else if(isEQUAL(_OBJ, ARCH)) {
        TELL(B("UNDER"));
    } else if((isIS(_OBJ, CONTAINER)
  ||  isIS(_OBJ, PLACE))) {
        TELL(B("IN"));
    } else {
        TELL(B("ON"));
    }
    TELL(C(SP), THE(_OBJ));
    return true;
}

function SHOP_DOOR(_OBJ) {
    TELL("glass ", BCASE, " near the ");
    if(isIS(_OBJ, OPENED)) {
        TELL("open ");
    }
    PRINTD(_OBJ);
    return false;
}

function LOOK_ON_CASE(_OBJ) {
    if(isSEE_ANYTHING_IN(_OBJ)) {
        TELL(". On the case you see ");
        CONTENTS(_OBJ);
    }
    TELL(". Another exit is partly concealed by ", A(CURTAIN), PERIOD);
    return false;
}

function DESCRIBE_CAVES(_OBJ) {
    return TELL("Underground");
}

function IGNORANT(_WHO, _OBJ) {
    TELL(CTHE(_WHO), " shrugs. \"Don't know nothin' special about ");
    PRONOUN(_OBJ);
    TELL(PERQ);
    return true;
}

function PRONOUN(_OBJ, _IT) {
    if(isIS(_OBJ, PLURAL)) {
        TELL(B("THEM"));
        return true;
    } else if(isIS(_OBJ, FEMALE)) {
        TELL(B("HER"));
        return true;
    } else if(isIS(_OBJ, PERSON)) {
        TELL(B("HIM"));
        return true;
    } else if(isASSIGNED(_IT)) {
        TELL(B("IT"));
        return true;
    } else {
        TELL(B("THAT"));
        return true;
    }
}

function DESCRIBE_WEAPONS(_CONTEXT) {
    TELL(CA(DESCING));
    PRINT(" lies at your feet.");
    return true;
}

function SAY_YOUR(_OBJ) {
    if(!(isIS(_OBJ, NOARTICLE))) {
        TELL("your ");
    }
    TELL(D(_OBJ));
    return false;
}

function YOUR_OBJ(_OBJ=PRSI) {
    if((isEQUAL(_OBJ, FEET)
  ||  isVERB(V_KICK))) {
        TELL("Your foot");
        return false;
    } else if(isEQUAL(_OBJ, null, HANDS, ME)) {
        TELL("Your fist");
        return false;
    }
    if(!(isIS(_OBJ, NOARTICLE))) {
        TELL(CYOUR);
    }
    TELL(D(_OBJ));
    return false;
}

function CARRIAGE_RETURNS() {
    let _NUM;
    _NUM = HEIGHT;
    if(isT(DMODE)) {
        _NUM = (_NUM - 12);
    }
    while(true) {
        CRLF();
        if(--_NUM < 1) {
            return false;
        }
    }
}

function PEERING_BEHIND() {
    TELL("Peering behind ", THEO, LYOU_SEE);
    CONTENTS();
    TELL(PERIOD);
    return true;
}

function FROBOZZ(_STR) {
    TELL("Frobozz Magic ", _STR, " Company");
    return true;
}

function DO_INPUT(after) {
    INPUT(_CHR => {
        let key = _CHR;
        if(isEQUAL(_CHR, MAC_UP_ARROW, MAC_DOWN_ARROW)) {
            if(isEQUAL(_CHR, MAC_UP_ARROW)) {
                key = UP_ARROW;
            } else {
                key = DOWN_ARROW;
            }
        }
        after.post(key);
    });
}

function INIT_MISC() {
    GLOBAL_OBJECTS = GLOBAL_OBJECTS();
    LOCAL_GLOBALS = LOCAL_GLOBALS();
    ROOMS = ROOMS();
    DUMMY_OBJECT = DUMMY_OBJECT();
    X_OBJECT = X_OBJECT();
}