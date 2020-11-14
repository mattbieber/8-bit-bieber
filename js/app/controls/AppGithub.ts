


import { SceneNode } from '../../dom/scene'
import { CanvasColor, ColorKey } from '../../dom/color'
import { EBBDrawingData } from '../../dom/structs'
import { Pressable } from '../../dom/traits'

const imageUrl = 'https://s3.amazonaws.com/8-bitbieber.com/github.svg'


export class AppGithub extends SceneNode implements Pressable {

  image: HTMLImageElement

  
  constructor(ctx: CanvasRenderingContext2D, dd: EBBDrawingData) {
    
      super(ctx, dd)
      this.image = new Image()

  }
  isPressed: boolean
  isDisabled: boolean
  colorKey: ColorKey
  isHit = false
  url = ''

  onMouseClick(e: MouseEvent) {
    if(this.url) window.open(this.url, '_blank')
  }
  
  onMouseMove(e: MouseEvent) {
    if(this.url) window.open(this.url, '_blank')
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
      await load(imageUrl)
      this.update()
      
    })()
  }
  
  update() {

    const { ctx, rd } = this
    
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    ctx.lineWidth = 1
    // ctx.strokeRect(0, 0, rd.dimensions.w, rd.dimensions.h)
    
    if(this.isHit) {
      ctx.fillStyle = this.colorKey[1]
      ctx.fillRect(0,0, rd.dimensions.w, rd.dimensions.h)
    } else {
      this.ctx.drawImage(this.image, 0, 0);
    
    }
    this.ctx.restore()
  }



}
