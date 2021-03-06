<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * スキーマ 一覧
 */
$db = createDBConnection();

// ---------------------
// parameters 取得
// ---------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$smpl_given_no = (array_key_exists('smpl_given_no', $_REQUEST)) ? $_REQUEST['smpl_given_no'] : '';
$latest_tpl_id = (array_key_exists('latest_tpl_id', $_REQUEST)) ? $_REQUEST['latest_tpl_id'] : '';

// ---------------------
// データ取得
// ---------------------
$sel_sql = getSQLBaseForSchemaList();
$sel_sql .= " AND schema.tpl_id = :tpl_id AND v_tpl.grp_id = $grp_id";

$params = array();
$params[':tpl_id'] = $latest_tpl_id;

// --- 件数取得
$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

// --- データ取得
$sql = $sel_sql;
$sql .= " ORDER BY schema.schema_type ASC ";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$schema_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $schema = $row;
    $schema['smpl_given_no'] = $smpl_given_no;
    array_push($schema_list, $schema);
}

// ---------------------
// 出力
// ---------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded to obtaion the data."; // データの取得に成功しました
echo json_encode(
    array('success' => true,
          'msg'     => \Sop\Api::htmlEncodeLines(array($msg001)),
          'root'    => \Sop\Api::htmlEncode($schema_list),
          'total'   => $cnt));
exit;
