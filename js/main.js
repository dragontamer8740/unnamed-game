/*
 *  This file is part of The Unnamed Game.
 *
 *  The Unnamed Game is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The Unnamed Game is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with The Unnamed Game.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * See index.html for the rest of the JS files used, since
 * Javascript doesn't have "include" functionality built-in.
 */

/*
 * keystroke to bring up the "game console" which allows viewing
 * documentation and lore as well as executing arbitrary javascript.
 * Hacker-friendly is my policy!
 */
var popOver="";
var shell;
var closeShellBtn;
var shellInput;
var lastState=[]; /* for more convenient exiting of menus ('back a page' buttons)*/
function shellClear() {
  /* erase shell output */
  shell.innerHTML=""
}
function shellWrite(str) {
  console.log(str);
  shell.innerHTML+=str;
}

function shellHelp()
{
  shellWrite("Hacker's shell\n");
  shellWrite("Wanna hack the game? Here's how you do it.\n");
  shellWrite("The shell has some specialized commands:\n");
  shellWrite("!clear\tclear shell. Javascript function name: shellClear()\n!help\tdisplay this message. Javascript function name: shellHelp()");
  shellWrite("\nIt also acts as a general-purpose Javascript evaluation console. To write to this shell, use <blue>shellWrite()</blue> instead of <blue>console.log()</blue>.");
/*  shellWrite("\nExample code to change the player's last name and print the new one to the shell:\n");*/
  shellWrite("\n\nInspired by things like the Quake console and <a href=" + '"' + "https://github.com/AlexNisnevich/untrusted" + '"' + ">this game</a>, as well as the MIT AI Lab's famous \"<a href=\"https://en.wikipedia.org/wiki/Incompatible_Timesharing_System\">ITS</a>\" operating system, which encouraged exploration & improving/breaking the system, and frowned on secret-keeping.\nOf course, your browser shell will be more convenient, but for mobile users, this is your lifeline.\n\n");
}

function toggleJSCon()
{
  if(popOver.style.display=="block")
  {
    hideShell();
  }
  else
  {
    showShell();
  }
}

function showShell()
{
  popOver.style.display="block";
  var shell=document.getElementById("textConsole-body");
  if(shell.innerHTML == "") /* first launch */
  {
    shellHelp();
  }
  shellInput.focus();
}

function hideShell()
{
  popOver.style.display="none";
}

/*window.onkeydown = function(event){
  var key = event.which || event.keyCode; 
  if(key == 120) { //f9
    event.preventDefault();
  }
}*/

/* keybinds */
/* prevent action on keydown */
window.onkeydown = function(event) {
  /*
   *  'which' works in FF, 'keyCode' works elsewhere. I'd use 'event.key'
   *  instead, but Safari doesn't support it yet (next release probably will.)
   *  --15 Feb 2018
   */
  var key = event.which || event.keyCode; 
/*  append("pressed: " + key + "\n");*/
  if(key==120)
  {
    event.preventDefault();
  }
}
/* Do custom action on keyup */
window.onkeyup = function(event) {
  var key=event.which||event.keyCode; /* two checks needed for compatibility */
  if(key==120) /* this procs whether or not the input focus is in a text
                * field */
  {
    event.preventDefault();
    toggleJSCon();
  }
  else if(document.activeElement.tagName != "INPUT" && popOver.style.display!="block")
  { /* other key shortcuts only work when we aren't in an input box
     * and the built-in console isn't active.
     */
    switch(key)
    {
      /* top button row
       * requires QWERTY to behave sensibly, sorry.
       * a US keyboard is assumed, but I think it will work for others
       * as well. */
      case 49: /* 1 */
        event.preventDefault();
        button[0].element.click();
      break;

      case 50: /* 2 */
        event.preventDefault();
        button[1].element.click();
      break;

      case 51: /* 3 */
        event.preventDefault();
        button[2].element.click();
      break;

      case 52: /* 4 */
        event.preventDefault();
        button[3].element.click();
      break;

      case 53: /* 5 */
        event.preventDefault();
        button[4].element.click();
      break;

      case 54: /* 6 */
        event.preventDefault();
        button[5].element.click();
      break;

      /* bottom button row */
      case 81: /* q */
        event.preventDefault();
        button[6].element.click();
      break;

      case 87: /* w */
        event.preventDefault();
        button[7].element.click();
      break;

      case 69: /* e */
        event.preventDefault();
        button[8].element.click();
      break;

      case 82: /* r */
        event.preventDefault();
        button[9].element.click();
      break;

      case 84: /* t */
        event.preventDefault();
        button[10].element.click();
      break;

      case 89: /* y */
        event.preventDefault();
        button[11].element.click();
      break;
    }
  }
}


/* array of button objects - the glue logic which maps the buttons to
   arbitrary functions.*/
var button = [];
function makeButtons() /* Called by main() right after setupScreen(). */
{
  for(var i=0; i <= 11; i++) /* loop to create all button 'objects' */
  {
    var j = i.toString(); /* have to do this to not have all the buttons point
                             to #11 */
    var tempButton = {
      num: parseInt(j),
      get element() { return document.getElementById("btn" + this.num)},
      set label(val) {
        this.element.innerHTML = val;
      },
      get label() {
        return this.element.innerHTML;
      },
      func: "",
      set visible(val) {
        /* also disables the button when invisible/disables it when true
           technically this is redundant, but it makes managing a tri-state
           button a lot easier.
           (invisible, visible-enabled, visible-disabled)
           This function should therefore only be used directly to make
           a button invisible; rely on set enabled otherwise (which also
           makes the button visible)
        */
        if(val==false)
        {
          this.element.style["display"]="none";
          /* we can't just use the 'enabled' getter here because it makes
             this recursive */
          this.element.disabled=!val;
        }
        else if(val==true)
        {
          /* making a button visible like this always will make it enabled.
             this is why the 'enabled' setter should be used instead.*/
          this.element.style["display"]="inline";
          this.element.disabled=!val;
        }
        else
        {
          console.log("Passing a non-true/false value to setVisible()! - Button number: " + this.num);
        }
      },
      set enabled(val) {
        /* also enables visibility when set. No point in doing them
           separately, that's just more to keep track of and remember */
        if(val==true)
        {
          /* also set visibility */
          this.element.style["display"]="inline";
          /* the game uses inverse logic from HTML
             (enabled=true, disabled=false */
          this.element.disabled=!val;
        }
        else if(val==false)
        {
          this.element.style["display"]="inline";
          this.element.disabled=!val;
        }
        else
        {
          console.log("Passing a non-true/false value to setEnabled()! - Button number: " + this.num);
        }
      },
      get enabled() {
        if(this.element.disabled != undefined && this.element.disabled != false)
        {
          return false;
        }
        else
        {
          return true;
        }
      },
      get visible() {
        if(this.element.style["display"] == "none" || this.element.style["display"] == "")
        {
          return false;
        }
        else
        {
          return true;
        }
      }
    }
    button[i] = tempButton;
    /*    button[i].element.addEventListener("click", function(){eval(button[j].func)}, false);*/

    /* Add event listeners for button clicks (which evaluate the expressions
       stored as a string in button[i].func) */

  }
}

/* Gentlemen, I present the eval(). Please suggest alternatives if you've got better ones. */
function doButtonAction(num)
{
  eval(button[num].func);
}

function bindButtons()
{
  var i=0;
  while(i<=11)
  {
    /* FIXME: sorry, I know I shouldn't need this eval, but I'm having a lot of trouble preventing
       this loop from binding all buttons to button 11's action. */
    eval("button[" + i.toString() + "].element.addEventListener(\"click\", function(){doButtonAction(" + i.toString() + ")}, false);");
    i++;
  }
}

/* populate button array with button objects */
function setupScreen()
{
  popOver=document.getElementById("textConsole");
  shell=document.getElementById("textConsole-body");
  shellInput =  document.getElementById("textConsole-inputLine");
  shellInput.addEventListener("keyup",function(event){
    /*if enter key was pressed and shell is visible*/
    if(event.keyCode==13 && shellInput.style.display != "none")
    {
      var cmd = shellInput.value; /* so it doesn't change while we're working on it */
      if(shellInput.value != "")
      {
        shellWrite("&gt; " + cmd + "\n");
        try
        {
          /* custom commands are prefixed with '!'*/
          if(cmd == "!clear" || cmd == "!cls")
          {
            shellClear();
          }
          else if(cmd == "!help")
          {
            shellHelp();
          }
          else
          {
            /* evaluate the string as Javascript, saving return value for printing*/
            var rtnval=eval(cmd);
            if(rtnval !== undefined)
            {
              shellWrite(rtnval);
            }
            shellWrite("\n");
          }
        }
        catch(e)
        {
          shellWrite("<red>" + e.toString() + "</red>\n");
          /*
           *  keep input since we don't have a "previous command navigation" thing working yet
           *  (up arrow)
           */
        }
      }
      /* scroll to end of output */
      shell.scrollTop = shell.scrollHeight;
    }
  });
  document.getElementById("closeShell").addEventListener("click", hideShell, false);
  /*  closeShellBtn=document.getElementById("closeShell");*/
  /*  closeShellBtn.onclick = hideShell(); */ /* close shell on close button click */
  document.getElementById("settings").addEventListener("click", settingsMenu, false);
  document.getElementById("btnFullScreen").addEventListener("click", fullScreen, false);
  document.getElementById("btnJSCon").addEventListener("click", toggleJSCon,false);
  var textConsoleBg=document.getElementById("textConsole");
  textConsoleBg.addEventListener("click",function(event) {
    if(event.target == textConsoleBg || event.target == document.querySelector("popovercontainer"))
    {
      toggleJSCon();
    }
  },false);

  /* Clear screen of 'please enable javascript' text */
  write("");
  /* Populate combo box */
  var saveSelBtn = document.getElementById("saveSelect");
  var saveOpt1 = document.createElement("option");
  var saveOpt2 = document.createElement("option");
  saveOpt1.value = "1";
  saveOpt1.text = "Slot 1";
  saveOpt2.value = "2";
  saveOpt2.text = "Slot 2";
  saveSelBtn.add(saveOpt1, null);
  saveSelBtn.add(saveOpt2, null);

  /* Save (to slot) button. See gameState.js */
  document.getElementById("save").addEventListener(
    "click",
    function(){
      saveDataLocalStorage(saveSelBtn.value);
    },
    false
  );

  /* Load (from slot) button. See gameState.js */
  document.getElementById("load").addEventListener(
    "click",
    function(){
      loadDataLocalStorage(saveSelBtn.value);
      /* probably need to error check this? We'll see.
         It's been a while since I worked on this codebase: */
      allowSaving();
      document.getElementById("settings").disabled=false;
    },
    false
  );

  /* "Save to File" button functionality. See gameState.js */
  document.getElementById("saveFile").addEventListener(
    "click",
    function(){
      saveDataToFile(saveSelBtn.value);
    },
    false
  );

  /* "Load from File" button functionality. See gameState.js */
  document.getElementById("loadFile").addEventListener(
    "click",
    function(){
      /* If you aren't a web dev, this is probably deep magic.
         You should just ignore this stuff. File uploading is a
         _mess_.
       */
      
      /* reset to null first for simplicity */
      document.getElementById("upload").value=null;
      /* trigger in a roundabout way */
      document.getElementById("upload").click();
      /* probably need to error check this? We'll see.
         It's been a while since I worked on this codebase: */
      allowSaving();
      document.getElementById("settings").disabled=false;
    },
    false
  );



  
}
/*  {
    element: document.getElementById("btn0"),
    label: "Button 0", // text on button
    func: "" // name of function to call, as a string. Yeah, if you're wondering, I'm using eval(). Muahaha.
  },
 }*/

/* Since I won't use JQuery (which uses '$()'), I can do this as shorthand to access output. */
function $()
{
  return document.getElementById("stdout");
}

/* erase all output and write a new page */
function write(str)
{
  $().innerHTML=str;
}

/* write to the output, preserving existing content. */
function append(str)
{
  $().innerHTML+=str;
}

/* append image with path str to output. Remember to use relative paths!*/
function appendImg(str)
{
  str="<img src=" + str + "></img>";
  $().innerHTML+=str;
}


function hideAllButtons()
{
  var i=0;
  while(i<12)
  {
    button[i].visible = false;
    i++;
  }
}

function disallowSaving()
{
  document.getElementById("save").disabled=true;
  document.getElementById("saveFile").disabled=true;
}

function allowSaving()
{
  document.getElementById("save").disabled=false;
  document.getElementById("saveFile").disabled=false;
}

function updateStatusBars() /* refresh status bars with current values */
{
  document.getElementById("playerName").innerHTML=player.name + " " + player.lName;
  statBarSet("#HPBar", player.stats.HPCurr );
  statBarSet("#StrBar", player.stats.str );
  statBarSet("#AccBar", player.stats.acc );
  statBarSet("#DefBar", player.stats.def );
  statBarSet("#IntBar", player.stats.int );
  statBarSet("#expBar", player.stats.exp );
  document.getElementById("levelField").innerHTML=player.stats.level;
  document.getElementById("moneyField").innerHTML=player.money;
}

function statBarSet(id, num) /* calculate stat bar widths and apply the results
                                to the status bar SVG's. */
{
  /* "ID" is the svg's ID (like IntBar or StrBar). num is the value to set.
   * HP and experience bars are not on a 0-100 scale like the others, so
   * they have special cases.
   * Once I actually have a playable game, I might make all stats have no static maximum.
   */

  /* first, update the bars' values themselves: */
  var selectorString= id + " .bar";
  if (id === "#HPBar")
  {
    document.querySelector(selectorString).setAttribute("width", ((parseFloat(num) / player.stats.HPMax) * 100).toString() + "%");

    /* then update numbers in bars: */
    selectorString += "Num"; /* barNum is the class for the numbers in the SVG's */
    document.querySelector(selectorString).innerHTML=(num + "/" + player.stats.HPMax);
  }
  else if (id === "#expBar")
  {
    var num1 = parseInt(( parseFloat(num) / (parseFloat(player.stats.XPToNextLevel)) * 100));
    document.querySelector(selectorString).setAttribute("width", num1.toString() + "%");

    /* then update numbers in bars: */
    selectorString += "Num"; /* barNum is the class for the numbers in the SVG's */
    document.querySelector(selectorString).innerHTML=(num + "/" + player.stats.XPToNextLevel);    
  }
  else
  {
    /* other stats are all out of 100 (as of now): */
    document.querySelector(selectorString).setAttribute("width", ((parseFloat(num) / 100) * 100).toString() + "%");
    /* then update numbers in bars: */
    selectorString += "Num"; /* barNum is the class for the numbers in the SVG's */
    document.querySelector(selectorString).innerHTML=num;
  }
}

function setMarginWidth(paddingWidth)
{ /* called from settings menu, adds padding to page for fullscreen on mobile devices. */
/*  var paddingWidth = document.getElementById("marginWidthSetting").value + "px";
  var container=document.getElementById("container");*/
  container.style["padding-left"]=paddingWidth;
  container.style["padding-right"]=paddingWidth;
}

function settingsMenu()
{
  /*
     this will be important once we are backing up the current game state for
     restoration when exiting the settings menu.

     Procedure idea:
     0) disable save/load state buttons & 'settings; button to avoid some
        complications.
     1) get content of main game output [$().innerHTML] and save it to a
        variable.
     2) get functions associated with the bottom buttons (if I make the buttons
        be represented by objects in Javascript, this will be easy enough. If I
        use a string to represent the function name to call, this becomes even
        easier, but this approach requires buttons to run eval() when executed.
        I know eval() is controversial, but I _think_ this is a valid use case
        when you put religion aside.

        Button format:
        |--label
        |--call   :   function name associated with the button
        |--state  :   enabled/disabled
        |--vis    :   visibility ("display: none;" for instance)
  */

  /* backup game state */
  lastState[0]=getSaveDataJSON(); /* save to a global variable we can pull from */

  /* gray out save buttons. Restoring the game from the settings menu will
     probably result in Bad Things. */
  disallowSaving();
  /* gray out settings button so it can't be pressed twice and cause the
     'last screen' to be the settings screen (this would make the game lose
     it's state, were it to happen.) */
  document.getElementById("settings").disabled=true;
  
  hideAllButtons();
  write("\n<b>Page margins:</b>");
  /* slider */
  append('\n<div class="slidecontainer" style="display:inline;"><input type="range" min="0" max="75" value="0" class="slider" id="marginRange" style="display:inline;"></div><div style="display: inline;" id="marginValue"></div>');
  /* dynamically set the slider's starting position to the currently set margin size */
/*  append('" class="slider" id="myRange" style="display:inline;"></div><div style="display: inline;" id="marginValue"></div>');*/
  append('\nSome devices (like phones) often have rounded corners on their screens which will be result in cropping the game when in full-screen. Use this to set margins past the beginning of the curve to avoid this.');
  var slider=document.getElementById("marginRange");
  var sliderValueField=document.getElementById("marginValue");
  var margins=document.getElementById("container");
  /* make slider keep its state persistent with the current margin values */
  if(margins.style["padding-left"] == "")
  {
    slider.value=0;
  }
  else
  {
    slider.value=parseInt(margins.style["padding-left"],10);
  }
  sliderValueField.innerHTML="<b>" + slider.value + "px</b>"
  slider.oninput = function() {
    var val = slider.value + "px"
    sliderValueField.innerHTML="<b>" + val + "</b>"
    setMarginWidth(val);
  }

  button[5].visible = true;
  button[5].label="Back";
  console.log(lastState);
  /* FIXME: I _really_ need to find some better way to store a "link" to a function in a
     serializable (saveable) way. */
  button[5].func="loadSaveData(lastState[0]); allowSaving(); document.getElementById(\"settings\").disabled=false;"; /* restore last state on 'back' button */
}

function fullScreen()
{
  var pageElement = document.querySelector("body");
  /* both prefixed and un-prefixed versions of fullscreen API supported */
  if((!document.fullscreen) && (!document.mozFullScreen) && (!document.webkitIsFullScreen) && (!document.msFullscreenElement))
  {
    /* enable full screen. Try all the usual API's */
    /* un-prefixed */
    if(pageElement.requestFullscreen)
    {
      pageElement.requestFullscreen();
    }
    else if (pageElement.mozRequestFullScreen)
    {
      pageElement.mozRequestFullScreen();
    }
    else if (pageElement.webkitRequestFullScreen)
    {
      pageElement.webkitRequestFullScreen();
    }
    else if (pageElement.msRequestFullscreen)
    {
      pageElement.msRequestFullscreen();
    }
  }
 else /* if not already in full screen: */
  {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  }
}


function mainMenu()
{
  allowSaving()
  document.getElementById("settings").disabled=false;
  write("<center><b>The Unnamed Game</b></center>");
  append('\nSource code is at: <a href="https://gitlab.com/dragontamer8740/unnamed-game">https://gitlab.com/dragontamer8740/unnamed-game</a>');
  append("\n\nDemo'ing buttons!\n Settings menu can now be returned from. Saving works too, even though there's not anything interesting to save yet.\nAlso I added keybindings for the button rows! :D - 123456 for the top row, qwerty for the bottom.");
  append("\n<img src='img/test.png'>");
  button[0].visible = true;
  button[0].label = "New Game";
  button[0].func="gameStart();";
}

function main()
{
  setupScreen(); /* initialize stuff. Sets up keybindings, shell (console),
                    save slot dropdown menu. */
  makeButtons(); /* create main game button objects */
  bindButtons(); /* some ugly hacks to bind buttons to button[x].func strings
                    eval'd into function calls. PLEASE SUGGEST ALTERNATIVES */
  mainMenu();    /* Main menu screen */
  updateStatusBars();
}
