package application.controllers;

import application.database.dao.CategoryDao;
import application.database.dao.TransactionDao;
import application.database.models.Category;
import application.database.models.Transaction;
import application.dto.TransactionInfoDto;
import application.dto.TransactionsAndCategoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@CrossOrigin("*")
public class TransactionsController {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private CategoryDao categoryDao;


    @GetMapping("getAll/{id}")
    public TransactionsAndCategoryDto getAll(@RequestParam("id") Long categoryId) {
        Collection<Transaction> transactions = transactionDao.findAll(categoryId);
        Category category = categoryDao.getOne(categoryId);

        return new TransactionsAndCategoryDto(
                category.getCategoryType().getName(),
                category.getDate(),
                category.getCategoryType().getColor(),
                category.getCategoryType().getIcon(),
                transactions.stream()
                        .map(transaction -> new TransactionInfoDto(
                                transaction.getId(),
                                transaction.getName(),
                                transaction.getValue(),
                                transaction.getDate()
                        ))
                        .collect(Collectors.toList())
        );
    }

    @PostMapping("add/{id}")
    public TransactionInfoDto add(@RequestParam("id") Long categoryId, @RequestBody TransactionInfoDto transactionInfoDto) {
        Transaction transaction = new Transaction(transactionInfoDto, categoryId);
        transactionDao.save(transaction);
        return transactionInfoDto;
    }

    @DeleteMapping("delete/{id}")
    public Boolean delete(@RequestParam("id") Long transactionId) {
        transactionDao.deleteById(transactionId);
        return true;
    }
}
