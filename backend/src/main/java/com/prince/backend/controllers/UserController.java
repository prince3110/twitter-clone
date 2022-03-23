package com.prince.backend.controllers;

// import com.prince.backend.models.DoubleIdObject;
import com.prince.backend.models.IdObject;
import com.prince.backend.security.services.ResponseObjectService;
import com.prince.backend.security.services.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/user/profile")
    public ResponseEntity<ResponseObjectService> findById(@RequestBody IdObject inputId) {
        return new ResponseEntity<ResponseObjectService>(userService.findById(inputId.getUserId()), HttpStatus.OK);
    }

    // @PostMapping("/users/follow")
    // public ResponseEntity<ResponseObjectService> followUser(@RequestBody DoubleIdObject doubleId) {
    //     return new ResponseEntity<ResponseObjectService>(userService.followUser(doubleId), HttpStatus.OK);
    // }

    // @PostMapping("/users/unfollow")
    // public ResponseEntity<ResponseObjectService> unfollowUser(@RequestBody DoubleIdObject doubleId) {
    //     return new ResponseEntity<ResponseObjectService>(userService.unfollowUser(doubleId), HttpStatus.OK);
    // }

    // @PostMapping("/users/getfollowing")
    // public ResponseEntity<ResponseObjectService> findFollowing(@RequestBody IdObject inputId) {
    //     return new ResponseEntity<ResponseObjectService>(userService.findFollowing(inputId.getUserId()), HttpStatus.OK);
    // }

    // @PostMapping("/users/getfollower")
    // public ResponseEntity<ResponseObjectService> findFollower(@RequestBody IdObject inputId) {
    //     return new ResponseEntity<ResponseObjectService>(userService.findFollower(inputId.getUserId()), HttpStatus.OK);
    // }
}
