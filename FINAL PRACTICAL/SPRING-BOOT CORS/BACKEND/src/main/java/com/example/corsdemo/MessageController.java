package com.example.corsdemo;

import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/api/allowed")
    public Map<String, String> allowed() {
        return Map.of("message", "CORS is configured and this request is allowed.");
    }

    @GetMapping("/api/not-configured")
    public Map<String, String> notConfigured() {
        return Map.of("message", "No @CrossOrigin here, browser blocks cross-origin access.");
    }
}
