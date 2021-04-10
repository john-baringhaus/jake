package com.techelevator.dao;



import com.techelevator.model.Style;

import java.math.BigDecimal;
import java.util.List;

public interface StyleDAO {
    /**
     * gets all available Styles
     * @return List<Style> containing all available Styles
     */
    List <Style> getAvailableStyles();

    /**
     * gets all Styles in database
     * @return List<Style> containing all Styles in database
     */
    List<Style> getAllStyles();

    /**
     * inserts a new Style into the datastore
     * @param styleName String name of the Style
     * @param priceMod BigDecimal how much for the Style
     * @return int ID of the new Style
     */
    int createStyle(String styleName, BigDecimal priceMod);

    /**
     * changes the availability status of a Style
     * @param ID int ID of the Style changing availability
     * @return boolean for the availability status of the Style after the change
     */
    boolean flipAvailability(int ID);

    /**
     * removes a Style from the datastore
     * @param ID int ID of the Style to delete
     * @return String confirmation that the Style was deleted (probably the name plus " was deleted."
     */
    String deleteStyle(int ID);
}