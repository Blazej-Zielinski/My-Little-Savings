package application.dto;

public class TransactionInfoDto {
    private String name;
    private double value;
    private String day;

    public TransactionInfoDto(String name, double value, String day) {
        this.name = name;
        this.value = value;
        this.day = day;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }
}
