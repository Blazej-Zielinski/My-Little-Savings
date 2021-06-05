package application.dto;

public class UserRegistrationInfo {
    private final String name;
    private final String email;
    private final String password;

    public UserRegistrationInfo(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
