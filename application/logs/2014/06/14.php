<?php defined('SYSPATH') OR die('No direct script access.'); ?>

2014-06-14 04:33:39 --- CRITICAL: ErrorException [ 4096 ]: Argument 2 passed to Kohana_View::factory() must be an array, string given, called in C:\OpenServer\OpenServer\domains\kohana\application\classes\Controller\main.php on line 11 and defined ~ SYSPATH\classes\Kohana\View.php [ 28 ] in C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\View.php:28
2014-06-14 04:33:39 --- DEBUG: #0 C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\View.php(28): Kohana_Core::error_handler(4096, 'Argument 2 pass...', 'C:\OpenServer\O...', 28, Array)
#1 C:\OpenServer\OpenServer\domains\kohana\application\classes\Controller\main.php(11): Kohana_View::factory('home', '$data')
#2 C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\Controller.php(84): Controller_Main->action_index()
#3 [internal function]: Kohana_Controller->execute()
#4 C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\Request\Client\Internal.php(97): ReflectionMethod->invoke(Object(Controller_Main))
#5 C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\Request\Client.php(114): Kohana_Request_Client_Internal->execute_request(Object(Request), Object(Response))
#6 C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\Request.php(986): Kohana_Request_Client->execute(Object(Request))
#7 C:\OpenServer\OpenServer\domains\kohana\index.php(118): Kohana_Request->execute()
#8 {main} in C:\OpenServer\OpenServer\domains\kohana\system\classes\Kohana\View.php:28