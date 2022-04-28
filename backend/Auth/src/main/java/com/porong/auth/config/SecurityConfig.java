package com.porong.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
//        super.configure(web);
//        web
//                .ignoring()
//                .antMatchers(
//                        "/h2-console/**", // h2 하위 모든 요청 무시
//                        "favicon.ico" // 파비콘 관련 요청 무시
//                );
        web.ignoring().antMatchers("/oauth/*");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);
//        http
//                .authorizeRequests() // http servlet request 를 사용하는 요청들에 대한 접근 제한을 설정하겠다
//                .antMatchers(
//                        "/member/login/*",
//                        "/member/logout",
//                        "/member/createMember",
//                        "/error/*"
//                ).permitAll() // api/hello 에 대한 요청은 인증 없이 접근을 허용하겠다
//                .anyRequest().authenticated(); // 나머지 요청들에 대해서는 무조건 인증을 받아야 한다
        http.csrf().disable();
    }
}
