package application.database.dao;

import application.database.models.CategoryDetails;
import application.database.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface TransactionDao extends JpaRepository<Transaction,Long> {

    @Query("select t from Transaction t where t.categoryId = :categoryId")
    Collection<Transaction> findAll(Long categoryId);

    @Query("select new application.database.models.CategoryDetails(t.categoryId, count(t), sum(t.value))"
    + "from Transaction as t group by t.categoryId")
    List<CategoryDetails> getCategoriesDetails();
}
