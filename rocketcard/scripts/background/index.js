export const rgbFn = {
  inputsRgb: document.querySelectorAll('.rgbItem > input'),
  cardContainer: document.querySelector('.cardContainer'),
  paragraphs: document.querySelectorAll('.rgbItem p'),
  btn: document.querySelector('.randomBG'),
  rgb: {
    rgbR: 0,
    rgbG: 0,
    rgbB: 0,
  },
  init() {
    rgbFn.btn.addEventListener('click', () => {
      const randomRgb = rgbFn.getRandomRgb();
      rgbFn.setBackgroundColor(randomRgb);
      rgbFn.setPercentInParagraphs(randomRgb);
      rgbFn.setInputs(randomRgb);
    })

    rgbFn.inputsRgb.forEach(input => rgbFn.addInputListener(input))
  },

  getRandomRgb() {
    const { rgbR, rgbG, rgbB } = rgbFn.rgb;
    const randomRgb = {
      rgbR: Math.floor(Math.random() * 256),
      rgbG: Math.floor(Math.random() * 256),
      rgbB: Math.floor(Math.random() * 256),
    }
    return randomRgb;
  },

  setBackgroundColor(rgbColor) {
    const rgbString = `rgb(${rgbColor.rgbR}, ${rgbColor.rgbG}, ${rgbColor.rgbB})`;
    rgbFn.cardContainer.style.backgroundColor = rgbString;
  },

  setPercentInParagraphs(rgbColor) {
    const max = 255;
    const rgbR = rgbColor.rgbR / max * 100;
    const rgbG = rgbColor.rgbG / max * 100;
    const rgbB = rgbColor.rgbB / max * 100;
    const floor = (num) => Math.floor(num);
    rgbFn.paragraphs[0].innerText = `R (${floor(rgbR)}%)`;
    rgbFn.paragraphs[1].innerText = `G (${floor(rgbG)}%)`;
    rgbFn.paragraphs[2].innerText = `B (${floor(rgbB)}%)`;
  },

  setRgb(event) {
    const { id, value } = event.target;
    rgbFn.rgb[id] = Number(value);
    console.log(rgbFn.rgb);
    rgbFn.setBackgroundColor(rgbFn.rgb);
    rgbFn.setPercentInParagraphs(rgbFn.rgb);
    rgbFn.setInputs(rgbFn.rgb);
  },

  setInputs(rgbColor) {
    rgbFn.inputsRgb.forEach(input => {
      const { id } = input;
      input.value = rgbColor[id];
      console.log(rgbColor[id]);
    })
  },

  addInputListener(input) {
    input.addEventListener('input', e => rgbFn.setRgb(e));
  },
}