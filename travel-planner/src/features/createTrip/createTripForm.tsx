import {useState } from 'react';
// import {useCreateTrip} from '@/entities/trip/queries';
import {dateRange} from '@/shared/lib/dateRange';

export const useCreateTripForm = () =>{
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
                onSuccess:()=>{
                    setTitle('');
                    setDestination('');
                    setStart('');
                    setEnd('');
                },
                onError:(e)=>setError(e.message),
            }
            )
        }
    }
}
