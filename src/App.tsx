import { useState } from 'react'
import { Query, useQuery } from 'react-query';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css'
import { About } from './components/about/About';
import { Login } from './components/auth/Login';
import { Protected } from './components/auth/Protected';
import { Redirect } from './components/auth/Redirect';
import { UserType } from './components/auth/types';
import { Home } from './components/home/Home';
import { Toolbar } from './components/toolbar/Toolbar';
import { client, getUser } from './pb/config';
import { LoadingShimmer } from './components/Shared/loading/LoadingShimmer';


function App() {



const userQuery = useQuery(["user"],getUser); 
  // console.log("user query App.tsx==== ", userQuery)
  
  // console.log("client authstore",client.authStore)
const user = userQuery.data

if(userQuery.isFetching || userQuery.isFetching){
  return <LoadingShimmer/>
}

return (
    <div
    className="h-screen w-screen   scroll-bar flex-col-center 
    dark-styles transition duration-500 overflow-x-hidden "
    >
      <BrowserRouter >

        <div className="fixed top-[0px] w-[100%] z-40 p-1">
          <Toolbar />
        </div>


        <div className="w-full h-full mt-12 ">
          <Routes>
            <Route
              path="/"
               element={
                <Protected user={user}>
                  <Home />
                </Protected>
              }
            />

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login user={user}/>} />
           <Route path="/redirect" element={<Redirect user={user}/>} /> 
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App
