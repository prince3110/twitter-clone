package com.prince.backend.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users", 
    uniqueConstraints = { 
      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();


  // @OneToMany(fetch = FetchType.LAZY)
  // @JoinTable(  name = "user_follows", 
  //       joinColumns = @JoinColumn(name = "user_id"), 
  //       inverseJoinColumns = @JoinColumn(name = "follows_followerId"))
  // private Set<Long> followings = new HashSet<>();

  // @OneToMany(fetch = FetchType.LAZY)
  // @JoinTable(  name = "user_follows", 
  //       joinColumns = @JoinColumn(name = "user_id"), 
  //       inverseJoinColumns = @JoinColumn(name = "follows_followingId"))
  // private Set<Long> followers = new HashSet<>();

  public User() {
  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  // public void setFollowings(Set<Long> followings){
  //   this.followings = followings;
  // }

  // public Set<Long> getFollowings() {
  //   return this.followings;
  // }

  // public void setFollowers(Set<Long> followers){
  //   this.followers = followers;
  // }

  // public Set<Long> getFollowers() {
  //   return this.followers;
  // }

}
