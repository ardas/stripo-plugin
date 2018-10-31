package com.stripo.plugin.example.rest;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.stripo.plugin.example.rest.dto.Email;
import com.stripo.plugin.example.rest.dto.PluginToken;
import com.stripo.plugin.example.rest.dto.PluginTokenParams;
import com.stripo.plugin.example.rest.dto.Template;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@RestController
@CommonsLog
public class SampleRestController {
	//Set your pluginId and secretKey values in application.properties file
	@Value("${pluginId}")
	private String pluginId;
	@Value("${secretKey}")
	private String secretKey;

	@PostConstruct
	public void init() {
		if (StringUtils.isEmpty(pluginId) || StringUtils.isEmpty(secretKey)) {
			log.error(
					"\n----------------------------------------------------------------------------------\n" +
					"   Please, set 'pluginId' and 'secretKey' values in application.properties file\n" +
					"----------------------------------------------------------------------------------");
			System.exit(1);
		}
	}


	// This endpoint is used to get valid authentication token to communicate with Stripo Plugin Backend
	@GetMapping("/token")
	public ResponseEntity<PluginToken> getPluginsToken() throws UnirestException {
		HttpResponse<PluginToken> response = Unirest
				.post("https://plugins.stripo.email/api/v1/auth")
				.header("Content-type", "application/json")
				.body(PluginTokenParams.builder().pluginId(pluginId).secretKey(secretKey).build())
				.asObject(PluginToken.class);

		return ResponseEntity.status(response.getStatus()).body(response.getBody());
	}

	// This endpoint is used to compile HTML code from template (HTML and CSS)
	@PostMapping("/compile")
	public ResponseEntity<Email> compileTemplate(@RequestBody Template template) throws UnirestException {
		// First, get valid authentication token
		ResponseEntity<PluginToken> pluginsTokenResponse = getPluginsToken();
		if (!pluginsTokenResponse.getStatusCode().is2xxSuccessful()) {
			return ResponseEntity.status(pluginsTokenResponse.getStatusCode()).build();
		}

		// minimize - boolean flag. If true - result will be a single line of code without line breaks
		template.setMinimize(true);

		// Second, send request to Stripo Plugin Backend to compile and minimize code
		HttpResponse<Email> response = Unirest
				.post("https://plugins.stripo.email/api/v1/cleaner/v1/compress")
				.header("Content-type", "application/json")
				.header("ES-PLUGIN-AUTH", String.format("Bearer %s", pluginsTokenResponse.getBody().getToken()))
				.body(template)
				.asObject(Email.class);
		return ResponseEntity.status(response.getStatus()).body(response.getBody());
	}

}
