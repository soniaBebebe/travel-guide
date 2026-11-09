import {CreateTripForm} from '@/features/createTrip/createTripForm';
import {useTrips, useDeleteTrip} from '@/entitites/trip/queries';
import {durationDays,isActive,isUpcoming} from '@/entitites/trip/model';

export const DashboardPage=()=>{
    const {data:trips, isLoading, error} = useTrips();
    const deleteTrip=useDeleteTrip();
    return(
        <>
        <CreateTripForm />
        {isLoading && <p className="meta">Загрузка...</p>}
        {error && <p className="error">{(error as Error).message}</p>}
        {trips?.length === 0 && <p className='meta'> Пока пусто - создайте первую поездку.</p>}
        {trips?.map((trip)=>{
            <div key={trip.id} className="card">
                <div className="topbar">
                    <h3>{trip.title}</h3>
                    <button className='link' onClick={()=>{
                        if (confirm(`Удалить "${trip.title}"?`)) deleteTrip.mutate(trip.id);
                    }}>
                        Удалить
                    </button>
                </div>
                <p className="meta">
                    {trip.destination ?? 'без направления'} . {durationDays(trip)} дн.
                    {isActive(trip) && ' идет сейчас'}
                    {isUpcoming(trip) && 'впереди'}
                </p>
            </div>
        })}
        </>
    )
}