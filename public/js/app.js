
var linkImg = 'https://cf.shopee.vn/file/';
var $limit = 100;
$( "#SubmitShopeeLink" ).on('submit', function(e){
  	e.preventDefault();
  	let shopid = 15961538;
  	let page = 0;
  	let items = [];
  	let result = callAPI(shopid, page, items);
	// dataTable();
});

async function getDetailItems($itemids, $shopid) {
	let url = "https://shopee.vn/api/v2/item/get";
	let result = [];
	await Promise.all($itemids.map(async (item) => {
		let data = {
	  		itemid: item.itemid,
	  		shopid: $shopid
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
	    result.push(content);
	}));
	console.log(result);
	dataTable(result);
}

function dataTable($data) {
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
		let hasTag = item.item.hashtag_list;
		if (hasTag) {
			hasTag = hasTag.join(" ");
		} else {
			hasTag = "";
		}
		tbBody += '<tr>';
		nameColumn.forEach(function(name) {
				switch(name) {
				  	case 'ps_category_list_id':
					    if(item.item.categories[item.item.categories.length-1]['catid']) {
							tbBody += '<td scope="col">' + item.item.categories[item.item.categories.length-1]['catid'] + '</td>';
						} else {
							tbBody += '<td scope="col">' + item.item.catid + '</td>';
						}
				    	break;
				  	case 'ps_product_name':
				    	tbBody += '<td scope="col">' + beforeName + item.item.name + afterName + '</td>';
				    	break;
				    case 'ps_product_description':
				    	tbBody += '<td scope="col">' + beforeDescription + item.item.description + afterDescription + hasTag +  '</td>';
				    	break;
				    case 'ps_price':
				    	tbBody += '<td scope="col">' + item.item.price/100000 + '</td>';
				    	break;
				    case 'ps_stock':
				    	tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
				    	break;
				    case 'ps_product_weight':
				    	tbBody += '<td scope="col">' + 200 + '</td>';
				    	break;
				    case 'ps_days_to_ship':
				    	tbBody += '<td scope="col">' + item.item.estimated_days + '</td>';
				    	break;
				   	case 'ps_variation 1 ps_variation_sku':
					   	if (item.item.models[0]) {
							tbBody += '<td scope="col">' + item.item.models[0].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_name':
					   	if (item.item.models[0]) {
							tbBody += '<td scope="col">' + item.item.models[0].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_price':
					   	if (item.item.models[0]) {
							tbBody += '<td scope="col">' + item.item.models[0].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 1 ps_variation_stock':
					   	if (item.item.models[0]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_sku':
					   	if (item.item.models[1]) {
							tbBody += '<td scope="col">' + item.item.models[1].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_name':
					   	if (item.item.models[1]) {
							tbBody += '<td scope="col">' + item.item.models[1].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_price':
					   	if (item.item.models[1]) {
							tbBody += '<td scope="col">' + item.item.models[1].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 2 ps_variation_stock':
					   	if (item.item.models[1]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_sku':
					   	if (item.item.models[2]) {
							tbBody += '<td scope="col">' + item.item.models[2].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_name':
					   	if (item.item.models[2]) {
							tbBody += '<td scope="col">' + item.item.models[2].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_price':
					   	if (item.item.models[2]) {
							tbBody += '<td scope="col">' + item.item.models[2].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 3 ps_variation_stock':
					   	if (item.item.models[2]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_sku':
					   	if (item.item.models[3]) {
							tbBody += '<td scope="col">' + item.item.models[3].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_name':
					   	if (item.item.models[3]) {
							tbBody += '<td scope="col">' + item.item.models[3].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_price':
					   	if (item.item.models[3]) {
							tbBody += '<td scope="col">' + item.item.models[3].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 4 ps_variation_stock':
					   	if (item.item.models[3]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_sku':
					   	if (item.item.models[4]) {
							tbBody += '<td scope="col">' + item.item.models[4].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_name':
					   	if (item.item.models[4]) {
							tbBody += '<td scope="col">' + item.item.models[4].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_price':
					   	if (item.item.models[4]) {
							tbBody += '<td scope="col">' + item.item.models[4].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 5 ps_variation_stock':
					   	if (item.item.models[4]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_sku':
					   	if (item.item.models[5]) {
							tbBody += '<td scope="col">' + item.item.models[5].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_name':
					   	if (item.item.models[5]) {
							tbBody += '<td scope="col">' + item.item.models[5].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_price':
					   	if (item.item.models[5]) {
							tbBody += '<td scope="col">' + item.item.models[5].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 6 ps_variation_stock':
					   	if (item.item.models[5]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_sku':
					   	if (item.item.models[6]) {
							tbBody += '<td scope="col">' + item.item.models[6].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_name':
					   	if (item.item.models[6]) {
							tbBody += '<td scope="col">' + item.item.models[6].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_price':
					   	if (item.item.models[6]) {
							tbBody += '<td scope="col">' + item.item.models[6].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 7 ps_variation_stock':
					   	if (item.item.models[6]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_sku':
					   	if (item.item.models[7]) {
							tbBody += '<td scope="col">' + item.item.models[7].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_name':
					   	if (item.item.models[7]) {
							tbBody += '<td scope="col">' + item.item.models[7].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_price':
					   	if (item.item.models[7]) {
							tbBody += '<td scope="col">' + item.item.models[7].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 8 ps_variation_stock':
					   	if (item.item.models[7]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_sku':
					   	if (item.item.models[8]) {
							tbBody += '<td scope="col">' + item.item.models[8].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_name':
					   	if (item.item.models[8]) {
							tbBody += '<td scope="col">' + item.item.models[8].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_price':
					   	if (item.item.models[8]) {
							tbBody += '<td scope="col">' + item.item.models[8].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 9 ps_variation_stock':
					   	if (item.item.models[8]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_sku':
					   	if (item.item.models[9]) {
							tbBody += '<td scope="col">' + item.item.models[9].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_name':
					   	if (item.item.models[9]) {
							tbBody += '<td scope="col">' + item.item.models[9].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_price':
					   	if (item.item.models[9]) {
							tbBody += '<td scope="col">' + item.item.models[9].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 10 ps_variation_stock':
					   	if (item.item.models[9]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_sku':
					   	if (item.item.models[10]) {
							tbBody += '<td scope="col">' + item.item.models[10].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_name':
					   	if (item.item.models[10]) {
							tbBody += '<td scope="col">' + item.item.models[10].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_price':
					   	if (item.item.models[10]) {
							tbBody += '<td scope="col">' + item.item.models[10].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 11 ps_variation_stock':
					   	if (item.item.models[10]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_sku':
					   	if (item.item.models[11]) {
							tbBody += '<td scope="col">' + item.item.models[11].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_name':
					   	if (item.item.models[11]) {
							tbBody += '<td scope="col">' + item.item.models[11].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_price':
					   	if (item.item.models[11]) {
							tbBody += '<td scope="col">' + item.item.models[11].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 12 ps_variation_stock':
					   	if (item.item.models[11]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_sku':
					   	if (item.item.models[12]) {
							tbBody += '<td scope="col">' + item.item.models[12].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_name':
					   	if (item.item.models[12]) {
							tbBody += '<td scope="col">' + item.item.models[12].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_price':
					   	if (item.item.models[12]) {
							tbBody += '<td scope="col">' + item.item.models[12].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 13 ps_variation_stock':
					   	if (item.item.models[12]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_sku':
					   	if (item.item.models[13]) {
							tbBody += '<td scope="col">' + item.item.models[13].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_name':
					   	if (item.item.models[13]) {
							tbBody += '<td scope="col">' + item.item.models[13].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_price':
					   	if (item.item.models[13]) {
							tbBody += '<td scope="col">' + item.item.models[13].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 14 ps_variation_stock':
					   	if (item.item.models[13]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_sku':
					   	if (item.item.models[14]) {
							tbBody += '<td scope="col">' + item.item.models[14].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_name':
					   	if (item.item.models[14]) {
							tbBody += '<td scope="col">' + item.item.models[14].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_price':
					   	if (item.item.models[14]) {
							tbBody += '<td scope="col">' + item.item.models[14].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 15 ps_variation_stock':
					   	if (item.item.models[14]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_sku':
					   	if (item.item.models[15]) {
							tbBody += '<td scope="col">' + item.item.models[15].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_name':
					   	if (item.item.models[15]) {
							tbBody += '<td scope="col">' + item.item.models[15].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_price':
					   	if (item.item.models[15]) {
							tbBody += '<td scope="col">' + item.item.models[15].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 16 ps_variation_stock':
					   	if (item.item.models[15]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_sku':
					   	if (item.item.models[16]) {
							tbBody += '<td scope="col">' + item.item.models[16].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_name':
					   	if (item.item.models[16]) {
							tbBody += '<td scope="col">' + item.item.models[16].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_price':
					   	if (item.item.models[16]) {
							tbBody += '<td scope="col">' + item.item.models[16].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 17 ps_variation_stock':
					   	if (item.item.models[16]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_sku':
					   	if (item.item.models[17]) {
							tbBody += '<td scope="col">' + item.item.models[17].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_name':
					   	if (item.item.models[17]) {
							tbBody += '<td scope="col">' + item.item.models[17].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_price':
					   	if (item.item.models[17]) {
							tbBody += '<td scope="col">' + item.item.models[17].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 18 ps_variation_stock':
					   	if (item.item.models[17]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_sku':
					   	if (item.item.models[18]) {
							tbBody += '<td scope="col">' + item.item.models[18].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_name':
					   	if (item.item.models[18]) {
							tbBody += '<td scope="col">' + item.item.models[18].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_price':
					   	if (item.item.models[18]) {
							tbBody += '<td scope="col">' + item.item.models[18].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 19 ps_variation_stock':
					   	if (item.item.models[18]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_sku':
					   	if (item.item.models[19]) {
							tbBody += '<td scope="col">' + item.item.models[19].modelid + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_name':
					   	if (item.item.models[19]) {
							tbBody += '<td scope="col">' + item.item.models[19].name + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_price':
					   	if (item.item.models[19]) {
							tbBody += '<td scope="col">' + item.item.models[19].price/100000 + '</td>';
					   	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;
				   	case 'ps_variation 20 ps_variation_stock':
					   	if (item.item.models[19]) {
					    		tbBody += '<td scope="col">' + (stock ? stock : 0) + '</td>';
						} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				   		break;

				    case 'ps_img_1':
				    	if (item.item.images[0]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[0] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_2':
				    	if (item.item.images[1]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[1] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_3':
				    	if (item.item.images[2]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[2] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_4':
				    	if (item.item.images[3]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[3] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_5':
				    	if (item.item.images[4]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[4] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_6':
				    	if (item.item.images[5]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[5] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_7':
				    	if (item.item.images[6]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[6] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_8':
				    	if (item.item.images[7]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[7] + '</td>';
				    	} else {
					   		tbBody += '<td scope="col"></td>';
					   	}
				    	break;
			    	case 'ps_img_9':
				    	if (item.item.images[8]) {
				    		tbBody += '<td scope="col">' + linkImg + item.item.images[8] + '</td>';
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
			console.log('Download data');

			var a = document.createElement('a');
	        //getting data from our div that contains the HTML table
	        var data_type = 'data:application/vnd.ms-excel';
	        a.href = data_type + ', ' + encodeURIComponent(tbData);
	        //setting the file name
	        a.download = 'shopee_products_part' + part + '.xls';
	        //triggering the function
	        a.click();
	        part ++;
	        //just in case, prevent default behaviour

			// window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tbData));

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
			   	$items.push({itemid: item.itemid});
			});
	    	if ($page > response.total_count) {
	    		getDetailItems($items, $shopid);
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

    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        //Add the data row.
        var row = table.insertRow(-1);

        //Add the data cells.
        var cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].No;

        cell = row.insertCell(-1);
        cell.innerHTML = excelRows[i].Link;
    }

    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    var lable = document.createElement("label");
    lable.innerHTML = 'Result';
    dvExcel.appendChild(lable);
    dvExcel.appendChild(table);
};