
export type Callback = (...args: any[]) => void
export type SubscriberRegistry = { [ event in AudioEventType]? : Set<Callback> }

export enum AudioEventType {
  Buffer = 'buffer',
  Start = 'start',
  Step = 'step',
  Stop = 'stop',
  Toggle = 'toggle',
  InstrumentChange = 'instrument_change'
}

export abstract class EventEmitter {
  subscribers: SubscriberRegistry = {}

  on(event: AudioEventType, callback: Callback) : void {
    let callbacks = this.subscribers[event] || new Set<Callback>()
    callbacks.add(callback)
    this.subscribers[event] = callbacks


  }
  
  off(event: AudioEventType, callback: Callback) : void {
    if(!this.subscribers[event]) return

    let callbacks = this.subscribers[event] as Set<Callback>

    let cb  = [...callbacks].find(cb => cb === callback) as Callback

    this.subscribers[event]?.delete(cb) 

    if(this.subscribers[event]?.size === 0) {
      delete this.subscribers[event]
    }
  }
  
  emit(event: AudioEventType, ...args: any[]) : void {
    if(this.subscribers[event]) {
      
      this.subscribers[event]?.forEach(cb => cb(args))
    }
  }
}
