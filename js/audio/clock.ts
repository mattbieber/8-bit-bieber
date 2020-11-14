
import {  AudioEventType, 
          Callback, 
          EventEmitter, 
          SubscriberRegistry} from './events'

import { audioContext } from './adapter'

const LOOK_AHEAD = 0.25
const SCHED_AHEAD = 0.1
const beatlen = 0.05

export class StepEvent {
  constructor(public step: number, public time: number) {}
}

export class Clock extends EventEmitter {
  private static instance: Clock
  private _bpm: number = 60
  private worker: Worker
  private isRunning: boolean = false
  private currentStep = 0
  private nextStepTime = 0.0
  
  
  eventQueue: StepEvent[] = []
  tempo: number = 50

  get bpm() : number {
    return this._bpm
  }

  set bpm(newVal: number) {
    this._bpm = newVal
  }

  private constructor() {
    super()
    this.worker = new Worker('clockWorker.js')
    this.worker.postMessage({ 'lookahead' : LOOK_AHEAD })
    this.worker.onmessage = this.handleWorkerMessage
  }
   
  stop() : boolean {
    
    this.worker.postMessage('stop')
    this.emit(AudioEventType.Stop)
    this.isRunning = false
    return this.isRunning
  }

  start() : boolean {
    this.isRunning = true
    this.currentStep = 0
    this.emit(AudioEventType.Start)
    this.nextStepTime = audioContext.currentTime
    this.worker.postMessage('start')
    
    return this.isRunning
  }

  fillBuffer(step: number, time: number) {
    this.eventQueue.push(new StepEvent(step, time))

    // var osc = audioContext.createOscillator();
    // osc.connect( audioContext.destination );
    // osc.start( time );
    // osc.stop( time + beatlen)
  }
  
  getFromQueue() {

  }

  advanceStep() {
    let secsPerBeat = 60.0 / this.tempo
    this.nextStepTime += 0.25 * secsPerBeat
    console.log(this.currentStep)
    this.currentStep++
    if (this.currentStep === 16) this.currentStep = 0
  }

  schedule() {
    while (this.nextStepTime < audioContext.currentTime + SCHED_AHEAD) {
      // console.log('s')
      this.fillBuffer(this.currentStep, this.nextStepTime)
      this.advanceStep()
    }
  }
  handleWorkerMessage = (e: MessageEvent) : void => {
    const eventType = e.data as AudioEventType
    
    switch(eventType) {
      case AudioEventType.Buffer:
        this.schedule()
      break

      case AudioEventType.Start:
        Clock.instance.emit(AudioEventType.Start)
        break

      case AudioEventType.Stop:
        console.log('asdadsoiqjoijqodijqwoidjoqwjdoqjwdoqjdw')
        
        Clock.instance.emit(AudioEventType.Stop)
        break

      
    }
  }

  public static getInstance(): Clock {
    if (!Clock.instance) {
        Clock.instance = new Clock();

    }

    return Clock.instance;
}




}