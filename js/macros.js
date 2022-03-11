`MACROS for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

isC_ENABLED = 0;
C_ENABLED = 1;
C_DISABLED = 0;

/*TELL_TOKENS([CR, CRLF], CRLF()
, [N, NUM], NaN, PRINTN(_X)
, [D, DESC], NaN, DPRINT(_X)
, [A, AN], NaN, PRINTA(_X)
, [AO, ANO], PRINTA()
, [CA, CAN], NaN, PRINTCA(_X)
, [CAO, CANO], NaN, PRINTCA()
, [CHAR, CHR, C], NaN, PRINTC(_X)
, B, NaN, PRINTB(_X)
, THE, NaN, THE_PRINT(_X)
, CTHE, NaN, CTHE_PRINT(_X)
, THEO, THE_PRINT()
, CTHEO, CTHE_PRINT()
, THEI, THEI_PRINT()
, CTHEI, CTHEI_PRINT());*/

const toVERB = verb => typeof verb === "string" ? window["V_" + verb.replace(/\-/gi, "_")] : verb;
const toDIRECTION = dir => (dir && (typeof dir === "number")) ? savedDIRECTIONS[dir] : dir;
const toROOM = room => typeof room === "function" ? window[room.name] : room;
const toOBJECT = obj => typeof obj === "function" ? window[obj.name] : obj;

const isVERB = (..._ATMS) => _ATMS.includes(toVERB(PRSA));//MULTIFROB(PRSA, _ATMS);

const isPRSO = (..._ATMS) => _ATMS.includes(PRSO);//MULTIFROB(PRSO, _ATMS);

const isPRSI = (..._ATMS) => _ATMS.includes(PRSI);//MULTIFROB(PRSI, _ATMS);

const isHERE = (..._ATMS) => _ATMS.includes(HERE);//MULTIFROB(HERE, _ATMS);

const MULTIFROB = (_X, _ATMS) => {
    let _OO=[OR], _O=_OO, _LL=[true], _L=_LL, _ATM;
    while(true) {
        if(isEMPTY(_ATMS)) {
            return (isLENGTH(_OO, 1)
                     ? (ERROR(_X))
                     : (isLENGTH(_OO, 2)
                         ? (_OO[2])
                         : CHTYPE(_OO, FORM)
                    )
                );
        }
        while(true) {
            if(isEMPTY(_ATMS)) {
                break;
            }
            _ATM = _ATMS[1];
            _L = REST(_L.push(...[(isTYPE(_ATM, ATOM)
                ? ((_X === PRSA
                ? (PARSE((""+"V?"
            + SPNAME(_ATM))))
                : _ATM
            ))
                : _ATM
            )]));
            _ATMS = REST(_ATMS);
            if(_LL.length === 4) {
                break;
            }
        }
        _O = REST(_O.push(...[isEQUAL(_X, /*SEGMENT*/)]));
        _LL = [true];
        _L = _LL;
    }
}

/*const BSET = (_OBJ, ..._BITS) => MULTIBITS(FSET, _OBJ, _BITS);*/

/*const BCLEAR = (_OBJ, ..._BITS) => MULTIBITS(FCLEAR, _OBJ, _BITS);*/

/*const isBSET = (_OBJ, ..._BITS) => MULTIBITS(isFSET, _OBJ, _BITS);*/

/*const MULTIBITS = (_X, _OBJ, _ATMS) => {
    let _O=[], _ATM;
    while(true) {
        if(isEMPTY(_ATMS)) {
            return (isLENGTH(_O, 1)
                     ? (_O[1])
                     : (_X === isFSET
                         ? ((/*SEGMENT* /))
                         : while(true) {
    /*SEGMENT* /break;
}
                    )
                );
        }
        _ATM = _ATMS[1];
        _ATMS = REST(_ATMS);
        _O = [_X(_OBJ
, (isTYPE(_ATM, FORM)
     ? (_ATM)
     : GVAL(_ATM)
))
, /*SEGMENT* /];
    }
}*/

/*const RFATAL = () => {while(true) {
    PUSH(2);    RSTACK();break;
}};*/
const RFATAL = () => 2;

const PROB = (_BASE) => !(_BASE < RANDOM(100));

const ENABLE = (_INT) => _INT[isC_ENABLED] = 1;

const DISABLE = (_INT) => _INT[isC_ENABLED] = 0;

const GET_REXIT_ROOM = (_PT) => _PT[REXIT];

const GET_DOOR_OBJ = (_PT) => _PT[DEXITOBJ];

const GET$B = (_TBL, _PTR) => _TBL[_PTR];

const RMGL_SIZE = (_TBL) => (_TBL.length - 1);

const MAKE = (_OBJ, _FLAG) => FSET(_OBJ, _FLAG);

const UNMAKE = (_OBJ, _FLAG) => FCLEAR(_OBJ, _FLAG);

const isIS = (_OBJ, _FLAG) => isFSET(_OBJ, _FLAG);

const isT = (_TERM) => !(!(_TERM));

const ABS = (_NUM) => (_NUM < 0
     ? ((0 - _NUM))
     : _NUM
);

/*const isQUOTE = () => (!(isEQUAL(WINNER
, PLAYER))
 ? (PRINTC(34)) : null);*/

const isTHIS_PRSO = () => !(isNOW_PRSI);

const isTHIS_PRSI = () => !(!(isNOW_PRSI));

const isTOUCHING = () => TOUCHVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), TOUCHVERBS, NTOUCHES);

const isMUST_HAVE = () => HAVEVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), HAVEVERBS, NHAVES);

const isPUTTING = () => PUTVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), PUTVERBS, NUMPUTS);

const isMOVING = () => MOVEVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), MOVEVERBS, NMVERBS);

const isHURTING = () => HURTVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), HURTVERBS, NHVERBS);

const isSEEING = () => SEEVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), SEEVERBS, NSVERBS);

const isGAMEVERB = () => GAME_VERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), GAME_VERBS, NGVERBS);

const isTALKING = () => TALKVERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), TALKVERBS, NTVERBS);

const isENTERING = () => E_VERBS.slice(0, ENTER_VERBS).includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), E_VERBS, ENTER_VERBS);

const isCLIMBING_ON = () => E_VERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), E_VERBS, CLIMB_ON_VERBS);

const isEXITING = () => X_VERBS.slice(0, EXIT_VERBS).includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), X_VERBS, EXIT_VERBS);

const isCLIMBING_OFF = () => X_VERBS.includes(PRSA.name.slice(2));//isINTBL(PRSA.name.slice(2), X_VERBS, CLIMB_DOWN_VERBS);

const isREVERSEVERB = () => PRSA ? R_VERBS.includes(PRSA.name.slice(2)) : false;

const PSEUDO = (_L) => {
    [null
    , MAPF(PLTABLE, (_OBJ) => {
            _OBJ = _OBJ();

            if(_OBJ.length !== 3) {
                ERROR(BAD_THING, _OBJ);
            }

            MAPRET((_OBJ[2]
            ? (VOC(SPNAME(_OBJ[2]), NOUN)) : null)
            , (_OBJ[1]
            ? (VOC(SPNAME(_OBJ[1]), ADJECTIVE)) : null)
            , _OBJ[3]
            );
        }
        , REST(_L)
    )]
} // <= This whole mess is never used (lucky), it defines some behavior associated with the THINGS property

//PUTPROP(THINGS, PROPSPEC, PSEUDO);

const LSB = (_WRD) => (_WRD & 127);

const MSB = (_WRD) => (_WRD & 65280/*1111111100000000*/);

const PERCENT = (_X, _Y) => ((_X * _Y) / 100);

const RATIO = (_X, _Y) => ((_X * 100) / _Y);

const WINDOW = (_BITS) => (NEW_DBOX = (NEW_DBOX | _BITS));

"*** NEW EXIT MACROS ***"

const XTYPE = 0;"Exit type: MSB identifies type, LSB specifies length."
const XROOM = 1;"Exit room/function/string (depending on XTYPE)."
const XDATA = 2;"Auxiliary exit data (not used in all types of exits)."

const NO_EXIT = 256/*100000000*/;
const CONNECT = 512/*1000000000*/;
const SCONNECT = 768/*1100000000*/;
const FCONNECT = 1024/*10000000000*/;
const DCONNECT = 1280/*10100000000*/;
const SORRY_EXIT = 1536/*11000000000*/;
const X_EXIT = 1792/*11100000000*/;
const SHADOW_EXIT = 2048/*100000000000*/;
const FSORRY_EXIT = 2304/*100100000000*/;

const WALL = () => () => [NO_EXIT, 0];

const SHADOW = (_ROOM, _LEN=1) => () => [(_LEN + SHADOW_EXIT), toROOM(_ROOM)];

const TO = (_ROOM, _LEN=1) => () => [(_LEN + CONNECT), toROOM(_ROOM)];

const CROSS_TO = (_ROOM, _LEN=1) => () => [(_LEN + X_EXIT), toROOM(_ROOM)];

const SAY_TO = (_ROOM, _STR, _LEN=1) => () => [(_LEN + SCONNECT), toROOM(_ROOM), _STR];

const THRU = (_DOOR, _ROOM, _LEN=1) => () => [(_LEN + DCONNECT), toROOM(_ROOM), toOBJECT(_DOOR)];

const PER = (_FCN, _LEN=0) => () => [(_LEN + FCONNECT), _FCN];

const SORRY = (_STR) => () => [SORRY_EXIT, _STR];

const FSORRY = (_FCN, _ARG=null) => () => [FSORRY_EXIT, _FCN, _ARG];

/*const isWT = (_PTR, _BIT, _B1=5) => (_B1 > 4
     ? (_PTR[P_PSOFF] & _BIT)
     : isDO_WT(_PTR, _BIT, _B1)
);*/


