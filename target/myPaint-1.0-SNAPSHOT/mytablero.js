/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas=document.getElementById("mycanvas");
var context= canvas.getContext("2d");
canvas.addEventListener("click",defineImage,false);


//Para tomar las coordenadas de los puntos
function getCurrentPos(evt){
    var rect =canvas.getBoundingClientRect();
    return{
        x:evt.clientX-rect.left,y:evt.clientY-rect.top
    };
}

//tomar la forma y el color
function defineImage(evt){
    var currentPos=getCurrentPos(evt);
    
    for(i=0;i<document.InputForm.color.length;i++){
        if(document.InputForm.color[i].checked){
            var color=document.InputForm.color[i];
            break;
        }
    }
    for(i=0;i<document.InputForm.shape.length;i++){
        if(document.InputForm.shape[i].checked){
            var shape=document.InputForm.shape[i];
            break;
        }
    }


//Estructura JSON a enviar
var json = JSON.stringify(
        {
            "shape":shape.value,
            "color":color.value,
            "coords":{
                "x":currentPos.x,
                "y":currentPos.y
            }
        });
        drawImageText(json);
        sendText(json);
}
var loquesea=2;
function drawImageText(image){
    var json= JSON.parse(image);
    context.fillStyle=json.color;
    switch (json.shape){
        case "Circulo":
            context.beginPath();
            context.arc(json.coords.x, json.coords.y, 5, 0,2*Math.PI,false);
            context.fill()
            loquesea=1;
            pintura=false;
            break;
        case "Linea":
            loquesea=2; 
            pintura=true;
                if(pintura){
                   // context.fillRect(json.coords.x,json.coords.y,10,10);
            
                $('#mycanvas').mousedown(function(e){
                var mouseX = e.pageX - this.offsetLeft;
                var mouseY = e.pageY - this.offsetTop;
                
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
                redraw();
            });
            
            $('#mycanvas').mousemove(function (e){
                addClick(e.pageX-this.offsetLeft,e.pagey-this.offsetTop,true);
                redraw();
            });
        }
            break;
        case "Cuadrado":
            default:
                loquesea=7;
                pintura=false;
                context.fillRect(json.coords.x, json.coords.y,20,20);
            break;
    }
    
    var limpiar = document.getElementById("borrado");
    limpiar.addEventListener("click",function (){
        canvas.width=canvas.width;
    });
    
 }
            
            function activar(){
                pintura=true;
            };
            function desactivar(){
                pintura=false;
            }; 
 
 
