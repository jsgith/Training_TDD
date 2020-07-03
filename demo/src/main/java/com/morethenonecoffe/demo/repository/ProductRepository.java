package com.morethenonecoffe.demo.repository;


import com.morethenonecoffe.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {

}
