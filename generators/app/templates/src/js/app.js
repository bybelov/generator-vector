import './vendor';
import maskInput from 'vanilla-text-mask';

window.onload = function () {

  let inputTel = document.querySelector('.tel');

  if (inputTel != null) {
    const phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    maskInput({
      inputElement: inputTel,
      mask: phoneMask,
      keepCharPositions: true,
      showMask: true
    });

  }

}