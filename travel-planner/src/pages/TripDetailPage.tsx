import {Link, useParams} from 'react-router-dom';
import {useTrip} from '@/entitites/trip/queries';
import {durationDays} from '@/entitites/trip/model';

export const TripDetailPage = () => {
    const {id} = useParams<{id:string}>();
    const {data: trip, isLoading } = useTrip(id!);
    if (isLoading) return <p className="meta"> Загрузка...</p>;
    if(!trip) return <p className='meta'>Поездка не найдена</p>;
    return(
        <>
            <p className="meta">
                <Link to="/">ко всем поездкам</Link>
            </p>
            <h2>{trip.title}</h2>
            <p className="meta">
                {trip.destination ?? 'без направления'} {durationDays(trip)} дн. Бюджет в {''} {trip.baseCurrency}
            </p>
        </>
    )
}