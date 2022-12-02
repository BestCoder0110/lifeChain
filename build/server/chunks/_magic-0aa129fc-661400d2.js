import require$$0 from 'crypto';
import { M as MAGIC_SECRET_KEY } from './_utils-7b4af845-9c81a495.js';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

var nodeAtob = atob.atob = atob;

var keccak = {};

var sha3 = {};

var _assert = {};

Object.defineProperty(_assert, "__esModule", { value: true });
_assert.output = _assert.exists = _assert.hash = _assert.bytes = _assert.bool = _assert.number = void 0;
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`Wrong positive integer: ${n}`);
}
_assert.number = number;
function bool(b) {
    if (typeof b !== 'boolean')
        throw new Error(`Expected boolean, not ${b}`);
}
_assert.bool = bool;
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array))
        throw new TypeError('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length))
        throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
_assert.bytes = bytes;
function hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function')
        throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
_assert.hash = hash;
function exists(instance, checkFinished = true) {
    if (instance.destroyed)
        throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished)
        throw new Error('Hash#digest() has already been called');
}
_assert.exists = exists;
function output$1(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
_assert.output = output$1;
const assert = {
    number,
    bool,
    bytes,
    hash,
    exists,
    output: output$1,
};
_assert.default = assert;

var _u64 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
	const U32_MASK64 = BigInt(2 ** 32 - 1);
	const _32n = BigInt(32);
	// We are not using BigUint64Array, because they are extremely slow as per 2022
	function fromBig(n, le = false) {
	    if (le)
	        return { h: Number(n & U32_MASK64), l: Number((n >> _32n) & U32_MASK64) };
	    return { h: Number((n >> _32n) & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
	}
	exports.fromBig = fromBig;
	function split(lst, le = false) {
	    let Ah = new Uint32Array(lst.length);
	    let Al = new Uint32Array(lst.length);
	    for (let i = 0; i < lst.length; i++) {
	        const { h, l } = fromBig(lst[i], le);
	        [Ah[i], Al[i]] = [h, l];
	    }
	    return [Ah, Al];
	}
	exports.split = split;
	const toBig = (h, l) => (BigInt(h >>> 0) << _32n) | BigInt(l >>> 0);
	exports.toBig = toBig;
	// for Shift in [0, 32)
	const shrSH = (h, l, s) => h >>> s;
	const shrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	// Right rotate for Shift in [1, 32)
	const rotrSH = (h, l, s) => (h >>> s) | (l << (32 - s));
	const rotrSL = (h, l, s) => (h << (32 - s)) | (l >>> s);
	// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotrBH = (h, l, s) => (h << (64 - s)) | (l >>> (s - 32));
	const rotrBL = (h, l, s) => (h >>> (s - 32)) | (l << (64 - s));
	// Right rotate for shift===32 (just swaps l&h)
	const rotr32H = (h, l) => l;
	const rotr32L = (h, l) => h;
	// Left rotate for Shift in [1, 32)
	const rotlSH = (h, l, s) => (h << s) | (l >>> (32 - s));
	const rotlSL = (h, l, s) => (l << s) | (h >>> (32 - s));
	// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
	const rotlBH = (h, l, s) => (l << (s - 32)) | (h >>> (64 - s));
	const rotlBL = (h, l, s) => (h << (s - 32)) | (l >>> (64 - s));
	// JS uses 32-bit signed integers for bitwise operations which means we cannot
	// simple take carry out of low bit sum by shift, we need to use division.
	// Removing "export" has 5% perf penalty -_-
	function add(Ah, Al, Bh, Bl) {
	    const l = (Al >>> 0) + (Bl >>> 0);
	    return { h: (Ah + Bh + ((l / 2 ** 32) | 0)) | 0, l: l | 0 };
	}
	exports.add = add;
	// Addition with more than 2 elements
	const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
	const add3H = (low, Ah, Bh, Ch) => (Ah + Bh + Ch + ((low / 2 ** 32) | 0)) | 0;
	const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
	const add4H = (low, Ah, Bh, Ch, Dh) => (Ah + Bh + Ch + Dh + ((low / 2 ** 32) | 0)) | 0;
	const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
	const add5H = (low, Ah, Bh, Ch, Dh, Eh) => (Ah + Bh + Ch + Dh + Eh + ((low / 2 ** 32) | 0)) | 0;
	// prettier-ignore
	const u64 = {
	    fromBig, split, toBig: exports.toBig,
	    shrSH, shrSL,
	    rotrSH, rotrSL, rotrBH, rotrBL,
	    rotr32H, rotr32L,
	    rotlSH, rotlSL, rotlBH, rotlBL,
	    add, add3L, add3H, add4L, add4H, add5H, add5L,
	};
	exports.default = u64;
} (_u64));

var utils$1 = {};

var crypto = {};

Object.defineProperty(crypto, "__esModule", { value: true });
crypto.crypto = void 0;
const nodeCrypto = require$$0;
crypto.crypto = {
    node: nodeCrypto,
    web: undefined,
};

(function (exports) {
	/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.randomBytes = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
	// The import here is via the package name. This is to ensure
	// that exports mapping/resolution does fall into place.
	const crypto_1 = crypto;
	// Cast array to different type
	const u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
	exports.u8 = u8;
	const u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
	exports.u32 = u32;
	// Cast array to view
	const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
	exports.createView = createView;
	// The rotate right (circular right shift) operation for uint32
	const rotr = (word, shift) => (word << (32 - shift)) | (word >>> shift);
	exports.rotr = rotr;
	exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
	// There is almost no big endian hardware, but js typed arrays uses platform specific endianness.
	// So, just to be sure not to corrupt anything.
	if (!exports.isLE)
	    throw new Error('Non little-endian hardware is not supported');
	const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
	/**
	 * @example bytesToHex(Uint8Array.from([0xde, 0xad, 0xbe, 0xef]))
	 */
	function bytesToHex(uint8a) {
	    // pre-caching improves the speed 6x
	    if (!(uint8a instanceof Uint8Array))
	        throw new Error('Uint8Array expected');
	    let hex = '';
	    for (let i = 0; i < uint8a.length; i++) {
	        hex += hexes[uint8a[i]];
	    }
	    return hex;
	}
	exports.bytesToHex = bytesToHex;
	/**
	 * @example hexToBytes('deadbeef')
	 */
	function hexToBytes(hex) {
	    if (typeof hex !== 'string') {
	        throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
	    }
	    if (hex.length % 2)
	        throw new Error('hexToBytes: received invalid unpadded hex');
	    const array = new Uint8Array(hex.length / 2);
	    for (let i = 0; i < array.length; i++) {
	        const j = i * 2;
	        const hexByte = hex.slice(j, j + 2);
	        const byte = Number.parseInt(hexByte, 16);
	        if (Number.isNaN(byte) || byte < 0)
	            throw new Error('Invalid byte sequence');
	        array[i] = byte;
	    }
	    return array;
	}
	exports.hexToBytes = hexToBytes;
	// There is no setImmediate in browser and setTimeout is slow. However, call to async function will return Promise
	// which will be fullfiled only on next scheduler queue processing step and this is exactly what we need.
	const nextTick = async () => { };
	exports.nextTick = nextTick;
	// Returns control to thread each 'tick' ms to avoid blocking
	async function asyncLoop(iters, tick, cb) {
	    let ts = Date.now();
	    for (let i = 0; i < iters; i++) {
	        cb(i);
	        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
	        const diff = Date.now() - ts;
	        if (diff >= 0 && diff < tick)
	            continue;
	        await (0, exports.nextTick)();
	        ts += diff;
	    }
	}
	exports.asyncLoop = asyncLoop;
	function utf8ToBytes(str) {
	    if (typeof str !== 'string') {
	        throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
	    }
	    return new TextEncoder().encode(str);
	}
	exports.utf8ToBytes = utf8ToBytes;
	function toBytes(data) {
	    if (typeof data === 'string')
	        data = utf8ToBytes(data);
	    if (!(data instanceof Uint8Array))
	        throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
	    return data;
	}
	exports.toBytes = toBytes;
	/**
	 * Concats Uint8Array-s into one; like `Buffer.concat([buf1, buf2])`
	 * @example concatBytes(buf1, buf2)
	 */
	function concatBytes(...arrays) {
	    if (!arrays.every((a) => a instanceof Uint8Array))
	        throw new Error('Uint8Array list expected');
	    if (arrays.length === 1)
	        return arrays[0];
	    const length = arrays.reduce((a, arr) => a + arr.length, 0);
	    const result = new Uint8Array(length);
	    for (let i = 0, pad = 0; i < arrays.length; i++) {
	        const arr = arrays[i];
	        result.set(arr, pad);
	        pad += arr.length;
	    }
	    return result;
	}
	exports.concatBytes = concatBytes;
	// For runtime check if class implements interface
	class Hash {
	    // Safe version that clones internal state
	    clone() {
	        return this._cloneInto();
	    }
	}
	exports.Hash = Hash;
	// Check if object doens't have custom constructor (like Uint8Array/Array)
	const isPlainObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
	function checkOpts(defaults, opts) {
	    if (opts !== undefined && (typeof opts !== 'object' || !isPlainObject(opts)))
	        throw new TypeError('Options should be object or undefined');
	    const merged = Object.assign(defaults, opts);
	    return merged;
	}
	exports.checkOpts = checkOpts;
	function wrapConstructor(hashConstructor) {
	    const hashC = (message) => hashConstructor().update(toBytes(message)).digest();
	    const tmp = hashConstructor();
	    hashC.outputLen = tmp.outputLen;
	    hashC.blockLen = tmp.blockLen;
	    hashC.create = () => hashConstructor();
	    return hashC;
	}
	exports.wrapConstructor = wrapConstructor;
	function wrapConstructorWithOpts(hashCons) {
	    const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
	    const tmp = hashCons({});
	    hashC.outputLen = tmp.outputLen;
	    hashC.blockLen = tmp.blockLen;
	    hashC.create = (opts) => hashCons(opts);
	    return hashC;
	}
	exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
	/**
	 * Secure PRNG
	 */
	function randomBytes(bytesLength = 32) {
	    if (crypto_1.crypto.web) {
	        return crypto_1.crypto.web.getRandomValues(new Uint8Array(bytesLength));
	    }
	    else if (crypto_1.crypto.node) {
	        return new Uint8Array(crypto_1.crypto.node.randomBytes(bytesLength).buffer);
	    }
	    else {
	        throw new Error("The environment doesn't have randomBytes function");
	    }
	}
	exports.randomBytes = randomBytes;
} (utils$1));

Object.defineProperty(sha3, "__esModule", { value: true });
sha3.shake256 = sha3.shake128 = sha3.keccak_512 = sha3.keccak_384 = sha3.keccak_256 = sha3.keccak_224 = sha3.sha3_512 = sha3.sha3_384 = sha3.sha3_256 = sha3.sha3_224 = sha3.Keccak = sha3.keccakP = void 0;
const _assert_js_1$1 = _assert;
const _u64_js_1 = _u64;
const utils_js_1$2 = utils$1;
// Various per round constants calculations
const [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(0x71);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
    // Pi
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((((round + 1) * (round + 2)) / 2) % 64);
    // Iota
    let t = _0n;
    for (let j = 0; j < 7; j++) {
        R = ((R << _1n) ^ ((R >> _7n) * _0x71n)) % _256n;
        if (R & _2n)
            t ^= _1n << ((_1n << BigInt(j)) - _1n);
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = _u64_js_1.default.split(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBH(h, l, s) : _u64_js_1.default.rotlSH(h, l, s);
const rotlL = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBL(h, l, s) : _u64_js_1.default.rotlSL(h, l, s);
// Same as keccakf1600, but allows to skip some rounds
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for (let round = 24 - rounds; round < 24; round++) {
        // Theta θ
        for (let x = 0; x < 10; x++)
            B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++)
                B[x] = s[y + x];
            for (let x = 0; x < 10; x++)
                s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
sha3.keccakP = keccakP;
class Keccak extends utils_js_1$2.Hash {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        _assert_js_1$1.default.number(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200)
            throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1$2.u32)(this.state);
    }
    keccak() {
        keccakP(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        _assert_js_1$1.default.exists(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1$2.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
                state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
                this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished)
            return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1)
            this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        _assert_js_1$1.default.exists(this, false);
        _assert_js_1$1.default.bytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen)
                this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF)
            throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        _assert_js_1$1.default.number(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        _assert_js_1$1.default.output(out, this);
        if (this.finished)
            throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
sha3.Keccak = Keccak;
const gen = (suffix, blockLen, outputLen) => (0, utils_js_1$2.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
sha3.sha3_224 = gen(0x06, 144, 224 / 8);
/**
 * SHA3-256 hash function
 * @param message - that would be hashed
 */
sha3.sha3_256 = gen(0x06, 136, 256 / 8);
sha3.sha3_384 = gen(0x06, 104, 384 / 8);
sha3.sha3_512 = gen(0x06, 72, 512 / 8);
sha3.keccak_224 = gen(0x01, 144, 224 / 8);
/**
 * keccak-256 hash function. Different from SHA3-256.
 * @param message - that would be hashed
 */
sha3.keccak_256 = gen(0x01, 136, 256 / 8);
sha3.keccak_384 = gen(0x01, 104, 384 / 8);
sha3.keccak_512 = gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen) => (0, utils_js_1$2.wrapConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
sha3.shake128 = genShake(0x1f, 168, 128 / 8);
sha3.shake256 = genShake(0x1f, 136, 256 / 8);

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var utils = {exports: {}};

(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.crypto = exports.wrapHash = exports.equalsBytes = exports.hexToBytes = exports.bytesToUtf8 = exports.utf8ToBytes = exports.createView = exports.concatBytes = exports.toHex = exports.bytesToHex = exports.assertBytes = exports.assertBool = void 0;
	// buf.toString('hex') -> toHex(buf)
	const _assert_1 = __importDefault(_assert);
	const utils_1 = utils$1;
	const assertBool = _assert_1.default.bool;
	exports.assertBool = assertBool;
	const assertBytes = _assert_1.default.bytes;
	exports.assertBytes = assertBytes;
	var utils_2 = utils$1;
	Object.defineProperty(exports, "bytesToHex", { enumerable: true, get: function () { return utils_2.bytesToHex; } });
	Object.defineProperty(exports, "toHex", { enumerable: true, get: function () { return utils_2.bytesToHex; } });
	Object.defineProperty(exports, "concatBytes", { enumerable: true, get: function () { return utils_2.concatBytes; } });
	Object.defineProperty(exports, "createView", { enumerable: true, get: function () { return utils_2.createView; } });
	Object.defineProperty(exports, "utf8ToBytes", { enumerable: true, get: function () { return utils_2.utf8ToBytes; } });
	// buf.toString('utf8') -> bytesToUtf8(buf)
	function bytesToUtf8(data) {
	    if (!(data instanceof Uint8Array)) {
	        throw new TypeError(`bytesToUtf8 expected Uint8Array, got ${typeof data}`);
	    }
	    return new TextDecoder().decode(data);
	}
	exports.bytesToUtf8 = bytesToUtf8;
	function hexToBytes(data) {
	    const sliced = data.startsWith("0x") ? data.substring(2) : data;
	    return (0, utils_1.hexToBytes)(sliced);
	}
	exports.hexToBytes = hexToBytes;
	// buf.equals(buf2) -> equalsBytes(buf, buf2)
	function equalsBytes(a, b) {
	    if (a.length !== b.length) {
	        return false;
	    }
	    for (let i = 0; i < a.length; i++) {
	        if (a[i] !== b[i]) {
	            return false;
	        }
	    }
	    return true;
	}
	exports.equalsBytes = equalsBytes;
	// Internal utils
	function wrapHash(hash) {
	    return (msg) => {
	        _assert_1.default.bytes(msg);
	        return hash(msg);
	    };
	}
	exports.wrapHash = wrapHash;
	exports.crypto = (() => {
	    const webCrypto = typeof self === "object" && "crypto" in self ? self.crypto : undefined;
	    const nodeRequire = typeof commonjsRequire === "function" &&
	        commonjsRequire.bind(module);
	    return {
	        node: nodeRequire && !webCrypto ? nodeRequire("crypto") : undefined,
	        web: webCrypto
	    };
	})();
} (utils, utils.exports));

Object.defineProperty(keccak, "__esModule", { value: true });
keccak.keccak512 = keccak.keccak384 = keccak256 = keccak.keccak256 = keccak.keccak224 = void 0;
const sha3_1 = sha3;
const utils_1$1 = utils.exports;
keccak.keccak224 = (0, utils_1$1.wrapHash)(sha3_1.keccak_224);
var keccak256 = keccak.keccak256 = (() => {
    const k = (0, utils_1$1.wrapHash)(sha3_1.keccak_256);
    k.create = sha3_1.keccak_256.create;
    return k;
})();
keccak.keccak384 = (0, utils_1$1.wrapHash)(sha3_1.keccak_384);
keccak.keccak512 = (0, utils_1$1.wrapHash)(sha3_1.keccak_512);

var secp256k1Compat = {};

var sha256 = {};

var _sha2 = {};

Object.defineProperty(_sha2, "__esModule", { value: true });
_sha2.SHA2 = void 0;
const _assert_js_1 = _assert;
const utils_js_1$1 = utils$1;
// Polyfill for Safari 14
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function')
        return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number((value >> _32n) & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
// Base SHA2 class (RFC 6234)
class SHA2 extends utils_js_1$1.Hash {
    constructor(blockLen, outputLen, padOffset, isLE) {
        super();
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, utils_js_1$1.createView)(this.buffer);
    }
    update(data) {
        _assert_js_1.default.exists(this);
        const { view, buffer, blockLen } = this;
        data = (0, utils_js_1$1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, utils_js_1$1.createView)(data);
                for (; blockLen <= len - pos; pos += blockLen)
                    this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        _assert_js_1.default.exists(this);
        _assert_js_1.default.output(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        this.buffer.subarray(pos).fill(0);
        // we have less than padOffset left in buffer, so we cannot put length in current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for (let i = pos; i < blockLen; i++)
            buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, utils_js_1$1.createView)(out);
        this.get().forEach((v, i) => oview.setUint32(4 * i, v, isLE));
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.length = length;
        to.pos = pos;
        to.finished = finished;
        to.destroyed = destroyed;
        if (length % blockLen)
            to.buffer.set(buffer);
        return to;
    }
}
_sha2.SHA2 = SHA2;

Object.defineProperty(sha256, "__esModule", { value: true });
sha256.sha256 = void 0;
const _sha2_js_1 = _sha2;
const utils_js_1 = utils$1;
// Choice: a ? b : c
const Chi = (a, b, c) => (a & b) ^ (~a & c);
// Majority function, true if any two inpust is true
const Maj = (a, b, c) => (a & b) ^ (a & c) ^ (b & c);
// Round constants:
// first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311)
// prettier-ignore
const SHA256_K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);
// Initial state (first 32 bits of the fractional parts of the square roots of the first 8 primes 2..19):
// prettier-ignore
const IV = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
]);
// Temporary buffer, not used to store anything between runs
// Named this way because it matches specification.
const SHA256_W = new Uint32Array(64);
class SHA256 extends _sha2_js_1.SHA2 {
    constructor() {
        super(64, 32, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = IV[0] | 0;
        this.B = IV[1] | 0;
        this.C = IV[2] | 0;
        this.D = IV[3] | 0;
        this.E = IV[4] | 0;
        this.F = IV[5] | 0;
        this.G = IV[6] | 0;
        this.H = IV[7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ (W15 >>> 3);
            const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ (W2 >>> 10);
            SHA256_W[i] = (s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16]) | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
            const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
            const T2 = (sigma0 + Maj(A, B, C)) | 0;
            H = G;
            G = F;
            F = E;
            E = (D + T1) | 0;
            D = C;
            C = B;
            B = A;
            A = (T1 + T2) | 0;
        }
        // Add the compressed chunk to the current hash value
        A = (A + this.A) | 0;
        B = (B + this.B) | 0;
        C = (C + this.C) | 0;
        D = (D + this.D) | 0;
        E = (E + this.E) | 0;
        F = (F + this.F) | 0;
        G = (G + this.G) | 0;
        H = (H + this.H) | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        SHA256_W.fill(0);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        this.buffer.fill(0);
    }
}
/**
 * SHA2-256 hash function
 * @param message - data that would be hashed
 */
sha256.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());

var secp256k1 = {};

var hmac = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.hmac = void 0;
	const _assert_js_1 = _assert;
	const utils_js_1 = utils$1;
	// HMAC (RFC 2104)
	class HMAC extends utils_js_1.Hash {
	    constructor(hash, _key) {
	        super();
	        this.finished = false;
	        this.destroyed = false;
	        _assert_js_1.default.hash(hash);
	        const key = (0, utils_js_1.toBytes)(_key);
	        this.iHash = hash.create();
	        if (!(this.iHash instanceof utils_js_1.Hash))
	            throw new TypeError('Expected instance of class which extends utils.Hash');
	        const blockLen = (this.blockLen = this.iHash.blockLen);
	        this.outputLen = this.iHash.outputLen;
	        const pad = new Uint8Array(blockLen);
	        // blockLen can be bigger than outputLen
	        pad.set(key.length > this.iHash.blockLen ? hash.create().update(key).digest() : key);
	        for (let i = 0; i < pad.length; i++)
	            pad[i] ^= 0x36;
	        this.iHash.update(pad);
	        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
	        this.oHash = hash.create();
	        // Undo internal XOR && apply outer XOR
	        for (let i = 0; i < pad.length; i++)
	            pad[i] ^= 0x36 ^ 0x5c;
	        this.oHash.update(pad);
	        pad.fill(0);
	    }
	    update(buf) {
	        _assert_js_1.default.exists(this);
	        this.iHash.update(buf);
	        return this;
	    }
	    digestInto(out) {
	        _assert_js_1.default.exists(this);
	        _assert_js_1.default.bytes(out, this.outputLen);
	        this.finished = true;
	        this.iHash.digestInto(out);
	        this.oHash.update(out);
	        this.oHash.digestInto(out);
	        this.destroy();
	    }
	    digest() {
	        const out = new Uint8Array(this.oHash.outputLen);
	        this.digestInto(out);
	        return out;
	    }
	    _cloneInto(to) {
	        // Create new instance without calling constructor since key already in state and we don't know it.
	        to || (to = Object.create(Object.getPrototypeOf(this), {}));
	        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
	        to = to;
	        to.finished = finished;
	        to.destroyed = destroyed;
	        to.blockLen = blockLen;
	        to.outputLen = outputLen;
	        to.oHash = oHash._cloneInto(to.oHash);
	        to.iHash = iHash._cloneInto(to.iHash);
	        return to;
	    }
	    destroy() {
	        this.destroyed = true;
	        this.oHash.destroy();
	        this.iHash.destroy();
	    }
	}
	/**
	 * HMAC: RFC2104 message authentication code.
	 * @param hash - function that would be used e.g. sha256
	 * @param key - message key
	 * @param message - message data
	 */
	const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
	exports.hmac = hmac;
	exports.hmac.create = (hash, key) => new HMAC(hash, key);
} (hmac));

var lib = {};

(function (exports) {
	/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.utils = exports.schnorr = exports.verify = exports.signSync = exports.sign = exports.getSharedSecret = exports.recoverPublicKey = exports.getPublicKey = exports.Signature = exports.Point = exports.CURVE = void 0;
	const nodeCrypto = require$$0;
	const _0n = BigInt(0);
	const _1n = BigInt(1);
	const _2n = BigInt(2);
	const _3n = BigInt(3);
	const _8n = BigInt(8);
	const POW_2_256 = _2n ** BigInt(256);
	const CURVE = {
	    a: _0n,
	    b: BigInt(7),
	    P: POW_2_256 - _2n ** BigInt(32) - BigInt(977),
	    n: POW_2_256 - BigInt('432420386565659656852420866394968145599'),
	    h: _1n,
	    Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
	    Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
	    beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee'),
	};
	exports.CURVE = CURVE;
	function weistrass(x) {
	    const { a, b } = CURVE;
	    const x2 = mod(x * x);
	    const x3 = mod(x2 * x);
	    return mod(x3 + a * x + b);
	}
	const USE_ENDOMORPHISM = CURVE.a === _0n;
	class JacobianPoint {
	    constructor(x, y, z) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    static fromAffine(p) {
	        if (!(p instanceof Point)) {
	            throw new TypeError('JacobianPoint#fromAffine: expected Point');
	        }
	        return new JacobianPoint(p.x, p.y, _1n);
	    }
	    static toAffineBatch(points) {
	        const toInv = invertBatch(points.map((p) => p.z));
	        return points.map((p, i) => p.toAffine(toInv[i]));
	    }
	    static normalizeZ(points) {
	        return JacobianPoint.toAffineBatch(points).map(JacobianPoint.fromAffine);
	    }
	    equals(other) {
	        if (!(other instanceof JacobianPoint))
	            throw new TypeError('JacobianPoint expected');
	        const { x: X1, y: Y1, z: Z1 } = this;
	        const { x: X2, y: Y2, z: Z2 } = other;
	        const Z1Z1 = mod(Z1 ** _2n);
	        const Z2Z2 = mod(Z2 ** _2n);
	        const U1 = mod(X1 * Z2Z2);
	        const U2 = mod(X2 * Z1Z1);
	        const S1 = mod(mod(Y1 * Z2) * Z2Z2);
	        const S2 = mod(mod(Y2 * Z1) * Z1Z1);
	        return U1 === U2 && S1 === S2;
	    }
	    negate() {
	        return new JacobianPoint(this.x, mod(-this.y), this.z);
	    }
	    double() {
	        const { x: X1, y: Y1, z: Z1 } = this;
	        const A = mod(X1 ** _2n);
	        const B = mod(Y1 ** _2n);
	        const C = mod(B ** _2n);
	        const D = mod(_2n * (mod((X1 + B) ** _2n) - A - C));
	        const E = mod(_3n * A);
	        const F = mod(E ** _2n);
	        const X3 = mod(F - _2n * D);
	        const Y3 = mod(E * (D - X3) - _8n * C);
	        const Z3 = mod(_2n * Y1 * Z1);
	        return new JacobianPoint(X3, Y3, Z3);
	    }
	    add(other) {
	        if (!(other instanceof JacobianPoint))
	            throw new TypeError('JacobianPoint expected');
	        const { x: X1, y: Y1, z: Z1 } = this;
	        const { x: X2, y: Y2, z: Z2 } = other;
	        if (X2 === _0n || Y2 === _0n)
	            return this;
	        if (X1 === _0n || Y1 === _0n)
	            return other;
	        const Z1Z1 = mod(Z1 ** _2n);
	        const Z2Z2 = mod(Z2 ** _2n);
	        const U1 = mod(X1 * Z2Z2);
	        const U2 = mod(X2 * Z1Z1);
	        const S1 = mod(mod(Y1 * Z2) * Z2Z2);
	        const S2 = mod(mod(Y2 * Z1) * Z1Z1);
	        const H = mod(U2 - U1);
	        const r = mod(S2 - S1);
	        if (H === _0n) {
	            if (r === _0n) {
	                return this.double();
	            }
	            else {
	                return JacobianPoint.ZERO;
	            }
	        }
	        const HH = mod(H ** _2n);
	        const HHH = mod(H * HH);
	        const V = mod(U1 * HH);
	        const X3 = mod(r ** _2n - HHH - _2n * V);
	        const Y3 = mod(r * (V - X3) - S1 * HHH);
	        const Z3 = mod(Z1 * Z2 * H);
	        return new JacobianPoint(X3, Y3, Z3);
	    }
	    subtract(other) {
	        return this.add(other.negate());
	    }
	    multiplyUnsafe(scalar) {
	        const P0 = JacobianPoint.ZERO;
	        if (typeof scalar === 'bigint' && scalar === _0n)
	            return P0;
	        let n = normalizeScalar(scalar);
	        if (n === _1n)
	            return this;
	        if (!USE_ENDOMORPHISM) {
	            let p = P0;
	            let d = this;
	            while (n > _0n) {
	                if (n & _1n)
	                    p = p.add(d);
	                d = d.double();
	                n >>= _1n;
	            }
	            return p;
	        }
	        let { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
	        let k1p = P0;
	        let k2p = P0;
	        let d = this;
	        while (k1 > _0n || k2 > _0n) {
	            if (k1 & _1n)
	                k1p = k1p.add(d);
	            if (k2 & _1n)
	                k2p = k2p.add(d);
	            d = d.double();
	            k1 >>= _1n;
	            k2 >>= _1n;
	        }
	        if (k1neg)
	            k1p = k1p.negate();
	        if (k2neg)
	            k2p = k2p.negate();
	        k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
	        return k1p.add(k2p);
	    }
	    precomputeWindow(W) {
	        const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
	        const points = [];
	        let p = this;
	        let base = p;
	        for (let window = 0; window < windows; window++) {
	            base = p;
	            points.push(base);
	            for (let i = 1; i < 2 ** (W - 1); i++) {
	                base = base.add(p);
	                points.push(base);
	            }
	            p = base.double();
	        }
	        return points;
	    }
	    wNAF(n, affinePoint) {
	        if (!affinePoint && this.equals(JacobianPoint.BASE))
	            affinePoint = Point.BASE;
	        const W = (affinePoint && affinePoint._WINDOW_SIZE) || 1;
	        if (256 % W) {
	            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
	        }
	        let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
	        if (!precomputes) {
	            precomputes = this.precomputeWindow(W);
	            if (affinePoint && W !== 1) {
	                precomputes = JacobianPoint.normalizeZ(precomputes);
	                pointPrecomputes.set(affinePoint, precomputes);
	            }
	        }
	        let p = JacobianPoint.ZERO;
	        let f = JacobianPoint.ZERO;
	        const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
	        const windowSize = 2 ** (W - 1);
	        const mask = BigInt(2 ** W - 1);
	        const maxNumber = 2 ** W;
	        const shiftBy = BigInt(W);
	        for (let window = 0; window < windows; window++) {
	            const offset = window * windowSize;
	            let wbits = Number(n & mask);
	            n >>= shiftBy;
	            if (wbits > windowSize) {
	                wbits -= maxNumber;
	                n += _1n;
	            }
	            if (wbits === 0) {
	                let pr = precomputes[offset];
	                if (window % 2)
	                    pr = pr.negate();
	                f = f.add(pr);
	            }
	            else {
	                let cached = precomputes[offset + Math.abs(wbits) - 1];
	                if (wbits < 0)
	                    cached = cached.negate();
	                p = p.add(cached);
	            }
	        }
	        return { p, f };
	    }
	    multiply(scalar, affinePoint) {
	        let n = normalizeScalar(scalar);
	        let point;
	        let fake;
	        if (USE_ENDOMORPHISM) {
	            const { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
	            let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint);
	            let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint);
	            if (k1neg)
	                k1p = k1p.negate();
	            if (k2neg)
	                k2p = k2p.negate();
	            k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
	            point = k1p.add(k2p);
	            fake = f1p.add(f2p);
	        }
	        else {
	            const { p, f } = this.wNAF(n, affinePoint);
	            point = p;
	            fake = f;
	        }
	        return JacobianPoint.normalizeZ([point, fake])[0];
	    }
	    toAffine(invZ = invert(this.z)) {
	        const { x, y, z } = this;
	        const iz1 = invZ;
	        const iz2 = mod(iz1 * iz1);
	        const iz3 = mod(iz2 * iz1);
	        const ax = mod(x * iz2);
	        const ay = mod(y * iz3);
	        const zz = mod(z * iz1);
	        if (zz !== _1n)
	            throw new Error('invZ was invalid');
	        return new Point(ax, ay);
	    }
	}
	JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
	JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
	const pointPrecomputes = new WeakMap();
	class Point {
	    constructor(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    _setWindowSize(windowSize) {
	        this._WINDOW_SIZE = windowSize;
	        pointPrecomputes.delete(this);
	    }
	    static fromCompressedHex(bytes) {
	        const isShort = bytes.length === 32;
	        const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
	        if (!isValidFieldElement(x))
	            throw new Error('Point is not on curve');
	        const y2 = weistrass(x);
	        let y = sqrtMod(y2);
	        const isYOdd = (y & _1n) === _1n;
	        if (isShort) {
	            if (isYOdd)
	                y = mod(-y);
	        }
	        else {
	            const isFirstByteOdd = (bytes[0] & 1) === 1;
	            if (isFirstByteOdd !== isYOdd)
	                y = mod(-y);
	        }
	        const point = new Point(x, y);
	        point.assertValidity();
	        return point;
	    }
	    static fromUncompressedHex(bytes) {
	        const x = bytesToNumber(bytes.subarray(1, 33));
	        const y = bytesToNumber(bytes.subarray(33, 65));
	        const point = new Point(x, y);
	        point.assertValidity();
	        return point;
	    }
	    static fromHex(hex) {
	        const bytes = ensureBytes(hex);
	        const len = bytes.length;
	        const header = bytes[0];
	        if (len === 32 || (len === 33 && (header === 0x02 || header === 0x03))) {
	            return this.fromCompressedHex(bytes);
	        }
	        if (len === 65 && header === 0x04)
	            return this.fromUncompressedHex(bytes);
	        throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${len}`);
	    }
	    static fromPrivateKey(privateKey) {
	        return Point.BASE.multiply(normalizePrivateKey(privateKey));
	    }
	    static fromSignature(msgHash, signature, recovery) {
	        msgHash = ensureBytes(msgHash);
	        const h = truncateHash(msgHash);
	        const { r, s } = normalizeSignature(signature);
	        if (recovery !== 0 && recovery !== 1) {
	            throw new Error('Cannot recover signature: invalid recovery bit');
	        }
	        const prefix = recovery & 1 ? '03' : '02';
	        const R = Point.fromHex(prefix + numTo32bStr(r));
	        const { n } = CURVE;
	        const rinv = invert(r, n);
	        const u1 = mod(-h * rinv, n);
	        const u2 = mod(s * rinv, n);
	        const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
	        if (!Q)
	            throw new Error('Cannot recover signature: point at infinify');
	        Q.assertValidity();
	        return Q;
	    }
	    toRawBytes(isCompressed = false) {
	        return hexToBytes(this.toHex(isCompressed));
	    }
	    toHex(isCompressed = false) {
	        const x = numTo32bStr(this.x);
	        if (isCompressed) {
	            const prefix = this.y & _1n ? '03' : '02';
	            return `${prefix}${x}`;
	        }
	        else {
	            return `04${x}${numTo32bStr(this.y)}`;
	        }
	    }
	    toHexX() {
	        return this.toHex(true).slice(2);
	    }
	    toRawX() {
	        return this.toRawBytes(true).slice(1);
	    }
	    assertValidity() {
	        const msg = 'Point is not on elliptic curve';
	        const { x, y } = this;
	        if (!isValidFieldElement(x) || !isValidFieldElement(y))
	            throw new Error(msg);
	        const left = mod(y * y);
	        const right = weistrass(x);
	        if (mod(left - right) !== _0n)
	            throw new Error(msg);
	    }
	    equals(other) {
	        return this.x === other.x && this.y === other.y;
	    }
	    negate() {
	        return new Point(this.x, mod(-this.y));
	    }
	    double() {
	        return JacobianPoint.fromAffine(this).double().toAffine();
	    }
	    add(other) {
	        return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
	    }
	    subtract(other) {
	        return this.add(other.negate());
	    }
	    multiply(scalar) {
	        return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
	    }
	    multiplyAndAddUnsafe(Q, a, b) {
	        const P = JacobianPoint.fromAffine(this);
	        const aP = a === _0n || a === _1n || this !== Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
	        const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
	        const sum = aP.add(bQ);
	        return sum.equals(JacobianPoint.ZERO) ? undefined : sum.toAffine();
	    }
	}
	exports.Point = Point;
	Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
	Point.ZERO = new Point(_0n, _0n);
	function sliceDER(s) {
	    return Number.parseInt(s[0], 16) >= 8 ? '00' + s : s;
	}
	function parseDERInt(data) {
	    if (data.length < 2 || data[0] !== 0x02) {
	        throw new Error(`Invalid signature integer tag: ${bytesToHex(data)}`);
	    }
	    const len = data[1];
	    const res = data.subarray(2, len + 2);
	    if (!len || res.length !== len) {
	        throw new Error(`Invalid signature integer: wrong length`);
	    }
	    if (res[0] === 0x00 && res[1] <= 0x7f) {
	        throw new Error('Invalid signature integer: trailing length');
	    }
	    return { data: bytesToNumber(res), left: data.subarray(len + 2) };
	}
	function parseDERSignature(data) {
	    if (data.length < 2 || data[0] != 0x30) {
	        throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
	    }
	    if (data[1] !== data.length - 2) {
	        throw new Error('Invalid signature: incorrect length');
	    }
	    const { data: r, left: sBytes } = parseDERInt(data.subarray(2));
	    const { data: s, left: rBytesLeft } = parseDERInt(sBytes);
	    if (rBytesLeft.length) {
	        throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex(rBytesLeft)}`);
	    }
	    return { r, s };
	}
	class Signature {
	    constructor(r, s) {
	        this.r = r;
	        this.s = s;
	        this.assertValidity();
	    }
	    static fromCompact(hex) {
	        const arr = isUint8a(hex);
	        const name = 'Signature.fromCompact';
	        if (typeof hex !== 'string' && !arr)
	            throw new TypeError(`${name}: Expected string or Uint8Array`);
	        const str = arr ? bytesToHex(hex) : hex;
	        if (str.length !== 128)
	            throw new Error(`${name}: Expected 64-byte hex`);
	        return new Signature(hexToNumber(str.slice(0, 64)), hexToNumber(str.slice(64, 128)));
	    }
	    static fromDER(hex) {
	        const arr = isUint8a(hex);
	        if (typeof hex !== 'string' && !arr)
	            throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
	        const { r, s } = parseDERSignature(arr ? hex : hexToBytes(hex));
	        return new Signature(r, s);
	    }
	    static fromHex(hex) {
	        return this.fromDER(hex);
	    }
	    assertValidity() {
	        const { r, s } = this;
	        if (!isWithinCurveOrder(r))
	            throw new Error('Invalid Signature: r must be 0 < r < n');
	        if (!isWithinCurveOrder(s))
	            throw new Error('Invalid Signature: s must be 0 < s < n');
	    }
	    hasHighS() {
	        const HALF = CURVE.n >> _1n;
	        return this.s > HALF;
	    }
	    normalizeS() {
	        return this.hasHighS() ? new Signature(this.r, CURVE.n - this.s) : this;
	    }
	    toDERRawBytes(isCompressed = false) {
	        return hexToBytes(this.toDERHex(isCompressed));
	    }
	    toDERHex(isCompressed = false) {
	        const sHex = sliceDER(numberToHexUnpadded(this.s));
	        if (isCompressed)
	            return sHex;
	        const rHex = sliceDER(numberToHexUnpadded(this.r));
	        const rLen = numberToHexUnpadded(rHex.length / 2);
	        const sLen = numberToHexUnpadded(sHex.length / 2);
	        const length = numberToHexUnpadded(rHex.length / 2 + sHex.length / 2 + 4);
	        return `30${length}02${rLen}${rHex}02${sLen}${sHex}`;
	    }
	    toRawBytes() {
	        return this.toDERRawBytes();
	    }
	    toHex() {
	        return this.toDERHex();
	    }
	    toCompactRawBytes() {
	        return hexToBytes(this.toCompactHex());
	    }
	    toCompactHex() {
	        return numTo32bStr(this.r) + numTo32bStr(this.s);
	    }
	}
	exports.Signature = Signature;
	function concatBytes(...arrays) {
	    if (!arrays.every(isUint8a))
	        throw new Error('Uint8Array list expected');
	    if (arrays.length === 1)
	        return arrays[0];
	    const length = arrays.reduce((a, arr) => a + arr.length, 0);
	    const result = new Uint8Array(length);
	    for (let i = 0, pad = 0; i < arrays.length; i++) {
	        const arr = arrays[i];
	        result.set(arr, pad);
	        pad += arr.length;
	    }
	    return result;
	}
	function isUint8a(bytes) {
	    return bytes instanceof Uint8Array;
	}
	const hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, '0'));
	function bytesToHex(uint8a) {
	    if (!(uint8a instanceof Uint8Array))
	        throw new Error('Expected Uint8Array');
	    let hex = '';
	    for (let i = 0; i < uint8a.length; i++) {
	        hex += hexes[uint8a[i]];
	    }
	    return hex;
	}
	function numTo32bStr(num) {
	    if (num > POW_2_256)
	        throw new Error('Expected number < 2^256');
	    return num.toString(16).padStart(64, '0');
	}
	function numTo32b(num) {
	    return hexToBytes(numTo32bStr(num));
	}
	function numberToHexUnpadded(num) {
	    const hex = num.toString(16);
	    return hex.length & 1 ? `0${hex}` : hex;
	}
	function hexToNumber(hex) {
	    if (typeof hex !== 'string') {
	        throw new TypeError('hexToNumber: expected string, got ' + typeof hex);
	    }
	    return BigInt(`0x${hex}`);
	}
	function hexToBytes(hex) {
	    if (typeof hex !== 'string') {
	        throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
	    }
	    if (hex.length % 2)
	        throw new Error('hexToBytes: received invalid unpadded hex' + hex.length);
	    const array = new Uint8Array(hex.length / 2);
	    for (let i = 0; i < array.length; i++) {
	        const j = i * 2;
	        const hexByte = hex.slice(j, j + 2);
	        const byte = Number.parseInt(hexByte, 16);
	        if (Number.isNaN(byte) || byte < 0)
	            throw new Error('Invalid byte sequence');
	        array[i] = byte;
	    }
	    return array;
	}
	function bytesToNumber(bytes) {
	    return hexToNumber(bytesToHex(bytes));
	}
	function ensureBytes(hex) {
	    return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
	}
	function normalizeScalar(num) {
	    if (typeof num === 'number' && Number.isSafeInteger(num) && num > 0)
	        return BigInt(num);
	    if (typeof num === 'bigint' && isWithinCurveOrder(num))
	        return num;
	    throw new TypeError('Expected valid private scalar: 0 < scalar < curve.n');
	}
	function mod(a, b = CURVE.P) {
	    const result = a % b;
	    return result >= _0n ? result : b + result;
	}
	function pow2(x, power) {
	    const { P } = CURVE;
	    let res = x;
	    while (power-- > _0n) {
	        res *= res;
	        res %= P;
	    }
	    return res;
	}
	function sqrtMod(x) {
	    const { P } = CURVE;
	    const _6n = BigInt(6);
	    const _11n = BigInt(11);
	    const _22n = BigInt(22);
	    const _23n = BigInt(23);
	    const _44n = BigInt(44);
	    const _88n = BigInt(88);
	    const b2 = (x * x * x) % P;
	    const b3 = (b2 * b2 * x) % P;
	    const b6 = (pow2(b3, _3n) * b3) % P;
	    const b9 = (pow2(b6, _3n) * b3) % P;
	    const b11 = (pow2(b9, _2n) * b2) % P;
	    const b22 = (pow2(b11, _11n) * b11) % P;
	    const b44 = (pow2(b22, _22n) * b22) % P;
	    const b88 = (pow2(b44, _44n) * b44) % P;
	    const b176 = (pow2(b88, _88n) * b88) % P;
	    const b220 = (pow2(b176, _44n) * b44) % P;
	    const b223 = (pow2(b220, _3n) * b3) % P;
	    const t1 = (pow2(b223, _23n) * b22) % P;
	    const t2 = (pow2(t1, _6n) * b2) % P;
	    return pow2(t2, _2n);
	}
	function invert(number, modulo = CURVE.P) {
	    if (number === _0n || modulo <= _0n) {
	        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
	    }
	    let a = mod(number, modulo);
	    let b = modulo;
	    let x = _0n, u = _1n;
	    while (a !== _0n) {
	        const q = b / a;
	        const r = b % a;
	        const m = x - u * q;
	        b = a, a = r, x = u, u = m;
	    }
	    const gcd = b;
	    if (gcd !== _1n)
	        throw new Error('invert: does not exist');
	    return mod(x, modulo);
	}
	function invertBatch(nums, p = CURVE.P) {
	    const scratch = new Array(nums.length);
	    const lastMultiplied = nums.reduce((acc, num, i) => {
	        if (num === _0n)
	            return acc;
	        scratch[i] = acc;
	        return mod(acc * num, p);
	    }, _1n);
	    const inverted = invert(lastMultiplied, p);
	    nums.reduceRight((acc, num, i) => {
	        if (num === _0n)
	            return acc;
	        scratch[i] = mod(acc * scratch[i], p);
	        return mod(acc * num, p);
	    }, inverted);
	    return scratch;
	}
	const divNearest = (a, b) => (a + b / _2n) / b;
	const POW_2_128 = _2n ** BigInt(128);
	function splitScalarEndo(k) {
	    const { n } = CURVE;
	    const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
	    const b1 = -_1n * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
	    const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
	    const b2 = a1;
	    const c1 = divNearest(b2 * k, n);
	    const c2 = divNearest(-b1 * k, n);
	    let k1 = mod(k - c1 * a1 - c2 * a2, n);
	    let k2 = mod(-c1 * b1 - c2 * b2, n);
	    const k1neg = k1 > POW_2_128;
	    const k2neg = k2 > POW_2_128;
	    if (k1neg)
	        k1 = n - k1;
	    if (k2neg)
	        k2 = n - k2;
	    if (k1 > POW_2_128 || k2 > POW_2_128) {
	        throw new Error('splitScalarEndo: Endomorphism failed, k=' + k);
	    }
	    return { k1neg, k1, k2neg, k2 };
	}
	function truncateHash(hash) {
	    const { n } = CURVE;
	    const byteLength = hash.length;
	    const delta = byteLength * 8 - 256;
	    let h = bytesToNumber(hash);
	    if (delta > 0)
	        h = h >> BigInt(delta);
	    if (h >= n)
	        h -= n;
	    return h;
	}
	class HmacDrbg {
	    constructor() {
	        this.v = new Uint8Array(32).fill(1);
	        this.k = new Uint8Array(32).fill(0);
	        this.counter = 0;
	    }
	    hmac(...values) {
	        return exports.utils.hmacSha256(this.k, ...values);
	    }
	    hmacSync(...values) {
	        if (typeof exports.utils.hmacSha256Sync !== 'function')
	            throw new Error('utils.hmacSha256Sync is undefined, you need to set it');
	        const res = exports.utils.hmacSha256Sync(this.k, ...values);
	        if (res instanceof Promise)
	            throw new Error('To use sync sign(), ensure utils.hmacSha256 is sync');
	        return res;
	    }
	    incr() {
	        if (this.counter >= 1000) {
	            throw new Error('Tried 1,000 k values for sign(), all were invalid');
	        }
	        this.counter += 1;
	    }
	    async reseed(seed = new Uint8Array()) {
	        this.k = await this.hmac(this.v, Uint8Array.from([0x00]), seed);
	        this.v = await this.hmac(this.v);
	        if (seed.length === 0)
	            return;
	        this.k = await this.hmac(this.v, Uint8Array.from([0x01]), seed);
	        this.v = await this.hmac(this.v);
	    }
	    reseedSync(seed = new Uint8Array()) {
	        this.k = this.hmacSync(this.v, Uint8Array.from([0x00]), seed);
	        this.v = this.hmacSync(this.v);
	        if (seed.length === 0)
	            return;
	        this.k = this.hmacSync(this.v, Uint8Array.from([0x01]), seed);
	        this.v = this.hmacSync(this.v);
	    }
	    async generate() {
	        this.incr();
	        this.v = await this.hmac(this.v);
	        return this.v;
	    }
	    generateSync() {
	        this.incr();
	        this.v = this.hmacSync(this.v);
	        return this.v;
	    }
	}
	function isWithinCurveOrder(num) {
	    return _0n < num && num < CURVE.n;
	}
	function isValidFieldElement(num) {
	    return _0n < num && num < CURVE.P;
	}
	function kmdToSig(kBytes, m, d) {
	    const k = bytesToNumber(kBytes);
	    if (!isWithinCurveOrder(k))
	        return;
	    const { n } = CURVE;
	    const q = Point.BASE.multiply(k);
	    const r = mod(q.x, n);
	    if (r === _0n)
	        return;
	    const s = mod(invert(k, n) * mod(m + d * r, n), n);
	    if (s === _0n)
	        return;
	    const sig = new Signature(r, s);
	    const recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n);
	    return { sig, recovery };
	}
	function normalizePrivateKey(key) {
	    let num;
	    if (typeof key === 'bigint') {
	        num = key;
	    }
	    else if (typeof key === 'number' && Number.isSafeInteger(key) && key > 0) {
	        num = BigInt(key);
	    }
	    else if (typeof key === 'string') {
	        if (key.length !== 64)
	            throw new Error('Expected 32 bytes of private key');
	        num = hexToNumber(key);
	    }
	    else if (isUint8a(key)) {
	        if (key.length !== 32)
	            throw new Error('Expected 32 bytes of private key');
	        num = bytesToNumber(key);
	    }
	    else {
	        throw new TypeError('Expected valid private key');
	    }
	    if (!isWithinCurveOrder(num))
	        throw new Error('Expected private key: 0 < key < n');
	    return num;
	}
	function normalizePublicKey(publicKey) {
	    if (publicKey instanceof Point) {
	        publicKey.assertValidity();
	        return publicKey;
	    }
	    else {
	        return Point.fromHex(publicKey);
	    }
	}
	function normalizeSignature(signature) {
	    if (signature instanceof Signature) {
	        signature.assertValidity();
	        return signature;
	    }
	    try {
	        return Signature.fromDER(signature);
	    }
	    catch (error) {
	        return Signature.fromCompact(signature);
	    }
	}
	function getPublicKey(privateKey, isCompressed = false) {
	    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
	}
	exports.getPublicKey = getPublicKey;
	function recoverPublicKey(msgHash, signature, recovery, isCompressed = false) {
	    return Point.fromSignature(msgHash, signature, recovery).toRawBytes(isCompressed);
	}
	exports.recoverPublicKey = recoverPublicKey;
	function isPub(item) {
	    const arr = isUint8a(item);
	    const str = typeof item === 'string';
	    const len = (arr || str) && item.length;
	    if (arr)
	        return len === 33 || len === 65;
	    if (str)
	        return len === 66 || len === 130;
	    if (item instanceof Point)
	        return true;
	    return false;
	}
	function getSharedSecret(privateA, publicB, isCompressed = false) {
	    if (isPub(privateA))
	        throw new TypeError('getSharedSecret: first arg must be private key');
	    if (!isPub(publicB))
	        throw new TypeError('getSharedSecret: second arg must be public key');
	    const b = normalizePublicKey(publicB);
	    b.assertValidity();
	    return b.multiply(normalizePrivateKey(privateA)).toRawBytes(isCompressed);
	}
	exports.getSharedSecret = getSharedSecret;
	function bits2int(bytes) {
	    const slice = bytes.length > 32 ? bytes.slice(0, 32) : bytes;
	    return bytesToNumber(slice);
	}
	function bits2octets(bytes) {
	    const z1 = bits2int(bytes);
	    const z2 = mod(z1, CURVE.n);
	    return int2octets(z2 < _0n ? z1 : z2);
	}
	function int2octets(num) {
	    if (typeof num !== 'bigint')
	        throw new Error('Expected bigint');
	    const hex = numTo32bStr(num);
	    return hexToBytes(hex);
	}
	function initSigArgs(msgHash, privateKey, extraEntropy) {
	    if (msgHash == null)
	        throw new Error(`sign: expected valid message hash, not "${msgHash}"`);
	    const h1 = ensureBytes(msgHash);
	    const d = normalizePrivateKey(privateKey);
	    const seedArgs = [int2octets(d), bits2octets(h1)];
	    if (extraEntropy != null) {
	        if (extraEntropy === true)
	            extraEntropy = exports.utils.randomBytes(32);
	        const e = ensureBytes(extraEntropy);
	        if (e.length !== 32)
	            throw new Error('sign: Expected 32 bytes of extra data');
	        seedArgs.push(e);
	    }
	    const seed = concatBytes(...seedArgs);
	    const m = bits2int(h1);
	    return { seed, m, d };
	}
	function finalizeSig(recSig, opts) {
	    let { sig, recovery } = recSig;
	    const { canonical, der, recovered } = Object.assign({ canonical: true, der: true }, opts);
	    if (canonical && sig.hasHighS()) {
	        sig = sig.normalizeS();
	        recovery ^= 1;
	    }
	    const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
	    return recovered ? [hashed, recovery] : hashed;
	}
	async function sign(msgHash, privKey, opts = {}) {
	    const { seed, m, d } = initSigArgs(msgHash, privKey, opts.extraEntropy);
	    let sig;
	    const drbg = new HmacDrbg();
	    await drbg.reseed(seed);
	    while (!(sig = kmdToSig(await drbg.generate(), m, d)))
	        await drbg.reseed();
	    return finalizeSig(sig, opts);
	}
	exports.sign = sign;
	function signSync(msgHash, privKey, opts = {}) {
	    const { seed, m, d } = initSigArgs(msgHash, privKey, opts.extraEntropy);
	    let sig;
	    const drbg = new HmacDrbg();
	    drbg.reseedSync(seed);
	    while (!(sig = kmdToSig(drbg.generateSync(), m, d)))
	        drbg.reseedSync();
	    return finalizeSig(sig, opts);
	}
	exports.signSync = signSync;
	const vopts = { strict: true };
	function verify(signature, msgHash, publicKey, opts = vopts) {
	    let sig;
	    try {
	        sig = normalizeSignature(signature);
	        msgHash = ensureBytes(msgHash);
	    }
	    catch (error) {
	        return false;
	    }
	    const { r, s } = sig;
	    if (opts.strict && sig.hasHighS())
	        return false;
	    const h = truncateHash(msgHash);
	    let P;
	    try {
	        P = normalizePublicKey(publicKey);
	    }
	    catch (error) {
	        return false;
	    }
	    const { n } = CURVE;
	    const sinv = invert(s, n);
	    const u1 = mod(h * sinv, n);
	    const u2 = mod(r * sinv, n);
	    const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2);
	    if (!R)
	        return false;
	    const v = mod(R.x, n);
	    return v === r;
	}
	exports.verify = verify;
	function finalizeSchnorrChallenge(ch) {
	    return mod(bytesToNumber(ch), CURVE.n);
	}
	function hasEvenY(point) {
	    return (point.y & _1n) === _0n;
	}
	class SchnorrSignature {
	    constructor(r, s) {
	        this.r = r;
	        this.s = s;
	        this.assertValidity();
	    }
	    static fromHex(hex) {
	        const bytes = ensureBytes(hex);
	        if (bytes.length !== 64)
	            throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${bytes.length}`);
	        const r = bytesToNumber(bytes.subarray(0, 32));
	        const s = bytesToNumber(bytes.subarray(32, 64));
	        return new SchnorrSignature(r, s);
	    }
	    assertValidity() {
	        const { r, s } = this;
	        if (!isValidFieldElement(r) || !isWithinCurveOrder(s))
	            throw new Error('Invalid signature');
	    }
	    toHex() {
	        return numTo32bStr(this.r) + numTo32bStr(this.s);
	    }
	    toRawBytes() {
	        return hexToBytes(this.toHex());
	    }
	}
	function schnorrGetPublicKey(privateKey) {
	    return Point.fromPrivateKey(privateKey).toRawX();
	}
	function initSchnorrSigArgs(message, privateKey, auxRand) {
	    if (message == null)
	        throw new TypeError(`sign: Expected valid message, not "${message}"`);
	    const m = ensureBytes(message);
	    const d0 = normalizePrivateKey(privateKey);
	    const rand = ensureBytes(auxRand);
	    if (rand.length !== 32)
	        throw new TypeError('sign: Expected 32 bytes of aux randomness');
	    const P = Point.fromPrivateKey(d0);
	    const px = P.toRawX();
	    const d = hasEvenY(P) ? d0 : CURVE.n - d0;
	    return { m, P, px, d, rand };
	}
	function initSchnorrNonce(d, t0h) {
	    return numTo32b(d ^ bytesToNumber(t0h));
	}
	function finalizeSchnorrNonce(k0h) {
	    const k0 = mod(bytesToNumber(k0h), CURVE.n);
	    if (k0 === _0n)
	        throw new Error('sign: Creation of signature failed. k is zero');
	    const R = Point.fromPrivateKey(k0);
	    const rx = R.toRawX();
	    const k = hasEvenY(R) ? k0 : CURVE.n - k0;
	    return { R, rx, k };
	}
	function finalizeSchnorrSig(R, k, e, d) {
	    return new SchnorrSignature(R.x, mod(k + e * d, CURVE.n)).toRawBytes();
	}
	async function schnorrSign(message, privateKey, auxRand = exports.utils.randomBytes()) {
	    const { m, px, d, rand } = initSchnorrSigArgs(message, privateKey, auxRand);
	    const t = initSchnorrNonce(d, await exports.utils.taggedHash(TAGS.aux, rand));
	    const { R, rx, k } = finalizeSchnorrNonce(await exports.utils.taggedHash(TAGS.nonce, t, px, m));
	    const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, rx, px, m));
	    const sig = finalizeSchnorrSig(R, k, e, d);
	    const isValid = await schnorrVerify(sig, m, px);
	    if (!isValid)
	        throw new Error('sign: Invalid signature produced');
	    return sig;
	}
	function schnorrSignSync(message, privateKey, auxRand = exports.utils.randomBytes()) {
	    const { m, px, d, rand } = initSchnorrSigArgs(message, privateKey, auxRand);
	    const t = initSchnorrNonce(d, exports.utils.taggedHashSync(TAGS.aux, rand));
	    const { R, rx, k } = finalizeSchnorrNonce(exports.utils.taggedHashSync(TAGS.nonce, t, px, m));
	    const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, rx, px, m));
	    const sig = finalizeSchnorrSig(R, k, e, d);
	    const isValid = schnorrVerifySync(sig, m, px);
	    if (!isValid)
	        throw new Error('sign: Invalid signature produced');
	    return sig;
	}
	function initSchnorrVerify(signature, message, publicKey) {
	    const raw = signature instanceof SchnorrSignature;
	    const sig = raw ? signature : SchnorrSignature.fromHex(signature);
	    if (raw)
	        sig.assertValidity();
	    return {
	        ...sig,
	        m: ensureBytes(message),
	        P: normalizePublicKey(publicKey),
	    };
	}
	function finalizeSchnorrVerify(r, P, s, e) {
	    const R = Point.BASE.multiplyAndAddUnsafe(P, normalizePrivateKey(s), mod(-e, CURVE.n));
	    if (!R || !hasEvenY(R) || R.x !== r)
	        return false;
	    return true;
	}
	async function schnorrVerify(signature, message, publicKey) {
	    try {
	        const { r, s, m, P } = initSchnorrVerify(signature, message, publicKey);
	        const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, numTo32b(r), P.toRawX(), m));
	        return finalizeSchnorrVerify(r, P, s, e);
	    }
	    catch (error) {
	        return false;
	    }
	}
	function schnorrVerifySync(signature, message, publicKey) {
	    try {
	        const { r, s, m, P } = initSchnorrVerify(signature, message, publicKey);
	        const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, numTo32b(r), P.toRawX(), m));
	        return finalizeSchnorrVerify(r, P, s, e);
	    }
	    catch (error) {
	        return false;
	    }
	}
	exports.schnorr = {
	    Signature: SchnorrSignature,
	    getPublicKey: schnorrGetPublicKey,
	    sign: schnorrSign,
	    verify: schnorrVerify,
	    signSync: schnorrSignSync,
	    verifySync: schnorrVerifySync,
	};
	Point.BASE._setWindowSize(8);
	const crypto = {
	    node: nodeCrypto,
	    web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined,
	};
	const TAGS = {
	    challenge: 'BIP0340/challenge',
	    aux: 'BIP0340/aux',
	    nonce: 'BIP0340/nonce',
	};
	const TAGGED_HASH_PREFIXES = {};
	exports.utils = {
	    isValidPrivateKey(privateKey) {
	        try {
	            normalizePrivateKey(privateKey);
	            return true;
	        }
	        catch (error) {
	            return false;
	        }
	    },
	    privateAdd: (privateKey, tweak) => {
	        const p = normalizePrivateKey(privateKey);
	        const t = normalizePrivateKey(tweak);
	        return numTo32b(mod(p + t, CURVE.n));
	    },
	    privateNegate: (privateKey) => {
	        const p = normalizePrivateKey(privateKey);
	        return numTo32b(CURVE.n - p);
	    },
	    pointAddScalar: (p, tweak, isCompressed) => {
	        const P = Point.fromHex(p);
	        const t = normalizePrivateKey(tweak);
	        const Q = Point.BASE.multiplyAndAddUnsafe(P, t, _1n);
	        if (!Q)
	            throw new Error('Tweaked point at infinity');
	        return Q.toRawBytes(isCompressed);
	    },
	    pointMultiply: (p, tweak, isCompressed) => {
	        const P = Point.fromHex(p);
	        const t = bytesToNumber(ensureBytes(tweak));
	        return P.multiply(t).toRawBytes(isCompressed);
	    },
	    hashToPrivateKey: (hash) => {
	        hash = ensureBytes(hash);
	        if (hash.length < 40 || hash.length > 1024)
	            throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');
	        const num = mod(bytesToNumber(hash), CURVE.n - _1n) + _1n;
	        return numTo32b(num);
	    },
	    randomBytes: (bytesLength = 32) => {
	        if (crypto.web) {
	            return crypto.web.getRandomValues(new Uint8Array(bytesLength));
	        }
	        else if (crypto.node) {
	            const { randomBytes } = crypto.node;
	            return Uint8Array.from(randomBytes(bytesLength));
	        }
	        else {
	            throw new Error("The environment doesn't have randomBytes function");
	        }
	    },
	    randomPrivateKey: () => {
	        return exports.utils.hashToPrivateKey(exports.utils.randomBytes(40));
	    },
	    bytesToHex,
	    hexToBytes,
	    concatBytes,
	    mod,
	    invert,
	    sha256: async (...messages) => {
	        if (crypto.web) {
	            const buffer = await crypto.web.subtle.digest('SHA-256', concatBytes(...messages));
	            return new Uint8Array(buffer);
	        }
	        else if (crypto.node) {
	            const { createHash } = crypto.node;
	            const hash = createHash('sha256');
	            messages.forEach((m) => hash.update(m));
	            return Uint8Array.from(hash.digest());
	        }
	        else {
	            throw new Error("The environment doesn't have sha256 function");
	        }
	    },
	    hmacSha256: async (key, ...messages) => {
	        if (crypto.web) {
	            const ckey = await crypto.web.subtle.importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
	            const message = concatBytes(...messages);
	            const buffer = await crypto.web.subtle.sign('HMAC', ckey, message);
	            return new Uint8Array(buffer);
	        }
	        else if (crypto.node) {
	            const { createHmac } = crypto.node;
	            const hash = createHmac('sha256', key);
	            messages.forEach((m) => hash.update(m));
	            return Uint8Array.from(hash.digest());
	        }
	        else {
	            throw new Error("The environment doesn't have hmac-sha256 function");
	        }
	    },
	    sha256Sync: undefined,
	    hmacSha256Sync: undefined,
	    taggedHash: async (tag, ...messages) => {
	        let tagP = TAGGED_HASH_PREFIXES[tag];
	        if (tagP === undefined) {
	            const tagH = await exports.utils.sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
	            tagP = concatBytes(tagH, tagH);
	            TAGGED_HASH_PREFIXES[tag] = tagP;
	        }
	        return exports.utils.sha256(tagP, ...messages);
	    },
	    taggedHashSync: (tag, ...messages) => {
	        if (typeof exports.utils.sha256Sync !== 'function')
	            throw new Error('utils.sha256Sync is undefined, you need to set it');
	        let tagP = TAGGED_HASH_PREFIXES[tag];
	        if (tagP === undefined) {
	            const tagH = exports.utils.sha256Sync(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
	            tagP = concatBytes(tagH, tagH);
	            TAGGED_HASH_PREFIXES[tag] = tagP;
	        }
	        return exports.utils.sha256Sync(tagP, ...messages);
	    },
	    precompute(windowSize = 8, point = Point.BASE) {
	        const cached = point === Point.BASE ? point : new Point(point.x, point.y);
	        cached._setWindowSize(windowSize);
	        cached.multiply(_3n);
	        return cached;
	    },
	};
} (lib));

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.schnorr = exports.Signature = exports.Point = exports.CURVE = exports.utils = exports.getSharedSecret = exports.recoverPublicKey = exports.verify = exports.signSync = exports.sign = exports.getPublicKey = void 0;
	const hmac_1 = hmac;
	const sha256_1 = sha256;
	const secp256k1_1 = lib;
	var secp256k1_2 = lib;
	Object.defineProperty(exports, "getPublicKey", { enumerable: true, get: function () { return secp256k1_2.getPublicKey; } });
	Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return secp256k1_2.sign; } });
	Object.defineProperty(exports, "signSync", { enumerable: true, get: function () { return secp256k1_2.signSync; } });
	Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return secp256k1_2.verify; } });
	Object.defineProperty(exports, "recoverPublicKey", { enumerable: true, get: function () { return secp256k1_2.recoverPublicKey; } });
	Object.defineProperty(exports, "getSharedSecret", { enumerable: true, get: function () { return secp256k1_2.getSharedSecret; } });
	Object.defineProperty(exports, "utils", { enumerable: true, get: function () { return secp256k1_2.utils; } });
	Object.defineProperty(exports, "CURVE", { enumerable: true, get: function () { return secp256k1_2.CURVE; } });
	Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return secp256k1_2.Point; } });
	Object.defineProperty(exports, "Signature", { enumerable: true, get: function () { return secp256k1_2.Signature; } });
	Object.defineProperty(exports, "schnorr", { enumerable: true, get: function () { return secp256k1_2.schnorr; } });
	// Enable sync API for noble-secp256k1
	secp256k1_1.utils.hmacSha256Sync = (key, ...messages) => {
	    const h = hmac_1.hmac.create(sha256_1.sha256, key);
	    messages.forEach(msg => h.update(msg));
	    return h.digest();
	};
} (secp256k1));

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(secp256k1Compat, "__esModule", { value: true });
secp256k1Compat.contextRandomize = secp256k1Compat.ecdh = secp256k1Compat.signatureNormalize = secp256k1Compat.signatureImport = secp256k1Compat.signatureExport = secp256k1Compat.privateKeyTweakMul = secp256k1Compat.publicKeyTweakMul = secp256k1Compat.publicKeyTweakAdd = secp256k1Compat.publicKeyCombine = secp256k1Compat.publicKeyNegate = secp256k1Compat.privateKeyNegate = secp256k1Compat.privateKeyTweakAdd = secp256k1Compat.ecdsaVerify = ecdsaRecover_1 = secp256k1Compat.ecdsaRecover = secp256k1Compat.ecdsaSign = publicKeyConvert_1 = secp256k1Compat.publicKeyConvert = secp256k1Compat.publicKeyVerify = secp256k1Compat.publicKeyCreate = secp256k1Compat.privateKeyVerify = secp256k1Compat.createPrivateKey = secp256k1Compat.createPrivateKeySync = void 0;
const sha256_1 = sha256;
const secp = __importStar(secp256k1);
const utils_1 = utils.exports;
// Use `secp256k1` module directly.
// This is a legacy compatibility layer for the npm package `secp256k1` via noble-secp256k1
function hexToNumber(hex) {
    if (typeof hex !== "string") {
        throw new TypeError("hexToNumber: expected string, got " + typeof hex);
    }
    return BigInt(`0x${hex}`);
}
// Copy-paste from secp256k1, maybe export it?
const bytesToNumber = (bytes) => hexToNumber((0, utils_1.toHex)(bytes));
const numberToHex = (num) => num.toString(16).padStart(64, "0");
const numberToBytes = (num) => (0, utils_1.hexToBytes)(numberToHex(num));
const { mod } = secp.utils;
const ORDER = secp.CURVE.n;
function output(out = (len) => new Uint8Array(len), length, value) {
    if (typeof out === "function") {
        out = out(length);
    }
    (0, utils_1.assertBytes)(out, length);
    if (value) {
        out.set(value);
    }
    return out;
}
function getSignature(signature) {
    (0, utils_1.assertBytes)(signature, 64);
    return secp.Signature.fromCompact(signature);
}
function createPrivateKeySync() {
    return secp.utils.randomPrivateKey();
}
secp256k1Compat.createPrivateKeySync = createPrivateKeySync;
async function createPrivateKey() {
    return createPrivateKeySync();
}
secp256k1Compat.createPrivateKey = createPrivateKey;
function privateKeyVerify(privateKey) {
    (0, utils_1.assertBytes)(privateKey, 32);
    return secp.utils.isValidPrivateKey(privateKey);
}
secp256k1Compat.privateKeyVerify = privateKeyVerify;
function publicKeyCreate(privateKey, compressed = true, out) {
    (0, utils_1.assertBytes)(privateKey, 32);
    (0, utils_1.assertBool)(compressed);
    const res = secp.getPublicKey(privateKey, compressed);
    return output(out, compressed ? 33 : 65, res);
}
secp256k1Compat.publicKeyCreate = publicKeyCreate;
function publicKeyVerify(publicKey) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    try {
        secp.Point.fromHex(publicKey);
        return true;
    }
    catch (e) {
        return false;
    }
}
secp256k1Compat.publicKeyVerify = publicKeyVerify;
function publicKeyConvert(publicKey, compressed = true, out) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBool)(compressed);
    const res = secp.Point.fromHex(publicKey).toRawBytes(compressed);
    return output(out, compressed ? 33 : 65, res);
}
var publicKeyConvert_1 = secp256k1Compat.publicKeyConvert = publicKeyConvert;
function ecdsaSign(msgHash, privateKey, options = { noncefn: undefined, data: undefined }, out) {
    (0, utils_1.assertBytes)(msgHash, 32);
    (0, utils_1.assertBytes)(privateKey, 32);
    if (typeof options !== "object" || options === null) {
        throw new TypeError("secp256k1.ecdsaSign: options should be object");
    }
    // noble-secp256k1 uses hmac instead of hmac-drbg here
    if (options &&
        (options.noncefn !== undefined || options.data !== undefined)) {
        throw new Error("Secp256k1: noncefn && data is unsupported");
    }
    const [signature, recid] = secp.signSync(msgHash, privateKey, {
        recovered: true,
        der: false
    });
    return { signature: output(out, 64, signature), recid };
}
secp256k1Compat.ecdsaSign = ecdsaSign;
function ecdsaRecover(signature, recid, msgHash, compressed = true, out) {
    (0, utils_1.assertBytes)(msgHash, 32);
    (0, utils_1.assertBool)(compressed);
    const sign = getSignature(signature).toHex();
    const point = secp.Point.fromSignature(msgHash, sign, recid);
    return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}
var ecdsaRecover_1 = secp256k1Compat.ecdsaRecover = ecdsaRecover;
function ecdsaVerify(signature, msgHash, publicKey) {
    (0, utils_1.assertBytes)(signature, 64);
    (0, utils_1.assertBytes)(msgHash, 32);
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBytes)(signature, 64);
    const r = bytesToNumber(signature.slice(0, 32));
    const s = bytesToNumber(signature.slice(32, 64));
    if (r >= ORDER || s >= ORDER) {
        throw new Error("Cannot parse signature");
    }
    const pub = secp.Point.fromHex(publicKey); // should not throw error
    let sig;
    try {
        sig = getSignature(signature);
    }
    catch (error) {
        return false;
    }
    return secp.verify(sig, msgHash, pub);
}
secp256k1Compat.ecdsaVerify = ecdsaVerify;
function privateKeyTweakAdd(privateKey, tweak) {
    (0, utils_1.assertBytes)(privateKey, 32);
    (0, utils_1.assertBytes)(tweak, 32);
    let t = bytesToNumber(tweak);
    if (t === 0n) {
        throw new Error("Tweak must not be zero");
    }
    if (t >= ORDER) {
        throw new Error("Tweak bigger than curve order");
    }
    t += bytesToNumber(privateKey);
    if (t >= ORDER) {
        t -= ORDER;
    }
    if (t === 0n) {
        throw new Error("The tweak was out of range or the resulted private key is invalid");
    }
    privateKey.set((0, utils_1.hexToBytes)(numberToHex(t)));
    return privateKey;
}
secp256k1Compat.privateKeyTweakAdd = privateKeyTweakAdd;
function privateKeyNegate(privateKey) {
    (0, utils_1.assertBytes)(privateKey, 32);
    const bn = mod(-bytesToNumber(privateKey), ORDER);
    privateKey.set((0, utils_1.hexToBytes)(numberToHex(bn)));
    return privateKey;
}
secp256k1Compat.privateKeyNegate = privateKeyNegate;
function publicKeyNegate(publicKey, compressed = true, out) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBool)(compressed);
    const point = secp.Point.fromHex(publicKey).negate();
    return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}
secp256k1Compat.publicKeyNegate = publicKeyNegate;
function publicKeyCombine(publicKeys, compressed = true, out) {
    if (!Array.isArray(publicKeys) || !publicKeys.length) {
        throw new TypeError(`Expected array with one or more items, not ${publicKeys}`);
    }
    for (const publicKey of publicKeys) {
        (0, utils_1.assertBytes)(publicKey, 33, 65);
    }
    (0, utils_1.assertBool)(compressed);
    const combined = publicKeys
        .map(pub => secp.Point.fromHex(pub))
        .reduce((res, curr) => res.add(curr), secp.Point.ZERO);
    return output(out, compressed ? 33 : 65, combined.toRawBytes(compressed));
}
secp256k1Compat.publicKeyCombine = publicKeyCombine;
function publicKeyTweakAdd(publicKey, tweak, compressed = true, out) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBytes)(tweak, 32);
    (0, utils_1.assertBool)(compressed);
    const p1 = secp.Point.fromHex(publicKey);
    const p2 = secp.Point.fromPrivateKey(tweak);
    const point = p1.add(p2);
    if (p2.equals(secp.Point.ZERO) || point.equals(secp.Point.ZERO)) {
        throw new Error("Tweak must not be zero");
    }
    return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}
secp256k1Compat.publicKeyTweakAdd = publicKeyTweakAdd;
function publicKeyTweakMul(publicKey, tweak, compressed = true, out) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBytes)(tweak, 32);
    (0, utils_1.assertBool)(compressed);
    const bn = bytesToNumber(tweak);
    if (bn === 0n) {
        throw new Error("Tweak must not be zero");
    }
    if (bn <= 1 || bn >= ORDER) {
        throw new Error("Tweak is zero or bigger than curve order");
    }
    const point = secp.Point.fromHex(publicKey).multiply(bn);
    return output(out, compressed ? 33 : 65, point.toRawBytes(compressed));
}
secp256k1Compat.publicKeyTweakMul = publicKeyTweakMul;
function privateKeyTweakMul(privateKey, tweak) {
    (0, utils_1.assertBytes)(privateKey, 32);
    (0, utils_1.assertBytes)(tweak, 32);
    const bn = bytesToNumber(tweak);
    if (bn <= 1 || bn >= ORDER) {
        throw new Error("Tweak is zero or bigger than curve order");
    }
    const res = mod(bn * bytesToNumber(privateKey), ORDER);
    if (res === 0n) {
        throw new Error("The tweak was out of range or the resulted private key is invalid");
    }
    privateKey.set((0, utils_1.hexToBytes)(numberToHex(res)));
    return privateKey;
}
secp256k1Compat.privateKeyTweakMul = privateKeyTweakMul;
// internal -> DER
function signatureExport(signature, out) {
    const res = getSignature(signature).toRawBytes();
    return output(out, 72, getSignature(signature).toRawBytes()).slice(0, res.length);
}
secp256k1Compat.signatureExport = signatureExport;
// DER -> internal
function signatureImport(signature, out) {
    (0, utils_1.assertBytes)(signature);
    const sig = secp.Signature.fromDER(signature);
    return output(out, 64, (0, utils_1.hexToBytes)(sig.toCompactHex()));
}
secp256k1Compat.signatureImport = signatureImport;
function signatureNormalize(signature) {
    const res = getSignature(signature);
    if (res.s > ORDER / 2n) {
        signature.set(numberToBytes(ORDER - res.s), 32);
    }
    return signature;
}
secp256k1Compat.signatureNormalize = signatureNormalize;
function ecdh(publicKey, privateKey, options = {}, out) {
    (0, utils_1.assertBytes)(publicKey, 33, 65);
    (0, utils_1.assertBytes)(privateKey, 32);
    if (typeof options !== "object" || options === null) {
        throw new TypeError("secp256k1.ecdh: options should be object");
    }
    if (options.data !== undefined) {
        (0, utils_1.assertBytes)(options.data);
    }
    const point = secp.Point.fromHex(secp.getSharedSecret(privateKey, publicKey));
    if (options.hashfn === undefined) {
        return output(out, 32, (0, sha256_1.sha256)(point.toRawBytes(true)));
    }
    if (typeof options.hashfn !== "function") {
        throw new TypeError("secp256k1.ecdh: options.hashfn should be function");
    }
    if (options.xbuf !== undefined) {
        (0, utils_1.assertBytes)(options.xbuf, 32);
    }
    if (options.ybuf !== undefined) {
        (0, utils_1.assertBytes)(options.ybuf, 32);
    }
    (0, utils_1.assertBytes)(out, 32);
    const xbuf = options.xbuf || new Uint8Array(32);
    xbuf.set(numberToBytes(point.x));
    const ybuf = options.ybuf || new Uint8Array(32);
    ybuf.set(numberToBytes(point.y));
    const hash = options.hashfn(xbuf, ybuf, options.data);
    if (!(hash instanceof Uint8Array) || hash.length !== 32) {
        throw new Error("secp256k1.ecdh: invalid options.hashfn output");
    }
    return output(out, 32, hash);
}
secp256k1Compat.ecdh = ecdh;
function contextRandomize(seed) {
    if (seed !== null) {
        (0, utils_1.assertBytes)(seed, 32);
    }
    // There is no context to randomize
}
secp256k1Compat.contextRandomize = contextRandomize;

if (!globalThis.atob)
  globalThis.atob = nodeAtob;
class BaseModule {
  constructor(sdk) {
    this.sdk = sdk;
  }
}
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["MissingAuthHeader"] = "ERROR_MISSING_AUTH_HEADER";
  ErrorCode2["TokenExpired"] = "ERROR_DIDT_EXPIRED";
  ErrorCode2["TokenCannotBeUsedYet"] = "ERROR_DIDT_CANNOT_BE_USED_YET";
  ErrorCode2["IncorrectSignerAddress"] = "ERROR_INCORRECT_SIGNER_ADDR";
  ErrorCode2["FailedRecoveryProof"] = "ERROR_FAILED_RECOVERING_PROOF";
  ErrorCode2["ApiKeyMissing"] = "ERROR_SECRET_API_KEY_MISSING";
  ErrorCode2["MalformedTokenError"] = "ERROR_MALFORMED_TOKEN";
  ErrorCode2["ServiceError"] = "SERVICE_ERROR";
  ErrorCode2["ExpectedBearerString"] = "EXPECTED_BEARER_STRING";
})(ErrorCode || (ErrorCode = {}));
class MagicAdminSDKError extends Error {
  constructor(code, message, data = []) {
    super(`Magic Admin SDK Error: [${code}] ${message}`);
    this.code = code;
    this.data = data;
    this.__proto__ = Error;
    Object.setPrototypeOf(this, MagicAdminSDKError.prototype);
  }
}
function createTokenExpiredError() {
  return new MagicAdminSDKError(ErrorCode.TokenExpired, "DID Token has expired. Request failed authentication.");
}
function createTokenCannotBeUsedYetError() {
  return new MagicAdminSDKError(ErrorCode.TokenCannotBeUsedYet, "Given DID Token cannot be used at this time. Please check the `nbf` field and regenerate a new token with a suitable value.");
}
function createIncorrectSignerAddressError() {
  return new MagicAdminSDKError(ErrorCode.IncorrectSignerAddress, "Incorrect signer address for DID Token. Request failed authentication.");
}
function createFailedRecoveringProofError() {
  return new MagicAdminSDKError(ErrorCode.FailedRecoveryProof, "Failed to recover proof. Request failed authentication.");
}
function createApiKeyMissingError() {
  return new MagicAdminSDKError(ErrorCode.ApiKeyMissing, "Please provide a secret Fortmatic API key that you acquired from the developer dashboard.");
}
function createMalformedTokenError() {
  return new MagicAdminSDKError(ErrorCode.MalformedTokenError, "The DID token is malformed or failed to parse.");
}
function createServiceError(...nestedErrors) {
  return new MagicAdminSDKError(ErrorCode.ServiceError, "A service error occurred while communicating with the Magic API. Check the `data` key of this error object to see nested errors with additional context.", nestedErrors);
}
function createExpectedBearerStringError() {
  return new MagicAdminSDKError(ErrorCode.ExpectedBearerString, "Expected argument to be a string in the `Bearer {token}` format.");
}
function hashPersonalMessage(message) {
  const prefix = utils.exports.utf8ToBytes(`Ethereum Signed Message:
${message.length}`);
  const totalLength = prefix.length + message.length;
  const output = new Uint8Array(totalLength);
  output.set(prefix);
  output.set(message, prefix.length);
  return keccak256(output);
}
function getRecoveryBit(signature) {
  const bit = signature[64];
  return bit - 27;
}
function prepareSignature(signature) {
  return signature.slice(2);
}
function publicKeyToAddress(publicKey) {
  const address = keccak256(publicKey.slice(1)).slice(-20);
  return `0x${utils.exports.bytesToHex(address)}`;
}
function ecRecover(data, signature) {
  const msg = utils.exports.utf8ToBytes(data);
  const sig = utils.exports.hexToBytes(prepareSignature(signature));
  const recovery = getRecoveryBit(sig);
  const hash = hashPersonalMessage(msg);
  const publicKey = ecdsaRecover_1(sig.slice(0, 64), recovery, hash, false);
  const assertPublicKey = publicKeyConvert_1(publicKey, false);
  return publicKeyToAddress(assertPublicKey);
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNull(value) {
  return value === null;
}
function isNil(value) {
  return isNull(value) || isUndefined(value);
}
function isDIDTClaim(value) {
  return !isNil(value) && !isNil(value.iat) && !isNil(value.ext) && !isNil(value.iss) && !isNil(value.sub) && !isNil(value.aud) && !isNil(value.nbf) && !isNil(value.tid) && !isNil(value.add);
}
function parseDIDToken(DIDToken) {
  try {
    const [proof, claim] = JSON.parse(globalThis.atob(DIDToken));
    const parsedClaim = JSON.parse(claim);
    if (isDIDTClaim(parsedClaim))
      return { raw: [proof, claim], withParsedClaim: [proof, parsedClaim] };
    throw new Error();
  } catch {
    throw createMalformedTokenError();
  }
}
function generateIssuerFromPublicAddress(publicAddress, method = "ethr") {
  return `did:${method}:${publicAddress}`;
}
function parsePublicAddressFromIssuer(issuer) {
  var _a;
  return ((_a = issuer.split(":")[2]) == null ? void 0 : _a.toLowerCase()) ?? "";
}
class TokenModule extends BaseModule {
  validate(DIDToken, attachment = "none") {
    let tokenSigner = "";
    let attachmentSigner = "";
    let claimedIssuer = "";
    let parsedClaim;
    let proof;
    let claim;
    try {
      const tokenParseResult = parseDIDToken(DIDToken);
      [proof, claim] = tokenParseResult.raw;
      parsedClaim = tokenParseResult.withParsedClaim[1];
      claimedIssuer = parsePublicAddressFromIssuer(parsedClaim.iss);
    } catch {
      throw createMalformedTokenError();
    }
    try {
      tokenSigner = ecRecover(claim, proof).toLowerCase();
      attachmentSigner = ecRecover(attachment, parsedClaim.add).toLowerCase();
    } catch {
      throw createFailedRecoveringProofError();
    }
    if (claimedIssuer !== tokenSigner || claimedIssuer !== attachmentSigner) {
      throw createIncorrectSignerAddressError();
    }
    const timeSecs = Math.floor(Date.now() / 1e3);
    const nbfLeeway = 300;
    if (parsedClaim.ext < timeSecs) {
      throw createTokenExpiredError();
    }
    if (parsedClaim.nbf - nbfLeeway > timeSecs) {
      throw createTokenCannotBeUsedYetError();
    }
  }
  decode(DIDToken) {
    const parsedToken = parseDIDToken(DIDToken);
    return parsedToken.withParsedClaim;
  }
  getPublicAddress(DIDToken) {
    const claim = this.decode(DIDToken)[1];
    const claimedIssuer = claim.iss.split(":")[2];
    return claimedIssuer;
  }
  getIssuer(DIDToken) {
    return this.decode(DIDToken)[1].iss;
  }
}
const fetch = !globalThis.fetch ? (url, init) => import('./index-c884ddc3.js').then(({ default: f }) => f(url, init)) : globalThis.fetch;
async function emitRequest(url, init) {
  const json = await fetch(url, init).then((res) => res.json()).catch((err) => {
    throw createServiceError(err);
  });
  if (json.status !== "ok") {
    throw createServiceError(json);
  }
  return json.data ?? {};
}
function generateQuery(url, params) {
  let query = "?";
  if (params) {
    for (const [key, value] of Object.entries(params))
      query += `${key}=${value}&`;
    query = query.slice(0, -1);
  }
  return params ? `${url}${query}` : url;
}
function post(url, secretApiKey, body) {
  return emitRequest(url, {
    method: "POST",
    headers: { "X-Magic-Secret-key": secretApiKey },
    body: JSON.stringify(body)
  });
}
function get(url, secretApiKey, params) {
  const urlWithParams = generateQuery(url, params);
  return emitRequest(urlWithParams, {
    method: "GET",
    headers: { "X-Magic-Secret-key": secretApiKey }
  });
}
class UsersModule extends BaseModule {
  async logoutByIssuer(issuer) {
    if (!this.sdk.secretApiKey)
      throw createApiKeyMissingError();
    const body = { issuer };
    await post(`${this.sdk.apiBaseUrl}/v2/admin/auth/user/logout`, this.sdk.secretApiKey, body);
  }
  async logoutByPublicAddress(publicAddress) {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    await this.logoutByIssuer(issuer);
  }
  async logoutByToken(DIDToken) {
    const issuer = this.sdk.token.getIssuer(DIDToken);
    await this.logoutByIssuer(issuer);
  }
  async getMetadataByIssuer(issuer) {
    if (!this.sdk.secretApiKey)
      throw createApiKeyMissingError();
    const data = await get(`${this.sdk.apiBaseUrl}/v1/admin/auth/user/get`, this.sdk.secretApiKey, { issuer });
    return {
      issuer: data.issuer ?? null,
      publicAddress: data.public_address ?? null,
      email: data.email ?? null,
      oauthProvider: data.oauth_provider ?? null,
      phoneNumber: data.phone_number ?? null
    };
  }
  async getMetadataByToken(DIDToken) {
    const issuer = this.sdk.token.getIssuer(DIDToken);
    return this.getMetadataByIssuer(issuer);
  }
  async getMetadataByPublicAddress(publicAddress) {
    const issuer = generateIssuerFromPublicAddress(publicAddress);
    return this.getMetadataByIssuer(issuer);
  }
}
class UtilsModule extends BaseModule {
  parseAuthorizationHeader(header) {
    if (!header.toLowerCase().startsWith("bearer ")) {
      throw createExpectedBearerStringError();
    }
    return header.substring(7);
  }
}
class MagicAdminSDK {
  constructor(secretApiKey, options) {
    this.secretApiKey = secretApiKey;
    const endpoint = (options == null ? void 0 : options.endpoint) ?? "https://api.magic.link";
    this.apiBaseUrl = endpoint.replace(/\/+$/, "");
    this.token = new TokenModule(this);
    this.users = new UsersModule(this);
    this.utils = new UtilsModule(this);
  }
}
const magic = new MagicAdminSDK(MAGIC_SECRET_KEY);

export { magic as m };
//# sourceMappingURL=_magic-0aa129fc-661400d2.js.map
