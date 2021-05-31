package application.security;


import io.jsonwebtoken.ClaimJwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.TextCodec;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Set;

public class JwtFilter extends BasicAuthenticationFilter {
    private final String secret;

    public JwtFilter(AuthenticationManager authenticationManager,String secret) {
        super(authenticationManager);
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String header = httpServletRequest.getHeader("Authorization");
            UsernamePasswordAuthenticationToken authResult = getAuthenticationByToken(header);
            SecurityContextHolder.getContext().setAuthentication(authResult);
        } catch (ClaimJwtException e) {
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value());
            return;
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private UsernamePasswordAuthenticationToken getAuthenticationByToken(String header) {
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(TextCodec.BASE64.decode(secret))
                .parseClaimsJws(header.replace("Bearer ", ""));

        String username = claimsJws.getBody().get("name").toString();
        String role = claimsJws.getBody().get("role").toString();
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }

}
