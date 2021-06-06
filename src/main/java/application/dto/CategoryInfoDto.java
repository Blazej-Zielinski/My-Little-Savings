package application.dto;

import application.database.models.Category;

public class CategoryInfoDto {
    private final Long id;
    private final String typeName;
    private final String date;
    private final String color;
    private final String icon;
    private final long recordsNumber;
    private final double transactionsValue;

    public CategoryInfoDto(Category category, long recordsNumber, double transactionsValue){
        this.id = category.getId();
        this.typeName = category.getCategoryType().getName();
        this.date = category.getDate();
        this.color = category.getCategoryType().getColor();
        this.icon = category.getCategoryType().getIcon();
        this.recordsNumber = recordsNumber;
        this.transactionsValue = transactionsValue;
    }

    public Long getId() {
        return id;
    }

    public String getTypeName() {
        return typeName;
    }

    public String getDate() {
        return date;
    }

    public String getColor() {
        return color;
    }

    public String getIcon() {
        return icon;
    }

    public long getRecordsNumber() {
        return recordsNumber;
    }

    public double getTransactionsValue() {
        return transactionsValue;
    }
}
