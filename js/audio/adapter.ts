import { AudioContext, AudioWorkletNode } from 'standardized-audio-context'

export let audioContext: AudioContext

export class AudioAdapter {

  constructor() {

  }

  init() : boolean {
    audioContext = new AudioContext()
    return !!audioContext
  }
}