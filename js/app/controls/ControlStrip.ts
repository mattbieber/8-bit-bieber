import { Drawable } from '../../dom/traits'
import { EBBCircleMetrics } from '../../dom/structs'

import { CanvasColor, ColorKey, CanvasColorProps } from '../../dom/color'
import { Geo } from '../../util'



/**
 * 🐳 abstract  
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export class ControlStrip implements Drawable {
  
  props: CanvasColorProps = { color: CanvasColor.Default, strokeColor: CanvasColor.Default }
  metrics: EBBCircleMetrics = { x: 0, y: 0, w: 0, h: 0, r: 5 }
  contexts: Array<CanvasRenderingContext2D>
  activeColor: CanvasColor = CanvasColor.Beige
  
  constructor(metrics: any, props: any, contexts: Array<CanvasRenderingContext2D>) {
    this.metrics = metrics
    this.props = props
    this.contexts = contexts
    
  }


  draw() {
    
    const ctx = this.contexts[0]

    ctx.save()
    const { x, y, w, h, r } = this.metrics
    ctx.clearRect(x, y, w, h)
    ctx.fillStyle = this.props.color!
    ctx.fillRect(x,y,w,h)
    ctx.restore()
      
    
  }


  update(on: boolean) {
   const color = on ? this.activeColor : this.props.color! 

   const ctx = this.contexts[0]
   ctx.save()
   const { x, y, w, h, r } = this.metrics
   ctx.clearRect(x, y, w, h)
   ctx.fillStyle = color
   ctx.fillRect(x,y,w,h)
   ctx.restore()
  }


}