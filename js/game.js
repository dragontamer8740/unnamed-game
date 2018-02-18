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

var game = {
  daysPlayed:    0,
  timeMinutes:   0,  /* goes from 0 to 1339. (60*24=1400)*/
  get dayOfWeek () {   /* function to get the day of the week. 0-6, Monday to
                          Sunday. */
    return ( this.daysPlayed % 7 );
  },
  playerPosition: 0, /* placeholder */
  gameFlags: {
    /* game flags go here */
  },
};
