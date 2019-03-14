
var linkImg = 'https://cf.shopee.vn/file/';
var $limit = 100;
$( "#SubmitShopeeLink" ).on('submit', function(e){
  	e.preventDefault();
  	let shopid = 39707209;
  	let page = 0;
  	let items = [];
  	let result = callAPI(shopid, page, items);
	// dataTable();
});

async function getDetailItems($itemids, byUpload = false) {
	let url = "https://shopee.vn/api/v2/item/get";
	let result = [];
	await Promise.all($itemids.map(async (item) => {
		let data = {
	  		itemid: item.itemid,
	  		shopid: item.shopid
	  	};
	    const content = await $.ajax({
		  	url: url,
		  	type: 'GET',
		  	data: data,
	      	dataType: 'json',
	      	cors: true ,
	      	contentType:'application/json',
	      	secure: true,
	     	headers: {
	        	'content-type': 'application/x-www-form-urlencoded',
	                    'Access-Control-Allow-Origin': '*',
	                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
	                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	                    'content-type': 'application/json; charset=UTF-8'
	      	},
		  	success: function(response){
		  		return response.item.item;
		  	}
		});
	    result.push({defaultData:content, newData: item});
	}));
	console.log(result);
	dataTable(result, byUpload);
}

function dataTable($data, byUpload) {
	let stock = $("#stock").val();
	let beforeName = $("#beforeName").val();
	let afterName = $("#afterName").val();
	let part = 1;
	let beforeDescription = $("#beforeDescription").val();
	let afterDescription = $("#afterDescription").val();
	let strTitle = "ps_category_list_id	ps_product_name	ps_product_description	ps_price	ps_stock	ps_product_weight	ps_days_to_ship	ps_sku_ref_no_parent	ps_mass_upload_variation_help	ps_variation 1 ps_variation_sku	ps_variation 1 ps_variation_name	ps_variation 1 ps_variation_price	ps_variation 1 ps_variation_stock	ps_variation 2 ps_variation_sku	ps_variation 2 ps_variation_name	ps_variation 2 ps_variation_price	ps_variation 2 ps_variation_stock	ps_variation 3 ps_variation_sku	ps_variation 3 ps_variation_name	ps_variation 3 ps_variation_price	ps_variation 3 ps_variation_stock	ps_variation 4 ps_variation_sku	ps_variation 4 ps_variation_name	ps_variation 4 ps_variation_price	ps_variation 4 ps_variation_stock	ps_variation 5 ps_variation_sku	ps_variation 5 ps_variation_name	ps_variation 5 ps_variation_price	ps_variation 5 ps_variation_stock	ps_variation 6 ps_variation_sku	ps_variation 6 ps_variation_name	ps_variation 6 ps_variation_price	ps_variation 6 ps_variation_stock	ps_variation 7 ps_variation_sku	ps_variation 7 ps_variation_name	ps_variation 7 ps_variation_price	ps_variation 7 ps_variation_stock	ps_variation 8 ps_variation_sku	ps_variation 8 ps_variation_name	ps_variation 8 ps_variation_price	ps_variation 8 ps_variation_stock	ps_variation 9 ps_variation_sku	ps_variation 9 ps_variation_name	ps_variation 9 ps_variation_price	ps_variation 9 ps_variation_stock	ps_variation 10 ps_variation_sku	ps_variation 10 ps_variation_name	ps_variation 10 ps_variation_price	ps_variation 10 ps_variation_stock	ps_variation 11 ps_variation_sku	ps_variation 11 ps_variation_name	ps_variation 11 ps_variation_price	ps_variation 11 ps_variation_stock	ps_variation 12 ps_variation_sku	ps_variation 12 ps_variation_name	ps_variation 12 ps_variation_price	ps_variation 12 ps_variation_stock	ps_variation 13 ps_variation_sku	ps_variation 13 ps_variation_name	ps_variation 13 ps_variation_price	ps_variation 13 ps_variation_stock	ps_variation 14 ps_variation_sku	ps_variation 14 ps_variation_name	ps_variation 14 ps_variation_price	ps_variation 14 ps_variation_stock	ps_variation 15 ps_variation_sku	ps_variation 15 ps_variation_name	ps_variation 15 ps_variation_price	ps_variation 15 ps_variation_stock	ps_variation 16 ps_variation_sku	ps_variation 16 ps_variation_name	ps_variation 16 ps_variation_price	ps_variation 16 ps_variation_stock	ps_variation 17 ps_variation_sku	ps_variation 17 ps_variation_name	ps_variation 17 ps_variation_price	ps_variation 17 ps_variation_stock	ps_variation 18 ps_variation_sku	ps_variation 18 ps_variation_name	ps_variation 18 ps_variation_price	ps_variation 18 ps_variation_stock	ps_variation 19 ps_variation_sku	ps_variation 19 ps_variation_name	ps_variation 19 ps_variation_price	ps_variation 19 ps_variation_stock	ps_variation 20 ps_variation_sku	ps_variation 20 ps_variation_name	ps_variation 20 ps_variation_price	ps_variation 20 ps_variation_stock	ps_mass_upload_shipment_help	ps_img_1	ps_img_2	ps_img_3	ps_img_4	ps_img_5	ps_img_6	ps_img_7	ps_img_8	ps_img_9	channel 50010 switch	channel 50011 switch	channel 50012 switch	channel 50017 switch	channel 50066 switch	channel 50018 switch";
	let nameColumn = strTitle.split("	");
	var tbHead = '<table class="table table-dark">'
					  + '<thead>'
					    + '<tr>';
	nameColumn.forEach(function(name) {
		tbHead += '<th scope="col">' + name + '</th>';
	});
	tbHead += '</tr>'
				+ '</thead>';
	var tbBody = '<tbody>';
	let $count = 0;
	let $export = $limit;
	$data.forEach(function(item) {
		let defaultData = item.defaultData.item;
		let newData = item.newData
		let hasTag = defaultData.hashtag_list;
		if (hasTag) {
			hasTag = hasTag.join(" ");
		} else {
			hasTag = "";
		}
		let productName = beforeName + defaultData.name.replace("FREESHIP ĐƠN 99K_", ""); + afterName;
		let productDescription = beforeDescription + defaultData.description + afterDescription + hasTag;
		let productPrice = defaultData.price/100000 - 1000;
		if (byUpload) {
			productName = newData.name;
			productDescription = newData.beforeDescription + newData.afterDescription + hasTag;
			productPrice = newData.price;
			stock = 50;
		}
		defaultData.estimated_days = 2; // default time to ship 2 days;
		tbBody += '<tr>';
		nameColumn.forEach(function(name) {
				switch(name) {
				  	case 'ps_category_list_id':
					    if(defaultData.categories[defaultData.categories.length-1]['catid']) {
							tbBody += '<td scope="col">' + defaultData.categories[defaultData.categories.length-1]['catid'] + '</td>';
						} else {
							tbBody += '<td scope="col">' + defaultData.catid + '</td>';
						}
				    	break;
				  	case 'ps_product_name':
				    	tbBody += '<td scope="col">' + productName + '</td>';
				    	break;
				    case 'ps_product_description':
				    	tbBody += '<td scope="col">' + productDescription +  '</td>';
				    	break;
				    case 'ps_price':
				    	tbBody += '<td scope="col">' + productPrice + '</td>';
				    	break;
				    case 'ps_stock':
				    	tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
				    	break;
				    case 'ps_product_weight':
				    	tbBody += '<td scope="col">' + 200 + '</td>';
				    	break;
				    case 'ps_days_to_ship':
				    	tbBody += '<td scope="col">' + defaultData.estimated_days + '</td>';
				    	break;
				   	case 'ps_variation 1 ps_variation_sku':
					   	if (defaultData.models[0]) {
							tbBody += '<td scope="col">' + defaultData.models[0].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_name':
					   	if (defaultData.models[0]) {
							tbBody += '<td scope="col">' + defaultData.models[0].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_price':
					   	if (defaultData.models[0]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_stock':
					   	if (defaultData.models[0]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_sku':
					   	if (defaultData.models[1]) {
							tbBody += '<td scope="col">' + defaultData.models[1].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_name':
					   	if (defaultData.models[1]) {
							tbBody += '<td scope="col">' + defaultData.models[1].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_price':
					   	if (defaultData.models[1]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_stock':
					   	if (defaultData.models[1]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_sku':
					   	if (defaultData.models[2]) {
							tbBody += '<td scope="col">' + defaultData.models[2].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_name':
					   	if (defaultData.models[2]) {
							tbBody += '<td scope="col">' + defaultData.models[2].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_price':
					   	if (defaultData.models[2]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_stock':
					   	if (defaultData.models[2]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_sku':
					   	if (defaultData.models[3]) {
							tbBody += '<td scope="col">' + defaultData.models[3].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_name':
					   	if (defaultData.models[3]) {
							tbBody += '<td scope="col">' + defaultData.models[3].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_price':
					   	if (defaultData.models[3]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_stock':
					   	if (defaultData.models[3]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_sku':
					   	if (defaultData.models[4]) {
							tbBody += '<td scope="col">' + defaultData.models[4].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_name':
					   	if (defaultData.models[4]) {
							tbBody += '<td scope="col">' + defaultData.models[4].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_price':
					   	if (defaultData.models[4]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_stock':
					   	if (defaultData.models[4]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_sku':
					   	if (defaultData.models[5]) {
							tbBody += '<td scope="col">' + defaultData.models[5].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_name':
					   	if (defaultData.models[5]) {
							tbBody += '<td scope="col">' + defaultData.models[5].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_price':
					   	if (defaultData.models[5]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_stock':
					   	if (defaultData.models[5]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_sku':
					   	if (defaultData.models[6]) {
							tbBody += '<td scope="col">' + defaultData.models[6].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_name':
					   	if (defaultData.models[6]) {
							tbBody += '<td scope="col">' + defaultData.models[6].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_price':
					   	if (defaultData.models[6]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_stock':
					   	if (defaultData.models[6]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_sku':
					   	if (defaultData.models[7]) {
							tbBody += '<td scope="col">' + defaultData.models[7].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_name':
					   	if (defaultData.models[7]) {
							tbBody += '<td scope="col">' + defaultData.models[7].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_price':
					   	if (defaultData.models[7]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_stock':
					   	if (defaultData.models[7]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_sku':
					   	if (defaultData.models[8]) {
							tbBody += '<td scope="col">' + defaultData.models[8].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_name':
					   	if (defaultData.models[8]) {
							tbBody += '<td scope="col">' + defaultData.models[8].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_price':
					   	if (defaultData.models[8]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_stock':
					   	if (defaultData.models[8]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_sku':
					   	if (defaultData.models[9]) {
							tbBody += '<td scope="col">' + defaultData.models[9].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_name':
					   	if (defaultData.models[9]) {
							tbBody += '<td scope="col">' + defaultData.models[9].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_price':
					   	if (defaultData.models[9]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_stock':
					   	if (defaultData.models[9]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_sku':
					   	if (defaultData.models[10]) {
							tbBody += '<td scope="col">' + defaultData.models[10].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_name':
					   	if (defaultData.models[10]) {
							tbBody += '<td scope="col">' + defaultData.models[10].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_price':
					   	if (defaultData.models[10]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_stock':
					   	if (defaultData.models[10]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_sku':
					   	if (defaultData.models[11]) {
							tbBody += '<td scope="col">' + defaultData.models[11].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_name':
					   	if (defaultData.models[11]) {
							tbBody += '<td scope="col">' + defaultData.models[11].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_price':
					   	if (defaultData.models[11]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_stock':
					   	if (defaultData.models[11]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_sku':
					   	if (defaultData.models[12]) {
							tbBody += '<td scope="col">' + defaultData.models[12].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_name':
					   	if (defaultData.models[12]) {
							tbBody += '<td scope="col">' + defaultData.models[12].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_price':
					   	if (defaultData.models[12]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_stock':
					   	if (defaultData.models[12]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_sku':
					   	if (defaultData.models[13]) {
							tbBody += '<td scope="col">' + defaultData.models[13].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_name':
					   	if (defaultData.models[13]) {
							tbBody += '<td scope="col">' + defaultData.models[13].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_price':
					   	if (defaultData.models[13]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_stock':
					   	if (defaultData.models[13]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_sku':
					   	if (defaultData.models[14]) {
							tbBody += '<td scope="col">' + defaultData.models[14].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_name':
					   	if (defaultData.models[14]) {
							tbBody += '<td scope="col">' + defaultData.models[14].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_price':
					   	if (defaultData.models[14]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_stock':
					   	if (defaultData.models[14]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_sku':
					   	if (defaultData.models[15]) {
							tbBody += '<td scope="col">' + defaultData.models[15].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_name':
					   	if (defaultData.models[15]) {
							tbBody += '<td scope="col">' + defaultData.models[15].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_price':
					   	if (defaultData.models[15]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_stock':
					   	if (defaultData.models[15]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_sku':
					   	if (defaultData.models[16]) {
							tbBody += '<td scope="col">' + defaultData.models[16].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_name':
					   	if (defaultData.models[16]) {
							tbBody += '<td scope="col">' + defaultData.models[16].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_price':
					   	if (defaultData.models[16]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_stock':
					   	if (defaultData.models[16]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_sku':
					   	if (defaultData.models[17]) {
							tbBody += '<td scope="col">' + defaultData.models[17].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_name':
					   	if (defaultData.models[17]) {
							tbBody += '<td scope="col">' + defaultData.models[17].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_price':
					   	if (defaultData.models[17]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_stock':
					   	if (defaultData.models[17]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_sku':
					   	if (defaultData.models[18]) {
							tbBody += '<td scope="col">' + defaultData.models[18].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_name':
					   	if (defaultData.models[18]) {
							tbBody += '<td scope="col">' + defaultData.models[18].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_price':
					   	if (defaultData.models[18]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_stock':
					   	if (defaultData.models[18]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_sku':
					   	if (defaultData.models[19]) {
							tbBody += '<td scope="col">' + defaultData.models[19].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_name':
					   	if (defaultData.models[19]) {
							tbBody += '<td scope="col">' + defaultData.models[19].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_price':
					   	if (defaultData.models[19]) {
							tbBody += '<td scope="col">' + productPrice + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_stock':
					   	if (defaultData.models[19]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;

				    case 'ps_img_1':
				    	if (defaultData.images[0]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[0] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_2':
				    	if (defaultData.images[1]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[1] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_3':
				    	if (defaultData.images[2]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[2] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_4':
				    	if (defaultData.images[3]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[3] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_5':
				    	if (defaultData.images[4]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[4] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_6':
				    	if (defaultData.images[5]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[5] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_7':
				    	if (defaultData.images[6]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[6] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_8':
				    	if (defaultData.images[7]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[7] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_9':
				    	if (defaultData.images[8]) {
				    		tbBody += '<td scope="col">' + linkImg + defaultData.images[8] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'channel 50010 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
			    	case 'channel 50011 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
		    		case 'channel 50012 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
			    	case 'channel 50017 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
			    	case 'channel 50066 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
			    	case 'channel 50018 switch':
				    	tbBody += '<td scope="col">Mở</td>';
				    	break;
				  	default:
				    	tbBody += '<td scope="col"></td>';
				}
				
		});
		tbBody += '</tr>';
		if ($count == $export - 1 || $count == $data.length - 1) {
			$export += $limit;
			tbBody += '</tbody>'
				+ '</table>';
			tbData = tbHead + tbBody;
			
			var divContent = document.getElementById('dvExcel');
			appendHtml(divContent, tbData, exportExcelTable);
			console.log('done');

			tbHead = '<table class="table table-dark">'
					  + '<thead>'
					    + '<tr>';
			nameColumn.forEach(function(name) {
				tbHead += '<th scope="col">' + name + '</th>';
			});
			tbHead += '</tr>'
						+ '</thead>';
			tbBody = '<tbody>';
		}
		$count ++;
	});
	

}

function callAPI($shopid, $page, $items) {
	let data = {
  		by: 'relevancy',
  		limit: $limit,
  		newest: $page,
  		order: 'desc',
  		page_type: 'shop',
  		match_id: $shopid
  	};
	$.ajax({
	  	url: "https://shopee.vn/api/v2/search_items/",
	  	type: 'GET',
	  	data: data,
      	dataType: 'json',
      	cors: true ,
      	contentType:'application/json',
      	secure: true,
     	headers: {
        	'content-type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'content-type': 'application/json; charset=UTF-8'
      	},
	  	success: function(response){
	  		$page += 100;
	  		response.items.forEach(function(item) {
			   	$items.push({itemid: item.itemid, shopid: $shopid});
			});
	    	if ($page > response.total_count) {
	    		getDetailItems($items);
	    	} else {
	    		callAPI($shopid, $page, $items);
	    	}

	  	}
	});
}

function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    //Create a HTML Table element.
    var table = document.createElement("table");
    table.border = "1";

    //Add the header row.
    var row = table.insertRow(-1);

    //Add the header cells.
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = "No";
    row.appendChild(headerCell);

    headerCell = document.createElement("TH");
    headerCell.innerHTML = "Link";
    row.appendChild(headerCell);
    var $listItems = [];
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].No;

        cell = row.insertCell(-1);
        let linkProduct = excelRows[i].Link;
        cell.innerHTML = linkProduct;
        let arrData = linkProduct.split('.');
        $listItems.push({
        	itemid: arrData[arrData.length-1], 
        	shopid: arrData[arrData.length-2],
        	name: excelRows[i].Name,
        	price:excelRows[i].Price,
        	beforeDescription: excelRows[i].Before_Description,
        	afterDescription: excelRows[i].After_Description,
        });
    }

    var dvExcel = document.getElementById("dvExcel");
    // dvExcel.innerHTML = "";
    var lable = document.createElement("label");
    lable.innerHTML = 'Result';
    // dvExcel.appendChild(lable);
    // dvExcel.appendChild(table);
    getDetailItems($listItems, true);
};

function appendHtml(el, str, callback) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
  callback(el);
}

function exportExcelTable(el){
	var wb = XLSX.utils.table_to_book(el, {sheet:"Shopee"});
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'shopee.xlsx');
}