package com.maisdoqueumcafe.maisdoqueumcafe.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username); // Spring data JPA handles all the querying

    //List<User> findByUsernameContaining(String username);

    //User findByUsernameAndDisplayName(String username, String displayName);
}
