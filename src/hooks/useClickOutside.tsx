import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listner = (event: MouseEvent) => {
      const dom = ref.current;
      if (!dom || dom.contains(event.target as HTMLElement)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("click", listner);

    return () => {
      document.removeEventListener("click", listner);
    };
  }, [ref, handler]);
}

export default useClickOutside;
