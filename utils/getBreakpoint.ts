function getBreakpoints(items: any[]) {
  const getSlidesPerView = (value: number) => {
    return value;
  };

  const breakpoints = {
    300: {
      slidesPerView: getSlidesPerView(2),
      spaceBetween: 10,
    },
    760: {
      slidesPerView: getSlidesPerView(3),
      spaceBetween: 10,
    },
    1000: {
      slidesPerView: getSlidesPerView(5),
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: getSlidesPerView(6),
      spaceBetween: 10,
    },
    1400: {
      slidesPerView: getSlidesPerView(7),
      spaceBetween: 10,
    },
  };

  // console.log(items, breakpoints);
  return breakpoints;
}

export default getBreakpoints;
