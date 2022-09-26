package com.upfor.upfor.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data  //Create constructor getters and setters, equals and hashcode
@Entity
@Table(name="users")
public class User {
    
    //Fields
    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "{upfor.constraints.username.NotNull.message}")
    @Size(min = 4, max = 255)
    private String username;

    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;

    @NotNull
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message= "{upfor.constraints.password.Pattern.message}")
    private String password;
    
}
