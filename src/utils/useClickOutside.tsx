import { useEffect } from "react";

export function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleClick(event) {
      // Kung may ref ka, at yung clinick mo ay WALA sa loob ng ref
      if (ref.current && !ref.current.contains(event.target)) {
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