var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable("JWT_TOKEN", jsonData.token);
