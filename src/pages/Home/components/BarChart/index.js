import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const BarChart = ({title, data, names, dates}) => {
  const chartRef = useRef(null)
  useEffect(() => {
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: title
      },
      angleAxis: {},
      radiusAxis: {
        type: 'category',
        data: names,
        z: 10
      },
      polar: {},
      series: names.map((item, index) => ({
        type: 'bar',
        data: data[index],
        coordinateSystem: 'polar',
        name: dates[index],
        stack: 'a',
        emphasis: {
          focus: 'series'
        }
      })),

      legend: {
        show: true,
        data: dates
      }
    };

    option && myChart.setOption(option);

  }, [title, data, names, dates])

  return (
    <div>
      <div ref={chartRef} style={{ width: '500px', height: '400px' }} />
    </div >
  )
}

export default BarChart