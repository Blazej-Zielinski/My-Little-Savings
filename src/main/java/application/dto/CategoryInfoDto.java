package application.dto;

public class CategoryInfoDto {
    private String typeName;
    private String date;
    private String color;

    public CategoryInfoDto(String typeName, String date, String color) {
        this.typeName = typeName;
        this.date = date;
        this.color = color;
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
}
