package com.dangam.namu.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dangam.namu.api.dao.ApiDao;
import com.dangam.namu.api.dto.Branch;
import com.dangam.namu.api.dto.Code;
import com.dangam.namu.api.dto.Product;

@Service
public class ApiService {
	
	@Autowired
	private ApiDao apiDao;
		
	public List<Code> getUid(){
		return apiDao.getUid();
	}
	
	public List<Code> getId(){
		return apiDao.getId();
	}
	
	public List<Product> getBookByAge(Integer age) throws Exception {
		return apiDao.getBookByAge(age);
    }
	
	public List<Code> getIdByUid(String uid) throws Exception {
		return apiDao.getIdByUid(uid);
	}

	public List<Product> getBookById(Object param){
		return apiDao.getBookById(param);
	}
	
	public List<Product> getBookByAgeAndUid(Object param){
		System.out.println("apiservice"+param);
		return apiDao.getBookByAgeAndUid(param);
	}
	public List<Branch>getBranchInfo(Object param){
		return apiDao.getBranchInfo(param);
	}
}
