package com.upfor.upfor.validations;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.upfor.upfor.annotations.UniqueUsername;
import com.upfor.upfor.user.User;
import com.upfor.upfor.user.UserRepository;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String>{

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        
        User inDB = userRepository.findByUsername(value);
        if(inDB == null) {
            return true;
        }
        return false;
    }
}
