import  { useState,useCallback,useEffect} from 'react';
let logoutTimer;
export const useAuth=()=>{
    const [token,setToken]=useState(null);
  const [userId,setUserId]=useState(null);
  const [tokenExpirationDate,settokenExpirationDate]=useState();

  const login=useCallback((uid,token,expirationDate)=>{
    setToken(token);
    setUserId(uid);
const tokenExpirationDate=expirationDate||new Date(new Date().getTime() +1000*60*60);
settokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({userId:uid,token:token,
      expiration:tokenExpirationDate.toISOString()
    }))

  },[])

  const logout=useCallback(()=>{
    setToken(null);
    localStorage.removeItem('userData');
    setUserId(null);
    settokenExpirationDate(null);
  },[])

  useEffect(()=>{
if(token && tokenExpirationDate){
  const remainingtime=tokenExpirationDate.getTime()- new Date().getTime();
  logoutTimer=setTimeout(logout,remainingtime);
}else{clearTimeout(logoutTimer);}
  },[token,logout,tokenExpirationDate])


  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token&& new Date(storedData.expiration)>new Date()){
      login(storedData.userId,storedData.token,new Date(storedData.expiration));
    }
  },[login])
  return {token,login,logout,userId};
}