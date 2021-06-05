package application.controllers;

import application.database.dao.UserDao;
import application.database.models.User;
import application.dto.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/get")
    public UserInfoDto get(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());
        User user = userDao.getOne(userId);
        return new UserInfoDto(
                user.getName()
        );
    }

    @DeleteMapping("/delete")
    public String delete(){
        return "User has been deleted";
    }
}
