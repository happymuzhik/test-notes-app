# Explanation and description

## Overview and build

My idea was to finish the task as fast as possible without using any libraries.
So i didn't use any build tool like webpack or gulp. You can find my webpack settings snippet in another repo if needed.

## Structure

My first thoughts were to make something based on events and subscribtions. But then i realized it will need some workaround, so
i decided to use kind of very simple mvc. It allows to try different solutions for view part, and taking less time.
But it is less scalable and more messy of course. In the end i didn't like my idea, but it works.
You can find model in js/model.js, views in js/view.js and kind of controller in index.js.
Other js files are mostly for utils needs, like handling drag'n'drop and so on.

## UI

I decided not to use React or any other library. It was interesting to me because last time i didn't use any ui framework is about 4 years ago.
I like the idea of using links to handle html nodes.
May be better solution was to use string interpolation to handle html layout, and rendering part could be shorter.

I was deciding between canvas and nodes implementation and my choice was - nodes. It is just faster for me. But don't see any problems with canvas. Only view rendering part can be changed.

## UX

It wasn't in my plans but UI is looking like an old Winamp :) May be editing should start by clicking on the note, but in this case it will be a bit more uncomfortable to select text. So i decided to use buttons to edit and remove notes.

## Conclusion

My main focus was on functionality and time. So my solutions are based on that.
Also it is always an intersting experience to code without any framework.
All work took about one working day.

P.S.
Please show me that guy who can make this task in 3 hours. I guess typing all this strings on a keybord non stoping can take more time :)
