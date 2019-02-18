@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12 col-md-offset-0">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>
                <input type="file" id="fileUpload" />
                <input type="button" id="upload" value="Upload" onclick="Upload()" />
                <hr />
                <div id="dvExcel">
                    <label>Example File Excel</label>
                    <table border="1"><tbody><tr><th>No</th><th>Link</th></tr><tr><td>1</td><td>https://shopee.vn/Gi%E1%BA%A5y-%C4%83n-g%E1%BA%A5u-tr%C3%BAc-SIPIAO-lo%E1%BA%A1i-%C4%91%E1%BA%B9p-300-t%E1%BB%9D-i.41545181.1761361590</td></tr><tr><td>2</td><td>https://shopee.vn/L%C6%B0%E1%BB%9Bi-t%E1%BA%AFm-cho-b%C3%A9-i.41545181.733094768</td></tr></tbody></table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
