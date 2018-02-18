# Unnamed Game
An experimental HTML5, CSS3, and JavaScript-based text game interface which may
eventually also have a real game attached to it.

Currently "playable," in so far as a gameless half-done engine can be played,
at [https://dragontamer8740.github.io/unnamed-game/](https://dragontamer8740.github.io/unnamed-game/).

It's licensed under GPLv3, but I am not too religiously attached to the license,
so I may change it to something else if people ask. Please note that whatever
form it takes, it shall remain free (and open-source) software (at the very
least in any version I am responsible for).

As of now, it does not have any external dependencies or need any build scripts.
It does not use node.js, nor does it use any other "helper" libraries.
It's just pure hand-written Javascript, and I am hoping that this will make the
game perform better and take less space, as well as being easier for anyone
who uses Javascript to contribute to (no need to learn node, which is basically
another language).

The tradeoff here is that it currently doesn't render properly in
Microsoft Internet Explorer 11 or "Edge." Edge is nearly there, but it fails to
properly render right-aligned text in SVG graphics I'm using for status bars.
IE 11 fails miserably.

It works best in and is primarily developed targetting Firefox and related
(gecko-based) browsers such as Seamonkey, Pale Moon, and Waterfox. It should
be functional in Chrome/Chromium and other Blink-based browsers like Opera, too.

It is not yet tested in newer versions of normal WebKit (Safari), but that will
change once WebKitGTK is finished compiling here. All I can say for now is that
it definitely doesn't render properly in the version of Safari shipped with iOS
8 or Safari 6.0.5 (OS X Mountain Lion - 10.8), but it works fine in Android
Firefox and Chrome/Chromium.

If it works well in newer Safari, it should also render in all other
browsers on iOS, since Apple forces them all to use its WebKit engine.
