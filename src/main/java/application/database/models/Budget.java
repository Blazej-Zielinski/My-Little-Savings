package application.database.models;

import application.dto.PostBudgetDetails;

import javax.persistence.*;

@Entity
@Table(name = "user_budgets")
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "category_type_id", referencedColumnName = "id")
    private CategoryType categoryType;

    @Column(name = "value")
    private double value;

    @Column(name = "date")
    private String date;

    public Budget() {
    }

    public Budget(PostBudgetDetails budgetDetails, Long userId) {
        this.userId = userId;
        this.value = budgetDetails.getValue();
        this.categoryType = new CategoryType(budgetDetails.getTypeId());
        this.date = budgetDetails.getDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public CategoryType getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(CategoryType categoryType) {
        this.categoryType = categoryType;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
