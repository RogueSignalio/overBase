/*===========================================================================
overDemo - Javascript, css, and assets for "over[X]" demo building.

Authors: BlackRogue01
Copyright: RogueSignal.io, wwww.roguesignal.io, 2024
License: MIT
---------------------------------------------------------------------------
See README
===========================================================================*/
function over_demo_panel(name,version=1,gitproject,bullet_points=[],buttons={}) {
  window.odemo_bg_vis = true
  window.odemo_logo_vis = true
  window.odemo
  window.odemo_logo
  window.odemo_buttons = []
  document.title = `${name} - RogueSignal.io`
  over_demo_html = `
  <button id="odemo_control_button" class="control_icon" onclick="odemo_toggle_controls();">⮝⮝</button>
  <div id="odemo_controls" class="controls">
    <button onClick="" class="toggle"><label for="odemo_bgt"><input type="checkbox" id="odemo_bgt" checked="true" onclick="odemo_toggle_bg();">🗔</label></button>
    <button onClick="" class="toggle"><label for="odemo_logt"><input type="checkbox" id="odemo_logt" checked="true" onclick="odemo_toggle_logo()">🖾</label></button>
  <br>
    <button onClick="" class="toggle"><label for="odemo_vol"><input type="checkbox" id="odemo_vol" checked="true" onclick="op.audio_toggle();">🕪</label></button>
    <button onClick="odemo_stop()" class="toggle" style="color:red;">🛑</button>
  <br>
    <div id="odemo_buttons" name="odemo_buttons"></div>
  </div>
  <div id="odemo_logo" class="logo" style="opacity:0.8;z-index:9999;">
  <p class="rsyellow">${name} (${version}) <a href="http://www.roguesignal.io" target="_BLANK_">RogueSignal.IO</a> | <a href="https://github.com/roguesignalio/${gitproject}" target="_BLANK_" id="readme">Git Project</a></p>
  <img src="https://cdn.jsdelivr.net/gh/RogueSignalio/overBase/assets/RogueSignal_FullLogo.svg" style="width:350px;"/>
  <p>
  <ul id="odemo_details" class="details">
  <ul>
  </div>
  `

  // document.body.innerHTML += over_demo_html
  document.body.insertAdjacentHTML('beforeend', over_demo_html)
  for (const detail in bullet_points) { odemo_add_detail(bullet_points[detail]) }
  Object.keys(buttons).map(function(v) { 
    odemo_add_button(v,buttons[v])
  })

  window.odemo_logo = document.getElementById('logo');
  odemo_toggle_controls();
  window.odemo_growler = odemo_growler()
}

function odemo_add_button(text,onclck=null) {
  var d = document.createElement('button')
  d.innerHTML = text
  d.id = `odemo_button_${text.replace(/\W/g,'_')}`
  d.name = d.id
  d.setAttribute('onClick', onclck) ; //"console.log('Clicked "+text+"');");//  }
  document.getElementById('odemo_buttons').appendChild(d)
  document.getElementById('odemo_buttons').innerHTML += '<br>'
//  console.log(`odemo_button_${d.id}`)
}

function odemo_add_detail(detail) {
  let d = document.createElement('li')
  d.innerHTML = detail
  document.getElementById('odemo_details').appendChild(d)
}


function odemo_cleanup() {
  // op.growler.clearGrowls() 
  window.odemo_growler.clearGrowls() 
  logo_off()
}

function odemo_show_info(info) {
  window.odemo_growler.thinking(info)
}

function odemo_growl(msg) { window.odemo_growler.success(msg) }

function odemo_growler() {
  let og = new OverGrowl({
    public: 'growler2',
    z_index:20000, unique: true, close_button: false, duration: 4000, fade: 500, inline:false,
    offset_x: 0,
    css:`
        #growler2-parent{
        grid-row-gap: 1px;
        opacity: 1;
          // background-color: #00000077;
          border-radius: 15px;
          left: 10px;
          width: 300px;
        }
    `
  });
  og.add_type('thinking',{ duration: 5000, fade: 1500 },`
    border-color: rgb(60, 60, 80);
    background-color: #000000;
    color: #DDDDDD;
  `,`
    width: 30px;
    height: 30px;
    background-image: url('https://cdn.jsdelivr.net/gh/RogueSignalio/overGrowl/assets/overgrowl-gear.png');
    background-size: cover;      
  `)
  return og
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
    document.getElementById('odemo_control_button').innerHTML = '⮝⮝'
  } else {
    controls.style.visibility = "hidden";
    document.getElementById('odemo_control_button').innerHTML = '⮟⮟'
  }
}

function odemo_toggle_bg() {
  if ( window.odemo_bg_vis == true) { 
    document.body.style.backgroundImage = 'none';  
    window.odemo_bg_vis = false; 
  }
  else {
    document.body.style.backgroundImage = "url('https://roguesignalio.github.io/overBase/assets/roguesignal_bg.png')";  
    window.odemo_bg_vis = true; 
  }
}

function odemo_toggle_logo() {
  document.getElementById('odemo_logo').style.visibility =  window.odemo_logo_vis ? odemo_logo_off() : odemo_logo_on()
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

