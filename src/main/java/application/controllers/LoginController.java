package application.controllers;

import application.database.dao.UserDao;
import application.database.models.User;
import application.dto.UserCredentials;
import application.dto.UserRegistrationInfo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserDao userDao;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationDate}")
    private Long expirationDate;

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
                .claim("name", authenticatedUser.get().getName())
                .claim("userID", authenticatedUser.get().getId())
                .claim("role", authenticatedUser.get().getUserRole().getRoleName())
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + expirationDate))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    @PostMapping("/register")
    public boolean registerUser(@RequestBody UserRegistrationInfo userInfo){
        Iterable<User> users = userDao.findAll();
        boolean isEmailUnique = StreamSupport.stream(users.spliterator(), false)
                .noneMatch(user -> user.getEmail().equals(userInfo.getEmail()));

        if(!isEmailUnique){
            return false;
        }

        userDao.save(new User(userInfo));
        return true;
    }

}
