package application.database.dao;

import application.database.models.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryTypesDao extends JpaRepository<CategoryType, Long> {
}
