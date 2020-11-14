import { SceneNode } from '../../dom/scene'
import { CanvasColor } from '../../dom/color'
import { EBBVector } from '../../dom/structs'
import { StartScreenBackgroundColor } from '../startscreen'

export class Loading extends SceneNode {
  
  

  text = CanvasColor.EOEWhite
  loadingBlockColor = CanvasColor.Red3
  loadingBlockAccentColor = CanvasColor.Red2
  
  iterationCount = 0
  pos: EBBVector  = { x: 0, y: 0 }
  
  loadingBlocks = [
    [
      [29, 115, 25, 37],
      [29, 152, 25, 12],
    ],
    [
      [66, 115, 25, 37],
      [66, 152, 25, 12],
    ],
    [
      [103, 115, 25, 37],
      [103, 152, 25, 12],
    ],
    [
      [140, 115, 25, 37],
      [140, 152, 25, 12],
    ],
    [
      [177, 115, 25, 37],
      [177, 152, 25, 12],
    ],
    [
      [214, 115, 25, 37],
      [214, 152, 25, 12],
    ],
    [
      [251, 115, 25, 37],
      [251, 152, 25, 12],
    ],
    [
      [288, 115, 25, 37],
      [288, 152, 25, 12],
    ],
    [
      [325, 115, 25, 37],
      [325, 152, 25, 12],
    ],
    [
      [362, 115, 25, 37],
      [362, 152, 25, 12],
    ],
    [
      [399, 115, 25, 37],
      [399, 152, 25, 12],
    ],
  ]
  
  renderLoadingBlocks() {

    const { ctx } = this

    const iter = this.iterationCount % 12
  
    if (iter > 10) {
      ctx.beginPath()
      ctx.rect(29, 115, 370, 49)
      ctx.fillStyle = StartScreenBackgroundColor
      ctx.fill()
      return
    }
    
    this.loadingBlocks.slice(0, iter).forEach((block, index) => {
      ctx.beginPath()
      
      let [x, y, w, h] = block[0]
      // &ts-ignore
      ctx.rect(x, y, w, h)
      ctx.fillStyle = this.loadingBlockColor
      ctx.fill()
  
      ctx.beginPath()
      
      let [x2, y2, w2, h2] = block[1]
      // &ts-ignore
      ctx.rect(x2, y2, w2, h2)
      ctx.fillStyle = this.loadingBlockAccentColor
      ctx.fill()
    })
  }
  
  renderLoadingFrame() {
    const { ctx } = this

    ctx.beginPath()
    ctx.rect(17, 90, 450, 13)
    ctx.fillStyle = this.text
    ctx.fill()
  
    ctx.beginPath()
    ctx.rect(17, 175, 450, 13)
    ctx.fillStyle = this.text
    ctx.fill()
  
    ctx.beginPath()
    ctx.rect(4, 103, 13, 72)
    ctx.fillStyle = this.text
    ctx.fill()
  
    ctx.beginPath()
    ctx.rect(467, 103, 13, 72)
    ctx.fillStyle = this.text
    ctx.fill()
  
  }
  
  renderLoadingText() {

    const { ctx } = this

    ctx.beginPath()
    ctx.moveTo(55.66, 55.56)
    ctx.lineTo(55.66, 46.68)
    ctx.lineTo(29.03, 46.68)
    ctx.lineTo(29.03, 11.18)
    ctx.lineTo(11.28, 11.18)
    ctx.lineTo(11.28, 55.56)
    ctx.lineTo(55.66, 55.56)
    ctx.closePath()
  
    ctx.moveTo(104.48, 55.56)
    ctx.lineTo(104.48, 51.12)
    ctx.lineTo(108.92, 51.12)
    ctx.lineTo(108.92, 15.62)
    ctx.lineTo(104.48, 15.62)
    ctx.lineTo(104.48, 11.18)
    ctx.lineTo(68.98, 11.18)
    ctx.lineTo(68.98, 15.62)
    ctx.lineTo(64.54, 15.62)
    ctx.lineTo(64.54, 51.12)
    ctx.lineTo(68.98, 51.12)
    ctx.lineTo(68.98, 55.56)
    ctx.lineTo(104.48, 55.56)
    ctx.closePath()
  
    ctx.moveTo(91.17, 46.68)
    ctx.lineTo(82.29, 46.68)
    ctx.lineTo(82.29, 20.06)
    ctx.lineTo(91.17, 20.06)
    ctx.lineTo(91.17, 46.68)
    ctx.closePath()
    ctx.moveTo(135.55, 55.56)
    ctx.lineTo(135.55, 37.81)
    ctx.lineTo(144.42, 37.81)
    ctx.lineTo(144.42, 55.56)
    ctx.lineTo(162.18, 55.56)
    ctx.lineTo(162.18, 15.62)
    ctx.lineTo(157.74, 15.62)
    ctx.lineTo(157.74, 11.18)
    ctx.lineTo(122.23, 11.18)
    ctx.lineTo(122.23, 15.62)
    ctx.lineTo(117.79, 15.62)
    ctx.lineTo(117.79, 55.56)
    ctx.lineTo(135.55, 55.56)
    ctx.closePath()
    ctx.moveTo(144.42, 28.93)
    ctx.lineTo(135.55, 28.93)
    ctx.lineTo(135.55, 20.06)
    ctx.lineTo(144.42, 20.06)
    ctx.lineTo(144.42, 28.93)
    ctx.closePath()
    ctx.moveTo(211, 55.56)
    ctx.lineTo(211, 51.12)
    ctx.lineTo(215.43, 51.12)
    ctx.lineTo(215.43, 15.62)
    ctx.lineTo(211, 15.62)
    ctx.lineTo(211, 11.18)
    ctx.lineTo(171.05, 11.18)
    ctx.lineTo(171.05, 55.56)
    ctx.lineTo(211, 55.56)
    ctx.closePath()
    ctx.moveTo(197.68, 46.68)
    ctx.lineTo(188.8, 46.68)
    ctx.lineTo(188.8, 20.06)
    ctx.lineTo(197.68, 20.06)
    ctx.lineTo(197.68, 46.68)
    ctx.closePath()
    ctx.moveTo(242.06, 55.56)
    ctx.lineTo(242.06, 11.18)
    ctx.lineTo(224.31, 11.18)
    ctx.lineTo(224.31, 55.56)
    ctx.lineTo(242.06, 55.56)
    ctx.closePath()
    ctx.moveTo(268.69, 55.56)
    ctx.lineTo(268.69, 20.06)
    ctx.lineTo(277.57, 20.06)
    ctx.lineTo(277.57, 55.56)
    ctx.lineTo(295.32, 55.56)
    ctx.lineTo(295.32, 15.62)
    ctx.lineTo(290.88, 15.62)
    ctx.lineTo(290.88, 11.18)
    ctx.lineTo(250.94, 11.18)
    ctx.lineTo(250.94, 55.56)
    ctx.lineTo(268.69, 55.56)
    ctx.closePath()
    ctx.moveTo(348.58, 55.56)
    ctx.lineTo(348.58, 28.93)
    ctx.lineTo(326.39, 28.93)
    ctx.lineTo(326.39, 37.81)
    ctx.lineTo(330.82, 37.81)
    ctx.lineTo(330.82, 46.68)
    ctx.lineTo(321.95, 46.68)
    ctx.lineTo(321.95, 20.06)
    ctx.lineTo(348.58, 20.06)
    ctx.lineTo(348.58, 11.18)
    ctx.lineTo(308.63, 11.18)
    ctx.lineTo(308.63, 15.62)
    ctx.lineTo(304.2, 15.62)
    ctx.lineTo(304.2, 51.12)
    ctx.lineTo(308.63, 51.12)
    ctx.lineTo(308.63, 55.56)
    ctx.lineTo(348.58, 55.56)
    ctx.closePath()
  
    ctx.fillStyle = this.text
    ctx.fill()
  }
  
  
  renderLoadingEllipsis() {

    const { ctx } = this

    const iter = this.iterationCount % 12
  
    switch (true) {
      case iter < 3:
      case iter > 5 && iter < 9:
        ctx.beginPath()
        ctx.rect(380, 42, 100, 14)
        ctx.fillStyle = StartScreenBackgroundColor
        ctx.fill()
  
        break
  
      case iter > 2 && iter < 6 :
      case iter > 8 && iter < 12 :
        ctx.beginPath()
        ctx.rect(380, 42, 14, 14)
        ctx.fillStyle = this.text
        ctx.fill()
  
        ctx.beginPath()
        ctx.rect(420, 42, 14, 14)
        ctx.fillStyle = this.text
        ctx.fill()
  
        ctx.beginPath()
        ctx.rect(460, 42, 14, 14)
        ctx.fillStyle = this.text
        ctx.fill()
        break
    }
  }

  draw() {
     
    const { ctx, rd } = this
    
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    // ctx.strokeRect(0, 0, rd.dimensions.w, rd.dimensions.h)
    this.renderLoadingBlocks()
    this.renderLoadingText()
    this.renderLoadingEllipsis()
    this.renderLoadingFrame()
    
    ctx.restore()
  }

  update(step: number) {

    const { ctx, rd } = this
    this.iterationCount++
    ctx.save()
    ctx.translate(rd.pos.x, rd.pos.y)
    ctx.scale(rd.scale.x, rd.scale.y)
    // ctx.strokeRect(0, 0, rd.dimensions.w, rd.dimensions.h)
    this.renderLoadingBlocks()
    this.renderLoadingEllipsis()
    
    ctx.restore()
    
  }

  
  

}