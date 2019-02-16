<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;
use GuzzleHttp\Client;

class ShopeeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return view('shopees.index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function cloneData()
    {
        $page = 100;

        while(true) {
            $url = "https://shopee.vn/api/v2/search_items/?by=relevancy&limit=100&newest=$page&order=desc&page_type=shop&shopid=13350150";
            $client = new GuzzleHttp\Client(['base_uri' => 'https://foo.com/api/']);
            $res = $client->get($url);
            // $data = json_decode(file_get_contents($url), true);
            dd($res);
            $page += 100;
        }

    }
}
