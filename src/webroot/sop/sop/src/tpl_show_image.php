<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");
include_once(__DIR__."/check_permission.php");
include_once(__DIR__."/sop_common.php");

# 認証済みの情報を取得。
$grp_id    = \Sop\Session::getSiteData('grp_id');
$role_aprv = \Sop\Session::getSiteData('role_aprv');
$role_upld = \Sop\Session::getSiteData('role_upld');
$role_user = \Sop\Session::getSiteData('role_user');
$user_id   = \Sop\Session::getSiteData('user_id');

$pj_id = intval( (array_key_exists('pj_id', $_REQUEST)) ? $_REQUEST['pj_id'] : '');
$sop_id =intval( (array_key_exists('sop_id', $_REQUEST)) ? $_REQUEST['sop_id'] : '' );
$tpl_id = intval( (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '' );
$schema_id = intval( (array_key_exists('schema_id', $_REQUEST)) ? $_REQUEST['schema_id'] : '' );
$page = intval( (array_key_exists('page', $_REQUEST)) ? $_REQUEST['page'] : '' );

$db = createDBConnection();

readPageImageFile($db, $grp_id, $pj_id, $sop_id, $tpl_id, $schema_id, $page, $DATA_DIR_PATH_FILE);

