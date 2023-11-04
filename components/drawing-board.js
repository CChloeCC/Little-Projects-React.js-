import React, { useRef, useState, useEffect } from 'react'
import styles from '@/components/d-b.module.css'

export default function DrawingBoard() {
  const [btnTop, setBtnTop] = useState(true)
  const colors = ['#FFFFFF', '#000000', '#9BFFCD', '#00CC99', '#01936F']
  const [color, setColor] = useState('#FFFFFF')
  const [size, setSize] = useState(3)

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  // const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 })
  // const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const [redoStack, setRedoStack] = useState([])
  const [undoStack, setUndoStack] = useState([])
  // console.log(undoStack)

  useEffect(() => {
    const canvas = canvasRef.current
    //將Canvas實際渲染的大小設定給canvas變數的寬高
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx // 將 ctx 存入 useRef 中

    ctx.lineJoin = 'round' // 設定線條的交會處為圓角
    ctx.lineCap = 'round' // 設定線條的端點為圓角
    ctx.imageSmoothingEnabled = true //抗鋸齒效果

    ctx.strokeStyle = color
    ctx.lineWidth = size
  }, [size, color])

  const handleMouseDown = (e) => {
    // const canvas = canvasRef.current
    const ctx = ctxRef.current // 從 useRef 中取得最新的 ctx
    // const rect = canvas.getBoundingClientRect()
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    ctx.beginPath()
    ctx.moveTo(x, y) // 設定起始點

    setDrawing(true)

    // setPrevPosition({ x, y })
    // setCurrentPosition({ x, y })

    // setRedoStack([])
  }
  const handleMouseMove = (e) => {
    if (!drawing) return
    // const canvas = canvasRef.current
    const ctx = ctxRef.current // 從 useRef 中取得最新的 ctx
    // const rect = canvas.getBoundingClientRect()

    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY

    ctx.lineTo(x, y)
    ctx.stroke()

    // setPrevPosition({ ...currentPosition })
    // setCurrentPosition({ x, y })
  }

  const handleMouseUp = (e) => {
    if (drawing) {
      setDrawing(false)
      const canvas = canvasRef.current

      const snapshot = canvas.toDataURL() // 將畫布轉為 data URL 快照

      setUndoStack([...undoStack, snapshot]) //存入 undoStack
    }
  }

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const undoStackFixed = undoStack.filter(
        (v) => v !== canvasRef.current.toDataURL(),
      )

      const lastSnapshot =
        undoStackFixed.length > 0
          ? undoStackFixed[undoStackFixed.length - 1]
          : ''
      const newUndoStack = undoStack.slice(0, -1)
      setUndoStack(newUndoStack)
      setRedoStack([...redoStack, canvasRef.current.toDataURL()])

      const img = new Image()
      img.src = lastSnapshot

      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = ctxRef.current
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }
  }

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextSnapShot = redoStack[redoStack.length - 1]
      const newRedoStack = redoStack.slice(0, -1)
      setRedoStack(newRedoStack)
      setUndoStack([...undoStack, canvasRef.current.toDataURL()])

      const img = new Image()
      img.src = nextSnapShot
      img.onload = () => {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        )
        ctxRef.current.drawImage(
          img,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        )
      }
    }
  }

  const handleClearAll = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    setRedoStack([])
  }

  const handleSave = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL('image/png')
    // const dataURL = canvas.toDataURL() //toDataURL()預設會返回 PNG 格式的 data URL >>> data:image/png;base64,Base64編碼數據

    const downloadLink = document.createElement('a') // 建立一個下載連結
    downloadLink.href = dataURL
    downloadLink.download = 'drawing.png' // 下載的檔案名稱
    downloadLink.click() // 模擬點擊下載連結
  }

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.step + ' '}
          style={{ display: btnTop == true ? 'flex' : 'none' }}
        >
          <p className=" ">
            <p
              onClick={() => {
                handleSave()
              }}
            >
              SAVE
            </p>
            <p
              onClick={() => {
                handleClearAll()
              }}
            >
              CLEAR ALL
            </p>
            <p
              onClick={() => {
                handleUndo()
              }}
            >
              UNDO
            </p>
            <p
              onClick={() => {
                handleRedo()
              }}
            >
              REDO
            </p>
          </p>
        </div>
        <canvas
          ref={canvasRef}
          style={{
            width: '1280px',
            height: '620px',
            top: '75px',
            position: 'absolute',
            border: '1px solid #000000',
          }}
          onMouseDown={(e) => {
            handleMouseDown(e)
          }}
          onMouseMove={(e) => {
            handleMouseMove(e)
          }}
          onMouseUp={(e) => {
            handleMouseUp(e)
          }}
        ></canvas>

        <div
          className={styles.stepBtn}
          style={{ top: btnTop == true ? '56px' : '-28px', left: '616px' }}
          onClick={() => {
            setBtnTop(!btnTop)
          }}
        >
          ^
        </div>
        <div
          className={styles.toolBox}
          style={
            btnTop === true
              ? {
                  width: '730px',
                  height: '80px',
                  left: '275px',
                  margin: '0',
                }
              : {
                  width: '56px',
                  height: '56px',
                  left: '616px',

                  overflow: 'hidden',
                }
          }
        >
          <div
            className={styles.pen}
            style={
              btnTop === true
                ? { margin: '0 42px' }
                : { margin: '23px', cursor: 'pointer' }
            }
            onClick={
              btnTop === true
                ? null
                : () => {
                    setBtnTop(!btnTop)
                  }
            }
          >
            P
          </div>
          <div className={styles.size}>
            SIZE:
            <input
              type="text"
              value={size}
              onChange={(e) => {
                setSize(e.target.value)
              }}
            />
            px
          </div>
          <div className={styles.color}>
            <span>COLOR:</span>
            {colors.map((v, i) => {
              return (
                <p
                  key={i}
                  style={{ backgroundColor: `${v}`, cursor: 'pointer' }}
                  onClick={() => {
                    setColor(v)
                  }}
                >
                  {v === color ? 'v' : ''}
                </p>
              )
            })}
          </div>
          <div
            className={styles.toolBtn}
            style={{ top: '-32px', left: '337px' }}
            onClick={() => {
              setBtnTop(!btnTop)
            }}
          >
            v
          </div>
        </div>
      </div>
    </>
  )
}
