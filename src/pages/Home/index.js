import BarChart from "./components/BarChart"

const Home = () => {
  const title1 = 'History Score 1'
  const title2 = 'History Score 2'
  const data1 = [[3,2,2], [2, 4, 1], [6,3,5]]
  const data2 = [[4,4,6], [2,7,1], [6,3,4]]
  const names = ['Mom', 'Dad', 'Me']
  const dates1 = ['2018', '2019', '2020']
  const dates2 = ['2021', '2022', '2023']

  return (
    <div style={{ display: 'flex' }}>
      <span style={{ flex: 1 }}>
        <BarChart title={title1} data={data1} names={names} dates={dates1} />
      </span>
      <span style={{ flex: 1 }}>
        <BarChart title={title2} data={data2} names={names} dates={dates2} />
      </span>
    </div>
  )
}

export default Home