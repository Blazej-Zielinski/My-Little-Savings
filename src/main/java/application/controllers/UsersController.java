package application.controllers;

import application.database.dao.UserDao;
import application.database.models.User;
import application.dto.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/get")
    public UserInfoDto get(){
        User user = userDao.getOne(1L);
        return new UserInfoDto(
                user.getName(),
                user.getEmail(),
                user.getUserRole().getRoleName()
        );
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
