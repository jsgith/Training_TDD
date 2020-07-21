package com.maisdoqueumcafe.maisdoqueumcafe.user;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data // lombok automate constructors, getters and setters
@Entity // For mapping an object to a database
public class User {

    @Id //Tell JPA that this field will be the primary key
    @GeneratedValue // Tell JPA how this Id will be generated. The default one is AUTO. Creates unic Ids for us
    private long id;
    private String username;
    private String displayName;
    private String password;
}
