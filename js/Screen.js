/**
 * Object manager of the visualization on screen, which is represented with a table
 * 
 */
const Screen = (() => {
    const width = 80, // characters per line
        height = 25; // number of lines
    
    // Matrix holding the table's cells
    const table = [];
    let htmlTable; // DOM Table object

    const DEFAULT_FORE = "#fff",
        DEFAULT_BACK = "#000";
    const colors = ["#000", "#000", "#000", "#f00", "#0f0", "#ff0", "#00f", "#f0f", "#0ff", "#fff"];
    const styleProperties = ["color", "backgroundColor", "fontStyle", "fontWeight", "fontFamily", "transform"];
    
    const MORE_line = window => "".padEnd(window.dim[0]*0.5-10," ") + "[MORE]";
    let more = false;

    // How many lines can be printed before a MORE
    let lineCount = height;

    // Initialization. It generates the table
    function init () {
        const s = document.getElementById("screen");
        htmlTable = document.createElement("TABLE");
        for (let i = 0; i < height; i++) {
            const htmlTr = document.createElement("TR");
            const tr = [];
            for (let j = 0; j < width; j++) {
                const td = document.createElement("TD");
                const content = document.createElement("DIV");
                td.appendChild(content)
                htmlTr.appendChild(td);
                tr.push(content);
            }
            htmlTable.appendChild(htmlTr);
            table.push(tr);
        }
        s.appendChild(htmlTable);

        windows[0].dim = [width, height];
        windows[1].dim = [width, 0];

        blinking.start();

        // If you need to debug the cursor position, uncomment next line
        //updateCursor();
    }

    function updateCursor() {
        const cursor = document.getElementById("cursor");
        cursor.innerText = window_selected.cursor.join(", ");
        requestAnimationFrame(updateCursor);
    }

    /**
     * Object manager of the blinking cursor
     */
    const blinking = (() => {
        let t = false;
        let clock = null;
        const BLINK_RATE = 400;
        const prev = [0, 0];
        let enabled = true;

        function start() {
            stop();
            if (!enabled) return;
            t = false;
            clock = setInterval(() => {
                if (!enabled) return;
                let w = window_selected;
                prev[0] = w.pos[0] + w.cursor[0] - 2;
                prev[1] = w.pos[1] + w.cursor[1] - 2;
                const row = table[w.pos[1] + w.cursor[1] - 2];
                if (!row) return;
                const cell = row[w.pos[0] + w.cursor[0] - 2];
                if (!cell) return;
                const fore = display_mode === H_INVERSE ? w.back : w.fore;
                const back = display_mode === H_INVERSE ? w.fore : w.back;
                cell.style.backgroundColor = t
                    ? (fore === 1 ? DEFAULT_FORE : colors[fore])
                    : (back === 1 ? DEFAULT_BACK : colors[back])
                ;
                t = !t;
            }, BLINK_RATE);
        }

        function stop () {
            clearInterval(clock);
            let w = window_selected;
            if (!enabled) {
                prev[0] = w.pos[0] + w.cursor[0] - 2;
                prev[1] = w.pos[1] + w.cursor[1] - 2;
                return;
            }
            const row = table[prev[1]];
            if (!row) return;
            const cell = row[prev[0]];
            if (!cell) return;
            const back = display_mode === H_INVERSE ? w.fore : w.back;
            cell.style.backgroundColor = (back === 1 ? DEFAULT_BACK : colors[back]);
        }

        function disable() {
            enabled = false;
        }

        function enable() {
            enabled = true;
        }

        return {
            start,
            stop,
            disable,
            enable
        };
    })();

    // Clear the whole screen
    function clear() {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                table[i][j].innerHTML = "";
                table[i][j].style.backgroundColor = DEFAULT_BACK;
            }
        }
        lineCount = windows[0].dim[1];
    }

    // Clear the selected window
    function clearWindow(window) {
        for (let i = window.pos[1] - 1; i < window.pos[1] + window.dim[1] - 1; i++) {
            for (let j = window.pos[0] - 1; j < window.pos[0] + window.dim[0] - 1; j++) {
                table[i][j].innerHTML = "";
                table[i][j].style.backgroundColor = DEFAULT_BACK;
            }
        }
        window.cursor = [1, 1];
        if (window === windows[0]) lineCount = windows[0].dim[1];
    }

    // Print a specific char at the given position
    function print_char(style, x, y, char) {
        const cell = table[y][x];
        cell.innerText = char;
        for (const key in style)
            cell.style[key] = style[key];
        cell.parentNode.style.overflow = style.overflow;
    }

    // Scroll the window 1 line upwards
    function doScroll(window) {
        const h = window.dim[1] < height ? window.dim[1] : height;
        for (let i = window.pos[0] - 1, end_i = window.pos[0] + window.dim[0] - 1; i < end_i; i++) {
            for (let j = window.pos[1], end_j = window.pos[1] + h - 1; j < end_j; j++) {
                table[j - 1][i].innerHTML = table[j][i].innerHTML;
                for (const p of styleProperties)
                    table[j - 1][i].style[p] = table[j][i].style[p];
                table[j - 1][i].parentNode.style.overflow = table[j][i].parentNode.style.overflow;
            }
            table[window.pos[1] + h - 2][i].innerText = "";
        }
    }

    const getColor = window => [
        window.fore === 1 ? DEFAULT_FORE : colors[window.fore],
        window.back === 1 ? DEFAULT_BACK : colors[window.back]
    ];

    const createStyle = window => ({
        color: getColor(window)[(display_mode === H_INVERSE)+0],
        backgroundColor: getColor(window)[1-(display_mode === H_INVERSE)],
        fontStyle: display_mode === H_ITALIC ? "italic" : "normal",
        fontWeight: display_mode === H_BOLD ? "bold" : "normal",
        fontFamily: display_font === 1 ? "atariST" : "FONT3INFORM",
        transform: display_font === 1 ? "" : "scale(1.05,2.5) translateY(1px)",
        overflow: display_font === 1 ? "visible" : "hidden",
    });

    const noSpaces = x => x[0] === " " ? noSpaces(x.slice(1)) : x;

    const needsWrap = (a, b) => a && b && !/\s/.test(a) && !/\s/.test(b);

    const wrapBreak = (x, width) => x.slice(0, width).lastIndexOf(" ") + 1;

    const wrap = (x, width) => !x ? [] : (
        needsWrap(x[width-1], x[width])
            ? [x.slice(0, wrapBreak(x, width)), ...wrap(x.slice(wrapBreak(x, width)), width)]
            : [x.slice(0, width), ...wrap(noSpaces(x.slice(width)), width)]
    );

    const processContent = (content, width) => content
        .split("\n")
        .map(x => x ? wrap(x, width) : x)
        .flat();

    /**
     * Main function of the screen.
     * It prints the new content of each window (actually there are only 2 available)
     * It also verifies if it need to print a [MORE]
     */
    function draw() {
        blinking.stop();
        for (const window of windows) {
            if (!window.content || window.number === more - 1) continue;
            let oy = window.pos[1] - 1;
            let x = window.cursor[0] - 1, y = window.cursor[1] - 1;
            const wh = window.dim[1];
            if (window === windows[0])
                (()=>{})();
            const padding = "".padEnd(x, "\x00");
            let content = processContent(padding + window.content, width);
            const nextLines = content.length - 1;
            const style = createStyle(window);
            window.content = "";

            if (window === windows[0]) {
                lineCount -= nextLines;
                if (lineCount <= 0) {
                    // [MORE]
                    const kept = wh - y - 1;
                    window.content = content.slice(kept).join("\n");
                    content = content.slice(0, kept);
                    content.push(MORE_line(window));
                    more = window.number + 1;
                }
            }

            content.forEach(line => {
                if (y >= window.dim[1] && window === windows[0]) {
                    doScroll(window);
                    y--;
                }
                x = 0;
                for(const char of line) {
                    if (char !== "\x00") // skips padding
                        print_char(style, x, oy + y, char);
                    x++;
                }
                y++;
            });
            window.cursor[0] = x+1;
            window.cursor[1] = y;
        }
        blinking.start();
    }

    // Prints on screen the character enter by the user
    function input(c) {
        blinking.stop();
        const window = window_selected;
        let oy = window.pos[1] - 1;
        let x = window.cursor[0] - 1, y = window.cursor[1] - 1;
        let can = x < window.dim[0];
        if (x < width && oy + y < height && can)
            print_char(createStyle(window), x, oy + y, c);
        window.cursor[0] = x + 2;
        blinking.start();
    }

    // If the user press the Backspace key, then show the effect on screen
    function backspace() {
        blinking.stop();
        const window = window_selected;
        let ox = window.pos[0] - 1,
            oy = window.pos[1] - 1;
        let x = window.cursor[0] - 1, y = window.cursor[1] - 1;
        x--;
        table[oy + y][ox + x].innerText = "";
        window.cursor[0] = x + 1;
        blinking.start();
    }

    // Do a carriage return
    function cr () {
        blinking.stop();
        window_selected.cursor[0] = 1;
        window_selected.cursor[1]++;
        blinking.start();
    }

    // Erases the line of the window where its cursor is located
    function eraseLine(window) {
        const style = createStyle(window);
        for(let x = 0; x < width; x++)
            print_char(style, x, window.pos[1] + window.cursor[1]-2, " ");
    }

    // If there was a [MORE], then this function resumes the draw, after the user press a key
    function keepDraw() {
        blinking.stop();
        lineCount = windows[0].dim[1];
        //windows[0].cursor = [1, 1];
        doScroll(windows[0]);
        windows[0].cursor[0] = 1;
        windows[0].cursor[1] -=1;
        eraseLine(windows[0]);
        windows[0].scroll = 0;
        windows[0].fore = 1;
        windows[0].back = 1;
        more = false;
        draw();
        blinking.start();
    }

    // For the "COLOR" command enter by the user
    function setScreenBackground(color) {
        color = colors[color];
        document.body.style.backgroundColor = color;
        for (const row of table)
            for (const cell of row)
                cell.style.backgroundColor = color;
    }

    /**
     * Debug function for mouse
     */
    function mouse(m) {
        const y = Math.floor(m.y / CHEIGHT);
        const x = Math.floor(m.x / CWIDTH);
        const row = table[y];
        if (!row) return;
        const cell = row[x];
        if (!cell) return;
        cell.style.backgroundColor = "#fff";
    }

    return {
        init,
        draw,
        clear,
        clearWindow,
        input,
        backspace,
        cr,
        isMore: () => more,
        keepDraw, 
        width,
        height,
        blinking,
        processContent,
        resetLineCount: () => {lineCount = windows[0].dim[1]},
        setScreenBackground,
        getTablePosition: () => ({
            x: htmlTable ? htmlTable.offsetLeft : 0,
            y: htmlTable ? htmlTable.offsetTop : 0
        }),
        mouse
    };
})();