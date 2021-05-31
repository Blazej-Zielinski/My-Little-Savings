package application.controllers;

import application.database.dao.UserDao;
import application.database.models.Category;
import application.database.models.User;
import application.dto.UserCredentials;
import io.jsonwebtoken.Jwts;
import application.dto.UserInfoDto;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private UserDao userDao;

    @PostMapping("/login")
    public String login(@RequestBody UserCredentials userCredentials) {
        Iterable<User> users = userDao.findAll();
        Optional<User> authenticatedUser = StreamSupport.stream(users.spliterator(), false)
                .filter(user -> user.getEmail().equals(userCredentials.getEmail())
                        && user.getPassword().equals(userCredentials.getPassword()))
                .findFirst();

        if(authenticatedUser.isEmpty()){
            return "Wrong username or password";
        }

        long currentTimeMillis = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(authenticatedUser.get().getName())
                .claim("roles", authenticatedUser.get().getUserRole().getRoleName())
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + 20000))
                .signWith(SignatureAlgorithm.HS512, authenticatedUser.get().getPassword())
                .compact();
    }

    @PostMapping("/register")
    public String registerUser(){
        return "User has been added";
    }

}
