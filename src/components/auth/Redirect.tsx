import { User, Admin } from 'pocketbase';
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { client } from '../../pb/config';
import { LoadingShimmer } from '../Shared/loading/LoadingShimmer';


interface RedirectProps {
user?: User | Admin | null
}

export const Redirect: React.FC<RedirectProps> = ({user}) => {
const [loading, setLoading] = React.useState(true)
const queryClient = useQueryClient()
const navigate = useNavigate()
const [searchParams] = useSearchParams();
const code = searchParams.get('code') as string
const local_prov = JSON.parse(localStorage.getItem('provider') as string)
let redirectUrl = 'http://localhost:3000/redirect'
useEffect(()=>{
    if (local_prov.state !== searchParams.get("state")) {
        let url = 'http://localhost:3000/login'
        if (typeof window !== 'undefined') {
            window.location.href = url;
        }
    }
    else {
 
      client.users.authViaOAuth2(
            local_prov.name,
            code,
            local_prov.codeVerifier,
            redirectUrl
            )
            .then((response) => {
                // console.log("authentication data === ", response)
                client.records.update('profiles', response.user.profile?.id as string, {
                    name: response.meta.name,
                    avatarUrl: response.meta.avatarUrl,
                    
                }).then((res) => {
                // console.log(" successfully updated profi;e", res)

                }).catch((e) => {
                    console.log("error updating profile  == ", e)
                })
                setLoading(false)
                // console.log("client modal after logg   == ", client.authStore.model)
                queryClient.setQueryData(['user'], client.authStore.model)
                navigate('/')

            }).catch((e) => {
                console.log("error logging in with provider  == ", e)
            })
    }

},[])
if (user) {
    return <Navigate to="/" replace />;
}
return (
 <div className='w-full h-full '>
        {loading ? <LoadingShimmer/>:null}
 </div>
);
}
