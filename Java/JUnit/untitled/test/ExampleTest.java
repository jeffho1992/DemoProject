import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class ExampleTest {

    public int multiply(int x, int y) {
        if (x > 999) {
            throw new IllegalArgumentException("X should be less than 1000");
        }
        return x / y;
    }

    @Order(2)
    @Test
    void testExceptionIsThrown() {
        assertThrows(IllegalArgumentException.class, () -> multiply(1000, 5));
    }

    @Order(1)
    @Test
    void testMultiply() {
        assertEquals(50, multiply(10, 5), "10 x 5 must be 50");
    }


}
