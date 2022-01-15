import { useEffect } from 'react';

function useAbortableEffect(effect, dependencies) {
  const status = {};
  useEffect(() => {
    status.aborted = false;
    const cleanUpFn = effect(status);
    return () => {
      status.aborted = true;
      if (typeof cleanUpFn === 'function') {
        cleanUpFn();
      }
    };
  }, [...dependencies]);
}

export default useAbortableEffect;

//Credit:https://www.debuggr.io/react-update-unmounted-component/#:~:text=Warning%3A%20Can't%20perform%20a,in%20a%20useEffect%20cleanup%20function.
