package application.controllers;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/login2")
public class LoginController {

    @PostMapping("")
    public String login() {
        return "Logged in";
    }

}
