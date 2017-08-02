package com.dangam.namu.api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.dangam.namu.api.dto.Code;
import com.dangam.namu.api.dto.Product;

@Mapper
public interface HomeMapper {
	
	Product getBook(String bookName);
	Code getUid();
	Code getId();
	List<Product> getBookByAge(Integer age);
	List<Code> getIdByUid(String uid);
	List<Product> getBookById(String bookCode, Integer age);
}
