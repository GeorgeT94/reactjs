package web.app.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class AccountRestController {

    //@Autowired private Employee employee;

    @Autowired private EmployeeRepository employeeRepository;

    @RequestMapping(value = "/addAccount", method = RequestMethod.POST)

    public ResponseEntity< String > addAccount(@RequestBody Employee employee) {
        if (true) {

            employeeRepository.save(employee);

            return ResponseEntity.status(HttpStatus.CREATED).build();

        }

        return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();

    }

}