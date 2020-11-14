import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Letters } from '../../dom/structs'

export class About extends SceneNode {

  draw() {

    const { ctx, rd } = this

    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    // ctx.strokeRect(0, 0, rd.dimensions.w, rd.dimensions.h)
    this.letters['all']()
    this.ctx.restore()
  }

  update(step: number) {

    this.draw()
  }

  letters: Letters = {
    'all': () => {
      const a = [ [ 'm', [ 3.61, 12 ] ], [ 'l', [ 11.61, 12 ] ], [ 'l', [ 11.61, 16 ] ], [ 'l', [ 7.61, 16 ] ], [ 'l', [ 7.61, 20 ] ], [ 'l', [ 3.61, 20 ] ], [ 'l', [ 3.61, 12 ] ] ] 
      const b = [ [ 'm', [ 3.61, 12 ] ], [ 'l', [ -0.39, 12 ] ], [ 'l', [ -0.39, 52 ] ], [ 'l', [ 3.61, 52 ] ], [ 'l', [ 3.61, 56 ] ], [ 'l', [ 19.61, 56 ] ], [ 'l', [ 19.61, 52 ] ], [ 'l', [ 23.61, 52 ] ], [ 'l', [ 23.61, 48 ] ], [ 'l', [ 27.61, 48 ] ], [ 'l', [ 27.61, 44 ] ], [ 'l', [ 31.61, 44 ] ], [ 'l', [ 31.61, 48 ] ], [ 'l', [ 35.61, 48 ] ], [ 'l', [ 35.61, 52 ] ], [ 'l', [ 39.61, 52 ] ], [ 'l', [ 39.61, 56 ] ], [ 'l', [ 47.61, 56 ] ], [ 'l', [ 47.61, 52 ] ], [ 'l', [ 51.61, 52 ] ], [ 'l', [ 51.61, 12 ] ], [ 'l', [ 47.61, 12 ] ], [ 'l', [ 47.61, 8 ] ], [ 'l', [ 39.61, 8 ] ], [ 'l', [ 39.61, 12 ] ], [ 'l', [ 35.61, 12 ] ], [ 'l', [ 35.61, 32 ] ], [ 'l', [ 31.61, 32 ] ], [ 'l', [ 31.61, 28 ] ], [ 'l', [ 27.61, 28 ] ], [ 'l', [ 27.61, 32 ] ], [ 'l', [ 23.61, 32 ] ], [ 'l', [ 23.61, 12 ] ], [ 'l', [ 19.61, 12 ] ], [ 'l', [ 19.61, 8 ] ], [ 'l', [ 3.61, 8 ] ], [ 'l', [ 3.61, 12 ] ] ]
      const c = [ [ 'm', [ 72.8, 12 ] ], [ 'l', [ 80.8, 12 ] ], [ 'l', [ 80.8, 16 ] ], [ 'l', [ 76.8, 16 ] ], [ 'l', [ 76.8, 20 ] ], [ 'l', [ 72.8, 20 ] ], [ 'l', [ 72.8, 12 ] ] ]
      const d = [ [ 'm', [ 72.8, 12 ] ], [ 'l', [ 68.8, 12 ] ], [ 'l', [ 68.8, 20 ] ], [ 'l', [ 72.8, 20 ] ], [ 'l', [ 72.8, 24 ] ], [ 'l', [ 80.8, 24 ] ], [ 'l', [ 80.8, 52 ] ], [ 'l', [ 84.8, 52 ] ], [ 'l', [ 84.8, 56 ] ], [ 'l', [ 100.8, 56 ] ], [ 'l', [ 100.8, 52 ] ], [ 'l', [ 104.8, 52 ] ], [ 'l', [ 104.8, 24 ] ], [ 'l', [ 112.8, 24 ] ], [ 'l', [ 112.8, 20 ] ], [ 'l', [ 116.8, 20 ] ], [ 'l', [ 116.8, 12 ] ], [ 'l', [ 112.8, 12 ] ], [ 'l', [ 112.8, 8 ] ], [ 'l', [ 72.8, 8 ] ], [ 'l', [ 72.8, 12 ] ] ]
      const e = [ [ 'm', [ 138, 12 ] ], [ 'l', [ 146, 12 ] ], [ 'l', [ 146, 16 ] ], [ 'l', [ 142, 16 ] ], [ 'l', [ 142, 20 ] ], [ 'l', [ 138, 20 ] ], [ 'l', [ 138, 12 ] ] ]
      const f = [ [ 'm', [ 138, 12 ] ], [ 'l', [ 134, 12 ] ], [ 'l', [ 134, 52 ] ], [ 'l', [ 138, 52 ] ], [ 'l', [ 138, 56 ] ], [ 'l', [ 154, 56 ] ], [ 'l', [ 154, 52 ] ], [ 'l', [ 158, 52 ] ], [ 'l', [ 158, 36 ] ], [ 'l', [ 178, 36 ] ], [ 'l', [ 178, 32 ] ], [ 'l', [ 182, 32 ] ], [ 'l', [ 182, 28 ] ], [ 'l', [ 178, 28 ] ], [ 'l', [ 178, 24 ] ], [ 'l', [ 158, 24 ] ], [ 'l', [ 158, 20 ] ], [ 'l', [ 178, 20 ] ], [ 'l', [ 178, 16 ] ], [ 'l', [ 182, 16 ] ], [ 'l', [ 182, 12 ] ], [ 'l', [ 178, 12 ] ], [ 'l', [ 178, 8 ] ], [ 'l', [ 138, 8 ] ], [ 'l', [ 138, 12 ] ] ]
      const g = [ [ 'm', [ 203.2, 4 ] ], [ 'l', [ 211.2, 4 ] ], [ 'l', [ 211.2, 8 ] ], [ 'l', [ 207.2, 8 ] ], [ 'l', [ 207.2, 12 ] ], [ 'l', [ 203.2, 12 ] ], [ 'l', [ 203.2, 4 ] ] ]
      const h = [ [ 'm', [ 231.2, 56 ] ], [ 'l', [ 231.2, 52 ] ], [ 'l', [ 235.2, 52 ] ], [ 'l', [ 235.2, 40 ] ], [ 'l', [ 231.2, 40 ] ], [ 'l', [ 231.2, 36 ] ], [ 'l', [ 219.2, 36 ] ], [ 'l', [ 219.2, 40 ] ], [ 'l', [ 215.2, 40 ] ], [ 'l', [ 215.2, 52 ] ], [ 'l', [ 219.2, 52 ] ], [ 'l', [ 219.2, 56 ] ], [ 'l', [ 231.2, 56 ] ] ]
      const i = [ [ 'm', [ 203.2, 4 ] ], [ 'l', [ 199.2, 4 ] ], [ 'l', [ 199.2, 12 ] ], [ 'l', [ 203.2, 12 ] ], [ 'l', [ 203.2, 16 ] ], [ 'l', [ 235.2, 16 ] ], [ 'l', [ 235.2, 20 ] ], [ 'l', [ 219.2, 20 ] ], [ 'l', [ 219.2, 24 ] ], [ 'l', [ 215.2, 24 ] ], [ 'l', [ 215.2, 28 ] ], [ 'l', [ 219.2, 28 ] ], [ 'l', [ 219.2, 32 ] ], [ 'l', [ 247.2, 32 ] ], [ 'l', [ 247.2, 28 ] ], [ 'l', [ 251.2, 28 ] ], [ 'l', [ 251.2, 24 ] ], [ 'l', [ 255.2, 24 ] ], [ 'l', [ 255.2, 8 ] ], [ 'l', [ 251.2, 8 ] ], [ 'l', [ 251.2, 4 ] ], [ 'l', [ 247.2, 4 ] ], [ 'l', [ 247.2, 0 ] ], [ 'l', [ 203.2, 0 ] ], [ 'l', [ 203.2, 4 ] ] ]

      const { ctx, rd } = this
      ctx.save()
      ctx.translate(-190, 0)
      ctx.beginPath() 
      
      // this.g(a)
      ctx.closePath()

      // this.g(b)
      ctx.closePath() 
      
      // this.g(c)
      ctx.closePath()
      
      // this.g(d)
      ctx.closePath()
      
      // this.g(e)
      ctx.closePath()
      
      // this.g(f)
      ctx.closePath()
      
      this.g(g)
      ctx.closePath()
      
      this.g(h)
      ctx.closePath()
      
      this.g(i)
      
      ctx.closePath()
      ctx.fillStyle = CanvasColor.Grey
      ctx.fill()
      ctx.restore()
    }
  }
}