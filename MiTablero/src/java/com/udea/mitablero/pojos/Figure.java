/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.mitablero.pojos;

import java.io.StringWriter;
import javax.json.Json;
import javax.json.JsonObject;

/**
 *
 * @author sergio.marriaga
 */
public class Figure {
    private JsonObject jsonObject;

    public Figure(JsonObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    public JsonObject getJsonObject() {
        return jsonObject;
    }

    public void setJsonObject(JsonObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    @Override
    public String toString() {
        StringWriter stringWriter=new StringWriter();
        Json.createWriter(stringWriter).write(jsonObject);
        return stringWriter.toString(); 
    }
    
    
}
