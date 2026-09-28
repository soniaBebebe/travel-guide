import {useState} from 'react';
import {supabase} from'@/shared/API/supabase';

export const AuthForm=()=>{
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[mode, setMode] = useState<'signin'|'signup'>('signin');
    const [error,setError] = useState<string|null>(null);
    const [busy, setBusy] = useState(false);

    const submit=async()=>{
        setBusy(true);
        setError(null);

        const{error}=
        mode==='signin'
        ? await supabase.auth.signInWithPassword({email,password})
        : await supabase.auth.signUp({email,password});

        if (error) setError(error.message);
        setBusy(false);
    };

    return(
        <div className='container'>
            <h1>{mode==='signin'?'Вход' : 'Регистрация'}</h1>

            <div className="card">
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                {error && <p className="error">{error}</p>}

                <button className='btn' onClick={submit} disabled={busy||!email||!password}>
                    {busy ? 'Минуту...': mode==='signin' ? 'Войти' : 'Зарегестрироваться'}
                </button>

                <p className='meta' style={{marginTop:12}}>
                    {mode==='signin' ? 'Нет Аккаунта?' : 'Уже есть аккаунт?'}
                    <button className='link' onClick={() => {setMode(mode==='signin' ? 'signup' : 'signin'); setError(null);}}>
                        {mode==='signin' ? 'Зарегестрироваться' : 'Войти'}
                    </button>
                </p>
            </div>
        </div>
    )
}