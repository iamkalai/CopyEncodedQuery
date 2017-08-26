if(typeof jQuery != 'undefined')
	{
	jQuery(document).ready(function() {
		try
		{
			var currentURL = window.location.href;
			var start = currentURL.indexOf('.com/');
			var end = currentURL.indexOf('_list.do');
			if(start != -1 && end != -1)
				{
				var tableName = currentURL.substring(start+5,end);
				var getBreadCrumbObject = document.getElementById(tableName+'_breadcrumb');
				if(getBreadCrumbObject)
					{
					getBreadCrumbObject.addEventListener("contextmenu", function(e)
					{
						var getCopyQueryElement = jQuery('#context_breadcrumb_menu');
						var createNewMenu = '<div id="custom_copy_encoded_query" item_id="copy_encoded_query" class="context_item" func_set="true">Copy encoded query</div>';
						getCopyQueryElement.append(createNewMenu);
						
						jQuery("#custom_copy_encoded_query").click(function() {
							
							var url = document.URL.parseQuery();
							var query = '';
							if(url['sysparm_fixed_query'])
								{
								query = decodeURI(url['sysparm_fixed_query']);
								query = query.replace('^EQ','');
							}
							if(url['sysparm_query']){
								
								if(query!='')
									{
									query = query + '^' + decodeURI(url['sysparm_query']);
								}
								else
									{
									query = decodeURI(url['sysparm_query']);
								}
							}
							var newLine = "\n";
							var script = newLine;
							script = "//Change the gliderecord variable as per need"+ newLine +newLine;
							script += "var gr = new GlideRecord('" + tableName + "');" + newLine;
							if (query != "") {
								script += "gr.addEncodedQuery('" + query + "');" + newLine;
							}
							else
								{
								script += "gr.addEncodedQuery('');" + newLine;
							}
							
							script += "gr.query();" + newLine;
							script += "while (gr.next()) {" + newLine;
							script += newLine;
							script += "}" + newLine;
							copyToClipboard(script);
							
						}).hover(function(){ jQuery(this).addClass('context_menu_hover')},
						function(){ jQuery(this).removeClass('context_menu_hover') }
						);
						
					});
				}
				
			}
		}
		catch(err)
		{
			jslog('Custom encoded query button failing'+err);
		}
	});
}

