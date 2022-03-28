package com.prince.backend.controllers;

import com.prince.backend.security.services.ResponseObjectService;
import com.prince.backend.security.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class UserController {
    @Autowired
    private UserDetailsServiceImpl userService;

    @GetMapping("/users")
    public ResponseEntity<ResponseObjectService> findAllUsers() {
        return new ResponseEntity<ResponseObjectService>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseObjectService> findById(@PathVariable String userId) {
        return new ResponseEntity<ResponseObjectService>(userService.findById(Long.parseLong(userId)), HttpStatus.OK);
    }
}
