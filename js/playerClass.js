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

/* create the player object. */
var player = {
  /* member variables/functions:
   * name: The player's first name.
   * lName: The player's last name.
   * age: the player's age. At least 18, because I don't want any trouble.
   * sex: Biological sex. One of 'M', 'F', 'H', or 'N':
   *   M: Male, F: Female, H: Hermaphrodite, N: Neutered/Neutral
   * gender: How the player identifies. Same as biological sex by default.
   *   uses the same letter mapping as 'sex.'
   *   (No, I am not being "PC" with this option, just having a little respect
   *   for other human beings. If this 'triggers' your autism, deal with it.)
   * stats: nested object containing the stats of the player.
   *   |
   *   |--> level:    Level
   *   |--> exp:      Experience Points
   *   |--> HPMax:    Maximum HP
   *   |--> HPCurr:   Current HP
   *   |--> str:      Strength
   *   |--> acc:      Accuracy
   *   |--> def:      Defense
   *   |--> int:      Intelligence
   */
  name:      "Player",
  lName:     "McPlayerson",
  age:       "18",
  sex:       "N",
  gender:    "N",
  money:     "400",
  stats:   {
    level:    "1",
    exp:      "42",
    HPMax:    "100",
    HpCurr:   "62",
    str:      "73",
    acc:      "93",
    def:      "37",
    int:      "98",
    /* getters are apparently a new-ish thing in JS. Trying it out! */
    get XPToNextLevel () {
    /*XPToNextLevel: function()
    {*/
      /* TO BE IMPLEMENTED */
      /* To start, I'm just gonna say that levelling takes
         (your current level times 100) XP. Level 1: 100xp, 2: 200xp, etc. */
      return (this.level * 100);
    }
  },
};

