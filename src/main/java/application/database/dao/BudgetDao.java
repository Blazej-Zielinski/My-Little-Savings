package application.database.dao;

import application.database.models.Budget;
import application.database.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface BudgetDao extends JpaRepository<Budget,Long> {
    @Query("select b from Budget b where b.userId = :userId and b.date = :date")
    Collection<Budget> findAll(Long userId, String date);
}
