import L, {MapboxGL} from 'leaflet'
import {MapLayer, MapLayerProps, withLeaflet} from 'react-leaflet'

import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'

import {MB_TOKEN, MB_STYLE} from 'lib/constants'

interface MapboxGLLayerProps extends MapLayerProps {
  style: string
}

interface MapboxGLEl extends MapboxGL {
  _glMap: any
}

class MapBoxGLLayer extends MapLayer<MapboxGLLayerProps, MapboxGLEl> {
  shouldComponentUpdate(nextProps) {
    if (nextProps.style !== this.props.style) return true
    return false
  }

  componentDidUpdate() {
    if (this.leafletElement && this.leafletElement._glMap) {
      this.leafletElement._glMap.setStyle(this.props.style)
      this.leafletElement._glMap.resize()
    }
  }

  createLeafletElement(props) {
    if (L.mapboxGL == null) return null
    return L.mapboxGL({
      accessToken: MB_TOKEN,
      style: MB_STYLE,
      // @ts-ignore
      language: 'ko'
    }) as MapboxGLEl
  }
}

export default withLeaflet(MapBoxGLLayer)
