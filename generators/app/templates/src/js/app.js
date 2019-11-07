import './vendor';
import maskInput from 'vanilla-text-mask';
import Hello from './app/hello';

window.onload = function () {

  Hello();

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
