package com.maisdoqueumcafe.maisdoqueumcafe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    UserRepository userRepository;

    //Assign userRepository through constructor injection. In case of unit tests ,
    // it is easier to test since we can instantiate the service and mock the repository
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
