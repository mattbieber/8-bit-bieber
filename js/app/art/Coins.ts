import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Movable } from '../../dom/traits'
import { range } from '../../util'
import { ColoredRects, EBBGeo, EBBDrawingData } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

const cloudUrls = [
  'https://s3.amazonaws.com/8-bitbieber.com/coin_0.svg',
  'https://s3.amazonaws.com/8-bitbieber.com/coin_1.svg',
  'https://s3.amazonaws.com/8-bitbieber.com/coin_2.svg',
  'https://s3.amazonaws.com/8-bitbieber.com/coin_3.svg',
  'https://s3.amazonaws.com/8-bitbieber.com/coin_4.svg',
  'https://s3.amazonaws.com/8-bitbieber.com/coin_5.svg'
]

export class Coins extends SceneNode {
  
  images: HTMLImageElement[]
  ready: boolean = false
  currentCoin: number = 0

  constructor(ctx: CanvasRenderingContext2D, dd: EBBDrawingData) {
    
    super(ctx, dd)
    this.images = []

    const load = (src: string) => {
      let image: HTMLImageElement = new Image()

      return new Promise(resolve => {
        image.src = src
        image.onload = () => {
          this.images.push(image)
          resolve()
        }
      })
      
    }

    for (const i of range(0,5)) {
      
      (async () => {

        //@ts-ignore
        await load(cloudUrls[i])
        
        this.ready = i === 5

      })()
    }
  }

  
  draw() : void {
    if(!this.ready) return
    
    const { ctx, rd } = this
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    ctx.fillStyle = StartScreenBackgroundColor
    ctx.fillRect(-4, 0, rd.dimensions.w+4, rd.dimensions.h)

    let adj = 0
    switch(this.currentCoin) {
      case 0:
        adj = - 4
        break
      case 2:
        adj = 6
        break
      case 3:
        adj = 14
        break;
      case 4:
        adj = 8
        break;
    }

    

    ctx.drawImage(this.images[this.currentCoin], adj, 0)
    // this.ctx.strokeRect(0, 0, this.rd.dimensions.w, this.rd.dimensions.h)
    ctx.restore()

  }
  

  update(step: number) : void {
    // console.log(this.ready)
    this.currentCoin = this.currentCoin === 5 ? 0 : this.currentCoin + 1
    this.draw()
    
  }
}