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
      z_index: 10001,
      ...config
    }

    if (this.config.parent == null) {
      this.config.parent = 'overbase'
      var oo = document.createElement('div');
      oo.id = 'overbase'
      document.body.append(oo)
    }
    this.engine = engine
    if (this.engine == null) {
      this.engine = this.new_engine(ph_config)
    }

    this.over_load_queue = []
    this.over_loaded_js = [] 
    this.growler = null;
    this.loaded = []
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

 // Raise or lower to the z-index min or max layer
  to_front(zindex=this.config.z_index) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.focus(); this.engine.canvas.style.visibility = 'visible'; }
  to_back(zindex=(this.config.z_index*-1)) { this.engine.canvas.style.zIndex = zindex; this.engine.canvas.style.visibility = 'hidden'; this.engine.canvas.blur(); }

  load_js(name,onload=function(){}) {
    if (this.loaded_js[name]) return;
    const script = document.createElement('script');
    script.id = `${name}`;
    script.src = `${name}`;
    document.body.append(script);
    script.onload = ()=> { this.loaded_js[name] = true; onload.call(this); }
    console.log(`${name} loaded.`)
  }

  load_plugin(name,onload=null) {
    if (this.config.preload) { this.loaded_js[name] = true; }
    // else {
      if (this.plugins[name] != null) {
        this.load_script(this.plugins[name], ()=>{
          this.insert_plugin(name,onload)
        })
      }
      else { this.insert_plugin(name,onload) }
    // }
  }

  insert_plugin(name,onload=()=>{ }) {
    if (this.loaded_js[name]) {
      onload.call(this)
    } else {
      this.insert_script(`${name}.js`,`${this.config.modules_path}/${name}.js`,onload)
    }
  }

  insert_script(id,file,onload=()=>{ }) {
    if (this.loaded_js[name]) {
      onload.call(this)
    } else {
      let script = document.createElement('script');
      script.id = id
      script.src = file
      document.body.append(script);
      script.onload = ()=> { 
        this.loaded_js[id] = true; 
        onload.call(this);  
        this.config.debug && console.log(`${file} loaded.`); 
      }
    }
  }

  load_queue_add(tag,file) {
    if (this.over_load_queue[tag] == null) { this.over_load_queue[tag] = [] }
    this.over_load_queue[tag].push(file)
  }

  load_queue(tag,onload) {
    if ((this.over_load_queue[tag] == null) || (this.over_load_queue[tag].length <= 0)) { return null; }

    var file = this.over_load_queue[tag].shift()
    var id = file.split('/').pop().replace(/\W/g,'_')

    if (this.config.preload) { this.loaded_js[id] = true; }
    if (this.over_load_queue[tag].length > 0) {
      this.load_queue(tag, ()=>{
        this.insert_script(id,file,onload)
      })
    }
    else { this.insert_script(id,file,onload) }
  }

  // Kills the engine, scenes, and canvas.
  // Useful if you want to clean it up.
  kill() {
    this.engine.destroy(true, false)
  }

  random_integer(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;    
  }

  to_int(num) {
    return Math.floor(num)
  }
}
