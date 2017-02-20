@extends('layout')
@section('header')
<div class="page-header">
        <h1>Items / Show #{{$item->id}}</h1>

        @if (Auth::id() == $item->user_id)
            <form action="{{ route('items.destroy', $item->id) }}" method="POST" style="display: inline;" onsubmit="if(confirm('Delete? Are you sure?')) { return true } else {return false };">
                <input type="hidden" name="_method" value="DELETE">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="btn-group pull-right" role="group" aria-label="...">
                    <a class="btn btn-warning btn-group" role="group" href="{{ route('items.edit', $item->id) }}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
                    <button type="submit" class="btn btn-danger">Delete <i class="glyphicon glyphicon-trash"></i></button>
                </div>
            </form>
        @endif
        
    </div>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-6">

            <form action="#">
                <div class="form-group">
                    <label>ID: {{$item->id}}</label>
                    <p class="form-control-static"></p>
                </div>
                <div class="form-group">
                  <label>Name: {{$item->name}}</label>
                  <p class="form-control-static"></p>
                </div>
                <div class="form-group">
                  <label>Price: {{$item->price}}</label>
                  <p class="form-control-static"></p>
                </div>
                
            </form>

            <a class="btn btn-link" href="{{ route('items.index') }}"><i class="glyphicon glyphicon-backward"></i>  Back</a>

        </div>
        @if (Auth::check() && Auth::id() != $item->id)
            <div class="col-md-6">
                <div class="form-group">
                    <div id="item-chat"></div>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" name="message">
                </div>
            </div>
        @endif
    </div>

@endsection