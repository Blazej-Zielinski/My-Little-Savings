package application.controllers;

import application.database.dao.BudgetDao;
import application.database.models.Budget;
import application.dto.BudgetInfoDto;
import application.dto.BudgetsSpentValue;
import application.dto.PostBudgetDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetsController {

    @Autowired
    private BudgetDao budgetDao;

    @GetMapping("getAll/{date}")
    public List<BudgetInfoDto> getAll(@RequestParam("date") String date) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Iterable<Budget> budgets = budgetDao.findAll(userId, date);
        List<Object[]> a = budgetDao.getBudgetsSpentValue(userId, date);
        List<BudgetsSpentValue> budgetsSpentValues = a.stream()
                .map(el -> new BudgetsSpentValue(Long.parseLong(el[0].toString()), Double.parseDouble(el[1].toString())))
                .collect(Collectors.toList());

        return StreamSupport.stream(budgets.spliterator(), false)
                .map(budget -> {
                    Optional<BudgetsSpentValue> budgetsSpentValue = budgetsSpentValues.stream()
                            .filter(bsv -> budget.getCategoryType().getId().equals(bsv.getCategoryTypeId()))
                            .findFirst();

                    return budgetsSpentValue.map(spentValue -> new BudgetInfoDto(
                            budget,
                            spentValue.getSpentValue()))
                            .orElseGet(() -> new BudgetInfoDto(budget, 0D));

                })
                .collect(Collectors.toList());
    }

    @PostMapping("add")
    public BudgetInfoDto add(@RequestBody PostBudgetDetails budgetDetails) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        long userId = Long.parseLong(authentication.getName());

        Long newBudgetId = budgetDao.save(new Budget(budgetDetails, userId)).getId();
        Budget newBudget = budgetDao.getOne(newBudgetId);
        return new BudgetInfoDto(newBudget,0D);
    }

    @DeleteMapping("delete/{id}")
    public Boolean delete(@RequestParam("id") Long budgetId) {
        budgetDao.deleteById(budgetId);
        return true;
    }
}
