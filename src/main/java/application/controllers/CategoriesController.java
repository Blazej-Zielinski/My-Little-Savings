package application.controllers;

import application.database.dao.CategoryDao;
import application.database.models.Category;
import application.dto.CategoryInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class CategoriesController {

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping("get")
    public CategoryInfoDto get(){
        Category category = categoryDao.getOne((long) 1);
        return new CategoryInfoDto(
                category.getCategoryType().getName(),
                category.getDate(),
                category.getCategoryType().getColor()
        );
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
