package application.database.models;

import application.dto.CategoryInfoDto;
import application.dto.PostCategoryDetails;

import javax.persistence.*;

@Entity
@Table(name = "user_categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "category_type_id", referencedColumnName = "id")
    private CategoryType categoryType;

    @Column(name = "date")
    private String date;

    public Category() {
    }

    public Category(CategoryInfoDto categoryDto, long userId) {
        this.userId = userId;
        categoryType = new CategoryType(
                categoryDto.getId(),
                categoryDto.getTypeName(),
                categoryDto.getIcon(),
                categoryDto.getColor()
        );
        date = categoryDto.getDate();
    }

    public Category(PostCategoryDetails categoryDetails, long userId) {
        this.userId = userId;
        categoryType = new CategoryType(
                categoryDetails.getId(),
                categoryDetails.getName(),
                categoryDetails.getIcon(),
                categoryDetails.getColor()
        );
        date = categoryDetails.getDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }
}
