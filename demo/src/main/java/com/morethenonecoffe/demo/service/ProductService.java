package com.morethenonecoffe.demo.service;

import com.morethenonecoffe.demo.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> listAll();
    void save(Product product);
    Product get(Long id);
    void delete(Long id);

}
