import org.junit.Ignore;
import org.junit.Test;
import org.junit.jupiter.api.Disabled;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class staticTesting {

    Calculator calculator;


    @Test
    public void testwithStatic(){
        calculator = new Calculator();
        assertEquals(calculator.multiply(4,5), 20, "Regular multiplication should work");
    }

    @Ignore("test disable")
    @Test
    public void testDisable(){
        calculator = new Calculator();
        System.out.println("I am able now");
        assertEquals(calculator.multiply(4,5), 20, "Regular multiplication should work");
    }



}
