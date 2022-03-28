package com.prince.backend.models;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;


@Entity
@Table(name = "post")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    private long userId;
    private String content;
    private Instant createdAt;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn( name = "postId", referencedColumnName = "id")
    public List<Comment> comments = new ArrayList<>();

    public PostEntity() {
    }

    public PostEntity(long userId, String content, Instant createdAt) {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return this.id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

}
