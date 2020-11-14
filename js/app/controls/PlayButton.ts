

import { AudioEventType, Callback, EventEmitter, SubscriberRegistry} from '../../audio/events'
import { CanvasColor, ColorKey } from '../../dom/color'
import { EBBCircleMetrics } from '../../dom/structs'
import { Pressable } from '../../dom/traits'
import { ContextCollection } from '../../dom/CanvasEx'
import { Geo, range } from '../../util'

type trianglePart = {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    midX: number,
    midY: number,
    cpX: number,
    cpY: number,
}

export class PlayButton extends EventEmitter implements Pressable {
  
  // subscribers: SubscriberRegistry = {}
  
  private pct = 0
  private dir = 8.50
  private sweep = Geo.PI2 / 3
  private triangleParts: trianglePart[] = []
  private boundingRect = {}

  colorKey: ColorKey = [-1, '']
  isPressed: boolean = false
  isDisabled: boolean = false
  contexts: ContextCollection = []

  
  constructor(private metrics: EBBCircleMetrics, ctxs: ContextCollection) {
    super()

    

    this.boundingRect = {
      x: this.metrics.x,
      y: this.metrics.y,
      w: this.metrics.w,
      h: this.metrics.h,
      r: 2
    }
    


    this.contexts = ctxs
    for (const i of range(0,2)) {
      this.triangleParts.push(this.generateSide(i))
    }

    // this.animate()
  }
    
  onMouseMove(e: MouseEvent) { return }
  
  onMouseClick(e: MouseEvent) {
    this.animate()

 
    this.emit(AudioEventType.Toggle, ['asd'])
  }

  update() {
    // this.contexts[0].strokeStyle = 'red'
    
    // const { x, y, w, h } = this.boundingRect
    // this.contexts[0].strokeRect(x,y,w,h)

    // console.log(this.boundingRect)
  }


  animate = () => {
    this.pct += this.dir
    if(this.pct < 0) {
      this.pct = 0
    }

    if(this.pct > 100) {
      this.pct = 100
    }

    this.render(this.pct)
 
    if(this.pct > 0 && this.pct < 100) {
      requestAnimationFrame(this.animate)
    } else {
      this.dir = this.dir*(-1)
      return
    }
  }

  render(p: number) {
    let real = true
      
    for (let ctx of this.contexts) {
      ctx.lineWidth = 1
      ctx.fillStyle = real ? CanvasColor.EOEOrange : this.colorKey[1]
      
      // @ts-ignore
      const { x, y, w, h, r} = this.boundingRect
  
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
      ctx.closePath()
      ctx.fill()

      ctx.lineWidth = 4
      ctx.stroke()
      
      ctx.fillStyle = real ? CanvasColor.Black : this.colorKey[1]
      ctx.save()

      ctx.translate(w - (this.metrics.r+10), (h/2))
      
      if (p == 100) {
          
          ctx.beginPath()
          ctx.arc(this.metrics.x, this.metrics.y, this.metrics.r, 0, Geo.PI2)
          ctx.closePath()
          ctx.fill()
      } else {
          ctx.beginPath();
          ctx.moveTo(this.triangleParts[0].x1, this.triangleParts[0].y1)
          for (const i of range(0,2)) {
              let part = this.triangleParts[i]
              let cpx = Geo.lerp(part.midX, part.cpX, p / 100)
              var cpy = Geo.lerp(part.midY, part.cpY, p / 100)
              ctx.quadraticCurveTo(cpx, cpy, part.x2, part.y2)
          }
          ctx.fill();
      }
      ctx.restore()

      real = !real

    }
  }

  private generateSide(n: number) : trianglePart {

    const s = this.sweep * (n-1)
    const e = this.sweep * n

    const { x, y, r } = this.metrics

    const { x: x1, y: y1 } = Geo.coords({ x, y } , r, s)
    const { x: xm, y: ym } = Geo.coords({ x, y } , r, (e+s)/2)
    const { x: x2, y: y2 } = Geo.coords({ x, y } , r, e)

    return {
        x1,
        y1,
        x2,
        y2,
        midX: Geo.lerp(x1, x2, 0.50),
        midY: Geo.lerp(y1, y2, 0.50),
        cpX: 2 * xm - x1 / 2 - x2 / 2,
        cpY: 2 * ym - y1 / 2 - y2 / 2,
    }
  }

}


