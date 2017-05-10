/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.mypaint.endpoint;

import com.udea.mypaint.encoders.FigureDecoder;
import com.udea.mypaint.encoders.FigureEncoder;
import com.udea.mypaint.pojos.Figure;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author sergio.marriaga
 */
@ServerEndpoint(value="/echo",encoders = {FigureEncoder.class},decoders = {FigureDecoder.class})
public class EchoServer {
    private static final Set<Session> peers=Collections.synchronizedSet(new HashSet<Session>());
    @OnMessage
    public void BroadcastFigure(Figure figure,Session session) throws IOException, EncodeException{
        for(Session peer:peers){
            if(!peer.equals(session)){
                peer.getBasicRemote().sendObject(figure);
            }
        }
    }

    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }
    
}
