import React, { useEffect, useState,useContext } from 'react';
import { useParams ,useHistory} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/components/hooks/form';
import './NewPlace.css';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import AuthContext from '../../shared/Context/AuthContext';

const UpdatePlace = () => {
  const auth=useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError}=useHttpClient();
  const [loadedPlace,setLoadedPlace]=useState('');
  let history=useHistory();

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `https://ilocatebackend-kgvh.onrender.com/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            },
            address: {
              value: responseData.place.address,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);


  const placeUpdateSubmitHandler =async event => {
    event.preventDefault();
    try{
      await sendRequest(`https://ilocatebackend.onrender.com/api/places/${placeId}`,"PATCH",JSON.stringify({
            title:formState.inputs.title.value,
            description:formState.inputs.description.value,
            address:formState.inputs.address.value,
          }),{
              'Content-Type':'application/json'
            });
            history.push('/'+auth.userId+'/places');
        }catch(err){
            console.log(err);
          }
  };
  if (isLoading) {
    return (
      <div className="center">
    <LoadingSpin/>
      </div>
    );
  }

  if (!loadedPlace&&error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }


  return ( 
      <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && (
        <div className="center">
          <LoadingSpin />
        </div>
      )}
    {!isLoading&&loadedPlace&&<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={loadedPlace.title}
        initialValid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={loadedPlace.description}
        initialValid={true}
      />
      <Input
        id="address"
        element="textarea"
        label="Address"
        validators={[VALIDATOR_MINLENGTH(1)]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        initialValue={loadedPlace.address}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
      <Button id="back" inverse type="back" onClick={()=>{history.push(`/${auth.userId}/places`)}}>
      Back
      </Button>
    </form>}
    </>
  );
};

export default UpdatePlace;
