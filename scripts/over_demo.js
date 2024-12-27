

function over_demo_panel(name,bullet_points=[],buttons={}) {
  window.odemo_bg_vis = true
  window.odemo_logo_vis = true
  window.odemo
  window.odemo_logo

  document.getElementsByTagName('body')[0].innerHTML += window.over_demo_html

  window.odemo_logo = document.getElementById('logo');
  odemo_toggle_controls();
}

window.over_demo_html = `
<button id="controlz" class="control_icon" onclick="odemo_toggle_controls();">🠻🠻</button>
<div id="odemo_controls" class="controls">
  <button onClick="" class="toggle"><label for="odemo_bgt"><input type="checkbox" id="odemo_bgt" checked="true" onclick="odemo_toggle_bg();">🗔</label></button>
  <button onClick="" class="toggle"><label for="odemo_logt"><input type="checkbox" id="odemo_logt" checked="true" onclick="odemo_toggle_logo()">🖾</label></button>
<br>
  <button onClick="" class="toggle"><label for="odemo_vol"><input type="checkbox" id="odemo_vol" checked="true" onclick="op.audio_toggle();">🕪</label></button>
  <button onClick="stop()" class="toggle" style="color:red;">🛑</button>
<br>
  <div id="odemo_buttons" name="odemo_buttons"></div>
</div>
<div id="odemo_logo" class="logo" style="opacity:0.8;z-index:9999;">
<p class="rsyellow">OverPuzzle 0.92 by <a href="http://www.roguesignal.io" target="_BLANK_">RogueSignal.IO</a> | <a href="https://github.com/roguesignalio/overPuzzle" target="_BLANK_" id="readme">Git Project</a></p>
<img src="assets/RogueSignal_FullLogo.svg" style="width:350px;"/>
<p>
<ul id="details" class="details">
  <li> OverPuzzle provides a way to build some quick image based puzzle games.
  <li> Using callbacks, can be integrated with any client or server side app.
  <li> Submit moves or solutions to server to trigger backend checking/winning behavior.
  <li> Uses plugin architecture
  <li> Built on lexible game glasses, making it easy to build new puzzle types on.
  <li> Provides simple audio integration and control.
  <li> Simple to use in any Javascript or Web page.
  <li> Uses and makes available full power of <strong>PhaserJS</strong> scenes. (PhaserJS 3.55 to 3.85 tested)
  <li> Instant intergration with <strong><a href="https://github.com/RogueSignalio/overGrowl" target="_BLANK_">OverSound</a></strong> by <a href="http://www.roguesignal.io" target="_BLANK_">RogueSignal.IO</a>
  <li> Demo uses  <strong><a href="https://github.com/RogueSignalio/overGrowl" target="_BLANK_">OverGrowl</a></strong> by <a href="http://www.roguesignal.io" target="_BLANK_">RogueSignal.IO</a>
  <li> Audio sourced from: <a href="http://pixabay.com" target="_BLANK_">Pixabay</a>
  <li> Images generated with Microsoft Bing 'Image Creator'  
<ul>
</div>
<!-- <div style="">
<div id="overpuzzle" name="overpuzzle" class="overpuzzle"></div>
</div>
 -->

`

// window.onload = function() {
// }

function odemo_cleanup() {
  // op.growler.clearGrowls() 
  window.odemo.growler.clearGrowls() 
  logo_off()
}

function odemo_show_info(info) {
  setTimeout(() => { window.odemo.growler.thinking(info) },1000)
}

function odemo_stop() {
  cleanup()
  window.odemo.stop()
  logo_on()
}

function odemo_toggle_controls() {
  let controls = document.getElementById('odemo_controls');
  if (controls.style.visibility == "hidden" || controls.style.visibility == "") {
    controls.style.visibility = "visible";
  } else {
    controls.style.visibility = "hidden";
  }
}

function odemo_toggle_bg() {
  if ( window.odemo_bg_vis == true) { document.body.style.backgroundImage = 'none';  window.odemo_bg_vis = false; }
  else { document.body.style.backgroundImage = "url('https://roguesignalio.github.io/overBase/roguesignal_bg.png')";  window.odemo_bg_vis = true; }
}

function odemo_toggle_logo() {
  document.getElementById('odemo_logo').style.visibility =  window.odemo_logo_vis ? odemo_logo_off : odemo_logo_on
   window.odemo_logo_vis = window.odemo_logo_vis ? false : true
}

function odemo_logo_off() {
  document.getElementById('odemo_logo').style.visibility = "hidden"
  document.getElementById('odemo_logt').checked = false 
  window.odemo_logo_vis = false
}
function odemo_logo_on() {
  document.getElementById('odemo_logo').style.visibility = "visible"
  document.getElementById('odemo_logt').checked = true   
  window.odemo_logo_vis = true
}

