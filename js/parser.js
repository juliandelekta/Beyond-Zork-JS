`PARSER for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

SIBREAKS = ".,\"!?";

var isNOW_PRSI/*FLAG*/ = null;

var LIT/*FLAG*/ = true;
var isALWAYS_LIT/*FLAG*/ = null;

var PRSA/*VERB*/ = 0;
var PRSI/*OBJECT*/ = 0;
var PRSO/*OBJECT*/ = 0;
var P_TABLE/*NUMBER*/ = 0;
var P_SYNTAX/*NUMBER*/ = 0;
var P_LEN/*NUMBER*/ = 0;
var P_DIR/*NUMBER*/ = 0;
var HERE/*OBJECT*/ = 0;

/*var LAST_PLAYER_LOC = 0;*/

const LEXMAX = 59;
const P_LEXV_LENGTH = ((LEXMAX * 4) + 2);
var P_LEXV/*TABLE*/ = ITABLE(P_LEXV_LENGTH, [BYTE], 0);;
var AGAIN_LEXV/*TABLE*/ = ITABLE(P_LEXV_LENGTH, [BYTE], 0);;
var RESERVE_LEXV/*TABLE*/ = ITABLE(P_LEXV_LENGTH, [BYTE], 0);;

var RESERVE_PTR/*FLAG*/ = null;

const P_INBUF_LENGTH = 82;
var P_INBUF/*TABLE*/ = ITABLE(P_INBUF_LENGTH, [BYTE], 0);;
var RESERVE_INBUF/*TABLE*/ = ITABLE(P_INBUF_LENGTH, [BYTE], 0);;"FIX #36"
var OOPS_INBUF/*TABLE*/ = ITABLE(P_INBUF_LENGTH, [BYTE], 0);;

var P_NUMBER/*NUMBER*/ = -1;
var P_EXCHANGE/*NUMBER*/ = 0;
var P_DIRECTION = 0;
var P_LASTADJ/*WORD*/ = null;
var P_GWIMBIT = 0;

var P_NAM = null;
var P_XNAM = null;
var P_NAMW/*TABLE*/ = [0, 0];
var P_ADJ = null;
var P_XADJ = null;
var P_ADJW/*TABLE*/ = [0, 0];
var P_PHR = 0;"Which noun phrase is being parsed?"

var P_OFW/*TABLE*/ = [0, 0];

var P_PRSO/*TABLE*/ = ITABLE(NONE, 48);;
var P_PRSI/*TABLE*/ = ITABLE(NONE, 48);;
var P_BUTS/*TABLE*/ = ITABLE(NONE, 48);;
var P_MERGE/*TABLE*/ = ITABLE(NONE, 48);;
var P_OCL1 = ITABLE(NONE, 48);;
var P_OCL2 = ITABLE(NONE, 48);;

var P_GETFLAGS = 0;
var P_AND = null;

const P_MATCHLEN = 0;
const P_ALL = 1;
const P_ONE = 2;
const P_INHIBIT = 4;

var P_CONT/*FLAG*/ = null;"Parse-continue flag."

var P_IT_OBJECT/*OBJECT*/ = null;
var P_HER_OBJECT/*OBJECT*/ = null;
var P_HIM_OBJECT/*OBJECT*/ = null;
var P_THEM_OBJECT/*OBJECT*/ = null;

var QCONTEXT/*OBJECT*/ = null;
var QCONTEXT_ROOM/*OBJECT*/ = null;

"Orphan flag"

var P_OFLAG/*FLAG*/ = null;

var P_MERGED = null;
var P_ACLAUSE = null;
var P_ANAM = null;

/*var P_AADJ = null;*/

"Byte offset to # of entries in LEXV"

const P_LEXWORDS = 1;

"Word offset to start of LEXV entries"

const P_LEXSTART = 2;

"Number of words per LEXV entry"

const P_LEXELEN = 1;//2;
const P_WORDLEN = 1;//4;

"Offset to parts of speech byte"

const P_PSOFF = 6;

"Offset to first part of speech"

const P_P1OFF = 7;

"First part of speech bit mask in PSOFF byte"

const P_P1BITS = 3;
const P_ITBLLEN = 20;"In bytes (for COPYT)."

var P_ITBL/*TABLE*/ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var P_OTBL/*TABLE*/ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var P_VTBL/*TABLE*/ = [0, 0, 0, 0];
var P_OVTBL/*TABLE*/ = [0, 0, 0, 0];
var P_NCN = 0;

const P_VERB = 0;
const P_VERBN = 1;
const P_PREP1 = 2;
const P_PREP1N = 3;
const P_PREP2 = 4;

/*const P_PREP2N = 5;*/

const P_NC1 = 6;
const P_NC1L = 7;
const P_NC2 = 8;
const P_NC2L = 9;

var QUOTE_FLAG/*FLAG*/ = null;

var P_WON/*FLAG*/ = null;

const M_FATAL = 2;

const M_BEG = 1;
const M_ENTERING = 2;
const M_LOOK = 3;
const M_ENTERED = 4;
const M_OBJDESC = 5;
const M_END = 6;
const M_CONT = 7;
const M_WINNER = 8;
const M_EXIT = 9;

var P_WALK_DIR/*DIRECTION*/ = null;
var P_END_ON_PREP = null;

var OOPS_TABLE/*TABLE*/ = [null, null, null, null];
var AGAIN_DIR/*DIRECTION*/ = null;/*"FIX #44"*/

const O_PTR = 0;
const O_START = 1;
const O_LENGTH = 2;
const O_END = 3;

var P_PRSA_WORD/*WORD*/ = null;
var P_DIR_WORD/*WORD*/ = null;

var P_SLOCBITS = 0;

` Grovel down the input finding the verb, prepositions, and noun clauses.
   If the input is <direction> or <walk> <direction>, fall out immediately
   setting PRSA to ,V?WALK and PRSO to <direction>.  Otherwise, perform
   all required orphaning, syntax checking, and noun clause lookup.`

function PARSER(after) {
    let _PTR = P_LEXSTART,
        _VAL = 0,
        _VERB = null,
        _OF_FLAG = null,
        _LEN = 0,
        _DIR = null,
        _NW = 0,
        _LW = 0,
        _OWINNER, _OMERGED, _WRD, _X;
    const loop_1 = loop_stream();
    loop_1.loadPreaction(() => {
        if (!(P_OFLAG)) {
            COPYT(P_ITBL, P_OTBL, P_ITBLLEN);
        }
        COPYT(P_ITBL, 0, P_ITBLLEN);
        P_NAM = null;
        P_ADJ = null;
        P_XNAM = null;
        P_XADJ = null;
        P_DIR_WORD = null;
        P_PNAM = null;
        P_PADJN = null;
        if (!(P_OFLAG)) {
            P_ACT = null;
            P_QWORD = null;
            P_LASTADJ = null;
            P_NAMW[0] = null;
            P_NAMW[1] = null;
            P_ADJW[0] = null;
            P_ADJW[1] = null;
            P_OFW[0] = null;
            P_OFW[1] = null;
        }
        _OMERGED = P_MERGED;
        P_MERGED = null;
        P_END_ON_PREP = null;
        P_PRSO[P_MATCHLEN] = 0;
        P_PRSI[P_MATCHLEN] = 0;
        P_BUTS[P_MATCHLEN] = 0;
        _OWINNER = WINNER;
        if ((!(QUOTE_FLAG) &&
                !(isEQUAL(WINNER, PLAYER)))) {
            WINNER = PLAYER;
            if (!(isIS(LOC(WINNER), VEHICLE))) {
                HERE = LOC(WINNER);
            }
            isLIT = isIS_LIT();
        }
        if (isT(RESERVE_PTR)) {
            _PTR = RESERVE_PTR;
            COPYT(RESERVE_LEXV, P_LEXV, P_LEXV_LENGTH);
            COPYT(RESERVE_INBUF, P_INBUF, P_INBUF_LENGTH); /*"FIX #36"*/
            if ((isT(VERBOSITY) &&
                    isEQUAL(PLAYER, WINNER))) {
                CRLF();
            }
            RESERVE_PTR = null;
            P_CONT = null;
            setTimeout(loop_1.post, 20);
        } else if (isT(P_CONT)) {
            _PTR = P_CONT;
            P_CONT = null;
            if ((isT(VERBOSITY) &&
                    isEQUAL(PLAYER, WINNER))) {
                CRLF();
            }
            setTimeout(loop_1.post, 20);
        } else {
            WINNER = PLAYER;
            QUOTE_FLAG = null;
            if (!(isIS(LOC(WINNER), VEHICLE))) {
                HERE = LOC(WINNER);
            }
            isLIT = isIS_LIT();

            if (LOWCORE(FLAGS) & 4) {
                V_REFRESH();
            }
            if (isHERE(OLD_HERE)) {

            } else if ((!(DMODE) ||
                    isEQUAL(IN_DBOX, SHOWING_STATS) ||
                    isEQUAL(PRIOR, SHOWING_INV, SHOWING_STATS))) {
                V_LOOK();
            } else {
                DISPLAY_PLACE();
            }
            if (!(DMODE)) {
            } else if (!(AUTO)) {
            } else if (!(NEW_DBOX)) {
            } else if ((isEQUAL(IN_DBOX, SHOWING_ROOM) &&
                    isEQUAL(PRIOR, 0, SHOWING_ROOM))) {
                if (NEW_DBOX & SHOWING_ROOM) {
                    _X = P_IT_OBJECT;
                    UPDATE_ROOMDESC();
                    THIS_IS_IT(_X);
                }
            } else if ((isEQUAL(IN_DBOX, SHOWING_INV) &&
                    isEQUAL(PRIOR, 0, SHOWING_INV))) {
                if (NEW_DBOX & SHOWING_INV) {
                    _X = P_IT_OBJECT;
                    UPDATE_INVENTORY();
                    THIS_IS_IT(_X);
                }
            } else if ((isEQUAL(IN_DBOX, SHOWING_STATS) &&
                    isEQUAL(PRIOR, 0, SHOWING_STATS))) {
                if (NEW_DBOX & SHOWING_STATS) {
                    _X = ENDURANCE;
                    TO_TOP_WINDOW();
                    while (true) {
                        APPLY(STAT_ROUTINE, _X, STATS[_X]);
                        if (++_X > LUCK) {
                            break;
                        }
                    }
                    TO_BOTTOM_WINDOW();
                }
            }

            if (isT(VERBOSITY)) {
                CRLF();
            }
            TELL(">");
            READ_LEXV(loop_1);
        }
    });
    loop_1.loadPostaction(() => {
        P_LEN = P_LEXV[P_LEXWORDS];
        if (isEQUAL(P_LEXV[_PTR], "\"")) {
            /*"Quote first token?"*/
            _PTR = (_PTR + P_LEXELEN); /*"If so, ignore it."*/
            P_LEN = (P_LEN - 1);
        }
        if (isEQUAL(P_LEXV[_PTR], "THEN", "PLEASE", "SO")) {
            _PTR = (_PTR + P_LEXELEN); /*"Ignore boring 1st words."*/
            P_LEN = (P_LEN - 1);
        }
        if ((1 < P_LEN &&
                isEQUAL(P_LEXV[_PTR], "GO") /*"GO first word?"*/ &&
                (_NW = P_LEXV[(_PTR + P_LEXELEN)]) &&
                isWT(_NW, PSVERB /*P1VERB*/ ))) {
            /*" Followed by verb?"*/
            _PTR = (_PTR + P_LEXELEN); /*"If so, ignore it."*/
            P_LEN = (P_LEN - 1);
        }
        if (!(P_LEN)) {
            TELL("[What?]", CR);
            after.post(false);
            return false;
        }
        _WRD = P_LEXV[_PTR];
        if (isEQUAL(_WRD, "UNDO")) {
            V_UNDO();
            after.post(false);
            return false;
        }
        CAN_UNDO = ISAVE();
        if (!(isEQUAL(CAN_UNDO, 2))) {
            loop_1.finish();
            return;
        }
        V_REFRESH();
        COMPLETED("UNDO");
        if ((!(DMODE) ||
                !(isEQUAL(PRIOR, 0, SHOWING_ROOM)))) {
            CRLF();
        }
        setTimeout(loop_1.again, 20);
    });
loop_1.onFinish(() => {

    if (isEQUAL(_WRD, "OOPS")) {
        if (isEQUAL(P_LEXV[(_PTR + P_LEXELEN)], ".", ",")) {
            _PTR = (_PTR + P_LEXELEN);
            P_LEN = (P_LEN - 1);
        } /*"FIX #38"*/
        if (!(P_LEN > 1)) {
            PRINTC('\['.charCodeAt(0));
            TELL(CANT, "use OOPS that way.]", CR);
            after.post(false);
            return false;
        } else if (OOPS_TABLE[O_PTR]) {
            if (P_LEN > 2) {
                /*"FIX #39"*/
                if (isEQUAL(P_LEXV[(_PTR + P_LEXELEN)], "\"")) {
                    TELL("[Sorry. ", CANT, "correct mistakes in quoted text.]", CR);
                    after.post(false);
                    return false;
                }
                TELL("[NOTE: Only the first word after OOPS is used.]", CR, TAB);
            }
            AGAIN_LEXV[OOPS_TABLE[O_PTR]] = P_LEXV[(_PTR + P_LEXELEN)];
            WINNER = _OWINNER; /*"Fixes OOPS w/chars"*/
            //INBUF_ADD(P_LEXV[((_PTR * P_LEXELEN) + 6)], P_LEXV[((_PTR * P_LEXELEN) + 7)], ((OOPS_TABLE[O_PTR] * P_LEXELEN) + 3));
            COPYT(AGAIN_LEXV, P_LEXV, P_LEXV_LENGTH);
            P_LEXV.inVocab = {...P_LEXV.inVocab, ...AGAIN_LEXV.inVocab};
            P_LEN = P_LEXV[P_LEXWORDS];
            _PTR = OOPS_TABLE[O_START];
            //COPYT(OOPS_INBUF, P_INBUF, P_INBUF_LENGTH);
        } else {
            OOPS_TABLE[O_END] = null;
            TELL("[There was no word to replace in that sentence.]", CR);
            after.post(false);
            return false;
        }
    } else {
        if (!(isEQUAL(_WRD, "AGAIN", "G"))) {
            P_QWORD = null;
            P_NUMBER = -1;
        }
        OOPS_TABLE[O_END] = null;
    }
    if (isEQUAL(P_LEXV[_PTR], "AGAIN", "G")) {
        if ((isT(P_OFLAG) ||
                !(P_WON) ||
                !(OOPS_INBUF[1]))) {
            /*"FIX #50"*/
            PRINTC('\['.charCodeAt(0));
            TELL(CANT, "use AGAIN that way.]", CR);
            after.post(false);
            return false;
        } else if (P_LEN > 1) {
            if ((isEQUAL(P_LEXV[(_PTR + P_LEXELEN)], ".", ",", "THEN") ||
                    isEQUAL(P_LEXV[(_PTR + P_LEXELEN)], "AND"))) {
                _PTR = (_PTR + P_LEXELEN);
                P_LEXV[P_LEXWORDS] = (P_LEXV[P_LEXWORDS] - 2);
            } else {
                DONT_UNDERSTAND();
                after.post(false);
                return false;
            }
        } else {
            _PTR = (_PTR + P_LEXELEN);
            P_LEXV[P_LEXWORDS] = (P_LEXV[P_LEXWORDS] - 1);
        }
        if (P_LEXV[P_LEXWORDS] > 0) {
            COPYT(P_LEXV, RESERVE_LEXV, P_LEXV_LENGTH);
            /*STUFF(RESERVE_LEXV, P_LEXV);*/
            COPYT(P_INBUF, RESERVE_INBUF, P_INBUF_LENGTH);
            /*INBUF_STUFF(RESERVE_INBUF, P_INBUF);*/
            /*"FIX #36"*/
            RESERVE_PTR = _PTR;
        } else {
            RESERVE_PTR = null;
        }
        /*P_LEN = AGAIN_LEXV[P_LEXWORDS];*/
        WINNER = _OWINNER;
        P_MERGED = _OMERGED;
        COPYT(OOPS_INBUF, P_INBUF, P_INBUF_LENGTH);
        /*INBUF_STUFF(P_INBUF, OOPS_INBUF);*/
        COPYT(AGAIN_LEXV, P_LEXV, P_LEXV_LENGTH);
        P_LEXV.inVocab = {...P_LEXV.inVocab, ...AGAIN_LEXV.inVocab};
        /*STUFF(P_LEXV, AGAIN_LEXV);*/
        _DIR = AGAIN_DIR; /*"FIX #44"*/
        COPYT(P_OTBL, P_ITBL, P_ITBLLEN);
        /*_CNT = -1;*/
        /*while(true) {
            if(++_CNT > P_ITBLLEN) {
                break;
            } else {
                P_ITBL[_CNT] = P_OTBL[_CNT];
            }
        }*/
    } else {
        P_NUMBER = -1; /*"Fixed BM 2/28/86"*/
        COPYT(P_LEXV, AGAIN_LEXV, P_LEXV_LENGTH);
        AGAIN_LEXV.inVocab = {...P_LEXV.inVocab};
        /*STUFF(AGAIN_LEXV, P_LEXV);*/
        COPYT(P_INBUF, OOPS_INBUF, P_INBUF_LENGTH);
        /*INBUF_STUFF(OOPS_INBUF, P_INBUF);*/
        OOPS_TABLE[O_START] = _PTR;
        OOPS_TABLE[O_LENGTH] = (P_LEN); /*"FIX #37"*/
        _LEN /*"FIX #43"*/ = ((_PTR + (P_LEXELEN * P_LEXV[P_LEXWORDS])));
        OOPS_TABLE[O_END] = (P_LEXV[(_LEN - 1)] +
            P_LEXV[(_LEN - 2)]);
        RESERVE_PTR = null;
        _LEN = P_LEN;
        P_DIR = null;
        P_NCN = 0;
        P_GETFLAGS = 0;
        P_ITBL[P_VERBN] = 0;
        while (true) {
            if (--P_LEN < 0) {
                QUOTE_FLAG = null;
                break;
            }
            _WRD = P_LEXV[_PTR];
            if (isBUZZER_WORD(_WRD)) {
                //after.post(false);
                //return false;
                break;
            } else if ((P_LEXV.inVocab[_WRD] ||
                    (_WRD = isQUOTED_WORD(_PTR, _VERB)) ||
                    (_WRD = isNUMBER(_PTR))
                    /*(_WRD = isNAME(_PTR))*/
                )) {

                if (!(P_LEN)) {
                    _NW = 0;
                } else {
                    _NW = P_LEXV[(_PTR + P_LEXELEN)];
                }
                if ((isEQUAL(_WRD, "TO") &&
                        isEQUAL(_VERB, V_TELL, V_ASK))) {//ACTTELL, ACTASK))) {
                    P_ITBL[P_VERB] = V_TELL//ACTTELL;
                    /*_VERB = ACTTELL;*/
                    _WRD = "\"";
                } else if ((isEQUAL(_WRD, "THEN" /*"PERIOD"*/ )
                        /*!(isEQUAL(_NW, "THEN", "PERIOD"))*/
                        &&
                        P_LEN > 0 /*"FIX #40"*/ &&
                        !(_VERB) &&
                        !(QUOTE_FLAG))) {
                    P_ITBL[P_VERB] = V_TELL//ACTTELL;
                    P_ITBL[P_VERBN] = ["TELL"]//0;
                    _WRD = "\"";
                } else if ((isEQUAL(_WRD, ".") &&
                        isEQUAL(_LW, "MR", "MRS" /*"DR"*/ ))) {
                    P_NCN = (P_NCN - 1);
                    CHANGE_LEXV(_PTR, _LW, true);
                    _WRD = _LW;
                    _LW = 0;
                } /*"FIX #40"*/
                /*if((isEQUAL(_WRD, "PERIOD")
                 &&  isEQUAL(_LW, "MR", "MRS"/*"DR"* /))) {
                    _LW = 0;
                }*/
                if (isEQUAL(_WRD, "THEN", ".", "\"")) {
                    if (isEQUAL(_WRD, "\"")) {
                        if ((isEQUAL(P_LEXV[_PTR], "\"") &&
                                (!(isEQUAL(_VERB, V_TELL, V_SAY//ACTTELL, ACTSAY
                                        /*ACTNAME*/
                                    )) ||
                                    !(isEQUAL(WINNER, PLAYER))))) {
                            if (isQUOTED_PHRASE(_PTR, _VERB)) {
                                _PTR = (_PTR + P_LEXELEN);
                                continue;
                            } else {
                                after.post(false);
                                return false;
                            }
                        } else if (isT(QUOTE_FLAG)) {
                            QUOTE_FLAG = null;
                        } else {
                            QUOTE_FLAG = true;
                        }
                    }
                    /* ADDED */
                    if (P_LEN)
                        P_CONT = (_PTR + P_LEXELEN);
                    P_LEXV[P_LEXWORDS] = P_LEN;
                    break;
                    /*(!(P_LEN) ||
                        (P_CONT = (_PTR + P_LEXELEN)))
                    P_LEXV[P_LEXWORDS] = P_LEN;
                    break;*/

                } else if (((_VAL = isWT(_WRD, PSDIRECTION, P1DIRECTION)) &&
                        isEQUAL(_VERB, null, ACTWALK, ACTGO) &&
                        (isEQUAL(_LEN, 1) ||
                            (isEQUAL(_LEN, 2) &&
                                isEQUAL(_VERB, ACTWALK, ACTGO)) ||
                            (isEQUAL(_NW, "THEN", ".", "\"") &&
                                _LEN > 1)
                            /*(isEQUAL(_NW, "PERIOD")
                              &&  _LEN > 1)*/
                            ||
                            (isT(QUOTE_FLAG) &&
                                isEQUAL(_LEN, 2) &&
                                isEQUAL(_NW, "\"")) ||
                            (_LEN > 2 &&
                                isEQUAL(_NW, ",", "AND"))))) {
                    _DIR = _VAL;
                    P_DIR_WORD = _WRD;
                    if (isEQUAL(_NW, ",", "AND")) {
                        CHANGE_LEXV((_PTR + P_LEXELEN), "THEN");
                    }
                    if (!(_LEN > 2)) {
                        QUOTE_FLAG = null;
                        break;
                    }
                } else if (((_VAL = isWT(_WRD, PSVERB, P1VERB)) &&
                        !(_VERB))) {
                    P_PRSA_WORD = _WRD; /*"For RUN, etc."*/
                    _VERB = _VAL;
                    P_ITBL[P_VERB] = _VAL;
                    P_ITBL[P_VERBN] = P_VTBL;
                    P_VTBL[0] = _WRD;
                    //_X = ((_PTR * 2) + 2);
                    //P_VTBL[2] = P_LEXV[_X];
                    //P_VTBL[3] = P_LEXV[(_X + 1)];
                    P_VTBL[2] = _WRD.length;
                    P_VTBL[3] = "OFFSET IN INBUF";
                } else if (((_VAL = isWT(_WRD, PSPREPOSITION, 0)) ||
                        isEQUAL(_WRD, "ALL", "EVERYTHING") ||
                        isEQUAL(_WRD, "BOTH", "A") ||
                        isWT(_WRD, PSADJECTIVE) ||
                        isWT(_WRD, PSOBJECT))) {
                    /*"Fix for new zilch, 3/12/87."*/
                    if ((P_LEN > 1 /*"1 IN RETROFIX #34"*/ &&
                            isEQUAL(_NW, "OF") &&
                            !(isEQUAL(_VERB
                                /*ACTMAKE*/
                                , ACTTAKE)) &&
                            !(_VAL) &&
                            !(isEQUAL(_WRD, "A")) &&
                            !(isEQUAL(_WRD, "ALL", "BOTH", "EVERYTHING")))) {
                        /*if(isEQUAL(_WRD, "BOTTOM")) {
                            _BOTTOM = true;
                        }*/
                        P_OFW[P_NCN] = _WRD; /*"Save OF-word"*/
                        _OF_FLAG = true;
                    } else if ((isT(_VAL) &&
                            (!(P_LEN) ||
                                isEQUAL(_NW, "THEN", ".")))) {
                        P_END_ON_PREP = true;
                        if (P_NCN < 2) {
                            P_ITBL[P_PREP1] = _VAL;
                            P_ITBL[P_PREP1N] = _WRD;
                        }
                    } else if (isEQUAL(P_NCN, 2)) {
                        TELL("[There are too many nouns in that sentence.]", CR);
                        after.post(false);
                        return false;
                    } else {
                        P_NCN = (P_NCN + 1);
                        P_ACT = _VERB;
                        _PTR = CLAUSE(_PTR, _VAL, _WRD);
                        if (!(_PTR)) {
                            after.post(false);
                            return false;
                        } else if (_PTR < 0) {
                            QUOTE_FLAG = null;
                            break;
                        }
                    }
                } else if (isEQUAL(_WRD, "OF")) {
                    /*"RETROFIX #34"*/
                    if ((!(_OF_FLAG) ||
                            isEQUAL(_NW, ".", "THEN"))) {
                        CANT_USE(_PTR);
                        after.post(false);
                        return false;
                    } else {
                        _OF_FLAG = null;
                    }
                } else if (isWT(_WRD, PSBUZZ_WORD)) {

                } else if ((isEQUAL(_VERB, V_TELL) &&//ACTTELL) &&
                        isWT(_WRD, PSVERB /*P1VERB*/ ))) {
                    WAY_TO_TALK();
                    after.post(false);
                    return false;
                } else {
                    CANT_USE(_PTR);
                    after.post(false);
                    return false;
                }
            } else {
                UNKNOWN_WORD(_PTR);
                after.post(false);
                return false;
            }
            _LW = _WRD;
            _PTR = (_PTR + P_LEXELEN);
        }
    }
    OOPS_TABLE[O_PTR] = null;
    if (isT(_DIR)) {
        PRSA = V_WALK;
        P_WALK_DIR = toDIRECTION(_DIR);
        AGAIN_DIR = _DIR; /*"FIX #44"*/
        PRSO = toDIRECTION(_DIR);
        P_OFLAG = null;
        after.post(true);
        return true;
    }
    P_WALK_DIR = null;
    AGAIN_DIR = null; /*"FIX #44"*/
    if ((isT(P_OFLAG) &&
            ORPHAN_MERGE())) {
        WINNER = _OWINNER;
    }
        /*{
               isBOTTOM = _BOTTOM;
           }*/
        /*if(!(P_ITBL[P_VERB])) {
            P_ITBL[P_VERB] = ACTTELL;
        }*/
        /*"Why was this here?"*/
        if ((SYNTAX_CHECK() &&
                SNARF_OBJECTS() &&
                MANY_CHECK()
                /*TAKE_CHECK()*/
                &&
                ITAKE_CHECK(P_PRSO, P_SYNTAX[P_SLOC1]) &&
                ITAKE_CHECK(P_PRSI, P_SYNTAX[P_SLOC2]))) {
            after.post(true);
            return true;
        }

    after.post(false);
    return false;

});
}
function PCLEAR() {
    P_CONT = null;
    QUOTE_FLAG = null;
    return false;
}

function CHANGE_LEXV(_PTR, _WRD, _isPTRS) {
    let _X, _Y, _Z;
    if(isASSIGNED(_isPTRS)) {
        _X = (2 + (2 * (_PTR - P_LEXELEN)));
        _Y = P_LEXV[_X];
        _Z = (2 + (2 * _PTR));
        P_LEXV[_Z] = _Y;
        AGAIN_LEXV[_Z] = _Y;
        _Y = P_LEXV[(1 + _X)];
        _Z = (3 + (2 * _PTR));
        P_LEXV[_Z] = _Y;
        AGAIN_LEXV[_Z] = _Y;
    }
    if (_WRD) { 
        P_LEXV[_PTR] = _WRD;
        P_LEXV.inVocab[_WRD] = !!VOCAB2[_WRD];
        AGAIN_LEXV[_PTR] = _WRD;
    }
    return true;
}

`Check whether word pointed at by PTR is the correct part of speech.
 The second argument is the part of speech (,PS?<part of speech>).  The
   3rd argument (,P1?<part of speech>), if given, causes the value
   for that part of speech to be returned.`

function isWT(_PTR, _BIT, _B1=5) {
    _PTR = VOCAB2[_PTR];
    if (!_PTR) return false;
    let _OFFS, _TYP;
    _OFFS = P_P1OFF - 6; // 6 son los bytes que guardan la palabra W?
    _TYP = _PTR[P_PSOFF - 6];
    if(!(_TYP & _BIT)) {
        return false;
    } else if(_B1 > 4) {
        return true;
    }
    _TYP = (_TYP & P_P1BITS);
    if(!(isEQUAL(_TYP, _B1))) {
        _OFFS = (_OFFS + 1);
    }
    return _PTR[_OFFS];
}

/*function isWT(_PTR, _BIT, _B1=5) {
    let _OFFS, _TYP;
    _OFFS = P_P1OFF;
    _TYP = _PTR[P_PSOFF];
    if(_TYP & _BIT) {
        if(_B1 > 4) {
            return true;
        }
        _TYP = (_TYP & P_P1BITS);
        if(!(isEQUAL(_TYP, _B1))) {
            ++OFFS
        }
        return _PTR[_OFFS];
    } else {
        return false;
    }
}*/

"Scan through a noun phrase, leaving a pointer to its starting location:"

function CLAUSE(_PTR, _VAL, _WRD) {
    let _isFIRST=true, _ANDFLG=null, _LW=0, _OFF, _NUM, _NW;
    _OFF = ((P_NCN - 1) * 2);
    if(isT(_VAL)) {
        P_ITBL[(_NUM = (P_PREP1 + _OFF))] = _WRD;//_VAL;
        P_ITBL[(_NUM + 1)] = _WRD;
        _PTR = (_PTR + P_LEXELEN);
    } else {
        P_LEN = (P_LEN + 1);
    }
    if(!(P_LEN)) {
        P_NCN = (P_NCN - 1);
        return -1;
    }
    P_ITBL[(_NUM = (P_NC1 + _OFF))] = REST(P_LEXV, (_PTR));//REST(P_LEXV, (_PTR * 2));
    if((isEQUAL(P_LEXV[_PTR], "THE", "A", "AN")
    ||  isEQUAL(P_LEXV[_PTR], "$BUZZ"))) {
        /*isEQUAL(P_LEXV[_PTR], "THE", "A", "AN");*/
        P_ITBL[_NUM] = REST(P_ITBL[_NUM]);
    }
    while(true) {
        if(--P_LEN < 0) {
            P_ITBL[(_NUM + 1)] = REST(P_LEXV, (_PTR));//REST(P_LEXV, (_PTR * 2));
            return -1;
        }
        _WRD = P_LEXV[_PTR];
        if(isBUZZER_WORD(_WRD)) {
            return false;
        } else if((isT(_WRD)
  ||  (_WRD = isQUOTED_WORD(_PTR))
  ||  (_WRD = isNUMBER(_PTR))
/*(_WRD = isNAME(_PTR))*/)) {
            if(!(P_LEN)) {
                _NW = 0;
            } else {
                _NW = P_LEXV[(_PTR + P_LEXELEN)];
                if(!(_NW)) {
                    /*"FIX"*/
                    _NW = isNUMBER((_PTR + P_LEXELEN));
                }
            }
            /*if((isEQUAL(_WRD, "OF")
  &&  isEQUAL(P_ITBL[P_VERB]
, ACTMAKE, ACTTAKE))) {
                CHANGE_LEXV(_PTR, "WITH");
                _WRD = "WITH";
            }*/
            if((isEQUAL(_WRD, "\"")
  &&  !(isEQUAL(P_ACT, V_TELL, V_SAY, V_NAME)))) {//ACTTELL, ACTSAY, ACTNAME)))) {
                if(isQUOTED_PHRASE(_PTR, P_ACT)) {
                    _PTR = (_PTR + P_LEXELEN);
                    continue;
                } else {
                    return false;
                }
            } else if((isEQUAL(_WRD, ".")
  &&  isEQUAL(_LW, "MR", "MRS"/*"DR"*/))) {
                _LW = 0;
            } else if(isEQUAL(_WRD, "AND", ",")) {
                _ANDFLG = true;
            } else if(isEQUAL(_WRD, "ALL", "BOTH", "EVERYTHING")) {
                /*(isEQUAL(_WRD, "ALL", "BOTH", "ONE")
  ||  isEQUAL(_WRD, "EVERYTHING"))*/
                if(isEQUAL(_NW, "OF")) {
                    P_LEN = (P_LEN - 1);
                    _PTR = (_PTR + P_LEXELEN);
                }
            } else if((isEQUAL(_WRD, "THEN", ".")
  ||  (isWT(_WRD, PSPREPOSITION)
  &&  P_ITBL[P_VERB]
  &&  !(_isFIRST)))) {
                P_LEN = (P_LEN + 1);
                P_ITBL[(_NUM + 1)] = REST(P_LEXV, (_PTR));//REST(P_LEXV, (_PTR * 2));
                return (_PTR - P_LEXELEN);
            } else /*3/16/83: This clause used to be later.*/if((isT(_ANDFLG)
  &&  (/*"3/25/83: next statement added."*/
!(P_ITBL[P_VERBN])
/*"10/26/84: next stmt changed"*/
  ||  isVERB_DIR_ONLY(_WRD)))) {
                _PTR = (_PTR - 2);
                CHANGE_LEXV((_PTR + 1), "THEN");
                P_LEN = (P_LEN + 2);
            } else if(isWT(_WRD, PSOBJECT)) {
                if((P_LEN > 0
  &&  isEQUAL(_NW, "OF")
  &&  !(isEQUAL(_WRD, "ALL"/*"ONE"*/
, "EVERYTHING")))) {
                    P_OFW[(P_NCN - 1)] = _WRD;
                } else if((isWT(_WRD, PSADJECTIVE
/*P1ADJECTIVE*/)
  &&  isT(_NW)
  &&  isWT(_NW, PSOBJECT))) {
                    
                } else if((!(_ANDFLG)
  &&  !(isEQUAL(_NW, "BUT", "EXCEPT"))
  &&  !(isEQUAL(_NW, "AND", ",")))) {
                    P_ITBL[(_NUM + 1)] = REST(P_LEXV, ((_PTR + 1)));//REST(P_LEXV, ((_PTR + 2) * 2));
                    return _PTR;
                } else {
                    _ANDFLG = null;
                }
            } else /*Next clause replaced by following one to enable OLD WOMAN, HELLO*//*if(((isT(P_MERGED)
  ||  isT(P_OFLAG)
  ||  isT(P_ITBL[P_VERB]))
  &&  (isWT(_WRD, PSADJECTIVE)
  ||  isWT(_WRD, PSBUZZ_WORD)))) {
                
            }*/if(isWT(_WRD, PSADJECTIVE)) {
                
            } else if(isWT(_WRD, PSBUZZ_WORD)) {
                
            } else if((isT(_ANDFLG)
  &&  !(P_ITBL[P_VERB]))) {
                _PTR = (_PTR - 4);
                CHANGE_LEXV((_PTR + 2), "THEN");
                P_LEN = (P_LEN + 2);
            } else if(isWT(_WRD, PSPREPOSITION)) {
                
            } else {
                CANT_USE(_PTR);
                return false;
            }
        } else {
            UNKNOWN_WORD(_PTR);
            return false;
        }
        _LW = _WRD;
        _isFIRST = null;
        _PTR = (_PTR + P_LEXELEN);
    }
}

function SPOKEN_TO(_WHO) {
    if((!(isEQUAL(_WHO, QCONTEXT))
  ||  !(isEQUAL(HERE, QCONTEXT_ROOM)))) {
        SEE_CHARACTER(_WHO);
        TELL("[spoken to ", THE(_WHO), BRACKET);
    }
    return true;
}

function isANYONE_HERE() {
    let _OBJ;
    _OBJ = isQCONTEXT_GOOD();
    if((!(_OBJ)
  &&  (_OBJ = isFIRST(HERE)))) {
        while(true) {
            if((isIS(_OBJ, PERSON)
  &&  !(isEQUAL(_OBJ, PLAYER, WINNER))
  &&  !(isIS(_OBJ, PLURAL)))) {
                break;
            } else if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    return _OBJ;
}

function SEE_CHARACTER(_OBJ) {
    if(isIS(_OBJ, FEMALE)) {
        P_HER_OBJECT = _OBJ;
    } else {
        P_HIM_OBJECT = _OBJ;
    }
    QCONTEXT = _OBJ;
    QCONTEXT_ROOM = LOC(_OBJ);
    return false;
}

function isQCONTEXT_GOOD() {
    if((isT(QCONTEXT)
  &&  isIS(QCONTEXT, PERSON)
  &&  isHERE(QCONTEXT_ROOM)
  &&  isVISIBLE(QCONTEXT))) {
        return QCONTEXT;
    }
    return false;
}

function THIS_IS_IT(_OBJ) {
    if((!(_OBJ)
  ||  isEQUAL(_OBJ, PLAYER, ME, INTNUM)
  ||  isEQUAL(_OBJ, INTDIR, LEFT, RIGHT))) {
        return false;
    } else if(isIS(_OBJ, FEMALE)) {
        P_HER_OBJECT = _OBJ;
        return false;
    } else if(isIS(_OBJ, PERSON)) {
        P_HIM_OBJECT = _OBJ;
        return false;
    } else if(isIS(_OBJ, PLURAL)) {
        P_THEM_OBJECT = _OBJ;
        return false;
    } else {
        P_IT_OBJECT = _OBJ;
        return false;
    }
}

function FAKE_ORPHAN() {
    let _TMP, _X;
    ORPHAN(P_SYNTAX, null);
    BE_SPECIFIC();
    _TMP = P_OTBL[P_VERBN];
    if(!(_TMP)) {
        TELL(B("TELL"));
    } else if(!(P_VTBL[2])) {
        PRINTB(_TMP[0]);
    } else {
        _X = _TMP[2];
        WORD_PRINT(_X, _TMP[3]);
        P_VTBL[2] = 0;
    }
    P_OFLAG = true;
    P_WON = null;
    TELL("?]", CR);
    return true;
}

function PERFORM(_A, _O=null, _I=null) {
    _A = toVERB(_A);
    let _V=null, _WHO=null, _OA, _OO, _OI, _ONP, _X;
    /*printed representation*///$$pprr(DECL, [[A], FIX, [O], (FALSE  ||  OBJECT  ||  FIX), [I], (FALSE  ||  OBJECT)])
    if((!(isEQUAL(WINNER, PLAYER))
  &&  !(isIS(WINNER, PERSON)))) {
        NOT_LIKELY(WINNER);
        PRINT(" would respond.|");
        PCLEAR();
        return RFATAL();
    }
    _OA = PRSA;
    _OO = PRSO;
    _OI = PRSI;
    _ONP = isNOW_PRSI;
    _WHO = isANYONE_HERE();
    PRSA = _A;
    if((!(isEQUAL(WINNER, PLAYER))
  &&  (_X = isGAMEVERB()))) {
        TELL("[", CANT, "tell characters to do that.]", CR);
        return RFATAL();
    } else if((!(isLIT)
  &&  (_X = isSEEING()))) {
        TOO_DARK();
        return RFATAL();
    } else if(!(isEQUAL(_A, V_WALK))) {
        if((isEQUAL(WINNER, PLAYER)
  &&  isVERB(V_WHO, V_WHAT, V_WHERE)
  &&  isT(_WHO))) {
            WINNER = _WHO;
            SPOKEN_TO(_WHO);
        } else if((isEQUAL(WINNER, PLAYER)
  &&  isEQUAL(_O, ME)
  &&  isVERB(V_TELL, V_TELL_ABOUT, V_ASK_ABOUT, V_ASK_FOR
, V_QUESTION, V_REPLY, V_THANK, V_YELL, V_HELLO, V_GOODBYE
, V_SAY, V_ALARM))) {
            if(!(_WHO)) {
                TALK_TO_SELF();
                return RFATAL();
            }
            WINNER = _WHO;
            SPOKEN_TO(_WHO);
        }
        if(isEQUAL(YOU, _I, _O)) {
            if(isEQUAL(WINNER, PLAYER)) {
                if(!(_WHO)) {
                    TALK_TO_SELF();
                    return RFATAL();
                } else {
                    WINNER = _WHO;
                    SPOKEN_TO(_WHO);
                }
            } else {
                SEE_CHARACTER(WINNER);
                _WHO = WINNER;
            }
            if(isEQUAL(_I, YOU)) {
                _I = _WHO;
            }
            if(isEQUAL(_O, YOU)) {
                _O = _WHO;
            }
        }
        if((isEQUAL(IT, _I, _O)
  &&  !(isACCESSIBLE(P_IT_OBJECT)))) {
            if(!(_I)) {
                FAKE_ORPHAN();
            } else {
                CANT_SEE_ANY(P_IT_OBJECT);
            }
            return RFATAL();
        }
        if(isEQUAL(THEM, _I, _O)) {
            if(isVISIBLE(P_THEM_OBJECT)) {
                if(isEQUAL(THEM, _O)) {
                    _O = P_THEM_OBJECT;
                }
                if(isEQUAL(THEM, _I)) {
                    _I = P_THEM_OBJECT;
                }
            } else {
                if(!(_I)) {
                    FAKE_ORPHAN();
                } else {
                    CANT_SEE_ANY(P_THEM_OBJECT);
                }
                return RFATAL();
            }
        }
        if(isEQUAL(HER, _I, _O)) {
            if(isVISIBLE(P_HER_OBJECT)) {
                if((isEQUAL(P_HER_OBJECT, WINNER)
  &&  isNO_OTHER(true))) {
                    return RFATAL();
                }
                if(isEQUAL(HER, _O)) {
                    _O = P_HER_OBJECT;
                }
                if(isEQUAL(HER, _I)) {
                    _I = P_HER_OBJECT;
                }
            } else {
                if(!(_I)) {
                    FAKE_ORPHAN();
                } else {
                    CANT_SEE_ANY(P_HER_OBJECT);
                }
                return RFATAL();
            }
        }
        if(isEQUAL(HIM, _I, _O)) {
            if(isVISIBLE(P_HIM_OBJECT)) {
                if((isEQUAL(P_HIM_OBJECT, WINNER)
  &&  isNO_OTHER())) {
                    return RFATAL();
                }
                if(isEQUAL(HIM, _O)) {
                    _O = P_HIM_OBJECT;
                }
                if(isEQUAL(HIM, _I)) {
                    _I = P_HIM_OBJECT;
                }
            } else {
                if(!(_I)) {
                    FAKE_ORPHAN();
                } else {
                    CANT_SEE_ANY(P_HIM_OBJECT);
                }
                return RFATAL();
            }
        }
        if(isEQUAL(_O, IT)) {
            _O = P_IT_OBJECT;
        }
        if(isEQUAL(_I, IT)) {
            _I = P_IT_OBJECT;
        }
    }

    PRSI = _I;
    PRSO = _O;

    _V = null;
    if((!(isEQUAL(_A, V_WALK))
  &&  isEQUAL(NOT_HERE_OBJECT, PRSO, PRSI))) {
        _V = APPLY(NOT_HERE_OBJECT_F);
        if(isT(_V)) {
            P_WON = null;
        }
    }

    if(!(isEQUAL(_A, V_WALK))) {
        THIS_IS_IT(PRSI);
        THIS_IS_IT(PRSO);
    }

    _O = PRSO;
    _I = PRSI;

    if(!(_V)) {
        _V = APPLY(GETP(WINNER, "ACTION"), M_WINNER);
    }
    if(!(_V)) {
        _V = APPLY(GETP(LOC(WINNER), "ACTION"), M_BEG);
    }
    if(!(_V)) {
        _V = APPLY(PREACTIONS[VERBS.indexOf(_A)]);
    }

    if(isT(_V)) {
        
    } else if(!(isEQUAL(_A, ...["TELL-ABOUT", "ASK-ABOUT", "ASK-FOR"].map(toVERB)))) {
        isNOW_PRSI = true;
        if(!(_I)) {
            
        } else if((!(isEQUAL(_A, V_WALK))
  &&  LOC(_I))) {
            _V = GETP(LOC(_I), "CONTFCN");
            if(isT(_V)) {
                _V = APPLY(_V, M_CONT);
            }
        }
        isNOW_PRSI = null;
        if(isT(_V)) {
            
        } else if(!(_O)) {
            
        } else if((!(isEQUAL(_A, V_WALK))
  &&  LOC(_O))) {
            _V = GETP(LOC(_O), "CONTFCN");
            if(isT(_V)) {
                _V = APPLY(_V, M_CONT);
            }
        }
        isNOW_PRSI = true;
        if(isT(_V)) {
            
        } else if(isT(_I)) {
            _V = APPLY(GETP(_I, "ACTION"));
        }
    }
    isNOW_PRSI = null;
    if(isT(_V)) {
        
    } else if(!(_O)) {
        
    } else if(!(isEQUAL(_A, V_WALK))) {
        _V = APPLY(GETP(_O, "ACTION"));
    }

    if(!(_V)) {
        _V = APPLY(_A);
    }

    if(!(isEQUAL(_V, M_FATAL))) {
        APPLY(GETP(LOC(WINNER), "ACTION"), M_END);
    }

    PRSA = _OA;
    PRSO = _OO;
    PRSI = _OI;
    isNOW_PRSI = _ONP;
    return _V;
}

function isNO_OTHER(_isFEMALE=null) {
    let _OBJ;
    if((_OBJ = isFIRST(HERE))) {
        while(true) {
            if(isEQUAL(_OBJ, WINNER)) {
                
            } else if(isIS(_OBJ, PERSON)) {
                if(isT(_isFEMALE)) {
                    if(isIS(_OBJ, FEMALE)) {
                        break;
                    }
                } else if(!(isIS(_OBJ, FEMALE))) {
                    break;
                }
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    if(!(_OBJ)) {
        PERPLEXED(WINNER);
        TELL("Who are you talking about?\"", CR);
        return true;
    } else {
        return false;
    }
}

function isBUZZER_WORD(_WORD) {
    let _TBL, _LEN, _X;
    _LEN = Q_BUZZES[0];
    //if((_TBL = isINTBL(_WORD, REST(Q_BUZZES, 2), _LEN))) {
    if(Q_BUZZES.slice(1).includes(_WORD)) {
        TO_DO_THING_USE("ask about", "ASK CHARACTER ABOUT");
        return true;
    }
    _LEN = N_BUZZES[0];
    //if((_TBL = isINTBL(_WORD, REST(N_BUZZES, 2), _LEN))) {
    if(N_BUZZES.slice(1).includes(_WORD)) {
        NYMPH_APPEARS();
        TELL(DONT, "need to use that ", INTNUM);
        TO_COMPLETE();
        return true;
    }
    _LEN = SWEAR_WORDS[0];
    //if((_TBL = isINTBL(_WORD, REST(SWEAR_WORDS, 2), _LEN))) {
    if(SWEAR_WORDS.slice(1).includes(_WORD)) {
        _WORD = STATS[INTELLIGENCE];
        if(_WORD < 1) {
            TELL("Such language betrays your low intelligence.", CR);
            return true;
        }
        TELL("You suddenly feel less intelligent.", CR);
        UPDATE_STAT(-1, INTELLIGENCE, true);
        return true;
    }

    if(!(isSEE_COLOR())) {
        _LEN = COLOR_WORDS[0];
        //if((_TBL = isINTBL(_WORD, REST(COLOR_WORDS, 2), _LEN))) {
        if(COLOR_WORDS.includes(_WORD)) {
            TELL(DONT, "see the color ", B(_WORD), " here; or any other colors, for that matter.", CR);
            return true;
        }
    }

    _LEN = MAGIC_WORDS[0];
    while(true) {
        _TBL = MAGIC_WORDS[_LEN];
        if((isEQUAL(_WORD, _TBL[0])  &&  !(_TBL[2]))) {
            TELL("[This story won't recognize the word \"", B(_WORD), ".\"]", CR);
            return true;
        }
        if(--_LEN < 2) {
            break;
        }
    }

    if((isEQUAL(_WORD, "QUIETLY", "SLOWLY", "CAREFULLY")
  ||  isEQUAL(_WORD, "CLOSELY", "QUICKLY", "RAPIDLY"))) {
        NYMPH_APPEARS();
        TELL("Adverbs (such as \"", B(_WORD), "\") aren't needed");
        TO_COMPLETE();
        return true;
    }

    if((isEQUAL(_WORD, "XYZZY", "PLUGH", "PLOVER")
  ||  isEQUAL(_WORD, "YOHO", "ULYSSES", "ODYSSEUS"))) {
        PRINT("A hollow voice says, \"Fool!\"");
        CRLF();
        return true;
    }
    return false;
}

function isVERB_DIR_ONLY(_WRD) {
    if((!(isWT(_WRD, PSOBJECT))
  &&  !(isWT(_WRD, PSADJECTIVE))
  &&  (isWT(_WRD, PSDIRECTION)
  ||  isWT(_WRD, PSVERB)))) {
        return true;
    } else {
        return false;
    }
}

BUZZ("AGAIN", "G", "OOPS");

"For AGAIN purposes, put contents of one LEXV table into another."

/*function STUFF(_DEST, _SRC, _MAX=29) {
    let _PTR=P_LEXSTART, _CTR=1, _BPTR;
    _DEST[0] = _SRC[0];
    _DEST[1] = _SRC[1];
    while(true) {
        _DEST[_PTR] = _SRC[_PTR];
        _BPTR = ((_PTR * 2) + 2);
        _DEST[_BPTR] = _SRC[_BPTR];
        _BPTR = ((_PTR * 2) + 3);
        _DEST[_BPTR] = _SRC[_BPTR];
        _PTR = (_PTR + P_LEXELEN);
        if(++_CTR > _MAX) {
            break;
        }
    }
}*/

//"Put contents of one INBUF into another."

/*function INBUF_STUFF(_DEST, _SRC) {
    let _CNT;
    _CNT = (_SRC[0] - 1);
    while(true) {
        _DEST[_CNT] = _SRC[_CNT];
        if(--_CNT < 0) {
            return true;
        }
    }
}*/

/*`Put the word in the positions specified from P-INBUF to the end of
OOPS-INBUF, leaving the appropriate pointers in AGAIN-LEXV.`*/

function INBUF_ADD(_LEN, _BEG, _SLOT) {
    let _DBEG, _CTR=0, _TMP;
    _TMP = OOPS_TABLE[O_END];
    if(isT(_TMP)) {
        _DBEG = _TMP;
    } else {
        _DBEG = (AGAIN_LEXV
[(_TMP = OOPS_TABLE[O_LENGTH])]
 + AGAIN_LEXV[(_TMP + 1)]);
    }
    OOPS_TABLE[O_END] = (_DBEG + _LEN);
    while(true) {
        OOPS_INBUF[(_DBEG + _CTR)
] = P_INBUF[(_BEG + _CTR)];
        ++_CTR
        if(isEQUAL(_CTR, _LEN)) {
            break;
        }
    }
    AGAIN_LEXV[_SLOT] = _DBEG;
    AGAIN_LEXV[(_SLOT - 1)] = _LEN;
    return true;
}

/*var P_DOLLAR_FLAG/*FLAG* / = null;*/

function isNUMBER(_PTR) {
    if (isNaN(P_LEXV[_PTR])) return false;
    let _SUM=0, _TIM=null, _EXC=null, _DOLLAR=0, _CNT, _BPTR, _CHR, _CCTR, _TMP, _NW;
    _TMP = REST(P_LEXV, (_PTR + _PTR));
    _BPTR = _TMP[3];
    _CNT = _TMP[2];
    if(_CNT > 3) {
        _CNT = 3;
    }
    while(true) {
        if(--_CNT < 0) {
            break;
        }
        _CHR = P_INBUF[_BPTR];
        if(isEQUAL(_CHR, '\:'.charCodeAt(0))) {
            if(isT(_EXC)) {
                return false;
            }
            _TIM = _SUM;
            _SUM = 0;
        } else if(isEQUAL(_CHR, '\-'.charCodeAt(0))) {
            if(isT(_TIM)) {
                return false;
            }
            _EXC = _SUM;
            _SUM = 0;
        } else if(_SUM > 9999) {
            return false;
        } else /*if(isEQUAL(_CHR, '\$'.charCodeAt(0))) {
            _DOLLAR = true;
        }*/if((_CHR > ('\0'.charCodeAt(0) - 1)
  &&  _CHR < ('\9'.charCodeAt(0) + 1))) {
            _SUM = ((_SUM * 10) + (_CHR - '\0'.charCodeAt(0)));
        } else {
            return false;
        }
        ++_BPTR
    }
    CHANGE_LEXV(_PTR, "INTNUM");
    _NW = P_LEXV[(_PTR + P_LEXELEN)];
    /*if((isT(_DOLLAR)
  &&  isEQUAL(_NW, "PERIOD")
  &&  P_LEN > 1)) {
        _TMP = CENTS_CHECK((_PTR + (P_LEXELEN * 2)));
        if(isT(_TMP)) {
            if(isEQUAL(_TMP, 100)) {
                _TMP = 0;
            }
            _SUM = ((100 * _SUM) + _TMP);
            _CCTR = (P_LEN - 2);
            while(true) {
                if(--CCTR < 0) {
                    break;
                }
                _PTR = (_PTR + P_LEXELEN);
                CHANGE_LEXV(_PTR
, P_LEXV[(_PTR + (2 * P_LEXELEN))]);
                P_LEXV[((_PTR * 2) + 2)
] = P_LEXV[(((_PTR + (2 * P_LEXELEN)) * 2) + 2)];
                P_LEXV[((_PTR * 2) + 3)
] = P_LEXV[(((_PTR + (2 * P_LEXELEN)) * 2) + 3)];
                P_LEN = (P_LEN - 2);
                P_LEXV[P_LEXWORDS] = (P_LEXV[P_LEXWORDS] - 2);
            }
        }
    }*/
    /*if(isT(_DOLLAR)) {
        _SUM = (_SUM * 100);
    } else if(isEQUAL(_NW, "DOLLAR", "DOLLARS")) {
        _DOLLAR = true;
        _SUM = (_SUM * 100);
    } else if(isEQUAL(_NW, "CENT", "CENTS")) {
        _DOLLAR = true;
    }*/
    if(_SUM > 9999) {
        return false;
    } else if(isT(_EXC)) {
        P_EXCHANGE = _EXC;
    } else if(isT(_TIM)) {
        P_EXCHANGE = 0;
        if(_TIM > 23) {
            return false;
        } else if(_TIM > 19) {
            
        } else if(_TIM > 12) {
            return false;
        } else if(_TIM > 7) {
            
        } else {
            _TIM = (12 + _TIM);
        }
        _SUM = (_SUM + (_TIM * 60));
    } else {
        P_EXCHANGE = 0;
    }
    /*P_DOLLAR_FLAG = _DOLLAR;*/
    P_NUMBER = _SUM;
    /*if((isT(_DOLLAR)
  &&  _SUM > 0)) {
        return "MONEY";
    }*/
    /*P_DOLLAR_FLAG = null;*/
    return "INTNUM";
}

/*function CENTS_CHECK(_PTR) {
    let _CCTR=0, _SUM=0, _CNT, _BPTR, _CHR;
    _CNT = REST(P_LEXV, (_PTR * 2))[2];
    _BPTR = REST(P_LEXV, (_PTR * 2))[3];
    while(true) {
        if(--_CNT < 0) {
            break;
        }
        _CHR = P_INBUF[_BPTR];
        if(++CCTR > 2) {
            return false;
        }
        if((_CHR < 58
  &&  _CHR > 47)) {
            _SUM = ((_SUM * 10) + (_CHR - 48));
        } else {
            return false;
        }
        ++BPTR
    }
    if(!(_SUM)) {
        return 100;
    } else if(isEQUAL(_CCTR, 1)) {
        return (10 * _SUM);
    }
    return _SUM;
}*/

"Old ORPHAN-MERGE."

/*function ORPHAN_MERGE() {
    let _CNT=-1, _TEMP, _VERB, _BEG, _END, _ADJ=null, _WRD;
    P_OFLAG = null;
    if((isEQUAL(isWT((_WRD = P_ITBL[P_VERBN][0])
, PSVERB, P1VERB)
, P_OTBL[P_VERB])
  ||  isWT(_WRD, PSADJECTIVE))) {
        _ADJ = true;
    } else /*FIX #45* /if(isWT((_WRD = P_ITBL[P_VERBN][0])
, PSADJECTIVE/*P1ADJECTIVE* /)) {
        _ADJ = true;
    } else if((isWT(_WRD, PSOBJECT/*P1OBJECT* /)
  &&  !(P_NCN))) {
        P_ITBL[P_VERB] = 0;
        P_ITBL[P_VERBN] = 0;
        P_ITBL[P_NC1] = REST(P_LEXV, 2);
        P_ITBL[P_NC1L] = REST(P_LEXV, 6);
        P_NCN = 1;
    }
    if((isT((_VERB = P_ITBL[P_VERB]))
  &&  !(_ADJ)
  &&  !(isEQUAL(_VERB, P_OTBL[P_VERB])))) {
        return false;
    } else if(isEQUAL(P_NCN, 2)) {
        return false;
    } else if(isEQUAL(P_OTBL[P_NC1], 1)) {
        if((isEQUAL((_TEMP = P_ITBL[P_PREP1])
, P_OTBL[P_PREP1])
  ||  !(_TEMP))) {
            if(isT(_ADJ)) {
                P_OTBL[P_NC1] = REST(P_LEXV, 2);
                if(!(P_ITBL[P_NC1L])) {
                    /*"? DELETE?"* /
                    P_ITBL[P_NC1L] = REST(P_LEXV, 6);
                }
                if(!(P_NCN)) {
                    /*"? DELETE?"* /
                    P_NCN = 1;
                }
            } else {
                P_OTBL[P_NC1] = P_ITBL[P_NC1];
                /*P_OTBL[P_NC1L] = P_ITBL[P_NC1L];* /
            }
            P_OTBL[P_NC1L] = P_ITBL[P_NC1L];
        } else {
            return false;
        }
    } else if(isEQUAL(P_OTBL[P_NC2], 1)) {
        if((isEQUAL((_TEMP = P_ITBL[P_PREP1])
, P_OTBL[P_PREP2])
  ||  !(_TEMP))) {
            if(isT(_ADJ)) {
                P_ITBL[P_NC1] = REST(P_LEXV, 2);
                if(!(P_ITBL[P_NC1L])) {
                    /*"? DELETE?"* /
                    P_ITBL[P_NC1L] = REST(P_LEXV, 6);
                }
            }
            P_OTBL[P_NC2] = P_ITBL[P_NC1];
            P_OTBL[P_NC2L] = P_ITBL[P_NC1L];
            P_NCN = 2;
        } else {
            return false;
        }
    } else if(isT(P_ACLAUSE)) {
        if((!(isEQUAL(P_NCN, 1))  &&  !(_ADJ))) {
            P_ACLAUSE = null;
            return false;
        } else {
            _BEG = P_ITBL[P_NC1];
            if(isT(_ADJ)) {
                _BEG = REST(P_LEXV, 2);
                _ADJ = null;
            }
            _END = P_ITBL[P_NC1L];
            while(true) {
                _WRD = _BEG[0];
                if(isEQUAL(_BEG, _END)) {
                    if(isT(_ADJ)) {
                        CLAUSE_WIN(_ADJ);
                        /*ACLAUSE_WIN(_ADJ);* /
                        break;
                    } else {
                        P_ACLAUSE = null;
                        return false;
                    }
                } else if((!(_ADJ)
  &&  (_WRD[P_PSOFF]
 & PSADJECTIVE/*"same as WT?"* /
  ||  isEQUAL(_WRD, "ALL"/*"ONE"* /
, "EVERYTHING")))) {
                    _ADJ = _WRD;
                } else /*if(isEQUAL(_WRD, "ONE")) {
                    CLAUSE_WIN(_ADJ);
                    /*ACLAUSE_WIN(_ADJ);* /
                    break;
                }* /if(_WRD[P_PSOFF] & PSOBJECT) {
                    if(isEQUAL(_WRD, P_ANAM)) {
                        CLAUSE_WIN(_ADJ);
                        /*ACLAUSE_WIN(_ADJ);* /
                    } else {
                        CLAUSE_WIN();
                        /*NCLAUSE_WIN();* /
                    }
                    break;
                }
                _BEG = REST(_BEG, P_WORDLEN);
                if(!(_END)) {
                    _END = _BEG;
                    P_NCN = 1;
                    P_ITBL[P_NC1] = BACK(_BEG, 4);
                    P_ITBL[P_NC1L] = _BEG;
                }
            }
        }
    }
    P_VTBL[0] = P_OVTBL[0];
    P_VTBL[2] = P_OVTBL[2];
    P_VTBL[3] = P_OVTBL[3];
    P_OTBL[P_VERBN] = P_VTBL;
    P_VTBL[2] = 0;
    /*(!(isEQUAL(P_OTBL[P_NC2], 0))  &&  (P_NCN = 2))* /
    while(true) {
        if(++_CNT > P_ITBLLEN) {
            P_MERGED = true;
            return true;
        }
        P_ITBL[_CNT] = P_OTBL[_CNT];
    }
}*/

"New ORPHAN-MERGE."

function ORPHAN_MERGE() {
    let _WHICH=1, _ADJ=null, _TEMP, _VERB, _BEG, _END, _WRD, _X;
    P_OFLAG = null;
    _WRD = P_ITBL[P_VERBN][0];
    _X = P_OTBL[P_VERB];
    if((isEQUAL(isWT(_WRD, PSVERB, P1VERB), _X)
  ||  isWT(_WRD, PSADJECTIVE))) {
        _ADJ = true;
    } else if((isWT(_WRD, PSOBJECT, P1OBJECT)
  &&  !(P_NCN))) {
        P_ITBL[P_VERB] = 0;
        P_ITBL[P_VERBN] = 0;
        P_ITBL[P_NC1] = REST(P_LEXV, 2);
        P_ITBL[P_NC1L] = REST(P_LEXV, 6);
        P_NCN = 1;
    }
    _VERB = P_ITBL[P_VERB];
    if((isT(_VERB)
  &&  !(_ADJ)
  &&  !(isEQUAL(_VERB, P_OTBL[P_VERB])))) {
        return false;
    } else if(isEQUAL(P_NCN, 2)) {
        return false;
    } else if(isEQUAL(P_OTBL[P_NC1], 1)) {
        _TEMP = P_ITBL[P_PREP1];
        if((!(_TEMP)
  ||  isEQUAL(_TEMP, P_OTBL[P_PREP1]))) {
            if(isT(_ADJ)) {
                P_OTBL[P_NC1] = REST(P_LEXV, 2);
                if(!(P_ITBL[P_NC1L])) {
                    P_ITBL[P_NC1L] = REST(P_LEXV, 6);
                }
                if(!(P_NCN)) {
                    P_NCN = 1;
                }
            } else {
                P_OTBL[P_NC1] = P_ITBL[P_NC1];
            }
            P_OTBL[P_NC1L] = P_ITBL[P_NC1L];
        } else {
            return false;
        }
    } else if(isEQUAL(P_OTBL[P_NC2], 1)) {
        _WHICH = 2;
        _TEMP = P_ITBL[P_PREP1];
        if((!(_TEMP)
  ||  isEQUAL(_TEMP, P_OTBL[P_PREP2]))) {
            if(isT(_ADJ)) {
                P_ITBL[P_NC1] = REST(P_LEXV, 2);
                if(!(P_ITBL[P_NC1L])) {
                    P_ITBL[P_NC1L] = REST(P_LEXV, 6);
                }
            }
            P_OTBL[P_NC2] = P_ITBL[P_NC1];
            P_OTBL[P_NC2L] = P_ITBL[P_NC1L];
            P_NCN = 2;
        } else {
            return false;
        }
    } else if(isT(P_ACLAUSE)) {
        if((!(isEQUAL(P_NCN, 1))
  &&  !(_ADJ))) {
            P_ACLAUSE = null;
            return false;
        } else {
            if(!(isEQUAL(P_ACLAUSE, P_NC1))) {
                _WHICH = 2;
            }
            _BEG = P_ITBL[P_NC1];
            if(isT(_ADJ)) {
                _BEG = REST(P_LEXV, 2);
                _ADJ = null;
            }
            _END = P_ITBL[P_NC1L];
            while(true) {
                _WRD = _BEG[0];
                if(isEQUAL(_BEG, _END)) {
                    if(isT(_ADJ)) {
                        CLAUSE_WIN(_ADJ);
                        break;
                    } else {
                        P_ACLAUSE = null;
                        return false;
                    }
                } else if((isEQUAL(_WRD, "ALL", "EVERYTHING", "ONE")
                ||  isEQUAL(_WRD, "BOTH")
                ||  (VOCAB2[_WRD][0] & PSADJECTIVE/*"same as WT?"*/
                &&  !(_ADJ)
/*ADJ_CHECK(_WRD, _ADJ, _ADJ)*/))) {
                    _ADJ = _WRD;
                } else if(isEQUAL(_WRD, "ONE")) {
                    CLAUSE_WIN(_ADJ);
                    break;
                } else if((VOCAB2[_WRD][0] & PSOBJECT
                  &&  isEQUAL(REST(_BEG, P_WORDLEN), _END))) {
                    if(isEQUAL(_WRD, P_ANAM)) {
                        CLAUSE_WIN(_ADJ);
                    } else {
                        CLAUSE_WIN();
                    }
                    break;
                }
                _BEG = REST(_BEG, P_WORDLEN);
                if(!(_END)) {
                    _END = _BEG;
                    P_NCN = 1;
                    P_ITBL[P_NC1] = BACK(_BEG, 4);
                    P_ITBL[P_NC1L] = _BEG;
                }
            }
        }
    }
    P_VTBL[0] = P_OVTBL[0];
    P_VTBL[2] = P_OVTBL[2];
    P_VTBL[3] = P_OVTBL[3];
    P_OTBL[P_VERBN] = P_VTBL;
    P_VTBL[2] = 0;
    /*(!(isEQUAL(P_OTBL[P_NC2], 0))
  &&  (P_NCN = 2))*/

    /*_CNT = -1;*/
    /*while(true) {
        if(++_CNT > P_ITBLLEN) {
            P_MERGED = true;
            return true;
        }
        P_ITBL[_CNT] = P_OTBL[_CNT];
    }*/

    COPYT(P_OTBL, P_ITBL, P_ITBLLEN);
    P_MERGED = _WHICH;
    return true;
}

"ACLAUSE- and NCLAUSE-WIN are replaced by CLAUSE-WIN."

/*function ACLAUSE_WIN(_ADJ) {
    let _X;
    P_ITBL[P_VERB] = P_OTBL[P_VERB];
    _X = (P_ACLAUSE + 1);
    CLAUSE_COPY(P_OTBL, P_OTBL, P_ACLAUSE, _X, P_ACLAUSE, _X, _ADJ);
    (isT(P_OTBL[P_NC2])  &&  (P_NCN = 2))
    P_ACLAUSE = null;
    return true;
}*/

/*function NCLAUSE_WIN() {
    CLAUSE_COPY(P_ITBL, P_OTBL, P_NC1, P_NC1L
, P_ACLAUSE, (P_ACLAUSE + 1));
    (isT(P_OTBL[P_NC2])  &&  (P_NCN = 2))
    P_ACLAUSE = null;
    return true;
}*/

function CLAUSE_WIN(_ADJ=null, _X) {
    if(isT(_ADJ)) {
        P_LASTADJ = _ADJ;
        P_ITBL[P_VERB] = P_OTBL[P_VERB];
    } else {
        _ADJ = true;
    }

    _X = P_OCL2;
    if(isEQUAL(P_ACLAUSE, P_NC1)) {
        _X = P_OCL1;
    }
    CLAUSE_COPY(P_OTBL, P_OTBL, P_ACLAUSE, (P_ACLAUSE + 1), _X, _ADJ);

    /*CLAUSE_COPY(P_OTBL, P_OTBL, P_ACLAUSE, (P_ACLAUSE + 1)
, (isEQUAL(P_ACLAUSE, P_NC1)     ? (P_OCL1)
     : P_OCL2
), _ADJ);*/

    if(!(isEQUAL(P_OTBL[P_NC2], 0))) {
        P_NCN = 2;
    }
    P_ACLAUSE = null;
    return true;
}

"Print undefined word in input. PTR points to the unknown word in P-LEXV"

function WORD_PRINT(_CNT, _BUF) {
    /*if(_BUF > 1) {
        while(true) {
            if(--_CNT < 0) {
                return false;
            }
            PRINTC(P_INBUF[_BUF]);
            ++_BUF
        }
    }*/
    for (let c of _CNT) PRINTC(c);
    return false;
}

const LAST_BAD_LEN = 13;
const LAST_BAD = ITABLE(LAST_BAD_LEN, [BYTE], 0);

function UNKNOWN_WORD(_PTR) {
    let _CNT=0, _MSG, _LEN, _OFFSET, _CHAR;
    OOPS_TABLE[O_PTR] = _PTR;
    _MSG = PICK_NEXT(UNKNOWN_MSGS);
    TELL("[", _MSG[0], P_LEXV[_PTR].toLowerCase(), _MSG[1], "]", CR);
    _OFFSET = REST(P_LEXV, (_PTR));
    _LEN = _OFFSET[2];    /*"Length of word typed."* /
    _OFFSET = _OFFSET[3];    /*"Starting offset into P-INBUF."* /
    if(_OFFSET > 1) {
        while(true) {
            if(--_LEN < 0) {
                break;
            }
            _CHAR = P_INBUF[_OFFSET];
            PRINTC(_CHAR);
            ++_OFFSET
            if(_CNT < (LAST_BAD_LEN - 1)) {
                ++_CNT
                LAST_BAD[_CNT] = _CHAR;
            }
        }
    }
    LAST_BAD[0] = _CNT;
    TELL(_MSG[1], "]", CR);*/
    QUOTE_FLAG = null;
    P_OFLAG = null;
    const bad = P_LEXV[_PTR].slice(0, LAST_BAD_LEN-1);
    LAST_BAD[0] = bad.length;
    for (let i = 0; i < LAST_BAD_LEN - 1;i++)
        LAST_BAD[i+1] = bad[i] ? bad[i] : 0;

    return true;
}

` Perform syntax matching operations, using P-ITBL as the source of
   the verb and adjectives for this input.  Returns false if no
   syntax matches, and does it's own orphaning.  If return is true,
   the syntax is saved in P-SYNTAX.`

const P_SYNLEN = 8;
const P_SBITS = 0;
const P_SPREP1 = 1;
const P_SPREP2 = 2;
const P_SFWIM1 = 3;
const P_SFWIM2 = 4;
const P_SLOC1 = 5;
const P_SLOC2 = 6;
const P_SACTION = 7;
const P_SONUMS = 3;

function SYNTAX_CHECK() {
    let _DRIVE1=null, _DRIVE2=null, _SYN, _LEN, _NUM, _OBJ, _PREP, _VERB, _X, _Y;
    _VERB = P_ITBL[P_VERBN][0];
    if(!(_VERB)) {
        NOT_IN_SENTENCE("any verbs");
        return false;
    }
    let _SYN_ORIGINAL = SYNTAX_TABLE[_VERB];
    let i = 0;
    _LEN = _SYN_ORIGINAL[0];
    _SYN = REST(_SYN_ORIGINAL);
    while(true) {
        _NUM = (_SYN[P_SBITS] & P_SONUMS); // Number of objects required for syntax
        _PREP = P_ITBL[P_PREP1]; // 1st Preposition in INPUT
        _X = _SYN[P_SPREP1]; // 1st Preposition in Syntax
        if(P_NCN > _NUM) {
        } else /*Added 4/27/83*/if((!(_NUM < 1) &&  !(P_NCN)  &&  isEQUAL(_PREP, 0, _X))) {
            _DRIVE1 = _SYN;
        } else if(isEQUAL(_X, P_ITBL[P_PREP1])) { // Syntax and INPUT has same 1st preposition
            if((isEQUAL(_NUM, 2) &&  isEQUAL(P_NCN, 1))) {
                _DRIVE2 = _SYN;
            } else if(isEQUAL(_SYN[P_SPREP2], P_ITBL[P_PREP2])) { // Syntax and INPUT has same 2nd preposition
                P_SYNTAX = _SYN;
                PRSA = _SYN[P_SACTION];
                return true;
            }
        }
        if(--_LEN < 1) {
            if((isT(_DRIVE1)  ||  isT(_DRIVE2))) {
                break;
            }
            DONT_UNDERSTAND();
            return false;
        }
        _SYN = REST(_SYN_ORIGINAL, P_SYNLEN * (++i) + 1);
    }
    if(isT(_DRIVE1)) {
        _X = _DRIVE1[P_SFWIM1];
        _Y = _DRIVE1[P_SLOC1];
        _OBJ = GWIM(_X, _Y, _DRIVE1[P_SPREP1]);
        if(isT(_OBJ)) {
            P_PRSO[P_MATCHLEN] = 1;
            P_PRSO[1] = _OBJ;
            P_SYNTAX = _DRIVE1;
            PRSA = _DRIVE1[P_SACTION];
            return true;
        }
    }
    /*_X = _DRIVE1[P_SFWIM1];*/
    /*_Y = _DRIVE1[P_SLOC1];*/
    /*_OBJ = GWIM(_X, _Y, _DRIVE1[P_SPREP1]);*/
    /*if((isT(_DRIVE1)
  &&  isT(_OBJ))) {
        P_PRSO[P_MATCHLEN] = 1;
        P_PRSO[1] = _OBJ;
        P_SYNTAX = _DRIVE1;
        PRSA = _DRIVE1[P_SACTION];
        return true;
    }*/
    /*_OBJ = GWIM(_DRIVE2[P_SFWIM2]
, _DRIVE2[P_SLOC2]
, _DRIVE2[P_SPREP2]);*/
    if(isT(_DRIVE2)) {
        _X = _DRIVE2[P_SFWIM2];
        _Y = _DRIVE2[P_SLOC2];
        _OBJ = GWIM(_X, _Y, _DRIVE2[P_SPREP2]);
        if(isT(_OBJ)) {
            P_PRSI[P_MATCHLEN] = 1;
            P_PRSI[1] = _OBJ;
            P_SYNTAX = _DRIVE2;
            PRSA = _DRIVE2[P_SACTION];
            return true;
        }
    } else /*if((isT(_DRIVE2)
  &&  isT(_OBJ))) {
        P_PRSI[P_MATCHLEN] = 1;
        P_PRSI[1] = _OBJ;
        P_SYNTAX = _DRIVE2;
        PRSA = _DRIVE2[P_SACTION];
        return true;
    }*/if(isEQUAL(_VERB, ACTFIND/*ACTWHAT*/)) {
        DO_IT_YOURSELF();
        return false;
    }
    if(isEQUAL(WINNER, PLAYER)) {
        ORPHAN(_DRIVE1, _DRIVE2);
        TELL("[Wh");
    } else {
        TELL("[Your command wasn't complete. Next time, type wh");
    }
    if(isEQUAL(_VERB, ACTWALK, ACTGO)) {
        TELL("ere");
    } else if(((isT(_DRIVE1)
  &&  isEQUAL(_DRIVE1[P_SFWIM1], PERSON))
  ||  (isT(_DRIVE2)
  &&  isEQUAL(_DRIVE2[P_SFWIM2], PERSON)))) {
        TELL("om");
    } else {
        TELL("at");
    }
    if(isEQUAL(WINNER, PLAYER)) {
        TELL(" do you want");
    } else {
        TELL(" you want ", THE(WINNER));
    }
    TELL(STO);
    VERB_PRINT();
    if(isT(_DRIVE2)) {
        CLAUSE_PRINT(P_NC1, P_NC1L);
    }
    P_END_ON_PREP = null;
    PREP_PRINT((isT(_DRIVE1)
     ? (_DRIVE1[P_SPREP1])
     : _DRIVE2[P_SPREP2]
));
    if(isEQUAL(WINNER, PLAYER)) {
        P_OFLAG = true;
        TELL("?]", CR);
    } else {
        P_OFLAG = null;
        TELL(".]", CR);
    }
    return false;
}

function VERB_PRINT() {
    let _TMP, _X;
    _TMP = P_ITBL[P_VERBN];    /*"? ,P-OTBL?"*/
    if(!(_TMP)) {
        TELL(B("TELL"));
    } else if(!(P_VTBL[2])) {
        PRINTB(_TMP[0]);
    } else {
        //_X = _TMP[2];
        //WORD_PRINT(_X, _TMP[3]);
        WORD_PRINT(_TMP[0]);
        P_VTBL[2] = 0;
    }
}

function ORPHAN(_D1, _D2) {
    if(!(P_MERGED)) {
        P_OCL1[P_MATCHLEN] = 0;
        P_OCL2[P_MATCHLEN] = 0;
    }
    P_OVTBL[0] = P_VTBL[0];
    P_OVTBL[2] = P_VTBL[2];
    P_OVTBL[3] = P_VTBL[3];

    /*_CNT = -1;*/
    /*while(true) {
        if(++_CNT > P_ITBLLEN) {
            break;
        }
        P_OTBL[_CNT] = P_ITBL[_CNT];
    }*/

    COPYT(P_ITBL, P_OTBL, P_ITBLLEN);
    if(isEQUAL(P_NCN, 2)) {
        CLAUSE_COPY(P_ITBL, P_OTBL, P_NC2, P_NC2L, P_OCL2);
    }
    if(!(P_NCN < 1)) {
        CLAUSE_COPY(P_ITBL, P_OTBL, P_NC1, P_NC1L, P_OCL1);
    }
    if(isT(_D1)) {
        P_OTBL[P_PREP1] = _D1[P_SPREP1];
        P_OTBL[P_NC1] = 1;
    } else if(isT(_D2)) {
        P_OTBL[P_PREP2] = _D2[P_SPREP2];
        P_OTBL[P_NC2] = 1;
    }
    return true;
}

function CLAUSE_PRINT(_BPTR, _EPTR, _isTHE=true) {
    let _X;
    _X = P_ITBL[_BPTR];
    BUFFER_PRINT(_X, P_ITBL[_EPTR], _isTHE);
    return false;
}

function BUFFER_PRINT(_BEG, _END, _CP) {
    let _NOSP=null, _WRD, _isFIRST=true, _PN=null, _LEN;
    while(true) {
        if(isEQUAL(_BEG, _END)) {
            break;
        }
        _WRD = _BEG[0];
        if(isEQUAL(_WRD, "$BUZZ")) {
            
        } else if(isEQUAL(_WRD, ",")) {
            TELL(", ");
        } else if(isT(_NOSP)) {
            _NOSP = null;
        } else {
            PRINTC(SP);
        }
        if(((isEQUAL(_WRD, "HIM")
  &&  !(isVISIBLE(P_HIM_OBJECT)))
  ||  (isEQUAL(_WRD, "HER")
  &&  !(isVISIBLE(P_HER_OBJECT)))
  ||  (isEQUAL(_WRD, "THEM")
  &&  !(isVISIBLE(P_THEM_OBJECT))))) {
            _PN = true;
        }
        _LEN = CAPS[0];
        if((isEQUAL(_WRD, ".", ",", "$BUZZ")
  ||  ((isWT(_WRD, PSBUZZ_WORD)
  ||  isWT(_WRD, PSPREPOSITION))
  &&  !(isWT(_WRD, PSADJECTIVE))
  &&  !(isWT(_WRD, PSOBJECT))))) {
            _NOSP = true;
        } else if(isEQUAL(_WRD, "ME")) {
            PRINT_TABLE(CHARNAME);
            _PN = true;
        //} else if((_LEN = isINTBL(_WRD, REST(CAPS, 2), _LEN))) {
        } else if(CAPS.slice(2).includes(_WRD)) {
            CAPITALIZE(_BEG);
            _PN = true;
        } else {
            _LEN = _BEG[3];
            if((isT(_isFIRST)
  &&  !(_PN)
  &&  isT(_CP))) {
                TELL(LTHE);
            }
            if((isT(P_OFLAG)
  ||  isT(P_MERGED))) {
                PRINTB(_WRD);
            } else if((isEQUAL(_WRD, "IT")
  &&  isVISIBLE(P_IT_OBJECT))) {
                TELL(D(P_IT_OBJECT));
            } else if((isEQUAL(_WRD, "HER")
  &&  !(_PN))) {
                TELL(D(P_HER_OBJECT));
            } else if((isEQUAL(_WRD, "THEM")
  &&  !(_PN))) {
                TELL(D(P_THEM_OBJECT));
            } else if((isEQUAL(_WRD, "HIM")
  &&  !(_PN))) {
                TELL(D(P_HIM_OBJECT));
            } else {
                WORD_PRINT(_BEG[0].toLowerCase(), _LEN);
            }
            _isFIRST = null;
        }
        _BEG = REST(_BEG, P_WORDLEN);
    }
}

function isADD_CAP(_WRD) {
    const pos = CAPS.indexOf(-1);
    if (pos > 0) {
        CAPS[pos] = _WRD;
        return true;
    }
    return false;
}

function CAPITALIZE(_PTR) {
    if((isT(P_OFLAG)
  ||  isT(P_MERGED))) {
        PRINTB(_PTR[0]);
    } else {
        WORD_PRINT(_PTR[0][0].toUpperCase() + _PTR[0].slice(1).toLowerCase());
    }
}

function PREP_PRINT(_PREP, _isSP=true) {
    let _WRD;
    if((isT(_PREP)
    &&  !(P_END_ON_PREP))) {
        if(isT(_isSP)) {
            TELL(C(SP));
        }
        _WRD = _PREP;//PREP_FIND(_PREP);
        PRINTB(_WRD.toLowerCase());
        if((isEQUAL("SIT", P_ITBL[P_VERBN][0])
        &&  isEQUAL("DOWN", _WRD))) {
            TELL(" on");
        }
        if((isEQUAL("GET", P_ITBL[P_VERBN][0])
        &&  isEQUAL("OUT", _WRD))) {
            /*"Will it ever work? --SWG"*/
            TELL(" of");
        }
        return true;
    }
}

"Old CLAUSE-COPY."

/*var P_OCLAUSE/*TABLE* / = ITABLE(NONE, 25);;*/

/*function CLAUSE_COPY(_SRC, _DEST, _SRCBEG, _SRCEND, _DESTBEG, _DESTEND, _INSRT=null) {
    let _BEG, _END;
    _BEG = _SRC[_SRCBEG];
    _END = _SRC[_SRCEND];
    _DEST[_DESTBEG
] = REST(P_OCLAUSE
, ((P_OCLAUSE[P_MATCHLEN] * P_LEXELEN) + 2));
    while(true) {
        if(isEQUAL(_BEG, _END)) {
            _DEST[_DESTEND
] = REST(P_OCLAUSE
, (2 + (P_OCLAUSE[P_MATCHLEN] * P_LEXELEN)));
            break;
        } else {
            if((isT(_INSRT)
  &&  isEQUAL(P_ANAM, _BEG[0]))) {
                CLAUSE_ADD(_INSRT);
            }
            CLAUSE_ADD(_BEG[0]);
        }
        _BEG = REST(_BEG, P_WORDLEN);
    }
}*/

"Pointers used by CLAUSE-COPY (source/destination beginning/end pointers)."

/*const CC_SBPTR = 0;*/
/*const CC_SEPTR = 1;*/
/*const CC_OCLAUSE = 2;*/

/*var P_CCTBL = [0, 0, 0, 0, 0];*/

function CLAUSE_COPY(_SRC, _DEST, _BB, _EE, _OCL, _INSRT=null) {
    let _FLG=null, _BEG, _END, _OBEG, _CNT, _B, _E, _X;
    _BEG = _SRC[_BB];
    _END = _SRC[_EE];
    _OBEG = _OCL[P_MATCHLEN];
    /*if((isT(_INSRT)
  &&  isEQUAL(_BEG, REST(_OCL, 2)))) {
        _OBEG = 0;
        _FLG = true;
    }*/
    while(true) {
        if(isEQUAL(_BEG, _END)) {
            break;
        }
        if((isT(_INSRT)
  &&  isEQUAL(P_ANAM, _BEG[0]))) {
            /*_B = P_ITBL[P_NC1];*/
            /*_E = P_ITBL[P_NC1L];*/
            /*if(isT(_FLG)) {
                while(true) {
                    _CNT = 0;
                    if(isEQUAL(_INSRT, true)) {
                        _BEG[0] = _B[0];
                        _BEG[1] = 0;
                        _B = REST(_B, P_WORDLEN);
                        while(true) {
                            if(isEQUAL(_B, _E)) {
                                break;
                            }
                            _B = REST(_B, P_WORDLEN);
                            _CNT = (_CNT + 1);
                        }
                    } else {
                        _CNT = 1;
                    }
                    if(_CNT > 0) {
                        _X = (_CNT * 2);
                        _OCL[P_MATCHLEN
] = (_OCL[P_MATCHLEN] + _X);
                        if((!(isEQUAL(_BEG, _END))
  &&  !(isEQUAL(REST(_BEG, P_WORDLEN)
, _END)))) {
                            _B = BACK(_END, P_WORDLEN);
                            _E = REST(_END, ((_CNT - 1)
 * P_WORDLEN));
                            while(true) {
                                _E[0] = _B[0];
                                _E[1] = _B[1];
                                if(isEQUAL(_B, _BEG)) {
                                    break;
                                }
                                _B = BACK(_B, P_WORDLEN);
                                _E = BACK(_E, P_WORDLEN);
                                if(isEQUAL(_B, _BEG)) {
                                    break;
                                }
                            }
                        }
                        _END = REST(_END, (_CNT * P_WORDLEN));
                        _B = P_ITBL[P_NC1];
                        _E = P_ITBL[P_NC1L];
                        if(isEQUAL(_INSRT, true)) {
                            _B = REST(_B, P_WORDLEN);
                            _BEG = REST(_BEG, P_WORDLEN);
                            while(true) {
                                if(isEQUAL(_B, _E)) {
                                    break;
                                }
                                _BEG[0] = _B[0];
                                _BEG[1] = 0;
                                _B = REST(_B, P_WORDLEN);
                                _BEG = REST(_BEG, P_WORDLEN);
                            }
                        } else {
                            _BEG[P_LEXELEN] = P_ANAM;
                            _BEG[(P_LEXELEN + 1)] = 0;
                            _BEG[0] = _INSRT;
                            _BEG[1] = 0;
                        }
                    }
                }
                break;
            } else if(isEQUAL(_INSRT, true)) {
                while(true) {
                    if(isEQUAL(_B, _E)) {
                        break;
                    }
                    CLAUSE_ADD(_B[0], _OCL);
                    _B = REST(_B, P_WORDLEN);
                }
            } else {
                if(!(isEQUAL(_INSRT, _OCL[1]))) {
                    CLAUSE_ADD(_INSRT, _OCL);
                }
                CLAUSE_ADD(P_ANAM, _OCL);
            }*/
            if(isEQUAL(_INSRT, true)) {
                _B = P_ITBL[P_NC1];
                _E = P_ITBL[P_NC1L];
                while(true) {
                    if(isEQUAL(_B, _E)) {
                        break;
                    }
                    CLAUSE_ADD(_B[0], _OCL);
                    _B = REST(_B, P_WORDLEN);
                }
            } else {
                if(!(isEQUAL(_INSRT, _OCL[1]))) {
                    CLAUSE_ADD(_INSRT, _OCL);
                }
                CLAUSE_ADD(P_ANAM, _OCL);
            }
        } else /*if(!(_FLG)) {
            CLAUSE_ADD(ZGET(_BEG, 0), _OCL);
        }*/{
            CLAUSE_ADD(_BEG[0], _OCL);
        }
        _BEG = REST(_BEG, P_WORDLEN);
    }
    _CNT = (_OCL[P_MATCHLEN] - _OBEG);
    if((/*isEQUAL(_SRC, _DEST)*/
/*!(_FLG)*/
_OBEG > 0
  &&  isT(_CNT))) {
        _OCL[P_MATCHLEN] = 0;
        _OBEG = (_OBEG + 1);
        while(true) {
            CLAUSE_ADD(_OCL[_OBEG], _OCL);
            _CNT = (_CNT - 2);
            if(!(_CNT)) {
                break;
            }
            _OBEG = (_OBEG + 2);
        }
        _OBEG = 0;
    }
    _DEST[_BB] = REST(_OCL, ((_OBEG * P_LEXELEN) + 1));
    _DEST[_EE] = REST(_OCL, ((_OCL[P_MATCHLEN] * P_LEXELEN) + 1));
    return true;
}

/*function CLAUSE_ADD(_WRD, _TBL) {
    let _PTR;
    _PTR = (_TBL[P_MATCHLEN] + 2);
    _TBL[(_PTR - 1)] = _WRD;
    _TBL[_PTR] = 0;
    _TBL[P_MATCHLEN] = _PTR;
    return false;
}*/

function CLAUSE_ADD(_WRD, _TBL) {
    let _PTR;
    _PTR = _TBL[P_MATCHLEN];
    ++_PTR
    _TBL[_PTR] = _WRD;
    ++_PTR
    _TBL[_PTR] = 0;
    _TBL[P_MATCHLEN] = _PTR;
    return false;
}

function PREP_FIND(_PREP) {
    let _CNT=0, _SIZE;
    _SIZE = (PREPOSITIONS[0] * 2);
    while(true) {
        if(++_CNT > _SIZE) {
            return false;
        } else if(isEQUAL(PREPOSITIONS[_CNT], _PREP)) {
            return PREPOSITIONS[(_CNT - 1)];
        }
    }
}

/**
 * GWIM = Get What I Mean
 */
function GWIM(_GBIT, _LBIT, _PREP) {
    let _OBJ=null;
    if(isEQUAL(_GBIT, LOCATION)) {
        return ROOMS;
    } else if((!(isEQUAL(P_IT_OBJECT, null, NOT_HERE_OBJECT))
  &&  isIS(P_IT_OBJECT, _GBIT))) {
        if((isEQUAL(_GBIT, TAKEABLE)
  &&  isIN(P_IT_OBJECT, PLAYER))) {
            
        } else {
            _OBJ = P_IT_OBJECT;
        }
    } else if((!(isEQUAL(P_HIM_OBJECT, null, NOT_HERE_OBJECT))
  &&  isIS(P_HIM_OBJECT, _GBIT))) {
        _OBJ = P_HIM_OBJECT;
    } else if((!(isEQUAL(P_HER_OBJECT, null, NOT_HERE_OBJECT))
  &&  isIS(P_HER_OBJECT, _GBIT))) {
        _OBJ = P_HER_OBJECT;
    } else if((!(isEQUAL(P_THEM_OBJECT, null, NOT_HERE_OBJECT))
  &&  isIS(P_THEM_OBJECT, _GBIT))) {
        _OBJ = P_THEM_OBJECT;
    }
    if(isT(_OBJ)) {
        TELL("[", THE(_OBJ), BRACKET);
        return _OBJ;
    }
    P_GWIMBIT = _GBIT;
    P_SLOCBITS = _LBIT;
    P_MERGE[P_MATCHLEN] = 0;
    if(GET_OBJECT(P_MERGE, null)) {
        P_GWIMBIT = 0;
        if(isEQUAL(P_MERGE[P_MATCHLEN], 1)) {
            _OBJ = P_MERGE[1];
            if((isEQUAL(WINNER, PLAYER)
  &&  !(isEQUAL(_OBJ, HANDS)))) {
                TELL("[");
                if(PREP_PRINT(_PREP, null)) {
                    PRINTC(SP);
                }
                TELL(THE(_OBJ), BRACKET);
            }
            return _OBJ;
        }
        return false;
    } else if(isEQUAL(_GBIT, WIELDED)) {
        P_GWIMBIT = 0;
        return HANDS;
    } else {
        P_GWIMBIT = 0;
        return false;
    }
}

function SNARF_OBJECTS() {
    let _PTR;
    _PTR = P_ITBL[P_NC1];
    if(isT(_PTR)) {
        P_PHR = 0;
        P_SLOCBITS = P_SYNTAX[P_SLOC1];
        if(!(SNARFEM(_PTR, P_ITBL[P_NC1L], P_PRSO))) {
            return false;
        }
        if(P_BUTS[P_MATCHLEN]) {
            P_PRSO = BUT_MERGE(P_PRSO);
        }
    }
    _PTR = P_ITBL[P_NC2];
    if(isT(_PTR)) {
        P_PHR = 1;
        P_SLOCBITS = P_SYNTAX[P_SLOC2];
        if(!(SNARFEM(_PTR, P_ITBL[P_NC2L], P_PRSI))) {
            return false;
        }
        if(P_BUTS[P_MATCHLEN]) {
            if(isEQUAL(P_PRSI[P_MATCHLEN], 1)) {
                P_PRSO = BUT_MERGE(P_PRSO);
                return true;
            }
            P_PRSI = BUT_MERGE(P_PRSI);
        }
    }
    return true;
}

function BUT_MERGE(_TBL) {
    let _LEN, _BUTLEN, _CNT=1, _MATCHES=0, _OBJ, _NTBL, _X;
    _LEN = _TBL[P_MATCHLEN];
    P_MERGE[P_MATCHLEN] = 0;
    while(true) {
        if(--_LEN < 0) {
            break;
        }
        _OBJ = _TBL[_CNT];
        //_X = REST(P_BUTS, 2);
        //if(!((_X = isINTBL(_OBJ, _X, P_BUTS[0])))) {
        if(!P_BUTS.slice(1).includes(_OBJ)) {
            /*P_MERGE[(_MATCHES + 1)] = _OBJ;*/
            /*_MATCHES = (_MATCHES + 1);*/
            ++_MATCHES
            P_MERGE[_MATCHES] = _OBJ;
        }
        ++_CNT
    }
    P_MERGE[P_MATCHLEN] = _MATCHES;
    _NTBL = P_MERGE;
    P_MERGE = _TBL;
    return _NTBL;
}

"Grabs the first adjective, unless it comes across a special-cased adjective."

/*function ADJ_CHECK(_WRD, _ADJ, _NW=null) {
    if(!(_ADJ)) {
        return true;
    } else if(ZMEMQ(_WRD, CHAR_POSS_TABLE)) {
        return true;
    }
}*/

function SNARFEM(_PTR, _EPTR, _TBL) {
    let _BUT=null, _LEN, _WV, _WRD, _NW, _isWAS_ALL=null, _ONEOBJ;
    /*"Next SETG 6/21/84 for WHICH retrofix"*/
    P_AND = null;
    if(isEQUAL(P_GETFLAGS, P_ALL)) {
        _isWAS_ALL = true;
    }
    P_GETFLAGS = 0;
    P_BUTS[P_MATCHLEN] = 0;
    _TBL[P_MATCHLEN] = 0;
    _WRD = _PTR[0];
    while(true) {
        if(isEQUAL(_PTR, _EPTR)) {
            _WV = GET_OBJECT((_BUT  ||  _TBL));
            if(isT(_isWAS_ALL)) {
                P_GETFLAGS = P_ALL;
            }
            return _WV;
        } else {
            if(isEQUAL(_EPTR, REST(_PTR, P_WORDLEN))) {
                _NW = 0;
            } else {
                _NW = _PTR[P_LEXELEN];
            }
            if(isEQUAL(_WRD, "ALL", "BOTH", "EVERYTHING")) {
                P_GETFLAGS = P_ALL;
                if(isEQUAL(_NW, "OF")) {
                    _PTR = REST(_PTR, P_WORDLEN);
                }
            } else if(isEQUAL(_WRD, "BUT", "EXCEPT")) {
                if(!(GET_OBJECT((_BUT  ||  _TBL)))) {
                    return false;
                }
                _BUT = P_BUTS;
                _BUT[P_MATCHLEN] = 0;
            } else if(isBUZZER_WORD(_WRD)) {
                return false;
            } else if(isEQUAL(_WRD, "A"/*"ONE"*/)) {
                if(!(P_ADJ)) {
                    P_GETFLAGS = P_ONE;
                    if(isEQUAL(_NW, "OF")) {
                        _PTR = REST(_PTR, P_WORDLEN);
                    }
                } else {
                    P_NAM = _ONEOBJ;
                    if(!(GET_OBJECT((_BUT  ||  _TBL)))) {
                        return false;
                    }
                    if(!(_NW)) {
                        return true;
                    }
                }
            } else if((isEQUAL(_WRD, "AND", ",")
              &&  !(isEQUAL(_NW, "AND", ",")))) {
                /*"Next SETG 6/21/84 for WHICH retrofix"*/
                P_AND = true;
                if(!(GET_OBJECT((_BUT  ||  _TBL)))) {
                    return false;
                }
            } else if(isWT(_WRD, PSBUZZ_WORD)) {
                
            } else if(isEQUAL(_WRD, "AND", ",")) {
                
            } else if(isEQUAL(_WRD, "OF")) {
                if(!(P_GETFLAGS)) {
                    P_GETFLAGS = P_INHIBIT;
                }
            } else if((isWT(_WRD, PSADJECTIVE)
            &&  !(P_ADJ)
            &&  !(isEQUAL(_NW, "OF")))) {
                /*"FIX #41"*/
                P_ADJ = _WRD;
            } else if(isWT(_WRD, PSOBJECT/*P1OBJECT*/)) {
                P_NAM = _WRD;
                _ONEOBJ = _WRD;
            }
        }
        if(!(isEQUAL(_PTR, _EPTR))) {
            _PTR = REST(_PTR, P_WORDLEN);
            _WRD = _NW;
        }
    }
}

const SH = 128;
const SC = 64;
const SIR = 32;
const SOG = 16;
const STAKE = 8;
const SMANY = 4;
const SHAVE = 2;

function GET_OBJECT(_TBL, _VRB=true) {
    let _GCHECK=null, _OLEN=0, _BTS, _LEN, _XBITS, _TLEN, _OBJ, _ADJ, _X, _XTBL, _TTBL, _TOBJ;
    _XBITS = P_SLOCBITS;
    _TLEN = _TBL[P_MATCHLEN];
    if(P_GETFLAGS & P_INHIBIT) {
        return true;
    }
    _ADJ = P_ADJ;
    if((!(P_NAM)
  &&  isT(P_ADJ))) {
        if(isWT(P_ADJ, PSOBJECT)) {
            P_NAM = P_ADJ;
            P_ADJ = null;
        } else if((_BTS = isWT(P_ADJ, PSDIRECTION, P1DIRECTION))) {
            P_ADJ = null;
            _TBL[P_MATCHLEN] = 1;
            _TBL[1] = INTDIR;
            P_DIRECTION = _BTS;
            return true;
        }
    }
    if((!(P_NAM)
  &&  !(P_ADJ)
  &&  !(isEQUAL(P_GETFLAGS, P_ALL))
  &&  !(P_GWIMBIT))) {
        if(isT(_VRB)) {
            NOT_IN_SENTENCE("enough nouns");
        }
        return false;
    }
    if((!(isEQUAL(P_GETFLAGS, P_ALL))
  ||  !(P_SLOCBITS))) {
        P_SLOCBITS = -1;
    }
    P_TABLE = _TBL;
    while(true) {
        if(isT(_GCHECK)) {
            GLOBAL_CHECK(_TBL);
        } else {
            DO_SL(HERE, SOG, SIR);
            DO_SL(WINNER, SH, SC);
        }
        _LEN = (_TBL[P_MATCHLEN] - _TLEN);
        if(P_GETFLAGS & P_ALL) {
            
        } else if((isT(_LEN)
  &&  P_GETFLAGS & P_ONE)) {
            if(_LEN > 1) {
                _TBL[1] = _TBL[RANDOM(_LEN)];
                TELL("[How about ", THE(_TBL[1]), "?]", CR);
            }
            _TBL[P_MATCHLEN] = 1;
        } else if((_LEN > 1
  ||  (!(_LEN)
  &&  !(isEQUAL(P_SLOCBITS, -1))))) {
            if(isEQUAL(P_SLOCBITS, -1)) {
                P_SLOCBITS = _XBITS;
                _OLEN = _LEN;
                _TBL[P_MATCHLEN] = (_TBL[P_MATCHLEN] - _LEN);
                continue;
            } else {
                P_NAMW[P_PHR] = P_NAM;
                P_ADJW[P_PHR] = P_ADJ;
                if(!(_LEN)) {
                    _LEN = _OLEN;
                }
                if((isT(P_NAM)
  &&  (_OBJ = _TBL[(_TLEN + 1)]))) {
                    _TTBL = REST(_TBL, (_TLEN * 2));
                    _TOBJ = _TTBL[0];
                    _TTBL[0] = _LEN;
                    _OBJ = APPLY(GETP(_OBJ, "GENERIC"), _TTBL);
                    _TTBL[0] = _TOBJ;
                    if(isT(_OBJ)) {
                        if(isEQUAL(_OBJ, NOT_HERE_OBJECT)) {
                            return false;
                        }
                        _X = (_TLEN + 1);
                        _TBL[_X /*(_TLEN + 1)*/ ] = _OBJ;
                        _TBL[P_MATCHLEN] = _X /*(_TLEN + 1)*/ ;
                        P_NAM = null;
                        P_ADJ = null;
                        return true;
                    }
                }
                if((isT(_VRB)
  &&  !(isEQUAL(WINNER, PLAYER)))) {
                    DONT_UNDERSTAND();
                    return false;
                } else if((isT(_VRB)
  &&  isT(P_NAM))) {
                    _XTBL = P_OCL2;
                    if(isEQUAL(_TBL, P_PRSO)) {
                        _XTBL = P_OCL1;
                    }
                    if(isVERB(V_NAME)) {
                        MORE_SPECIFIC();
                    } else if(_XTBL[0] > 22) {
                        _XTBL[0] = 0;
                        NYMPH_APPEARS();
                        TELL("Parser overflow! Please try something else");
                        PRINT(". Bye!\"|  She disappears with a wink.|");
                    } else {
                        WHICH_PRINT(_TLEN, _LEN, _TBL);
                        P_ACLAUSE = P_NC2;
                        if(isEQUAL(_TBL, P_PRSO)) {
                            P_ACLAUSE = P_NC1;
                        }
                        P_ANAM = P_NAM;
                        ORPHAN(null, null);
                        P_OFLAG = true;
                    }
                } else if(isT(_VRB)) {
                    NOT_IN_SENTENCE("enough nouns");
                }
                P_NAM = null;
                P_ADJ = null;
                return false;
            }
        } else if(isT(P_OFLAG)) {
            return false;
        } else if((!(_LEN)
  &&  isT(_GCHECK))) {
            P_NAMW[P_PHR] = P_NAM;
            P_ADJW[P_PHR] = P_ADJ;
            if(isT(_VRB)) {
                P_SLOCBITS = _XBITS;                /*"RETROFIX #33"*/
                OBJ_FOUND(NOT_HERE_OBJECT, _TBL);
                P_XNAM = P_NAM;
                P_NAM = null;
                P_XADJ = P_ADJ;
                P_ADJ = null;
                if(!(isLIT)) {
                    TOO_DARK();
                }
                return true;
            }
            P_NAM = null;
            P_ADJ = null;
            return false;
        } else if(!(_LEN)) {
            _GCHECK = true;
            continue;
        }
        _X = _TBL[(_TLEN + 1)];
        if((isT(P_ADJ)
  &&  !(P_NAM)
  &&  isT(_X))) {
            TELL("[", THE(_X), BRACKET);
        }
        P_SLOCBITS = _XBITS;
        P_NAMW[P_PHR] = P_NAM;
        P_ADJW[P_PHR] = P_ADJ;
        P_NAM = null;
        P_ADJ = null;
        return true;break;
    }
}

var P_MOBY_FOUND = null;

/*var P_MOBY_FLAG = null;*//*"Needed only for ZIL"*/

"This MOBY-FIND works in ZIP only!"

const LAST_OBJECT/*OBJECT*/ = 0;

function MOBY_FIND(_TBL) {
    let _OBJ, _LEN, _NAM, _ADJ, _X;
    _OBJ = 1;
    _NAM = P_NAM;
    _ADJ = P_ADJ;
    P_NAM = P_XNAM;
    P_ADJ = P_XADJ;
    _TBL[P_MATCHLEN] = 0;
    while(true) {
        const OBJ = ObjectTree.getObjects()[_OBJ];
        if((!(isIN(OBJ, ROOMS))  &&  isTHIS_IT(OBJ))) {
            OBJ_FOUND(OBJ, _TBL);
        }
        if(++_OBJ > LAST_OBJECT) {
            break;
        }
    }
    _LEN = _TBL[P_MATCHLEN];
    if(isEQUAL(_LEN, 1)) {
        P_MOBY_FOUND = _TBL[1];
    }
    P_NAM = _NAM;
    P_ADJ = _ADJ;
    return _LEN;
}

"This MOBY-FIND works in both ZIL and ZIP."

/*function MOBY_FIND(_TBL) {
    let _OBJ=1, _LEN, _FOO, _NAM, _ADJ;
    _NAM = P_NAM;
    _ADJ = P_ADJ;
    P_NAM = P_XNAM;
    P_ADJ = P_XADJ;
    /*if(isT(DEBUG)) {
        TELL("[MOBY-FIND called, P-NAM = ", B(P_NAM), "]", CR);
    }* /
    _TBL[P_MATCHLEN] = 0;
    if(isGASSIGNED(ZILCH)) {
        /*"ZIP case"* /
        while(true) {
            while(true) {
                if((/*(_FOO = META_LOC(_OBJ, true))* /
!(isIN(_OBJ, ROOMS))
  &&  (_FOO = isTHIS_IT(_OBJ)))) {
                    _FOO = OBJ_FOUND(_OBJ, _TBL);
                }
                if(++OBJ > LAST_OBJECT) {
                    break;
                }
            }break;
        }
    } else {
        /*"ZIL case"* /
        while(true) {
            P_SLOCBITS = -1;
            if((_FOO = isFIRST(ROOMS))) {
                while(true) {
                    SEARCH_LIST(_FOO, _TBL, P_SRCALL, true);
                    if(!((_FOO = isNEXT(_FOO)))) {
                        break;
                    }
                }
            }
            DO_SL(LOCAL_GLOBALS, 1, 1, _TBL, true);
            SEARCH_LIST(ROOMS, _TBL, P_SRCTOP, true);break;
        }
    }
    if(isEQUAL((_LEN = _TBL[P_MATCHLEN]), 1)) {
        P_MOBY_FOUND = _TBL[1];
    }
    P_NAM = _NAM;
    P_ADJ = _ADJ;
    return _LEN;
}*/

var WHICH_PRINTING/*FLAG*/ = null;

function WHICH_PRINT(_TLEN, _LEN, _TBL) {
    let _OBJ, _RLEN;
    _RLEN = _LEN;
    TELL("[Which");
    if((isT(P_OFLAG)
  ||  isT(P_MERGED)
  ||  isT(P_AND))) {
        PRINTC(SP);
        if(isT(P_LASTADJ)) {
            TELL(B(P_LASTADJ), C(SP));
        }
        PRINTB(P_NAM);
    } else if(isEQUAL(_TBL, P_PRSO)) {
        CLAUSE_PRINT(P_NC1, P_NC1L, null);
    } else {
        CLAUSE_PRINT(P_NC2, P_NC2L, null);
    }
    TELL(" do you mean,");
    WHICH_PRINTING = true;
    while(true) {
        ++_TLEN
        _OBJ = _TBL[_TLEN];
        TELL(C(SP), THE(_OBJ));
        if(isEQUAL(_LEN, 2)) {
            if(!(isEQUAL(_RLEN, 2))) {
                TELL(",");
            }
            TELL(" or");
        } else if(_LEN > 2) {
            TELL(",");
        }
        if(--_LEN < 1) {
            break;
        }
    }
    WHICH_PRINTING = null;
    TELL("?]", CR);
    return true;
}

var LAST_PSEUDO_LOC/*OBJECT*/ = null;

var P_PNAM = null;
var P_PADJN = null;

var PSEUDO_PRSO/*FLAG*/ = null;"T if original PRSO was PSEUDO-OBJECT."

var PSEUDO_OBJECT = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that",
	SDESC: DESCRIBE_PSEUDO_OBJECT,
	FLAGS: [NODESC, NOARTICLE, NOALL],
	ACTION: ME_F
});

function DESCRIBE_PSEUDO_OBJECT(_OBJ) {
    if((isT(P_PNAM)
  &&  isHERE(LAST_PSEUDO_LOC))) {
        return PRINTB(P_PNAM);
    }
    
    return PRINTD(PSEUDO_OBJECT);
}

function GLOBAL_CHECK(_TBL) {
    let _LEN, _RMG, _RMGL, _CNT=0, _OBJ, _OBITS, _X;
    _LEN = _TBL[P_MATCHLEN];
    _OBITS = P_SLOCBITS;
    _RMG = GETPT(HERE, "GLOBAL");
    if(isT(_RMG)) {
        _RMGL = RMGL_SIZE(_RMG);
        while(true) {
            _OBJ = GET$B(_RMG, _CNT);
            if((_X = isFIRST(_OBJ))) {
                SEARCH_LIST(_OBJ, _TBL, P_SRCALL);
            }
            if(isTHIS_IT(_OBJ)) {
                OBJ_FOUND(_OBJ, _TBL);
            }
            if(++_CNT > _RMGL) {
                break;
            }
        }
    }
    _RMG = (GETP(HERE, "THINGS") || []).flat();
    if(isT(_RMG)) {
        _RMGL = _RMG.length;//_RMG[0];
        _CNT = 0;
        while(true) {
            if((isEQUAL(P_NAM, _RMG[(_CNT + 1)])
            &&  (!(P_ADJ)
            ||  isEQUAL(P_ADJ/*P_ADJN*/, _RMG[(_CNT + 0)])))) {
                P_PNAM = P_NAM;
                if(isT(P_ADJ)) {
                    P_PADJN = P_ADJ;
                } else {
                    P_PADJN = null;
                }
                LAST_PSEUDO_LOC = HERE;
                UNMAKE(PSEUDO_OBJECT, NOARTICLE);
                PUTP(PSEUDO_OBJECT, "ACTION", _RMG[(_CNT + 2)]);
                /*_FOO = BACK(GETPT(PSEUDO_OBJECT, "ACTION"), 5);*/
                /*_FOO[0] = P_NAM[0];*/
                /*_FOO[1] = P_NAM[1];*/
                OBJ_FOUND(PSEUDO_OBJECT, _TBL);
                break;
            }
            _CNT = (_CNT + 3);
            if(!(_CNT < _RMGL)) {
                break;
            }
        }
    }
    if(isEQUAL(_TBL[P_MATCHLEN], _LEN)) {
        P_SLOCBITS = -1;
        P_TABLE = _TBL;
        DO_SL(GLOBAL_OBJECTS, 1, 1);
        P_SLOCBITS = _OBITS;
        /*if(!(_TBL[P_MATCHLEN])) {
            if(isVERB(V_EXAMINE, V_LOOK_ON, V_LOOK_INSIDE, FIND, FOLLOW
, LEAVE, V_SEARCH, V_SMELL, WALK_TO, THROUGH
, WAIT_FOR)) {
                DO_SL(ROOMS, 1, 1);
            }
        }*/
    }
}

const P_SRCTOP = 0; // Search Top
const P_SRCALL = 1; // Search All
const P_SRCBOT = 2; // Search Bottom

/**
 * Do Search List
 */
function DO_SL(_OBJ, _BIT1, _BIT2) {
    if(P_SLOCBITS & (_BIT1 + _BIT2)) {
        SEARCH_LIST(_OBJ, P_TABLE, P_SRCALL);
    } else {
        if(P_SLOCBITS & _BIT1) {
            SEARCH_LIST(_OBJ, P_TABLE, P_SRCTOP);
        } else if(P_SLOCBITS & _BIT2) {
            SEARCH_LIST(_OBJ, P_TABLE, P_SRCBOT);
        } else {
            return true;
        }
    }
}

/**
 * Search _OBJ in the _LVL of the Object Tree,
 * and loads it in _TBL
 * 
 * @param {*} _OBJ 
 * @param {*} _TBL 
 * @param {*} _LVL 
 * @returns 
 */
function SEARCH_LIST(_OBJ, _TBL, _LVL) {
    let _X;
    if((_OBJ = isFIRST(_OBJ))) {
        while(true) {
            if((!(isEQUAL(_LVL, P_SRCBOT))
            &&  isTHIS_IT(_OBJ))) {
                OBJ_FOUND(_OBJ, _TBL);
            }
            if((/*!(isEQUAL(_LVL, P_SRCTOP))*/
            !(isEQUAL(_OBJ, WINNER, LOCAL_GLOBALS
            , GLOBAL_OBJECTS))
            &&  (_X = isFIRST(_OBJ))
            &&  isSEE_INSIDE(_OBJ)
            /*isSEE_ANYTHING_IN(_OBJ)*/)) {
                _X = P_SRCTOP;
                if(isIS(_OBJ, SURFACE)) {
                    _X = P_SRCALL;
                }
                SEARCH_LIST(_OBJ, _TBL, _X);
            }
            if(!((_OBJ = isNEXT(_OBJ)))) {
                break;
            }
        }
    }
    return false;
}

function isTHIS_IT(_OBJ) {
    let _TBL, _LEN;
    if((isT(P_NAM) && !_OBJ.SYNONYM.includes(P_NAM))){
    //&&  (!((_TBL = GETPT(_OBJ, "SYNONYM")))
    //||  !((_LEN = Math.floor(_TBL.length / 2)))
    //||  !((_LEN = isINTBL(P_NAM, _TBL, _LEN)))))) {
    //    ||  !((_LEN = _TBL.includes(P_NAM)))))) {
        return false;
    } else if(isT(P_ADJ)
    &&  (!(_TBL = GETPT(_OBJ, "ADJECTIVE"))
    ||  !_TBL.length
    //||  !((_LEN = isINTBL(P_ADJ, _TBL, _LEN)))))) {
        ||  !_TBL.includes(P_ADJ))) {
        return false;
    } else if((isT(P_GWIMBIT)
    &&  !(isIS(_OBJ, P_GWIMBIT)))) {
        return false;
    } else {
        return true;
    }
}

function OBJ_FOUND(_OBJ, _TBL) {
    let _PTR;
    _PTR = _TBL[P_MATCHLEN];
    ++_PTR
    _TBL[_PTR] = _OBJ;
    _TBL[P_MATCHLEN] = _PTR;
    return false;
}

/*function TAKE_CHECK() {
    if((ITAKE_CHECK(P_PRSO, P_SYNTAX[P_SLOC1])
  &&  ITAKE_CHECK(P_PRSI, P_SYNTAX[P_SLOC2]))) {
        return true;
    } else {
        return false;
    }
}*/

function ITAKE_CHECK(_TBL, _BITS) {
    let _PTR, _LEN, _OBJ, _L, _GOT_IT, _TOOK_IT;
    _PTR = 1;
    _LEN = _TBL[P_MATCHLEN];
    if(!(_LEN)) {
        return true;
    } else if((_BITS & SHAVE
  ||  _BITS & STAKE)) {
        while(true) {
            _OBJ = _TBL[_PTR];
            if(isEQUAL(_OBJ, IT)) {
                if(!(isACCESSIBLE(P_IT_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                }
                _OBJ = P_IT_OBJECT;
            } else if(isEQUAL(_OBJ, THEM)) {
                if(!(isACCESSIBLE(P_THEM_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                }
                _OBJ = P_THEM_OBJECT;
            } else if(isEQUAL(_OBJ, HER)) {
                if(!(isACCESSIBLE(P_HER_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                }
                _OBJ = P_HER_OBJECT;
            } else if(isEQUAL(_OBJ, HIM)) {
                if(!(isACCESSIBLE(P_HIM_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                }
                _OBJ = P_HIM_OBJECT;
            }
            if((!(isEQUAL(_OBJ, WINNER, HANDS, FEET))
  &&  !(isEQUAL(_OBJ, ME, YOU, ROOMS))
  &&  !(isEQUAL(_OBJ, INTDIR, RIGHT, LEFT))
  &&  !(isEQUAL(_OBJ, MONEY))
  &&  !(isHELD(_OBJ))
/*!(isIN(_OBJ, WINNER))*/)) {
                PRSO = _OBJ;
                _L = LOC(_OBJ);
                _GOT_IT = 0;
                _TOOK_IT = 0;
                if(!(_L)) {
                    
                } else if((isIS(_OBJ, TRYTAKE)
  &&  !(isIS(_OBJ, TAKEABLE)))) {
                    if((_BITS & SHAVE
  &&  isIN(_L, WINNER))) {
                        ++_GOT_IT
                    }
                } else /*if(!(isEQUAL(WINNER, PLAYER))) {
                    
                }*/if((!(isP_MULT)
/*_BITS & STAKE*/
  &&  isIN(_L, WINNER)
/*(isIN(_L, WINNER)
  ||  isIN(WINNER, _L))*/
  &&  ITAKE(null))) {
                    ++_GOT_IT
                    ++_TOOK_IT
                } else if((isEQUAL(_L, WINNER)
  &&  _BITS & SHAVE)) {
                    ++_GOT_IT
                }
                if((!(_GOT_IT)
  &&  _BITS & SHAVE)) {
                    WINNER_NOT_HOLDING();
                    if((isEQUAL(_LEN, _PTR)
  &&  isT(isP_MULT))) {
                        TELL("all of those things");
                    } else if(isEQUAL(_OBJ, NOT_HERE_OBJECT)) {
                        THIS_IS_IT(_OBJ);
                        TELL(D(_OBJ));
                    } else {
                        THIS_IS_IT(_OBJ);
                        if(isIS(_OBJ, PLURAL)) {
                            TELL("any ");
                        } else if(!(isIS(_OBJ, NOARTICLE))) {
                            if(isIS(_OBJ, PROPER)) {
                                TELL(LTHE);
                            } else if(isIS(_OBJ, VOWEL)) {
                                TELL("an ");
                            } else {
                                TELL("a ");
                            }
                        }
                        TELL(D(_OBJ));
                    }
                    PRINT(PERIOD);
                    return false;
                } else if((isT(_GOT_IT)
  &&  isT(_TOOK_IT)
/*_BITS & STAKE*/
  &&  isEQUAL(WINNER, PLAYER))) {
                    TAKING_OBJ_FIRST(_OBJ);
                }
            }
            if(++_PTR > _LEN) {
                return true;
            }
        }
    }
    return true;
}

function isHELD(_OBJ=PRSO) {
    let _L;
    if(!(_OBJ)) {
        return false;
    } else if(isIS(_OBJ, TAKEABLE)) {
        
    } else if(!(isIS(_OBJ, TRYTAKE))) {
        return false;
    }
    _L = LOC(_OBJ);
    if(isEQUAL(_L, null, ROOMS, GLOBAL_OBJECTS)) {
        return false;
    } else if(isEQUAL(_L, WINNER)) {
        return true;
    }
    return isHELD(_L);
}

function TAKING_OBJ_FIRST(_OBJ) {
    let _L;
    _L = LOC(_OBJ);
    TELL("[taking ", THE(_OBJ));
    if(!(isEQUAL(_L, HERE, LOC(WINNER), null))) {
        OUT_OF_LOC(_L);
    }
    TELL(" first", BRACKET);
    isSPARK(null, _OBJ);
    return false;
}

/*function ITAKE_CHECK(_TBL, _BITS) {
    let _PTR, _OBJ, _TAKEN, _L;
    _PTR = _TBL[P_MATCHLEN];
    if((isT(_PTR)
  &&  (_BITS & SHAVE
  ||  _BITS & STAKE))) {
        while(true) {
            if(--_PTR < 0) {
                break;
            }
            /*if(--_PTR < 0) {
                break;
            }* /
            _OBJ = _TBL[(_PTR + 1)];
            if(isEQUAL(_OBJ, IT)) {
                if(!(isACCESSIBLE(P_IT_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                } else {
                    _OBJ = P_IT_OBJECT;
                }
            } else if(isEQUAL(_OBJ, HER)) {
                if(!(isACCESSIBLE(P_HER_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                } else {
                    _OBJ = P_HER_OBJECT;
                }
            } else if(isEQUAL(_OBJ, HIM)) {
                if(!(isACCESSIBLE(P_HIM_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                } else {
                    _OBJ = P_HIM_OBJECT;
                }
            } else if(isEQUAL(_OBJ, THEM)) {
                if(!(isACCESSIBLE(P_THEM_OBJECT))) {
                    MORE_SPECIFIC();
                    return false;
                } else {
                    _OBJ = P_THEM_OBJECT;
                }
            }
            if((!(isHELD(_OBJ))
  &&  !(isEQUAL(_OBJ, HANDS, FEET)))) {
                PRSO = _OBJ;
                _L = LOC(_OBJ);
                if(!(_L)) {
                    _TAKEN = true;
                } else if((isIS(_OBJ, TRYTAKE)
  &&  !(isIS(_OBJ, TAKEABLE)))) {
                    _TAKEN = true;
                } else if(!(isEQUAL(WINNER, PLAYER))) {
                    _TAKEN = null;
                } else if((_BITS & STAKE
  &&  isIN(_L, WINNER)
  &&  !(isP_MULT)
  &&  ITAKE(null))) {
                    _TAKEN = null;
                } else if((_BITS & SHAVE
  &&  isEQUAL(_L, WINNER))) {
                    _TAKEN = null;
                } else {
                    _TAKEN = true;
                }
                if((isT(_TAKEN)
  &&  _BITS & SHAVE)) {
                    WINNER_NOT_HOLDING();
                    if(1 < _TBL[P_MATCHLEN]) {
                        TELL("all of those things");
                    } else if(isEQUAL(_OBJ, NOT_HERE_OBJECT)) {
                        TELL(D(NOT_HERE_OBJECT));
                    } else {
                        THIS_IS_IT(_OBJ);
                        if(isIS(_OBJ, PLURAL)) {
                            TELL("any ");
                        } else if(!(isIS(_OBJ, NOARTICLE))) {
                            TELL(LTHE);
                        }
                        TELL(D(_OBJ));
                    }
                    PRINT(PERIOD);
                    return false;
                } else if((!(_TAKEN)
  &&  isEQUAL(WINNER, PLAYER))) {
                    TELL("[taking ", THEO);
                    if(isT(_L)) {
                        OUT_OF_LOC(_L);
                    }
                    TELL(" first", BRACKET);
                    isSPARK(null);
                }
            }
        }
    } else {
        return true;
    }
}*/

function MANY_CHECK() {
    let _LOSS=null, _TMP;
    if((P_PRSO[P_MATCHLEN] > 1
  &&  !(P_SYNTAX[P_SLOC1] & SMANY))) {
        _LOSS = 1;
    } else if((P_PRSI[P_MATCHLEN] > 1
  &&  !(P_SYNTAX[P_SLOC2] & SMANY))) {
        _LOSS = 2;
    }
    if(isT(_LOSS)) {
        PRINTC('\['.charCodeAt(0));
        TELL(CANT, "refer to more than one object at a time with \"");
        _TMP = P_ITBL[P_VERBN];
        if(!(_TMP)) {
            TELL(B("TELL"));
        } else if((isT(P_OFLAG)
         ||  isT(P_MERGED))) {
            PRINTB(_TMP[0]);
        } else {
            //WORD_PRINT(_TMP[2], _TMP[3]);
            WORD_PRINT(_TMP[0]);
        }
        TELL(".\"]", CR);
        return false;
    } else {
        return true;
    }
}

function SAY_IF_HERE_LIT() {
    isLIT = isIS_LIT();
    if(!(isLIT)) {
        P_CONT = null;
        OLD_HERE = null;
        P_WALK_DIR = null;
        RELOOK(true);
    }
    return true;
}

function LIGHT_ROOM_WITH(_SOURCE) {
    MAKE(_SOURCE, LIGHTED);
    isREPLACE_ADJ(_SOURCE, "DARK", "LIGHTED");
    if(isT(isLIT)) {
        return false;
    } else if(isVISIBLE(_SOURCE)) {
        isLIT = true;
        P_CONT = null;
        OLD_HERE = null;
        CRLF();
        V_LOOK();
        return true;
    } else {
        return false;
    }
}

function isIS_LIT(_RM=HERE, _RMBIT=true) {
    let _LIT=0, _OHERE;
    if((isT(isALWAYS_LIT)
  &&  isEQUAL(WINNER, PLAYER))) {
        return true;
    }
    P_GWIMBIT = LIGHTED;
    _OHERE = HERE;
    HERE = _RM;
    if((isT(_RMBIT)
  &&  isIS(_RM, LIGHTED))) {
        ++_LIT
    } else {
        P_MERGE[P_MATCHLEN] = 0;
        P_TABLE = P_MERGE;
        P_SLOCBITS = -1;
        if(isEQUAL(_OHERE, _RM)) {
            DO_SL(WINNER, 1, 1);
            if((!(isEQUAL(WINNER, PLAYER))
  &&  isIN(PLAYER, _RM))) {
                DO_SL(PLAYER, 1, 1);
            }
        }
        DO_SL(_RM, 1, 1);
        if(P_TABLE[P_MATCHLEN] > 0) {
            ++_LIT
        }
    }
    HERE = _OHERE;
    P_GWIMBIT = 0;
    return _LIT;
}

function isDONT_HAVE(_OBJ=PRSO) {
    let _L, _O;
    _L = LOC(_OBJ);
    if(!(_L)) {
        
    } else if(isEQUAL(_L, WINNER)) {
        return false;
    } else if((isIN(_L, PLAYER)
  &&  isEQUAL(WINNER, PLAYER))) {
        _O = PRSO;
        PRSO = _OBJ;
        if(ITAKE(null)) {
            TELL("[taking ", THEO);
            OUT_OF_LOC(_L);
            TELL(" first", BRACKET);
            isSPARK(null);
            PRSO = _O;
            THIS_IS_IT(PRSO);
            return false;
        }
        PRSO = _O;
        TAKE_FIRST(_OBJ, _L);
        return true;
    }
    WINNER_NOT_HOLDING();
    if(isT(_OBJ)) {
        if(isIS(_OBJ, PLURAL)) {
            TELL("any ");
        }
        TELL(THE(_OBJ));
    } else {
        TELL(D(NOT_HERE_OBJECT));
    }
    PRINT(PERIOD);
    return true;
}

function TAKE_FIRST(_OBJ1, _OBJ2) {
    TELL("You'd have to take ", THE(_OBJ1));
    OUT_OF_LOC(_OBJ2);
    TELL(SFIRST);
    return true;
}

function OUT_OF_LOC(_L) {
    TELL(C(SP));
    if(isEQUAL(_L, HERE)) {
        TELL("off the ");
        GROUND_WORD();
        return true;
    }
    if(isEQUAL(_L, PLAYER)) {
        TELL("away from you");
        return true;
    } else if(isIS(_L, LIVING)) {
        TELL("away from");
    } else if(isEQUAL(_L, ARCH)) {
        TELL("out from under");
    } else if(isIS(_L, CONTAINER)) {
        TELL("out of");
    } else if(isIS(_L, SURFACE)) {
        TELL(B("OFF"));
    } else {
        TELL(B("FROM"));
    }
    TELL(C(SP), THE(_L));
    return true;
}

function SAY_WHERE(_L) {
    if(isEQUAL(_L, PLAYER)) {
        TELL("in ", HANDS, "s");
        return true;
    } else if(isEQUAL(_L, HERE)) {
        TELL("in front of you");
        return true;
    } else if(isEQUAL(_L, MCASE, BCASE, WCASE)) {
        TELL(B("IN"));
    } else if(isIS(_L, SURFACE)) {
        TELL(B("ON"));
    } else if(isIS(_L, CONTAINER)) {
        TELL(B("IN"));
    } else {
        TELL(B("WITH"));
    }
    TELL(C(SP), THE(_L));
    return true;
}

function WINNER_NOT_HOLDING() {
    if(isEQUAL(WINNER, PLAYER)) {
        TELL("You're not holding ");
        return true;
    }
    TELL(CTHE(WINNER), " do");
    if(!(isIS(WINNER, PLURAL))) {
        TELL("es");
    }
    TELL("n't have ");
    return true;
}

var NOT_HERE_OBJECT = () => OBJECT({
	DESC: "that",
	FLAGS: [NODESC, NOARTICLE],
	ACTION: NOT_HERE_OBJECT_F
});

function NOT_HERE_OBJECT_F() {
    let _isPRSO=true, _TBL, _OBJ, _LEN;
    if((isPRSO(NOT_HERE_OBJECT)
  &&  isPRSI(NOT_HERE_OBJECT))) {
        TELL("Those things aren't here.", CR);
        return true;
    } else if(isPRSO(NOT_HERE_OBJECT)) {
        _TBL = P_PRSO;
    } else {
        _TBL = P_PRSI;
        _isPRSO = null;
    }

    if(isT(_isPRSO)) {
        if(isVERB(/*WALK_TO*//*FOLLOW*/V_FIND, V_WHO, V_WHAT, V_WHERE, V_BUY
, V_WAIT_FOR/*PHONE*/)) {
            _OBJ = FIND_NOT_HERE(_TBL, _isPRSO);
            if(isT(_OBJ)) {
                if(!(isEQUAL(_OBJ, NOT_HERE_OBJECT))) {
                    return RFATAL();
                }
            } else {
                return false;
            }
        }
    } else {
        if(isVERB(V_TELL_ABOUT, V_ASK_ABOUT, V_ASK_FOR)) {
            _OBJ = FIND_NOT_HERE(_TBL, _isPRSO);
            if(isT(_OBJ)) {
                if(!(isEQUAL(_OBJ, NOT_HERE_OBJECT))) {
                    return RFATAL();
                }
            } else {
                return false;
            }
        }
    }

    TELL(CANT);
    if(isVERB(V_LISTEN)) {
        TELL(B("HEAR"));
    } else if(isVERB(V_SMELL)) {
        TELL(B("SMELL"));
    } else {
        TELL(B("SEE"));
    }
    _LEN = CAPS[0];
    //if(!((_LEN = isINTBL(P_XNAM, REST(CAPS, 2), _LEN)))) {
    if(!CAPS.slice(2).includes(P_XNAM)) {
        TELL(" any");
    }
    NOT_HERE_PRINT(_isPRSO);
    TELL(" here.", CR);
    PCLEAR();
    return RFATAL();
}

function FIND_NOT_HERE(_TBL, _isPRSO) {
    let _M_F, _OBJ;
    _M_F = MOBY_FIND(_TBL);
    if(isEQUAL(_M_F, 1)) {
        if(isT(_isPRSO)) {
            PRSO = P_MOBY_FOUND;
            return false;
        }
        PRSI = P_MOBY_FOUND;
        return false;
    } else if((_M_F > 1
  &&  (_OBJ = _TBL[1])
  &&  (_OBJ = APPLY(GETP(_OBJ, "GENERIC"), _TBL)))) {
        if(isEQUAL(_OBJ, null, NOT_HERE_OBJECT)) {
            return true;
        } else if(isT(_isPRSO)) {
            PRSO = _OBJ;
            return false;
        }
        PRSI = _OBJ;
        return false;
    } else if(isVERB(V_ASK_ABOUT, V_TELL_ABOUT, V_ASK_FOR, V_WHO, V_WHAT, V_WHERE
, V_FIND, V_FOLLOW, V_TELL)) {
        return false;
    } else if(!(_isPRSO)) {
        TELL("You wouldn't find any");
        NOT_HERE_PRINT(_isPRSO);
        TELL(" there.", CR);
        return true;
    } else {
        return NOT_HERE_OBJECT;
    }
}

function NOT_HERE_PRINT(_isPRSO=null) {
    let _X;
    if((isT(P_OFLAG)
  ||  isT(P_MERGED))) {
        if(isT(P_XADJ)) {
            TELL(C(SP), B(P_XADJ));
        }
        if(isT(P_XNAM)) {
            TELL(C(SP), B(P_XNAM));
        }
        return false;
    } else if(isT(_isPRSO)) {
        _X = P_ITBL[P_NC1];
        BUFFER_PRINT(_X, P_ITBL[P_NC1L], null);
        return false;
    } else {
        _X = P_ITBL[P_NC2];
        BUFFER_PRINT(_X, P_ITBL[P_NC2L], null);
        return false;
    }
}

var C_OBJECT = () => OBJECT({

});

function CONTENTS(_THING=PRSO, _SAY_OR=null) {
    let _OBJ, _NXT, _is$1ST=true, _isIT=null, _isTWO=null;
    if((_OBJ = isFIRST(_THING))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if((isEQUAL(_OBJ, WINNER)
  ||  isIS(_OBJ, NODESC))) {
                MOVE(_OBJ, C_OBJECT);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                break;
            }
        }
    }
    _OBJ = isFIRST(_THING);
    if(!(_OBJ)) {
        TELL("nothing ", PICK_NEXT(YAWNS));
    } else {
        while(true) {
            if(isT(_OBJ)) {
                _NXT = isNEXT(_OBJ);
                if(isT(_is$1ST)) {
                    _is$1ST = null;
                } else {
                    if(isT(_NXT)) {
                        TELL(", ");
                    } else if(isT(_SAY_OR)) {
                        TELL(" or ");
                    } else {
                        TELL(AND);
                    }
                }
                DESCING = _OBJ;
                TELL(A(_OBJ));
                if((isEQUAL(_OBJ, GOBLET)
  &&  isIN(BFLY, _OBJ)
  &&  isIS(BFLY, LIVING))) {
                    TELL(WITH, A(BFLY));
                    PRINT(" resting on the rim");
                }
                if((isEQUAL(_THING, WINNER)
  &&  isIS(_OBJ, WIELDED))) {
                    TELL(" (wielded)");
                }
                /*if(isIS(_OBJ, LIGHTED)) {
                    TELL(" (providing light)");
                }*/
                if((!(_isIT)
  &&  !(_isTWO))) {
                    _isIT = _OBJ;
                } else {
                    _isTWO = true;
                    _isIT = null;
                }
                _OBJ = _NXT;
            } else {
                if((isT(_isIT)
  &&  !(_isTWO))) {
                    THIS_IS_IT(_isIT);
                }
                break;
            }
        }
    }
    DESCING = null;
    MOVE_ALL(C_OBJECT, _THING);
    return true;
}

function MOVE_ALL(_FROM, _TO, _EXCEPT) {
    let _OBJ, _NXT;
    if((_OBJ = isFIRST(_FROM))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            if((!(isASSIGNED(_EXCEPT))
  ||  !(isIS(_OBJ, _EXCEPT)))) {
                MOVE(_OBJ, _TO);
            }
            _OBJ = _NXT;
            if(!(_OBJ)) {
                return true;
            }
        }
    }
    return false;
}

`Note that the object to be searched is the FIRST parameter expected in this
 version of GLOBAL-IN? ... allowing optional target objects.`

function isGLOBAL_IN(_SOURCE, _OBJ1, _OBJ2, _OBJ3) {
    let _LEN, _X;
    _SOURCE = GETPT(_SOURCE, "GLOBAL");
    if(!(_SOURCE)) {
        return false;
    }
    _LEN = (_SOURCE.length / 2);
    //if((_X = isINTBL(_OBJ1, _SOURCE, _LEN))) {
    if(_SOURCE.includes(_OBJ1)) {
        return true;
    } else if(!(isASSIGNED(_OBJ2))) {
        return false;
    //} else if((_X = isINTBL(_OBJ2, _SOURCE, _LEN))) {
    } else if(_SOURCE.includes(_OBJ2)) {
        return true;
    } else if(!(isASSIGNED(_OBJ3))) {
        return false;
    //} else if((_X = isINTBL(_OBJ3, _SOURCE, _LEN))) {
    } else if(_SOURCE.includes(_OBJ3)) {
        return true;
    } else {
        return false;
    }
}

/*function isGLOBAL_IN(_OBJ1, _OBJ2) {
    let _TBL;
    _TBL = GETPT(_OBJ2, "GLOBAL");
    if(isT(_TBL)) {
        isINTBL(_OBJ1, _TBL, (_TBL.length / 2));
        /*ZMEMQ(_OBJ1, _TBL, RMGL_SIZE(_TBL));* /
    }
}*/

const AUX_TABLE_LENGTH = 82;
var AUX_TABLE/*TABLE*/ = ITABLE(AUX_TABLE_LENGTH, [BYTE], 0);;

function READ_LEXV(after) {
    let _KEY, _TBL, _LEN, _ILEN, _X, _Y, _CNT, _PTR, _DEST, _OFFSET, _PAGE_SIZE, _LAST_PAGE;
    _PAGE_SIZE = (DHEIGHT - 2);
    _LAST_PAGE = (MAX_HEIGHT - DHEIGHT);
    COPYT(P_INBUF, 0, P_INBUF_LENGTH);
    P_INBUF[0] = (P_INBUF_LENGTH - 2);
    COPYT(P_LEXV, 0, P_LEXV_LENGTH);
    P_LEXV[0] = LEXMAX;

    const loop = loop_stream();
    loop.loadPreaction(() => {
        COLOR(INCOLOR, BGND);
        READ(P_INBUF, 0, loop);
    });
    loop.loadPostaction(_KEY => {
        if(isEQUAL(_KEY, EOL, LF)) {
            DO_LEX();
            after.post(false);
            return false;
        }
        _TBL = null;
        _ILEN = P_INBUF[1];
        _DEST = REST(P_INBUF, (_ILEN + 2));
        _OFFSET = 0;
        if((_KEY > PAD0
        &&  _KEY < (PAD9 + 1))) {
            _TBL = KEYPAD(_KEY);
            if(!(_TBL[0])) {
                SOUND(S_BOOP);
                loop.again();
                return;
            }
        } else if(!(DMODE)) {
            
        } else if(isEQUAL(_KEY, CLICK1, CLICK2)) {
            _Y = LOWCORE(MSLOCY);
            _X = LOWCORE(MSLOCX);
            if(CWIDTH > 1) {
                --_X
                _X = Math.floor(_X / CWIDTH);
                ++_X
            }
            if(CHEIGHT > 1) {
                --_Y
                _Y = Math.floor(_Y / CHEIGHT);
                ++_Y
            }
            if(_Y > (MHEIGHT + 1)) {
                loop.again();
                return;
            } else if(_X < MOUSEDGE) {
                loop.again();
                return;
            }
            _TBL = CLICKED(_KEY, _Y, _X);
            if(!(_TBL)) {
                SOUND(S_BOOP);
                loop.again();
                return;
            }
        } else if(isEQUAL(_KEY, UP_ARROW, MAC_UP_ARROW)) {
            if(!(DBOX_TOP)) {
                SOUND(2);
                loop.again();
                return;
            }
            DBOX_TOP = (DBOX_TOP - _PAGE_SIZE);
            if(DBOX_TOP < 0) {
                DBOX_TOP = 0;
            }
            DISPLAY_DBOX();
            loop.again();
            return;
        } else if(isEQUAL(_KEY, DOWN_ARROW, MAC_DOWN_ARROW)) {
            _X = (DBOX_LINES - DHEIGHT);
            if((IN_DBOX & SHOWING_STATS
  ||  DBOX_TOP > _X
  ||  DBOX_TOP > (_LAST_PAGE - 1))) {
                SOUND(2);
                loop.again();
                return;
            }
            ++_X
            DBOX_TOP = (DBOX_TOP + _PAGE_SIZE);
            if(DBOX_TOP > _X) {
                DBOX_TOP = _X;
            } else if(DBOX_TOP > _LAST_PAGE) {
                DBOX_TOP = _LAST_PAGE;
            }
            DISPLAY_DBOX();
            loop.again();
            return;
        }
        if((_KEY > (F1 - 1)
  &&  _KEY < (F10 + 1))) {
            _TBL = SOFT_KEYS[(_KEY - F1)][3];
            _TBL = [_TBL.length, _TBL.length, ..._TBL.toUpperCase().split("").map(x => x.charCodeAt(0))];
            
        }
        if(!(_TBL)) {
            loop.again();
            return;
        }
        _LEN = _TBL[1];
        if(!(_LEN)) {
            SOUND(S_BOOP);
            loop.again();
            return;
        } else if(!(_ILEN)) {
            
        } else if(_LEN > ((P_INBUF_LENGTH - 6) - _ILEN)) {
            SOUND(S_BOOP);
            loop.again();
            return;
        } else if(!(isEQUAL(BACK(_DEST, 1)[0], SP))) {
            _DEST[0] = SP;
            ++_DEST
            ++_OFFSET
            BUFOUT(null);
            TELL(C(SP));
        }
        BUFOUT(null);
        SHOW_TABLE(_TBL, _LEN);
        _TBL = REST(_TBL, 2);
        _PTR = 0;
        _CNT = (_LEN - 1);
        while(true) {
            _X = _TBL[_PTR];
            if((isEQUAL(_X, EOL, LF)
  ||  isEQUAL(_X, '\|'.charCodeAt(0), '\!'.charCodeAt(0)))) {
                BUFOUT(true);
                _DEST[_PTR] = 0;
                _LEN = ((_PTR + _ILEN) + _OFFSET);
                P_INBUF[1] = _LEN;
                DO_LEX();
                after.post(false);
                return false;
            }
            _DEST[_PTR] = _X;
            if(++_PTR > _CNT) {
                break;
            }
        }
        TELL(C(SP));
        BUFOUT(true);
        _DEST[_PTR] = SP;
        ++_OFFSET
        _LEN = ((_LEN + _ILEN) + _OFFSET);
        P_INBUF[1] = _LEN;
        setTimeout(loop.again, 20);
    });
}

function DO_LEX() {
    LEX(P_INBUF, P_LEXV);
    LEX(P_INBUF, P_LEXV, VOCAB2, 1);
    COLOR(FORE, BGND);
    return false;
}

function SHOW_TABLE(_TBL, _LEN) {
    let _PTR, _CHAR;
    _PTR = 2;
    ++_LEN
    while(true) {
        _CHAR = _TBL[_PTR];
        if((isEQUAL(_CHAR, EOL, LF)
  ||  isEQUAL(_CHAR, '\|'.charCodeAt(0), '\!'.charCodeAt(0)))) {
            CRLF();
            return false;
        } else if((_CHAR > ('\a'.charCodeAt(0) - 1)
  &&  _CHAR < ('\z'.charCodeAt(0) + 1))) {
            _CHAR = (_CHAR - SP);
        }
        PRINTC(_CHAR);
        if(++_PTR > _LEN) {
            return false;
        }
    }
}

function CLICKED(_CLK, _Y, _X) {
    let _NX, _NY, _DIR, _TMP, _MX, _MY;
    /*"Zero-align X and Y."*/

    _X = (_X - MOUSEDGE - 1);
    --_Y

    /*"Get direction of mouse relative to HERE."*/

    /*`Changed per TAA.  Instead of using COMPASS, we do
	    computation.  Cardinal directions happen if one coordinate
	    is L=? half of the other.  Otherwise do nw, etc.`*/
    if((isEQUAL(_Y, MAPY)
  &&  isEQUAL(_X, MAPX))) {
        /*"We're in the same room, so check for up/down"*/
        _DIR = REST(MAP, (MAPY * MWIDTH))[MAPX];
        if(isEQUAL(_DIR, IUARROW, UARROW)) {
            _DIR = I_U;
        } else if(isEQUAL(_DIR, IDARROW, DARROW)) {
            _DIR = I_D;
        } else {
            return false;
        }
    } else {
        _NX = (_X - MAPX);
        /*"Get position relative to current"*/
        /*if(!(_NX)) {
            
        } else if(_NX > CENTERX) {
            _X = (_X - CENTERX);
        } else if(_NX < NCENTERX) {
            _X = (_X + CENTERX);
        }*/
        /*_NX = (_X + (CENTERX - MAPX));*/

        _NY = (_Y - MAPY);
        /*if(!(_NY)) {
            
        } else if(_NY > CENTERY) {
            _Y = (_Y - CENTERY);
        } else if(_NY < NCENTERY) {
            _Y = (_Y + CENTERY);
        }*/
        /*_NY = (_Y + (CENTERY - MAPY));*/

        /*_DIR = REST(COMPASS, (_NY * (MWIDTH + 1)))[_NX];*/
        /*"Get magnitude of X and Y difference"*/
        if(_NY < 0) {
            _MY = -_NY;
        } else {
            _MY = _NY;
        }
        if(_NX < 0) {
            _MX = -_NX;
        } else {
            _MX = _NX;
        }
        if((_MX === 0  &&  _MY === 0)) {
            _DIR = AMB;
        } else if((3 * _MX) <= _MY) {
            /*"X is small compared to Y, so this is N/S"*/
            if(_NY > 0) {
                /*"Mouse is below current loc"*/
                _DIR = I_SOUTH;
            } else {
                _DIR = I_NORTH;
            }
        } else if((2 * _MY) <= _MX) {
            /*"Y is small compared to X, so this is E/W"*/
            if(_NX > 0) {
                _DIR = I_EAST;
            } else {
                _DIR = I_WEST;
            }
        } else if(_NX > 0) {
            /*"Tending eastward"*/
            if(_NY > 0) {
                _DIR = I_SE;
            } else {
                _DIR = I_NE;
            }
        } else if(_NY > 0) {
            _DIR = I_SW;
        } else {
            _DIR = I_NW;
        }
    }


    if(isEQUAL(_DIR, AMB)) {
        /*"DIR ambiguous."*/
        return false;
    }

    TABLE_WALK(DIR_NAMES[_DIR]);
    return AUX_TABLE;
}

function TABLE_WALK(_WRD) {
    //AUX_TABLE[0] = 0;
    const txt = ((isEQUAL(_WRD, "AROUND") ? "WALK " : "") + _WRD + "\n").split("").map(x => x.charCodeAt(0))
    /*DIROUT(D_TABLE_ON, AUX_TABLE);
    if(isEQUAL(_WRD, "AROUND")) {
        TELL("walk ");
    }
    TELL(_WRD.split("").map(x => x.charCodeAt(0)), CR);
    DIROUT(D_TABLE_OFF);*/
    AUX_TABLE = [txt.length, txt.length, ...txt];
    //AUX_TABLE[1] = AUX_TABLE[0];
    return false;
}

function KEYPAD(_KEY) {
    let _TBL, _WRD;
    _WRD = PAD_NAMES[(_KEY - PAD1)];
    if(isEQUAL(_KEY, PAD5)) {
        _TBL = GETP(HERE, "UP");
        if(!(_TBL)) {
            
        } else if(isCHECK_EXIT(HERE, _TBL)) {
            _WRD = "UP";
        }
        _TBL = GETP(HERE, "DOWN");
        if(!(_TBL)) {
            
        } else if(isCHECK_EXIT(HERE, _TBL)) {
            if(isEQUAL(_WRD, "UP")) {
                _WRD = "AROUND";
            } else {
                _WRD = "DOWN";
            }
        }
    }
    TABLE_WALK(_WRD);
    return AUX_TABLE;
}

"PICK-ONE expects an LTABLE, with an initial element of 0."

function PICK_ONE(_TBL) {
    let _L, _CNT, _RND, _X, _RTBL;
    _L = _TBL[0];
    _CNT = _TBL[1];
    --_L
    _RTBL = REST(_TBL, 1+_CNT);
    _RND = RANDOM(_L - _CNT);
    _X = _RTBL[_RND];
    _RTBL[_RND] = _RTBL[1];
    _RTBL[1] = _X;
    ++_CNT
    if(isEQUAL(_CNT, _L)) {
        _CNT = 0;
    }
    _TBL[1] = _CNT;
    return _X;
}

"PICK-NEXT expects an LTABLE of strings, with an initial element of 2."

function PICK_NEXT(_TBL) {
    let _CNT, _STR;
    _CNT = _TBL[1];
    _STR = _TBL[_CNT];
    if(++_CNT > _TBL[0]) {
        _CNT = 2;
    }
    _TBL[1] = _CNT;
    return _STR;
}

var P_ACT = null;
var P_QWORD = null;

BUZZ("$BUZZ");

var QWORD = () => OBJECT({
	LOC: GLOBAL_OBJECTS,
	DESC: "that",
	SYNONYM: ["PPPZ"],
	FLAGS: [NOARTICLE, NODESC]
});

function isQUOTED_WORD(_PTR, _VERB=null, _NAMING=null) {
    let _WRD=0;
    if(!(_VERB)) {
        
    } else if((!(P_QWORD)
  &&  isT(_NAMING)
//  &&  isEQUAL(_VERB, ACTNAME/*ACTSAY*/))) {
    &&  isEQUAL(_VERB, V_NAME))) {
        P_QWORD = _PTR;
        _WRD = "PPPZ";
        P_LEXV.strings[_PTR] = P_LEXV[_PTR];
    }
    CHANGE_LEXV(_PTR, _WRD);
    return _WRD;
}

function isQUOTED_PHRASE(_PTR, _VERB) {
    let _is$1ST=true, _LEN, _WRD, _BPTR;
    CHANGE_LEXV(_PTR, "$BUZZ");    /*"Neutralizes W?QUOTE."*/
    _LEN = (P_LEN - 1);
    _PTR = (_PTR + P_LEXELEN);
    _BPTR = REST(P_LEXV, (_PTR));
    while(true) {
        if(_LEN < 0) {
            PCLEAR();
            TELL("[You forgot a second quote.]", CR);
            return false;
        }
        _WRD = P_LEXV[_PTR];
        if(isEQUAL(_WRD, "\"")) {
            CHANGE_LEXV(_PTR, "$BUZZ");
            return true;
        } else if(isT(_is$1ST)) {
            if(isT(_WRD) && P_LEXV.inVocab[_WRD]) {
                if(isEQUAL(_VERB, ACTSAY)) {
                    
                } else if(isEQUAL(_VERB, ACTNAME)) {
                    HOLLOW_VOICE("reserved by the Implementors");
                    return false;
                }
            } else if(isQUOTED_WORD(_PTR, _VERB, true)) {
                _is$1ST = null;
            } else {
                TELL(CANT, "see any ");
                _LEN = _BPTR[2];
                WORD_PRINT(_LEN, _BPTR[3]);
                TELL(" here.", /*" [2]"*/ CR);
                return false;
            }
        } else {
            CHANGE_LEXV(_PTR, "$BUZZ");
        }
        _PTR = (_PTR + P_LEXELEN);
        _LEN = (_LEN - 1);
    }
}

function ITS_CLOSED(_OBJ=PRSO) {
    THIS_IS_IT(_OBJ);
    TELL(CTHE(_OBJ));
    IS_ARE(_OBJ);
    TELL(B("CLOSED"), PERIOD);
    return true;
}

function REMOVE_ALL(_THING) {
    let _OBJ, _NXT;
    if((_OBJ = isFIRST(_THING))) {
        while(true) {
            _NXT = isNEXT(_OBJ);
            REMOVE(_OBJ);
            _OBJ = _NXT;
            if(!(_OBJ)) {
                return false;
            }
        }
    }
    return false;
}



function INIT_PARSER() {
    PSEUDO_OBJECT = PSEUDO_OBJECT();
    NOT_HERE_OBJECT = NOT_HERE_OBJECT();
    C_OBJECT = C_OBJECT();
    QWORD = QWORD();
}