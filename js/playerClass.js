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
  privData: { /* "Private" data, e.g. the raw values that the getters and
                 setters manipulate. Stored "privately" so we can dynamically
                 update the stat bars and such
              */
    name:      "Player",
    lName:     "McPlayerson",
    age:       18,
    sex:       "N",
    gender:    "N",
    money:     400
    
  },
  /* Documentation: doc/playerClass.txt */
  get name() {
    return this.privData.name;
  },
  set name(str) {
    this.privData.name = str;
    updateStatusBars();
  },
  get lName()
  {
    return this.privData.lName;
  },
  set lName(str) {
    this.privData.lName = str;
    updateStatusBars();
  },
  get age()
  {
    return this.privData.age;
  },
  set age(num)
  {
    this.privData.age=parseInt(num);
    updateStatusBars();
  },
  get sex()
  {
    return this.privData.sex;
  },
  set sex(str){
    var tmp=str.toUpper(); /* case-insensitive */
    if(tmp == 'M' || tmp == 'F' || tmp == 'H' || tmp == 'N')
    {
      this.privData.sex=tmp;
    }
    else
    {
      shellWrite("<yellow>ERROR</yellow>: sex must be one of 'M', 'F', 'H', 'N'! Leaving unchanged. You supplied: " + tmp + " !");
    }
    updateStatusBars();
  },
  get gender()
  {
    return this.privData.gender;
  },
  set gender(str)
  {
    var tmp=str.toUpper(); /* case-insensitive */
    if(tmp == 'M' || tmp == 'F' || tmp == 'H' || tmp == 'N')
    {
      this.privData.gender=tmp;
    }
    else
    {
      shellWrite("<yellow>ERROR</yellow>: gender must be one of 'M', 'F', 'H', 'N'! Leaving unchanged. You supplied: " + tmp + " !");
    }
    updateStatusBars();
  },
  get money()
  {
    return this.privData.money;
  },
  set money(num)
  {
    this.privData.money=parseInt(num);
    updateStatusBars();
  },
  stats:   {
    privData: {
      level:    1,
      exp:      42,
      HPMax:    100,
      HPCurr:   62,
      str:      73,
      acc:      93,
      def:      37,
      int:      98,
    },
    /* getters are apparently a new-ish thing in JS. Trying it out! */
    get level(){return this.privData.level;},
    set level(num){
      this.privData.level = parseInt(num);
      updateStatusBars();
    },
    get exp(){return this.privData.exp;},
    set exp(num){
      this.privData.exp=parseInt(num);
      updateStatusBars();
    },
    get HPMax(){return this.privData.HPMax;},
    set HPMax(num){
      this.privData.HPMax = parseInt(num);
      updateStatusBars();
    },
    get HPCurr(){return this.privData.HPCurr;},
    set HPCurr(num){
      this.privData.HPCurr = parseInt(num);
      updateStatusBars();
    },
    get str(){return this.privData.str;},
    set str(num){
      this.privData.str = parseInt(num);
      updateStatusBars();
    },
    get acc(){return this.privData.acc;},
    set acc(num){
      this.privData.acc=parseInt(num);
      updateStatusBars();
    },
    get def(){return this.privData.def;},
    set def(num){
      this.privData.def = parseInt(num);
      updateStatusBars();
    },
    get int(){return this.privData.int;},
    set int(num){
      this.privData.int = parseInt(num);
      updateStatusBars();
    },
    get XPToNextLevel () {
      /* To start, I'm just gonna say that levelling takes
         (your current level times 100) XP. Level 1: 100xp, 2: 200xp, etc. */
      return (parseInt(this.level) * 100);
    },
  },
  body:   {
    privData: {
      /* body type ID's are stored somewhere else (to be done).
       * type 0 is human.
       */
      head: {
        type: 0,
        horns: 0,
        
      },
      arms: {
        type: 0,
      },
      hands: {
        type: 0,
      },
      torso: {
        type: 0,
      },
      legs: {
        type: 0,
      },
      feet: {
        type: 0,
      },
      breastRows: [],
        /* Inserted on game start. Template in objTemplates.js. */
      cocks: [],
        /* can be multiple cocks. Inserted on game start. Template in objTemplates.js. */
      vag: [],
        /* same as cocks */
    },
    get head() {
      return this.privData.head;
    },
    get arms() {
      return this.privData.arms;
    },
    get hands() {
      return this.privData.hands;
    },
    get torso() {
      return this.privData.torso;
    },
    get legs() {
      return this.privData.legs;
    },
    get feet() {
      return this.privData.feet;
    },
    get breastRows() {
      return this.privData.breastRows;
    },
    get cocks()
    {
      return this.privData.cocks;
    },
    get allCocks() { /* includes dicknipples, tail-cocks, whatever */
      /* make temporary object, add normal cocks to it right away */
      var rtn=[];
      /* loop through cocks */
      var i=0;
      while(i<this.privData.cocks.length)
      {
        rtn[i]=this.privData.cocks[i];
        i++;
      }
      /* add dicknipples to cocks */
      /* iterate through breast rows, find if any dicknipples are present. */
      var j=0; /* j is for iterating through breast rows. i contains the value to insert
                  the first dicknipple row at */
      while(j<this.privData.breastRows)
      {
        if(this.privData.breastRows[j].nipples.type==1)
        {
          rtn[i]=this.privData.breastRows[j].nipples.cock;
          rtn[i].row=j; /* add a field stating which breast row these dicknipples are on to our output */
          i++;
        }
        j++;
      }
      return rtn;
    },
    get vag() {
      return this.privData.vag;
    },
  },
};

