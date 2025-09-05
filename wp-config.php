<?php
define( 'WP_CACHE', true );

 // Added by WP Rocket

/** Enable W3 Total Cache */


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'loopostngwebsolu_4_clone' );

/** Database username */
define( 'DB_USER', 'loopostngwebsolu_4_clone' );

/** Database password */
define( 'DB_PASSWORD', 'g8B+~N8w-iT.grj%lMLgGxq?CM.H~}#S' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
define('WP_MEMORY_LIMIT', '256M');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'i5fik0n4azhidwebymmt0yaoc6phgyhhlirbzya8ohaviprwm6uonrmvzzkbwwhn' );
define( 'SECURE_AUTH_KEY',  'yohz95izes1g9um6fygchmfntozl0esl9s3vls2xb9km0ikj4k9dsjj6sp1rjmm0' );
define( 'LOGGED_IN_KEY',    'knmjzhm7sx90soo7mvzprxwncoqmspp6tihsfnltyregwxsespahspsxbdvyxj8b' );
define( 'NONCE_KEY',        'y6my6wlcdgcopxxmkiohnmwkxl7upq6snweazpovqieyzmo6hgwpaf4ifqdzefq4' );
define( 'AUTH_SALT',        'j2zgta5jgzcakulnubpzpkkozom8obkyrngt94g3dmwso0ne6zqjap0blchazn2f' );
define( 'SECURE_AUTH_SALT', 'kql2wscvbdur2g1lmda9c5vxuqsyl5vswaib0v2etub9sbr6f09butro5rnlat7u' );
define( 'LOGGED_IN_SALT',   'a7fh1xuvoo4zz0z6ygcictooukxyw13rxz7hrveuqtrlgn68zdleupbi3fcga6jb' );
define( 'NONCE_SALT',       'ehpy4gxizbxoobydxlko1x3mkazdzvjwjui43vrxequsw6pjljztb1gmzjr6ty6b' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpnc_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';