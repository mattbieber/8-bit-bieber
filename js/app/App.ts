import { range } from '../util'
import { renderStartScreen } from './startscreen'
import { AudioEventType, Callback, StepEvent, clock, adapter, audioContext } from '../audio'
import { Pressable } from 'dom/traits'
import { EBBRectMetrics, EBBCircleMetrics, EBBArea, EBBDD } from '../dom/structs'
import { CanvasEx, GEO } from '../dom/CanvasEx'
import { CanvasColor, ColorKey, CanvasColorProps, APP_BACGROUND_COLOR } from '../dom/color'
import { ControlStrip, TRPad, PlayButton, Counter, Knob, Labels, Logo, Dial, Selector } from './controls'
import { roundedRect } from './controls/util'
import { AppGithub } from './controls/AppGithub'
import { AppAbout } from './controls/AppAbout'
import { RustGuy } from './controls/RustGuy'
import { KnobProperties, KnobValueChangeCallback } from './controls/Knob'
// import { FmOsc } from '../../pkg'

export interface PadConfig {
  padSize: EBBArea;
  padMargin: number;
}

export type Config = { string : any }

let EDGES_LEFT = 100
let EDGES_TOP = 100
let OFFSET_BOTTOM = 50

export const INSTR_NAMES = [ 'BD', 'SD', 'LT', 'MT', 'HT', 'CA', 'MA', 'CB', 'HH', 'OH', 'CY', 'CL' ]


/**
 * 🐳 implementation of CanvasEx
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
export class App extends CanvasEx {
  
  started: boolean = false
  hasSized = false
  ready: boolean = false
  isPlaying: boolean = false
  trPads: TRPad[] = []
  controlStrips: ControlStrip[] = []
  counter: Counter | null = null
  subCounter: Counter | null = null
  tempoKnob: Knob | null = null
  instrSelector: Knob | null = null
  currentStep : StepEvent = { step: 0, time: 0 }
  eoePadConfig: PadConfig = { padSize: { w: 0, h: 0 }, padMargin: 0 }
  stripCoords: Array<any> = []
  stripWidth: number = 0
  mixerControls: Array<Dial> = []
  selectors: Array<Selector> = []
  currentInstrument: number = -1
  wasmChange = (e: CustomEvent<any> | null) => {
    console.log(this)
    this.init().then(() => {

      clock.on(AudioEventType.Start, this.onClockStart)
      clock.on(AudioEventType.Stop, this.onClockStop)
      clock.on(AudioEventType.Step, this.onClockStep)


    })

    // let fm = e.detail as FmOsc
    //   if (fm) {
      
        
    //     fm.set_note(50);
    //     fm.set_fm_frequency(0);
    //     fm.set_fm_amount(0);
    //     fm.set_gain(0.8);
    //     window.setTimeout(() => {
    //       fm.stop_playing()
    //       fm.free
    //     }, 1000)
    //   }

    // console.log(e)

  }
/**
  * constructor
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  constructor(public config: Config) {
    super('canvas')
    document.addEventListener('wasmnotification', this.wasmChange)
    requestAnimationFrame(this.animloop)
  }

/**
  *
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  async init() {
    this.ready == adapter.init()
  }

  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onMouse(e: MouseEvent, element: Pressable) : void {
    // if(e.type === 'click') console.log(e.clientX, e.clientY)
   
    const rect = this.canvas.getBoundingClientRect()
    if(!element) return
    if(e.type === 'click'){
      element.onMouseClick(e)
    } else {
      element.onMouseMove(e)
    }
  }

  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onClockStart: Callback = (e) => {
    console.log('onstart')
    

  }

/**
  * 
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onClockStep: Callback = (e) => {

    console.log('CLOCK')
  }

/**
  * 
  * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  onClockStop: Callback = (e) => {
    console.log('onstop')
    clock.eventQueue = []
    this.reset()
  }


  hasStarted(started: boolean) {
    this.started = started
    if(started) this.layoutChildCanvas(null)
  }


  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  reset() {
    this.counter?.update(0)
    this.subCounter?.update(0)

        // control strip
    for (const strip of this.controlStrips) {
      strip.update(false)
    }
    
  }

  
  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  animloop = (step: number) => {
    requestAnimationFrame(this.animloop)

    let event:StepEvent

    for (const dial of this.mixerControls) {
      dial.draw()
    }
    
    // while (clock.eventQueue.length && clock.eventQueue[0].time < audioContext.currentTime) {
    //   event = clock.eventQueue.pop() as StepEvent
      
    //   const beat = event.step + 1

    //    if (this.currentStep.step != beat) {
        
    //     const prevStep = beat === 1 ? 15 : beat-2
    //     const subStep = beat%4 === 0 ? 4 : beat%4

    //     this.counter?.update(Math.ceil(((beat%17)/4)-0.1))
    //     this.subCounter?.update(subStep)

    //     // control strip
    //     this.controlStrips[prevStep].update(false)
    //     this.controlStrips[beat-1].update(true)

    //     this.currentStep = event;
        
    //   }
    // }
  }

  

  /**
   * resize event listener
   * @param e 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  layoutChildCanvas(e: CustomEvent<EBBArea> | null) {
    const rect = this.canvas.getBoundingClientRect()
    
    if(!this.started) {
      
      if(this.hasSized) {
        window.location.reload(true)
      }
      
      this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height)

      renderStartScreen(this, GEO)
      this.hasSized = true
      return
    }

    setTimeout(() => {
      console.log(rect)
      
    // have not rendered to hitCanvas no need to clear
    this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height)
    this.ctx.fillStyle = CanvasColor.EOEBrown
    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    


    this.layoutKit()
    this.layoutStrip()
    this.layoutControls()
    this.layoutExtras()
    this.layoutSurface()
    
    },300)
    
  }

  layoutExtras() {

    const s = {
      github: new EBBDD(),
      about: new EBBDD(),
      rustguy: new EBBDD(),
    }
    
    /** GITHUB  */
    s.github.rd.pos = { x: 100, y: 35 }
    s.github.rd.dimensions = { w: 22, h: 22 }
    s.github.rd.scale = { x: 1.75, y: 1.75 }
    s.github.rd.offsets = {
      x: (s.github.rd.dimensions.w * 6),
      y: 10
    }

    /** ABOUT  */
    s.about.rd.pos = { x: 100, y: 35 }
    s.about.rd.dimensions = { w: 15, h: 15 }
    s.about.rd.scale = { x: 2.5, y: 2.5 }
    s.about.rd.offsets = {
      x: Math.floor(s.about.rd.dimensions.w * 15),
      y: 10
    }


    /** RUSTGUY  */
    s.rustguy.rd.pos = { x: 100, y: 35 }
    s.rustguy.rd.dimensions = { w: 90, h: 56 }
    s.rustguy.rd.scale = { x: 0.02, y: 0.02 }
    s.rustguy.rd.offsets = {
      x: Math.floor(s.rustguy.rd.dimensions.w * 10),
      y: 10
    }

    const rustguy1 = new RustGuy(this.contexts[0], s.rustguy)
    rustguy1.kind = 'ferris'
    rustguy1.render(s.rustguy.rd)

    s.github.rd.pos.x = Math.round((GEO.clientRect.w - s.github.rd.dimensions.w) - s.github.rd.offsets.x)

    let real = true
    for (let ctx of this.contexts) {

      ctx.save()
     
      const github = new AppGithub(ctx, s.github)
      const about = new AppAbout(ctx, s.about)
      

      github.colorKey = this.registerUIElement(github)
      about.colorKey = this.registerUIElement(about)

      github.isHit = !real
      about.isHit = !real

      // @ts-ignore
      github.url = this.config.repository.url
      //@ts-ignore
      about.url = 'https://mattbieber.com/wasm.mdx/'

      /** - GITHUB - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
      github.render(s.github.rd)
      s.github.rd.pos.x = Math.round((GEO.clientRect.w - s.github.rd.dimensions.w) - s.github.rd.offsets.x)
  
  
      ctx.restore()
      ctx.save()


      /** - ABOUT - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
      s.about.rd.pos.x = Math.round((GEO.clientRect.w - s.about.rd.dimensions.w) - s.about.rd.offsets.x)
      about.render(s.about.rd)
 
      real = false
      ctx.restore()
  
    
    }
  }

  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  layoutSurface() {
    
   
    const ctx = this.contexts[0]
    ctx.save()
    ctx.translate(270, GEO.offsets['TEMPO_KNOB'].y-20)
    ctx.fillStyle = CanvasColor.EOEWhite
    ctx.font = '20px sans-serif'
    ctx.fillText('Tempo', 0, 0)


    
    ctx.restore()
    ctx.save()
    
    
  
    // let rustLogoData = new EBBDD()
    // rustLogoData.rd.pos = { x: 440, y: 200 }
    // rustLogoData.rd.dimensions = { w: 144, h: 144 }
    // rustLogoData.rd.scale = { x: 1, y: 1 }
    // let rustLogo = new Logo(ctx, rustLogoData)
    // rustLogo.draw()
    // ctx.restore()
    // ctx.save()

    let orangeDivider_x = this.trPads[4].metrics.x
    let orangeDivider_y = GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM-60
    let orangeDivider_end = this.trPads[4].metrics.x + this.stripCoords[12].x
    
    ctx.strokeStyle = CanvasColor.EOEOrange

    ctx.beginPath()
    ctx.moveTo(orangeDivider_x, orangeDivider_y)
    ctx.lineTo(orangeDivider_end, orangeDivider_y)
    ctx.stroke()
    
    let x = (GEO.offsets['TR_PADS'].x + GEO.offsets['TR_PADS'].w) - 200
    let y = GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM-85

    ctx.save()
    ctx.translate(x, y)
    Labels.tr(ctx)
    ctx.restore()
    ctx.save()

    x = (GEO.offsets['TR_PADS'].x + GEO.offsets['TR_PADS'].w) - 700
    y = GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM-100
    ctx.translate(x, y)
    Labels.rhythmComposer(ctx)

    ctx.restore()
    ctx.save()
    x = (GEO.offsets['TR_PADS'].x + GEO.offsets['TR_PADS'].w) - 400
    y = GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM-40
    
    ctx.translate(x, y)
    Labels.computerControlled(ctx)
    ctx.restore()
    

 

  }

  drawSelector(metrics: EBBCircleMetrics) {
    let real = true
    
    
    for (let ctx of this.contexts) {
      const { x, y, w, h, r } = metrics
    
      ctx.save()
      
      ctx.translate(Math.round(x + (w/2)), Math.round(y+(h/2)))
      ctx.arc(0,0,r,0,Math.PI*2)
      ctx.fill()
      ctx.save()
      
      // ctx.strokeStyle = 'red'
      // ctx.strokeRect(0,0, metrics.w, metrics.h)
      
      ctx.restore()
      ctx.save()
     
      let baseX = Math.floor(metrics.w/2)
      let baseY = 0
      const buttonWidth = 40
      const buttonHeight = 20
      const baseAngle = (2 * Math.PI) / 12
    
      for (const i of range(0,11)) {

        const a = baseAngle*i
        let x = (Math.cos(a)*100) - (buttonWidth/2)
        let y = (Math.sin(a)*80) - (buttonHeight/2)

        let metrics = {
          x, y, w: buttonWidth, h: buttonHeight, r: 2
        }

        let sel = new Selector(metrics, i, INSTR_NAMES[i], this.contexts)
        sel.colorKey = this.registerUIElement(sel)

        this.selectors.push(sel)

        sel.on(AudioEventType.InstrumentChange, (args => {
          let sel = args[0]
          if(this.currentInstrument > -1) {
            // this.selectors[this.currentInstrument].update()
            // turn off 
          }
           
          this.currentInstrument = sel.isPressed ? sel.id : -1

          
        }))

        sel.draw(ctx, real)
        
      }

      real = false
      ctx.restore()
      ctx.restore()
    }

  }
  /**
   * 
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  layoutControls() {
    const { x, y, w, h } = GEO.offsets['TR_PADS']
    const _offset = (this.eoePadConfig.padMargin*2)
    
    /** PLAY/STOP BUTTON - - - - - - - - - - - - - - - -  */
    
    const playButtonRadius = 10

    GEO.offsets['PLAY_BUTTON'] = {
      x: EDGES_LEFT,
      y: ((y+h)-(playButtonRadius*4)-this.eoePadConfig.padMargin),
      w: playButtonRadius * 8,
      h: playButtonRadius * 4
    }


    let playButtonMetrics: EBBCircleMetrics = {
      r: playButtonRadius,
      ...GEO.offsets['PLAY_BUTTON']
    }

    
    let playButton = new PlayButton(playButtonMetrics, this.contexts)
    playButton.colorKey = this.registerUIElement(playButton)
    playButton.render(0)
    playButton.update()

    playButton.on(AudioEventType.Toggle, (e) => {
      if(this.isPlaying) {
        clock.stop()
      } else {
        clock.start()
      }
      this.isPlaying = !this.isPlaying
    })

    /** TEMPO KNOB - - - - - - - - - - - - - - - -  */
    const playKnobHeight = 300
    GEO.offsets['TEMPO_KNOB'] = {
      x: EDGES_LEFT,
      y: (GEO.offsets['TR_PADS'].y - playKnobHeight)-OFFSET_BOTTOM,
      w: 400,
      h: playKnobHeight
      
    }

    let tempoKnobMetrics: EBBCircleMetrics = {
      r: playButtonRadius,
      ...GEO.offsets['TEMPO_KNOB']
      
    }
    // @ts-ignore
    this.tempoKnob = new Knob({ showValue: true, showMarkers: true, showCenterDot: false }, tempoKnobMetrics, this.contexts)
    this.tempoKnob.colorKey = this.registerUIElement(this.tempoKnob)
    this.tempoKnob.scale = { x: 1, y: 1 }
    this.tempoKnob.render(0)

    /** INSTR SEL - - - - - - - - - - - - - - - -  */
    GEO.offsets['SEL'] = {
      x: 200,
      y: 150,
      w: 150,
      h: 200
      
    }


    let selectorMetrics: EBBCircleMetrics = {
      r: 80,
      ...GEO.offsets['SEL']
      
    }

    this.drawSelector(selectorMetrics)
    
  

    /** COUNTER - - - - - - - - - - - - - - - -  */
    let counterData = new EBBDD()
    counterData.rd.pos = { x: EDGES_LEFT, y: GEO.offsets['TR_PADS'].y }
    counterData.rd.dimensions = { w: 10, h: 20 }
    counterData.rd.scale = { x: 4, y: 4 }
    this.counter = new Counter(this.ctx, counterData)
    this.counter.render(counterData.rd)
    
    let subCounterData = new EBBDD()
    subCounterData.rd.pos = { x: EDGES_LEFT+40, y: GEO.offsets['TR_PADS'].y }
    subCounterData.rd.dimensions = { w: 10, h: 20 }
    subCounterData.rd.scale = { x: 2, y: 2 }
    this.subCounter = new Counter(this.ctx, subCounterData)
    this.subCounter.whole = false
    this.subCounter.render(subCounterData.rd)
    
    for (const i of range(0,11)) {

      let levelMetrics: EBBCircleMetrics = {
        x:this.stripCoords[i].x+5,
        y:200,
        h:Math.floor(this.stripWidth-10),
        w:Math.floor(this.stripWidth-10),
        r:0
      }

      let levelDial = new Dial({}, 'Level', CanvasColor.EOEOrange, levelMetrics, this.contexts)
      levelDial.colorKey = this.registerUIElement(levelDial)
      this.mixerControls.push(levelDial)
      
      let panMetrics: EBBCircleMetrics = {
        x:this.stripCoords[i].x+5,
        y:300,
        h:Math.floor(this.stripWidth-10),
        w:Math.floor(this.stripWidth-10),
        r:0
      }

      let panDial = new Dial({}, 'Pan', CanvasColor.EOEWhite, panMetrics, this.contexts)
      panDial.colorKey = this.registerUIElement(panDial)
      this.mixerControls.push(panDial)
    }

  }

  /**
   * renders the 808 drum kit
   * -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  layoutKit() {

    let { eoePadConfig } = this

    eoePadConfig.padSize = {
      w: Math.floor(GEO.clientRect.w / 24),
      h: 0
    }

    eoePadConfig.padSize.h = eoePadConfig.padSize.w*1.5
    eoePadConfig.padMargin = Math.floor((eoePadConfig.padSize.w*3)/16)
    
    
    
    
    const { padSize, padMargin } = this.eoePadConfig
    const w0 = (eoePadConfig.padSize.w + eoePadConfig.padMargin) * 16
    GEO.offsets['TR_PADS'] = {
      x: (GEO.clientRect.w - w0) / 2,
      y: (GEO.clientRect.h - (eoePadConfig.padSize.h * 4)),
      w: w0,
      h: padSize.h+(padMargin*2)
    }
     
     
    this.contexts.forEach(ctx => ctx.save())
    
       
    //this.ctx.fillStyle = CanvasColor.DarkGrey
    // this.ctx.fillRect(0, 0, GEO.seqRect.w, GEO.seqRect.h)

    
    const { x: x0, y: y0 } = GEO.offsets['TR_PADS']
    
    for (const i of range(0,15)) {
      
      let metrics = {
        x: Math.floor(((padSize.w*i) + (padMargin*(i+1)) + x0)),
        y: Math.floor((padMargin) + y0),
        h: Math.floor(padSize.h),
        w: Math.floor(padSize.w),
        r:4 }

    
      

      let props: CanvasColorProps = {
        color: Object.values(CanvasColor)[Math.floor(i/4)],
        strokeColor: CanvasColor.Black,
        strokeWidth: 4
      }
      
      const pad = new TRPad(metrics, props, this.contexts)
      pad.colorKey = this.registerUIElement(pad)
      pad.draw()
      this.trPads.push(pad)
    }
  
    this.contexts.forEach(ctx => ctx.restore())
  }

  layoutStrip() {

    const x0 = this.trPads[4].metrics.x
    const x1 = this.trPads[15].metrics.x + this.trPads[15].metrics.w
    const w0 = Math.floor(x1-x0)
    const {x,y,w,h} = GEO.offsets['TR_PADS']
    const h0 = Math.floor(y*0.65)
    
    
    let ctx = this.contexts[0]
    ctx.strokeStyle = CanvasColor.EOEWhite
    ctx.save()
    
    
    const hx1 = GEO.offsets['TR_PADS'].x
    const hx2 = GEO.offsets['TR_PADS'].x + GEO.offsets['TR_PADS'].w

    ctx.beginPath()
    ctx.moveTo(hx1, EDGES_TOP)
    ctx.lineTo(hx2, EDGES_TOP)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(hx1, GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM)
    ctx.lineTo(hx2, GEO.offsets['TR_PADS'].y - OFFSET_BOTTOM)
    ctx.stroke()



    ctx.restore()
    ctx.save()

    ctx.translate(x0, EDGES_TOP)
    // ctx.strokeRect(0,0,w0,h0)

    const lineEnd = Math.floor(h0*0.75)
    const lineMargin = 10
    ctx.lineWidth = 1
    
    this.stripWidth = Math.floor(w0/12)

    for (const i of range(0,12)) {

      const x = this.stripWidth*i

      ctx.beginPath()
      ctx.moveTo(x, lineMargin)
      ctx.lineTo(x, lineEnd)
      ctx.stroke()
      

      this.stripCoords.push({ x: x0+x, y: EDGES_TOP + lineMargin, h: lineEnd })
    
    }

    const labelMargin = 8
    const labelHeight = 30

    ctx.font = '16px sans-serif'
    ctx.textAlign = 'center'

    for (const i of range(0,11)) {

      const x = (this.stripWidth*i) + labelMargin
      const y = lineEnd-labelHeight
      const w = this.stripWidth-(labelMargin*2)

      ctx.fillStyle = CanvasColor.Beige
      
      roundedRect(ctx, { 
        x: x, 
        y: y, 
        w: w, 
        h: labelHeight, 
        r: 2 })
        ctx.fill()

        ctx.fillStyle = CanvasColor.Black
        // console.log(x+(w/2), y+(labelHeight/1.5))-
        ctx.fillText(INSTR_NAMES[i], x+(w/2), y+(labelHeight/1.5))

    }

    
    



    ctx.restore()
    // for (const pad of this.trPads) {
    //     let metrics: EBBCircleMetrics = {
    //     x: pad.metrics.x,
    //     y: y-(h*2.5),
    //     h: h*2.5,
    //     w: pad.metrics.w,
    //     r:0 
    //   }

      
    
    //   let props: CanvasColorProps = {
    //     color: CanvasColor.Beige,
    //     strokeColor: CanvasColor.Black,
    //     strokeWidth: 0
    //   }
      
    //   const strip = new ControlStrip(metrics, props, this.contexts)
    //   strip.draw()
    //   this.controlStrips.push(strip)
    // }
  } 
}