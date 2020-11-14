import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Movable } from '../../dom/traits'
import { ColoredRects, EBBGeo, EBBDrawingData, EBBDirection } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

const cloudUrls = {
  a: 'https://s3.amazonaws.com/8-bitbieber.com/cloud_a.svg',
  b: 'https://s3.amazonaws.com/8-bitbieber.com/cloud_b.svg'
}

export class Clouds extends SceneNode implements Movable {
  
  image: HTMLImageElement

  
  constructor(ctx: CanvasRenderingContext2D, dd: EBBDrawingData) {
    
      super(ctx, dd)
      this.image = new Image()

  }

  
  draw() : void {
    const load = (src: string) => {
      
      return new Promise(resolve => {
        this.image.src = src
        this.image.onload = () => {
          resolve()
        }
      })
      
    }

    (async () => {
     
      //@ts-ignore
      await load(cloudUrls[this.ad.default.name])
     
      this.ctx.save()
      this.ctx.translate(this.rd.pos.x, this.rd.pos.y)
      this.ctx.scale(this.rd.scale.x, this.rd.scale.y)
      this.ctx.drawImage(this.image, 0, 0);
      // this.ctx.strokeRect(0, 0, this.rd.dimensions.w, this.rd.dimensions.h)
      this.ctx.restore()
      const { x, y } = this.rd.pos
      this.ad.default.lastPosition = { x, y }
  
    })()
  }

  update(step: number): void {


    const { ctx, ad, rd } = this
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    ctx.drawImage(this.image, 0, 0);
    ctx.restore()

    
  }
}