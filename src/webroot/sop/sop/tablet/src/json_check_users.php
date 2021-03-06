<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * 共同作業者の候補一覧
 */
$db = createDBConnection();

// ---------------------
// parameters 取得
// ---------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

// ---------------------
// データ取得
// ---------------------
$sel_sql = getSQLBaseForUser();
$sel_sql .= ' AND v_user.user_id != :user_id AND v_user.grp_id = :grp_id';

$results = R::getAll($sel_sql, array(':user_id' => $user_id, ':grp_id' => $grp_id));
$users = array();
$msg001 = "Please select."; // 選択してください
$users[] = array('user_id' => '', 'text' => $msg001);
foreach ($results as $user) {
    $role_user = (bool)substr($user['role'], 2, 1);
    if ($role_user) {
        $users[] = array('user_id' => $user['user_id'], 'text' => $user['user_id']);
    }
}

// ---------------------
// 出力
// ---------------------
header("Content-type:application/json; charset=utf-8");
echo json_encode(
    array(
        'success' => true,
        'root'    => \Sop\Api::htmlEncode($users),
    ));
exit;
