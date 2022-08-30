export default function debounce(callback: any, timing = 100) {
  let timer: any = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timing);
  };
}
