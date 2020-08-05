package com.maisdoqueumcafe.maisdoqueumcafe.user;

import com.maisdoqueumcafe.maisdoqueumcafe.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class UserController {

    // For controller class I dont mind to use field injection with autowired annotation.
    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    GenericResponse createUser(@RequestBody @Valid User user) {
        userService.save(user);
        return new GenericResponse("User saved");
    }

}
