// import Head from 'next/head'
// import Image from 'next/image'

import DrawingBoard from '@/components/drawing-board'
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
            setShow('Clock')
          }}
        >
          Clock
        </p>
      </div>
      <div>{show === 'Drawing-Board' ? <DrawingBoard /> : ''}</div>
    </>
  )
}
