import SecondChallenge from '@/components/second-challenge'
import AQI from '@/components/AQI'
import DrawingBoard from '@/components/drawing-board'
import WorldClock from '@/components/world-clock'
import { useState } from 'react'

export default function Home() {
  const [show, setShow] = useState('World-Clock')

  const menuItem = (projectName) => {
    return (
      <div
        className="home_menuItem"
        role="button"
        onClick={() => {
          setShow(projectName)
        }}
      >
        <p className="menuItemF">{projectName}</p>
        <p className="menuItemB"> {projectName}</p>
      </div>
    )
  }

  return (
    <>
      <div className="home_container">
        <div className="home_menu">
          {menuItem('World-Clock')}
          {menuItem('Drawing-Board')}
          {menuItem('AQI')}
          {menuItem('Second-Challenge')}
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
    </>
  )
}
