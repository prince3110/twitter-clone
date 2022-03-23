package com.prince.backend.controllers;

import com.prince.backend.models.IdObject;
import com.prince.backend.models.PostEntity;
import com.prince.backend.security.services.PostService;
import com.prince.backend.security.services.ResponseObjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/insertpost")
    public ResponseEntity<ResponseObjectService> insertPost(@RequestBody PostEntity inputPost) {
        return new ResponseEntity<ResponseObjectService>(postService.insertPost(inputPost),HttpStatus.OK);
    }

    @PostMapping("/myposts")
    public ResponseEntity<ResponseObjectService> findPostByUserId(@RequestBody IdObject userId) {
        return new ResponseEntity<ResponseObjectService>(postService.findPostByUserId(userId),HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<ResponseObjectService> findAll() {
        return new ResponseEntity<ResponseObjectService>(postService.findAll(),HttpStatus.OK);
    }

    // @GetMapping("/myposts/{userId}")
    // public ResponseEntity<ResponseObjectService> findPostByUserId(@RequestBody String userId) {
    //     return new ResponseEntity<ResponseObjectService>(postService.findPostByUserId(Long.parseLong(userId)),HttpStatus.OK);
    // }

}
