package com.prince.backend.repository;

import java.util.List;

import com.prince.backend.models.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	List<Comment> findByPostId(Long postId);
}
