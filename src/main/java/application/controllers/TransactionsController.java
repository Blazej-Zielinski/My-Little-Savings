package application.controllers;

import application.database.dao.TransactionDao;
import application.database.models.Transaction;
import application.dto.TransactionInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@CrossOrigin("*")
public class TransactionsController {

    @Autowired
    private TransactionDao transactionDao;

    @GetMapping("get")
    public TransactionInfoDto get(){
        Transaction transaction = transactionDao.getOne(1L);
        return new TransactionInfoDto(
                transaction.getName(),
                transaction.getValue(),
                transaction.getDate()
        );
    }

    @GetMapping("getAll/{id}")
    public List<TransactionInfoDto> getAll(@RequestParam("id") Long categoryId){
        Collection<Transaction> transactions = transactionDao.findAll(categoryId);

        return transactions.stream()
                .map(transaction -> new TransactionInfoDto(
                        transaction.getName(),
                        transaction.getValue(),
                        transaction.getDate()
                ))
                .collect(Collectors.toList());
    }

    @PostMapping("add")
    public String add(){
        return "Transaction has been added";
    }

    @DeleteMapping("delete")
    public String delete(){
        return "Transaction has been removed";
    }
}
