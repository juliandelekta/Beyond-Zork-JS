`CONSTANTS for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All rights reserved.`

const EOL = 13;
const LF = 10;
const SP = 32;
const EXCLAM = 33;
const QUOTATION = 34;
const PER_ = 46;
const COMMA = 44;

const DEC_20 = 1;
const APPLE_2E = 2;
const MACINTOSH = 3;
const AMIGA = 4;
const ATARI_ST = 5;
const IBM = 6;
const C128 = 7;
const C64 = 8;
const APPLE_2C = 9;
const APPLE_2GS = 10;

const MACHINES
 = PLTABLE("DEC-20"
, "Apple //e"
, "Macintosh"
, "Amiga"
, "Atari ST"
, "IBM/MS-DOS"
, "Commodore 128"
, "C64"
, "Apple //c"
, "Apple //gs"
, "Tandy Color Computer");

const F_OLD = 0;
const F_DEFAULT = 1;
const F_PICTURES = 2;
const F_NEWFONT = 3;

const S_TEXT = 0;
const S_WINDOW = 1;

const S_BEEP = 1;
const S_BOOP = 2;

const H_NORMAL = 0;
const H_INVERSE = 1;
const H_BOLD = 2;
const H_ITALIC = 4;
const H_MONO = 8;

const D_SCREEN_ON = 1;
const D_SCREEN_OFF = -1;
const D_PRINTER_ON = 2;
const D_PRINTER_OFF = -2;
const D_TABLE_ON = 3;
const D_TABLE_OFF = -3;
const D_RECORD_ON = 4;
const D_RECORD_OFF = -4;

"Color constants"

const C_SAME = 0;
const C_DEFAULT = 1;
const C_BLACK = 2;
const C_RED = 3;
const C_GREEN = 4;
const C_YELLOW = 5;
const C_BLUE = 6;
const C_MAGENTA = 7;
const C_CYAN = 8;
const C_WHITE = 9;

const BWWW = [C_BLUE, C_WHITE, C_WHITE, C_WHITE];
const BWCR = [C_BLACK, C_WHITE, C_CYAN, C_RED];
const WBBB = [C_WHITE, C_BLACK, C_BLACK, C_BLACK];
const DWWW = [C_BLACK, C_WHITE, C_WHITE, C_WHITE];
const DEFCOLORS
 = [C_DEFAULT, C_DEFAULT, C_DEFAULT, C_DEFAULT];

const ST_MONO = PLTABLE(DWWW, WBBB);

const MACHINE_COLORS
 = PLTABLE(0/*"DEC-20"*/
, 0/*"Apple //e"*/
, 0/*"Macintosh"*/
, PLTABLE(BWCR, DWWW, BWWW, WBBB)/*"Amiga"*/
//, PLTABLE(BWCR, DWWW, BWWW, WBBB)/*"Atari ST"*/
, PLTABLE(BWCR, DWWW, BWWW, WBBB,[C_BLUE, C_WHITE, C_WHITE, C_GREEN],[C_BLACK, C_WHITE, C_YELLOW, C_CYAN])/*"Atari ST More Colors"*/
, PLTABLE(DEFCOLORS
, BWWW
, [C_BLUE, C_WHITE, C_WHITE, C_GREEN]
, BWCR, DWWW, WBBB)/*"IBM"*/
, PLTABLE([C_BLACK, C_WHITE, C_YELLOW, C_CYAN]
, DWWW, WBBB, BWWW)/*"C128"*/
, 0/*"C64"*/
, 0/*"Apple //c"*/
, PLTABLE(BWCR, DWWW, BWWW, WBBB)/*"Apple //gs"*/
);

"Apple //c MouseText characters."

const APPLE_LEFT = 95;
const APPLE_RIGHT = 90;
const APPLE_HORZ = 76;

"IBM graphics chars."

const IBM_TRC = 191;
const IBM_BLC = 192;
const IBM_BRC = 217;
const IBM_TLC = 218;
const IBM_HORZ = 196;
const IBM_VERT = 179;

const DIR_HACKS = [-7, -6, 1, 8, 7, 6, -1, -8];

const I_NORTH = 0;
const I_NE = 1;
const I_EAST = 2;
const I_SE = 3;
const I_SOUTH = 4;
const I_SW = 5;
const I_WEST = 6;
const I_NW = 7;
const I_U = 8;
const I_D = 9;

const DIR_NAMES
 = [VOC("NORTH", null), VOC("NORTHEAST", null)
, VOC("EAST", null), VOC("SOUTHEAST", null)
, VOC("SOUTH", null), VOC("SOUTHWEST", null)
, VOC("WEST", null), VOC("NORTHWEST", null)
, VOC("UP", null), VOC("DOWN", null)];

const PDIR_LIST
 = ["NORTH", "NE", "EAST", "SE"
, "SOUTH", "SW", "WEST", "NW"
, "UP", "DOWN", "IN", "OUT"];

const XPDIR_LIST
 = ["SOUTH", "SW", "WEST", "NW"
, "NORTH", "NE", "EAST", "SE"
, "DOWN", "UP", "OUT", "IN"];

const UP_ARROW = 38;//129;
const DOWN_ARROW = 40;//130;
const LEFT_ARROW = 37;//131;
const RIGHT_ARROW = 39;//132;

const F1 = 133;
const F2 = 134;
const F3 = 135;
const F4 = 136;
const F5 = 137;
const F6 = 138;
const F7 = 139;
const F8 = 140;
const F9 = 141;
const F10 = 142;
const F11 = 143;
const F12 = 144;

const PAD0 = 145;
const PAD1 = 146;
const PAD2 = 147;
const PAD3 = 148;
const PAD4 = 149;
const PAD5 = 150;
const PAD6 = 151;
const PAD7 = 152;
const PAD8 = 153;
const PAD9 = 154;

const CLICK1 = 254;
const CLICK2 = 253;

const MAC_DOWN_ARROW = '\/'.charCodeAt(0);
const MAC_UP_ARROW = '\\'.charCodeAt(0);

const TCHARS
 = [[KERNEL, BYTE]
, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10
, PAD0, PAD1, PAD2, PAD3, PAD4, PAD5, PAD6, PAD7, PAD8, PAD9
, CLICK1, CLICK2, 0, 0, 0];

const FIRST_MAC_ARROW = 26;

const PAD_NAMES
 = [VOC("SOUTHWEST", null)
, VOC("SOUTH", null)
, VOC("SOUTHEAST", null)
, VOC("WEST", null)
, VOC("AROUND", null)
, VOC("EAST", null)
, VOC("NORTHWEST", null)
, VOC("NORTH", null)
, VOC("NORTHEAST", null)];

const C_TABLE_LENGTH = 100;
var C_TABLE = [];

const C_INTLEN = 4;"Length of an interrupt entry."
const C_RTN = 0;"Offset of routine name."
const C_TICK = 1;"Offset of count."

const REXIT = 0;
const UEXIT = 2;
const NEXIT = 3;
const FEXIT = 4;
const CEXIT = 5;
const DEXIT = 6;

const NEXITSTR = 0;
const FEXITFCN = 0;
const CEXITFLAG = 4;
const CEXITSTR = 1;
const DEXITOBJ = 1;
const DEXITSTR = 2;

const NEW_STATS = ITABLE(8, [BYTE], 0);
const NORMAL_RATE = 2;
const BLESSED_RATE = (NORMAL_RATE * 2);

const MIN_HIT_PROB = 50;
const MAX_HIT_PROB = 95;

const STSTR = ["EN", "ST", "DX", "IQ", "CM", "LK", "AC"];

const KEY_LABELS
 = [" F1", " F2", " F3", " F4", " F5"
, " F6", " F7", " F8", " F9", "F10"];

const APPLE_LABELS
 = ["[1]", "[2]", "[3]", "[4]", "[5]"
, "[6]", "[7]", "[8]", "[9]", "[0]"];

const SOFT_LEN = 36;
const NSOFT_LEN = -36;

const SOFT_KEYS
 = [ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)
, ITABLE((SOFT_LEN + 2), [BYTE], 0)];

const KEY_DEFAULTS
 = [PLTABLE([STRING], "look around|")
, PLTABLE([STRING], "inventory|")
, PLTABLE([STRING], "status|")
, PLTABLE([STRING], "examine")
, PLTABLE([STRING], "take")
, PLTABLE([STRING], "drop")
, PLTABLE([STRING], "attack monster|")
, PLTABLE([STRING], "again|")
, PLTABLE([STRING], "undo|")
, PLTABLE([STRING], "oops")];

const FUMBLE_NUMBER = 6;
const LOAD_ALLOWED = 30;

const NORMAL_ATTACK = 0;
const PARRYING = 1;
const THRUSTING = 2;

const YAWNS
 = LTABLE(2, "unusual", "interesting", "extraordinary", "special");

const HO_HUM
 = LTABLE(2
, "n't do anything useful"
, " accomplish nothing"
, " have no desirable effect"
, "n't be very productive"
, " serve no purpose"
, " be pointless");

const YUKS
 = LTABLE(2
, "That's impossible"
, "What a ridiculous concept"
, "You can't be serious");

const FIRMS
 = LTABLE(2, "firm", "permanent", "immovab", "secure");

const ATTACHES
 = LTABLE(2, "attached", "affixed");

const POINTLESS
 = LTABLE(2
, "There's no point in doing that"
, "That would be pointless"
, "That's a pointless thing to do");

const PUZZLES
 = LTABLE(2, "puzzl", "bewilder", "confus", "perplex");

const UNKNOWN_MSGS
 = LTABLE(2
, ["The word \""
, "\" isn't in the vocabulary that you can use."]
, ["You don't need to use the word \""
, "\" to complete this story."]
, ["This story doesn't recognize the word \""
, ".\""]);

const LIKELIES
 = LTABLE(2
, " isn't likely"
, " seems doubtful"
, " seems unlikely"
, "'s unlikely"
, "'s not likely"
, "'s doubtful");

"List of words to be capitalized."

const CAPS
 = LTABLE(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
, VOC("MR", null), VOC("MRS", null), VOC("MISS", null)
, VOC("I", null), VOC("N", null), VOC("S", null)
, VOC("E", null), VOC("W", null), VOC("ZORK", null)
, VOC("ZORKMID", null), VOC("ZORKMIDS", null), VOC("ZM", null)
, VOC("CHRISTMAS", null), VOC("XMAS", null)
, VOC("FROON", null), VOC("FROTZEN", null)
, VOC("GUILD", null), VOC("ACCARDI", null), VOC("GRUBBO", null)
, VOC("THRIFF", null), VOC("ALEXIS", null), VOC("PHEE", null)
, VOC("PHEEBOR", null), VOC("PHEEHELM", null)
, VOC("QUEEN", null), VOC("GROTE", null), VOC("CLUTCHCAKE", null)
, VOC("BOK", null), VOC("YABBA", null), VOC("SMEE", null)
, VOC("SQUIRP", null), VOC("STELLA", null), VOC("BLARN", null)
, VOC("PROSSER", null), VOC("YQUEM", null), VOC("WATKIN", null)
, VOC("JUKES", null), VOC("MACUGA", null)
, VOC("GRUESLAYER", NOUN), VOC("SKYCAR", null)
, VOC("SKYWAY", null), VOC("Y\'GAEL", null));

const VOCAB2 = {};

"Game-specific constants."

const BASE_CHAR = 79;"Base (0) character of bargraph charset."

const MARKBIT = 128;

const SHOWING_ROOM = 1;
const SHOWING_INV = 2;
const SHOWING_ALL = (SHOWING_ROOM + SHOWING_INV);
const SHOWING_STATS = 4;

const SLINE_LENGTH = 82;
const SLINE = ITABLE(SLINE_LENGTH, [BYTE], 0);

const MAX_HEIGHT = 25;
const MAX_DWIDTH = 62;
const DBOX_LENGTH = ((MAX_HEIGHT * MAX_DWIDTH) + 2);
const DBOX = ITABLE(DBOX_LENGTH, [BYTE], 0);

const MWIDTH = 17;
const MHEIGHT = 11;
const MAP_SIZE = (MWIDTH * MHEIGHT);
const MAP = ITABLE(MAP_SIZE, [BYTE], 0);

const CENTERX = Math.floor(MWIDTH / 2);
const NCENTERX = (0 - CENTERX);

const CENTERY = Math.floor(MHEIGHT / 2);
const NCENTERY = (0 - CENTERY);

const ROOMS_MAPPED_LENGTH = 46;
const ROOMS_MAPPED = ITABLE(ROOMS_MAPPED_LENGTH, [BYTE], 0);

const MAP_TOP = 1;
const MAP_BOT = (MHEIGHT - 2);
const MAP_LEFT = 256;
const MAP_RIGHT = [15, 0];

const NGVERBS = 33;"Number of GAME-VERBS."

const GAME_VERBS
 = ["INVENTORY", "STATUS", "TELL"
, "SAVE", "RESTORE", "RESTART", "UNDO", "TIME", "SCORE", "DIAGNOSE"
, "SCRIPT", "UNSCRIPT", "HELP", "MONITOR", "CASH"
, "VERSION", "QUIT", "MODE", "SETTINGS", "DEFINE"
, "VERBOSE", "BRIEF", "SUPER_BRIEF", "NOTIFY", "NAME"
, "PRIORITY_ON", "PRIORITY_OFF", "ZOOM"
, "REFRESH", "COLOR", "$VERIFY", "SPELLS", "$CREDITS"
, /*"V?$RECORD V?$UNRECORD V?$COMMAND V?$RANDOM V?$CHEAT V?$SUSS"*/];

"These verbs reverse the order of PRSO and PRSI."

const NR_VERBS = 19;
const R_VERBS
 = ["STOUCH_TO", "SASK_FOR"
, "SGIVE", "SSHOW", "SFEED", "SSELL-TO", "SBUY"
, "SHIT", "SPOINT_AT", "STHROW"
, "SWRAP", "COVER", "DIG", "DIG-UNDER", "SDIG", "SLOOK_THRU"
, "WEDGE", "SFIRE_AT", "SWING"];

const NHAVES = 23;"Number of HAVEVERBS."

const HAVEVERBS
 = ["DROP", "PUT", "PUT-ON", "GIVE", "SHOW", "FEED", "THROW", "HIT"
, "PUT-UNDER", "PUT-BEHIND", "THROW-OVER", "RELEASE"
, "TAKE-WITH", "TOUCH-TO", "OPEN", "OPEN-WITH", "CLOSE", "COVER"
, "ERASE-WITH", "POINT-AT", "SUBMERGE", "WIELD", "UNWIELD"].map(x => x.replace(/\-/, "_"));

const NTVERBS = 17;"Number of TALKVERBS."

const TALKVERBS
 = ["TELL", "TELL-ABOUT", "ASK-ABOUT", "ASK-FOR", "WHAT", "WHERE", "WHO"
, "ALARM", "HELLO", "GOODBYE", "SAY", "YELL", "THANK", "QUESTION", "REPLY"
, "LAUGH", "REQUEST"].map(x => x.replace(/\-/, "_"));

const NTOUCHES = 81;"Number of TOUCHVERBS"

const TOUCHVERBS
 = ["TAKE", "TAKE-OFF", "TAKE-WITH"
, "PUT", "PUT-ON", "PUT-UNDER", "PUT-BEHIND"
, "COVER", "EMPTY-INTO", "REACH-IN", "TOUCH-TO", "TOUCH", "HIT", "THRUST"
, "PARRY", "PUNCH", "KICK", "MOVE", "PUSH", "PUSH-TO", "PUSH-UP", "PUSH-DOWN"
, "PULL", "LOWER", "RAISE", "LOOSEN", "TURN-TO", "ADJUST", "SPIN", "TURN"
, "SHAKE", "SWING", "OPEN", "OPEN-WITH", "CLOSE", "LOCK", "UNLOCK"
, /*"V?SCREW V?UNSCREW"*/ "UPROOT"
, "PLUG-IN", "UNPLUG", "TIE", "UNTIE", "FOLD", "LAMP-ON", "LAMP-OFF"
, "WRAP-AROUND", "CUT", "RIP", "MUNG", "DIG", "DIG-UNDER"
, "FILL", "FILL-FROM"
, "DEFLATE", "BURN-WITH", "CLEAN", "CLEAN-OFF", "BLOW-INTO", "DETONATE"
, "WIND", "REPAIR", "REPLACE", "PICK", "MELT", "SQUEEZE", /*"PLAY"*/
/*"V?UNSCREW-FROM V?SCREW-WITH"*/ "GIVE", "FEED", "STAND-ON"
, "SIT", "LIE-DOWN", "EAT", "BITE", "TASTE", "DRINK", "DRINK-FROM", "POP"
, "CRANK", "SCRATCH", "SCRAPE-ON", "PEEL", "SUBMERGE"].map(x => x.replace(/\-/, "_"));

const NHVERBS = 17;"Number of HURTVERBS."

const HURTVERBS
 = ["HIT", "PUNCH", "KICK", "MUNG", "KNOCK", "KICK", "SQUEEZE", "CUT"
, "RIP", "BITE", "RAPE", "SHAKE", "UNDRESS", "DETONATE", "PUSH", "PUSH-TO"
, "PULL"].map(x => x.replace(/\-/, "_"));

const NUMPUTS = 10;"# PUTVERBS."

const PUTVERBS
 = ["DROP", "PUT", "PUT-ON", "PUT-UNDER", "PUT-BEHIND", "THROW"
, "THROW-OVER", "EMPTY", "EMPTY-INTO", "HANG-ON"].map(x => x.replace(/\-/, "_"));

const NMVERBS = 28;"Number of MOVEVERBS."

const MOVEVERBS
 = ["TAKE", "TAKE-OFF", "MOVE", "PULL", "PUSH", "PUSH-TO", "PUSH-UP"
, "PUSH-DOWN", "TURN", "RAISE", "UPROOT"
, "LOWER", "SPIN", "SHAKE", /*"PLAY"*/ "OPEN", "OPEN-WITH", "CLOSE", "ADJUST"
, "TURN-TO", "POINT-AT", "SWING", "UNPLUG", "BOUNCE"
, "PUT-UNDER", "PUT-BEHIND", "LOOK-UNDER", "LOOK-BEHIND", "CRANK"].map(x => x.replace(/\-/, "_"));

const NSVERBS = 19;"Number of SEEVERBS"
const SEEVERBS
 = ["EXAMINE", "LOOK", "LOOK-INSIDE", "LOOK-ON", "READ", "FIND"
, "SEARCH", "SHOW", "LOOK-UNDER", "LOOK-BEHIND", "LOOK-THRU"
, "LOOK-DOWN", "LOOK-UP", "READ-TO", "LOOK-OUTSIDE", "COUNT"
, "ADJUST", "POINT", "EXAMINE-IN"].map(x => x.replace(/\-/, "_"));

const ENTER_VERBS = 5;
const CLIMB_ON_VERBS = 13;
const E_VERBS
 = ["WALK-TO", "ENTER", "THROUGH", "FOLLOW", "USE"
, "CLIMB-ON", "CLIMB-UP", "CLIMB-OVER", "SIT", "RIDE"
, "STAND-ON", "LIE-DOWN", "CROSS"].map(x => x.replace(/\-/, "_"));

const EXIT_VERBS = 3;
const CLIMB_DOWN_VERBS = 5;
const X_VERBS
 = ["EXIT", "LEAVE", "ESCAPE"
, "CLIMB-DOWN", "LEAP"].map(x => x.replace(/\-/, "_"));

const D_N = 1/*1*/;
const D_NE = 2/*10*/;
const D_E = 4/*100*/;
const D_SE = 8/*1000*/;
const D_S = 16/*10000*/;
const D_SW = 32/*100000*/;
const D_W = 64/*1000000*/;
const D_NW = 128/*10000000*/;

const DBIT_LIST
 = [D_N, D_NE, D_E, D_SE, D_S, D_SW, D_W, D_NW];

const XD_N = 254/*11111110*/;
const XD_NE = 253/*11111101*/;
const XD_E = 251/*11111011*/;
const XD_SE = 247/*11110111*/;
const XD_S = 239/*11101111*/;
const XD_SW = 223/*11011111*/;
const XD_W = 191/*10111111*/;
const XD_NW = 127/*1111111*/;

const XDBIT_LIST
 = [XD_N, XD_NE, XD_E, XD_SE
, XD_S, XD_SW, XD_W, XD_NW
, XD_N, XD_NE, XD_E, XD_SE];

const D_ALL = 255;

const D_LEFT = (D_N + D_NE + D_E + D_SE + D_S);
const D_RIGHT = (D_N + D_S + D_SW + D_W + D_NW);
const D_TOP = (D_E + D_SE + D_S + D_SW + D_W);
const D_BOTTOM = (D_N + D_NE + D_E + D_W + D_NW);

"Pure border data (copied into BORDERS)."

const DEFAULT_BORDERS
 = PLTABLE([BYTE]
, (D_E + D_SE + D_S)
, D_TOP, D_TOP, D_TOP, D_TOP, D_TOP
, (D_S + D_SW + D_W)
, D_LEFT, D_ALL, D_ALL, D_ALL, D_ALL, D_ALL, D_RIGHT
, D_LEFT, D_ALL, D_ALL, D_ALL, D_ALL, D_ALL, D_RIGHT
, D_LEFT, D_ALL, D_ALL, D_ALL, D_ALL, D_ALL, D_RIGHT
, D_LEFT, D_ALL, D_ALL, D_ALL, D_ALL, D_ALL, D_RIGHT
, D_LEFT, D_ALL, D_ALL, D_ALL, D_ALL, D_ALL, D_RIGHT
, (D_N + D_NE + D_E)
, D_BOTTOM, D_BOTTOM, D_BOTTOM, D_BOTTOM, D_BOTTOM
, (D_N + D_W + D_NW));

const XLIST_NAMES
 = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"
, "Up", "Down", "In", "Out"];

const NORMAL_DHEIGHT = 9;

const XOFFS = [0, 1, 1, 1, 0, -1, -1, -1];
const YOFFS = [-1, -1, 0, 1, 1, 1, 0, -1];

const SHITCHARS
 = [124, 47, 45, 92, 124, 47, 45, 92];

const QDIRS = [0, 2, 4, 6, 0];
const ZDIRS = [3, 5, 7, 1, 3, 5];

const SETOFFS
 = [4, 4, 3, 3, 8, 0, 2, 19, 19];

const SNAMES
 = [" Display Mode "
, " Descriptions "
, " Transcripting "
, " Status Notify "
, " Map View "
, " Display Priority "
, " Combat Monitor "
, " Restore Defaults "
, " Exit "];

"Character set data."

const QMARK = 96;
const IQMARK = 126;

const TRCORNER = 71;
const BRCORNER = 72;
const BLCORNER = 73;
const TLCORNER = 74;
const TOPEDGE = 75;
const BOTEDGE = 76;
const LEDGE = 77;
const REDGE = 78;

const RDIAG = 35;
const LDIAG = 36;
const SOLID = 32;//37;
const BOT = 38;
const TOP = 39;
const LSID = 40;
const RSID = 41;
const NCON = 42;
const SCON = 43;
const ECON = 44;
const WCON = 45;
const BLC = 46;
const TLC = 47;
const TRC = 48;
const BRC = 49;
const SWCON = 50;
const NWCON = 51;
const NECON = 52;
const SECON = 53;
const ISOLID = 54;
const XCROSS = 90;
const HVCROSS = 91;

const UARROW = 92;
const DARROW = 93;
const UDARROW = 94;

const SMBOX = 95;

const MCHARS
 = [LSID, RDIAG, BOT, LDIAG, LSID, RDIAG, BOT, LDIAG];
const XCHARS
 = [NCON, NECON, ECON, SECON, SCON, SWCON, WCON, NWCON];
const NXCHARS
 = [TOP, TRC, LSID, BRC, BOT, BLC, RSID, TLC];

const IUARROW = 123;
const IDARROW = 124;
const IUDARROW = 125;

const LCAP = 88;
const RCAP = 89;

const ENDURANCE = 0;
const HP = 0;
const STRENGTH = 1;
const STR = 1;
const DEXTERITY = 2;
const DEX = 2;
const INTELLIGENCE = 3;
const IQ = 3;
const COMPASSION = 4;
const COM = 4;
const LUCK = 5;
const ARMOR_CLASS = 6;
const AC = 6;
const EXPERIENCE = 7;
const EXP = 7;

const NSTATS = 8;"Number of statistics."

const BEGINNERS_ENDURANCE = 16;
const BEGINNERS_STRENGTH = 8;
const BEGINNERS_DEXTERITY = 8;
const BEGINNERS_INTELLIGENCE = 8;
const BEGINNERS_COMPASSION = 1;
const BEGINNERS_LUCK = 25;
const NAKED_ARMOR_CLASS = 1;
const BEGINNERS_EXPERIENCE = 0;

const STATMAX = 99;"High as any statistic can go."
const READING_IQ = 40;

const WINNING_COMPASSION = -45;

const DEFAULT_STATS
 = [BEGINNERS_ENDURANCE
, BEGINNERS_STRENGTH
, BEGINNERS_DEXTERITY
, BEGINNERS_INTELLIGENCE
, BEGINNERS_COMPASSION
, BEGINNERS_LUCK
, NAKED_ARMOR_CLASS
, BEGINNERS_EXPERIENCE];


const CNAME_LEN = 7;
const BARMAR = (CNAME_LEN + 3);

const APPBOX = 18;"Width of Apple stat box."

const CNAMES
 = ["Lucky  "
, "Tank   "
, "Muscles"
, "Nimble "
, "Genius "
, "Saint  "];

const CSTATS
 = [[16, 8, 8, 8, 1, 25]
, [30, 16, 8, 1, 1, 10]
, [18, 20, 18, 4, 1, 5]
, [12, 14, 20, 4, 1, 15]
, [12, 10, 8, 16, 5, 15]
, [12, 10, 8, 8, 16, 12]
];

const INIT_POTENTIAL
 = (-6 + BEGINNERS_LUCK + BEGINNERS_COMPASSION
 + BEGINNERS_INTELLIGENCE + BEGINNERS_DEXTERITY
 + BEGINNERS_STRENGTH + BEGINNERS_ENDURANCE);
const AVERAGE = (INIT_POTENTIAL / 6);
const SPREAD = (AVERAGE / 2);

const THRESHOLDS = [9, 29, 59, 99, 149, 209, 279, 359, 449];
const MAX_LEVEL = 8;
const RANK_NAMES = ["Peasant", "Novice", "Cheater"];

/*const SAVE_NAME = PLTABLE([STRING], "BEYONDZ");*/

const CHARNAME_LENGTH = 24;
var CHARNAME = ITABLE((CHARNAME_LENGTH + 1), [BYTE], 0);

const NAMES_LENGTH = 12;

const DEFAULT_NAME_LENGTH = 13;
const DEFAULT_NAME
 = [11, ...("Frank Booth".split("")), 0];

const LABEL_WIDTH = 12;
const BAR_LABELS
 = [
, "   Endurance"
, "    Strength"
, "   Dexterity"
, "Intelligence"
, "  Compassion"
, "        Luck"
, " Armor Class"].join("");

const STAT_NAMES
 = ["endurance"
, "strength"
, "dexterity"
, "intelligence"
, "compassion"
, "luck"
, "armor class"
, "experience"];

const BORDERS = ITABLE(50, [BYTE], 0);
const MAZE_ROOMS = ITABLE(51, [BYTE], 0);


const STORAGE_SPACE = 1024;
const FREE_STORAGE = ITABLE(STORAGE_SPACE, [BYTE], 0);

const PRESENT = 6;
const MAX_ATIME = 11;


const FULL = 5;

const SUSS_WIDTH = 18;
const SUSS_HEIGHT = 5;
const SUSSY = 7;
const SUSS_STATS = ["ENDURANCE", "STRENGTH", "DEXTERITY"];