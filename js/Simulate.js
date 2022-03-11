/**
 * Module that simulates user inputs
 * In the main .html is an example
 * To use it first you have to set the erase the display property
 * of the simulation controlers in the main .html
 */
const Simulate = (() => {
    const simstart = document.getElementById("simstart"),
        simnext = document.getElementById("simnext");
    const instructions = [];
    let i = 0, auto = false;

    function blur() {
        simstart.blur();
        simnext.blur();
    }

    function load(input) {
        instructions.push(...input.split("\n").map(x => x + "\n"));
    }

    function send() {
        const m_input = instructions[i++];
        if (m_input) {
            for (let c of m_input) document.dispatchEvent(new KeyboardEvent("keydown", keyObject(c)));
            
        }
    }

    function start() {
        simstart.innerText = "Stop";
        simstart.onclick = stop;
        simnext.style.display = "none";
        auto = true;
        send();
        blur();
    }

    function stop() {
        simstart.innerText = "Start";
        simstart.onclick = start;
        simnext.style.display = "";
        auto = false;
        blur();
    }

    function next() {
        send();
        blur();
    }

    function inputSend() {
        if (auto) send();
    }

    return {
        load,
        start,
        stop,
        next,
        inputSend
    }
})();