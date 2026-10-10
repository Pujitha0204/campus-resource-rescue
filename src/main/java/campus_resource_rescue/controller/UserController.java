package campus_resource_rescue.controller;

import campus_resource_rescue.model.LoginRequest;
import campus_resource_rescue.model.User;
import campus_resource_rescue.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register API
  @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody User user) {

    user.setRole("STUDENT");

    User registeredUser = userService.registerUser(user);

        return ResponseEntity.ok(
                Map.of(
                        "id", registeredUser.getId(),
                        "name", registeredUser.getName(),
                        "email", registeredUser.getEmail(),
                        "role", registeredUser.getRole()
                )
        );
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest loginRequest) {

        User user = userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                )
        );
    }

    // Get all users - Admin API
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }
}