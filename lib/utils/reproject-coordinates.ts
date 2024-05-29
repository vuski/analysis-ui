import lonlat, {LonLatCompatible} from '@conveyal/lonlat'

import {PROJECTION_ZOOM_LEVEL as Z} from '../constants'
//에러 한번 발생
/**
 * Snap a geographic coordinate to the nearest grid point by projecting and
 * rounding the {x, y} values and then converting them back to coordinates.
 */

function parseFloatWithAlternates(alternates) {
  if (Array.isArray(alternates) && alternates.length > 0) {
    const num = parseFloat(alternates[0])

    if (isNaN(num)) {
      return parseFloatWithAlternates(alternates.slice(1))
    } else {
      return num
    }
  }

  return null
}

function floatize(lonlat) {
  const lon = parseFloatWithAlternates([
    lonlat.lon,
    lonlat.lng,
    lonlat.longitude
  ])
  const lat = parseFloatWithAlternates([lonlat.lat, lonlat.latitude])

  if ((!lon || lon > 180 || lon < -180) && lon !== 0) {
    throw new Error(
      'Invalid longitude value: ' +
        (lonlat.lon || lonlat.lng || lonlat.longitude)
    )
  }

  if ((!lat || lat > 90 || lat < -90) && lat !== 0) {
    throw new Error(
      'Invalid latitude value: ' + (lonlat.lat || lonlat.latitude)
    )
  }

  return {
    lat,
    lon
  }
}

function normalize(unknown) {
  if (!unknown) throw new Error('Value must not be null or undefined.')
  if (Array.isArray(unknown)) return fromCoordinates(unknown)
  else if (typeof unknown === 'string') return fromString(unknown)
  else if ('coordinates' in unknown) return fromCoordinates(unknown.coordinates)
  else if (
    'x' in unknown &&
    'y' in unknown &&
    (unknown.x || unknown.x === 0) &&
    (unknown.y || unknown.y === 0)
  ) {
    return fromPoint(unknown)
  }
  return floatize(unknown)
}
function fromCoordinates(coordinates) {
  return floatize({
    lat: coordinates[1],
    lon: coordinates[0]
  })
}

function fromPoint(point) {
  return floatize({
    lat: point.y,
    lon: point.x
  })
}

function fromString(str) {
  const arr = str.split(',')
  return floatize({
    lat: arr[1],
    lon: arr[0]
  })
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180
} // Converts from radians to degrees.

function toDegrees(radians) {
  return (radians * 180) / Math.PI
}

function longitudeToPixel(longitude, zoom) {
  return ((longitude + 180) / 360) * zScale(zoom)
}

const PIXELS_PER_TILE = 256 // 2^z represents the tile number. Scale that by the number of pixels in each tile.

function zScale(z) {
  return Math.pow(2, z) * PIXELS_PER_TILE
} // Converts from degrees to radians

/**
 * Convert a latitude to it's pixel value given a `zoom` level.
 *
 * @param {number} latitude
 * @param {number} zoom
 * @return {number} pixel
 * @example
 * var yPixel = lonlat.latitudeToPixel(40, 9) //= 49621.12736343896
 */

function latitudeToPixel(latitude, zoom) {
  const latRad = toRadians(latitude)
  return (
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    zScale(zoom)
  )
}

const MAX_LAT = /*#__PURE__*/ toDegrees(
  /*#__PURE__*/ Math.atan(/*#__PURE__*/ Math.sinh(Math.PI))
)

function toPixel(input, zoom) {
  const ll = normalize(input)

  if (ll.lat > MAX_LAT || ll.lat < -MAX_LAT) {
    throw new Error(
      'Pixel conversion only works between ' +
        MAX_LAT +
        'N and -' +
        MAX_LAT +
        'S'
    )
  }

  return {
    x: longitudeToPixel(ll.lon, zoom),
    y: latitudeToPixel(ll.lat, zoom)
  }
}

function fromPixel(pixel, zoom) {
  return {
    lat: pixelToLatitude(pixel.y, zoom),
    lon: pixelToLongitude(pixel.x, zoom)
  }
}

/**
 * Convert a pixel to it's longitude value given a zoom level.
 *
 * @param {number} x
 * @param {number} zoom
 * @return {number} longitude
 * @example
 * var lon = lonlat.pixelToLongitude(40000, 9) //= -70.13671875
 */

function pixelToLongitude(x, zoom) {
  return (x / zScale(zoom)) * 360 - 180
}
/**
 * Convert a pixel to it's latitude value given a zoom level.
 *
 * @param {number} y
 * @param {number} zoom
 * @return {number} latitude
 * @example
 * var lat = lonlat.pixelToLatitude(50000, 9) //= 39.1982053488948
 */

function pixelToLatitude(y, zoom) {
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * y) / zScale(zoom))))
  return toDegrees(latRad)
}

export default function reproject(ll: LonLatCompatible) {
  console.log(ll, Z)
  const p = toPixel(ll, Z)
  return fromPixel(
    // const p = lonlat.toPixel(ll, Z)
    // return lonlat.fromPixel(
    {
      x: Math.round(p.x),
      y: Math.round(p.y)
    },
    Z
  )
}

export function reprojectCoordinate(ll: LonLatCompatible) {
  console.log(ll, Z)
  const p = toPixel(ll, Z)
  return fromPixel(
    // const p = lonlat.toPixel(ll, Z)
    // return lonlat.fromPixel(
    {
      x: Math.round(p.x),
      y: Math.round(p.y)
    },
    Z
  )
}
