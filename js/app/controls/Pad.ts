import { Pressable, Drawable } from '../../dom/traits'
import { CanvasColor, ColorKey } from '../../dom/color'
import { Geo } from '../../util'

/**
 * 🐠
 * @enum
 * callback hook for mouse events
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export enum PadType {
  Instr,
  TR
}

/**
 * 🐭 
 * @interface
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export interface Pad extends Pressable, Drawable {
  metrics: any;
  props: any;
  type: PadType;
}


/**
 * 🐳 abstract  
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export abstract class StepPad implements Pad {
  isPressed: boolean = false
  isDisabled: boolean = false
  colorKey: ColorKey = [-1, '']
  
  props = { color: CanvasColor.Default, strokeColor: CanvasColor.Default, strokeWidth: 2 }
  metrics = { x: 0, y: 0, w: 0, h: 0, r: 5 }
  contexts: Array<CanvasRenderingContext2D>
  
  type: PadType = PadType.Instr

  abstract update() : void

  constructor(metrics: any, props: any, contexts: Array<CanvasRenderingContext2D>) {
    this.metrics = metrics
    this.props = props
    this.contexts = contexts
    
  }


  onMouseMove(e: MouseEvent) {
    return
  }
  onMouseClick(e: MouseEvent) {
    this.isPressed = !this.isPressed
    this.draw()
    
  }

  draw() {
    let real = true

    for (let ctx of this.contexts) {

      const { x, y, w, h, r } = this.metrics
      ctx.clearRect(x, y, w, h)
      ctx.fillStyle = real ? this.props.color! : this.colorKey[1]
      ctx.strokeStyle = real ? this.props.strokeColor! : this.colorKey[1]
      
      ctx.beginPath()
      ctx.moveTo(x, y+r)
      ctx.lineTo(x, y+h-r)
      ctx.arcTo(x, y+h, x+r, y+h, r)
      ctx.lineTo(x+w-r, y+h)
      ctx.arcTo(x+w, y+h, x+w, y+h-r, r)
      ctx.lineTo(x+w, y+r)
      ctx.arcTo(x+w, y, x+w-r, y, r)
      ctx.lineTo(x+r, y)
      ctx.arcTo(x, y, x, y+r, r)
      ctx.fill()

      if(this.props.strokeWidth) {
        ctx.lineWidth = this.props.strokeWidth
        ctx.stroke()
      }
      real = false
    }
  }

  
}


export class TRPad extends StepPad {
  type: PadType = PadType.TR
  decoratorMetrics = { x: 0, y: 0, w: 0, h: 0, r: 0 }
  dotMetrics = { x: 0, y: 0, w: 0, h: 0, r: 0 }
  
  constructor(
    metrics: any, 
    props: any, 
    contexts: Array<CanvasRenderingContext2D>) {
      
      super(metrics, props, contexts)
      
      this.decoratorMetrics = { 
        x: this.metrics.x+6, 
        y: this.metrics.y+6, 
        w: this.metrics.w-12, 
        h: this.metrics.h*0.3, r: 0 }
    
      this.dotMetrics = {
        x: this.decoratorMetrics.x + (this.decoratorMetrics.w/2),
        y: this.decoratorMetrics.y + (this.decoratorMetrics.h/2),
        w: 0, h:0, r: 8
      }
  }
  
  draw() {
    super.draw()
    
    const { x, y, w, h, r} = this.metrics
    const { x: x2, y: y2, w: w2, h: h2 } = this.decoratorMetrics

    for (let ctx of this.contexts) {
      ctx.fillStyle = CanvasColor.EOEBrown
       ctx.beginPath()
        ctx.moveTo(x2, y2+r)
        ctx.lineTo(x2, y2+h2)
        ctx.lineTo(x2+w2, y2+h2)
        ctx.lineTo(x2+w2, y2+r)
        ctx.arcTo(x2+w2, y2, x2+w2-r, y2, r)
        ctx.lineTo(x2+r, y2)
        ctx.arcTo(x2, y2, x2, y2+r, r)
        ctx.save()
        ctx.globalAlpha = 0.1
        ctx.fill()
              
        ctx.restore()

        this.update()
        
    }
  }

  update() {
    for (let ctx of this.contexts) {

      ctx.beginPath()
      ctx.arc(
        this.dotMetrics.x, 
        this.dotMetrics.y, 
        this.dotMetrics.r, 0, Geo.PI2, false)
      
      ctx.fillStyle = this.isPressed ? CanvasColor.Red : CanvasColor.EOEBrown
      ctx.fill()

    }

  }


}