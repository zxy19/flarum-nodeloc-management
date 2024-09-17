<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'nodeloc_manage_notes_table',
    function (Blueprint $table) {
        $table->increments('id');
        $table->timestamps();
        $table->integer('user_id')->unsigned();
        $table->integer('from_user_id')->unsigned();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('from_user_id')->references('id')->on('users')->onDelete('cascade');
        $table->text('content');
    }
);