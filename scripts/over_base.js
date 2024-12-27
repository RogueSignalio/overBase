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
    this.engine = engine
    if (this.engine == null) {
      this.engine = this.new_engine(ph_config)
    }

    this.over_load_js = {} // Holds loaded JS file names
    this.over_load_queue = [] // 
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
