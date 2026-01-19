const clearBtn = document.getElementById('clearGenres');
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  let state = 0;

  box.addEventListener('click', () => {
    state = (state + 1) % 3;

    box.className = 'box';
    box.textContent = '';

    if (state === 1) {
      box.classList.add('plus');
      box.textContent = '+';
    } 
    else if (state === 2) {
      box.classList.add('minus');
      box.textContent = '−';
    }
  });
});


clearBtn.addEventListener('click', () => {
  boxes.forEach(box => {
    box.dataset.state = 0;
    box.className = 'box';
    box.textContent = '';
  });
});