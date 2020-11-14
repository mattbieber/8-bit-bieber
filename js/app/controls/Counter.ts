import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Letters, EBBDrawingData } from '../../dom/structs'

export class Counter extends SceneNode {

  cache: Path2D[]
  zero: any = new Path2D()
  whole: boolean = true

  
  constructor(ctx: CanvasRenderingContext2D, d: EBBDrawingData) {
    super(ctx, d)
    this.cache = []

  }

  draw() { 
    const { ctx, cache, zero } = this

    ctx.save()
    ctx.translate(this.rd.pos.x, this.rd.pos.y)
    ctx.scale(this.rd.scale.x, this.rd.scale.y)
    ctx.strokeStyle = CanvasColor.Red
    ctx.lineWidth = 1
    // ctx.strokeRect(0,0,this.rd.dimensions.w, this.rd.dimensions.h)

    ctx.save()
    
    const cd1 = new Path2D()
    ctx.beginPath()
    cd1.moveTo(6.33, 6)
    cd1.lineTo(7, 5.33)
    cd1.lineTo(7, 0.67)
    cd1.lineTo(6.33, 0)
    cd1.lineTo(5, 1.33)
    cd1.lineTo(5, 4.67)
    cd1.lineTo(6.33, 6)
    cd1.closePath()
    cd1.moveTo(6.33, 12)
    cd1.lineTo(7, 11.33)
    cd1.lineTo(7, 6.67)
    cd1.lineTo(6.33, 6)
    cd1.lineTo(5, 7.33)
    cd1.lineTo(5, 10.67)
    cd1.lineTo(6.33, 12)
    cd1.closePath()
      
    ctx.restore()
    ctx.save()

    const cd2 = new Path2D()

    ctx.beginPath()
    cd2.moveTo(6.87, 1.68)
    cd2.lineTo(8.02, 0.56)
    cd2.lineTo(7.44, 0)
    cd2.lineTo(3.43, 0)
    cd2.lineTo(2.86, 0.56)
    cd2.lineTo(4.01, 1.68)
    cd2.lineTo(6.87, 1.68)
    cd2.closePath()
    cd2.moveTo(8.3, 5.89)
    cd2.lineTo(8.88, 5.33)
    cd2.lineTo(8.88, 1.4)
    cd2.lineTo(8.3, 0.84)
    cd2.lineTo(7.16, 1.96)
    cd2.lineTo(7.16, 4.77)
    cd2.lineTo(8.3, 5.89)
    cd2.closePath()
    cd2.moveTo(6.87, 6.73)
    cd2.lineTo(7.73, 5.89)
    cd2.lineTo(6.87, 5.05)
    cd2.lineTo(4.01, 5.05)
    cd2.lineTo(3.15, 5.89)
    cd2.lineTo(4.01, 6.73)
    cd2.lineTo(6.87, 6.73)
    cd2.closePath()
    cd2.moveTo(2.57, 10.94)
    cd2.lineTo(3.72, 9.82)
    cd2.lineTo(3.72, 7.01)
    cd2.lineTo(2.57, 5.89)
    cd2.lineTo(2, 6.45)
    cd2.lineTo(2, 10.38)
    cd2.lineTo(2.57, 10.94)
    cd2.closePath()
    cd2.moveTo(7.44, 11.78)
    cd2.lineTo(8.02, 11.22)
    cd2.lineTo(6.87, 10.1)
    cd2.lineTo(4.01, 10.1)
    cd2.lineTo(2.86, 11.22)
    cd2.lineTo(3.43, 11.78)
    cd2.lineTo(7.44, 11.78)
    cd2.closePath()
    ctx.clip()



    //// Rectangle Drawing
    ctx.beginPath()
    ctx.rect(-1.99, -4.02, 14.9, 19.8)
    ctx.fillStyle = CanvasColor.Red
    ctx.fill()



    ctx.restore()

    ctx.save()

    const cd3 = new Path2D()

    ctx.beginPath()
    cd3.moveTo(6.93, 1.68)
    cd3.lineTo(8.05, 0.56)
    cd3.lineTo(7.49, 0)
    cd3.lineTo(3.56, 0)
    cd3.lineTo(3, 0.56)
    cd3.lineTo(4.12, 1.68)
    cd3.lineTo(6.93, 1.68)
    cd3.closePath()
    cd3.moveTo(8.33, 5.89)
    cd3.lineTo(8.89, 5.33)
    cd3.lineTo(8.89, 1.4)
    cd3.lineTo(8.33, 0.84)
    cd3.lineTo(7.21, 1.96)
    cd3.lineTo(7.21, 4.77)
    cd3.lineTo(8.33, 5.89)
    cd3.closePath()
    cd3.moveTo(6.93, 6.73)
    cd3.lineTo(7.77, 5.89)
    cd3.lineTo(6.93, 5.05)
    cd3.lineTo(4.12, 5.05)
    cd3.lineTo(3.28, 5.89)
    cd3.lineTo(4.12, 6.73)
    cd3.lineTo(6.93, 6.73)
    cd3.closePath()
    cd3.moveTo(8.33, 10.94)
    cd3.lineTo(8.89, 10.38)
    cd3.lineTo(8.89, 6.45)
    cd3.lineTo(8.33, 5.89)
    cd3.lineTo(7.21, 7.01)
    cd3.lineTo(7.21, 9.82)
    cd3.lineTo(8.33, 10.94)
    cd3.closePath()
    cd3.moveTo(7.49, 11.78)
    cd3.lineTo(8.05, 11.22)
    cd3.lineTo(6.93, 10.1)
    cd3.lineTo(4.12, 10.1)
    cd3.lineTo(3, 11.22)
    cd3.lineTo(3.56, 11.78)
    cd3.lineTo(7.49, 11.78)
    cd3.closePath()
    ctx.clip()



    //// Rectangle Drawing
    ctx.beginPath()
    ctx.rect(-1.03, -4.02, 13.9, 19.8)
    ctx.fillStyle = CanvasColor.Red
    ctx.fill()

    ctx.restore()
    ctx.save()

    const cd4 = new Path2D()
    ctx.beginPath()
    
    cd4.moveTo(2.57, 5.61)
    cd4.lineTo(3.72, 4.41)
    cd4.lineTo(3.72, 1.4)
    cd4.lineTo(2.57, 0.2)
    cd4.lineTo(2, 0.8)
    cd4.lineTo(2, 5.01)
    cd4.lineTo(2.57, 5.61)
    cd4.closePath()
    cd4.moveTo(8.3, 5.61)
    cd4.lineTo(8.88, 5.01)
    cd4.lineTo(8.88, 0.8)
    cd4.lineTo(8.3, 0.2)
    cd4.lineTo(7.16, 1.4)
    cd4.lineTo(7.16, 4.41)
    cd4.lineTo(8.3, 5.61)
    cd4.closePath()
    cd4.moveTo(6.87, 6.51)
    cd4.lineTo(7.73, 5.61)
    cd4.lineTo(6.87, 4.71)
    cd4.lineTo(4.01, 4.71)
    cd4.lineTo(3.15, 5.61)
    cd4.lineTo(4.01, 6.51)
    cd4.lineTo(6.87, 6.51)
    cd4.closePath()
    cd4.moveTo(8.3, 11.02)
    cd4.lineTo(8.88, 10.41)
    cd4.lineTo(8.88, 6.21)
    cd4.lineTo(8.3, 5.61)
    cd4.lineTo(7.16, 6.81)
    cd4.lineTo(7.16, 9.81)
    cd4.lineTo(8.3, 11.02)
    cd4.closePath()
    ctx.clip()



    
    //// Rectangle Drawing
    ctx.beginPath()
    ctx.rect(-2.99, -4.8, 17.9, 21.8)
    ctx.fillStyle = CanvasColor.Red
    ctx.fill()

    ctx.restore()
    ctx.save()

    //// Clip Clip

    ctx.beginPath()
    zero.moveTo(6.87, 1.9)
    zero.lineTo(8.02, 0.78)
    zero.lineTo(7.44, 0.22)
    zero.lineTo(3.43, 0.22)
    zero.lineTo(2.86, 0.78)
    zero.lineTo(4.01, 1.9)
    zero.lineTo(6.87, 1.9)
    zero.closePath()
    zero.moveTo(2.57, 6.11)
    zero.lineTo(3.72, 4.99)
    zero.lineTo(3.72, 2.18)
    zero.lineTo(2.57, 1.06)
    zero.lineTo(2, 1.62)
    zero.lineTo(2, 5.55)
    zero.lineTo(2.57, 6.11)
    zero.closePath()
    zero.moveTo(8.3, 6.11)
    zero.lineTo(8.88, 5.55)
    zero.lineTo(8.88, 1.62)
    zero.lineTo(8.3, 1.06)
    zero.lineTo(7.16, 2.18)
    zero.lineTo(7.16, 4.99)
    zero.lineTo(8.3, 6.11)
    zero.closePath()
    zero.moveTo(2.57, 11.16)
    zero.lineTo(3.72, 10.04)
    zero.lineTo(3.72, 7.23)
    zero.lineTo(2.57, 6.11)
    zero.lineTo(2, 6.67)
    zero.lineTo(2, 10.6)
    zero.lineTo(2.57, 11.16)
    zero.closePath()
    zero.moveTo(8.3, 11.16)
    zero.lineTo(8.88, 10.6)
    zero.lineTo(8.88, 6.67)
    zero.lineTo(8.3, 6.11)
    zero.lineTo(7.16, 7.23)
    zero.lineTo(7.16, 10.04)
    zero.lineTo(8.3, 11.16)
    zero.closePath()
    zero.moveTo(7.44, 12)
    zero.lineTo(8.02, 11.44)
    zero.lineTo(6.87, 10.32)
    zero.lineTo(4.01, 10.32)
    zero.lineTo(2.86, 11.44)
    zero.lineTo(3.43, 12)
    zero.lineTo(7.44, 12)
    zero.closePath()
    ctx.clip(zero)



    //// Rectangle Drawing
    ctx.beginPath()
    ctx.rect(-1.99, -3.8, 14.9, 19.8)
    ctx.fillStyle = CanvasColor.Red
    ctx.fill()

    ctx.restore()

    cache.push(zero, cd1, cd2, cd3, cd4)
  }



  update(step: number) {
    
    const { ctx, cache } = this
    ctx.save()
    ctx.translate(this.rd.pos.x, this.rd.pos.y)
    ctx.scale(this.rd.scale.x, this.rd.scale.y)

    
    ctx.fillStyle = CanvasColor.EOEBrown
    ctx.fillRect(0,0,this.rd.dimensions.w, this.rd.dimensions.h)
    
    ctx.fillStyle = CanvasColor.Red

   
    if(step === 1) {
      ctx.fill(cache[1])
    } else {
    
    ctx.beginPath()
    ctx.clip(cache[step])
    ctx.fillStyle = CanvasColor.Red;
    ctx.rect(-1.99, -4.02, 14.9, 19.8)
    
    ctx.fill()

    }


      ctx.restore()

  }
}

