package com.dangam.namu.core.config.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

//    @Bean
//    public AuthenticationEntryPoint authenticationEntryPoint() {
//      logger.info("********** WebSecurityConfig > authenticationEntryPoint");
//    	return new AuthenticationEntryPoint() {
//			@Override
//			public void commence(HttpServletRequest request, HttpServletResponse response,
//					AuthenticationException authException) throws IOException, ServletException {
//				if (request.getRequestURI().startsWith("/admin")) {
//		    		response.sendRedirect("/login?callbackUrl=" + request.getRequestURI());
//		    	} else {
//		    		// for REST (XHR)
//		    		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//		    	}
//			}
//		};
//    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//      logger.info("********** WebSecurityConfig > configure AuthenticationManagerBuilder");
//        auth.userDetailsService(userAuthService).passwordEncoder(new ShaPasswordEncoder(256));
//    }

    @Override
    public void configure(WebSecurity web) throws Exception {
      logger.info("********** WebSecurityConfig > configure WebSecurity");
        web.ignoring()
            .antMatchers("/resources/**")
            ;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
      logger.info("********** WebSecurityConfig > configure HttpSecurity");
		httpSecurity
				.headers().frameOptions().sameOrigin().and()
				.csrf().disable()
				.authorizeRequests()
  				    .anyRequest().permitAll()
  				.and()
//  				.formLogin()
//  				    .loginPage("/auth/login")
//  				    .usernameParameter("userId")
//  				    .passwordParameter("password")
//  				    .loginProcessingUrl("/auth/loginProcess")
//  				    .defaultSuccessUrl("/auth/loginSuccess")
//  				    .successHandler(authSuccessHandler())
//  				    .failureHandler(authFailureHandler())
//				.and()
//				.exceptionHandling()
//				    .accessDeniedHandler(accessDeniedHandler())
//				    .authenticationEntryPoint(authenticationEntryPoint())
//				.and()
//				.logout()
//				    .invalidateHttpSession(true)
//				    .logoutUrl("/logout")
//				    .logoutSuccessUrl("/")
//				    .deleteCookies("JSESSIONID", "rememberMe")
//				    .deleteCookies("SPRING_SECURITY_REMEMBER_ME_COOKIE")
//				    .permitAll()
//				.and()
//				.rememberMe()
//				    .key("myEEPKey")
//				    .rememberMeParameter("rememberMe")
//				    .tokenValiditySeconds(86400) // 1 Day
//				.and()
//                .sessionManagement()
//                    .invalidSessionUrl("auth/logionDuplicate")
//                    .maximumSessions(1)
//                    .expiredUrl("/auth/logionDuplicate")
				;
	}
//
//    @Bean
//    public AuthenticationSuccessHandler authSuccessHandler() throws Exception{
//      logger.info("********** WebSecurityConfig > authSuccessHandler");
//        LoginSuccessHandler loginSuccessHandler = null;
//        try {
//          loginSuccessHandler = new LoginSuccessHandler();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return loginSuccessHandler;
//    }
//
//    @Bean
//    public AuthenticationFailureHandler authFailureHandler() throws Exception{
//      logger.info("********** WebSecurityConfig > authFailureHandler");
//        LoginFailureHandler loginFailureHandler = null;
//        try {
//            loginFailureHandler = new LoginFailureHandler();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return loginFailureHandler;
//    }
//
//    @Bean
//    public AccessDeniedHandler accessDeniedHandler() throws Exception{
//      logger.info("********** WebSecurityConfig > accessDeniedHandler");
//        AuthAccessDeniedHandler accessDeniedHandler = null;
//        try {
//            accessDeniedHandler = new AuthAccessDeniedHandler();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }//end try
//        return accessDeniedHandler;
//    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher(){
      logger.info("********** WebSecurityConfig > httpSessionEventPublisher");
        return new HttpSessionEventPublisher();
    }
}