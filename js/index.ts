
import { App, Config } from "./app/App";
import { EBBArea } from "./dom/structs";
const pkg = require('../package.json')

let synth
import('../pkg')
.then(module => {

  synth = module
  


})
.catch(console.error);


// const audioBootstrap = (e: MouseEvent) => {

//   let osc: FmOsc = new synth.FmOsc()
//   console.log(osc)
  
//   let wasmevent = new CustomEvent<any>('wasmnotification', { detail: osc } )
//   document.dispatchEvent(wasmevent)
// }

const sequencer = new App(pkg)


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
// document.addEventListener('click', audioBootstrap)
