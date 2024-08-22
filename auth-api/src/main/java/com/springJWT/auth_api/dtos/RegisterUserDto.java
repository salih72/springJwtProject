package com.springJWT.auth_api.dtos;

public class RegisterUserDto {

    private String email;

    private String password;

    private String fullName;

    private String customerAddress;


    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    public String getFullName() {
        return fullName;
    }


    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }




}
