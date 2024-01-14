import { useState, useEffect, useCallback } from 'react';
import apiHelper from '../helper/apiHelper';

export function useExpense(userId, setLoading) {
    const [expense, setExpense] = useState([]);
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [type, setType] = useState(undefined);
    const [open, setOpen] = useState(false);

    const fetchExpense = useCallback(async () => {
        setLoading(true);
        try {
            const filter = { startDate: range.startDate, endDate: range.endDate, type };
            const { data } = await apiHelper('/transaction/expenses', { params: filter });
            setExpense(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [userId, range, type, setLoading]);

    useEffect(() => {
        fetchExpense();
    }, [fetchExpense]);

    return { expense, range, setRange, type, setType, open, setOpen };
}