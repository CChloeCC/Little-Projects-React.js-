import React, { useEffect, useState } from 'react'
import styles from './AQI.module.css'
import axios from 'axios'

export default function AQI() {
  const [data, setData] = useState([])
  const [dataDir, setDataDir] = useState([])
  const [cities, setCities] = useState([])
  const [city, setCity] = useState([])

  const range = [
    [0, 50, '#95F084'],
    [51, 100, '#FFE695'],
    [101, 150, '#FFAF6A'],
    [151, 200, '#FF5757'],
    [201, 300, '#9777FF'],
    [301, 400, '#AD1774'],
  ]
  const [site, setSite] = useState([])
  console.log(site)

  useEffect(() => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const date = new Date().getDate()
    const hour = new Date().getHours()

    axios
      .get(
        `https://data.moenv.gov.tw/api/v2/aqx_p_488?format=json&api_key=d2f3ce4e-97c8-4029-af41-8a80276cd838&filters=county,EQ,臺北市,新北市,臺中市,宜蘭市,花蓮縣,高雄市|datacreationdate,LE,${year}-${month}-${date} ${hour}:00:00|datacreationdate,GR,${year}-${month}-${date} ${
          hour - 1
        }:00:00`,
      )
      .then((res) => {
        // console.log(res)
        setData(res.data.records)
        setDataDir(res.data.fields)
        setCities([...new Set(res.data.records.map((v) => v.county))])
        setCity(res.data.records.filter((v) => v.county === '臺北市'))
        setSite(res.data.records.filter((v) => v.sitename === '陽明')[0])
      })
  }, [])

  const infoList = ['o3', 'pm10', 'pm2.5', 'co', 'so2', 'no2']

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.legend}>
            <div className={styles.title}>
              <p>空氣品質指標 (AQI)</p>
              <select
                name="city"
                id="city"
                value={city.length > 0 && city[0].county}
                onChange={(e) => {
                  const selectedCity = data.filter(
                    (v) => v.county === e.target.value,
                  )

                  setCity(selectedCity)

                  setSite(selectedCity[0])
                }}
              >
                {cities.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  {range.map((v, i) => (
                    <td key={i} style={{ backgroundColor: `${v[2]}` }}>
                      {`${v[0]}~${v[1]}`}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>良好</td>
                  <td>普通</td>
                  <td>
                    對敏感族群
                    <br />
                    不健康
                  </td>
                  <td>
                    對所有族群
                    <br />
                    不健康
                  </td>
                  <td>非常不健康</td>
                  <td>危害</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.city}>
            <p>{city.length > 0 && city[0].county}</p>
            <p className={styles.line}></p>
            <p>{data?.length > 0 && data[0].datacreationdate} 更新</p>
          </div>
          <div className={styles.data}>
            <div className={styles.detail}>
              <div className={styles.selectedSite}>
                <p className={styles.name}>{site?.sitename}</p>
                <p
                  className={styles.num}
                  style={{
                    backgroundColor:
                      site?.aqi &&
                      range.find((v) => {
                        return (
                          v[0] <= parseInt(site.aqi) &&
                          parseInt(site.aqi) <= v[1]
                        )
                      })[2],
                  }}
                >
                  {site?.aqi}
                </p>
              </div>
              <div className={styles.info}>
                {infoList.map((v, i) => {
                  const foundInfo = dataDir?.find((f) => f.id === v)
                  return (
                    <div className={styles.infoItem} key={i}>
                      <p className={styles.nameZh}>
                        {foundInfo && foundInfo.info.label.split('[')[0]}
                        <span>
                          {v}(
                          {foundInfo &&
                            foundInfo.info.label.split('[')[1].slice(0, -1)}
                          )
                        </span>
                      </p>
                      <p className={styles.num}>{site?.[v]}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={styles.siteBox + ' site'}>
              {Array.isArray(city)
                ? city.map((v, i) => (
                    <div key={i}>
                      <p
                        onClick={(e) => {
                          setSite(
                            city.find((v) => v.sitename === e.target.innerText),
                          )
                        }}
                      >
                        {v.sitename}
                      </p>
                      <p
                        style={{
                          backgroundColor: range.find((r) => {
                            return (
                              r[0] <= parseInt(v.aqi) && parseInt(v.aqi) <= r[1]
                            )
                          })[2],
                        }}
                      >
                        {v.aqi}
                      </p>
                    </div>
                  ))
                : data?.length > 0
                ? data
                    .filter((v) => v.county === city)
                    .map((v) => (
                      <div key={v}>
                        <p>{v.sitename}</p>
                        <p>{v.aqi}</p>
                      </div>
                    ))
                : ''}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <span>資料來源：行政院環境保護署</span>
          <span>Copyright © 2019 HexSchool. All rights reserved.</span>
        </div>
      </div>

      <style jsx>
        {`
          .site {
            height: 535px;
            width: 730px;
            display: flex;
            padding-top: 15px;
            flex-wrap: wrap;
            align-items: start;
            overflow-y: scroll;

            &::-webkit-scrollbar {
              height: 5px;
              width: 5px;
            }
            &::-webkit-scrollbar-track {
              background-color: transparent;
              border-radius: 40px;
              padding-left: 5px;
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 40px;
              background-color: #666666;
              // background-color: rgba(239, 214, 197, 0.55);
            }
          }
        `}
      </style>
    </>
  )
}
