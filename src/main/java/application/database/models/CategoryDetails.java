package application.database.models;

public class CategoryDetails {

    private long id;
    private long recordsNumber;
    private double transactionsValue;

    public CategoryDetails(long id, long recordsNumber, double transactionsValue) {
        this.id = id;
        this.recordsNumber = recordsNumber;
        this.transactionsValue = transactionsValue;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRecordsNumber() {
        return recordsNumber;
    }

    public void setRecordsNumber(long recordsNumber) {
        this.recordsNumber = recordsNumber;
    }

    public double getTransactionsValue() {
        return transactionsValue;
    }

    public void setTransactionsValue(double transactionsValue) {
        this.transactionsValue = transactionsValue;
    }

}
