"use strict";

function extract(str) {
    const matches = str.match(/\b10\.(?:97[89]\.\d{2,8}\/\d{1,7}|\d{4,9}\/\S+)\b/g);
    if (!matches) {
        return [];
    }

    return matches.map((doi) => doi.toLowerCase());
}

exports.extract = extract;
