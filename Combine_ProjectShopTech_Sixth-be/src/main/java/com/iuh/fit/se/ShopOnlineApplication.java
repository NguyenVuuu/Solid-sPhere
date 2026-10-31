package com.iuh.fit.se;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ShopOnlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopOnlineApplication.class, args);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);
		System.out.println("hehe");
        System.out.println(encoder.matches("admin123", "$2a$10$N9qo8uLOickgxZzMRZoMyeIjZAgcfI7p92ldGxad68lJZdL17lhWy"));
	}

}
