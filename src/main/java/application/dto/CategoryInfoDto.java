package application.dto;

public class CategoryInfoDto {
    private Long id;
    private String typeName;
    private String date;
    private String color;
    private String icon;

    public CategoryInfoDto(Long id, String typeName, String date, String color, String icon) {
        this.id = id;
        this.typeName = typeName;
        this.date = date;
        this.color = color;
        this.icon = icon;
    }

    public Long getId() {
        return id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIcon() {
        return icon;
    }
}
