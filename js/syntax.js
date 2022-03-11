`SYNTAX for BEYOND ZORK:
 Copyright (C)1987 Infocom, Inc. All Rights Reserved.`

BUZZ("A", "AN", "THE", "ARE", "AM"/*PM*/, "AND", "OF", "THEN", "ALL", "BOTH", "EVERYTHING", "BUT", "EXCEPT", "\.", "\,", "\"", "\?", "\!"/*PRY*/, "HERE", "SOME", "SO", "PLEASE");

BUZZ("CAREFULLY", "CLOSELY", "SLOWLY", "QUICKLY", "RAPIDLY", "QUIETLY");

BUZZ("MR", "MRS", "MISS");

BUZZ("WHY", "HOW", "WHEN", "WOULD", "COULD", "SHOULD", "HAS", "AM", "IS", "WAS");

BUZZ("ZERO", "ONE", "TWO", "THREE"/*FOUR*/, "FIVE"/*SIX*/, "SEVEN", "EIGHT", "NINE", "TEN");

BUZZ("FUCK", "FUCKED", "CURSE", "GODDAMNED", "CUSS", "DAMN", "SHIT", "CRAP", "ASSHOLE", "ASS", "CUNT", "SHITHEAD", "PISS", "BASTARD", "FUCKING", "DAMNED", "PEE", "COCKSUCKER", "BITCH");

BUZZ("XYZZY", "PLUGH", "PLOVER", "YOHO", "ULYSSES", "ODYSSEUS");

VOC("SECRET", ADJ);
VOC("DEAD", ADJ);
VOC("SLEEPING", ADJ);
VOC("BEGIN", NOUN);
VOC("B", NOUN);
VOC("CLOSED", ADJ);
VOC("LIGHTED", ADJ);

PREP_SYNONYM("TO", "TOWARD", "TOWARDS");
PREP_SYNONYM("WITH", "USING");
PREP_SYNONYM("THROUGH", "THRU");
PREP_SYNONYM("ON", "ONTO", "ABOARD", "UPON");
PREP_SYNONYM("IN", "INSIDE", "INTO", "BETWEEN", "WITHIN");
PREP_SYNONYM("OUT", "OUTSIDE");
PREP_SYNONYM("UNDER", "BELOW", "BENEATH", "UNDERNEATH");
PREP_SYNONYM("AROUND", "ALONG");
PREP_SYNONYM("OVER", "ACROSS");
PREP_SYNONYM("BEHIND", "BEYOND");
PREP_SYNONYM("AGAINST", "NEAR");

/*SYNONYM("ALL", "BOTH", "EVERYTHING");*/

SYNONYM("NORTH", "N");
SYNONYM("SOUTH", "S");
SYNONYM("EAST", "E");
SYNONYM("WEST", "W");
SYNONYM("NE", "NORTHEAST");
SYNONYM("NW", "NORTHWEST");
SYNONYM("SE", "SOUTHEAST");
SYNONYM("SW", "SOUTHWEST");
SYNONYM("DOWN", "D");
SYNONYM("UP", "U");

SYNTAX(["VERBOSE"], V_VERBOSE);
SYNTAX(["BRIEF"], V_BRIEF);
SYNTAX(["SUPER"], V_SUPER_BRIEF);
VERB_SYNONYM("SUPER", "SUPERBRIEF");

SYNTAX(["MODE"], V_MODE);
SYNTAX(["DEFINE"], V_DEFINE);

SYNTAX(["PRIORITY", {find:"LOCATION", tokens: []}], V_PRIORITY_ON);
SYNTAX(["PRIORITY", "ON", {find:"LOCATION", tokens: []}], V_PRIORITY_ON);
SYNTAX(["PRIORITY", "OFF", {find:"LOCATION", tokens: []}], V_PRIORITY_OFF);

SYNTAX(["ZOOM", {find:"LOCATION", tokens: []}], V_ZOOM);

SYNTAX(["CASH"], V_CASH);
VERB_SYNONYM("CASH", "$");

SYNTAX(["I"], V_INVENTORY);
VERB_SYNONYM("I", "INVENTORY");

SYNTAX(["STATUS"], V_STATUS);
VERB_SYNONYM("STATUS", "STATS", "STAT");

SYNTAX(["DIAGNOSE", {find:"LOCATION", tokens: []}], V_DIAGNOSE);

SYNTAX(["SETTINGS"], V_SETTINGS);
SYNTAX(["REFRESH"], V_REFRESH);
SYNTAX(["MONITOR"], V_MONITOR);

SYNTAX(["QUIT"], V_QUIT);
VERB_SYNONYM("QUIT", "Q");

SYNTAX(["RESTART"], V_RESTART);

SYNTAX(["SAVE"], V_SAVE);
SYNTAX(["SAVE", {find:null, tokens: []}], V_RESCUE);
SYNTAX(["RESTORE"], V_RESTORE);

SYNTAX(["UNDO"], V_UNDO);

SYNTAX(["SCORE"], V_SCORE);

SYNTAX(["TIME"], V_TIME);
VERB_SYNONYM("TIME", "T");

SYNTAX(["SCRIPT"], V_SCRIPT);
SYNTAX(["UNSCRIPT"], V_UNSCRIPT);

SYNTAX(["VERSION"], V_VERSION);

SYNTAX(["$VERIFY"], V_$VERIFY);
/*SYNTAX(["$VERIFY", {find:null, tokens: []}], V_$VERIFY);*/
VERB_SYNONYM("$VERIFY", "$VER");

SYNTAX(["COLOR", {find:"LOCATION", tokens: []}], V_COLOR);
VERB_SYNONYM("COLOR", "COLORS");

SYNTAX(["NOTIFY"], V_NOTIFY);

/*SYNTAX(["\#RECORD"], V_$RECORD);*/
/*SYNTAX(["\#UNRECORD"], V_$UNRECORD);*/
/*SYNTAX(["\#RANDOM", {find:null, tokens: []}], V_$RANDOM);*/
/*SYNTAX(["\#COMMAND"], V_$COMMAND);*/

SYNTAX(["ANSWER", {find:"PERSON", tokens: []}], V_REPLY);

SYNTAX(["REPLY", "TO", {find:"PERSON", tokens: []}], V_REPLY);
VERB_SYNONYM("REPLY", "RESPOND");

SYNTAX(["APPLY", {find:null, tokens: ["HAVE","HELD","MANY"]}, "ON", {find:null, tokens: []}], V_PUT, PRE_PUT);
SYNTAX(["APPLY", {find:null, tokens: ["HAVE","HELD","MANY"]}, "TO", {find:null, tokens: []}], V_PUT, PRE_PUT);

SYNTAX(["ASK", {find:"PERSON", tokens: []}], V_QUESTION);
SYNTAX(["ASK", "ABOUT", {find:"PERSON", tokens: []}], V_QUESTION);
SYNTAX(["ASK", "FOR", {find:null, tokens: []}], V_REQUEST);
SYNTAX(["ASK", {find:"PERSON", tokens: []}, "ABOUT", {find:null, tokens: []}], V_ASK_ABOUT);
SYNTAX(["ASK", {find:"PERSON", tokens: []}, "FOR", {find:null, tokens: []}], V_ASK_FOR);

SYNTAX(["REQUEST", {find:null, tokens: []}], V_REQUEST);
SYNTAX(["REQUEST", {find:null, tokens: []}, "FROM", {find:"PERSON", tokens: []}], V_SASK_FOR);

SYNTAX(["SPEND", {find:"LOCATION", tokens: []}], V_SPEND);
SYNTAX(["SPEND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_SBUY);
VERB_SYNONYM("SPEND", "WASTE");

SYNTAX(["BUY", {find:null, tokens: []}], V_BUY, PRE_BUY);
SYNTAX(["BUY", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_BUY, PRE_BUY);
SYNTAX(["BUY", {find:null, tokens: []}, "FOR", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_BUY, PRE_BUY);
SYNTAX(["BUY", {find:null, tokens: []}, "FROM", {find:null, tokens: []}], V_BUY_FROM);
VERB_SYNONYM("BUY", "PURCHASE");

SYNTAX(["TRADE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "FOR", {find:null, tokens: []}], V_TRADE_FOR, PRE_TRADE_FOR);
SYNTAX(["TRADE", "FOR", {find:null, tokens: []}], V_REQUEST);
VERB_SYNONYM("TRADE", "EXCHANGE", "BARTER");

SYNTAX(["PAY", {find:null, tokens: []}], V_PAY);
SYNTAX(["PAY", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_PAY);
SYNTAX(["PAY", "FOR", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SBUY);

SYNTAX(["BRIBE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_PAY);

SYNTAX(["OFFER", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_GIVE, PRE_GIVE);
SYNTAX(["OFFER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SGIVE);
SYNTAX(["OFFER", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "FOR", {find:null, tokens: []}], V_TRADE_FOR, PRE_TRADE_FOR);


SYNTAX(["SELL", {find:null, tokens: ["HELD","CARRIED"]}], V_SELL_TO, PRE_SELL_TO);
SYNTAX(["SELL", {find:null, tokens: ["HELD","CARRIED"]}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SELL_TO, PRE_SELL_TO);
SYNTAX(["SELL", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: ["HELD","CARRIED"]}], V_SSELL_TO);
SYNTAX(["SELL", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "FOR", {find:null, tokens: []}], V_TRADE_FOR, PRE_TRADE_FOR);

SYNTAX(["QUESTION", {find:"PERSON", tokens: []}], V_QUESTION);
SYNTAX(["QUESTION", {find:"PERSON", tokens: []}, "ABOUT", {find:null, tokens: []}], V_ASK_ABOUT);
VERB_SYNONYM("QUESTION", "QUIZ", "INTERROGATE", "QUERY");

SYNTAX(["BACK"], V_WALK_AROUND);
SYNTAX(["BACK", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);

SYNTAX(["CIRCLE", {find:"LOCATION", tokens: []}], V_WALK_AROUND);

SYNTAX(["RETREAT"], V_WALK_AROUND);
SYNTAX(["RETREAT", "FROM", {find:null, tokens: []}], V_ESCAPE);
SYNTAX(["RETREAT", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);

SYNTAX(["BITE", {find:null, tokens: []}], V_BITE);

SYNTAX(["BLOW", {find:null, tokens: []}], V_BLOW_INTO);
SYNTAX(["BLOW", "IN", {find:null, tokens: []}], V_BLOW_INTO);
SYNTAX(["BLOW", "ON", {find:null, tokens: []}], V_BLOW_INTO);
SYNTAX(["BLOW", "THROUGH", {find:null, tokens: []}], V_BLOW_INTO);
SYNTAX(["BLOW", "UP", {find:null, tokens: []}], V_DETONATE);
SYNTAX(["BLOW", "OUT", {find:null, tokens: []}], V_LAMP_OFF);

SYNTAX(["BURN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_BURN_WITH);
SYNTAX(["BURN", "DOWN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_BURN_WITH);
SYNTAX(["BURN", "UP", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_BURN_WITH);
VERB_SYNONYM("BURN", "KINDLE", "COMBUST", "SCORCH", "IGNITE", "CHAR", "INCINERAT", "CREMATE");

SYNTAX(["CLEAN", {find:null, tokens: []}], V_CLEAN);
SYNTAX(["CLEAN", "OFF", {find:null, tokens: []}], V_CLEAN);
SYNTAX(["CLEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_CLEAN_OFF);
SYNTAX(["CLEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OFF", {find:null, tokens: []}], V_CLEAN_OFF);
SYNTAX(["CLEAN", "OFF", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_CLEAN_OFF);
SYNTAX(["CLEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_CLEAN_OFF);
SYNTAX(["CLEAN", "OFF", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_CLEAN_OFF);
VERB_SYNONYM("CLEAN", "SWEEP", "WIPE", "POLISH");

SYNTAX(["CLIMB", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["CLIMB", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_ON);
SYNTAX(["CLIMB", "UP", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["CLIMB", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);
SYNTAX(["CLIMB", "OVER", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_OVER);
SYNTAX(["CLIMB", "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_STAND_UNDER);
SYNTAX(["CLIMB", "IN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_ENTER);
SYNTAX(["CLIMB", "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_THROUGH);
SYNTAX(["CLIMB", "OUT", {find:"LOCATION", tokens: []}], V_EXIT);
VERB_SYNONYM("CLIMB", "CLAMBER");

SYNTAX(["SCALE", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["SCALE", "UP", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["SCALE", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);
SYNTAX(["SCALE", "OVER", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_OVER);
SYNTAX(["ASCEND", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);

SYNTAX(["DESCEND", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);

SYNTAX(["CLOSE", {find:"OPENED", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_CLOSE);
SYNTAX(["CLOSE", "OFF", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_OFF);
VERB_SYNONYM("CLOSE", "SHUT", "SLAM");

SYNTAX(["COUNT", {find:null, tokens: []}], V_COUNT);
VERB_SYNONYM("COUNT", "TALLY");

SYNTAX(["CROSS", {find:null, tokens: []}], V_CROSS);
SYNTAX(["CROSS", "OVER", {find:null, tokens: []}], V_CROSS);
VERB_SYNONYM("CROSS", "TRAVERSE");

SYNTAX(["CUT", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: ["CARRIED","HELD","HAVE"]}], V_CUT);
SYNTAX(["CUT", "UP", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: ["CARRIED","HELD","HAVE"]}], V_CUT);
SYNTAX(["CUT", "THROUGH", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: ["HELD","CARRIED","HAVE"]}], V_CUT);
SYNTAX(["CUT", "DOWN", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: ["CARRIED","HELD","HAVE"]}], V_CUT);
VERB_SYNONYM("CUT", "CHOP", "SLASH", "SLICE", "GASH"/*LACERATE*/, "CLEAVE", "SEVER", "SPLIT");

SYNTAX(["RIP", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["CARRIED","HELD","HAVE"]}], V_RIP);
SYNTAX(["RIP", "UP", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["CARRIED","HELD","HAVE"]}], V_RIP);
SYNTAX(["RIP", "THROUGH", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_RIP);
SYNTAX(["RIP", "DOWN", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["CARRIED","HELD","HAVE"]}], V_RIP);
SYNTAX(["RIP", "OFF", {find:"TAKEABLE", tokens: []}], V_TAKE, PRE_TAKE);
VERB_SYNONYM("RIP", "TEAR");

SYNTAX(["FELL", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: ["CARRIED","HELD","HAVE"]}], V_CUT);

SYNTAX(["BREAK", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE","HELD","CARRIED"]}], V_MUNG);
SYNTAX(["BREAK", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "OFF", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_MUNG);
SYNTAX(["BREAK", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE","HELD","CARRIED"]}], V_MUNG);
SYNTAX(["BREAK", "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE","HELD","CARRIED"]}], V_MUNG);
SYNTAX(["BREAK", "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE","HELD","CARRIED"]}], V_MUNG);
VERB_SYNONYM("BREAK", "DESTROY", "DAMAGE", "SMASH", "DEMOLISH", "WRECK", "CRACK"/*TRASH*/, "CRUMBLE");

SYNTAX(["DIG", "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG_UNDER, PRE_DIG_UNDER);
SYNTAX(["DIG", "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SDIG);
SYNTAX(["DIG", "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SEARCH);
SYNTAX(["DIG", "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_DIG, PRE_DIG);
SYNTAX(["DIG", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DIG, PRE_DIG);
/*VERB_SYNONYM("DIG", "EXCAVATE");*/

SYNTAX(["DRINK", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_DRINK);
SYNTAX(["DRINK", "FROM", {find:null, tokens: ["HELD","CARRIED"]}], V_DRINK_FROM);
VERB_SYNONYM("DRINK", "SIP", "GUZZLE", "IMBIBE", "QUAFF", "SWILL");

SYNTAX(["DROP", {find:null, tokens: ["HELD","MANY","HAVE"]}], V_DROP);
SYNTAX(["DROP", {find:null, tokens: ["HELD","MANY","HAVE"]}, "DOWN", {find:null, tokens: []}], V_PUT, PRE_PUT);
SYNTAX(["DROP", {find:null, tokens: ["HELD","MANY","HAVE"]}, "IN", {find:null, tokens: []}], V_PUT, PRE_PUT);
SYNTAX(["DROP", {find:null, tokens: ["HELD","MANY","HAVE"]}, "ON", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);
VERB_SYNONYM("DROP", "DUMP");

SYNTAX(["EAT", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EAT);
VERB_SYNONYM("EAT", "CONSUME", "SWALLOW", "DEVOUR", "GOBBLE", "NIBBLE"/*INGEST*/);

SYNTAX(["GNAW", "ON", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EAT);
SYNTAX(["GNAW", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EAT);

SYNTAX(["ENTER", {find:"LOCATION", tokens: []}], V_ENTER);

SYNTAX(["EXIT", {find:"LOCATION", tokens: []}], V_EXIT);
VERB_SYNONYM("EXIT", "DISMOUNT", "DEPART", "SCRAM", "WITHDRAW");

SYNTAX(["EXAMINE", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EXAMINE, PRE_EXAMINE);
SYNTAX(["EXAMINE", "IN", {find:null, tokens: ["HELD","CARRIED","IN-ROOM","ON-GROUND"]}], V_LOOK_INSIDE);
SYNTAX(["EXAMINE", "ON", {find:null, tokens: ["HELD","CARRIED","IN-ROOM","ON-GROUND"]}], V_EXAMINE, PRE_EXAMINE);
SYNTAX(["EXAMINE", "FOR", {find:null, tokens: []}], V_FIND);
SYNTAX(["EXAMINE", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "THROUGH", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LOOK_THRU);
SYNTAX(["EXAMINE", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LOOK_THRU);
SYNTAX(["EXAMINE", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EXAMINE_IN, PRE_EXAMINE_IN);
VERB_SYNONYM("EXAMINE", "X", "INSPECT", "DESCRIBE", "CHECK", "STUDY", "SURVEY", "SEE", "WATCH", "OBSERVE");

SYNTAX(["EXTINGUISH", {find:null, tokens: []}], V_LAMP_OFF);
SYNTAX(["EXTINGUISH", "OUT", {find:null, tokens: []}], V_LAMP_OFF);
VERB_SYNONYM("EXTINGUISH", "DOUSE", "QUENCH", "SNUFF");

SYNTAX(["FILL", {find:"CONTAINER", tokens: ["HELD","CARRIED"]}], V_FILL);

SYNTAX(["FILL", {find:"CONTAINER", tokens: ["HELD","CARRIED"]}, "FROM", {find:null, tokens: []}], V_FILL_FROM);
SYNTAX(["FILL", {find:"CONTAINER", tokens: ["HELD","CARRIED"]}, "WITH", {find:null, tokens: []}], V_FILL_FROM);
SYNTAX(["FILL", {find:"CONTAINER", tokens: ["HELD","CARRIED"]}, "AT", {find:null, tokens: []}], V_FILL_FROM);

SYNTAX(["SUBMERGE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SUBMERGE);
SYNTAX(["SUBMERGE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_UNDER);
SYNTAX(["SUBMERGE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_UNDER);
VERB_SYNONYM("SUBMERGE", "DIP");

SYNTAX(["RUB", {find:null, tokens: []}], V_TOUCH);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", "TOGETHER", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "WITH", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TOGETHER", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["RUB", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_STOUCH_TO);

SYNTAX(["RUB", "OUT", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_ERASE_WITH);
SYNTAX(["ERASE", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_ERASE_WITH);

SYNTAX(["FIND", {find:null, tokens: []}], V_FIND);
VERB_SYNONYM("FIND", "SEEK", "DISCOVER");

SYNTAX(["HUNT", {find:null, tokens: []}], V_FIND);
SYNTAX(["HUNT", "FOR", {find:null, tokens: []}], V_FIND);

SYNTAX(["DETONATE", {find:null, tokens: []}], V_DETONATE);
VERB_SYNONYM("DETONATE", "EXPLODE");

SYNTAX(["SET", "DOWN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_DROP);
SYNTAX(["SET", "ASIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_UNWIELD);
SYNTAX(["SET", "OFF", {find:null, tokens: []}], V_DETONATE);
SYNTAX(["SET", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);

SYNTAX(["FACE", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "AT", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["FACE", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["FACE", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);

SYNTAX(["UNWIELD", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_UNWIELD);

SYNTAX(["FLY", {find:"LOCATION", tokens: []}], V_FLY);
SYNTAX(["FLY", "UP", {find:"LOCATION", tokens: []}], V_FLY_UP);
SYNTAX(["FLY", "DOWN", {find:"LOCATION", tokens: []}], V_FLY_DOWN);
SYNTAX(["FLY", "ON", {find:null, tokens: []}], V_FLY);
SYNTAX(["FLY", "WITH", {find:null, tokens: []}], V_FLY);
SYNTAX(["FLY", "OVER", {find:null, tokens: []}], V_FLY);

SYNTAX(["BANK", {find:"LOCATION", tokens: []}], V_BANK);
SYNTAX(["BANK", "TO", {find:null, tokens: []}], V_BANK);

SYNTAX(["LAND"], V_LAND);
SYNTAX(["LAND", "ON", {find:null, tokens: []}], V_LAND_ON);

SYNTAX(["REFUSE", {find:null, tokens: []}], V_REFUSE);

SYNTAX(["FOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_FOLD);
SYNTAX(["FOLD", "UP", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_FOLD);
SYNTAX(["FOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AROUND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_WRAP_AROUND);
SYNTAX(["FOLD", {find:null, tokens: []}, "IN", {find:null, tokens: []}], V_SWRAP);
SYNTAX(["FOLD", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWRAP);
VERB_SYNONYM("FOLD", "WRAP");

SYNTAX(["FOLLOW", {find:null, tokens: []}], V_FOLLOW);
VERB_SYNONYM("FOLLOW", "PURSUE", "CHASE");

/*SYNTAX(["HANG", "UP", {find:"LOCATION", tokens: []}], V_HANGUP);*/

SYNTAX(["HANG", {find:null, tokens: []}], V_HANG);
SYNTAX(["HANG", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_HANG_ON);
SYNTAX(["HANG", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "FROM", {find:null, tokens: []}], V_HANG_ON);
SYNTAX(["HANG", "UP", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_HANG_ON);
VERB_SYNONYM("HANG", "HOOK");

SYNTAX(["SUSPEND", {find:null, tokens: []}], V_HANG);
SYNTAX(["SUSPEND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_HANG_ON);
SYNTAX(["SUSPEND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "FROM", {find:null, tokens: []}], V_HANG_ON);

SYNTAX(["HAND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:"LIVING", tokens: ["IN-ROOM","ON-GROUND"]}], V_GIVE, PRE_GIVE);
SYNTAX(["HAND", {find:"LIVING", tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SGIVE);
VERB_SYNONYM("HAND", "GIVE", "DONATE", "DELIVER", "BESTOW", "PRESENT");

SYNTAX(["SHOW", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:"LIVING", tokens: ["IN-ROOM","ON-GROUND"]}], V_SHOW, PRE_SHOW);
SYNTAX(["SHOW", {find:"LIVING", tokens: []}, {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SSHOW);
VERB_SYNONYM("SHOW", "DISPLAY");

SYNTAX(["FEED", {find:"LIVING", tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SFEED);
SYNTAX(["FEED", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:"LIVING", tokens: ["ON-GROUND","IN-ROOM"]}], V_FEED, PRE_FEED);
SYNTAX(["FEED", {find:"LIVING", tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SFEED);

SYNTAX(["HEAR", {find:null, tokens: []}], V_LISTEN);

SYNTAX(["HELLO", {find:"LOCATION", tokens: []}], V_HELLO);
VERB_SYNONYM("HELLO", "HI", "GREETINGS", "GREET", "SALUTE");

SYNTAX(["BYE", {find:"LOCATION", tokens: []}], V_GOODBYE);
VERB_SYNONYM("BYE", "GOODBYE", "FAREWELL");

SYNTAX(["HINT"], V_HELP);
VERB_SYNONYM("HINT", "HINTS");

SYNTAX(["HELP"], V_HELP);
SYNTAX(["HELP", {find:null, tokens: []}], V_RESCUE);
VERB_SYNONYM("HELP", "AID");

SYNTAX(["CONCEAL", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
SYNTAX(["CONCEAL", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "BEHIND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_BEHIND);
SYNTAX(["CONCEAL", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_UNDER);

SYNTAX(["HIDE", {find:"LOCATION", tokens: []}], V_HIDE);

SYNTAX(["HIDE", "UNDER", {find:null, tokens: []}], V_STAND_UNDER);
SYNTAX(["HIDE", "IN", {find:null, tokens: []}], V_ENTER);
SYNTAX(["HIDE", "BEHIND", {find:null, tokens: []}], V_WALK_AROUND);
SYNTAX(["HIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "BEHIND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_BEHIND);
SYNTAX(["HIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT_UNDER);

SYNTAX(["COVER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_COVER);
SYNTAX(["COVER", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_COVER);
SYNTAX(["COVER", "OVER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_COVER);
VERB_SYNONYM("COVER", "BLOCK", "SHIELD");

SYNTAX(["INFLATE", {find:null, tokens: []}], V_BLOW_INTO);
SYNTAX(["DEFLATE", {find:null, tokens: []}], V_DEFLATE);

SYNTAX(["JUMP", {find:"LOCATION", tokens: []}], V_LEAP);
SYNTAX(["JUMP", "UP", {find:"LOCATION", tokens: []}], V_CLIMB_UP);
SYNTAX(["JUMP", "DOWN", {find:"LOCATION", tokens: []}], V_CLIMB_DOWN);
SYNTAX(["JUMP", "ON", {find:null, tokens: []}], V_STAND_ON);
SYNTAX(["JUMP", "OVER", {find:null, tokens: []}], V_CLIMB_OVER);
SYNTAX(["JUMP", "IN", {find:"LOCATION", tokens: []}], V_LEAP);
SYNTAX(["JUMP", "TO", {find:null, tokens: []}], V_ENTER);
SYNTAX(["JUMP", "THROUGH", {find:null, tokens: []}], V_ENTER);
SYNTAX(["JUMP", "OUT", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["JUMP", "FROM", {find:null, tokens: []}], V_CLIMB_DOWN);
SYNTAX(["JUMP", "OFF", {find:"LOCATION", tokens: []}], V_CLIMB_DOWN);
VERB_SYNONYM("JUMP", "LEAP", "BOUND", "HURDLE", "VAULT");

SYNTAX(["BOUNCE", {find:"LOCATION", tokens: ["HELD","CARRIED","HAVE"]}], V_BOUNCE);
SYNTAX(["BOUNCE", "AROUND", {find:"LOCATION", tokens: ["HELD","CARRIED","HAVE"]}], V_BOUNCE);
VERB_SYNONYM("BOUNCE"/*DRIBBLE*/);

SYNTAX(["KICK", {find:null, tokens: []}], V_KICK);
SYNTAX(["KICK", "AROUND", {find:null, tokens: []}], V_KICK);

SYNTAX(["KICK", "IN", {find:null, tokens: []}], V_MUNG);
SYNTAX(["KICK", "DOWN", {find:null, tokens: []}], V_MUNG);

SYNTAX(["STAMP", "ON", {find:null, tokens: []}], V_MUNG);
SYNTAX(["STAMP", "DOWN", {find:null, tokens: []}], V_MUNG);
SYNTAX(["STAMP", "OVER", {find:null, tokens: []}], V_MUNG);
VERB_SYNONYM("STAMP", "TRAMPLE");


SYNTAX(["ATTACK", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
VERB_SYNONYM("ATTACK", "ASSAULT", "FIGHT", "HURT", "INJURE", "KILL", "MURDER", "SLAY", "STAB", "WOUND", "VANQUISH");

SYNTAX(["HIT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["HIT", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["HIT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SHIT);
VERB_SYNONYM("HIT", "BATTLE", "COMBAT", "STRIKE", "WHACK", "SWAT", "POKE", "JAB", "BLIND");

SYNTAX(["PUNCH", {find:null, tokens: []}], V_PUNCH);
SYNTAX(["PUNCH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["PUNCH", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
VERB_SYNONYM("PUNCH", "SLAP");

SYNTAX(["PARRY"], V_PARRY);
SYNTAX(["PARRY", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PARRY);
SYNTAX(["PARRY", "AGAINST", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PARRY);
SYNTAX(["PARRY", "WITH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PARRY);
VERB_SYNONYM("PARRY", "DEFEND", "FEINT");

SYNTAX(["THRUST"], V_THRUST);
SYNTAX(["THRUST", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["THRUST", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SHIT);

SYNTAX(["LUNGE"], V_THRUST);
SYNTAX(["LUNGE", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"WIELDED", tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);

SYNTAX(["THRUST", "UP", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_RAISE);
SYNTAX(["THRUST", "DOWN", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "IN", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "ON", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "UP", {find:null, tokens: []}], V_PUSH_UP);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "DOWN", {find:null, tokens: []}], V_PUSH_DOWN);
SYNTAX(["THRUST", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "OVER", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["THRUST", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "UNDER", {find:null, tokens: []}], V_PUT_UNDER);

SYNTAX(["KNOCK", "AT", {find:null, tokens: []}], V_KNOCK);
SYNTAX(["KNOCK", "ON", {find:null, tokens: []}], V_KNOCK);
SYNTAX(["KNOCK", "DOWN", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}], V_HIT, PRE_HIT);
SYNTAX(["KNOCK", "OUT", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}], V_HIT, PRE_HIT);
SYNTAX(["KNOCK", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}], V_HIT, PRE_HIT);
SYNTAX(["KNOCK", "DOWN", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["KNOCK", "OUT", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
SYNTAX(["KNOCK", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_HIT, PRE_HIT);
VERB_SYNONYM("KNOCK", "RAP", "POUND");

SYNTAX(["PEEL", {find:null, tokens: []}], V_PEEL);
SYNTAX(["PEEL", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_CUT);

SYNTAX(["KISS", {find:"PERSON", tokens: ["ON-GROUND","IN-ROOM"]}], V_KISS);
VERB_SYNONYM("KISS", "SMOOCH");

SYNTAX(["LEAVE", {find:"LOCATION", tokens: []}], V_LEAVE);
SYNTAX(["LEAVE", {find:null, tokens: ["HELD","CARRIED","MANY"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT, PRE_PUT);
SYNTAX(["LEAVE", {find:null, tokens: ["HELD","CARRIED","MANY"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT_ON, PRE_PUT_ON);

SYNTAX(["LIE", "DOWN", {find:"LOCATION", tokens: []}], V_LIE_DOWN);
SYNTAX(["LIE", "ON", {find:null, tokens: []}], V_LIE_DOWN);
SYNTAX(["LIE", "IN", {find:null, tokens: []}], V_LIE_DOWN);
VERB_SYNONYM("LIE", "RECLINE");

SYNTAX(["LISTEN", {find:"LOCATION", tokens: []}], V_LISTEN);
SYNTAX(["LISTEN", "TO", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LISTEN);
SYNTAX(["LISTEN", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LISTEN);
SYNTAX(["LISTEN", "FOR", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LISTEN);

SYNTAX(["LOCK", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HELD","HAVE"]}], V_LOCK);

SYNTAX(["LOOK"], V_LOOK);
SYNTAX(["LOOK", "AT", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EXAMINE, PRE_EXAMINE);
SYNTAX(["LOOK", "AROUND", {find:"LOCATION", tokens: []}], V_LOOK);
SYNTAX(["LOOK", "DOWN", {find:"LOCATION", tokens: []}], V_LOOK_DOWN);
SYNTAX(["LOOK", "OVER", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EXAMINE, PRE_EXAMINE);
SYNTAX(["LOOK", "UP", {find:"LOCATION", tokens: []}], V_LOOK_UP);
SYNTAX(["LOOK", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_DUMB_EXAMINE, PRE_DUMB_EXAMINE);
SYNTAX(["LOOK", "THROUGH", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LOOK_INSIDE);
SYNTAX(["LOOK", "THROUGH", {find:null, tokens: []}, "AT", {find:null, tokens: []}], V_SLOOK_THRU);
SYNTAX(["LOOK", "UNDER", {find:null, tokens: []}], V_LOOK_UNDER);
SYNTAX(["LOOK", "BEHIND", {find:null, tokens: []}], V_LOOK_BEHIND);
SYNTAX(["LOOK", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LOOK_INSIDE);
SYNTAX(["LOOK", "ON", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LOOK_ON);
SYNTAX(["LOOK", "AT", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "THROUGH", {find:null, tokens: []}], V_LOOK_THRU);
SYNTAX(["LOOK", "AT", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: []}], V_LOOK_THRU);
SYNTAX(["LOOK", "AT", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: []}], V_EXAMINE_IN, PRE_EXAMINE_IN);
SYNTAX(["LOOK", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "THROUGH", {find:null, tokens: []}], V_LOOK_THRU);
SYNTAX(["LOOK", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: []}], V_LOOK_THRU);
SYNTAX(["LOOK", "OUT", {find:"LOCATION", tokens: []}], V_LOOK_OUTSIDE);
SYNTAX(["LOOK", "FOR", {find:null, tokens: []}], V_FIND);
SYNTAX(["LOOK", "TO", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_EXAMINE, PRE_EXAMINE);
VERB_SYNONYM("LOOK", "L", "STARE", "GAZE", "PEER", "PEEK");

SYNTAX(["ADJUST", {find:null, tokens: ["HELD","CARRIED"]}], V_ADJUST);

SYNTAX(["LOOSEN", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
VERB_SYNONYM("LOOSEN", "JIGGLE", "WIGGLE", "WOBBLE");

SYNTAX(["PRY", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PRY", "UP", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PRY", "OUT", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);

SYNTAX(["LOWER", {find:null, tokens: []}], V_LOWER);

SYNTAX(["MAKE", {find:null, tokens: []}], V_MAKE);
SYNTAX(["MAKE", "UP", {find:null, tokens: []}], V_MAKE);

SYNTAX(["MOVE", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_MOVE);
SYNTAX(["MOVE", "OVER", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_MOVE);
SYNTAX(["MOVE", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_RAISE);
SYNTAX(["MOVE", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_LOWER);
SYNTAX(["MOVE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "TO", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "UP", {find:null, tokens: []}], V_PUSH_UP);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "ON", {find:null, tokens: []}], V_PUSH_UP);
SYNTAX(["MOVE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "DOWN", {find:null, tokens: []}], V_PUSH_DOWN);
SYNTAX(["MOVE", "OVER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "TO", {find:null, tokens: []}], V_PUSH_TO);
VERB_SYNONYM("MOVE", "SHIFT", "DISLOCATE", "ROLL");

SYNTAX(["LEAN", "ON", {find:null, tokens: []}], V_PUSH);
SYNTAX(["LEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["LEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "UP", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["LEAN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);

SYNTAX(["PROP", "UP", {find:null, tokens: []}], V_PULL);
SYNTAX(/*IGNORED:HELD CARRIED HAVE*/["PROP", "UP", {find:null, tokens: []}, "ON", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["PROP", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["PROP", "UP", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_PUT_ON, PRE_PUT_ON);

SYNTAX(["OPEN", {find:"OPENABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_OPEN);
SYNTAX(["OPEN", "UP", {find:"OPENABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_OPEN);
SYNTAX(["OPEN", {find:"OPENABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_OPEN_WITH);
SYNTAX(["OPEN", "UP", {find:"OPENABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_OPEN_WITH);
VERB_SYNONYM("OPEN", "UNSEAL", "DISASSEMBLE");

SYNTAX(["PRAY"], V_HELP);

SYNTAX(["PULL", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PULL);
SYNTAX(["PULL", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PULL);
SYNTAX(["PULL", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PULL", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_RAISE);
SYNTAX(["PULL", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PULL", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_LOWER);
SYNTAX(["PULL", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PULL", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PULL", {find:"TAKEABLE", tokens: []}, "OUT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_TAKE, PRE_TAKE);
SYNTAX(["PULL", {find:"TAKEABLE", tokens: []}, "OFF", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_TAKE, PRE_TAKE);
SYNTAX(["PULL", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PULL", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "TO", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PULL", "APART", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_OPEN);
SYNTAX(["PULL", "OUT", {find:null, tokens: []}], V_UNPLUG);
VERB_SYNONYM("PULL", "TUG", "DRAG", "YANK");

SYNTAX(["PICK", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_PICK);
SYNTAX(["PICK", "UP", {find:"TAKEABLE", tokens: ["ON-GROUND","MANY"]}], V_TAKE, PRE_TAKE);

SYNTAX(["PLAY", {find:"LOCATION", tokens: []}], V_TOUCH);
SYNTAX(["PLAY", "WITH", {find:null, tokens: []}], V_TOUCH);
VERB_SYNONYM("PLAY", "FIDDLE", "TOY", "CAVORT");

SYNTAX(["POINT", {find:null, tokens: []}], V_POINT);
SYNTAX(["POINT", "AT", {find:null, tokens: []}], V_POINT);
SYNTAX(["POINT", "AT", {find:null, tokens: []}, "FOR", {find:"LIVING", tokens: []}], V_POINT);
SYNTAX(["POINT", "TO", {find:null, tokens: []}], V_POINT);
SYNTAX(["POINT", "TO", {find:null, tokens: []}, "FOR", {find:"LIVING", tokens: []}], V_POINT);
SYNTAX(["POINT", "OUT", {find:null, tokens: []}, "TO", {find:"LIVING", tokens: []}], V_POINT);
SYNTAX(["POINT", "AT", {find:null, tokens: []}, "WITH", {find:null, tokens: []}], V_SPOINT_AT);
SYNTAX(["POINT", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "AT", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["POINT", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["POINT", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);

SYNTAX(["SELECT", {find:null, tokens: []}], V_POINT);
VERB_SYNONYM("SELECT", "CHOOSE");

` <SYNTAX SHINE OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	AT OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX SHINE OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	IN OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX SHINE OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	ON OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX SHINE OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	OVER OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX SHINE ON OBJECT (ON-GROUND IN-ROOM)
	WITH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE) = V-SSHINE-AT>
  <SYNTAX SHINE IN OBJECT (ON-GROUND IN-ROOM)
	WITH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE) = V-SSHINE-AT>
  <SYNTAX SHINE OVER OBJECT (ON-GROUND IN-ROOM)
	WITH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE) = V-SSHINE-AT>

  <SYNTAX FLASH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	AT OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX FLASH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	IN OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX FLASH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	ON OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>
  <SYNTAX FLASH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE)
	OVER OBJECT (ON-GROUND IN-ROOM) = V-SHINE-AT>

  <SYNTAX ILLUMINATE OBJECT (ON-GROUND IN-ROOM)
	WITH OBJECT (FIND LIGHTED) (HELD CARRIED HAVE) = V-SSHINE-AT> `

SYNTAX(["LIGHT", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_LIGHT_WITH);
SYNTAX(["LIGHT", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_LIGHT_WITH);
SYNTAX(["LIGHT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LIGHT_WITH);
SYNTAX(["LIGHT", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_LIGHT_WITH);
SYNTAX(["LIGHT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_LIGHT_ON);

SYNTAX(["AIM", "AT", {find:null, tokens: []}, "WITH", {find:null, tokens: []}], V_SPOINT_AT);
SYNTAX(["AIM", {find:null, tokens: []}, "AT", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["AIM", {find:null, tokens: []}, "TO", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);

SYNTAX(["POP", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_POP);
VERB_SYNONYM("POP", "BURST");

SYNTAX(["POUR", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR);
SYNTAX(["POUR", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR);

SYNTAX(["POUR", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["POUR", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["POUR", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["POUR", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_EMPTY_INTO);

SYNTAX(["POUR", {find:null, tokens: []}, "FROM", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR_FROM);
SYNTAX(["POUR", "OUT", {find:null, tokens: []}, "FROM", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR_FROM);
SYNTAX(["POUR", {find:null, tokens: []}, "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR_FROM);

VERB_SYNONYM("POUR", "SPILL", "SPRINKLE");

SYNTAX(["EMPTY", {find:null, tokens: ["HELD","CARRIED"]}], V_EMPTY);
SYNTAX(["EMPTY", "OUT", {find:null, tokens: ["HELD","CARRIED"]}], V_EMPTY);
SYNTAX(["EMPTY", "OFF", {find:null, tokens: ["HELD","CARRIED"]}], V_EMPTY);

SYNTAX(["EMPTY", {find:null, tokens: []}, "FROM", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["EMPTY", "OUT", {find:null, tokens: []}, "FROM", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["EMPTY", {find:null, tokens: []}, "OUT", {find:null, tokens: []}], V_TAKE, PRE_TAKE);

SYNTAX(["EMPTY", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["EMPTY", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["EMPTY", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["EMPTY", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_EMPTY_INTO);

VERB_SYNONYM("EMPTY", "CLEAR");

SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_PUSH);
SYNTAX(["PUSH", "ON", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_PUSH);
SYNTAX(["PUSH", "UP", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_RAISE);
SYNTAX(["PUSH", "DOWN", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_LOWER);
SYNTAX(["PUSH", "IN", {find:null, tokens: []}, "TO", {find:null, tokens: []}], V_PLUG_IN);
SYNTAX(["PUSH", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PUSH", "DOWN", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PUSH", "ON", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "IN", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "ON", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "UP", {find:null, tokens: []}], V_PUSH_UP);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "DOWN", {find:null, tokens: []}], V_PUSH_DOWN);
SYNTAX(["PUSH", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "OVER", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["PUSH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "UNDER", {find:null, tokens: []}], V_PUT_UNDER);
SYNTAX(["PUSH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "AT", {find:null, tokens: []}], V_PUSH_TO);
VERB_SYNONYM("PUSH", "PRESS", "SHOVE", "NUDGE", "STICK");

SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE","MANY"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT, PRE_PUT);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE","MANY"]}, "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT, PRE_PUT);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE","MANY"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_TOUCH_TO);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_THROW, PRE_THROW);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT_ON, PRE_PUT_ON);
SYNTAX(["PUT", "DOWN", {find:null, tokens: ["HELD","CARRIED","HAVE","MANY"]}], V_DROP);
SYNTAX(["PUT", {find:null, tokens: ["HELD","HAVE","CARRIED","MANY"]}, "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT_UNDER);
SYNTAX(["PUT", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_WEAR);
SYNTAX(["PUT", {find:null, tokens: ["HELD","CARRIED","MANY","HAVE"]}, "BEHIND", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED"]}], V_PUT_BEHIND);
SYNTAX(["PUT", "OUT", {find:null, tokens: ["ON-GROUND","IN-ROOM","CARRIED","HELD"]}], V_LAMP_OFF);
SYNTAX(["PUT", "ASIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_UNWIELD);
VERB_SYNONYM("PUT", "STUFF", "INSERT", "PLACE", "LAY", "STASH");

SYNTAX(["WEDGE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_WEDGE);
SYNTAX(["WEDGE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["WEDGE", "UP", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
VERB_SYNONYM("WEDGE", "FORCE");

SYNTAX(["PLUG", "IN", {find:null, tokens: []}, "TO", {find:null, tokens: []}], V_PLUG_IN);
SYNTAX(["PLUG", {find:null, tokens: []}, "IN", {find:null, tokens: []}], V_PLUG_IN);
SYNTAX(["PLUG", {find:null, tokens: []}, "ON", {find:null, tokens: []}], V_PLUG_IN);
VERB_SYNONYM("PLUG", "SCREW", "TIGHTEN");

SYNTAX(["CONNECT", {find:null, tokens: []}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PLUG_IN);
SYNTAX(["CONNECT", {find:null, tokens: []}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PLUG_IN);
VERB_SYNONYM("CONNECT", "ATTACH", "JOIN");

SYNTAX(["UNPLUG", {find:null, tokens: []}], V_UNPLUG);
SYNTAX(["UNPLUG", {find:null, tokens: []}, "FROM", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_UNPLUG);
VERB_SYNONYM("UNPLUG", "UNSCREW", "DISCONNEC", "DETACH", "UNATTACH", "DISENGAGE");

SYNTAX(["RAISE", {find:null, tokens: []}], V_RAISE);
SYNTAX(["RAISE", "UP", {find:null, tokens: []}], V_RAISE);
SYNTAX(["RAISE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
SYNTAX(["RAISE", "UP", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LOOSEN);
VERB_SYNONYM("RAISE", "LIFT", "ELEVATE", "HOIST");

SYNTAX(["RAPE", {find:"LIVING", tokens: []}], V_RAPE);
VERB_SYNONYM("RAPE", "MOLEST", "DEFILE", "RAVISH", "HUMP");

SYNTAX(["REACH", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: []}], V_STOUCH_TO);
SYNTAX(["REACH", "FOR", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: []}], V_STOUCH_TO);
SYNTAX(["REACH", "OUT", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: []}], V_STOUCH_TO);
SYNTAX(["REACH", "TO", {find:null, tokens: []}, "WITH", {find:"TOOL", tokens: []}], V_STOUCH_TO);
SYNTAX(["REACH", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_REACH_IN);
SYNTAX(["REACH", "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_REACH_IN);
VERB_SYNONYM("REACH", "GROPE");

SYNTAX(["READ", {find:"READABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_READ);
SYNTAX(["READ", "THROUGH", {find:"READABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_READ);
SYNTAX(["READ", {find:"READABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "THROUGH", {find:null, tokens: []}], V_LOOK_THRU);
SYNTAX(["READ", {find:"READABLE", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "TO", {find:"PERSON", tokens: []}], V_READ_TO);
VERB_SYNONYM("READ", "SKIM", "BROWSE", "LEAF");

SYNTAX(["RELEASE", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE"]}], V_RELEASE);
SYNTAX(["RELEASE", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "FROM", {find:"MANUALLY", tokens: []}], V_RELEASE);
VERB_SYNONYM("RELEASE", "FREE");

SYNTAX(["LET", "GO", {find:null, tokens: []}], V_RELEASE);
SYNTAX(["LET", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "GO", {find:"MANUALLY", tokens: []}], V_RELEASE);

SYNTAX(["UNTIE", {find:null, tokens: []}], V_UNTIE);
VERB_SYNONYM("UNTIE", "UNFASTEN", "UNHOOK");

/*SYNTAX(["SCREW", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SCREW);*/
/*SYNTAX(["SCREW", "DOWN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SCREW);*/
/*SYNTAX(["SCREW", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SCREW);*/
/*SYNTAX(["SCREW", "DOWN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SCREW);*/
/*SYNTAX(["SCREW", "IN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SCREW);*/
/*SYNTAX(["SCREW", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SCREW_WITH);*/
/*SYNTAX(["SCREW", "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SCREW_WITH);*/
/*SYNTAX(["SCREW", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SCREW_WITH);*/
/*VERB_SYNONYM("SCREW", "TIGHTEN");*/

/*SYNTAX(["UNSCREW", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "WITH", {find:"TOOL", tokens: ["HELD","CARRIED","HAVE"]}], V_UNSCREW);*/
/*SYNTAX(["UNSCREW", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "FROM", {find:null, tokens: []}], V_UNSCREW_FROM);*/
/*SYNTAX(["UNSCREW", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "OUT", {find:null, tokens: []}], V_UNSCREW_FROM);*/

SYNTAX(["REPAIR", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_REPAIR);
/*VERB_SYNONYM("REPAIR", "SERVICE");*/

SYNTAX(["FIX", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_REPAIR);
SYNTAX(["FIX", "UP", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_REPAIR);

/*SYNTAX(["WORK", "ON", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_REPAIR);*/

SYNTAX(["REPLACE", {find:null, tokens: []}], V_REPLACE);

SYNTAX(["RESCUE", {find:"PERSON", tokens: []}], V_RESCUE);

SYNTAX(["RIDE", {find:null, tokens: []}], V_RIDE);
SYNTAX(["RIDE", "IN", {find:null, tokens: []}], V_RIDE);
SYNTAX(["RIDE", "ON", {find:null, tokens: []}], V_RIDE);

SYNTAX(["BOW", "TO", {find:"PERSON", tokens: []}], V_BOW);
SYNTAX(["BOW", "BEFORE", {find:"PERSON", tokens: []}], V_BOW);
VERB_SYNONYM("BOW", "KNEEL", "GROVEL", "GENUFLECT");

SYNTAX(["SAY", {find:"LOCATION", tokens: []}], V_SAY);
SYNTAX(["SAY", "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_TELL);
VERB_SYNONYM("SAY", "TALK", "SPEAK", "UTTER", "PROCLAIM", "MAYBE");

SYNTAX(["CALL", {find:"LOCATION", tokens: []}], V_YELL);
SYNTAX(["CALL", "TO", {find:"LIVING", tokens: []}], V_YELL);
SYNTAX(["CALL", "FOR", {find:"LIVING", tokens: []}], V_REQUEST);

SYNTAX(["NAME", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_NAME, PRE_NAME);
SYNTAX(["NAME", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, {find:null, tokens: []}], V_NAME, PRE_NAME);
VERB_SYNONYM("NAME", "RENAME");

SYNTAX(["CALL", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, {find:null, tokens: []}], V_NAME, PRE_NAME);

SYNTAX(["SEARCH", {find:null, tokens: []}], V_SEARCH);
SYNTAX(["SEARCH", "IN", {find:null, tokens: []}], V_SEARCH);
SYNTAX(["SEARCH", "FOR", {find:null, tokens: []}], V_FIND);
SYNTAX(["SEARCH", "UNDER", {find:null, tokens: []}], V_LOOK_UNDER);
SYNTAX(["SEARCH", "THROUGH", {find:null, tokens: []}], V_SEARCH);
VERB_SYNONYM("SEARCH", "RUMMAGE", "FRISK", "RANSACK", "SIFT");

SYNTAX(["SHAKE", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_SHAKE);
SYNTAX(["SHAKE", "OUT", {find:null, tokens: ["HELD","CARRIED"]}], V_EMPTY);
SYNTAX(["SHAKE", "OUT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_EMPTY_INTO);
SYNTAX(["SHAKE", "OUT", {find:null, tokens: []}, "FROM", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_POUR_FROM);

SYNTAX(["JOSTLE", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_SHAKE);
VERB_SYNONYM("JOSTLE", "RATTLE");

SYNTAX(["SIT", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_SIT);
SYNTAX(["SIT", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_SIT);
SYNTAX(["SIT", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_SIT);
SYNTAX(["SIT", "IN", {find:"VEHICLE", tokens: ["ON-GROUND","IN-ROOM"]}], V_ENTER/*V_BOARD PRE_BOARD*/);
SYNTAX(["SIT", "AT", {find:null, tokens: []}], V_SIT);
VERB_SYNONYM("SIT", "SETTLE", "SQUAT", "CROUCH");

SYNTAX(["SLEEP"], V_SLEEP);
SYNTAX(["SLEEP", "IN", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_LIE_DOWN/*V_BOARD*/);
SYNTAX(["SLEEP", "ON", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}], V_LIE_DOWN/*V_BOARD*/);
VERB_SYNONYM("SLEEP", "NAP", "SNOOZE");

SYNTAX(["SLIDE", {find:null, tokens: []}], V_MOVE);
SYNTAX(["SLIDE", {find:null, tokens: []}, "TO", {find:null, tokens: []}], V_PUSH_TO);
SYNTAX(["SLIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "UNDER", {find:null, tokens: []}], V_PUT_UNDER);
SYNTAX(["SLIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_PUT, PRE_PUT);
SYNTAX(["SLIDE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "DOWN", {find:null, tokens: []}], V_PUT, PRE_PUT);

SYNTAX(["SLIDE", "DOWN", {find:"LOCATION", tokens: []}], V_CLIMB_DOWN);

SYNTAX(["SMELL", {find:"LOCATION", tokens: []}], V_SMELL);
VERB_SYNONYM("SMELL", "SNIFF", "WHIFF", "INHALE");

SYNTAX(["SPIN", {find:"LOCATION", tokens: []}], V_SPIN);
VERB_SYNONYM("SPIN", "WHIRL");

SYNTAX(["SQUEEZE", {find:null, tokens: []}], V_SQUEEZE);
SYNTAX(["SQUEEZE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
VERB_SYNONYM("SQUEEZE", "SQUASH", "SQUISH", "CRUSH", "CRUMPLE");

SYNTAX(["STAND", {find:"LOCATION", tokens: []}], V_STAND);
SYNTAX(["STAND", "UP", {find:"LOCATION", tokens: []}], V_STAND);
SYNTAX(["STAND", "ON", {find:null, tokens: []}], V_STAND_ON);
SYNTAX(["STAND", "IN", {find:null, tokens: []}], V_ENTER);
SYNTAX(["STAND", "UNDER", {find:null, tokens: []}], V_STAND_UNDER);
VERB_SYNONYM("STAND", "RISE");

SYNTAX(["DUCK"], V_DUCK);
SYNTAX(["DUCK", "UNDER", {find:null, tokens: []}], V_STAND_UNDER);

SYNTAX(["SWIM", {find:"LOCATION", tokens: []}], V_SWIM);
SYNTAX(["SWIM", "DOWN", {find:"LOCATION", tokens: []}], V_DIVE);
SYNTAX(["SWIM", "UP", {find:"LOCATION", tokens: []}], V_SWIM);
SYNTAX(["SWIM", "IN", {find:null, tokens: []}], V_SWIM);
SYNTAX(["SWIM", "TO", {find:null, tokens: []}], V_SWIM);
SYNTAX(["SWIM", "THROUGH", {find:null, tokens: []}], V_SWIM);
SYNTAX(["SWIM", "OVER", {find:null, tokens: []}], V_SWIM);
SYNTAX(["SWIM", "UNDER", {find:null, tokens: []}], V_DIVE);
VERB_SYNONYM("SWIM", "BATHE", "WADE");

SYNTAX(["DIVE", {find:"LOCATION", tokens: []}], V_DIVE);
SYNTAX(["DIVE", "DOWN", {find:"LOCATION", tokens: []}], V_DIVE);
SYNTAX(["DIVE", "IN", {find:"LOCATION", tokens: []}], V_DIVE);
SYNTAX(["DIVE", "UNDER", {find:"LOCATION", tokens: []}], V_DIVE);
SYNTAX(["DIVE", "OVER", {find:null, tokens: []}], V_LEAP);

SYNTAX(["SWING", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWING);
SYNTAX(["SWING", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:"MONSTER", tokens: ["ON-GROUND","IN-ROOM"]}], V_SWING);

SYNTAX(["SWING", "ON", {find:null, tokens: []}], V_CLIMB_ON);

SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", "UP", {find:"LOCATION", tokens: []}], V_RAISE);
SYNTAX(["TAKE", "DOWN", {find:"LOCATION", tokens: []}], V_LOWER);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "OUT", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "OFF", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "FROM", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "IN", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "ON", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["TAKE", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_TAKE_WITH);
SYNTAX(["TAKE", "APART", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_OPEN);
VERB_SYNONYM("TAKE", "GRAB", "KEEP", "CATCH", "CARRY", "SEIZE", "STEAL", "SNATCH");

SYNTAX(["TAKE", "OFF", {find:"LOCATION", tokens: ["HELD","CARRIED"]}], V_TAKE_OFF);

SYNTAX(["REMOVE", {find:"WORN", tokens: ["HELD","CARRIED"]}], V_TAKE_OFF);
SYNTAX(["REMOVE", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}, "FROM", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["REMOVE", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}, "ON", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["REMOVE", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}, "IN", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["REMOVE", {find:"TAKEABLE", tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_TAKE_WITH);

SYNTAX(["HOLD", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}], V_TAKE, PRE_TAKE);
SYNTAX(["HOLD", "ON", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM"]}], V_TAKE, PRE_TAKE);
SYNTAX(["HOLD", "UP", {find:"LOCATION", tokens: ["HELD","CARRIED","HAVE"]}], V_RAISE);
SYNTAX(["HOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_PUT, PRE_PUT);
SYNTAX(["HOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_HOLD_OVER);
SYNTAX(["HOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["HOLD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["HOLD", "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_LOWER);
SYNTAX(["HOLD", "APART", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_OPEN);

SYNTAX(["GET", {find:"TAKEABLE", tokens: ["ON-GROUND","IN-ROOM","MANY"]}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", "IN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_ENTER);
SYNTAX(["GET", "OUT", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_EXIT);
SYNTAX(["GET", "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_ON);
SYNTAX(["GET", "UP", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["GET", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);
SYNTAX(["GET", "UNDER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_STAND_UNDER);
SYNTAX(["GET", "BEHIND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_WALK_AROUND);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "OUT", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "OFF", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "FROM", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "IN", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "ON", {find:null, tokens: []}], V_TAKE, PRE_TAKE);
SYNTAX(["GET", {find:"TAKEABLE", tokens: ["IN-ROOM","CARRIED","MANY"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_TAKE_WITH);
SYNTAX(["GET", "OFF", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["GET", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);
SYNTAX(["GET", "TO", {find:null, tokens: []}], V_WALK_TO);
SYNTAX(["GET", "BACK", {find:"LOCATION", tokens: []}], V_WALK_TO);
SYNTAX(["GET", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: []}], V_SGET_FOR);
SYNTAX(["GET", {find:null, tokens: []}, "FOR", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_GET_FOR);
SYNTAX(["GET", {find:null, tokens: []}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_GET_FOR);

SYNTAX(["BRING", {find:null, tokens: []}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_GET_FOR);
SYNTAX(["BRING", "BACK", {find:null, tokens: []}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_GET_FOR);
SYNTAX(["BRING", {find:null, tokens: []}, "FOR", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_GET_FOR);
SYNTAX(["BRING", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: []}], V_SGET_FOR);

SYNTAX(["BOARD", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_ENTER);
VERB_SYNONYM("BOARD", "MOUNT");

SYNTAX(["EMBARK", {find:"LOCATION", tokens: []}], V_ENTER);
SYNTAX(["EMBARK", "ON", {find:null, tokens: []}], V_ENTER);

SYNTAX(["DISEMBARK", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["DISEMBARK", "FROM", {find:null, tokens: []}], V_EXIT);
SYNTAX(["DISEMBARK", "OUT", {find:null, tokens: []}], V_EXIT);

SYNTAX(["TASTE", {find:null, tokens: []}], V_TASTE);
VERB_SYNONYM("TASTE", "LICK");

SYNTAX(["TELL", {find:"PERSON", tokens: ["IN-ROOM"]}], V_TELL);
SYNTAX(["TELL", {find:"PERSON", tokens: ["IN-ROOM"]}, "ABOUT", {find:null, tokens: []}], V_TELL_ABOUT);
VERB_SYNONYM("TELL", "ADVISE", "INFORM");

SYNTAX(["THANK", {find:null, tokens: []}], V_THANK);
SYNTAX(["THANK"], V_THANK);
VERB_SYNONYM("THANK", "THANKS");

SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_THROW, PRE_THROW);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "TO", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_THROW, PRE_THROW);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "OFF", {find:null, tokens: []}], V_THROW_OVER, PRE_THROW_OVER);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_THROW_OVER, PRE_THROW_OVER);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "THROUGH", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "DOWN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "IN", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
SYNTAX(["THROW", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}, "ON", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_PUT, PRE_PUT);
SYNTAX(["THROW", "AWAY", {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}], V_DROP);
SYNTAX(["THROW", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, {find:null, tokens: ["HELD","MANY","CARRIED","HAVE"]}], V_STHROW);
VERB_SYNONYM("THROW", "TOSS", "HURL", "CHUCK", "FLING", "PITCH");

SYNTAX(["TIE", {find:null, tokens: []}], V_TIE);
SYNTAX(["TIE", {find:null, tokens: []}, "TO", {find:null, tokens: []}], V_TIE);
SYNTAX(["TIE", "UP", {find:"PERSON", tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED","HAVE"]}], V_TIE_UP);
VERB_SYNONYM("TIE", "FASTEN", "SECURE");

SYNTAX(["TOUCH", {find:null, tokens: []}], V_TOUCH);
SYNTAX(["TOUCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TO", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["TOUCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["TOUCH", "TOGETHER", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "WITH", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["TOUCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "TOGETHER", {find:null, tokens: []}], V_TOUCH_TO);
SYNTAX(["TOUCH", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_STOUCH_TO);

SYNTAX(["DISTURB", {find:null, tokens: []}], V_TOUCH);
SYNTAX(["DISTURB", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_STOUCH_TO);

SYNTAX(["PROBE", {find:null, tokens: []}], V_EXAMINE, PRE_EXAMINE);
SYNTAX(["PROBE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_STOUCH_TO);

SYNTAX(["PET", {find:null, tokens: []}], V_TOUCH);
VERB_SYNONYM("PET", "PAT", "CUDDLE");

SYNTAX(["FEEL", {find:null, tokens: []}], V_TOUCH);
SYNTAX(["FEEL", "IN", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_REACH_IN);

SYNTAX(["TURN", {find:"LOCATION", tokens: []}], V_SPIN);
SYNTAX(["TURN", {find:null, tokens: []}, "WITH", {find:"MANUALLY", tokens: ["HELD","CARRIED","HAVE"]}], V_TURN);
SYNTAX(["TURN", "THROUGH", {find:null, tokens: []}], V_READ);
SYNTAX(["TURN", "TO", {find:null, tokens: []}], V_TURN_TO);
SYNTAX(["TURN", "ON", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_ON);
SYNTAX(["TURN", "OFF", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_OFF);
SYNTAX(["TURN", "AROUND", {find:"LOCATION", tokens: []}], V_SPIN);
SYNTAX(["TURN", "OVER", {find:null, tokens: []}], V_SPIN);
SYNTAX(["TURN", "DOWN", {find:null, tokens: []}], V_REFUSE);
SYNTAX(["TURN", "BACK", {find:"LOCATION", tokens: []}], V_SPIN);
SYNTAX(["TURN", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, "TO", {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["TURN", {find:null, tokens: ["IN-ROOM","ON-GROUND"]}, {find:null, tokens: []}], V_POINT_AT, PRE_POINT_AT);
VERB_SYNONYM("TURN", "ROTATE", "FLIP");

SYNTAX(["CRANK", {find:"LOCATION", tokens: []}], V_CRANK);

SYNTAX(["START", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_ON);
SYNTAX(["START", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LAMP_ON);
SYNTAX(["START", "UP", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_ON);
SYNTAX(["START", "UP", {find:null, tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_LAMP_ON);

SYNTAX(["STOP", {find:"LOCATION", tokens: ["HELD","CARRIED","ON-GROUND","IN-ROOM"]}], V_LAMP_OFF);
VERB_SYNONYM("STOP", "HALT");

SYNTAX(["UNLOCK", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"TOOL", tokens: ["HELD","CARRIED","HAVE"]}], V_UNLOCK);

/*SYNTAX(["UNTIE", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_UNTIE);*/
/*SYNTAX(["UNTIE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:"MANUALLY", tokens: ["HAVE"]}], V_UNLOCK);*/
/*SYNTAX(["UNTIE", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}, "FROM", {find:null, tokens: []}], V_UNLOCK);*/
/*VERB_SYNONYM("UNTIE", "FREE", "UNFASTEN", "UNATTACH", "UNHOOK", "RELEASE", "UNDO");*/

SYNTAX(["USE", {find:null, tokens: []}], V_USE);
VERB_SYNONYM("USE", "EMPLOY", "EXPLOIT", "OPERATE");

SYNTAX(["WAIT"], V_WAIT);
SYNTAX(["WAIT", "FOR", {find:null, tokens: []}], V_WAIT_FOR);
VERB_SYNONYM("WAIT", "Z");

SYNTAX(["REST"], V_WAIT);
VERB_SYNONYM("REST", "LOITER", "PAUSE");

SYNTAX(["WAKE", {find:"LOCATION", tokens: []}], V_ALARM);
SYNTAX(["WAKE", "UP", {find:"LOCATION", tokens: []}], V_ALARM);
VERB_SYNONYM("WAKE", "AWAKE", "AWAKEN", "ROUSE");

SYNTAX(["SCARE", {find:"LIVING", tokens: []}], V_ALARM);
VERB_SYNONYM("SCARE", "AROUSE", "STARTLE", "SURPRISE", "FRIGHTEN");

SYNTAX(["WALK"], V_WALK_AROUND);
SYNTAX(["WALK", {find:null, tokens: []}], V_WALK);
SYNTAX(["WALK", "IN", {find:"LOCATION", tokens: []}], V_ENTER);
SYNTAX(["WALK", "OUT", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["WALK", "OFF", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["WALK", "ON", {find:null, tokens: []}], V_STAND_ON);
SYNTAX(["WALK", "OVER", {find:null, tokens: []}], V_CROSS);
SYNTAX(["WALK", "THROUGH", {find:null, tokens: []}], V_THROUGH);
SYNTAX(["WALK", "AROUND", {find:"LOCATION", tokens: []}], V_WALK_AROUND);
SYNTAX(["WALK", "BEHIND", {find:null, tokens: []}], V_WALK_AROUND);
SYNTAX(["WALK", "UNDER", {find:null, tokens: []}], V_STAND_UNDER);
SYNTAX(["WALK", "UP", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["WALK", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);
SYNTAX(["WALK", "TO", {find:null, tokens: []}], V_WALK_TO);
SYNTAX(["WALK", "FROM", {find:null, tokens: []}], V_ESCAPE);
SYNTAX(["WALK", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);
SYNTAX(["WALK", "PAST", {find:"LOCATION", tokens: []}], V_ESCAPE);
VERB_SYNONYM("WALK", "PROCEED", "STEP", "TRUDGE", "HIKE", "TRAMP", "CRAWL", "RUN", "JOG", "SKIP", "HOP", "ADVANCE", "STROLL");

SYNTAX(["APPROACH", {find:null, tokens: []}], V_WALK_TO);

SYNTAX(["GO"], V_WALK_AROUND);
SYNTAX(["GO", {find:null, tokens: []}], V_WALK);
SYNTAX(["GO", "IN", {find:"LOCATION", tokens: []}], V_ENTER);
SYNTAX(["GO", "OUT", {find:"LOCATION", tokens: []}], V_EXIT);
SYNTAX(["GO", "ON", {find:null, tokens: []}], V_STAND_ON);
SYNTAX(["GO", "OVER", {find:null, tokens: []}], V_CROSS);
SYNTAX(["GO", "THROUGH", {find:null, tokens: []}], V_THROUGH);
SYNTAX(["GO", "AROUND", {find:"LOCATION", tokens: []}], V_WALK_AROUND);
SYNTAX(["GO", "BEHIND", {find:null, tokens: []}], V_WALK_AROUND);
SYNTAX(["GO", "UNDER", {find:null, tokens: []}], V_STAND_UNDER);
SYNTAX(["GO", "UP", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_UP);
SYNTAX(["GO", "DOWN", {find:"LOCATION", tokens: ["ON-GROUND","IN-ROOM"]}], V_CLIMB_DOWN);
SYNTAX(["GO", "TO", {find:null, tokens: []}], V_WALK_TO);
SYNTAX(["GO", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);
SYNTAX(["GO", "FROM", {find:null, tokens: []}], V_ESCAPE);
SYNTAX(["GO", "BACK", {find:"LOCATION", tokens: []}], V_WALK_TO);

SYNTAX(["RETURN", {find:"LOCATION", tokens: []}], V_WALK_TO);
SYNTAX(["RETURN", "TO", {find:null, tokens: []}], V_WALK_TO);

SYNTAX(["WAVE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWING);
SYNTAX(["WAVE", "AROUND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWING);
SYNTAX(["WAVE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["WAVE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["WAVE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AROUND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_POINT_AT, PRE_POINT_AT);
SYNTAX(["WAVE", "AT", {find:"PERSON", tokens: []}], V_WAVE_AT);
SYNTAX(["WAVE", "TO", {find:"PERSON", tokens: []}], V_WAVE_AT);

SYNTAX(["NOD", "AT", {find:"PERSON", tokens: []}], V_WAVE_AT);
SYNTAX(["NOD", "TO", {find:"PERSON", tokens: []}], V_WAVE_AT);
VERB_SYNONYM("NOD", "SMILE", "GRIN", "SNEER", "BECKON");

SYNTAX(["WEAR", {find:null, tokens: []}], V_WEAR);
VERB_SYNONYM("WEAR", "DON");

SYNTAX(["WHAT", {find:null, tokens: []}], V_WHAT);
SYNTAX(["WHAT", "ABOUT", {find:null, tokens: []}], V_WHAT);
VERB_SYNONYM("WHAT", "WHATS", "WHAT\'S");

SYNTAX(["WHERE", {find:null, tokens: []}], V_WHERE);
VERB_SYNONYM("WHERE", "WHERES", "WHERE\'S");

SYNTAX(["WHO", {find:null, tokens: []}], V_WHO);
VERB_SYNONYM("WHO", "WHOS", "WHO\'S");

SYNTAX(["WIND", {find:null, tokens: []}], V_WIND);
SYNTAX(["WIND", "UP", {find:null, tokens: []}], V_WIND);
SYNTAX(["WIND", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AROUND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_WRAP_AROUND);
SYNTAX(["WIND", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWRAP);
SYNTAX(["WIND", "UP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "IN", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SWRAP);

SYNTAX(["YELL", {find:"LOCATION", tokens: []}], V_YELL);
SYNTAX(["YELL", "AT", {find:null, tokens: []}], V_YELL);
SYNTAX(["YELL", "TO", {find:null, tokens: []}], V_YELL);
SYNTAX(["YELL", "FOR", {find:null, tokens: []}], V_REQUEST);
VERB_SYNONYM("YELL", "SCREAM", "SHOUT", "HOWL");

SYNTAX(["LAUGH"], V_LAUGH);
SYNTAX(["LAUGH", "AT", {find:null, tokens: []}], V_LAUGH);
VERB_SYNONYM("LAUGH", "CHUCKLE");

SYNTAX(["INSULT", {find:null, tokens: []}], V_LAUGH);
VERB_SYNONYM("INSULT", "OFFEND");

SYNTAX(["YES", {find:"LOCATION", tokens: []}], V_HELLO);
VERB_SYNONYM("YES", "Y", "OK", "OKAY", "SURE", "YUP", "NO", "NAY", "NEGATIVE", "NOPE");

/*SYNTAX(["NO"], V_NO);*/
/*VERB_SYNONYM("NO", "NAY", "NEGATIVE", "NOPE", "NAW");*/

SYNTAX(["MELT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_MELT);

SYNTAX(["DRESS", {find:"LOCATION", tokens: []}], V_DRESS);

SYNTAX(["UNDRESS", {find:"LOCATION", tokens: []}], V_UNDRESS);
VERB_SYNONYM("UNDRESS", "DISROBE", "STRIP");

SYNTAX(["ESCAPE", {find:"LOCATION", tokens: []}], V_ESCAPE);
SYNTAX(["ESCAPE", "FROM", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_ESCAPE);
SYNTAX(["ESCAPE", "AWAY", {find:"LOCATION", tokens: []}], V_ESCAPE);
VERB_SYNONYM("ESCAPE", "FLEE");

SYNTAX(["WIELD", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_WIELD);

SYNTAX(["SCRATCH", {find:null, tokens: []}], V_SCRATCH);
SYNTAX(["SCRATCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "ON", {find:null, tokens: []}], V_SCRAPE_ON);
SYNTAX(["SCRATCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "IN", {find:null, tokens: []}], V_SCRAPE_ON);
SYNTAX(["SCRATCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "OVER", {find:null, tokens: []}], V_SCRAPE_ON);
SYNTAX(["SCRATCH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AGAINST", {find:null, tokens: []}], V_SCRAPE_ON);
SYNTAX(["SCRATCH", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_STOUCH_TO);
VERB_SYNONYM("SCRATCH", "SCRAPE", "CARVE");

SYNTAX(["ITCH", {find:null, tokens: []}], V_SCRATCH);

SYNTAX(["LURK", {find:"LOCATION", tokens: []}], V_LURK);
SYNTAX(["LURK", "AROUND", {find:"LOCATION", tokens: []}], V_LURK);
SYNTAX(["SLAVER"], V_LURK);
SYNTAX(["SLAVER", "ON", {find:null, tokens: []}], V_LURK);

SYNTAX(["WRITE", {find:null, tokens: []}, "ON", {find:null, tokens: []}], V_WRITE_ON);
SYNTAX(["WRITE", {find:null, tokens: []}, "IN", {find:null, tokens: []}], V_WRITE_ON);
SYNTAX(["WRITE", {find:null, tokens: []}, "OVER", {find:null, tokens: []}], V_WRITE_ON);
SYNTAX(["WRITE", {find:null, tokens: []}, "AROUND", {find:null, tokens: []}], V_WRITE_ON);
SYNTAX(["WRITE", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_WRITE_WITH);
SYNTAX(["WRITE", "ON", {find:null, tokens: []}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_WRITE_WITH);
VERB_SYNONYM("WRITE", "DRAW", "INSCRIBE", "TRACE");

SYNTAX(["ZAP", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_ZAP_WITH);
SYNTAX(["ZAP", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_FIRE_AT);

SYNTAX(["FIRE", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_FIRE_AT);
SYNTAX(["FIRE", "OFF", {find:null, tokens: ["HELD","CARRIED","HAVE"]}, "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}], V_FIRE_AT);
SYNTAX(["FIRE", "AT", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SFIRE_AT);
SYNTAX(["FIRE", {find:null, tokens: ["ON-GROUND","IN-ROOM"]}, "WITH", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_SFIRE_AT);
VERB_SYNONYM("FIRE", "SHOOT");

SYNTAX(["PLANT", {find:null, tokens: ["HELD","CARRIED","HAVE"]}], V_PLANT);

SYNTAX(["UPROOT", {find:null, tokens: []}], V_UPROOT);

SYNTAX(["UNMAKE", {find:null, tokens: ["ON-GROUND","IN-ROOM","HELD","CARRIED"]}], V_UNMAKE);
VERB_SYNONYM("UNMAKE", "FROTZ", "DISPEL");

SYNTAX(["SPELLS"], V_SPELLS);

SYNTAX(["SMEE"], V_MAGIC);
VERB_SYNONYM("SMEE", "YABBA", "BOK", "SQUIRP", "STELLA", "BLARN", "PROSSER", "YQUEM", "WATKIN", "JUKES", "MACUGA", "LIGHTNING", "YOUTH");
