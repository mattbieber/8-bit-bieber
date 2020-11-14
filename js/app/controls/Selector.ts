import { EBBVector, EBBCircleMetrics } from '../../dom/structs'
import { Pressable } from '../../dom/traits'
import { EventEmitter } from '../../audio'
import { CanvasColor, ColorKey, APP_BACGROUND_COLOR } from '../../dom/color'
import { ContextCollection, GEO } from '../../dom/CanvasEx'
import { roundedRect } from './util'
import { AudioEventType } from '../../audio'

export class Selector extends EventEmitter implements Pressable {

  x0: number = 0
  y0: number = 0
  isPressed: boolean = false
  isDisabled: boolean = false
  ctxs: ContextCollection = []
  colorKey: ColorKey = [-1, '']
  pos: EBBVector = { x: 0, y: 0 }
  center: EBBVector = { x: 0, y: 0 }

  constructor(public metrics: EBBCircleMetrics, public id: number, public label: string, contextCollection: ContextCollection) {
      super()
      this.ctxs = contextCollection
      this.x0 = Math.floor(metrics.w / 2)
      this.y0 = Math.floor(metrics.h / 2)
  
    }

  onMouseClick(e: MouseEvent  ) {}
  
  onMouseMove(e: MouseEvent) {
    console.log(this.label)
    this.update()
      
  }

  update() {

    this.isPressed = !this.isPressed
    
    let real = true

    for (let ctx of this.ctxs) {
      ctx.save()

      const { x, y, w, h } = GEO.offsets['SEL']

      ctx.translate(Math.round(x + (w/2)), Math.round(y+(h/2)))
      this.draw(ctx, real)
      real = false

      ctx.restore()
    }
    this.emit(AudioEventType.InstrumentChange, this)

  }

  draw(ctx: CanvasRenderingContext2D, real: boolean) {
    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'
    const backColor = this.isPressed ? CanvasColor.Green : CanvasColor.Beige
    
    ctx.fillStyle = real ?  backColor : this.colorKey[1]
    


    let { x, y, w, h, r } = this.metrics
    roundedRect(ctx, { 
      x: x, 
      y: y, 
      w: w, 
      h: h, 
      r: r })
      ctx.fill()
    
    ctx.fillStyle = real ? CanvasColor.Black : this.colorKey[1]
    ctx.fillText(this.label, x+(w/2), y+(h/1.5))
  }
}