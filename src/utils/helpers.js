// to store username---------------------------------
export const setUserName=(username)=>{
        localStorage.setItem("username",username);
}

export const getUserName = () =>{
    const username = localStorage.getItem("username");
    return username
}


// to store auth in conditional rendoring---------------------------------
export const setMyAuth = (myAuth) =>{
    localStorage.setItem("myAuth",myAuth)  
}
export const getMyAuth = () =>{
    var auth = localStorage.getItem("myAuth") 
    return auth;
}
  