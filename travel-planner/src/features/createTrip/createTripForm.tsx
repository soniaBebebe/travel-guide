import {useState } from 'react';
import {useCreateTrip} from '@/entitites/trip/queries';
import {dateRange} from '@/shared/lib/dateRange';

export const createTripForm = () =>{
    const [title, setTitle] = useState('');
    const [destination, setDestination] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [error, setError] = useState<string|null>(null);

    const createTrip=useCreateTrip();

    const submit=()=>{
        setError(null);
        try{
            const dates=dateRange(new Date(start), new Date(end));
            createTrip.mutate(
                {
                    title:title.trim(),
                    destination: destination.trim()||null,
                    dates,
                    baseCurrency:'KZT',
                    coverUrl:null,
                },
                {
                onSuccess:()=>{
                    setTitle('');
                    setDestination('');
                    setStart('');
                    setEnd('');
                },
                onError: (e)=>setError(e.message),
            },
            )
        }
        catch(e){
            setError(e instanceof Error ? e.message:'Oшибка');
        }
    }
    const valid = title.trim() !== '' && start !=='' && end !=='';

    return(
        <div className="card">
            <div className="field">
                <label htmlFor="title">Название</label>
                <input id="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            <div className="field">
                <label htmlFor="dest">Направление</label>
                <input id="dest" value={destination} onChange={(e)=>setDestination(e.target.value)} />
            </div>
            <div className="row">
                <div className="field">
                    <label htmlFor="start">Начало</label>
                    <input id="start" type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="end">Конец</label>
                    <input id="end" type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
                </div>
            </div>
            {error && <p className="error">{error}</p>}

            <button className='btn' onClick={submit} disabled={!valid||createTrip.isPending}>
                {createTrip.isPending ? 'Сохраняю...' : 'Создать поездку'}
            </button>
        </div>
    )
}
