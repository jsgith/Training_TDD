package com.upfor.upfor.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import com.upfor.upfor.user.User;
import com.upfor.upfor.user.UserRepository;

import static org.assertj.core.api.Assertions.*;

//With JUnit5 we dont need to use @RunWith annotation to bridge SpringBoot and JUnit 
@DataJpaTest //Provides a clean database method for each tests
@ActiveProfiles("test")
public class UserRepositoryTest {
    
    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        User user = new User();

        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4ssword");

        testEntityManager.persist(user);

        User inDB = userRepository.findByUsername("test-user");
        
        assertThat(inDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserDoesNotExist_returnsNull() {
        User inDB = userRepository.findByUsername("nonexistinguser");
        assertThat(inDB).isNull();
    }

}