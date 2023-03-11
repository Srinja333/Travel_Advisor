// axios is libary which helps us to make call
import axios from "axios";

const URL ="https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary"

export const getPlacesData = async (ne,sw) => {
  try {
    
    const {  data: {data} }  = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng 
      },
      headers: {
        'X-RapidAPI-Key': 'dc8c2424fbmsh580cf5765f8ce57p19eabbjsn1e921e39f8bd',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });

    //here data: is property of axios
     //console.log("data:", data);
    //console.log("data:", typeof(data));

    return data; //returns restaurant data
  }
   catch (error) {
    //console.log("injerr",error);
  }
};
