package com.techelevator.controller;

import com.techelevator.dao.OrderDAO;
import com.techelevator.model.Order;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@CrossOrigin
@RestController
public class OrderController {
    private OrderDAO orderDAO;

    public OrderController(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    /**
     * place an order and all of its cake items into the database
     *
     * @param order Order object
     */
    @RequestMapping(path = "/placeOrder", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Integer addOrder(@RequestBody Order order) throws ParseException {
        return orderDAO.placeOrder (order);
    }

<<<<<<< HEAD
    @PreAuthorize ("hasRole('employee')")
    @RequestMapping(value = "orders/{id}", method = RequestMethod.PUT)
=======
    //  @PreAuthorize ("employee")
    @RequestMapping(path = "orders/{id}", method = RequestMethod.PUT)
>>>>>>> 07ba7f07768140b39a5acc50df6d8a085c23fe60
    public Order updateOrderStatus(@PathVariable int id, @RequestBody Order order) throws ParseException {
        orderDAO.updateOrder (order, id);
        return order;
    }

    //need auth
    @RequestMapping(path = "/orders", method = RequestMethod.GET)
    public List <Order> getAllOrders() {
        return orderDAO.getAllOrders ();
    }


}