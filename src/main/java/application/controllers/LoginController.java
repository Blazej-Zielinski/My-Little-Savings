package application.controllers;

import application.security.LoginCredentials;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/login")
public class LoginController {

    @PostMapping("")
    public void login(@RequestBody LoginCredentials credentials) {
    }

}
