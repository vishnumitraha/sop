<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * テンプレート 差戻し
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id    = \Sop\Session::getSiteData('grp_id');
$role_aprv = \Sop\Session::getSiteData('role_aprv');
$role_upld = \Sop\Session::getSiteData('role_upld');
$role_user = \Sop\Session::getSiteData('role_user');
$user_id   = \Sop\Session::getSiteData('user_id');

$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? str_replace('pj_', '', $_REQUEST['pj_id']) : '';
$sop_id = (array_key_exists('sop_id', $_REQUEST)) ? str_replace('sop_', '', $_REQUEST['sop_id']) : '';
$tpl_id = (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '';
$rtn_cmnt = (array_key_exists('rtn_cmnt', $_REQUEST)) ? $_REQUEST['rtn_cmnt'] : '';

// --- データ存在チェック
$sel_sql = getSQLBaseForTplList();
$sel_sql .= " AND tpl.tpl_id = :tpl_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':tpl_id'] = $tpl_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt == 0){
    \Sop\Log::warning(__FILE__, __LINE__, 'Specified template does not exist.');
    $msg001 = "The data alreadly has been delted."; // 対象のデータは既に削除されています
    \Sop\Api::exitWithError(array($msg001));
}

// ---------------------------
// DB更新
// ---------------------------
$tpl_rtn_date = date("Y-m-d H:i:s");

$db->beginTransaction();

// --- TBL: tpl
$rslt = updTplRtn($db, $tpl_id, $APRV_FLG_RTN, $rtn_cmnt, $tpl_rtn_date, $user_id); // 差戻し
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update tpl.');
    $msg002 = "The update failed.: tpl"; // 更新に失敗しました: tpl
    \Sop\Api::exitWithError(array($msg002));
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, null, null, null, $HISTORY_ACTION_TPL_RTN, $tpl_rtn_date, $user_id, null, $rtn_cmnt);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg003 = "The update failed.: history"; // 更新に失敗しました: history
    \Sop\Api::exitWithError(array($msg003));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg004 = "The send back completed."; // 差戻しが完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg004)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
exit;
