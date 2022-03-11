/* PROPERTY CONVERTIONS */
const PROPERTY_LIST = ["READIQ", "MIRROR_DIR", "EFFECT", "BEAM_DIR", "MIRROR_OBJ",
"SEE_ALL", "COORDS", "BELOW", "THIS_CASE", "ODOR", "HEAR", "THINGS", "FNUM",
"GLOBAL", "OVERHEAD", "DNUM", "CAPACITY", "EXIT_STR", "HABITAT", "VALUE",
"DEXTERITY", "STRENGTH", "EMAX", "ENDURANCE", "NAME_TABLE", "SIZE", "GENERIC",
"LAST_LOC", "CONTFCN", "DESCFCN", "LIFE", "ADJECTIVE", "SYNONYM", "ACTION",
"SDESC", "OUT", "IN", "DOWN", "UP", "NW", "WEST", "SW", "SOUTH", "SE", "EAST", "NE", "NORTH"];

const asPROP = prop => PROPERTY_LIST.indexOf(prop);
const PROP = num => PROPERTY_LIST[num];
const asDIRECTION = dir => VOCAB[dir][1];

/* INPUT HANDLING */
/**
 * Object manager of each key pressed
 */
const keydown_handler = (function () {
    let line = "";
    let terminating_characters = [
        "Enter",
        ..."".padEnd(10,0).split("").map((x,i)=>"F"+(i+1)),
        ..."".padEnd(10,0).split("").map((x,i)=>"Numpad"+i),
    ];
    let command_keys = ["ShiftLeft", "ShiftRight", "ControlLeft",
        "ControlRight", "AltLeft", "AltRight", "ContextMenu", "CapsLock"];

    // Key code of the last key pressed
    let last_key_pressed = 0;

    let isInDefine = false;
    
    // Function that waits for a key pressed
    let subscriber = null;

    return {
        post: key => {
            last_key_pressed = key.which;

            if (key.code === "Click") {
                if (!isInDefine) {
                    input_stream.post("");
                    line = "";
                }
                return;
            }
            
            if (last_key_pressed > 111 && last_key_pressed < 122) {
                // F1-F10
                last_key_pressed += 21;
                key.preventDefault();
            } else if (last_key_pressed >= 96 && last_key_pressed <= 105) {
                // Numpad0-Numpad9
                last_key_pressed += 49;
                key.preventDefault();
            }

            if (Screen.isMore()) {
                Screen.keepDraw();
                return;
            }

            if (subscriber) {
                const fn = subscriber;
                subscriber = null;
                fn(last_key_pressed);
                return;
            }

            if (terminating_characters.includes(key.code) || isInDefine && key.code.includes("Arrow")) {
                if(key.code === "Enter") Screen.cr();
                input_stream.post(line);
                line = "";
            } else if (key.code === "Backspace") {
                if (line)
                    Screen.backspace();
                line = line.slice(0, -1);
            } else if (!command_keys.includes(key.code) && key.key.length === 1) {
                line += key.key;
                Screen.input(key.key);
            }


        },
        subscribe: fn => {subscriber = fn},
        lastKey: () => last_key_pressed,
        setLine: l => {line = l},
        inDefine: v => {isInDefine = v}
    };
})();

document.addEventListener("keydown", keydown_handler.post);
document.addEventListener("mousedown", e => {
    e.preventDefault();
    keydown_handler.post({
        code: "Click",
        which: 254 - Math.floor(e.button*0.5)
    });
});
document.addEventListener("contextmenu", e => {e.preventDefault()});

const mouse = {x: 10, y: 10};
document.addEventListener("mousemove", e => {
    const offset = Screen.getTablePosition();
    mouse.x = e.pageX - offset.x;
    mouse.y = e.pageY - offset.y;
    //Screen.mouse(mouse);
});

const leftArrow = "\x01",
    upArrow = "\x02",
    rightArrow = "\x03",
    downArrow = "\x04";

const specialKeyCodes = {
    "\n": ["Enter", "Enter", 13],
    " ": [" ", "Space", 32],
    [leftArrow]: ["ArrowLeft", "ArrowLeft", 37],
    [upArrow]: ["ArrowUp", "ArrowUp", 38],
    [rightArrow]: ["ArrowRight", "ArrowRight", 39],
    [downArrow]: ["ArrowDown", "ArrowDown", 40],
};

const keyObject = c => {
    let obj = specialKeyCodes[c];

    if (!obj)
        obj = isNaN(c)
            ? [c, "Key" + c.toUpperCase(), c.toUpperCase().charCodeAt(0)]
            : [c, "Digit" + c, c.charCodeAt(0)];

    return {
        key: obj[0],
        code: obj[1],
        keyCode: obj[2]
    };
};

/**
 * Object that represents a stream of inputs enter by the user.
 * When it listens to a new line enter by the user, forwards it to the subscribed function
 */
const input_stream = (function () {

    const lines = [];

    let onPostFn = console.log;

    function subscribe(fn) {
        onPostFn = fn;
    }

    function post(value) {
        lines.push(value);
        const fn = onPostFn;
        onPostFn = () => {};
        fn(value);
    }

    return {
        subscribe,
        post,
        getInputs: () => lines.join("\n")
    };
})();

/**
 * Constructor of an object that represents a loop
 * Example:
 * const loop = loop_stream();
 * loop.loadPreaction(() => {
 *   // Initializes variables
 *   foo(loop);
 * });
 * loop.loadPostaction(value => {
 *   // Do something to value and evaluates...
 *   if (we need to repeat the loop)
 *     loop.again()
 *   else if (we need to break the loop and return some value)
 *     loop.finish(finish value)
 *   else if (we nedd to just break the loop)
 *     return
 * });
 * // Optional
 * loop.onFinish(finishValue => {
 *   // Do something with the finish value
 * });
 * 
 * Inside de foo function it should evaluate a value and return it through
 * the loop with its post() message:
 * function foo(loop) {
 *   // Generates a return value
 *   loop.post(value);
 * }
 */
const loop_stream = function() {
    let m_preaction = () => null;
    let m_postaction = v => console.log("LOOP:", v);
    let m_break = () => {};

    function loadPreaction(preaction) {
        preaction();
        m_preaction = preaction;
    }

    function loadPostaction(postaction) {
        m_postaction = postaction;
    }

    function post(...value) {
        m_postaction(...value);
    }

    function again() {
        m_preaction();
    }

    function finish(value) {
        m_break(value);
    }

    function onFinish (fn) {
        m_break = fn;
    }

    return {
        post,
        again,
        finish,
        onFinish,
        loadPostaction,
        loadPreaction
    };
}

/**
 * Generates a lazy function that will wait to be called to execute its code
 */
const lazy = function (fn=console.log) {
    let m_fn = fn;

    function setFn(f) {
        m_fn = f;
    }

    return {
        post: value => m_fn(value),
        setFn
    }
};