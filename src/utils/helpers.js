// to store username---------------------------------
export const setUserName=(username)=>{
    try{
        localStorage.setItem("username",username);
        console.log("username stored to LS");
    }catch{
        console.log("username is not stored in LS");
    }
}

export const getUserName = () =>{
    const username = localStorage.getItem("username");
}


// to store auth in conditional rendoring---------------------------------
export const setMyAuth = (myAuth) =>{
    localStorage.setItem("myAuth",myAuth)  
}
export const getMyAuth = () =>{
    var auth = localStorage.getItem("myAuth") 
    return auth;
}

// export const setMyAuth = (value) => {
//     sessionStorage.setItem("isAuthenticated", value);
//   };
//   export const getMyAuth = () => {
//     return sessionStorage.getItem("isAuthenticated");
//   };
  