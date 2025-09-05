<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'tngwebso72_loopos' );

/** MySQL database username */
define( 'DB_USER', 'tngwebso72_loopos' );

/** MySQL database password */
define( 'DB_PASSWORD', 'SjoC8cUbfJaOWuqazSop5qJoVrNJvCgUsRY1qlkKvTtqMD4HqjW2h' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '61dPFmw1Lku5xOiluTJuR628qNLALlCSl3BUNGRAHe69QKgbAOR4VdFzmZrR3nnU' );
define( 'SECURE_AUTH_KEY',   '2QTNpABgdiGK6mdUwbGYl37SDFnSlMcNxb1CQeXRnYHCAD04nQrh6MkT9NuuBQ21' );
define( 'LOGGED_IN_KEY',     'ohNRtdz2hPUHsr9GflJZgqMyTGELAIKydhmoOdSgVBWHRdbeSWHT5604ZF7yA8cY' );
define( 'NONCE_KEY',         'qAGppwW3dY3B5MM5TgSY1sTpkhEKdt8614dK7240NOf2KBIFsdyg8F6pfjF8mr8x' );
define( 'AUTH_SALT',         '7z5HwEpLcKUSyKkknt6tuh5bBllIXyN7T03Q1yWJgJy8IZVcgBy8VsrKmKHHFmlb' );
define( 'SECURE_AUTH_SALT',  'tTMfYHNxtPHN7HaFgN7CJeFaUywUv9QRgrkRR12FweVcR2XFF2vXNZk0snXmqoK3' );
define( 'LOGGED_IN_SALT',    'ZlTeQWEV4yV6COcqZRX8nc6ABIoOH13S3lxNhiJtvj0Mxk13qjM3jjbn5ySyYi7y' );
define( 'NONCE_SALT',        'ZEz0lfVl00xLXch3JporECx1vCNgb3Gg929YxBa1q5gpt8sWEd8H6pXUxKpqFjp1' );
define( 'WP_CACHE_KEY_SALT', '7q0oRAXAyQTFxdeeSoUm7rHglrzXmS2PFadJCVt0FB1c13HWguQKCXvUHgxcHbtS' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/**
 * Security hardening: disable theme/plugin editors in wp-admin
 * and enable core minor auto-updates. Also route debug to a log
 * without displaying errors publicly.
 */
if ( ! defined( 'DISALLOW_FILE_EDIT' ) ) {
    define( 'DISALLOW_FILE_EDIT', true );
}
if ( ! defined( 'WP_AUTO_UPDATE_CORE' ) ) {
    define( 'WP_AUTO_UPDATE_CORE', 'minor' );
}
if ( ! defined( 'WP_DEBUG' ) ) {
    define( 'WP_DEBUG', false );
}
if ( ! defined( 'WP_DEBUG_DISPLAY' ) ) {
    define( 'WP_DEBUG_DISPLAY', false );
}
if ( ! defined( 'WP_DEBUG_LOG' ) ) {
    define( 'WP_DEBUG_LOG', true );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
