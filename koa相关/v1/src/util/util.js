import { customRef } from "vue";
// 防抖
export function useDebouncedRef(value, delay = 1500) {
  let timeout = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
// 节流
export function useThrottleRef(value, delay = 1500) {
  var timer = null;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        if (!timer) {
          timer = window.setTimeout(() => {
            timer = undefined;
            value = newValue;
            trigger();
          }, delay);
        }
      },
    };
  });
}
