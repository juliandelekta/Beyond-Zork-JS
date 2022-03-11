const NO_SLEEPS
 = PLTABLE(DUST, CRAB, VAPOR, DEAD, SKELETON
, ASUCKER, BSUCKER, CSUCKER);

const OFFERS
 = LTABLE(2, "Yours for only "
, "A rare bargain at "
, "I'd part with it for "
, "For you, just ");

const USED_OFFERS
 = LTABLE(2, "This used one's worth "
, "Used, it's worth about "
, "A used one like this goes for ");

var JUNGLE_DESCS
 = LTABLE(0
, [DESCRIBE_JD0, JD0_F]
, [DESCRIBE_JD1, JD1_F]
, [DESCRIBE_JD2, JD2_F]
, [DESCRIBE_JD3, JD3_F]);

const CITY_ENTRIES
 = LTABLE(2
, "The peace of the countryside is shattered"
, "Decrepit buildings close in on every side"
, "The road becomes noisy and crowded");

var FOREST_DESCS
 = LTABLE(0
, [DESCRIBE_F1, F1_F]
, [DESCRIBE_F2, F2_F]
, [DESCRIBE_F3, F3_F]
, [DESCRIBE_F4, F4_F]
, [DESCRIBE_F5, F5_F]
, [DESCRIBE_F6, F6_F]);

var RUIN_DESCS
 = LTABLE(0
, [DESCRIBE_RD0, RD0_F]
, [DESCRIBE_RD1, RD1_F]
, [DESCRIBE_RD2, RD2_F]
, [DESCRIBE_RD3, RD3_F]
, [DESCRIBE_RD4, RD4_F]);

const BRIDGE_TYPES
 = LTABLE(2
, "Clammy mist obscures your view of either end"
, "Your ears ring from the roar of water far below"
, "Both edges of the chasm are obscured in the clammy mist"
, "The deafening roar of water is giving you a headache");

const NOPEELS = PLTABLE(CLERIC, OWOMAN, SALT, COOK);


const AH_YESSES
 = LTABLE(2
, "Ah, yes! A "
, "That's a "
, "A "
, "Your basic "
, "Behold! A "
, "This is a ");

const MENU_LIST
 = [" Begin using a preset character    "
, " Select a preset character         "
, " Randomly generate a new character "
, " Create your own character         "
, " Quit "];

const SALT_DABS
 = LTABLE(2
, " dabs a bit more paint onto the canvas"
, " eyes his work critically"
, " touches up a spot on his painting"
, " pauses to squint at his handiwork");

const DARK_WALKS
 = LTABLE(2
, "stumble blindly ahead"
, "inch forward one step at a time"
, "feel your way onward");

const OWOMAN_SNORTS
 = LTABLE(2, "sniff", "laugh", "observe", "chuckle", "mutter");

const DARK_MOVINGS
 = LTABLE(2
, "You hear something move"
, "Something is moving around"
, "You hear a movement"
, "Something moves");

const URGRUE_GREETS
 = LTABLE(2
, "Welcome back"
, "Still alive? Impressive"
, "How nice of you to return");

const URGRUE_BYES
 = LTABLE(2
, "You'll be back,"
, "Leaving so soon?"
, "Do drop in again,");

const CHARLIST
 = PLTABLE(CONGREG, BABY, MAMA, MINX, DACT, CLERIC, UNICORN
, MAYOR, HUNTER, CONDUCTOR, SALT, COOK, OWOMAN);

const BUNNY_SPLITS
 = LTABLE(2, " divide once again"
, " are still dividing"
, " have divided once again"
, " continue to divide");

const OWOMAN_MOVES
 = LTABLE(2
, " dusts off the items in "
, " putters around behind "
, " polishes the top of "
, " leans against ");

const BANDIT_MUTTERS
 = LTABLE(2
, "The bandits chuckle among themselves"
, "\"Har!\" shouts a bandit, for no apparent reason"
, "One of the bandits winks at you");

const OWOMAN_EYES
 = LTABLE(2
, "eyeing you curiously"
, "keeping an eye on you"
, "watching every move you make");

const OUCHES
 = LTABLE(2, "Yow", "Ouch", "Oof");

const CRAB_ATTACKS
 = LTABLE(2, " closes in with its pincers"
, " gives you a nasty pinch"
, "'s pincers close in again"
, " pinches you hard");

const CRAB_MISSES
 = LTABLE(2
, "'s pincers barely miss your leg"
, " misses you again, but just barely"
, " feints sideways, pincers snapping"
, " barely misses you again"
, " snaps out with its pincers, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const RAT_ATTACKS
 = LTABLE(2, " closes in with its sharp teeth"
, " gives you a nasty bite"
, "'s teeth close in again"
, " bites you hard");

const RAT_MISSES
 = LTABLE(2
, "'s teeth barely miss your ankle"
, " misses you again, but just barely"
, " feints to one side, teeth snapping"
, " barely misses you again"
, " swipes out with its claws, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const SNIPE_HITS
 = LTABLE(2, " closes in with its sharp beak"
, " gives you a nasty peck"
, "'s beak closes in again"
, " pecks you hard");

const SNIPE_MISSES
 = LTABLE(2
, "'s beak barely misses your eye"
, " misses you again, but just barely"
, " feints to one side, eyes flashing"
, " barely misses you again"
, " swipes out with its beak, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const VAPOR_DOINGS
 = LTABLE(2
, " whispers an obscene secret in your ear"
, " giggles insanely"
, " darts around your head, just out of reach");

const VAPOR_LAUGHS
 = LTABLE(2
, "Giggling with glee"
, "Cackling with mischief"
, "Sniggering maliciously");

const VAPOR_TICKLES
 = LTABLE(2
, " tickles you in a sensitive place"
, " pokes you where you ought not to be poked"
, " infiltrates your naughty bits");

const VAPOR_SNEERS
 = LTABLE(2
, "Boo"
, "Nyeah, nyeah"
, "Cootchy-cootchy-coo"
, "Woo-woo-woo"
, "Nyuk, nyuk, nyuk");

const SPIDER_HITS
 = LTABLE(2, " closes in with its mandibles"
, " gives you a nasty sting"
, "'s mandibles close in again"
, " stings you hard");

const SPIDER_MISSES
 = LTABLE(2
, " tries to grab you with its mandibles"
, " misses you again, but just barely"
, " feints to one side, mandibles ready"
, " barely misses you again"
, " reaches out with its mandibles, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const SLUG_HITS
 = LTABLE(2, " squirts vile ichors at you"
, " gives you a nasty squirt"
, "'s squirt glands score a direct hit"
, " squirts you again");

const SLUG_MISSES
 = LTABLE(2
, " tries to squirt you with vile ichors"
, " poises itself for another squirt"
, " misses you again, but just barely"
, " feints to one side, squirt glands at the ready"
, " barely misses you again"
, " squirts out again, just missing you");

const WORM_HITS
 = LTABLE(2, " closes in with its fangs"
, " gives you a nasty bite"
, "'s fangs close in again"
, " strikes you hard");

const WORM_MISSES
 = LTABLE(2
, " tries to impale you with its fangs"
, " misses you again, but just barely"
, " feints to one side, fangs bared"
, " barely misses you again"
, " strikes out with its fangs, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const JAW_HITS
 = LTABLE(2, " closes in with its jaws"
, " gives you a nasty snap"
, "'s jaws close in again"
, " bites you hard");

const JAW_MISSES
 = LTABLE(2
, " tries to snap you with its jaws"
, " misses you again, but just barely"
, " feints to one side, jaws snapping"
, " barely misses you again"
, " strikes out with its jaws, just missing you"
, " strikes out at you, but misses"
, " poises itself for another strike");

const DEAD_HITS
 = LTABLE(2, " closes in with his ghostly blade"
, " gives you a nasty cut"
, "'s blade closes in again"
, " strikes you hard");

const DEAD_MISSES
 = LTABLE(2
, " tries to slice you with his ghostly blade"
, " misses you again, but just barely"
, " feints to one side, blade swinging"
, " barely misses you again"
, " strikes out with his blade, just missing you"
, " strikes out at you, but misses"
, " poises himself for another strike");

const GHOUL_HITS
 = LTABLE(2, " closes in with his spade"
, " gives you a nasty cut"
, "'s spade closes in again"
, " strikes you hard");

const GHOUL_MISSES
 = LTABLE(2
, " tries to brain you with his spade"
, " misses you again, but just barely"
, " feints to one side, spade swinging"
, " barely misses you again"
, " strikes out with his spade, just missing you"
, " strikes out at you, but misses"
, " poises himself for another strike");

const MISSES
 = LTABLE(2, "but miss"
, "missing by a hair"
, "nearly hitting it"
, "just barely missing");

const NO_MINX
 = PLTABLE([BYTE]
, IN_SPLENDOR, ON_BRIDGE, IN_SKY, APLANE
, NW_SUPPORT, SW_SUPPORT, SE_SUPPORT
, FOREST_EDGE, ON_TRAIL, ON_PEAK, IN_CABIN);