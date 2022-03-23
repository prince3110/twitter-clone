package com.prince.backend.security.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import com.prince.backend.models.IdObject;
import com.prince.backend.models.PostEntity;
import com.prince.backend.repository.PostRepository;
// import com.prince.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepo;

    // @Autowired
    // private UserRepository userRepo;

    public ResponseObjectService insertPost(PostEntity inputPost) {
        ResponseObjectService responseObj = new ResponseObjectService();
        inputPost.setCreatedAt(Instant.now());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(postRepo.save(inputPost));
        return responseObj;
    }

    public ResponseObjectService findPostByUserId(IdObject userId) {
        ResponseObjectService responseObj = new ResponseObjectService();
        Optional<List<PostEntity>> userPostsOpt = postRepo.findByUserIdOrderByCreatedAtDesc(userId.getUserId());
        List<PostEntity> userPosts = userPostsOpt.get();
        if(userPosts.isEmpty() == true) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find any post from user id: " + userId.getUserId());
            responseObj.setPayload(null);
            return responseObj;
        }
        else {
            responseObj.setStatus("success");
            responseObj.setMessage("success");
            responseObj.setPayload(userPosts);
            return responseObj;
        }
    }

    public ResponseObjectService findAll() {
        ResponseObjectService responseObj = new ResponseObjectService();
        responseObj.setPayload(postRepo.findAll());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        return responseObj;
    }

    // public ResponseObjectService findPostByUserId(Long userId) {
    //     ResponseObjectService responseObj = new ResponseObjectService();
    //     Optional<List<PostEntity>> userPostsOpt = postRepo.findByUserIdOrderByCreatedAtDesc(userId);
    //     List<PostEntity> userPosts = userPostsOpt.get();
    //     if(userPosts.isEmpty() == true) {
    //         responseObj.setStatus("fail");
    //         responseObj.setMessage("cannot find any post from user id: " + userId);
    //         responseObj.setPayload(null);
    //         return responseObj;
    //     }
    //     else {
    //         responseObj.setStatus("success");
    //         responseObj.setMessage("success");
    //         responseObj.setPayload(userPosts);
    //         return responseObj;
    //     }
    // }


}
