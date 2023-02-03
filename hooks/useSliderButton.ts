import { useCallback, useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import useWindowSize from "./useWindowSize";

const useSliderButton = (items: any[]) => {
  const [show, setShow] = useState(false);
  const size = useWindowSize();
  useLayoutEffect(() => {
    if (size === 0) return;
    if (size >= 1400) {
      setShow(items.length > 7);
    } else if (size >= 1200) {
      setShow(items.length > 6);
    } else if (size >= 1000) {
      setShow(items.length > 5);
    } else if (size >= 760) {
      setShow(items.length > 3);
    } else if (size >= 300) {
      setShow(items.length > 2);
    }
  }, [items.length, size]);

  return show;
};

export default useSliderButton;
