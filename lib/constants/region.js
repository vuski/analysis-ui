//
import reprojectCoordinates from '../utils/reproject-coordinates'

export const CREATING_ID = '__CREATING_REGION__'

// const ne = reprojectCoordinates({lat: 39.02345, lon: -76.81503})
// const sw = reprojectCoordinates({lat: 38.77764, lon: -77.25723})

const ne = reprojectCoordinates({lat: 37.826471, lon: 127.368932})
const sw = reprojectCoordinates({lat: 37.260059, lon: 126.809686})

export const DEFAULT_BOUNDS = {
  north: ne.lat,
  east: ne.lon,
  south: sw.lat,
  west: sw.lon
}
