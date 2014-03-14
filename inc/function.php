<?php
if(!function_exists('kpdebug')) {
	function kpdebug($a, $b="") {
		$id = 'id'. str_replace(array(' ' ,'.'), "", microtime());
		echo '<div class="panel-group" id="'. $id .'">
		  <div class="panel panel-default">
		    <div class="panel-heading">
		      <h4 class="panel-title">
		        <a data-toggle="collapse" data-parent="#'. $id .'" href="#c'. $id .'">
		          About '. $b .'
		        </a>
		      </h4>
		    </div>
		    <div id="c'. $id .'" class="panel-collapse collapse">
		      <div class="panel-body"><pre>';
				print_r($a);
		    echo '</pre>
		      </div>
		    </div>
		  </div>
		  </div>
		  ';
	}
}
?>