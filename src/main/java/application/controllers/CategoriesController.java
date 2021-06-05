package application.controllers;

import application.database.dao.CategoryDao;
import application.database.models.Category;
import application.dto.CategoryInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriesController {

    @Autowired
    private CategoryDao categoryDao;

    @GetMapping("get")
    public CategoryInfoDto get() {
        Category category = categoryDao.getOne(1L);
        return new CategoryInfoDto(
                category.getId(),
                category.getCategoryType().getName(),
                category.getDate(),
                category.getCategoryType().getColor(),
                category.getCategoryType().getIcon()
        );
    }

    @GetMapping("getAll")
    public List<CategoryInfoDto> getAll() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Iterable<Category> categories = categoryDao.findAll(userId);

        return StreamSupport.stream(categories.spliterator(), false).map(category -> new CategoryInfoDto(
                category.getId(),
                category.getCategoryType().getName(),
                category.getDate(),
                category.getCategoryType().getColor(),
                category.getCategoryType().getIcon()
        )).collect(Collectors.toList());
    }

    @PostMapping("add")
    public CategoryInfoDto add(@RequestBody CategoryInfoDto categoryDto) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Category category = new Category(categoryDto, userId);
        category = categoryDao.save(category);
        return new CategoryInfoDto(
                category.getId(),
                category.getCategoryType().getName(),
                category.getDate(),
                category.getCategoryType().getColor(),
                category.getCategoryType().getIcon()
        );
    }

    @DeleteMapping("delete")
    public String delete() {
        return "Category has been removed";
    }
}
