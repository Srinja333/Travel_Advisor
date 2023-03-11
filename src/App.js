import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const[childClicked, setChildClicked]=useState(null);

  //below runs on start and direct to my current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        //console.log("coords",latitude,longitude);
        setCoordinates({ lat: latitude, lng: longitude });
      })
  }, []);

  useEffect(() => {
    //console.log("coordinates:", coordinates);
    //console.log("bounds:", bounds);
    getPlacesData(bounds.ne, bounds.sw)
    .then((data)=>{
      //we use .then because getPlacesData is async
       //console.log("appdata",data);
      //console.log("appdata:", typeof(data));
      setPlaces(data)
    })
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
          places={places}
          childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* when i give setCoordinate and use  */}
          
          <Map
            setCoordinates={setCoordinates} 
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
            
          />
        </Grid>
      </Grid>
    </>
  );
  };

export default App;
