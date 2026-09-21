import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { supabase } from './shared/API/supabase'
import{useEffect} from 'react';

export default function App() {
const [status, setStatus]=useState('Проверяю...');
useEffect(()=>{
  supabase
  .from('trips')
  .select('*')
  .then(({data,error})=>{
    if (error) setStatus(`Ошибка: ${error.message}`);
    else setStatus(`Связь есть. Порядок видно: ${data.length}`);
  });
}, []);
  return (
    <div className="container">
        <h1>Travel Planner</h1>
        <p className="meta"> Каркас работает</p>
    </div>
  )
}