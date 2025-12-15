Interactive Hand Heart Game

This is an interactive two-player experience built with p5.js and ml5.js HandPose.Players use their hands in front of a webcam to unlock the game, draw hearts, and trigger a final big red heart by bringing their hands close together. 
The main idea of this project was to explore how physical distance can affect our emotions and how we connect with others. At first, I wanted to use BodyPose for full-body tracking. However, getting two people to stand in the right position for the camera was difficult, especially when trying to share one screen. Because of that, I chose to focus on hand tracking instead. It is easier to work with and responds better when players are close together in front of one webcam. 
I also had plans to make the game work over a network using WebSockets. This way, two people could play from different places with their own cameras. The interaction would not depend on being in the same room. I could not finish that part because of time limitations and other class projects, but I hope to continue working on it in the future.
Step 1: Start the Game
Stand in front of the webcam with another person. Each player should raise one hand and point their index finger toward one of the two gray hearts on the screen. When both hearts are touched at the same time, the game begins.
Step 2: Draw Hearts with Your Hands
After the game starts, a heart will appear between your thumb and index finger. Move your hand, and you’ll see the heart follow. Each player has a different color heart.
Step 3: Change the Heart Color
If you pinch your thumb and index finger together, your heart will change to a new random color. You can do this as many times as you like.
Step 4: Bring Your Hands Closer
Move your hands closer to the other player’s hand. A progress bar at the top will show how close you are. Once you get close enough, a big red heart will appear in the center of the screen.
Step 5: Restart
When the red heart shows up, the game is complete. Click anywhere on the screen to start over.
