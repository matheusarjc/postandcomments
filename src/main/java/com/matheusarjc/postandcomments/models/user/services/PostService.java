package com.matheusarjc.postandcomments.models.user.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.matheusarjc.postandcomments.models.user.PostEntity;
import com.matheusarjc.postandcomments.models.user.repositories.PostRepository;

@Service
public class PostService {

    @Autowired
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        super();
        this.postRepository = postRepository;
    }

    // Create a new post
    public PostEntity createPost(PostEntity postEntity) {
        return postRepository.save(postEntity);
    }

    // Get a post by id
    public Optional<PostEntity> getPostById(UUID id) {
        return postRepository.findById(id);
    }

    // Update a post
    public PostEntity updatePost(UUID id, PostEntity postDetails) {
        PostEntity post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
        post.setTextContent(postDetails.getTextContent());
        post.setPhotoUrl(postDetails.getPhotoUrl());
        return postRepository.save(post);
    }

    // Delete a post
    public void deletePost(UUID id) {
        PostEntity post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
        postRepository.delete(post);
    }

    // Method to list all posts or by userId
    public List<PostEntity> findAllPosts() {
        return postRepository.findAll();
    }

    // Example method to find posts by userId, assuming you have a field 'userId' in
    // Post
    public List<PostEntity> findPostsByUserId(UUID userId) {
        return postRepository.findByUserId(userId);
    }
}
