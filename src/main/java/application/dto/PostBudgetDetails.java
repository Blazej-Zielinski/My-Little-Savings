package application.dto;

public class PostBudgetDetails {
    private final double value;
    private final String date;
    private final Long id;
    private final String name;
    private final String icon;
    private final String color;

    public PostBudgetDetails(double value, String date, Long id, String name, String icon, String color) {
        this.value = value;
        this.date = date;
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }

    public double getValue() {
        return value;
    }

    public String getDate() {
        return date;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getIcon() {
        return icon;
    }

    public String getColor() {
        return color;
    }
}
