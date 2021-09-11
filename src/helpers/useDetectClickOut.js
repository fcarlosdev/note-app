import { useEffect, useRef } from "react";

function useDetectClickOut(action) {
  const nodeRef = useRef(null);

  const handleClickOutside = (event) =>  action(event);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return {
    nodeRef,
  };
}

export default useDetectClickOut;
