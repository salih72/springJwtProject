package com.consumerapp.consumerApplication;

import com.consumerapp.consumerApplication.services.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@SpringBootApplication
public class ConsumerApplication {

	private final WebSocketServer socketServer;

	@Autowired
	public ConsumerApplication(WebSocketServer socketServer) {
		this.socketServer = socketServer;
	}

	public static void main(String[] args) throws InterruptedException, IOException {
		ApplicationContext context = SpringApplication.run(ConsumerApplication.class, args);
		ConsumerApplication app = context.getBean(ConsumerApplication.class);
		app.startSocketServer();
	}

	private void startSocketServer() throws IOException, InterruptedException {
		socketServer.start();

		BufferedReader sysin = new BufferedReader(new InputStreamReader(System.in));
		while (true) {
			String in = sysin.readLine();
			socketServer.broadcast(in);
			if (in.equals("exit")) {
				socketServer.stop(1000);
				break;
			}
		}
	}
}
