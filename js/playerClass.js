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
  name:    "Player",
  lName:   "McPlayerson",
  age:     "18",
  sex:     "N",
  gender:  "N",
  stats:   {
    level:    "1",
    exp:      "420",
    HPMax:    "100",
    HpCurr:   "62",
    str:      "73",
    acc:      "93",
    def:      "37",
    int:      "98",
    XPToNextLevel: function()
    {
      /* TO BE IMPLEMENTED */
      return 1000;
    }
  },
};

