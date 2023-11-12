import { useEffect, useState } from 'react'
import styles from './w-c.module.css'

export default function WorldClock() {
  const cities = [
    'NEW YORK,America/New_York',
    'LONDON,Europe/London',
    'KOREA,Asia/Seoul',
    'TAIWAN,Asia/Taipei',
    'SYDNEY,Australia/Sydney',
  ]

  const [timeConent, setTimeContent] = useState(
    cities.map((v) => [
      new Date().toLocaleString(`en-GB`, {
        month: 'short',
        day: 'numeric',
        timeZone: `${v.split(',')[1]}`,
      }),
      new Date().toLocaleString(`en-GB`, {
        year: 'numeric',
        timeZone: `${v.split(',')[1]}`,
      }),
      new Date().toLocaleString(`en-GB`, {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `${v.split(',')[1]}`,
      }),
    ]),
  )

  useEffect(() => {
    setInterval(() => {
      const newTimeContent = cities.map((v, i) => {
        return [
          new Date().toLocaleString(`en-GB`, {
            month: 'short',
            day: 'numeric',
            timeZone: `${v.split(',')[1]}`,
          }),
          new Date().toLocaleString(`en-GB`, {
            year: 'numeric',
            timeZone: `${v.split(',')[1]}`,
          }),
          new Date().toLocaleString(`en-GB`, {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            timeZone: `${v.split(',')[1]}`,
          }),
        ]
      })
      setTimeContent(newTimeContent)
    }, 1000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>WORLD CLOCK</div>
        <div className={styles.timeBox}>
          {cities.map((v, i) => (
            <div key={i} className={styles.time}>
              <div className={styles.city}>
                <p>{v.split(',')[0]}</p>

                {timeConent
                  .filter((t, ti) => ti === i)
                  .map((v) => (
                    <p key={v}>{`${v[0]}, ${v[1]}`}</p>
                  ))}
              </div>
              {timeConent
                .filter((t, ti) => ti === i)
                .map((v) => (
                  <div className={styles.num} key={v}>
                    {`${v[2]}`}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
