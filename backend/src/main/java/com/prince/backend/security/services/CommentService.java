package com.prince.backend.security.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.prince.backend.models.Comment;
import com.prince.backend.models.PostEntity;
import com.prince.backend.repository.CommentRepository;
import com.prince.backend.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private PostRepository postRepo;

//     @Autowired
//     private PostService postService;


    public ResponseObjectService insertComment(Comment inputComment) {
        ResponseObjectService responseObj = new ResponseObjectService();
        long inputPostId = inputComment.getPostId();
        Optional<PostEntity> optPost = postRepo.findById(inputPostId);
        if(optPost.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find target post id: " + inputPostId);
            responseObj.setPayload(null);
            return responseObj;
        }
        else{
            commentRepo.save(inputComment);
            PostEntity targetPost = optPost.get();
            List<Comment> commentList = targetPost.getComments();
            if(commentList == null){
                commentList = new ArrayList<>();
            }
            commentList.add(inputComment);
            targetPost.setComments(commentList);
            postRepo.save(targetPost);
            responseObj.setStatus("success");
            responseObj.setMessage("success");
            responseObj.setPayload(targetPost);
            return responseObj;
        }
    }

    public void deleteComment(Comment comment) {
        commentRepo.delete(comment);
    }

    public void deleteCommentByPostId(Long postId) {
        List<Comment> comments = commentRepo.findByPostId(postId);
        for(Comment comment: comments) {
            deleteComment(comment);
        }
    }
    
}
