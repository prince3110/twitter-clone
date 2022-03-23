package com.prince.backend.repository;

import java.util.List;
import java.util.Optional;

import com.prince.backend.models.PostEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    Optional<List<PostEntity>> findByUserId(Long userId);
    Optional<List<PostEntity>> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<PostEntity> findAll();
}
