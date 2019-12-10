<?php
// php code 生成QR二维码
include("phpqrcode/qrlib.php");

$msg = 'www.baidu.com';

header("Content-type: image/png");

QRcode::png($msg, false, 'H', 5, 2);