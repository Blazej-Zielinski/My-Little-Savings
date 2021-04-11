package application.dto;

public class BudgetInfoDto {
    private double value;
    private String startDate;
    private String endDate;
    private String typeName;
    private String color;

    public BudgetInfoDto(double value, String startDate, String endDate, String typeName, String color) {
        this.value = value;
        this.startDate = startDate;
        this.endDate = endDate;
        this.typeName = typeName;
        this.color = color;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
