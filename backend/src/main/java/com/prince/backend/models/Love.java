package com.prince.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "love")
public class Love {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long postId;
    private long userId;

    public Love() {
    }
    public Love(long postId, long userId) {
        this.postId = postId;
        this.userId = userId;
    }

    public long getPostId() {
        return postId;
    }
    public long getUserId() {
        return userId;
    }
    
    public void setPostId(long postId) {
        this.postId = postId;
    }
    public void setUserId(long userId) {
        this.userId = userId;
    }


}
