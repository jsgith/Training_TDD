package com.maisdoqueumcafe.maisdoqueumcafe.user;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data // lombok automate constructors, getters and setters
@Entity // For mapping an object to a database
public class User {

    @Id //Tell JPA that this field will be the primary key
    @GeneratedValue // Tell JPA how this Id will be generated. The default one is AUTO. Creates unic Ids for us
    private long id;

    @NotNull
    @Size(min = 4, max=255)
    private String username;

    @NotNull
    @Size(min = 4, max= 255)
    private String displayName;

    @NotNull
    @Size(min = 8, max=255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;
}
