


import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Letters, EBBDrawingData } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

const imageUrl = 'https://s3.amazonaws.com/8-bitbieber.com/'


export class RustGuy extends SceneNode {

  image: HTMLImageElement
  kind: string = ''
  
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
      let u = `${ imageUrl }${ this.kind }.svg` 
      console.log(u)
      //@ts-ignore
      await load(u)
      this.update(0)
      
    })()
  }
  
  update(step: number) {

    const { ctx, rd } = this
    
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    this.ctx.drawImage(this.image, 0, 0);
    this.ctx.restore()
  }



}
