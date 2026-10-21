import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import type{TripDraft} from './model';
import { tripRepository } from './repository';

export const tripKeys={
    all: ['trips'] as const,
    detail:(id:string)=>['trips', id] as const,
};

export const useTrips=()=>
    useQuery({
        queryKey: tripKeys.all,
        queryFn:()=> tripRepository.findAll(),
    });

export const useCreateTrip=()=>{
    const qc = useQueryClient();
    return useMutation({
        mutationFn:(draft: TripDraft) => tripRepository.create(draft),
        onSuccess:()=> qc.invalidateQueries({queryKey:tripKeys.all}),
    });
};

export const useDeleteTrip =()=>{
    const qc=useQueryClient();
    return useMutation({
        mutationFn:(id:string)=>tripRepository.remove(id),
        onSuccess:()=>qc.invalidateQueries({queryKey:tripKeys.all}),
    });
};