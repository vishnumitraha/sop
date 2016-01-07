<?php
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * ログイン
 */
$user = \Sop\Login::getUser();

// --- ロール判定（管理権限がないとエラー）
if (! $user['admin_flag']) {
    $msg001 = "You do not hava the permission."; // 権限がありません
    $message = array($msg001);
    \Sop\Log::warning(__FILE__, __LINE__, 'User (' . $user['user_id'] . ') does not have role.');
    \Sop\Login::exitWithLoginError($message, $message);
}

\Sop\Login::registerToSession($user);
\Sop\Login::exitWithSuccess();
