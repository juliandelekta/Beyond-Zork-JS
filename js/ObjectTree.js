/**
 * This object represent the Game Object Tree
 */
const ObjectTree = (() => {

    const unresolved = [];
    const dirPairs = [];
    const objects = [];

    /**
     * Adds the relation child-parent
     * @param {OBJECT} child 
     * @param {OBJECT} parent 
     */
    function add(child, parent) {
        unresolved.push([child, parent]);
    }

    /**
     * Adds the object to the internal set if it is not included
     * @param {OBJECT} obj 
     */
    function addObject(obj) {
        if (!objects.includes(obj)) {
            obj._id = objects.length;
            objects.push(obj);
        }
    }

    /**
     * Adds the relation objection-direction that has to be solved later
     * @param {OBJECT} obj 
     * @param {DIRECTION} dir 
     */
    function addDirectionPair(obj, dir) {
        dirPairs.push([obj, dir]);
    }

    /**
     * Resolve pending relations 
     */
    function generate() {
        for (const [child, parent] of unresolved)
            MOVE(child, parent);
        for (const [obj, dir] of dirPairs) {
            if (typeof obj[dir] !== "function") console.error(obj, dir);
            obj[dir] = obj[dir]();
        }
    }

    /**
     * 
     * @returns the string representation of the Object Tree
     */
    function toJSON() {
        return `[${objects.map(objectToJSON).join(",")}]`;
    }

    /**
     * Restores the Object Tree from the array parsed from a JSON string
     * @param {Array<OBJECT>} objs 
     */
    function fromJSON(objs) {
        for (const jsonObj of objs) {
            if (!objects[jsonObj._id]) {
                console.error("No found object", jsonObj, objects);
                break;
            }
            const obj = objects[jsonObj._id];
            for (const prop in jsonObj) {
                obj[prop] = reverseProperty(jsonObj[prop]);
            }
        }
    }

    return {
        add,
        addObject,
        addDirectionPair,
        toJSON,
        fromJSON,
        getObjects: () => objects,
        generate
    };
})();