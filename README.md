# marsrover
Ironhack prework. Displays rover objects on a 10x10 board moving around and colliding with each other and rocks
To start the app:
1. Open index.html in Chrome
2. Open menu View -> Developer -> Javascript Console
3. In the console type in main() and press enter. The app will start.

to add or remove rovers and rocks
1. Open app file
2. Go to function main()
3. Under initializing marsrover you can rome or copy paste the lines of code that belong to one rover
4. The same for the rocks 
5. Make sure that the startposition (currentY and currentX) must be unique and not overlap another rover or rock.


Open issues
issue 1: Every rover object has a Travellog array. It is filled (pushed) in the function saveMoveIntravelLog.
         I tried to show the Travellog in the function DisplayTravelLog. But I only see the first item of the array being displayed.
         I didn't find out why? For now I disabled the calling of this function and show directly the travel log
         in the console after saving the move in the log (in function saveMoveIntravelLog) 
issue 2: After executing the main() you see in the console.log one time after the first 4 trvaellogs rows 
         an undefined being logged. Didn't find out yet where it comes from?

Backlog
item 1: the 10x10 board is now hard code in the index.html and styles.css file.
         it will be better to also dynamically create the board based on the const maxBoardX and 
         maxBoardY using for example cloneNode 
item 2: make visible which rover is rover1,2,3,.. by showing the object.id in the field or when you hover the field.
item 3: make a start button to start the app
item 4: show the travel log per rover on the screen. Make a card per rover that contains all relevent info and logging
