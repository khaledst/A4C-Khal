<?php
namespace MangoPay\Tests;

/**
 * Storage strategy implementation for tests
 */
class MockStorageStrategy implements \MangoPay\IStorageStrategy {
    
    private static $_oAuthToken = null;
    
    /**
     * Gets the current authorization token.
     * @return \MangoPay\OAuthToken Currently stored token instance or null.
     */
    public function Get() {
        return self::$_oAuthToken;
    }

    /**
     * Stores authorization token passed as an argument.
     * @param \MangoPay\OAuthToken $token Token instance to be stored.
     */
    public function Store($token) {
        self::$_oAuthToken = $token;
    }
}
