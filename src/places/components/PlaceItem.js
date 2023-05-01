import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin'
import React, { useState,useContext } from 'react'
import { useHttpClient } from '../../shared/components/hooks/http-hook'
import Card from '../../shared/components/UIElements/Card'
import AuthContext from '../../shared/Context/AuthContext'
import './PlaceItem.css'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function PlaceItem(props) {
  let history=useHistory();
  const auth=useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError}=useHttpClient();

  const [showmap, setshowmap] = useState(false)
  const openMap = () => {
    setshowmap(true)
  }
  const closeMap = () => {
    setshowmap(false)
  }
  const UpdatePlace=()=>{
    console.log(props.id);
  }
  const [showdeleteWarming,setShowDeleteWarning]=useState(false);
  const closedeleteWarning=()=>{
    setShowDeleteWarning(false);
  }
const DeleteWarning=()=>{
  setShowDeleteWarning(true);
}
const DeletePlace=async()=>{
  setShowDeleteWarning(false);
  try{
    await sendRequest(`https://ilocatebackend-kgvh.onrender.com/api/places/${props.id}`,"DELETE");
    props.onDelete(props.id);
          history.push('/'+auth.userId+'/places');
      }catch(err){
          console.log(err);
        }

}
  return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showmap}
        onCANCEL={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close Map</Button>}
      >
        <div className="map-container">
          <Map latitude={props.latitude} longitude={props.longitude}/>
        </div>
      </Modal>
      <Modal
        show={showdeleteWarming}
        onCANCEL={closedeleteWarning}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={<>
        <Button inverse onClick={closedeleteWarning}>Cancel</Button>
        <Button danger onClick={DeletePlace}>Delete</Button>
        </>}
      >
       <p>
         Are you want to Delete this ,Deleting this will not make it back!
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
        {isLoading && (
          <div className="center">
            <LoadingSpin />
          </div>
        )}
          <div className="place-item__image">
            <img src={`${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>View On Map</Button>
 
      {auth.userId===props.creatorId&&  <Button  to={`/place/${props.id}`} onClick={UpdatePlace}>Edit</Button>}

      {auth.userId===props.creatorId&&     <Button danger onClick={DeleteWarning}>Delete</Button>}
            <button className="back" onClick={props.onClick}>
              Back
            </button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceItem
