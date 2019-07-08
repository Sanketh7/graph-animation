var svg = document.getElementById("svg");

function create_line(x1, y1, x2, y2, s=1, c='black'){
    var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    newLine.setAttribute('x1', x1);
    newLine.setAttribute('y1', y1);
    newLine.setAttribute('x2', x2);
    newLine.setAttribute('y2', y2);
    newLine.setAttribute('stroke', c);
    newLine.setAttribute('stroke-width', s);
    newLine.setAttribute('shape-rendering', 'optimizeQuality')
    svg.appendChild(newLine);
}


var marginLeft = 50;
var marginRight = 50;
var marginTop = 25;
var marginBottom = 50;

// read data from input.txt

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert("The File API is not supported on this browser.");
}

var mainlines = [];
var speed = 1;

$("#file-input").change(function() {
    var reader = new FileReader();
    var content = "";
    reader.onload = function(event) {
        content = event.target.result;
        var numList = content.replace(/\n/g, " ").split(" ");
        for (var i = numList.length-1; i >= 0; i--) {
            if (numList[i] == "") {
                numList.splice(i, 1);
            }
        }

        speed = parseFloat(numList[0]);
        for (var i = 1; i < numList.length; i+=4) {
            mainlines.push([[parseFloat(numList[i]), parseFloat(numList[i+1])], [parseFloat(numList[i+2]), parseFloat(numList[i+3])]]);
        }
        main();
    };
    reader.onerror = function(event) {
        alert("Unable to read file!")
    }
    reader.readAsText(this.files[0]);
})

create_line(marginLeft, marginTop, marginLeft, 500-marginBottom, 4);
create_line(marginLeft, 500-marginBottom, 700-marginRight, 500-marginBottom, 4);

function nextY(xval, slope, startX, startY){
    var b = startY - (slope*startX); //y-int
    return (slope*xval) + b;
}

function convertPoint(x, y){
    var nX = x + marginLeft;
    var nY = 500 - (marginBottom + y);
    return [nX, nY];
}

var xcoord = 0;

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    for (var i = 0; i < mainlines.length; i++){
        var line = mainlines[i];
        
        var p1 = line[0];
        var p2 = line[1];

        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];

        var slope = dy/dx;

        var startPoint = convertPoint(p1[0], p1[1]);

        var n = 0
        while (n <= dx){
            var newY = nextY(xcoord+n, slope, p1[0], p1[1]);
            var newPoint = convertPoint(xcoord+n, newY);
            create_line(startPoint[0], startPoint[1], newPoint[0], newPoint[1], 3, 'green');
            await sleep(5);
            n += speed;
        }
        xcoord += dx
    }
}

//main();