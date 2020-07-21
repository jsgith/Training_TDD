package com.maisdoqueumcafe.maisdoqueumcafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MaisdoqueumcafeApplication {

	public static void main(String[] args) {
		SpringApplication.run(MaisdoqueumcafeApplication.class, args);
	}

}
