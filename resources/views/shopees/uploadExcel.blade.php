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
                <a href='{{ route('downloadFileExample') }}'>Example File Excel</a>
                <div id="dvExcel"></div>
            </div>
        </div>
    </div>
</div>
@endsection
