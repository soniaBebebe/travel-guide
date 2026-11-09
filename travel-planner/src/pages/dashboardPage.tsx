import {createTripForm} from '@/features/createTrip/createTripForm';
import {useTrips, useDeleteTrip} from '@/entitites/trip/queries';
import {durationDays,isActive,isUpcoming} from '@/entitites/trip/model';

export const DashboardPage=()=>{
    const {data:trips, isLoading, error} = useTrips();
    const deleteTrip=useDeleteTrip();
    return(
        <>
        <createTripForm/>
        {isLoading && <p className="meta">Загрузка...</p>}
        {error && <p className="error">{{error as Error}.message}</p>}
        {trips?.length === 0 && <p className='meta'> Пока пусто - создайте первую поездку.</p>}
        
        </>
    )
}