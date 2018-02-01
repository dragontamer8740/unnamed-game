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

function main()
{
  setupScreen();
}
