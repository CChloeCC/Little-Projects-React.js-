import React, { useEffect, useState } from 'react'
import stylesP1 from './s-cP1.module.css'
import stylesP2 from './s-cP2.module.css'
import stylesP3 from './s-cP3.module.css'

export default function SecondChallenge() {
  const [sec, setSec] = useState(30)
  console.log(sec)
  const [evalBox, setEvalBox] = useState([])
  console.log(evalBox)

  const [userAns, setUserAns] = useState('')
  console.log(userAns)

  const [score, setScore] = useState(0)
  console.log(score)

  const ope = () => {
    const opeOptions = Math.floor(Math.random() * 4) + 1
    let operator
    switch (opeOptions) {
      case 1:
        operator = '+'
        break
      case 2:
        operator = '-'
        break
      case 3:
        operator = '*'
        break
      case 4:
        operator = '/'
        break
    }
    return operator
  }
  const forEvalBox = (randomNum, plus) => {
    const num = () => Math.floor(Math.random() * randomNum) + plus
    const getOpe = ope()

    if (getOpe === '-') {
      const num1 = num()
      const num2 = num()
      const getEval = num1 > num2 ? [num1, getOpe, num2] : [num2, getOpe, num1]
      getEval.push(eval(getEval.join('')))
      setEvalBox(getEval)
    } else if (getOpe === '/') {
      let num1 = num()
      let num2 = num()
      const getEval = num1 > num2 ? [num1, getOpe, num2] : [num2, getOpe, num1]

      const result = eval(getEval.join(''))

      if (Number.isInteger(result)) {
        getEval.push(result)
      } else {
        getEval.splice(0, 1, Math.floor(result) * getEval[2])

        getEval.push(Math.floor(result))
      }

      setEvalBox(getEval)
    } else {
      const getEval = [num(), getOpe, num()]
      getEval.push(eval(getEval.join('')))
      setEvalBox(getEval)
    }
  }

  const question = () => {
    if (sec > 20) {
      forEvalBox(9, 1)
    } else if (sec > 10) {
      forEvalBox(90, 10)
    } else {
      forEvalBox(900, 100)
    }
  }
  const page3 = (
    <div className={stylesP2.container}>
      <p className={stylesP3.name}>60 SECONDS CHALLENGE</p>
      <p className={stylesP3.text}>
        — <span>YOUR FINAL SCORE</span> —
      </p>
      <p className={stylesP3.num}>{score}</p>

      <div
        className={stylesP3.btn}
        onClick={() => {
          setShow('p1')
          setSec(30)
        }}
      >
        TRY AGAIN!
      </div>
    </div>
  )
  let page2 = (
    <div className={stylesP2.container}>
      <div className={stylesP2.info}>
        <div className={stylesP2.scoreBox}>
          <p className={stylesP2.name}>60 SECONDS CHALLENGE</p>
          <div className={stylesP2.score}>
            <p>SCORE</p>
            <span>{score}</span>
          </div>
        </div>
        <div className={stylesP2.time}>{`${Math.floor(sec / 60)}:${parseInt(
          sec % 60,
        )}`}</div>
      </div>
      <div className={stylesP2.eval}>
        <div className={stylesP2.cal}>
          <span>{evalBox[0]}</span>{' '}
          <span>
            {evalBox[1] === '*' ? 'x' : evalBox[1] === '/' ? '÷' : evalBox[1]}
          </span>{' '}
          <span>{evalBox[2]}</span> <span>=</span>
        </div>
        <div className={stylesP2.num}>
          <input
            type="text"
            value={userAns}
            onChange={(e) => {
              setUserAns(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                if (sec > 20) {
                  userAns == evalBox[3] ? setScore(score + 1) : null
                } else {
                  userAns == evalBox[3]
                    ? setScore(score + 5)
                    : score > 0
                    ? setScore(score - 1)
                    : null
                }
                setUserAns('')
                question()
              }
            }}
          />
          <span>press enter to answer</span>
        </div>
      </div>
    </div>
  )

  const page1 = (
    <div className={stylesP1.container}>
      <div className={stylesP1.title}>
        <p className={stylesP1.num}>60</p>
        <div className={stylesP1.name}>
          <p>
            SECONDS <span> +−×÷</span>
          </p>
          <p>CHALLENGE</p>
        </div>
      </div>
      <div className={stylesP1.start}>
        <p
          className={stylesP1.btn}
          onClick={() => {
            setScore(0)
            setSec(30)
            question()
            setShow('p2')
          }}
        >
          START!
        </p>
        <p className={stylesP1.text}>try to answer more as you can</p>
      </div>
    </div>
  )

  const [show, setShow] = useState('p1')

  useEffect(() => {
    if (show === 'p2') {
      const act = setInterval(() => {
        if (sec > 0) {
          setSec((prevSec) => prevSec - 1)
        } else {
          setShow('p3')
          clearInterval(act)
        }
      }, 1000)
      return () => clearInterval(act)
    }
  }, [show, sec])
  return <>{show === 'p1' ? page1 : show === 'p2' ? page2 : page3}</>
}
