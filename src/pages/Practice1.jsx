import styles from '../css/Pages/Practice1Style.module.css'
import { Header } from '../components/Header'
import { useState } from 'react'

export const Practice1 = (props)=>{

    const [display, setDisplay] = useState('0');
    const [firstValue, setFirstValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForSecond, setWaitingForSecond] = useState(false);

    const inputNumber = (num) => {
        if (waitingForSecond) {
            setDisplay(String(num));
            setWaitingForSecond(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    }

    const inputOperator = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (firstValue === null) {
            setFirstValue(inputValue);
        } else if (operator) {
            const result = calculate(firstValue, inputValue, operator);
            setDisplay(String(result));
            setFirstValue(result);
        }

        setWaitingForSecond(true);
        setOperator(nextOperator);
    }

    const calculate = (first, second, op) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return first / second;
            default: return second;
        }
    }

    const clear = () => {
        setDisplay('0');
        setFirstValue(null);
        setOperator(null);
        setWaitingForSecond(false);
    }

    const equals = () => {
        const inputValue = parseFloat(display);

        if (firstValue !== null && operator) {
            const result = calculate(firstValue, inputValue, operator);
            setDisplay(String(result));
            setFirstValue(null);
            setOperator(null);
            setWaitingForSecond(true);
        }
    }

    return <div className={styles.wrapper}>
        <Header/>
        
        <div className={styles.calculator}>
            <h1>Калькулятор</h1>
            <div className={styles.display}>{display}</div>
            <div className={styles.buttons}>
                <button onClick={clear} className={styles.clear}>C</button>
                <button onClick={() => inputOperator('/')}>/</button>
                <button onClick={() => inputOperator('*')}>*</button>
                <button onClick={() => inputOperator('-')}>-</button>
                
                <button onClick={() => inputNumber(7)}>7</button>
                <button onClick={() => inputNumber(8)}>8</button>
                <button onClick={() => inputNumber(9)}>9</button>
                <button onClick={() => inputOperator('+')} className={styles.plus}>+</button>
                
                <button onClick={() => inputNumber(4)}>4</button>
                <button onClick={() => inputNumber(5)}>5</button>
                <button onClick={() => inputNumber(6)}>6</button>
                
                <button onClick={() => inputNumber(1)}>1</button>
                <button onClick={() => inputNumber(2)}>2</button>
                <button onClick={() => inputNumber(3)}>3</button>
                <button onClick={equals} className={styles.equals}>=</button>
                
                <button onClick={() => inputNumber(0)} className={styles.zero}>0</button>
                <button onClick={() => inputNumber('.')}>.</button>
            </div>
        </div>
    </div>
}