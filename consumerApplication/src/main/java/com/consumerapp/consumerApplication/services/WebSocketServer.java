package com.consumerapp.consumerApplication.services;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.springframework.stereotype.Service;

@Service
public class WebSocketServer extends org.java_websocket.server.WebSocketServer {

    public WebSocketServer() {
        super(new InetSocketAddress(8074));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        conn.send("Connection established");
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) {
        //ignored
    }

    @Override
    public void onMessage(WebSocket conn, String message) {
        conn.send(message);
    }

    @Override
    public void onMessage(WebSocket conn, ByteBuffer message) {
        conn.send(message.array());
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        ex.printStackTrace();
        conn.close();
    }

    @Override
    public void onStart() {
        System.out.println("Server started!");
        setConnectionLostTimeout(0);
        setConnectionLostTimeout(100);
    }

    public void publishMessageToAllClients(String message) {
        broadcast(message);
    }
}