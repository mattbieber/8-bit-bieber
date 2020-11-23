import { EBBGeo, EBBDirection, EBBDD } from '../dom/structs'
import { CanvasEx } from '../dom/CanvasEx'
import { CanvasColor  } from '../dom/color'
import { Dragon } from './art/Dragon'
import { Logo } from './art/Logo'
import { PressStart } from './art/PressStart'
import { PressContinue } from './art/PressContinue'
import { CrapCom } from './art/CrapCom'
import { Hero } from './art/Hero'
import { Clouds } from './art/Clouds'
import { Ground } from './art/Ground'
import { Github } from './art/Github'
import { About } from './art/About'
import { Coins } from './art/Coins'
import { isMobile, isMobileTablet } from '../util'
import { Loading } from './art/Loading'

 
export const StartScreenBackgroundColor = CanvasColor.Blue

const s = {

  logo: new EBBDD (),
  pressStart: new EBBDD(),
  pressContinue: new EBBDD(),
  load: new EBBDD(),
  crapCom: new EBBDD(),
  hero: new EBBDD(),
  dragon: new EBBDD(),
  cloud_a: new EBBDD(),
  cloud_b: new EBBDD(),
  ground: new EBBDD(),
  github: new EBBDD(),
  about: new EBBDD(),
  coins: new EBBDD(),


}

function settings() {

  s.load.rd.scale = { x: 0.5, y: 0.5 }
  s.load.rd.dimensions = { w: 484, h: 200 }
  s.load.rd.offsets = {
    x: s.load.rd.dimensions.w/2
  }

  s.load.ad.default = {
    lastPosition: { x: 0, y: 0 },
    lastAnimatedStep: 0,
    minLapse: 50,
    maxLapse: 100,
    step: 20,
    visible: true,
    velocity: 10,
    name: '',
    hDirection: EBBDirection.None,
    vDirection: EBBDirection.None,
    lastHDirection: EBBDirection.None,
    lastVDirection: EBBDirection.None
    
  }


  s.coins.rd.pos = { x: 100, y: 725 }
  s.coins.rd.dimensions = { w: 75, h: 75 }
  s.coins.rd.scale = { x: 0.5, y: 0.5 }
  s.coins.rd.offsets = {
    x: (s.coins.rd.dimensions.w /2)* s.coins.rd.scale.x,
    y: s.coins.rd.dimensions.w
  }

  s.coins.ad.default = {
    lastPosition: { x: 0, y: 0 },
    lastAnimatedStep: 0,
    minLapse: 20,
    maxLapse: 50,
    step: 0,
    visible: true,
    velocity: 5,
    name: '',
    hDirection: EBBDirection.Right,
    vDirection: EBBDirection.None,
    lastHDirection: EBBDirection.None,
    lastVDirection: EBBDirection.None
  }

  /** GITHUB  */
  s.github.rd.pos = { x: 100, y: 25 }
  s.github.rd.dimensions = { w: 90, h: 90 }
  s.github.rd.scale = { x: 0.5, y: 0.5 }
  s.github.rd.offsets = {
    x: (s.github.rd.dimensions.w /2),
    y: 10
  }

  /** ABOUT  */
  s.about.rd.pos = { x: 100, y: 35 }
  s.about.rd.dimensions = { w: 90, h: 56 }
  s.about.rd.scale = { x: 0.5, y: 0.5 }
  s.about.rd.offsets = {
    x: Math.floor(s.about.rd.dimensions.w * 1.5),
    y: 10
  }


  /** LOGO  */
  s.logo.rd.pos = { x: 0, y: 0 }
  s.logo.rd.dimensions = { w: 650, h: 600 }
  s.logo.rd.scale = { x: 0.5, y: 0.5 } 
  s.logo.rd.offsets = {
    typeLg: 136,
    x: Math.round(s.logo.rd.dimensions.w / 2),
    typeSm: 100
    
  }
  
  s.logo.rd.scale = { x: 0.5, y: 0.5 }

  /** PRESS START - 420  */
  s.pressStart.rd.pos = { x: 0, y: 260 }
  s.pressStart.rd.dimensions = { w: 420, h: 100 }
  s.pressStart.rd.scale = { x: 0.5, y: 0.5 } 
  s.pressStart.rd.offsets = {
    x: Math.round(s.pressStart.rd.dimensions.w / 2),
    y: 300
  }

  /** PRESS CONTINUE - 420  */
  s.pressContinue.rd.pos = { x: 0, y: 260 }
  s.pressContinue.rd.dimensions = { w: 420, h: 100 }
  s.pressContinue.rd.scale = { x: 0.5, y: 0.5 } 
  s.pressContinue.rd.offsets = {
    x: Math.round(s.pressContinue.rd.dimensions.w / 2),
    y: 300
  }


  /** CRAPCOM - 405  */
  s.crapCom.rd.pos = {x: 0, y: 0 }
  s.crapCom.rd.dimensions = { w: 405, h: 100 }
  s.crapCom.rd.scale = { x: 0.3, y: 0.3 }
  s.crapCom.rd.offsets = {
    x: Math.round(s.crapCom.rd.dimensions.w / 2),
    y: 200
  }


  /** HERO - 260 / 416  */
  s.hero.rd.pos = { x: 400, y: 200 }
  s.hero.rd.dimensions = { w: 1040, h: 1680 }
  s.hero.rd.scale = { x: 0.2, y: 0.2 }
  s.hero.rd.offsets = {
    x: (s.hero.rd.dimensions.w / 2),
    y: 150
  }

  s.hero.ad.eyes = {
    lastPosition: { x: 0, y: 0 },
    lastAnimatedStep: 0,
    minLapse: 50,
    maxLapse: 100,
    step: 20,
    visible: true,
    velocity: 10,
    name: '',
    hDirection: EBBDirection.None,
    vDirection: EBBDirection.None,
    lastHDirection: EBBDirection.None,
    lastVDirection: EBBDirection.None
    
  }

  s.hero.ad.arm = {
    lastPosition: { x: 0, y: 0 },
    lastAnimatedStep: 0,
    minLapse: 70,
    maxLapse: 100,
    step: 0,
    visible: true,
    velocity: 70,
    name: '',
    hDirection: EBBDirection.None,
    vDirection: EBBDirection.None,
    lastHDirection: EBBDirection.None,
    lastVDirection: EBBDirection.None
  }

  /** DRAGON - 260 / 416  */
  s.dragon.rd.pos = { x: 200, y: 300 }
  s.dragon.rd.dimensions = { w: 600, h: 400 }
  s.dragon.rd.scale = { x: 0.5, y: 0.5 }
  s.dragon.rd.offsets = {
    y: 10
  }

  s.dragon.ad.body = {
    lastPosition: { x: 0, y: 0 },
    lastAnimatedStep: 0,
    minLapse: 0,
    maxLapse: 4,
    step: 10,
    visible: true,
    velocity: 8,
    name: '',
    hDirection: EBBDirection.Left,
    vDirection: EBBDirection.None,
    lastHDirection: EBBDirection.None,
    lastVDirection: EBBDirection.Up
    

  }

  /** CLOUD A - 202 / 106  */
  s.cloud_a.rd.pos = { x: 300, y:  160 }
  s.cloud_a.rd.dimensions = { w: 202, h: 106 }
  s.cloud_a.rd.scale =  { x: 0.6, y: 0.6 } //0.35

  s.cloud_a.ad.default.name = 'a'
  s.cloud_a.ad.default.hDirection = EBBDirection.Right
  s.cloud_a.ad.default.velocity = 10
  s.cloud_a.ad.default.step = 20
  s.cloud_a.ad.default.minLapse = 10
  s.cloud_a.ad.default.maxLapse = 30


  /** CLOUD B - 260 / 112  */
  s.cloud_b.rd.pos = { x: 800, y: 90 }
  s.cloud_b.rd.dimensions = { w: 260, h: 112}
  s.cloud_b.rd.scale = { x: 0.85, y: 0.85 }
  s.cloud_b.rd.offsets = {
    x: s.cloud_b.rd.dimensions.w
  }

  s.cloud_b.ad.default.name = 'b'
  s.cloud_b.ad.default.hDirection = EBBDirection.Right
  s.cloud_b.ad.default.velocity = 10
  s.cloud_b.ad.default.step = 5
  s.cloud_b.ad.default.minLapse = 10
  s.cloud_b.ad.default.maxLapse = 30

  /** GROUND */
  s.ground.rd.pos = { x: 0, y: 660 }
  s.ground.rd.dimensions = { w: 202, h: 109 }
  s.ground.rd.scale =  { x: 1, y: 1 } //0.35
}

settings()

 

/**
 * Directs all the action on start screen
 * 
 * @param app { CanvasEx } - instance of the parent app
 * @param geo { EBBGeo } - global layout object
 * - - - - - - - - - - - - - - - - - - - - - - - - - -  */
 export const renderStartScreen = (app: CanvasEx, geo: EBBGeo) => {
  
  let LOADING = false
  let startLoading = false
  let startPressed = false
  console.log(geo)
  const { ctx, hookMouse } = app
  
  type Bounds =  {
    l: number, 
    r: number, 
    t: number, 
    b: number 
  }
  
  let dragonBounds: Bounds = {l: 40, r: 0, t: 0, b: 0 } 
  let clickBounds: Record<string, Bounds> = {}
  // @ts-ignore
  const repoUrl = app.config.repository.url
  const aboutUrl = 'https://mattbieber.com/wasm.mdx'

  hookMouse('startscreen', (e: MouseEvent) => {
    const rect = app.canvas.getBoundingClientRect() 
    const x = e.clientX 
    const y = (e.clientY - rect.top)
    
   
    for (let bound in clickBounds) {
      const b = clickBounds[bound]

      if (
        y>b.t 
        && y<b.b 
        && x>b.l
        && x<b.r
       ) {
        switch (bound) {

          case 'start': 
            if(!startPressed) loadExtras()
            startPressed = true
            break
          case 'continue':
            
            setTimeout(() => {
              ctx.save()
              ctx.fillStyle = StartScreenBackgroundColor
              ctx.fillRect(0, s.pressStart.rd.pos.y, geo.clientRect.w, geo.clientRect.h - s.pressStart.rd.pos.y)
              ctx.fillRect(s.dragon.rd.pos.x, s.dragon.rd.pos.y, s.dragon.rd.dimensions.w, s.dragon.rd.dimensions.h)
              ctx.fillRect(s.hero.rd.pos.x, s.hero.rd.pos.y, s.hero.rd.dimensions.w*2, s.hero.rd.dimensions.h)
              loading.render(s.load.rd)
              startLoading = true
              LOADING = true
              ctx.restore()
              app.unhookMouse('startscreen')
              setTimeout(() => {

                app.hasStarted(true)
              }, 3000)
            
            }, 250)
            break

          case 'github':
            window.open(repoUrl, '_blank')

            break

          case 'about':
            window.open(aboutUrl, '_blank')
              
            break
        }
      }
      
    }

  })



  const logo = new Logo(ctx, s.logo)
  const loading = new Loading(ctx, s.load)
  const pressStart = new PressStart(ctx, s.pressStart)
  const pressContinue = new PressContinue(ctx, s.pressContinue)

  const crapCom = new CrapCom(ctx, s.crapCom)
  const hero = new Hero(ctx, s.hero)
  const dragon = new Dragon(ctx, s.dragon)
  const cloud_a = new Clouds(ctx, s.cloud_a)
  const cloud_b = new Clouds(ctx, s.cloud_b)
  const ground = new Ground(ctx, s.ground)
  const github = new Github(ctx, s.github)
  const about = new About(ctx, s.about)
  const coins = new Coins(ctx, s.coins)


  
  
  // ctx.canvas.addEventListener('click', e => animating = !animating) //console.log(e.clientX, e.clientY))
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.save()

  // TODO remove
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = StartScreenBackgroundColor
  ctx.fill()

  ctx.restore()
  ctx.save()


  /** - LOGO - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.logo.rd.dimensions.w = Math.floor(geo.clientRect.w*geo.scale)

  console.log(window.navigator.userAgent)
  console.log(isMobile())
  console.log(isMobileTablet())

  if(isMobile() || isMobileTablet()) {
    s.logo.rd.offsets.topX = ((geo.centerPoint.x - (650/geo.scale)/2)+325)
    s.logo.rd.offsets.bottomX = ((geo.centerPoint.x + 255))
    
  } else {
    s.logo.rd.offsets.topX = (geo.centerPoint.x*geo.scale - 325)
    s.logo.rd.offsets.bottomX = (geo.centerPoint.x*geo.scale - 255)
    
  }
  
  
  s.logo.rd.offsets.topY = 100 
  s.logo.rd.offsets.bottomY = -(s.logo.rd.dimensions.h)
  dragonBounds.t = s.logo.rd.offsets.bottomY

  logo.render(s.logo.rd)
 
  ctx.restore()
  ctx.save()


  /** - CLOUD A - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  cloud_a.render(s.cloud_a.rd)

  ctx.restore()
  ctx.save()

  
  /** - CLOUD B - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.cloud_b.rd.pos.x = Math.round(geo.clientRect.w - s.cloud_b.rd.offsets.x)
  cloud_b.render(s.cloud_b.rd)
  
  ctx.restore()
  ctx.save()


  /** - GROUND - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.ground.rd.dimensions.w = geo.clientRect.w
  s.ground.rd.pos.y = geo.clientRect.h - 109
  ground.render(s.ground.rd)

  ctx.restore()
  ctx.save()


  /** - PRESS START - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.pressStart.rd.pos.x = Math.round((geo.centerPoint.x) - s.pressStart.rd.offsets.x)
  s.pressStart.rd.pos.y = Math.round(geo.clientRect.h - s.pressStart.rd.offsets.y)
  pressStart.render(s.pressStart.rd)
  clickBounds['start'] = { 
    l: s.pressStart.rd.pos.x, 
    r: (s.pressStart.rd.pos.x + (s.pressStart.rd.dimensions.w)),
    t: s.pressStart.rd.pos.y,
    b: (s.pressStart.rd.pos.y + (s.pressStart.rd.dimensions.h)),
  }

  ctx.restore()
  ctx.save()


  /** - PRESS CONTINUE - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.pressContinue.rd.pos.x = Math.round((geo.centerPoint.x) - s.pressContinue.rd.offsets.x)
  s.pressContinue.rd.pos.y = Math.round(geo.clientRect.h - s.pressContinue.rd.offsets.y)
  

  ctx.restore()
  ctx.save()

  /** - LOADING - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.load.rd.pos.x = Math.round(geo.centerPoint.x - (s.load.rd.offsets.x/2))
  s.load.rd.pos.y = Math.round(geo.clientRect.h - s.pressStart.rd.offsets.y)
  
  
  /** - CRAPCOM - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.crapCom.rd.pos.x = Math.round((geo.centerPoint.x) - s.crapCom.rd.offsets.x)
  s.crapCom.rd.pos.y = Math.round(geo.clientRect.h - s.crapCom.rd.offsets.y)
  crapCom.render(s.crapCom.rd)

  ctx.restore()
  ctx.save()


  /** - HERO - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.hero.rd.pos.x = Math.round((geo.clientRect.w - (s.hero.rd.offsets.x/2)))
  s.hero.rd.pos.y = Math.round((geo.clientRect.h / geo.scale) - s.hero.rd.offsets.y)
  hero.render(s.hero.rd)
  dragonBounds.r = s.hero.rd.pos.x
  hero.groundOffset = s.ground.rd.pos.y
  ctx.restore()
  

  const loadExtras = () => {
    ctx.save()
    
    /** - DRAGON - - - - - - - - - - - - - - - - - - - - - - - - -  */
    s.dragon.rd.pos.x = Math.round(geo.centerPoint.x/2.2)
    dragonBounds.l = Math.round(geo.centerPoint.x/4)

    ctx.restore()

    ctx.save()
    ctx.translate(s.pressStart.rd.pos.x, s.pressStart.rd.pos.y)
    ctx.fillStyle = CanvasColor.Blue
    ctx.fillRect(-5, -5, s.pressStart.rd.dimensions.w+10, s.pressStart.rd.dimensions.h+5)
    ctx.restore()

    let audio = document.getElementById("audio") as HTMLAudioElement
    audio.src = "8bit.mp3"    
    audio.load();
    audio.play();
  }
  
  ctx.save()


  /** - GITHUB - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  github.render(s.github.rd)
  s.github.rd.pos.x = Math.round((geo.clientRect.w - s.github.rd.dimensions.w) - s.github.rd.offsets.x)
  clickBounds['github'] = { 
    l: s.github.rd.pos.x, 
    r: (s.github.rd.pos.x + (s.github.rd.dimensions.w / geo.scale)),
    t: s.github.rd.pos.y,
    b: (s.github.rd.pos.y + (s.github.rd.dimensions.h / geo.scale)),
  }
  
  ctx.restore()
  ctx.save()


  /** - ABOUT - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  s.about.rd.pos.x = Math.round((geo.clientRect.w - s.about.rd.dimensions.w) - s.about.rd.offsets.x)
  about.render(s.about.rd)
  clickBounds['about'] = { 
    l: s.about.rd.pos.x, 
    r: (s.about.rd.pos.x + (s.about.rd.dimensions.w / geo.scale)),
    t: s.about.rd.pos.y,
    b: (s.about.rd.pos.y + (s.about.rd.dimensions.h / geo.scale)),
  }
  
  ctx.restore()
  ctx.save()


  /** - COINS - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  coins.render(s.coins.rd)
  s.coins.rd.pos.x = Math.round(geo.centerPoint.x - s.coins.rd.offsets.x)
  s.coins.rd.pos.y = Math.round(geo.clientRect.h - s.pressStart.rd.offsets.y - s.coins.rd.offsets.y)
  dragonBounds.b =  s.coins.rd.pos.y 
  
  ctx.restore()
  ctx.save()


  /** ------ LOGO ANIM ------ */
  let hasLogoCompleted = false
  let hasLogo2Completed = false
  let hasLogo3Completed = false
  let hasLogo4Completed = false
  
  let logostop = 0
  const logodelay = 120
  const logodelay2 = 18

  type EasingParams = {
    from: number,
    to: number,
    frame: number
    frames: number
  }

  const ease = (
    prog: number, 
    start: number, 
    distance: number, 
    steps: number) => {
      prog /= steps/2
      if (prog < 1) return distance/2 * Math.pow(2,10*(prog-1))+start
      prog--
      return distance/2*(-Math.pow(2,-10*prog)+2)+start;
  }

  const ease2 = (
    prog: number, 
    start: number, 
    distance: number, 
    steps: number) => {
      return -distance/2*(Math.cos(Math.PI*prog/steps)-1)+start
  }

  const y = (
    p: EasingParams, 
    fn:(prog: number, start: number, distance: number, steps: number) => number ) => 
    {
          let distance = p.to - p.from
          return fn(p.frame, p.from, distance, p.frames)
  }

  let logoeasing: EasingParams = {
    from: 0,
    to: 30  ,
    frame: 0,
    frames: 50
  } 

  let logo2easing: EasingParams = {
    from: 0,
    to: 26,
    frame: 0,
    frames: 12
  } 

  let logo3easing: EasingParams = {
    from: 0,
    to: 26,
    frame: 0,
    frames: 10
  } 

  let logo4easing: EasingParams = {
    from: 0,
    to: 24  ,
    frame: 0,
    frames: 10
  } 

  /** ANIMATION LOOP */
  let loopInterval: number = -1
  let dragonStopped = false
  let heroDead = false
  let dragonStopFrame = 0
  let herodeadStopFrame = 0
  let deadIteration = 0
  let loadStopFrame = 0
  let deadDelay = 110
  let textHighlight = 200

  const dragonDelay = 120
  const fallDelay = 20
  

  
  const animloop = () => {
    
    if(!app.started) loopInterval = requestAnimationFrame(animloop)
    
    // if(loopInterval%2 != 0) return
  
    // COINS
    if(coins.shouldUpdate(loopInterval)) {
      coins.ad.default.lastAnimatedStep = loopInterval
      coins.update(loopInterval)
    }


    if(loopInterval > textHighlight) {
      
      if(!startPressed) {
        pressStart.update(loopInterval)
      }
      
      textHighlight = loopInterval + 200
    
    }
    // HERO
    const blinkDuration = Math.floor((Math.random()*20-4)+4)
    const tripBlinking = (hero.blinking && ((hero.ad.eyes.lastAnimatedStep + blinkDuration) >= loopInterval))
    
    if(tripBlinking || hero.shouldUpdate(loopInterval, 'eyes')) {
      hero.shouldBlink = true
      hero.ad.eyes.lastAnimatedStep = loopInterval
    }

    if(hero.shouldUpdate(loopInterval, 'arm')) {
      hero.shouldWave = true
      hero.ad.arm.lastAnimatedStep = loopInterval
    }

    ctx.restore()
    ctx.save()
    
    hero.update(loopInterval)

    ctx.restore()
    ctx.save()
   

    if(startLoading) {
      loadStopFrame = loopInterval
      startLoading = false
    }

    if(LOADING) {
      if(loopInterval > loadStopFrame + s.load.ad.default.step) {
        loading.update(loopInterval)
        loadStopFrame = loopInterval
      }
    }

    if(!startPressed) return

    let updateSky = false
    
    if(!hasLogoCompleted) {
      logo.rd.offsets.bottomY += y(logoeasing, ease)

      if(logoeasing.frame < logoeasing.frames) {
        logoeasing.frame++
      }  else {
        logostop = loopInterval
        hasLogoCompleted = true
      }
    }
    
    if(hasLogoCompleted && !hasLogo2Completed) {
      
      if(loopInterval > logostop+logodelay ) {
        logo.rd.offsets.topY -= y(logo2easing, ease)

        if(logo2easing.frame < logo2easing.frames) {
          logo2easing.frame++
        }  else {
          logostop = loopInterval
          hasLogo2Completed = true
        }
      }
    }

    if(hasLogo2Completed && !hasLogo3Completed) {
      
        logo.rd.offsets.topY += y(logo3easing, ease)
        if(logo3easing.frame < logo3easing.frames) {
          logo3easing.frame++
        }  else {
          hasLogo3Completed = true
        }
      }

    if(hasLogo2Completed && !hasLogo4Completed) {
      if(loopInterval > logostop+logodelay2 ) {
        logo.rd.offsets.bottomY += y(logo4easing, ease)
        if(logo4easing.frame < logo4easing.frames) {
          logo4easing.frame++
        }  else {
          hasLogo4Completed = true
      
        }    
      }
    }
    
    ctx.save()
 
    if(cloud_a.shouldUpdate(loopInterval)) {
      updateSky = true

      cloud_a.rd.pos.x += cloud_a.ad.default.step
      if(cloud_a.rd.pos.x > geo.clientRect.w) {
        cloud_a.rd.pos.x = (0 - cloud_a.rd.dimensions.w)
      }

      cloud_a.ad.default.lastAnimatedStep = loopInterval
    }

    if(cloud_b.shouldUpdate(loopInterval)) {
      updateSky = true

      cloud_b.rd.pos.x += cloud_b.ad.default.step
      if(cloud_b.rd.pos.x > geo.clientRect.w) {
        cloud_b.rd.pos.x = (0 - cloud_b.rd.dimensions.w)
      }

      cloud_b.ad.default.lastAnimatedStep = loopInterval
    }

    if (updateSky || !hasLogoCompleted) {
      ctx.save()
      logo.update(loopInterval)
      ctx.restore()
      ctx.save()
      cloud_a.update(loopInterval)
      ctx.restore()
      ctx.save()
      cloud_b.update(loopInterval)
      ctx.restore()
      ctx.save()
      github.update(loopInterval)
      ctx.restore()
      ctx.save()
      about.update(loopInterval)
      ctx.restore()
    }
    
   

    if(!hasLogo4Completed || startLoading || LOADING) return
    
    // DRAGON
    if(dragon.shouldUpdate(loopInterval, 'body')) {
     
      if(!dragonStopped) {
       
        let newH, newV

        if(dragon.ad.body.hDirection === EBBDirection.Left) {
          newH = dragon.rd.pos.x - dragon.ad.body.step

          if(newH < dragonBounds.l) {
            
            dragon.ad.body.hDirection = EBBDirection.Right
            dragon.rd.pos.x += dragon.rd.dimensions.w/geo.scale
          } else {
            dragon.rd.pos.x -= dragon.ad.body.step
          }

        } else {
          newH = dragon.rd.pos.x + dragon.ad.body.step
          
          if(newH < dragonBounds.r) {
         
            dragon.rd.pos.x += dragon.ad.body.step
          } else {
            dragonStopped = true
            dragonStopFrame = loopInterval
          }
        }
             
        if(dragon.ad.body.lastVDirection === EBBDirection.Up) {
          dragon.rd.pos.y += dragon.ad.body.step
          dragon.ad.body.lastVDirection = EBBDirection.Down
        } else {
          dragon.rd.pos.y -= dragon.ad.body.step
          dragon.ad.body.lastVDirection = EBBDirection.Up
        }
        
        dragon.ad.body.lastAnimatedStep = loopInterval
        dragon.shouldMove = true
      }

      
      if(dragonStopped && loopInterval > dragonStopFrame + dragonDelay) {

        dragon.shouldBreathe = true
        dragonStopFrame = loopInterval

        pressContinue.render(s.pressContinue.rd)
        clickBounds['continue'] = { 
          l: s.pressContinue.rd.pos.x, 
          r: (s.pressContinue.rd.pos.x + (s.pressContinue.rd.dimensions.w)),
          t: s.pressContinue.rd.pos.y,
          b: (s.pressContinue.rd.pos.y + (s.pressContinue.rd.dimensions.h)),
        }
        
      }
      
      
      if(dragonStopped && loopInterval > dragonStopFrame + deadDelay) {

        if(hero.dead) return
        hero.dead = true
        hero.update(loopInterval)
        
        
      }

      if(hero.dead && loopInterval > herodeadStopFrame + fallDelay) {
        if(hero.deadIteration < 20) {
          
          hero.update(loopInterval)
          herodeadStopFrame = loopInterval
          deadIteration = hero.deadIteration += 1

        }
        
      }
      
    }
  
    dragon.update(loopInterval)


    

    ctx.restore()

    
  }

  window.setTimeout(() => {
    loopInterval = requestAnimationFrame(animloop)
  }, 250)
  
}

