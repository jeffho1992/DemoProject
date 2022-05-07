import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Calculator {
    public int multiply(int a, int b) {
        return a * b;
    }

    @Test
    public void testwithStatic(){
        assertEquals("10 x 5 must be 50", 50, multiply(10, 5));
    }

}
