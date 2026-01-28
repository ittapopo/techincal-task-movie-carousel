import { useCallback, useRef, useState } from "react";

export function useDragScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!scrollRef.current) {
            return;
        }

        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);

        scrollRef.current.style.cursor = 'grabbing';
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        if (scrollRef.current) {
            scrollRef.current.style.cursor = 'grab';
        }
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) {
            return;
        }

        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    }, [isDragging, startX, scrollLeft]);

    const handleMouseLeave = useCallback(() => {
        if (isDragging) {
            setIsDragging(false);
            if (scrollRef.current) {
                scrollRef.current.style.cursor = 'grab';
            }
        }
    }, [isDragging]);

    return {
        scrollRef,
        isDragging,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        handleMouseLeave
    };
}