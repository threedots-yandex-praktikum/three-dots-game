let win;

if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
  
  win = window;
} else {
  win = {
    getComputedStyle() {
      return {
        // eslint-disable-next-line
        getPropertyValue() {},
      };
    },
    // eslint-disable-next-line
    addEventListener() {},
    sessionStorage:  {
      // eslint-disable-next-line
      setItem() {},
      // eslint-disable-next-line
      getItem() {},
      // eslint-disable-next-line
      clear() {}
    },
    localStorage: {
      // eslint-disable-next-line
      setItem() {},
      // eslint-disable-next-line
      getItem() {},
    },
  };
}


export default win;
