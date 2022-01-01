import './Map.css'
import React, { useRef ,useEffect} from 'react'
import './Map.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
function Map(props) {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
    const mapContainer = useRef(null);
  const map = useRef(null);
  const lng= props.longitude;
  const lat = props.latitude;
  const zoom = 16;
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom: zoom
    });
  });

    return (
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
        <div ref={mapContainer} className="map-container" />
        </div>
    )
}
export default Map
