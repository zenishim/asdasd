(function() {
    'use strict';

    function createGUI() {
        const guiHTML = `
            <div id="bloxflipESP" style="position: fixed; top: 20px; right: 20px; width: 480px; height: 350px; background-color: #222; padding: 10px; z-index: 1000; color: #000; box-shadow: 0 0 20px 5px #C41E3A;">

                <div id="headerSection" style="background-color: #333; padding: 7px; display: flex; align-items: center;">
                    <img src="https://i.pinimg.com/736x/d2/9a/4c/d29a4ccdd934edff1aa571da55b18919.jpg" alt="Circle Image" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                    <h2 style="color: #FFFFFF;">Elite Esp</h2>
                </div>

                <button class="predictButton" id="bombminesButton" style="background-color: #FF0000; color: #fff; border: none; padding: 10px; width: 120px; font-size: 16px; cursor: pointer; margin-right: 10px; border-radius: 5px;">Mine</button>
                <button class="predictButton" id="minesButton" style="background-color: #00A36C; color: #fff; border: none; padding: 10px; width: 120px; font-size: 16px; cursor: pointer; margin-right: 10px; border-radius: 5px;">Safe</button>

                <!-- New Section -->
                <div id="bottomSection" style="position: absolute; top: 0; right: 0; margin: 20px; display: flex; align-items: center;">
                    <div style="display: flex; align-items: center;">

                        <span style="color: #FFFFFF; font-size: 18px;"><span id="username" style="font-size: 18px;">User</span></span>
                         <img src="https://i.pinimg.com/originals/fa/93/01/fa9301440115d08f2834f1dcb69a689c.jpg" alt="User Image" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                    </div>
                </div>
            </div>
        `;


        document.body.insertAdjacentHTML('beforeend', guiHTML);

        // Add event listeners for each prediction option
        document.getElementById('bombminesButton').addEventListener('click', function() {
             resetMines()
            predictMines(7, "#FF0000"); // Predict 10 red squares
        });

        document.getElementById('minesButton').addEventListener('click', function() {
             resetMines()
            predictMines(3, "#5D3FD3"); // Predict 3 green squares (default color)
        });

        // Towers prediction is disabled (coming soon)

        // Make the GUI draggable
        makeDraggable(document.getElementById('bloxflipESP'));
    }

        function hideElement() {
        const elementToHide = document.querySelector('//*[@id="__next"]/div[2]/div/div[3]/aside');

        // Check if the element exists before trying to hide it
        if (elementToHide) {
            elementToHide.style.display = 'none';
        }
    }

function resetMines() {
    // Reset previous outlines and shadows
    const mines = document.querySelectorAll(`div.mines_minesGameContainer__Ih15s > button`);
    mines.forEach(mine => {
        mine.style.border = 'none';
        mine.style.boxShadow = 'none';
    });
}



    // Add a context menu listener
    document.addEventListener('contextmenu', function(event) {
        // Prevent the default context menu
        event.preventDefault();

        // Hide the element when the context menu is triggered
        hideElement();
    });
function predictMines(maxSpots, color) {
    // Generate random predictions (maxSpots spots)
    const predictionResult = [];

    for (let i = 0; i < maxSpots; i++) {
        predictionResult.push(Math.floor(Math.random() * 25)); // Assuming there are 25 mine spots

    }

    // Color the outlines of the predicted mines with a glowing effect
    predictionResult.forEach(index => {
        let mine = document.querySelector(`div.mines_minesGameContainer__Ih15s > button:nth-child(${index + 1})`);
        mine.style.border = `3px solid ${color}`;
        mine.style.boxShadow = `0 0 35px ${color}`; // Adjust the glow effect by changing the spread radius (10px in this case)
    });
}

            document.addEventListener('keydown', function(event) {
        if (event.key === 's' || event.key === 'S') {
            document.getElementById('minesButton').click(); // Trigger Mines button click event
        }
    });

            document.addEventListener('keydown', function(event) {
        if (event.key === 'b' || event.key === 'B') {
            document.getElementById('bombminesButton').click(); // Trigger Mines button click event
        }
    });



    function makeDraggable(element) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

        if (document.getElementById(element.id + 'Header')) {
            // if present, the header is where you move the DIV from
            document.getElementById(element.id + 'Header').onmousedown = dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position
            element.style.top = element.offsetTop - pos2 + 'px';
            element.style.left = element.offsetLeft - pos1 + 'px';
        }

        function closeDragElement() {
            // stop moving when the mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    createGUI();
})();
