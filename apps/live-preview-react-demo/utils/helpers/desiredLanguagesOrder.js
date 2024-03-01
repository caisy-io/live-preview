"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desiredLanguagesOrder = void 0;
const languages_1 = require("../../constants/languages");
function desiredLanguagesOrder(locales) {
    if (!locales)
        return [];
    const desiredOrder = Object.keys(languages_1.LANGUAGES);
    const extraLocales = locales.filter((l) => !desiredOrder.includes(l));
    const desiredOrderFiltered = desiredOrder.filter((l) => locales.includes(l));
    return [...desiredOrderFiltered, ...extraLocales];
}
exports.desiredLanguagesOrder = desiredLanguagesOrder;
