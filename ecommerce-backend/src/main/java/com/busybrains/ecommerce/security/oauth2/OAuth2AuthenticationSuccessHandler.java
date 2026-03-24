package com.busybrains.ecommerce.security.oauth2;

import com.busybrains.ecommerce.models.ERole;
import com.busybrains.ecommerce.models.User;
import com.busybrains.ecommerce.repositories.UserRepository;
import com.busybrains.ecommerce.security.jwt.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.oauth2.redirectUri:http://localhost:3000/oauth2/redirect}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        if (email == null) {
            email = name + "@oauth.com"; // Fallback if email is hidden
        }

        User user;
        Optional<User> userOptional = userRepository.findByUsername(email);
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new User(email, email, ""); // No password for OAuth users
            user.setRole(ERole.ROLE_USER);
            user.setProvider("google");
            userRepository.save(user);
        }

        String token = jwtUtils.generateTokenFromUsername(user.getUsername());

        String targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
