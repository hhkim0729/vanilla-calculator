import { $ } from '../utils/dom.js';
import Component from './Component.js';

class Calculator extends Component {
  constructor($target) {
    super($target);
  }

  setInitValue() {
    this.state = {
      prevNum: 0,
      result: 0,
      currentNum: 0,
      operator: '',
      btnText: 'AC',
      isNewNum: true,
      isOperatorClicked: false,
    };
  }

  makeTemplate() {
    const { currentNum, btnText } = this.state;
    return `<article class="calculator">
      <div class="result">${currentNum}</div>
      <div class="btn-box">
        <button class="btn-top btn-clear">${btnText}</button>
        <button class="btn-top btn-sign">+/-</button>
        <button class="btn-top btn-percent">%</button>
        <button class="btn-left btn-operator btn-divide">➗</button>
        <button class="btn-right btn-number">7</button>
        <button class="btn-right btn-number">8</button>
        <button class="btn-right btn-number">9</button>
        <button class="btn-left btn-operator btn-multiply">✖</button>
        <button class="btn-right btn-number">4</button>
        <button class="btn-right btn-number">5</button>
        <button class="btn-right btn-number">6</button>
        <button class="btn-left btn-operator btn-minus">➖</button>
        <button class="btn-right btn-number">1</button>
        <button class="btn-right btn-number">2</button>
        <button class="btn-right btn-number">3</button>
        <button class="btn-left btn-operator btn-plus">➕</button>
        <button class="btn-right btn-number btn-zero">0</button>
        <button class="btn-right btn-point">.</button>
        <button class="btn-left btn-equal">=</button>
      </div>
    </article>`;
  }

  initEventHandlers() {
    const calculate = (prevNum, currentNum, operator) => {
      let result = 0;
      console.log(prevNum, currentNum);
      switch (operator) {
        case '➕':
          result = prevNum + currentNum;
          break;
        default:
          break;
      }
      return result;
    };

    this.$target.addEventListener('click', ({ target }) => {
      const { classList, innerText } = target;
      const {
        prevNum,
        result,
        currentNum,
        operator,
        btnText,
        isNewNum,
        isOperatorClicked,
      } = this.state;
      const newState = { ...this.state };

      if (classList.contains('btn-clear')) {
        newState.prevNum = 0;
        newState.result = 0;
        newState.currentNum = 0;
        newState.operator = '';
        newState.btnText = 'AC';
        newState.isNewNum = true;
        newState.isOperatorClicked = false;
        this.setState(newState);
        return;
      }

      if (classList.contains('btn-number')) {
        const clickedNum = Number(innerText);
        if (isNewNum) {
          newState.currentNum = clickedNum;
          newState.isNewNum = false;
        } else {
          newState.currentNum = currentNum * 10 + clickedNum;
        }
        newState.btnText = 'C';
        this.setState(newState);
        return;
      }

      if (classList.contains('btn-operator')) {
        if (!isOperatorClicked) {
          newState.prevNum = currentNum;
          newState.operator = innerText;
          newState.isNewNum = true;
          newState.isOperatorClicked = true;
          // if (prevNum !== 0) {
          //   newState.result = calculate(prevNum, result, operator);
          //   newState.currentNum = newState.result;
          // }
          this.setState(newState);
        }
        return;
      }

      if (classList.contains('btn-equal')) {
        if (isOperatorClicked) {
          newState.result = calculate(prevNum, currentNum, operator);
          newState.prevNum = currentNum;
        } else {
          newState.result = calculate(prevNum, result, operator);
        }
        newState.currentNum = newState.result;
        newState.isNewNum = true;
        newState.isOperatorClicked = false;
        this.setState(newState);
        return;
      }
    });
  }
}

export default Calculator;
