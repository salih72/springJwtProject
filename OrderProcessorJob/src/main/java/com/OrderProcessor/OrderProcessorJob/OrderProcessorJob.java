package com.OrderProcessor.OrderProcessorJob;

import com.google.gson.Gson;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.ArrayList;
import java.util.List;

public class OrderProcessorJob implements Runnable {
	private final HttpClient httpClient;

	public OrderProcessorJob(HttpClient httpClient) {
		this.httpClient = httpClient;
	}

	@Override
	public void run() {
		List<String> tokens = new ArrayList<>();

		List<LoginUserDto> loginUserDtos = List.of(
				new LoginUserDto("bot@1", "123"),
				new LoginUserDto("bot@2", "123"),
				new LoginUserDto("bot@3", "123"),
				new LoginUserDto("bot@4", "123"),
				new LoginUserDto("bot@5", "123"),
				new LoginUserDto("bot@6", "123"),
				new LoginUserDto("bot@7", "123")
		);

		for (LoginUserDto loginUserDto : loginUserDtos) {
			LoginResponse loginResponse = login(loginUserDto);

			if (loginResponse != null) {
				tokens.add(loginResponse.getToken());
			}
		}

		while (true) {
			for (String token : tokens) {
				CreateOrderRequest createOrderRequest = new CreateOrderRequest(
						List.of(new Product(1, "Cağ Kebap", 200, 1)),
						200,
						"Istanbul"
				);

				createOrder(createOrderRequest, token);

				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					Thread.currentThread().interrupt();
					break;
				}
			}
		}
	}

	private LoginResponse login(LoginUserDto user) {
		try {
			Gson gson = new Gson();
			String json = gson.toJson(user);

			HttpRequest request = HttpRequest.newBuilder()
					.uri(URI.create("http://localhost:8081/auth/login"))
					.header("Content-Type", "application/json")
					.POST(BodyPublishers.ofString(json))
					.build();

			HttpResponse<String> response = httpClient.send(request, BodyHandlers.ofString());

			if (response.statusCode() == 200) {
				return gson.fromJson(response.body(), LoginResponse.class);
			}
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}

	private void createOrder(CreateOrderRequest createOrderRequest, String token) {
		try {
			Gson gson = new Gson();
			String json = gson.toJson(createOrderRequest);

			HttpRequest request = HttpRequest.newBuilder()
					.uri(URI.create("http://localhost:8081/api/orders"))
					.header("Content-Type", "application/json")
					.header("Authorization", "Bearer " + token)
					.POST(BodyPublishers.ofString(json))
					.build();

			httpClient.send(request, BodyHandlers.discarding());
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		HttpClient httpClient = HttpClient.newHttpClient();
		OrderProcessorJob job = new OrderProcessorJob(httpClient);
		Thread thread = new Thread(job);
		thread.start();
	}
}

class LoginResponse {
	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}

class LoginUserDto {
	private String email;
	private String password;

	public LoginUserDto(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}

class CreateOrderRequest {
	private List<Product> products;
	private double totalAmount;
	private String customerAddress;

	public CreateOrderRequest(List<Product> products, double totalAmount, String customerAddress) {
		this.products = products;
		this.totalAmount = totalAmount;
		this.customerAddress = customerAddress;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getCustomerAddress() {
		return customerAddress;
	}

	public void setCustomerAddress(String customerAddress) {
		this.customerAddress = customerAddress;
	}
}

class Product {
	private long id;
	private String name;
	private double price;
	private int quantity;

	public Product(long id, String name, double price, int quantity) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.quantity = quantity;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
