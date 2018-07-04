package web.app.accounts.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import web.app.accounts.Database.Employee;
import web.app.accounts.Database.EmployeeRepository;


@Controller
@RequestMapping(path="/demo")
public class DBcontroller {
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping(path="/add") // Map ONLY GET Requests
    public @ResponseBody String addNewUser (@RequestBody Employee employee) {
        employeeRepository.save(employee);
        return "Saved";
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody String deleteUser(@RequestBody Employee employee){
        employeeRepository.delete(employee);
        return "deleted";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Employee> getAllUsers() {
        return employeeRepository.findAll();
    }
}
