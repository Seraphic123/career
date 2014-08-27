<?php
require(APPPATH.'/libraries/REST_Controller.php');

class Rest_auth extends REST_Controller
{

	public function __construct()
	{
//		parent::__construct();
	}
	
    function cors_headers() //Cross-origin resource sharing
    {
		header('Access-Control-Allow-Origin: *');
//	header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Max-Age: 1000');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    }

    function teacher_options()
    {
		log_message('debug','teacher_options');
		$this->cors_headers();
		$this->response($_SERVER['HTTP_ORIGIN']);
    }

    function teacher_post()
    {		
		$this->cors_headers();
		log_message('debug','start to login in teacher account');
		$this->benchmark->mark('teacher_auth_start');
		$auth='';
		include_once("curl_php.php");
		$name   = $this->input->post('user_id');
		$password   = $this->input->post('password');
/*		$url = "https://search.kh.usc.edu.tw/TerSystem/Process.asp";
		$post_data = "user_id=$name&password=$password";*/
		
		$url = "https://db.kh.usc.edu.tw/inf/Kali/lib/logincheck.php";//以學生歷程判斷
		$post_data = "name=$name&password=$password";
		
		$response = post_https($url, $post_data,$headers,$http_status);
		$this->benchmark->mark('teacher_auth_stop');
		log_message('debug',"Teacher login time is ($url): " . $this->benchmark->elapsed_time('teacher_auth_start', 'teacher_auth_stop'));
/*		if( $response !=NULL && $http_status=='302') //檢查是否通過認證
		{
			$pos = strpos(RequestSplite($response,'Location'), 'rdurl');
			if ($pos !== false) {
				$auth='success';
			} else {
				$auth='false';
			}
		}		*/
		if( $response !=NULL) //檢查是否通過認證
		{
			if($http_status != '302') 
				$auth='false';
			else {
				$auth='success';
			}
		}		
		if($auth=='')
		  $data = array('success' => false, 'auth' => false);
		else
		  $data = array('success' => true, 'auth' => $auth);
//		 log_message('debug',json_encode($data));
		$this->response($data);
    }

    function student_options()
    {
		$this->cors_headers();
		$this->response($_SERVER['HTTP_ORIGIN']);
    }
    function student_get()
    {		
		$this->cors_headers();
		$this->response($_SERVER['HTTP_ORIGIN']);		
	}
    function student_post()
    {		
		$this->cors_headers();
		log_message('debug','start to login in student account');
		$this->benchmark->mark('student_auth_start');
		$auth='';
		include_once("curl_php.php");
		$name   = $this->input->post('user_id');
		$password   = $this->input->post('password');
/*		$url = "https://search.kh.usc.edu.tw/km1/psw.asp";
		$post_data = "STUID=$name&PSWPASWRD=$password";*/
		
		$url = "https://db.kh.usc.edu.tw/inf/Kali/lib/logincheck.php";//以學生歷程判斷
		$post_data = "name=$name&password=$password";
		
		$response = post_https($url, $post_data,$headers,$http_status);
		$this->benchmark->mark('student_auth_stop');
		debug($http_status);
		log_message('debug',"student login time is($url): " . $this->benchmark->elapsed_time('student_auth_start', 'student_auth_stop'));
		//debug($response);
		if( $response !=NULL) //檢查是否通過認證
		{
			if($http_status!='302') 
				$auth='false';
			else {
				$auth='success';
			}
		}		
		if($auth=='')
		  $data = array('success' => false, 'auth' => false);
		else
		  $data = array('success' => true, 'auth' => $auth);
//		 log_message('debug',json_encode($data));
		$this->response($data);
    }
}
?>
