import get from 'lodash/get'
import {createSelector} from 'reselect'

import selectMaxTripDurationMinutes from './max-trip-duration-minutes'
import selectPercentileCurves from './percentile-curves'
import selectPercentileIndex from './percentile-index'

// State 타입 정의
interface State {
  maxTripDurationMinutes: number
  percentileCurves: number[][]
  percentileIndex: number
}

// 셀렉터 타입 정의
const selectMaxTripDurationMinutesTyped = (state: State): number =>
  selectMaxTripDurationMinutes(state)
const selectPercentileCurvesTyped = (state: State): void | number[][] =>
  selectPercentileCurves(state)
const selectPercentileIndexTyped = (state: State): number =>
  selectPercentileIndex(state)

export default createSelector(
  selectMaxTripDurationMinutesTyped,
  selectPercentileCurvesTyped,
  selectPercentileIndexTyped,
  (cutoffMinutes, percentileCurves, percentileIndex) =>
    get(percentileCurves, `[${percentileIndex}][${cutoffMinutes}]`) as
      | void
      | number
)
