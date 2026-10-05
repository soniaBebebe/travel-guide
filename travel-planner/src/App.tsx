import { useState } from 'react'
import './App.css'
import { supabase } from './shared/API/supabase'
import{useEffect} from 'react';
import {useSession} from '@/shared/API/useSession';
import{AuthForm} from '@/features/authentification/AuthForm';

export default function App() {
const {session, loading} = useSession();
if (loading){
  return (
    <div className="container">
        <p className="meta"> Загрузка...</p>
    </div>
  );
}
if (!session){
  return <AuthForm />;
}
return(
  <div className="container">
    <div className='topbar'>
      <h1>Travel Planner</h1>
      <button className='link' onClick={()=> supabase.auth.signOut()}>Выйти</button>
    </div>
    <p className='meta'>Вы вошли как {session.user.email}</p>
  </div>
);
}