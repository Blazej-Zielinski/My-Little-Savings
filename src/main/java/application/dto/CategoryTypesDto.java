package application.dto;

public class CategoryTypesDto {
    private final long id;
    private final String name;
    private final String icon;
    private final String color;

    public CategoryTypesDto(long id, String name, String icon, String color) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }

    public long getId() {
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
