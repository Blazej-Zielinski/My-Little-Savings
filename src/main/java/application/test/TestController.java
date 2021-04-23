package application.test;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/someData")
@CrossOrigin("*")
public class TestController {

    public TestRepo repo = new TestRepo();

    @GetMapping
    public List<TestObject> getTestObjects(){
        return repo.getLocalRepo();
    }
}