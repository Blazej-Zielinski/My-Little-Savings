package application.controllers;

import application.database.dao.BudgetDao;
import application.database.models.Budget;
import application.dto.BudgetInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budgets")
public class BudgetsController {

    @Autowired
    private BudgetDao budgetDao;

    @GetMapping("get")
    public BudgetInfoDto get(){
        Budget budget = budgetDao.getOne(1L);
        return new BudgetInfoDto(
                budget.getValue(),
                budget.getStartDate(),
                budget.getEndDate(),
                budget.getCategoryType().getName(),
                budget.getCategoryType().getColor()
        );
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
