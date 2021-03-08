import java.util.Objects;

public class TestObject {
    private final String name;
    private final int id;
    private final String surname;

    public TestObject(String name, int id, String surname) {
        this.name = name;
        this.id = id;
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public String getSurname() {
        return surname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TestObject that = (TestObject) o;

        if (id != that.id) return false;
        if (!Objects.equals(name, that.name)) return false;
        return Objects.equals(surname, that.surname);
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + id;
        result = 31 * result + (surname != null ? surname.hashCode() : 0);
        return result;
    }
}
