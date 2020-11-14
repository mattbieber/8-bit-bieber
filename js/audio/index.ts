
import { Clock } from './clock'
import { AudioAdapter } from './adapter'
export { audioContext } from './adapter'
export { EventEmitter, AudioEventType, Callback } from './events'
export { StepEvent } from './clock'
export const clock = Clock.getInstance()
export const adapter = new AudioAdapter()



