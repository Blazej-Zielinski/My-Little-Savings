package application.database.dao;

import application.database.models.Category;
import application.database.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface CategoryDao extends JpaRepository<Category,Long> {

    @Query("select t from Category t where t.userId = :userId")
    Collection<Category> findAll(Long userId);
}
