package application.database.dao;

import application.database.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetDao extends JpaRepository<Budget,Long> {
}
