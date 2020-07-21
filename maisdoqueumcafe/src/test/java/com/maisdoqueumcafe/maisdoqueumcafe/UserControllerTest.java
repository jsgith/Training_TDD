package com.maisdoqueumcafe.maisdoqueumcafe;

import com.maisdoqueumcafe.maisdoqueumcafe.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class) // To get the spring context
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT) // This is an integration test so we need a running web application for it.
// SpringBootTest will start a web server. By default it starts in port 8080 but for testing purpose
// lets make sure it start in a random port.
@ActiveProfiles("test") // This is to create a profile for testing
public class UserControllerTest {

    @Autowired //For field injection
    TestRestTemplate testRestTemplate;

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");

        ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/1.0/users", user, Object.class);

        //AssertJ
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
