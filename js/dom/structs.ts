
export interface EBBVector {
  x: number;
  y: number;
}

/**
 * 
 */
export type EBBArea = {
  w: number;
  h: number;
}

export interface EBBRectMetrics {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface EBBCircleMetrics extends EBBRectMetrics {
  r: number;
}

export interface EBBGeo {
  clientRect: EBBArea;
  centerPoint: EBBVector;
  scale: number;
  offsets: Record<string, EBBRectMetrics>;
}

/**
 * 🐬
 * @interface
 * 
 */

export type Letters = Record<string, () => void>

/**
 * 🐙
 * @typedefn{ }
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type ColoredRects = Record<string, Array<{ metrics: number[], colorIndex: number }>> 

/**
 * 🐙
 * @typedef
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export type PlainRect = Record<string, Array<number[]>>

export enum EBBDirection {
  Left, Right, Up, Down, None
}

export interface EBBRenderData {
  pos: EBBVector;
  scale: EBBVector;
  dimensions: EBBArea;
  offsets: Record<string, number>;
}

export interface EBBAnimationData {
  lastPosition: EBBVector;
  lastAnimatedStep: number;
  minLapse: number;
  maxLapse: number;
  step: number;
  visible: boolean;
  velocity: number;
  name: string;
  hDirection: EBBDirection;
  vDirection: EBBDirection;
  lastHDirection: EBBDirection;
  lastVDirection: EBBDirection;
  
}

export interface EBBDrawingData {
  rd: EBBRenderData;
  ad: Record<string, EBBAnimationData>;
}


export class EBBDD implements EBBDrawingData {
  rd: EBBRenderData
  ad: Record<string, EBBAnimationData>

  constructor() {
    this.rd = {
      pos: { x: 0, y: 0 },
      scale: { x: 0, y: 0 },
      dimensions: { w: 0, h: 0 },
      offsets: {}
    }

    this.ad = 
    {
      default: {
        lastPosition: { x: 0, y: 0 },
        lastAnimatedStep: 0,
        minLapse: 0,
        maxLapse: 0,
        step: 0,
        visible: true,
        velocity: 0,
        name: '',
        hDirection: EBBDirection.None,
        vDirection: EBBDirection.None,
        lastHDirection: EBBDirection.None,
        lastVDirection: EBBDirection.None
        
      }
    }
  }
}