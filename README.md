# Atomic Architect VR

Grab your VR Headset or open your computer to explore and learn the periodic table with this interactive web VR experience, built using A-Frame, Node.js, Three.js and WebGL.

This project was created for the Design Studio III course at Algonquin College, part of the IT: Interactive Multimedia & Design program at Carleton University. For more information, please visit [BIT Degree](https://bitdegree.ca/index.php?Program=IMD).

Any improvements or suggestions are welcome :)

### Instructions to Play ()

This project is currently not deployed to a server or url, therefore in order to play you must run the application locally. Complete the following steps to run locally:

Desktop:

1. Clone this repository to your local machine
2. Navigate to the cloned repository's directory in the terminal
3. Type the following commands (make sure you have Node Package Manager installed):
   `npm install express --save`
   `node .\app.js`
4. Open your preferred browser and type `http://localhost:8080/`

VR Headset:

1. Follow steps 1-3 of the Desktop instructions
2. Follow the steps to install ngrok => [ngrok.com](https://ngrok.com/)
3. Type `ngrok http 8080` => this will generate a url in the terminal
4. Put on your VR Headset and open its respective browser application
5. Type in the url from the terminal, provided by ngrok
