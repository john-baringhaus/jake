package com.techelevator.dao;

import com.techelevator.model.Filling;
import com.techelevator.model.Flavor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class JDBCFlavorDAO implements FlavorDAO{
    private final JdbcTemplate jdbcTemplate;
    public JDBCFlavorDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Flavor> getAvailableFlavors() {
        String sqlToGetAvailableFlavors = "SELECT * FROM flavors WHERE is_available = TRUE;";
        List<Flavor> availableFlavors = new ArrayList<>();
        SqlRowSet result = jdbcTemplate.queryForRowSet(sqlToGetAvailableFlavors);
        while (result.next()){
            Flavor flavor = mapRowToFlavor(result);
            availableFlavors.add(flavor);
        }
        return availableFlavors;
    }

    @Override
    public List<Flavor> getAllFlavors() {
        String sqlToGetAllFlavors = "SELECT * FROM flavors;";
        List<Flavor> allFlavors = new ArrayList<>();
        SqlRowSet result = jdbcTemplate.queryForRowSet(sqlToGetAllFlavors);
        while (result.next()){
            Flavor flavor = mapRowToFlavor(result);
            allFlavors.add(flavor);
        }
        return allFlavors;
    }

    @Override
    public int createFlavor(String flavorName, BigDecimal priceMod) {
        return 0;
    }

    @Override
    public boolean flipAvailability(int ID) {
        return false;
    }

    @Override
    public String deleteFlavor(int ID) {
        return null;
    }

    public Flavor mapRowToFlavor(SqlRowSet result){
        Flavor flavor = new Flavor();
        flavor.setFlavorID(result.getInt("flavor_id"));
        flavor.setFlavorName(result.getString("flavor_name"));
        flavor.setAvailable(result.getBoolean("is_available"));
        flavor.setPriceMod(result.getBigDecimal("price_mod"));
        return flavor;
    }
}