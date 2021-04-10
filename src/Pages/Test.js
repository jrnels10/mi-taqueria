import React, { Component } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvent,
    useMap,
    LayerGroup,
} from "react-leaflet";
export default class Test extends Component {
    async componentDidMount() {
        // console.log(this.props)
        // const { tacoService } = this.props.value;
        // const res = await tacoService.getAuthTest();
        // console.log(res)
    }
    render() {
        const position = [51.505, -0.09]
        return (
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
                </Marker>
            </MapContainer>
        )
    }
}
