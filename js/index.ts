
import { App, Config } from "./app/App";
import { EBBArea } from "./dom/structs";
const pkg = require('../pkg')


/**
 * 
 * @param e 
 */
const notifyResize = (e: Event | null): void => {
  const detail = {
    w: document.documentElement.clientWidth,
    h: document.documentElement.clientHeight,
  };
  
  let rzevent = new CustomEvent<EBBArea>('resizenotification', { detail })
  document.dispatchEvent(rzevent)
};



const bootstrap = (e: Event) => {
  setTimeout(() => notifyResize(e), 500)
  window.removeEventListener("load", bootstrap);
};

// browser
window.addEventListener("resize", notifyResize);
window.addEventListener("load", bootstrap);
document.addEventListener('click', audioBootstrap)
