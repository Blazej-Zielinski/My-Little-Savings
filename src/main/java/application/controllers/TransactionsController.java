package application.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransactionsController {

    @GetMapping("get")
    public String get(){
        return "Transactions";
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
