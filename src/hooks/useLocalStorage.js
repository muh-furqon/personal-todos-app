import { useState, useEffect } from "react";
import { get, set } from "../utils/storage";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return get(key) ?? initialValue;
    });

    useEffect(() => {
        set(key, value);
    }, [key, value]);

    return [value, setValue]
}