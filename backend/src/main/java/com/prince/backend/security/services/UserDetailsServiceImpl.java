package com.prince.backend.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import com.prince.backend.models.User;
import com.prince.backend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepo;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepo.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }

  public ResponseObjectService findAll() {
    ResponseObjectService responseObj = new ResponseObjectService();
    responseObj.setPayload(userRepo.findAll());
    responseObj.setStatus("success");
    responseObj.setMessage("success");
    return responseObj;
  }

  public ResponseObjectService findById(Long id) {
    ResponseObjectService responseObj = new ResponseObjectService();
    Optional<User> optUser = userRepo.findById(id);
    if (optUser.isEmpty()) {
        responseObj.setStatus("fail");
        responseObj.setMessage("user id: " + id + " not existed");
        responseObj.setPayload(null);
        return responseObj;
    } else {
        responseObj.setPayload(optUser.get());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        return responseObj;
    }
  }

}
