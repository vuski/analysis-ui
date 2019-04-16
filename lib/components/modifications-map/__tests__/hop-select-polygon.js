// @flow

import React from 'react'
import {Map} from 'react-leaflet'
import renderer from 'react-test-renderer'

import HopSelectPolygon from '../hop-select-polygon'

describe('Project-Map > HopSelectPolygon', () => {
  it('renders correctly', () => {
    // mount component
    const tree = renderer
      .create(
        <Map>
          <HopSelectPolygon
            allStops={[]}
            hopStops={[]}
            selectHops={jest.fn()}
          />
        </Map>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})