package application.dto;

import application.database.models.Budget;

public class BudgetInfoDto {
    private final Long id;
    private final double value;
    private final double spentValue;
    private final String date;
    private final String typeName;
    private final String color;
    private final String icon;

    public BudgetInfoDto(Budget budget, double spentValue){
        this.id = budget.getId();
        this.value = budget.getValue();
        this.spentValue = spentValue;
        this.date = budget.getDate();
        this.typeName = budget.getCategoryType().getName();
        this.color = budget.getCategoryType().getColor();
        this.icon = budget.getCategoryType().getIcon();
    }

    public Long getId() {
        return id;
    }

    public double getValue() {
        return value;
    }

    public String getDate() {
        return date;
    }

    public String getTypeName() {
        return typeName;
    }

    public String getColor() {
        return color;
    }

    public String getIcon() {
        return icon;
    }

    public double getSpentValue() {
        return spentValue;
    }
}
