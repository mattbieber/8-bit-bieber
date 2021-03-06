import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { Letters } from '../../dom/structs'

export class PressStart extends SceneNode {

  isHighlight = false
  color1 = CanvasColor.EOEWhite
  color2 = CanvasColor.Blue3

  draw() {
     
    this.ctx.save()
    this.ctx.translate(this.rd.pos.x, this.rd.pos.y)
    this.ctx.scale(this.rd.scale.x, this.rd.scale.y)
    
    // this.ctx.translate(this.rd.offsets.x, 0)
    this.letters['all']()
    this.ctx.restore()
  }

  letters: Letters = {
    'all': () => {
      const data = [ 
        [ [ 'm', [ 27.2, 120 ] ], [ 'l', [ 27.2, 92.8 ] ], [ 'l', [ 61.2, 92.8 ] ], [ 'l', [ 61.2, 86 ] ], [ 'l', [ 68, 86 ] ], [ 'l', [ 68, 58.8 ] ], [ 'l', [ 61.2, 58.8 ] ], [ 'l', [ 61.2, 52 ] ], [ 'l', [ 0, 52 ] ], [ 'l', [ 0, 120 ] ], [ 'l', [ 27.2, 120 ] ] ],
        [ [ 'm', [ 41, 79 ] ], [ 'l', [ 27, 79 ] ], [ 'l', [ 27, 65 ] ], [ 'l', [ 41, 65 ] ], [ 'l', [ 41, 79 ] ] ],
        [ [ 'm', [ 109.2, 120 ] ], [ 'l', [ 109.2, 92.8 ] ], [ 'l', [ 122.8, 92.8 ] ], [ 'l', [ 122.8, 120 ] ], [ 'l', [ 150, 120 ] ], [ 'l', [ 150, 92.8 ] ], [ 'l', [ 143.2, 92.8 ] ], [ 'l', [ 143.2, 79.2 ] ], [ 'l', [ 150, 79.2 ] ], [ 'l', [ 150, 58.8 ] ], [ 'l', [ 143.2, 58.8 ] ], [ 'l', [ 143.2, 52 ] ], [ 'l', [ 82, 52 ] ], [ 'l', [ 82, 120 ] ], [ 'l', [ 109.2, 120 ] ] ],
        [ [ 'm', [ 123, 79 ] ], [ 'l', [ 109, 79 ] ], [ 'l', [ 109, 65 ] ], [ 'l', [ 123, 65 ] ], [ 'l', [ 123, 79 ] ] ],
        [ [ 'm', [ 231, 120 ] ], [ 'l', [ 231, 106.4 ] ], [ 'l', [ 190.2, 106.4 ] ], [ 'l', [ 190.2, 92.8 ] ], [ 'l', [ 210.6, 92.8 ] ], [ 'l', [ 210.6, 79.2 ] ], [ 'l', [ 190.2, 79.2 ] ], [ 'l', [ 190.2, 65.6 ] ], [ 'l', [ 231, 65.6 ] ], [ 'l', [ 231, 52 ] ], [ 'l', [ 169.8, 52 ] ], [ 'l', [ 169.8, 58.8 ] ], [ 'l', [ 163, 58.8 ] ], [ 'l', [ 163, 113.2 ] ], [ 'l', [ 169.8, 113.2 ] ], [ 'l', [ 169.8, 120 ] ], [ 'l', [ 231, 120 ] ] ] ,
        [ [ 'm', [ 306.2, 120 ] ], [ 'l', [ 306.2, 113.2 ] ], [ 'l', [ 313, 113.2 ] ], [ 'l', [ 313, 86 ] ], [ 'l', [ 306.2, 86 ] ], [ 'l', [ 306.2, 79.2 ] ], [ 'l', [ 272.2, 79.2 ] ], [ 'l', [ 272.2, 65.6 ] ], [ 'l', [ 313, 65.6 ] ], [ 'l', [ 313, 52 ] ], [ 'l', [ 251.8, 52 ] ], [ 'l', [ 251.8, 58.8 ] ], [ 'l', [ 245, 58.8 ] ], [ 'l', [ 245, 86 ] ], [ 'l', [ 251.8, 86 ] ], [ 'l', [ 251.8, 92.8 ] ], [ 'l', [ 285.8, 92.8 ] ], [ 'l', [ 285.8, 106.4 ] ], [ 'l', [ 245, 106.4 ] ], [ 'l', [ 245, 120 ] ], [ 'l', [ 306.2, 120 ] ] ], 
        [ [ 'm', [ 388.2, 120 ] ], [ 'l', [ 388.2, 113.2 ] ], [ 'l', [ 395, 113.2 ] ], [ 'l', [ 395, 86 ] ], [ 'l', [ 388.2, 86 ] ], [ 'l', [ 388.2, 79.2 ] ], [ 'l', [ 354.2, 79.2 ] ], [ 'l', [ 354.2, 65.6 ] ], [ 'l', [ 395, 65.6 ] ], [ 'l', [ 395, 52 ] ], [ 'l', [ 333.8, 52 ] ], [ 'l', [ 333.8, 58.8 ] ], [ 'l', [ 327, 58.8 ] ], [ 'l', [ 327, 86 ] ], [ 'l', [ 333.8, 86 ] ], [ 'l', [ 333.8, 92.8 ] ], [ 'l', [ 367.8, 92.8 ] ], [ 'l', [ 367.8, 106.4 ] ], [ 'l', [ 327, 106.4 ] ], [ 'l', [ 327, 120 ] ], [ 'l', [ 388.2, 120 ] ] ],
        [ [ 'm', [ 510.2, 120 ] ], [ 'l', [ 510.2, 113.2 ] ], [ 'l', [ 517, 113.2 ] ], [ 'l', [ 517, 86 ] ], [ 'l', [ 510.2, 86 ] ], [ 'l', [ 510.2, 79.2 ] ], [ 'l', [ 476.2, 79.2 ] ], [ 'l', [ 476.2, 65.6 ] ], [ 'l', [ 517, 65.6 ] ], [ 'l', [ 517, 52 ] ], [ 'l', [ 455.8, 52 ] ], [ 'l', [ 455.8, 58.8 ] ], [ 'l', [ 449, 58.8 ] ], [ 'l', [ 449, 86 ] ], [ 'l', [ 455.8, 86 ] ], [ 'l', [ 455.8, 92.8 ] ], [ 'l', [ 489.8, 92.8 ] ], [ 'l', [ 489.8, 106.4 ] ], [ 'l', [ 449, 106.4 ] ], [ 'l', [ 449, 120 ] ], [ 'l', [ 510.2, 120 ] ] ],
        [ [ 'm', [ 578.6, 120 ] ], [ 'l', [ 578.6, 65.6 ] ], [ 'l', [ 599, 65.6 ] ], [ 'l', [ 599, 52 ] ], [ 'l', [ 531, 52 ] ], [ 'l', [ 531, 65.6 ] ], [ 'l', [ 551.4, 65.6 ] ], [ 'l', [ 551.4, 120 ] ], [ 'l', [ 578.6, 120 ] ] ],
        [ [ 'm', [ 640.2, 120 ] ], [ 'l', [ 640.2, 92.8 ] ], [ 'l', [ 653.8, 92.8 ] ], [ 'l', [ 653.8, 120 ] ], [ 'l', [ 681, 120 ] ], [ 'l', [ 681, 58.8 ] ], [ 'l', [ 674.2, 58.8 ] ], [ 'l', [ 674.2, 52 ] ], [ 'l', [ 619.8, 52 ] ], [ 'l', [ 619.8, 58.8 ] ], [ 'l', [ 613, 58.8 ] ], [ 'l', [ 613, 120 ] ], [ 'l', [ 640.2, 120 ] ] ],
        [ [ 'm', [ 654, 79 ] ], [ 'l', [ 640, 79 ] ], [ 'l', [ 640, 65 ] ], [ 'l', [ 654, 65 ] ], [ 'l', [ 654, 79 ] ] ],
        [ [ 'm', [ 721.2, 120 ] ], [ 'l', [ 721.2, 92.8 ] ], [ 'l', [ 734.8, 92.8 ] ], [ 'l', [ 734.8, 120 ] ], [ 'l', [ 762, 120 ] ], [ 'l', [ 762, 92.8 ] ], [ 'l', [ 755.2, 92.8 ] ], [ 'l', [ 755.2, 79.2 ] ], [ 'l', [ 762, 79.2 ] ], [ 'l', [ 762, 58.8 ] ], [ 'l', [ 755.2, 58.8 ] ], [ 'l', [ 755.2, 52 ] ], [ 'l', [ 694, 52 ] ], [ 'l', [ 694, 120 ] ], [ 'l', [ 721.2, 120 ] ] ],
        [ [ 'm', [ 735, 79 ] ], [ 'l', [ 721, 79 ] ], [ 'l', [ 721, 65 ] ], [ 'l', [ 735, 65 ] ], [ 'l', [ 735, 79 ] ] ],
        [ [ 'm', [ 823.6, 120 ] ], [ 'l', [ 823.6, 65.6 ] ], [ 'l', [ 844, 65.6 ] ], [ 'l', [ 844, 52 ] ], [ 'l', [ 776, 52 ] ], [ 'l', [ 776, 65.6 ] ], [ 'l', [ 796.4, 65.6 ] ], [ 'l', [ 796.4, 120 ] ], [ 'l', [ 823.6, 120 ] ] ]
      ]

      this.ctx.save()
      this.ctx.beginPath()
        for (const d of data) {
          this.g(d)
          this.ctx.closePath()
        }
      
      this.ctx.fillStyle = this.isHighlight ? this.color2 : this.color1
      this.ctx.fill()
      this.ctx.restore()
    }
  }

  update(step: number) {
    
    this.isHighlight = !this.isHighlight
    this.draw()
  }
}