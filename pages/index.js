// import Head from 'next/head'
// import Image from 'next/image'

import DrawingBoard from '@/components/drawing-board'
import WorldClock from '@/components/world-clock'
import { useState } from 'react'

export default function Home() {
  const [show, setShow] = useState('')
  return (
    <>
      <div className="d-flex">
        <p
          role="button"
          onClick={() => {
            setShow('Drawing-Board')
          }}
        >
          Drawing-Board
        </p>
        <p
          role="button"
          onClick={() => {
            setShow('World-Clock')
          }}
        >
          World-Clock
        </p>
      </div>
      <div>
        {show === 'Drawing-Board' ? (
          <DrawingBoard />
        ) : show === 'World-Clock' ? (
          <WorldClock />
        ) : (
          ''
        )}
      </div>
    </>
  )
}
