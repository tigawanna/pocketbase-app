import React from 'react'
import { Loading } from './Loading';

interface LoadingShimmerProps {

}

export const LoadingShimmer: React.FC<LoadingShimmerProps> = ({}) => {
return (
 <div className='w-full h-screen flex-center'>
        <div className='w-full h-full animate-pulse p-2 bg-slate-200 flex-center'>
              <Loading size={150}/>
        </div>

 </div>
);
}
