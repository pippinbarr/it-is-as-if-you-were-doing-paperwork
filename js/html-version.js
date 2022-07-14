const NUM_FORMS = 100;

let data;

// Tracking repeated instructions
let duplicatesAction = `filed`;
let initialAction = `Initial`;
let signatureAction = `Sign`;
let dateModifier = `a`;
let dates;

$.getJSON(`assets/data/en.json`, (language) => {
  data = language;

  for (let i = 0; i < NUM_FORMS; i++) {
    form();
  }
});

function form() {
  section = 1;

  duplicatesAction = `filed`;
  initialAction = `Initial`;
  signatureAction = `Sign`;
  dateModifier = `a`;
  dates = data.dates;

  let $page = $(`<div class="page"></div>`);
  let $form = $(`<div class="form"></div>`);
  let $tasks = $(`<div id="tasks"></div>`)

  $(`body`).append($page);
  $page.append($form);
  $form.append(title());
  $form.append($tasks);

  column(true, $tasks,$page,$form);
  column(false, $tasks,$page,$form);
}

function title() {
  let title = data.form_title
    .replace(/##id##/,formID())
    .replace(/##purpose##/,random(data.purposes))
    .replace(/##technology##/,technology())
  let $title = $(`<div class="title">${title}</div>`);
  return $title;
}

function formID() {
  let length = Math.floor(Math.random() * 10) + 1;
  let id = ``;
  for (let i = 0; i < length; i++) {
    let char = Math.random() < 0.75 ? random(data.alphabet) : random(data.numbers);
    if (Math.random() < 0.2 && i > 0 && i < length-1) {
      char = `/`;
    }
    id += char;
  }
  return id.toUpperCase();
}

function formPurpose() {
  return random(data.purposes);
}

function column(first,$tasks,$page,$form) {
  const generators = [act, act, circleNumber, reference, duplicates, date, checkboxes, highlighter, signature, counting, stamp, initial, read, adding, yesno];


  let $col = $(`<div class="column"></div>`);
  $tasks.append($col);

  if (first) {
    $col.append(employeeID());
    $col.append(date());
  }

  while ($form.outerHeight(true) < $page.outerHeight(true)) {
    let generator = random(generators);
    let $element = generator();
    $col.append($element);
    if ($form.outerHeight(true) > $page.outerHeight(true)) {
      $element.remove();
      break;
    }
  }
}

function technology() {
  return random(data.technologies);
}

function checkboxes() {
  let $checkboxes = $(`<div class="task checkboxes"></div>`);
  let n = 3 + Math.floor(Math.random() * 7);
  let techs = [];
  for (let i = 0; i < n; i++) {
    let tech = technology();
    techs.push(tech);
    $checkboxes.append(checkbox(tech,i));
  }
  let selectedTechs = techs.filter(tech => Math.random() < 0.2);
  if (selectedTechs.length === 0) {
    selectedTechs = [random(techs)];
  }
  let selections = selectedTechs.join(`, `);

  let instruction = random(data.instruction.checkboxes)
    .replace(/##number##/,random(data.spelled_numbers))
    .replace(/##technology_list##/,selections);
  let $instruction = sectionHeading(`${instruction}.`);
  $checkboxes.prepend($instruction);

  return $checkboxes;
}

function yesno() {
  let $yesno = $(`<div class="task yesno"></div>`);
  $yesno.append(checkbox(`${data.yes}`,1));
  $yesno.append(checkbox(`${data.no}`,2));
  let selection = random([`${data.yes}`,`${data.no}`]);
  let instruction = data.instruction.yesno
    .replace(/##choice##/,selection);
  let $instruction = sectionHeading(`${instruction}.`);
  $yesno.prepend($instruction);

  return $yesno;
}

function checkbox(label, id) {
  let $checkbox = $(`<span class="checkbox"></span>`)
  $checkbox.append(`<input type="checkbox" id="checkbox-${id}" name="checkbox-${id}" value="${label}">`);
  $checkbox.append(`<label for="checkbox-${id}">${label}</label><br />`);
  return $checkbox;
}

function highlighter() {
  let $highlighter = $(`<div class="task highlighter"></div>`);
  let instruction = data.instruction.highlight;
  let $instruction = sectionHeading(`${instruction}.`);
  $highlighter.append($instruction);

  let para = generateParagraph();
  let words = para.split(` `);

  let highlights = false;;
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (Math.random() < 0.5 && word.length >= 5) {
      words[i] = `<span class="highlight">${word}</span>`;
      highlights = true;
    }
  }
  if (!highlights) {
    let index = Math.floor(Math.random() * words.length);
    words[index] = `<span class="highlight">${words[index]}</span>`
  }
  para = words.join(` `);
  $highlighter.append(`<div>${para}</div>`);

  return $highlighter;
}

function date() {
  let $date = $(`<div class="task date"></div>`);
  dates.sort((a,b) => Math.random() - 2);
  dateModifier = dates.pop();
  if (!dateModifier) dateModifier = data.any;
  let instruction = data.instruction.date
    .replace(/##modifier##/,dateModifier);
  let $instruction = sectionHeading(`${instruction}.`);
  $date.append($instruction);
  $date.append(box(``))

  return $date;
}

function signature() {
  let $signature = $(`<div class="task signature"></div>`);
  let instruction = data.instruction.signature;
  let $instruction = sectionHeading(`${instruction}.`);
  $signature.append($instruction);
  $signature.append(box());

  return $signature;
}

function counting() {
  let counting = $(`<div class="task counting"></div>`);
  let target = Math.random() < 0.5 ? `words` : `characters`;
  let instruction = random(data.instruction.counting);
  let $instruction = sectionHeading(`${instruction}.`);
  counting.append($instruction);

  let $table = $(`<div class="table counting-table"></div>`);
  let n = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < n; i++) {
    let $row = $(`<div class="table-entry">${technology()}</div><div class="table-entry"></div>`);
    $table.append($row);
  }
  counting.append($table);

  return counting;
}

function adding() {
  let $adding = $(`<div class="task adding"></div>`);
  let number = 1 + Math.floor(Math.random() * 5);
  let instruction = data.instruction.adding
    .replace(/##number##/,number);
  let $instruction = sectionHeading(`${instruction}.`);
  $adding.append($instruction);

  let $table = $(`<div class="table adding-table"></div>`);
  let n = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < n; i++) {
    let $row = $(`<div class="table-entry">${Math.floor(Math.random() * 100000) + 1}</div><div class="table-entry"></div>`);
    $table.append($row);
  }
  $adding.append($table);

  return $adding;
}

function stamp() {
  let $stamp = $(`<div class="task stamp"></div>`);
  let instruction = data.instruction.stamping
    .replace(/##technology##/,technology())
    .replace(/##group##/,random(data.groups));
  let $instruction = sectionHeading(`${instruction}.`);
  $stamp.append($instruction);

  let $stampArea = $(`<div class="stamp-area"></div>`);
  $stamp.append($stampArea);

  return $stamp;
}

function initial() {
  let $initial;

  // And here
  $initial = $(`<div></div>`);
  let $initial1 = $(`<div class="task initial"></div>`);
  let $instruction = sectionHeading(`${data.instruction.initial1}: ______`);
  $initial1.append($instruction);
  let $initial2 = $(`<div class="task initial"></div>`)
  let $instruction2 = sectionHeading(`${data.instruction.initial2}: ______`);
  $initial2.append($instruction2);
  $initial.append($initial1,$initial2);

  return $initial;
}

function read() {
  let $read = $(`<div class="task read"></div>`)
  let instruction = data.instruction.reading;
  let $instruction = sectionHeading(`${instruction}.`);
  $read.append($instruction);

  let paragraph = generateParagraph();
  $read.append(`<div>${paragraph}</div>`);

  return $read;
}

function duplicates() {
  let $duplicates = $(`<div class="task duplicates"></div>`);
  let instruction = data.instruction.duplicates;
  let $instruction = sectionHeading(`${instruction}.`);
  $duplicates.append($instruction);

  let $options = $(`<div>${data.instruction.duplicate_types}</div>`);
  $duplicates.append($options);

  return $duplicates;
}

function reference() {
  let $reference = $(`<div class="task reference"></div>`);
  let instruction = data.instruction.reference
    .replace(/##form_id##/,formID());
  let $instruction = sectionHeading(`${instruction}.`);

  $reference.append($instruction);
  $reference.append(box());

  return $reference;
}

function box(text = ``) {
  return $(`<div class="box-container"><div class="box-padding"></div><div class="box">${text}</div></div>`);

}

function employeeID() {
  let $id = $(`<div class="task id"></div>`);
  let instruction = data.instruction.employee_id;
  let $instruction = sectionHeading(`${instruction}.`);
  $id.append($instruction);
  $id.append(box());

  return $id;
}

function circleNumber() {
  let $circleNumber = $(`<div class="task circle-number"></div>`);
  let number = Math.floor(Math.random() * 9) + 1;
  let instruction = data.instruction.circle_number
    .replace(/##number##/,number);
  let $instruction = sectionHeading(`${instruction}.`);
  $circleNumber.append($instruction);

  let numbers = "123456789".split(``);
  let $numbers = $(`<div class="numbers"></div>`);
  for (let i = 0; i < numbers.length; i++) {
    let $number = $(`<div class="number">${numbers[i]}<div>`);
    $numbers.append($number);
  }
  $circleNumber.append($numbers);

  return $circleNumber;
}

function act() {
  let $act = $(`<div class="task act"></div>`);
  let $instruction = sectionHeading(`${Math.random() < 0.1 ? random(data.rare_acts) : random(data.acts)}`);
  $act.append($instruction);

  return $act;
}

function generateParagraph() {
  let number = Math.floor(Math.random() * 3) + 1;
  let result = ``;
  for (let i = 0; i < number; i++) {
    result += positivity() + ` `;
  }
  return result;
}

function positivity() {
  return random([...data.inspirational_quotes, ...data.inspirational_work_slogans]);
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function sectionHeading(string) {
   return $(`<div class="section-heading"><span><div class="section-number">${getSection()}</div></span><span>${string}</span></div>`);
}

function getSection() {
  return `${section++}`;
}
