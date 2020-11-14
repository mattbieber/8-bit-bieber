import { EBBVector, EBBAnimationData } from './structs'
import { ColorKey } from './color'

export interface Pressable {
  isPressed: boolean;
  isDisabled: boolean;
  onMouseClick: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  update: () => void;
  colorKey: ColorKey;
}

export interface Drawable {
  draw(ctxs: [CanvasRenderingContext2D]): void;
}


export interface Movable {
  update(step: number) : void;

}