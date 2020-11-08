<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class PasswordReset extends Authenticatable
{
     use Notifiable;
     public $primaryKey = 'id';
     protected $fillable = [
         'email', 'token'
     ];
     protected $hidden = [
         'id'
     ];
}
