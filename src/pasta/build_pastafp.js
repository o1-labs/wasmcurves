const bigInt = require("big-integer");
const utils = require("../utils");

const buildF1m =require("../build_f1m.js");

module.exports = function buildPastaFp(module, _prefix) {

    const prefix = _prefix || "pastafp";

    if (module.modules[prefix]) return prefix;  // already builded

    // pasta fp
    const q = bigInt("28948022309329048855892746252171976963363056481941560715954676764349967630337");

    const n64 = Math.floor((q.minus(1).bitLength() - 1)/64) +1;
    const n8 = n64*8;
    const frsize = n8;

    const f1mPrefix = buildF1m(module, q, "f1m");

    function toMontgomery(a) {
        return bigInt(a).times( bigInt.one.shiftLeft(f1size*8)).mod(q);
    }

    module.modules[prefix] = {
        n64: n64,
        pq: module.modules["f1m"].pq,
        q: q.toString()
    };

    console.log(module.functionIdxByName);
};


