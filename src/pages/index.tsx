import { useEffect, useState } from 'react'
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { customAxios } from '@utils/custom-axios'
import styles from './Home.module.scss'

interface IPrefecture {
  prefCode: number
  prefName: string
}

const genColor = string => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  return color
}

export default function Home() {
  const initData = () => {
    const years = []
    for (let i = 1965; i <= 2015; i += 5) {
      years.push({ year: i })
    }
    return years
  }

  const fetchPrefs = () => {
    customAxios
      .get('/api/prefectures')
      .then(r => {
        setPrefs(r.data.result)
      })
      .catch(err => console.log(err))
  }

  const fetchData = prefIndex => {
    customAxios
      .get(`/api/population?prefCode=${prefs[prefIndex].prefCode}`)
      .then(r => {
        setData(data.map((v, i) => ({ ...v, [prefs[prefIndex].prefName]: r.data.result[i] })))
      })
      .catch(err => console.log(err))
  }

  const [prefs, setPrefs] = useState<IPrefecture[]>([])
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([])
  const [data, setData] = useState(initData)

  const handleCheckbox = event => {
    const found = selectedPrefs.find(e => e === event.target.value)
    console.log(found)
    if (found === undefined) {
      setSelectedPrefs([...selectedPrefs, event.target.value])
      fetchData(event.target.value)
    } else {
      setSelectedPrefs(selectedPrefs.filter(p => p !== event.target.value))
    }
  }

  useEffect(fetchPrefs, [])

  return (
    <div className={styles.home}>
      都道府県
      <div className={styles.grid}>
        {prefs.map((p, i) => (
          <div className={styles.grid__item} key={p.prefCode}>
            <input className={styles.checkbox} type='checkbox' onChange={handleCheckbox} value={i} />
            {p.prefName}
          </div>
        ))}
      </div>
      <div className={styles.chart} style={{ height: `${selectedPrefs.length * 3}vh` }}>
        <ResponsiveContainer minWidth='100%' minHeight='100%'>
          <LineChart width={750} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign='bottom' />
            {selectedPrefs.map(p => (
              <Line
                type='monotone'
                dataKey={prefs[p].prefName}
                stroke={genColor(prefs[p].prefName)}
                isAnimationActive
                animationDuration={2000}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
