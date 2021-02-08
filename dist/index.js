"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.greeter = exports.Delays = void 0;
/**
 * Some predefined delays (in milliseconds).
 */
var Delays;
(function (Delays) {
    Delays[Delays["Short"] = 500] = "Short";
    Delays[Delays["Medium"] = 2000] = "Medium";
    Delays[Delays["Long"] = 5000] = "Long";
})(Delays = exports.Delays || (exports.Delays = {}));
/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(name, delay = Delays.Medium) {
    return new Promise((resolve) => setTimeout(() => resolve(`Hello, ${name}`), delay));
}
// Below are examples of using ESLint errors suppression
// Here it is suppressing missing return type definitions for greeter function
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function greeter(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield delayedHello(name, Delays.Long);
    });
}
exports.greeter = greeter;
delayedHello('Noam', Delays.Long).then(hello => {
    console.log(hello);
});
