

export interface AudioWorkletProcessor {
  readonly port: MessagePort
  process(inputs: Float32Array[][], 
          outputs: Float32Array[][],
          parameters: Map<string, Float32Array>): void
}

export class Processor implements AudioWorkletProcessor {
  port: MessagePort;
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Map<string, Float32Array>): void {
    throw new Error("Method not implemented.");
  }

}