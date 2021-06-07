package application.dto;

public class PostBudgetDetails {
    private final double value;
    private final String date;
    private final Long typeId;

    public PostBudgetDetails(double value, String date, Long typeId) {
        this.value = value;
        this.date = date;
        this.typeId = typeId;
    }

    public double getValue() {
        return value;
    }

    public String getDate() {
        return date;
    }

    public Long getTypeId() {
        return typeId;
    }
}
