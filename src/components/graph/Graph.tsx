import React, { useState, useEffect } from 'react'

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Graph() {

  const [ graphData, setGraphData ] = useState({
    labels: [],
    datasets: [],
  })
  const [ graphOptions, setGraphOptions ] = useState({})

  useEffect(() => {
    setGraphData({
      labels: ['John', 'kevin', 'george', 'michael', 'oreo'],
      datasets: [{
        label: "Whom'st let the dogsout",
        data: [12, 55, 34, 120, 720],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.4)"
      }]
    })
    setGraphOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: "Whom'st let the dogsout"
        }
      }
    })
  }, [])


  return (
    <Line
      options={graphOptions}
      data={graphData}
      // {}
    />
  )
}
