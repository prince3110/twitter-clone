package com.prince.backend.controllers;

import com.prince.backend.models.PostEntity;
import com.prince.backend.security.services.PostService;
import com.prince.backend.security.services.ResponseObjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/post")
    public ResponseEntity<ResponseObjectService> insertPost(@RequestBody PostEntity inputPost) {
        return new ResponseEntity<ResponseObjectService>(postService.insertPost(inputPost),HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/post")
    public ResponseEntity<ResponseObjectService> findPostByUserId(@PathVariable String userId) {
        return new ResponseEntity<ResponseObjectService>(postService.findPostByUserId(Long.parseLong(userId)),HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<ResponseObjectService> findAll() {
        return new ResponseEntity<ResponseObjectService>(postService.findAll(),HttpStatus.OK);
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<ResponseObjectService> deletePost(@PathVariable String postId) {
        return new ResponseEntity<ResponseObjectService>(postService.deletePost(Long.parseLong(postId)),HttpStatus.OK);
    }

}
