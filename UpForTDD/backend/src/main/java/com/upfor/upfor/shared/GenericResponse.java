package com.upfor.upfor.shared;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor//Needs to have a emptyy construtor for JSON Object convertion
public class GenericResponse {
    
    private String message;

    public GenericResponse(String message) {
        this.message = message;
    }
    
}
