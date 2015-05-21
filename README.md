## Website Performance And Rendering Optimization

Here is a link to the live version:
http://karoldavid.github.io/frontend-nanodegree-mobile-portfolio/

On the bottom of the mobile portfolio page you will find the link to Cameron's Pizza Shop.


Description:

Project 4 consists of two parts, the Mobile Portfolio Performance Optimization and 
of the Cameron's Pizza Shop's Rendering Optimization.

Time for initial page load in index.html
Smooth browser animations and efficient code execution in main.js for the Pizzas page under /view/pizza.html


Resume

Optimization Results:

(1) Google Page Speed Insights: 94% mobile; 95% desktop; 100% usability on mobile
    (index.html) https://developers.google.com/speed/pagespeed/insights/

(2) Scolling in pizza.html is unde 60 frames per second; time to resize a pizza in pizza.html is less than 5ms shown in the console
    (=> views/js/main.js)

Furthermore, static assests such as images, css and javascipt files are automatically optimized, concatenated and/ or minified with Grunt.



Steps:

1. Mobile Portfolio: Performance Optimization


The key to getting a higher score is to reduce the number of Critical Rendering Paths as well as the Critical Size of our
files. Therefore we need to use a combination of:
Create async script requests
Use specific media types such as print and media to strategically load our CSS
Inlining our CSS
Minifying our CSS
Use JavaScript to load resources after the DOM has completely loaded
Base64 encode our resources such as fonts and images and embed the code inside the HTML

  reduce number of assets (concatenate), minify, inline code portions, defer loading

- optimize delivery of web fonts

- media="print"

inline css
inline header image
css concatenation and minification
js concatenation and minification
defer loading of css
defer loading of js
add css after page load
defer images after page load
optimize images
load js async

append additional js interactivity after page load






2. Pizza: Rendering Optimization (views/js/main.js)

Essentially optimizing JavaScript, Layout and Paint executions

Gain 60 FPS on Browser Scroll
The next step is to gain 60 FPS when a user scrolls through the website on the Pizzas page. We open up Chome Dev
Tools and inspect the performance of our page using the timeline feature in Chrome Dev Tools. We record the timeline
and proceed to scroll through the browser for a couple of seconds and then stop recording.
We then analyze the performance of our entire site and look try to find out what is causing the computation bottleneck
that is preventing our site from performing at 60 FPS. To reach 60 FPS, the majority of the colored bars should be under
the 60 FPS line such as this:

Hint: The main cause of the bottleneck is in the JavaScript and we should be analyzing the efficiency of our code in the
For Loops. console.log() all of the variables being calculated inside the For Loops and figure out which variables need to
be calculated inside the For Loops and which variables can be calculated outside of the For Loops.


a. First Stage Optimizations: number of items and calculating items inside the For Loops

optimize the JavaScript:
- calculating our variables inside the For loops
- reduce the number of animated pizzas from 200 to 35

=> Web site is performing at 60 FPS now


b. Second Stage Optimization:

- Reducing the Scripting Time


* document.querySelectorAll() => document.getElementsByClassName()

* There is no need to access the DOM element for every scroll. Create an array variable that has a reference to all of the pizzas that has the class name "mover"

* calculate 5 phases in the function but outsite the loop.


- Reducing Layout Time


c. Third Stage Optimization

Reducing the Paint time


* backface-visibility: hidden ... in the CSS for the "mover" class. This forces each moving pizza to have its own composite layer.

When we scroll, the browser will only repaint the pixels that are affected by the moving pizzas, and therefore will not repaint the whole screen, drastically reducing our total paint time and increasing our FPS.

Change Pizza Sizes
The last optimization we need to accomplish is to make the Change Pizza Sizes function more efficient. If we open up
Chrome Dev Tools and look at the console, whenever we change the sizes of the pizzas with the slider on the page, wwe
get an average time to resize pizzas of over 100 milliseconds. The goal is to reduce this time to under 5 milliseconds.
We go into our HTML file and look at this line:
 
<input id="sizeSlider" type="range" min="1" max="3" value="2" step="1"
onchange="resizePizzas(this.value)"> 
We see that whenever we change the slider, we tell the slider to call the JavaScript function
 
resizePizzas(this.value) 
.
From there we then look into main.js and study the   
resizePizzas() 
 function and proceed to look for bottle necks in the
calculations. Again the main bottleneck is how everything is calculated in the For Loops.b


 Critical Rendering Path:
HTML ­> CSSOM <­ JavaScript ­> Render Tree ­> Layout ­> Paint
