import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";

interface FetchState<T> {
    loading: boolean;
    data: T | null;
    error: Error | null;
}

/**
 * Custom hook to fetch data from a given endpoint.
 *
 * @template T - The type of the data to be fetched.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @returns {FetchState<T>} An object containing the loading state, fetched data, and any error encountered.
 *
 * @example
 * const { loading, data, error } = useFetch<MyDataType>('/api/data');
 */
export const useFetch = <T,>(endpoint: string): FetchState<T> => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axiosInstance.get<T>(endpoint);
                setData(res.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { loading, data, error };
};
