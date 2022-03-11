/**
 * This files defines all the ZIP commands needed for the game.
 * The operation are defined in https://www.inform-fiction.org/zmachine/standards/z1point0/sect15.html
 */
/* TYPES */
const
    ADJ = "ADJ",
    ATOM = "ATOM",
    BYTE = "BYTE",
    KERNEL = "KERNEL",
    NONE = "NONE",
    NOUN = "NOUN",
    STRING = "STRING";


const PSOBJECT=128,
    PSVERB=64,
    PSADJECTIVE=32,
    PSDIRECTION=16,
    PSPREPOSITION=8,
    PSBUZZ_WORD=4,
    
    P1NONE=0,
    P1OBJECT=0,
    P1VERB=1,
    P1ADJECTIVE=2,
    P1DIRECTION=3;

var BEEP_SOUND, BOOP_SOUND;

const VOCAB = {};

function getWORD(word) {
    let w = VOCAB[word];
    if (!w) VOCAB[word] = w = [0,0,0];
    return w;
}

function VOC(word, type) {
    const w = getWORD(word);
    if (type === NOUN) {
        w[0] |= PSOBJECT | P1OBJECT;
    } else if (type === ADJ) {
        w[0] |= PSADJECTIVE | P1OBJECT;
    }
    return word;
}

let DIR_COUNT = 63;
function DIRECTIONS(...dirs) {
    for (const word of dirs) {
        const w = getWORD(word);
        saveDIRECTION(word, DIR_COUNT);
        w[0] |= PSDIRECTION | P1DIRECTION;
        w[1] = DIR_COUNT--;
    }
}

function BUZZ(...elems) {
    for (const e of elems) {
        const w = getWORD(e);
        w[0] += PSBUZZ_WORD;
    }
}

function SYNONYM(word, ...synonyms) {
    const w = getWORD(word);
    for (const e of synonyms) {
        VOCAB[e] = w;
    }
}

const PREP_SYNONYM = SYNONYM;
const ADJ_SYNONYM = SYNONYM;
const VERB_SYNONYM = (w, ...s) => {
    SYNONYM(w, ...s);
    for (const e of s) SYNTAX_TABLE[e] = SYNTAX_TABLE[w];
};

const SYNTAX_TABLE = {};

function getST(st) {
    let w = SYNTAX_TABLE[st];
    if (!w) SYNTAX_TABLE[st] = w = [0];
    return w;
}

const SYNTAX_TOKEN = {
    'HAVE': 2,
    'MANY': 4,
    'TAKE': 8,
    'ON-GROUND': 16,
    'IN-ROOM': 32,
    'CARRIED': 64,
    'HELD': 128
};

function SYNTAX(syntax, verb, preaction) {
    const st = getST(syntax[0]);
    const word = getWORD(syntax[0]);
    word[0] = PSVERB + P1VERB;
    word[1] = verb;
    const objects = syntax.filter(x => typeof x === "object");
    const preps = [];
    let obj = false;
    for (let e of syntax.slice(1)) {
        if (typeof e === "object") obj = true;
        else if (typeof e === "string")
            preps[obj+0] = e;
    }
    // Moves entries 8 positions to the right
    for (let i = st.length - 1 + 8; i >= 8 + 1; i--) {
        st[i] = st[i - 8];
    }
    const entry = [
        objects.length,
        preps[0] || 0,
        preps[1] || 0,
        objects[0] ? (objects[0].find || 0) : 0,
        objects[1] ? (objects[1].find || 0) : 0,
        objects[0] ? objects[0].tokens.map(x => SYNTAX_TOKEN[x]).reduce((acc, x) => acc + x, 0) : 0,
        objects[1] ? objects[1].tokens.map(x => SYNTAX_TOKEN[x]).reduce((acc, x) => acc + x, 0) : 0,
        verb
    ];
    for (let i = 0; i < 8; i++)
        st[i + 1] = entry[i];
    st[0]++;
    VERBS.push(verb); VERBS[0]++;
    PREACTIONS[VERBS.length - 1] = preaction; PREACTIONS[0] = VERBS[0];
    for (const p of preps) {
        const pword = getWORD(p);
        pword[0] |= PSPREPOSITION|P1OBJECT;
        pword[pword[1] !== 0 ? 2 : 1] = p;//PREPOSITIONS.length; // position of p inside PREPOSITIONS table
        if (!PREPOSITIONS.includes(p)) {
            PREPOSITIONS.push(p);
            PREPOSITIONS[0]++;
        }
    }
}

function isEQUAL(x, ...xs) {
    for (const y of xs) {
        if (x === y)
            return true;
        else if (Array.isArray(y) && Array.isArray(x)) {
            return x.length === y.length && x.filter((j, i) => j !== y[i]).length === 0;
        } else if (x && y && x.valueOf instanceof ProxyArray && y.valueOf instanceof ProxyArray) {
            return x.valueOf.object === y.valueOf.object && x.valueOf.start === y.valueOf.start;
        }
    }
    return false;
}

/* DISPLAY */
let display_mode = 0;
function HLIGHT(mode) {
    printBuffer();
    display_mode = mode;
}

// DEFAULT(1): letra normal
// NEWFONT(3): VT100 character graphics font http://www.inform-fiction.org/zmachine/standards/z1point0/sect16.html
let display_font = 1;
function FONT(font) {
    printBuffer();
    display_font = font;
}

function COLOR(fore, back) {
    printBuffer();
    if (!(LOWCORE([ZVERSION, 1]) & $$XCOLOR)) return; // if not color flag, ignore
    if (fore) window_selected.fore = fore;
    if (back) window_selected.back = back;
}


/* TABLE operations */
function ITABLE(size, type, defaultValue=null) {
    return "".padEnd(size, 0).split("").map(() => defaultValue);
}

function LTABLE(...elems) {
    if (Array.isArray(elems[0]) && elems[0][0] === BYTE)
        elems.shift();
    return [elems.length, ...elems];
}

const PLTABLE = LTABLE;

function COPYT(source, dest, length) {
    if (dest) {
        if (length >= 0) {
            let overlaps = false;
            if (dest.length < source.length) {
                const start = source.length - dest.length;
                const tmp = dest[0];
                dest[0] = "very-unique-TEXT";
                if (source[start] === "very-unique-TEXT"  // Son la misma tabla
                && length > start)
                    overlaps = true;
                dest[0] = tmp;
            }
            if (overlaps) {
                for (let i = length - 1; i >= 0; i--)
                    dest[i] = source[i];
            } else {
                for (let i = 0; i < length; i++)
                    dest[i] = source[i];
            }
        } else {
            length = -length;
            for (let i = 0; i < length; i++)
                dest[i] = source[i];
        }
    } else {
        for (let i = 0; i < length; i++)
            source[i] = 0;
    }
}

function REST(table, start=1) {
    if (typeof table === "number") return [table];
    return new ProxyArray(table, start);
}

function BACK(table, end=1) {
    REST(table, table.length - end);
}

const ARRAY_EQUAL = (x, y) => x.length === y.length && x.filter((j, i) => j !== y[i]).length === 0;

function isINTBL(item, tbl, len, recspec) {
    if (recspec === undefined) {
        for (let i = 0; i < len; i++) {
            if (tbl[i] === item) return tbl.slice(i);
        }
        return false;
    } else {
        if (typeof item === "string") item = item.split("");
        if (!recspec) recspec = 130;
        const chunk = recspec & 128 ? 4 : 1,
            length = recspec & 255; // length of individual record
        const records = len; // num of records
        // assuming 1 word = 4 bytes
        for (let r = 0; r < records; r++) {
            for (let i = 0; i < length; i += chunk) {
                const p = r * chunk + i;
                if (ARRAY_EQUAL(item, tbl.slice(p, p + 4))) {
                    return tbl.slice(p);
                }
            }
        }
        return false;
    }
}

const m_dirs = ['NORTH', 'NE', 'EAST', 'SE', 'SOUTH', 'SW', 'WEST', 'NW', 'UP', 'DOWN', 'IN', 'OUT'];

/* OBJECT */
let outOfTime = false;
// TODO: revisar que el comportamiento de la propiedad THINGS está definido por PSEUDO(L) en macros.js
function OBJECT(obj) {
    let isRoom = false;
    const finalObject = {
        ADJECTIVE: [],
        DESC: "object",
        FLAGS: [],
        SYNONYM: [],
        _contents: [],
    };

    for (const key in obj) {
        if (m_dirs.includes(key)) {
            isRoom = true;
        } else {
            finalObject[key] = obj[key];
        }
    }

    if (isRoom) {
        for (const dir of m_dirs) {
            Object.defineProperty(finalObject, dir, {
                get: () => obj[dir] ? obj[dir] : DEFAULT_OBJECT[dir](),
                set: value => obj[dir] = value
            });
            if (obj[dir])
                ObjectTree.addDirectionPair(finalObject, dir);
        }
    }

    if (obj.GLOBAL) {
        Object.defineProperty(finalObject, "GLOBAL", {
            get: () => obj.GLOBAL.map(toOBJECT),
            set: value => obj.GLOBAL = value
        });
    }

    Object.setPrototypeOf(finalObject, DEFAULT_OBJECT);

    for (const s of finalObject.SYNONYM)
        VOC(s, NOUN);
    for (const a of finalObject.ADJECTIVE)
        VOC(a, ADJ);
        
    if (finalObject.THINGS)
        for (const t of finalObject.THINGS) {
            if (t[0]) VOC(t[0], ADJ);
            if (t[1]) VOC(t[1], NOUN);
        }

    if (finalObject.LOC)
        ObjectTree.add(finalObject, finalObject.LOC);

    ObjectTree.addObject(finalObject);

    setTimeout(()=>{outOfTime = true}, 2000);

    return finalObject;
}

const DEFAULT_OBJECT = {
    ACTION: null,
    BEAM_DIR: 0,
    BELOW: null,
    CAPACITY: 0,
    CONTFCN: null,
    COORDS: [],
    DESCFCN: null,
    DEXTERITY: 0,
    DNUM: 0,
    DOWN: () => [256, 0],
    EAST: () => [256, 0],
    EFFECT: null,
    EMAX: 0,
    ENDURANCE: 0,
    EXIT_STR: "",
    FNUM: 0,
    GENERIC: null,
    GLOBAL: null,
    HABITAT: null,
    HEAR: 0,
    IN: () => [256, 0],
    LAST_LOC: null,
    LIFE: null,
    LOC: null,
    MIRROR_DIR: -1,
    MIRROR_OBJ: null,
    NAME_TABLE: null,
    NE: () => [256, 0],
    NORTH: () => [256, 0],
    NW: () => [256, 0],
    ODOR: null,
    OUT: () => [256, 0],
    OVERHEAD: null,
    READIQ: 0,
    SDESC: null,
    SE: () => [256, 0],
    SEE_ALL: null,
    SIZE: 0,
    SOUTH: () => [256, 0],
    STRENGTH: 0,
    SW: () => [256, 0],
    THINGS: null,
    THIS_CASE: null,
    UP: () => [256, 0],
    VALUE: 0,
    WEST: () => [256, 0],
};



/* OUTPUT */

let output_buffer = "";

function BUFOUT(b) {
    window_selected.buffer = b;
}

function printBuffer(c = "") {
    DIROUT_DEVICE(output_buffer + c);
    output_buffer = "";
}

function PRINT(t) {
    if (typeof t !== "string") t = t.toString();
    if (can_print) {
        t = t.replace(/\|/gi, "\n");
        for (const c of t) {
            if (c === "\n") printBuffer("\n");
            else output_buffer += c;
        }
    } else
        return t.replace(/\|/gi, "\n");
}

function CRLF() {
    if (can_print) PRINT("\n");
    return "\n";
}
const CR = CRLF;

const PRINTB = x => x ? PRINT(x.toLowerCase()) : "";
const PRINTI = PRINT;

function PRINTC(char) {
    const value = (typeof char === "number") ? String.fromCharCode(char) : char;

    if (can_print) PRINT(value);
    return value;
}

function PRINTN(num=0) {
    const value = Math.round(num) === num ? num.toString() : num.toFixed(2);;
    if (can_print) PRINT(value);
    return value;
}

function PRINTT(table, width, height=1) {
    printBuffer();
    const [mx, my] = window_selected.cursor;
    let c = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            CURSET(my+y, mx+x);
            const char = (typeof table[c] === "number") ? String.fromCharCode(table[c++]) : table[c++];
            DIROUT_DEVICE(char,false);
        }
    }
}

function PRINTD(obj) {
    const str = obj.DESC;
    if (can_print) PRINT(str);
    return str;
}

let can_print = true;
function TELL(...values) {
    let str = "";
    const tmp = can_print;
    can_print = false;
    for (const v of values) {
        if (typeof v === "function") {
            str += v();
        } else if (typeof v === "object") {
            str += v.DESC;
        } else {
            str += v;
        }
    }
    can_print = tmp;
    if (can_print) PRINT(str);
    return str;
}

/* LOWCORE WORDS */
const ZVERSION = "ZVERSION", ZORKID = "ZORKID", FLAGS = "FLAGS", INTID = "INTID",
    INTVR = "INTVR", FWRD = "FWRD", HWRD = "HWRD", VWRD = "VWRD", MSLOCY = "MSLOCY",
    MSLOCX = "MSLOCX", SCRH = "SCRH", SCRV = "SCRV";

const intids = {
    "Debugging Int.": 1,
    "Apple IIe": 2,
    "Macintosh": 3,
    "Amiga": 4,
    "Atari ST": 5,
    "IBM PC": 6,
    "Commodore 128": 7,
    "Commodore 64": 8,
    "Apple IIc": 9,
    "Apple IIgs": 10
};

const interpreters = {
    "YZIP": 6,
    "XZIP": 5,
    "EZIP": 4,
    "ZIP": 3
};

const font = {width: 8, height: 16};
const screen = {width: 300, height: 200};

const $$XCOLOR = 1, $$XDISPL = 2, $$XBOLD = 4, $$XUNDE = 8, $$XMONO = 16, $$XSOUN = 32;

const $$FSCRI = 1, $$FFIXE = 2, $$FSTAT = 4, $$FDISP = 8, $$FUNDO = 16, $$FMOUS = 32,
    $$FCOLO = 64, $$FSOUN = 128, $$FMENU = 256;

let _flags = $$FDISP | $$FUNDO | $$FMOUS | $$FCOLO | $$FSOUN | $$FMENU;

function LOWCORE(wrd, value) {
    if (Array.isArray(wrd)) {
        switch(wrd[0]) {
            case FWRD: return [
                font.width, // horizontal size of current font, in pixels
                font.height // vertical size of current font, in pixels
            ][wrd[1]];
            case ZVERSION: return [
                interpreters["YZIP"],
                $$XCOLOR | $$XDISPL | $$XBOLD | $$XUNDE | $$XMONO | $$XSOUN
            ][wrd[1]];
        }
    } else {
        switch(wrd) {
            case FLAGS: if (value !== undefined) _flags = value; return _flags;
            case INTID: return intids["Atari ST"];
            case INTVR: return "6.3";
            case MSLOCX: return mouse.x;
            case MSLOCY: return mouse.y;
            case ZORKID: return 55;
            case VWRD: return screen.height;
            case HWRD: return screen.width;
            case SCRV: return Screen.height;
            case SCRH: return Screen.width;
        }
    }
}

function LOWCORE_TABLE() {
    return "abcde12345";
}


/* OBJECT OPERATIONS */
function MOVE(thing, dest) {
    if (!dest._contents.includes(thing)) {
        if (thing.LOC)
            thing.LOC._contents = thing.LOC._contents.filter(x => x !== thing);
        dest._contents.unshift(thing);
        thing.LOC = dest;
    }
}

function REMOVE(thing) {
    if (thing.LOC) {
        thing.LOC._contents = thing.LOC._contents.filter(x => x !== thing);
        thing.LOC = null;
    }
}

function isFSET(obj, flag) {
    if (!obj.FLAGS) return false;
    return obj.FLAGS.includes(flag);
}

function FSET(obj, flag) {
    if(!obj.FLAGS.includes(flag)) obj.FLAGS.push(flag);
}

function FCLEAR(obj, flag) {
    obj.FLAGS = obj.FLAGS.filter(x => x !== flag);
}

function LOC(obj) {
    return obj.LOC;
}

function isFIRST(obj) {
    return obj._contents[0];
}

function isNEXT(obj) {
    return obj.LOC._contents[obj.LOC._contents.indexOf(obj) + 1];
}

function isIN(child, parent) {
    return child.LOC === parent;
}

const word_separators = ",.<>(){}[]-+*\"";
function READ(text, parse, read_listener) {
    parse.inVocab = {};
    parse.strings = {};
    //http://www.inform-fiction.org/zmachine/standards/z1point0/sect15.html#read
    input_stream.subscribe(line => {
        Screen.resetLineCount();
        const start = text[1];
        text[1] = line.length;
        const input = line.toUpperCase().split("");
        const input_charcode = line.toUpperCase().split("").map(x => x.charCodeAt(0));
        for (let i = 0; i < input_charcode.length; i++)
            text[i + 2] = input_charcode[i];

        if (parse !== 0) {
            let word = "";
            let offset = 0;
            let words = [];
            for (let i = 0; i < input.length; i++) {
                const c = input[i];
                if (word_separators.includes(c)) {
                    if (word !== "")
                        words.push([word, offset]);
                    words.push([c, i]);
                    word = "";
                } else if (c === " ") {
                    words.push([word, offset]);
                    word = "";
                } else {
                    if (word === "") offset = i;
                    word += c;
                }
            }
            if (word) words.push([word, offset]);
            parse[1] = words.length;
            for (let i = 0; i < words.length; i++) {
                const [word, offset] = words[i];
                //let index = Object.keys(VOCAB).map(x => x[0]).indexOf(word);
                /*parse[i + 2] = [
                    index > 0 ? index : 0,
                    word.length,
                    offset
                ];*/
                //parse[i + 2] = index >= 0 ? word : 0;
                parse[i + 2] = word;
                parse.inVocab[word] = !!VOCAB[word];
            }
        }
        read_listener.post(keydown_handler.lastKey());
    });
    printBuffer();
    //setTimeout(Simulate.inputSend, 5);
}

function LEX(text, parse, dictionary=VOCAB, preserve=false) {
    parse.inVocab = {};
    parse.strings = {};
    let word = "";
    let offset = 0;
    let words = [];
    for (let i = 2; i < text.length; i++) {
        if (text[i] === 0) break;
        const c = String.fromCharCode(text[i]);
        if (word_separators.includes(c)) {
            if (word !== "")
                words.push([word, offset]);
            words.push([c, i]);
            word = "";
        } else if (c === " ") {
            if (word.length)
                words.push([word, offset]);
            word = "";
        } else {
            if (word === "") offset = i;
            word += c;
        }
    }
    if (word) words.push([word, offset]);
    parse[1] = words.length;
    for (let i = 0; i < words.length; i++) {
        const [word, offset] = words[i];
        //let index = dictionary.map(x => x[0]).indexOf(word);
        if (dictionary[word]) {
            parse[i + 2] = word;
            parse.inVocab[word] = true;
        } else if (!preserve) {
            parse[i + 2] = word;
            parse.inVocab[word] = false;
        }
    }
}

function INPUT(subs) {
    keydown_handler.subscribe(X => {
        Screen.resetLineCount();
        subs(X); 
    });
    printBuffer();
}

/* WINDOW System */
const windows = [{
    number: 0,
    content: "",
    fore: 1, back: 1, // foreground and background color
    cursor: [1, 1], // x,y
    pos: [1, 1],
    dim: [14, 20], // FULLSCREEN
}, {
    number: 1,
    content: "",
    fore: 1, back: 1,
    cursor: [1, 1],
    pos: [1, 1],
    dim: [80, 0],
}];
let window_selected = windows[0];

function SCREEN(window) {
    window_selected = windows[window];
}

function SPLIT(height) {
    windows[1].pos[1] = 1;
    windows[1].dim[1] = height;
    const size = Screen.height - height;
    windows[0].dim[1] = size > 0 ? size : 0;
    windows[0].line_count = windows[0].dim[1] - 1;
    windows[0].pos[1] = height + 1;
    window_selected = windows[0];
}

function CLEAR(window) {
    if (window === -1) {
        SPLIT(0);
        window_selected.content = "";
        window_selected.cursor = [1, 1];
        Screen.clear();
    } else {
        Screen.clearWindow(windows[window]);
    }
}

function CURSET(y, x, window) {
    Screen.blinking.stop();
    y = Math.round(y);
    x = Math.round(x);
    if (window === undefined) window = window_selected;
    else window = windows[window];

    printBuffer();

    if (y === -1) {
        window.cursor[2] = false;
        return;
    } else if (y === -2) {
        window.cursor[2] = true;
        return;
    }

    if (x < 1) x = 1;
    if (x > window.dim[0]) x = window.dim[0] - 1;
    if (y < 1) y = 1;
    if (y > window.dim[1]) y = window.dim[1] - 1;
    window.cursor[0] = x;
    window.cursor[1] = y;
    Screen.blinking.start();
}

/* IO PSEUDO-DEVICES */

let DIROUT_SELECT = {
    screen: true,
    printer: false,
    table: false,
    record: false
};

let DIROUT_DEVICE = (t) => {
    if (DIROUT_SELECT.screen) DIROUT_DEVICES.screen(t);
    if (DIROUT_SELECT.printer) DIROUT_DEVICES.printer.print(t);
    if (DIROUT_SELECT.table) DIROUT_DEVICES.table.print(t);
    if (DIROUT_SELECT.record) DIROUT_DEVICES.record.print(t);
};

let DIROUT_DEVICES = {
    screen: function (t) {
        window_selected.content += t;
        Screen.draw();
    },
    printer: (() => {
        let buffer = "";

        return {
            print: t => {
                _flags ^= $$FSCRI;
                buffer += t;
            },
            perform: () => {
                buffer = "";
                _flags |= $$FSCRI;
            }
        };
    })(),
    table: (()=> {
        let table = [];
        let pos = 2;
        let prev = DIROUT_SELECT;
        
        return {
            load: t => {
                table = t;
                pos = 2;
                prev = DIROUT_SELECT;
                DIROUT_SELECT = {
                    screen: false,
                    printer: false,
                    table: true,
                    record: false
                };
            },
            print: t => {
                for (let i = 0; i < t.length; i++) {
                    table[pos + i] = t[i];
                }
                pos += t.length;
            },
            perform: () => {
                table[0] = pos - 2; // number of characters printed
                DIROUT_SELECT = prev;
            }
        };
    })(),
    record: (() => {
        return {
            print: t => console.warn("RECORD: " + t)
        };
    })()
}


function DIROUT(device, a) {
    printBuffer();
    switch(device) {
        case D_SCREEN_ON: DIROUT_SELECT.screen = true; break;
        case D_SCREEN_OFF /* shut off screen */: DIROUT_SELECT.screen = false; break;
        case D_PRINTER_ON: DIROUT_SELECT.printer = true; break;
        case D_PRINTER_OFF /* perform transcripting */:
            DIROUT_SELECT.printer = false;
            DIROUT_DEVICES.printer.perform();
            break;
        case D_TABLE_ON:
            DIROUT_DEVICES.table.load(a);
            break;
        case D_TABLE_OFF:
            DIROUT_DEVICES.table.perform();
            break;
        case D_RECORD_ON: DIROUT_SELECT.record = true; break;
        case D_RECORD_OFF: DIROUT_SELECT.record = false; break;
    }
}

function SOUND(id) {
    if (id === 1) {BEEP_SOUND.currentTime=0;BEEP_SOUND.play();}
    else if (id === 2) {BOOP_SOUND.currentTime=0;BOOP_SOUND.play();}
}

function QUIT() {
    window.close();
}

function RANDOM(arg) {
    if (arg <= 0) {
        console.error("UNINMPLEMENTED RANDOM with negative arg");
        return;
    }
    return Math.ceil(Math.random() * arg);
}

const MOD = (a, b) => a % b;

const OR = (...values) => values.reduce((acc, x) => acc || x, false);

const isEMPTY = arg => arg.length === 0;

const isTYPE = () => true;

const isLENGTH = (obj, v) => obj.length <= v;

const GETP = (obj, prop) => obj[prop.replace(/\-/, "_")];
const GETPT = GETP;

const PUTP = (obj, prop, value) => obj[prop.replace(/\-/, "_")] = value;

const APPLY = (fn, ...args) => fn ? fn(...args) : null;

const isASSIGNED = x => x !== undefined;

var saved_obj = null;

/* SAVE & RESTORE */

function ISAVE() {
    saved_obj = `{
    "GLOBAL":{${gvars.map(gvar => `"${gvar}":${propToJSON(window[gvar])}`)}},
    "OBJECT":${ObjectTree.toJSON()},
    "TABLES":${saveTables()}
}`;
    return 1;
}

function IRESTORE(after) {
    if (saved_obj) {
        const saved = JSON.parse(saved_obj);
        ObjectTree.fromJSON(saved.OBJECT);
        restoreTables(saved.TABLES);
        for (const gvar in saved.GLOBAL) {
            window[gvar] = reverseProperty(saved.GLOBAL[gvar]);
        }
        after(1);
    } else
        after(0);
}

const gvars = ["CYOU", "P_END_ON_PREP", "P_PHR", "FORE", "LAVA_TIMER", "P_BUTS",
"BUNNIES", "FARM_ROOM", "HEIGHT", "MAPX", "STORM_TIMER", "URSCRIPT", "RANK",
"IDING", "P_HIM_OBJECT", "P_DIR", "P_ACLAUSE", "CHECKSUM", "DONT", "YOU_HEAR",
"SIN", "GLANCES_AT", "P_SLOCBITS", "COMMA_AND", "BADKEY", "PALIMP_CHARGES", "P_NAMW",
"STATIC", "DBOX_LINES", "P_OTBL", "P_NAM", "GLASS_TOP", "MAX_DHEIGHT", "P_XNAM",
"GOSSIP", "THRIFF_WON", "P_MOBY_FOUND", "PTIMER", "IMPOSSIBLY", "P_WALK_DIR",
"OOPS_TABLE", "SON", "P_ANAM", "LAMP_LIFE", "CLOCK_HAND", "isALWAYS_LIT", "DACT_SLEEP",
"PTAB", "WHICH_PRINTING", "LAST_PSEUDO_LOC", "LYOU_SEE", "P_CONT", "THIS_SUCKER", "DWIDTH",
"P_PRSI", "AGAIN_LEXV", "isP_MULT", "MAP_ROUTINE", "VERBOSITY", "DESCING", "P_DIRECTION",
"SCRAMBLE_LENGTH", "isLIT", "XTHE", "RESERVE_INBUF", "AND", "INCOLOR", "P_PNAM", "MAXSTATS",
"AMULET_TIMER", "HSCRIPT", "GRUE_KILLS", "P_THEM_OBJECT", "DORN_TIMER", "ATIME", "P_VTBL",
"GRTIMER", "WITH", "isCLOCK_WAIT", "ZTOP", "BRACKET", "CYOUR", "P_ADJW", "PLAIN_COUNT",
"CWIDTH", "RESERVE_LEXV", "P_ACT", "P_ADJ", "VT220", "PRIOR", "P_LEN", "AUTO", "WALL_WORD",
"HOST", "PALLETTE", "C_INTS", "C_TABLE", "P_LEXV", "GURDY_TIMER", "TRUFFLE_TIMER", "PERIOD", "GURDY_ROOM",
"isNOW_PRSI", "CLERIC_SCRIPT", "DBOX_TOP", "CTHELADY", "P_OFW", "P_PADJN", "PRSO", "MOSSES",
"SHILL_TIMER", "P_MERGED", "P_GWIMBIT", "isPSEUDO_PRSO", "BOXWIDTH", "OBUNNIES", "BGND",
"FSCRIPT", "CHOKE", "P_LASTADJ", "P_SYNTAX", "STO", "GON", "DMODE", "P_XADJ", "MOVES",
"TELEWORD", "SAY_STAT", "isINV_PRINTING", "YOU_SEE", "PRSA", "P_PRSA_WORD", "SCARES_SEEN",
"P_EXCHANGE", "LTHE", "WINDIR", "P_PRSO", "AUX_TABLE", "CAN_UNDO", "SWIDTH", "P_AND", "DHEIGHT",
"AMULET_WORD", "LAST_MONSTER_DIR", "LAST_CRANK_DIR", "SAME_COORDS", "P_INBUF", "MAGMA_TIMER",
"P_MERGE", "NO_REFRESH", "BARY", "HERE", "P_WON", "MOSS_TIMER", "STAT_ROUTINE", "GLASS_BOT",
"QCONTEXT", "THIS_MOSS", "SINTO", "P_OVTBL", "EAST_EXIT", "HOOTS", "CHEIGHT", "P_ITBL",
"MOUSEDGE", "QUOTE_FLAG", "VISION", "STATS", "BMODE", "ARCHTIMER", "P_TABLE", "ZBOT",
"ABOVE", "NEW_DBOX", "ALREADY", "P_GETFLAGS", "BARX", "BAR_RES", "LAST_MONSTER", "IMPSAY",
"NOTHING", "P_OCL2", "VT100", "BARWIDTH", "GCOLOR", "OOPS_INBUF", "STORAGE", "P_NUMBER",
"WEST_EXIT", "POTENTIAL", "SIS", "P_OFLAG", "WINNER", "STHE", "QCONTEXT_ROOM", "AGAIN_DIR",
"PERQ", "XA", "P_IT_OBJECT", "AT_MOMENT", "P_OCL1", "ONION_TIMER", "OLD_HERE", "P_DIR_WORD",
"IN_DBOX", "PRSI", "RESERVE_PTR", "SFIRST", "QUAKE_TIMER", "LAST_CONNECTION", "ATTACK_MODE",
"WIDTH", "LOOT", "GOOD_DIRS", "AMULET_STARS", "DPOINTER", "MAPY", "P_NCN", "P_HER_OBJECT",
"BRIDGE_DIR", "CANT", "isCOLORS", "GOBLET_WORD", "TAB", "isGRAPHICS", "P_QWORD", "PREPOSITIONS",
"ACTIONS", "PREACTIONS", "VERBS"];
const tablesToSave = ["CHARNAME", "MAGIC_WORDS", 
/*partial tables begin*/"WAND_LIST", "WAND_FUNCTIONS", "POTION_LIST", "POTION_TABLES",
"SCROLL_LIST", "SCROLL_FUNCTIONS", "SUCKER_TYPES", "JUNGLE_DESCS", "FOREST_DESCS", "RUIN_DESCS"];
const partialTablesPos = 2; 
function SAVE() {
    const savedState = `{
    "GLOBAL":{${gvars.map(gvar => `"${gvar}":${propToJSON(window[gvar])}`)}},
    "OBJECT":${ObjectTree.toJSON()},
    "TABLES":${saveTables()}
}`;
    const filename = "BEYOND_SAVE";
    const file = new Blob([savedState], {type: "text"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
    return 1;
}
var result;
function RESTORE(after) {
    const i = document.createElement("input");
    i.type = "file";
    i.onchange = event => {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            result = event.target.result;
            const saved = JSON.parse(event.target.result);
            ObjectTree.fromJSON(saved.OBJECT);
            restoreTables(saved.TABLES);
            for (const gvar in saved.GLOBAL) {
                window[gvar] = reverseProperty(saved.GLOBAL[gvar]);
            }
            after();
        };
        reader.readAsText(selectedFile);
    };
    i.click();
}

const overrideProp = ["MIRROR-DIR", ]
const lazyConvertToObject = ["OVERHEAD"];
function objectToJSON(obj) {
    let json = [];
    const props = Object.keys(obj).concat(m_dirs);
    for (const prop of props) {
        if (obj[prop] === DEFAULT_OBJECT[prop]) continue;
        if (lazyConvertToObject.includes(prop))
            json.push(`"${prop}":${propToJSON(toOBJECT(obj[prop]))}`);
        else
            json.push(`"${prop}":${propToJSON(obj[prop])}`);
    }
    return `{${json.join()}}`;
}

function propToJSON(prop) {
    const type = typeof prop;
    if (type === "number" || prop === null || type === "boolean") {
        return ""+prop;
    } else if (type === "string") {
        return `"${prop.replace(/\"/gi, '\\"')}"`;
    } else if (Array.isArray(prop)) {
        return `[${prop.map(propToJSON).join()}]`;
    } else if (type === "function") {
        return `{"_fn":"${prop.name}"}`;
    } else if (type === "object" && prop._id !== undefined) {
        return `{"_id":${prop._id}}`;
    }
    if (prop === undefined) return '"undefined"';
    console.error("not handled property", prop);
}

function reverseProperty(prop) {
    const type = typeof prop;
    if (prop === "undefined") return undefined;
    if (type === "number" || type === "string"
    || prop === null|| type === "boolean") return prop;
    if (Array.isArray(prop)) return prop.map(reverseProperty);
    if (prop._fn !== undefined) return window[prop._fn];
    if (prop._id !== undefined) return ObjectTree.getObjects()[prop._id];
    console.error("Not handled", prop);
}

function saveTables() {
    const tables = [];

    for (let i = 0; i < partialTablesPos; i++)
        tables.push(`"${tablesToSave[i]}":${propToJSON(window[tablesToSave[i]])}`);
    for (let i = partialTablesPos; i < tablesToSave.length; i++)
        tables.push(`"${tablesToSave[i]}":[${window[tablesToSave[i]].slice(0, 2)}]`);

    return `{${tables.join()}}`
}

function restoreTables(tables) {
    for (let i = 0; i < partialTablesPos; i++)
        window[tablesToSave[i]] = reverseProperty(tables[tablesToSave[i]]);
    for (let i = partialTablesPos; i < tablesToSave.length; i++) {
        window[tablesToSave[i]][0] = tables[tablesToSave[i]][0];
        window[tablesToSave[i]][1] = tables[tablesToSave[i]][1];
    }
}

function RESTART() {
    document.location.reload();
}


DIRECTIONS("NORTH", "NE", "EAST", "SE", "SOUTH", "SW", "WEST", "NW", "UP", "DOWN", "IN", "OUT");