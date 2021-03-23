import { useEffect, useContext, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import TaqueriaService from "../../services/taqueria.service";
import { User, Taqueria } from "../../Utils/Interfaces";
import { TaqueriaContext } from "../../Utils/UserContext";
import "./Mapindex.scss";

const loadUser = (user: User) => {};

const TaqueriaMap = () => {
  const api = new TaqueriaService();
  const context = useContext(TaqueriaContext);
  const [taquerias, setTaquerias] = useState([]);
  useEffect(() => {
    const fetchTaquerias = async () => {
      try {
        const res = await api.getTaqueria({ status: "", search: "" });
        if (res && res.data) {
          setTaquerias(res.data);
        }
        // setTaquerias(data.session.passport.user);
        // setFetching is false here
        // setFetchingUser(false);
      } catch (error) {
        // You can create an error state and set error here
        console.log(error);
      }
    };

    fetchTaquerias();

    return () => {};
  }, []);
  console.log(taquerias);
  return (
    <MapContainer center={[33.3, -112.2]} zoom={11}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {taquerias.map((taco: Taqueria) => (
        <Marker key={taco.id} position={[taco.latitude, taco.longitude]}>
          <div onClick={() => console.log("hello")}>
            <Popup>{taco.description}</Popup>
          </div>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default TaqueriaMap;
