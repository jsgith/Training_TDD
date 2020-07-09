package com.morethenonecoffe.demo.service;

import com.morethenonecoffe.demo.DemoApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DemoApplication.class)
@WebAppConfiguration
public class ProductServiceTest {

   @Autowired
   private WebApplicationContext webApplicationContext;

   private MockMvc mockMvc;

   @Before
   public void setupMockMvc () {
       mockMvc  = MockMvcBuilders
               .webAppContextSetup(webApplicationContext)
               .apply(springSecurity())
               .build();
   }

   @Test
   @WithMockUser(username="userMock", password = "userMock", roles = "USER")
   public void viewHomePage_unauthenticatedUser() throws Exception {
      mockMvc.perform(get("/user"))
              .andExpect(status().is3xxRedirection())
              .andExpect(header().string("Location", "http://localhost/login"));
   }

   @Test
   public void viewHomePage() throws Exception {
       mockMvc.perform(get("/user"))
               .andExpect(status().isOk())
               .andExpect(view().name("index"));
   }
/*
   @Test
   public void viewHomePageUser() throws Exception {
      mockMvc.perform(MockMvcRequestBuilders.get("/user"))
              .andExpect(status().isOk())
              .andExpect(view().name("index"))
              .andExpect(model().attributeExists("listProducts"))
              .andExpect(model().attribute("listProducts", is(empty())));
   }
 */
}
