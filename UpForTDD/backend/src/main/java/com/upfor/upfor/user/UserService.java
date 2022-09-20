package com.upfor.upfor.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    UserRepository userRepository;
    
    BCryptPasswordEncoder passwordEncoder;

    //The advantage of constructor injection is that 
    //if we decide to write unit tests for the user service 
    //we can create an instance of this class by ourselfs.
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
}
