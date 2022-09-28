package com.upfor.upfor.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    //List<User> findByUsernameContaining(String username); 

    //User findByUsernameAndDisplayName(String username, String displayName);

    User findByUsername(String username);
   
}
