var $ = jQuery;
$('Document').ready(function() {
	initBootstrapFieldStyle();
	initSelectDeselectComponent();
	initHideVerticalTabOnComponent();
	initDatePicker();
	initEventAutoUrlAlias('.villa', {
		titlePrefix: 'View ',
		titleSuffix: ' detail',
		linkPrefix: "event/",
		linkSuffix: ".html"
	});

	initEventAutoUrlAlias('.node-things_to_do-form', {
		titlePrefix: '',
		titleSuffix: ' in Bali',
		linkPrefix: "",
		linkSuffix: ".html"
	});

	initEventAutoUrlAlias('.node-location-form', {
		titlePrefix: '',
		titleSuffix: '',
		linkPrefix: "",
		linkSuffix: ".html"
	});
});

function initBootstrapFieldStyle() {
	if(!$('.form-item').length)
		return;

	$('.form-item').each(function(){
		if(!$(this).hasClass('form-type-checkboxes') && !$(this).hasClass('form-type-checkbox') && !$(this).hasClass('form-type-radio'))
			$(this).addClass('form-group').find('input, select, textarea').addClass('form-control');

		if($(this).hasClass('form-type-checkboxes') || $(this).hasClass('form-type-checkbox'))
			$(this).addClass('checkbox');

	});
}

function initSelectDeselectComponent() {
	if(!$('.componentList select').length)
		return;

	// for each component field, register event and get selected
	$('.componentList select').each(function(){
		var sel = $(this);

		// copy cid to hiden input on select from dropdown
		sel.change(function(){
			if(sel.val() == "")
				return;

			var input = sel.parents('.panel').find('input');
			if(!in_array(sel.val(), input.val().split(','))) {
				var newVal = input.val() ? input.val() +',' : "";
				input.val(newVal + sel.val());
				appendComponent(sel.val(), sel.find(":selected").text(), sel);
			}
		});

		// fill component list base on hidden field value on load form
		var includeds = sel.parents('.panel').find('input').val().split(',');
		for(var i in includeds) {
			if(includeds[i] > 0) {
				sel.val(includeds[i]);
				appendComponent(sel.val(), sel.find(":selected").text(), sel);
			}
		}
		sel.val(0);
	});

	// remove cid from hidden input when remove component from list
	$('.included').on('click', '.glyphicon-remove', function(){
		var input = $(this).parents('.panel').find('input');
		var newVal = unset($(this).parent().data('cid'), input.val().split(','));
		input.val(newVal.join(','));
		$(this).parent().remove();

	});

	function appendComponent(cid, text, select) {
		select.parents('.componentList').find('.included').append('<span class="item btn btn-default" data-cid="'+ cid +'">'+ text +'&nbsp;<span class="glyphicon glyphicon-remove">&nbsp;</span></span>');
	}
}

function initHideVerticalTabOnComponent() {
	for(var x in comp) { // var com is setup inline from nodemerger.module
		if($('body').hasClass('node-type-'+ comp[x]) || $('body').hasClass('page-node-add-'+ comp[x])) {
			$('.vertical-tabs.clearfix').addClass('beBorder')
		}
	}
}

function initDatePicker() {
	$("#edit-field-date-und-0-value").datepicker({
		onClose: function( selectedDate ) {
			$( "#edit-field-date-und-0-value" ).datepicker("option", "dateFormat", "d MM, y");
		}
	});
}

function initEventAutoUrlAlias(node, option) {
	if(!$(node +' #edit-menu-enabled').length) 
		return;

	var opt = {
		titlePrefix: option.titlePrefix ? option.titlePrefix : "",
		titleSuffix: option.titleSuffix ? option.titleSuffix : "",
		linkPrefix: option.linkPrefix ? option.linkPrefix : "",
		linkSuffix: option.linkSuffix ? option.linkSuffix : ""
	}

	$('#edit-title').blur(function() {
		if(!$('#edit-menu-enabled').is(':checked'))
			$('#edit-menu-enabled').trigger('click');

		$('#edit-menu-link-title').val($(this).val());
		$('#edit-menu-description').val(opt.titlePrefix + $(this).val() + opt.titleSuffix);
		var trimTitle = $('#edit-title').val().toLowerCase().replace(/[^a-z0-9\s-]/gi, '').replace(/\s/gi, '-').replace(/-{2,1000}/gi, '-');
		$('#edit-path-alias').val(opt.linkPrefix + trimTitle + opt.linkSuffix);
	})
}

/* helper function */
function in_array(item, array) {
	for(var x in array) {
		if(array[x] == item) {
			return true;
		}
	}
	return false;
}

function unset(item, array) {
	var o = [];
	for(var x in array) {
		if(array[x] != item) {
			o.push(array[x]);
		}
	}
	return o;
}


