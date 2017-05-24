/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var wsUri="ws://"+document.location.host+document.location.pathname+"echo";
var websocket= new WebSocket(wsUri);

websocket.onopen=function (evt){OnOpen(evt)};
websocket.onmessage=function (evt){OnMessage(evt)};
websocket.onerror=function (evt){OnError(evt)};

var output=document.getElementById('output');

function OnOpen(evt){
    writeToScreen("conectado a " + wsUri);
}

function OnMessage(evt){
    drawImageText(evt.data);
}

function  OnError(evt){
    writeToScreen('<span style="color:red;">ERROR:</span>'+evt.data);
}

function writeToScreen(message){
    output.innerHTML+=message+"</br>";
}

function sendText(json){
    websocket.send(json);
}