'use strict';

/**
 * This class simulates the use of pointers through proxies.
 * Each instance represents an array pointer shifted to right by some amount
 */
class ProxyArray {

    /**
     * @constructor ProxyArray constructor
     * @param source Source of data
     * @param start Offset of this pointer
     */
    constructor(source, start) {
        if (source.valueOf instanceof ProxyArray) {
            this.source = source.valueOf.source;
            this.start = source.valueOf.start + start;
        } else {
            this.source = source;
            this.start = start;
        }
        this.proxy = new Proxy(this.source, this.handler(o => o.slice(this.start), this.start));
        //this.proxy.toString = Function.prototype.bind(source);
        return this.proxy;
    }

    handler(getData, start) {
        return {
            get: (source, key) => {
                if (key === 'length') {
                    return getData(source).length;
                } else if (typeof Array.prototype[key] === 'function') {
                    if (typeof this[key] === 'function') {
                        return this[key]();
                    } else if(key === Symbol.iterator) {
                        return function* () {
                            for (const v of getData(source))
                            yield v;
                        };
                    }
                } else { 
                    return getData(source)[key];
                }
            },

            set: (source, key, value) => {
                key = parseInt(key);
                source[key + start] = value;
                return true;
            }

        }
    }

    get length() {
        return this.proxy.length;
    }

    includes() {
        return this.source.slice(this.start).includes;
    }

    indexOf() {
        return this.source.slice(this.start).indexOf;
    }

    slice() {
        return (start, end = this.length) => {
            let result = [];
            for (let i = start; i < end; i++) {
            result.push(this.proxy[i]);
            }
            return result;
        }
    }

    forEach() {
        return (func) => {
            for(let i = 0; i < this.length; i++) {
            func(this.proxy[i], i, this.proxy);
            }
            return this.proxy;
        }
    }

    map() {
        return (op) => {
            let result = [];
            for (let i = 0; i < this.length; i++) {
                result.push(op(this.proxy[i], i, this.proxy));
            }
            return result;
        }
    }

    filter() {
        return (op) => {
            let result = [];
            for (let i = 0; i < this.length; i++) {
                if (op(this.proxy[i], i, this.proxy))
                    result.push(this.proxy[i]);
            }
            return result;
        }
    }

    reduce() {
        return (op, init) => {
            let total = init;
            for (let i = 0; i < this.length; i++) {
                total = op(total, this.proxy[i], i, this.proxy);
            }
            return total;
        }
    }

    join() {
        return (separator = ",") => {
            let result = "";
            for (let i = 0; i < this.length - 1; i++) {
                result += this.proxy[i] + separator;
            }
            return result + this.proxy[this.length - 1];
        }
    }

    toString() {
        return () => {
            let result = "[ ";
            for (let i = 0; i < this.length - 1; i++) {
                result += this.proxy[i] + ", ";
            }
            return result + this.proxy[this.length - 1] + " ]";
        }
    }

    get [Symbol.toStringTag]() {
        return "ProxyArray";
    }
}
