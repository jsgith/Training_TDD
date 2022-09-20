package com.upfor.upfor.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data  //Create constructor getters and setters, equals and hashcode
@Entity
@Table(name="users")
public class User {
    
    //Fields
    @Id
    @GeneratedValue
    private long id;

    private String username;

    private String displayName;

    private String password;
    
}
