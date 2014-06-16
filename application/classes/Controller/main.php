<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Template {

	public $template = 'basic';
	
	public function action_index()
	{
		$data["message"]="123";
		$data["message1"]="123";
		
		$this->template->content=View::factory('home',$data);
	}
	

} // End Welcome
