/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mouse=false;
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d"); 

canvas.addEventListener("click", defineImage,false);
canvas.addEventListener("mousemove",defineImage,false);
canvas.addEventListener("mousedown",startline,false);
canvas.addEventListener("mouseup",closeline,false);




function getCurrentPost(evt){
    var rect=canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function defineImage(evt){
    var currentPost = getCurrentPost(evt);
    
    for(i=0;i<document.inputForm.color.length;i++){
        if(document.inputForm.color[i].checked){
            var color = document.inputForm.color[i];
            break;
        }
    }
    for(i=0;i<document.inputForm.shape.length;i++){
        if(document.inputForm.shape[i].checked){
            var shape = document.inputForm.shape[i];
            break;
        }
    }
    
    var json = JSON.stringify({
        "action" : "draw",
       "shape": shape.value,
       "color": color.value,
       "coords":{
           "x": currentPost.x,
           "y": currentPost.y
       }
    });
    drawImageText(json);
    sendText(json);
}

function startline(evt){
    var currentPost=getCurrentPost(evt);
    
    for(i=0;i<document.inputForm.color.length;i++){
        if(document.inputForm.color[i].checked){
            var color = document.inputForm.color[i];
            break;
        }
    }
    for(i=0;i<document.inputForm.size.length;i++){
        if(document.inputForm.size[i].checked){
            var size = document.inputForm.size[i];
            break;
        }
    }
    
    var json = JSON.stringify({
        "action": "startline",
       "shape": "circle",
       "color": color.value,
       "size": size.value,
       "coords":{
           "x": currentPost.x,
           "y": currentPost.y
       }
    });
    drawImageText(json);
    sendText(json);   
}

function closeline(evt){
    var json=JSON.stringify({
       "action": "closeline",
       "shape":"",
       "color":"",
       "coords":{
           "x":"",
           "y":""
       }
    });
    drawImageText(json);
    sendText(json);
}


function drawImageText(image){
    var json=JSON.parse(image);
    context.fillStyle=json.color;
    switch (json.shape){
        case "circle":
            context.beginPath();
            context.arc(json.coords.x, json.coords.y,5,0,2*Math.PI,false);
            context.fill();
            break;
        case "startline":
            context.beginPath();
            context.strokeStyle=json.color;
            context.lineCap="round";
            context.lineWith=json.size;
            context.moveTo(json.coords.x,json.coords.y);
            mouse=true;
        break;
        case "closeline":
            context.closePath();
            mouse=false;
        break;
        case "draw":
            if(mouse){
                context.lineTo(json.coords.x,json.coords.y);
                context.stroke();
            }
        break;
        case "square":
        default:
            context.fillRect(json.coords.x, json.coords.y, 10,10);
            break;
    }
}

