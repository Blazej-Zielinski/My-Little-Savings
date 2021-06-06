package application.dto;

public class PostCategoryDetails {
    private final Long id;
    private final String name;
    private final String date;
    private final String color;
    private final String icon;

    public PostCategoryDetails(Long id, String name, String date, String color, String icon) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.color = color;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
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
}
