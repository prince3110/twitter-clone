package com.prince.backend.controllers;

import com.prince.backend.models.Comment;
import com.prince.backend.security.services.CommentService;
import com.prince.backend.security.services.ResponseObjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/insertcomment")
    public ResponseEntity<ResponseObjectService> insertComment(@RequestBody Comment postedComment) {
        return new ResponseEntity<ResponseObjectService>(commentService.insertComment(postedComment), HttpStatus.OK);
    }

    
}
