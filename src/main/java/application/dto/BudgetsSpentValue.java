package application.dto;

public class BudgetsSpentValue {
    private final Long categoryTypeId;
    private final double spentValue;

    public BudgetsSpentValue(Long categoryTypeId, double spentValue) {
        this.categoryTypeId = categoryTypeId;
        this.spentValue = spentValue;
    }

    public Long getCategoryTypeId() {
        return categoryTypeId;
    }

    public double getSpentValue() {
        return spentValue;
    }
}
