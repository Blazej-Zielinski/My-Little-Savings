package application.controllers;

import application.database.dao.BudgetDao;
import application.database.models.Budget;
import application.dto.BudgetInfoDto;
import application.dto.PostBudgetDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetsController {

    @Autowired
    private BudgetDao budgetDao;

    @GetMapping("getAll/{date}")
    public List<BudgetInfoDto> getAll(@RequestParam("date") String date){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Iterable<Budget> budgets = budgetDao.findAll(userId, date);

        return StreamSupport.stream(budgets.spliterator(), false)
                .map(BudgetInfoDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping("add")
    public BudgetInfoDto add(@RequestBody PostBudgetDetails budgetDetails){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Long newBudgetId = budgetDao.save(new Budget(budgetDetails, userId)).getId();
        Budget newBudget = budgetDao.getOne(newBudgetId);
        return new BudgetInfoDto(newBudget);
    }

    @DeleteMapping("delete/{id}")
    public Boolean delete(@RequestParam("id") Long budgetId){
        budgetDao.deleteById(budgetId);
        return true;
    }
}
