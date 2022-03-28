package com.prince.backend.models;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long followerId;

    private Long followingId;
    
    public Follow() {
    }
    public Follow(Long followerId, Long followingId) {
        this.setFollowerId(followerId);
        this.setFollowingId(followingId);
    }

    public Long getFollowerId() {
        return followerId;
    }
    public void setFollowerId(Long followerId) {
        this.followerId = followerId;
    }

    public Long getFollowingId() {
        return followingId;
    }
    public void setFollowingId(Long followingId) {
        this.followingId = followingId;
    }
}
