package com.dangam.namu.api.dao;


import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.dangam.namu.api.dto.Branch;
import com.dangam.namu.api.dto.Code;
import com.dangam.namu.api.dto.Product;

@Repository
public class ApiDao {
	@Autowired
	private SqlSession session;

	private static String namespace = "com.dangam.namu.api.mapper.HomeMapper";
	
	public List<Code> getUid(){
		return session.selectList(namespace + ".getUid");
	}
	
	public List<Code> getId(){
		return session.selectList(namespace + ".getId");
	}
	
	public List<Product> getBookByAge(Integer age) throws Exception {
		return session.selectList(namespace + ".getBookByAge", age);
	}
	
	public List<Code> getIdByUid(String uid){
		return session.selectList(namespace + ".getIdByUid", uid);
	}
	
	public List<Product> getBookById(Object param){
		return session.selectList(namespace + ".getBookById", param);
	}
	
	public List<Product>  getBookByAgeAndUid(Object param){
		System.out.println("apidao:"+param);
		return session.selectList(namespace + ".getBookByAgeAndUid", param);
	}
	
	public List<Branch> getBranchInfo(Object param){
		return session.selectList(namespace + ".getBranchInfo", param);
	}
	
	
	
}
