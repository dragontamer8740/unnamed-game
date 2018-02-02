/*
 *  This file is part of The Unnamed Game.
 *
 *  The Unnamed Game is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with The Unnamed Game.  If not, see <http://www.gnu.org/licenses/>.
 */

function setupScreen()
{
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

/* Since I won't use JQuery, I can do this for shorthand to access output */
function $()
{
  return document.getElementById("stdout");
}

function write(str)
{
  $().innerHTML=str;
}

function append(str)
{
  $().innerHTML+=str;
}

function mainMenu()
{
  write("Hello world! This text was generated and placed by Javascript! :O ...well, it's a start, anyway. Now I technically have a backend and can write arbitrary text to the main output form. And look, it even wraps!\n\nNewlines work too!\n\n    And indentation as well!\n\nNow if only I could find a nicer color scheme for legibility that wasn't black on white or white on black.\nAll of this output so far was printed with the write() function!");
  append("\n\nThis text was appended with a separate function intended for tacking on strings: append()!")
  append("\n\nTesting some text effects!\n<b>BAM</b>\n<i>Pow!</i>\n<red>Zoom!</red> <blue>fizz!</blue>\n<yellow>Snap!</yellow> <orange>Crackle!</orange> <pink>Pop!</pink>(tm)\n<b><i><purple>SMAAAASH!</purple></i></b>\n\n\n<white>If you can read this, you don't need glasses.</white>");
}

function main()
{
  setupScreen();
  mainMenu();
}
