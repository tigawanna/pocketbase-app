import React from 'react'
import { Onerepo } from '../repo/onerepo';

interface HomeProps {
token:string
}

export const Home: React.FC<HomeProps> = ({}) => {
return (
 <div className='w-full min-h-screen h-full'>
<Onerepo/>
 </div>
);
}
