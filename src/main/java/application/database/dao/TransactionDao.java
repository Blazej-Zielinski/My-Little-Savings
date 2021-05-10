package application.database.dao;

import application.database.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface TransactionDao extends JpaRepository<Transaction,Long> {

    @Query("select t from Transaction t where t.categoryId = :categoryId")
    Collection<Transaction> findAll(Long categoryId);
}
