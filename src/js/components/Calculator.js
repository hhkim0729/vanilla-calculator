import Component from './Component.js';

class Calculator extends Component {
  constructor($target) {
    super($target);
  }

  setInitValue() {
    this.state = {
      prevNum: 0, // 최근에 입력한 값
      result: 0, // 연산 결과
      currentNum: 0, // 현재 화면에 출력되는 값
      operator: '', // 현재 연산자
      btnText: 'AC', // AC / C 버튼 문구
      isNewNum: true, // 새로운 숫자를 입력받는지 - true /  10단위로 늘릴건지 - false
      isOperatorClicked: false, // 새로운 계산이 시작되었는지 (= 또는 AC 클릭 시 false로 리셋)
    };
  }

  makeTemplate() {
    const { currentNum, btnText } = this.state;
    return `<article class="calculator">
      <div class="result">${currentNum.toLocaleString()}</div>
      <div class="btn-box">
        <button class="btn-top btn-clear">${btnText}</button>
        <button class="btn-top btn-sign">+/-</button>
        <button class="btn-top btn-percent" disabled>%</button>
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
        <button class="btn-right btn-point" disabled>.</button>
        <button class="btn-left btn-equal">=</button>
      </div>
    </article>`;
  }

  initEventHandlers() {
    // 연산자 클릭 또는 = 클릭 시 연산을 위한 함수
    const calculate = (first, second, operator) => {
      let result = 0;
      if (first === 'Error') {
        return 'Error';
      }
      switch (operator) {
        case '➕':
          result = Number(first) + Number(second);
          break;
        case '➖':
          result = first - second;
          break;
        case '✖':
          result = first * second;
          break;
        case '➗':
          if (second === 0) {
            result = 'Error';
          } else {
            result = first / second;
          }
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
        if (btnText === 'C') {
          newState.btnText = 'AC';
        } else if (btnText === 'AC') {
          newState.operator = '';
          newState.result = 0;
          newState.isOperatorClicked = false;
        }
        newState.currentNum = 0;
        newState.isNewNum = true;
        this.setState(newState);

        const operatorBtns = document.querySelectorAll('.btn-operator');
        operatorBtns.forEach((btn) => {
          if (btnText === 'C' && btn.innerText === operator) {
            btn.classList.add('btn-clicked');
          } else {
            btn.classList.remove('btn-clicked');
          }
        });
        return;
      }

      if (classList.contains('btn-sign')) {
        if (currentNum === 0 || currentNum === 'Error') {
          newState.currentNum = '-0';
        } else {
          newState.currentNum = -currentNum;
          newState.result = -result;
        }
        this.setState(newState);
        return;
      }

      if (classList.contains('btn-number')) {
        if (String(currentNum).length === 9) {
          return;
        }

        let clickedNum = Number(innerText);
        if (currentNum === '-0') {
          clickedNum *= -1;
        }
        if (isNewNum) {
          newState.currentNum = clickedNum;
          newState.isNewNum = false;
        } else {
          newState.currentNum =
            currentNum >= 0
              ? currentNum * 10 + clickedNum
              : currentNum * 10 - clickedNum;
        }
        newState.btnText = 'C';
        this.setState(newState);
        return;
      }

      if (classList.contains('btn-operator')) {
        newState.isNewNum = true;
        if (result === 'Error') {
          newState.currentNum = 'Error';
          this.setState(newState);
          return;
        }

        if (!isOperatorClicked) {
          newState.prevNum = currentNum;
          newState.isOperatorClicked = true;
        } else {
          newState.result = calculate(prevNum, currentNum, operator);
          newState.prevNum = newState.result;
          newState.currentNum = newState.result;
        }
        newState.operator = innerText;
        this.setState(newState);

        const operatorBtns = document.querySelectorAll('.btn-operator');
        operatorBtns.forEach((btn) => {
          if (btn.innerText === innerText) {
            btn.classList.add('btn-clicked');
          }
        });
        return;
      }

      if (classList.contains('btn-equal')) {
        if (result === 'Error') {
          newState.currentNum = 'Error';
          newState.isNewNum = true;
          this.setState(newState);
          return;
        }

        if (isOperatorClicked) {
          newState.result = calculate(prevNum, currentNum, operator);
          newState.prevNum = currentNum;
        } else {
          newState.result = operator
            ? calculate(currentNum, prevNum, operator)
            : currentNum;
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
