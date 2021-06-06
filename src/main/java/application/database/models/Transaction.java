package application.database.models;

import application.dto.TransactionInfoDto;

import javax.persistence.*;

@Entity
@Table(name = "user_transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private double value;

    @Column(name = "date")
    private String date;

    public Transaction() {
    }

    public Transaction(TransactionInfoDto transactionInfoDto, Long categoryId) {
        this.categoryId = categoryId;
        this.name = transactionInfoDto.getName();
        this.value = transactionInfoDto.getValue();
        this.date = transactionInfoDto.getDay();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
