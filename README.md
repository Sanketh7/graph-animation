# graph-animation
Displays an animation of a line graph entered by the user. Originally created to supply a visual for my Survey Composition and Literature Final.



## Purpose

The animation drawn can then be recorded/screen-captured for use as a visual.



## Usage

- To run the program, open `index.html` in a browser (tested in Chrome, Firefox should work, IE and Edge may run into issues).

- Input is provided by uploading a text file (Select **Choose File** to upload a text file)

- Formatting for the text file:

  - every number should be separated by whitespace
    - other than that you can space your numbers whichever way you like
  - a coordinate is defined by a pair of numbers
  - a line is defined by a pair of coordinates
  - **NOTE**: the very first number should define the speed that the graph is drawn, everything after that should define the lines to be displayed

- Example formatting (`sample-data.txt`):

  ```
  1
  0 0 100 100
  100 100 150 50
  150 50 300 200
  300 200 350 190
  350 190 500 390
  ```

  What it means:

  - speed = 1

  - lines:

    | starting coordinate | ending coordinate |
    | ------------------- | ----------------- |
    | (0, 0)              | (100, 100)        |
    | (100, 100)          | (150, 50)         |
    | (150, 50)           | (300, 200)        |
    | (300, 200)          | (350, 190)        |
    | (350, 190)          | (500, 390)        |

    