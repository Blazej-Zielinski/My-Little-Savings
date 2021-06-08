package application.controllers;

import application.database.dao.UserDao;
import application.database.models.User;
import application.dto.UserCredentials;
import application.dto.UserRegistrationInfo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationDate}")
    private Long expirationDate;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserCredentials userCredentials) {
        Iterable<User> users = userDao.findAll();
        Optional<User> authenticatedUser = StreamSupport.stream(users.spliterator(), false)
                .filter(user -> user.getEmail().equals(userCredentials.getEmail())
                        && passwordEncoder.matches(userCredentials.getPassword(), user.getPassword()))
                .findFirst();

        if (authenticatedUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        long currentTimeMillis = System.currentTimeMillis();
        return ResponseEntity.status(HttpStatus.OK).body(Jwts.builder()
                .claim("name", authenticatedUser.get().getName())
                .claim("userID", authenticatedUser.get().getId())
                .claim("role", authenticatedUser.get().getUserRole().getRoleName())
                .setIssuedAt(new Date(currentTimeMillis))
                .setExpiration(new Date(currentTimeMillis + expirationDate))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact());
    }

    @PostMapping("/register")
    public boolean registerUser(@RequestBody UserRegistrationInfo userInfo) {
        Iterable<User> users = userDao.findAll();
        boolean isEmailUnique = StreamSupport.stream(users.spliterator(), false)
                .noneMatch(user -> user.getEmail().equals(userInfo.getEmail()));

        if (!isEmailUnique) {
            return false;
        }

        String encryptedPassword = passwordEncoder.encode(userInfo.getPassword());

        userDao.save(new User(
                new UserRegistrationInfo(
                        userInfo.getName(),
                        userInfo.getEmail(),
                        encryptedPassword
                )
        ));
        return true;
    }

}
