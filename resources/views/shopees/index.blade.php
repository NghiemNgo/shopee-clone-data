@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12 col-md-offset-0">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    <form id="SubmitShopeeLink">
                        <div class="form-group">
                            <label for="linkShopee">URL</label>
                            <input class="form-control" id="linkShopee" aria-describedby="textHelp" name="shop_name" placeholder="Enter link">
                            <small class="form-text text-muted">Example: https://shopee.vn/{shop_name}</small>
                        </div>
                        <div class="form-group">
                            <label for="beforeName">Add text to before name</label>
                            <input class="form-control" id="beforeName" aria-describedby="textHelp" name="beforeName" placeholder="Enter link">
                        </div>
                        <div class="form-group">
                            <label for="afterName">Add text to after name</label>
                            <input class="form-control" id="afterName" aria-describedby="textHelp" name="afterName" placeholder="Enter link">
                        </div>
                        <div class="form-group">
                            <label for="beforeDescription">Add text to before Description</label>
                            <textarea class="form-control" id="beforeDescription" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="afterDescription">Add text to after Description</label>
                            <textarea class="form-control" id="afterDescription" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="linkShopee">Stock</label>
                            <input class="form-control" id="stock" aria-describedby="textHelp" name="shop_name" placeholder="Enter link">
                        </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <div id="tbData"></div>
                    <input type="file" id="fileUpload" />
                    <input type="button" id="upload" value="Upload" onclick="Upload()" />
                    <hr />
                    <div id="dvExcel"></div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
