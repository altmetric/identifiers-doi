"use strict";

const PATTERN = "\\b10\\.(?:97[89]\\.\\d{2,8}\\/\\d{1,7}|\\d{4,9}\\/\\S+)";
const GLOBAL_PATTERN = new RegExp(PATTERN, "g");
const SINGLE_PATTERN = new RegExp(PATTERN);
const VALID_ENDING = /(?:\w|\(.+\)|2-#)$/;

function extract(str) {
    const matches = String(str).toLowerCase().match(GLOBAL_PATTERN);
    if (!matches) {
        return [];
    }

    return matches.map(stripPunctuation).filter(Boolean);
}

function extractOne(str) {
    const match = String(str).toLowerCase().match(SINGLE_PATTERN);
    if (!match) {
        return;
    }

    return stripPunctuation(match[0]);
}

function stripPunctuation(doi) {
    if (VALID_ENDING.test(doi)) {
        return doi;
    }

    return extractOne(doi.replace(/\W$/, ""));
}

exports.extract = extract;
