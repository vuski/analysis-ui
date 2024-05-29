import get from 'lodash/get'
import {createSelector} from 'reselect'

import selectComparisonPercentileCurves from './comparison-percentile-curves'
import selectMaxTripDurationMinutes from './max-trip-duration-minutes'
import selectPercentileIndex from './percentile-index'

// State 타입 정의
interface State {
  maxTripDurationMinutes: number
  comparisonPercentileCurves: void | number[][]
  percentileIndex: number
}

// 셀렉터 타입 정의
const selectMaxTripDurationMinutesTyped = (state: State): number =>
  selectMaxTripDurationMinutes(state)
const selectComparisonPercentileCurvesTyped = (
  state: State
): void | number[][] => selectComparisonPercentileCurves(state)
const selectPercentileIndexTyped = (state: State): number =>
  selectPercentileIndex(state)

export default createSelector(
  selectMaxTripDurationMinutesTyped,
  selectComparisonPercentileCurvesTyped,
  selectPercentileIndexTyped,
  (cutoffMinutes, percentileCurves, percentileIndex) =>
    get(percentileCurves, `[${percentileIndex}][${cutoffMinutes}]`) as
      | void
      | number
)
