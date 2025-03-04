import {useRef} from "react";

export function useDebounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
) {
    // const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>()
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    function debounced(...args: Parameters<T>) {
        if(timeoutId.current)
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            fn(...args);
        }, delay)

    }

    return debounced;
}
