package application.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class CategoriesController {

    @GetMapping("get")
    public String get(){
        return "Categories";
    }

    @PostMapping("add")
    public String add(){
        return "Category has been added";
    }

    @DeleteMapping("delete")
    public String delete(){
        return "Category has been removed";
    }
}
