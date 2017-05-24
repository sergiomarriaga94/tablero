/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.mitablero.encoders;

import com.udea.mitablero.pojos.Figure;
import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

/**
 *
 * @author sergio.marriaga
 */
public class FigureDecoder implements Decoder.Text<Figure>{

    @Override
    public Figure decode(String string) throws DecodeException {
        JsonObject jsonObject=Json.createReader(new StringReader(string)).readObject();
        return new Figure(jsonObject);
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean willDecode(String string) {
        try{
            Json.createReader(new StringReader(string)).readObject();
            return true;
        }catch(JsonException je){
            je.printStackTrace();
            return false;
        }
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("Iniciando");
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void destroy() {
        System.out.println("Destruyendo");
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
