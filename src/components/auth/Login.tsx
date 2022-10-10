import React from "react";
import { client, providers } from "../../pb/config";
import { useNavigate, useHref, useLocation } from 'react-router-dom';
import { Admin, User } from "pocketbase";




interface LoginProps {
user?: User | Admin | null
}
interface ProvType{

    name: string
    state: string
    codeVerifier: string
    codeChallenge: string
    codeChallengeMethod: string
    authUrl: string

}

export const Login: React.FC<
  LoginProps
> = ({user}) => {
  let provs = providers.authProviders;
const navigate = useNavigate()
console.log("user in Login.tsx  ==  ",user)
if(user?.email){
  navigate('/')
}

  //  const [provis,setProvis]=React.useState(async()=>{
  //      return await listSignInMethods()
  //  })

  const loginWithGoogge = async () => {
    const authData =
      await client.users.authViaOAuth2(
        "google",
        "CODE",
        "VERIFIER",
        "REDIRECT_URL"
      );
    console.log(
      "authentication data === ",
      authData
    );
  };

  console.log("is valid from auth store  ==  ",client.authStore.isValid);
  
  const startLogin = (prov:ProvType) => { localStorage.setItem("provider",JSON.stringify(prov));
  const redirectUrl = "http://localhost:3000/redirect";
  const url = prov.authUrl + redirectUrl;
      console.log("prov in button === ", prov)
      console.log("combined url ==== >>>>>>  ",url)
  
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  return (
    <div className="w-full h-full flex-center-col">
      <div className="text-3xl font-bold ">
        LOGIN
      </div>
      {provs &&
        provs?.map((item:any) => {
          return (
            <button 
            className="p-2 bg-purple-600"
            key={item.name}
            onClick={() => startLogin(item)}>{item.name}</button>
          );
        })}
    </div>
  );
};
