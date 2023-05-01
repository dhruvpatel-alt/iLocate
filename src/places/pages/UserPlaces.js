import React ,{useState,useEffect} from 'react'
import PlaceList from '../components/PlaceList'
import {useParams} from 'react-router-dom';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
function UserPlaces() {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
    const userId = useParams().userId;
  
    useEffect(() => {
      const fetchPlaces = async () => {
        try {
          const responseData = await sendRequest(
            `https://ilocatebackend-kgvh.onrender.com/api/places/user/${userId}`
          );
          setLoadedPlaces(responseData.places);
        } catch (err) {}
      };
      fetchPlaces();
    }, [sendRequest, userId]);
  const PlaceDelete=(deletedPlaceId)=>{
    setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place.id!==deletedPlaceId))
  }
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
          <div className="center">
            <LoadingSpin />
          </div>
        )}
        {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={PlaceDelete}/>}
      </React.Fragment>
    );
}

export default UserPlaces
