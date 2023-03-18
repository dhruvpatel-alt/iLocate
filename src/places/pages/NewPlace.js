import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import './NewPlace.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {useForm } from '../../shared/components/hooks/form';
import AuthContext from '../../shared/Context/AuthContext';


const NewPlace = () => {
  const auth=useContext(AuthContext);
  const {isLoading,error,sendRequest,clearError}=useHttpClient();
  let history=useHistory();
 const [formState,inputHandler]= useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
   image: {
      value: null,
      isValid: false
    }
  },false)

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', auth.userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('https://ilocatebackend.onrender.com/api/places','POST',formData).then(response => console.log(response));
            history.push('/');
        }catch(err){
            console.log(err);
          }
  };
  const BacktoAllUser=()=>{
    history.push('/');
  }
  return (
    <>
<ErrorModal error={error} onClear={clearError}/>
    <h2 className="heading">Add Place</h2>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    {isLoading && (
        <div className="center">
          <LoadingSpin />
        </div>
      )}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <ImageUpload center id="image" onInput={inputHandler} errorText="Please Provide an Image"/>
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
      <Button inverse onClick={BacktoAllUser}>Back</Button>

    </form>
        </>
  );
};

export default NewPlace;
