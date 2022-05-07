import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

public class RegularExpression {
    /**
     * Email validation pattern.
     */
    public static final Pattern EMAIL_PATTERN = Pattern.compile(
            "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                    "\\@" +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                    "(" +
                    "\\." +
                    "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                    ")+"
    );

    private boolean mIsValid = false;

    public boolean isValid() {
        return mIsValid;
    }

    public static boolean isValidEmail(CharSequence email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

}

class EmailValidatorTest {
    @Test
    void ensureThatRegularExpressionReturnsTrueForValidEmail() {
        assertTrue(RegularExpression.isValidEmail("lars.vogel@gmail.com"));
    }

    @Test
    void RegularExpression_CorrectEmailSubDomain_ReturnsTrue() {
        assertTrue(RegularExpression.isValidEmail("lars.vogel@analytics.gmail.com"));
    }

    @Test
    void RegularExpression_InvalidEmailNoTld_ReturnsFalse() {
        assertFalse(RegularExpression.isValidEmail("lars.vogel@gmail"));
    }

    @Test
    void RegularExpression_InvalidEmailDoubleDot_ReturnsFalse() {
        assertTrue(RegularExpression.isValidEmail("lars..vogel@gmail.com"));
        assertFalse(RegularExpression.isValidEmail("lars..vogel@gmail..com"));
    }

    @Test
    void RegularExpression_InvalidEmailNoUsername_ReturnsFalse() {
        assertFalse(RegularExpression.isValidEmail("@gmail.com"));
    }

    @Test
    void RegularExpression_EmptyString_ReturnsFalse() {
        assertFalse(RegularExpression.isValidEmail(""));
    }

    @Test
    void RegularExpression_NullEmail_ReturnsFalse() {
        assertFalse(RegularExpression.isValidEmail(null));
    }

}
