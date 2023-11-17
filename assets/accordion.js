const $accordion = document.querySelector('.accordion');
const $inputs = $accordion.querySelectorAll('input[type="radio"]');
const $labels = $accordion.querySelectorAll('label[for]');

$labels.forEach((label) => {
  label.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.currentTarget?.attributes['for']) {
      const input = Array.from($inputs).find((inp) => {
        return (inp = inp.id === e.currentTarget.attributes.for.value);
      });
      input.checked = !input.checked;
    }
  });
})
