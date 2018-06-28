package web.app.accounts;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Employee {

    private @Id
    @GeneratedValue
    Long id;
    private String firstName;
    private String surname;
    private int accountNumber;

    private Employee() {}

    public Employee(String firstName, String surname, int accountNumber) {
        this.firstName = firstName;
        this.surname = surname;
        this.accountNumber = accountNumber;
    }
}