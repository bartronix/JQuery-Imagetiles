// jQuery Image Tiles Plugin
//
// Version 0.1
//
// Bart Leemans
// bartleemans.be
//
// Terms of Use
//
// This plugin is dual-licensed under the GNU General Public License
//   and the MIT License and is copyright bartleemans.be, LLC.
//
// Tested on recent browsers
(function($) {
	$.fn.imagetiles = function(args) {
		var args = $.extend( {imageWidth: 240, slideEffect: "fadeIn"}, args);
		var container = $(this);
		container.css("position","relative");
		var containerWidth = container.width() - args.imageWidth;
		var currentRowIndex = 0, left = 0, top = 0, totalImagesCounter = 0, itemsPerRow = 0, containerHeight = 0;	
		var imageHeights = new Array();
		var currentRow = 1;
		var lastContainerWidth = container.width();	

		$('#' + container.attr("id") + " img").each(function(){
			if($(this).parent().get(0).tagName != 'A'){			
				$(this).wrap('<a/>');
			}			
			if(left >= containerWidth){
				currentRowIndex = 0;
				left = 0;
				top = top + args.imageWidth;
				if(itemsPerRow == 0){
					itemsPerRow = totalImagesCounter;
				}			
				currentRow++;
			}
			totalImagesCounter++;
			$(this).parent().css({'display' : 'inline-block', 'position' : 'absolute'});
		
			if(currentRowIndex == 0){
				$(this).parent().css({ left: left + 'px' });
			}else{			
				$(this).parent().css({ left: (left + (currentRowIndex*10)) + 'px' });			
			}
			$(this).parent().css({ top: top + 'px' });
			currentRowIndex++;
			left = (currentRowIndex * args.imageWidth);	

			var img = $(this);
			img.css("width",args.imageWidth);		
			imageHeights[totalImagesCounter] = img.height();

			if(currentRow > 1){
				var newTop = 0;		
				for (i=1;i< currentRow;i++)
				{
					newTop = newTop + imageHeights[totalImagesCounter - (itemsPerRow * i)] + 10;
				}
				$(this).parent().css({ top: newTop + 'px' });
				if((newTop + img.height()) > containerHeight){
					containerHeight = newTop + img.height();				
				}
			}
			switch(args.slideEffect)
			{
				case "slideDown":
					$(this).parent().hide().slideDown(totalImagesCounter*100);
					break;
				default:
					$(this).parent().hide().fadeIn(totalImagesCounter*100);
					break;
			}			
			container.height(containerHeight);
		});
		$(window).resize(function(){
			if((container.width() > (lastContainerWidth + args.imageWidth)) || container.width() < (lastContainerWidth - args.imageWidth)){				
				container.imagetiles({imageWidth:args.imageWidth, slideEffect:args.slideEffect});
			}	
		});
	};
})(jQuery);
