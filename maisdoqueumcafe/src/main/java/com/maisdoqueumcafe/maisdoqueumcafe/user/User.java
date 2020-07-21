package com.maisdoqueumcafe.maisdoqueumcafe.user;

import lombok.Data;

@Data // lombok automate constructors, getters and setters
public class User {

    private String username;
    private String displayName;
    private String password;
}
