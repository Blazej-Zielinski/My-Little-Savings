package application.dto;

public class UserInfoDto {
    private String username;

    public UserInfoDto(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }
}
