import { differenceInCalendarDays, eachDayOfInterval, isWithinInterval} from 'date-fns';

export interface DateRange {
    readonly start: Date;
    readonly end: Date;
}

export const dateRange =(start:Date, end:Date): DateRange=>{
    if(end<start) throw new Error('Дата окончания раньше даты начала');
    return {start,end};
};

export const durationDays=(r:DateRange): number =>
    differenceInCalendarDays(r.end, r.start) +1;

export const contains =(r:DateRange, d: Date): boolean =>
    isWithinInterval(d, {start: r.start, end:r.end});

export const overlaps =(a:DateRange, b:DateRange): boolean =>
    a.start <= b.end && b.start <= a.end;

export const days = (r:DateRange): Date[]=>
    eachDayOfInterval({start:r.start, end:r.end});