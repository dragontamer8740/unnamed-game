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

function setupScreen()
{
  /* Clear screen of 'please enable javascript' text */
  write("");
  var saveSelBtn = document.getElementById("saveSelect");
  var saveOpt1 = document.createElement("option");
  var saveOpt2 = document.createElement("option");
  saveOpt1.value = "1";
  saveOpt1.text = "Slot 1";
  saveOpt2.value = "2";
  saveOpt2.text = "Slot 2";
  saveSelBtn.add(saveOpt1, null);
  saveSelBtn.add(saveOpt2, null);
}

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

function btn(num)
{
/* get button number "num"'s element and return it.*/
  var str="btn";
  return document.getElementById("btn"+num);
}

function hideButton(num)
{
  btn(num).style.display="none";
}

function showButton(num)
{
  btn(num).style.display="inline";
}

function setButtonText(num, value)
{
  btn(num).innerHTML=value;
}

function hideAllButtons()
{
  var i=1;
  while(i<=12)
  {
    hideButton(i);
    i++;
  }
}

function updateStatusBars()
{
  statBarSet("#HPBar", player.stats.HpCurr );
  statBarSet("#StrBar", player.stats.str );
  statBarSet("#AccBar", player.stats.acc );
  statBarSet("#DefBar", player.stats.def );
  statBarSet("#IntBar", player.stats.int );
  statBarSet("#expBar", player.stats.exp );
  document.getElementById("levelField").innerHTML=player.stats.level;
}

function statBarSet(id, num)
{
  /* "ID" is the svg's ID (like IntBar or StrBar). num is the value to set.
   * HP and experience bars are not on a 0-100 scale like the others, so
   * they have special cases.
   * Once I actually have a playable game, I might make all stats have no static maximum.
   */

  /* first, update the bars' values themselves: */
  var selectorString= id + " .bar";
  console.log(selectorString);
  if (id === "#HPBar")
  {
    document.querySelector(selectorString).setAttribute("width", ((parseFloat(num) / player.stats.HPMax) * 100).toString() + "%");

    /* then update numbers in bars: */
    selectorString += "Num"; /* barNum is the class for the numbers in the SVG's */
    document.querySelector(selectorString).innerHTML=(num + "/" + player.stats.HPMax);
  }
  else if (id === "#expBar")
  {
    var num1 = parseInt(( parseFloat(num) / (parseFloat(player.stats.XPToNextLevel())) * 100));
    document.querySelector(selectorString).setAttribute("width", num1.toString() + "%");

    /* then update numbers in bars: */
    selectorString += "Num"; /* barNum is the class for the numbers in the SVG's */
    document.querySelector(selectorString).innerHTML=(num + "/" + player.stats.XPToNextLevel());    
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

function mainMenu()
{
  showButton(1, true);
  setButtonText(1, "New Game");
  write("<center><b>The Unnamed Game</b></center>");
  append("\nHello world! This text was generated and placed by Javascript! :O ...well, it's a start, anyway. Now I technically have a backend and can write arbitrary text to the main output form. And look, it even wraps!\nNewlines work too!\n    And indentation as well!\n\nNow if only I could find a nicer color scheme for legibility that wasn't black on white or white on black.\nAll of this output so far was printed with the write() function!");
  append("\nThis text was appended with a separate function intended for tacking on strings: append()!")
  append("\n\nTesting images:\n");
  appendImg("img/test.png");
  append("\n\nTesting some text effects!\n<b>BAM</b>\n<i>Pow!</i>\n<red>Zoom!</red> <blue>fizz!</blue>\n<yellow>Snap!</yellow> <orange>Crackle!</orange> <pink>Pop!</pink>(tm)\n<b><i><purple>SMAAAASH!</purple></i></b>\n<white>If you can read this, you don't need glasses.</white>");
}

function main()
{
  setupScreen();
  mainMenu();
  updateStatusBars();
}
