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
        const responseData = await sendRequest('https://ilocatebackend-kgvh.onrender.com/api/users');


        setLoadedUsers(responseData.users);
      } catch (err) {
     console.log(err);
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
