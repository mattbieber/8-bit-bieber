
var timerid = null
let interval = 0

self.onmessage = e => {
  
  if(e.data === 'start') {
    timerid = setInterval(() => postMessage('buffer'), interval)
  }

  else if (e.data === 'stop') {
    clearInterval(timerid)
    timerid = null
  }

  else if (e.data.interval) {
   
    interval = e.data.interval
    if (timerid) {
      clearInterval(timerid)
      timerid =  setInterval(() => postMessage('buffer'), interval)
    }

  }
}