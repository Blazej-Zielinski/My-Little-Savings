package application.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budgets")
public class BudgetsController {

    @GetMapping("get")
    public String get(){
        return "Budgets";
    }

    @PostMapping("add")
    public String add(){
        return "Budget has been added";
    }

    @DeleteMapping("delete")
    public String delete(){
        return "Budget has been removed";
    }
}
