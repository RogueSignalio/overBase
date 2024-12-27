/*===========================================================================
OverBase - a javascript library of re-used components for many Rougue Signal
"Over" libraries.

Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2024
License: MIT
---------------------------------------------------------------------------
See README
===========================================================================*/

class OverBase {
  constructor (config={},ph_config={},engine=null) {
    this.config = {
      debug: false,   // Turns debug console logs on.  Currently un-used
      preload: false, // Disable dynamic loading of libraries.  They must be bundled or preloaded in some other fashion!
      width: window.innerWidth,   // Game engine width in pixels
      height: window.innerHeight, // Game engine height in pixels
      audio_engine: null,         // Provide a compatible audio engine, such as an instance of overAudio
      background: '0x000000',     // Background color, if visible
      transparent: true,          // Transparent or not background
      // parent: 'overpuzzle',
      z_index: 10001,
      ...config
    }

    this.engine = engine
    if (this.engine == null) {
      this.engine = this.new_engine(ph_config)
    }

    this.over_load_js = {} // Holds loaded JS file names
    this.over_load_queue = [] // 
    this.growler = null;
  }

  new_engine() {
    let conf = {
      type: Phaser.AUTO,
      width: this.config.width || window.innerWidth,
      height: this.config.height || window.innerHeight,
      transparent: this.config.transparent, 
      backgroundColor: this.config.background,
      parent: this.config.parent,
      canvasStyle: "z-index:-10000;visibility:hidden;",
    }
    return new Phaser.Game(conf);
  }

  over_load_js(name,onload=function(){}) {
    if (this.over_loaded_js[name]) return;
    const script = document.createElement('script');
    script.id = `${name}`;
    script.src = `${name}`;
    document.body.append(script);
    script.onload = ()=> { this.over_load_js[name] = true; onload.call(this); }
    console.log(`${name} loaded.`)
  }


  over_chainload_js(files,onload=function(){}) {

  }

  over_load_add(file) {
    window.over_load_queue  
  }

  over_load_queue_next() {

  }
  over_load_queue(onload) {

  }

  random_integer(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;    
  }

  to_int(num) {
    return Math.floor(num)
  }
}
