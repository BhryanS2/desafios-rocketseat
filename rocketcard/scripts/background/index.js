export const rgbFn = {
  inputsRgb: document.querySelectorAll('.rgbItem > input'),
  cardContainer: document.querySelector('.cardContainer'),
  paragraphs: document.querySelectorAll('.rgbItem p'),
  btn: document.querySelector('.randomBG'),
  rgbHtml: document.querySelector('#rgbHtml'),
  rgb: {
    red: 0,
    green: 0,
    blue: 0,
  },
  init() {
    const { inputsRgb, btn } = this;
    function randomEmitEvent() {
      const randomRgb = rgbFn.getRandomRgb();
      rgbFn.setAllRgb(randomRgb);
      rgbFn.setAllValues();
    }

    btn.addEventListener('click', randomEmitEvent);
    inputsRgb.forEach(rgbFn.addInputListener);
    rgbFn.rgbHtml.addEventListener('input', e => {
      const { value } = e.target;
      const rgbValue = rgbFn.hexToRgb(value);
      rgbFn.setAllRgb(rgbValue);
    });
  },

  rgbToHex(rgb) {
    const { red, green, blue } = rgb;
    const rr = red.toString(16).padStart(2, '0');
    const gg = green.toString(16).padStart(2, '0');
    const bb = blue.toString(16).padStart(2, '0');
    const hex = `#${rr}${gg}${bb}`;
    return hex;
  },

  hexToRgb(hex) {
    const rgb = {
      red: parseInt(hex.substring(1, 3), 16),
      green: parseInt(hex.substring(3, 5), 16),
      blue: parseInt(hex.substring(5, 7), 16),
    };
    return rgb;
  },

  setHex(hex) {
    rgbFn.rgbHtml.value = hex;
  },

  getRandomRgb() {
    const randomRgb = {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
    }
    return randomRgb;
  },

  setBackgroundColor(rgbColor) {
    const rgbString = `rgb(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue})`;
    rgbFn.cardContainer.style.backgroundColor = rgbString;
  },

  setValueInParagraph(rgbColor) {
    rgbFn.paragraphs[0].innerText = `R (${rgbColor.red})`;
    rgbFn.paragraphs[1].innerText = `G (${rgbColor.green})`;
    rgbFn.paragraphs[2].innerText = `B (${rgbColor.blue})`;
  },

  setRgb(event) {
    const { id, value } = event.target;
    rgbFn.rgb[id] = Number(value);
    rgbFn.setAllValues(rgbFn.rgb);
  },

  setAllRgb(rgb) {
    rgbFn.rgb = rgb;
    rgbFn.setAllValues(rgb);
  },

  setInputs(rgbColor, inputs) {
    inputs.forEach(input => {
      const { id } = input;
      input.value = rgbColor[id];
    })
  },

  setAllValues() {
    const { rgb } = rgbFn;
    const hex = rgbFn.rgbToHex(rgb);
    rgbFn.setBackgroundColor(rgb);
    rgbFn.setValueInParagraph(rgb);
    rgbFn.setInputs(rgb, rgbFn.inputsRgb);
    rgbFn.setHex(hex);
  },

  addInputListener(input) {
    input.addEventListener('input', e => rgbFn.setRgb(e));
  },
}