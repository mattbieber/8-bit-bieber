import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Movable } from '../../dom/traits'
import { EBBDrawingData } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

const groundUrl = 'https://s3.amazonaws.com/8-bitbieber.com/ground.svg'


export class Ground extends SceneNode  {
  
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
      await load(groundUrl)
     
      const { ctx, rd } = this
      ctx.save()
      ctx.translate(rd.pos.x, rd.pos.y)
      ctx.scale(rd.scale.x, rd.scale.y)
      const pattern: CanvasPattern = ctx.createPattern(this.image, 'repeat-x') as CanvasPattern
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, rd.dimensions.w, rd.dimensions.h)
      this.ctx.restore()
      
    })()
  }

}