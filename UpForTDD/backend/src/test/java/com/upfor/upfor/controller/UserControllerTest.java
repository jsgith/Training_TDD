package com.upfor.upfor.controller;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.upfor.upfor.shared.GenericResponse;
import com.upfor.upfor.user.User;
import com.upfor.upfor.user.UserRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {


    private static final String API_1_0_USERS= "/api/1.0/users"; 

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    public void cleanUp() {
        userRepository.deleteAll();
    } 

    /*
     * Post User When is Valid
     */
    //methodName_condition_expectedBehaviour 
    @Test
    public void postUser_whenUserIsValid_receiveOk() {

        User user = createValidUser();
        ResponseEntity<Object> response = postSignup(user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    } 

    /*
     * Save user to Database
     */
    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
    
        User user = createValidUser();
        postSignup(user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {

        User user = createValidUser();
        ResponseEntity<GenericResponse> response = postSignup(user, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }
    
    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {

        User user = createValidUser();
        postSignup(user, Object.class);
        List<User> users = userRepository.findAll();
        User inDB = users.get(0);
        assertThat(inDB.getPassword()).isNotEqualTo(user.getPassword());
    }

    public <T> ResponseEntity<T> postSignup(Object request, Class<T> response) {
        return testRestTemplate.postForEntity(API_1_0_USERS, request, response);
    }

    private User createValidUser() {

        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");

        return user;
    }
}
