"use strict";

$(`#generate`)
  .on(`click`, () => {
    let n = $(`#number-of-pages`)
      .val();
    window.open(`generator.html?n=${n}`, `_blank`);
  });