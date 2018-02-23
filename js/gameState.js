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
  return btnBackup;
}

function setGameButtons(btnBackup)
{
  var i=0;
  while(i<btnBackup.length)
  {
    button[i].label=btnBackup[i].label;
    button[i].func=btnBackup[i].func;
    /* set 'enabled' state before 'visible' state because enabled will automatically
       make a button visible. */
    button[i].enabled=btnBackup[i].enabled;
    button[i].visible=btnBackup[i].visible;
    i++;
  }
}

function getGameTextBody()
{
  /* reminder: $() is the same as document.getElementById("stdout") */
  return JSON.stringify($().innerHTML)
}

function getGameData() /* game.js game object data */
{
  /* getters aren't impacted if you try to write over them (e.g., write 5 to
     dayOfWeek on restoration), because you aren't replacing the entire object
     this way. This makes it safe to restore objects in terms of their individual
     element values.

     Caveat: I'd imagine this might be somewhat trickier with button states and
     stuff, and I have a 'privData' object for the player to simplify things there
     by adding a layer of separation between setter functions and the values they
     set. 
  */
  var gameBackup={}; /* make the object */
  Object.keys(game).forEach(
    function(element)
    {
      gameBackup[element]=game[element];
    }
  );
  return gameBackup;
}

function setGameData(gameBackup)
{
  Object.keys(gameBackup).forEach(
    function(element)
    {
      game[element]=gameBackup[element];
    }
  );

}

function getPlayerData()
{
  var playerBackup={};
  Object.keys(player.privData).forEach(
    function(element)
    {
      playerBackup[element]=player.privData[element];
    }
  );
  /* playerBackup has a 'stats' sub-object we need to account for */
  /* make "stats" sub-object */
  playerBackup["stats"]={};
  /* iterate through its privData (raw data fields w/o getters/setters) */
  Object.keys(player.stats.privData).forEach(
    function(element)
    {
      playerBackup["stats"][element]=player.stats.privData[element];
    }
  );
  return playerBackup;
}

function setPlayerData(playerBackup)
{
  Object.keys(playerBackup).forEach(
    function(element)
    {
      if(element != "stats") { /* sub-objects have to be treated differently */
        player.privData[element]=playerBackup[element];
      }
      else if(element == "stats") /* not just 'else' b/c we might add more objects
                                     later (inventory for instance).
                                     Might be able to just do a loop for objects
                                     as opposed to specific names.
                                  */
      {
        Object.keys(playerBackup[element]).forEach(
          function(element2)
          {
            player[element].privData[element2]=playerBackup[element][element2];
          }
        )
      }
    }
  );
    updateStatusBars(); /* since we're using privData directly */
}

function getSaveDataJSON(prettify=false)
{
  /* optional parameter: 'prettify.' When not given or
     false, do not prettify JSON string (saves a bit of memory).
     When true, make the JSON string more human-readable.
  */
  /* gameObj is a kind of abstraction of the actual game which tidily contains
     all of the things we need to keep track of. It does not DIRECTLY mirror
     the internal game data structure; rather, it acts as a 'proxy' object
     which contains the values needed for the games' getters and setters
     to work properly. It's a little hacky.
  */
  var gameObj={
    player: getPlayerData(),
    game: getGameData(),
    button: getGameButtons(),
    gameText: JSON.parse(getGameTextBody())
  }
  if(prettify==0)
  {
    return JSON.stringify(gameObj);
  }
  else
  {
    return JSON.stringify(gameObj,null,2);
  }
}

function saveDataLocalStorage(slot)
{
  /* get save data as a JSON string, */
  /* store in "save slot" */
  localStorage.setItem("slot" + slot.toString(), getSaveDataJSON());
}

function loadDataLocalStorage(slot)
{
  loadSaveData( localStorage.getItem("slot"+slot.toString()) );
}

/* save file locally */
function saveAs(filename, data) {
  var blob = new Blob([data], {type: 'application/json'});
  if(window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else{
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    window.URL.revokeObjectURL(blob);
  }
}

function saveDataToFile(slot)
{
  /* slot determines the suggested filename */
  saveAs("slot"+slot.toString() + ".json",getSaveDataJSON(true) + "\n");
}

function loadSaveData(saveStr)
{
  /* deserialize JSON, set in-game buttons accordingly */
  var gameObj = JSON.parse(saveStr);
  /* restore button states */
  setGameButtons(gameObj.button);
  /* restore text window state */
  write(gameObj.gameText);
  /* restore game data */
  setGameData(gameObj.game);
  /* restore player data */
  setPlayerData(gameObj.player);
}
