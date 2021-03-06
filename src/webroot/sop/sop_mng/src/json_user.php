<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * ユーザー 一覧
 */
$db = createDBConnection();

$filter_list = (array_key_exists('filter', $_REQUEST)) ? $_REQUEST['filter'] : array();
$sort = (array_key_exists('sort', $_REQUEST)) ? $_REQUEST['sort'] : '';
$start = (array_key_exists('start', $_REQUEST)) ? (int)$_REQUEST['start'] : 0;
$limit = (array_key_exists('limit', $_REQUEST)) ? (int)$_REQUEST['limit'] : 25;

// ---------------------------
// SQL作成
// ---------------------------
// --- WHERE 句
$where_sql_list = array();
foreach($filter_list as $filter)
{
    $field = getClmnName($filter['field']);
    $data = $filter['data'];

    if($data['type'] == 'string')
    {
        array_push($where_sql_list, " $field LIKE '%{$data['value']}%'");
    }
    if($data['type'] == 'numeric')
    {
        $sign = getSign($data['comparison']);
        array_push($where_sql_list, " $field {$sign} {$data['value']}");
    }
    if($data['type'] == 'list')
    {
        array_push($where_sql_list, " $field IN ({$data['value']})");
    }
    if($data['type'] == 'date')
    {
        $sign = getSign($data['comparison']);
        $date = str_replace('/', '-', $data['value']);

        if($sign == '=')
        {
            $sdate = "{$date} 00:00:00";
            $edate = date('Y-m-d H:i:s', strtotime("{$date} 00:00:00 +1 day"));
            array_push($where_sql_list, " $field >= '$sdate' AND $field < '$edate'");
        }
        else
        {
            array_push($where_sql_list, " $field $sign '{$date}'");
        }
    }
}
$where_sql = implode(" AND ", $where_sql_list);

// --- ORDER BY 句
$sort_prop = 'user_id';
$sort_dir = 'ASC';
if($sort != '')
{
    $sort_obj = json_decode($sort);

    $sort_prop = '';
    $sort_dir = '';
    foreach($sort_obj as $tmp)
    {
        $sort_prop = getClmnName($tmp->property);
        $sort_dir = $tmp->direction;
    }
}
$sort_sql = '';
if ($sort_prop) {
    $sort_sql = " ORDER BY $sort_prop $sort_dir";
}

// --- LIMIT 句
$limit_sql = " LIMIT $limit OFFSET $start";

// --- 基本となるSQL
$sel_sql = getSQLBaseForOneUser();
if(count($where_sql_list) > 0) $sel_sql .= " AND $where_sql";

// ---------------------------
// データ取得
// ---------------------------
// --- 件数取得
$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$stmt = $db->prepare($sql);
$stmt->execute();

$count = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $count = $row['cnt'];
}

// --- データ取得
$sql = "{$sel_sql}{$sort_sql}{$limit_sql}";

$stmt = $db->prepare($sql);
$stmt->execute();

$user_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $user = $row;

    // パスワード情報は漏洩させない
    unset($user['password']);

    // 所属グループを全て取得
    $sql = getSQLBaseForUserGrp();
    $sql .= " WHERE user_id = :user_id";
    foreach (R::getAll($sql, array('user_id' => $user['user_id'])) as $usergrp) {
        $sql = getSQLBaseForGrp();
        $sql .= " AND grp_id = :grp_id";
        foreach (R::getAll($sql, array('grp_id' => $usergrp['grp_id'])) as $grp) {
            $user['grp_name'] = $grp['grp_name'];
            $user['grp_id'] = $grp['grp_id'];
        }
    }

    // 権限情報設定
    $role_arr = str_split($user['role']);
    $user['role_aprv'] = $role_arr[0];
    $user['role_upld'] = $role_arr[1];
    $user['role_user'] = $role_arr[2];

    array_push($user_list, $user);
}

// ---------------------------
// 終了処理
// ---------------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded in an accession to the data."; // データの取得に成功しました
echo json_encode(
    array('success' => true,
          'msg'     => \Sop\Api::htmlEncodeLines(array($msg001)),
          'root'    => \Sop\Api::htmlEncode($user_list),
          'total'   => $count));
exit;

/**
 * GridFiltering 対応
 */
function getSign($comparison)
{
    $sign = '';

    switch($comparison)
    {
        case 'lt':
            $sign = '<';
            break;
        case 'gt':
            $sign = '>';
            break;
        case 'eq':
            $sign = '=';
            break;
    }

    return $sign;
}

function getClmnName($property)
{
    $clmn_name = null;

    switch($property)
    {
        case 'user_id':
            $clmn_name = 'user_id';
            break;
        case 'user_name':
            $clmn_name = 'user_name';
            break;
        case 'email':
            $clmn_name = 'email';
            break;
        case 'note':
            $clmn_name = 'note';
            break;
    }

    return $clmn_name;
}
