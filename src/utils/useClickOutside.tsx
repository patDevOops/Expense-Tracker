import { useEffect } from "react";
import type { RefObject } from "react";

// ref holds the element to watch, onClickOutside runs kapag click sa labas
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Kung may ref ka, at yung clinick mo ay WALA sa loob ng ref
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClick);

    // Linisin mo pag nawala na yung component
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onClickOutside]);
}