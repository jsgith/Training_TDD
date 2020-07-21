package com.maisdoqueumcafe.maisdoqueumcafe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    // For controller class I dont mind to use field injection with autowired annotation.
    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    void createUser(@RequestBody User user) {
        userService.save(user);
    }

}
