import org.junit.Assert;
import org.junit.Test;

public class FirstTestClass {

    @Test
    public void firstTest() {
//        Assert.assertTrue(true);
//        Assert.assertTrue(9>8);
        Assert.assertFalse(8>9);
    }

}
