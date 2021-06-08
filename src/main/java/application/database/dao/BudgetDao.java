package application.database.dao;

import application.database.models.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface BudgetDao extends JpaRepository<Budget,Long> {
    @Query("select b from Budget b where b.userId = :userId and b.date = :date")
    Collection<Budget> findAll(Long userId, String date);

    @Query(nativeQuery = true, value = "select c.category_type_id as categoryTypeId, sum(t.value) as spentValue from user_categories c right join user_transactions t on c.id = t.category_id where c.user_id = :userId and c.date = :date group by c.category_type_id")
    List<Object[]> getBudgetsSpentValue(Long userId, String date);
}
