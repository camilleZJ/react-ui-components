import { useEffect } from "react";
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listner = function (event) {
            var dom = ref.current;
            if (!dom || dom.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("click", listner);
        return function () {
            document.removeEventListener("click", listner);
        };
    }, [ref, handler]);
}
export default useClickOutside;
