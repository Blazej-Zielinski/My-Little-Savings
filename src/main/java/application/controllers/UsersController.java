package application.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @GetMapping("/get")
    public String get(){
        return "User";
    }

    @PostMapping("/register")
    public String registerUser(){
        return "User has been added";
    }

    @DeleteMapping("/delete")
    public String delete(){
        return "User has been deleted";
    }
}
