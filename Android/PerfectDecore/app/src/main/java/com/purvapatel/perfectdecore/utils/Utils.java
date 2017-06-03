package com.purvapatel.perfectdecore.utils;

/**
 * Created by Akshay on 11/28/2016.
 */

public class Utils
{
    private static Utils utils = null;
    public String base_url = "https://perferctdecore.herokuapp.com/";

    public static Utils getInstance()
    {
        if (utils == null)
        {
            utils = new Utils();
        }

        return utils;
    }
}
