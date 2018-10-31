package com.stripo.plugin.example.rest;

import com.google.gson.Gson;
import com.mashape.unirest.http.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import org.springframework.stereotype.Component;

@Component
public class JsonObjectMapper implements ObjectMapper {
	private Gson gson;

	public JsonObjectMapper() {
		gson = new Gson();
		Unirest.setObjectMapper(this);
	}

	@Override
	public <T> T readValue(String value, Class<T> valueType) {
		return gson.fromJson(value, valueType);
	}

	@Override
	public String writeValue(Object value) {
		return gson.toJson(value);
	}
}
