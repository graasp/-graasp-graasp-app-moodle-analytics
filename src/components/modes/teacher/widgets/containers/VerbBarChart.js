import { connect } from 'react-redux'
import _ from 'lodash'
import BarChart from '../components/BarChart'
import {
  buildDateRange,
  combineContents,
  fromDate,
  toDate,
  createDataForBarChart,
  fillDataForBarChart,
  formatDates,
  nbOfTicks,
  changeDateFormatForBarChart,
  chunkData,
  getUniqueVerbs,
  dateAreChunked
} from '../util'
import { DATE, VERB_BAR_CHART_DAY_PICKER_ID_PER_TIME } from '../types'
import {
  SCREEN_SIZE_RANGE,
  TICK_NUMBER_FOR_TIME_PERIOD,
  VERB_BAR_CHART_MAX_CHART_NUMBER
} from '../../../../../config/settings'

const xAxis = DATE
const yAxis = 'Occurrence'

const VerbBarChart = (data, from, to) => {
  let myData = _.cloneDeep(data)
  const dateRange = buildDateRange(from, to)
  const allowedVerbs = getUniqueVerbs(myData)
  const formattedData = createDataForBarChart(dateRange, allowedVerbs, [DATE])
  myData = fillDataForBarChart(myData, formattedData)
  myData = changeDateFormatForBarChart(myData)
  myData = chunkData({}, myData, VERB_BAR_CHART_MAX_CHART_NUMBER)
  return myData
}

const mapStateToProps = ({
  appInstanceResources: { content },
  chartDataById,
  windowSize: { windowSize }
}) => {
  const data = combineContents(content)

  const values = formatDates(
    buildDateRange(
      fromDate(chartDataById, VERB_BAR_CHART_DAY_PICKER_ID_PER_TIME),
      toDate(chartDataById, VERB_BAR_CHART_DAY_PICKER_ID_PER_TIME)
    ),
    VERB_BAR_CHART_MAX_CHART_NUMBER
  )

  // divide by 2 because dates are twice as big
  const tickRange = dateAreChunked(values)
    ? TICK_NUMBER_FOR_TIME_PERIOD.FULLSCREEN.map((x) => Math.ceil(x / 2.0))
    : TICK_NUMBER_FOR_TIME_PERIOD.FULLSCREEN

  return {
    data: VerbBarChart(
      data,
      fromDate(chartDataById, VERB_BAR_CHART_DAY_PICKER_ID_PER_TIME),
      toDate(chartDataById, VERB_BAR_CHART_DAY_PICKER_ID_PER_TIME)
    ),
    keys: getUniqueVerbs(data),
    indexBy: DATE,
    xAxis,
    yAxis,
    values,
    maxTicks: nbOfTicks(tickRange, SCREEN_SIZE_RANGE, windowSize)
  }
}

export default connect(mapStateToProps)(BarChart)
