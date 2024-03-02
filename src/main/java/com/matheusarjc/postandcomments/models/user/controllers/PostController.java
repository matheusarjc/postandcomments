package com.matheusarjc.postandcomments.models.user.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matheusarjc.postandcomments.models.user.PostEntity;
import com.matheusarjc.postandcomments.models.user.services.PostService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create-post")
    public ResponseEntity<PostEntity> createPost(@RequestBody PostEntity postEntity) {
        if (postEntity.getUserId() == null) {
            throw new RuntimeException("User ID cannot be null.");
        }
        PostEntity createdPost = postService.createPost(postEntity);
        System.out.println("Received postEntity: " + postEntity);
        return ResponseEntity.ok(createdPost);
    }

    // Get a post by id
    @GetMapping("/{id}")
    public ResponseEntity<PostEntity> getPostById(@PathVariable UUID id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a post
    @PutMapping("/{id}")
    public ResponseEntity<PostEntity> updatePost(@PathVariable UUID id, @RequestBody PostEntity postDetails) {
        PostEntity updatedPost = postService.updatePost(id, postDetails);
        return ResponseEntity.ok(updatedPost);
    }

    // Delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable UUID id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }

    // List all posts
    @GetMapping("/list-posts")
    public ResponseEntity<List<PostEntity>> getAllPosts() {
        List<PostEntity> posts = postService.findAllPosts();
        return ResponseEntity.ok(posts);
    }

    // List posts by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostEntity>> getPostsByUserId(@PathVariable UUID userId) {
        List<PostEntity> posts = postService.findPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }

}
