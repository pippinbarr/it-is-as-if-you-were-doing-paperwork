/**
It is as if you were doing paperwork form generator
Pippin Barr

In my dreams it will generate single-page forms for people to fill out.
*/

"use strict";

const positivity = [
  "The best preparation for tomorrow is doing your best today.",
    "We must let go of the life we have planned, so as to accept the one that is waiting for us.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    "We can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.",
    "Put your heart, mind, and soul into even your smallest acts. This is the secret of success.",
    "Happiness is not something you postpone for the future; it is something you design for the present.",
    "Our mission in life is not merely to survive, but to thrive; and to do so with some passion, some compassion, some humor, and some style.",
    "Keep your face always toward the sunshine - and shadows will fall behind you.",
    "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.",
    "Nothing is impossible, the word itself says 'I'm possible'!",
    "What we think, we become.",
    "What lies behind you and what lies in front of you, pales in comparison to what lies inside of you.",
    "Let us sacrifice our today so that our children can have a better tomorrow.",
    "As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them.",
    "Believe you can and you're halfway there.",
    "Try to be a rainbow in someone's cloud.",
    "We know what we are, but know not what we may be.",
];
const technologies = [
  "3D Displays",
      "3D Optical Data Storage",
      "3D Printing",
      "3D-TV",
      "4G Cellular Networking",
      "5G Broadband",
      "Abortion",
      "Actuators",
      "Adaptive Optics",
      "Advanced Tactical Lasers",
      "Aerogels",
      "Aeroscraft",
      "Aesthetic Medicine",
      "Agricultural Robotics",
      "Agricultural Science",
      "Airborne Wind Turbines",
      "Aircraft Flight Control Systems",
      "Airless Tires",
      "Alternative Fuel Vehicles",
      "Aluminium",
      "Ambient Intelligence",
      "Amorphous Metals",
      "Analogue Electronics",
      "Android",
      "Animal Husbandry",
      "Answer Machines",
      "Anti-Gravity Technology",
      "Antimatter Weapons",
      "Arcologies",
      "Artificial Brains",
      "Artificial Gravity Systems",
      "Artificial Intelligence",
      "Artificial Passengers",
      "Artificial Photosynthesis",
      "Asteroid Mining",
      "Atmospheric Carbon Dioxide Removal",
      "Atomtronics",
      "Augmented Reality",
      "Automated Guided Vehicles",
      "Autonomous Buildings",
      "Autonomous Cars",
      "Autonomous Research Robots",
      "Autonomous Robotics",
      "Autonomous Underwater Vehicles",
      "Autostereoscopic Displays",
      "Backpack Helicopters",
      "Banotechnology",
      "Barcodes",
      "Batteries",
      "Bead Washing Machines",
];

const WIDTH = 2550/2.1;
const HEIGHT = 3300/2.1;
const TOTAL_FORMS = 2;
const MARGIN = 25;
const SPACING = 20;
const DEFAULT_PADDING = 10;

const TITLE_HEIGHT = 36;
const TEXT_HEIGHT = 18;

const CHECK = `⃞`;

let x = MARGIN;
let y = MARGIN;

let sectionNum = 1;

let formNum = 1;

function preload() {

}

function setup() {
  createCanvas(WIDTH,HEIGHT);

  // Base styling
  background(250);
  textFont(`sans-serif`);
  textAlign(LEFT, TOP);
  textSize(TEXT_HEIGHT);
  fill(0);
  stroke(0);

  // frameRate(1);
}

function draw() {
  x = 0;
  y = 0;
  sectionNum = 1;

  background(255);
  margins();
  outerBox();
  title();
  introduction();

  stroke(0);
  // line(width/2,0,width/2,height);

  // saveCanvas(`form-${formNum}`, `png`);
  formNum++;

  if (formNum > TOTAL_FORMS) {
    noLoop();
  }
}

function margins() {
  // x = MARGIN;
  // y = MARGIN;
}

function title() {
  push();
  textSize(TITLE_HEIGHT);
  textStyle(BOLD);
  let h = drawText(random(technologies).toUpperCase(), x, y, width);
  pop();

  y += h;
  drawLine(x, y, x + width, y);

}

function outerBox() {
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(x+1,y+1,width-2,height-2);
  pop();
}

function drawLine(x, y, x2, y2) {
  push();
  stroke(0);
  strokeWeight(2);
  line(x, y, x2, y2);
  pop();
}

function introduction() {
  push();
  textSize(TEXT_HEIGHT);
  y += drawTexts([generateParagraph(3), generateParagraph(2)], x, y, width);
  pop();

  const formTop = y;

  drawLine(x, y, x + width, y);
  drawLine(x + width/2, y, x + width/2, height);

  y += drawCheckboxes(x, y, width/2, 10);

  drawLine(x, y, x + width/2, y);

  y += drawDateEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawSignatureEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawStampEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawNumbersEntry(x, y, width/2, 5);
  drawLine(x, y, x + width/2, y);

  y += drawHighlightTexts([generateParagraph(2), generateParagraph(5)], x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawStampEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawNumbersEntry(x, y, width/2, 2);
  drawLine(x, y, x + width/2, y);

  x = width/2;
  y = formTop;

  y += drawCheckboxes(x, y, width/2, 10);

  drawLine(x, y, x + width/2, y);

  y += drawStampEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawNumbersEntry(x, y, width/2, 2);
  drawLine(x, y, x + width/2, y);


  y += drawNumbersEntry(x, y, width/2, 5);
  drawLine(x, y, x + width/2, y);

  y += drawHighlightTexts([generateParagraph(2), generateParagraph(5)], x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawStampEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawDateEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);

  y += drawInitialsEntry(x, y, width/2);
  drawLine(x, y, x + width/2, y);
}

function drawText(string, x, y, w, padding = DEFAULT_PADDING, style = NORMAL) {
  push();
  textStyle(style);
  noStroke();
  let words = string.split(/ /);
  let result = ``;
  let line = ``;
  let height = textAscent() + textDescent() + 2*padding;
  x += padding;
  y += padding;
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let test = line + word + ` `;
    if (textWidth(test) > w - 2*padding) {
      result += `\n${word} `;
      line = `${word} `;
      height += textAscent() + textDescent();
    }
    else {
      line += `${word} `;
      result += `${word} `;
    }
  }
  text(result, x, y)
  pop();
  return height;
}

function drawTexts(array, x, y, w, padding = DEFAULT_PADDING) {
  let totalH = 0;

  for (let i = 0; i < array.length; i++) {
    let h = drawText(array[i], x, y, w, padding);
    y += h;
    totalH += h;
  }
  totalH += padding;
  return totalH;
}

function drawHighlightTexts(array, x, y, w, padding = DEFAULT_PADDING) {
  let totalHeight = 0;
  totalHeight += drawText(`${getSectionNum()} HIGHLIGHT the words inside parentheses`, x, y, w, padding, BOLD);

  y += totalHeight;
  for (let i = 0; i < array.length; i++) {
    let words = array[i].split(` `);
    for (let j = 0; j < words.length; j++) {
      let last = words[j][words[j].length-1];
      if (Math.random() < 0.1 && !`.,:'"?!%`.includes(last)) {
        words[j] = `<${words[j]}>`
      }
    }
    array[i] = words.join(` `);
  }
  totalHeight += drawTexts(array, x, y, w, padding);
  return totalHeight;
}

function generateParagraph(number) {
  let result = ``;
  for (let i = 0; i < number; i++) {
    result += random(positivity) + ` `;
  }
  return result;
}

function drawCheckboxes(x, y, w, n, padding = DEFAULT_PADDING) {
  push();
  let h = 0;

  let checkboxes = ``;
  h += textHeight() + padding;
  let line = ``;
  let techs = [];
  for (let i = 0; i < n; i++) {
    let tech = random(technologies);
    while (techs.indexOf(tech) !== -1) {
      tech = random(technologies);
    }
    techs.push(tech);

    let checkbox = `${CHECK} ${tech} `;
    if (textWidth(line + checkbox) > w - 2*padding) {
      checkboxes += `\n${checkbox} `;
      line = `${checkbox} `;
      h += textHeight();
    }
    else {
      checkboxes += `${checkbox} `;
      line += `${checkbox} `
    }
  }
  let chooseTechs = techs.filter((item) => Math.random() < 0.15);
  let toCheck = chooseTechs.join(`, `)
  if (toCheck === ``) {
    toCheck = `${random(techs)}`;
  }

  let textH = drawText(`${getSectionNum()} SELECT ${toCheck}:`, x, y, w, padding, BOLD);

  y += textH + SPACING;

  x += padding;
  textStyle(NORMAL);
  noStroke();
  text(checkboxes, x, y);
  pop();

  return h + textH + SPACING;
}

function drawDateEntry(x, y, w, padding = DEFAULT_PADDING) {
  let dateText = `${getSectionNum()} ENTER DATE: __/__/____`;

  return drawText(dateText, x, y, w, padding, BOLD);
}

function drawSignatureEntry(x, y, w, padding = DEFAULT_PADDING) {
  let signatureText = `${getSectionNum()} SIGN HERE: ____________________`;

  return drawText(signatureText, x, y, w, padding, BOLD);
}

function drawNumbersEntry(x, y, w, n, padding = DEFAULT_PADDING) {
  const x1 = x;
  const y1 = y;

  x += padding;

  let totalHeight = 0;
  push();
  let toCount = Math.random() < 0.5 ? `words` : `letters`;
  totalHeight += drawText(`${getSectionNum()} ENTER the number of ${toCount} in the first column into the second column`, x, y, w, padding, BOLD)

  y += totalHeight;
  for (let i = 0; i < n; i++) {
    noStroke();
    fill(0);
    let h = drawText(random(technologies), x, y, w/2 - padding, padding);

    stroke(0);
    strokeWeight(2);
    noFill();
    rect(x,y,w/2 - padding,h);
    rect(x + w/2 - padding,y,w/2 - padding,h);

    y += h;
    totalHeight += h;
  }
  pop();

  totalHeight += SPACING;

  push();
  stroke(0);
  strokeWeight(2);
  line(x1, y1 + totalHeight, x1 + w, y1 + totalHeight);
  pop();

  return totalHeight;
}

function drawStampEntry(x, y, w, padding = DEFAULT_PADDING) {
  const x1 = x;
  const y1 = y;

  const stampHeight = 100;
  let stampText = `${getSectionNum()} STAMP HERE to approve ${random(technologies)} working group:`;

  let h = drawText(stampText, x, y, w, padding, BOLD);
  y += h;
  x += padding;

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  rect(x, y, w - 2*padding, stampHeight);
  pop();
  h += stampHeight;

  h += SPACING;

  push();
  stroke(0);
  strokeWeight(2);
  line(x1, y1 + h, x1 + w, y1 + h);
  pop();

  return h;
}

function drawInitialsEntry(x, y, w, padding = DEFAULT_PADDING) {
  let initialsText = `${getSectionNum()} INITIAL HERE: ________`;
  return drawText(initialsText, x, y, w, padding, BOLD) + SPACING;
}

function getSectionNum() {
  let result = `${sectionNum}.`;
  sectionNum++;
  return result;
}

function textHeight() {
  return textAscent() + textDescent();
}
