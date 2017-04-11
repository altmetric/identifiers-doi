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

test("extracts DOIs with punctuation in the suffix", () => {
    expect(doi.extract("10.1234/foo.bar")).toEqual(["10.1234/foo.bar"]);
});

test("extracts DOIs without trailing punctuation", () => {
    expect(doi.extract("10.1234/foo.bar.")).toEqual(["10.1234/foo.bar"]);
});

test("extract DOIs ending with balanced parentheses", () => {
    expect(doi.extract("10.1234/foo(bar)")).toEqual(["10.1234/foo(bar)"]);
});

test("discards multiple contiguous trailing punctuation", () => {
    expect(doi.extract("10.1130/2013.2502...',")).toEqual(["10.1130/2013.2502"]);
});

test("discards trailing Unicode punctuation", () => {
    expect(doi.extract("10.1130/2013.2502…")).toEqual(["10.1130/2013.2502"]);
});

test("extracts old Wiley DOIs", () => {
    expect(doi.extract("10.1002/(SICI)1096-8644(199601)99:1<135::AID-AJPA8>3.0.CO;2-#")).toEqual(["10.1002/(sici)1096-8644(199601)99:1<135::aid-ajpa8>3.0.co;2-#"]);
});

test("does not extract a closing parenthesis if not part of the DOI", () => {
    expect(doi.extract("(This is an example of a DOI: 10.1130/2013.2502)")).toEqual(["10.1130/2013.2502"]);
});

test("discards trailing punctuation from old Wiley DOIs", () => {
    expect(doi.extract("10.1002/(SICI)1096-8644(199601)99:1<135::AID-AJPA8>3.0.CO;2-#',")).toEqual(["10.1002/(sici)1096-8644(199601)99:1<135::aid-ajpa8>3.0.co;2-#"]);
});

test("discards trailing punctuation after balanced parentheses", () => {
    expect(doi.extract("10.1130/2013.2502(04)',")).toEqual(["10.1130/2013.2502(04)"]);
});

test("does not extract DOIs with purely punctuation suffixes", () => {
    expect(doi.extract("10.1130/!).',")).toEqual([]);
});

test("extracts DOIs separated by Unicode whitespace", () => {
    expect(doi.extract("10.1234/foo  10.1234/bar")).toEqual(["10.1234/foo", "10.1234/bar"]);
});

test("returns no DOIs if given nothing", () => {
    expect(doi.extract(undefined)).toEqual([]);
});
