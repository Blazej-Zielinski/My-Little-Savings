package application.controllers;

import application.database.dao.CategoryDao;
import application.database.dao.CategoryTypesDao;
import application.database.dao.TransactionDao;
import application.database.models.Category;
import application.database.models.CategoryDetails;
import application.database.models.CategoryType;
import application.dto.CategoryInfoDto;
import application.dto.CategoryTypesDto;
import application.dto.PostCategoryDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriesController {

    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private CategoryTypesDao categoryTypesDto;


    @GetMapping("getAll")
    public List<CategoryInfoDto> getAll() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Iterable<Category> categories = categoryDao.findAll(userId);
        List<CategoryDetails> categoriesDetails = transactionDao.getCategoriesDetails();

        return StreamSupport.stream(categories.spliterator(), false).map(category -> {
                    Optional<CategoryDetails> catDetails = categoriesDetails.stream()
                            .filter(catD -> catD.getId() == category.getId())
                            .findFirst();

                    return catDetails.map(categoryDetails -> new CategoryInfoDto(
                            category,
                            categoryDetails.getRecordsNumber(),
                            categoryDetails.getTransactionsValue()))
                            .orElseGet(() -> new CategoryInfoDto(category, 0L, 0D));
                }
        ).collect(Collectors.toList());
    }

    @GetMapping("getAllTypes")
    public List<CategoryTypesDto> getAllTypes() {
        Iterable<CategoryType> categoryTypes = categoryTypesDto.findAll();

        return StreamSupport.stream(categoryTypes.spliterator(), false).map(type -> new CategoryTypesDto(
                type.getId(),
                type.getName(),
                type.getIcon(),
                type.getColor()
        )).collect(Collectors.toList());
    }

    @PostMapping("add")
    public CategoryInfoDto add(@RequestBody PostCategoryDetails categoryDetails) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Category category = new Category(categoryDetails, userId);
        category = categoryDao.save(category);
        return new CategoryInfoDto(
                category,
                0L,
                0D
        );
    }

    @DeleteMapping("delete")
    public String delete() {
        return "Category has been removed";
    }
}
