import SecondChallenge from '@/components/second-challenge'
import AQI from '@/components/AQI'
import DrawingBoard from '@/components/drawing-board'
import WorldClock from '@/components/world-clock'
import { useState } from 'react'

export default function Home() {
  const [show, setShow] = useState('World-Clock')
  return (
    <>
      <div className="container">
        <div className=" menu">
          <div
            className="menuItem"
            role="button"
            onClick={() => {
              setShow('World-Clock')
            }}
          >
            <p className="menuItemF"> World-Clock</p>
            <p className="menuItemB"> World-Clock</p>
          </div>{' '}
          <div
            className="menuItem"
            role="button"
            onClick={() => {
              setShow('Drawing-Board')
            }}
          >
            <p className="menuItemF">Drawing-Board</p>
            <p className="menuItemB"> Drawing-Board</p>
          </div>
          <div
            className="menuItem"
            role="button"
            onClick={() => {
              setShow('AQI')
            }}
          >
            <p className="menuItemF"> Air Quality Index</p>
            <p className="menuItemB"> Air Quality Index</p>
          </div>
          <div
            className="menuItem"
            role="button"
            onClick={() => {
              setShow('Second-Challenge')
            }}
          >
            <p className="menuItemF"> Second-Challenge</p>
            <p className="menuItemB"> Second-Challenge</p>
          </div>
        </div>
        <div>
          {show === 'Drawing-Board' ? (
            <DrawingBoard />
          ) : show === 'World-Clock' ? (
            <WorldClock />
          ) : show === 'AQI' ? (
            <AQI />
          ) : show === 'Second-Challenge' ? (
            <SecondChallenge />
          ) : (
            ''
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 100px auto;
        }
        .menu {
          width: 1280px;
          height: 100px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }
        .menuItem {
          width: 230px;
          transition: transform 0.6s ease-out;
          position: relative;
          margin: 10px;
          transform-style: preserve-3d;
          transform-origin: center center;
        }
        .menuItemF,
        .menuItemB {
          border-radius: 5px;
          width: 230px;
          height: 80px;
          background-color: #e3e3e3;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          font: bold 22px/27px Open Sans;
          position: absolute;
        }

        .menuItemB {
          top: 0;
          left: 0;
          transform: rotateY(180deg);
          background-color: #808080;
          color: #ffffff;
          backface-visibility: hidden;
        }
        .menuItem:hover {
          transform: rotateY(-180deg);
        }
      `}</style>
    </>
  )
}
