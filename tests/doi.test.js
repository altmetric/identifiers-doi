/* globals test, expect */
"use strict";

const doi = require("../lib/doi");

test("extracts DOIs", () => {
    expect(doi.extract("This is an example of DOI: 10.1049/el.2013.3006")).toEqual(["10.1049/el.2013.3006"]);
});

test("extracts multiple DOIs", () => {
    expect(doi.extract("10.1049/el.2013.3006 & 10.1038/nplants.2015.3")).toEqual(["10.1049/el.2013.3006", "10.1038/nplants.2015.3"]);
});

test("extracts ISBN-As", () => {
    expect(doi.extract("http://dx.doi.org/10.978.8898392/315")).toEqual(["10.978.8898392/315"]);
});

test("does not extract invalid ISBN-As", () => {
    expect(doi.extract("http://dx.doi.org/10.978.8898392/NotARealIsbnA")).toEqual([]);
});

test("lowercases DOIs", () => {
    expect(doi.extract("10.1097/01.ASW.0000443266.17665.19")).toEqual(["10.1097/01.asw.0000443266.17665.19"]);
});

test("does not extract DOIs from other terms", () => {
    expect(doi.extract("2010.1234/foo")).toEqual([]);
});

test("extracts DOIs with 9-digit prefixes", () => {
    expect(doi.extract("10.123456789/foobar")).toEqual(["10.123456789/foobar"]);
});

test("extract DOIs with punctuation in the suffix", () => {
    expect(doi.extract("10.1234/foo.bar")).toEqual(["10.1234/foo.bar"]);
});

test("extract DOIs without trailing punctuation", () => {
    expect(doi.extract("10.1234/foo.bar.")).toEqual(["10.1234/foo.bar"]);
});
