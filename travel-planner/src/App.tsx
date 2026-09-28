import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { supabase } from './shared/API/supabase'
import{useEffect} from 'react';
import {useSession} from '@/shared/API/useSession';
import{AuthForm} from '@/features/auth/AuthForm';

export default function App() {
const {session, loading} = useSession();
const [status, setStatus]=useState('Проверяю...');
useEffect(()=>{
  supabase
  .from('trips')
  .select('*')
  .then(({data,error})=>{
    if (error) setStatus(`Ошибка: ${error.message}`);
    else setStatus(`Связь есть. Поездок видно: ${data.length}`);
  });
}, []);
  return (
    <div className="container">
        <h1>Travel Planner</h1>
        <p className="meta"> {status}</p>
    </div>
  )
}