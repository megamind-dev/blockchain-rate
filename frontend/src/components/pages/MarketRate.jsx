import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './MarketRate.scss'

const apiUrl = 'https://liquality.io/swap/agent/api/swap/marketinfo'
const intervals = [5, 10, 15]

export default function MarketRate() {
  const [refreshRate, setRefreshRate] = useState(5)
  const [marketInfo, setMarketInfo] = useState([])

  const loadMarketInfo = (url) => {
    console.log('updating market info')
    axios(url)
      .then((res) => setMarketInfo(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadMarketInfo(apiUrl)
    }, refreshRate * 1000)
    return () => clearInterval(interval)
  }, [refreshRate])

  useEffect(() => {
    loadMarketInfo(apiUrl)
  }, [])

  return (
    <div className='rate'>
      <h2>Market rate</h2>
      <div className='select-field'>
        <label htmlFor='rate-select'>Select an update rate in seconds</label>
        <select
          name='refresh-rate'
          id='rate-select'
          onChange={(evt) => setRefreshRate(evt.target.value)}
        >
          {intervals.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
            <th>Order Expires In</th>
            <th>Status</th>
            <th>Max</th>
            <th>Min</th>
          </tr>
        </thead>
        <tbody>
          {marketInfo.length > 0 &&
            marketInfo.map((e, idx) => (
              <tr key={idx}>
                <td>{e.from}</td>
                <td>{e.to}</td>
                <td>
                  {/* {e.rate} {':'} */}
                  {e.rate.toFixed(8)}
                </td>
                <td>{e.orderExpiresIn}</td>
                <td>{e.status}</td>
                <td>{e.max}</td>
                <td>{e.min}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
