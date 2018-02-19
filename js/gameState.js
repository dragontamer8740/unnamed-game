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


/* return JSON-serialized data regarding game state in a copy */
/* buttons, variables, player data, etc. */


/* These methods all pass values to each other in JSON format.
 * There's a bit of overhead here, but it makes thinking about
 * this stuff easier for me.
 */


/* JSON.stringify() fails on functions (like getters/setters),
* so just copy the values from the getters and assign them on restore. This
* effectively uses the existing button setters instead of overwriting them,
* but requires some custom code unfortunately.
*/
function getGameButtons()
{
  var btnBackup=[];
  var i=0;
  while(i<button.length)
  {
    btnBackup[i] = {
      /* don't need button num */
      /* don't need element name */
      label: button[i].label,
      func: button[i].func,
      visible: button[i].visible,
      enabled: button[i].enabled
    }
    i++;
  }
  return JSON.stringify(btnBackup);
}

function setGameButtons(btnBackup)
{
  var i=0;
  while(i<btnBackup.length)
  {
    button[i].label=btnBackup[i].label;
    button[i].func=btnBackup[i].func;
    button[i].visible=btnBackup[i].visible;
    button[i].enabled=btnBackup[i].enabled;
    i++;
  }
}


function saveData()
{
  /* gameObj is a kind of abstraction of the actual game which tidily contains
     all of the things we need to keep track of. */
  /* as of this writing, only tracks button state rather than everything */
  var gameObj={
    button: JSON.parse(getGameButtons())
  }
  return JSON.stringify(gameObj);
}

function loadData(saveStr)
{
  /* deserialize JSON, set in-game buttons accordingly */
  var gameObj = JSON.parse(saveStr);
  setGameButtons(gameObj.button);

}
