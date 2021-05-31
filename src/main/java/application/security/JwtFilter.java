package application.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {
        String header = httpServletRequest.getHeader("authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            httpServletResponse.sendError(HttpStatus.FORBIDDEN.value());
            return;
        } else {
            try {
                String token = header.substring(7);
                Claims claims = Jwts.parser().setSigningKey("admin123").parseClaimsJws(token).getBody();
                httpServletRequest.setAttribute("claims", claims);
            } catch (Exception e) {
                httpServletResponse.sendError(HttpStatus.FORBIDDEN.value());
                return;
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return "/api/login".equals(path) || "/api/register".equals(path);
    }
}
