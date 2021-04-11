package application.controllers;

import application.database.dao.TransactionDao;
import application.database.models.Transaction;
import application.dto.TransactionInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    @Autowired
    private TransactionDao transactionDao;

    @GetMapping("get")
    public TransactionInfoDto get(){
        Transaction transaction = transactionDao.getOne((long)1);
        return new TransactionInfoDto(
                transaction.getName(),
                transaction.getValue(),
                transaction.getDate()
        );
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
