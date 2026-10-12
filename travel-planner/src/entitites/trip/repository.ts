import {supabase} from '@/shared/API/supabase';
import {dateRange} from '@/shared/lib/dateRange';
import type {Trip, TripDraft} from './model';

interface TripRow{
    id:string;
    user_id:string;
    title:string;
    destination:string|null;
    start_date:string;
    end_date:string;
    base_currency:string;
    cover_url:string|null;
}

const toDomain=(r:TripRow): Trip=>({
    id:r.id,
    userId:r.user_id,
    title:r.title,
    destination:r.destination,
    dates:dateRange(new Date(r.start_date), new Date(r.end_date)),
    baseCurrency:r.base_currency,
    coverUrl:r.cover_url,
});

const toRow=(t:Partial<TripDraft>)=>{
    const row:Record<string, unknown>={};
    if(t.title !== undefined) row.title=t.title;
    if(t.destination !== undefined) row.destination=t.destination;
    if(t.baseCurrency !== undefined) row.base_currency=t.baseCurrency;
    if(t.coverUrl !== undefined) row.coer_url=t.coverUrl;
    if(t.dates !== undefined) {
        row.start_date=t.dates.start.toISOString().slice(0,10);
        row.end_date=t.dates.end.toISOString().slice(0,10);
    }
    return row;
};

export const tripRepository={
    async findAll(): Promise<Trip[]>{
        const {data, error}=await supabase
        .from('trips')
        .select('*')
        .order('start_date', {ascending:false});
        if(error) throw new Error(error.message);
        return (data??[]).map(toDomain);
    },
    async findBy(id:string):Promise<Trip|null>{
        const {data, error}=await supabase
        .from('trips')
        .select('*')
        .eq('id', id)
        .maybeSingle();
        if(error) throw new Error(error.message);
        return data ? toDomain(data): null;
    },
    async create(draft:TripDraft):Promise<Trip>{
        const{data:auth}=await supabase.auth.getUser();
        if(!auth.user) throw new Error('Требуется вход');

        const {data, error}=await supabase
        .from('trips')
        .insert({...toRow(draft), user_id:auth.user.id})
        .select()
        .single();
        if(error) throw new Error(error.message);
        return toDomain(data);
    },
    async remove(id:string): Promise<void>{
        const {error}=await supabase.from('trips').delete().eq('id', id);
        if(error) throw new Error(error.message);
    },
}