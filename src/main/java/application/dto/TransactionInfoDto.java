package application.dto;

public class TransactionInfoDto {
    private final long id;
    private final String name;
    private final double value;
    private final String day;

    public TransactionInfoDto(long id, String name, double value, String day) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.day = day;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getValue() {
        return value;
    }

    public String getDay() {
        return day;
    }
}
