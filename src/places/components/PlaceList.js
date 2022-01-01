import React,{useContext} from 'react'
import Button from '../../shared/components/FormElements/Button'
import './PlaceList.css'
import Card from '../../shared/components/UIElements/Card'
import {useParams} from 'react-router-dom';
import PlaceItem from './PlaceItem'
import AuthContext from '../../shared/Context/AuthContext'
import { useHistory } from 'react-router-dom';
function PlaceList(props) {
  const userId = useParams().userId;
  const auth=useContext(AuthContext);
  
  const history = useHistory();
  const BacktoAllUser=()=>{
    history.push('/');
  }
  const gotoAddPlace=()=>{
    history.push('/places/new');
  }
  if (props.items.length === 0) {
    return (
      
      <div className="place-list center">
        <Card>
          <h2>{ auth.userId===userId ?"No Place Found, MayBe Create One?":"No place Added by User"}</h2>
      {   auth.userId===userId &&<Button onClick={gotoAddPlace}>Share Places</Button>}
          <Button inverse onClick={BacktoAllUser}>Back</Button>
        </Card>
      </div>
    )
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          address={place.address}
          description={place.description}
          creatorId={place.creator}
         latitude={place.latitude}
         longitude={place.longitude}
          onClick={BacktoAllUser}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  )
}

export default PlaceList
