import React,{useEffect,useState} from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpin from '../../shared/components/UIElements/LoadingSpin';
import UsersList from '../components/UsersList';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import './User.css';
const Users =() => {
  const [loadedUsers, setLoadedUsers] = useState();
  const {isLoading,error,sendRequest,clearError}=useHttpClient();

  useEffect(() => {
    const getUser = async () => {
      try {
<<<<<<< HEAD
        const response= await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
;
        setLoadedUsers(response.users);
=======
        const responseData = await sendRequest('https://ilocatebackend-kgvh.onrender.com/api/users');


        setLoadedUsers(responseData.users);
>>>>>>> 84515c5e873cbf0378ca07365a682b5f51f2724d
      } catch (err) {

     console.log("error from get user"+ err);
      }
    };
   getUser();
  }, [sendRequest]);

 
  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && (
        <div className="center">
          <LoadingSpin />
        </div>
      )}
    <h2 className="heading">Users Lists</h2>
   { !isLoading&&loadedUsers&& <UsersList items={loadedUsers} />}
   </>
  );
};

export default Users;
