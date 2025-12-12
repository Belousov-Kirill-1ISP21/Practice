import styles from '../css/Pages/Practice3Style.module.css'
import { Header } from '../components/Header'
import { useState, useEffect, useRef } from 'react';

export const Practice3 = (props)=>{

    const [field, setField] = useState([]);
    const [fieldCount, setFieldCount] = useState([]);
    const openedCells = useRef(0);
    
    useEffect(() => {
        const newField = createField();
        setField(newField);
        const newFieldCount = createFieldCount(newField);
        setFieldCount(newFieldCount);
    }, []);

    const checkWin = () => {
        const totalCells = 25;
        const mineCount = field.flat().filter(cell => cell.isMine).length;
        if (openedCells.current === totalCells - mineCount) {
            alert("Вы победили!");
            window.location.reload();
        }
    };

    return <div className={styles.wrapper}>

    <Header/>

    <div>
        <h1>Сапёр</h1>
        
        <table>
            <tbody>
            {field.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                    <ButtonMine
                        isMine={cell.isMine}
                        count={fieldCount[rowIndex]?.[cellIndex] || 0}
                        onOpen={() => {
                            openedCells.current++;
                            checkWin();
                        }}
                    />
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    </div>
}

const ButtonMine =(props) => {
  const {isMine, count, onOpen} = props;
  const [display, setDisplay] = useState(" ");

  function click() {
      if(isMine){
          setDisplay("+");
          alert("игра окончена");
          window.location.reload();
      } else {
          setDisplay(count);
          onOpen();
      }
  }

  return(
      <button style={{padding:10}} onClick={click}>{display}</button>
  );
}

function createField() {
  const size = 5;
  const minMines = 3;
  const maxMines = 5;
  const totalMines = Math.floor(Math.random() * (maxMines - minMines + 1)) + minMines;
  
  let field = Array(size).fill().map(() => Array(size).fill().map(() => ({ isMine: false })));
  let minesPlaced = 0;
  
  while (minesPlaced < totalMines) {
    const randomRow = Math.floor(Math.random() * size);
    const randomCol = Math.floor(Math.random() * size);
    
    if (!field[randomRow][randomCol].isMine) {
      field[randomRow][randomCol] = { isMine: true };
      minesPlaced++;
    }
  }

  console.log('мин:', field);
  return field;
}


function createFieldCount(field) {
    const size = 5;
    let fieldCount = Array(size).fill().map(() => Array(size).fill(0));

    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++) { 
        let count = 0;

        if(i > 0 && field[i-1] && field[i-1][j] && field[i-1][j].isMine) {
          count++;
        }
        if(i > 0 && j > 0 && field[i-1] && field[i-1][j-1] && field[i-1][j-1].isMine) {
          count++;
        }
        if(j > 0 && field[i] && field[i][j-1] && field[i][j-1].isMine) {
          count++;
        }
        if(i < 4 && j > 0 && field[i+1] && field[i+1][j-1] && field[i+1][j-1].isMine) {
          count++;
        }
        if(i < 4 && field[i+1] && field[i+1][j] && field[i+1][j].isMine) {
          count++;
        }
        if(i < 4 && j < 4 && field[i+1] && field[i+1][j+1] && field[i+1][j+1].isMine) {
          count++;
        }
        if(j < 4 && field[i] && field[i][j+1] && field[i][j+1].isMine) {
          count++;
        }
        if(i > 0 && j < 4 && field[i-1] && field[i-1][j+1] && field[i-1][j+1].isMine) {
          count++;
        }

        fieldCount[i][j] = count;
      }
    }

    console.log("Количество мин вокруг:", fieldCount);
    return fieldCount;
}