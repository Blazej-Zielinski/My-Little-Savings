package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class ZtpaiProjektApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZtpaiProjektApplication.class, args);
	}

}
