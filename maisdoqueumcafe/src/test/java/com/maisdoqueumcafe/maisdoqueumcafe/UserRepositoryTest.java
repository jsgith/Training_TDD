package com.maisdoqueumcafe.maisdoqueumcafe;

import com.maisdoqueumcafe.maisdoqueumcafe.user.User;
import com.maisdoqueumcafe.maisdoqueumcafe.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class) // To get the spring context
@DataJpaTest //When testing repositories this annotations tells application to initialize in costume way , it comes with inmemory database, it is like a costume applicationn environment for JPA purpose only
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager; //Provides an alternative to the standard JPA entity manager. This is specific for testing porposes

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnUser() {
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
        User inDB = userRepository.findByUsername("nonexistingusername");
        assertThat(inDB).isNull();
    }

    //I did not use before or clean up the database because the JPA Test is providing a clean database in each test
}
